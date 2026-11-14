import { expect, test } from "bun:test";
import { createMetricRoom, workloads, summarize } from "./ui-metrics-model";
import { isRoomEvent } from "../shared/validation";
import { assessBudgets, type MetricSummary } from "./ui-metrics-budgets";
import { metricShell } from "./ui-metrics-shell";
import { MeResult } from "../shared/schemas";
import { me } from "./native-home-fixtures";
import { readFile } from "node:fs/promises";
test("deterministic public long-room shapes use real initial window and paging semantics", () => {
  const first = createMetricRoom(workloads.long, "A", 421),
    again = createMetricRoom(workloads.long, "A", 421),
    state = first.snapshot();
  expect(first.digest).toBe(again.digest);
  expect(first.all).toHaveLength(5000);
  expect(isRoomEvent(state)).toBe(true);
  if (state.t !== "state") throw Error("fixture shape");
  expect(
    state.messages.filter((message) => message.thread === "main"),
  ).toHaveLength(60);
  expect(state.epics).toHaveLength(50);
  expect(state.epics.flatMap((epic) => epic.tasks)).toHaveLength(600);
  expect(state.doc?.length).toBe(40000);
  const archived = new Set(
    state.epics.filter((epic) => epic.archived).map((epic) => epic.id),
  );
  expect(state.messages.some((message) => archived.has(message.thread))).toBe(
    false,
  );
  const oldest = state.messages.find(
      (message) => message.thread === "main",
    )!.id,
    older = first.older("main", oldest);
  expect(older.messages).toHaveLength(100);
  expect(
    older.messages.every(
      (message) => message.thread === "main" && message.id < oldest,
    ),
  ).toBe(true);
  expect(older.more).toBe(true);
  expect(isRoomEvent(older)).toBe(true);
});
test("quantiles never fabricate a zero measurement for missing samples and expose nearest-rank tails", () => {
  expect(summarize([])).toEqual({
    n: 0,
    min: null,
    p50: null,
    p95: null,
    max: null,
    mean: null,
  });
  expect(summarize([3, 1, 2])).toEqual({
    n: 3,
    min: 1,
    p50: 2,
    p95: 3,
    max: 3,
    mean: 2,
  });
  expect(summarize([Number.NaN, 0])).toEqual({
    n: 1,
    min: 0,
    p50: 0,
    p95: 0,
    max: 0,
    mean: 0,
  });
});

test("approved performance budgets keep real regressions failed and unavailable fonts unverified", () => {
  const row = (
    variant: MetricSummary["variant"],
    ready: number,
  ): MetricSummary => ({
    profile: "long",
    device: "mobile",
    variant,
    passed: 7,
    metrics: {
      "entry.readyWithFontsAndTwoFramesMs": summarize(Array(7).fill(ready)),
      "entry.applicationGzipReferenceBytes": summarize(
        Array(7).fill(variant === "vanilla" ? 100000 : 200000),
      ),
      "entry.fontTransferBytes": summarize([]),
    },
  });
  const budgets = assessBudgets([row("vanilla", 100), row("svelte", 151)], 3);
  expect(
    budgets.find((row) => row.metric === "entry.readyWithFontsAndTwoFramesMs"),
  ).toMatchObject({ vanilla: 100, native: 151, limit: 150, status: "failed" });
  expect(
    budgets.find((row) => row.metric === "entry.applicationGzipReferenceBytes"),
  ).toMatchObject({ limit: 130720, status: "failed" });
  expect(
    budgets.find((row) => row.metric === "entry.fontTransferBytes"),
  ).toMatchObject({ vanilla: null, native: null, status: "unverified" });
  expect(budgets.find((row) => row.metric === "history1.ms")?.status).toBe(
    "unverified",
  );
});

test("incomplete or mixed device cohorts cannot satisfy seven-run median acceptance", () => {
  const metrics = { "threadSwitch.ms": summarize(Array(7).fill(100)) };
  const budgets = assessBudgets(
    [
      {
        profile: "long",
        device: "desktop",
        variant: "vanilla",
        passed: 7,
        metrics,
      },
      {
        profile: "long",
        device: "mobile",
        variant: "svelte",
        passed: 7,
        metrics,
      },
      {
        profile: "long",
        device: "desktop",
        variant: "svelte",
        passed: 6,
        metrics,
      },
    ],
    3,
  );
  expect(
    budgets
      .filter((row) => row.metric === "threadSwitch.ms")
      .every((row) => row.status === "unverified"),
  ).toBe(true);
});

