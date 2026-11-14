import { expect, test } from "bun:test";
import type { Room } from "../shared/room";
import type { Wait } from "../svelte/types";
import {
  needsItems,
  dismissedKeys,
  needsStorageKey,
} from "../svelte/features/needs-you/model";
import { createNeedsYou } from "../svelte/features/needs-you/session";
import { activeEpics, epicForest } from "../svelte/features/navigation/model";
import { HomeFailure, type HomeApi } from "../svelte/features/home/api";
import { deferred, manualClock, settle } from "./native-home-fixtures";
const fixture = (): Room => ({
  id: "abc123",
  me: "me@test.com",
  book: { title: "Room", owner: "me@test.com" },
  members: ["me@test.com"],
  online: [],
  typing: {},
  messages: [],
  suggestions: [],
  roomTasks: [
    {
      id: "t",
      title: "Own task",
      owner: "me@test.com",
      done: false,
      status: "todo",
    },
  ],
  epics: [{ id: "e", title: "Epic", tasks: [] }],
});
const wait = (ref = "m7", thread = "main"): Wait => ({
  book_id: "abc123",
  room: "Room",
  ref,
  thread,
  topic: null,
  author: "friend@test.com",
  author_name: "Friend",
  text: "Question",
  ts: 1,
});
function harness(resolve: HomeApi["resolve"] = async () => ({ ok: true })) {
  let room = fixture(),
    thread = "main",
    waits: Wait[] = [wait()],
    current = true,
    denied = 0,
    resolved = 0,
    changes = 0;
  const clock = manualClock(),
    store = new Map<string, string>(),
    nav: number[] = [];
  const owner = createNeedsYou({
    current: () => current,
    read: () => ({ room, thread, waits }),
    storage: {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => {
        store.set(key, value);
      },
    },
    clock: { ...clock.clock, now: () => 0 },
    resolve,
    navigate: (id) => {
      nav.push(id);
    },
    changed: () => {
      changes++;
    },
    denied: () => {
      denied++;
      current = false;
    },
    resolved: () => {
      resolved++;
    },
  });
  return {
    owner,
    store,
    nav,
    clock,
    get room() {
      return room;
    },
    set room(value: Room) {
      room = value;
    },
    set thread(value: string) {
      thread = value;
    },
    get waits() {
      return waits;
    },
    set waits(value: Wait[]) {
      waits = value;
    },
    leave() {
      current = false;
    },
    get denied() {
      return denied;
    },
    get resolved() {
      return resolved;
    },
    get changes() {
      return changes;
    },
  };
}
test("current-thread waits and own open tasks preserve ordering, task deduplication and exact refs", () => {
  const room = fixture();
  room.roomTasks?.push(
    {
      id: "foreign",
      title: "Other",
      owner: "other@test.com",
      done: false,
      status: "todo",
    },
    { id: "done", title: "Done", owner: room.me, done: true, status: "done" },
  );
  const items = needsItems(room, "main", [
    wait(),
    wait("a9"),
    wait("tt"),
    wait("m8", "e"),
    { ...wait("m10"), book_id: "foreign" },
  ]);
  expect(items.map((item) => item.key)).toEqual(["w:m7", "w:a9", "w:tt"]);
  expect(items.map((item) => item.messageId)).toEqual([7, 9, undefined]);
  expect(needsItems(room, "pre:0", [wait()])).toEqual([]);
  expect(needsItems(room, "removed", [wait("m8", "removed")])).toEqual([]);
  expect(
    needsItems(room, "main", [wait("m" + "9".repeat(400))])[0].messageId,
  ).toBeUndefined();
});
test("dismissal stays scoped, survives reopening, and only new task status/ref resurfaces", () => {
  const h = harness();
  let view = h.owner.view()!;
  h.owner.dismiss(view.binding, [
    view.items.find((item) => item.key.startsWith("t:"))!,
  ]);
  expect(h.owner.view()?.items.map((item) => item.key)).toEqual(["w:m7"]);
  h.room.roomTasks![0].status = "doing";
  expect(h.owner.view()?.items.some((item) => item.key === "t:t:doing")).toBe(
    true,
  );
  h.thread = "e";
  expect(h.owner.view()?.items).toEqual([]);
  h.thread = "main";
  expect(h.owner.view()?.items.some((item) => item.key === "t:t:todo")).toBe(
    false,
  );
  const key = needsStorageKey(view.binding);
  expect(dismissedKeys(h.store.get(key) ?? null).has("t:t:todo")).toBe(true);
  expect(
    needsStorageKey({ ...view.binding, account: "other@test.com" }),
  ).not.toBe(key);
  expect(dismissedKeys("{bad").size).toBe(0);
  expect(
    dismissedKeys(
      JSON.stringify(Array.from({ length: 250 }, (_, i) => "t:" + i)),
    ).size,
  ).toBe(200);
  h.owner.dispose();
});
test("captured canonical rows cannot dismiss edited/replaced prompts, another thread or account", () => {
  const h = harness(),
    view = h.owner.view()!,
    item = view.items[0];
  h.waits = [{ ...wait(), text: "Replacement question" }];
  h.owner.dismiss(view.binding, [item]);
  h.owner.navigate(view.binding, item);
  expect(h.store.size).toBe(0);
  expect(h.nav).toEqual([]);
  h.waits = [wait()];
  h.thread = "e";
  h.owner.dismiss(view.binding, view.items);
  expect(h.store.size).toBe(0);
  h.thread = "main";
  h.room = { ...h.room, me: "other@test.com" };
  h.owner.navigate(view.binding, item);
  expect(h.nav).toEqual([]);
  h.owner.dispose();
});
test("Dismiss all locally hides captured rows, resolves only message waits, and does not hide an unseen new item", async () => {
  const refs: string[] = [];
  const h = harness(async (_room, ref) => {
    refs.push(ref);
    return { ok: true };
  });
  h.waits = [wait(), wait("a9")];
  const view = h.owner.view()!;
  h.waits.push(wait("m11"));
  h.owner.dismiss(view.binding, view.items);
  await settle();
  expect(refs).toEqual(["m7"]);
  expect(h.owner.view()?.items.map((item) => item.key)).toEqual(["w:m11"]);
  expect(h.resolved).toBe(1);
  h.owner.dispose();
});
test("deadline is independent of ignored abort and explicit idempotent retry cannot settle another scope", async () => {
  const late = deferred<{ ok: true }>();
  let writes = 0;
  const h = harness(async () => (++writes === 1 ? late.promise : { ok: true }));
  const view = h.owner.view()!;
  h.owner.dismiss(view.binding, [view.items[0]]);
  await settle();
  expect(writes).toBe(1);
  h.clock.advance(20_000);
  await settle();
  const failed = h.owner.view()!;
  expect(failed.error).toBe(true);
  expect(writes).toBe(1);
  h.owner.retry(failed.binding, failed.operation);
  await settle();
  expect(writes).toBe(2);
  expect(h.resolved).toBe(1);
  h.thread = "e";
  h.owner.view();
  late.resolve({ ok: true });
  await settle();
  expect(h.resolved).toBe(1);
  expect(h.owner.view()?.error).toBe(false);
  h.owner.dispose();
});
test("known401 revokes authority; disposed completion and repeat old controls do not issue new writes", async () => {
  let writes = 0;
  const h = harness(async () => {
    writes++;
    throw new HomeFailure("unauthenticated", 401);
  });
  const view = h.owner.view()!;
  h.owner.dismiss(view.binding, view.items);
  await settle();
  expect(h.denied).toBe(1);
  h.owner.dismiss(view.binding, view.items);
  expect(writes).toBe(1);
  expect(h.owner.view()).toBeNull();
  h.owner.dispose();
  const late = deferred<{ ok: true }>(),
    other = harness(() => late.promise),
    old = other.owner.view()!;
  other.owner.dismiss(old.binding, [old.items[0]]);
  other.owner.dispose();
  late.resolve({ ok: true });
  await settle();
  expect(other.resolved).toBe(0);
});
test("selected archived epic stays in its normal tree position and leaves on navigation", () => {
  const epics = [
    { id: "a", title: "A", tasks: [], order: 1 },
    { id: "b", title: "B", tasks: [], order: 2, archived: true },
    { id: "c", title: "C", tasks: [], order: 3 },
  ];
  expect(
    epicForest(activeEpics(epics, "b")).roots.map((epic) => epic.id),
  ).toEqual(["a", "b", "c"]);
  expect(activeEpics(epics, "main").map((epic) => epic.id)).toEqual(["a", "c"]);
  expect(activeEpics(epics, "b").filter((epic) => !epic.archived)).toHaveLength(
    2,
  );
});
