import type { RoomLayoutBrowser } from "./types";
export function createRoomLayoutBrowser(win: Window): RoomLayoutBrowser {
  let storage: RoomLayoutBrowser["storage"] = null;
  try {
    storage = win.localStorage;
  } catch {
    /* Visible geometry still works. */
  }
  return {
    href: () => win.location.href,
    state: () => win.history.state,
    history: win.history,
    storage,
    schedule: (callback, ms) => win.setTimeout(callback, ms),
    cancel: (handle) =>
      win.clearTimeout(handle as ReturnType<Window["setTimeout"]>),
    enqueue: (callback) => win.queueMicrotask(callback),
  };
}
