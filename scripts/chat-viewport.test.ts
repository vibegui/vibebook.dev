import { expect, test } from "bun:test";
import type { Room, Message } from "../shared/room";
import type { RoomCommand } from "../shared/commands";
import { createChatPresentation } from "../svelte/features/chat-viewport/presentation";
import {
  createChatViewport,
  type ChatViewport,
  type ChatSurface,
  type KeepChat,
} from "../svelte/features/chat-viewport/controller";
const message = (id: number): Message => ({
  id,
  thread: "main",
  text: String(id),
  author: "a@test",
  ts: id,
});
const room = (count = 120): Room => ({
  id: "aaaaaa",
  me: "a@test",
  book: { title: "Room", owner: "a@test" },
  members: ["a@test"],
  epics: [{ id: "other", title: "Other", tasks: [] }],
  messages: Array.from({ length: count }, (_, index) => message(index + 1)),
  typing: {},
  online: [],
  suggestions: [],
});
function clock() {
  let id = 0;
  const timers = new Map<number, () => void>();
  return {
    schedule(callback: () => void) {
      const token = ++id;
      timers.set(token, callback);
      return token;
    },
    cancel(value: unknown) {
      if (typeof value === "number") timers.delete(value);
    },
    flush() {
      for (const [key, callback] of [...timers])
        if (timers.delete(key)) callback();
    },
    queued() {
      return timers.size;
    },
  };
}
function harness(count = 120) {
  let current = true,
    queued = true,
    draw = false,
    value = room(count),
    selected = "main",
    generation = 1,
    scroll = () => {},
    growth = () => {},
    revealHook = () => {},
    listeners = 0;
  const time = clock(),
    commands: RoomCommand[] = [],
    renders: KeepChat[] = [],
    notices: string[] = [],
    revealed: number[] = [],
    highlighted: number[] = [],
    visible = new Set<number>();
  const metrics = { top: 900, height: 1000, client: 100 };
  const surface: ChatSurface = {
    connected: () => current,
    metrics: () => ({ ...metrics }),
    top(next) {
      metrics.top = Math.max(
        0,
        Math.min(next, metrics.height - metrics.client),
      );
    },
    message(id) {
      return visible.has(id)
        ? {
            reveal() {
              revealed.push(id);
              revealHook();
            },
            highlight() {
              highlighted.push(id);
            },
          }
        : null;
    },
    listen(onScroll, onGrowth) {
      listeners++;
      scroll = onScroll;
      growth = onGrowth;
      return () => {
        listeners--;
      };
    },
  };
  let view: ChatViewport;
  view = createChatViewport({
    current: () => current,
    send(command) {
      commands.push(command);
      return queued;
    },
    render(keep) {
      renders.push(keep);
      if (draw) {
        visible.clear();
        for (const item of view.selection().list) visible.add(item.id);
      }
    },
    selectThread(thread) {
      selected = thread;
      view.sync(value, selected, generation, true);
      view.attach(surface);
    },
    notice(kind) {
      notices.push(kind);
    },
    schedule: time.schedule,
    cancel: time.cancel,
  });
  view.sync(value, selected, generation, true);
  view.attach(surface);
  return {
    view,
    time,
    commands,
    renders,
    notices,
    revealed,
    highlighted,
    visible,
    metrics,
    surface,
    scroll: () => scroll(),
    growth: () => growth(),
    captureGrowth: () => growth,
    onReveal(callback: () => void) {
      revealHook = callback;
    },
    draw(next: boolean) {
      draw = next;
    },
    listeners: () => listeners,
    current(next: boolean) {
      current = next;
    },
    queued(next: boolean) {
      queued = next;
    },
    sync(
      next: Room,
      fresh = false,
      thread = selected,
      nextGeneration = generation,
    ) {
      value = next;
      selected = thread;
      generation = nextGeneration;
      view.sync(value, selected, generation, true, fresh);
      view.attach(surface);
    },
  };
}
test("window grows sixty locally then requests actual older boundary, preserving privacy-filtered selection", () => {
  const h = harness();
  expect(h.view.selection().list).toHaveLength(60);
  expect(h.view.selection().list[0]?.id).toBe(61);
  h.view.loadOlder();
  expect(h.view.selection().list).toHaveLength(120);
  expect(h.commands).toHaveLength(0);
  h.view.loadOlder();
  expect(h.commands).toEqual([{ t: "older", thread: "main", before: 1 }]);
  h.view.dispose();
});
test("fresh partial snapshot invalidates completed history and permits one initial fill", () => {
  const h = harness(5);
  h.view.ensureFilled();
  h.view.ensureFilled();
  expect(h.commands).toHaveLength(1);
  h.view.older({ t: "older", thread: "main", messages: [], more: false });
  h.view.ensureFilled();
  expect(h.commands).toHaveLength(1);
  h.sync(room(5), true);
  h.view.ensureFilled();
  h.view.ensureFilled();
  expect(h.commands).toHaveLength(2);
  h.view.dispose();
});
test("prepend anchoring preserves location, growth pins only at bottom, and upward scroll unpins", () => {
  const h = harness();
  const before = h.view.capture();
  h.metrics.height = 1300;
  h.view.afterRender(true, before);
  expect(h.metrics.top).toBe(1200);
  h.metrics.height = 1500;
  h.growth();
  expect(h.metrics.top).toBe(1400);
  h.metrics.top = 400;
  h.scroll();
  expect(h.view.pinned()).toBe(false);
  h.metrics.height = 1700;
  h.growth();
  expect(h.metrics.top).toBe(400);
  const reading = h.view.capture();
  h.metrics.height = 1800;
  h.view.afterRender("stay", reading);
  expect(h.metrics.top).toBe(400);
  h.metrics.top = 1700;
  h.scroll();
  expect(h.view.pinned()).toBe(true);
  h.view.dispose();
});
test("content growth moving the bottom does not itself unpin the reader", () => {
  const h = harness();
  h.metrics.height = 1500;
  h.scroll();
  expect(h.view.pinned()).toBe(true);
  h.growth();
  expect(h.metrics.top).toBe(1400);
  h.view.dispose();
});
test("message search performs at most fifteen readonly pages and reports not found", () => {
  const h = harness(5);
  h.view.go(5000);
  for (let index = 0; index < 15; index++)
    h.view.older({ t: "older", thread: "main", messages: [], more: true });
  expect(h.commands).toHaveLength(15);
  expect(h.notices.at(-1)).toBe("missing");
  h.view.dispose();
});
test("late message reveal and deferred attention cannot cross connection/account replacement", () => {
  const h = harness(5);
  h.view.go(5000);
  const next = { ...room(5), messages: [...room(5).messages, message(5000)] };
  h.sync(next);
  h.view.older({
    t: "older",
    thread: "main",
    messages: [message(5000)],
    more: false,
  });
  h.visible.add(5000);
  let attention = 0;
  h.view.defer(() => attention++, 400);
  h.sync({ ...room(5), me: "b@test", members: ["b@test"] }, false, "main", 2);
  h.time.flush();
  expect(h.revealed).toEqual([]);
  expect(attention).toBe(0);
  expect(h.listeners()).toBe(1);
  h.view.dispose();
  expect(h.listeners()).toBe(0);
});
test("refused or missing page releases ownership for explicit retry without automatic resends", () => {
  const h = harness(5);
  h.queued(false);
  h.view.go(999);
  expect(h.notices.at(-1)).toBe("offline");
  h.queued(true);
  h.view.go(999);
  expect(h.commands).toHaveLength(2);
  h.time.flush();
  expect(h.commands).toHaveLength(2);
  expect(h.notices.at(-1)).toBe("offline");
  h.view.go(999);
  expect(h.commands).toHaveLength(3);
  h.view.dispose();
});
test("thread switch cancels old pending reads and detached observer callbacks remain inert", () => {
  const h = harness(5);
  h.view.ensureFilled();
  const oldGrowth = h.captureGrowth();
  h.sync(room(5), false, "other");
  h.view.ensureFilled();
  expect(h.commands.at(-1)).toEqual({ t: "older", thread: "other", before: 0 });
  h.view.dispose();
  const before = h.metrics.top;
  oldGrowth();
  h.time.flush();
  expect(h.metrics.top).toBe(before);
  expect(h.listeners()).toBe(0);
});
test("loaded off-window message expands only as needed then reveals/highlights and unpins", () => {
  const h = harness();
  h.draw(true);
  h.view.go(1);
  expect(h.view.selection().list).toHaveLength(120);
  expect(h.revealed).toEqual([1]);
  expect(h.highlighted).toEqual([1]);
  expect(h.view.pinned()).toBe(false);
  expect(h.commands).toHaveLength(0);
  h.view.dispose();
});
test("old render captures and canonical nonmember data cannot affect a replacement viewport", () => {
  const h = harness();
  const old = h.view.capture();
  h.sync({ ...room(), id: "bbbbbb" }, false, "main", 2);
  h.metrics.top = 333;
  h.view.afterRender(undefined, old);
  expect(h.metrics.top).toBe(333);
  h.sync({ ...room(), members: [] });
  expect(h.view.selection().list).toEqual([]);
  h.view.go(999);
  h.growth();
  expect(h.commands).toEqual([]);
  expect(h.listeners()).toBe(0);
  h.view.dispose();
});
test("reentrant navigation from reveal does not highlight old content or cancel a new message intent", () => {
  const h = harness();
  h.visible.add(1);
  h.onReveal(() => {
    h.sync({ ...room(5), id: "bbbbbb" }, false, "main", 2);
    h.view.go(999);
  });
  h.view.go(1);
  h.view.go(999);
  expect(h.highlighted).toEqual([]);
  expect(h.notices.filter((kind) => kind === "searching")).toHaveLength(1);
  h.view.dispose();
});
test("refused or timed-out initial fill is not resent by passive renders; explicit retry queues one read", () => {
  for (const timeout of [false, true]) {
    const h = harness(5);
    h.queued(timeout);
    h.view.ensureFilled();
    if (timeout) h.time.flush();
    expect(h.notices.at(-1)).toBe("offline");
    h.queued(true);
    for (let index = 0; index < 4; index++) {
      h.sync(room(5));
      h.view.ensureFilled();
    }
    expect(h.commands).toHaveLength(1);
    h.view.loadOlder();
    h.view.ensureFilled();
    expect(h.commands).toHaveLength(2);
    h.view.dispose();
  }
});
test("empty failed initial history exposes the existing older control and explicit retry uses before zero", () => {
  const h = harness(0);
  h.queued(false);
  h.view.ensureFilled();
  expect(h.view.selection().more).toBe(true);
  h.time.flush();
  expect(h.renders.at(-1)).toBe("stay");
  h.view.ensureFilled();
  expect(h.commands).toHaveLength(1);
  h.queued(true);
  h.view.loadOlder();
  expect(h.commands).toEqual([
    { t: "older", thread: "main", before: 0 },
    { t: "older", thread: "main", before: 0 },
  ]);
  h.view.dispose();
});

