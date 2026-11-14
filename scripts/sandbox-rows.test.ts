import { afterEach, expect, mock, test } from "bun:test";
import { Database } from "bun:sqlite";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Env } from "../src/index";
import { SandboxesResult } from "../shared/schemas";
import {
  runningSeconds,
  sandboxMetrics,
  sandboxEstimate,
  sandboxTarget,
  sandboxSetup,
} from "../src/sandboxRows";
import { sandboxCost } from "../shared/sandboxCost";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { sandboxOps, saveKey } = await import("../src/sandbox");
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

async function fixture() {
  const db = new Database(":memory:");
  db.run(
    "CREATE TABLE sandboxes (id TEXT PRIMARY KEY, email TEXT, book_id TEXT, name TEXT, vm_id TEXT, identity_id TEXT, ready INTEGER DEFAULT 0, created_at INTEGER)",
  );
  for (const [name, type] of [
    ["state", "TEXT"],
    ["run_s", "INTEGER"],
    ["rate", "REAL"],
    ["disk_rate", "REAL"],
    ["checked_at", "INTEGER"],
  ])
    db.run(`ALTER TABLE sandboxes ADD COLUMN ${name} ${type}`);
  for (const table of ["freestyle_keys", "claude_tokens"])
    db.run(
      `CREATE TABLE ${table} (email TEXT PRIMARY KEY, enc TEXT, iv TEXT, at INTEGER)`,
    );
  db.run(
    "INSERT INTO sandboxes(id,email,book_id,name,vm_id,created_at,run_s,rate,disk_rate) VALUES ('s','owner@test','room',NULL,'fake-vm',NULL,3600,1,0.01)",
  );
  const writes: { sql: string; values: (string | number | null)[] }[] = [];
  const pending: Promise<unknown>[] = [];
  const calls: { path: string; method: string }[] = [];
  let grantReads = 0;
  let provider: unknown = {
    state: "running",
    totalRunSeconds: 0,
    updatedAt: "invalid-date",
  };
  const prepare = (sql: string) => {
    let values: (string | number | null)[] = [];
    const owned = /sandboxes|freestyle_keys|claude_tokens/.test(sql);
    const statement = {
      bind(...input: (string | number | null)[]) {
        values = input;
        return statement;
      },
      async first() {
        return owned ? db.query(sql).get(...values) : null;
      },
      async all() {
        return { results: owned ? db.query(sql).all(...values) : [] };
      },
      async run() {
        expect(
          values.every(
            (value) => typeof value !== "number" || Number.isFinite(value),
          ),
        ).toBe(true);
        writes.push({ sql, values });
        if (owned) db.query(sql).run(...values);
        return {};
      },
    };
    return statement;
  };
  // Only fixture bindings are adapted; production operations and SQLite values
  // are real. No provider requests leave this process.
  const env = {
    DB: {
      prepare,
      batch: async (statements: { run(): Promise<unknown> }[]) =>
        Promise.all(statements.map((st) => st.run())),
    },
    SESSION_SECRET: "synthetic-fixture-session-material",
    FREESTYLE_API: "https://sandbox-fixture.invalid",
    PEOPLE: {
      idFromName: (value: string) => value,
      get: () => ({ fetch: async () => new Response(null, { status: 204 }) }),
    },
    OAUTH_PROVIDER: {
      listUserGrants: async () => {
        grantReads++;
        return { items: [] };
      },
    },
  } as unknown as Env;
  await saveKey(env, "owner@test", "synthetic-provider-value");
  globalThis.fetch = Object.assign(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = new URL(String(input));
      expect(url.origin).toBe("https://sandbox-fixture.invalid");
      calls.push({ path: url.pathname, method: init?.method ?? "GET" });
      return new Response(
        JSON.stringify(
          url.pathname.endsWith("/tokens")
            ? { token: "synthetic-terminal" }
            : url.pathname === "/v5/identities"
              ? { id: "fake-identity" }
              : provider,
        ),
      );
    },
    { preconnect: originalFetch.preconnect },
  );
  const ctx = {
    waitUntil(promise: Promise<unknown>) {
      pending.push(promise);
    },
  };
  return {
    db,
    writes,
    calls,
    pending,
    ops: sandboxOps(env, ctx, "owner@test", "https://vibebook.test"),
    outsider: sandboxOps(env, ctx, "other@test", "https://vibebook.test"),
    setProvider: (value: unknown) => {
      provider = value;
    },
    grantReads: () => grantReads,
  };
}

