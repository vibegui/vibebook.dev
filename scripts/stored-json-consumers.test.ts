// Actual routing/aggregation consumers through Hono with SQL/model doubles.
// No Worker D1, real provider decisions or production credentials are claimed.
import { expect, mock, test } from "bun:test";
import { Hono } from "hono";
import type { Ctx } from "../src/index";
import { RouteResult } from "../shared/schemas";
import { cachedHomeEpics, eventDimensions } from "../src/storedContainers";
let output = {
  room_id: "owned",
  epic_id: "rogue",
  reason: "Synthetic choice",
  alternatives: [{ room_id: "foreign", epic_id: "rogue" }],
  new_room_title: "",
};
const prompts: string[] = [];
mock.module("ai", () => ({
  Output: { object: (options: unknown) => options },
  generateText: async (options: { prompt: string }) => {
    prompts.push(options.prompt);
    return { output, usage: { raw: { cost: 0.25 } } };
  },
}));
const { routeMessage } = await import("../src/route-home");
const { trafficOverview, adminOverview } = await import("../src/analytics");

function fixture(
  epics: string | null,
  dims: readonly string[] = [],
  names: readonly string[] = [],
) {
  const queries: { query: string; values: unknown[] }[] = [];
  const events = dims.map((value, index) => ({
    day: "2026-11-14",
    name: names[index] ?? "pageview",
    path: "/app",
    country: "BR",
    visitor: `synthetic-${index}`,
    user: "",
    dims: value,
  }));
  const env = {
    OPENROUTER_API_KEY: "synthetic-unused-key",
    MODEL_ROUTE: "synthetic-provider-double",
    DB: {
      prepare(query: string) {
        const observed: { query: string; values: unknown[] } = {
          query,
          values: [],
        };
        queries.push(observed);
        return {
          bind(...values: unknown[]) {
            observed.values = values;
            return this;
          },
          async all() {
            return {
              results: query.includes("coalesce(dims")
                ? events
                : query.includes(
                      "SELECT b.id, b.title, b.folder, b.summary, b.epics",
                    )
                  ? [
                      {
                        id: "owned",
                        title: "Known room",
                        folder: null,
                        summary: null,
                        epics,
                      },
                    ]
                  : [],
            };
          },
          async first() {
            return { n: 0 };
          },
        };
      },
    },
  };
  const app = new Hono<Ctx>();
  app.get("/route", async (c) =>
    c.json(
      await routeMessage(c.env, "reader@example.test", "Synthetic message"),
    ),
  );
  app.get("/traffic", async (c) => c.json(await trafficOverview(c.env)));
  app.get("/admin", async (c) => c.json(await adminOverview(c.env)));
  return {
    queries,
    request: (path: string) =>
      app.request(`https://test.invalid${path}`, {}, env),
  };
}

