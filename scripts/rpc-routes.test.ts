import { expect, test } from "bun:test";
import { Hono } from "hono";
import { uploadsApi as api, type ApiCtx, type ApiServices } from "../src/api";

// Exercise the real handlers/validators without Worker bindings or unchecked Env casts.
// Authentication middleware and persistence are separate Worker integration gates.
const conn = {
  id: "c1",
  title: "Mock",
  host: "mcp.example",
  scope: "room" as const,
  owner: "test@example.com",
  mine: true,
  created_at: 1,
  auth: "identity" as const,
  signed_in: true,
  apps: [],
  tools: [{ name: "t", description: "", read_only: true, app: false }],
  context: {},
};

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
    sandboxes: {
      list: async () => ({ connected: true, claude: false, sandboxes: [] }),
      create: async (_room, name) => {
        if (name === "boom") throw new Error("Limite de 3 sandboxes por sala.");
        return { id: "sb1", vm_id: "vm1", name: name || "auto" };
      },
      power: async (sid) =>
        sid === "mine"
          ? null
          : sid === "flaky"
            ? "502: freestyle down"
            : "not_found",
      setup: async (sid) => {
        if (sid !== "mine") throw new Error("not found");
        return { ok: true, log: "done" };
      },
      remove: async (sid) => sid === "mine",
      terminal: async (sid) =>
        sid === "mine" ? { token: "t", url: "wss://x" } : null,
    },
    allowUpload: async () => true,
    saveAvatar: async (type, bytes) => {
      saved.push({ table: "avatar", value: `${type}:${bytes.byteLength}` });
      return 7;
    },
    setRoomIcon: async (_room, img) => {
      if (img && img.type !== "image/png")
        throw new Error("Use PNG, JPEG, WebP, GIF ou ICO.");
      return img ? 9 : null;
    },
    me: async () => ({
      email: "test@example.com",
      name: null,
      avatar: null,
      books: [],
      friends: [],
      waits: [],
      v: "v1",
    }),
    connections: {
      list: async () => ({ connections: [conn] }),
      create: async (_room, b) =>
        b.token
          ? { error: "conexões não levam mais token", status: 400 }
          : { ok: true, connection: { ...conn, needs_sign_in: false } },
      remove: async (_room, cid) =>
        cid === "c1"
          ? { ok: true }
          : { error: "só quem conectou pode remover", status: 400 },
      refresh: async (_room, cid) =>
        cid === "c1"
          ? { ok: true, connection: conn }
          : { error: "conexão não encontrada", status: 404 },
      ui: async (_room, cid, tool) =>
        cid === "c1"
          ? { html: "<p>" + tool, tool: { name: tool } }
          : { error: "auth", status: 401, sign_in: true },
      call: async (_room, cid, name, args) =>
        cid === "c1"
          ? { result: { name, args } }
          : { error: "muitas chamadas no último minuto", status: 429 },
      context: async (_room, _cid, tool, text) => {
        saved.push({ table: "ctx", value: `${tool}:${text.length}` });
        return { ok: true };
      },
      signout: async () => ({ ok: true }),
    },
    checkFreestyleKey: async (key) =>
      key.startsWith("good") ? null : "401 unauthorized",
    grants: {
      list: async () => ({
        agents: [
          { id: "g1", client: "vibebook CLI", connected_at: 1, used_at: 2 },
          { id: "g0", client: "Claude", connected_at: 0 },
        ],
        last_used: 2,
      }),
      revoke: async (ids) => {
        saved.push({ table: "revoke", value: ids.join(",") });
        return ids.length;
      },
    },
    consentContext: async () => ({
      context: {
        client_name: "Claude",
        client_domain: null,
        redirect_host: "127.0.0.1",
        redirect_is_loopback: true,
        scope: ["vibebook"],
        email: "test@example.com",
        handle: "h1",
      },
      headers: [
        ["Set-Cookie", "__Host-oauth-consent-x=y; Path=/; Secure; HttpOnly"],
        ["Cache-Control", "no-store"],
      ],
    }),
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

