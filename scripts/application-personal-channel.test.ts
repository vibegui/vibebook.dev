import { expect, test } from "bun:test";
import type { AuthClock } from "../svelte/features/auth/owner";
import { createPersonalConnection } from "../svelte/features/home/connection";
import {
  createApplicationPersonalChannel,
  type PersonalChannelIdentity,
  type PersonalChannelRoom,
} from "../svelte/features/application/personal-channel";

function harness() {
  let sequence = 0;
  const jobs = new Map<number, { callback: () => void; ms: number; cancelled: boolean }>();
  const clock: AuthClock = {
    schedule(callback, ms) { const id = ++sequence; jobs.set(id, { callback, ms, cancelled: false }); return id; },
    cancel(handle) { if (typeof handle === "number") { const job = jobs.get(handle); if (job) job.cancelled = true; } },
  };
  let identity: PersonalChannelIdentity = { account: "a@test", revision: 0 };
  let selected: PersonalChannelRoom | null = { roomId: "aaaaaa", account: "a@test", connection: {} };
  let listener = (_identity: PersonalChannelIdentity) => {};
  let unlistened = 0;
  const calls: string[] = [];
  let duringRefresh = () => {};
  type ConnectionOptions = Parameters<typeof createPersonalConnection>[0];
  const connections: { options: ConnectionOptions; started: number; disposed: number }[] = [];
  const owner = createApplicationPersonalChannel({
    clock,
    personal: {
      observe: event => { calls.push(`observe:${event.kind}${event.kind === "agents" ? `:${event.book}` : ""}`); },
      invalidate: () => { calls.push("invalidate"); },
      refresh: async () => { calls.push("me"); duringRefresh(); },
      refreshAgents: async () => { calls.push("grants"); },
    },
    agents: { refreshAccount: async () => { calls.push("account"); } },
    listenIdentity(callback) { listener = callback; callback(identity); return () => { unlistened++; }; },
    currentRoom: () => selected?.roomId ?? null,
    room: () => selected,
    refreshRoom: () => { calls.push("room"); },
    url: () => "wss://vb.test/ws-me",
    visible: () => true,
    listenVisibility: () => () => {},
    connection(options) {
      const entry = { options, started: 0, disposed: 0 };
      connections.push(entry);
      return { start() { entry.started++; }, restart() {}, dispose() { entry.disposed++; } };
    },
  });
  return {
    owner, calls, connections, jobs,
    identity(next: PersonalChannelIdentity) { identity = next; listener(next); },
    room(next: PersonalChannelRoom | null) { selected = next; },
    duringRefresh(callback: () => void) { duringRefresh = callback; },
    unlistened: () => unlistened,
    fire(id: number) { jobs.get(id)?.callback(); },
  };
}

test("one document channel starts once; successful connection and visibility keep distinct refresh behavior", () => {
  const h = harness();
  h.owner.start(); h.owner.start();
  expect(h.connections).toHaveLength(1);
  expect(h.connections[0]!.started).toBe(1);
  h.connections[0]!.options.onConnected?.();
  expect(h.calls).toEqual(["invalidate", "me", "grants", "account", "room"]);
  h.calls.length = 0;
  h.connections[0]!.options.onVisible();
  expect(h.calls).toEqual(["invalidate", "me", "grants", "room"]);
  h.owner.dispose();
});

test("agent notices keep account observation and debounce only matching live rooms at 600ms", () => {
  const h = harness(); h.owner.start();
  const callbacks = h.connections[0]!.options;
  callbacks.onAccount(); callbacks.onAgents("bbbbbb");
  expect(h.calls).toEqual(["observe:account", "observe:agents:bbbbbb"]);
  expect(h.jobs.size).toBe(0);
  callbacks.onAgents("aaaaaa"); callbacks.onAgents("*");
  expect([...h.jobs.values()].map(job => job.ms)).toEqual([600, 600]);
  h.calls.length = 0;
  h.fire(1); // Browser may already have queued a cancelled callback.
  expect(h.calls).toEqual([]);
  h.fire(2);
  expect(h.calls).toEqual(["room", "account"]);
  h.owner.dispose();
});

test("route cancellation and replacement Book connection fence already-queued room refresh", () => {
  const h = harness(); h.owner.start();
  const callbacks = h.connections[0]!.options;
  callbacks.onAgents("*"); h.owner.routeChanged(); h.calls.length = 0; h.fire(1);
  expect(h.calls).toEqual([]);
  callbacks.onAgents("*");
  h.room({ roomId: "aaaaaa", account: "a@test", connection: {} });
  h.calls.length = 0; h.fire(2);
  expect(h.calls).toEqual([]);
  h.owner.dispose();
});

test("identity revision restarts immediately, blocks stale socket observations and queued timers", () => {
  const h = harness(); h.owner.start();
  const prior = h.connections[0]!;
  prior.options.onAgents("*");
  h.identity({ account: null, revision: 1 });
  expect(prior.disposed).toBe(1);
  h.room({ roomId: "aaaaaa", account: "b@test", connection: {} });
  h.identity({ account: "b@test", revision: 1 });
  expect(h.connections).toHaveLength(2);
  h.calls.length = 0;
  prior.options.onAccount(); prior.options.onAgents("*"); prior.options.onVisible(); prior.options.onConnected?.(); h.fire(1);
  expect(h.calls).toEqual([]);
  h.connections[1]!.options.onConnected?.();
  expect(h.calls).toEqual(["invalidate", "me", "grants", "account", "room"]);
  h.owner.dispose();
});

test("same-email identity revision and explicit restart replace callbacks without adding identity listeners", () => {
  const h = harness(); h.owner.start();
  h.identity({ account: "a@test", revision: 0 });
  expect(h.connections).toHaveLength(1);
  h.identity({ account: "a@test", revision: 1 });
  h.owner.restart();
  expect(h.connections).toHaveLength(3);
  expect(h.connections.slice(0, 2).map(entry => entry.disposed)).toEqual([1, 1]);
  h.calls.length = 0;
  h.connections[1]!.options.onAccount();
  expect(h.calls).toEqual([]);
  h.owner.dispose(); h.owner.dispose();
  expect(h.unlistened()).toBe(1);
});

test("reentrant identity replacement during account refresh stops the old connected refresh sequence", () => {
  const h = harness(); h.owner.start();
  h.duringRefresh(() => h.identity({ account: "b@test", revision: 1 }));
  h.connections[0]!.options.onConnected?.();
  expect(h.calls).toEqual(["invalidate", "me"]);
  expect(h.connections).toHaveLength(2);
  h.owner.dispose();
});

test("disposed document ignores queued timers, connection callbacks and later identity observations", () => {
  const h = harness(); h.owner.start();
  const callbacks = h.connections[0]!.options;
  callbacks.onAgents("*"); h.owner.dispose(); h.calls.length = 0;
  h.fire(1); callbacks.onAccount(); callbacks.onAgents("*"); callbacks.onConnected?.(); callbacks.onVisible();
  h.identity({ account: "b@test", revision: 1 }); h.owner.start(); h.owner.restart();
  expect(h.calls).toEqual([]);
  expect(h.connections).toHaveLength(1);
  expect(h.connections[0]!.disposed).toBe(1);
  expect(h.unlistened()).toBe(1);
});
