import { expect, test } from "bun:test";
import {
  createRoomEdgeGesture,
  fromRoomEdge,
} from "../svelte/features/room-shell/edgeBack";
function fixture() {
  let mobile = true,
    standalone = true,
    current = true,
    target = "epic";
  const calls: string[] = [];
  const gesture = createRoomEdgeGesture({
    mobile: () => mobile,
    standalone: () => standalone,
    current: () => current,
    target: () => target,
    back: (value) => calls.push(value),
  });
  return {
    gesture,
    calls,
    mobile: (value: boolean) => {
      mobile = value;
    },
    standalone: (value: boolean) => {
      standalone = value;
    },
    current: (value: boolean) => {
      current = value;
    },
    target: (value: string) => {
      target = value;
    },
  };
}
test("phone edge is reserved while desktop/nonedge message swipes remain eligible", () => {
  expect(fromRoomEdge(0, true)).toBe(true);
  expect(fromRoomEdge(23, true)).toBe(true);
  expect(fromRoomEdge(24, true)).toBe(false);
  expect(fromRoomEdge(0, false)).toBe(false);
});
test("installed horizontal edge gesture uses captured current header target; browser mode never invokes app Back", () => {
  const f = fixture();
  // Actual Touch fields may be prototype getters rather than enumerable own keys.
  class TouchPoint {
    get clientX() {
      return 10;
    }
    get clientY() {
      return 30;
    }
  }
  const point = new TouchPoint();
  f.gesture.start(point, 1);
  f.gesture.end({ clientX: 90, clientY: 40 });
  expect(f.calls).toEqual(["epic"]);
  f.standalone(false);
  f.gesture.start({ clientX: 0, clientY: 0 }, 1);
  f.gesture.end({ clientX: 90, clientY: 0 });
  expect(f.calls).toEqual(["epic"]);
});
test("short, vertical, outside-edge, multitouch and cancelled gestures never navigate", () => {
  const f = fixture();
  for (const [x, endX, endY] of [
    [10, 70, 0],
    [10, 90, 100],
    [24, 100, 0],
  ]) {
    f.gesture.start({ clientX: x, clientY: 0 }, 1);
    f.gesture.end({ clientX: endX, clientY: endY });
  }
  f.gesture.start({ clientX: 0, clientY: 0 }, 2);
  f.gesture.end({ clientX: 90, clientY: 0 });
  f.gesture.start({ clientX: 0, clientY: 0 }, 1);
  f.gesture.move(2);
  f.gesture.end({ clientX: 90, clientY: 0 });
  f.gesture.start({ clientX: 0, clientY: 0 }, 1);
  f.gesture.cancel();
  f.gesture.end({ clientX: 90, clientY: 0 });
  expect(f.calls).toEqual([]);
});
test("thread/departure/media changes and disposal invalidate a pending edge gesture", () => {
  for (const invalidate of [
    (f: ReturnType<typeof fixture>) => f.target("main"),
    (f: ReturnType<typeof fixture>) => f.current(false),
    (f: ReturnType<typeof fixture>) => f.mobile(false),
    (f: ReturnType<typeof fixture>) => f.gesture.dispose(),
  ]) {
    const f = fixture();
    f.gesture.start({ clientX: 0, clientY: 0 }, 1);
    invalidate(f);
    f.gesture.end({ clientX: 90, clientY: 0 });
    expect(f.calls).toEqual([]);
  }
});
