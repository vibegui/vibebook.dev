import { describe, expect, test } from "bun:test";
import { createRoomStore, reduceRoom } from "../svelte/roomStore";
import type { Ack, Attachment, Epic, Message, Room, RoomEvent } from "../shared/room";

const roomId = "test-room";
const message = (id: number, text = `message ${id}`): Message => ({
  id, text, ts: id * 1000, author: "person@example.com", thread: "main",
});
const epic = (id: string, title = id): Epic => ({ id, title, tasks: [] });
const file = (id: string, name = `${id}.txt`): Attachment => ({
  id, name, type: "text/plain", size: 20, author: "person@example.com", ts: 1000,
});
const ack = (agent: string, status = "doing", msg_id = 1): Ack => ({
  agent, status, msg_id, email: "person@example.com", who: "Agent", ts: 1000,
});
const room = (changes: Partial<Room> = {}): Room => ({
  id: roomId, me: "person@example.com", book: { title: "Test room", owner: "person@example.com" },
  messages: [message(2)], epics: [epic("a"), epic("b")], typing: {},
  members: ["person@example.com"], online: [], suggestions: [],
  files: [], filesN: 0, docs: {}, ...changes,
});
const apply = (current: Room, event: RoomEvent) => reduceRoom(current, event, roomId)!;

