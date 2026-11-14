// Deferred module/mount ownership only; no browser geometry/network acceptance.
import { afterEach, expect, test } from "bun:test";
import { plugin } from "bun";
import { readFileSync } from "node:fs";
import { compile } from "svelte/compiler";
import { Window } from "happy-dom";
import { writable } from "svelte/store";
const environment = new Window({ url: "http://localhost/" });
for (const name of [
  "window",
  "document",
  "navigator",
  "location",
  "Node",
  "Element",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLTextAreaElement",
  "HTMLButtonElement",
  "DocumentFragment",
  "Text",
  "Comment",
  "MutationObserver",
  "Event",
  "InputEvent",
  "MouseEvent",
  "KeyboardEvent",
  "getComputedStyle",
]) {
  const value =
    name === "window" ? environment : Reflect.get(environment, name);
  Object.defineProperty(globalThis, name, {
    value: name === "getComputedStyle" ? value.bind(environment) : value,
    writable: true,
    configurable: true,
  });
}
plugin({
  name: "deferred-view-owned-source",
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
const { default: Harness } = await import("./deferred-view-harness.svelte"),
  { default: Child } = await import("./deferred-view-fixture.svelte");
let cleanup: (() => Promise<void>) | undefined;
const settle = async () => {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
    flushSync();
    await tick();
  }
};
afterEach(async () => {
  await cleanup?.();
  cleanup = undefined;
  document.body.replaceChildren();
});
function pending() {
  let resolve!: (value: typeof Child) => void;
  const promise = new Promise<typeof Child>((yes) => {
    resolve = yes;
  });
  return { promise, resolve };
}
test("a requested lazy view mounts once and preserves its actual draft/node across hidden panes and parent updates", async () => {
  const state = writable({ requested: false, visible: false, revision: 0 }),
    value = pending();
  let calls = 0,
    mounts = 0,
    destroys = 0;
  const target = document.createElement("div");
  document.body.append(target);
  const instance = flushSync(() =>
    mount(Harness, {
      target,
      props: {
        state,
        load: () => {
          calls++;
          return value.promise;
        },
        current: () => true,
        mounted: () => mounts++,
        destroyed: () => destroys++,
      },
    }),
  );
  cleanup = async () => {
    await unmount(instance);
  };
  await settle();
  expect(calls).toBe(0);
  flushSync(() => state.set({ requested: true, visible: true, revision: 1 }));
  await settle();
  expect(calls).toBe(1);
  expect(target.querySelector("textarea")).toBeNull();
  value.resolve(Child);
  await settle();
  const field = target.querySelector("textarea");
  if (!(field instanceof HTMLTextAreaElement))
    throw Error("Missing real mounted draft field");
  field.value = "Retained user draft";
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.focus();
  flushSync(() => state.set({ requested: true, visible: false, revision: 2 }));
  await settle();
  flushSync(() => state.set({ requested: true, visible: true, revision: 3 }));
  await settle();
  expect(target.querySelector("textarea")).toBe(field);
  expect(field.value).toBe("Retained user draft");
  expect(
    target.querySelector("[data-revision]")?.getAttribute("data-revision"),
  ).toBe("3");
  expect(mounts).toBe(1);
  expect(destroys).toBe(0);
  expect(calls).toBe(1);
});
test("late module resolution after departure cannot mount an old view into its reused target", async () => {
  const state = writable({ requested: true, visible: true, revision: 1 }),
    value = pending();
  let current = true,
    mounts = 0;
  const target = document.createElement("div");
  document.body.append(target);
  const instance = flushSync(() =>
    mount(Harness, {
      target,
      props: {
        state,
        load: () => value.promise,
        current: () => current,
        mounted: () => mounts++,
        destroyed: () => {},
      },
    }),
  );
  await settle();
  current = false;
  await unmount(instance);
  target.textContent = "Replacement account view";
  value.resolve(Child);
  await settle();
  expect(mounts).toBe(0);
  expect(target.textContent).toBe("Replacement account view");
  expect(target.querySelector("textarea")).toBeNull();
});
