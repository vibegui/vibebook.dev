import { expect, test } from "bun:test";
import { Hono } from "hono";
import { agentsApi as api, type ApiCtx, type ApiServices } from "../src/api";

// Exercise the real handlers/validators without Worker bindings or unchecked Env casts.
// Authentication middleware and persistence are separate Worker integration gates.
function fixture(overrides: Partial<ApiServices> = {}) {
  const writes: { query: string; values: (string | number | null)[] }[] = [];
  const posted: { room: string; text: string; thread: string }[] = [];
  const uploaded: { room: string; type: string; size: number; name: string }[] =
    [];
  const saved: { table: string; value: string }[] = [];
  const svc: ApiServices = {
    isMember: async () => true,
    humanPost: async (room, text, thread) => {
      posted.push({ room, text, thread });
      return text.trim()
        ? { ok: true, id: 42, thread }
        : { ok: false, error: "empty" };
    },
    storeFile: async (room, type, body, name) => {
      if (body.byteLength > 4) throw new Error("too large");
      uploaded.push({ room, type, size: body.byteLength, name });
      return {
        id: "file",
        name,
        type,
        size: body.byteLength,
        author: "test@example.com",
        ts: 1,
      };
    },
    fileTypes: ["text/plain"],
    maxBytes: () => 4,
    sizeError: () => "too large",
    typesError: "unsupported type",
    sql: async (query, ...values) => {
      writes.push({ query, values });
    },
    sqlBatch: async (query, rows) => {
      writes.push(...rows.map((values) => ({ query, values })));
    },
    track: () => {},
    pokeMe: () => {},
    vapidKey: "public-key",
    pushToMe: async () => 1,
    sqlAll: async () => [],
    search: async () => ({ rooms: 0, epics: [], messages: [] }),
    loginProviders: { google: false, github: false },
    isEmail: (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value),
    befriend: async () => {},
    invite: async () => {},
    removeMember: async () => null,
    pokeAgents: () => {},
    requestAccess: async () => "asked",
    decideRequest: async () => true,
    createRoom: async () => "room",
    startRoom: async () => ({ id: "room" }),
    routeHome: async () => ({ pick: null }),
    sameOrigin: true,
    allowSecretTry: async () => true,
    saveSecret: async (table, value) => {
      saved.push({ table, value });
    },
    listenFresh: 720_000,
    checkFreestyleKey: async (key) =>
      key.startsWith("good") ? null : "401 unauthorized",
    ...overrides,
  };
  const app = new Hono<ApiCtx>()
    .use("*", async (c, next) => {
      c.set("email", "test@example.com");
      c.set("svc", svc);
      await next();
    })
    .route("/", api);
  const json = (path: string, value: unknown) =>
    app.request(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(value),
    });
  return { app, json, writes, posted, uploaded, saved };
}

test("post validates HTTP input and preserves success and business-error responses", async () => {
  const f = fixture();
  const success = await f.json("/api/books/room/post", {
    text: "hello",
    thread: "epic",
  });
  expect(success.status).toBe(200);
  expect(await success.json()).toEqual({ ok: true, id: 42, thread: "epic" });
  const empty = await f.json("/api/books/room/post", { text: " " });
  expect(empty.status).toBe(400);
  expect(await empty.json()).toEqual({ ok: false, error: "empty" });
  for (const payload of [
    null,
    [],
    {},
    { text: 42 },
    { text: "hello", thread: 42 },
  ]) {
    expect((await f.json("/api/books/room/post", payload)).status).toBe(400);
  }
  const malformed = await f.app.request("/api/books/room/post", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{",
  });
  expect(malformed.status).toBe(400);
  expect(f.posted).toEqual([
    { room: "room", text: "hello", thread: "epic" },
    { room: "room", text: " ", thread: "main" },
  ]);
});

