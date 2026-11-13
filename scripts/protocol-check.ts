import assert from "node:assert/strict";
import type { RoomCommand } from "../shared/commands";
import type { RoomEvent } from "../shared/room";
import {
  isPostMessageRequest,
  isRoomCommand,
  isRoomEvent,
  parseRoomCommand,
  parseRoomEvent,
} from "../shared/validation";
import {
  createRoomApi,
  receiveRoomEvent,
  sendRoomCommand,
  type FetchLike,
} from "../svelte/transport";

const task = {
  id: "task",
  title: "Verify",
  status: "todo" as const,
  done: false,
  owner: null,
  due: null,
};
const state: RoomEvent = {
  t: "state",
  me: "one@example.com",
  book: {
    title: "Room",
    owner: "one@example.com",
    summary: null,
    folder: null,
  },
  messages: [
    {
      id: 1,
      thread: "main",
      author: "one@example.com",
      ts: 1,
      text: "Hi",
      kind: null,
      poll: null,
      tag: null,
      via: null,
      reply_to: null,
      choices: null,
      card: null,
      files: [],
    },
  ],
  epics: [
    {
      id: "epic",
      title: "Epic",
      tasks: [task],
      from_msg: null,
      parent: null,
      prod: null,
    },
  ],
  members: ["one@example.com"],
  online: [],
  suggestions: [],
  requests: [{ email: "two@example.com", name: null, ts: 1 }],
  reminders: [
    {
      id: "reminder",
      text: "Do it",
      owner: "one@example.com",
      enabled: false,
      name: null,
      error: null,
      next_at: null,
      cron: null,
      every: null,
    },
  ],
  acks: [
    {
      msg_id: 1,
      email: "one@example.com",
      who: "Codex",
      status: "done",
      ts: 1,
      note: null,
    },
  ],
};
assert.deepEqual(parseRoomEvent(JSON.stringify(state)), state);
assert.deepEqual(receiveRoomEvent(JSON.stringify(state)), state);
const legacy = {
  ...state,
  epics: state.epics.map((epic) => ({
    ...epic,
    tasks: epic.tasks.map((task) => ({ ...task, done: task.done ? 1 : 0 })),
  })),
  reminders: state.reminders?.map((reminder) => ({
    ...reminder,
    enabled: reminder.enabled ? 1 : 0,
  })),
};
assert.deepEqual(parseRoomEvent(JSON.stringify(legacy)), state);
assert.deepEqual(
  parseRoomEvent(
    JSON.stringify({ t: "epicsPatch", changed: legacy.epics, order: ["epic"] }),
  ),
  { t: "epicsPatch", changed: state.epics, order: ["epic"] },
);
assert.throws(
  () =>
    parseRoomEvent(
      JSON.stringify({
        ...state,
        epics: [{ ...state.epics[0], tasks: [{ ...task, done: 2 }] }],
      }),
    ),
  /Invalid room event/,
);
assert.throws(() => receiveRoomEvent(new ArrayBuffer(0)), /JSON text/);
assert(
  !isRoomEvent({
    ...state,
    epics: [{ ...state.epics[0], tasks: [{ ...task, status: "invalid" }] }],
  }),
);
assert(
  !isRoomEvent({
    ...state,
    messages: [{ ...state.messages[0], files: [{ id: "file" }] }],
  }),
);
assert(!isRoomEvent({ ...state, reminders: [{ id: "bad", enabled: "yes" }] }));
assert(!isRoomEvent({ t: "invented-event" }));
assert.throws(() => parseRoomEvent('{"t":"msg","m":{}}'), /Invalid room event/);
const commands: RoomCommand[] = [
  { t: "task.status", id: "task", status: "review" },
  { t: "suggestion", i: 0 },
  { t: "doc.get", epic: null },
  { t: "msg", thread: "main", text: "Hi", reply_to: null },
  { t: "epic.order", ids: ["epic"] },
];
for (const command of commands)
  assert.deepEqual(parseRoomCommand(JSON.stringify(command)), command);