test("sandboxes: members only, errors keep their old status and shape", async () => {
  const outsider = fixture({ isMember: async () => false });
  expect((await outsider.app.request("/api/books/room/sandboxes")).status).toBe(
    403,
  );
  expect((await outsider.json("/api/books/room/sandboxes", {})).status).toBe(
    403,
  );
  const f = fixture();
  expect(
    await (await f.app.request("/api/books/room/sandboxes")).json(),
  ).toEqual({ connected: true, claude: false, sandboxes: [] });
  expect(await (await f.json("/api/books/room/sandboxes", {})).json()).toEqual({
    ok: true,
    id: "sb1",
    vm_id: "vm1",
    name: "auto",
  });
  const limit = await f.json("/api/books/room/sandboxes", { name: "boom" });
  expect([limit.status, await limit.json()]).toEqual([
    400,
    { error: "Limite de 3 sandboxes por sala." },
  ]);
  expect((await f.json("/api/books/room/sandboxes", { name: 3 })).status).toBe(
    400,
  );
  const post = (path: string) => f.app.request(path, { method: "POST" });
  expect((await post("/api/sandboxes/mine/pause")).status).toBe(200);
  expect((await post("/api/sandboxes/other/start")).status).toBe(404);
  const down = await post("/api/sandboxes/flaky/pause");
  expect([down.status, await down.json()]).toEqual([
    502,
    { error: "502: freestyle down" },
  ]);
  expect(await (await post("/api/sandboxes/mine/setup")).json()).toEqual({
    ok: true,
    log: "done",
  });
  expect((await post("/api/sandboxes/other/setup")).status).toBe(502);
  expect(
    (await f.app.request("/api/sandboxes/other", { method: "DELETE" })).status,
  ).toBe(404);
  expect(
    (await f.app.request("/api/sandboxes/mine", { method: "DELETE" })).status,
  ).toBe(200);
  expect(await (await post("/api/sandboxes/mine/terminal")).json()).toEqual({
    token: "t",
    url: "wss://x",
  });
  expect((await post("/api/sandboxes/other/terminal")).status).toBe(404);
});

test("connections: members only, typed bodies, sign_in on 401, errors keep { error } and status", async () => {
  const outsider = fixture({ isMember: async () => false });
  expect(
    (await outsider.app.request("/api/books/room/connections")).status,
  ).toBe(403);
  expect(
    (await outsider.json("/api/books/room/connections/c1/call", { name: "x" }))
      .status,
  ).toBe(403);
  const f = fixture();
  expect(
    await (await f.app.request("/api/books/room/connections")).json(),
  ).toEqual({ connections: [conn] });
  const made = await f.json("/api/books/room/connections", {
    url: "https://mcp.example/mcp",
    scope: "room",
  });
  expect([made.status, (await made.json()).connection.needs_sign_in]).toEqual([
    200,
    false,
  ]);
  const tok = await f.json("/api/books/room/connections", {
    url: "https://x",
    token: "abc",
  });
  expect([tok.status, await tok.json()]).toEqual([
    400,
    { error: "conexões não levam mais token" },
  ]);
  expect((await f.json("/api/books/room/connections", { url: 3 })).status).toBe(
    400,
  );
  expect(
    (
      await f.app.request("/api/books/room/connections/c1", {
        method: "DELETE",
      })
    ).status,
  ).toBe(200);
  expect(
    (
      await f.app.request("/api/books/room/connections/c2", {
        method: "DELETE",
      })
    ).status,
  ).toBe(400);
  expect(
    (await f.json("/api/books/room/connections/c2/refresh", {})).status,
  ).toBe(404);
  expect(
    await (
      await f.app.request("/api/books/room/connections/c1/ui?tool=board")
    ).json(),
  ).toEqual({
    html: "<p>board",
    tool: { name: "board" },
  });
  const auth = await f.app.request(
    "/api/books/room/connections/c2/ui?tool=board",
  );
  expect([auth.status, await auth.json()]).toEqual([
    401,
    { error: "auth", sign_in: true },
  ]);
  expect(
    await (
      await f.json("/api/books/room/connections/c1/call", {
        name: "t",
        arguments: { a: 1 },
      })
    ).json(),
  ).toEqual({
    result: { name: "t", args: { a: 1 } },
  });
  expect(
    (await f.json("/api/books/room/connections/c2/call", { name: "t" })).status,
  ).toBe(429);
  expect(
    (
      await f.json("/api/books/room/connections/c1/context", {
        tool: "t",
        text: "x".repeat(5000),
      })
    ).status,
  ).toBe(200);
  expect(f.saved).toContainEqual({ table: "ctx", value: "t:4000" });
  expect(
    (await f.json("/api/books/room/connections/c1/signout", {})).status,
  ).toBe(200);
});

