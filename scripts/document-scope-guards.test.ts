// Unit boundaries around actual Book prototype methods, not real Durable Objects/SQLite/Yjs sockets.
import { expect, mock, spyOn, test } from "bun:test";
import type { RoomCommand } from "../shared/commands";
import { CommandResultSchema } from "../shared/commands";
import { parseRoomEvent } from "../shared/validation";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { Book } = await import("../src/book");
/** Private dispatch is reached only through this explicit, runtime-checked test boundary.
 * No fake receiver is asserted to be a production Book/Env/WebSocket. */
function command(
  receiver: object,
  ws: object,
  input: RoomCommand,
): Promise<unknown> {
  const method: unknown = Reflect.get(Book.prototype, "runCommand");
  if (typeof method !== "function")
    throw Error("Missing actual Book command dispatcher");
  const result: unknown = Reflect.apply(method, receiver, [
    ws,
    "member@example.test",
    input,
  ]);
  return Promise.resolve(result);
}
function fixture(options: { failKick?: boolean; bookId?: string | null } = {}) {
  const values = new Map<string, string>([
    ["doc", "UNCHANGED ROOM"],
    ["doc:live", "LIVE EPIC"],
    ["doc:deleted", "OLD EPIC"],
  ]);
  if (options.bookId !== null)
    values.set("book_id", options.bookId ?? "aaaaaa");
  const epics = new Set(["live"]);
  const reads: string[] = [];
  const writes: { key: string; value: string }[] = [],
    docWrites: { text: string; epic: string | undefined }[] = [],
    bindings: string[] = [],
    pushes: unknown[][] = [],
    tasks: unknown[][] = [],
    kicks: string[] = [],
    names: string[] = [],
    jobs: Promise<unknown>[] = [],
    sql: { query: string; args: unknown[] }[] = [],
    frames: string[] = [],
    events: string[] = [];
  const ws = { send: (frame: string) => frames.push(frame) };
  const receiver = {
    ctx: {
      getTags: () => ["member@example.test"],
      waitUntil: (job: Promise<unknown>) => jobs.push(job),
    },
    env: {
      DOC_ROOMS: {
        idFromName(name: string) {
          names.push(name);
          return name;
        },
        get(name: string) {
          return {
            async kickAll() {
              kicks.push(name);
              if (options.failKick) throw Error("unit kick failure");
            },
          };
        },
      },
    },
    sql: {
      exec(query: string, ...args: unknown[]) {
        sql.push({ query, args });
        if (query.startsWith("DELETE FROM epics"))
          epics.delete(String(args[0]));
        if (query.startsWith("DELETE FROM meta"))
          values.delete(String(args[0]));
        return { toArray: () => [] };
      },
    },
    get(key: string) {
      reads.push(key);
      return values.get(key) ?? null;
    },
    set(key: string, value: string) {
      writes.push({ key, value });
      values.set(key, value);
    },
    bind: (id: string) => bindings.push(id),
    epics: () => [...epics].map((id) => ({ id })),
    epicsChanged: () => events.push("epics changed"),
    setDoc(text: string, _author: string, _socket: object, epic?: string) {
      docWrites.push({ text, epic });
      values.set(epic ? `doc:${epic}` : "doc", text);
    },
    docPush: (...args: unknown[]) => pushes.push(args),
    docToTasks: (...args: unknown[]) => tasks.push(args),
    wakeAt: async () => {
      events.push("wake");
    },
    runCommand(socket: object, email: string, input: RoomCommand) {
      expect(email).toBe("member@example.test");
      return command(receiver, socket, input);
    },
  };
  return {
    receiver,
    ws,
    values,
    epics,
    reads,
    writes,
    docWrites,
    bindings,
    pushes,
    tasks,
    kicks,
    names,
    jobs,
    sql,
    frames,
    events,
  };
}
test("actual correlated doc dispatch refuses a deleted target before mutation and preserves root metadata", async () => {
  const h = fixture();
  await Reflect.apply(Book.prototype.webSocketMessage, h.receiver, [
    h.ws,
    JSON.stringify({
      t: "doc",
      epic: "deleted",
      text: "DO NOT RETARGET",
      cid: "doc-missing",
    }),
  ]);
  expect(
    h.frames.map((raw) => CommandResultSchema.parse(JSON.parse(raw))),
  ).toEqual([
    { t: "result", cid: "doc-missing", ok: false, error: "unknown epic" },
  ]);
  expect(h.docWrites).toEqual([]);
  expect(h.values.get("doc")).toBe("UNCHANGED ROOM");
  expect(h.values.get("doc:deleted")).toBe("OLD EPIC");
  expect(h.kicks).toEqual([]);
});
test("actual command checks the current epic after deletion, and known target is never retargeted", async () => {
  const h = fixture();
  await command(h.receiver, h.ws, {
    t: "doc",
    epic: "live",
    text: "LIVE ONLY",
  });
  expect(h.docWrites).toEqual([{ epic: "live", text: "LIVE ONLY" }]);
  expect(h.values.get("doc")).toBe("UNCHANGED ROOM");
  h.epics.delete("live");
  const result = await command(h.receiver, h.ws, {
    t: "doc",
    epic: "live",
    text: "TOO LATE",
  });
  expect(result).toMatchObject({ error: "unknown epic" });
  expect(h.docWrites).toHaveLength(1);
  expect(h.values.get("doc")).toBe("UNCHANGED ROOM");
});
test("absent null and empty epic retain the legacy root-document dispatch semantics", async () => {
  for (const epic of [undefined, null, ""]) {
    const h = fixture();
    await Reflect.apply(Book.prototype.webSocketMessage, h.receiver, [
      h.ws,
      JSON.stringify({
        t: "doc",
        text: "ROOT ONLY",
        ...(epic === undefined ? {} : { epic }),
        cid: "doc-root",
      }),
    ]);
    expect(
      h.frames.map((raw) => CommandResultSchema.parse(JSON.parse(raw))),
    ).toEqual([{ t: "result", cid: "doc-root", ok: true }]);
    expect(h.docWrites).toEqual([{ text: "ROOT ONLY", epic: undefined }]);
    expect(h.values.get("doc")).toBe("ROOT ONLY");
    expect(h.values.get("doc:live")).toBe("LIVE EPIC");
  }
});
test("actual late Yjs mirror for missing epic is a complete no-op before binding or metadata/task writes", () => {
  const h = fixture();
  Reflect.apply(Book.prototype.docFromYjs, h.receiver, [
    "aaaaaa",
    "LATE YJS",
    "deleted",
  ]);
  expect(h.bindings).toEqual([]);
  expect(h.writes).toEqual([]);
  expect(h.pushes).toEqual([]);
  expect(h.tasks).toEqual([]);
  expect(h.jobs).toEqual([]);
  expect(h.values.get("doc")).toBe("UNCHANGED ROOM");
  expect(h.values.get("doc:deleted")).toBe("OLD EPIC");
});
test("actual live Yjs mirrors still update only their exact scope and unchanged mirrors remain no-ops", async () => {
  const h = fixture();
  Reflect.apply(Book.prototype.docFromYjs, h.receiver, [
    "aaaaaa",
    "LIVE UPDATED",
    "live",
  ]);
  expect(h.writes).toEqual([{ key: "doc:live", value: "LIVE UPDATED" }]);
  expect(h.values.get("doc")).toBe("UNCHANGED ROOM");
  expect(h.tasks).toEqual([["live", "LIVE UPDATED"]]);
  expect(h.pushes).toEqual([["doc:live", "yjs", "live"]]);
  Reflect.apply(Book.prototype.docFromYjs, h.receiver, [
    "aaaaaa",
    "LIVE UPDATED",
    "live",
  ]);
  expect(h.writes).toHaveLength(1);
  Reflect.apply(Book.prototype.docFromYjs, h.receiver, [
    "aaaaaa",
    "ROOM UPDATED",
  ]);
  expect(h.values.get("doc")).toBe("ROOM UPDATED");
  expect(h.values.get("doc:live")).toBe("LIVE UPDATED");
  expect(h.events).toEqual(["wake"]);
  await Promise.all(h.jobs);
});
test("actual epic deletion removes its data and kicks only the captured exact relay; late mirror cannot resurrect it", async () => {
  const h = fixture();
  Reflect.apply(Book.prototype.deleteEpic, h.receiver, ["live"]);
  await Promise.all(h.jobs);
  expect(h.names).toEqual(["aaaaaa~live"]);
  expect(h.kicks).toEqual(["aaaaaa~live"]);
  expect(h.sql.map((item) => item.query)).toEqual([
    "DELETE FROM tasks WHERE epic_id = ?",
    "DELETE FROM messages WHERE thread = ?",
    "DELETE FROM epics WHERE id = ?",
    "DELETE FROM meta WHERE k = ?",
  ]);
  expect(h.values.has("doc:live")).toBe(false);
  expect(h.values.get("doc")).toBe("UNCHANGED ROOM");
  expect(h.events).toEqual(["epics changed"]);
  Reflect.apply(Book.prototype.docFromYjs, h.receiver, [
    "aaaaaa",
    "LATE AFTER DELETE",
    "live",
  ]);
  expect(h.values.has("doc:live")).toBe(false);
  expect(h.writes).toEqual([]);
});
test("missing or empty epic and an unbound room never kick the root or an invented relay", async () => {
  for (const id of ["missing", ""]) {
    const h = fixture();
    Reflect.apply(Book.prototype.deleteEpic, h.receiver, [id]);
    expect(h.kicks).toEqual([]);
    expect(h.names).toEqual([]);
    expect(h.values.get("doc")).toBe("UNCHANGED ROOM");
  }
  const h = fixture({ bookId: null });
  Reflect.apply(Book.prototype.deleteEpic, h.receiver, ["live"]);
  expect(h.kicks).toEqual([]);
  expect(h.names).toEqual([]);
  expect(h.values.has("doc:live")).toBe(false);
});
test("failed disconnect stays server-visible without changing completed deletion or retargeting", async () => {
  const log = spyOn(console, "error").mockImplementation(() => {});
  try {
    const h = fixture({ failKick: true });
    Reflect.apply(Book.prototype.deleteEpic, h.receiver, ["live"]);
    await Promise.all(h.jobs);
    expect(h.kicks).toEqual(["aaaaaa~live"]);
    expect(h.values.has("doc:live")).toBe(false);
    expect(h.values.get("doc")).toBe("UNCHANGED ROOM");
    expect(log).toHaveBeenCalledWith(
      "docroom deleted epic kick",
      "Error: unit kick failure",
    );
  } finally {
    log.mockRestore();
  }
});

