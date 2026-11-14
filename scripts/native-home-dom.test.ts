// Component-level Happy DOM fixtures only. No Worker, real browser, auth or room is represented.
import { afterEach, expect, test } from "bun:test";
import { plugin } from "bun";
import { readFileSync } from "node:fs";
import { compile, compileModule } from "svelte/compiler";
import { Window } from "happy-dom";
import { get } from "svelte/store";
import { createPersonalSession } from "../svelte/features/home/personal";
import { createRoomsSession } from "../svelte/features/rooms/session";
import { createNewRoomSession } from "../svelte/features/home/session";
import { createAccountSession } from "../svelte/features/account/session";
import type { AccountApi } from "../svelte/features/account/api";
import type { RoomTarget } from "../svelte/features/home/model";
import { createPwaService } from "../svelte/features/pwa/service";
import {
  deferred,
  homeApi,
  manualClock,
  me,
  room,
  settle,
  suggestion,
} from "./native-home-fixtures";
const environment = new Window({ url: "https://vibebook.test/app?ui=svelte" });
for (const name of [
  "window",
  "document",
  "navigator",
  "location",
  "Notification",
  "localStorage",
  "StorageEvent",
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
  "matchMedia",
  "requestAnimationFrame",
  "cancelAnimationFrame",
]) {
  const value =
    name === "window" ? environment : Reflect.get(environment, name);
  Object.defineProperty(globalThis, name, {
    value:
      typeof value === "function" &&
      [
        "getComputedStyle",
        "matchMedia",
        "requestAnimationFrame",
        "cancelAnimationFrame",
      ].includes(name)
        ? value.bind(environment)
        : value,
    configurable: true,
    writable: true,
  });
}
plugin({
  name: "native-home-components",
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
const { mount, unmount, flushSync, tick } = await import("svelte");
const { default: Home } =
  await import("../svelte/features/home/HomePanel.svelte");
const { default: AppNavigation } =
  await import("../svelte/features/app-navigation/AppNavigation.svelte");
const { default: NavigationDialogs } =
  await import("../svelte/features/app-navigation/AppNavigationDialogs.svelte");
const { default: RoomTile } =
  await import("../svelte/features/home/RoomTile.svelte");
const { default: ApplicationShellHarness } =
  await import("./application-shell-harness.svelte");
const { shellFixture } = await import("./application-shell-fixtures");
const { default: RoomShellHarness } =
  await import("./room-shell-harness.svelte");
const { createRoomResources } =
  await import("../svelte/features/application/roomResources");
import type { Room, RoomEvent } from "../shared/room";
import type { RoomScopeBrowser } from "../svelte/features/room-scope/types";
import type { RoomLayoutBrowser } from "../svelte/features/room-layout/types";
const cleanups: (() => void)[] = [];
afterEach(() => {
  for (const dispose of cleanups.splice(0).reverse()) dispose();
  document.body.replaceChildren();
  localStorage.clear();
});
const flush = async () => {
  await settle();
  flushSync();
  await tick();
};
// An actual lazy module can require a compiler/import task beyond tick(). Wait
// for the real feature node, never treat its loading placeholder as readiness.
const waitForView = async (root: ParentNode, selector: string) => {
  const deadline = Date.now() + 4_000;
  while (!root.querySelector(selector) && Date.now() < deadline) {
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    await flush();
  }
  expect(root.querySelector(selector)).not.toBeNull();
};
test("direct application shell renders native Home/Archive and the required room snippet, then releases document owners", async () => {
  const h = shellFixture(),
    target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(ApplicationShellHarness, {
      target,
      props: { services: h.services, effects: h.effects },
    }),
  );
  await flush();
  expect(target.querySelector("[data-native-app-shell]") !== null).toBe(true);
  expect(h.services.active()).toBe(true);
  expect(h.languages).toEqual(["document:en"]);
  await waitForView(target, "[data-native-app-navigation]");
  const navigation = target.querySelector("[data-native-app-navigation]");
  expect(navigation).not.toBeNull();
  h.services.actions.archived();
  await flush();
  await waitForView(target, '[data-vb-native="archived"]');
  expect(target.querySelector('[data-vb-native="archived"]') !== null).toBe(
    true,
  );
  h.services.actions.navigate({ roomId: "aaaaaa" });
  await flush();
  expect(target.querySelector("[data-test-room-snippet]") !== null).toBe(true);
  expect(target.querySelector("[data-native-app-navigation]")).toBe(navigation);
  expect(
    target.querySelector(
      "[data-native-application-route] [data-test-room-snippet]",
    ),
  ).not.toBeNull();
  h.services.actions.home();
  await flush();
  await waitForView(target, '[data-vb-native="home"]');
  expect(target.querySelector("[data-native-app-navigation]")).toBe(navigation);
  flushSync(() => {
    void unmount(component);
  });
  await flush();
  expect(h.services.active()).toBe(false);
  expect(h.stopped).toContain("theme");
  expect(h.stopped).toContain("navigation");
  expect(h.stopped).toContain("pop");
});
test("direct Account composition preserves native profile confirmation and supplies real notification/agent snippets", async () => {
  const h = shellFixture(),
    target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(ApplicationShellHarness, {
      target,
      props: { services: h.services, effects: h.effects },
    }),
  );
  cleanups.push(() =>
    flushSync(() => {
      void unmount(component);
    }),
  );
  await flush();
  h.services.actions.openAccount("profile");
  await flush();
  await waitForView(document, "#account-name");
  const name = document.querySelector<HTMLInputElement>("#account-name")!;
  expect(name !== null).toBe(true);
  name.value = "Native Shell Name";
  name.dispatchEvent(new Event("input", { bubbles: true }));
  name
    .closest("form")!
    .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await flush();
  expect(h.names).toEqual(["Native Shell Name"]);
  expect(get(h.services.account.state).phase).toBe("confirming");
  h.canonical(me({ name: "Native Shell Name" }));
  await h.services.personal.refresh();
  await flush();
  expect(get(h.services.account.state).phase).toBe("idle");
  h.services.actions.openAccount("all");
  await flush();
  expect(document.querySelector("[data-native-notifications]") !== null).toBe(
    true,
  );
  expect(document.querySelector("[data-native-agent-setup]") !== null).toBe(
    true,
  );
});
test("connected old creator controls cannot edit or submit a replacement opening before DOM flush", async () => {
  let creates = 0;
  const h = shellFixture({
      startRoom: async () => {
        creates++;
        return { id: "bbbbbb", unknown: [], invited: [], cost: 0 };
      },
    }),
    target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(ApplicationShellHarness, {
      target,
      props: { services: h.services, effects: h.effects },
    }),
  );
  cleanups.push(() =>
    flushSync(() => {
      void unmount(component);
    }),
  );
  await flush();
  const creator = h.services.navigation.creator;
  creator.open();
  creator.edit("Preserved new draft");
  await flush();
  await waitForView(document, "#native-new-room");
  const oldInput =
      document.querySelector<HTMLTextAreaElement>("#native-new-room")!,
    oldForm = oldInput.closest("form")!;
  creator.close();
  creator.open();
  expect(oldForm.isConnected).toBe(true);
  oldInput.value = "Stale outgoing draft";
  oldInput.dispatchEvent(new Event("input", { bubbles: true }));
  oldForm.dispatchEvent(
    new Event("submit", { bubbles: true, cancelable: true }),
  );
  expect(get(h.services.personal.draft).create).toBe("Preserved new draft");
  expect(creates).toBe(0);
  await flush();
  const fresh =
    document.querySelector<HTMLTextAreaElement>("#native-new-room")!;
  expect(fresh.value).toBe("Preserved new draft");
  fresh
    .closest("form")!
    .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await flush();
  expect(creates).toBe(1);
  expect(h.href()).toContain("/b/bbbbbb");
});
test("global Inbox direct callbacks reject old connected account controls and close on identity replacement", async () => {
  let resolves = 0;
  const wait = {
    book_id: "aaaaaa",
    room: "Room",
    ref: "m1",
    thread: "main",
    topic: null,
    author: "friend@test",
    author_name: "Friend",
    text: "Question",
    ts: 1,
  };
  const h = shellFixture({
    resolve: async () => {
      resolves++;
      return { ok: true };
    },
  });
  h.canonical(me({ waits: [wait] }));
  const target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(ApplicationShellHarness, {
      target,
      props: { services: h.services, effects: h.effects },
    }),
  );
  cleanups.push(() =>
    flushSync(() => {
      void unmount(component);
    }),
  );
  await flush();
  h.services.actions.navigate({ roomId: "aaaaaa" });
  await flush();
  const open = [...target.querySelectorAll<HTMLButtonElement>("button")].find(
    (button) => button.textContent?.trim() === "Open fixture inbox",
  )!;
  expect(open !== undefined).toBe(true);
  open.click();
  await flush();
  await waitForView(document, '[role="dialog"] a');
  const link = [
    ...document.querySelectorAll<HTMLAnchorElement>('[role="dialog"] a'),
  ].find((anchor) => anchor.textContent?.includes("Question"))!;
  expect(link !== undefined).toBe(true);
  const resolveLabel = h.services.t(
    "Já resolvi (respondi em outro lugar, ou não é comigo)",
  );
  const resolve = [
    ...document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button'),
  ].find((button) => button.getAttribute("aria-label") === resolveLabel)!;
  expect(resolve !== undefined).toBe(true);
  h.canonical(me({ email: "other@test", waits: [wait] }));
  await h.services.personal.refresh();
  const before = h.href();
  link.dispatchEvent(
    new MouseEvent("click", { button: 0, bubbles: true, cancelable: true }),
  );
  resolve.click();
  expect(h.href()).toBe(before);
  expect(resolves).toBe(0);
  await flush();
  expect(document.querySelector('[role="dialog"]')).toBe(null);
});
async function actualRoomShell() {
  const h = shellFixture(),
    resources = createRoomResources();
  h.services.start();
  await settle();
  h.services.actions.navigate({ roomId: "aaaaaa" });
  const browser: RoomScopeBrowser = {
    origin: "https://vibebook.test",
    href: h.href,
    historyState: () => window.history.state,
    history: window.history,
    storage: localStorage,
    fetcher: async () =>
      new Response(JSON.stringify({ connections: [] }), {
        headers: { "content-type": "application/json" },
      }),
    iosStandalone: false,
    visible: () => true,
    listenVisibility: () => () => {},
    openExternal: () => {},
    awarenessColor: () => "#112233",
    enqueue: queueMicrotask,
  };
  const layoutBrowser: RoomLayoutBrowser = {
    href: h.href,
    state: () => window.history.state,
    history: window.history,
    storage: localStorage,
    schedule: h.timer.clock.schedule,
    cancel: h.timer.clock.cancel,
    enqueue: queueMicrotask,
  };
  const target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(RoomShellHarness, {
      target,
      props: {
        presentation: { services: h.services, openInbox() {} },
        resources,
        browser,
        layoutBrowser,
      },
    }),
  );
  cleanups.push(() => {
    flushSync(() => {
      void unmount(component);
    });
    h.services.dispose();
    resources.dispose();
  });
  const canonical: Room = {
    id: "aaaaaa",
    me: "me@test.com",
    book: { title: "Real native composition", owner: "me@test.com" },
    members: ["me@test.com"],
    online: [],
    typing: {},
    suggestions: [],
    doc: "# Canonical document",
    messages: [
      {
        id: 1,
        thread: "main",
        author: "me@test.com",
        text: "Canonical visible message",
        ts: 1,
      },
    ],
    epics: [
      {
        id: "e",
        title: "Canonical epic",
        tasks: [
          {
            id: "t1",
            title: "Canonical task",
            done: false,
            status: "todo",
            owner: "me@test.com",
          },
        ],
      },
    ],
  };
  const publish = (value: Room) => {
    const { id: _id, typing: _typing, ...state } = value;
    const event: RoomEvent = { t: "state", ...state };
    h.connectionCallbacks.at(-1)!.onEvent(event);
  };
  return { ...h, resources, target, canonical, publish };
}
test("real RoomShell uses genuine loading/terminal states and directly renders current canonical native features", async () => {
  const h = await actualRoomShell();
  await flush();
  expect(
    h.target.querySelector('[data-native-room-status="loading"]') !== null,
  ).toBe(true);
  expect(h.target.querySelector("[data-native-composer]")).toBe(null);
  h.publish(h.canonical);
  await flush();
  expect(h.target.querySelector("[data-native-room-sidebar]") !== null).toBe(
    true,
  );
  expect(h.target.querySelector("[data-native-room-header]") !== null).toBe(
    true,
  );
  expect(h.target.querySelector("[data-native-composer]") !== null).toBe(true);
  expect(h.target.querySelector("[data-native-document]") !== null).toBe(true);
  expect(h.target.textContent).toContain("Canonical visible message");
  h.connectionCallbacks.at(-1)!.onRemoved?.();
  await flush();
  expect(
    h.target.querySelector('[data-native-room-status="removed"]') !== null,
  ).toBe(true);
  expect(h.target.querySelector("[data-native-composer]")).toBe(null);
  expect(h.target.textContent).not.toContain("Canonical visible message");
});
test("real RoomShell retains one Board DOM instance across pane and full-board placements", async () => {
  const h = await actualRoomShell();
  h.publish(h.canonical);
  await flush();
  h.services.actions.selectPane("board");
  await flush();
  await waitForView(h.target, "[data-board-scope]");
  const board = h.target.querySelector("[data-board-scope]");
  expect(board !== null).toBe(true);
  const toggle = h.target.querySelector<HTMLButtonElement>(
    "[data-native-board-toggle]",
  )!;
  expect(toggle !== null).toBe(true);
  toggle.click();
  await flush();
  expect(h.target.querySelector("[data-board-scope]") === board).toBe(true);
  toggle.click();
  await flush();
  h.services.actions.selectPane("doc");
  await flush();
  h.services.actions.selectPane("board");
  await flush();
  expect(h.target.querySelectorAll("[data-board-scope]").length).toBe(1);
  expect(h.target.querySelector("[data-board-scope]") === board).toBe(true);
});
test("real RoomShell revokes connected outgoing Composer controls before a removed frame reaches the DOM", async () => {
  const h = await actualRoomShell();
  h.publish(h.canonical);
  await flush();
  const input = h.target.querySelector<HTMLTextAreaElement>(
      "[data-native-composer] textarea",
    )!,
    form = input.closest("form")!;
  input.value = "An outgoing private draft";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  await flush();
  h.connectionCallbacks.at(-1)!.onRemoved?.();
  expect(form.isConnected).toBe(true);
  const before = h.roomCommands.filter((command) => command.t === "msg").length;
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  expect(h.roomCommands.filter((command) => command.t === "msg").length).toBe(
    before,
  );
  await flush();
  expect(h.target.querySelector("[data-native-composer]")).toBe(null);
});
test("actual RoomStatus preserves removal/invitation guidance and safely returns Home after terminal access loss", async () => {
  for (const terminal of ["removed", "unavailable"] as const) {
    const h = await actualRoomShell();
    h.publish(h.canonical);
    await flush();
    if (terminal === "removed") h.connectionCallbacks.at(-1)!.onRemoved?.();
    else h.connectionCallbacks.at(-1)!.onUnavailable?.();
    await flush();
    const status = h.target.querySelector<HTMLElement>(
      `[data-native-room-status="${terminal}"]`,
    );
    expect(status !== null).toBe(true);
    expect(status?.textContent).toContain(
      h.services.t(
        terminal === "removed"
          ? "Você foi removido deste vibebook."
          : "Sem acesso a este vibebook. Peça para alguém de dentro te convidar.",
      ),
    );
    expect(h.target.textContent).not.toContain("Canonical visible message");
    expect(h.target.querySelector("[data-native-document]")).toBe(null);
    const home = [
      ...status!.querySelectorAll<HTMLButtonElement>("button"),
    ].find(
      (button) => button.textContent?.trim() === h.services.t("seus vibebooks"),
    );
    expect(home !== undefined).toBe(true);
    expect(home?.disabled).toBe(false);
    home!.click();
    expect(get(h.services.state).route.kind).toBe("home");
    expect(h.services.rootRoom.read().room).toBe(null);
  }
});
async function setup(overrides: Parameters<typeof homeApi>[0] = {}) {
  const timer = manualClock(),
    personal = createPersonalSession(homeApi(overrides), {
      clock: timer.clock,
    });
  await personal.refresh();
  const rooms = createRoomsSession(personal, timer.clock),
    pwa = createPwaService(),
    profile = createAccountSession(personal, profileApi, timer.clock),
    creator = createNewRoomSession(personal, () => {}, timer.clock);
  cleanups.push(() => {
    pwa.dispose();
    rooms.dispose();
    profile.dispose();
    creator.dispose();
    personal.dispose();
  });
  return { timer, personal, rooms, pwa, profile, creator };
}
const profileApi: AccountApi = {
  logins: async () => ({
    logins: [],
    providers: { google: false, github: false },
  }),
  name: async (name) => ({ ok: true, name }),
  avatar: async () => ({ ok: true, avatar: 1 }),
  addFriend: async () => ({ ok: true }),
  removeFriend: async () => ({ ok: true }),
};
test("native Home renders untrusted room metadata as text and passes exact room identity", async () => {
  const { personal, rooms, pwa, profile, creator } = await setup({
    me: async () =>
      me({
        books: [
          room("aaaaaa", {
            title: "<img src=x onerror=alert(1)>",
            summary: "<script>evil()</script>",
          }),
        ],
      }),
  });
  const navigation: unknown[] = [],
    target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(Home, {
      target,
      props: {
        pwa,
        personal,
        rooms,
        profile,
        creator,
        onlanguage: () => {},
        lang: "en",
        ago: () => "now",
        onnavigate: (value: RoomTarget) => navigation.push(value),
        onhome: () => {},
        onarchived: () => {},
        onnew: () => {},
        onsettings: () => {},
        onroomsettings: () => {},
        onsearch: () => {},
      },
    }),
  );
  cleanups.push(() =>
    flushSync(() => {
      void unmount(component);
    }),
  );
  await flush();
  expect(target.querySelector("script")).toBe(null);
  expect(target.querySelector("[onerror]")).toBe(null);
  expect(target.textContent).toContain("<img src=x onerror=alert(1)>");
  const anchor = target.querySelector<HTMLAnchorElement>(
    'a[href="/b/aaaaaa?ui=svelte"]',
  )!;
  expect(anchor).not.toBe(null);
  anchor.click();
  expect(navigation).toEqual([{ roomId: "aaaaaa" }]);
  const heading = target.querySelector("h1")!;
  expect(heading.classList.contains("tw:font-sans")).toBe(true);
  expect(
    heading.classList.contains("tw:[font-variation-settings:normal]"),
  ).toBe(true);
});
test("detached native tile link/settings actions cannot navigate after canonical row replacement", async () => {
  const navigation: unknown[] = [],
    settings: unknown[] = [],
    target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(RoomTile, {
      target,
      props: {
        room: room(),
        lang: "en",
        now: 0,
        onnavigate: (value: RoomTarget) => navigation.push(value),
        onsettings: (id: string, trigger: HTMLElement) =>
          settings.push([id, trigger]),
      },
    }),
  );
  const anchor = target.querySelector("a")!,
    button = target.querySelector("button")!;
  flushSync(() => {
    void unmount(component);
  });
  expect(anchor.isConnected).toBe(false);
  anchor.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
  );
  button.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
  );
  expect(navigation).toEqual([]);
  expect(settings).toEqual([]);
});
test("room refresh keeps Home draft/focus, then unmount owns late routing result", async () => {
  const late = deferred<typeof suggestion>();
  let latest = me();
  const { personal, rooms, pwa, profile, creator } = await setup({
    me: async () => latest,
    route: () => late.promise,
  });
  const target = document.createElement("div");
  document.body.append(target);
  const navigation: unknown[] = [],
    component = flushSync(() =>
      mount(Home, {
        target,
        props: {
          pwa,
          personal,
          rooms,
          profile,
          creator,
          onlanguage: () => {},
          lang: "en",
          ago: () => "now",
          onnavigate: (value: RoomTarget) => navigation.push(value),
          onhome: () => {},
          onarchived: () => {},
          onnew: () => {},
          onsettings: () => {},
          onroomsettings: () => {},
          onsearch: () => {},
        },
      }),
    );
  await flush();
  const textarea = target.querySelector<HTMLTextAreaElement>("#home-ask")!;
  textarea.focus();
  textarea.value = "keep my draft";
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  await flush();
  latest = me({ books: [room("aaaaaa", { title: "Updated remotely" })] });
  await personal.refresh();
  await flush();
  expect(target.querySelector("#home-ask")).toBe(textarea);
  expect(document.activeElement).toBe(textarea);
  expect(textarea.value).toBe("keep my draft");
  target
    .querySelector("form")!
    .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await flush();
  flushSync(() => {
    void unmount(component);
  });
  late.resolve(suggestion);
  await flush();
  expect(get(personal.draft).ask).toBe("keep my draft");
  expect(navigation).toEqual([]);
  expect(target.textContent).toBe("");
});
test("canonical ask clearance changes native room count to a task dot without hiding the task", async () => {
  const wait = (ref: string): ReturnType<typeof me>["waits"][number] => ({
    book_id: "aaaaaa",
    room: "Room aaaaaa",
    ref,
    thread: "e",
    topic: "Epic",
    author: "other@test.com",
    author_name: "Other",
    text: "Task remains actionable",
    ts: 1,
  });
  let latest = me({ waits: [wait("m1"), wait("t2")] });
  const { personal, rooms, pwa, profile, creator } = await setup({
    me: async () => latest,
  });
  const target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(Home, {
      target,
      props: {
        pwa,
        personal,
        rooms,
        profile,
        creator,
        lang: "en",
        ago: () => "now",
        onnavigate: () => {},
        onlanguage: () => {},
        onhome: () => {},
        onarchived: () => {},
        onnew: () => {},
        onsettings: () => {},
        onroomsettings: () => {},
        onsearch: () => {},
      },
    }),
  );
  cleanups.push(() =>
    flushSync(() => {
      void unmount(component);
    }),
  );
  await flush();
  const tile = () => target.querySelector('[data-room-id="aaaaaa"]')!;
  expect(
    tile().querySelector('[data-wait-kind="asks"]')?.textContent?.trim(),
  ).toBe("1");
  expect(tile().querySelector('[data-wait-kind="tasks"]')).toBeNull();
  // The server's fresh /api/me result, not an optimistic local msg hook, clears m1.
  latest = me({ waits: [wait("t2")] });
  await personal.refresh();
  await flush();
  expect(tile().querySelector('[data-wait-kind="asks"]')).toBeNull();
  const dot = tile().querySelector('[data-wait-kind="tasks"]')!;
  expect(dot.getAttribute("aria-label")).toBe("A task of yours is pending");
  expect(dot.textContent).toBe("");
  expect(target.textContent).toContain("Task remains actionable");
});
test("actual Home mounts three onboarding steps, preserves drafts across Back and skips into ordinary Home", async () => {
  let canonical = me({ name: "", books: [] });
  const { personal, rooms, pwa, profile, creator } = await setup({
    me: async () => canonical,
  });
  const target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(Home, {
      target,
      props: {
        personal,
        rooms,
        pwa,
        profile,
        creator,
        lang: "en",
        ago: () => "now",
        onnavigate: () => {},
        onlanguage: () => {},
        onhome: () => {},
        onarchived: () => {},
        onnew: () => {},
        onsettings: () => {},
        onroomsettings: () => {},
        onsearch: () => {},
      },
    }),
  );
  cleanups.push(() =>
    flushSync(() => {
      void unmount(component);
    }),
  );
  await flush();
  const click = (label: string) => {
    const button = [...target.querySelectorAll("button")].find(
      (value) => value.textContent?.trim() === label,
    );
    expect(!!button).toBe(true);
    button!.click();
  };
  const step = () =>
    target
      .querySelector("[data-native-onboarding]")
      ?.getAttribute("data-onboarding-step");
  expect(step()).toBe("1");
  expect(target.querySelector('[role="dialog"]')).toBe(null);
  const name = target.querySelector<HTMLInputElement>(
    'input[autocomplete="given-name"]',
  )!;
  name.value = "Ada";
  name.dispatchEvent(new Event("input", { bubbles: true }));
  target
    .querySelector("form")!
    .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await flush();
  expect(step()).toBe("1"); // An HTTP success is not the canonical profile.
  canonical = me({ name: "Ada", books: [] });
  await personal.refresh();
  await flush();
  expect(step()).toBe("2");
  click("Skip for now");
  await flush();
  expect(step()).toBe("3");
  const draft = target.querySelector("textarea")!;
  draft.value = "A careful first room";
  draft.dispatchEvent(new Event("input", { bubbles: true }));
  const composing = new KeyboardEvent("keydown", {
    key: "Enter",
    bubbles: true,
    cancelable: true,
    isComposing: true,
  });
  draft.dispatchEvent(composing);
  await flush();
  expect(get(creator.state).busy).toBe(false);
  click("Back");
  await flush();
  expect(step()).toBe("2");
  click("Skip for now");
  await flush();
  expect(target.querySelector("textarea")!.value).toBe("A careful first room");
  click("Skip and see the home");
  await flush();
  expect(step()).toBe(undefined);
  expect(target.querySelector("#home-ask") === null).toBe(false);
  expect(localStorage.getItem("vb.obDone")).toBe("1");
});

