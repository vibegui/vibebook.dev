import { expect, test } from "bun:test";
import { MAX_ORDER, reorderEpics } from "../src/epic-order";

const room = (n: number) => Array.from({ length: n }, (_, i) => `e${i}`);

test("a full permutation of 600+ epics is applied whole, past index 500", () => {
  const now = room(650);
  const want = [...now].reverse();
  expect(reorderEpics(now, want)).toEqual(want);
  const moved = [...now];
  moved.splice(620, 0, moved.splice(10, 1)[0]); // drag e10 down past 500
  expect(reorderEpics(now, moved)).toEqual(moved);
});

test("a partial list reorders only those epics, in the slots they occupy", () => {
  const now = room(600);
  const out = reorderEpics(now, ["e599", "e550", "e501"]);
  expect(out[501]).toBe("e599");
  expect(out[550]).toBe("e550");
  expect(out[599]).toBe("e501");
  expect(out.filter((id, i) => id !== now[i])).toHaveLength(2);
});

test("unknown ids, repeats and non-strings are dropped; nothing is lost or duplicated", () => {
  const now = room(5);
  const out = reorderEpics(now, ["e3", "ghost", "e3", 7, null, "e1"]);
  expect(out).toEqual(["e0", "e3", "e2", "e1", "e4"]);
  expect(new Set(out).size).toBe(5);
  expect(reorderEpics(now, [])).toEqual(now);
});

test("a message longer than the cap only uses its first MAX_ORDER ids", () => {
  const now = room(3);
  const huge = [
    ...Array.from({ length: MAX_ORDER }, () => "ghost"),
    "e2",
    "e0",
  ];
  expect(reorderEpics(now, huge)).toEqual(now);
});