test("room operations reject nonmembers before any write", async () => {
  const f = fixture({ isMember: async () => false });
  for (const [path, body] of [
    ["post", { text: "forbidden" }],
    ["archive", { archived: true }],
    ["tint", { tint: "blue" }],
  ] as const) {
    expect((await f.json(`/api/books/room/${path}`, body)).status).toBe(403);
  }
  const upload = await f.app.request("/api/books/room/files", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: "hi",
  });
  expect(upload.status).toBe(403);
  expect(f.writes).toHaveLength(0);
  expect(f.posted).toHaveLength(0);
  expect(f.uploaded).toHaveLength(0);
});

test("binary upload validates metadata, encoded names and limits", async () => {
  const f = fixture();
  const request = (
    type: string,
    name: string,
    content: string,
    length?: string,
  ) =>
    f.app.request("/api/books/room/files", {
      method: "POST",
      headers: {
        "content-type": type,
        "x-filename": name,
        ...(length === undefined ? {} : { "content-length": length }),
      },
      body: content,
    });
  const result = await request("text/plain; charset=utf-8", "a%20b.txt", "hi");
  expect(result.status).toBe(200);
  expect(await result.json()).toEqual({
    id: "file",
    name: "a b.txt",
    type: "text/plain",
    size: 2,
    author: "test@example.com",
    ts: 1,
  });
  expect((await request("image/svg+xml", "bad.svg", "x")).status).toBe(415);
  expect((await request("text/plain", "large.txt", "large", "5")).status).toBe(
    413,
  );
  // An absent/incorrect content-length must still hit storage's actual-byte limit.
  expect((await request("text/plain", "large.txt", "large")).status).toBe(400);
  expect((await request("text/plain", "%ZZ", "hi")).status).toBe(400);
  expect(f.uploaded).toEqual([
    { room: "room", type: "text/plain", size: 2, name: "a b.txt" },
  ]);
});

test("push settings expose the public key and validate subscription writes", async () => {
  const f = fixture();
  const key = await f.app.request("/api/push/key");
  expect(key.status).toBe(200);
  expect(await key.json()).toEqual({ key: "public-key" });
  for (const payload of [
    { endpoint: "http://bad", p256dh: "k", auth: "a" },
    { endpoint: "https://push", p256dh: "k" },
  ]) {
    expect((await f.json("/api/push/subscribe", payload)).status).toBe(400);
  }
  expect(f.writes).toHaveLength(0);
  expect(
    (
      await f.json("/api/push/subscribe", {
        endpoint: "https://push",
        p256dh: "k",
        auth: "a",
      })
    ).status,
  ).toBe(200);
  expect(
    (await f.json("/api/push/unsubscribe", { endpoint: "https://push" }))
      .status,
  ).toBe(200);
  expect(
    f.writes.every((write) => write.values.includes("test@example.com")),
  ).toBe(true);
  const sent = await f.json("/api/push/test", {});
  expect(sent.status).toBe(200);
  expect(await sent.json()).toEqual({ ok: true, sent: 1 });
});

test("room and wait mutations validate inputs and scope writes to the signed-in person", async () => {
  const f = fixture();
  for (const [path, value] of [
    ["/api/books/room/archive", { archived: "no" }],
    ["/api/books/room/tint", { tint: 1 }],
    ["/api/rooms/order", { ids: [] }],
    ["/api/waits/resolve", { book_id: "room", ref: "t1" }],
  ] as const)
    expect((await f.json(path, value)).status).toBe(400);
  expect(f.writes).toHaveLength(0);
  for (const [path, value] of [
    ["/api/books/room/archive", { archived: false }],
    ["/api/books/room/tint", { tint: "blue" }],
    ["/api/rooms/order", { ids: ["room", "other"] }],
    ["/api/waits/resolve", { book_id: "room", ref: "m1" }],
  ] as const)
    expect((await f.json(path, value)).status).toBe(200);
  expect(f.writes).toHaveLength(5);
  expect(
    f.writes.every((write) => write.values.includes("test@example.com")),
  ).toBe(true);
});