test("me: the home's one read, typed end to end", async () => {
  const f = fixture();
  const r = await f.app.request("/api/me");
  expect([r.status, (await r.json()).v]).toEqual([200, "v1"]);
});

test("avatar and room icon: same origin, type, size and rate limits keep their old answers", async () => {
  const f = fixture();
  const send = (path: string, type: string, body: BodyInit, origin?: string) =>
    f.app.request(path, {
      method: "POST",
      headers: { "content-type": type, ...(origin ? { origin } : {}) },
      body,
    });
  const png = new Uint8Array([137, 80, 78, 71]);
  expect(await (await send("/api/me/avatar", "image/png", png)).json()).toEqual(
    { ok: true, avatar: 7 },
  );
  expect(f.saved).toContainEqual({ table: "avatar", value: "image/png:4" });
  expect((await send("/api/me/avatar", "image/svg+xml", png)).status).toBe(415);
  expect(
    (await send("/api/me/avatar", "image/png", new Uint8Array(0))).status,
  ).toBe(413);
  expect(
    (await send("/api/me/avatar", "image/png", new Uint8Array(1_000_001)))
      .status,
  ).toBe(413);
  const crossSite = fixture({ sameOrigin: false });
  expect(
    (
      await crossSite.app.request("/api/me/avatar", {
        method: "POST",
        headers: { "content-type": "image/png" },
        body: png,
      })
    ).status,
  ).toBe(403);
  const limited = fixture({ allowUpload: async () => false });
  expect(
    (
      await limited.app.request("/api/me/avatar", {
        method: "POST",
        headers: { "content-type": "image/png" },
        body: png,
      })
    ).status,
  ).toBe(429);
  expect(
    await (await send("/api/books/room/icon", "image/png", png)).json(),
  ).toEqual({ ok: true, icon: 9 });
  expect(
    await (await send("/api/books/room/icon", "application/json", "{}")).json(),
  ).toEqual({ ok: true, icon: null });
  const bad = await send("/api/books/room/icon", "image/bmp", png);
  expect([bad.status, await bad.json()]).toEqual([
    400,
    { error: "Use PNG, JPEG, WebP, GIF ou ICO." },
  ]);
  const outsider = fixture({ isMember: async () => false });
  expect(
    (
      await outsider.app.request("/api/books/room/icon", {
        method: "POST",
        headers: { "content-type": "image/png" },
        body: png,
      })
    ).status,
  ).toBe(403);
});

