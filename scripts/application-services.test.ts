import { expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Room, RoomEvent } from "../shared/room";
import type { CommandOutcome } from "../shared/commands";
import type { RootConnection } from "../svelte/features/root-room/session";
import type { RoomConnectionOptions } from "../svelte/roomConnection";
import type { AgentsApi } from "../svelte/features/agents/api";
import { createApplicationServices } from "../svelte/features/application/services";
import { HomeFailure } from "../svelte/features/home/api";
import {
  applicationRoute,
  createApplicationRouter,
} from "../svelte/features/app-navigation/router";
import { createDocumentDrafts } from "../svelte/features/documents/session";
import { targetHref } from "../svelte/features/home/model";
import type {
  ApplicationRoomAdapter,
  ApplicationRoomIntent,
} from "../svelte/features/application/types";
import {
  homeApi,
  me,
  manualClock,
  settle,
  deferred,
} from "./native-home-fixtures";

function canonical(id = "aaaaaa", account = "me@test.com"): Room {
  return {
    id,
    me: account,
    book: { title: id, owner: account },
    members: [account],
    messages: [],
    epics: [],
    typing: {},
    online: [],
    suggestions: [],
  };
}
function event(room: Room): RoomEvent {
  const { id: _id, typing: _typing, ...state } = room;
  return { t: "state", ...state };
}
function fixture(
  initial = "http://vb.test/app",
  shellVersion: string | null = "development",
) {
  const timer = manualClock();
  let href = initial,
    currentMe = me(),
    pop = () => {},
    visible = () => {},
    now = 0,
    meFailure: Error | null = null;
  let onDocumentNavigation = () => {};
  let duringIdentityReset = () => {};
  let popStops = 0,
    visibleStops = 0,
    identityResets = 0,
    pwaDisposals = 0,
    posts = 0;
  const queued: (() => void)[] = [],
    accounts: string[] = [],
    history: string[] = [],
    documentNavigations: string[] = [];
  const connections: {
    callbacks: RoomConnectionOptions;
    connection: RootConnection;
    disposed: number;
    commands: unknown[];
  }[] = [];
  const channels: {
    options: Parameters<
      typeof import("../svelte/features/home/connection").createPersonalConnection
    >[0];
    disposed: number;
  }[] = [];
  const cleanup = deferred<{
    local: boolean;
    settled: boolean;
    confirmed: boolean;
  }>();
  const agentsApi: AgentsApi = {
    identity: async () => currentMe.email,
    grants: async () => ({ agents: [], last_used: null }),
    revoke: async () => ({ ok: true, removed: 0 }),
    room: async () => ({ claude_on: false, agents: [], sandboxes: [] }),
    toggle: async (_id, on) => ({ ok: true, claude_on: on }),
    sandboxes: async () => ({ connected: true, claude: true, sandboxes: [] }),
    create: async () => ({ ok: true, id: "new", vm_id: "vm", name: "new" }),
    power: async () => ({ ok: true }),
    setup: async () => ({ ok: true, log: "" }),
    remove: async () => ({ ok: true }),
    terminal: async () => ({
      url: "wss://api.freestyle.sh/v5/vms/vm/pty",
      token: "fixture",
    }),
    connected: async () => ({ connected: true }),
    saveKey: async () => ({ ok: true }),
    removeKey: async () => ({ ok: true }),
    saveToken: async () => ({ ok: true }),
    removeToken: async () => ({ ok: true }),
  };
  const services = createApplicationServices({
    browser: {
      origin: "http://vb.test",
      href: () => href,
      history: {
        pushState(_data, _unused, url) {
          href = new URL(String(url), href).href;
          history.push(href);
        },
        replaceState(_data, _unused, url) {
          href = new URL(String(url), href).href;
        },
      },
      socketUrl: (path) => `ws://vb.test${path}`,
      visible: () => true,
      listenVisibility(callback) {
        visible = callback;
        return () => {
          visibleStops++;
        };
      },
      listenPop(callback) {
        pop = callback;
        return () => {
          popStops++;
        };
      },
      enqueue: (callback) => queued.push(callback),
      navigateDocument: (url) => {
        documentNavigations.push(url);
        onDocumentNavigation();
      },
      reload: () => documentNavigations.push("reload"),
      logoutPost: async () => {
        posts++;
        return { ok: true };
      },
      logoutWarning: () => {},
      logoutFailure: () => {},
      shellVersion,
      clock: { ...timer.clock, now: () => now },
    },
    pwa: () => ({
      account: (value) => {
        accounts.push(value);
      },
      beforeLogout: () => cleanup.promise,
      dispose: () => {
        pwaDisposals++;
      },
    }),
    homeApi: homeApi({
      me: async () => {
        if (meFailure) throw meFailure;
        return currentMe;
      },
    }),
    agentsApi,
    runnerFetch: async (input, init) => {
      expect(String(input).startsWith("http://127.0.0.1:47321/")).toBe(true);
      expect(init?.credentials).toBe("omit");
      return new Response("null", {
        headers: { "content-type": "application/json" },
      });
    },
    accountApi: {
      logins: async () => ({
        logins: [],
        providers: { google: false, github: false },
      }),
      name: async (name) => ({ ok: true, name }),
      avatar: async () => ({ ok: true, avatar: 1 }),
      addFriend: async () => ({ ok: true }),
      removeFriend: async () => ({ ok: true }),
    },
    onIdentityReset: () => {
      identityResets++;
      duringIdentityReset();
    },
    roomConnection(callbacks) {
      const entry: {
        callbacks: RoomConnectionOptions;
        disposed: number;
        commands: unknown[];
      } = { callbacks, disposed: 0, commands: [] };
      const connection: RootConnection = {
        start() {},
        dispose() {
          entry.disposed++;
        },
        resync() {},
        send(command) {
          entry.commands.push(command);
          return true;
        },
        request(command): Promise<CommandOutcome> {
          entry.commands.push(command);
          return Promise.resolve({ ok: true });
        },
      };
      connections.push({
        ...entry,
        connection,
        get disposed() {
          return entry.disposed;
        },
      });
      return connection;
    },
    personalConnection(options) {
      const entry = { options, disposed: 0 };
      channels.push(entry);
      return {
        start() {},
        restart() {},
        dispose() {
          entry.disposed++;
        },
      };
    },
  });
  return {
    services,
    connections,
    channels,
    history,
    documentNavigations,
    queued,
    accounts,
    cleanup,
    identityResets: () => identityResets,
    posts: () => posts,
    disposals: () => pwaDisposals,
    stops: () => ({ pop: popStops, visibility: visibleStops }),
    canonical(next: ReturnType<typeof me>) {
      currentMe = next;
    },
    failMe(error: Error) {
      meFailure = error;
    },
    beforeDocumentNavigation(callback: () => void) {
      onDocumentNavigation = callback;
    },
    duringIdentityReset(callback: () => void) {
      duringIdentityReset = callback;
    },
    pop(url: string) {
      href = url;
      pop();
    },
    visible: () => visible(),
    advance(ms: number) {
      now += ms;
      timer.advance(ms);
    },
    flushQueued() {
      for (const callback of queued.splice(0)) callback();
    },
  };
}
function adapter() {
  const targets: ApplicationRoomIntent[] = [],
    resets: string[] = [];
  let before = 0;
  const owner: ApplicationRoomAdapter = {
    beforeNavigation() {
      before++;
    },
    reset: (reason) => resets.push(reason),
    consumePop: () => false,
    deferNavigation: () => false,
    onTarget: (intent) => targets.push(intent),
    onTransition() {},
    onTerminal() {},
  };
  return { owner, targets, resets, before: () => before };
}

