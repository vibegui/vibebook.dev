import { expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Room, RoomEvent } from "../shared/room";
import type { CommandOutcome } from "../shared/commands";
import type { RootConnection } from "../svelte/features/root-room/session";
import type { RoomConnectionOptions } from "../svelte/roomConnection";
import type { AgentsApi } from "../svelte/features/agents/api";
import { createApplicationServices } from "../svelte/features/application/services";
import { HomeFailure } from "../svelte/features/home/api";
import type { ApplicationRoomAdapter, ApplicationRoomIntent } from "../svelte/features/application/types";
import { homeApi, me, manualClock, settle, deferred } from "./native-home-fixtures";

function canonical(id = "aaaaaa", account = "me@test.com"): Room {
  return { id, me: account, book: { title: id, owner: account }, members: [account], messages: [], epics: [], typing: {}, online: [], suggestions: [] };
}
function event(room: Room): RoomEvent {
  const { id: _id, typing: _typing, ...state } = room;
  return { t: "state", ...state };
}
function fixture(initial = "http://vb.test/app") {
  const timer = manualClock();
  let href = initial, currentMe = me(), pop = () => {}, visible = () => {}, now = 0, meFailure: Error | null = null;
  let onDocumentNavigation = () => {};
  let popStops = 0, visibleStops = 0, identityResets = 0, pwaDisposals = 0, posts = 0;
  const queued: (() => void)[] = [], accounts: string[] = [], history: string[] = [], documentNavigations: string[] = [];
  const connections: { callbacks: RoomConnectionOptions; connection: RootConnection; disposed: number; commands: unknown[] }[] = [];
  const channels: { options: Parameters<typeof import("../svelte/features/home/connection").createPersonalConnection>[0]; disposed: number }[] = [];
  const cleanup = deferred<{ local: boolean; settled: boolean; confirmed: boolean }>();
  const agentsApi: AgentsApi = {
    identity: async () => currentMe.email,
    grants: async () => ({ agents: [], last_used: null }), revoke: async () => ({ ok: true, removed: 0 }),
    room: async () => ({ claude_on: false, agents: [], sandboxes: [] }), toggle: async (_id, on) => ({ ok: true, claude_on: on }),
    sandboxes: async () => ({ connected: true, claude: true, sandboxes: [] }),
    create: async () => ({ ok: true, id: "new", vm_id: "vm", name: "new" }), power: async () => ({ ok: true }), setup: async () => ({ ok: true, log: "" }), remove: async () => ({ ok: true }),
    terminal: async () => ({ url: "wss://api.freestyle.sh/v5/vms/vm/pty", token: "fixture" }),
    connected: async () => ({ connected: true }), saveKey: async () => ({ ok: true }), removeKey: async () => ({ ok: true }), saveToken: async () => ({ ok: true }), removeToken: async () => ({ ok: true }),
  };
  const services = createApplicationServices({
    browser: {
      origin: "http://vb.test", href: () => href,
      history: { pushState(_data, _unused, url) { href = new URL(String(url), href).href; history.push(href); }, replaceState(_data, _unused, url) { href = new URL(String(url), href).href; } },
      socketUrl: path => `ws://vb.test${path}`,
      visible: () => true,
      listenVisibility(callback) { visible = callback; return () => { visibleStops++; }; },
      listenPop(callback) { pop = callback; return () => { popStops++; }; },
      enqueue: callback => queued.push(callback), navigateDocument: url => { documentNavigations.push(url); onDocumentNavigation(); }, reload: () => documentNavigations.push("reload"),
      logoutPost: async () => { posts++; return { ok: true }; }, logoutWarning: () => {}, logoutFailure: () => {}, shellVersion: "development",
      clock: { ...timer.clock, now: () => now },
    },
    pwa: () => ({ account: value => { accounts.push(value); }, beforeLogout: () => cleanup.promise, dispose: () => { pwaDisposals++; } }),
    homeApi: homeApi({ me: async () => { if (meFailure) throw meFailure; return currentMe; } }), agentsApi,
    runnerFetch: async (input, init) => { expect(String(input).startsWith("http://127.0.0.1:47321/")).toBe(true); expect(init?.credentials).toBe("omit"); return new Response("null", { headers: { "content-type": "application/json" } }); },
    accountApi: { logins: async () => ({ logins: [], providers: { google: false, github: false } }), name: async name => ({ ok: true, name }), avatar: async () => ({ ok: true, avatar: 1 }), addFriend: async () => ({ ok: true }), removeFriend: async () => ({ ok: true }) },
    onIdentityReset: () => { identityResets++; },
    roomConnection(callbacks) {
      const entry: { callbacks: RoomConnectionOptions; disposed: number; commands: unknown[] } = { callbacks, disposed: 0, commands: [] };
      const connection: RootConnection = { start() {}, dispose() { entry.disposed++; }, resync() {}, send(command) { entry.commands.push(command); return true; }, request(command): Promise<CommandOutcome> { entry.commands.push(command); return Promise.resolve({ ok: true }); } };
      connections.push({ ...entry, connection, get disposed() { return entry.disposed; } });
      return connection;
    },
    personalConnection(options) {
      const entry = { options, disposed: 0 }; channels.push(entry);
      return { start() {}, restart() {}, dispose() { entry.disposed++; } };
    },
  });
  return { services, connections, channels, history, documentNavigations, queued, accounts, cleanup,
    identityResets: () => identityResets, posts: () => posts, disposals: () => pwaDisposals,
    stops: () => ({ pop: popStops, visibility: visibleStops }),
    canonical(next: ReturnType<typeof me>) { currentMe = next; },
    failMe(error: Error) { meFailure = error; }, beforeDocumentNavigation(callback: () => void) { onDocumentNavigation = callback; },
    pop(url: string) { href = url; pop(); }, visible: () => visible(),
    advance(ms: number) { now += ms; timer.advance(ms); },
    flushQueued() { for (const callback of queued.splice(0)) callback(); },
  };
}
function adapter() {
  const targets: ApplicationRoomIntent[] = [], resets: string[] = [];
  let before = 0;
  const owner: ApplicationRoomAdapter = { beforeNavigation() { before++; }, reset: reason => resets.push(reason), consumePop: () => false, deferNavigation: () => false, onTarget: intent => targets.push(intent), onTransition() {}, onTerminal() {} };
  return { owner, targets, resets, before: () => before };
}

