// DOM ownership/identity only. Happy DOM does not prove CSS geometry or browser history.
import { afterEach, expect, test } from "bun:test";
import { plugin } from "bun";
import { readFileSync } from "node:fs";
import { compile, compileModule } from "svelte/compiler";
import { Window } from "happy-dom";
const environment = new Window({
  url: "https://vibebook.test/app?ui=svelte&gallery=1&probe=room-layout",
});
for (const name of [
  "window",
  "document",
  "navigator",
  "location",
  "history",
  "localStorage",
  "Node",
  "Element",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLTextAreaElement",
  "HTMLButtonElement",
  "HTMLAnchorElement",
  "DocumentFragment",
  "Text",
  "Comment",
  "MutationObserver",
  "ResizeObserver",
  "Event",
  "InputEvent",
  "MouseEvent",
  "PointerEvent",
  "KeyboardEvent",
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
    writable: true,
    configurable: true,
  });
}
plugin({
  name: "room-layout-source-components",
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
const { default: Fixture } =
  await import("../svelte/gallery/RoomLayoutFixture.svelte");
let cleanup: (() => Promise<void>) | null = null;
const settle = async () => {
  await Promise.resolve();
  flushSync();
  await tick();
};
afterEach(async () => {
  await cleanup?.();
  cleanup = null;
  document.body.replaceChildren();
  localStorage.removeItem("vb.room-layout-fixture.docW");
});
function button(name: string) {
  const node = [...document.querySelectorAll("button")].find(
    (node) => node.textContent?.trim() === name,
  );
  if (!node) throw Error(`Missing fixture control ${name}`);
  return node;
}
test("Board node, draft and component owner survive full/pane placement and rail updates", async () => {
  const target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() => mount(Fixture, { target }));
  cleanup = async () => {
    await unmount(component);
  };
  await settle();
  const board = target.querySelector("[data-layout-fixture-board]"),
    draft = target.querySelector<HTMLTextAreaElement>(
      "#layout-fixture-board-draft",
    );
  expect(board).not.toBeNull();
  expect(draft).not.toBeNull();
  draft!.value = "Owned Board Unicode 🧪";
  draft!.dispatchEvent(new InputEvent("input", { bubbles: true }));
  await settle();
  button("Board pane").click();
  await settle();
  button("Full Board").click();
  await settle();
  button("Sidebar rail").click();
  await settle();
  button("Board pane").click();
  await settle();
  expect(target.querySelector("[data-layout-fixture-board]")).toBe(board);
  expect(target.querySelector("#layout-fixture-board-draft")).toBe(draft);
  expect(draft!.value).toBe("Owned Board Unicode 🧪");
  expect(target.querySelector("[data-layout-mounts]")?.textContent).toBe("1");
});
test("native range has a real input path; detached/disposed callbacks cannot change geometry owner", async () => {
  const target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() => mount(Fixture, { target }));
  cleanup = async () => {
    await unmount(component);
  };
  await settle();
  const input = target.querySelector<HTMLInputElement>("[data-room-width]");
  expect(input?.type).toBe("range");
  expect(input?.min).toBe("260");
  expect(input?.step).toBe("1");
  if (input) {
    input.value = "260";
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
  }
  await settle();
  expect(localStorage.getItem("vb.room-layout-fixture.docW")).toBe("260");
  button("Dispose layout").click();
  await settle();
  expect(input?.disabled).toBe(true);
  const before = input?.getAttribute("max");
  if (input) {
    input.value = "999";
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    );
  }
  await settle();
  expect(input?.getAttribute("max")).toBe(before);
  expect(localStorage.getItem("vb.room-layout-fixture.docW")).toBe("260");
});
