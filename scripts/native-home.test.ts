// Pure owners/protocol fixtures. These assertions do not represent Worker or browser acceptance.
import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { waitIndicator } from "../svelte/features/waits/model";
type PersonalSocketFixture = {
  readyState: WebSocket["readyState"];
  onopen: WebSocket["onopen"];
  onmessage: WebSocket["onmessage"];
  onclose: WebSocket["onclose"];
  close(): void;
};
import { createHomeApi } from "../svelte/features/home/api";
import { createPersonalSession } from "../svelte/features/home/personal";
import {
  createHomeSession,
  createNewRoomSession,
  createArchivedSession,
} from "../svelte/features/home/session";
import { createRoomsSession } from "../svelte/features/rooms/session";
import { createSearchSession } from "../svelte/features/app-navigation/search";
import {
  createApplicationRouter,
  applicationRoute,
} from "../svelte/features/app-navigation/router";
import {
  orderedRooms,
  recentRooms,
  unread,
  waitTarget,
  targetHref,
  roomMatches,
} from "../svelte/features/home/model";
import {
  deferred,
  homeApi,
  manualClock,
  me,
  room,
  settle,
  suggestion,
} from "./native-home-fixtures";

test("desktop placement and mobile recency remain distinct and unread respects seen highwater", () => {
  const rooms = [
    room("aaaaaa", { position: 2, opened_at: 90 }),
    room("bbbbbb", { position: 0, opened_at: 10 }),
    room("cccccc", { created_at: 1, opened_at: 100 }),
  ];
  expect(orderedRooms(rooms).map((r) => r.id)).toEqual([
    "bbbbbb",
    "aaaaaa",
    "cccccc",
  ]);
  expect(recentRooms(rooms).map((r) => r.id)).toEqual([
    "cccccc",
    "aaaaaa",
    "bbbbbb",
  ]);
  expect(rooms[0]?.id).toBe("aaaaaa");
  expect(unread(room("aaaaaa", { last_human_id: 5, last_agent_id: 9 }))).toBe(
    "human",
  );
  expect(
    unread(room("aaaaaa", { last_human_id: 5, last_agent_id: 9 }), 5),
  ).toBe("agent");
  expect(
    unread(room("aaaaaa", { last_human_id: 5, last_agent_id: 9 }), 9),
  ).toBe(null);
  expect(roomMatches([room("aaaaaa", { title: "Ação" })], "acao")).toHaveLength(
    1,
  );
});
test("wait links preserve numeric message identity and task thread navigation", () => {
  const wait = {
    book_id: "aaaaaa",
    room: "Room",
    ref: "a42",
    thread: "epic-1",
    topic: null,
    author: "a@test.com",
    author_name: null,
    text: "Please",
    ts: 1,
  };
  expect(targetHref(waitTarget(wait))).toBe("/b/aaaaaa?ui=svelte&t=epic-1#m42");
  expect(waitTarget({ ...wait, ref: "t42" })).toEqual({
    roomId: "aaaaaa",
    thread: "epic-1",
    messageId: undefined,
  });
  expect(
    applicationRoute("https://vb.test/b/aaaaaa#m9007199254740993"),
  ).toMatchObject({ kind: "room", target: { messageId: undefined } });
  expect(
    applicationRoute("https://vb.test/b/aaaaaa?t=epic-1&ui=svelte#m42"),
  ).toEqual({
    kind: "room",
    target: {
      roomId: "aaaaaa",
      thread: "epic-1",
      messageId: 42,
      fileId: undefined,
      document: false,
    },
  });
});
test("invalidated in-flight Me cannot replace canonical state and coalesces refresh", async () => {
  const timer = manualClock(),
    old = deferred<ReturnType<typeof me>>();
  let reads = 0;
  const personal = createPersonalSession(
    homeApi({
      me: () =>
        ++reads === 1 ? old.promise : Promise.resolve(me({ name: "New" })),
    }),
    { clock: timer.clock },
  );
  const first = personal.refresh();
  personal.invalidate();
  personal.invalidate();
  timer.advance(600);
  expect(reads).toBe(1);
  old.resolve(me({ name: "Old" }));
  await first;
  await settle();
  expect(reads).toBe(2);
  expect(get(personal.state).me?.name).toBe("New");
  personal.dispose();
  expect(timer.jobs.size).toBe(0);
});
test("account identity clears drafts and cancels older agents responses", async () => {
  const timer = manualClock(),
    agents =
      deferred<Awaited<ReturnType<ReturnType<typeof homeApi>["agents"]>>>();
  let next = me();
  const personal = createPersonalSession(
    homeApi({ me: async () => next, agents: () => agents.promise }),
    { clock: timer.clock },
  );
  await personal.refresh();
  personal.editAsk("private draft");
  personal.editCreate("private room");
  const request = personal.refreshAgents();
  next = me({ email: "other@test.com" });
  await personal.refresh();
  agents.resolve({ agents: [], last_used: 42 });
  await request;
  expect(get(personal.draft)).toEqual({ ask: "", create: "", unknown: null });
  expect(get(personal.state).agents).toBe(null);
  personal.dispose();
});
test("Me timeout unlocks explicit retry and a late old result cannot steal it", async () => {
  const timer = manualClock(),
    late = deferred<ReturnType<typeof me>>();
  let reads = 0;
  const personal = createPersonalSession(
    homeApi({
      me: () =>
        ++reads === 1 ? late.promise : Promise.resolve(me({ name: "Retry" })),
    }),
    { clock: timer.clock },
  );
  const first = personal.refresh();
  timer.advance(20_000);
  expect(get(personal.state).error).toBe("unconfirmed");
  await personal.refresh();
  late.resolve(me({ name: "Late" }));
  await first;
  expect(get(personal.state).me?.name).toBe("Retry");
  personal.dispose();
});
test("route suggestions are owned by their exact draft and page; edits invalidate late suggestions", async () => {
  const timer = manualClock(),
    late = deferred<typeof suggestion>(),
    personal = createPersonalSession(homeApi({ route: () => late.promise }), {
      clock: timer.clock,
    });
  await personal.refresh();
  const navigated: unknown[] = [];
  const session = createHomeSession(
    personal,
    (t) => navigated.push(t),
    timer.clock,
  );
  session.edit("old request");
  const request = session.suggest();
  session.edit("new request");
  late.resolve(suggestion);
  await request;
  expect(get(session.state).result).toBe(null);
  expect(get(personal.draft).ask).toBe("new request");
  expect(navigated).toEqual([]);
  session.dispose();
  personal.dispose();
});
test("successful routing posts once to selected epic and disposal preserves draft without stale navigation", async () => {
  const timer = manualClock(),
    posted = deferred<{ ok: true; id: number; thread: string }>();
  let writes = 0;
  const personal = createPersonalSession(
    homeApi({
      post: async (id, text, thread) => {
        expect([id, text, thread]).toEqual(["aaaaaa", "hello", "epic-1"]);
        writes++;
        return posted.promise;
      },
    }),
    { clock: timer.clock },
  );
  await personal.refresh();
  const navigated: unknown[] = [];
  const session = createHomeSession(
    personal,
    (t) => navigated.push(t),
    timer.clock,
  );
  session.edit("hello");
  await session.suggest();
  const pending = session.send();
  session.send();
  session.dispose();
  posted.resolve({ ok: true, id: 12, thread: "epic-1" });
  await pending;
  expect(writes).toBe(1);
  expect(navigated).toEqual([]);
  expect(get(personal.draft).ask).toBe("hello");
  personal.dispose();
});
test("new-room close/remount cannot consume account draft or navigate after old response", async () => {
  const timer = manualClock(),
    created = deferred<{
      id: string;
      unknown: string[];
      invited: string[];
      cost: number;
    }>(),
    personal = createPersonalSession(
      homeApi({ startRoom: () => created.promise }),
      { clock: timer.clock },
    );
  const navigated: unknown[] = [];
  const creator = createNewRoomSession(
    personal,
    (t) => navigated.push(t),
    timer.clock,
  );
  creator.open();
  creator.edit("room request");
  const pending = creator.submit();
  creator.close();
  creator.open();
  creator.edit("new request");
  created.resolve({ id: "bbbbbb", unknown: ["Someone"], invited: [], cost: 0 });
  await pending;
  expect(navigated).toEqual([]);
  expect(get(personal.draft).create).toBe("new request");
  expect(get(personal.draft).unknown).toBe(null);
  creator.dispose();
  personal.dispose();
});
test("post-ACK stale cache and collaborator reversal remain pending, then unconfirmed, without mutation retries", async () => {
  const timer = manualClock();
  let tint: string | null = null,
    writes = 0;
  const personal = createPersonalSession(
    homeApi({
      me: async () => me({ books: [room("aaaaaa", { tint })] }),
      tint: async () => {
        writes++;
        return { ok: true };
      },
    }),
    { clock: timer.clock },
  );
  await personal.refresh();
  const rooms = createRoomsSession(personal, timer.clock);
  await rooms.tint("aaaaaa", "blue");
  await settle();
  expect(get(rooms.state).pending["tint:aaaaaa"]).toBe(true);
  tint = "green";
  personal.invalidate();
  timer.advance(600);
  await settle();
  expect(get(rooms.state).pending["tint:aaaaaa"]).toBe(true);
  timer.advance(10_000);
  await settle();
  expect(get(rooms.state).issues["tint:aaaaaa"]).toBe("unconfirmed");
  expect(writes).toBe(1);
  tint = "blue";
  await rooms.tint("aaaaaa", "blue");
  await settle();
  expect(get(rooms.state).pending["tint:aaaaaa"]).toBeUndefined();
  expect(get(rooms.state).issues["tint:aaaaaa"]).toBeUndefined();
  expect(writes).toBe(2);
  rooms.dispose();
  personal.dispose();
});
test("canonical archive removal before late HTTP rejection does not resurrect or error", async () => {
  const timer = manualClock(),
    ack = deferred<{ ok: true }>();
  let books = [room()];
  const personal = createPersonalSession(
    homeApi({ me: async () => me({ books }), archive: () => ack.promise }),
    { clock: timer.clock },
  );
  await personal.refresh();
  const rooms = createRoomsSession(personal, timer.clock),
    request = rooms.archive("aaaaaa");
  books = [];
  await personal.refresh();
  ack.reject(Error("late rejection"));
  await request;
  expect(get(rooms.state)).toEqual({ pending: {}, issues: {} });
  expect(get(personal.state).me?.books).toEqual([]);
  rooms.dispose();
  personal.dispose();
});
test("search debounce/close ignores stale remote results while local room targets remain usable", async () => {
  const timer = manualClock(),
    late = deferred<{ rooms: number; epics: []; messages: [] }>(),
    personal = createPersonalSession(homeApi({ search: () => late.promise }), {
      clock: timer.clock,
    });
  await personal.refresh();
  const navigate: unknown[] = [],
    search = createSearchSession(
      personal,
      (t) => navigate.push(t),
      timer.clock,
    );
  search.open();
  search.edit("Room");
  timer.advance(250);
  search.close();
  late.resolve({ rooms: 99, epics: [], messages: [] });
  await settle();
  expect(get(search.state).result).toBe(null);
  search.open();
  search.activate();
  expect(navigate).toEqual([{ roomId: "aaaaaa" }]);
  search.dispose();
  personal.dispose();
});
test("room→Home→Back activates room lifecycle and same-room targets avoid reconnect", () => {
  let href = "https://vb.test/b/aaaaaa?ui=svelte";
  const entries = [href],
    activated: string[] = [],
    same: unknown[] = [];
  let cleanup = 0;
  const history = {
    pushState(_state: unknown, _unused: string, value?: string | URL | null) {
      href = new URL(String(value), href).href;
      entries.push(href);
    },
    replaceState(
      _state: unknown,
      _unused: string,
      value?: string | URL | null,
    ) {
      href = new URL(String(value), href).href;
      entries[entries.length - 1] = href;
    },
  };
  const router = createApplicationRouter({
    current: () => href,
    history,
    activate: (r) => activated.push(r.kind),
    beforeChange: () => {
      cleanup++;
    },
    sameRoom: (t) => {
      same.push(t);
      return false;
    },
    consumePop: () => false,
    document: () => {
      throw Error("unexpected document navigation");
    },
  });
  router.go("/app");
  expect(activated).toEqual(["home"]);
  entries.pop();
  href = entries[0]!;
  router.pop();
  expect(activated).toEqual(["home", "room"]);
  expect(same).toEqual([
    {
      roomId: "aaaaaa",
      thread: "main",
      messageId: undefined,
      fileId: undefined,
      document: false,
    },
  ]);
  expect(cleanup).toBe(2);
  expect(router.generation()).toBe(2);
  const connected = createApplicationRouter({
    current: () => href,
    history,
    activate: () => {
      throw Error("same-room navigation must retain transport");
    },
    beforeChange: () => {},
    sameRoom: (target) => target.roomId === "aaaaaa",
    consumePop: () => false,
    document: () => {
      throw Error("unexpected document");
    },
  });
  connected.go({ roomId: "aaaaaa", thread: "epic-2", messageId: 44 });
  expect(href).toContain("t=epic-2");
  expect(href).toContain("#m44");
});
test("typed HTTP client rejects malformed successful data and preserves HTTP errors", async () => {
  const invalid = createHomeApi(
    async () => new Response(JSON.stringify({ books: [] })),
  );
  await expect(invalid.me()).rejects.toThrow();
  const refused = createHomeApi(
    async () =>
      new Response(JSON.stringify({ error: "forbidden" }), { status: 403 }),
  );
  await expect(refused.archived()).rejects.toThrow("forbidden");
});

