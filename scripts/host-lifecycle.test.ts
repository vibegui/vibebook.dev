import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { Window } from "happy-dom";
import { get } from "svelte/store";
import { createFilesSession } from "../svelte/features/files/session";
import {
  createPinsSession,
  disposePinsSession,
} from "../svelte/features/pins/session";
import { createDocumentDrafts } from "../svelte/features/documents/session";

// Editor lifecycle is covered directly by native-documents.test.ts; no source extraction of retired builders.
const source = readFileSync(
  new URL("../svelte/legacy/host.js", import.meta.url),
  "utf8",
);

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
    createDocumentDrafts,
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

// The retired editor cases are tested directly in native-documents.test.ts.
// Preserve their independent Files/Pins/layout host cleanup assertions here.
test("room cleanup disposes native owners and layout exactly once", () => {
  const pins = createPinsSession("aaaaaa");
  const files = createFilesSession("aaaaaa");
  files.select("txt", "docs");
  let documents = 0;
  let layouts = 0;
  const views = new Map([["chat", {}]]);
  const cleanup = source.slice(
    source.indexOf("function clearViews()"),
    source.indexOf("const panelBridge"),
  );
  const run = Function(
    "files",
    "pins",
    "disposePinsSession",
    "documentOwner",
    "layoutCleanup",
    "viewMounts",
    "disposeView",
    "disposePwaMounts",
    "pinRO",
    `let nativeFilesSession = files, sidePins = pins, sideNavigation = null, nativeRoomMutations = null;
     let nativeDocumentOwner = documentOwner, nativeDocumentSetPane = null;
     let boardLayoutCleanup = layoutCleanup;
     ${cleanup}
     return clearViews;`,
  )(
    files,
    pins,
    disposePinsSession,
    { dispose: () => documents++ },
    () => layouts++,
    views,
    (key: string) => views.delete(key),
    () => {},
    { disconnect() {} },
  );
  run();
  run();
  expect(pins.active).toBe(false);
  files.select("img", "");
  expect(get(files.state).kind).toBe("txt");
  expect(documents).toBe(1);
  expect(layouts).toBe(1);
  expect(views.size).toBe(0);
});
