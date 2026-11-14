import { createRoomMutations } from "../svelte/features/room-sidebar/session";
import {
  createDocumentDrafts,
  createDocumentSession,
} from "../svelte/features/documents/session";
import type { DocumentProps } from "../svelte/features/documents/types";
import { afterEach, describe, expect, test } from "bun:test";
import { plugin } from "bun";
import type { Component, ComponentProps } from "svelte";
import { writable } from "svelte/store";
import { readFileSync } from "node:fs";
import { compile, compileModule } from "svelte/compiler";
import { Window as HappyDOMWindow } from "happy-dom";
import type { Room } from "../svelte/roomStore";
import type { ChatProps } from "../svelte/chatTypes";
import type { CommandOutcome, RoomCommand } from "../shared/commands";
import type { PanelBridge, PanelProps } from "../svelte/panels";
import type { SidebarProps } from "../svelte/sidebar";
import { createNavigationSession } from "../svelte/features/navigation/session";
import {
  disposePinsSession,
  requestPinnedFiles,
  syncPinsSession,
} from "../svelte/features/pins/session";
import { createFilesSession } from "../svelte/features/files/session";
import type { FilesProps } from "../svelte/features/files/types";
import type { PeopleAction } from "../svelte/features/people/model";
import { createComposerDrafts } from "../svelte/features/composer/drafts";
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
  "location",
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
const { flushSync, tick, mount, unmount } = await import("svelte");
const { mountView, dismissDialogs } = await import("../svelte/main");
const { default: People } = await import("../svelte/People.svelte");
const { default: PeopleView } = await import("../svelte/View.svelte");
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
const originalClipboardWrite = window.navigator.clipboard.writeText;
const peopleCleanups: (() => void)[] = [];
afterEach(() => {
  globalThis.fetch = originalFetch;
  window.navigator.clipboard.writeText = originalClipboardWrite;
  for (const destroy of peopleCleanups.splice(0)) destroy();
  for (const c of active.splice(0)) c.destroy();
  window.document.body.innerHTML = "";
  window.localStorage.clear();
});
// Poll actual DOM state and report identity as a boolean, avoiding huge DOM graphs.
async function expectFocusedAfterUpdates(expected: Element | null) {
  expect(expected instanceof HTMLElement).toBe(true);
  // ACK, canonical reconciliation and Svelte's scheduled focus settle separately.
  // Always cross a frame, including when checking that intervening focus stays put.
  for (let frame = 0; frame < 10; frame++) {
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    flushSync();
    await tick();
    if (document.activeElement === expected) break;
  }
  expect(document.activeElement === expected).toBe(true);
}
// Bits retains closed content until its exit-animation frame completes.
async function expectAlertDialogClosed() {
  for (let frame = 0; frame < 10; frame++) {
    if (!document.querySelector('[role="alertdialog"]')) break;
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    flushSync();
    await tick();
  }
  expect(document.querySelector('[role="alertdialog"]') === null).toBe(true);
}

