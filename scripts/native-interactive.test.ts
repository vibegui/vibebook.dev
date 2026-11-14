import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { cardOf, cardText, CARD_TYPES } from "../shared/card";
import {
  cardView,
  choicesOf,
  pollView,
  chartView,
  canAnswer,
  canClosePoll,
  answerOf,
  inlineCardNodes,
  CARD_INLINE_BUDGET,
} from "../svelte/features/chat-interactive/model";
import {
  createInteractiveSession,
  idleState,
  type InteractiveClock,
  type InteractiveState,
} from "../svelte/features/chat-interactive/session";
import type { Room, Message, Poll } from "../shared/room";
import type { CommandOutcome, RoomCommand } from "../shared/commands";
const fixture = JSON.parse(
  readFileSync(new URL("./fixtures/card-wire.json", import.meta.url), "utf8"),
) as { input: unknown; expected: unknown };
const card = JSON.stringify(cardOf(fixture.input, "abc123"));
const prompt: Message = {
  id: 1,
  thread: "main",
  author: "me@test",
  kind: "agent",
  text: "question",
  ts: 1,
  card,
};
const poll: Poll = {
  id: "p",
  author: "me@test",
  question: "Choose",
  options: ["A", "B"],
  multi: false,
  closed: false,
  votes: [[], []],
};
const room = (): Room => ({
  id: "abc123",
  me: "me@test",
  book: { title: "Room", owner: "me@test" },
  members: ["me@test", "other@test"],
  online: [],
  typing: {},
  messages: [prompt],
  epics: [],
  suggestions: [],
  polls: { p: poll },
});
function fakeClock() {
  let n = 0;
  const jobs = new Map<number, () => void>();
  const clock: InteractiveClock = {
    schedule: (fn) => {
      jobs.set(++n, fn);
      return n;
    },
    cancel: (id) => {
      jobs.delete(id as number);
    },
  };
  return {
    clock,
    jobs,
    fire: () => {
      for (const job of [...jobs.values()]) job();
    },
  };
}
function harness(
  kind: "card" | "permission" | "poll" = "card",
  initial = room(),
) {
  let state = idleState();
  const timer = fakeClock();
  const session = createInteractiveSession(
    initial.id,
    1,
    (next) => (state = next),
    timer.clock,
    kind,
  );
  session.sync(initial);
  const calls: RoomCommand[] = [];
  let resolve!: (result: CommandOutcome) => void;
  const request = (command: RoomCommand) => {
    calls.push(command);
    return new Promise<CommandOutcome>((done) => (resolve = done));
  };
  return {
    session,
    timer,
    calls,
    request,
    resolve: (outcome: CommandOutcome) => resolve(outcome),
    state: () => state,
  };
}
test("shared normalizer preserves exact legacy catalog wire JSON and aliases", () => {
  // Golden generated once from pre-extraction src/card.ts, including all12 catalog types/aliases/coercions.
  const normalized = cardOf(fixture.input, "abc123");
  expect(JSON.stringify(normalized)).toBe(JSON.stringify(fixture.expected));
  expect(
    new Set(Object.values(normalized.elements).map((el) => el.type)).size,
  ).toBe(CARD_TYPES.length);
  expect(cardText(normalized)).toContain("historical alias");
  expect(cardOf(JSON.stringify(fixture.input), "abc123")).toEqual(normalized);
});
test("normalizer limits and invalid cards stay per-card rather than rejecting message text", () => {
  const make = (type: string, props: Record<string, unknown>) => ({
    root: "c",
    elements: { c: { type: "Card", children: ["x"] }, x: { type, props } },
  });
  for (const raw of [
    make("Image", { url: "/api/books/foreign/files/aa11" }),
    make("Chart", { data: [{ value: Infinity }] }),
    make("Table", { rows: Array.from({ length: 51 }, () => []) }),
    make("Unknown", {}),
    make("Text", { content: "x".repeat(2001) }),
  ])
    expect(() => cardOf(raw, "abc123")).toThrow();
  expect(cardView("{broken", "abc123")).toBeNull();
  expect(
    cardView(
      JSON.stringify(make("Text", { text: "old", style: "unsupported" })),
      "abc123",
    )?.elements.x,
  ).toMatchObject({ props: { content: "old", style: "plain" } });
  const cyclic = {
    root: "c",
    elements: { c: { type: "Card", children: ["c"] } },
  };
  expect(() => cardOf(cyclic, "abc123")).toThrow();
});
test("choices, own canonical answers, Other, closed and member authorization retain baseline", () => {
  expect(
    choicesOf('{"options":["A","B"],"multi":true,"closed":"terminal"}'),
  ).toEqual({ options: ["A", "B"], multi: true, closed: true });
  expect(choicesOf('{"options":[1,2]}')).toBeNull();
  const s = room();
  expect(canAnswer(s, prompt)).toBe(true);
  expect(canAnswer({ ...s, me: "other@test" }, prompt)).toBe(false);
  expect(canAnswer({ ...s, members: [] }, prompt)).toBe(false);
  const foreign = {
    ...prompt,
    id: 2,
    kind: null,
    author: "other@test",
    reply_to: 1,
    text: "Do",
  };
  expect(
    answerOf({ ...s, messages: [prompt, foreign] }, prompt),
  ).toBeUndefined();
  const own = { ...foreign, id: 3, author: "me@test" };
  expect(canAnswer({ ...s, messages: [prompt, own] }, prompt)).toBe(false);
});
test("card answers stay pending after ACK until canonical reply and never mutate the room", async () => {
  const s = room(),
    h = harness("card", s);
  const op = h.session.reply("3", h.request);
  expect(h.calls[0]).toMatchObject({
    t: "msg",
    thread: "main",
    text: "3",
    reply_to: 1,
  });
  await h.session.reply("3", h.request);
  expect(h.calls).toHaveLength(1);
  h.resolve({ ok: true });
  await op;
  expect(h.state().phase).toBe("pending");
  expect(s.messages).toHaveLength(1);
  h.session.sync({
    ...s,
    messages: [
      prompt,
      { ...prompt, id: 2, kind: null, reply_to: 1, text: "3" },
    ],
  });
  expect(h.state().phase).toBe("idle");
  expect(h.timer.jobs.size).toBe(0);
});
test("canonical answer/removal before response suppresses late server errors", async () => {
  for (const removed of [false, true]) {
    const s = room(),
      h = harness("card", s),
      op = h.session.reply("3", h.request);
    h.session.sync({
      ...s,
      messages: removed
        ? []
        : [prompt, { ...prompt, id: 2, kind: null, reply_to: 1, text: "3" }],
    });
    h.resolve({ ok: false, error: "late" });
    await op;
    expect(h.state()).toEqual(idleState());
  }
});
test("server failures allow explicit retry but unconfirmed reply does not duplicate an accepted message", async () => {
  const h = harness();
  let op = h.session.reply("3", h.request);
  h.resolve({ ok: false, error: "blocked" });
  await op;
  expect(h.state().error).toBe("blocked");
  op = h.session.reply("3", h.request);
  h.resolve({ ok: true });
  await op;
  h.timer.fire();
  expect(h.state().phase).toBe("unconfirmed");
  await h.session.reply("3", h.request);
  expect(h.calls).toHaveLength(2);
});
test("permission closure, room switch and disposal invalidate callbacks and timers", async () => {
  const q = {
    ...prompt,
    card: null,
    text: "⏸ Seu Claude pede permissão",
    choices: '{"options":["Aprovar","Negar"],"multi":false}',
  };
  const s = { ...room(), messages: [q] };
  for (const reason of ["closed", "room", "dispose"]) {
    const h = harness("permission", s),
      op = h.session.reply("Aprovar", h.request);
    if (reason === "closed")
      h.session.sync({
        ...s,
        messages: [
          {
            ...q,
            choices: '{"options":["Aprovar","Negar"],"closed":"terminal"}',
          },
        ],
      });
    else if (reason === "room") h.session.sync({ ...s, id: "other" });
    else h.session.dispose();
    h.resolve({ ok: false, error: "late" });
    await op;
    expect(h.state().phase).not.toBe("error");
    expect(h.timer.jobs.size).toBe(0);
    await h.session.reply("Aprovar", h.request);
    expect(h.calls).toHaveLength(1);
  }
});
test("poll counts use total votes, distinct voters, top4 avatars and all positive tied winners", () => {
  const p = {
    ...poll,
    multi: true,
    closed: true,
    votes: [
      ["me@test", "other@test"],
      ["me@test", "third@test"],
    ],
  };
  const view = pollView(p, "me@test");
  expect(view.voters).toBe(3);
  expect(view.rows.map((row) => row.percent)).toEqual([50, 50]);
  expect(view.rows.every((row) => row.winner && row.mine)).toBe(true);
  expect(
    pollView({ ...p, votes: [[], []] }, "me@test").rows.some(
      (row) => row.winner,
    ),
  ).toBe(false);
  expect(canClosePoll(room(), poll)).toBe(true);
  expect(canClosePoll({ ...room(), me: "other@test" }, poll)).toBe(false);
  expect(
    canClosePoll({ ...room(), me: "other@test" }, { ...poll, author: "ai" }),
  ).toBe(true);
});
test("poll toggle waits for canonical desired state; no-op ACK expires without retry", async () => {
  const s = { ...room(), messages: [{ ...prompt, card: null, poll: "p" }] };
  const h = harness("poll", s);
  let op = h.session.vote(0, h.request);
  h.resolve({ ok: true });
  await op;
  expect(h.state().phase).toBe("pending");
  h.timer.fire();
  expect(h.state().phase).toBe("unconfirmed");
  expect(h.calls).toHaveLength(1);
  await h.session.vote(0, h.request);
  expect(h.calls).toHaveLength(1);
  h.session.sync({ ...s, polls: { p: { ...poll, votes: [[s.me], []] } } });
  expect(h.state().phase).toBe("idle");
});
test("remote poll close before ACK clears pending vote/close and stale rejection", async () => {
  for (const close of [false, true]) {
    const s = { ...room(), messages: [{ ...prompt, card: null, poll: "p" }] },
      h = harness("poll", s),
      op = close ? h.session.close(h.request) : h.session.vote(0, h.request);
    h.session.sync({ ...s, polls: { p: { ...poll, closed: true } } });
    h.resolve({ ok: false, error: "closed" });
    await op;
    expect(h.state().phase).toBe("idle");
    await h.session.vote(0, h.request);
    expect(h.calls).toHaveLength(1);
  }
});
test("chart projection uses finite SVG points even for opposing finite extremes", () => {
  const view = chartView([
    { label: "low", value: -1e308 },
    { label: "high", value: 1e308 },
  ]);
  expect(view.points).toBe("0.0,90.0 300.0,0.0");
  expect(view.bars).toEqual([100, 100]);
});

