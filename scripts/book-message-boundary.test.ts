// Stored message and actual Book method fixtures; no real DO/SQLite receipt.
import { expect, mock, test } from "bun:test";
import { MessageSchema } from "../shared/room";
import {
  storedAttachments,
  storedMessageRows,
  storedChoices,
  storedCard,
  storedQuote,
  storedFileRefs,
  AccessRequested,
  agentMessageFromWire,
} from "../src/bookMessages";
import { cachedTools } from "../src/mcpTools";
import type { bookStub } from "../src/rooms";
type RemoteAgentRead = Awaited<ReturnType<ReturnType<typeof bookStub>["agentRead"]>>;
type Assert<T extends true> = T;
// Compile the REAL Durable Object RPC serializer result, not Book's local
// method alone. Unknown extension values previously collapsed it to never.
type AgentReadRemainsSerializable = Assert<[RemoteAgentRead] extends [never] ? false : RemoteAgentRead extends { last_id: number } ? true : false>;
const remoteLastId = (value: RemoteAgentRead): number => value.last_id;
type AgentChoiceWireRemainsFlat = Assert<RemoteAgentRead["messages"][number]["choices_wire"] extends string | undefined ? true : false>;
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
  author: "uploader@example.test",
  ts: 12,
};
const row = {
  id: 1,
  thread: "main",
  author: "member@example.test",
  text: "Kept text",
  ts: 100,
  files: null,
  choices: null,
  card: null,
};
const card = {
  root: "root",
  elements: {
    root: { type: "Card", props: { title: "Allowed" }, children: ["text"] },
    text: {
      type: "Text",
      props: { text: "Historical alias", style: "plain" },
      children: [],
    },
  },
};
const issues: string[] = [];
const issue = (kind: string) => issues.push(kind);
test("valid wire choices/card bytes and nullable older text/optional fields survive message projection", () => {
  const choices =
      ' {"options":["Yes","No"],"multi":null,"closed":"terminal","legacy":{"kept":true}} ',
    rawCard = JSON.stringify(card);
  const values = storedMessageRows(
    [
      {
        ...row,
        text: null,
        files: JSON.stringify([file]),
        choices,
        card: rawCard,
      },
    ],
    "abcdef",
  );
  expect(values).toHaveLength(1);
  expect(values[0].text).toBe("");
  expect(values[0].choices).toBe(choices);
  expect(values[0].card).toBe(rawCard);
  expect(values[0].files).toEqual([file]);
  expect(MessageSchema.safeParse(values[0]).success).toBe(true);
  expect(storedChoices(choices)?.closed).toBe("terminal");
  expect(storedChoices(choices)?.legacy).toEqual({ kept: true });
  expect(storedCard(rawCard, "abcdef")?.elements.text.props).toMatchObject({
    content: "Historical alias",
  });
});
test("choice extensions retain nested JSON-safe values without changing the original canonical wire", () => {
  const raw = JSON.stringify({ options: ["Yes", "No"], extension: { nested: [null, true, 7, "kept", { deep: "value" }] } });
  expect(storedChoices(raw)?.extension).toEqual({ nested: [null, true, 7, "kept", { deep: "value" }] });
  expect(storedMessageRows([{ ...row, choices: raw }], "abcdef")[0].choices).toBe(raw);
  const publicMessage = agentMessageFromWire({ id: 1, text: "kept", choices_wire: raw });
  expect(publicMessage).toMatchObject({ id: 1, text: "kept", choices: { options: ["Yes", "No"], extension: { nested: [null, true, 7, "kept", { deep: "value" }] } } });
  expect(Object.hasOwn(publicMessage, "choices_wire")).toBe(false);
});
test("corrupt optional payloads do not discard valid text or neighboring messages; identity is never coerced", () => {
  const values = storedMessageRows(
    [
      {
        ...row,
        files: '[{"id":{}}]',
        choices: '{"options":[{}]}',
        card: '{"bad":true}',
      },
      { ...row, id: 2 },
      { ...row, id: "3" },
      { ...row, id: 4, kind: {} },
      { ...row, id: 5, reply_to: {} },
      { ...row, id: 6, ts: 1e100 },
    ],
    "abcdef",
    undefined,
    issue,
  );
  expect(values.map((value) => value.id)).toEqual([1, 2]);
  expect(values[0]).toMatchObject({
    text: row.text,
    files: [],
    choices: null,
    card: null,
  });
  expect(issues).toContain("message-row");
  expect(issues).toContain("card");
  const large = "x".repeat(1_000_001);
  expect(storedMessageRows([{ ...row, card: large }], "abcdef")[0].card).toBe(
    large,
  );
  expect(storedCard(large, "abcdef")).toBeNull();
});
test("older partial attachments recover only from the exact canonical file ID and preserve embedded/version fields", () => {
  const requested: string[] = [];
  const result = storedAttachments(
    JSON.stringify([
      {
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        embed: true,
      },
      { ...file, id: "wrong", author: null, ts: null },
      { ...file, size: {} },
    ]),
    (id) => {
      requested.push(id);
      return id === file.id ? file : undefined;
    },
    issue,
  );
  expect(result).toEqual([{ ...file, embed: true }]);
  expect(requested).toEqual([file.id, "wrong", file.id]);
  expect(storedAttachments(JSON.stringify([{ ...file, embed: null }]))).toEqual(
    [file],
  );
});
test("quote/search refs accept older minimal metadata and corrupt siblings cannot reach name logic", () => {
  const raw =
    '[{"id":"old","name":"old.txt"},{"id":"bad","name":{}},{"id":"next","name":"next.txt"}]';
  expect(storedFileRefs(raw, issue)).toEqual([
    { id: "old", name: "old.txt" },
    { id: "next", name: "next.txt" },
  ]);
  expect(
    storedQuote({ id: 1, author: row.author, text: null, files: raw }, issue),
  ).toMatchObject({ id: 1, text: "", files: ["old.txt", "next.txt"] });
  expect(
    storedQuote({ id: 2, author: {}, text: "must not spoof author" }, issue),
  ).toBeNull();
});
test("cached MCP tool contract preserves supported nested/legacy metadata and rejects malformed tools", () => {
  const tools = cachedTools(
    JSON.stringify([
      {
        name: "valid",
        title: "Title",
        annotations: { readOnlyHint: true, custom: "kept" },
        _meta: {
          ui: {
            resourceUri: "ui://nested",
            visibility: ["app"],
            custom: "kept",
          },
        },
      },
      { name: "legacy", _meta: { "ui/resourceUri": "ui://legacy" } },
      { name: "bad", _meta: { ui: { resourceUri: {} } } },
    ]),
    issue,
  );
  expect(tools.map((tool) => tool.name)).toEqual(["valid", "legacy"]);
  expect(tools[0].annotations?.custom).toBe("kept");
  expect(tools[0]._meta?.ui?.custom).toBe("kept");
  expect(cachedTools("[", issue)).toEqual([]);
});
function invoke(method: string, receiver: object, ...args: unknown[]): unknown {
  const actual: unknown = Reflect.get(Book.prototype, method);
  if (typeof actual !== "function") throw Error("Missing actual Book method");
  return Reflect.apply(actual, receiver, args);
}
test("actual Book messages/older use validated rows and raw pagination count remains authoritative", async () => {
  const raw = Array.from({ length: 101 }, (_, index) => ({
      ...row,
      id: 101 - index,
      author: index === 5 ? {} : row.author,
    })),
    frames: string[] = [];
  const receiver = {
    get: () => "abcdef",
    files: () => [file],
    sql: { exec: () => ({ toArray: () => raw }) },
    messageRows: (rows: readonly unknown[]) =>
      storedMessageRows(rows, "abcdef", (id) =>
        id === file.id ? file : undefined,
      ),
  };
  const messages = invoke("messages", receiver);
  expect(messages).toHaveLength(100);
  await invoke(
    "runCommand",
    receiver,
    { send: (value: string) => frames.push(value) },
    row.author,
    { t: "older", thread: "main" },
  );
  const value: unknown = JSON.parse(frames[0]);
  if (
    !value ||
    typeof value !== "object" ||
    !("messages" in value) ||
    !Array.isArray(value.messages) ||
    !("more" in value)
  )
    throw Error("Missing actual older event");
  expect(value.more).toBe(true);
  expect(value.messages).toHaveLength(99);
  for (const message of value.messages)
    expect(MessageSchema.safeParse(message).success).toBe(true);
});
test("actual closeAsk rejects malformed choices before mutation and preserves terminal/extension fields", () => {
  let raw = '{"options":[{}]}',
    updates = 0;
  const events: unknown[] = [];
  const receiver = {
    bind: () => {},
    answerTo: () => null,
    sql: {
      exec: (sql: string) => {
        if (sql.startsWith("UPDATE")) updates++;
        return { toArray: () => [{ choices: raw }] };
      },
    },
    broadcast: (value: unknown) => events.push(value),
    ctx: { waitUntil: () => {} },
    askWait: async () => {},
  };
  expect(invoke("closeAsk", receiver, "abcdef", 1, row.author)).toEqual({
    ok: false,
  });
  expect(updates).toBe(0);
  raw = '{"options":["Yes","No"],"multi":false,"extension":"kept"}';
  expect(invoke("closeAsk", receiver, "abcdef", 1, row.author)).toEqual({
    ok: true,
  });
  expect(updates).toBe(1);
  const event = events[0];
  if (
    !event ||
    typeof event !== "object" ||
    !("choices" in event) ||
    typeof event.choices !== "string"
  )
    throw Error("Missing closed event");
  expect(storedChoices(event.choices)).toMatchObject({
    options: ["Yes", "No"],
    closed: "terminal",
    extension: "kept",
  });
});
test("access-requested HTTP validates before binding, owner lookup or notice posting", async () => {
  let effects = 0;
  const receiver = {
    get: () => {
      effects++;
      return null;
    },
    set: () => {
      effects++;
    },
    env: {
      DB: {
        prepare: () => {
          effects++;
          throw Error("No DB work expected");
        },
      },
    },
    addMessage: () => {
      effects++;
    },
  };
  expect(
    AccessRequested.safeParse({ who: "member@example.test", name: null })
      .success,
  ).toBe(true);
  for (const raw of [
    "not JSON",
    JSON.stringify({ who: {} }),
    JSON.stringify({ who: "member@example.test", name: [] }),
  ]) {
    const result = await invoke(
      "fetch",
      receiver,
      new Request("https://book.internal/access-requested?book=abcdef", {
        method: "POST",
        body: raw,
      }),
    );
    if (!(result instanceof Response)) throw Error("Expected Book response");
    expect(result.status).toBe(400);
  }
  expect(effects).toBe(0);
});
