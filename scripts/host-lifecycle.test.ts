import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { Window } from "happy-dom";

// The host has browser startup side effects. Execute only its real editor lifecycle
// and cleanup functions, with a deferred module and provider standing in for Yjs.
const source = readFileSync(
  new URL("../svelte/legacy/host.js", import.meta.url),
  "utf8",
);
function harness() {
  const editor = source.slice(
    source.indexOf("let collab ="),
    source.indexOf("const SIDEBAR_ICON"),
  );
  const cleanup = source.slice(
    source.indexOf("function clearViews()"),
    source.indexOf("const panelBridge"),
  );
  const host = { innerHTML: "" };
  const panel = {
    dataset: { view: "edit" },
    classList: { remove() {}, toggle() {} },
  };
  let renders = 0;
  let layoutCleanups = 0;
  const state = {
    id: "a",
    me: "person",
    docs: {} as Record<string, string>,
    doc: "original",
  };
  const api = Function(
    "$app",
    "document",
    "docEpic",
    "isPre",
    "S",
    "name",
    "color",
    "renderDoc",
    "viewMounts",
    "disposeView",
    "pinRO",
    "boardLayoutCleanup",
    editor +
      cleanup +
      `
    return {ensureCollab,clearViews,setLoader(loader){collabLoad=loader;},setRoom(room){S=room;}};
  `,
  )(
    { querySelector: () => panel },
    { getElementById: () => host },
    () => null,
    () => false,
    state,
    (name: string) => name,
    () => "#123456",
    () => renders++,
    new Map(),
    () => {},
    { disconnect() {} },
    () => layoutCleanups++,
  );
  return {
    api,
    state,
    renders: () => renders,
    layoutCleanups: () => layoutCleanups,
  };
}

test("room cleanup invalidates a pending editor import before it can mount", async () => {
  const h = harness();
  let complete!: (module: unknown) => void;
  h.api.setLoader(
    new Promise((resolve) => {
      complete = resolve;
    }),
  );
  let mounts = 0;
  h.api.ensureCollab();
  h.api.clearViews();
  expect(h.layoutCleanups()).toBe(1);
  h.api.clearViews();
  expect(h.layoutCleanups()).toBe(1);
  complete({
    mountCollab() {
      mounts++;
      return { destroy() {} };
    },
  });
  await Promise.resolve();
  await Promise.resolve();
  expect(mounts).toBe(0);
});

test("room cleanup destroys the editor and blocks old provider callbacks into the next room", async () => {
  const h = harness();
  let destroys = 0;
  let callbacks!: {
    onText: (text: string) => void;
    onStatus: (status: string) => void;
  };
  h.api.setLoader(
    Promise.resolve({
      mountCollab(_host: unknown, options: typeof callbacks) {
        callbacks = options;
        return {
          destroy() {
            destroys++;
            callbacks.onStatus("disconnected");
          },
        };
      },
    }),
  );
  h.api.ensureCollab();
  await Promise.resolve();
  callbacks.onText("edited");
  expect(h.state.doc).toBe("edited");
  h.api.clearViews();
  const next = { id: "b", me: "other", doc: "next room", docs: {} };
  h.api.setRoom(next);
  callbacks.onText("stale text");
  callbacks.onStatus("disconnected");
  expect(destroys).toBe(1);
  expect(h.renders()).toBe(0);
  expect(next.doc).toBe("next room");
  h.api.clearViews();
  expect(destroys).toBe(1);
});

test("suggestion view disposal releases Tasks anchors before the host clears its target", () => {
  // A DOM-backed view double isolates the host registry's ownership decisions.
  // Updating a detached old anchor cannot make it visible again.
  const window = new Window();
  const target = window.document.createElement("div");
  window.document.body.append(target);
  const registry = source.slice(
    source.indexOf("const viewMounts ="),
    source.indexOf("function clearViews()"),
  );
  let mounts = 0,
    destroys = 0;
  const ui = {
    mountView(_kind: string, host: typeof target, props: { title: string }) {
      mounts++;
      const anchor = window.document.createElement("div");
      anchor.textContent = props.title;
      host.append(anchor);
      return {
        update(next: { title: string }) {
          anchor.textContent = next.title;
        },
        destroy() {
          destroys++;
          anchor.remove();
        },
      };
    },
  };
  const api = Function(
    "UI",
    registry + ";return {renderView,disposeView};",
  )(ui);
  api.renderView("tasks", target, { title: "Original task" });
  expect(target.textContent).toBe("Original task");
  api.disposeView("tasks");
  target.innerHTML = "";
  api.renderView("tasks", target, { title: "Visible task after suggestion" });
  expect(target.textContent).toBe("Visible task after suggestion");
  expect(mounts).toBe(2);
  expect(destroys).toBe(1);
  api.renderView("tasks", target, { title: "Updated task" });
  expect(target.textContent).toBe("Updated task");
  expect(mounts).toBe(2);
  expect(destroys).toBe(1);
  const suggestion = source.slice(
    source.indexOf("if (preOf()) {"),
    source.indexOf("\n  head.innerHTML = epic"),
  );
  expect(suggestion).toContain('disposeView("tasks");');
  expect(suggestion.indexOf('disposeView("tasks");')).toBeLessThan(
    suggestion.indexOf('el.innerHTML = ""'),
  );
  api.disposeView("tasks");
});
