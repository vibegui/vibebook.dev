import { expect, test } from "bun:test";
import { get } from "svelte/store";
import {
  createComposerDrafts,
  definiteMessageFailure,
  type ComposerClock,
} from "../svelte/features/composer/drafts";
import {
  mediaType,
  normalizeFile,
  fileIssue,
  mentionPicks,
  emojiPicks,
  insertAt,
  matchingMessage,
} from "../svelte/features/composer/model";
import {
  createSpeechController,
  type SpeechRecognizer,
} from "../svelte/features/composer/speech";
import {
  privateAskForOther,
  permissionReply,
  visibleChatMessages,
} from "../svelte/features/chat/privacy";
import type { Message, Room, Attachment } from "../shared/room";
import type { RoomCommand, CommandOutcome } from "../shared/commands";
import type { UploadFileResult } from "../shared/schemas";
const message = (
  id: number,
  text: string,
  patch: Partial<Message> = {},
): Message => ({
  id,
  thread: "main",
  author: "me@test",
  kind: null,
  text,
  ts: id,
  ...patch,
});
const room = (): Room => ({
  id: "abc123",
  me: "me@test",
  book: { title: "Room", owner: "me@test" },
  members: ["me@test", "you@test"],
  names: { "you@test": "José Silva" },
  online: [],
  typing: {},
  messages: [message(10, "before")],
  epics: [{ id: "epic", title: "Epic", tasks: [] }],
  suggestions: [],
  polls: {},
});
const meta = (id = "aa11"): Attachment => ({
  id,
  name: "report.txt",
  type: "text/plain",
  size: 4,
  author: "me@test",
  ts: 1,
});
function deferred<T>() {
  let resolve!: (value: T) => void, reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
function clock() {
  let next = 0;
  const jobs = new Map<number, () => void>();
  const api: ComposerClock = {
    schedule: (fn) => {
      jobs.set(++next, fn);
      return next;
    },
    cancel: (ticket) => {
      jobs.delete(ticket as number);
    },
  };
  return {
    api,
    jobs,
    fire() {
      const pending = [...jobs.values()];
      jobs.clear();
      for (const job of pending) job();
    },
  };
}
function harness() {
  const timer = clock(),
    drafts = createComposerDrafts(timer.api),
    scope = { account: "me@test", roomId: "abc123", thread: "main" },
    entry = drafts.entry(scope),
    commands: RoomCommand[] = [],
    reply = deferred<CommandOutcome>();
  const request = (command: RoomCommand) => {
    commands.push(command);
    return reply.promise;
  };
  const upload = async () => meta();
  entry.sync(room(), request, upload);
  return { timer, drafts, scope, entry, commands, reply, request, upload };
}
const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
};
test("file extension/MIME aliases and screenshot names preserve supported upload behavior", async () => {
  for (const [name, type, expected] of [
    ["report.html", "", "text/html"],
    ["report.md", "", "text/markdown"],
    ["report.md", "text/plain", "text/plain"],
    ["data.csv", "application/vnd.ms-excel", "text/csv"],
    ["note.txt", "application/octet-stream", "text/plain"],
    ["audio.m4a", "application/octet-stream", "audio/x-m4a"],
    ["audio.mp3", "audio/mpeg", "audio/mpeg"],
  ])
    expect(
      mediaType(normalizeFile(new File(["test"], name, { type }), 0).type),
    ).toBe(expected);
  const screenshot = normalizeFile(
    new File(["x"], "image.png", { type: "image/png" }),
    0,
  );
  expect(screenshot.name).toBe("print-1970-01-01-00-00.png");
  expect(screenshot.type).toBe("image/png");
  expect(await screenshot.text()).toBe("x");
  expect(fileIssue(new File([], "empty.txt", { type: "text/plain" }))).toBe(
    "empty",
  );
  expect(
    fileIssue(new File(["x"], "bad.exe", { type: "application/octet-stream" })),
  ).toBe("type");
  const large = new File(["x"], "large.txt", { type: "text/plain" });
  Object.defineProperty(large, "size", { value: 10 * 1024 * 1024 + 1 });
  expect(fileIssue(large)).toBe("size");
});
test("mention aliases exclude self, include own sandbox, match labels and cap eight; emoji insertion respects selection", () => {
  const r = room();
  expect(mentionPicks("@Jo", 3, r)?.items[0]).toMatchObject({
    email: "you@test",
    handle: "jose",
  });
  expect(mentionPicks("x@Jo", 4, r)).toBeNull();
  expect(
    mentionPicks("@", 1, r, {}, [
      { email: r.me, name: "sandbox" },
      { email: "you@test", name: "foreign" },
    ])?.items.map((item) => item.handle),
  ).toEqual(["jose", "sandbox"]);
  expect(emojiPicks(":thumbsup:").some((item) => item.emoji === "👍")).toBe(
    true,
  );
  expect(insertAt("hello world", 6, 11, "🔥")).toEqual({
    text: "hello 🔥",
    caret: 8,
  });
});
test("account room/thread draft scopes stay separate and reset invalidates old owners", () => {
  const h = harness();
  h.entry.edit("keep main");
  const next = h.drafts.entry({ ...h.scope, thread: "epic" });
  next.edit("keep epic");
  expect(get(h.entry.state).text).toBe("keep main");
  expect(get(next.state).text).toBe("keep epic");
  const other = h.drafts.entry({ ...h.scope, account: "you@test" });
  expect(get(other.state).text).toBe("");
  h.drafts.reset();
  h.entry.edit("late");
  expect(get(h.entry.state).text).toBe("");
  expect(get(h.drafts.entry(h.scope).state).text).toBe("");
});
test("message ACK and exact new canonical row are both required before clearing unchanged draft", async () => {
  const h = harness();
  h.entry.edit("post me");
  const pending = h.entry.submit();
  h.reply.resolve({ ok: true });
  await pending;
  expect(get(h.entry.state).phase).toBe("pending");
  expect(get(h.entry.state).text).toBe("post me");
  h.entry.sync(
    {
      ...room(),
      messages: [
        message(10, "post me"),
        message(11, "post me", { author: "you@test" }),
        message(12, "post me", { thread: "epic" }),
      ],
    },
    h.request,
    h.upload,
  );
  expect(get(h.entry.state).text).toBe("post me");
  h.entry.sync(
    { ...room(), messages: [message(13, "post me")] },
    h.request,
    h.upload,
  );
  expect(get(h.entry.state).text).toBe("");
  expect(h.timer.jobs.size).toBe(0);
  expect(h.commands).toHaveLength(1);
});
test("canonical-before-ACK settles only after ACK and keeps edits made while sending", async () => {
  const h = harness();
  h.entry.edit("submitted");
  const pending = h.entry.submit();
  h.entry.sync(
    { ...room(), messages: [message(11, "submitted")] },
    h.request,
    h.upload,
  );
  expect(get(h.entry.state).text).toBe("submitted");
  h.entry.edit("next draft");
  h.reply.resolve({ ok: true });
  await pending;
  expect(get(h.entry.state).text).toBe("next draft");
  expect(get(h.entry.state).notice).toBe("sent-edited");
});
test("same-text row after lost ACK remains ambiguous and cannot auto-clear or auto-resend", async () => {
  for (const error of ["timeout", "disconnected", "server error"]) {
    const h = harness();
    h.entry.edit("same text");
    const pending = h.entry.submit();
    h.entry.sync(
      { ...room(), messages: [message(11, "same text")] },
      h.request,
      h.upload,
    );
    h.reply.resolve({ ok: false, error });
    await pending;
    expect(get(h.entry.state).phase).toBe("unconfirmed");
    expect(get(h.entry.state).text).toBe("same text");
    expect(get(h.entry.state).candidate).toBe(11);
    await h.entry.submit();
    expect(h.commands).toHaveLength(1);
    h.entry.review(true);
    expect(get(h.entry.state).text).toBe("same text");
    expect(get(h.entry.state).phase).toBe("idle");
    h.drafts.dispose();
  }
});
test("definite prewrite failures retain editable draft; post-ACK wait is bounded", async () => {
  for (const reason of [
    "offline",
    "invalid command",
    "empty message",
    "unknown thread",
    "blocked: secret",
  ]) {
    expect(definiteMessageFailure(reason)).toBe(true);
    const h = harness();
    h.entry.edit("retain");
    const pending = h.entry.submit();
    h.reply.resolve({ ok: false, error: reason });
    await pending;
    expect(get(h.entry.state).phase).toBe("error");
    expect(get(h.entry.state).text).toBe("retain");
  }
  const h = harness();
  h.entry.edit("wait");
  const pending = h.entry.submit();
  h.reply.resolve({ ok: true });
  await pending;
  h.timer.fire();
  expect(get(h.entry.state).phase).toBe("unconfirmed");
  expect(h.commands).toHaveLength(1);
  expect(get(h.entry.state).text).toBe("wait");
  h.drafts.dispose();
});
test("exact file/reply snapshots reject unrelated canonical messages", () => {
  const r = room(),
    snapshot = {
      text: "with file",
      fileIds: ["aa11"],
      replyId: 10,
      baseline: 10,
      revision: 1,
    };
  for (const patch of [
    { files: [meta("bb22")], reply_to: 10 },
    { files: [meta()], reply_to: 9 },
    { files: [meta()], reply_to: 10, kind: "agent" },
  ])
    expect(
      matchingMessage(
        { ...r, messages: [message(11, "with file", patch)] },
        "main",
        snapshot,
      ),
    ).toBeUndefined();
  expect(
    matchingMessage(
      {
        ...r,
        messages: [message(11, "with file", { files: [meta()], reply_to: 10 })],
      },
      "main",
      snapshot,
    )?.id,
  ).toBe(11);
});
test("removed and account-reset uploads abort and late HTTP responses never populate another draft", async () => {
  const h = harness(),
    uploads: {
      signal: AbortSignal;
      reply: ReturnType<typeof deferred<UploadFileResult>>;
    }[] = [];
  h.entry.sync(room(), h.request, (_input, signal) => {
    const reply = deferred<UploadFileResult>();
    uploads.push({ signal, reply });
    return reply.promise;
  });
  h.entry.addFiles([
    new File(["x"], "one.txt", { type: "text/plain" }),
    new File(["x"], "two.txt", { type: "text/plain" }),
    new File(["x"], "three.txt", { type: "text/plain" }),
  ]);
  expect(uploads).toHaveLength(2);
  const first = get(h.entry.state).attachments[0].id;
  h.entry.removeFile(first);
  expect(uploads[0].signal.aborted).toBe(true);
  uploads[0].reply.resolve(meta());
  await flush();
  expect(get(h.entry.state).attachments.some((item) => item.id === first)).toBe(
    false,
  );
  h.drafts.reset();
  for (const job of uploads) job.reply.resolve(meta());
  await flush();
  expect(get(h.entry.state).attachments).toHaveLength(0);
  expect(get(h.drafts.entry(h.scope).state).attachments).toHaveLength(0);
});
test("component-only detach releases stale request/focus without losing text draft", async () => {
  const h = harness();
  let focused = 0;
  const detach = h.entry.attachFocus(() => focused++);
  h.entry.edit("preserve");
  detach();
  h.entry.focus();
  await h.entry.submit();
  expect(focused).toBe(0);
  expect(h.commands).toHaveLength(0);
  expect(get(h.entry.state).text).toBe("preserve");
  h.entry.sync(room(), h.request, h.upload);
  const detachNext = h.entry.attachFocus(() => focused++);
  h.entry.focus();
  expect(focused).toBe(1);
  detachNext();
});
test("poll create retains form until ACK plus new canonical poll, and uncertain form is not resubmitted", async () => {
  const h = harness();
  h.entry.editPoll({
    question: "Question",
    options: [" A ", "B", ""],
    multi: true,
  });
  const pending = h.entry.createPoll();
  h.reply.resolve({ ok: true });
  await pending;
  expect(get(h.entry.state).poll.question).toBe("Question");
  expect(h.commands[0]).toEqual({
    t: "poll.create",
    thread: "main",
    question: "Question",
    options: ["A", "B"],
    multi: true,
  });
  h.entry.sync(
    {
      ...room(),
      messages: [message(11, "", { poll: "p" })],
      polls: {
        p: {
          id: "p",
          question: "Question",
          options: ["A", "B"],
          author: "me@test",
          multi: true,
          closed: false,
          votes: [[], []],
        },
      },
    },
    h.request,
    h.upload,
  );
  expect(get(h.entry.state).poll.question).toBe("");
  const other = harness();
  other.entry.editPoll({ question: "Question", options: ["A", "B"] });
  const unknown = other.entry.createPoll();
  other.reply.resolve({ ok: false, error: "disconnected" });
  await unknown;
  await other.entry.createPoll();
  expect(other.commands).toHaveLength(1);
  expect(get(other.entry.state).poll.question).toBe("Question");
});
test("private asks and permission answers retain exact legacy visibility without mutating room state", () => {
  const own = message(1, "⏸ Seu Claude pede permissão", {
      kind: "agent",
      choices: '{"options":["Aprovar","Negar"]}',
    }),
    foreign = { ...own, id: 2, author: "you@test" },
    answer = message(3, "Aprovar", { reply_to: 1 }),
    foreignReply = message(4, "ok", { reply_to: 2 }),
    ordinary = message(5, "normal");
  const r = {
    ...room(),
    messages: [own, foreign, answer, foreignReply, ordinary],
  };
  expect(privateAskForOther(r, foreign)).toBe(true);
  expect(permissionReply(r, answer)).toBe(true);
  expect(visibleChatMessages(r, "main").map((m) => m.id)).toEqual([1, 5]);
  expect(r.messages).toHaveLength(5);
});

