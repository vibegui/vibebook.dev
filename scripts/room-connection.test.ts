import { expect, test } from "bun:test";
import { createRoomConnection } from "../svelte/roomConnection";
import type { RoomEvent } from "../shared/room";

type Timer = number | ReturnType<typeof setTimeout>;
const snapshot: RoomEvent = {
  t: "state",
  me: "a@example.com",
  book: { title: "A", owner: "a@example.com" },
  messages: [],
  epics: [],
  members: [],
  online: [],
  suggestions: [],
};
class Socket {
  readyState: WebSocket["readyState"] = 0;
  onopen: WebSocket["onopen"] = null;
  onmessage: WebSocket["onmessage"] = null;
  onclose: WebSocket["onclose"] = null;
  sent: string[] = [];
  closeCalls = 0;
  constructor(readonly url: string) {}
  send(data: string) {
    this.sent.push(data);
  }
  close() {
    this.closeCalls++;
    this.readyState = 3;
  }
  open() {
    this.readyState = 1;
    this.onopen?.call(this as unknown as WebSocket, {} as Event);
  }
  message(event: RoomEvent) {
    this.onmessage?.call(
      this as unknown as WebSocket,
      { data: JSON.stringify(event) } as MessageEvent,
    );
  }
  end(code: number) {
    this.readyState = 3;
    this.onclose?.call(this as unknown as WebSocket, { code } as CloseEvent);
  }
}
function harness(room = "a") {
  const sockets: Socket[] = [],
    events: RoomEvent[] = [],
    terminals: string[] = [];
  const timers = new Map<Timer, { callback: () => void; delay: number }>();
  let timerId = 0;
  const connection = createRoomConnection({
    url: (rc) => `/ws/${room}${rc ? `?rc=${rc}` : ""}`,
    createSocket: (url) => {
      const socket = new Socket(url);
      sockets.push(socket);
      return socket;
    },
    schedule: (callback, delay) => {
      const id = ++timerId as unknown as Timer;
      timers.set(id, { callback, delay });
      return id;
    },
    cancel: (id) => {
      timers.delete(id);
    },
    onEvent: (event) => events.push(event),
    onRemoved: () => terminals.push("removed"),
    onUnavailable: () => terminals.push("unavailable"),
  });
  const run = (delay: number) => {
    const entry = [...timers].find(([, timer]) => timer.delay === delay);
    if (!entry) throw Error(`Missing timer ${delay}`);
    timers.delete(entry[0]);
    entry[1].callback();
  };
  connection.start();
  return { connection, sockets, events, terminals, timers, run };
}

test("navigation cancels a disconnected room's retry and cannot send into that room", () => {
  const a = harness("a"),
    old = a.sockets[0]!;
  old.open();
  old.message(snapshot);
  old.end(1006);
  const queuedRetry = [...a.timers.values()][0]!.callback;
  a.connection.dispose();
  const b = harness("b");
  b.sockets[0]!.open();
  queuedRetry(); // Even an already queued callback cannot resurrect room A.
  expect(a.timers.size).toBe(0);
  expect(a.sockets).toHaveLength(1);
  expect(a.connection.send({ t: "older", thread: "main" })).toBe(false);
  expect(b.connection.send({ t: "older", thread: "main" })).toBe(true);
  expect(old.sent).toHaveLength(0);
  expect(b.sockets[0]!.sent).toEqual(['{"t":"older","thread":"main"}']);
});

test("old socket callbacks cannot mutate a replacement or a disposed connection", () => {
  const h = harness(),
    old = h.sockets[0]!;
  old.open();
  old.message(snapshot);
  const staleMessage = old.onmessage!,
    staleClose = old.onclose!,
    staleOpen = old.onopen!;
  old.end(1006);
  h.run(1000);
  const next = h.sockets[1]!;
  next.open();
  staleMessage.call(
    old as unknown as WebSocket,
    {
      data: JSON.stringify({ t: "delta", id: 1, text: "stale" }),
    } as MessageEvent,
  );
  staleClose.call(old as unknown as WebSocket, { code: 4003 } as CloseEvent);
  staleOpen.call(old as unknown as WebSocket, {} as Event);
  expect(h.events).toEqual([snapshot]);
  expect(h.terminals).toEqual([]);
  expect(h.timers.size).toBe(1);
  h.connection.dispose();
  expect(next.closeCalls).toBe(1);
  expect(h.timers.size).toBe(0);
  expect(h.connection.send({ t: "older", thread: "main" })).toBe(false);
});

