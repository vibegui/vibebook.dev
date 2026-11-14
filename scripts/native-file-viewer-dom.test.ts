// Source component tests only: no Worker, browser process, database or OAuth grant is fabricated here.
import { afterEach, expect, test } from "bun:test";
import { plugin } from "bun";
import { readFileSync } from "node:fs";
import { compile, compileModule } from "svelte/compiler";
import { Window } from "happy-dom";
import { get } from "svelte/store";
import type { Room, Attachment } from "../shared/room";
import { createFileViewer } from "../svelte/features/file-viewer/session";
const environment = new Window({
  url: "https://vibebook.test/b/aaaaaa?ui=svelte",
});
// One environment boundary: Svelte sees the same Happy DOM constructors as the mounted DOM nodes.
for (const name of [
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
  "FormData",
  "getComputedStyle",
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
  name: "native-file-viewer-components",
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
const { default: FileViewer } =
  await import("../svelte/features/file-viewer/FileViewer.svelte");
const file = (id: string, ts = 1): Attachment => ({
  id,
  name: "report.md",
  type: "text/markdown",
  size: 2,
  ts,
  author: "a",
});
const room = (files: Attachment[]): Room => ({
  id: "aaaaaa",
  me: "a",
  members: ["a"],
  book: { title: "Room", owner: "a" },
  messages: [],
  epics: [],
  online: [],
  suggestions: [],
  typing: {},
  files,
  filesAll: true,
});
const instances: ReturnType<typeof mount>[] = [];
const owners: ReturnType<typeof createFileViewer>[] = [];
afterEach(() => {
  for (const owner of owners.splice(0)) owner.dispose();
  for (const instance of instances.splice(0))
    flushSync(() => {
      void unmount(instance);
    });
  document.body.replaceChildren();
  window.history.replaceState(null, "", "/b/aaaaaa?ui=svelte");
});
async function settle() {
  for (let i = 0; i < 8; i++) {
    await Promise.resolve();
    flushSync();
    await tick();
  }
  flushSync();
}
async function render(csv?: string) {
  const owner = createFileViewer({
    href: () => location.href,
    state: () => window.history.state,
    history: window.history,
    api: {
      probe: async () => ({ type: "text/plain", size: 2 }),
      text: async (target) => ({
        metadata: { type: "text/plain" },
        text: csv ?? (target.id === "aa" ? "old preview" : "new preview"),
        truncated: false,
      }),
    },
  });
  owners.push(owner);
  const files = [file("aa"), file("bb", 2)];
  if (csv !== undefined)
    for (const file of files) {
      file.name = "report.csv";
      file.type = "text/csv";
    }
  owner.sync(room(files), async () => ({ ok: true }));
  const target = document.createElement("div");
  document.body.append(target);
  instances.push(
    flushSync(() =>
      mount(FileViewer, {
        target,
        props: {
          controller: owner,
          lang: "en",
          actions: { navigate: () => {}, openFile: () => {} },
        },
      }),
    ),
  );
  owner.open({ roomId: "aaaaaa", id: "aa" });
  await settle();
  return owner;
}
test("native viewer renders safe Markdown, changes exact version and disconnects old controls", async () => {
  const owner = await render();
  const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!;
  expect(dialog.textContent).toContain("old preview");
  const oldSelect = dialog.querySelector<HTMLSelectElement>("select")!;
  oldSelect.value = "bb";
  oldSelect.dispatchEvent(new Event("change", { bubbles: true }));
  await settle();
  expect(dialog.textContent).toContain("new preview");
  expect(
    document.querySelector("[data-file-id]")?.getAttribute("data-file-id"),
  ).toBe("bb");
  owner.closeNavigation();
  await settle();
  oldSelect.value = "aa";
  oldSelect.dispatchEvent(new Event("change", { bubbles: true }));
  await settle();
  expect(document.querySelector("[data-file-viewer]")).toBeNull();
});
test("component-only unmount closes the owner and invalidates late media callbacks", async () => {
  const owner = await render();
  const ticket = get(owner.state).content!.operation;
  const instance = instances.pop()!;
  flushSync(() => {
    void unmount(instance);
  });
  await settle();
  owner.mediaError(ticket);
  expect(get(owner.state).open).toBe(false);
  expect(get(owner.state).error).toBe("");
});

test("CSV pagination bounds active cells and reports omitted parsed columns with original link", async () => {
  const csv = Array.from({ length: 45 }, (_, row) =>
    Array.from({ length: 60 }, (_, column) => `${row}:${column}`).join(","),
  ).join("\n");
  await render(csv);
  expect(
    document.querySelectorAll("[data-file-viewer] th, [data-file-viewer] td")
      .length,
  ).toBe(1000);
  expect(document.querySelector("[data-file-viewer]")?.textContent).toContain(
    "Preview shortened",
  );
  const next = [...document.querySelectorAll("[data-file-viewer] button")].find(
    (button) => button.textContent?.trim() === "Next rows",
  );
  expect(next).toBeInstanceOf(HTMLButtonElement);
  if (!(next instanceof HTMLButtonElement))
    throw new Error("CSV next-page control is missing");
  next.click();
  await settle();
  expect(document.querySelector("[data-file-viewer] th")?.textContent).toBe(
    "0:0",
  );
  expect(document.querySelector("[data-file-viewer] td")?.textContent).toBe(
    "20:0",
  );
  expect(
    document.querySelectorAll("[data-file-viewer] th, [data-file-viewer] td")
      .length,
  ).toBe(1000);
  expect(
    document.querySelector('[data-file-viewer] a[target="_blank"]'),
  ).not.toBeNull();
});