test("restore waits for canonical Archived absence and exposes bounded explicit recovery", async () => {
  const timer = manualClock();
  let archived = true,
    writes = 0;
  const archivedRoom = {
    id: "aaaaaa",
    title: "Room",
    folder: null,
    summary: null,
    updated_at: 1,
    archived_at: 2,
    members: null,
  };
  const personal = createPersonalSession(
      homeApi({
        archived: async () => ({ books: archived ? [archivedRoom] : [] }),
        archive: async () => {
          writes++;
          return { ok: true };
        },
      }),
      { clock: timer.clock },
    ),
    session = createArchivedSession(personal, timer.clock);
  await session.load();
  await session.restore("aaaaaa");
  await settle();
  expect(get(session.state).books).toHaveLength(1);
  expect(get(session.state).pending).toBe("aaaaaa");
  timer.advance(10_000);
  await settle();
  expect(get(session.state).error).toBe("unconfirmed");
  expect(writes).toBe(1);
  archived = false;
  await session.restore("aaaaaa");
  await settle();
  expect(get(session.state).books).toEqual([]);
  expect(get(session.state).pending).toBe(null);
  expect(writes).toBe(2);
  session.dispose();
  personal.dispose();
});
test("only asks resolve, and obsolete room mutation responses cannot survive account reset", async () => {
  const timer = manualClock(),
    late = deferred<{ ok: true }>();
  let writes = 0;
  const wait = {
    book_id: "aaaaaa",
    room: "Room",
    ref: "t12",
    thread: "epic-1",
    topic: null,
    author: "a@test.com",
    author_name: null,
    text: "Task",
    ts: 1,
  };
  const personal = createPersonalSession(
    homeApi({
      me: async () => me({ waits: [wait] }),
      resolve: async () => {
        writes++;
        return { ok: true };
      },
      tint: () => late.promise,
    }),
    { clock: timer.clock },
  );
  await personal.refresh();
  const rooms = createRoomsSession(personal, timer.clock);
  rooms.resolve("aaaaaa", "t12");
  expect(writes).toBe(0);
  const pending = rooms.tint("aaaaaa", "blue");
  rooms.reset();
  late.resolve({ ok: true });
  await pending;
  expect(get(rooms.state)).toEqual({ pending: {}, issues: {} });
  expect(timer.jobs.size).toBeLessThanOrEqual(1);
  rooms.dispose();
  personal.dispose();
});

