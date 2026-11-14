// Pure owners and HTTP/SDK-boundary fixtures; not real OAuth/iframe/browser acceptance.
import { expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Room } from "../shared/room";
import type { Connection } from "../shared/schemas";
import {
  createAppsApi,
  AppsFailure,
  type AppsApi,
} from "../svelte/features/apps/api";
import { createAppsSession } from "../svelte/features/apps/session";
import { createAppRequests } from "../svelte/features/apps/requests";
import {
  roomApps,
  appIdentity,
  safeOpenLink,
} from "../svelte/features/apps/model";
import { decodeAppEnvelope } from "../svelte/features/apps/transport";
import { createRoomAppTools, toolOutput } from "../svelte/features/apps/tools";
import { deferred, manualClock, settle } from "./native-home-fixtures";
const connection: Connection = {
  id: "abcdef123456",
  title: "Server",
  host: "example.test",
  scope: "me",
  owner: "me@example.test",
  mine: true,
  created_at: 1,
  auth: "identity",
  signed_in: true,
  apps: [
    { tool: "screen", title: "Screen", description: "View", screen: true },
  ],
  tools: [{ name: "read", description: "Read", read_only: true, app: false }],
  context: {},
};
const room = (): Room => ({
  id: "aaaaaa",
  me: "me@example.test",
  book: { title: "Room", owner: "me@example.test" },
  members: ["me@example.test"],
  online: [],
  typing: {},
  messages: [],
  suggestions: [],
  epics: [
    {
      id: "epic",
      title: "Epic",
      archived: false,
      tasks: [{ id: "task", title: "Task", done: false, status: "todo" }],
    },
  ],
});
function api(extra: Partial<AppsApi> = {}): AppsApi {
  return {
    list: async () => ({ connections: [connection] }),
    create: async () => ({
      ok: true,
      connection: { ...connection, needs_sign_in: false },
    }),
    remove: async () => ({ ok: true }),
    refresh: async () => ({ ok: true, connection }),
    signout: async () => ({ ok: true }),
    ui: async () => ({ html: "<p>Remote UI</p>", tool: { name: "screen" } }),
    call: async () => ({ result: toolOutput("result") }),
    context: async () => ({ ok: true }),
    ...extra,
  };
}
test("room apps select newest exact filename versions, no absent-files crash or foreign filename projection", () => {
  const r = room();
  expect(roomApps(r)).toEqual([]);
  const file = {
    id: "a",
    name: "apps/demo.html",
    type: "text/html",
    size: 3,
    author: r.me,
    ts: 2,
  };
  r.files = [
    file,
    { ...file, id: "b", ts: 1 },
    { ...file, id: "c", name: "other/demo.html" },
    { ...file, id: "d", type: "image/png" },
  ];
  expect(roomApps(r).map((app) => app.file.id)).toEqual(["a"]);
  expect(
    appIdentity(r, [connection], { connection: "room", tool: "demo" }),
  ).toContain('"a"');
  expect(
    appIdentity(r, [], { connection: connection.id, tool: "screen" }),
  ).toBeNull();
  expect(safeOpenLink("javascript:alert(1)")).toBeNull();
  expect(safeOpenLink("https://user:pass@example.test")).toBeNull();
  expect(safeOpenLink("https://example.test/path")).toBe(
    "https://example.test/path",
  );
});
test("existing inferred HTTP routes preserve raw argument objects and validate returned runtime envelopes", async () => {
  const seen: { url: string; method: string; body: unknown }[] = [];
  const transport = createAppsApi("aaaaaa", async (input, init) => {
    const request = new Request(
      input instanceof Request
        ? input
        : new URL(String(input), "http://localhost"),
      init,
    );
    seen.push({
      url: request.url,
      method: request.method,
      body:
        request.method === "GET"
          ? null
          : await request.json().catch(() => null),
    });
    const path = new URL(request.url).pathname;
    return Response.json(
      path.endsWith("/call")
        ? { result: toolOutput("ok") }
        : path.endsWith("/ui")
          ? { html: "<p>UI</p>", tool: { name: "screen" } }
          : path.endsWith("/refresh")
            ? { ok: true, connection }
            : request.method === "GET"
              ? { connections: [connection] }
              : { ok: true },
    );
  });
  const signal = new AbortController().signal;
  await transport.list(signal);
  await transport.call(
    connection.id,
    "read",
    { nested: { value: "untrusted" } },
    signal,
  );
  await transport.ui(connection.id, "screen", signal);
  await transport.refresh(connection.id, signal);
  await transport.signout(connection.id, signal);
  await transport.remove(connection.id, signal);
  expect(seen.map((item) => item.method)).toEqual([
    "GET",
    "POST",
    "GET",
    "POST",
    "POST",
    "DELETE",
  ]);
  expect(seen[1].body).toEqual({
    name: "read",
    arguments: { nested: { value: "untrusted" } },
  });
  expect(seen[2].url).toContain("?tool=screen");
  const bad = createAppsApi("aaaaaa", async () =>
    Response.json({ connections: [{ token: "never accepted" }] }),
  );
  await expect(bad.list(signal)).rejects.toThrow("Invalid connection response");
  const denied = createAppsApi("aaaaaa", async () =>
    Response.json({ error: "sign in", sign_in: true }, { status: 401 }),
  );
  try {
    await denied.list(signal);
    throw Error("expected failure");
  } catch (error) {
    expect(error).toBeInstanceOf(AppsFailure);
    expect(error instanceof AppsFailure && error.signIn).toBe(true);
  }
});
test("late catalog/create results never navigate another owner; membership denial cannot be cleared by stale snapshots", async () => {
  const time = manualClock(),
    read = deferred<{ connections: Connection[] }>(),
    create = deferred<Awaited<ReturnType<AppsApi["create"]>>>();
  let current = true,
    navigations = 0;
  const owner = createAppsSession(
    api({ list: () => read.promise, create: () => create.promise }),
    {
      current: () => current,
      navigate: () => {
        navigations++;
      },
    },
    time.clock,
  );
  const r = room();
  owner.sync(r);
  owner.load();
  owner.draft("https://server.example.test/mcp", "room");
  owner.connect();
  owner.sync({ ...r, members: [] });
  owner.sync(r);
  read.resolve({ connections: [connection] });
  create.resolve({
    ok: true,
    connection: { ...connection, needs_sign_in: true },
  });
  await settle();
  expect(get(owner.state).room).toBeNull();
  expect(get(owner.state).connections).toBeNull();
  expect(navigations).toBe(0);
  expect(owner.current()).toBe(false);
  current = false;
  owner.dispose();
});
test("connection writes become explicitly unconfirmed at deadline with no automatic retry", async () => {
  const time = manualClock(),
    write = deferred<Awaited<ReturnType<AppsApi["create"]>>>();
  let calls = 0;
  const owner = createAppsSession(
    api({
      create: () => {
        calls++;
        return write.promise;
      },
    }),
    { current: () => true, navigate: () => {} },
    time.clock,
  );
  owner.sync(room());
  owner.draft("https://server.example.test/mcp", "me");
  owner.connect();
  time.advance(20_000);
  await settle();
  expect(get(owner.state)).toMatchObject({
    pending: false,
    unconfirmed: true,
    url: "https://server.example.test/mcp",
  });
  owner.connect();
  expect(calls).toBe(1);
  write.resolve({ ok: true, connection: null });
  await settle();
  expect(get(owner.state).unconfirmed).toBe(true);
  owner.dispose();
});
test("frame HTTP work has bounded ignored-abort disposal and no late successful result", async () => {
  const time = manualClock(),
    request = deferred<string>(),
    requests = createAppRequests(time.clock);
  let aborted = false;
  const result = requests.run((signal) => {
    signal.addEventListener("abort", () => (aborted = true));
    return request.promise;
  });
  let failure: unknown;
  const observed = result.catch((error: unknown) => {
    failure = error;
  });
  time.advance(20_000);
  await observed;
  expect(
    failure instanceof Error && failure.message.includes("unconfirmed"),
  ).toBe(true);
  expect(aborted).toBe(true);
  request.resolve("late");
  await settle();
  requests.dispose();
});
test("SDK envelope keeps large legitimate opaque document/tool arguments without deep traversal or undocumented caps", () => {
  const argumentsValue = {
    pages: Array.from({ length: 10000 }, (_, id) => ({
      id,
      text: "日本語".repeat(20),
    })),
    document: "x".repeat(500000),
  };
  const raw = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: { name: "update_document", arguments: argumentsValue },
  };
  const decoded = decodeAppEnvelope(raw);
  expect(decoded).not.toBeNull();
  expect(decoded && "params" in decoded && decoded.params?.arguments).toBe(
    argumentsValue,
  );
  expect(
    decodeAppEnvelope({ jsonrpc: "1.0", method: "tools/call" }),
  ).toBeNull();
  expect(decodeAppEnvelope([raw])).toBeNull();
});
test("room/embed tools preserve explicit cross-connection consent even for read-only remote tools", async () => {
  let asks = 0,
    calls = 0,
    authorized = true;
  const r = room();
  const tools = createRoomAppTools({
    room: () => r,
    current: () => authorized,
    name: (email) => email,
    t: (text) => text,
    ask: async () => {
      asks++;
      return false;
    },
    request: async () => ({ ok: true }),
    connections: async () => [connection],
    call: async () => {
      calls++;
      return toolOutput("private remote data");
    },
    metric: async () => ({}),
  });
  expect(
    (
      await tools("vibebook_call_connection", {
        connection_id: connection.id,
        tool: "read",
      })
    ).isError,
  ).toBe(true);
  expect(asks).toBe(1);
  expect(calls).toBe(0);
  authorized = false;
  expect((await tools("vibebook_read", {})).isError).toBe(true);
});
test("consent disposal/scope replacement cannot send a queued room mutation or claim success before correlated ACK", async () => {
  const answer = deferred<boolean>(),
    ack = deferred<{ ok: true }>();
  let current = true,
    writes = 0;
  const tools = createRoomAppTools({
    room,
    current: () => current,
    name: (email) => email,
    t: (text) => text,
    ask: () => answer.promise,
    request: () => {
      writes++;
      return ack.promise;
    },
    connections: async () => [],
    call: async () => toolOutput(""),
    metric: async () => ({}),
  });
  const pending = tools("vibebook_post", { text: "hello", thread: "main" });
  current = false;
  answer.resolve(true);
  expect((await pending).isError).toBe(true);
  expect(writes).toBe(0);
});
test("a successful command ACK with no canonical task change is reported unconfirmed, never added/moved", async () => {
  const r = room();
  let writes = 0;
  const tools = createRoomAppTools({
    room: () => r,
    current: () => true,
    name: (email) => email,
    t: (text) => text,
    ask: async () => true,
    request: async () => {
      writes++;
      return { ok: true };
    },
    connections: async () => [],
    call: async () => toolOutput(""),
    metric: async () => ({}),
  });
  expect(
    (await tools("vibebook_add_task", { title: "New task", epic_id: "epic" }))
      .isError,
  ).toBe(true);
  expect(
    (await tools("vibebook_task_status", { task_id: "task", status: "done" }))
      .isError,
  ).toBe(true);
  expect(writes).toBe(2);
});
test("opaque iframe policy requires exact live source, null origin and unchanged owner together", async () => {
  const { acceptsAppSource } =
    await import("../svelte/features/apps/transport");
  const source = {},
    other = {},
    frame = { window: source, connected: true, opaque: true };
  expect(acceptsAppSource(frame, { origin: "null", source }, true)).toBe(true);
  expect(
    acceptsAppSource(
      frame,
      { origin: "https://foreign.example.test", source },
      true,
    ),
  ).toBe(false);
  expect(acceptsAppSource(frame, { origin: "null", source: other }, true)).toBe(
    false,
  );
  expect(
    acceptsAppSource(
      { ...frame, connected: false },
      { origin: "null", source },
      true,
    ),
  ).toBe(false);
  expect(
    acceptsAppSource(
      { ...frame, opaque: false },
      { origin: "null", source },
      true,
    ),
  ).toBe(false);
  expect(acceptsAppSource(frame, { origin: "null", source }, false)).toBe(
    false,
  );
  expect(
    acceptsAppSource(
      { window: null, connected: true, opaque: true },
      { origin: "null", source: null },
      true,
    ),
  ).toBe(false);
});
test("old frame toolbar ownership cannot pin/reload a newly selected instance and malformed duplicate app names do not create duplicate keys", async () => {
  const { connectionApps } = await import("../svelte/features/apps/model");
  expect(
    connectionApps({
      ...connection,
      apps: [...connection.apps, ...connection.apps],
    }),
  ).toHaveLength(1);
  const owner = createAppsSession(api(), {
    current: () => true,
    navigate: () => {},
  });
  owner.sync(room());
  owner.load();
  await settle();
  owner.open({ connection: connection.id, tool: "screen" });
  const selected = get(owner.state).target,
    revision = get(owner.state).frameRevision;
  if (!selected) throw Error("fixture missing target");
  expect(owner.ownsTarget(selected, revision)).toBe(true);
  owner.reload();
  expect(owner.ownsTarget(selected, revision)).toBe(false);
  owner.back();
  owner.open({ connection: connection.id, tool: "screen" });
  expect(owner.ownsTarget(selected, revision)).toBe(false);
  owner.dispose();
});
test("consent buttons own immutable exact questions; an old A approval cannot approve unseen B", async () => {
  const { createAppConsent } = await import("../svelte/features/apps/consent");
  const consent = createAppConsent(() => true),
    a = consent.ask("A", "first"),
    b = consent.ask("B", "second");
  const first = get(consent.question);
  if (!first) throw Error("fixture missing question");
  expect(consent.choose(first, true)).toBe(true);
  const second = get(consent.question);
  if (!second) throw Error("fixture missing B");
  expect(second).not.toBe(first);
  expect(consent.choose(first, true)).toBe(false);
  expect(await a).toBe(true);
  expect(get(consent.question)).toBe(second);
  consent.cancel();
  expect(await b).toBe(false);
  expect(consent.choose(second, true)).toBe(false);
  consent.dispose();
});
test("opaque room reads use the same private ask/parent/permission-reply visibility projection as native Chat", async () => {
  const { roomRead } = await import("../svelte/features/apps/tools");
  const r = room();
  const own = {
    id: 4,
    author: r.me,
    kind: "agent" as const,
    thread: "main",
    ts: 4,
    text: "⏸ Seu Claude permission",
    choices: '{"options":["Aprovar","Negar"]}',
  };
  const foreign = {
    ...own,
    id: 2,
    author: "foreign@example.test",
    text: "⏸ Seu Claude PRIVATE",
  };
  r.origins = [{ ...foreign, id: 8 }];
  r.messages = [
    { id: 1, author: r.me, thread: "main", ts: 1, text: "public" },
    foreign,
    {
      id: 3,
      author: r.me,
      thread: "main",
      ts: 3,
      text: "private parent reply",
      reply_to: 2,
    },
    own,
    {
      id: 5,
      author: r.me,
      thread: "main",
      ts: 5,
      text: "Aprovar",
      reply_to: 4,
    },
    {
      id: 6,
      author: r.me,
      thread: "main",
      ts: 6,
      text: "private origin reply",
      reply_to: 8,
    },
  ];
  expect(
    roomRead(r, {}, (email) => email).messages.map((message) => message.id),
  ).toEqual([1, 4]);
  expect(r.messages).toHaveLength(6);
});
test("connection endpoint membership403 latches authority; metrics403/bad-Origin403 do not revoke membership", async () => {
  const { createAppsAuthority, appMembershipFailure } =
    await import("../svelte/features/apps/authority");
  const { createAppMetrics } = await import("../svelte/features/apps/api");
  const signal = new AbortController().signal;
  const authority = createAppsAuthority(() => true);
  let cancelled = 0;
  authority.listen(() => {
    cancelled++;
  });
  const metrics = createAppMetrics(async () =>
    Response.json({ error: "forbidden" }, { status: 403 }),
  );
  await expect(metrics("spend", "aaaaaa", false, signal)).rejects.toThrow(
    "forbidden",
  );
  expect(authority.current()).toBe(true);
  const badOrigin = createAppsApi("aaaaaa", async () =>
    Response.json({ error: "bad origin" }, { status: 403 }),
  );
  await expect(
    badOrigin
      .list(signal)
      .catch((error) => appMembershipFailure(authority, error)),
  ).rejects.toThrow("bad origin");
  expect(authority.current()).toBe(true);
  const denied = createAppsApi("aaaaaa", async () =>
    Response.json({ error: "forbidden" }, { status: 403 }),
  );
  await expect(
    denied
      .list(signal)
      .catch((error) => appMembershipFailure(authority, error)),
  ).rejects.toThrow("forbidden");
  expect(authority.current()).toBe(false);
  expect(cancelled).toBe(1);
  expect(authority.denied()).toBe(true);
  authority.dispose();
});
test("app pin ACK waits for canonical state and late canonical confirmation settles missing-ACK uncertainty", async () => {
  const { createAppPinOwner } = await import("../svelte/features/apps/pin");
  const time = manualClock(),
    owner = createAppPinOwner(() => true, time.clock),
    r = room();
  let writes = 0;
  owner.sync(r);
  owner.toggle("demo", async () => {
    writes++;
    return { ok: true };
  });
  await settle();
  expect(get(owner.state).phase).toBe("waiting");
  time.advance(10_000);
  expect(get(owner.state).phase).toBe("unconfirmed");
  owner.toggle("demo", async () => {
    writes++;
    return { ok: true };
  });
  expect(writes).toBe(1);
  owner.sync({
    ...r,
    pins: [
      {
        id: "pin",
        kind: "app",
        ref: "demo",
        title: "Demo",
        author: r.me,
        ts: 1,
      },
    ],
  });
  expect(get(owner.state).phase).toBe("idle");
  owner.dispose();
});
test("global unauthenticated401 clears frame authority even through metrics; remote sign_in401 stays a server sign-in flow", async () => {
  const { createAppsAuthority, appMembershipFailure, appSessionFailure } =
    await import("../svelte/features/apps/authority");
  const { createAppMetrics } = await import("../svelte/features/apps/api");
  const { UNAUTHENTICATED } = await import("../shared/schemas");
  const signal = new AbortController().signal,
    authority = createAppsAuthority(() => true);
  const remote = createAppsApi("aaaaaa", async () =>
    Response.json({ error: "unauthenticated", sign_in: true }, { status: 401 }),
  );
  await expect(
    remote
      .list(signal)
      .catch((error) => appMembershipFailure(authority, error)),
  ).rejects.toThrow("unauthenticated");
  expect(authority.current()).toBe(true);
  const metrics = createAppMetrics(async () =>
    Response.json(UNAUTHENTICATED, { status: 401 }),
  );
  await expect(
    metrics("spend", "aaaaaa", false, signal).catch((error) =>
      appSessionFailure(authority, error),
    ),
  ).rejects.toThrow("unauthenticated");
  expect(authority.current()).toBe(false);
  authority.dispose();
});