test("transient suggestion navigation keeps main URL and one live connection, including deferred sheet-entry reuse", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte");
  h.services.start();
  await settle();
  const room = canonical();
  room.suggestions = [{ title: "Preview", tasks: [] }];
  h.connections[0]!.callbacks.onEvent(event(room));
  const shell = adapter();
  let queued: (() => void) | undefined,
    holding = true;
  shell.owner.deferNavigation = (callback) => {
    if (!holding) return false;
    queued = callback;
    return true;
  };
  h.services.attachRoom(h.services.roomScope()!, shell.owner);
  shell.targets.length = 0;
  h.services.actions.selectThread("pre:0", { replace: true });
  expect(shell.targets).toHaveLength(0);
  expect(h.services.rootRoom.read().thread).toBe("main");
  holding = false;
  queued?.();
  expect(shell.targets.map((intent) => intent.target.thread)).toEqual([
    "pre:0",
  ]);
  expect(h.services.rootRoom.read().thread).toBe("pre:0");
  expect(h.connections).toHaveLength(1);
  expect(h.history).toHaveLength(0); // Reuses the existing mobile sheet entry.
  expect(get(h.services.state).href).not.toContain("pre:");
  expect(applicationRoute(get(h.services.state).href)).toMatchObject({
    kind: "room",
    target: { thread: "main" },
  });
  h.services.actions.selectThread("main");
  expect(h.history).toHaveLength(1); // Subsequent ordinary selection pushes.
  h.services.actions.selectThread("pre:1");
  expect(h.history).toHaveLength(1); // Unknown preview cannot change history or presentation.
  h.services.dispose();
});