function render(
  kind: "tasks" | "board" | "files" | "reminders" | "decisions",
  room: Room,
  extra: Partial<PanelProps & FilesProps> = {},
) {
  const target = window.document.createElement("div");
  window.document.body.append(target);
  const events: RoomCommand[] = [];
  const filesSession = createFilesSession(room.id);
  const props = {
    room,
    thread: "e",
    vb,
    send: (event: RoomCommand) => {
      events.push(event);
      return true;
    },
    request: async (event: RoomCommand) => {
      events.push(event);
      return { ok: true } as const;
    },
    ...(kind === "files"
      ? {
          session: filesSession,
          onfolderchange: () => {},
          onopenfile: () => {},
        }
      : {}),
    ...extra,
  };
  const view = mountView(kind, target, props);
  active.push(view);
  flushSync();
  return {
    target,
    events,
    destroy() {
      active.splice(active.indexOf(view), 1);
      view.destroy();
    },
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
    expect(target.querySelectorAll("[data-file-id]").length).toBe(1);
    expect(target.textContent).toContain("2 versões");
    target
      .querySelector<HTMLElement>('[data-file-id="new"] button[aria-pressed]')!
      .click();
    expect(events).toEqual([{ t: "pin.add", kind: "file", ref: "new" }]);
    target.querySelector<HTMLElement>("[data-fkind=img]")!.click();
    flushSync();
    expect(target.querySelectorAll("[data-file-id]").length).toBe(1);
    expect(
      target.querySelector("[data-file-id]")?.getAttribute("data-file-id"),
    ).toBe("img");
  }, 30_000);

  test("shared switch keeps default local updates and rejects them only in controlled mode", async () => {
    const Switch = (await import("../svelte/lib/ui/Switch.svelte")).default;
    for (const controlled of [false, true]) {
      const target = document.createElement("div");
      document.body.append(target);
      const desired: boolean[] = [];
      const instance = flushSync(() =>
        mount(Switch, {
          target,
          props: {
            checked: true,
            controlled,
            onCheckedChange: (value: boolean) => desired.push(value),
          },
        }),
      );
      try {
        const input = target.querySelector<HTMLInputElement>("input")!;
        input.checked = false;
        change(input);
        expect(input.checked).toBe(controlled);
        expect(input.getAttribute("aria-checked")).toBe(String(controlled));
        expect(desired).toEqual([false]);
      } finally {
        await unmount(instance);
        target.remove();
      }
    }
  }, 30_000);
  test("native decisions render escaped canonical rows in reverse order and preserve empty state", () => {
    const room = fixture();
    room.decisions = [
      {
        id: 7,
        kind: "decision",
        text: "<script>bad()</script>",
        who: "<who>",
        ts: 1,
      },
      { id: 8, kind: "approval", text: "approved", who: "you@test", ts: 2 },
    ];
    const { target, update } = render("decisions", room);
    expect(
      Array.from(target.querySelectorAll("[data-decision-id]"), (el) =>
        el.getAttribute("data-decision-id"),
      ),
    ).toEqual(["8", "7"]);
    expect(target.querySelector("script")).toBeNull();
    expect(target.textContent).toContain("<script>bad()</script>");
    expect(target.textContent).toContain("<who>");
    expect(target.textContent).toContain("✓ aprovado");
    expect(target.textContent).toContain("decidido");
    update({ ...room, decisions: [] });
    expect(target.querySelector("[data-ddel]")).toBeNull();
    expect(target.textContent).toContain("O que a sala decidir");
  });
  test("decision deletion requires confirmation, restores cancellation focus and waits for canonical removal", async () => {
    const room = fixture();
    room.decisions = [
      {
        id: 7,
        kind: "decision",
        text: "Keep this until canonical removal",
        who: "me@test",
        ts: 1,
      },
    ];
    let answer!: (value: { ok: true }) => void;
    const response = new Promise<{ ok: true }>((resolve) => {
      answer = resolve;
    });
    const events: RoomCommand[] = [];
    const { target, update } = render("decisions", room, {
      request: (command) => {
        events.push(command);
        return response;
      },
      send: () => {
        throw new Error("Decisions must use correlated request");
      },
    });
    const trigger = target.querySelector<HTMLButtonElement>("[data-ddel]")!;
    trigger.focus();
    trigger.click();
    flushSync();
    await tick();
    let dialog = document.querySelector<HTMLElement>('[role="alertdialog"]')!;
    const cancel = Array.from(
      dialog.querySelectorAll<HTMLButtonElement>("button"),
    ).find((b) => b.textContent?.includes("Cancelar"))!;
    expect(document.activeElement === cancel).toBe(true);
    expect(events).toEqual([]);
    cancel.click();
    flushSync();
    await tick();
    expect(document.activeElement === trigger).toBe(true);
    await expectAlertDialogClosed();
    trigger.click();
    flushSync();
    await tick();
    dialog = document.querySelector<HTMLElement>('[role="alertdialog"]')!;
    const confirm = Array.from(
      dialog.querySelectorAll<HTMLButtonElement>("button"),
    ).find((b) => b.textContent?.includes("Apagar registro"))!;
    confirm.click();
    flushSync();
    await tick();
    expect(events).toEqual([{ t: "decision.del", id: 7 }]);
    expect(trigger.disabled).toBe(true);
    expect(confirm.disabled).toBe(true);
    answer({ ok: true });
    await tick();
    flushSync();
    expect(target.querySelector("[data-decision-id]")).not.toBeNull();
    expect(document.querySelector('[role="alertdialog"]')).not.toBeNull();
    update({ ...room, decisions: [] });
    await tick();
    flushSync();
    await expectAlertDialogClosed();
    expect(document.activeElement).toBe(
      target.querySelector("[data-decisions-panel]"),
    );
  }, 30_000);
  test("decision failure remains visible for retry; canonical removal and room changes clear issues", async () => {
    const room = fixture();
    room.decisions = [
      { id: 7, kind: "decision", text: "record", who: "me@test", ts: 1 },
    ];
    let answer!: (value: { ok: false; error: string }) => void;
    const response = new Promise<{ ok: false; error: string }>((resolve) => {
      answer = resolve;
    });
    const { target, update } = render("decisions", room, {
      request: () => response,
    });
    target.querySelector<HTMLButtonElement>("[data-ddel]")!.click();
    flushSync();
    await tick();
    const confirm = Array.from(
      document
        .querySelector('[role="alertdialog"]')!
        .querySelectorAll<HTMLButtonElement>("button"),
    ).find((b) => b.textContent?.includes("Apagar registro"))!;
    confirm.click();
    flushSync();
    await tick();
    answer({ ok: false, error: "forbidden" });
    await tick();
    flushSync();
    expect(
      document.querySelector('[role="alertdialog"]')!.textContent,
    ).toContain("forbidden");
    expect(confirm.disabled).toBe(false);
    expect(target.querySelector("[data-decision-id]")).not.toBeNull();
    update({ ...room, decisions: [] });
    await tick();
    flushSync();
    await expectAlertDialogClosed();
    update({ ...room, id: "other-room" });
    await tick();
    flushSync();
    expect(target.textContent).not.toContain("forbidden");
    expect(
      target.querySelector<HTMLButtonElement>("[data-ddel]")!.disabled,
    ).toBe(false);
  }, 30_000);
  for (const transition of ["remote removal", "room switch"] as const) {
    test(`decision pending dialog closes on ${transition} and ignores late rejection`, async () => {
      const room = fixture();
      room.decisions = [
        { id: 7, kind: "decision", text: "record", who: "me@test", ts: 1 },
      ];
      let answer!: (value: { ok: false; error: string }) => void;
      const response = new Promise<{ ok: false; error: string }>((resolve) => {
        answer = resolve;
      });
      const { target, update } = render("decisions", room, {
        request: () => response,
      });
      target.querySelector<HTMLButtonElement>("[data-ddel]")!.click();
      flushSync();
      await tick();
      const confirm = Array.from(
        document
          .querySelector('[role="alertdialog"]')!
          .querySelectorAll<HTMLButtonElement>("button"),
      ).find((b) => b.textContent?.includes("Apagar registro"))!;
      confirm.click();
      flushSync();
      await tick();
      update(
        transition === "remote removal"
          ? { ...room, decisions: [] }
          : { ...room, id: "other" },
      );
      await tick();
      flushSync();
      await expectAlertDialogClosed();
      answer({ ok: false, error: "late failure" });
      await tick();
      flushSync();
      expect(target.textContent).not.toContain("late failure");
      if (transition === "room switch")
        expect(
          target.querySelector<HTMLButtonElement>("[data-ddel]")!.disabled,
        ).toBe(false);
    }, 30_000);
  }
  test("native reminder disclosure and controlled switches wait for server acknowledgement", async () => {
    const room = fixture();
    room.reminders = [
      {
        id: "rem",
        name: "daily",
        text: "Every Monday at 9am UTC: report",
        owner: "me@test",
        enabled: true,
      },
    ];
    let answer!: (value: { ok: false; error: string }) => void;
    const pending = new Promise<{ ok: false; error: string }>((resolve) => {
      answer = resolve;
    });
    const { target, update } = render("reminders", room, {
      request: () => pending,
    });
    const disclosure =
      target.querySelector<HTMLButtonElement>("[data-rem-open]")!;
    expect(disclosure.tagName).toBe("BUTTON");
    expect(disclosure.type).toBe("button");
    expect(disclosure.getAttribute("aria-expanded")).toBe("false");
    disclosure.click();
    flushSync();
    expect(disclosure.getAttribute("aria-expanded")).toBe("true");
    expect(target.querySelector<HTMLPreElement>("pre")?.hidden).toBe(false);
    const enabled = target.querySelector<HTMLInputElement>("[data-rem-on]")!;
    enabled.checked = false;
    change(enabled);
    expect(enabled.checked).toBe(true);
    expect(enabled.disabled).toBe(true);
    answer({ ok: false, error: "offline" });
    await tick();
    flushSync();
    expect(enabled.checked).toBe(true);
    expect(enabled.disabled).toBe(false);
    expect(target.textContent).toContain("sem conexão");
    update({
      ...room,
      reminders: room.reminders.map((r) => ({ ...r, enabled: false })),
    });
    expect(enabled.checked).toBe(false);
  }, 30_000);
  test("reminder deletion requires its native alert dialog and restores focus after cancellation", async () => {
    const room = fixture();
    room.reminders = [
      {
        id: "rem",
        name: "daily",
        text: "Every Monday at 9am UTC: report",
        owner: "me@test",
        enabled: true,
      },
    ];
    const { target, events } = render("reminders", room);
    const trigger = target.querySelector<HTMLButtonElement>("[data-rem-del]")!;
    trigger.focus();
    trigger.click();
    flushSync();
    await tick();
    expect(events).toEqual([]);
    const dialog = document.querySelector<HTMLElement>('[role="alertdialog"]')!;
    expect(dialog).not.toBeNull();
    const cancel = Array.from(
      dialog.querySelectorAll<HTMLButtonElement>("button"),
    ).find((button) => button.textContent?.includes("Cancelar"))!;
    expect(document.activeElement === cancel).toBe(true);
    cancel.click();
    flushSync();
    await tick();
    expect(events).toEqual([]);
    await expectAlertDialogClosed();
    expect(document.activeElement === trigger).toBe(true);
    trigger.click();
    flushSync();
    await tick();
    const confirm = Array.from(
      document
        .querySelector('[role="alertdialog"]')!
        .querySelectorAll<HTMLButtonElement>("button"),
    ).find((button) => button.textContent?.includes("Apagar lembrete"))!;
    confirm.click();
    flushSync();
    await tick();
    expect(events).toEqual([{ t: "reminder.delete", id: "rem" }]);
  }, 30_000);
  test("late upload completion cannot close the draft in another room", async () => {
    let finish!: (response: Response) => void;
    const response = new Promise<Response>((resolve) => {
      finish = resolve;
    });
    globalThis.fetch = Object.assign(async () => response, {
      preconnect: originalFetch.preconnect,
    });
    const { target, update } = render("reminders", fixture());
    target.querySelector<HTMLElement>("#remNew")!.click();
    flushSync();
    for (const [selector, value] of [
      ["input[name=name]", "daily"],
      ["textarea", "Every Monday at 9am UTC: old"],
    ]) {
      const input = target.querySelector<HTMLInputElement>(selector)!;
      input.value = value;
      input.dispatchEvent(new window.Event("input", { bubbles: true }));
    }
    target
      .querySelector("form")!
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    flushSync();
    update({ ...fixture(), id: "other" });
    target.querySelector<HTMLElement>("#remNew")!.click();
    flushSync();
    const text = target.querySelector<HTMLTextAreaElement>("textarea")!;
    text.value = "new room draft";
    text.dispatchEvent(new window.Event("input", { bubbles: true }));
    finish(
      new Response(
        JSON.stringify({
          id: "file",
          name: "reminders/daily.md",
          type: "text/markdown",
          size: 12,
          author: "me@test",
          ts: 1,
          reminder: { ok: true },
        }),
        { status: 200 },
      ),
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    flushSync();
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "new room draft",
    );
  }, 30_000);
  test("native files preserve exact viewer selection, pin ACK errors and disposed callbacks", async () => {
    const room = fixture();
    const file = {
      id: "v1",
      name: "docs/report.md",
      type: "text/markdown",
      author: "me@test",
      ts: 1,
      size: 20,
    };
    room.files = [file];
    room.filesAll = true;
    const opened: string[] = [];
    const session = createFilesSession(room.id);
    let rejectPin = true;
    let fileRequests = 0;
    const { target, update, destroy } = render("files", room, {
      session,
      onopenfile: (file) => opened.push(file.id),
      request: async () => {
        fileRequests++;
        return rejectPin ? { ok: false, error: "offline" } : { ok: true };
      },
    });
    target.querySelector<HTMLElement>('[data-fdir="docs"]')!.click();
    flushSync();
    const oldTile = target.querySelector<HTMLElement>(
      '[data-file-id="v1"] button',
    )!;
    oldTile.click();
    expect(opened).toEqual(["v1"]);
    target
      .querySelector<HTMLElement>('[data-file-id="v1"] button[aria-pressed]')!
      .click();
    await tick();
    flushSync();
    expect(target.querySelector('[role="alert"]')?.textContent).toContain(
      "offline",
    );
    expect(target.textContent).toContain("docs/");
    rejectPin = false;
    target
      .querySelector<HTMLElement>('[data-file-id="v1"] button[aria-pressed]')!
      .click();
    await tick();
    flushSync();
    expect(
      target.querySelector('[data-file-id] button[aria-pressed="true"]'),
    ).toBeNull();
    // Finish the first mutation while its control is still mounted and enabled.
    const pins = [{ id: "p", kind: "file" as const, ref: "v1" }];
    update({ ...room, pins });
    const oldPin = target.querySelector<HTMLButtonElement>(
      '[data-file-id="v1"] button[aria-pressed]',
    )!;
    expect(oldPin.disabled).toBe(false);
    const latest = { ...file, id: "v2", ts: 2 };
    update({
      ...room,
      files: [latest, file],
      pins,
    });
    expect(target.querySelector('[data-file-id="v2"]')).not.toBeNull();
    expect(oldTile.isConnected).toBe(false);
    expect(oldPin.isConnected).toBe(false);
    const beforeStaleRequests = fileRequests;
    oldTile.click();
    oldPin.click();
    await tick();
    flushSync();
    expect(opened).toEqual(["v1"]);
    expect(fileRequests).toBe(beforeStaleRequests);
    const latestTile = target.querySelector<HTMLElement>(
      '[data-file-id="v2"] button',
    )!;
    latestTile.click();
    expect(opened.at(-1)).toBe("v2");
    const beforeDestroy = [...opened];
    destroy();
    latestTile.click();
    expect(opened).toEqual(beforeDestroy);
  });
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
    name: vb.name,
    ago: vb.ago,
    hhmm: () => "09:00",
    waiting: () => false,
    ...overrides,
  });
  function renderChat(room: Room, extra: Partial<ChatProps> = {}) {
    const target = window.document.createElement("div");
    window.document.body.append(target);
    const props: ChatProps = {
      room,
      thread: "e",
      list: room.messages,
      more: false,
      replyCount: 0,
      vb: bridge(),
      actions: {
        request: async (): Promise<CommandOutcome> => ({ ok: true }),
        draftReply: () => {},
        reply: () => {},
        navigate: () => {},
        openFile: () => {},
      },
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
  test("native rich content preserves safe semantics and exact direct actions without HTML hooks", () => {
    const file = {
      id: "aa11",
      name: "report.html",
      type: "text/html",
      author: "you@test",
      size: 10,
      ts: 1,
    };
    const room = {
      ...fixture(),
      id: "abc123",
      files: [file],
      messages: [
        message(
          1,
          '<details open><summary>More</summary>\n\n**Body** @AI :fire: [message](#m12) [thread](#eabc) [file](/api/books/abc123/files/aa11) [external](https://example.test)\n\n</details>\n\n<div id="m99" class="vcard" data-cardbtn="evil" onclick="evil()"><b>safe</b></div><script>evil()</script>',
        ),
      ],
    };
    const navigated: number[] = [],
      threads: string[] = [],
      files: string[] = [];
    const { target } = renderChat(room, {
      vb: bridge({ pageUrl: "https://example.test/b/abc123" }),
      actions: {
        request: async (): Promise<CommandOutcome> => ({ ok: true }),
        draftReply: () => {},
        reply: () => {},
        navigate: (id) => navigated.push(id),
        openFile: (attachment) => files.push(attachment.id),
        navigateRich: (target) => threads.push(target.id || ""),
      },
    });
    const body = target.querySelector("#m1 [data-rich-content]")!;
    expect(body.querySelector("details[open] summary")?.textContent).toBe(
      "More",
    );
    expect(body.querySelector("strong")?.textContent).toBe("Body");
    expect(body.querySelector('[data-rich-mention="ai"]')?.textContent).toBe(
      "@AI",
    );
    expect(body.textContent).toContain("🔥");
    expect(
      body.querySelector("script,[onclick],[data-cardbtn],.vcard,#m99") ===
        null,
    ).toBe(true);
    body
      .querySelector<HTMLAnchorElement>('[data-rich-link="message"]')!
      .click();
    body.querySelector<HTMLAnchorElement>('[data-rich-link="thread"]')!.click();
    body.querySelector<HTMLAnchorElement>('[data-rich-link="file"]')!.click();
    expect(navigated).toEqual([12]);
    expect(threads).toEqual(["abc"]);
    expect(files).toEqual(["aa11"]);
    const external = body.querySelector<HTMLAnchorElement>(
      'a[href="https://example.test"]',
    )!;
    expect(external.target).toBe("_blank");
    expect(external.rel).toContain("noopener");
    expect(body.querySelector("[data-legacy-chat-content]") === null).toBe(
      true,
    );
  }, 30_000);
  test("native card catalog keeps plain text, table expansion, owner-only replies and canonical answer state", async () => {
    const input = JSON.parse(
      readFileSync(
        new URL("./fixtures/card-wire.json", import.meta.url),
        "utf8",
      ),
    ).input;
    const q = {
      ...message(31, "Surrounding **message**"),
      author: fixture().me,
      card: JSON.stringify(input),
    };
    let room: Room = { ...fixture(), id: "abc123", messages: [q] };
    const sent: RoomCommand[] = [];
    let resolve!: (result: CommandOutcome) => void;
    const { target, update } = renderChat(room, {
      actions: {
        request: (command) => {
          sent.push(command);
          return new Promise((done) => (resolve = done));
        },
        draftReply: () => {},
        reply: () => {},
        navigate: () => {},
        openFile: () => {},
      },
    });
    const card = target.querySelector("[data-native-card]")!;
    expect(card.textContent).toContain("historical alias");
    expect(card.querySelector("td")?.textContent).toBe("1");
    expect(card.querySelector("polyline") !== null).toBe(true);
    expect(card.querySelector("img")?.getAttribute("src")).toBe(
      "/api/books/abc123/files/aa11",
    );
    const tableTrigger = Array.from(card.querySelectorAll("button")).find(
      (button) => button.textContent?.includes("Abrir em tela cheia"),
    )!;
    tableTrigger.click();
    flushSync();
    await tick();
    expect(document.querySelector('[role="dialog"] table') !== null).toBe(true);
    document
      .querySelector<HTMLButtonElement>(
        '[role="dialog"] button[aria-label="Fechar"]',
      )!
      .click();
    flushSync();
    await tick();
    const button = card.querySelector<HTMLButtonElement>(
      '[data-native-card-answer="3"]',
    )!;
    button.click();
    button.click();
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({
      t: "msg",
      thread: "e",
      reply_to: 31,
      text: "3",
    });
    resolve({ ok: true });
    await tick();
    flushSync();
    expect(
      target
        .querySelector('[data-native-card-answer="3"]')
        ?.hasAttribute("disabled"),
    ).toBe(true);
    room = {
      ...room,
      messages: [
        q,
        { ...message(32, "3"), author: room.me, kind: null, reply_to: 31 },
      ],
    };
    update(room);
    expect(target.querySelector('[data-native-card-answer="3"]') === null).toBe(
      true,
    );
    expect(target.querySelector('[data-native-card-picked="3"]') !== null).toBe(
      true,
    );
    update({ ...room, messages: [{ ...q, card: "{invalid" }] });
    expect(target.querySelector("[data-native-card]") === null).toBe(true);
    expect(target.querySelector("[data-rich-content]")?.textContent).toBe(
      "Surrounding message",
    );
  }, 30_000);
  test("native choices populate editable composer drafts with Other and never submit", () => {
    const q = {
      ...message(41, "Question"),
      author: fixture().me,
      choices: JSON.stringify({ options: ["First", "Second"], multi: false }),
    };
    const room = { ...fixture(), messages: [q] };
    const drafts: { messageId: number; thread: string; text: string }[] = [],
      commands: RoomCommand[] = [];
    const { target, update } = renderChat(room, {
      actions: {
        request: async (command) => {
          commands.push(command);
          return { ok: true };
        },
        draftReply: (draft) => drafts.push(draft),
        reply: () => {},
        navigate: () => {},
        openFile: () => {},
      },
    });
    let radios = target.querySelectorAll<HTMLInputElement>(
      '[data-native-choices] input[type="radio"]',
    );
    radios[0].checked = true;
    radios[0].dispatchEvent(new Event("change", { bubbles: true }));
    expect(drafts.at(-1)).toEqual({
      messageId: 41,
      thread: "e",
      text: "First",
    });
    radios[2].checked = true;
    radios[2].dispatchEvent(new Event("change", { bubbles: true }));
    expect(drafts.at(-1)?.text).toBe("");
    expect(commands).toHaveLength(0);
    const detached = radios[0];
    update({
      ...room,
      messages: [
        {
          ...q,
          choices: JSON.stringify({
            options: ["First", "Second"],
            closed: "terminal",
          }),
        },
      ],
    });
    detached.dispatchEvent(new Event("change", { bubbles: true }));
    expect(drafts).toHaveLength(2);
    expect(target.querySelector("[data-native-choices] input") === null).toBe(
      true,
    );
    expect(target.textContent).toContain("foi pro terminal");
    update({ ...room, me: "you@test", messages: [q] });
    expect(target.querySelector("[data-native-choices] input") === null).toBe(
      true,
    );
  }, 30_000);
  test("native multi choices keep option order and Other clears draft without submitting", () => {
    const q = {
        ...message(42, "Question"),
        author: fixture().me,
        choices: JSON.stringify({ options: ["First", "Second"], multi: true }),
      },
      drafts: string[] = [];
    const { target } = renderChat(
      { ...fixture(), messages: [q] },
      {
        actions: {
          request: async () => ({ ok: true }),
          draftReply: (draft) => drafts.push(draft.text),
          reply: () => {},
          navigate: () => {},
          openFile: () => {},
        },
      },
    );
    const checks = target.querySelectorAll<HTMLInputElement>(
      '[data-native-choices] input[type="checkbox"]',
    );
    for (const index of [1, 0, 2]) {
      checks[index].checked = true;
      checks[index].dispatchEvent(new Event("change", { bubbles: true }));
      flushSync();
    }
    expect(drafts).toEqual(["Second", "First · Second", ""]);
  }, 30_000);
  test("native permission confirmation cancels safely and canonical target removal suppresses late errors", async () => {
    const q = {
      ...message(51, "⏸ Seu Claude pede permissão"),
      author: fixture().me,
      choices: '{"options":["Aprovar","Negar"],"multi":false}',
    };
    const room = { ...fixture(), messages: [q] };
    const sent: RoomCommand[] = [];
    let resolve!: (result: CommandOutcome) => void;
    const { target, update } = renderChat(room, {
      actions: {
        request: (command) => {
          sent.push(command);
          return new Promise((done) => (resolve = done));
        },
        draftReply: () => {},
        reply: () => {},
        navigate: () => {},
        openFile: () => {},
      },
    });
    target
      .querySelector<HTMLButtonElement>(
        '[data-native-permission-value="Aprovar"]',
      )!
      .click();
    flushSync();
    await tick();
    expect(sent).toHaveLength(0);
    Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        '[role="alertdialog"] button',
      ),
    )
      .find((button) => button.textContent === "Cancelar")!
      .click();
    flushSync();
    await tick();
    await expectAlertDialogClosed();
    expect(sent).toHaveLength(0);
    target
      .querySelector<HTMLButtonElement>(
        '[data-native-permission-value="Negar"]',
      )!
      .click();
    flushSync();
    await tick();
    Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        '[role="alertdialog"] button',
      ),
    )
      .find((button) => button.textContent === "Confirmar")!
      .click();
    expect(sent[0]).toMatchObject({ t: "msg", text: "Negar", reply_to: 51 });
    update({ ...room, messages: [] });
    resolve({ ok: false, error: "late permission failure" });
    await tick();
    flushSync();
    await expectAlertDialogClosed();
    expect(target.textContent).not.toContain("late permission failure");
  }, 30_000);
  test("native poll votes retain canonical pressed state, report failure and gate closure by author", async () => {
    const q = { ...message(61, ""), poll: "p" };
    const poll = {
      id: "p",
      question: "Vote",
      options: ["First", "Second"],
      author: fixture().me,
      multi: true,
      closed: false,
      votes: [[], []],
    };
    const room = { ...fixture(), messages: [q], polls: { p: poll } };
    const sent: RoomCommand[] = [];
    let resolve!: (result: CommandOutcome) => void;
    const { target, update } = renderChat(room, {
      actions: {
        request: (command) => {
          sent.push(command);
          return new Promise((done) => (resolve = done));
        },
        draftReply: () => {},
        reply: () => {},
        navigate: () => {},
        openFile: () => {},
      },
    });
    const stale = target.querySelector<HTMLButtonElement>(
      '[data-native-vote="0"]',
    )!;
    stale.click();
    expect(sent[0]).toEqual({ t: "vote", id: "p", opt: 0 });
    expect(stale.getAttribute("aria-pressed")).toBe("false");
    resolve({ ok: false, error: "server refused" });
    await tick();
    flushSync();
    expect(target.textContent).toContain("server refused");
    update({ ...room, polls: { p: { ...poll, votes: [[room.me], []] } } });
    expect(
      target
        .querySelector('[data-native-vote="0"]')
        ?.getAttribute("aria-pressed"),
    ).toBe("true");
    expect(target.querySelector("[data-native-poll-close]") !== null).toBe(
      true,
    );
    update({ ...room, me: "you@test" });
    expect(target.querySelector("[data-native-poll-close]") === null).toBe(
      true,
    );
    const before = sent.length;
    stale.click();
    expect(sent).toHaveLength(before);
  }, 30_000);
  test("same-ID permission replacement invalidates old confirmation before any request", async () => {
    const q = {
      ...message(71, "⏸ Seu Claude pede permissão: old"),
      author: fixture().me,
      choices: '{"options":["Aprovar","Negar"],"multi":false}',
    };
    const room = { ...fixture(), messages: [q] },
      sent: RoomCommand[] = [];
    const { target, update } = renderChat(room, {
      actions: {
        request: async (command) => {
          sent.push(command);
          return { ok: true };
        },
        draftReply: () => {},
        reply: () => {},
        navigate: () => {},
        openFile: () => {},
      },
    });
    target
      .querySelector<HTMLButtonElement>(
        '[data-native-permission-value="Aprovar"]',
      )!
      .click();
    flushSync();
    await tick();
    const stale = Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        '[role="alertdialog"] button',
      ),
    ).find((button) => button.textContent === "Confirmar")!;
    update({
      ...room,
      messages: [{ ...q, text: "⏸ Seu Claude pede permissão: replacement" }],
    });
    stale.click();
    flushSync();
    await tick();
    await expectAlertDialogClosed();
    expect(sent).toHaveLength(0);
  }, 30_000);
  test("dense supported card tables stay accessible through lazy full-data dialogs", async () => {
    const elements: Record<string, unknown> = {
      c: { type: "Card", children: ["a", "b", "c2"] },
    };
    for (const id of ["a", "b", "c2"])
      elements[id] = {
        type: "Table",
        props: {
          headers: [id],
          rows: Array.from({ length: 50 }, (_, row) =>
            Array.from({ length: 10 }, (_, col) => `${id}-${row}-${col}`),
          ),
        },
      };
    const { target } = renderChat({
      ...fixture(),
      messages: [
        {
          ...message(72, "Tables"),
          card: JSON.stringify({ root: "c", elements }),
        },
      ],
    });
    expect(target.querySelectorAll("[data-native-card-table]")).toHaveLength(3);
    expect(
      target.querySelectorAll("[data-native-card-table] td").length,
    ).toBeLessThanOrEqual(1000);
    const tables = target.querySelectorAll("[data-native-card-table]");
    tables[2].querySelector<HTMLButtonElement>("button")!.click();
    flushSync();
    await tick();
    expect(document.querySelector('[role="dialog"]')?.textContent).toContain(
      "c2-49-9",
    );
  }, 30_000);
  test("lost poll ACK disables repeat toggles until late canonical vote reconciles", async () => {
    const q = { ...message(81, ""), poll: "p" },
      poll = {
        id: "p",
        question: "Vote",
        options: ["First", "Second"],
        author: fixture().me,
        multi: false,
        closed: false,
        votes: [[], []],
      },
      room = { ...fixture(), messages: [q], polls: { p: poll } },
      sent: RoomCommand[] = [];
    let resolve!: (result: CommandOutcome) => void;
    const { target, update } = renderChat(room, {
      actions: {
        request: (command) => {
          sent.push(command);
          return new Promise((done) => (resolve = done));
        },
        draftReply: () => {},
        reply: () => {},
        navigate: () => {},
        openFile: () => {},
      },
    });
    const vote = target.querySelector<HTMLButtonElement>(
      '[data-native-vote="0"]',
    )!;
    vote.click();
    resolve({ ok: false, error: "disconnected" });
    await tick();
    flushSync();
    expect(target.textContent).toContain("Ainda sem confirmação");
    expect(vote.disabled).toBe(true);
    vote.click();
    expect(sent).toHaveLength(1);
    update({ ...room, polls: { p: { ...poll, votes: [[room.me], []] } } });
    const current = target.querySelector<HTMLButtonElement>(
      '[data-native-vote="0"]',
    )!;
    expect(current.disabled).toBe(false);
    expect(current.getAttribute("aria-pressed")).toBe("true");
    expect(sent).toHaveLength(1);
  }, 30_000);
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
    expect(row.querySelector("[data-message-typing]")?.textContent).toBe(
      "<img src=x onerror=alert(1)> Working…",
    );
    expect(row.querySelector("img")).toBeNull();
    for (const text of ["H", "Hello", "Hello **world**", "Final response"]) {
      room = { ...room, messages: [message(1, text)], typing: {} };
      update(room);
      expect(target.querySelector("#m1")).toBe(row);
      expect(row.querySelector("[data-rich-content]")?.textContent).toBe(
        text.replace(/\*\*/g, ""),
      );
      expect(row.querySelector("[data-message-typing]")).toBeNull();
    }
    update({ ...room, messages: [...room.messages, message(2, "next reply")] });
    expect(target.querySelectorAll("[data-chat-message]")).toHaveLength(2);
    expect(target.querySelectorAll('[data-native-reply="1"]')).toHaveLength(1);
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
    expect(target.querySelector("[data-chat-origin] #m7")).toBeNull();
    expect(
      target.querySelector('[data-chat-origin] [data-native-origin="7"]'),
    ).not.toBeNull();
    expect(
      target
        .querySelector("#m8 [data-native-quote]")
        ?.getAttribute("data-native-quote"),
    ).toBe("7");
    expect(
      target.querySelector("#m9 details > [data-rich-content]")?.textContent,
    ).toBe("Archived safely");
    expect(
      target.querySelector('#m8 [data-native-copylink="8"]'),
    ).not.toBeNull();
    target.querySelector<HTMLElement>("#olderBtn")!.click();
    expect(pages).toBe(1);
    update({
      ...room,
      messages: [{ ...reply, text: "Updated response" }, notice],
    });
    expect(target.querySelector("#m8 [data-rich-content]")?.textContent).toBe(
      "Updated response",
    );
    expect(target.querySelectorAll("[data-chat-origin]")).toHaveLength(1);
    expect(target.querySelectorAll("#m9")).toHaveLength(1);
  }, 30_000);
  test("special reminder origins omit self-linking cards without removing native DOM", () => {
    const origin = { ...message(7, "Reminder origin"), tag: "reminder" };
    const normal = { ...message(8, "Reminder reply"), tag: "reminder" };
    const room = {
      ...fixture(),
      messages: [normal],
      epics: [
        { id: "origin-card", title: "Origin thread", tasks: [], from_msg: 7 },
        { id: "normal-card", title: "Reply thread", tasks: [], from_msg: 8 },
      ],
    };
    const { target, update } = renderChat(room, { origin });
    expect(
      target.querySelector("[data-chat-origin] [data-thread-card]"),
    ).toBeNull();
    expect(target.querySelector("[data-chat-origin] #m7")).toBeNull();
    expect(target.querySelectorAll("#m8 [data-thread-card]")).toHaveLength(1);
    update({ ...room, messages: [{ ...normal, text: "Updated reminder" }] });
    expect(
      target.querySelector("[data-chat-origin] [data-thread-card]"),
    ).toBeNull();
    expect(target.querySelectorAll("#m8 [data-thread-card]")).toHaveLength(1);
  }, 30_000);
  test("native thread cards use canonical descendants and exact metadata-only file callbacks", async () => {
    const source = message(71, "Request"),
      room: Room = {
        ...fixture(),
        messages: [source],
        epics: [
          {
            id: "child",
            title: "<b>Thread</b>",
            tasks: [],
            from_msg: 71,
            files: [
              { id: "aa11", name: "report.pdf", type: "application/pdf", n: 4 },
            ],
          },
        ],
      };
    const targets: import("../svelte/features/rich-text/types").RichNavigation[] =
        [],
      files: import("../svelte/features/rich-text/types").RichFileReference[] =
        [];
    const { target, update } = renderChat(room, {
      actions: {
        request: async () => ({ ok: true }),
        draftReply: () => {},
        reply: () => {},
        navigate: () => {},
        openFile: () => {},
        navigateRich: (value) => targets.push(value),
        openFileReference: (value) => files.push(value),
      },
    });
    const card = target.querySelector<HTMLButtonElement>(
      '[data-thread-card="child"]',
    )!;
    expect(card.textContent).toContain("<b>Thread</b>");
    expect(card.querySelector("b")).toBeNull();
    card.click();
    expect(targets).toEqual([{ kind: "thread", id: "child" }]);
    const file = target.querySelector<HTMLAnchorElement>('a[href*="aa11"]')!;
    expect(file.textContent).toContain("v4");
    file.click();
    expect(files).toEqual([
      { roomId: room.id, id: "aa11", name: "report.pdf" },
    ]);
    update({ ...room, epics: [] });
    card.click();
    file.click();
    await tick();
    expect(targets).toHaveLength(1);
    expect(files).toHaveLength(1);
    expect(target.querySelector("[data-legacy-chat-content]") === null).toBe(
      true,
    );
  }, 30_000);
  test("native chat controls call typed actions and preserve exact attachment versions and sandbox restrictions", async () => {
    const file = (id: string, type: string, embed = false) => ({
      id,
      name: "report.html",
      type,
      embed,
      author: "you@test",
      ts: 1,
      size: 10,
    });
    const files = [
      file("old-version", "text/html"),
      file("image", "image/png"),
      file("audio", "audio/mpeg"),
      file("embedded", "text/html", true),
    ];
    const origin = { ...message(7, "Original <request>"), thread: "main" };
    const row = { ...message(8, "Body"), reply_to: 7, files };
    const room = { ...fixture(), messages: [row], origins: [origin] };
    const replied: number[] = [],
      navigated: { id: number; thread?: string }[] = [],
      opened: string[] = [],
      copied: string[] = [];
    window.navigator.clipboard.writeText = async (text) => {
      copied.push(text);
    };
    const { target } = renderChat(room, {
      origin,
      actions: {
        request: async (): Promise<CommandOutcome> => ({ ok: true }),
        draftReply: () => {},
        reply: (id) => replied.push(id),
        navigate: (id, thread) => navigated.push({ id, thread }),
        openFile: (selected) => opened.push(selected.id),
      },
    });
    target.querySelector<HTMLButtonElement>("#m8 [data-native-reply]")!.click();
    target.querySelector<HTMLButtonElement>("#m8 [data-native-quote]")!.click();
    target.querySelector<HTMLButtonElement>("[data-native-origin]")!.click();
    expect(replied).toEqual([8]);
    expect(navigated).toEqual([
      { id: 7, thread: "main" },
      { id: 7, thread: "main" },
    ]);
    target.querySelector<HTMLButtonElement>("#m8 [data-native-copy]")!.click();
    await tick();
    flushSync();
    expect(copied).toContain("Body");
    target
      .querySelector<HTMLButtonElement>("#m8 [data-native-copylink]")!
      .click();
    await tick();
    flushSync();
    expect(copied.at(-1)).toContain("/b/r?t=e#m8");
    const attachments = target.querySelector<HTMLElement>(
      "#m8 [data-message-attachments]",
    )!;
    attachments
      .querySelector<HTMLAnchorElement>('a[href$="old-version"]')!
      .click();
    expect(opened).toEqual(["old-version"]);
    expect(attachments.querySelector("audio")?.getAttribute("src")).toContain(
      "/audio",
    );
    expect(attachments.querySelector("img")?.getAttribute("src")).toContain(
      "/image",
    );
    const iframe = attachments.querySelector("iframe")!;
    expect(iframe.getAttribute("src")).toContain("/embedded");
    expect(iframe.getAttribute("sandbox")).toBe("allow-scripts");
    expect(iframe.hasAttribute("srcdoc")).toBe(false);
  }, 30_000);
  test("image attachment previews preserve exact file actions and detached removed images stay inert", () => {
    const first = {
      id: "aa11",
      name: "tall.png",
      type: "image/png",
      author: "you@test",
      size: 10,
      ts: 1,
    };
    const second = { ...first, id: "bb22", name: "normal.png" };
    const row = { ...message(8, "Images"), files: [first, second] };
    const room = { ...fixture(), files: [first, second], messages: [row] };
    const opened: import("../shared/room").Attachment[] = [];
    const { target, update } = renderChat(room, {
      actions: {
        request: async () => ({ ok: true }),
        draftReply: () => {},
        reply: () => {},
        navigate: () => {},
        openFile: (file) => opened.push(file),
      },
    });
    const old = target.querySelector<HTMLAnchorElement>(
      '[data-message-image][href$="aa11"]',
    )!;
    old.click();
    expect(opened).toEqual([first]);
    update({ ...room, messages: [{ ...row, files: [second] }] });
    expect(old.isConnected).toBe(false);
    old.click();
    expect(opened).toEqual([first]);
    target
      .querySelector<HTMLAnchorElement>('[data-message-image][href$="bb22"]')!
      .click();
    expect(opened).toEqual([first, second]);
  });
  test("compact native receipts show five faces, overflow and read/delivery details on focus and tap", async () => {
    const room: Room = {
      ...fixture(),
      messages: [message(1, "Receipt target")],
    };
    room.receipts = Array.from({ length: 7 }, (_, i) => ({
      email: `reader${i}@test.com`,
      who: i % 2 ? "Codex" : "Claude",
      read: i < 6 ? 1 : 0,
      delivered: 1,
    }));
    room.acks = [
      {
        msg_id: 1,
        email: "blocked@test.com",
        who: "Codex",
        status: "blocked",
        ts: 1,
        note: "<script>unsafe()</script>",
      },
    ];
    const { target, update } = renderChat(room);
    const footer = target.querySelector<HTMLElement>(
      "#m1 [data-message-footer]",
    )!;
    expect(footer.querySelectorAll("[data-reader-read]")).toHaveLength(5);
    expect(footer.textContent).toContain("+2");
    expect(footer.querySelector("script") === null).toBe(true);
    expect(footer.textContent).toContain("<script>unsafe()</script>");
    const seen = footer.querySelector<HTMLButtonElement>(
      "button[aria-expanded]",
    )!;
    expect(seen.getAttribute("aria-label")).toBe("visto por 6 de 7");
    seen.focus();
    await tick();
    flushSync();
    expect(footer.querySelector('[role="tooltip"]')?.textContent).toContain(
      "reader6@test.com",
    );
    expect(footer.querySelector('[role="tooltip"]')?.textContent).toContain(
      "recebeu",
    );
    seen.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    flushSync();
    expect(footer.querySelector('[role="tooltip"]') === null).toBe(true);
    seen.click();
    flushSync();
    expect(seen.getAttribute("aria-expanded")).toBe("true");
    seen.click();
    flushSync();
    expect(seen.getAttribute("aria-expanded")).toBe("false");
    const anchor = target.querySelector("#m1");
    update({ ...room, receipts: [{ ...room.receipts[6], read: 1 }], acks: [] });
    expect(target.querySelector("#m1") === anchor).toBe(true);
    expect(
      target
        .querySelector("#m1 [data-message-footer] button")
        ?.getAttribute("aria-label"),
    ).toBe("visto por 1");
    expect(target.querySelectorAll("[data-message-footer]")).toHaveLength(1);
  }, 30_000);
  test("native quiet rows retain folding, status ownership and canonical native thread cards", () => {
    const reminder = {
      ...message(1, "⏰ **daily** report\n\nDetails"),
      tag: "reminder",
    };
    const latest = { ...reminder, id: 2, ts: 2000 };
    const interactive = {
      ...message(3, "@person **rich**"),
      card: JSON.stringify({
        root: "c",
        elements: {
          c: { type: "Card", children: ["a"] },
          a: { type: "Actions", children: ["b"] },
          b: { type: "Button", props: { label: "Pick" } },
        },
      }),
      choices: JSON.stringify({ options: ["A", "B"], multi: false }),
      poll: "p",
    };
    const room = {
      ...fixture(),
      messages: [reminder, latest, interactive],
      polls: {
        p: {
          id: "p",
          author: "ai",
          question: "Poll",
          options: ["A", "B"],
          multi: false,
          closed: false,
          votes: [[], []],
        },
      },
      acks: [
        {
          msg_id: 2,
          email: "agent@test",
          who: "Codex",
          status: "done",
          ts: 2000,
        },
      ],
    };
    room.epics = [
      { id: "card-one", title: "One", tasks: [], from_msg: 1 },
      { id: "card-two", title: "Two", tasks: [], from_msg: 2 },
    ];
    const { target } = renderChat(room);
    expect(target.querySelector("#m1") === null).toBe(true);
    expect(target.querySelector("#m2 details")?.textContent).toContain(
      "rodou 2×",
    );
    expect(
      target.querySelector("#m2 [data-message-footer]")?.textContent,
    ).toContain("fez isso");
    expect(target.querySelector("#m3 [data-rich-content]")?.textContent).toBe(
      "@person rich",
    );
    expect(target.querySelector("#m3 [data-native-card]") !== null).toBe(true);
    expect(target.querySelector("#m3 [data-native-choices]") !== null).toBe(
      true,
    );
    expect(target.querySelector("#m3 [data-native-vote]") !== null).toBe(true);
    expect(target.querySelectorAll("#m2 [data-thread-card]")).toHaveLength(2);
  });
  test("room replacement disposes native action feedback and detached message handlers", async () => {
    let resolveCopy!: () => void;
    window.navigator.clipboard.writeText = () =>
      new Promise<void>((resolve) => {
        resolveCopy = resolve;
      });
    const room = {
      ...fixture(),
      messages: [message(1, "Old room [jump](#m7)")],
    };
    const replied: number[] = [];
    const navigated: number[] = [];
    const { target, update } = renderChat(room, {
      actions: {
        request: async (): Promise<CommandOutcome> => ({ ok: true }),
        draftReply: () => {},
        reply: (id) => replied.push(id),
        navigate: (id) => navigated.push(id),
        openFile: () => {},
      },
    });
    const staleReply = target.querySelector<HTMLButtonElement>(
      "[data-native-reply]",
    )!;
    const staleRich = target.querySelector<HTMLAnchorElement>(
      '[data-rich-link="message"]',
    )!;
    target.querySelector<HTMLButtonElement>("[data-native-copy]")!.click();
    update({ ...room, id: "next", messages: [message(2, "Next room")] });
    staleReply.click();
    staleRich.click();
    resolveCopy();
    await tick();
    flushSync();
    expect(replied).toEqual([]);
    expect(navigated).toEqual([]);
    expect(target.textContent).not.toContain("Copiado");
    expect(target.querySelector("#m1") === null).toBe(true);
    expect(target.querySelector("#m2") !== null).toBe(true);
  }, 30_000);
  test("native embeds own consent, bounded media geometry and cleanup while retaining the typed protocol integration", async () => {
    const embedded = {
      id: "embedded",
      name: "app.html",
      type: "text/html",
      embed: true,
      author: "you@test",
      ts: 1,
      size: 10,
    };
    const room = {
      ...fixture(),
      messages: [{ ...message(1, "App"), files: [embedded] }],
    };
    let controls: import("../svelte/chatTypes").ChatEmbedControls | undefined;
    let detached = 0;
    const mounted: string[] = [];
    const { target, update } = renderChat(room, {
      actions: {
        request: async (): Promise<CommandOutcome> => ({ ok: true }),
        draftReply: () => {},
        reply: () => {},
        navigate: () => {},
        openFile: () => {},
        mountEmbed: (frame, file, next) => {
          mounted.push(file.id);
          controls = next;
          expect(frame.getAttribute("sandbox")).toBe("allow-scripts");
          return () => {
            detached++;
          };
        },
      },
    });
    const original = controls!;
    const frame = target.querySelector("iframe")!;
    expect(mounted).toEqual(["embedded"]);
    original.resize(Number.POSITIVE_INFINITY);
    flushSync();
    expect(frame.getAttribute("height")).toBe("320");
    original.resize(1000);
    flushSync();
    expect(Number(frame.getAttribute("height"))).toBeLessThanOrEqual(420);
    expect(frame.hasAttribute("style")).toBe(false);
    const consent = original.ask(
      "post a message",
      "<script>hostile detail</script>",
    );
    flushSync();
    expect(target.querySelector("script") === null).toBe(true);
    expect(target.querySelector("q")?.textContent).toBe(
      "<script>hostile detail</script>",
    );
    const cancel = Array.from(
      target.querySelectorAll<HTMLButtonElement>('[role="group"] button'),
    ).find((button) => button.textContent?.includes("Cancelar"))!;
    cancel.click();
    await expect(consent).resolves.toBe(false);
    const firstQuestion = original.ask("A", "visible A"),
      secondQuestion = original.ask("B", "unseen B");
    flushSync();
    const oldAllow = Array.from(
      target.querySelectorAll<HTMLButtonElement>('[role="group"] button'),
    ).find((button) => button.textContent?.includes("Permitir"))!;
    oldAllow.click();
    oldAllow.click();
    await expect(firstQuestion).resolves.toBe(true);
    for (
      let frame = 0;
      frame < 10 && target.querySelector("q")?.textContent !== "unseen B";
      frame++
    ) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      flushSync();
      await tick();
    }
    expect(target.querySelector("q")?.textContent).toBe("unseen B");
    oldAllow.click();
    flushSync();
    expect(target.querySelector("q")?.textContent).toBe("unseen B");
    const nextCancel = Array.from(
      target.querySelectorAll<HTMLButtonElement>('[role="group"] button'),
    ).find((button) => button.textContent?.includes("Cancelar"))!;
    nextCancel.click();
    await expect(secondQuestion).resolves.toBe(false);
    const lateConsent = original.ask("write after switch", "old room");
    flushSync();
    update({ ...room, id: "next" });
    await expect(lateConsent).resolves.toBe(false);
    expect(detached).toBe(1);
    expect(target.textContent).not.toContain("old room");
    const current = target.querySelector("iframe")!;
    const before = current.getAttribute("height");
    original.resize(40);
    flushSync();
    expect(current.getAttribute("height")).toBe(before);
  }, 30_000);
  test("origin embeds retain their source thread in the explicit protocol integration", () => {
    const embedded = {
      id: "origin-file",
      name: "origin.html",
      type: "text/html",
      embed: true,
      author: "you@test",
      ts: 1,
      size: 10,
    };
    const threads: string[] = [];
    renderChat(
      { ...fixture(), messages: [message(8, "Epic reply")] },
      {
        origin: { ...message(7, "Origin"), thread: "main", files: [embedded] },
        actions: {
          request: async (): Promise<CommandOutcome> => ({ ok: true }),
          draftReply: () => {},
          reply: () => {},
          navigate: () => {},
          openFile: () => {},
          mountEmbed: (_frame, _file, controls) => {
            threads.push(controls.thread);
            return () => {};
          },
        },
      },
    );
    expect(threads).toEqual(["main"]);
  });
  test("multitouch cancels a locked native swipe before it can reply or copy", () => {
    const replied: number[] = [];
    const { target } = renderChat(
      { ...fixture(), messages: [message(1, "Swipe target")] },
      {
        actions: {
          request: async (): Promise<CommandOutcome> => ({ ok: true }),
          draftReply: () => {},
          reply: (id) => replied.push(id),
          navigate: () => {},
          openFile: () => {},
        },
      },
    );
    const row = target.querySelector<HTMLElement>("#m1")!;
    const touch = (
      type: string,
      points: { clientX: number; clientY: number }[],
    ) => {
      const event = new window.Event(type, { bubbles: true, cancelable: true });
      Object.defineProperty(event, "touches", { value: points });
      row.dispatchEvent(event);
    };
    touch("touchstart", [{ clientX: 0, clientY: 0 }]);
    touch("touchmove", [{ clientX: 75, clientY: 1 }]);
    expect(row.getAttribute("data-swipe")).toBe("reply");
    touch("touchstart", [
      { clientX: 75, clientY: 1 },
      { clientX: 90, clientY: 5 },
    ]);
    touch("touchend", []);
    expect(replied).toEqual([]);
    expect(row.hasAttribute("data-swipe")).toBe(false);
    touch("touchstart", [{ clientX: 0, clientY: 0 }]);
    touch("touchmove", [{ clientX: 75, clientY: 1 }]);
    touch("touchmove", [
      { clientX: 75, clientY: 1 },
      { clientX: 90, clientY: 5 },
    ]);
    touch("touchend", []);
    expect(replied).toEqual([]);
    touch("touchstart", [{ clientX: 0, clientY: 0 }]);
    touch("touchmove", [{ clientX: 75, clientY: 1 }]);
    touch("touchend", []);
    expect(replied).toEqual([1]);
  });
});