test("partial sandbox metadata cannot throw or insert null handles", () => {
  const picks = mentionPicks("@sa", 3, room(), {}, [
    { email: "me@test", name: null },
    { email: "me@test", name: "" },
    { email: "me@test", name: "sandbox" },
  ]);
  expect(picks?.items.map((item) => item.handle)).toEqual(["sandbox"]);
});

test("origin-only private parents hide replies and invalidate selected reply without losing text", async () => {
  const h = harness(),
    q = message(20, "ordinary", { kind: "agent", author: "you@test" });
  h.entry.sync({ ...room(), messages: [q] }, h.request, h.upload);
  h.entry.edit("retain reply");
  h.entry.reply(q);
  const secret = { ...q, text: "❓ Seu Claude asks privately" };
  h.entry.sync(
    { ...room(), messages: [], origins: [secret] },
    h.request,
    h.upload,
  );
  await h.entry.submit();
  expect(h.commands).toHaveLength(0);
  expect(get(h.entry.state).text).toBe("retain reply");
  expect(get(h.entry.state).error).toBe("reply-missing");
  const child = message(21, "answer", { reply_to: 20 });
  expect(
    visibleChatMessages(
      { ...room(), messages: [child], origins: [secret] },
      "main",
    ),
  ).toHaveLength(0);
});

