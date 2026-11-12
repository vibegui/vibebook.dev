import { afterEach, describe, expect, test } from "bun:test";
import { plugin } from "bun";
import { readFileSync } from "node:fs";
import { compile } from "svelte/compiler";
import { Window as HappyDOMWindow } from "happy-dom";
import type { Room } from "../svelte/roomStore";
import type { RoomCommand } from "../shared/commands";
import type { PanelBridge, PanelProps } from "../svelte/panels";

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
  "HTMLMediaElement",
  "HTMLSelectElement",
  "HTMLTextAreaElement",
  "SVGElement",
  "DocumentFragment",
  "Text",
  "Comment",
  "MutationObserver",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "CustomEvent",
  "localStorage",
]) {
  const value = key === "window" ? window : Reflect.get(window, key);
  Object.defineProperty(globalThis, key, {
    value,
    configurable: true,
    writable: true,
  });
}
plugin({
  name: "svelte-panel-tests",
  setup(build) {
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
const { flushSync } = await import("svelte");
const { mountView } = await import("../svelte/main");
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
    change(checkbox);
    const owner = target.querySelector("select")!;
    owner.value = "you@test";
    change(owner);
    target.querySelector<HTMLElement>(".tt")!.click();
    flushSync();
    const edit = target.querySelector<HTMLInputElement>(".tedit")!;
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
    target.querySelector<HTMLElement>(".tt")!.click();
    flushSync();
    update({ ...room });
    expect(
      target.querySelector<HTMLInputElement>("#newTask input")?.value,
    ).toBe("Draft for original epic");
    expect(target.querySelector(".tedit")).not.toBeNull();
    update(room, "other");
    expect(
      target.querySelector<HTMLInputElement>("#newTask input")?.value,
    ).toBe("");
    expect(target.querySelector(".tedit")).toBeNull();
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
  test("board supports keyboard status moves and native list navigation", () => {
    const opened: string[] = [];
    const { target, events } = render("board", fixture(), {
      onopen: (id) => opened.push(id),
    });
    target.querySelector(".kcard")!.dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
      }),
    );
    flushSync();
    expect(events).toEqual([{ t: "task.status", id: "t", status: "doing" }]);
    target.querySelector<HTMLElement>("[data-mode=list]")!.click();
    flushSync();
    target.querySelector<HTMLElement>(".krow")!.click();
    expect(opened).toEqual(["e"]);
  }, 30_000);
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
    expect(calls[0].init?.headers).toEqual({
      "content-type": "text/markdown",
      "x-filename": "reminders%2Fdaily.md",
    });
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
  test("repeated room updates preserve keyed navigation and form drafts", () => {
    let room = fixture();
    const target = window.document.createElement("div");
    window.document.body.append(target);
    type SidebarProps = import("svelte").ComponentProps<
      typeof import("../svelte/Sidebar.svelte").default
    >;
    const sidebarBridge: SidebarProps["vb"] = {
      ...vb,
      bookTitle: () => room.book.title,
      roomMark: () => '<span class="ri"></span>',
      roomStrip: () => "",
      pinsSec: () => "",
      sbxRows: () => "",
      agentRows: () => "",
      epicIco: () => '<span class="ri"></span>',
      epicBusy: () => null,
      waitPill: () => "",
      waitsIn: () => [],
      prodMark: () => "",
    };
    const props: SidebarProps = {
      room,
      thread: "e",
      friends: ["friend@test"],
      vb: sidebarBridge,
    };
    const view = mountView("sidebar", target, props);
    active.push(view);
    const row = target.querySelector("[data-thread=e]");
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
      expect(target.querySelector("[data-thread=e]")).toBe(row);
      expect(target.querySelector("#newEpic input")).toBe(create);
      expect(create.value).toBe("Draft epic title");
      expect(invite.value).toBe("invitee@test");
    }
    expect(target.querySelector("[data-thread=e] .rt")?.textContent).toBe(
      "Epic update 5",
    );
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
