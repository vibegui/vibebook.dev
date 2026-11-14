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
const { default: RoomTile } =
  await import("../svelte/features/home/RoomTile.svelte");
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
  logins: async () => ({ logins: [], providers: { google: false, github: false } }),
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
  const wait = (ref: string): ReturnType<typeof me>["waits"][number] => ({ book_id: "aaaaaa", room: "Room aaaaaa", ref, thread: "e", topic: "Epic", author: "other@test.com", author_name: "Other", text: "Task remains actionable", ts: 1 });
  let latest = me({ waits: [wait("m1"), wait("t2")] });
  const { personal, rooms, pwa, profile, creator } = await setup({ me: async () => latest });
  const target = document.createElement("div"); document.body.append(target);
  const component = flushSync(() => mount(Home, { target, props: { pwa, personal, rooms, profile, creator, lang: "en", ago: () => "now", onnavigate: () => {}, onlanguage: () => {}, onhome: () => {}, onarchived: () => {}, onnew: () => {}, onsettings: () => {}, onroomsettings: () => {}, onsearch: () => {} } }));
  cleanups.push(() => flushSync(() => { void unmount(component); }));
  await flush();
  const tile = () => target.querySelector('[data-room-id="aaaaaa"]')!;
  expect(tile().querySelector('[data-wait-kind="asks"]')?.textContent?.trim()).toBe("1");
  expect(tile().querySelector('[data-wait-kind="tasks"]')).toBeNull();
  // The server's fresh /api/me result, not an optimistic local msg hook, clears m1.
  latest = me({ waits: [wait("t2")] }); await personal.refresh(); await flush();
  expect(tile().querySelector('[data-wait-kind="asks"]')).toBeNull();
  const dot = tile().querySelector('[data-wait-kind="tasks"]')!;
  expect(dot.getAttribute("aria-label")).toBe("A task of yours is pending");
  expect(dot.textContent).toBe("");
  expect(target.textContent).toContain("Task remains actionable");
});
test("actual Home mounts three onboarding steps, preserves drafts across Back and skips into ordinary Home", async () => {
  let canonical = me({ name: "", books: [] });
  const { personal, rooms, pwa, profile, creator } = await setup({ me: async () => canonical });
  const target = document.createElement("div"); document.body.append(target);
  const component = flushSync(() => mount(Home, { target, props: {
    personal, rooms, pwa, profile, creator, lang: "en", ago: () => "now", onnavigate: () => {},
    onlanguage: () => {}, onhome: () => {}, onarchived: () => {}, onnew: () => {}, onsettings: () => {}, onroomsettings: () => {}, onsearch: () => {},
  } }));
  cleanups.push(() => flushSync(() => { void unmount(component); })); await flush();
  const click = (label: string) => {
    const button = [...target.querySelectorAll("button")].find(value => value.textContent?.trim() === label);
    expect(!!button).toBe(true);
    button!.click();
  };
  const step = () => target.querySelector("[data-native-onboarding]")?.getAttribute("data-onboarding-step");
  expect(step()).toBe("1");
  expect(target.querySelector('[role="dialog"]')).toBe(null);
  const name = target.querySelector<HTMLInputElement>('input[autocomplete="given-name"]')!;
  name.value = "Ada"; name.dispatchEvent(new Event("input", { bubbles: true }));
  target.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); await flush();
  expect(step()).toBe("1"); // An HTTP success is not the canonical profile.
  canonical = me({ name: "Ada", books: [] }); await personal.refresh(); await flush();
  expect(step()).toBe("2");
  click("Skip for now"); await flush();
  expect(step()).toBe("3");
  const draft = target.querySelector("textarea")!;
  draft.value = "A careful first room"; draft.dispatchEvent(new Event("input", { bubbles: true }));
  const composing = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true, isComposing: true }); draft.dispatchEvent(composing); await flush();
  expect(get(creator.state).busy).toBe(false);
  click("Back"); await flush();
  expect(step()).toBe("2");
  click("Skip for now"); await flush();
  expect(target.querySelector("textarea")!.value).toBe("A careful first room");
  click("Skip and see the home"); await flush();
  expect(step()).toBe(undefined); expect(target.querySelector("#home-ask") === null).toBe(false);
  expect(localStorage.getItem("vb.obDone")).toBe("1");
});
