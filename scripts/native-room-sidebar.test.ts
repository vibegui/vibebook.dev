import { expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Room } from "../shared/room";
import type { CommandOutcome, RoomCommand } from "../shared/commands";
import { RoomCommandSchema } from "../shared/commands";
import { matchesSuggestion, suggestionIdentity } from "../shared/suggestions";
import { createRoomMutations } from "../svelte/features/room-sidebar/session";
import {
  treeFiles,
  agentRows,
  contextPercent,
  suggestionAt,
} from "../svelte/features/room-sidebar/model";
const room = (): Room => ({
  id: "abc123",
  me: "me@test",
  book: { title: "Room", owner: "me@test" },
  members: ["me@test"],
  names: {},
  online: [],
  typing: {},
  messages: [],
  epics: [{ id: "e", title: "Epic", tasks: [] }],
  suggestions: [
    { title: "A", tasks: ["one"], why: "reason" },
    { title: "B", tasks: [] },
  ],
  polls: {},
});
function deferred() {
  let resolve!: (outcome: CommandOutcome) => void,
    reject!: (error: Error) => void;
  const promise = new Promise<CommandOutcome>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
function harness() {
  const r = room(),
    pending = deferred(),
    sent: RoomCommand[] = [],
    timers = new Set<() => void>();
  const clock = {
    schedule: (fn: () => void) => {
      timers.add(fn);
      return fn;
    },
    cancel: (handle: unknown) => {
      for (const timer of timers) if (timer === handle) timers.delete(timer);
    },
  };
  const owner = createRoomMutations(r.me, r.id, clock);
  const request = (command: RoomCommand) => {
    sent.push(command);
    return pending.promise;
  };
  owner.sync(r, request);
  return {
    r,
    owner,
    pending,
    sent,
    timers,
    sync: (next: Room) => owner.sync(next, request),
    fire: () => {
      const jobs = [...timers];
      timers.clear();
      jobs.forEach((fn) => fn());
    },
  };
}

test("native suggestion precondition rejects unseen index shifts while old index-only commands remain compatible", () => {
  const r = room(),
    shown = r.suggestions[0]!;
  const native = RoomCommandSchema.parse({
    t: "suggestion",
    i: 0,
    accept: true,
    expected: shown,
  });
  expect(native.t).toBe("suggestion");
  if (native.t !== "suggestion") throw Error("command");
  const shifted = r.suggestions.slice(1),
    before = JSON.stringify(shifted);
  expect(matchesSuggestion(shifted[native.i], native.expected)).toBe(false);
  expect(JSON.stringify(shifted)).toBe(before);
  expect(matchesSuggestion(undefined, native.expected)).toBe(false);
  expect(
    matchesSuggestion(shown, { tasks: ["one"], why: "reason", title: "A" }),
  ).toBe(true);
  expect(
    matchesSuggestion({ ...shown, tasks: ["changed"] }, native.expected),
  ).toBe(false);
  const old = RoomCommandSchema.parse({ t: "suggestion", i: 0 });
  if (old.t !== "suggestion") throw Error("old command");
  expect(matchesSuggestion(shifted[0], old.expected)).toBe(true);
  expect(suggestionIdentity(shown)).not.toBe(
    suggestionIdentity({ ...shown, why: "edited" }),
  );
});
test("native suggestion sends canonical snapshot, waits ACK plus removal and does not create an epic locally", async () => {
  const h = harness(),
    original = h.r.suggestions[0]!,
    result = h.owner.run({ t: "suggestion", i: 0, accept: true });
  await Promise.resolve();
  expect(h.sent[0]).toEqual({
    t: "suggestion",
    i: 0,
    accept: true,
    expected: original,
  });
  h.pending.resolve({ ok: true });
  await Promise.resolve();
  await Promise.resolve();
  expect(get(h.owner.state).phase).toBe("pending");
  h.sync({ ...h.r, suggestions: h.r.suggestions.slice(1) });
  expect(await result).toBe(true);
  expect(h.r.epics).toHaveLength(1);
  expect(h.r.messages).toHaveLength(0);
  h.owner.dispose();
  expect(h.timers.size).toBe(0);
});
test("prequeue suggestion replacement is refused before sending and definite server mismatch permits fresh review", async () => {
  const h = harness(),
    result = h.owner.run({ t: "suggestion", i: 0 });
  h.sync({ ...h.r, suggestions: h.r.suggestions.slice(1) });
  expect(await result).toBe(false);
  expect(h.sent).toHaveLength(0);
  expect(get(h.owner.state).phase).toBe("error");
  h.owner.dispose();
  const next = harness(),
    server = next.owner.run({ t: "suggestion", i: 0 });
  await Promise.resolve();
  next.pending.resolve({ ok: false, error: "suggestion changed" });
  expect(await server).toBe(false);
  expect(get(next.owner.state).phase).toBe("error");
  next.owner.dispose();
});
test("epic mutations reconcile canonical before ACK and preserve uncertain operations without automatic retries", async () => {
  const h = harness(),
    result = h.owner.run({ t: "epic.rename", id: "e", title: "Renamed" });
  await Promise.resolve();
  h.sync({ ...h.r, epics: [{ ...h.r.epics[0]!, title: "Renamed" }] });
  expect(get(h.owner.state).phase).toBe("pending");
  h.fire();
  expect(get(h.owner.state).phase).toBe("unconfirmed");
  expect(await h.owner.run({ t: "epic.del", id: "e" })).toBe(false);
  expect(h.sent).toHaveLength(1);
  h.pending.resolve({ ok: true });
  expect(await result).toBe(true);
  expect(get(h.owner.state).phase).toBe("idle");
  h.owner.dispose();
});
test("lost ACK and explicit local review release operation without retrying or synthesizing canonical state", async () => {
  const h = harness(),
    result = h.owner.run({ t: "epic.archive", id: "e", archived: true });
  await Promise.resolve();
  h.pending.resolve({ ok: false, error: "disconnected" });
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  expect(get(h.owner.state).phase).toBe("unconfirmed");
  expect(h.r.epics[0]?.archived).toBeUndefined();
  h.owner.review();
  expect(await result).toBe(false);
  expect(h.sent).toHaveLength(1);
  h.owner.dispose();
});
test("room/account revocation and disposal invalidate late replies and cancel every timer", async () => {
  const h = harness(),
    result = h.owner.run({ t: "epic.del", id: "e" });
  await Promise.resolve();
  h.sync({ ...h.r, me: "other@test" });
  expect(await result).toBe(false);
  h.pending.reject(new Error("late"));
  await Promise.resolve();
  await Promise.resolve();
  expect(get(h.owner.state)).toEqual({ phase: "idle", error: "" });
  expect(h.timers.size).toBe(0);
  h.owner.dispose();
});
test("descendant thread files preserve newest loaded exact version, metadata-only chips, order and version counts", () => {
  const r = room();
  r.epics = [
    {
      id: "e",
      title: "root",
      tasks: [],
      files: [{ id: "aa", name: "report.md", type: "text/markdown", n: 5 }],
    },
    {
      id: "child",
      parent: "e",
      title: "child",
      tasks: [],
      files: [{ id: "cc", name: "remote.pdf", type: "application/pdf", n: 2 }],
    },
  ];
  const file = (id: string) => ({
    id,
    name: "report.md",
    type: "text/markdown",
    author: "me@test",
    size: 1,
    ts: 1,
  });
  r.messages = [
    { id: 1, text: "", thread: "e", author: r.me, ts: 1, files: [file("aa")] },
    {
      id: 2,
      text: "",
      thread: "child",
      author: r.me,
      ts: 2,
      files: [file("bb")],
    },
  ];
  expect(treeFiles(r, "e")).toEqual([
    { id: "bb", name: "report.md", type: "text/markdown", n: 5 },
    { id: "cc", name: "remote.pdf", type: "application/pdf", n: 2 },
  ]);
  expect(suggestionAt(r, "pre:0")?.title).toBe("A");
  expect(suggestionAt(r, "pre:0oops")).toBeUndefined();
});
test("presence coalesces reconnects listening first and clamps untrusted context geometry", () => {
  const agent = {
    email: "x",
    who: "Codex",
    repo: null,
    seen_at: 1,
    all_rooms: false,
    context: null,
  };
  expect(
    agentRows(
      {
        sandboxes: [],
        agents: [
          { ...agent, listening: false },
          { ...agent, listening: true },
          { ...agent, email: "other", listening: true },
        ],
      },
      "x",
    ),
  ).toHaveLength(1);
  expect(
    agentRows(
      {
        sandboxes: [],
        agents: [
          { ...agent, listening: false },
          { ...agent, listening: true },
        ],
      },
      "x",
    )[0]?.listening,
  ).toBe(true);
  expect(contextPercent(Infinity, 100)).toBe(0);
  expect(contextPercent(90, 100)).toBe(90);
  expect(contextPercent(200, 100)).toBe(100);
  expect(contextPercent(10, 0)).toBe(0);
});
