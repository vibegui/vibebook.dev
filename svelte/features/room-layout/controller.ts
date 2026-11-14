import { writable } from "svelte/store";
import { createRoomLayoutBrowser } from "./browser";
import { createRoomSheetHistory } from "./history";
import { createRoomGeometry, type RoomGeometry } from "./geometry";
import type {
  RoomLayoutController,
  RoomLayoutOptions,
  RoomLayoutState,
  RoomLayoutCells,
  RoomSheet,
} from "./types";
export type {
  RoomLayoutController,
  RoomLayoutOptions,
  RoomLayoutState,
  RoomLayoutCells,
} from "./types";

/** A Viewer completion must cross the sheet gate at execution time, not just
 * when the original gesture was queued. Each owner/intent executes at most once. */
export function createRoomLayoutIntents(options: {
  current(): boolean;
  deferSheet(callback: () => void): boolean;
}) {
  type Gate = { deferNavigation(callback: () => void): boolean };
  let active = true,
    revision = 0,
    binding: { gate: Gate } | null = null;
  return {
    run(callback: () => void) {
      if (!active || !options.current()) return;
      const ticket = ++revision;
      let completed = false;
      const valid = () => active && options.current() && ticket === revision;
      const owned = () => {
        if (valid() && !completed) {
          completed = true;
          callback();
        }
      };
      const afterViewer = () => {
        if (!valid() || completed) return;
        if (!options.deferSheet(owned)) owned();
      };
      if (!binding?.gate.deferNavigation(afterViewer)) afterViewer();
    },
    setViewerGate(gate: Gate) {
      if (!active) return () => {};
      revision++;
      const lease = { gate };
      binding = lease;
      return () => {
        if (binding === lease) {
          binding = null;
          revision++;
        }
      };
    },
    invalidate() {
      revision++;
    },
    dispose() {
      active = false;
      revision++;
      binding = null;
    },
  };
}

