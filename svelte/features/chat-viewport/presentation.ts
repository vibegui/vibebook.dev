import type { ChatViewport, KeepChat, ScrollCapture } from "./controller";

/** Retain visible geometry across CSS-hidden Board placement. Hidden renders
 * still carry bottom/prepend intent, but cannot overwrite an owned anchor. */
export function createChatPresentation(viewport: Pick<ChatViewport, "capture" | "afterRender">) {
  let before: ScrollCapture | null = null, keep: KeepChat = "stay", suspended = false;
  return {
    capture(nextKeep: KeepChat, visible: boolean) {
      const measured = viewport.capture();
      if (!suspended && measured) { before = measured; keep = nextKeep; }
      else {
        if (!before && measured) before = measured;
        if (nextKeep !== "stay") keep = nextKeep;
      }
      suspended = !visible || !measured;
    },
    rendered(visible: boolean) {
      if (!visible) return false;
      const measured = viewport.capture();
      if (!measured) return false;
      // A fresh canonical snapshot may advance the viewport token while the
      // same thread is hidden. A thread/room change explicitly resets below.
      const anchor = before ? { ...before, scope: measured.scope } : measured;
      viewport.afterRender(keep, anchor);
      before = viewport.capture(); suspended = false;
      return true;
    },
    reset() { before = null; keep = "stay"; suspended = false; },
  };
}