test("actual Home route ignores malformed cached containers/elements and cannot select their invented epic", async () => {
  output = {
    room_id: "owned",
    epic_id: "rogue",
    reason: "Synthetic choice",
    alternatives: [{ room_id: "foreign", epic_id: "rogue" }],
    new_room_title: "",
  };
  for (const raw of [
    null,
    "null",
    "true",
    "7",
    '"scalar"',
    "{}",
    '{"id":"rogue","title":"Injected"}',
    "{bad",
    JSON.stringify([
      null,
      7,
      [],
      { id: 7, title: "Injected" },
      { id: "rogue", title: { bad: true } },
    ]),
  ]) {
    const f = fixture(raw),
      response = await f.request("/route");
    expect(response.status).toBe(200);
    const result = RouteResult.parse(await response.json());
    expect(result.pick).toEqual({
      book_id: "owned",
      book_title: "Known room",
      epic_id: null,
      epic_title: null,
    });
    expect(result.alternatives).toEqual([]);
    expect(prompts.at(-1)).not.toContain("epic rogue");
    expect(f.queries[0].values).toEqual(["reader@example.test", 40]);
  }
});
test("actual Home routing retains valid legacy optional/null counts, ordering, siblings and known-id filtering", async () => {
  const legacy = {
      id: "old",
      title: "Legacy",
      open: null,
      extension: { kept: [null, "x"] },
    },
    current = { id: "new", title: "Current", open: 3 };
  const raw = JSON.stringify([legacy, null, current]);
  expect(cachedHomeEpics(raw)).toEqual([legacy, current]);
  output = {
    room_id: "owned",
    epic_id: "old",
    reason: "Synthetic choice",
    alternatives: [{ room_id: "owned", epic_id: "new" }],
    new_room_title: "",
  };
  const response = await fixture(raw).request("/route");
  const result = RouteResult.parse(await response.json());
  expect(result.pick?.epic_id).toBe("old");
  expect(result.pick?.epic_title).toBe("Legacy");
  expect(result.alternatives.map((item) => item.epic_id)).toEqual(["new"]);
  expect(result.cost).toBe(0.25);
  const prompt = prompts.at(-1) ?? "";
  expect(prompt).toContain(
    "epic old | Legacy\n  epic new | Current (3 tarefas abertas)",
  );
  expect(prompt).not.toContain("null tarefas");
});
test("actual traffic and admin consumers retain malformed-dimension events without unsafe property access", async () => {
  const malformed = [
    "null",
    "false",
    "7",
    '"scalar"',
    "[]",
    '[{"ua":"pretend-browser","cost":100}]',
    "{bad",
  ];
  for (const value of malformed) expect(eventDimensions(value)).toEqual({});
  const f = fixture(null, malformed);
  const response = await f.request("/traffic");
  expect(response.status).toBe(200);
  const traffic: unknown = await response.json();
  expect(traffic).toMatchObject({
    totals: { events: malformed.length, visitors: malformed.length },
    dimensions: {
      browser: [{ key: "(?)", events: malformed.length }],
      device: [{ key: "(?)", events: malformed.length }],
    },
  });
  const admin = await fixture(
    null,
    malformed,
    malformed.map(() => "ai_run"),
  ).request("/admin");
  expect(admin.status).toBe(200);
  const result: unknown = await admin.json();
  expect(result).toMatchObject({
    kpis: { aiCost: 0, aiRuns: malformed.length, messages: 0 },
    ai: [{ model: "anthropic/claude-sonnet-5.5", runs: malformed.length }],
  });
});
test("actual traffic grouping preserves valid nullable and opaque extension dimensions", async () => {
  const original = {
    ua: "Mozilla/5.0 Chrome/130.0 Linux",
    ref: "https://www.example.test/page",
    utm: "campaign",
    asn: 123,
    asOrg: "Network",
    ip: null,
    colo: "GRU",
    extension: { nullable: null, nested: [1, "x"] },
  };
  const raw = JSON.stringify(original);
  expect(eventDimensions(raw)).toEqual(original);
  const response = await fixture(null, [raw, "{}"]).request("/traffic");
  expect(response.status).toBe(200);
  const result: unknown = await response.json();
  expect(result).toMatchObject({
    totals: { events: 2, visitors: 2 },
    dimensions: {
      browser: [
        { key: "Chrome", events: 1 },
        { key: "(?)", events: 1 },
      ],
      ref: [
        { key: "example.test", events: 1 },
        { key: "(direct)", events: 1 },
      ],
      asn: [
        { key: "AS123 Network", events: 1 },
        { key: "(?)", events: 1 },
      ],
    },
  });
  {
    const original = {
      mode: "fast",
      model: null,
      cost: "0.2",
      ms: 125,
      tools: 2,
      ok: false,
      extension: { nullable: null },
    };
    const raw = JSON.stringify(original);
    expect(eventDimensions(raw)).toEqual(original);
    const response = await fixture(null, [raw], ["ai_run"]).request("/admin");
    expect(response.status).toBe(200);
    const result: unknown = await response.json();
    expect(result).toMatchObject({
      kpis: { aiCost: 0.2, aiRuns: 1, aiFailures: 1 },
      ai: [
        {
          model: "anthropic/claude-sonnet-5.5",
          cost: 0.2,
          tools: 2,
          avgMs: 125,
          failures: 1,
        },
      ],
    });
  }
});