test("speech hold/tap and fast typing preserve vanilla selection semantics without implicit sending", () => {
  const timer = clock();
  let value = "before selected after",
    start = 7,
    end = 15,
    revision = 0,
    recording = false,
    starts = 0;
  const rec: SpeechRecognizer = {
    lang: "",
    continuous: false,
    interimResults: false,
    onresult: null,
    onerror: null,
    onend: null,
    start() {
      starts++;
    },
    stop() {
      this.onend?.({});
    },
    abort() {},
  };
  const speech = createSpeechController({
    factory: () => rec,
    locale: "en-US",
    clock: timer.api,
    read: () => ({ text: value, start, end, revision }),
    write: (text, at) => {
      value = text;
      revision++;
      start = end = at ?? text.length;
    },
    canStart: () => true,
    recording: (on) => (recording = on),
    error: () => {},
    ended: () => {},
  });
  let prevented = 0;
  speech.keydown({ key: " ", preventDefault: () => prevented++ });
  speech.keyup({ key: " " });
  expect(value).toBe("before   after");
  expect(starts).toBe(0);
  speech.keydown({ key: " ", preventDefault: () => prevented++ });
  speech.keydown({ key: "x", preventDefault: () => {} });
  expect(value).toBe("before    after");
  speech.keyup({ key: " " });
  expect(starts).toBe(0);
  speech.keydown({ key: " ", preventDefault: () => prevented++ });
  timer.fire();
  expect(recording).toBe(true);
  expect(rec.lang).toBe("en-US");
  rec.onresult?.({ results: [[{ transcript: "spoken" }]] });
  expect(value).toBe("before    after spoken");
  speech.keyup({ key: " " });
  expect(recording).toBe(false);
  expect(prevented).toBe(3);
  speech.dispose();
});
test("speech modifiers/IME do not hijack Space and stopped owners ignore stale results", () => {
  const timer = clock();
  let text = "draft",
    revision = 0,
    active = true,
    recording = false,
    error = "",
    aborts = 0;
  const rec: SpeechRecognizer = {
    lang: "",
    continuous: false,
    interimResults: false,
    onresult: null,
    onerror: null,
    onend: null,
    start() {},
    stop() {},
    abort() {
      aborts++;
    },
  };
  const speech = createSpeechController({
    factory: () => rec,
    locale: "pt-BR",
    clock: timer.api,
    read: () => ({ text, revision, start: text.length, end: text.length }),
    write: (value) => {
      text = value;
      revision++;
    },
    canStart: () => active,
    recording: (on) => (recording = on),
    error: (message) => (error = message),
    ended: () => {},
  });
  let prevented = 0;
  for (const flags of [
    { ctrlKey: true },
    { metaKey: true },
    { altKey: true },
    { isComposing: true },
  ])
    expect(
      speech.keydown({ key: " ", ...flags, preventDefault: () => prevented++ }),
    ).toBe(false);
  expect(prevented).toBe(0);
  speech.start();
  const late = rec.onresult;
  speech.cancel();
  late?.({ results: [[{ transcript: "late" }]] });
  expect(text).toBe("draft");
  expect(recording).toBe(false);
  speech.start();
  rec.onerror?.({ error: "not-allowed" });
  expect(error).toBe("not-allowed");
  expect(recording).toBe(false);
  speech.start();
  text = "edited independently";
  revision++;
  rec.onresult?.({ results: [[{ transcript: "overwrite" }]] });
  expect(text).toBe("edited independently");
  expect(recording).toBe(false);
  speech.start();
  active = false;
  rec.onresult?.({ results: [[{ transcript: "wrong room" }]] });
  expect(text).toBe("edited independently");
  expect(aborts).toBeGreaterThan(1);
  speech.dispose();
});
test("unsupported speech capability leaves ordinary keyboard behavior intact", () => {
  let prevented = false;
  const speech = createSpeechController({
    locale: "pt-BR",
    read: () => ({ text: "", start: 0, end: 0, revision: 0 }),
    write: () => {},
    canStart: () => true,
    recording: () => {},
    error: () => {},
    ended: () => {},
  });
  expect(speech.supported).toBe(false);
  expect(
    speech.keydown({ key: " ", preventDefault: () => (prevented = true) }),
  ).toBe(false);
  expect(prevented).toBe(false);
  speech.dispose();
});

