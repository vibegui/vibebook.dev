import { writable } from "svelte/store";
import { createRoomLayoutBrowser } from "./browser";
import { createRoomSheetHistory } from "./history";
import { createRoomGeometry, type RoomGeometry } from "./geometry";
import type { RoomLayoutController, RoomLayoutOptions, RoomLayoutState, RoomLayoutCells, RoomSheet } from "./types";
export type { RoomLayoutController, RoomLayoutOptions, RoomLayoutState, RoomLayoutCells } from "./types";

export function createRoomLayout(options: RoomLayoutOptions): RoomLayoutController {
  const browser = options.browser ?? createRoomLayoutBrowser(window);
  const scopeKey = options.scopeKey;
  let active = true, geometry: RoomGeometry | null = null, mountRevision = 0;
  let viewer: { deferNavigation(callback: () => void): boolean } | null = null;
  let value: RoomLayoutState = {
    pane: "doc", sheet: null, boardFull: false, documentVisible: true,
    sidebarCollapsed: options.sidebarCollapsed ?? false, mobile: false,
    closingUnconfirmed: false, presentedSheet: null, draggingSheet: null,
    documentWidth: 380, documentMaximum: 380, resizing: false, active: true, animationUnavailable: false,
  };
  const state = writable(value), handles = new Map<HTMLElement, { sheet: RoomSheet; opening: boolean; stop: (() => void) | null }>(), inputs = new Map<HTMLInputElement, { stop: (() => void) | null }>();
  const current = () => active && options.scopeKey === scopeKey && options.current();
  const publish = (patch: Partial<RoomLayoutState>) => {
    value = { ...value, ...patch }; state.set(value);
  };
  const history = createRoomSheetHistory({
    browser, current,
    changed(sheet) {
      if (!active) return;
      const closed = value.sheet !== null && sheet === null;
      publish({ sheet });
      if (closed && current()) options.onDocumentClosed();
      geometry?.sync(value);
    },
    unconfirmed: closingUnconfirmed => { if (active) publish({ closingUnconfirmed }); },
  });
  const intent = (callback: () => void) => {
    if (!current()) return;
    const owned = () => { if (current()) callback(); };
    if (viewer?.deferNavigation(owned) || history.deferNavigation(owned)) return;
    owned();
  };
  const pane = (next: RoomLayoutState["pane"]) => {
    const changed = value.pane !== next;
    publish({ pane: next, documentVisible: true });
    geometry?.sync(value);
    if (changed && current()) options.onPane?.(next);
  };
  const stopMount = () => {
    mountRevision++;
    for (const entry of handles.values()) { entry.stop?.(); entry.stop = null; }
    for (const entry of inputs.values()) { entry.stop?.(); entry.stop = null; }
    geometry?.dispose(); geometry = null;
  };
  const controller: RoomLayoutController = {
    state, read: () => value,
    setPane(next, flags = {}) {
      intent(() => {
        const toggle = flags.toggle && value.mobile && value.sheet === "doc" && value.pane === next;
        if (next === "board" || (value.mobile && flags.open)) publish({ boardFull: false });
        pane(next);
        if (value.mobile && flags.open) { if (toggle) history.close(); else history.open("doc"); }
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
        if (value.mobile) { if (value.sheet === "doc") history.close(); else { publish({ documentVisible: true, boardFull: false }); history.open("doc"); } }
        else { publish({ documentVisible: !value.documentVisible }); geometry?.sync(value); }
      });
    },
    toggleSidebar() { intent(() => { publish({ sidebarCollapsed: !value.sidebarCollapsed }); geometry?.sync(value); }); },
    openSheet(which) { intent(() => { if (value.mobile && value.sheet !== which) { if (which === "doc") publish({ documentVisible: true, boardFull: false }); history.open(which); } }); },
    closeSheet(pick = false) { intent(() => { if (pick) history.take(); else history.close(); }); },
    takeSheetEntry() { return current() ? history.take() : false; },
    beforeNavigation() { history.beforeNavigation(); geometry?.cancelGestures(); },
    consumePop: history.consumePop,
    deferNavigation: history.deferNavigation,
    retryHistory() { if (current()) history.retry(); },
    setViewerGate(gate) { viewer = gate; return () => { if (viewer === gate) viewer = null; }; },
    bindHandle(node, sheet, opening) {
      handles.get(node)?.stop?.();
      const entry = { sheet, opening, stop: geometry?.bindHandle(node, sheet, opening) ?? null };
      handles.set(node, entry);
      return () => { if (handles.get(node) === entry) { entry.stop?.(); handles.delete(node); } };
    },
    bindWidthInput(node) {
      inputs.get(node)?.stop?.();
      const entry = { stop: geometry?.bindWidthInput(node) ?? null }; inputs.set(node, entry);
      return () => { if (inputs.get(node) === entry) { entry.stop?.(); inputs.delete(node); } };
    },
    mount(cells) {
      if (!current()) return () => {};
      stopMount();
      const ticket = mountRevision;
      geometry = createRoomGeometry({ cells, current, browser, read: () => value,
        changed: patch => { if (active && mountRevision === ticket) publish(patch); },
        settled: (which, open) => { if (current()) intent(() => { if (open) history.open(which); else history.close(); }); },
        mobile(mobile) {
          if (!current() || value.mobile === mobile) return;
          const wasMobile = value.mobile;
          publish({ mobile });
          if (!mobile && wasMobile) {
            history.beforeNavigation();
            if (value.boardFull) { publish({ boardFull: false }); pane("board"); }
          }
        },
      });
      for (const [node, entry] of handles) entry.stop = geometry.bindHandle(node, entry.sheet, entry.opening);
      for (const [node, entry] of inputs) entry.stop = geometry.bindWidthInput(node);
      geometry.sync(value);
      return () => { if (mountRevision === ticket) stopMount(); };
    },
    dispose() {
      if (!active) return;
      active = false; viewer = null; history.dispose(); stopMount(); handles.clear(); inputs.clear();
      publish({ active: false, sheet: null, presentedSheet: null, draggingSheet: null, closingUnconfirmed: false, resizing: false });
    },
  };
  return controller;
}
