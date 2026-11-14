import { expect, test } from "bun:test";
import { createMetricRoom, workloads, summarize } from "./ui-metrics-model";
import { isRoomEvent } from "../shared/validation";
import { assessBudgets, type MetricSummary } from "./ui-metrics-budgets";
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
