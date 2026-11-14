type Point = Pick<Touch, "clientX" | "clientY">;
export const ROOM_BACK_EDGE = 24;
/** Phone browser history owns this strip, so message gestures must not capture it. */
export const fromRoomEdge = (x: number, mobile: boolean) => mobile && x < ROOM_BACK_EDGE;
type Options = {
  current(): boolean;
  mobile(): boolean;
  standalone(): boolean;
  target(): string;
  back(expectedThread: string): void;
};
export function createRoomEdgeGesture(options: Options) {
  let active = true, start: (Point & {target: string}) | null = null;
  const cancel = () => {start = null;};
  return {
    start(point: Point | undefined, count: number) {
      cancel();
      if (active && options.current() && point && count === 1 && fromRoomEdge(point.clientX, options.mobile()))
        start = {clientX: point.clientX, clientY: point.clientY, target: options.target()};
    },
    move(count: number) {if (count !== 1 || !options.current()) cancel();},
    end(point: Point | undefined) {
      const captured = start;
      cancel();
      if (!active || !captured || !point || !options.current() || !options.mobile() || !options.standalone() || options.target() !== captured.target) return;
      const dx = point.clientX - captured.clientX, dy = Math.abs(point.clientY - captured.clientY);
      if (dx > 60 && dy < dx) options.back(captured.target);
    },
    cancel,
    dispose() {active = false; cancel();},
  };
}

/** Passive, room-owned observation. Safari/browser Back is never prevented;
 * installed mode invokes the same current-thread action as the visible header. */
export function attachRoomEdgeBack(node: HTMLElement, options: Options) {
  const gesture = createRoomEdgeGesture({...options, current: () => node.isConnected && options.current()});
  const start = (event: TouchEvent) => gesture.start(event.touches[0], event.touches.length);
  const move = (event: TouchEvent) => gesture.move(event.touches.length);
  const end = (event: TouchEvent) => gesture.end(event.changedTouches[0]);
  const cancel = () => gesture.cancel();
  node.addEventListener("touchstart", start, {passive: true});
  node.addEventListener("touchmove", move, {passive: true});
  node.addEventListener("touchend", end, {passive: true});
  node.addEventListener("touchcancel", cancel, {passive: true});
  return () => {
    gesture.dispose();
    node.removeEventListener("touchstart", start);
    node.removeEventListener("touchmove", move);
    node.removeEventListener("touchend", end);
    node.removeEventListener("touchcancel", cancel);
  };
}