test("deferred transient route retains its target once, but cannot run after router disposal", () => {
  let href = "http://vb.test/b/aaaaaa?ui=svelte",
    holding = true;
  let queued: (() => void) | undefined;
  const targets: string[] = [],
    writes: string[] = [];
  const router = createApplicationRouter({
    current: () => href,
    history: {
      pushState(_state, _unused, url) {
        href = new URL(String(url), href).href;
        writes.push("push");
      },
      replaceState(_state, _unused, url) {
        href = new URL(String(url), href).href;
        writes.push("replace");
      },
    },
    activate: () => {
      throw Error("same room must retain its connection");
    },
    beforeChange() {},
    sameRoom: (target) => {
      targets.push(target.thread ?? "main");
      return true;
    },
    consumePop: () => false,
    document() {},
    deferNavigation: (callback) => {
      if (!holding) return false;
      queued = callback;
      return true;
    },
  });
  router.go({ roomId: "aaaaaa", thread: "main" }, true, "pre:0");
  expect(targets).toEqual([]);
  holding = false;
  queued?.();
  expect(targets).toEqual(["pre:0"]);
  expect(writes).toEqual(["replace"]);
  expect(applicationRoute(href)).toMatchObject({
    kind: "room",
    target: { thread: "main" },
  });
  holding = true;
  router.go({ roomId: "aaaaaa", thread: "main" }, false, "pre:0");
  router.dispose();
  holding = false;
  queued?.();
  expect(targets).toEqual(["pre:0"]);
  expect(writes).toEqual(["replace"]);
});

test("application starts one account/channel and disposes every document listener once", async () => {
  const h = fixture();
  expect(h.services.active()).toBe(false);
  expect(Object.keys(h.services.rootRoom.cache)).toEqual(["delete"]);
  if (false) {
    // @ts-expect-error RoomShell may evict, never inspect or reinsert private snapshots.
    h.services.rootRoom.cache.set("aaaaaa", canonical());
    // @ts-expect-error Account/cache reset remains the application owner's lifecycle.
    h.services.rootRoom.cache.clear();
  }
  expect(h.channels).toHaveLength(0);
  h.services.start();
  h.services.start();
  await settle();
  expect(h.services.active()).toBe(true);
  expect(h.channels).toHaveLength(1);
  expect(h.services.pwa).toBe(h.services.pwa);
  expect(get(h.services.state).availableVersion).toBeNull();
  h.services.dispose();
  h.services.dispose();
  expect(h.services.active()).toBe(false);
  h.channels[0]!.options.onConnected?.();
  h.visible();
  h.pop("http://vb.test/b/aaaaaa");
  expect(h.connections).toHaveLength(0);
  expect(h.channels[0]!.disposed).toBe(1);
  expect(h.disposals()).toBe(1);
  expect(h.stops()).toEqual({ pop: 1, visibility: 1 });
});

test("initial deep file intent waits for canonical room and late RoomShell attachment, then replays once", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte#fabcdef");
  h.services.start();
  await settle();
  expect(h.services.roomScope()).toBeNull();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const shell = adapter(),
    scope = h.services.roomScope()!;
  const detach = h.services.attachRoom(scope, shell.owner);
  expect(shell.targets).toHaveLength(1);
  expect(shell.targets[0]!.target.fileId).toBe("abcdef");
  expect(shell.targets[0]!.scope.connection).toBe(h.connections[0]!.connection);
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  expect(shell.targets).toHaveLength(1);
  detach();
  h.services.attachRoom(scope, adapter().owner);
  expect(shell.targets).toHaveLength(1);
  h.services.dispose();
});

test("same-room target preserves history/router and validates selected thread before message/file intent", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte");
  h.services.start();
  await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const shell = adapter();
  h.services.attachRoom(h.services.roomScope()!, shell.owner);
  h.services.actions.navigate({
    roomId: "aaaaaa",
    thread: "missing",
    messageId: 12,
  });
  expect(h.connections).toHaveLength(1);
  expect(shell.targets.at(-1)?.target).toMatchObject({
    roomId: "aaaaaa",
    thread: "main",
    messageId: 12,
  });
  expect(shell.before()).toBe(1);
  expect(h.history).toHaveLength(1);
  h.services.actions.selectPane("files");
  expect(shell.targets.at(-1)?.pane).toBe("files");
  h.services.dispose();
});

