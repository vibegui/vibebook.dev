// Component-level Happy DOM fixtures only. No Worker, real browser, auth or room is represented.
import { afterEach, expect, test } from "bun:test";
import { plugin } from "bun";
import { readFileSync } from "node:fs";
import { compile } from "svelte/compiler";
import { Window } from "happy-dom";
import { get } from "svelte/store";
import { createPersonalSession } from "../svelte/features/home/personal";
import { createRoomsSession } from "../svelte/features/rooms/session";
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
  "getComputedStyle",
  "matchMedia",
]) {
  const value =
    name === "window" ? environment : Reflect.get(environment, name);
  Object.defineProperty(globalThis, name, {
    value:
      typeof value === "function" &&
      ["getComputedStyle", "matchMedia"].includes(name)
        ? value.bind(environment)
        : value,
    configurable: true,
    writable: true,
  });
}
plugin({
  name: "native-home-components",
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
const { mount, unmount, flushSync, tick } = await import("svelte");
const { default: Home } =
  await import("../svelte/features/home/HomePanel.svelte");
const { default: RoomTile } =
  await import("../svelte/features/home/RoomTile.svelte");
const cleanups: (() => void)[] = [];
afterEach(() => {
  for (const dispose of cleanups.splice(0).reverse()) dispose();
  document.body.replaceChildren();
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
    pwa = createPwaService();
  cleanups.push(() => {
    pwa.dispose();
    rooms.dispose();
    personal.dispose();
  });
  return { timer, personal, rooms, pwa };
}
test("native Home renders untrusted room metadata as text and passes exact room identity", async () => {
  const { personal, rooms, pwa } = await setup({
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
        onsettings: (id: string, trigger: HTMLElement) => settings.push([id, trigger]),
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
  const { personal, rooms, pwa } = await setup({
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