test("native document task slots dispose across suggestion scope and detached controls cannot write", async () => {
  const room = fixture();
  room.doc = "# Room document";
  room.docs = { e: "# Epic document\n\n## Tarefas\n" };
  const events: RoomCommand[] = [];
  const owner = createDocumentSession({
    drafts: createDocumentDrafts(),
    request: async () => ({ ok: true }),
    name: () => "Member",
    color: () => "#123456",
  });
  owner.sync(room, "e", true, true, 1);
  const props: DocumentProps = {
    room,
    thread: "e",
    lang: "en",
    pane: "doc",
    send: (command) => {
      events.push(command);
      return true;
    },
    taskProps: {
      room,
      thread: "e",
      vb,
      send: (command) => {
        events.push(command);
        return true;
      },
      request: async (command) => {
        events.push(command);
        return { ok: true };
      },
    },
    actions: { navigate: () => {}, openFile: () => {} },
    onPane: () => {},
    onAuthorize: () => {},
  };
  const target = document.createElement("div");
  document.body.append(target);
  const view = mountView("document", target, { owner, props });
  active.push(view);
  try {
    const original = target.querySelector<HTMLInputElement>(
      '[data-document-tasks] input[type="checkbox"]',
    );
    expect(original instanceof HTMLInputElement).toBe(true);
    owner.sync(room, "pre:0", true, true, 1);
    view.update({ owner, props: { ...props, thread: "pre:0" } });
    await tick();
    flushSync();
    expect(target.querySelectorAll("[data-document-tasks]").length).toBe(0);
    original!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await tick();
    expect(events).toEqual([]);
    owner.sync(room, "e", true, true, 1);
    view.update({ owner, props });
    await tick();
    flushSync();
    const current = target.querySelector<HTMLInputElement>(
      '[data-document-tasks] input[type="checkbox"]',
    );
    expect(current instanceof HTMLInputElement).toBe(true);
    expect(current === original).toBe(false);
    current!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await tick();
    expect(events).toEqual([
      { t: "task.toggle", id: "t" } satisfies RoomCommand,
    ]);
  } finally {
    owner.dispose();
  }
});