test("departed shell cleanup cannot detach replacement, and queued old deep link cannot cross navigation", async () => {
  const h = fixture("http://vb.test/b/aaaaaa#fabcdef");
  h.services.start();
  await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const first = adapter(),
    second = adapter();
  const detachOld = h.services.attachRoom(h.services.roomScope()!, first.owner);
  h.services.attachRoom(h.services.roomScope()!, second.owner);
  detachOld();
  h.services.actions.selectPane("doc");
  expect(second.targets.at(-1)?.pane).toBe("doc");
  h.services.actions.navigate({ roomId: "bbbbbb", fileId: "ffff" });
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  expect(h.services.rootRoom.read().roomId).toBe("bbbbbb");
  h.connections[1]!.callbacks.onEvent(event(canonical("bbbbbb")));
  const next = adapter();
  h.services.attachRoom(h.services.roomScope()!, next.owner);
  expect(next.targets.map((value) => value.target.fileId)).toEqual(["ffff"]);
  h.services.dispose();
});

test("same services-owned Apps authority evicts immediately and vetoes recache before public reentrant navigation", async () => {
  const h = fixture("http://vb.test/b/aaaaaa");
  h.services.start();
  await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const authority = h.services.appsAuthority()!;
  expect(h.services.appsAuthority()).toBe(authority);
  authority.deny();
  let reentered = false;
  const stop = h.services.rootRoom.state.subscribe((snapshot) => {
    if (reentered || snapshot.snapshotGeneration !== 2) return;
    reentered = true;
    h.services.actions.home();
    h.services.actions.navigate({ roomId: "aaaaaa" });
    expect(h.services.rootRoom.read().room).toBeNull();
  });
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  expect(reentered).toBe(true);
  stop();
  h.services.dispose();
});

test("identity replacement resets private services synchronously and old room/channel results cannot repopulate", async () => {
  const h = fixture("http://vb.test/b/aaaaaa");
  h.services.start();
  await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const shell = adapter();
  h.services.attachRoom(h.services.roomScope()!, shell.owner);
  const prior = h.channels[0]!;
  h.canonical(me({ email: "b@test", name: "B", books: [] }));
  await h.services.personal.refresh();
  await settle();
  expect(h.identityResets()).toBe(1);
  expect(h.services.rootRoom.read().room).toBeNull();
  expect(shell.resets).toContain("identity");
  expect(prior.disposed).toBe(1);
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  prior.options.onAgents("*");
  expect(h.services.rootRoom.read().room).toBeNull();
  h.services.actions.home();
  h.flushQueued();
  expect(get(h.services.state).route.kind).toBe("home");
  h.services.dispose();
});

test("application logout uses one existing PWA cleanup queue and fences an observed identity replacement", async () => {
  const h = fixture();
  h.services.start();
  await settle();
  const leaving = h.services.actions.logout(false);
  h.canonical(me({ email: "b@test" }));
  await h.services.personal.refresh();
  await settle();
  h.cleanup.resolve({ local: true, settled: true, confirmed: true });
  await leaving;
  expect(h.posts()).toBe(0);
  expect(h.documentNavigations).toEqual(["reload"]);
  h.services.dispose();
});

test("identity teardown flushes the old room before clearing application-owned draft banks", async () => {
  const h = fixture("http://vb.test/b/aaaaaa");
  h.services.start();
  await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const documents = createDocumentDrafts();
  const target = { account: "me@test.com", roomId: "aaaaaa", epicId: null };
  const order: string[] = [];
  const shell = adapter();
  shell.owner.reset = (reason) => {
    if (reason !== "identity") return;
    order.push("room");
    documents.set(target, { text: "Private old-account recovery", scroll: 0 });
  };
  h.services.attachRoom(h.services.roomScope()!, shell.owner);
  h.duringIdentityReset(() => {
    order.push("bank");
    documents.clear();
  });
  h.canonical(me({ email: "b@test", name: "B", books: [] }));
  await h.services.personal.refresh();
  await settle();
  expect(order).toEqual(["room", "bank"]);
  expect(documents.get(target)).toBeUndefined();
  h.services.dispose();
});

