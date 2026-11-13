import { afterEach, describe, expect, test } from "bun:test";
import { plugin } from "bun";
import { readFileSync } from "node:fs";
import { compile, compileModule } from "svelte/compiler";
import { Window as HappyDOMWindow } from "happy-dom";
import type { Room } from "../svelte/roomStore";
import type { RoomCommand } from "../shared/commands";
import type { PanelBridge, PanelProps } from "../svelte/panels";
import type { SidebarProps } from "../svelte/sidebar";
import { createNavigationSession } from "../svelte/features/navigation/session";
import { boardModel } from "../svelte/features/board/model";
import {
  getBoardContainer,
  moveBoardContainer,
  watchBoardLayout,
} from "../svelte/legacy/boardLayout";

// Compile the real components, then run their DOM events with the browser Svelte
// runtime. Run with: bun test --conditions=browser scripts/ui-panels.test.ts
// Happy DOM implements the browser surface used by Svelte, but its declarations
// carry different Event/Element brands. Adapt once at the test environment boundary;
// component props, DOM queries and event calls below use standard browser types.
const window = new HappyDOMWindow({
  url: "http://localhost/",
}) as unknown as Window & typeof globalThis;
for (const key of [
  "window",
  "document",
  "navigator",
  "Node",
  "Element",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLButtonElement",
  "HTMLFormElement",
  "HTMLAnchorElement",
  "HTMLMediaElement",
  "HTMLSelectElement",
  "HTMLTextAreaElement",
  "SVGElement",
  "DocumentFragment",
  "Text",
  "Comment",
  "MutationObserver",
  "ResizeObserver",
  "Event",
  "MouseEvent",
  "PointerEvent",
  "KeyboardEvent",
  "CustomEvent",
  "getComputedStyle",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "localStorage",
]) {
  const value = key === "window" ? window : Reflect.get(window, key);
  Object.defineProperty(globalThis, key, {
    value:
      [
        "getComputedStyle",
        "requestAnimationFrame",
        "cancelAnimationFrame",
      ].includes(key) && typeof value === "function"
        ? value.bind(window)
        : value,
    configurable: true,
    writable: true,
  });
}
plugin({
  name: "svelte-panel-tests",
  setup(build) {
    build.onLoad({ filter: /\.svelte\.js$/ }, (args) => ({
      contents: compileModule(readFileSync(args.path, "utf8"), {
        filename: args.path,
        generate: "client",
      }).js.code,
      loader: "js",
    }));
    build.onLoad({ filter: /\.svelte$/ }, (args) => ({
      contents: compile(readFileSync(args.path, "utf8"), {
        filename: args.path,
        generate: "client",
        css: "injected",
      }).js.code,
      loader: "js",
    }));
  },
});
const { flushSync, tick } = await import("svelte");
const { mountView, dismissDialogs } = await import("../svelte/main");
const vb: PanelBridge = {
  t: (s, vars) =>
    s.replace(/\{(\w+)\}/g, (_, key) => String(vars?.[key] ?? "")),
  icon: () => "<svg></svg>",
  avatar: (email) => `<span>${email}</span>`,
  ago: () => "agora",
  name: (email) => email,
  color: () => "#123456",
  initials: (s) => s.slice(0, 2),
  locale: "en-US",
};
const fixture = (): Room => ({
  id: "r",
  me: "me@test",
  book: { title: "Room", owner: "me@test" },
  members: ["me@test", "you@test"],
  online: [],
  messages: [],
  typing: {},
  suggestions: [],
  epics: [
    {
      id: "e",
      title: "Epic",
      tasks: [
        {
          id: "t",
          title: "Original title",
          done: false,
          status: "todo",
          owner: "me@test",
        },
      ],
    },
  ],
});
const active: ReturnType<typeof mountView>[] = [];
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const c of active.splice(0)) c.destroy();
  window.document.body.innerHTML = "";
  window.localStorage.clear();
});
function render(
  kind: "tasks" | "board" | "files" | "reminders",
  room: Room,
  extra: Partial<PanelProps> = {},
) {
  const target = window.document.createElement("div");
  window.document.body.append(target);
  const events: RoomCommand[] = [];
  const props: PanelProps = {
    room,
    thread: "e",
    vb,
    send: (event) => {
      events.push(event);
      return true;
    },
    ...extra,
  };
  const view = mountView(kind, target, props);
  active.push(view);
  flushSync();
  return {
    target,
    events,
    update(next: Room, thread = props.thread) {
      view.update({ ...props, room: next, thread });
    },
  };
}
function change(el: Element) {
  el.dispatchEvent(new window.Event("change", { bubbles: true }));
  flushSync();
}

