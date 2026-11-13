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

test("view registry releases Tasks anchors and replaces Chat when its Book owner changes", () => {
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
    "let roomConnection=null;" +
      registry +
      ";return {renderView,disposeView,setConnection:value=>roomConnection=value};",
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
  // The old suggestion/header HTML builder was retired by native Sidebar/Doc.
  // Native AST Task behavior belongs to the component cases in ui-panels.test.ts.
  api.disposeView("tasks");
  api.setConnection({});
  api.renderView("chat", target, { title: "Cached room" });
  api.renderView("chat", target, { title: "Same authenticated owner" });
  expect(mounts).toBe(3);
  api.setConnection({});
  api.renderView("chat", target, { title: "Fresh authenticated owner" });
  expect(mounts).toBe(4);
  expect(destroys).toBe(3);
  api.disposeView("chat");
});

// The retired editor cases are tested directly in native-documents.test.ts.
// Preserve their independent Files/Pins/layout host cleanup assertions here.
test("room cleanup disposes native owners and layout exactly once", () => {
  const pins = createPinsSession("aaaaaa");
  const files = createFilesSession("aaaaaa");
  files.select("txt", "docs");
  let documents = 0;
  let layouts = 0,
    appOwners = 0,
    appRequests = 0;
  const views = new Map([
    ["chat", {}],
    ["apps", {}],
  ]);
  const cleanup = source.slice(
    source.indexOf("function clearViews()"),
    source.indexOf("const panelBridge"),
  );
  const appsCleanup = source.slice(
    source.indexOf("function disposeNativeApps()"),
    source.indexOf("function ensureNativeApps()"),
  );
  const run = Function(
    "appsOwner",
    "files",
    "pins",
    "disposePinsSession",
    "documentOwner",
    "layoutCleanup",
    "viewMounts",
    "disposeView",
    "disposePwaMounts",
    "chatViewport",
    "nativeAgents",
    `let nativeApps=appsOwner,nativeAppAuthority=null;
     ${appsCleanup}
     let nativeFilesSession = files, sidePins = pins, sideNavigation = null, nativeRoomMutations = null;
     let nativeDocumentOwner = documentOwner, nativeDocumentSetPane = null;
     let boardLayoutCleanup = layoutCleanup, chatSurfaceElement = null, chatSurface = null, nativeAgentOwner = null;
     ${cleanup}
     return clearViews;`,
  )(
    {
      owner: { dispose: () => appOwners++ },
      requests: { dispose: () => appRequests++ },
    },
    files,
    pins,
    disposePinsSession,
    { dispose: () => documents++ },
    () => layouts++,
    views,
    (key: string) => views.delete(key),
    () => {},
    { reset() {} },
    { detach() {} },
  );
  run();
  run();
  expect(pins.active).toBe(false);
  files.select("img", "");
  expect(get(files.state).kind).toBe("txt");
  expect(documents).toBe(1);
  expect(appOwners).toBe(1);
  expect(appRequests).toBe(1);
  expect(layouts).toBe(1);
  expect(views.size).toBe(0);
});