describe("stable native sidebar integration", () => {
  function deferredOutcome() {
    let resolve!: (outcome: CommandOutcome) => void;
    let reject!: (error: unknown) => void;
    const promise = new Promise<CommandOutcome>((done, fail) => {
      resolve = done;
      reject = fail;
    });
    return { promise, resolve, reject };
  }
  function sidebar(room: Room, extra: Partial<SidebarProps> = {}) {
    const target = window.document.createElement("div");
    window.document.body.append(target);
    const events: RoomCommand[] = [];
    const outcomes: ReturnType<typeof deferredOutcome>[] = [];
    const opened: string[] = [];
    const props: SidebarProps = {
      room,
      thread: "e",
      navigation: createNavigationSession(room.id),
      pins: syncPinsSession(null, room),
      request: (command) => {
        events.push(command);
        const outcome = deferredOutcome();
        outcomes.push(outcome);
        return outcome.promise;
      },
      onopenpinfile: () => {},
      onopenpinapp: () => {},
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
        epicBusy: () => null,
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
      outcomes,
      async settle(index: number, outcome: CommandOutcome) {
        outcomes[index].resolve(outcome);
        await outcomes[index].promise;
        await tick();
        flushSync();
      },
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
  test("native epic drafts survive refused and uncertain requests; owner controls await ACK plus canonical state", async () => {
    const room = fixture();
    let fail: "offline" | "throw" | null = "offline";
    const commands: RoomCommand[] = [];
    const rendered = sidebar(room, {
      request: async (command) => {
        if (fail === "throw") throw Error("lost ACK");
        if (fail === "offline") return { ok: false, error: "offline" };
        commands.push(command);
        return { ok: true };
      },
    });
    const draft =
      rendered.target.querySelector<HTMLInputElement>("#newEpic input")!;
    draft.value = "Retain title";
    draft.dispatchEvent(new Event("input", { bubbles: true }));
    flushSync();
    const form = rendered.target.querySelector<HTMLFormElement>("#newEpic")!;
    for (const failure of ["offline", "throw"] as const) {
      fail = failure;
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
      await tick();
      await tick();
      flushSync();
      expect(draft.value).toBe("Retain title");
      if (failure === "offline")
        expect(rendered.target.querySelector("[role=alert]") !== null).toBe(
          true,
        );
      else {
        expect(rendered.target.textContent).toContain("Ainda sem confirmação");
        [...rendered.target.querySelectorAll("button")]
          .find((button) => button.textContent?.trim() === "Conferi a sala")!
          .click();
        flushSync();
      }
    }
    fail = null;
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );
    await tick();
    await tick();
    flushSync();
    expect(draft.value).toBe("Retain title");
    expect(commands).toEqual([{ t: "epic", title: "Retain title" }]);
    const created: Room = {
      ...room,
      epics: [
        ...room.epics,
        { id: "created", title: "Retain title", tasks: [] },
      ],
    };
    rendered.view.update({ ...rendered.props, room: created });
    await tick();
    await tick();
    flushSync();
    expect(draft.value).toBe("");
    const owner = rendered.target.querySelector<HTMLSelectElement>(
      "[data-epic=e] select",
    )!;
    owner.value = "you@test";
    change(owner);
    await tick();
    await tick();
    flushSync();
    expect(commands.at(-1)).toEqual({
      t: "epic.owner",
      id: "e",
      owner: "you@test",
    });
    expect(owner.value).toBe("");
    rendered.view.update({
      ...rendered.props,
      room: {
        ...created,
        epics: created.epics.map((epic) =>
          epic.id === "e" ? { ...epic, owner: "you@test" } : epic,
        ),
      },
    });
    await tick();
    flushSync();
    expect(owner.value).toBe("you@test");
    rendered.destroy();
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );
    await tick();
    expect(commands).toHaveLength(2);
  }, 30_000);
  test("native order controls submit a full permutation without optimistic mutation or stale targets", async () => {
    const room = fixture();
    room.epics.push({ id: "other", title: "Other", tasks: [] });
    const rendered = sidebar(room);
    const down = rendered.target.querySelector<HTMLButtonElement>(
      '[aria-label="Mover para baixo: Epic"]',
    )!;
    down.click();
    await tick();
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
    await tick();
    flushSync();
    rendered.view.update({
      ...rendered.props,
      room: { ...room, epics: [room.epics[1], room.epics[0]] },
    });
    await tick();
    await rendered.settle(0, { ok: true });
    await tick();
    flushSync();
    await expectFocusedAfterUpdates(
      rendered.target.querySelector('[data-epic-thread="e"]'),
    );
    expect(
      rendered.target.querySelector("[role=status]")?.textContent,
    ).toContain("Ordem dos épicos atualizada.");
    rendered.view.update(rendered.props);
    down.focus();
    down.click();
    await tick();
    flushSync();
    const draft =
      rendered.target.querySelector<HTMLInputElement>("#newEpic input")!;
    draft.focus();
    rendered.view.update({
      ...rendered.props,
      room: { ...room, epics: [room.epics[1], room.epics[0]] },
    });
    await tick();
    await rendered.settle(1, { ok: true });
    await tick();
    flushSync();
    await expectFocusedAfterUpdates(draft);
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
    await expectFocusedAfterUpdates(draft);
  }, 30_000);
  test("repeated room updates preserve keyed navigation and form drafts", () => {
    let room = fixture();
    const target = window.document.createElement("div");
    window.document.body.append(target);
    const sidebarBridge: SidebarProps["vb"] = {
      ...vb,
      epicBusy: () => null,
      waitsIn: () => [],
    };
    const props: SidebarProps = {
      room,
      thread: "e",
      navigation: createNavigationSession(room.id),
      pins: syncPinsSession(null, room),
      request: () => Promise.resolve({ ok: true }),
      onopenpinfile: () => {},
      onopenpinapp: () => {},
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

  test("destroyed pin forms cannot act on the retained session after a sidebar remount", async () => {
    const room = fixture();
    const first = sidebar(room);
    first.target
      .querySelector<HTMLButtonElement>(
        '[data-native-pins] button[aria-label="Fixar um link"]',
      )!
      .click();
    await tick();
    flushSync();
    const oldInput = first.target.querySelector<HTMLInputElement>(
      "[data-native-pins] input[name=url]",
    )!;
    oldInput.value = "example.com";
    oldInput.dispatchEvent(new window.Event("input", { bubbles: true }));
    const oldForm = first.target.querySelector<HTMLFormElement>(
      "[data-native-pins] form",
    )!;
    const session = first.props.pins;
    first.destroy();
    expect(session.active).toBe(true);
    const next = sidebar(room, { pins: session });
    oldInput.value = "stale.example";
    oldInput.dispatchEvent(new window.Event("input", { bubbles: true }));
    oldForm.dispatchEvent(
      new window.Event("submit", { bubbles: true, cancelable: true }),
    );
    flushSync();
    expect(first.events).toEqual([]);
    expect(next.events).toEqual([]);
    expect(
      next.target.querySelector<HTMLInputElement>(
        "[data-native-pins] input[name=url]",
      )?.value,
    ).toBe("example.com");
    next.target
      .querySelector<HTMLFormElement>("[data-native-pins] form")!
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    expect(next.events).toEqual([
      { t: "pin.add", kind: "link", ref: "https://example.com/", title: "" },
    ]);
    disposePinsSession(session);
  }, 30_000);

  test("native pins queue once, preserve an edited draft and follow canonical updates", async () => {
    const room = fixture();
    const rendered = sidebar(room);
    rendered.target
      .querySelector<HTMLButtonElement>(
        '[data-native-pins] button[aria-label="Fixar um link"]',
      )!
      .click();
    await tick();
    flushSync();
    const url = rendered.target.querySelector<HTMLInputElement>(
      "[data-native-pins] input[name=url]",
    )!;
    const title = rendered.target.querySelector<HTMLInputElement>(
      "[data-native-pins] input[name=title]",
    )!;
    url.value = "example.com";
    url.dispatchEvent(new window.Event("input", { bubbles: true }));
    title.value = "Example";
    title.dispatchEvent(new window.Event("input", { bubbles: true }));
    const form = rendered.target.querySelector<HTMLFormElement>(
      "[data-native-pins] form",
    )!;
    form.dispatchEvent(
      new window.Event("submit", { bubbles: true, cancelable: true }),
    );
    form.dispatchEvent(
      new window.Event("submit", { bubbles: true, cancelable: true }),
    );
    flushSync();
    expect(rendered.events).toEqual([
      {
        t: "pin.add",
        kind: "link",
        ref: "https://example.com/",
        title: "Example",
      },
    ]);
    expect(rendered.target.querySelectorAll("[data-pin-id]")).toHaveLength(0);
    title.value = "Edited while waiting";
    title.dispatchEvent(new window.Event("input", { bubbles: true }));
    const next = {
      ...room,
      pins: [
        {
          id: "p",
          kind: "link",
          ref: "https://example.com/",
          title: "Example",
        },
      ],
    };
    syncPinsSession(rendered.props.pins, next);
    rendered.view.update({ ...rendered.props, room: next });
    expect(
      rendered.target.querySelector<HTMLInputElement>(
        "[data-native-pins] input[name=title]",
      )?.value,
    ).toBe("Edited while waiting");
    expect(rendered.target.querySelectorAll("[data-pin-id]")).toHaveLength(1);
    const remove = rendered.target.querySelector<HTMLButtonElement>(
      '[data-native-pins] button[aria-label="Desafixar Example"]',
    )!;
    expect(remove.disabled).toBe(true); // The canonical row is not the correlated ACK.
    await rendered.settle(0, { ok: true });
    expect(remove.disabled).toBe(false);
    expect(title.value).toBe("Edited while waiting");
    remove.click();
    remove.click();
    flushSync();
    expect(rendered.events.filter((event) => event.t === "pin.del")).toEqual([
      { t: "pin.del", id: "p" },
    ]);
    expect(rendered.target.querySelectorAll("[data-pin-id]")).toHaveLength(1);
    syncPinsSession(rendered.props.pins, { ...next, pins: [] });
    rendered.view.update({ ...rendered.props, room: { ...next, pins: [] } });
    expect(rendered.target.querySelectorAll("[data-pin-id]")).toHaveLength(0);
    expect(
      rendered.target.querySelector<HTMLButtonElement>(
        "[data-native-pins] button[type=submit]",
      )?.disabled,
    ).toBe(true);
    await rendered.settle(1, { ok: true });
    expect(
      rendered.target.querySelector<HTMLButtonElement>(
        "[data-native-pins] button[type=submit]",
      )?.disabled,
    ).toBe(false);
    disposePinsSession(rendered.props.pins);
  }, 30_000);

  async function fillPin(
    rendered: ReturnType<typeof sidebar>,
    url = "example.com",
    title = "Example",
  ) {
    rendered.target
      .querySelector<HTMLButtonElement>(
        '[data-native-pins] button[aria-label="Fixar um link"]',
      )!
      .click();
    await tick();
    flushSync();
    const input = rendered.target.querySelector<HTMLInputElement>(
      "[data-native-pins] input[name=url]",
    )!;
    const name = rendered.target.querySelector<HTMLInputElement>(
      "[data-native-pins] input[name=title]",
    )!;
    input.value = url;
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    name.value = title;
    name.dispatchEvent(new window.Event("input", { bubbles: true }));
    const form = rendered.target.querySelector<HTMLFormElement>(
      "[data-native-pins] form",
    )!;
    return {
      input,
      name,
      submit() {
        form.dispatchEvent(
          new window.Event("submit", { bubbles: true, cancelable: true }),
        );
        flushSync();
      },
    };
  }
  test("pin ACK success unlocks without optimistically inventing a canonical row", async () => {
    const room = fixture(),
      rendered = sidebar(room),
      form = await fillPin(rendered);
    form.submit();
    expect(rendered.events).toHaveLength(1);
    await rendered.settle(0, { ok: true });
    expect(rendered.target.querySelector("[data-native-pins] form")).toBeNull();
    expect(rendered.target.querySelectorAll("[data-pin-id]")).toHaveLength(0);
    const next = {
      ...room,
      pins: [
        {
          id: "p",
          kind: "link",
          ref: "https://example.com/",
          title: "Example",
        },
      ],
    };
    syncPinsSession(rendered.props.pins, next);
    rendered.view.update({ ...rendered.props, room: next });
    expect(rendered.target.querySelectorAll("[data-pin-id]")).toHaveLength(1);
  }, 30_000);
  test("pin rejection, timeout and offline outcomes preserve the editable draft and permit only manual retries", async () => {
    const rendered = sidebar(fixture()),
      form = await fillPin(rendered);
    form.submit();
    await rendered.settle(0, { ok: false, error: "Pin rejected by server" });
    expect(
      rendered.target.querySelector("[role=alert]")?.textContent,
    ).toContain("Pin rejected by server");
    expect(form.input.value).toBe("example.com");
    expect(form.name.value).toBe("Example");
    form.submit();
    await rendered.settle(1, { ok: false, error: "timeout" });
    expect(
      rendered.target.querySelector("[role=alert]")?.textContent,
    ).toContain("Ainda não recebi confirmação");
    form.submit();
    await rendered.settle(2, { ok: false, error: "offline" });
    expect(
      rendered.target.querySelector("[role=alert]")?.textContent,
    ).toContain("Sem conexão");
    form.submit();
    rendered.outcomes[3].reject(Error("broken transport"));
    await tick();
    flushSync();
    expect(
      rendered.target.querySelector("[role=alert]")?.textContent,
    ).toContain("Não deu pra enviar agora");
    expect(form.input.value).toBe("example.com");
    expect(rendered.events).toHaveLength(4);
    expect(rendered.target.querySelectorAll("[data-pin-id]")).toHaveLength(0);
  }, 30_000);
  test("disposed pin form ACK cannot mutate a new room's pending form", async () => {
    const old = sidebar(fixture()),
      oldForm = await fillPin(old);
    oldForm.submit();
    disposePinsSession(old.props.pins);
    old.destroy();
    const next = sidebar({ ...fixture(), id: "new-room" }),
      current = await fillPin(next, "next.example.com", "Next");
    current.submit();
    await old.settle(0, { ok: true });
    expect(current.input.value).toBe("next.example.com");
    expect(current.name.value).toBe("Next");
    expect(
      next.target.querySelector<HTMLButtonElement>(
        "[data-native-pins] button[type=submit]",
      )?.disabled,
    ).toBe(true);
    await next.settle(0, { ok: true });
    expect(next.target.querySelector("[data-native-pins] form")).toBeNull();
  }, 30_000);
  test("duplicate explicit pin submit reports a no-op without calling the Promise request", async () => {
    const room = {
      ...fixture(),
      pins: [
        {
          id: "p",
          kind: "link",
          ref: "https://example.com/",
          title: "Example",
        },
      ],
    };
    const rendered = sidebar(room),
      form = await fillPin(rendered);
    rendered.view.update({
      ...rendered.props,
      room: { ...room, pins: [...room.pins] },
    });
    expect(form.input.value).toBe("example.com");
    form.submit();
    await tick();
    flushSync();
    expect(rendered.events).toEqual([]);
    expect(
      rendered.target.querySelector("[data-native-pins] [role=status]")
        ?.textContent,
    ).toContain("Este link já está nos fixados");
    expect(rendered.target.querySelector("[data-native-pins] form")).toBeNull();
  }, 30_000);

  test("native file/app pins open typed targets and disposed room actions stay inert", () => {
    const file = {
      id: "f",
      name: "report.pdf",
      type: "application/pdf",
      size: 20,
      author: "me@test",
      ts: 1,
    };
    const room = {
      ...fixture(),
      files: [file],
      filesAll: true,
      pins: [
        { id: "file", kind: "file", ref: "f" },
        { id: "app", kind: "app", ref: "123456abcdef/chart", title: "Chart" },
        { id: "missing", kind: "file", ref: "gone", title: "Gone" },
      ],
    };
    const files: (typeof file)[] = [];
    const apps: { connectionId: string; tool: string }[] = [];
    const rendered = sidebar(room, {
      onopenpinfile: (file) => files.push(file),
      onopenpinapp: (app) => apps.push(app),
    });
    rendered.target
      .querySelector<HTMLButtonElement>("[data-pin-id=file] button")!
      .click();
    rendered.target
      .querySelector<HTMLButtonElement>("[data-pin-id=app] button")!
      .click();
    expect(files).toEqual([file]);
    expect(apps).toEqual([{ connectionId: "123456abcdef", tool: "chart" }]);
    expect(
      rendered.target.querySelector("[data-pin-id=missing]")?.textContent,
    ).toContain("Arquivo indisponível");
    expect(rendered.target.querySelector("[data-pin-id=missing] a")).toBeNull();
    disposePinsSession(rendered.props.pins);
    rendered.target
      .querySelector<HTMLButtonElement>("[data-pin-id=file] button")!
      .click();
    rendered.target
      .querySelector<HTMLButtonElement>("[data-pin-id=app] button")!
      .click();
    rendered.target
      .querySelector<HTMLButtonElement>("[data-pin-id=missing] button")!
      .click();
    expect(files).toHaveLength(1);
    expect(apps).toHaveLength(1);
    expect(rendered.events).toEqual([]);
  }, 30_000);

  test("partial pinned-file metadata loads once and opens the current file after canonical resolution", () => {
    const newest = {
      id: "new",
      name: "new.txt",
      type: "text/plain",
      size: 5,
      author: "me@test",
      ts: 2,
    };
    const old = {
      ...newest,
      id: "old",
      name: "older-report.pdf",
      type: "application/pdf",
      ts: 1,
    };
    const room = {
      ...fixture(),
      files: [newest],
      filesAll: false,
      pins: [{ id: "p", kind: "file", ref: "old", title: "Older report" }],
    };
    const opened: (typeof old)[] = [];
    const rendered = sidebar(room, {
      onopenpinfile: (file) => opened.push(file),
    });
    expect(
      rendered.target.querySelector("[data-pin-id=p]")?.textContent,
    ).not.toContain("Arquivo indisponível");
    expect(
      rendered.target
        .querySelector("[data-native-pins]")
        ?.hasAttribute("data-vb-native"),
    ).toBe(true);
    requestPinnedFiles(rendered.props.pins, room, rendered.props.send);
    flushSync();
    rendered.target
      .querySelector<HTMLButtonElement>("[data-pin-id=p] button")!
      .click();
    flushSync();
    requestPinnedFiles(rendered.props.pins, { ...room }, rendered.props.send);
    expect(rendered.events).toEqual([{ t: "files.get" }]);
    expect(opened).toEqual([]);
    const full = { ...room, files: [newest, old], filesAll: true };
    syncPinsSession(rendered.props.pins, full);
    rendered.view.update({ ...rendered.props, room: full });
    flushSync();
    expect(opened).toEqual([old]);
    rendered.view.update({ ...rendered.props, room: { ...full } });
    flushSync();
    expect(opened).toHaveLength(1);
    // Fresh socket snapshots return to a partial index. An explicit click must recover it.
    syncPinsSession(rendered.props.pins, room);
    rendered.view.update({ ...rendered.props, room });
    flushSync();
    rendered.target
      .querySelector<HTMLButtonElement>("[data-pin-id=p] button")!
      .click();
    flushSync();
    expect(rendered.events).toEqual([{ t: "files.get" }, { t: "files.get" }]);
    expect(opened).toHaveLength(1);
    const latest = { ...old, name: "latest-report.pdf" };
    const reloaded = { ...room, files: [newest, latest], filesAll: true };
    syncPinsSession(rendered.props.pins, reloaded);
    rendered.view.update({ ...rendered.props, room: reloaded });
    flushSync();
    expect(opened).toEqual([old, latest]);
    disposePinsSession(rendered.props.pins);
  }, 30_000);
  test("metadata received after room disposal does not open a formerly requested pin", () => {
    const file = {
      id: "old",
      name: "old.pdf",
      type: "application/pdf",
      size: 20,
      author: "me@test",
      ts: 1,
    };
    const room = {
      ...fixture(),
      files: [],
      filesAll: false,
      pins: [{ id: "p", kind: "file", ref: "old" }],
    };
    const opened: (typeof file)[] = [];
    const rendered = sidebar(room, {
      onopenpinfile: (file) => opened.push(file),
    });
    rendered.target
      .querySelector<HTMLButtonElement>("[data-pin-id=p] button")!
      .click();
    flushSync();
    expect(rendered.events).toEqual([{ t: "files.get" }]);
    disposePinsSession(rendered.props.pins);
    rendered.view.update({
      ...rendered.props,
      room: { ...room, files: [file], filesAll: true },
    });
    flushSync();
    expect(opened).toEqual([]);
  }, 30_000);
});

describe("native People interactions", () => {
  type PeopleProps = ComponentProps<typeof People>;
  const personRoom = (): Room => ({
    ...fixture(),
    me: "owner@test.com",
    book: { title: "People room", owner: "owner@test.com" },
    members: ["owner@test.com", "member@test.com", "pending@test.com"],
    online: ["member@test.com"],
    pending: ["pending@test.com"],
    requests: [
      { email: "ask@test.com", name: "<script>untrusted()</script>", ts: 1 },
    ],
  });
  function pendingPeopleRequest() {
    let resolve!: () => void;
    let reject!: (error: Error) => void;
    const promise = new Promise<void>((yes, no) => {
      resolve = yes;
      reject = no;
    });
    return { promise, resolve, reject };
  }
  function people(room: Room, extra: Partial<PeopleProps> = {}) {
    const target = document.createElement("div");
    document.body.append(target);
    const props: PeopleProps = {
      room,
      vb,
      friends: ["friend@test.com"],
      ...extra,
    };
    const values = writable<Record<string, unknown>>(props);
    // As in mountView, the prop bag is checked before this dynamic forwarding boundary.
    const component = People as unknown as Component<Record<string, unknown>>;
    const instance = flushSync(() =>
      mount(PeopleView, { target, props: { component, values } }),
    );
    let active = true;
    const destroy = () => {
      if (!active) return;
      active = false;
      flushSync(() => {
        void unmount(instance);
      });
      target.remove();
    };
    peopleCleanups.push(destroy);
    return {
      target,
      update(next: Room) {
        flushSync(() => values.set({ ...props, room: next }));
      },
      destroy,
    };
  }
  async function settlePeopleDialogClose() {
    // Bits keeps closed content through an exit animation frame; tick only drains Svelte work.
    for (
      let frame = 0;
      frame < 10 && document.querySelector('[role="alertdialog"]');
      frame++
    ) {
      await new Promise<void>((resolve) =>
        window.requestAnimationFrame(() => resolve()),
      );
      flushSync();
      await tick();
    }
    expect(document.querySelector('[role="alertdialog"]') === null).toBe(true);
  }
  function submitPeopleInvite(target: HTMLElement, email: string) {
    const input = target.querySelector<HTMLInputElement>(
      '#invite input[type="email"]',
    )!;
    input.value = email;
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    flushSync();
    target
      .querySelector<HTMLFormElement>("#invite")!
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    flushSync();
    return input;
  }
  test("owner and member see the authorized removal controls and plain-text access requests", () => {
    const room = personRoom();
    const rendered = people(room);
    expect(
      rendered.target.querySelector('[data-remove="owner@test.com"]') === null,
    ).toBe(true);
    expect(
      rendered.target.querySelector('[data-remove="member@test.com"]') !== null,
    ).toBe(true);
    expect(
      rendered.target.querySelector('[data-remove="pending@test.com"]') !==
        null,
    ).toBe(true);
    expect(rendered.target.querySelector("script") === null).toBe(true);
    expect(rendered.target.textContent).toContain(
      "<script>untrusted()</script>",
    );
    rendered.update({ ...room, me: "member@test.com" });
    expect(
      rendered.target.querySelector('[data-remove="owner@test.com"]') === null,
    ).toBe(true);
    expect(
      rendered.target.querySelector('[data-remove="member@test.com"]') === null,
    ).toBe(true);
    expect(
      rendered.target.querySelector('[data-remove="pending@test.com"]') !==
        null,
    ).toBe(true);
    expect(
      rendered.target.querySelector(
        '[data-ask="ask@test.com"][data-ok="1"]',
      ) !== null,
    ).toBe(true);
  });
  for (const action of ["remove", "deny"] as const) {
    test(`People ${action} confirms, restores cancel focus, and ignores late failure after canonical disappearance`, async () => {
      const room = personRoom();
      const reply = pendingPeopleRequest();
      const calls: { action: string; email: string }[] = [];
      const rendered = people(room, {
        request: (kind: PeopleAction, email: string) => {
          calls.push({ action: kind, email });
          return reply.promise;
        },
      });
      const email = action === "remove" ? "member@test.com" : "ask@test.com";
      const selector =
        action === "remove"
          ? `[data-remove="${email}"]`
          : `[data-ask="${email}"][data-ok=""]`;
      const trigger =
        rendered.target.querySelector<HTMLButtonElement>(selector)!;
      trigger.focus();
      trigger.click();
      flushSync();
      await tick();
      const cancel = document.querySelector<HTMLButtonElement>(
        "[data-alert-dialog-cancel]",
      )!;
      expect(document.activeElement === cancel).toBe(true);
      expect(calls).toEqual([]);
      cancel.click();
      flushSync();
      await tick();
      await settlePeopleDialogClose();
      expect(document.activeElement === trigger).toBe(true);
      expect(calls).toEqual([]);
      trigger.click();
      flushSync();
      await tick();
      document
        .querySelector<HTMLButtonElement>("[data-alert-dialog-action]")!
        .click();
      flushSync();
      await tick();
      expect(calls).toEqual([{ action, email }]);
      expect(trigger.disabled).toBe(true);
      expect(rendered.target.querySelector(selector) !== null).toBe(true);
      rendered.update(
        action === "remove"
          ? {
              ...room,
              members: room.members.filter((member) => member !== email),
            }
          : { ...room, requests: [] },
      );
      await tick();
      await settlePeopleDialogClose();
      expect(rendered.target.querySelector(selector) === null).toBe(true);
      expect(
        document.activeElement ===
          rendered.target.querySelector("[data-people-panel]"),
      ).toBe(true);
      reply.reject(new Error("obsolete request rejected"));
      await tick();
      flushSync();
      expect(rendered.target.textContent).not.toContain(
        "obsolete request rejected",
      );
      expect(rendered.target.querySelector('[role="alert"]') === null).toBe(
        true,
      );
    }, 30_000);
  }
  test("successful invitation stays separate from clipboard denial and canonical membership", async () => {
    const room = personRoom();
    const reply = pendingPeopleRequest();
    const calls: string[] = [];
    window.navigator.clipboard.writeText = async () => {
      throw new Error("clipboard denied");
    };
    const rendered = people(room, {
      request: (action: PeopleAction, email: string) => {
        calls.push(`${action}:${email}`);
        return reply.promise;
      },
    });
    const input = submitPeopleInvite(rendered.target, "NEW@TEST.COM");
    await tick();
    flushSync();
    expect(calls).toEqual(["invite:new@test.com"]);
    expect(rendered.target.textContent).toContain("Não consegui copiar.");
    expect(rendered.target.textContent).not.toContain("enviado ✓");
    expect(
      rendered.target.querySelector('[data-person="new@test.com"]') === null,
    ).toBe(true);
    expect(input.value).toBe("NEW@TEST.COM");
    reply.resolve();
    await tick();
    flushSync();
    expect(input.value).toBe("");
    expect(rendered.target.textContent).toContain("new@test.com · enviado ✓");
    expect(rendered.target.textContent).toContain("Não consegui copiar.");
    expect(
      rendered.target.querySelector('[data-person="new@test.com"]') === null,
    ).toBe(true);
    rendered.update({
      ...room,
      members: [...room.members, "new@test.com"],
      pending: [...room.pending!, "new@test.com"],
    });
    expect(
      rendered.target.querySelector('[data-person="new@test.com"]') !== null,
    ).toBe(true);
    expect(rendered.target.textContent).not.toContain(
      "Aguardando confirmação…",
    );
  });
  test("copied invite text does not report backend success when invitation is rejected", async () => {
    const copied: string[] = [];
    window.navigator.clipboard.writeText = async (text) => {
      copied.push(text);
    };
    const rendered = people(personRoom(), {
      request: async () => {
        throw new Error("invitation rejected");
      },
    });
    const input = submitPeopleInvite(rendered.target, "new@test.com");
    await tick();
    flushSync();
    expect(copied).toHaveLength(1);
    expect(copied[0]).toContain("/b/r");
    expect(copied[0]).toContain("new@test.com");
    expect(rendered.target.textContent).toContain("Copiei a mensagem");
    expect(rendered.target.textContent).toContain("invitation rejected");
    expect(rendered.target.textContent).not.toContain("enviado ✓");
    expect(input.value).toBe("new@test.com");
    expect(
      rendered.target.querySelector('[data-person="new@test.com"]') === null,
    ).toBe(true);
  });
  test("keyed room replacement disposes old invitation and clipboard callbacks and detached actions", async () => {
    const room = personRoom();
    const reply = pendingPeopleRequest();
    const clipboard = pendingPeopleRequest();
    const calls: string[] = [];
    window.navigator.clipboard.writeText = () => clipboard.promise;
    const rendered = people(room, {
      request: (action: PeopleAction, email: string) => {
        calls.push(`${action}:${email}`);
        return reply.promise;
      },
    });
    const staleFriend = rendered.target.querySelector<HTMLButtonElement>(
      '[data-add="friend@test.com"]',
    )!;
    submitPeopleInvite(rendered.target, "old@test.com");
    expect(calls).toEqual(["invite:old@test.com"]);
    rendered.update({
      ...room,
      id: "next",
      book: { ...room.book, title: "Next room" },
    });
    const currentInput =
      rendered.target.querySelector<HTMLInputElement>("#invite input")!;
    currentInput.value = "fresh@test.com";
    currentInput.dispatchEvent(new window.Event("input", { bubbles: true }));
    flushSync();
    staleFriend.click();
    reply.resolve();
    clipboard.reject(new Error("late clipboard failure"));
    await tick();
    flushSync();
    expect(calls).toEqual(["invite:old@test.com"]);
    expect(currentInput.value).toBe("fresh@test.com");
    expect(rendered.target.textContent).not.toContain("old@test.com");
    expect(rendered.target.textContent).not.toContain("Não consegui copiar.");
    expect(rendered.target.textContent).not.toContain("enviado ✓");
    const staleCurrentFriend = rendered.target.querySelector<HTMLButtonElement>(
      '[data-add="friend@test.com"]',
    )!;
    rendered.destroy();
    staleCurrentFriend.click();
    expect(calls).toEqual(["invite:old@test.com"]);
  });
});

describe("native composer ownership and interactions", () => {
  const chatBridge: import("../svelte/chatTypes").ChatBridge = {
    t: vb.t,
    name: vb.name,
    ago: vb.ago,
    hhmm: () => "09:00",
    waiting: () => false,
    locale: "pt-BR",
  };
  const attachment = (id = "aa11"): import("../shared/room").Attachment => ({
    id,
    name: "note.txt",
    type: "text/plain",
    size: 1,
    author: "me@test",
    ts: 1,
  });
  function renderComposer(
    room: Room,
    extra: Partial<
      import("../svelte/features/composer/types").ComposerProps
    > = {},
  ) {
    const drafts = createComposerDrafts();
    peopleCleanups.push(() => drafts.dispose());
    const target = document.createElement("main"),
      slot = document.createElement("div");
    target.append(slot);
    document.body.append(target);
    const props: import("../svelte/features/composer/types").ComposerProps = {
      room,
      thread: "main",
      vb: chatBridge,
      drafts,
      request: async () => ({ ok: false, error: "offline" }),
      upload: async () => attachment(),
      navigate: () => {},
      ...extra,
    };
    const view = mountView("composer", slot, props);
    active.push(view);
    return {
      target,
      drafts,
      entry: drafts.entry({
        account: room.me,
        roomId: room.id,
        thread: props.thread,
      }),
      update(next: Room, thread = props.thread) {
        view.update({ ...props, room: next, thread });
      },
      destroy() {
        const at = active.indexOf(view);
        if (at >= 0) active.splice(at, 1);
        view.destroy();
      },
    };
  }
  function edit(target: Element, value: string) {
    const input = target.querySelector<HTMLTextAreaElement>("textarea")!;
    input.value = value;
    input.setSelectionRange(value.length, value.length);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    flushSync();
    return input;
  }
  async function dialogClosed() {
    for (
      let frame = 0;
      frame < 10 && document.querySelector('[role="dialog"]');
      frame++
    )
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    flushSync();
    expect(document.querySelector('[role="dialog"]') === null).toBe(true);
  }
  test("native composer Enter preserves draft until correlated ACK and canonical message; Shift/IME never submit", async () => {
    const room = fixture(),
      sent: RoomCommand[] = [];
    let resolve!: (outcome: CommandOutcome) => void;
    const { target, update } = renderComposer(room, {
      request: (command) => {
        sent.push(command);
        return new Promise((done) => (resolve = done));
      },
    });
    const input = edit(target, "keep until canonical");
    input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        isComposing: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(sent).toHaveLength(0);
    input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(sent[0]).toMatchObject({
      t: "msg",
      thread: "main",
      text: "keep until canonical",
    });
    resolve({ ok: true });
    await tick();
    flushSync();
    expect(input.value).toBe("keep until canonical");
    update({
      ...room,
      messages: [
        {
          id: 1,
          thread: "main",
          author: room.me,
          kind: null,
          text: "keep until canonical",
          ts: 1,
        },
      ],
    });
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "",
    );
  }, 30_000);
  test("composer mention keyboard selection and emoji replace the saved selection without submitting", async () => {
    const room = { ...fixture(), names: { "you@test": "José Silva" } };
    const { target } = renderComposer(room);
    const input = edit(target, "@jo");
    expect(target.querySelector('[role="listbox"]')?.textContent).toContain(
      "@jose",
    );
    input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
        cancelable: true,
      }),
    );
    await tick();
    flushSync();
    expect(input.value).toBe("@jose ");
    edit(target, "before selected after");
    input.setSelectionRange(7, 15);
    input.dispatchEvent(new Event("select", { bubbles: true }));
    target
      .querySelector<HTMLButtonElement>('button[aria-label="Emoji"]')!
      .click();
    flushSync();
    await tick();
    const fire = document.querySelector<HTMLButtonElement>(
      '[role="dialog"] button[aria-label=":fire:"]',
    )!;
    expect(fire !== null).toBe(true);
    fire.click();
    await tick();
    flushSync();
    await dialogClosed();
    expect(input.value).toBe("before 🔥 after");
  }, 30_000);
  test("more menu keyboard focus and thread drafts stay scoped across remounts", async () => {
    const room = fixture();
    const { target, update } = renderComposer(room);
    edit(target, "main draft");
    const more = target.querySelector<HTMLButtonElement>(
      "[data-composer-more]",
    )!;
    more.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowDown",
        bubbles: true,
        cancelable: true,
      }),
    );
    flushSync();
    await tick();
    const items = target.querySelectorAll<HTMLButtonElement>(
      '[role="menu"] button',
    );
    expect(items.length).toBe(3);
    expect(document.activeElement === items[0]).toBe(true);
    items[0].dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowDown",
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(document.activeElement === items[1]).toBe(true);
    items[1].dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      }),
    );
    flushSync();
    expect(target.querySelector('[role="menu"]') === null).toBe(true);
    update(room, "e");
    edit(target, "epic draft");
    update(room, "main");
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "main draft",
    );
    update(room, "e");
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "epic draft",
    );
  }, 30_000);
  test("attachment upload removal aborts and revokes preview; late completion cannot repopulate tray", async () => {
    const originalCreate = URL.createObjectURL,
      originalRevoke = URL.revokeObjectURL,
      revoked: string[] = [];
    URL.createObjectURL = () => "blob:composer-fixture";
    URL.revokeObjectURL = (url) => revoked.push(url);
    peopleCleanups.push(() => {
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
    });
    let resolve!: (meta: import("../shared/schemas").UploadFileResult) => void,
      signal: AbortSignal | undefined;
    const { target } = renderComposer(fixture(), {
      upload: (_input, owner) => {
        signal = owner;
        return new Promise((done) => (resolve = done));
      },
    });
    const transfer = new window.DataTransfer();
    transfer.items.add(
      new window.File([new Uint8Array([1])], "photo.png", {
        type: "image/png",
      }),
    );
    const input = target.querySelector<HTMLInputElement>('input[type="file"]')!;
    Object.defineProperty(input, "files", {
      configurable: true,
      value: transfer.files,
    });
    input.dispatchEvent(new Event("change", { bubbles: true }));
    flushSync();
    expect(
      target.querySelector('img[src="blob:composer-fixture"]') !== null,
    ).toBe(true);
    target
      .querySelector<HTMLButtonElement>('button[aria-label="Remover anexo"]')!
      .click();
    flushSync();
    expect(signal?.aborted).toBe(true);
    expect(revoked).toContain("blob:composer-fixture");
    resolve({ ...attachment(), name: "photo.png", type: "image/png" });
    await tick();
    flushSync();
    expect(target.querySelector("[data-composer-attachment]") === null).toBe(
      true,
    );
  }, 30_000);
  test("foreign modal paste never starts a hidden upload but composer paste still works", async () => {
    let uploads = 0;
    const { target } = renderComposer(fixture(), {
      upload: async () => {
        uploads++;
        return attachment();
      },
    });
    target.querySelector<HTMLButtonElement>("[data-composer-more]")!.click();
    flushSync();
    await tick();
    Array.from(
      target.querySelectorAll<HTMLButtonElement>('[role="menu"] button'),
    )
      .find((button) => button.textContent?.includes("Criar votação"))!
      .click();
    flushSync();
    await tick();
    const transfer = new window.DataTransfer();
    transfer.items.add(
      new window.File([new Uint8Array([1])], "note.txt", {
        type: "text/plain",
      }),
    );
    const event = new Event("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "clipboardData", { value: transfer });
    document
      .querySelector<HTMLButtonElement>(
        '[role="dialog"] button[aria-label="Fechar"]',
      )!
      .dispatchEvent(event);
    expect(uploads).toBe(0);
    document
      .querySelector<HTMLButtonElement>(
        '[role="dialog"] button[aria-label="Fechar"]',
      )!
      .click();
    await tick();
    flushSync();
    await dialogClosed();
    const paste = new Event("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(paste, "clipboardData", { value: transfer });
    target.querySelector<HTMLTextAreaElement>("textarea")!.dispatchEvent(paste);
    expect(uploads).toBe(1);
  }, 30_000);
  test("native poll creation keeps form until ACK plus same-thread authoritative poll message", async () => {
    const room = fixture(),
      sent: RoomCommand[] = [];
    let resolve!: (outcome: CommandOutcome) => void;
    const { target, update } = renderComposer(room, {
      request: (command) => {
        sent.push(command);
        return new Promise((done) => (resolve = done));
      },
    });
    target.querySelector<HTMLButtonElement>("[data-composer-more]")!.click();
    flushSync();
    await tick();
    Array.from(
      target.querySelectorAll<HTMLButtonElement>('[role="menu"] button'),
    )
      .find((button) => button.textContent?.includes("Criar votação"))!
      .click();
    flushSync();
    await tick();
    const inputs = document.querySelectorAll<HTMLInputElement>(
      '[role="dialog"] input:not([type="checkbox"])',
    );
    for (const [index, value] of [
      [0, "Question"],
      [1, "First"],
      [2, "Second"],
    ] as const) {
      inputs[index].value = value;
      inputs[index].dispatchEvent(new Event("input", { bubbles: true }));
    }
    flushSync();
    Array.from(
      document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button'),
    )
      .find((button) => button.textContent?.trim() === "Criar votação")!
      .click();
    expect(sent[0]).toMatchObject({
      t: "poll.create",
      thread: "main",
      question: "Question",
      options: ["First", "Second"],
    });
    resolve({ ok: true });
    await tick();
    flushSync();
    expect(
      document.querySelector<HTMLInputElement>('[role="dialog"] input')?.value,
    ).toBe("Question");
    update({
      ...room,
      messages: [
        { id: 1, thread: "main", author: room.me, text: "", ts: 1, poll: "p" },
      ],
      polls: {
        p: {
          id: "p",
          author: room.me,
          question: "Question",
          options: ["First", "Second"],
          multi: false,
          closed: false,
          votes: [[], []],
        },
      },
    });
    await tick();
    flushSync();
    await dialogClosed();
    expect(target.textContent).toContain("Votação criada");
  }, 30_000);
  test("uncertain identical candidate retains draft and blocks duplicate until explicit local review", async () => {
    const room = fixture(),
      sent: RoomCommand[] = [];
    let resolve!: (outcome: CommandOutcome) => void;
    const { target, update } = renderComposer(room, {
      request: (command) => {
        sent.push(command);
        return new Promise((done) => (resolve = done));
      },
    });
    edit(target, "same text");
    target.querySelector<HTMLButtonElement>("[data-composer-send]")!.click();
    resolve({ ok: false, error: "disconnected" });
    await tick();
    flushSync();
    update({
      ...room,
      messages: [
        { id: 1, thread: "main", author: room.me, text: "same text", ts: 1 },
      ],
    });
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "same text",
    );
    expect(
      target.querySelector<HTMLButtonElement>("[data-composer-send]")?.disabled,
    ).toBe(true);
    expect(sent).toHaveLength(1);
    Array.from(target.querySelectorAll<HTMLButtonElement>("button"))
      .find((button) => button.textContent?.includes("Conferi a sala; manter"))!
      .click();
    flushSync();
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "same text",
    );
    expect(sent).toHaveLength(1);
  }, 30_000);
  test("native mic capability projects interim text and cancels stale recognition across thread changes", async () => {
    const engines: import("../svelte/features/composer/speech").SpeechRecognizer[] =
      [];
    let starts = 0,
      aborts = 0;
    const factory: import("../svelte/features/composer/speech").SpeechFactory =
      () => {
        const rec: import("../svelte/features/composer/speech").SpeechRecognizer =
          {
            lang: "",
            continuous: false,
            interimResults: false,
            onresult: null,
            onerror: null,
            onend: null,
            start() {
              starts++;
            },
            stop() {
              this.onend?.({});
            },
            abort() {
              aborts++;
            },
          };
        engines.push(rec);
        return rec;
      };
    const room = fixture(),
      { target, update } = renderComposer(room, { speechFactory: factory });
    const input = edit(target, "base");
    input.focus();
    target
      .querySelector<HTMLButtonElement>('button[aria-label="Ditar mensagem"]')!
      .dispatchEvent(
        new PointerEvent("pointerdown", {
          pointerId: 1,
          bubbles: true,
          cancelable: true,
        }),
      );
    expect(starts).toBe(1);
    expect(engines[0].lang).toBe("pt-BR");
    engines[0].onresult?.({ results: [[{ transcript: "spoken" }]] });
    flushSync();
    expect(input.value).toBe("base spoken");
    const late = engines[0].onresult;
    update(room, "e");
    edit(target, "new thread");
    late?.({ results: [[{ transcript: "late old speech" }]] });
    flushSync();
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "new thread",
    );
    expect(aborts).toBeGreaterThan(0);
    target
      .querySelector<HTMLButtonElement>('button[aria-label="Ditar mensagem"]')!
      .click();
    expect(starts).toBe(2);
    engines[1].onerror?.({ error: "not-allowed" });
    flushSync();
    expect(target.textContent).toContain(
      "O navegador não deixou usar o microfone.",
    );
  }, 30_000);
  test("native Hold-Space starts only after threshold; contenteditable and unavailable capability remain ordinary", async () => {
    let starts = 0;
    const rec: import("../svelte/features/composer/speech").SpeechRecognizer = {
      lang: "",
      continuous: false,
      interimResults: false,
      onresult: null,
      onerror: null,
      onend: null,
      start() {
        starts++;
      },
      stop() {
        this.onend?.({});
      },
      abort() {},
    };
    const { target } = renderComposer(fixture(), { speechFactory: () => rec });
    const input = edit(target, "hold");
    input.focus();
    input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: " ",
        bubbles: true,
        cancelable: true,
      }),
    );
    input.dispatchEvent(
      new KeyboardEvent("keyup", { key: " ", bubbles: true }),
    );
    flushSync();
    expect(input.value).toBe("hold ");
    expect(starts).toBe(0);
    input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: " ",
        bubbles: true,
        cancelable: true,
      }),
    );
    await new Promise((resolve) => setTimeout(resolve, 370));
    expect(starts).toBe(1);
    input.dispatchEvent(
      new KeyboardEvent("keyup", { key: " ", bubbles: true }),
    );
    const foreign = document.createElement("div");
    foreign.contentEditable = "true";
    document.body.append(foreign);
    foreign.focus();
    const event = new KeyboardEvent("keydown", {
      key: " ",
      bubbles: true,
      cancelable: true,
    });
    foreign.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(starts).toBe(1);
    const unsupported = renderComposer(
      { ...fixture(), id: "unsupported" },
      { speechFactory: null },
    );
    expect(
      unsupported.target.querySelector(
        'button[aria-label="Ditar mensagem"]',
      ) === null,
    ).toBe(true);
  }, 30_000);
  test("deleted-thread recovery reviews original content, reports clipboard failure and discards only the local draft", async () => {
    const room = fixture(),
      sent: RoomCommand[] = [];
    const { target, drafts, update } = renderComposer(room, {
      request: async (command) => {
        sent.push(command);
        return { ok: true };
      },
    });
    const orphan = drafts.entry({
      account: room.me,
      roomId: room.id,
      thread: "deleted-original",
    });
    orphan.edit("Original private draft");
    flushSync();
    const review = [...target.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("Revisar rascunho"),
    );
    expect(!!review).toBe(true);
    review!.click();
    flushSync();
    await tick();
    const dialog = document.querySelector('[role="dialog"]')!;
    expect(
      dialog.querySelector<HTMLTextAreaElement>("textarea")?.value,
    ).toContain("Original private draft");
    expect(
      dialog.querySelector<HTMLTextAreaElement>("textarea")?.readOnly,
    ).toBe(true);
    const original = navigator.clipboard.writeText;
    try {
      navigator.clipboard.writeText = async () => {
        throw new Error("denied");
      };
      [...dialog.querySelectorAll("button")]
        .find((button) => button.textContent?.trim() === "Copiar")!
        .click();
      await tick();
      expect(dialog.textContent).toContain("Não foi possível copiar");
    } finally {
      navigator.clipboard.writeText = original;
    }
    [...dialog.querySelectorAll("button")]
      .find((button) => button.textContent?.includes("Descartar rascunho"))!
      .click();
    flushSync();
    await dialogClosed();
    expect(drafts.orphans(room)).toHaveLength(0);
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "",
    );
    expect(sent).toHaveLength(0);
    orphan.edit("detached discarded draft");
    update({ ...room, me: "other@test" });
    expect(target.textContent).not.toContain("Original private draft");
  }, 30_000);
  test("account reset clears drafts and detached form cannot send after disposal", async () => {
    const sent: RoomCommand[] = [];
    const { target, drafts, destroy, update } = renderComposer(fixture(), {
      request: async (command) => {
        sent.push(command);
        return { ok: true };
      },
    });
    edit(target, "private old account");
    const stale = target.querySelector("form")!;
    drafts.reset();
    update({ ...fixture(), me: "you@test" });
    expect(target.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "",
    );
    destroy();
    stale.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );
    await tick();
    expect(sent).toHaveLength(0);
  }, 30_000);
});