describe("native Svelte room panels", () => {
  test("tasks send canonical toggles, assignment and rename without flag text entering title", () => {
    const room = fixture();
    room.epics[0].tasks[0].flags = ["review note"];
    const { target, events } = render("tasks", room);
    const checkbox = target.querySelector("input[type=checkbox]")!;
    checkbox.dispatchEvent(
      new window.MouseEvent("click", { bubbles: true, cancelable: true }),
    );
    flushSync();
    const owner = target.querySelector("select")!;
    owner.value = "you@test";
    change(owner);
    target.querySelector<HTMLElement>("[data-task-title]")!.click();
    flushSync();
    const edit = target.querySelector<HTMLInputElement>("[data-task-edit]")!;
    expect(edit.value).toBe("Original title");
    edit.value = "New title";
    edit.dispatchEvent(new window.Event("input", { bubbles: true }));
    edit.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );
    flushSync();
    expect(events).toEqual([
      { t: "task.toggle", id: "t" },
      { t: "task.assign", id: "t", owner: "you@test" },
      { t: "task.rename", id: "t", title: "New title" },
    ]);
  }, 30_000);
  test("task drafts and active edits stay in their room/thread scope", () => {
    const room = fixture();
    room.epics.push({
      id: "other",
      title: "Other epic",
      tasks: [
        { id: "other-task", title: "Other task", done: false, status: "todo" },
      ],
    });
    const { target, events, update } = render("tasks", room);
    const draft = target.querySelector<HTMLInputElement>("#newTask input")!;
    draft.value = "Draft for original epic";
    draft.dispatchEvent(new window.Event("input", { bubbles: true }));
    target.querySelector<HTMLElement>("[data-task-title]")!.click();
    flushSync();
    update({ ...room });
    expect(
      target.querySelector<HTMLInputElement>("#newTask input")?.value,
    ).toBe("Draft for original epic");
    expect(target.querySelector("[data-task-edit]")).not.toBeNull();
    update(room, "other");
    expect(
      target.querySelector<HTMLInputElement>("#newTask input")?.value,
    ).toBe("");
    expect(target.querySelector("[data-task-edit]")).toBeNull();
    target
      .querySelector("#newTask")!
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    expect(events).toEqual([]);
    const next = target.querySelector<HTMLInputElement>("#newTask input")!;
    next.value = "Task for other epic";
    next.dispatchEvent(new window.Event("input", { bubbles: true }));
    target
      .querySelector("#newTask")!
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    expect(events).toEqual([
      { t: "task.add", epic: "other", title: "Task for other epic" },
    ]);
    update({ ...room, id: "another-room" }, "other");
    expect(
      target.querySelector<HTMLInputElement>("#newTask input")?.value,
    ).toBe("");
  }, 30_000);
  test("task commands retain drafts and controls when disconnected", () => {
    const { target, events } = render("tasks", fixture(), {
      send: () => false,
    });
    const draft = target.querySelector<HTMLInputElement>("#newTask input")!;
    draft.value = "Keep this offline draft";
    draft.dispatchEvent(new window.Event("input", { bubbles: true }));
    target
      .querySelector("#newTask")!
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    flushSync();
    expect(draft.value).toBe("Keep this offline draft");
    expect(target.querySelector('[role="alert"]')?.textContent).toContain(
      "Não deu pra enviar agora",
    );
    const owner = target.querySelector<HTMLSelectElement>("select")!;
    owner.value = "you@test";
    change(owner);
    expect(owner.value).toBe("me@test");
    target.querySelector<HTMLElement>("[data-task-title]")!.click();
    flushSync();
    const edit = target.querySelector<HTMLInputElement>("[data-task-edit]")!;
    edit.value = "Keep this rename";
    edit.dispatchEvent(new window.Event("input", { bubbles: true }));
    edit.dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        cancelable: true,
      }),
    );
    flushSync();
    expect(
      target.querySelector<HTMLInputElement>("[data-task-edit]")?.value,
    ).toBe("Keep this rename");
    expect(events).toEqual([]);
  }, 30_000);
  test("task due dialog saves typed assignments and tears down before native modal handoff", async () => {
    const room = fixture();
    const { target, events, update } = render("tasks", room);
    target.querySelector<HTMLElement>("[data-due]")!.click();
    flushSync();
    await tick();
    const dialog = window.document.querySelector('[role="dialog"]')!;
    expect(dialog).not.toBeNull();
    const input = dialog.querySelector<HTMLInputElement>("input")!;
    input.value = "Friday";
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    dialog
      .querySelector("form")!
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    flushSync();
    await tick();
    expect(events).toEqual([{ t: "task.assign", id: "t", due: "Friday" }]);
    expect(window.document.querySelector('[role="dialog"]')).toBeNull();
    room.epics[0].tasks[0].due = "Friday";
    update({ ...room });
    target.querySelector<HTMLElement>("[data-due]")!.click();
    flushSync();
    await tick();
    expect(
      window.document.querySelector<HTMLInputElement>('[role="dialog"] input')
        ?.value,
    ).toBe("Friday");
    dismissDialogs();
    await tick();
    expect(window.document.querySelector('[role="dialog"]')).toBeNull();
    target.querySelector<HTMLElement>("[data-due]")!.click();
    flushSync();
    await tick();
    update({ ...room, epics: [{ ...room.epics[0], tasks: [] }] });
    await tick();
    expect(window.document.querySelector('[role="dialog"]')).toBeNull();
    expect(events).toHaveLength(1);
  }, 30_000);
  test("board supports keyboard status moves and native list navigation", () => {
    const opened: string[] = [];
    const { target, events } = render("board", fixture(), {
      onopen: (id) => opened.push(id),
    });
    target.querySelector("[data-board-open]")!.dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
      }),
    );
    flushSync();
    expect(events).toEqual([{ t: "task.status", id: "t", status: "doing" }]);
    [...target.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
      .find((button) => button.textContent?.trim() === "Lista")!
      .click();
    flushSync();
    target.querySelector<HTMLElement>("[data-board-open]")!.click();
    expect(opened).toEqual(["e"]);
  }, 30_000);
  test("board projection retains room tasks, explicit archived scopes and invalid scope boundaries", () => {
    const room = fixture();
    room.roomTasks = [{ ...room.epics[0].tasks[0], id: "room-task" }];
    room.epics[0].archived = true;
    expect(boardModel(room, "main").tasks.map((task) => task.id)).toEqual([
      "room-task",
    ]);
    expect(boardModel(room, "e").tasks.map((task) => task.id)).toEqual(["t"]);
    expect(boardModel(room, "missing").missingScope).toBe(true);
    expect(boardModel(room, "missing").targets).toEqual([]);
    expect(boardModel(room, "missing").tasks).toEqual([]);
    room.epics = [];
    expect(boardModel(room, "main").targets).toEqual([
      { id: "main", title: "Room" },
    ]);
    expect(boardModel(room, "main").tasks[0].epicId).toBe("main");
  });
  test("board preserves failed drafts and never retargets a deleted or archived selection", () => {
    for (const removal of ["delete", "archive"] as const) {
      const room = fixture();
      const attempted: RoomCommand[] = [];
      let failure: "reject" | "throw" | null = "reject";
      const { target, update } = render("board", room, {
        thread: "main",
        send: (command) => {
          attempted.push(command);
          if (failure === "throw") throw new Error("Socket closed");
          return failure === null;
        },
      });
      const form = target.querySelector<HTMLFormElement>("form")!;
      const input = form.querySelector<HTMLInputElement>("input")!;
      const epic = form.querySelector<HTMLSelectElement>("select")!;
      input.value = "Keep this draft";
      input.dispatchEvent(new window.Event("input", { bubbles: true }));
      const submit = () => {
        form.dispatchEvent(
          new window.Event("submit", { bubbles: true, cancelable: true }),
        );
        flushSync();
      };
      submit();
      expect(input.value).toBe("Keep this draft");
      expect(epic.value).toBe("e");
      expect(target.querySelector('[role="alert"]')).not.toBeNull();
      failure = "throw";
      submit();
      expect(input.value).toBe("Keep this draft");
      expect(attempted).toHaveLength(2);
      update({
        ...room,
        epics:
          removal === "delete" ? [] : [{ ...room.epics[0], archived: true }],
      });
      flushSync();
      expect(input.value).toBe("Keep this draft");
      expect(epic.value).toBe("e");
      expect(
        form.querySelector<HTMLButtonElement>('button[type="submit"]')
          ?.disabled,
      ).toBe(true);
      submit();
      expect(attempted).toHaveLength(2);
      epic.value = "main";
      change(epic);
      failure = null;
      submit();
      expect(attempted.at(-1)).toEqual({
        t: "task.add",
        epic: "main",
        title: "Keep this draft",
      });
      expect(input.value).toBe("");
    }
  }, 30_000);
  test("board keyboard movement retains focus after a live update without stealing an intervening focus", async () => {
    const room = fixture();
    const { target, events, update } = render("board", room);
    const button =
      target.querySelector<HTMLButtonElement>("[data-board-open]")!;
    button.focus();
    button.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
    flushSync();
    expect(document.activeElement).toBe(button);
    expect(events).toEqual([{ t: "task.status", id: "t", status: "doing" }]);
    const doing = {
      ...room,
      epics: [
        {
          ...room.epics[0],
          tasks: [{ ...room.epics[0].tasks[0], status: "doing" as const }],
        },
      ],
    };
    update(doing);
    await tick();
    await tick();
    const replacement = target.querySelector<HTMLButtonElement>(
      '[data-status="doing"] [data-board-open]',
    )!;
    expect(replacement).not.toBe(button);
    expect(document.activeElement).toBe(replacement);
    replacement.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
    flushSync();
    const draft = target.querySelector<HTMLInputElement>("form input")!;
    draft.focus();
    update({
      ...doing,
      epics: [
        {
          ...doing.epics[0],
          tasks: [{ ...doing.epics[0].tasks[0], status: "review" }],
        },
      ],
    });
    await tick();
    await tick();
    expect(document.activeElement).toBe(draft);
  }, 30_000);
  test("board status controls preserve the focused list occurrence and do not open its epic", async () => {
    localStorage.setItem("vb.boardMode", "list");
    const room = fixture();
    const opened: string[] = [];
    const { target, events, update } = render("board", room, {
      onopen: (id) => opened.push(id),
    });
    const controls = target.querySelectorAll<HTMLSelectElement>(
      '[data-board-task="t"] select',
    );
    expect(controls.length).toBe(2);
    const mine = controls[0];
    mine.focus();
    mine.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
    expect(events).toEqual([]);
    mine.value = "doing";
    change(mine);
    expect(events).toEqual([{ t: "task.status", id: "t", status: "doing" }]);
    expect(mine.value).toBe("todo");
    update({
      ...room,
      epics: [
        {
          ...room.epics[0],
          tasks: [{ ...room.epics[0].tasks[0], status: "doing" }],
        },
      ],
    });
    await tick();
    await tick();
    expect(document.activeElement).toBe(mine);
    expect(mine.value).toBe("doing");
    expect(opened).toEqual([]);
    mine.value = "done";
    change(mine);
    update({
      ...room,
      epics: [
        {
          ...room.epics[0],
          archived: true,
          tasks: [{ ...room.epics[0].tasks[0], done: true, status: "done" }],
        },
      ],
    });
    await tick();
    await tick();
    expect(document.activeElement).toBe(target.querySelector("form input"));
    expect(target.querySelector('[role="status"]')?.textContent).toContain(
      "Feito",
    );
  }, 30_000);
  test("board disposal cancels focus restoration into the next scope", async () => {
    const room = fixture();
    const { target, update } = render("board", room);
    const button =
      target.querySelector<HTMLButtonElement>("[data-board-open]")!;
    button.focus();
    button.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
    flushSync();
    const next = {
      ...room,
      epics: [
        {
          ...room.epics[0],
          tasks: [{ ...room.epics[0].tasks[0], status: "doing" as const }],
        },
      ],
    };
    update(next);
    flushSync();
    update(next, "main");
    flushSync();
    const draft = target.querySelector<HTMLInputElement>("form input")!;
    draft.focus();
    await tick();
    await tick();
    expect(document.activeElement).toBe(draft);
  }, 30_000);
  test("board ignores foreign and removed drag IDs", () => {
    const room = fixture();
    const { target, events, update } = render("board", room);
    const drop = (id: string) => {
      const event = new window.Event("drop", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "dataTransfer", {
        value: { getData: () => id },
      });
      target.querySelector('[data-lane="doing"]')!.dispatchEvent(event);
      flushSync();
    };
    drop("foreign");
    expect(events).toEqual([]);
    drop("t");
    expect(events).toEqual([{ t: "task.status", id: "t", status: "doing" }]);
    update({ ...room, epics: [{ ...room.epics[0], tasks: [] }] });
    flushSync();
    drop("t");
    expect(events).toHaveLength(1);
  }, 30_000);
  test("board layout moves preserve native input identity/focus and dispose media callbacks", () => {
    const book = document.createElement("div");
    book.className = "book boardview";
    const chat = document.createElement("main");
    chat.className = "chat";
    const doc = document.createElement("aside");
    doc.className = "doc";
    const messages = document.createElement("div");
    messages.innerHTML =
      '<div id="kanban" class="doc">Untrusted markdown</div>';
    chat.append(messages);
    const board = document.createElement("div");
    board.id = "kanban";
    const composer = document.createElement("form");
    const draft = document.createElement("input");
    draft.value = "Preserved layout draft";
    board.append(draft);
    doc.append(board);
    chat.append(composer);
    book.append(chat, doc);
    document.body.append(book);
    draft.focus();
    expect(getBoardContainer(book)).toBe(board);
    moveBoardContainer(book, chat, composer);
    expect(messages.firstElementChild?.parentElement).toBe(messages);
    expect(board.parentElement).toBe(chat);
    expect(board.nextSibling).toBe(composer);
    expect(draft.value).toBe("Preserved layout draft");
    expect(document.activeElement).toBe(draft);
    moveBoardContainer(book, doc);
    expect(getBoardContainer(book)).toBe(board);
    expect(board.parentElement).toBe(doc);
    expect(document.activeElement).toBe(draft);
    const callbacks: (() => void)[] = [];
    let removals = 0,
      desktop = 0;
    const media = {
      matches: true,
      addEventListener(_type: "change", listener: () => void) {
        callbacks.push(listener);
      },
      removeEventListener(_type: "change", listener: () => void) {
        expect(listener).toBe(callbacks[0]);
        removals++;
      },
    };
    const stop = watchBoardLayout(book, media, () => desktop++);
    callbacks[0]();
    expect(desktop).toBe(0);
    media.matches = false;
    callbacks[0]();
    expect(desktop).toBe(1);
    book.remove();
    callbacks[0]();
    expect(desktop).toBe(1);
    document.body.append(book);
    stop();
    stop();
    callbacks[0]();
    expect(removals).toBe(1);
    expect(desktop).toBe(1);
  });
  test("files group versions in folders, filter and send pin events", () => {
    const room = fixture();
    room.files = [
      {
        id: "new",
        name: "docs/note.md",
        type: "text/markdown",
        author: "me@test",
        ts: 2,
        size: 40,
      },
      {
        id: "old",
        name: "docs/note.md",
        type: "text/markdown",
        author: "me@test",
        ts: 1,
        size: 20,
      },
      {
        id: "img",
        name: "photo.png",
        type: "image/png",
        author: "me@test",
        ts: 3,
        size: 100,
      },
    ];
    const { target, events } = render("files", room);
    target.querySelector<HTMLElement>("[data-fdir=docs]")!.click();
    flushSync();
    expect(target.querySelectorAll("a.ftile").length).toBe(1);
    expect(target.textContent).toContain("2 versões");
    target.querySelector<HTMLElement>(".pinBtn")!.click();
    expect(events).toEqual([{ t: "pin.add", kind: "file", ref: "new" }]);
    target.querySelector<HTMLElement>("[data-fkind=img]")!.click();
    flushSync();
    expect(target.querySelectorAll("a.ftile").length).toBe(1);
    expect(target.querySelector("a.ftile")?.getAttribute("data-name")).toBe(
      "photo.png",
    );
  }, 30_000);
  test("reminders preserve draft across a server reminder update", () => {
    const room = fixture();
    room.reminders = [
      {
        id: "rem",
        name: "daily",
        text: "Every day at 9",
        owner: "me@test",
        enabled: true,
      },
    ];
    const { target, events, update } = render("reminders", room);
    target.querySelector<HTMLElement>("#remNew")!.click();
    flushSync();
    const text = target.querySelector<HTMLTextAreaElement>("textarea")!;
    text.value = "Every Monday at 10: report";
    text.dispatchEvent(new window.Event("input", { bubbles: true }));
    const on = target.querySelector<HTMLInputElement>("[data-rem-on]")!;
    on.checked = false;
    change(on);
    expect(events).toEqual([{ t: "reminder.enable", id: "rem", on: false }]);
    update({
      ...room,
      reminders: room.reminders?.map((r) => ({ ...r, enabled: false })),
    });
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "Every Monday at 10: report",
    );
  }, 30_000);
  test("reminder upload displays typed schedule and HTTP errors without losing draft", async () => {
    const calls: { url: string; init?: RequestInit }[] = [];
    let status = 200;
    globalThis.fetch = Object.assign(
      async (input: Parameters<typeof fetch>[0], init?: RequestInit) => {
        calls.push({ url: String(input), init });
        return new Response(
          JSON.stringify(
            status === 200
              ? {
                  id: "upload",
                  name: "reminders/daily.md",
                  type: "text/markdown",
                  size: 30,
                  author: "me@test",
                  ts: 1,
                  reminder: { ok: false, error: "Schedule needs a time" },
                }
              : { error: "Upload rejected" },
          ),
          { status },
        );
      },
      { preconnect: originalFetch.preconnect },
    );
    const { target } = render("reminders", fixture());
    target.querySelector<HTMLElement>("#remNew")!.click();
    flushSync();
    const name = target.querySelector<HTMLInputElement>("input[name=name]")!;
    name.value = "daily.md";
    name.dispatchEvent(new window.Event("input", { bubbles: true }));
    const text = target.querySelector<HTMLTextAreaElement>("textarea")!;
    text.value = "Every Monday: report";
    text.dispatchEvent(new window.Event("input", { bubbles: true }));
    target
      .querySelector("form")!
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    await new Promise((resolve) => setTimeout(resolve, 0));
    flushSync();
    expect(calls[0].url).toBe("/api/books/r/files");
    const sent = new Headers(calls[0].init?.headers);
    expect(sent.get("content-type")).toBe("text/markdown");
    expect(sent.get("x-filename")).toBe("reminders%2Fdaily.md");
    expect(target.querySelector("#remErr")?.textContent).toContain(
      "Schedule needs a time",
    );
    expect(
      target.querySelector<HTMLInputElement>("input[name=name]")?.readOnly,
    ).toBe(true);
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "Every Monday: report",
    );
    status = 400;
    target
      .querySelector("form")!
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    await new Promise((resolve) => setTimeout(resolve, 0));
    flushSync();
    expect(target.querySelector("#remErr")?.textContent).toBe(
      "Upload rejected",
    );
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "Every Monday: report",
    );
  }, 30_000);
});

