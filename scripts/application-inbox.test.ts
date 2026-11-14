import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { createApplicationServices } from "../svelte/features/application/services";
import {
  createApplicationInbox,
  type InboxBinding,
} from "../svelte/features/application/inbox";
import { HomeFailure } from "../svelte/features/home/api";
import type { HomeApi } from "../svelte/features/home/api";
import {
  homeApi,
  me,
  manualClock,
  deferred,
  settle,
} from "./native-home-fixtures";
const wait = {
  book_id: "aaaaaa",
  room: "Room",
  ref: "m1",
  thread: "main",
  topic: null,
  author: "friend@test",
  author_name: "Friend",
  text: "Question",
  ts: 1,
};
async function fixture(
  resolve: HomeApi["resolve"] = async () => ({ ok: true }),
  inboxRead?: HomeApi["inbox"],
) {
  const timer = manualClock(),
    documents: string[] = [];
  let href = "https://vb.test/app?ui=svelte",
    canonical = me({ waits: [wait] }),
    reads = 0;
  const services = createApplicationServices({
    browser: {
      origin: "https://vb.test",
      href: () => href,
      history: {
        pushState(_data, _title, value) {
          href = new URL(String(value), href).href;
        },
        replaceState(_data, _title, value) {
          href = new URL(String(value), href).href;
        },
      },
      socketUrl: (path) => `wss://vb.test${path}`,
      visible: () => true,
      listenVisibility: () => () => {},
      listenPop: () => () => {},
      enqueue: queueMicrotask,
      navigateDocument: (value) => documents.push(value),
      reload() {},
      logoutPost: async () => ({ ok: true }),
      logoutWarning() {},
      logoutFailure() {},
      shellVersion: "development",
      clock: { ...timer.clock, now: () => 0 },
    },
    homeApi: homeApi({
      me: async () => {
        reads++;
        return canonical;
      },
      resolve,
      inbox:
        inboxRead ??
        (async () => ({ waits: canonical.waits, mentions: [], tasks: [] })),
    }),
    pwa: () => ({
      account() {},
      beforeLogout: async () => ({
        local: true,
        settled: true,
        confirmed: true,
      }),
      dispose() {},
    }),
    personalConnection: () => ({ start() {}, restart() {}, dispose() {} }),
    roomConnection: () => ({
      start() {},
      dispose() {},
      resync() {},
      send: () => true,
      request: async () => ({ ok: true }),
    }),
  });
  const inbox = createApplicationInbox(services, timer.clock);
  services.start();
  await settle();
  return {
    services,
    inbox,
    timer,
    reads: () => reads,
    documents,
    href: () => href,
    canonical(value: typeof canonical) {
      canonical = value;
    },
    dispose() {
      inbox.dispose();
      services.dispose();
    },
  };
}
test("Inbox callbacks own an exact account/opening and reject stale or absent canonical targets", async () => {
  let writes = 0;
  const h = await fixture(async () => {
    writes++;
    return { ok: true };
  });
  h.inbox.open();
  const a = get(h.inbox.state).binding!;
  h.inbox.close(a);
  h.inbox.open();
  const b = get(h.inbox.state).binding!;
  await h.inbox.resolve(a, wait);
  h.inbox.close(a);
  expect(get(h.inbox.state).binding === b).toBe(true);
  expect(writes).toBe(0);
  h.canonical(me({ waits: [] }));
  await h.services.personal.refresh();
  await h.inbox.resolve(b, wait);
  expect(writes).toBe(0);
  h.dispose();
});
test("late resolve completion cannot refresh another identity or opening", async () => {
  const late = deferred<{ ok: true }>(),
    h = await fixture(() => late.promise);
  h.inbox.open();
  const binding = get(h.inbox.state).binding!;
  const operation = h.inbox.resolve(binding, wait);
  await settle();
  h.inbox.close(binding);
  const before = h.reads();
  late.resolve({ ok: true });
  await operation;
  await settle();
  expect(h.reads()).toBe(before);
  expect(get(h.inbox.state).binding).toBe(null);
  h.dispose();
});
test("known global401 revokes the document; identity changes synchronously fence old Inbox callbacks", async () => {
  const h = await fixture(async () => {
    throw new HomeFailure("unauthenticated", 401);
  });
  h.inbox.open();
  await h.inbox.resolve(get(h.inbox.state).binding!, wait);
  expect(h.services.active()).toBe(false);
  expect(get(h.services.state).sessionDenied).toBe(true);
  expect(h.services.personal.peek()).toBe(null);
  expect(h.documents[0]).toContain("/login?");
  h.dispose();
  let writes = 0;
  const other = await fixture(async () => {
    writes++;
    return { ok: true };
  });
  other.inbox.open();
  const old = get(other.inbox.state).binding!;
  other.canonical(me({ email: "other@test", waits: [wait] }));
  await other.services.personal.refresh();
  await other.inbox.resolve(old, wait);
  expect(writes).toBe(0);
  expect(get(other.inbox.state).binding).toBe(null);
  other.dispose();
});
test("Inbox deadline settles an ignored-abort write without refreshing after its late ACK", async () => {
  const late = deferred<{ ok: true }>(),
    h = await fixture(() => late.promise);
  h.inbox.open();
  const operation = h.inbox.resolve(get(h.inbox.state).binding!, wait);
  const failure = operation.catch((error) =>
    error instanceof Error ? error.message : "unexpected",
  );
  await settle();
  const before = h.reads();
  h.timer.advance(20_000);
  expect(await failure).toBe("timeout");
  late.resolve({ ok: true });
  await settle();
  expect(h.reads()).toBe(before);
  h.dispose();
});