describe("native room sidebar header and suggestion ownership", () => {
  function deferredMutationOutcome() {
    let resolve!: (value: CommandOutcome) => void;
    const promise = new Promise<CommandOutcome>((done) => {
      resolve = done;
    });
    return { promise, resolve };
  }
  const bridge: SidebarProps["vb"] = {
    t: vb.t,
    name: vb.name,
    ago: vb.ago,
    epicBusy: () => null,
    waitsIn: () => [],
  };
  async function closed(role: string) {
    for (
      let frame = 0;
      frame < 10 && document.querySelector(`[role="${role}"]`);
      frame++
    )
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    flushSync();
    expect(document.querySelector(`[role="${role}"]`) === null).toBe(true);
  }
  test("native epic delete confirmation cancels on canonical replacement and old detached actions cannot write", async () => {
    const room = fixture(),
      commands: RoomCommand[] = [],
      owner = createRoomMutations(room.me, room.id),
      request = async (command: RoomCommand): Promise<CommandOutcome> => {
        commands.push(command);
        return { ok: true };
      };
    peopleCleanups.push(() => owner.dispose());
    owner.sync(room, request);
    const target = document.createElement("div");
    document.body.append(target);
    const props: import("../svelte/features/room-sidebar/types").ThreadHeaderProps =
      {
        room,
        thread: "e",
        owner,
        vb: bridge,
        onopenside: () => {},
        onrenameroom: () => {},
      };
    const view = mountView("threadHeader", target, props);
    active.push(view);
    target
      .querySelector<HTMLButtonElement>('[aria-label="Apagar épico"]')!
      .click();
    flushSync();
    await tick();
    const dialog = document.querySelector('[role="alertdialog"]')!,
      confirm = [...dialog.querySelectorAll("button")].find(
        (button) => button.textContent?.trim() === "Apagar",
      )!;
    const replacement: Room = {
      ...room,
      epics: room.epics.map((epic) => ({
        ...epic,
        title: "Replaced canonical target",
      })),
    };
    owner.sync(replacement, request);
    view.update({ ...props, room: replacement });
    await closed("alertdialog");
    confirm.click();
    await tick();
    expect(commands).toHaveLength(0);
    const at = active.indexOf(view);
    active.splice(at, 1);
    view.destroy();
    target
      .querySelector<HTMLButtonElement>('[aria-label="Apagar épico"]')
      ?.click();
    await tick();
    expect(commands).toHaveLength(0);
  }, 30_000);
  test("native epic rename retains text until ACK and canonical title and archive uses direct correlated action", async () => {
    const room = fixture(),
      owner = createRoomMutations(room.me, room.id),
      commands: RoomCommand[] = [],
      responses: ReturnType<typeof deferredMutationOutcome>[] = [];
    peopleCleanups.push(() => owner.dispose());
    const request = (command: RoomCommand) => {
      commands.push(command);
      const response = deferredMutationOutcome();
      responses.push(response);
      return response.promise;
    };
    owner.sync(room, request);
    const target = document.createElement("div");
    document.body.append(target);
    const props: import("../svelte/features/room-sidebar/types").ThreadHeaderProps =
      {
        room,
        thread: "e",
        owner,
        vb: bridge,
        onopenside: () => {},
        onrenameroom: () => {},
      };
    const view = mountView("threadHeader", target, props);
    active.push(view);
    target.querySelector<HTMLButtonElement>('[aria-label="Renomear"]')!.click();
    flushSync();
    await tick();
    const dialog = document.querySelector('[role="dialog"]')!,
      input = dialog.querySelector<HTMLInputElement>("input")!;
    input.value = "Typed title";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    dialog
      .querySelector("form")!
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await tick();
    expect(commands).toEqual([
      { t: "epic.rename", id: "e", title: "Typed title" },
    ]);
    expect(input.value).toBe("Typed title");
    responses[0]!.resolve({ ok: true });
    await tick();
    expect(document.querySelector('[role="dialog"]') !== null).toBe(true);
    const next: Room = {
      ...room,
      epics: room.epics.map((epic) => ({ ...epic, title: "Typed title" })),
    };
    owner.sync(next, request);
    view.update({ ...props, room: next });
    await closed("dialog");
    target
      .querySelector<HTMLButtonElement>('[aria-label="Arquivar épico"]')!
      .click();
    await tick();
    expect(commands.at(-1)).toEqual({
      t: "epic.archive",
      id: "e",
      archived: true,
    });
  }, 30_000);
  test("suggestion accept sends displayed snapshot only, handles server refusal and stale room controls", async () => {
    const room: Room = {
        ...fixture(),
        suggestions: [
          { title: "<script>safe</script>", why: "Why", tasks: ["One"] },
        ],
      },
      owner = createRoomMutations(room.me, room.id),
      commands: RoomCommand[] = [],
      response = deferredMutationOutcome();
    peopleCleanups.push(() => owner.dispose());
    const request = (command: RoomCommand) => {
      commands.push(command);
      return response.promise;
    };
    owner.sync(room, request);
    const target = document.createElement("div");
    document.body.append(target);
    const props: import("../svelte/features/room-sidebar/types").SuggestionPreviewProps =
      {
        room,
        index: 0,
        owner,
        vb: {
          t: vb.t,
          name: vb.name,
          ago: vb.ago,
          hhmm: () => "09:00",
          waiting: () => false,
        },
      };
    const view = mountView("suggestionPreview", target, props);
    active.push(view);
    expect(target.querySelector("script")).toBeNull();
    expect(target.textContent).toContain("<script>safe</script>");
    const accept = [...target.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("Pedir pro meu agent"),
    )!;
    accept.click();
    accept.click();
    await tick();
    expect(commands).toEqual([
      { t: "suggestion", i: 0, accept: true, expected: room.suggestions[0] },
    ]);
    response.resolve({ ok: false, error: "suggestion changed" });
    await tick();
    await tick();
    flushSync();
    expect(target.querySelector("[role=alert]") !== null).toBe(true);
    const at = active.indexOf(view);
    active.splice(at, 1);
    view.destroy();
    accept.click();
    await tick();
    expect(commands).toHaveLength(1);
  }, 30_000);
});