describe("native Svelte chat", () => {
  const escape = (s: string) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c]!,
    );
  const message = (
    id: number,
    text: string,
  ): import("../svelte/chatTypes").ChatMessage => ({
    id,
    text,
    thread: "e",
    author: "you@test",
    kind: "agent",
    ts: id * 1000,
  });
  const bridge = (
    overrides: Partial<import("../svelte/chatTypes").ChatBridge> = {},
  ): import("../svelte/chatTypes").ChatBridge => ({
    t: vb.t,
    icon: vb.icon,
    name: vb.name,
    avatar: vb.avatar,
    agentAvatar: (email) => `<span class="avatar">${escape(email)}</span>`,
    ago: vb.ago,
    hhmm: () => "09:00",
    continues: () => false,
    waiting: () => false,
    remHtml: (m) =>
      `<div class="msg remMsg" id="m${m.id}"><div class="body">${escape(m.text)}</div></div>`,
    issueHtml: (m) =>
      `<div class="msg issueMsg" id="m${m.id}">${escape(m.text)}</div>`,
    isNotice: (m) => m.author === "ai" && m.tag === "notice",
    noticeHtml: (m) =>
      `<div class="msg noticeMsg" id="m${m.id}">${escape(m.text)}</div>`,
    mentions: (s) => s,
    md: (s) => `<p>${escape(s)}</p>`,
    linkify: (s) => s,
    esc: escape,
    quoteHtml: (id) =>
      `<button class="quote" data-quote="${id}">Quoted message ${id}</button>`,
    attHtml: () => "",
    cardHtml: () => "",
    choiceHtml: () => "",
    pollHtml: () => "",
    threadCards: () => "",
    ...overrides,
  });
  function renderChat(
    room: Room,
    extra: Partial<
      import("svelte").ComponentProps<
        typeof import("../svelte/Chat.svelte").default
      >
    > = {},
  ) {
    const target = window.document.createElement("div");
    window.document.body.append(target);
    const props = {
      room,
      thread: "e",
      list: room.messages,
      more: false,
      replyCount: 0,
      vb: bridge(),
      onloadolder: () => {},
      ...extra,
    };
    const view = mountView("chat", target, props);
    active.push(view);
    return {
      target,
      update(next: Room, vb = props.vb) {
        view.update({ ...props, room: next, list: next.messages, vb });
      },
    };
  }
  test("streaming typing notes and repeated text updates retain native message anchors", () => {
    let room: Room = {
      ...fixture(),
      messages: [message(1, "")],
      typing: { "1": "smart" },
    };
    const { target, update } = renderChat(room, {
      vb: bridge({
        typingLabel: () => "com calma",
        typingNote: () => "<img src=x onerror=alert(1)> Working",
      }),
    });
    const row = target.querySelector("#m1")!;
    expect(row.querySelector(".typing")?.textContent).toBe(
      "<img src=x onerror=alert(1)> Working…",
    );
    expect(row.querySelector("img")).toBeNull();
    for (const text of ["H", "Hello", "Hello **world**", "Final response"]) {
      room = { ...room, messages: [message(1, text)], typing: {} };
      update(room);
      expect(target.querySelector("#m1")).toBe(row);
      expect(row.querySelector(".txt")?.textContent).toBe(text);
      expect(row.querySelector(".typing")).toBeNull();
    }
    update({ ...room, messages: [...room.messages, message(2, "next reply")] });
    expect(target.querySelectorAll(".msg")).toHaveLength(2);
    expect(target.querySelectorAll('[data-reply="1"]')).toHaveLength(1);
  }, 30_000);
  test("quotes, native actions, origin and quiet notices survive chat refresh", () => {
    const origin = message(7, "Original request");
    const reply = { ...message(8, "A response"), reply_to: 7 };
    const notice = {
      ...message(9, "Archived safely"),
      author: "ai",
      tag: "notice",
    };
    const room = { ...fixture(), messages: [reply, notice] };
    let pages = 0;
    const { target, update } = renderChat(room, {
      origin,
      more: true,
      replyCount: 2,
      onloadolder: () => pages++,
    });
    expect(target.querySelector(".origin #m7")).toBeNull();
    expect(target.querySelector('.origin [data-gomain="7"]')).not.toBeNull();
    expect(target.querySelector("#m8 .quote")?.getAttribute("data-quote")).toBe(
      "7",
    );
    expect(target.querySelector("#m9.noticeMsg")?.textContent).toBe(
      "Archived safely",
    );
    expect(target.querySelector('#m8 [data-copylink="8"]')).not.toBeNull();
    target.querySelector<HTMLElement>("#olderBtn")!.click();
    expect(pages).toBe(1);
    update({
      ...room,
      messages: [{ ...reply, text: "Updated response" }, notice],
    });
    expect(target.querySelector("#m8 .txt")?.textContent).toBe(
      "Updated response",
    );
    expect(target.querySelectorAll(".origin")).toHaveLength(1);
    expect(target.querySelectorAll("#m9")).toHaveLength(1);
  }, 30_000);
  test("special reminder origins omit self-linking cards without removing native DOM", () => {
    const origin = { ...message(7, "Reminder origin"), tag: "reminder" };
    const normal = { ...message(8, "Reminder reply"), tag: "reminder" };
    const seen: { id: number; origin: boolean }[] = [];
    const room = { ...fixture(), messages: [normal] };
    const { target, update } = renderChat(room, {
      origin,
      vb: bridge({
        remHtml: (m, isOrigin = false) => {
          seen.push({ id: m.id, origin: isOrigin });
          return (
            '<div class="msg remMsg" id="m' +
            m.id +
            '"><div class="body">' +
            escape(m.text) +
            (isOrigin ? "" : '<button class="tcard">Open thread</button>') +
            "</div></div>"
          );
        },
      }),
    });
    expect(seen).toContainEqual({ id: 7, origin: true });
    expect(target.querySelector(".origin .tcard")).toBeNull();
    expect(target.querySelector(".origin #m7")).toBeNull();
    expect(target.querySelectorAll("#m8 .tcard")).toHaveLength(1);
    update({ ...room, messages: [{ ...normal, text: "Updated reminder" }] });
    expect(target.querySelector(".origin .tcard")).toBeNull();
    expect(target.querySelectorAll("#m8 .tcard")).toHaveLength(1);
  }, 30_000);
});