test("line charts retain baseline absolute-max headroom for small positive and all-negative data", () => {
  expect(chartView([{ label: "half", value: 0.5 }]).points).toBe("0.0,45.0");
  expect(chartView([{ label: "negative", value: -5 }]).points).toBe("0.0,90.0");
  expect(
    chartView([
      { label: "low", value: -5 },
      { label: "high", value: -1 },
    ]).points,
  ).toBe("0.0,90.0 300.0,54.0");
});

test("lost ACK timeout/disconnect retain uncertain operation until canonical reply or vote", async () => {
  for (const kind of ["card", "poll"] as const)
    for (const error of ["timeout", "disconnected", "server error"]) {
      const s =
        kind === "card"
          ? room()
          : { ...room(), messages: [{ ...prompt, card: null, poll: "p" }] };
      const h = harness(kind, s),
        op =
          kind === "card"
            ? h.session.reply("3", h.request)
            : h.session.vote(0, h.request);
      h.resolve({ ok: false, error });
      await op;
      expect(h.state().phase).toBe("unconfirmed");
      if (kind === "card") await h.session.reply("3", h.request);
      else await h.session.vote(0, h.request);
      expect(h.calls).toHaveLength(1);
      h.session.sync(
        kind === "card"
          ? {
              ...s,
              messages: [
                prompt,
                { ...prompt, id: 2, kind: null, reply_to: 1, text: "3" },
              ],
            }
          : { ...s, polls: { p: { ...poll, votes: [[s.me], []] } } },
      );
      expect(h.state().phase).toBe("idle");
    }
});

test("many legitimate tables remain normalized while inline DOM cost is bounded and full dialogs stay available", () => {
  const elements: Record<string, unknown> = {
    c: {
      type: "Card",
      children: Array.from({ length: 149 }, (_, i) => `t${i}`),
    },
  };
  for (let i = 0; i < 149; i++)
    elements[`t${i}`] = {
      type: "Table",
      props: { rows: Array.from({ length: 50 }, () => Array(10).fill("")) },
    };
  const card = cardOf({ root: "c", elements }, "abc123");
  expect(Object.keys(card.elements)).toHaveLength(150);
  const inline = inlineCardNodes(card);
  expect(inline.size).toBeLessThan(3);
  let cost = 0;
  for (const id of inline) {
    const node = card.elements[id];
    if (node.type === "Table")
      cost +=
        node.props.rows.reduce((sum, row) => sum + row.length * 2 + 2, 0) + 4;
  }
  expect(cost).toBeLessThanOrEqual(CARD_INLINE_BUDGET);
  expect(
    card.elements.t148.type === "Table" && card.elements.t148.props.rows,
  ).toHaveLength(50);
});