test("Board hide, hidden frame growth, and pre-flush show preserve the visible unpinned reading anchor", () => {
  const h = harness(),
    presentation = createChatPresentation(h.view);
  let hidden = false;
  h.surface.connected = () => !hidden;
  h.metrics.top = 300;
  h.scroll();
  expect(h.view.pinned()).toBe(false);
  presentation.capture("stay", true);
  presentation.capture("stay", false); // Board state changes before CSS flush.
  hidden = true;
  h.metrics.top = 0;
  h.metrics.height = 0;
  h.metrics.client = 0;
  h.sync(room(121));
  h.growth();
  presentation.capture("stay", false);
  expect(presentation.rendered(false)).toBe(false);
  presentation.capture("stay", true); // Chat state changes while its DOM is still hidden.
  hidden = false;
  h.metrics.height = 1400;
  h.metrics.client = 100;
  expect(presentation.rendered(true)).toBe(true);
  expect(h.metrics.top).toBe(300);
  expect(h.view.pinned()).toBe(false);
  h.view.dispose();
});

test("hidden new-message bottom intent survives passive Board renders until chat becomes visible", () => {
  const h = harness(),
    presentation = createChatPresentation(h.view);
  let hidden = false;
  h.surface.connected = () => !hidden;
  presentation.capture("stay", true);
  presentation.capture("stay", false);
  hidden = true;
  h.metrics.top = 0;
  h.metrics.height = 0;
  h.metrics.client = 0;
  presentation.capture(undefined, false);
  presentation.capture("stay", false);
  presentation.capture("stay", true);
  hidden = false;
  h.metrics.height = 1400;
  h.metrics.client = 100;
  presentation.rendered(true);
  expect(h.metrics.top).toBe(1400);
  expect(h.view.pinned()).toBe(true);
  h.view.dispose();
});