describe("stable native sidebar integration", () => {
  function sidebar(room: Room, extra: Partial<SidebarProps> = {}) {
    const target = window.document.createElement("div");
    window.document.body.append(target);
    const events: RoomCommand[] = [];
    const opened: string[] = [];
    const props: SidebarProps = {
      room,
      thread: "e",
      navigation: createNavigationSession(room.id),
      send: (command) => {
        events.push(command);
        return true;
      },
      onopen: (id) => {
        opened.push(id);
      },
      onarchchange: () => {},
      vb: {
        ...vb,
        bookTitle: () => room.book.title,
        roomMark: () => "",
        roomStrip: () => "",
        pinsSec: () => "",
        sbxRows: () => "",
        agentRows: () => "",
        epicBusy: () => null,
        waitPill: () => "",
        waitsIn: () => [],
      },
      ...extra,
    };
    const view = mountView("sidebar", target, props);
    active.push(view);
    return {
      target,
      props,
      view,
      events,
      opened,
      destroy() {
        active.splice(active.indexOf(view), 1);
        view.destroy();
        target.remove();
      },
    };
  }
  test("native branch disclosure and drafts survive updates and a rail-style remount", () => {
    const room = fixture();
    room.epics.push({ id: "child", title: "Child", parent: "e", tasks: [] });
    room.epics.push(
      { id: "old-parent", title: "Old parent", tasks: [], archived: true },
      {
        id: "old-child",
        parent: "old-parent",
        title: "Old child",
        tasks: [],
        archived: true,
      },
    );
    const session = createNavigationSession(room.id);
    const first = sidebar(room, { navigation: session, thread: "child" });
    const parent = first.target.querySelector<HTMLButtonElement>(
      "[data-epic=e] button[aria-expanded]",
    )!;
    expect(parent.getAttribute("aria-expanded")).toBe("true");
    parent.click();
    flushSync();
    expect(
      first.target.querySelector<HTMLElement>("[data-epic=child]")?.hidden,
    ).toBe(true);
    const draft =
      first.target.querySelector<HTMLInputElement>("#newEpic input")!;
    draft.value = "Room-owned draft";
    draft.dispatchEvent(new window.Event("input", { bubbles: true }));
    flushSync();
    first.view.update({
      ...first.props,
      room: {
        ...room,
        messages: [
          { id: 1, author: room.me, thread: "child", ts: 1, text: "live" },
        ],
      },
    });
    expect(
      first.target.querySelector<HTMLElement>("[data-epic=child]")?.hidden,
    ).toBe(true);
    first.destroy();
    const second = sidebar(room, { navigation: session, thread: "child" });
    expect(
      second.target.querySelector<HTMLInputElement>("#newEpic input")?.value,
    ).toBe("Room-owned draft");
    expect(
      second.target.querySelector<HTMLElement>("[data-epic=child]")?.hidden,
    ).toBe(true);
    second.view.update({ ...second.props, thread: "old-child" });
    second.view.update({ ...second.props, thread: "child" });
    expect(
      second.target.querySelector<HTMLElement>("[data-epic=child]")?.hidden,
    ).toBe(false);
  }, 30_000);
  test("native epic drafts survive rejected and thrown sends; owner controls await canonical state", () => {
    const room = fixture();
    let fail: "false" | "throw" | null = "false";
    const commands: RoomCommand[] = [];
    const rendered = sidebar(room, {
      send(command) {
        if (fail === "throw") throw Error("offline");
        if (fail === "false") return false;
        commands.push(command);
        return true;
      },
    });
    const draft =
      rendered.target.querySelector<HTMLInputElement>("#newEpic input")!;
    draft.value = "Retain title";
    draft.dispatchEvent(new window.Event("input", { bubbles: true }));
    flushSync();
    const form = rendered.target.querySelector<HTMLFormElement>("#newEpic")!;
    for (const failure of ["false", "throw"] as const) {
      fail = failure;
      form.dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
      flushSync();
      expect(draft.value).toBe("Retain title");
      expect(rendered.target.querySelector("[role=alert]")).not.toBeNull();
    }
    fail = null;
    form.dispatchEvent(
      new window.Event("submit", { bubbles: true, cancelable: true }),
    );
    flushSync();
    expect(draft.value).toBe("");
    expect(commands).toEqual([{ t: "epic", title: "Retain title" }]);
    const owner = rendered.target.querySelector<HTMLSelectElement>(
      "[data-epic=e] select",
    )!;
    owner.value = "you@test";
    change(owner);
    expect(commands.at(-1)).toEqual({
      t: "epic.owner",
      id: "e",
      owner: "you@test",
    });
    expect(owner.value).toBe("");
    rendered.view.update({
      ...rendered.props,
      room: {
        ...room,
        epics: room.epics.map((epic) => ({ ...epic, owner: "you@test" })),
      },
    });
    expect(owner.value).toBe("you@test");
    rendered.destroy();
    form.dispatchEvent(
      new window.Event("submit", { bubbles: true, cancelable: true }),
    );
    flushSync();
    expect(commands).toHaveLength(2);
  }, 30_000);
  test("native order controls submit a full permutation without optimistic mutation or stale targets", () => {
    const room = fixture();
    room.epics.push({ id: "other", title: "Other", tasks: [] });
    const rendered = sidebar(room);
    const down = rendered.target.querySelector<HTMLButtonElement>(
      '[aria-label="Mover para baixo: Epic"]',
    )!;
    down.click();
    flushSync();
    expect(rendered.events).toEqual([{ t: "epic.order", ids: ["other", "e"] }]);
    expect(room.epics.map((epic) => epic.id)).toEqual(["e", "other"]);
    rendered.view.update({
      ...rendered.props,
      room: { ...room, epics: [room.epics[0]] },
    });
    expect(down.disabled).toBe(true);
    down.click();
    flushSync();
    expect(rendered.events).toHaveLength(1);
  }, 30_000);
  test("confirmed epic ordering restores disabled-control focus without stealing an intervening field", async () => {
    const room = fixture();
    room.epics.push({ id: "other", title: "Other", tasks: [] });
    const rendered = sidebar(room);
    const down = rendered.target.querySelector<HTMLButtonElement>(
      '[aria-label="Mover para baixo: Epic"]',
    )!;
    down.focus();
    down.click();
    flushSync();
    rendered.view.update({
      ...rendered.props,
      room: { ...room, epics: [room.epics[1], room.epics[0]] },
    });
    await tick();
    flushSync();
    expect(document.activeElement).toBe(
      rendered.target.querySelector('[data-epic-thread="e"]'),
    );
    expect(
      rendered.target.querySelector("[role=status]")?.textContent,
    ).toContain("Ordem dos épicos atualizada.");
    rendered.view.update(rendered.props);
    down.focus();
    down.click();
    flushSync();
    const draft =
      rendered.target.querySelector<HTMLInputElement>("#newEpic input")!;
    draft.focus();
    rendered.view.update({
      ...rendered.props,
      room: { ...room, epics: [room.epics[1], room.epics[0]] },
    });
    await tick();
    flushSync();
    expect(document.activeElement).toBe(draft);
  }, 30_000);
  test("epic ordering focus callbacks cannot target a replaced room view", async () => {
    const room = fixture();
    room.epics.push({ id: "other", title: "Other", tasks: [] });
    const rendered = sidebar(room);
    const down = rendered.target.querySelector<HTMLButtonElement>(
      '[aria-label="Mover para baixo: Epic"]',
    )!;
    down.focus();
    down.click();
    flushSync();
    rendered.view.update({
      ...rendered.props,
      room: { ...room, epics: [room.epics[1], room.epics[0]] },
    });
    rendered.destroy();
    const next = sidebar({ ...room, id: "next" });
    const draft =
      next.target.querySelector<HTMLInputElement>("#newEpic input")!;
    draft.focus();
    await tick();
    flushSync();
    expect(document.activeElement).toBe(draft);
  }, 30_000);
  test("repeated room updates preserve keyed navigation and form drafts", () => {
    let room = fixture();
    const target = window.document.createElement("div");
    window.document.body.append(target);
    const sidebarBridge: SidebarProps["vb"] = {
      ...vb,
      bookTitle: () => room.book.title,
      roomMark: () => '<span class="ri"></span>',
      roomStrip: () => "",
      pinsSec: () => "",
      sbxRows: () => "",
      agentRows: () => "",
      epicBusy: () => null,
      waitPill: () => "",
      waitsIn: () => [],
    };
    const props: SidebarProps = {
      room,
      thread: "e",
      navigation: createNavigationSession(room.id),
      send: () => true,
      onopen: () => {},
      onarchchange: () => {},
      friends: ["friend@test"],
      vb: sidebarBridge,
    };
    const view = mountView("sidebar", target, props);
    active.push(view);
    const row = target.querySelector("[data-epic-thread=e]");
    const create = target.querySelector<HTMLInputElement>("#newEpic input")!;
    const invite = target.querySelector<HTMLInputElement>("#invite input")!;
    create.value = "Draft epic title";
    invite.value = "invitee@test";
    for (let i = 0; i < 6; i++) {
      room = {
        ...room,
        epics: room.epics.map((e) => ({ ...e, title: `Epic update ${i}` })),
        messages: [
          ...room.messages,
          {
            id: i + 1,
            author: "you@test",
            thread: "e",
            ts: i,
            text: "new activity",
          },
        ],
      };
      view.update({ ...props, room, vb: { ...sidebarBridge } });
      expect(target.querySelector("[data-epic-thread=e]")).toBe(row);
      expect(target.querySelector("#newEpic input")).toBe(create);
      expect(create.value).toBe("Draft epic title");
      expect(invite.value).toBe("invitee@test");
    }
    expect(
      target.querySelector("[data-epic-thread=e] [data-epic-title]")
        ?.textContent,
    ).toBe("Epic update 5");
  }, 30_000);

  test("the real host pin wiring remains idempotent on a preserved form", () => {
    const host = readFileSync(
      new URL("../svelte/legacy/host.js", import.meta.url),
      "utf8",
    );
    const start = host.indexOf("function wirePins(el) {");
    const end = host.indexOf("\n// Your Claude", start);
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    const calls: RoomCommand[] = [];
    let renders = 0;
    // Execute the actual host boundary against DOM retained across updates.
    // This catches listener accumulation without copying its implementation.
    const wire = new Function(
      "send",
      "renderSide",
      "document",
      `let pinAdding=false;${host.slice(start, end)};return wirePins;`,
    )(
      (event: RoomCommand) => calls.push(event),
      () => renders++,
      window.document,
    ) as (target: Element) => void;
    const target = window.document.createElement("div");
    window.document.body.append(target);
    target.innerHTML =
      '<button id="pinPlus"></button><button id="pinEmpty"></button><button id="pinCancel"></button><form id="pinForm"><input name="url"><input name="title"></form><button data-unpin="p1"></button>';
    const form = target.querySelector("form")!;
    target.querySelector<HTMLInputElement>("[name=url]")!.value =
      "https://example.com/project";
    target.querySelector<HTMLInputElement>("[name=title]")!.value = "Project";
    for (let i = 0; i < 8; i++) wire(target);
    form.dispatchEvent(
      new window.Event("submit", { bubbles: true, cancelable: true }),
    );
    expect(calls).toEqual([
      {
        t: "pin.add",
        kind: "link",
        ref: "https://example.com/project",
        title: "Project",
      },
    ]);
    expect(renders).toBe(1);
    target.querySelector<HTMLElement>("[data-unpin]")!.click();
    expect(calls.at(-1)).toEqual({ t: "pin.del", id: "p1" });
    target.querySelector<HTMLElement>("#pinPlus")!.click();
    expect(renders).toBe(2);
  }, 30_000);
});