test("personal socket ignores replaced/disposed callbacks and current-room message-only invalidations", async () => {
  const { createPersonalConnection } =
    await import("../svelte/features/home/connection");
  const timer = manualClock();
  let account = 0,
    agents = 0,
    visible = 0,
    unlistened = false;
  let visibility = () => {};
  function socket(): PersonalSocketFixture & { message(data: unknown): void } {
    return {
      readyState: 0,
      onopen: null,
      onmessage: null,
      onclose: null,
      close() {
        this.readyState = 3;
      },
      message(data: unknown) {
        if (this.onmessage) Reflect.apply(this.onmessage, this, [{ data }]);
      },
    };
  }
  const sockets: ReturnType<typeof socket>[] = [],
    connection = createPersonalConnection({
      url: () => "wss://vb.test/ws-me",
      decode: (raw) =>
        typeof raw === "object" &&
        raw !== null &&
        "kind" in raw &&
        raw.kind === "account"
          ? {
              kind: "account",
              book: "aaaaaa",
              message: "message" in raw && raw.message === true,
            }
          : raw === "agents"
            ? { kind: "agents", book: "*" }
            : null,
      onAccount: () => {
        account++;
      },
      onAgents: () => {
        agents++;
      },
      onVisible: () => {
        visible++;
      },
      currentRoom: () => "aaaaaa",
      visible: () => true,
      listenVisibility: (callback) => {
        visibility = callback;
        return () => {
          unlistened = true;
        };
      },
      createSocket: () => {
        const value = socket();
        sockets.push(value);
        return value;
      },
      clock: timer.clock,
    });
  connection.start();
  connection.start();
  expect(sockets).toHaveLength(1);
  sockets[0]!.message({ kind: "account", message: true });
  expect(account).toBe(0);
  sockets[0]!.message({ kind: "account" });
  expect(account).toBe(1);
  connection.restart();
  sockets[0]!.message({ kind: "account" });
  sockets[1]!.message("agents");
  expect(account).toBe(1);
  expect(agents).toBe(1);
  connection.dispose();
  visibility();
  sockets[1]!.message("agents");
  expect(visible).toBe(0);
  expect(agents).toBe(1);
  expect(unlistened).toBe(true);
  expect(timer.jobs.size).toBe(0);
});