test("application starts one account/channel and disposes every document listener once", async () => {
  const h = fixture();
  expect(h.channels).toHaveLength(0);
  h.services.start(); h.services.start(); await settle();
  expect(h.channels).toHaveLength(1);
  expect(h.services.pwa).toBe(h.services.pwa);
  expect(get(h.services.state).availableVersion).toBeNull();
  h.services.dispose(); h.services.dispose();
  h.channels[0]!.options.onConnected?.(); h.visible(); h.pop("http://vb.test/b/aaaaaa");
  expect(h.connections).toHaveLength(0);
  expect(h.channels[0]!.disposed).toBe(1);
  expect(h.disposals()).toBe(1);
  expect(h.stops()).toEqual({ pop: 1, visibility: 1 });
});

test("initial deep file intent waits for canonical room and late RoomShell attachment, then replays once", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte#fabcdef");
  h.services.start(); await settle();
  expect(h.services.roomScope()).toBeNull();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const shell = adapter(), scope = h.services.roomScope()!;
  const detach = h.services.attachRoom(scope, shell.owner);
  expect(shell.targets).toHaveLength(1);
  expect(shell.targets[0]!.target.fileId).toBe("abcdef");
  expect(shell.targets[0]!.scope.connection).toBe(h.connections[0]!.connection);
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  expect(shell.targets).toHaveLength(1);
  detach(); h.services.attachRoom(scope, adapter().owner);
  expect(shell.targets).toHaveLength(1);
  h.services.dispose();
});

test("same-room target preserves history/router and validates selected thread before message/file intent", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte"); h.services.start(); await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const shell = adapter(); h.services.attachRoom(h.services.roomScope()!, shell.owner);
  h.services.actions.navigate({ roomId: "aaaaaa", thread: "missing", messageId: 12 });
  expect(h.connections).toHaveLength(1);
  expect(shell.targets.at(-1)?.target).toMatchObject({ roomId: "aaaaaa", thread: "main", messageId: 12 });
  expect(shell.before()).toBe(1);
  expect(h.history).toHaveLength(1);
  h.services.actions.selectPane("files");
  expect(shell.targets.at(-1)?.pane).toBe("files");
  h.services.dispose();
});

