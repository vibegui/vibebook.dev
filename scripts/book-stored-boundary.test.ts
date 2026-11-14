// Stored/SQL and internal HTTP unit fixtures; not a real DO/SQLite receipt.
import { expect, mock, test } from "bun:test";
import {
  storedNotes,
  storedHashes,
  storedFlags,
  storedProd,
  storedEpicFiles,
  storedSuggestions,
  storedFileRows,
  storedPollRows,
} from "../src/bookStored";
import { AttachmentSchema, PollSchema, SuggestionSchema } from "../shared/room";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { Book } = await import("../src/book");
const file = {
  id: "file-one",
  name: "report.txt",
  type: "text/plain",
  size: 4,
  author: "member@example.test",
  ts: 0,
};
const poll = {
  id: "poll-one",
  question: "Choose",
  options: '["same","same","last"]',
  multi: 1,
  closed: null,
  author: "member@example.test",
};
const issues: string[] = [];
const issue = (kind: string) => issues.push(kind);

test("stored notes/flags/hash maps isolate corrupt values and retain valid siblings without coercion", () => {
  expect(storedNotes('["keep",7,"also keep"]', issue)).toEqual([
    "keep",
    "also keep",
  ]);
  expect(
    storedFlags('{"epic":["note"],"task":[null,"valid"],"broken":{}}', issue),
  ).toEqual({ epic: ["note"], task: ["valid"], broken: [] });
  expect(storedHashes('{"epic":"unchanged","task":7}', issue)).toEqual({
    epic: "unchanged",
  });
  for (const raw of [null, undefined, "null", "[", '"wrong"'])
    expect(storedNotes(raw, issue)).toEqual([]);
  expect(issues).toContain("notes");
  expect(issues).toContain("notes-json");
  expect(issues).toContain("hash");
});
test("prod and suggestions keep nullable older optional payloads while validating actual shared DTOs", () => {
  expect(storedProd('{"stage":"verified","at":null,"note":null}')).toEqual({
    stage: "verified",
    at: undefined,
    note: undefined,
  });
  expect(storedProd('{"stage":"deployed","at":12,"note":"proof"}')).toEqual({
    stage: "deployed",
    at: 12,
    note: "proof",
  });
  expect(storedProd('{"stage":{}}', issue)).toBeNull();
  const suggestions = storedSuggestions(
    '[{"title":"First","tasks":["one"],"why":"why"},{"title":"Older","tasks":null,"why":null},{"title":"Missing tasks"},{"title":7},{"title":"Invalid task","tasks":[{}]}]',
    issue,
  );
  expect(suggestions.map((value) => [value.title, value.tasks])).toEqual([
    ["First", ["one"]],
    ["Older", []],
    ["Missing tasks", []],
  ]);
  for (const value of suggestions)
    expect(SuggestionSchema.safeParse(value).success).toBe(true);
});
test("epic attachment summaries preserve partial older metadata and exact latest/version IDs", () => {
  expect(
    storedEpicFiles(
      '[{"id":"old","name":"a.txt","type":"text/plain"},{"id":"bad","name":{}},{"id":"new","name":"a.txt","type":"text/plain","size":4,"author":null}]',
      issue,
    ),
  ).toEqual([
    { id: "old", name: "a.txt", type: "text/plain" },
    { id: "new", name: "a.txt", type: "text/plain" },
  ]);
  const files = storedFileRows(
    [
      file,
      { ...file, id: "broken", size: {} },
      { ...file, id: "second", embed: true },
    ],
    issue,
  );
  expect(files.map((value) => value.id)).toEqual(["file-one", "second"]);
  for (const value of files)
    expect(AttachmentSchema.safeParse(value).success).toBe(true);
});
test("poll option corruption never shifts persisted vote indices; nullable closed bits remain false", () => {
  const values = storedPollRows(
    [
      poll,
      { ...poll, id: "bad", options: '["first",7,"last"]' },
      { ...poll, id: "no-author", author: null },
    ],
    [
      { poll_id: poll.id, email: "a@example.test", opt: 0 },
      { poll_id: poll.id, email: "b@example.test", opt: 1 },
      { poll_id: poll.id, email: "c@example.test", opt: 2 },
      { poll_id: poll.id, email: {}, opt: 0 },
      { poll_id: poll.id, email: "outside", opt: 99 },
    ],
    undefined,
    issue,
  );
  expect(Object.keys(values)).toEqual([poll.id]);
  expect(values[poll.id].votes).toEqual([
    ["a@example.test"],
    ["b@example.test"],
    ["c@example.test"],
  ]);
  expect(values[poll.id].closed).toBe(false);
  expect(PollSchema.safeParse(values[poll.id]).success).toBe(true);
  expect(storedPollRows([poll], [], ["different"])).toEqual({});
  const special = storedPollRows([{ ...poll, id: "__proto__" }], []);
  expect(Object.hasOwn(special, "__proto__")).toBe(true);
  expect(Object.getPrototypeOf(special)).toBe(Object.prototype);
});
function invoke(method: string, receiver: object, ...args: unknown[]): unknown {
  const actual: unknown = Reflect.get(Book.prototype, method);
  if (typeof actual !== "function") throw Error("Missing actual Book method");
  return Reflect.apply(actual, receiver, args);
}
test("actual Book reads validate files/polls/notes and malformed file HTTP exits before every write/broadcast", async () => {
  let writes = 0,
    broadcasts = 0;
  const receiver = {
    sql: {
      exec: (sql: string) => ({
        toArray: () =>
          sql.includes("FROM files")
            ? [file, { ...file, size: "bad" }]
            : sql.includes("FROM polls")
              ? [poll]
              : sql.includes("FROM votes")
                ? []
                : [{ flags: '["real note"]' }],
      }),
    },
    get: () => null,
    set: () => {
      writes++;
    },
    broadcast: () => {
      broadcasts++;
    },
  };
  expect(invoke("docNotes", receiver)).toEqual(["real note"]);
  expect(invoke("files", receiver)).toEqual([file]);
  const polls = invoke("polls", receiver);
  expect(polls).toHaveProperty(poll.id);
  for (const body of [
    "not JSON",
    JSON.stringify({ ...file, size: {} }),
    JSON.stringify({ ...file, author: null }),
  ]) {
    const result = await invoke(
      "fetch",
      receiver,
      new Request("https://book.internal/file?book=abcdef", {
        method: "POST",
        body,
      }),
    );
    if (!(result instanceof Response))
      throw Error("Expected actual Book response");
    expect(result.status).toBe(400);
  }
  expect(writes).toBe(0);
  expect(broadcasts).toBe(0);
});
test("actual Book file HTTP retains validated canonical attachment and existing insert/event behavior", async () => {
  const rows: unknown[][] = [],
    events: unknown[] = [];
  const receiver = {
    get: () => "abcdef",
    sql: {
      exec: (_sql: string, ...args: unknown[]) => {
        rows.push(args);
      },
    },
    broadcast: (event: unknown) => events.push(event),
  };
  const result = await invoke(
    "fetch",
    receiver,
    new Request("https://book.internal/file?book=abcdef", {
      method: "POST",
      body: JSON.stringify(file),
    }),
  );
  if (!(result instanceof Response))
    throw Error("Expected actual Book response");
  expect(result.status).toBe(200);
  expect(rows).toEqual([
    [file.id, file.name, file.type, file.size, file.author, file.ts],
  ]);
  expect(events).toEqual([{ t: "fileAdd", file }]);
});
test("actual epic and suggestion projections retain older metadata, latest file IDs and valid grading siblings", () => {
  const receiver = {
    sql: {
      exec: (sql: string) => ({
        toArray: () => {
          if (sql.includes("FROM grades"))
            return [
              {
                id: "epic-one",
                flags: '{"epic-one":["epic note"],"task-one":[7,"task note"]}',
              },
            ];
          if (sql.includes("FROM tasks"))
            return [
              {
                id: "task-one",
                epic_id: "epic-one",
                title: "Task",
                done: 0,
                owner: null,
                due: null,
                status: "todo",
              },
            ];
          if (sql.includes("FROM messages"))
            return [
              {
                thread: "epic-one",
                files: '[{"id":"newest","name":"a.txt","type":"text/plain"}]',
              },
              {
                thread: "epic-one",
                files: '[{"id":"older","name":"a.txt","type":"text/plain"}]',
              },
            ];
          if (sql.includes("JOIN messages")) return [];
          return [
            {
              id: "epic-one",
              title: "Epic",
              archived: 0,
              from_msg: null,
              owner: null,
              prod: '{"stage":"verified","at":null}',
            },
          ];
        },
      }),
    },
  };
  const projected = invoke("epics", receiver);
  expect(projected).toMatchObject([
    {
      id: "epic-one",
      flags: ["epic note"],
      prod: { stage: "verified" },
      files: [{ id: "newest", name: "a.txt", type: "text/plain", n: 2 }],
      tasks: [{ id: "task-one", flags: ["task note"] }],
    },
  ]);
  expect(
    invoke("suggestions", {
      epics: () => [],
      get: () =>
        '[{"title":"Older suggestion","tasks":null,"why":null},{"title":7}]',
    }),
  ).toMatchObject([{ title: "Older suggestion", tasks: [] }]);
});