test("freestyle key and Claude token: validated, checked, sealed, never echoed back", async () => {
  const f = fixture();
  const status = await f.app.request("/api/freestyle");
  expect(await status.json()).toEqual({ connected: false });
  expect((await f.json("/api/freestyle", { key: "short" })).status).toBe(400);
  const refused = await f.json("/api/freestyle", {
    key: "bad-key-0123456789abcdef",
  });
  expect(refused.status).toBe(400);
  expect(await refused.json()).toEqual({
    error: "O freestyle recusou a key: 401 unauthorized",
  });
  const accepted = await f.json("/api/freestyle", {
    key: "  good-key-0123456789abcdef  ",
  });
  expect(await accepted.json()).toEqual({ ok: true });
  expect((await f.json("/api/claude-token", { token: "nope" })).status).toBe(
    400,
  );
  const wrapped = await f.json("/api/claude-token", {
    token: "sk-ant-oat01-abcdefghij\n  klmnopqrstuvwxyz",
  });
  expect(await wrapped.json()).toEqual({ ok: true });
  expect(f.saved).toEqual([
    { table: "freestyle_keys", value: "good-key-0123456789abcdef" },
    {
      table: "claude_tokens",
      value: "sk-ant-oat01-abcdefghijklmnopqrstuvwxyz",
    },
  ]);
  for (const path of ["/api/freestyle", "/api/claude-token"])
    expect((await f.app.request(path, { method: "DELETE" })).status).toBe(200);
  expect(f.writes.map((w) => w.values)).toEqual([
    ["test@example.com"],
    ["test@example.com"],
  ]);
  const limited = fixture({ allowSecretTry: async () => false });
  expect(
    (await limited.json("/api/claude-token", { token: "sk-ant-x" })).status,
  ).toBe(429);
  expect(limited.saved).toHaveLength(0);
});

test("room agents: members only, listening and context derived from the rows, bad limits JSON dropped", async () => {
  const now = Date.now();
  const rows = (claude: boolean) => async (query: string) =>
    query.includes("FROM members WHERE")
      ? claude
        ? [{ claude_on: 1 }]
        : []
      : query.includes("FROM sandboxes")
        ? [
            {
              id: "s1",
              email: "a@x.co",
              name: "box",
              state: "running",
              run_s: 60,
              rate: 0.1,
              disk_rate: 0.01,
              checked_at: now,
              created_at: now,
            },
          ]
        : [
            {
              email: "a@x.co",
              who: "claude-opus-5-5",
              repo: "vb",
              seen_at: now,
              listening_at: now - 1000,
              listen_room: "room",
              ctx_tokens: 500,
              ctx_window: 1000,
              ctx_at: now,
              ctx_limits: '{"five_hour":{"p":40,"r":1}}',
            },
            {
              email: "b@x.co",
              who: null,
              repo: null,
              seen_at: now,
              listening_at: now - 3_600_000,
              listen_room: null,
              ctx_tokens: 1,
              ctx_window: 2,
              ctx_at: now,
              ctx_limits: "{bad",
            },
          ];
  const outsider = fixture({ sqlAll: rows(false) });
  expect((await outsider.app.request("/api/books/room/agents")).status).toBe(
    403,
  );
  const f = fixture({ sqlAll: rows(true) });
  const res = await f.app.request("/api/books/room/agents");
  expect(res.status).toBe(200);
  const body = (await res.json()) as {
    claude_on: boolean;
    sandboxes: unknown[];
    agents: {
      who: string;
      listening: boolean;
      all_rooms: boolean;
      context: { limits: unknown } | null;
    }[];
  };
  expect(body.claude_on).toBe(true);
  expect(body.sandboxes).toHaveLength(1);
  expect(body.agents.map((a) => [a.who, a.listening, a.all_rooms])).toEqual([
    ["claude-opus-5-5", true, false],
    ["agent", false, true],
  ]);
  expect(body.agents[0].context?.limits).toEqual({
    five_hour: { p: 40, r: 1 },
  });
  expect(body.agents[1].context?.limits).toBeNull();
});
