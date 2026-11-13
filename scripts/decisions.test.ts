import { describe, expect, test } from "bun:test";
import { get } from "svelte/store";
import type { CommandOutcome, RoomCommand } from "../shared/commands";
import type { Decision } from "../shared/room";
import {
  createDecisionsSession,
  decisionRows,
  type DecisionsClock,
} from "../svelte/features/decisions/model";
const decision: Decision = {
  id: 7,
  kind: "decision",
  text: "<img onerror=alert(1)>",
  who: "<who>",
  ts: 1,
};
function deferred() {
  let resolve!: (result: CommandOutcome) => void;
  const promise = new Promise<CommandOutcome>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
function clock() {
  const jobs = new Set<() => void>();
  const timer: DecisionsClock = {
    schedule(fn) {
      jobs.add(fn);
      return fn;
    },
    cancel(handle) {
      jobs.delete(handle as () => void);
    },
  };
  return {
    timer,
    jobs,
    fire() {
      for (const fn of [...jobs]) {
        jobs.delete(fn);
        fn();
      }
    },
  };
}
describe("native decisions", () => {
  test("presentation reverses server order without mutating canonical data", () => {
    const list = [decision, { ...decision, id: 8 }];
    expect(decisionRows(list).map((d) => d.id)).toEqual([8, 7]);
    expect(list.map((d) => d.id)).toEqual([7, 8]);
  });
  test("numeric delete is room scoped, rejects duplicates and waits for canonical removal after ACK", async () => {
    const time = clock(),
      session = createDecisionsSession("a", time.timer),
      response = deferred();
    session.sync([decision]);
    const sent: RoomCommand[] = [];
    const request = (command: RoomCommand) => {
      sent.push(command);
      return response.promise;
    };
    await session.remove("b", 7, request);
    await session.remove("a", 9, request);
    expect(sent).toEqual([]);
    const pending = session.remove("a", 7, request);
    await session.remove("a", 7, request);
    expect(sent).toEqual([{ t: "decision.del", id: 7 }]);
    response.resolve({ ok: true });
    await pending;
    expect(get(session.state).pending[7]).toBe(true);
    expect(time.jobs.size).toBe(1);
    session.sync([]);
    expect(get(session.state)).toEqual({ pending: {}, issues: {} });
    expect(time.jobs.size).toBe(0);
    session.dispose();
  });
  test("canonical removal before reply invalidates late failure, including remote removal", async () => {
    const session = createDecisionsSession("a"),
      response = deferred();
    session.sync([decision]);
    const pending = session.remove("a", 7, () => response.promise);
    session.sync([]);
    response.resolve({ ok: false, error: "late rejection" });
    await pending;
    expect(get(session.state)).toEqual({ pending: {}, issues: {} });
    session.dispose();
  });
  test("server failures and thrown requests allow explicit retry and preserve canonical rows", async () => {
    const session = createDecisionsSession("a");
    session.sync([decision]);
    for (const detail of ["offline", "timeout", "forbidden"]) {
      await session.remove("a", 7, async () => ({ ok: false, error: detail }));
      expect(get(session.state).issues[7]).toBe(detail);
      expect(get(session.state).pending[7]).toBeUndefined();
    }
    await session.remove("a", 7, () => {
      throw new Error("failed");
    });
    expect(get(session.state).issues[7]).toBe("failed");
    session.sync([]);
    expect(get(session.state).issues).toEqual({});
    session.dispose();
  });
  test("ACK without canonical removal expires without claiming deletion", async () => {
    const time = clock(),
      session = createDecisionsSession("a", time.timer);
    session.sync([decision]);
    await session.remove("a", 7, async () => ({ ok: true }));
    time.fire();
    expect(get(session.state)).toEqual({
      pending: {},
      issues: { 7: "unconfirmed" },
    });
    session.dispose();
  });
  test("unmount ignores old ACK and clears timers; a new room owns independent state", async () => {
    const time = clock(),
      old = createDecisionsSession("a", time.timer),
      response = deferred();
    old.sync([decision]);
    const pending = old.remove("a", 7, () => response.promise);
    old.dispose();
    const next = createDecisionsSession("b", time.timer);
    next.sync([decision]);
    response.resolve({ ok: true });
    await pending;
    expect(time.jobs.size).toBe(0);
    expect(get(next.state)).toEqual({ pending: {}, issues: {} });
    await next.remove("b", 7, async () => ({ ok: true }));
    expect(time.jobs.size).toBe(1);
    next.dispose();
    expect(time.jobs.size).toBe(0);
  });
});