test("actual SQLite nullable display rows stay visible, unknown costs stay finite and provider-invalid dates cannot overwrite metrics", async () => {
  const f = await fixture();
  try {
    const result = SandboxesResult.parse(await f.ops.list("room"));
    const card = result.sandboxes[0]!;
    expect(card).toMatchObject({
      id: "s",
      vm_id: "fake-vm",
      name: null,
      created_at: null,
      ready: false,
      rate: 1,
      cost: 1,
      cost_unknown: true,
    });
    expect(card.error).toContain("timestamp");
    expect(f.writes.some((row) => row.sql.startsWith("UPDATE sandboxes"))).toBe(
      false,
    );
    expect(f.db.query("SELECT run_s FROM sandboxes").get()).toEqual({
      run_s: 3600,
    });
    await Promise.all(f.pending);
  } finally {
    f.db.close();
  }
});

test("control and deletion use original VM identity despite corrupt display data; foreign ownership makes no provider call", async () => {
  const f = await fixture();
  try {
    expect(await f.outsider.power("s", "pause")).toBe("not_found");
    expect(await f.outsider.remove("s")).toBe(false);
    expect(f.calls).toHaveLength(0);
    await expect(f.ops.setup("s")).rejects.toThrow();
    expect(f.calls).toHaveLength(0);
    expect(await f.ops.power("s", "pause")).toBeNull();
    expect(f.calls[0]).toEqual({
      path: "/v5/vms/fake-vm/pause",
      method: "POST",
    });
    f.setProvider({ state: "running" });
    expect((await f.ops.terminal("s"))?.url).toContain("/v5/vms/fake-vm/pty");
    expect(await f.ops.remove("s")).toBe(true);
    expect(
      f.calls.some(
        (call) => call.path === "/v5/vms/fake-vm" && call.method === "DELETE",
      ),
    ).toBe(true);
    expect(f.db.query("SELECT id FROM sandboxes").get()).toBeNull();
    await Promise.all(f.pending);
  } finally {
    f.db.close();
  }
});

test("unusable required target/folder is rejected, historical zero/null metrics and epoch zero are not confused", () => {
  expect(() => sandboxTarget({ id: "s", vm_id: null })).toThrow();
  expect(() =>
    sandboxSetup({ id: "s", vm_id: "vm", name: null, book_id: "r" }),
  ).toThrow();
  expect(() =>
    sandboxSetup({ id: "s", vm_id: "vm", name: "../other", book_id: "r" }),
  ).toThrow();
  expect(
    sandboxTarget({ id: "s", vm_id: "vm", ready: 0, created_at: 0 })
      ?.created_at,
  ).toBe(0);
  expect(sandboxMetrics({ run_s: null, rate: null, disk_rate: null })).toEqual({
    run_s: 0,
    rate: 0,
    disk_rate: 0,
    unknown: false,
  });
  expect(
    sandboxEstimate(
      sandboxMetrics({ run_s: 0, rate: 0, disk_rate: 0 }),
      0,
      1000,
    ),
  ).toEqual({ cost: 0, cost_unknown: false });
  expect(
    runningSeconds(
      {
        state: "running",
        totalRunSeconds: 0,
        updatedAt: "1970-01-01T00:00:00.000Z",
      },
      1000,
    ),
  ).toBe(1);
  expect(
    runningSeconds(
      { state: "running", updatedAt: "1970-01-01T00:00:02.000Z" },
      1000,
    ),
  ).toBe(0);
  expect(() =>
    runningSeconds({ state: "running", updatedAt: "invalid" }, 1000),
  ).toThrow();
  expect(sandboxMetrics({ run_s: "broken" }).unknown).toBe(true);
});

test("actual owned rows with unusable required VM identity cannot cause provider side effects", async () => {
  const f = await fixture();
  try {
    f.db.run("UPDATE sandboxes SET vm_id = NULL");
    await expect(f.ops.power("s", "pause")).rejects.toThrow();
    await expect(f.ops.terminal("s")).rejects.toThrow();
    await expect(f.ops.remove("s")).rejects.toThrow();
    expect(f.calls).toHaveLength(0);
    expect(f.db.query("SELECT id FROM sandboxes").get()).toEqual({ id: "s" });
  } finally {
    f.db.close();
  }
});