test("routed send uses the canonical posted thread and clears only its unchanged draft", async () => {
  const timer = manualClock(),
    personal = createPersonalSession(
      homeApi({
        post: async () => ({ ok: true, id: 44, thread: "canonical-epic" }),
      }),
      { clock: timer.clock },
    );
  await personal.refresh();
  const navigated: unknown[] = [],
    session = createHomeSession(
      personal,
      (target) => navigated.push(target),
      timer.clock,
    );
  session.edit("hello");
  await session.suggest();
  await session.send();
  expect(navigated).toEqual([{ roomId: "aaaaaa", thread: "canonical-epic" }]);
  expect(get(personal.draft).ask).toBe("");
  session.dispose();
  personal.dispose();
});

test("remote restoration before HTTP rejection is authoritative and obsoletes its pending callback", async () => {
  const timer = manualClock(),
    ack = deferred<{ ok: true }>();
  let archived = true;
  const archivedRoom = {
    id: "aaaaaa",
    title: "Room",
    folder: null,
    summary: null,
    updated_at: 1,
    archived_at: 2,
    members: null,
  };
  const personal = createPersonalSession(
      homeApi({
        archived: async () => ({ books: archived ? [archivedRoom] : [] }),
        archive: () => ack.promise,
      }),
      { clock: timer.clock },
    ),
    session = createArchivedSession(personal, timer.clock);
  await session.load();
  const request = session.restore("aaaaaa");
  archived = false;
  await session.load();
  ack.reject(Error("late rejected mutation"));
  await request;
  expect(get(session.state).books).toEqual([]);
  expect(get(session.state).pending).toBe(null);
  expect(get(session.state).error).toBe("");
  session.dispose();
  personal.dispose();
});