test("navigation requested by the synchronous identity reset runs after private teardown and supersedes old URL recovery", async () => {
  const h = fixture("http://vb.test/b/aaaaaa#fabcdef");
  h.services.start();
  await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  h.duringIdentityReset(() =>
    h.services.actions.navigate({ roomId: "bbbbbb", messageId: 9 }),
  );
  h.canonical(me({ email: "b@test" }));
  await h.services.personal.refresh();
  await settle();
  expect(h.services.rootRoom.read().roomId).toBe("bbbbbb");
  h.flushQueued();
  expect(h.services.rootRoom.read().roomId).toBe("bbbbbb");
  h.connections.at(-1)!.callbacks.onEvent(event(canonical("bbbbbb", "b@test")));
  const shell = adapter();
  h.services.attachRoom(h.services.roomScope()!, shell.owner);
  expect(shell.targets.map((value) => value.target.messageId)).toEqual([9]);
  h.services.dispose();
});

test("known Personal global 401 revokes private scope and caches before login redirect, never reviving from old callbacks", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte#fabcdef");
  h.services.start();
  await settle();
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
  await h.services.personal.refresh();
  await settle();
  expect(h.documentNavigations).toHaveLength(1);
  expect(h.documentNavigations[0]).toContain("/login?");
  expect(h.documentNavigations[0]).toContain("ui=svelte");
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  h.channels[0]!.options.onAccount();
  h.flushQueued();
  h.services.actions.navigate({ roomId: "aaaaaa" });
  expect(h.services.rootRoom.read().room).toBeNull();
  expect(h.services.appsAuthority()).toBeNull();
  expect(h.connections).toHaveLength(1);
  expect(h.disposals()).toBe(1);
  h.services.dispose();
  expect(h.disposals()).toBe(1);
});

test("release availability compares the shell ETag, stays quiet on fresh load and recognizes a later release", async () => {
  const h = fixture("http://vb.test/app?ui=svelte", "current-html-etag");
  h.canonical(me({ v: "current-html-etag" }));
  h.services.start();
  await settle();
  expect(get(h.services.state).availableVersion).toBeNull();
  h.canonical(me({ v: "next-html-etag" }));
  await h.services.personal.refresh();
  await settle();
  expect(get(h.services.state).availableVersion).toBe("next-html-etag");
  h.services.dispose();
});

test("validated app catalog/tool and legacy epic/document hashes preserve explicit query precedence", () => {
  const root = "http://vb.test/b/aaaaaa?ui=svelte", cid = "abcdef123456";
  expect(applicationRoute(root + "#app:" + cid)).toMatchObject({ kind: "room", target: { thread: "main", app: { connection: cid } } });
  const target = { roomId: "aaaaaa", thread: "other", app: { connection: "room", tool: "report-v2" } };
  expect(applicationRoute(new URL(targetHref(target), root).href)).toMatchObject({ kind: "room", target });
  expect(applicationRoute(root + "#eother")).toMatchObject({ kind: "room", target: { thread: "other", document: false } });
  expect(applicationRoute(root + "#doc:other")).toMatchObject({ kind: "room", target: { thread: "other", document: true } });
  expect(applicationRoute(root + "&t=main#doc:other")).toMatchObject({ kind: "room", target: { thread: "main", document: true } });
  expect(applicationRoute(root + "&t=explicit#eother")).toMatchObject({ kind: "room", target: { thread: "explicit" } });
  for (const hash of ["#app:foreign", "#app:" + cid + "/", "#app:" + cid + "/tool/extra", "#app:" + cid + "/%2e%2e", "#app:" + cid + "/<script>", "#doc:other:extra", "#document"]) {
    const route = applicationRoute(root + hash);
    expect(route.kind).toBe("room");
    if (route.kind !== "room") throw Error("Expected room URL");
    expect(route.target.app).toBeUndefined();
    expect(route.target.document).toBe(false);
  }
});

test("initial OAuth catalog return is delivered once after canonical room validation and late attachment", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte#app:abcdef123456");
  h.services.start(); await settle();
  h.connections[0]!.callbacks.onEvent(event(canonical()));
  const shell = adapter(); h.services.attachRoom(h.services.roomScope()!, shell.owner);
  expect(shell.targets.map(intent => intent.target.app)).toEqual([{ connection: "abcdef123456" }]);
  h.services.attachRoom(h.services.roomScope()!, adapter().owner);
  expect(shell.targets).toHaveLength(1);
  h.services.dispose();
});