test("malformed stored terminal identity is checked before paid VM side effects; deletion skips invalid optional cleanup", async () => {
  const f = await fixture();
  try {
    f.db.run("UPDATE sandboxes SET identity_id = '', name = '../other'");
    f.setProvider({ state: "paused" });
    await expect(f.ops.terminal("s")).rejects.toThrow();
    expect(f.calls).toHaveLength(0);
    expect(await f.ops.remove("s")).toBe(true);
    expect(f.calls).toEqual([{ path: "/v5/vms/fake-vm", method: "DELETE" }]);
    expect(f.grantReads()).toBe(0);
    await Promise.all(f.pending);
  } finally {
    f.db.close();
  }
});

test("valid provider zero values remain exact zero in actual consumer and SQLite updates", async () => {
  const f = await fixture();
  try {
    f.db.run("UPDATE sandboxes SET name = 'valid', created_at = 0");
    f.setProvider({
      state: "paused",
      totalRunSeconds: 0,
      resources: { cpu: 0, memory: 0, storage: 0 },
    });
    const card = (await f.ops.list("room")).sandboxes[0]!;
    expect(card).toMatchObject({
      name: "valid",
      created_at: 0,
      rate: 0,
      cost: 0,
      cost_unknown: false,
      ready: false,
    });
    await Promise.all(f.pending);
    expect(
      f.db.query("SELECT run_s, rate, disk_rate FROM sandboxes").get(),
    ).toEqual({ run_s: 0, rate: 0, disk_rate: 0 });
  } finally {
    f.db.close();
  }
});

test("incomplete provider snapshots retain previous metrics and never claim a known zero estimate", async () => {
  const f = await fixture();
  try {
    f.db.run("UPDATE sandboxes SET name = 'valid', created_at = 0");
    for (const provider of [
      { state: "paused", totalRunSeconds: 0 },
      {
        state: "running",
        totalRunSeconds: 0,
        resources: { cpu: 0, memory: 0, storage: 0 },
      },
      { state: "paused", resources: { cpu: 0, memory: 0, storage: 0 } },
    ]) {
      f.setProvider(provider);
      const card = (await f.ops.list("room")).sandboxes[0]!;
      expect(card.cost_unknown).toBe(true);
      expect(card.rate).toBe(1);
      expect(card.error).toContain("incomplete");
      expect(
        f.db.query("SELECT run_s, rate, disk_rate FROM sandboxes").get(),
      ).toEqual({ run_s: 3600, rate: 1, disk_rate: 0.01 });
    }
    await Promise.all(f.pending);
  } finally {
    f.db.close();
  }
});

test("default vanilla estimate predicate and native sidebar honor uncertainty without hiding exact zero", async () => {
  const html = await readFile(
    resolve(import.meta.dirname, "../public/app.html"),
    "utf8",
  );
  const declaration = html.match(/^const sbxCostUnknown = .*;$/m)?.[0];
  if (!declaration) throw Error("Missing actual vanilla cost predicate");
  const unknown = new Function(`${declaration}; return sbxCostUnknown;`)();
  expect(unknown({ cost_unknown: true, created_at: 0 })).toBe(true);
  expect(unknown({ created_at: 0 })).toBe(false);
  expect(html).toContain('x.cost_unknown ? t("Estimativa indisponível")');
  const start = html.indexOf("function sbxHtml() {");
  const end = html.indexOf("\nfunction wireSbx()", start);
  expect(start).toBeGreaterThan(0);
  expect(end).toBeGreaterThan(start);
  // Execute the real default application's card renderer, with only document
  // surroundings stubbed. No mirrored estimate conditional substitutes for it.
  const render = new Function(
    "sbx",
    "S",
    "t",
    "esc",
    "icon",
    "SBX_STATE",
    "usd",
    `${html.slice(start, end)}; return sbxHtml();`,
  );
  const card = {
    id: "s",
    name: null,
    state: "paused",
    ready: true,
    cost: 0,
    created_at: 0,
    cost_unknown: true,
  };
  const markup = () =>
    render(
      {
        id: "room",
        connected: true,
        claude: true,
        list: [card],
        busy: "",
        logs: {},
      },
      { id: "room" },
      (value: string) => value,
      (value: unknown) => String(value ?? ""),
      () => "",
      { paused: "pausado" },
      (value: number) => `USD(${value})`,
    );
  expect(markup()).toContain(">Estimativa indisponível</span>");
  card.cost_unknown = false;
  expect(markup()).toContain(">USD(0)</span>");
  expect(
    sandboxCost(
      {
        id: "s",
        email: "a",
        name: null,
        state: "paused",
        run_s: 0,
        rate: 0,
        disk_rate: 0,
        checked_at: 0,
        created_at: 0,
        cost_unknown: true,
      },
      1000,
    ),
  ).toBeNull();
});