test("room identity fences the first Me race and obsolete identity cannot publish cached private data", async () => {
  const timer = manualClock(),
    late = deferred<ReturnType<typeof me>>();
  let reads = 0,
    changes = 0;
  const personal = createPersonalSession(
    homeApi({
      me: () =>
        ++reads === 1
          ? late.promise
          : Promise.resolve(me({ email: "b@test.com" })),
    }),
    {
      clock: timer.clock,
      onIdentityChange: () => {
        changes++;
      },
    },
  );
  personal.acceptIdentity("a@test.com");
  personal.editAsk("private A draft");
  const pending = personal.refresh();
  expect(personal.acceptIdentity("b@test.com")).toBe(true);
  expect(get(personal.state).me).toBe(null);
  expect(get(personal.draft).ask).toBe("");
  await personal.refresh();
  late.resolve(me({ email: "a@test.com", name: "Private A" }));
  await pending;
  expect(get(personal.state).me?.email).toBe("b@test.com");
  expect(changes).toBe(1);
  personal.dispose();
});

test("first authenticated room state fences an earlier Me response with unknown account ownership", async () => {
  const timer = manualClock(),
    old = deferred<ReturnType<typeof me>>();
  let reads = 0;
  const personal = createPersonalSession(
    homeApi({
      me: () =>
        ++reads === 1
          ? old.promise
          : Promise.resolve(me({ email: "current@test.com" })),
    }),
    { clock: timer.clock },
  );
  const pending = personal.refresh();
  personal.acceptIdentity("current@test.com");
  await settle();
  old.resolve(
    me({ email: "previous@test.com", name: "Previous private data" }),
  );
  await pending;
  expect(get(personal.state).me?.email).toBe("current@test.com");
  expect(reads).toBe(2);
  personal.dispose();
});

