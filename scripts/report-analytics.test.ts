import { expect, test } from "bun:test";
import {
  BytesAnalytics,
  KindAnalytics,
  WorkerAnalytics,
  ZoneAnalytics,
  parseIssueDimensions,
  parseSpendKey,
  readAnalyticsResponse,
  readZoneResponse,
} from "../src/report-analytics";
import { bytes, externalRefs, foldPath, vs, yesterday } from "../src/reports";

test("Worker analytics keeps numeric totals, absent quantiles and empty authorized accounts distinct", async () => {
  const value = {
    viewer: {
      accounts: [
        {
          workersInvocationsAdaptive: [
            {
              dimensions: { status: "ok" },
              sum: {
                requests: 12,
                errors: 0,
                subrequests: 2,
                responseBodySize: 1500,
              },
              quantiles: null,
            },
          ],
        },
      ],
    },
  };
  const result = await readAnalyticsResponse(
    Response.json({ data: value }),
    WorkerAnalytics,
  );
  expect(result).toEqual(value);
  expect(
    await readAnalyticsResponse(
      Response.json({ data: { viewer: { accounts: [] } } }),
      WorkerAnalytics,
    ),
  ).toEqual({ viewer: { accounts: [] } });
  for (const invalid of [
    null,
    {},
    { viewer: null },
    { viewer: { accounts: null } },
    { viewer: { accounts: [{ workersInvocationsAdaptive: [null] }] } },
    {
      viewer: {
        accounts: [
          { workersInvocationsAdaptive: [{ sum: { requests: "12" } }] },
        ],
      },
    },
  ]) {
    await expect(
      readAnalyticsResponse(Response.json({ data: invalid }), WorkerAnalytics),
    ).rejects.toThrow("invalid analytics data");
  }
});

test("provider errors take precedence over partial data and malformed envelopes never fabricate totals", async () => {
  await expect(
    readAnalyticsResponse(
      Response.json({
        data: null,
        errors: [{ message: "analytics permission required" }],
      }),
      WorkerAnalytics,
    ),
  ).rejects.toThrow("analytics permission required");
  await expect(
    readAnalyticsResponse(
      Response.json({ errors: [{ message: "limited" }] }, { status: 429 }),
      WorkerAnalytics,
    ),
  ).rejects.toThrow("limited");
  await expect(
    readAnalyticsResponse(Response.json({}, { status: 503 }), WorkerAnalytics),
  ).rejects.toThrow("HTTP 503");
  await expect(
    readAnalyticsResponse(
      Response.json({ errors: { message: "wrong envelope" } }),
      WorkerAnalytics,
    ),
  ).rejects.toThrow("invalid analytics envelope");
  await expect(
    readAnalyticsResponse(
      new Response("<html>gateway</html>", { status: 502 }),
      WorkerAnalytics,
    ),
  ).rejects.toThrow("invalid JSON (HTTP 502)");
});

test("zone daily and adaptive query shapes validate nested metrics before reporting", async () => {
  const daily = {
    viewer: {
      zones: [
        {
          httpRequests1dGroups: [
            {
              dimensions: { date: "2026-11-13" },
              sum: { requests: 50, bytes: 1000, cachedBytes: 800, threats: 0 },
              uniq: { uniques: 7 },
            },
          ],
        },
      ],
    },
  };
  expect(
    await readAnalyticsResponse(Response.json({ data: daily }), ZoneAnalytics),
  ).toEqual(daily);
  expect(
    ZoneAnalytics.safeParse({
      viewer: {
        zones: [
          {
            httpRequests1dGroups: [
              {
                dimensions: { date: "2026-11-13" },
                sum: { requests: 50 },
                uniq: { uniques: 7 },
              },
            ],
          },
        ],
      },
    }).success,
  ).toBe(false);
  const kinds = {
    viewer: {
      zones: [{ all: [{ count: 10 }], mcp: [], api: [{ count: 2 }], ws: [] }],
    },
  };
  expect(
    await readAnalyticsResponse(Response.json({ data: kinds }), KindAnalytics),
  ).toEqual(kinds);
  expect(
    KindAnalytics.safeParse({
      viewer: { zones: [{ all: [{ count: -1 }], mcp: [], api: [], ws: [] }] },
    }).success,
  ).toBe(false);
});