const mention = {
  book_id: "aaaaaa",
  room: "Room",
  msg_id: 7,
  thread: "main",
  author: "friend@test",
  author_name: "Friend",
  text: "Mention",
  ts: 1,
};
const task = {
  book_id: "aaaaaa",
  room: "Room",
  epic_id: "e",
  epic: "Epic",
  task_id: "task1",
  title: "Task",
  status: "doing",
  due: null,
};
test("Inbox ignored-abort read deadline permits explicit retry and ignores late older data", async () => {
  const first = deferred<Awaited<ReturnType<HomeApi["inbox"]>>>();
  let reads = 0;
  const h = await fixture(undefined, async () =>
    ++reads === 1
      ? first.promise
      : { waits: [wait], mentions: [mention], tasks: [task] },
  );
  h.inbox.open();
  const binding = get(h.inbox.state).binding!;
  await settle();
  expect(get(h.inbox.state).phase).toBe("loading");
  h.timer.advance(20_000);
  await settle();
  expect(get(h.inbox.state).phase).toBe("error");
  expect(reads).toBe(1);
  await h.inbox.refresh(binding);
  expect(get(h.inbox.state).data.mentions).toEqual([mention]);
  first.resolve({ waits: [], mentions: [], tasks: [] });
  await settle();
  expect(get(h.inbox.state).phase).toBe("ready");
  expect(get(h.inbox.state).data.tasks).toEqual([task]);
  h.dispose();
});
test("closed and replaced Inbox openings never accept late rows or stale row navigation", async () => {
  const first = deferred<Awaited<ReturnType<HomeApi["inbox"]>>>();
  let reads = 0;
  const h = await fixture(undefined, async () =>
    ++reads === 1
      ? first.promise
      : { waits: [wait], mentions: [{ ...mention }], tasks: [{ ...task }] },
  );
  h.inbox.open();
  const old = get(h.inbox.state).binding!;
  await settle();
  h.inbox.close(old);
  h.inbox.open();
  await settle();
  const binding = get(h.inbox.state).binding!,
    current = get(h.inbox.state).data.mentions[0];
  first.resolve({
    waits: [],
    mentions: [{ ...mention, text: "Old private response" }],
    tasks: [],
  });
  await settle();
  expect(get(h.inbox.state).data.mentions).toEqual([mention]);
  const before = h.href();
  h.inbox.openMention(old, current);
  h.inbox.openMention(binding, { ...current });
  expect(h.href()).toBe(before);
  h.inbox.openMention(binding, current);
  expect(h.href()).toContain("/b/aaaaaa?ui=svelte#m7");
  expect(get(h.inbox.state).binding).toBeNull();
  h.dispose();
});
test("Inbox read401 clears document authority and late account reads cannot restore private data", async () => {
  const h = await fixture(undefined, async () => {
    throw new HomeFailure("unauthenticated", 401);
  });
  h.inbox.open();
  await settle();
  expect(h.services.active()).toBe(false);
  expect(get(h.inbox.state).data).toEqual({
    waits: [],
    mentions: [],
    tasks: [],
  });
  h.dispose();
  const late = deferred<Awaited<ReturnType<HomeApi["inbox"]>>>();
  const other = await fixture(undefined, () => late.promise);
  other.inbox.open();
  await settle();
  other.canonical(me({ email: "other@test", waits: [] }));
  await other.services.personal.refresh();
  late.resolve({ waits: [wait], mentions: [mention], tasks: [task] });
  await settle();
  expect(get(other.inbox.state).binding).toBeNull();
  expect(get(other.inbox.state).data.mentions).toEqual([]);
  other.dispose();
});
test("canonical task navigation preserves its exact epic and closes only the current opening", async () => {
  const h = await fixture(undefined, async () => ({
    waits: [],
    mentions: [],
    tasks: [task],
  }));
  h.inbox.open();
  await settle();
  const binding = get(h.inbox.state).binding!,
    row = get(h.inbox.state).data.tasks[0];
  h.inbox.openTask(binding, row);
  const url = new URL(h.href());
  expect(url.pathname).toBe("/b/aaaaaa");
  expect(url.searchParams.get("t")).toBe("e");
  expect(get(h.inbox.state).binding).toBeNull();
  h.dispose();
});
test("reentrant loading publication cannot start a replaced read or allocate its deadline", async () => {
  let reads = 0;
  const h = await fixture(undefined, async () => {
    reads++;
    return { waits: [], mentions: [mention], tasks: [] };
  });
  let replaced = false;
  const stop = h.inbox.state.subscribe((value) => {
    if (value.binding && value.phase === "loading" && !replaced) {
      replaced = true;
      void h.inbox.refresh(value.binding);
    }
  });
  h.inbox.open();
  await settle();
  expect(reads).toBe(1);
  expect(get(h.inbox.state).phase).toBe("ready");
  stop();
  h.dispose();
});
test("reentrant close publication cannot resurrect captured private opening after session loss or disposal", async () => {
  for (const effect of ["session", "dispose"] as const) {
    const h = await fixture();
    let armed = false;
    const stop = h.inbox.state.subscribe((value) => {
      if (armed && !value.binding) {
        armed = false;
        if (effect === "session") h.services.actions.sessionLost();
        else h.inbox.dispose();
      }
    });
    armed = true;
    h.inbox.open();
    await settle();
    expect(get(h.inbox.state).binding).toBeNull();
    expect(get(h.inbox.state).data).toEqual({
      waits: [],
      mentions: [],
      tasks: [],
    });
    stop();
    h.dispose();
  }
});
test("reentrant new opening and newer route win over outgoing open and row navigation", async () => {
  const h = await fixture(undefined, async () => ({
    waits: [wait],
    mentions: [mention],
    tasks: [],
  }));
  let armed = false,
    replacement: InboxBinding | null = null;
  const stop = h.inbox.state.subscribe((value) => {
    if (armed && !value.binding) {
      armed = false;
      h.inbox.open();
      replacement = get(h.inbox.state).binding;
    }
  });
  armed = true;
  h.inbox.open();
  await settle();
  expect(get(h.inbox.state).binding).toBe(replacement!);
  stop();
  const binding = get(h.inbox.state).binding!,
    row = get(h.inbox.state).data.mentions[0];
  let leave = false;
  const stopRoute = h.inbox.state.subscribe((value) => {
    if (leave && !value.binding) {
      leave = false;
      h.services.actions.navigate({ roomId: "bbbbbb" });
    }
  });
  leave = true;
  h.inbox.openMention(binding, row);
  expect(new URL(h.href()).pathname).toBe("/b/bbbbbb");
  stopRoute();
  h.dispose();
});