export function createRoomLayout(
  options: RoomLayoutOptions,
): RoomLayoutController {
  const browser = options.browser ?? createRoomLayoutBrowser(window);
  const scopeKey = options.scopeKey;
  let active = true,
    geometry: RoomGeometry | null = null,
    mountRevision = 0;
  let value: RoomLayoutState = {
    pane: "doc",
    sheet: null,
    boardFull: false,
    documentVisible: true,
    sidebarCollapsed: options.sidebarCollapsed ?? false,
    mobile: false,
    closingUnconfirmed: false,
    presentedSheet: null,
    draggingSheet: null,
    documentWidth: 380,
    documentMaximum: 380,
    resizing: false,
    active: true,
    animationUnavailable: false,
  };
  const state = writable(value),
    handles = new Map<
      HTMLElement,
      { sheet: RoomSheet; opening: boolean; stop: (() => void) | null }
    >(),
    inputs = new Map<HTMLInputElement, { stop: (() => void) | null }>(),
    widths = new Map<HTMLElement, { stop: (() => void) | null }>();
  const current = () =>
    active && options.scopeKey === scopeKey && options.current();
  const publish = (patch: Partial<RoomLayoutState>) => {
    value = { ...value, ...patch };
    state.set(value);
  };
  const history = createRoomSheetHistory({
    browser,
    current,
    changed(sheet) {
      if (!active) return;
      const closed = value.sheet !== null && sheet === null;
      publish({ sheet });
      if (closed && current()) options.onDocumentClosed();
      geometry?.sync(value);
    },
    unconfirmed: (closingUnconfirmed) => {
      if (active) publish({ closingUnconfirmed });
    },
  });
  const intents = createRoomLayoutIntents({
    current,
    deferSheet: history.deferNavigation,
  });
  const intent = intents.run;
  const pane = (next: RoomLayoutState["pane"]) => {
    const changed = value.pane !== next;
    publish({ pane: next, documentVisible: true });
    geometry?.sync(value);
    if (changed && current()) options.onPane?.(next);
  };
  const stopMount = () => {
    for (const entry of widths.values()) {
      entry.stop?.();
      entry.stop = null;
    }
    mountRevision++;
    for (const entry of handles.values()) {
      entry.stop?.();
      entry.stop = null;
    }
    for (const entry of inputs.values()) {
      entry.stop?.();
      entry.stop = null;
    }
    geometry?.dispose();
    geometry = null;
  };
  const controller: RoomLayoutController = {
    state,
    read: () => value,
    setPane(next, flags = {}) {
      intent(() => {
        const toggle =
          flags.toggle &&
          value.mobile &&
          value.sheet === "doc" &&
          value.pane === next;
        if (next === "board" || (value.mobile && flags.open))
          publish({ boardFull: false });
        pane(next);
        if (value.mobile && flags.open) {
          if (toggle) history.close();
          else history.open("doc");
        }
      });
    },
    toggleBoard() {
      intent(() => {
        const boardFull = !value.boardFull;
        publish({ boardFull, documentVisible: !boardFull });
        if (boardFull) history.close();
        geometry?.sync(value);
      });
    },
    toggleDocument() {
      intent(() => {
        if (value.mobile) {
          if (value.sheet === "doc") history.close();
          else {
            publish({ documentVisible: true, boardFull: false });
            history.open("doc");
          }
        } else {
          publish({ documentVisible: !value.documentVisible });
          geometry?.sync(value);
        }
      });
    },
    toggleSidebar() {
      intent(() => {
        publish({ sidebarCollapsed: !value.sidebarCollapsed });
        geometry?.sync(value);
      });
    },
    openSheet(which) {
      intent(() => {
        if (value.mobile && value.sheet !== which) {
          if (which === "doc")
            publish({ documentVisible: true, boardFull: false });
          history.open(which);
        }
      });
    },
    closeSheet(pick = false) {
      intent(() => {
        if (pick) history.take();
        else history.close();
      });
    },
    takeSheetEntry() {
      if (!current()) return false;
      intents.invalidate();
      return history.take();
    },
    beforeNavigation() {
      intents.invalidate();
      history.beforeNavigation();
      geometry?.cancelGestures();
    },
    consumePop: history.consumePop,
    deferNavigation: history.deferNavigation,
    retryHistory() {
      if (current()) history.retry();
    },
    setViewerGate(gate) {
      return intents.setViewerGate(gate);
    },
    bindHandle(node, sheet, opening) {
      if (!active) return () => {};
      handles.get(node)?.stop?.();
      const entry = {
        sheet,
        opening,
        stop: geometry?.bindHandle(node, sheet, opening) ?? null,
      };
      handles.set(node, entry);
      return () => {
        if (handles.get(node) === entry) {
          entry.stop?.();
          handles.delete(node);
        }
      };
    },
    bindWidthInput(node) {
      if (!active) return () => {};
      inputs.get(node)?.stop?.();
      const entry = { stop: geometry?.bindWidthInput(node) ?? null };
      inputs.set(node, entry);
      return () => {
        if (inputs.get(node) === entry) {
          entry.stop?.();
          inputs.delete(node);
        }
      };
    },
    bindDocumentWidth(node) {
      if (!current()) return () => {};
      widths.get(node)?.stop?.();
      const entry = { stop: geometry?.bindDocumentWidth(node) ?? null };
      widths.set(node, entry);
      return () => {
        if (widths.get(node) === entry) {
          entry.stop?.();
          widths.delete(node);
        }
      };
    },
    mount(cells) {
      if (!current()) return () => {};
      stopMount();
      const ticket = mountRevision;
      geometry = createRoomGeometry({
        cells,
        current,
        browser,
        read: () => value,
        changed: (patch) => {
          if (active && mountRevision === ticket) publish(patch);
        },
        settled: (which, open) => {
          if (current())
            intent(() => {
              if (open) history.open(which);
              else history.close();
            });
        },
        mobile(mobile) {
          if (!current() || value.mobile === mobile) return;
          const wasMobile = value.mobile;
          publish({ mobile });
          if (!mobile && wasMobile) {
            history.beforeNavigation();
            if (value.boardFull) {
              publish({ boardFull: false });
              pane("board");
            }
          }
        },
      });
      for (const [node, entry] of handles)
        entry.stop = geometry.bindHandle(node, entry.sheet, entry.opening);
      for (const [node, entry] of inputs)
        entry.stop = geometry.bindWidthInput(node);
      for (const [node, entry] of widths)
        entry.stop = geometry.bindDocumentWidth(node);
      geometry.sync(value);
      return () => {
        if (mountRevision === ticket) stopMount();
      };
    },
    dispose() {
      if (!active) return;
      active = false;
      intents.dispose();
      history.dispose();
      stopMount();
      handles.clear();
      inputs.clear();
      widths.clear();
      publish({
        active: false,
        sheet: null,
        presentedSheet: null,
        draggingSheet: null,
        closingUnconfirmed: false,
        resizing: false,
      });
    },
  };
  return controller;
}
