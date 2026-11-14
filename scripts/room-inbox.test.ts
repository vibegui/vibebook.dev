import { expect, test } from "bun:test";
import { get } from "svelte/store";
import type { InboxResult } from "../shared/schemas";
import type { Wait, InboxMention, InboxTask } from "../svelte/types";
import { roomInboxModel } from "../svelte/features/application/roomInboxModel";
import { createApplicationInbox } from "../svelte/features/application/inbox";
import { roomScopeFixture } from "./room-scope-fixtures";
import { deferred, me, settle } from "./native-home-fixtures";
const wait = (ref: string, ts = 2, book_id = "aaaaaa"): Wait => ({
  book_id,
  room: "Room",
  ref,
  thread: "main",
  topic: null,
  author: "me@test.com",
  author_name: "Me",
  text: ref,
  ts,
});
const mention = (msg_id: number, ts = 3, book_id = "aaaaaa"): InboxMention => ({
  book_id,
  room: "Room",
  msg_id,
  thread: "main",
  author: "other@test.com",
  author_name: "Other",
  text: "Mention " + msg_id,
  ts,
});
const task = (task_id: string, book_id = "aaaaaa"): InboxTask => ({
  book_id,
  room: "Room",
  epic_id: "other",
  epic: "Other",
  task_id,
  title: "Task " + task_id,
  status: "todo",
  due: null,
});
test("room Inbox projects oldest-first asks/Claude/mentions without repeated message cards", () => {
  const data: InboxResult = {
    waits: [wait("m7", 4), wait("a9", 1), wait("tt1")],
    mentions: [mention(7), mention(11, 3)],
    tasks: [task("t1"), task("t2")],
  };
  const view = roomInboxModel(data, "aaaaaa", false);
  expect(view.messages.map((row) => [row.kind, row.messageId])).toEqual([
    ["claude", 9],
    ["mention", 11],
    ["ask", 7],
  ]);
  expect(view.oks.map((row) => row.ref)).toEqual(["tt1"]);
  expect(
    view.groups.flatMap((group) => group.tasks.map((row) => row.task_id)),
  ).toEqual(["t2"]);
  expect(view.groups[0].first).toBe(data.tasks[1]);
});
test("current/all room filtering and task-wait dedupe retain exact book identities", () => {
  const data: InboxResult = {
    waits: [wait("tt1")],
    mentions: [mention(1), mention(2, 1, "bbbbbb")],
    tasks: [task("t1"), task("t1", "bbbbbb")],
  };
  expect(roomInboxModel(data, "aaaaaa", false).groups).toEqual([]);
  const all = roomInboxModel(data, "aaaaaa", true);
  expect(all.messages.map((row) => row.book)).toEqual(["bbbbbb", "aaaaaa"]);
  expect(
    all.groups.map((group) => [group.bookId, group.tasks[0].task_id]),
  ).toEqual([["bbbbbb", "t1"]]);
});
test("authorized room opening owns its exact scope and terminal removal synchronously clears private rows", async () => {
  const h = await roomScopeFixture(
      { roomId: "aaaaaa" },
      {
        inbox: async () => ({
          waits: [],
          mentions: [mention(7)],
          tasks: [task("t1")],
        }),
      },
    ),
    owner = createApplicationInbox(h.app.services, h.app.timer.clock);
  owner.open();
  await settle();
  const binding = get(owner.state).binding!;
  expect(!!binding.roomScope).toBe(true);
  const row = get(owner.state).data.tasks[0];
  h.app.connectionCallbacks.at(-1)!.onRemoved?.();
  expect(get(owner.state).binding === null).toBe(true);
  expect(get(owner.state).data).toEqual({ waits: [], mentions: [], tasks: [] });
  const href = h.app.href();
  owner.openTask(binding, row);
  expect(h.app.href()).toBe(href);
  owner.dispose();
  h.dispose();
});
test("Personal canonical wait updates win over an older pending Inbox HTTP response", async () => {
  const late = deferred<InboxResult>(),
    h = await roomScopeFixture(
      { roomId: "aaaaaa" },
      { inbox: () => late.promise },
    ),
    owner = createApplicationInbox(h.app.services, h.app.timer.clock);
  await settle();
  h.app.canonical(me({ waits: [wait("m7")] }));
  await h.app.services.personal.refresh();
  owner.open();
  await settle();
  expect(get(owner.state).data.waits).toHaveLength(1);
  h.app.canonical(me({ waits: [] }));
  await h.app.services.personal.refresh();
  expect(get(owner.state).data.waits).toEqual([]);
  late.resolve({ waits: [wait("m7")], mentions: [], tasks: [] });
  await settle();
  expect(get(owner.state).data.waits).toEqual([]);
  owner.dispose();
  h.dispose();
});
test("identical canonical refresh retains row identity while unowned clones and old openings cannot navigate", async () => {
  const h = await roomScopeFixture(
      { roomId: "aaaaaa" },
      { inbox: async () => ({ waits: [], mentions: [mention(7)], tasks: [] }) },
    ),
    owner = createApplicationInbox(h.app.services, h.app.timer.clock);
  owner.open();
  await settle();
  const binding = get(owner.state).binding!,
    row = get(owner.state).data.mentions[0];
  await owner.refresh(binding);
  expect(get(owner.state).data.mentions[0] === row).toBe(true);
  const before = h.app.href();
  owner.openMention(binding, { ...row });
  expect(h.app.href()).toBe(before);
  owner.close(binding);
  owner.open();
  await settle();
  owner.openMention(binding, row);
  expect(h.app.href()).toBe(before);
  owner.dispose();
  h.dispose();
});