test("departed shell cleanup cannot detach replacement, and queued old deep link cannot cross navigation", async () => {
  const h = fixture("http://vb.test/b/aaaaaa#fabcdef"); h.services.start(); await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const first = adapter(), second = adapter();
  const detachOld = h.services.attachRoom(h.services.roomScope()!, first.owner);
  h.services.attachRoom(h.services.roomScope()!, second.owner); detachOld();
  h.services.actions.selectPane("doc");
  expect(second.targets.at(-1)?.pane).toBe("doc");
  h.services.actions.navigate({ roomId: "bbbbbb", fileId: "ffff" });
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  expect(h.services.rootRoom.read().roomId).toBe("bbbbbb");
  h.connections[1]!.callbacks.onEvent(event(canonical("bbbbbb")));
  const next = adapter(); h.services.attachRoom(h.services.roomScope()!, next.owner);
  expect(next.targets.map(value => value.target.fileId)).toEqual(["ffff"]);
  h.services.dispose();
});

test("same services-owned Apps authority evicts immediately and vetoes recache before public reentrant navigation", async () => {
  const h = fixture("http://vb.test/b/aaaaaa"); h.services.start(); await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const authority = h.services.appsAuthority()!;
  expect(h.services.appsAuthority()).toBe(authority);
  authority.deny();
  let reentered = false;
  const stop = h.services.rootRoom.state.subscribe(snapshot => {
    if (reentered || snapshot.snapshotGeneration !== 2) return;
    reentered = true;
    h.services.actions.home(); h.services.actions.navigate({ roomId: "aaaaaa" });
    expect(h.services.rootRoom.read().room).toBeNull();
  });
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  expect(reentered).toBe(true);
  stop(); h.services.dispose();
});

test("identity replacement resets private services synchronously and old room/channel results cannot repopulate", async () => {
  const h = fixture("http://vb.test/b/aaaaaa"); h.services.start(); await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const shell = adapter(); h.services.attachRoom(h.services.roomScope()!, shell.owner);
  const prior = h.channels[0]!;
  h.canonical(me({ email: "b@test", name: "B", books: [] }));
  await h.services.personal.refresh(); await settle();
  expect(h.identityResets()).toBe(1);
  expect(h.services.rootRoom.read().room).toBeNull();
  expect(shell.resets).toContain("identity");
  expect(prior.disposed).toBe(1);
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  prior.options.onAgents("*");
  expect(h.services.rootRoom.read().room).toBeNull();
  h.services.actions.home(); h.flushQueued();
  expect(get(h.services.state).route.kind).toBe("home");
  h.services.dispose();
});

test("application logout uses one existing PWA cleanup queue and fences an observed identity replacement", async () => {
  const h = fixture(); h.services.start(); await settle();
  const leaving = h.services.actions.logout(false);
  h.canonical(me({ email: "b@test" })); await h.services.personal.refresh(); await settle();
  h.cleanup.resolve({ local: true, settled: true, confirmed: true }); await leaving;
  expect(h.posts()).toBe(0);
  expect(h.documentNavigations).toEqual(["reload"]);
  h.services.dispose();
});

test("known Personal global 401 revokes private scope and caches before login redirect, never reviving from old callbacks", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte#fabcdef"); h.services.start(); await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const authority = h.services.appsAuthority()!;
  h.services.personal.editAsk("Private account draft");
  h.beforeDocumentNavigation(() => {
    expect(h.services.rootRoom.read().room).toBeNull();
    expect(h.services.personal.peek()).toBeNull();
    expect(get(h.services.personal.draft).ask).toBe("");
    expect(authority.current()).toBe(false);
    expect(get(h.services.state).sessionDenied).toBe(true);
  });
  h.failMe(new HomeFailure("not-authenticated", 401));
  await h.services.personal.refresh(); await settle();
  expect(h.documentNavigations).toHaveLength(1);
  expect(h.documentNavigations[0]).toContain("/login?");
  expect(h.documentNavigations[0]).toContain("ui=svelte");
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  h.channels[0]!.options.onAccount(); h.flushQueued();
  h.services.actions.navigate({ roomId: "aaaaaa" });
  expect(h.services.rootRoom.read().room).toBeNull();
  expect(h.services.appsAuthority()).toBeNull();
  expect(h.connections).toHaveLength(1);
  expect(h.disposals()).toBe(1);
  h.services.dispose(); expect(h.disposals()).toBe(1);
});