test("account revision synchronously fences routed send before page unmount", async () => {
  const timer = manualClock(),
    posted = deferred<{ ok: true; id: number; thread: string }>();
  let current = me();
  const personal = createPersonalSession(
    homeApi({ me: async () => current, post: () => posted.promise }),
    { clock: timer.clock },
  );
  await personal.refresh();
  const navigated: unknown[] = [],
    home = createHomeSession(
      personal,
      (value) => navigated.push(value),
      timer.clock,
    );
  home.edit("private A request");
  await home.suggest();
  const pending = home.send();
  current = me({ email: "b@test.com" });
  personal.acceptIdentity(current.email);
  personal.editAsk("new B draft");
  expect(get(home.state).result).toBe(null);
  home.edit("stale A callback");
  home.suggest();
  posted.resolve({ ok: true, id: 99, thread: "epic-1" });
  await pending;
  await settle();
  expect(get(personal.draft).ask).toBe("new B draft");
  expect(navigated).toEqual([]);
  home.dispose();
  personal.dispose();
});
test("account revision clears Archived cache and fences late restore before page unmount", async () => {
  const timer = manualClock(),
    restored = deferred<{ ok: true }>();
  let current = me(),
    reads = 0;
  const book = {
    id: "aaaaaa",
    title: "Private A",
    folder: null,
    summary: null,
    updated_at: 1,
    archived_at: 2,
    members: null,
  };
  const personal = createPersonalSession(
    homeApi({
      me: async () => current,
      archived: async () => {
        reads++;
        return { books: [book] };
      },
      archive: () => restored.promise,
    }),
    { clock: timer.clock },
  );
  await personal.refresh();
  const archive = createArchivedSession(personal, timer.clock);
  await archive.load();
  const pending = archive.restore(book.id);
  current = me({ email: "b@test.com" });
  personal.acceptIdentity(current.email);
  expect(get(archive.state).books).toEqual([]);
  restored.resolve({ ok: true });
  await pending;
  await archive.load();
  timer.advance(10_000);
  await settle();
  expect(reads).toBe(1);
  expect(get(archive.state).pending).toBe(null);
  expect(get(archive.state).error).toBe("");
  archive.dispose();
  personal.dispose();
});
test("account revision closes create and search owners without relying on host callback", async () => {
  const timer = manualClock(),
    created = deferred<{
      id: string;
      unknown: string[];
      invited: string[];
      cost: number;
    }>(),
    searched = deferred<{ rooms: number; epics: []; messages: [] }>();
  let current = me();
  const personal = createPersonalSession(
    homeApi({
      me: async () => current,
      startRoom: () => created.promise,
      search: () => searched.promise,
    }),
    { clock: timer.clock },
  );
  await personal.refresh();
  const navigation: unknown[] = [],
    creator = createNewRoomSession(
      personal,
      (target) => navigation.push(target),
      timer.clock,
    ),
    search = createSearchSession(
      personal,
      (target) => navigation.push(target),
      timer.clock,
    );
  creator.open();
  creator.edit("A room");
  const pending = creator.submit();
  search.open();
  search.edit("private A");
  timer.advance(250);
  current = me({ email: "b@test.com" });
  personal.acceptIdentity(current.email);
  personal.editCreate("B room");
  created.resolve({ id: "aaaaaa", unknown: [], invited: [], cost: 0 });
  searched.resolve({ rooms: 1, epics: [], messages: [] });
  await pending;
  await settle();
  expect(get(personal.draft).create).toBe("B room");
  expect(get(creator.state).open).toBe(false);
  expect(get(search.state).query).toBe("");
  expect(get(search.state).result).toBe(null);
  expect(navigation).toEqual([]);
  creator.dispose();
  search.dispose();
  personal.dispose();
});
test("agent invalidations during a read replay once and do not publish stale grants", async () => {
  const timer = manualClock(),
    old = deferred<{ agents: []; last_used: number | null }>();
  let reads = 0;
  const personal = createPersonalSession(
    homeApi({
      agents: () =>
        ++reads === 1
          ? old.promise
          : Promise.resolve({ agents: [], last_used: 9 }),
    }),
    { clock: timer.clock },
  );
  const pending = personal.refreshAgents();
  personal.observe({ kind: "agents", book: "*" });
  personal.observe({ kind: "agents", book: "aaaaaa" });
  timer.advance(600);
  expect(reads).toBe(1);
  old.resolve({ agents: [], last_used: 1 });
  await pending;
  await settle();
  expect(reads).toBe(2);
  expect(get(personal.state).agents?.last_used).toBe(9);
  personal.dispose();
});
test("room path matching rejects suffixes and encoded separators", () => {
  for (const path of [
    "/b/aaaaaa/extra",
    "/b/aaaaaa%2Fother",
    "/b/aaaaaa-evil",
    "/b/a",
  ])
    expect(applicationRoute("https://vb.test" + path).kind).toBe("document");
  expect(applicationRoute("https://vb.test/b/aaaaaa/").kind).toBe("room");
});
test("each successful personal reconnect reconciles once and old socket open cannot refresh", async () => {
  const { createPersonalConnection } =
    await import("../svelte/features/home/connection");
  const timer = manualClock();
  let reads = 0;
  function socket(): PersonalSocketFixture & { open(): void; lost(): void } {
    return {
      readyState: 0,
      onopen: null,
      onmessage: null,
      onclose: null,
      close() {
        this.readyState = 3;
      },
      open() {
        this.readyState = 1;
        if (this.onopen) Reflect.apply(this.onopen, this, [{}]);
      },
      lost() {
        this.readyState = 3;
        if (this.onclose) Reflect.apply(this.onclose, this, [{}]);
      },
    };
  }
  const sockets: ReturnType<typeof socket>[] = [],
    connection = createPersonalConnection({
      url: () => "wss://vb.test/ws-me",
      onAccount: () => {},
      onAgents: () => {},
      onConnected: () => {
        reads++;
      },
      onVisible: () => {},
      currentRoom: () => null,
      visible: () => true,
      listenVisibility: () => () => {},
      createSocket: () => {
        const next = socket();
        sockets.push(next);
        return next;
      },
      clock: timer.clock,
    });
  connection.start();
  sockets[0]!.open();
  sockets[0]!.open();
  expect(reads).toBe(1);
  sockets[0]!.lost();
  timer.advance(1000);
  sockets[0]!.open();
  expect(reads).toBe(1);
  sockets[1]!.open();
  expect(reads).toBe(2);
  connection.dispose();
  sockets[1]!.open();
  expect(reads).toBe(2);
});

