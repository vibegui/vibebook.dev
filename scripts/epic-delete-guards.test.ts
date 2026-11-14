// Actual Book methods/dispatcher with binding doubles; not a real DO/SQLite integration.
import { expect, mock, test } from "bun:test";
import type { RoomCommand } from "../shared/commands";
import { CommandResultSchema } from "../shared/commands";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { Book } = await import("../src/book");
function dispatch(receiver: object, socket: object, input: RoomCommand) {
  const method: unknown = Reflect.get(Book.prototype, "runCommand");
  if (typeof method !== "function") throw Error("Missing Book dispatcher");
  const result: unknown = Reflect.apply(method, receiver, [
    socket,
    "member@test",
    input,
  ]);
  return Promise.resolve(result);
}
function fixture() {
  const ids = new Set(["known"]),
    queries: { sql: string; args: unknown[] }[] = [],
    frames: string[] = [],
    jobs: Promise<unknown>[] = [];
  let notifications = 0;
  const receiver = {
    epics: () => [...ids].map((id) => ({ id })),
    get: (key: string) => (key === "book_id" ? "aaaaaa" : null),
    ctx: {
      getTags: () => ["member@test"],
      waitUntil: (job: Promise<unknown>) => jobs.push(job),
    },
    env: {
      DOC_ROOMS: {
        idFromName: (name: string) => name,
        get: () => ({ kickAll: async () => {} }),
      },
    },
    sql: {
      exec(sql: string, ...args: unknown[]) {
        queries.push({ sql, args });
        if (sql.startsWith("DELETE FROM epics")) ids.delete(String(args[0]));
        return { toArray: () => [] };
      },
    },
    epicsChanged: () => {
      notifications++;
    },
    deleteEpic: (id: string): unknown =>
      Reflect.apply(Book.prototype.deleteEpic, receiver, [id]),
    runCommand: (socket: object, _email: string, input: RoomCommand) =>
      dispatch(receiver, socket, input),
  };
  const socket = { send: (frame: string) => frames.push(frame) };
  return {
    receiver,
    socket,
    ids,
    queries,
    frames,
    jobs,
    notifications: () => notifications,
  };
}
test("actual Book epic deletion refuses main/unknown/empty before mutation SQL or notification", () => {
  for (const id of ["main", "missing", ""]) {
    const h = fixture();
    if (id === "main") h.ids.add("main");
    expect(
      Reflect.apply(Book.prototype.deleteEpic, h.receiver, [id]),
    ).toMatchObject({ error: "unknown epic" });
    expect(h.queries).toEqual([]);
    expect(h.notifications()).toBe(0);
    expect(h.ids.has("known")).toBe(true);
    expect(h.jobs).toEqual([]);
  }
});
test("actual correlated epic.del returns Refused for root and missing IDs instead of success", async () => {
  for (const id of ["main", "missing"]) {
    const h = fixture();
    await Reflect.apply(Book.prototype.webSocketMessage, h.receiver, [
      h.socket,
      JSON.stringify({ t: "epic.del", id, cid: "delete-guard" }),
    ]);
    expect(
      h.frames.map((frame) => CommandResultSchema.parse(JSON.parse(frame))),
    ).toEqual([
      { t: "result", cid: "delete-guard", ok: false, error: "unknown epic" },
    ]);
    expect(h.queries).toEqual([]);
    expect(h.notifications()).toBe(0);
  }
});
test("actual existing-ID epic deletion retains exact SQL scope, canonical notification and legacy command semantics", async () => {
  for (const correlated of [false, true]) {
    const h = fixture();
    await Reflect.apply(Book.prototype.webSocketMessage, h.receiver, [
      h.socket,
      JSON.stringify({
        t: "epic.del",
        id: "known",
        ...(correlated ? { cid: "delete-known" } : {}),
      }),
    ]);
    await Promise.all(h.jobs);
    expect(h.queries).toEqual([
      { sql: "DELETE FROM tasks WHERE epic_id = ?", args: ["known"] },
      { sql: "DELETE FROM messages WHERE thread = ?", args: ["known"] },
      { sql: "DELETE FROM epics WHERE id = ?", args: ["known"] },
      { sql: "DELETE FROM meta WHERE k = ?", args: ["doc:known"] },
    ]);
    expect(h.ids.has("known")).toBe(false);
    expect(h.notifications()).toBe(1);
    expect(
      h.frames.map((frame) => CommandResultSchema.parse(JSON.parse(frame))),
    ).toEqual(
      correlated ? [{ t: "result", cid: "delete-known", ok: true }] : [],
    );
  }
});
