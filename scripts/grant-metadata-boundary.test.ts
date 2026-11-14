import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import type { AgentGrantsResult } from "../shared/schemas";
import { grantMetadata } from "../src/grantMetadata";

test("historical and malformed OAuth metadata cannot supply a grant lookup or client label", () => {
  for (const value of [undefined, null, false, 42, "client", [], ["gid"]]) {
    expect(grantMetadata(value)).toEqual({});
  }
  for (const value of [null, false, 42, [], { secret: "not a label" }]) {
    expect(grantMetadata({ gid: value, client: value })).toEqual({
      gid: undefined,
      client: undefined,
    });
  }
});

test("recognized fields preserve existing identifiers, labels and fallback semantics independently", () => {
  expect(
    grantMetadata({ gid: "grant-1", client: "Claude", other: "ignored" }),
  ).toEqual({ gid: "grant-1", client: "Claude" });
  expect(grantMetadata({ gid: "", client: "" })).toEqual({
    gid: undefined,
    client: "",
  });
  expect(grantMetadata({ gid: "grant-2", client: {} })).toEqual({
    gid: "grant-2",
    client: undefined,
  });
  expect(grantMetadata({ client: "Historical agent" })).toEqual({
    gid: undefined,
    client: "Historical agent",
  });
});

test("actual grant listing binds only recognized IDs and handles prototype-named IDs without inherited last-use values", async () => {
  const text = readFileSync(
    new URL("../src/connect.ts", import.meta.url),
    "utf8",
  );
  const start = text.indexOf("export function grantOps(");
  if (start < 0) throw Error("Actual grant listing missing");
  const source = new Bun.Transpiler({ loader: "ts" })
    .transformSync(text.slice(start))
    .replace("export ", "");
  const queries: { sql: string; values: unknown[] }[] = [];
  const grants = [
    { id: "historical", clientId: "client-old", createdAt: 1 },
    {
      id: "live",
      clientId: "client-live",
      createdAt: 2,
      metadata: { gid: "live", client: "Claude" },
    },
    {
      id: "bad",
      clientId: "client-fallback",
      createdAt: 3,
      metadata: { gid: {}, client: [] },
    },
    {
      id: "proto",
      clientId: "client-proto",
      createdAt: 4,
      metadata: { gid: "__proto__", client: "" },
    },
    {
      id: "constructor",
      clientId: "client-constructor",
      createdAt: 5,
      metadata: { gid: "constructor" },
    },
  ];
  const env = {
    OAUTH_PROVIDER: {
      listUserGrants: async (email: string) => {
        expect(email).toBe("person@example.test");
        return { items: grants };
      },
    },
    DB: {
      prepare(sql: string) {
        return {
          bind(...values: unknown[]) {
            queries.push({ sql, values });
            return this;
          },
          first: async () => ({ ts: 100 }),
          all: async () => ({ results: [{ gid: "live", ts: 25 }] }),
        };
      },
    },
  };
  const create: (
    environment: typeof env,
    ctx: { waitUntil(p: Promise<unknown>): void },
    email: string,
  ) => { list(): Promise<AgentGrantsResult> } = new Function(
    "grantMetadata",
    "track",
    source + ";return grantOps;",
  )(grantMetadata, () => {
    throw Error("Listing must not track a write");
  });
  const result = await create(
    env,
    {
      waitUntil() {
        throw Error("Listing must not schedule work");
      },
    },
    "person@example.test",
  ).list();
  expect(result).toEqual({
    agents: [
      {
        id: "historical",
        client: "client-old",
        connected_at: 1000,
        used_at: undefined,
      },
      { id: "live", client: "Claude", connected_at: 2000, used_at: 25 },
      {
        id: "bad",
        client: "client-fallback",
        connected_at: 3000,
        used_at: undefined,
      },
      { id: "proto", client: "", connected_at: 4000, used_at: null },
      {
        id: "constructor",
        client: "client-constructor",
        connected_at: 5000,
        used_at: null,
      },
    ],
    last_used: 100,
  });
  const lookup = queries.filter((q) => q.sql.includes("FROM grant_seen"));
  expect(lookup).toHaveLength(1);
  expect(lookup[0].values).toEqual([
    JSON.stringify(["live", "__proto__", "constructor"]),
  ]);
});