test("global middleware answers (401 signed out, 403 cross-site) are typed by globalFailure", async () => {
  const { globalFailure } = await import("../svelte/lib/client/api");
  const { CROSS_SITE, UNAUTHENTICATED } = await import("../shared/schemas");
  expect(globalFailure({ status: 401 }, UNAUTHENTICATED)).toEqual({
    status: 401,
    error: "unauthenticated",
  });
  expect(globalFailure({ status: 403 }, CROSS_SITE)).toEqual({
    status: 403,
    error: "cross-site request refused",
  });
  expect(globalFailure({ status: 401 }, "<html>")).toEqual({
    status: 401,
    error: "HTTP 401",
  });
  expect(globalFailure({ status: 200 }, {})).toBeNull();
  expect(globalFailure({ status: 404 }, { error: "not found" })).toBeNull();
});

test("native raw-body adapters (icon, avatar) go through the typed routes and check the answers", async () => {
  const { createRoomApi, createAccountApi } =
    await import("../svelte/transport");
  const f = fixture();
  const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
    Promise.resolve(
      f.app.request(input instanceof Request ? input : String(input), init),
    );
  const room = createRoomApi("room", fetcher);
  const png = new Uint8Array([137, 80, 78, 71]);
  expect(await room.setIcon({ type: "image/png", body: png })).toEqual({
    ok: true,
    icon: 9,
  });
  expect(await room.setIcon(null)).toEqual({ ok: true, icon: null });
  await expect(room.setIcon({ type: "image/bmp", body: png })).rejects.toThrow(
    "Use PNG, JPEG, WebP, GIF ou ICO.",
  );
  const me = createAccountApi(fetcher);
  expect(await me.uploadAvatar({ type: "image/png", body: png })).toEqual({
    ok: true,
    avatar: 7,
  });
  await expect(
    me.uploadAvatar({ type: "image/svg+xml", body: png }),
  ).rejects.toThrow("Use uma imagem PNG, JPEG ou WebP.");
});

test("connected Claudes (OAuth grants): list, revoke a list, revoke one; bad bodies and other origins refused", async () => {
  const { app, json, saved } = fixture();
  const list = await app.request("/api/agents");
  expect(await list.json()).toEqual({
    agents: [
      { id: "g1", client: "vibebook CLI", connected_at: 1, used_at: 2 },
      { id: "g0", client: "Claude", connected_at: 0 },
    ],
    last_used: 2,
  });
  const r = await json("/api/agents/revoke", { ids: ["g0", "g1"] });
  expect(await r.json()).toEqual({ ok: true, removed: 2 });
  expect((await json("/api/agents/revoke", { ids: "g0" })).status).toBe(400);
  expect(
    (await app.request("/api/agents/g1", { method: "DELETE" })).status,
  ).toBe(200);
  expect(saved.filter((x) => x.table === "revoke").map((x) => x.value)).toEqual(
    ["g0,g1", "g1"],
  );
  const cross = fixture({ sameOrigin: false });
  expect((await cross.json("/api/agents/revoke", { ids: ["g0"] })).status).toBe(
    403,
  );
  expect(
    (await cross.app.request("/api/agents/g0", { method: "DELETE" })).status,
  ).toBe(403);
  expect(cross.saved).toHaveLength(0);
});

test("consent context: the page's facts and handle, the binding cookie passed on, refusals with the client's redirect", async () => {
  const { app } = fixture();
  const r = await app.request("/api/authorize/context?client_id=c");
  expect(r.status).toBe(200);
  expect(r.headers.get("set-cookie")).toContain("__Host-oauth-consent-x=y");
  expect(r.headers.get("cache-control")).toBe("no-store");
  expect((await r.json()).handle).toBe("h1");
  const refused = fixture({
    consentContext: async () => ({
      error: "unsupported_response_type",
      redirect_to: "http://127.0.0.1:9123/cb?error=x",
      status: 400,
    }),
  });
  const e = await refused.app.request("/api/authorize/context?client_id=c");
  expect(e.status).toBe(400);
  expect(await e.json()).toEqual({
    error: "unsupported_response_type",
    redirect_to: "http://127.0.0.1:9123/cb?error=x",
  });
  expect(e.headers.get("set-cookie")).toBeNull();
});