test("deleted-thread drafts remain reviewable only in their original account/room and discard requires an unchanged snapshot", () => {
  const bag = createComposerDrafts();
  const r = room();
  const scope = { account: r.me, roomId: r.id, thread: "epic" };
  const entry = bag.entry(scope);
  entry.edit("Keep original content");
  expect(bag.orphans(r)).toEqual([]);
  const removed = { ...r, epics: [] };
  const [snapshot] = bag.orphans(removed);
  expect(snapshot?.state.text).toBe("Keep original content");
  expect(bag.orphans({ ...removed, me: "other@test" })).toEqual([]);
  expect(bag.orphans({ ...removed, id: "other-room" })).toEqual([]);
  if (!snapshot) throw new Error("missing draft");
  expect(bag.discardOrphan(snapshot, r)).toBe(false);
  entry.edit("Independent edit");
  expect(bag.discardOrphan(snapshot, removed)).toBe(false);
  const fresh = bag.orphans(removed)[0];
  if (!fresh) throw new Error("missing updated draft");
  expect(bag.discardOrphan(fresh, removed)).toBe(true);
  expect(bag.orphans(removed)).toEqual([]);
  expect(bag.entry(scope)).not.toBe(entry);
  bag.reset();
  expect(bag.orphans(removed)).toEqual([]);
  bag.dispose();
});