test("actual doc.get reads root storage for absent null and empty target while preserving empty epic wire", async () => {
  for (const epic of [undefined, null, ""]) {
    const h = fixture();
    await Reflect.apply(Book.prototype.webSocketMessage, h.receiver, [
      h.ws,
      JSON.stringify({
        t: "doc.get",
        ...(epic === undefined ? {} : { epic }),
        cid: "doc-read",
      }),
    ]);
    expect(h.reads).toEqual(["doc"]);
    expect(parseRoomEvent(h.frames[0])).toEqual({
      t: "doc",
      epic: "",
      text: "UNCHANGED ROOM",
      fetched: true,
    });
    expect(CommandResultSchema.parse(JSON.parse(h.frames[1]))).toEqual({
      t: "result",
      cid: "doc-read",
      ok: true,
    });
    expect(h.writes).toEqual([]);
  }
});
test("actual doc.get reads only the supplied live epic and refuses a deleted epic before metadata access", async () => {
  const live = fixture();
  await Reflect.apply(Book.prototype.webSocketMessage, live.receiver, [
    live.ws,
    JSON.stringify({ t: "doc.get", epic: "live", cid: "doc-live" }),
  ]);
  expect(live.reads).toEqual(["doc:live"]);
  expect(parseRoomEvent(live.frames[0])).toEqual({
    t: "doc",
    epic: "live",
    text: "LIVE EPIC",
    fetched: true,
  });
  expect(live.values.get("doc")).toBe("UNCHANGED ROOM");
  const missing = fixture();
  await Reflect.apply(Book.prototype.webSocketMessage, missing.receiver, [
    missing.ws,
    JSON.stringify({ t: "doc.get", epic: "deleted", cid: "doc-missing-read" }),
  ]);
  expect(missing.reads).toEqual([]);
  expect(
    missing.frames.map((raw) => CommandResultSchema.parse(JSON.parse(raw))),
  ).toEqual([
    { t: "result", cid: "doc-missing-read", ok: false, error: "unknown epic" },
  ]);
  expect(missing.values.get("doc")).toBe("UNCHANGED ROOM");
  expect(missing.writes).toEqual([]);
});