describe("native collapsed sidebar and typed presence", () => {
  test("collapsed create expands and focuses retained draft; partial sandbox presence stays native", async () => {
    const room = fixture(),
      target = document.createElement("div");
    document.body.append(target);
    let expanded = 0,
      agentsOpened = 0;
    const props: SidebarProps = {
      room,
      thread: "main",
      collapsed: true,
      roomTint: "purple",
      navigation: createNavigationSession(room.id),
      pins: syncPinsSession(null, room),
      request: async () => ({ ok: false, error: "offline" }),
      send: () => false,
      onopen: () => {},
      onarchchange: () => {},
      onopenpinfile: () => {},
      onopenpinapp: () => {},
      ontogglerail: () => {
        expanded++;
      },
      onagents: () => {
        agentsOpened++;
      },
      vb: {
        t: vb.t,
        name: vb.name,
        ago: vb.ago,
        epicBusy: () => null,
        waitsIn: () => [],
      },
      presence: {
        agents: [
          {
            email: room.me,
            who: "Codex",
            repo: null,
            listening: true,
            all_rooms: true,
            seen_at: 1,
            context: { tokens: 90, window: 100, at: 1, limits: null },
          },
        ],
        sandboxes: [
          {
            id: "sandbox-one",
            email: room.me,
            name: null,
            state: "running",
            run_s: 1,
            rate: 1,
            disk_rate: 0,
            created_at: Date.now(),
            checked_at: Date.now(),
          },
        ],
      },
    };
    props.navigation.state.update((value) => ({
      ...value,
      draft: "Retained native draft",
    }));
    const view = mountView("sidebar", target, props);
    active.push(view);
    target
      .querySelector<HTMLButtonElement>('[aria-label="Novo épico"]')!
      .click();
    expect(expanded).toBe(1);
    view.update({ ...props, collapsed: false });
    await tick();
    flushSync();
    const input = target.querySelector<HTMLInputElement>("#newEpic input")!;
    expect(input.value).toBe("Retained native draft");
    expect(document.activeElement === input).toBe(true);
    expect(
      target.querySelector("[data-agent-presence]")?.textContent,
    ).toContain("90%");
    const sandbox = [...target.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("sandbox"),
    )!;
    sandbox.click();
    expect(agentsOpened).toBe(1);
    expect(target.querySelector("[data-legacy-chat-content]") === null).toBe(
      true,
    );
  }, 30_000);
});