test("backoff and close diagnostics survive transient closes and reset only after stability", () => {
  const h = harness();
  h.sockets[0]!.open();
  h.sockets[0]!.message(snapshot);
  const obsoleteStable = [...h.timers.values()][0]!.callback;
  h.sockets[0]!.end(1006);
  h.run(1000);
  expect(h.sockets[1]!.url).toBe("/ws/a?rc=1006");
  h.sockets[1]!.open();
  obsoleteStable();
  h.sockets[1]!.end(1011);
  h.run(2000);
  expect(h.sockets[2]!.url).toBe("/ws/a?rc=1011");
  h.sockets[2]!.open();
  h.run(15000);
  h.sockets[2]!.end(1006);
  h.run(1000);
  expect(h.sockets).toHaveLength(4);
});

test("access denial and removal stop retries; normal initial closes still retry", () => {
  const denied = harness();
  denied.sockets[0]!.end(1006);
  expect(denied.terminals).toEqual(["unavailable"]);
  expect(denied.timers.size).toBe(0);
  const removed = harness();
  removed.sockets[0]!.open();
  removed.sockets[0]!.message(snapshot);
  removed.sockets[0]!.end(4003);
  expect(removed.terminals).toEqual(["removed"]);
  expect(removed.timers.size).toBe(0);
  const normal = harness();
  normal.sockets[0]!.end(1000);
  normal.run(1000);
  expect(normal.sockets).toHaveLength(2);
});

test("resync closes the owned socket and retries with a new snapshot", () => {
  const h = harness();
  h.sockets[0]!.open();
  h.sockets[0]!.message(snapshot);
  h.connection.resync();
  expect(h.sockets[0]!.closeCalls).toBe(1);
  h.sockets[0]!.end(1000);
  h.run(1000);
  h.sockets[1]!.open();
  h.sockets[1]!.message(snapshot);
  expect(h.events).toHaveLength(2);
});

test("repeated disconnects cap retry delay at thirty seconds", () => {
  const h = harness();
  h.sockets[0]!.message(snapshot);
  for (const delay of [1000, 2000, 4000, 8000, 16000, 30000, 30000]) {
    h.sockets.at(-1)!.end(1006);
    expect([...h.timers.values()].map((timer) => timer.delay)).toEqual([delay]);
    h.run(delay);
  }
  h.connection.dispose();
  expect(h.timers.size).toBe(0);
});

test("request: correlated answers resolve by cid, are not forwarded as events, and never hang", async () => {
  const h = harness("a"),
    s = h.sockets[0]!;
  expect(await h.connection.request({ t: "older", thread: "main" })).toEqual({
    ok: false,
    error: "offline",
  });
  s.open();
  s.message(snapshot);
  const one = h.connection.request({
    t: "task.status",
    id: "t1",
    status: "done",
  });
  const two = h.connection.request({
    t: "pin.add",
    kind: "link",
    ref: "javascript:x",
  });
  const sent = s.sent.map((x) => JSON.parse(x) as { cid: string; t: string });
  expect(sent.map((x) => x.t)).toEqual(["task.status", "pin.add"]);
  expect(sent[0]!.cid).not.toBe(sent[1]!.cid);
  // Answers can come back in any order; unknown cids are ignored.
  s.message({ t: "result", cid: "nobody", ok: true });
  s.message({
    t: "result",
    cid: sent[1]!.cid,
    ok: false,
    error: "só links http(s)",
  });
  s.message({ t: "result", cid: sent[0]!.cid, ok: true });
  expect(await one).toEqual({ ok: true });
  expect(await two).toEqual({ ok: false, error: "só links http(s)" });
  expect(h.events.filter((e) => e.t === "result")).toHaveLength(0);
  // The Boolean bridge is unchanged: no cid on the wire.
  expect(h.connection.send({ t: "files.get" })).toBe(true);
  expect(s.sent.at(-1)).toBe('{"t":"files.get"}');
  // Timeout, then a dropped socket: both settle.
  const slow = h.connection.request({ t: "files.get" }, 5000);
  h.run(5000);
  expect(await slow).toEqual({ ok: false, error: "timeout" });
  const dropped = h.connection.request({ t: "files.get" });
  s.end(1006);
  expect(await dropped).toEqual({ ok: false, error: "disconnected" });
  expect(() =>
    h.connection.request({
      t: "task.status",
      id: "t",
      status: "nope",
    } as never),
  ).toThrow();
});