test("bandwidth rows reject malformed paths, status and numeric strings rather than failing during folding", async () => {
  const row = {
    count: 4,
    sum: { edgeResponseBytes: 2000 },
    dimensions: { clientRequestPath: "/api/books/abcdef012345" },
  };
  const data = {
    viewer: {
      zones: [
        {
          paths: [row],
          types: [
            {
              count: 4,
              sum: { edgeResponseBytes: 2000 },
              dimensions: { edgeResponseContentTypeName: "json" },
            },
          ],
          errs: [
            {
              count: 1,
              dimensions: {
                clientRequestPath: "/api/books/abcdef012345",
                edgeResponseStatus: 500,
              },
            },
          ],
        },
      ],
    },
  };
  expect(
    await readAnalyticsResponse(Response.json({ data }), BytesAnalytics),
  ).toEqual(data);
  for (const invalid of [
    { ...row, dimensions: { clientRequestPath: null } },
    { ...row, sum: { edgeResponseBytes: "2000" } },
    { ...row, count: Infinity },
  ]) {
    expect(
      BytesAnalytics.safeParse({
        viewer: { zones: [{ paths: [invalid], types: [], errs: [] }] },
      }).success,
    ).toBe(false);
  }
});

test("zone lookup distinguishes empty authorized result from errors and malformed provider records", async () => {
  expect(
    await readZoneResponse(
      Response.json({ success: true, result: [{ id: "zone-id" }] }),
    ),
  ).toBe("zone-id");
  expect(
    await readZoneResponse(Response.json({ success: true, result: [] })),
  ).toBeNull();
  await expect(
    readZoneResponse(
      Response.json(
        { success: false, errors: [{ message: "invalid token", code: 1000 }] },
        { status: 403 },
      ),
    ),
  ).rejects.toThrow("invalid token");
  for (const value of [{ result: [{ id: 2 }] }, { result: null }, {}])
    await expect(readZoneResponse(Response.json(value))).rejects.toThrow();
});

test("OpenRouter invalid optional provider metrics make the key unavailable without changing recorded costs", () => {
  expect(
    parseSpendKey({
      data: {
        usage: 12.5,
        limit: null,
        usage_daily: 1,
        usage_weekly: 5,
        usage_monthly: 12,
      },
    }),
  ).toEqual({ usage: 12.5, limit: null, daily: 1, weekly: 5, monthly: 12 });
  expect(parseSpendKey({ data: {} })).toEqual({
    usage: 0,
    limit: null,
    daily: null,
    weekly: null,
    monthly: null,
  });
  for (const value of [
    null,
    {},
    { data: null },
    { data: { usage: "12" } },
    { data: { limit: Infinity } },
    { data: { usage_daily: -1 } },
  ])
    expect(parseSpendKey(value)).toBeNull();
});

test("issue dimensions preserve truncated historical text and ignore nonstring structured fields", () => {
  expect(
    parseIssueDimensions('{"kind":"tool","model":"m","what":"truncated'),
  ).toEqual({ kind: "tool", model: "m", what: "truncated…" });
  expect(
    parseIssueDimensions('{"kind":"tool","model":{},"what":["wrong"]}'),
  ).toEqual({ kind: "tool", model: undefined, what: undefined });
  for (const value of ["null", "[]", "42"])
    expect(parseIssueDimensions(value)).toEqual({});
  expect(parseIssueDimensions('{"what":"Unicode ação ✓"}').what).toBe(
    "Unicode ação ✓",
  );
});

test("report formatting, BRT day, path folding and referrer totals retain their current output", () => {
  expect(yesterday(Date.UTC(2026, 10, 7, 13))).toEqual({
    start: Date.UTC(2026, 10, 6, 3),
    end: Date.UTC(2026, 10, 7, 3),
  });
  expect(vs(12, 70)).toBe("**12** (+20% vs média 10)");
  expect(bytes(2_500_000)).toBe("2.5 MB");
  expect(foldPath("/api/books/abcdef012345/messages")).toBe(
    "/api/books/:id/messages",
  );
  expect(
    externalRefs([
      { k: "https://vibebook.dev/pt", v: 9 },
      { k: "https://www.google.com/", v: 2 },
      { k: "https://google.com/search", v: 1 },
    ]),
  ).toEqual([{ k: "google.com", v: 3 }]);
});
