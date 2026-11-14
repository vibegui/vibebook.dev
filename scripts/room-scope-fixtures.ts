import { get, writable } from "svelte/store";
import type { Room, RoomEvent } from "../shared/room";
import { createRoomScope } from "../svelte/features/room-scope/controller";
import { createRoomResources } from "../svelte/features/application/roomResources";
import type { RoomLayoutController, RoomLayoutState } from "../svelte/features/room-layout/types";
import { shellFixture } from "./application-shell-fixtures";
import { settle } from "./native-home-fixtures";

/** Unit transport/geometry fixtures. These exercise actual feature owners;
 * synthetic canonical frames here are not a browser/server acceptance claim. */
export async function roomScopeFixture() {
  const app = shellFixture(), resources = createRoomResources();
  app.services.start(); await settle();
  app.services.actions.navigate({ roomId: "aaaaaa" });
  const room: Room = { id: "aaaaaa", me: "me@test.com", book: { title: "Room", owner: "me@test.com" }, members: ["me@test.com"], epics: [{ id: "other", title: "Other", tasks: [] }], messages: [{ id: 1, thread: "other", author: "me@test.com", ts: 1, text: "Original" }], suggestions: [], typing: {}, online: [], files: [], filesAll: true };
  const frame = (value: Room): RoomEvent => { const { id: _id, typing: _typing, ...state } = value; return { t: "state", ...state }; };
  const publish = (value = room) => app.connectionCallbacks.at(-1)!.onEvent(frame(value));
  publish();
  const state = writable<RoomLayoutState>({ pane: "doc", sheet: null, boardFull: false, documentVisible: false, sidebarCollapsed: false, mobile: false, closingUnconfirmed: false, presentedSheet: null, draggingSheet: null, documentWidth: 380, documentMaximum: 800, resizing: false, active: true, animationUnavailable: false });
  let holding = false, queued: (() => void) | undefined;
  const layout: RoomLayoutController = {
    state, read: () => get(state), setPane: pane => state.update(before => ({ ...before, pane })),
    toggleDocument: () => state.update(before => ({ ...before, documentVisible: !before.documentVisible })),
    toggleBoard() {}, toggleSidebar() {}, openSheet() {}, closeSheet() {}, takeSheetEntry: () => false,
    beforeNavigation() {}, consumePop: () => false,
    deferNavigation: callback => { if (!holding) return false; queued = callback; return true; }, retryHistory() {},
    mount: () => () => {}, bindHandle: () => () => {}, bindWidthInput: () => () => {}, setViewerGate: () => () => {}, dispose() {},
  };
  const requests: string[] = [];
  let nextTimer = 0, ignoreCancel = false;
  const timers = new Map<number, unknown>();
  const owner = createRoomScope({ services: app.services, resources, layout, browser: {
    origin: "https://vibebook.test", href: app.href, historyState: () => null,
    history: { pushState() {}, replaceState() {}, back() {} }, storage: null,
    fetcher: async input => { requests.push(String(input)); return new Response(JSON.stringify({ connections: [] }), { headers: { "content-type": "application/json" } }); },
    visible: () => true, listenVisibility: () => () => {}, iosStandalone: false, openExternal() {}, awarenessColor: () => "#112233",
    clock: { schedule(callback, ms) { const id = ++nextTimer; timers.set(id, app.timer.clock.schedule(() => { timers.delete(id); callback(); }, ms)); return id; }, cancel(handle) { if (!ignoreCancel && typeof handle === "number" && timers.has(handle)) { app.timer.clock.cancel(timers.get(handle)); timers.delete(handle); } } }, enqueue: callback => callback(),
  } });
  return { app, owner, resources, requests, publish, room,
    ignoreTimerCancellation() { ignoreCancel = true; },
    serverEvent(event: RoomEvent) { app.connectionCallbacks.at(-1)!.onEvent(event); },
    hold() { holding = true; }, release() { holding = false; const callback = queued; queued = undefined; callback?.(); },
    dispose() { owner.dispose(); app.services.dispose(); resources.dispose(); },
  };
}