// These cases exercise the wire contract, especially retries/partial responses
// that happen on reconnects and concurrent agent activity.
describe("Book room state reducer", () => {
  test("a fresh snapshot discards prior transient typing and stale room data", () => {
    const old = room({ typing: { "2": "smart" }, docs: { old: "stale" } });
    const fresh = room({ messages: [message(10)], epics: [epic("fresh")] });
    const { id: _id, typing: _typing, ...snapshot } = fresh;
    const result = apply(old, { t: "state", ...snapshot });
    expect(result.id).toBe(roomId);
    expect(result.typing).toEqual({});
    expect(result.messages.map(m => m.id)).toEqual([10]);
    expect(result.epics.map(e => e.id)).toEqual(["fresh"]);
    expect(result.docs).toEqual({});
    expect(old.typing).toEqual({ "2": "smart" });
  });

  test("duplicate msg delivery does not duplicate or replace a newer message", () => {
    const initial = room({ messages: [message(2, "fresh text")] });
    const retry = apply(initial, { t: "msg", m: message(2, "old retry") });
    expect(retry.messages).toEqual([message(2, "fresh text")]);
    const next = apply(retry, { t: "msg", m: message(3) });
    expect(next.messages.map(m => m.id)).toEqual([2, 3]);
    expect(initial.messages).toHaveLength(1);
  });

  test("delta updates its message and ends only that message's typing", () => {
    const initial = room({ messages: [message(1), message(2)], typing: { "1": "smart", "2": "fast" } });
    const result = apply(initial, { t: "delta", id: 1, text: "final response" });
    expect(result.messages.map(m => m.text)).toEqual(["final response", "message 2"]);
    expect(result.typing).toEqual({ "2": "fast" });
    expect(initial.messages[0].text).toBe("message 1");
    expect(initial.typing).toEqual({ "1": "smart", "2": "fast" });
  });

  test("epicsPatch updates changed rows, follows server order and removes absent epics", () => {
    const initial = room({ epics: [epic("a"), epic("b"), epic("removed")] });
    const result = apply(initial, { t: "epicsPatch", changed: [epic("b", "Renamed"), epic("new")], order: ["new", "b", "a"] });
    expect(result.epics.map(e => e.id)).toEqual(["new", "b", "a"]);
    expect(result.epics[1].title).toBe("Renamed");
    expect(result.epics[2]).toBe(initial.epics[0]);
    expect(initial.epics[1].title).toBe("b");
  });

  test("epicsPatch with a missing ordered id leaves state intact for host resync", () => {
    const initial = room();
    const result = apply(initial, { t: "epicsPatch", changed: [epic("b", "not yet applicable")], order: ["missing", "b"] });
    expect(result).toBe(initial);
    expect(result.epics[1].title).toBe("b");
  });

  test("older pages are sorted and overlapping stale copies never overwrite loaded messages", () => {
    const initial = room({ messages: [message(5), message(3, "fresh edit")] });
    const result = apply(initial, { t: "older", thread: "main", more: true, messages: [message(4), message(3, "stale page"), message(1)] });
    expect(result.messages.map(m => m.id)).toEqual([1, 3, 4, 5]);
    expect(result.messages[1].text).toBe("fresh edit");
    expect(initial.messages.map(m => m.id)).toEqual([5, 3]);
  });

  test("ackRows updates one agent without losing another agent on the same message", () => {
    const initial = room({ acks: [ack("agent-a"), ack("agent-b"), ack("agent-a", "doing", 2)] });
    const result = apply(initial, { t: "ackRows", acks: [ack("agent-a", "done")] });
    expect(result.acks).toHaveLength(3);
    expect(result.acks?.find(a => a.agent === "agent-a" && a.msg_id === 1)?.status).toBe("done");
    expect(result.acks?.find(a => a.agent === "agent-b")?.status).toBe("doing");
    expect(result.acks?.find(a => a.msg_id === 2)?.status).toBe("doing");
    expect(initial.acks?.[0].status).toBe("doing");
  });

  test("ackRows supports old email-only agent identities", () => {
    const legacy: Ack = { msg_id: 1, email: "legacy@example.com", who: "old agent", status: "doing", ts: 1 };
    const result = apply(room({ acks: [legacy, ack("agent-a")] }), { t: "ackRows", acks: [{ ...legacy, status: "done" }] });
    expect(result.acks).toHaveLength(2);
    expect(result.acks?.find(a => !a.agent)?.status).toBe("done");
  });

  test("fileAdd replaces retried file metadata without incrementing the server total twice", () => {
    const initial = room({ files: [file("a")], filesN: 100 });
    const result = apply(initial, { t: "fileAdd", file: file("b") });
    const retried = apply(result, { t: "fileAdd", file: file("b", "renamed.txt") });
    expect(retried.filesN).toBe(101);
    expect(retried.files?.map(f => f.id)).toEqual(["b", "a"]);
    expect(retried.files?.[0].name).toBe("renamed.txt");
    expect(initial.filesN).toBe(100);
  });

  test("non-snapshot events from a previous room are ignored", () => {
    const initial = room();
    expect(reduceRoom(initial, { t: "msg", m: message(9) }, "another-room")).toBe(initial);
    expect(reduceRoom(null, { t: "msg", m: message(9) }, roomId)).toBeNull();
  });

  test("stale epic document is invalidated then recovered without losing other docs", () => {
    const initial = room({ doc: "room overview", docs: { a: "outdated", b: "retain" } });
    const stale = apply(initial, { t: "doc", epic: "a", stale: true });
    expect(stale.docs).toEqual({ b: "retain" });
    expect(stale.doc).toBe("room overview");
    const recovered = apply(stale, { t: "doc", epic: "a", text: "reloaded", fetched: true });
    expect(recovered.docs).toEqual({ a: "reloaded", b: "retain" });
    expect(initial.docs).toEqual({ a: "outdated", b: "retain" });
    const overview = apply(recovered, { t: "doc", text: "new overview" });
    expect(overview.doc).toBe("new overview");
    expect(overview.docs).toEqual(recovered.docs);
  });

  test("store apply publishes successive snapshots and get agrees with subscriptions", () => {
    const store = createRoomStore();
    const snapshots: (Room | null)[] = [];
    const unsubscribe = store.subscribe(s => snapshots.push(s));
    store.replace(room());
    const result = store.apply({ t: "msg", m: message(3) }, roomId);
    expect(store.get()).toBe(result);
    expect(snapshots.at(-1)).toBe(result);
    expect(result?.messages.map(m => m.id)).toEqual([2, 3]);
    unsubscribe();
  });
});