test("app route ownership survives Viewer/Sheet deferral as an immutable target but cannot cross disposal", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte");
  h.services.start(); await settle(); h.connections[0]!.callbacks.onEvent(event(canonical()));
  const shell = adapter(); h.services.attachRoom(h.services.roomScope()!, shell.owner); shell.targets.length = 0;
  let holding = true, queued: (() => void) | undefined;
  shell.owner.deferNavigation = callback => { if (!holding) return false; queued = callback; return true; };
  const app = { connection: "abcdef123456", tool: "original" };
  h.services.actions.navigate({ roomId: "aaaaaa", app });
  app.tool = "changed-after-gesture";
  expect(shell.targets).toHaveLength(0);
  holding = false; queued?.();
  expect(shell.targets.at(-1)?.target.app).toEqual({ connection: "abcdef123456", tool: "original" });
  expect(h.connections).toHaveLength(1);
  holding = true; h.services.actions.navigate("/b/aaaaaa?ui=svelte#app:abcdef123456");
  h.services.dispose(); holding = false; queued?.();
  expect(shell.targets).toHaveLength(1);
});

test("deleted legacy document target is marked unavailable instead of opening it as main", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte#doc:deleted");
  h.services.start(); await settle(); h.connections[0]!.callbacks.onEvent(event(canonical()));
  const shell = adapter(); h.services.attachRoom(h.services.roomScope()!, shell.owner);
  expect(shell.targets.at(-1)).toMatchObject({ target: { thread: "main", document: true }, unavailableThread: "deleted" });
  expect(h.services.rootRoom.read().thread).toBe("main");
  h.services.dispose();
});

test("authorized legacy epic hashes canonicalize in place before Viewer can own the hash", async () => {
  for (const hash of ["#eother", "#doc:other"]) {
    const h = fixture("http://vb.test/b/aaaaaa?ui=svelte" + hash);
    h.services.start(); await settle();
    const room = canonical(); room.epics = [{ id: "other", title: "Other", tasks: [] }];
    h.connections[0]!.callbacks.onEvent(event(room));
    const shell = adapter(); h.services.attachRoom(h.services.roomScope()!, shell.owner);
    const url = new URL(get(h.services.state).href);
    expect(url.searchParams.get("t")).toBe("other");
    expect(url.hash).toBe(hash.startsWith("#doc") ? "#doc" : "");
    expect(shell.targets.at(-1)?.target.thread).toBe("other");
    expect(h.connections).toHaveLength(1);
    expect(h.history).toHaveLength(0); // One initial entry, no navigation push.
    h.services.dispose();
  }
});

test("an initial app continuation cannot survive room departure or negative canonical membership", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte#app:abcdef123456");
  h.services.start(); await settle(); h.connections[0]!.callbacks.onEvent(event(canonical()));
  h.services.actions.navigate({ roomId: "bbbbbb" });
  h.connections[1]!.callbacks.onEvent(event(canonical("bbbbbb")));
  const next = adapter(); h.services.attachRoom(h.services.roomScope()!, next.owner);
  expect(next.targets).toHaveLength(1);
  expect(next.targets[0]?.target.app).toBeUndefined();
  h.services.actions.navigate("/b/aaaaaa?ui=svelte#app:abcdef123456");
  h.connections.at(-1)!.callbacks.onEvent(event({ ...canonical(), members: [] }));
  expect(h.services.roomScope()).toBeNull();
  expect(h.services.rootRoom.read().room).toBeNull();
  expect(h.services.rootRoom.read().phase).toBe("removed");
  h.services.dispose();
});

test("reentrant navigation during canonical legacy URL publication cancels the old target", async () => {
  const h = fixture("http://vb.test/b/aaaaaa?ui=svelte#eother");
  h.services.start(); await settle();
  const room = canonical(); room.epics = [{ id: "other", title: "Other", tasks: [] }];
  h.connections[0]!.callbacks.onEvent(event(room));
  const shell = adapter(); let replaced = false;
  const stop = h.services.state.subscribe(value => {
    if (!replaced && new URL(value.href).searchParams.get("t") === "other") { replaced = true; h.services.actions.home(); }
  });
  h.services.attachRoom(h.services.roomScope()!, shell.owner);
  expect(replaced).toBe(true);
  expect(h.services.rootRoom.read().room).toBeNull();
  expect(shell.targets).toHaveLength(0);
  expect(get(h.services.state).route.kind).toBe("home");
  stop(); h.services.dispose();
});
