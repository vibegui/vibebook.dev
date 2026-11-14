import { clamp, TIMELINE_MS } from "./model";
export type RoomAnimation = "vb-room-sheet" | "vb-room-scrim" | "vb-room-document-width" | "vb-room-document-width-rail" | "vb-room-viewport";
/** Authored presentation remains in the sole Tailwind entry. This owns playback only. */
export function createRoomPlayback(element: HTMLElement, name: () => RoomAnimation, unavailable: () => void) {
  let active = true, sequence = 0, wanted = 0, frame: number | null = null, deadline = 0;
  const find = () => {
    if (!active || !element.isConnected || typeof CSSAnimation === "undefined") return null;
    return element.getAnimations().find((animation): animation is CSSAnimation => animation instanceof CSSAnimation && animation.animationName === name() && animation.effect instanceof KeyframeEffect && animation.effect.target === element) ?? null;
  };
  function cancel() { sequence++; if (frame !== null) cancelAnimationFrame(frame); frame = null; }
  function seek(ticket: number) {
    frame = null;
    if (!active || sequence !== ticket || !element.isConnected) return;
    const animation = find();
    if (animation) { animation.pause(); animation.currentTime = wanted * TIMELINE_MS; return; }
    if (performance.now() >= deadline) { unavailable(); return; }
    frame = requestAnimationFrame(() => seek(ticket));
  }
  return {
    set(progress: number) {
      if (!active || !Number.isFinite(progress)) return;
      wanted = clamp(progress, 0, 1);
      const animation = find();
      if (animation) { cancel(); animation.pause(); animation.currentTime = wanted * TIMELINE_MS; return; }
      if (frame !== null || !element.isConnected) return;
      deadline = performance.now() + 30_000; seek(++sequence);
    },
    suspend: cancel,
    dispose() { active = false; cancel(); },
  };
}
export type RoomPlayback = ReturnType<typeof createRoomPlayback>;
