import { expect, mock, test } from "bun:test";
// src/services.ts reaches modules that import the Workers runtime; the bits they name are enough here.
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { meFor } = await import("../src/services");
import type { Env } from "../src/index";

// GET /api/me's cache in the Person DO (src/person.ts), with a fake DO and a fake D1 that counts reads.
function fakeEnv(cached: unknown) {
  let gen = 3;
  let stored: string | null =
    cached === undefined ? null : JSON.stringify(cached);
  const reads: string[] = [];
  const person = {
    async fetch(url: string, init?: RequestInit) {
      if (init?.method === "PUT") {
        if (Number(new Headers(init.headers).get("x-gen")) === gen)
          stored = String(init.body);
        return new Response(null, { status: 204 });
      }
      return stored
        ? new Response(stored, { headers: { "x-gen": String(gen) } })
        : new Response(null, {
            status: 404,
            headers: { "x-gen": String(gen) },
          });
    },
  };
  const rows = (sql: string): unknown[] =>
    sql.includes("FROM books")
      ? [
          {
            id: "r1",
            title: null,
            folder: null,
            summary: null,
            updated_at: 5,
            created_at: null,
            icon: null,
            busy_until: null,
            position: null,
            tint: null,
            opened_at: null,
            last_human_id: 0,
            last_agent_id: 0,
            read_id: 0,
            sandboxes_running: 0,
            members: "a@x.com",
          },
        ]
      : sql.includes("FROM friends")
        ? [
            {
              email: "b@x.com",
              name: null,
              avatar: null,
              joined: 1,
              shared: 2,
            },
            { email: null, name: null, avatar: null, joined: 0, shared: 0 },
          ]
        : sql.includes("FROM waits")
          ? [
              {
                book_id: "r1",
                room: null,
                ref: "m1",
                thread: null,
                topic: null,
                author: "b@x.com",
                author_name: null,
                text: null,
                ts: 9,
              },
            ]
          : [];
  const DB = {
    prepare(sql: string) {
      const st = {
        bind: () => st,
        all: async () => (reads.push(sql), { results: rows(sql) }),
        first: async () => (
          reads.push(sql),
          { name: "A", avatar: null, lang: "pt" }
        ),
        run: async () => ({}),
      };
      return st;
    },
  };
  const env = {
    DB,
    PEOPLE: { idFromName: (x: string) => x, get: () => person },
    ASSETS: {
      fetch: async () => new Response(null, { headers: { etag: '"v9"' } }),
    },
  } as unknown as Env;
  return { env, reads, stored: () => stored, bump: () => gen++ };
}
const ctx = { waitUntil: (p: Promise<unknown>) => void p };
const req = new Request("https://vibebook.dev/api/me", {
  headers: { cookie: "vb_lang=pt" },
});
const flush = () => new Promise((r) => setTimeout(r, 0));

test("an off-schema cache is recomputed, replaced, and the next request skips D1", async () => {
  const f = fakeEnv({ email: "a@x.com", books: "old shape" });
  const first = await meFor(f.env, ctx, "a@x.com", req);
  await flush();
  expect(first.cached).toBeUndefined();
  expect(f.reads.length).toBeGreaterThan(0);
  // Legacy nulls get neutral values; a row that can't be fixed (friend with no email) is dropped, never served.
  expect(first.books[0]!.title).toBeNull();
  expect(first.friends.map((x) => x.email)).toEqual(["b@x.com"]);
  expect(first.waits[0]).toMatchObject({ room: "", thread: "main", text: "" });
  expect(JSON.parse(f.stored()!).books).toHaveLength(1);
  const before = f.reads.length;
  const second = await meFor(f.env, ctx, "a@x.com", req);
  expect(second.cached).toBe(true);
  expect(second.v).toBe("v9");
  expect(f.reads.length).toBe(before);
});

test("an answer computed before a poke is not stored after it (race guard kept)", async () => {
  const f = fakeEnv(undefined);
  const p = meFor(f.env, ctx, "a@x.com", req);
  f.bump(); // a change lands while D1 is being read
  await p;
  await flush();
  expect(f.stored()).toBeNull();
});