test("controlled shell metadata matches its original-response ETag/Me domain without replacing built assets", () => {
  const built = "abcdef0123456789abcd",
    source = `<!doctype html><html><head><link rel="stylesheet" href="/svelte-preview/ui.css?v=${built}"></head><body><main>public fixture</main><script type="module" src="/svelte-preview/app.js?v=${built}"></script></body></html>`;
  for (const variant of ["vanilla", "svelte"] as const) {
    const etag = `"original-${variant}-etag"`,
      served = metricShell(source, etag, variant),
      metadata = `<meta name="vb-v" content="${served.version}" />`;
    expect(served.version).toBe(`original-${variant}-etag`);
    expect(MeResult.parse(me({ v: served.version })).v).toBe(served.version);
    expect(served.body.replace(metadata, "")).toBe(source);
    expect(served.body.match(/<meta name="vb-v"/g)).toHaveLength(1);
    expect(served.body.indexOf(metadata)).toBeLessThan(
      served.body.indexOf("</head>"),
    );
    expect(served.versionDomain).toBe("controlled-original-static-shell-etag");
    expect(served.entryVersion).toBe(variant === "svelte" ? built : null);
  }
});

test("shell preflight rejects duplicate Worker metadata and incoherent native version references", () => {
  const built = "abcdef0123456789abcd",
    source = `<head><link href="/svelte-preview/ui.css?v=${built}"></head><script src="/svelte-preview/app.js?v=${built}"></script>`;
  for (const invalid of [
    source.replace("<head>", '<head><meta name="vb-v" content="old">'),
    source.replace("<head>", "<head><head>"),
    source.replace("</head>", ""),
    source.replace("ui.css", "wrong.css"),
    source.replace("app.js", "wrong.js"),
    source.replace(`ui.css?v=${built}`, "ui.css?v=00000000000000000000"),
    source + `<script src="/svelte-preview/app.js?v=${built}"></script>`,
    source.replace(
      "/svelte-preview/app.js",
      "https://foreign.invalid/svelte-preview/app.js",
    ),
    source.replace(`app.js?v=${built}`, `app.js?v=${built}&v=${built}`),
  ])
    expect(() => metricShell(invalid, '"original-etag"', "svelte")).toThrow();
});

test("shell preflight distinguishes actual metadata from comments, raw text and inert templates", () => {
  const built = "abcdef0123456789abcd";
  const source = `<html><head><!-- <meta name="vb-v"> --><style>/* <meta name="vb-v"> */</style><script>// <meta name="vb-v">
const ghost = '<script src="/svelte-preview/app.js?v=wrong">';</script><template><meta name="vb-v"><script src="/svelte-preview/app.js?v=wrong"></script></template><link href="/svelte-preview/ui.css?v=${built}"></head><body><script src="/svelte-preview/app.js?v=${built}"></script></body></html>`;
  const served = metricShell(source, '"actual-original-etag"', "svelte");
  expect(served.entryVersion).toBe(built);
  expect(served.body.replace(`<meta name="vb-v" content="${served.version}" />`, "")).toBe(source);
  expect(() => metricShell(source.replace("<head>", '<head><meta name="VB-V" content="old">'), '"etag"', "svelte")).toThrow();
});

test("checked-in vanilla and native shells preserve exact source while adding actual Worker metadata", async () => {
  for (const variant of ["vanilla", "svelte"] as const) {
    const source = await readFile(new URL(variant === "vanilla" ? "../public/app.html" : "../public/app-svelte.html", import.meta.url), "utf8");
    const served = metricShell(source, `"original-${variant}-etag"`, variant);
    expect(served.body.replace(`<meta name="vb-v" content="${served.version}" />`, "")).toBe(source);
    expect(served.entryVersion === null).toBe(variant === "vanilla");
  }
});