test("agents timeout releases ownership even when aborted transport never settles", async () => {
  const timer = manualClock(),
    old = deferred<{ agents: []; last_used: number | null }>();
  let reads = 0;
  const personal = createPersonalSession(
    homeApi({
      agents: () =>
        ++reads === 1
          ? old.promise
          : Promise.resolve({ agents: [], last_used: 7 }),
    }),
    { clock: timer.clock },
  );
  const pending = personal.refreshAgents();
  timer.advance(20_000);
  await personal.refreshAgents();
  expect(reads).toBe(2);
  expect(get(personal.state).agents?.last_used).toBe(7);
  old.resolve({ agents: [], last_used: 1 });
  await pending;
  expect(get(personal.state).agents?.last_used).toBe(7);
  personal.dispose();
});

test("navigation account reset releases private rename draft and return-focus reference", async () => {
  const { createAppNavigationSession } =
    await import("../svelte/features/app-navigation/controller");
  const timer = manualClock();
  let current = me({ books: [room("aaaaaa", { title: "Private A title" })] });
  const personal = createPersonalSession(homeApi({ me: async () => current }), {
    clock: timer.clock,
  });
  await personal.refresh();
  const rooms = createRoomsSession(personal, timer.clock),
    controller = createAppNavigationSession(personal, rooms, {
      navigate: () => {},
      home: () => {},
      archived: () => {},
      settings: () => {},
      rename: async () => ({ ok: true }),
    });
  const trigger = { isConnected: true } as HTMLElement;
  controller.syncPath("https://vb.test/b/aaaaaa/");
  controller.openSettings("aaaaaa", trigger);
  controller.askRename("aaaaaa");
  expect(get(controller.state).renameDraft).toBe("Private A title");
  expect(controller.returnFocus(null)).toBe(trigger);
  current = me({ email: "b@test.com" });
  personal.acceptIdentity(current.email);
  expect(get(controller.state).renameDraft).toBe("");
  expect(controller.returnFocus(null)).toBe(null);
  controller.dispose();
  rooms.dispose();
  personal.dispose();
});

test("canonical asks are numbered, task-review waits are a dot, and Claude questions retain their signal", () => {
  expect(waitIndicator([{ ref: "t1" }, { ref: "t2" }])).toEqual({ asks: 0, tasks: true, claude: false });
  expect(waitIndicator([{ ref: "m1" }, { ref: "a2" }, { ref: "b3" }, { ref: "t4" }])).toEqual({ asks: 3, tasks: true, claude: true });
  expect(waitIndicator([{ ref: "m1" }])).toEqual({ asks: 1, tasks: false, claude: false });
  // A refreshed server list after a human reply removes the ask, not their task.
  expect(waitIndicator([{ ref: "t4" }])).toEqual({ asks: 0, tasks: true, claude: false });
  expect(waitIndicator([])).toEqual({ asks: 0, tasks: false, claude: false });
});