async function pendingNavigation() {
  const h = shellFixture(),
    target = document.createElement("div"),
    trigger = document.createElement("button");
  trigger.textContent = "owned trigger";
  document.body.append(target, trigger);
  h.services.start();
  await h.services.personal.refresh();
  const code = deferred<typeof NavigationDialogs>();
  const component = flushSync(() =>
    mount(AppNavigation, {
      target,
      props: {
        controller: h.services.navigation,
        lang: "en",
        ontheme() {},
        onlanguage() {},
        loadDialogs: () => code.promise,
      },
    }),
  );
  cleanups.push(() => {
    flushSync(() => {
      void unmount(component);
    });
    h.services.dispose();
  });
  trigger.focus();
  return { h, trigger, code, controller: h.services.navigation };
}
function loadingCancel() {
  const status = document.querySelector("[data-deferred-view]");
  expect(status).not.toBeNull();
  const button = [
    ...status!
      .closest('[role="dialog"]')!
      .querySelectorAll<HTMLButtonElement>("button"),
  ].find((button) => button.textContent?.trim() === "Cancel");
  expect(button).toBeDefined();
  return button!;
}
test("cancel loading navigation remains closed when actual dialog code arrives and does not steal focus", async () => {
  const { controller, trigger, code } = await pendingNavigation();
  controller.openSearch(trigger);
  await flush();
  loadingCancel().click();
  await flush();
  expect(get(controller.search.state).open).toBe(false);
  code.resolve(NavigationDialogs);
  await flush();
  expect(document.querySelector('[role="dialog"]')).toBeNull();
  expect(document.activeElement).toBe(trigger);
});
test("old connected loading cancel cannot close a replacement creator and actual fields gain focus", async () => {
  const { controller, trigger, code } = await pendingNavigation();
  controller.openSearch(trigger);
  await flush();
  const old = loadingCancel();
  controller.search.close();
  controller.openCreate(trigger);
  expect(old.isConnected).toBe(true);
  old.click();
  expect(get(controller.creator.state).open).toBe(true);
  code.resolve(NavigationDialogs);
  await flush();
  await waitForView(document, "#native-new-room");
  expect(document.querySelector("[role=combobox]")).toBeNull();
  expect(document.activeElement).toBe(
    document.querySelector("#native-new-room"),
  );
});
test("account switch while navigation code loads drops private intent and cannot focus or reopen it", async () => {
  const { h, controller, trigger, code } = await pendingNavigation();
  controller.openSearch(trigger);
  await flush();
  const old = loadingCancel();
  h.canonical(me({ email: "replacement@example.test" }));
  h.services.personal.acceptIdentity("replacement@example.test");
  expect(old.isConnected).toBe(true);
  old.click();
  expect(get(controller.search.state).open).toBe(false);
  await h.services.personal.refresh();
  controller.openSearch();
  expect(get(controller.search.state).open).toBe(true);
  code.resolve(NavigationDialogs);
  await flush();
  await waitForView(document, '[role="combobox"]');
  expect(get(h.services.personal.state).me?.email).toBe(
    "replacement@example.test",
  );
  expect(
    document.querySelector<HTMLInputElement>('[role="combobox"]')?.value,
  ).toBe("");
  expect(document.activeElement).toBe(
    document.querySelector('[role="combobox"]'),
  );
});
