/** Lifecycle-owned touch gestures. Finite Tailwind steps replace host-authored inline transforms. */
import { fromRoomEdge } from "../room-shell/edgeBack";
export function swipeMessage(
  node: HTMLElement,
  callbacks: { reply: () => void; copy: () => void; enabled?: boolean },
) {
  const phone = node.ownerDocument.defaultView?.matchMedia("(max-width: 900px)");
  let active = true,
    start: { x: number; y: number; dx: number; locked: boolean } | null = null;
  const classes = [
    "tw:translate-x-5",
    "tw:translate-x-10",
    "tw:translate-x-20",
    "tw:-translate-x-5",
    "tw:-translate-x-10",
    "tw:-translate-x-20",
  ];
  const reset = () => {
    node.classList.remove(...classes);
    node.removeAttribute("data-swipe");
  };
  const begin = (event: TouchEvent) => {
    start = null;
    reset();
    const target = event.target;
    if (
      callbacks.enabled === false ||
      !(target instanceof Element) ||
      target.closest(
        "pre,table,iframe,[data-chat-embed],button,a,input,textarea,select",
      ) ||
      event.touches.length !== 1
    )
      return;
    if (fromRoomEdge(event.touches[0].clientX, phone?.matches ?? false)) return;
    start = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
      dx: 0,
      locked: false,
    };
  };
  const move = (event: TouchEvent) => {
    if (!start) return;
    if (event.touches.length !== 1) {
      start = null;
      reset();
      return;
    }
    const dx = event.touches[0].clientX - start.x,
      dy = event.touches[0].clientY - start.y;
    if (!start.locked) {
      if (Math.abs(dy) > 8 && Math.abs(dy) >= Math.abs(dx)) {
        start = null;
        return;
      }
      if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy)) return;
      start.locked = true;
    }
    event.preventDefault();
    start.dx = dx;
    reset();
    const step = Math.abs(dx) > 60 ? 2 : Math.abs(dx) > 30 ? 1 : 0;
    node.classList.add(classes[step + (dx < 0 ? 3 : 0)]);
    node.dataset.swipe = dx > 60 ? "reply" : dx < -60 ? "copy" : "tracking";
  };
  const end = () => {
    const gesture = start;
    start = null;
    reset();
    if (!active || !gesture) return;
    if (gesture.dx > 60) callbacks.reply();
    else if (gesture.dx < -60) callbacks.copy();
  };
  const cancel = () => {
    start = null;
    reset();
  };
  node.addEventListener("touchstart", begin, { passive: true });
  node.addEventListener("touchmove", move, { passive: false });
  node.addEventListener("touchend", end);
  node.addEventListener("touchcancel", cancel);
  return {
    update(next: typeof callbacks) {
      callbacks = next;
    },
    destroy() {
      active = false;
      cancel();
      node.removeEventListener("touchstart", begin);
      node.removeEventListener("touchmove", move);
      node.removeEventListener("touchend", end);
      node.removeEventListener("touchcancel", cancel);
    },
  };
}