assert(!isRoomCommand({ t: "task.status", id: "task", status: "invalid" }));
assert(!isRoomCommand({ t: "epic.order", ids: [1] }));
assert(!isRoomCommand({ t: "reminder.enable", id: "reminder", on: "yes" }));
assert(!isRoomCommand({ t: "msg", thread: "main", files: [{}] }));
assert.throws(() => parseRoomCommand("null"), /Invalid room command/);
assert.deepEqual(parseRoomCommand('{"t":"decision.del","id":"42"}'), {
  t: "decision.del",
  id: 42,
});
assert.throws(
  () => parseRoomCommand('{"t":"decision.del","id":"invalid"}'),
  /Invalid room command/,
);
assert.throws(
  () => parseRoomCommand('{"t":"decision.del","id":"999999999999999999999"}'),
  /Invalid room command/,
);
const sent: string[] = [];
assert.equal(
  sendRoomCommand(
    { readyState: 1, send: (text) => sent.push(text) },
    commands[0]!,
  ),
  true,
);
assert.deepEqual(JSON.parse(sent[0]!), commands[0]);
assert.equal(sendRoomCommand(null, commands[0]!), false);
assert.equal(
  sendRoomCommand(
    { readyState: 3, send: () => assert.fail("closed socket") },
    commands[0]!,
  ),
  false,
);
assert(isPostMessageRequest({ text: "Hello", thread: "main" }));
assert(!isPostMessageRequest({ text: 42 }));
assert(!isPostMessageRequest({ text: "Hello", thread: {} }));
assert(!isPostMessageRequest(null));
const calls: { url: string; init?: RequestInit }[] = [];
const fetcher: FetchLike = async (url, init) => {
  calls.push({ url: String(url), init });
  return Response.json({ ok: true, id: 2, thread: "main" });
};
const api = createRoomApi("room/id", fetcher);
assert.deepEqual(await api.postMessage({ text: "Hello" }), {
  ok: true,
  id: 2,
  thread: "main",
});
assert.equal(calls[0]?.url, "/api/books/room%2Fid/post");
assert.deepEqual(JSON.parse(String(calls[0]?.init?.body)), { text: "Hello" });
const file = {
  id: "file",
  name: "reminders/check.md",
  type: "text/markdown",
  size: 3,
  author: "one@example.com",
  ts: 1,
  reminder: { ok: false, error: "schedule missing" },
};
const upload = createRoomApi("room", async () => Response.json(file));
assert.deepEqual(
  await upload.uploadFile({ name: file.name, type: file.type, body: "abc" }),
  file,
);
const scheduled = {
  ...file,
  reminder: {
    ok: true,
    name: "check",
    every: "daily",
    cron: "0 8 * * *",
    timezone: "UTC",
    next_at: "2026-11-13T08:00:00.000Z",
  },
};
assert.deepEqual(
  await createRoomApi("room", async () => Response.json(scheduled)).uploadFile({
    name: file.name,
    type: file.type,
    body: "abc",
  }),
  scheduled,
);
await assert.rejects(
  createRoomApi("room", async () => Response.json({ id: 1 })).postMessage({
    text: "Hi",
  }),
  /Invalid post response/,
);
await assert.rejects(
  createRoomApi("room", async () =>
    Response.json({ error: "forbidden" }, { status: 403 }),
  ).postMessage({ text: "Hi" }),
  /forbidden/,
);
assert.deepEqual(
  await createRoomApi("room", async () =>
    Response.json({ ok: false, error: "Message is empty" }, { status: 400 }),
  ).postMessage({ text: "" }),
  { ok: false, error: "Message is empty" },
);
await assert.rejects(
  createRoomApi(
    "room",
    async () => new Response("Unavailable", { status: 503 }),
  ).postMessage({ text: "Hi" }),
  /HTTP 503/,
);
await assert.rejects(
  createRoomApi("room", async () =>
    Response.json({ ...file, reminder: { ok: "yes" } }),
  ).uploadFile({ name: "a", type: "text/plain", body: "x" }),
  /Invalid reminder response/,
);
console.log(
  "PASS shared event/command validation, nullable DTOs, typed socket and HTTP transports",
);

// Invalidation and replacement are distinct; an empty event must never erase a document.
assert(!isRoomEvent({ t: "doc" }));
assert(!isRoomEvent({ t: "doc", fetched: true }));
assert(!isRoomEvent({ t: "doc", stale: true }));
assert(
  !isRoomEvent({
    t: "doc",
    epic: "epic",
    stale: true,
    text: "conflicting replacement",
  }),
);
assert(isRoomEvent({ t: "doc", text: "" }));
assert(isRoomEvent({ t: "doc", epic: "epic", stale: true }));
assert.throws(() => parseRoomEvent('{"t":"doc"}'), /Invalid room event/);

// Correlated commands (#1899): cid travels beside the command, results are their own event.
{
  const { parseCommandEnvelope, isRoomEvent: isEvent } =
    await import("../shared/validation");
  assert.deepEqual(parseCommandEnvelope('{"t":"files.get","cid":"c1"}'), {
    cid: "c1",
    command: { t: "files.get", cid: "c1" },
  });
  assert.deepEqual(parseCommandEnvelope('{"t":"files.get"}'), {
    command: { t: "files.get" },
  });
  assert.deepEqual(parseCommandEnvelope('{"t":"nope","cid":"c2"}'), {
    cid: "c2",
    command: null,
  });
  assert.deepEqual(parseCommandEnvelope("not json"), { command: null });
  assert.equal(
    parseCommandEnvelope(`{"t":"files.get","cid":"${"x".repeat(65)}"}`).cid,
    undefined,
  );
  assert.equal(
    parseCommandEnvelope('{"t":"decision.del","id":"7","cid":"c3"}').command?.t,
    "decision.del",
  );
  assert(isEvent({ t: "result", cid: "c1", ok: true }));
  assert(isEvent({ t: "result", cid: "c1", ok: false, error: "x" }));
  assert(!isEvent({ t: "result", cid: "c1", ok: false }));
  console.log("PASS correlated command envelope and result events");
}
