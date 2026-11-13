import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../svelte/legacy/host.js", import.meta.url),
  "utf8",
);
const start = source.indexOf("function dropUnavailableRoom(");
const end = source.indexOf("function openBook(", start);
if (start < 0 || end < 0) throw new Error("Missing actual room access cleanup");
// Execute the actual integration function with observable owners; no browser or
// authorization response is fabricated as an end-to-end result.
function harness(stale = false) {
  const connection = {},
    replacement = {},
    snapshot = { id: "room" };
  const cache = new Map([
    ["room", snapshot],
    ["other", { id: "other" }],
  ]);
  const calls: string[] = [];
  const cleanup = new Function(
    "connection",
    "replacement",
    "snapshot",
    "roomCache",
    "calls",
    "stale",
    `
    let roomConnection = stale ? replacement : connection;
    let S = snapshot;
    const nativeViewer = { reset() { calls.push("viewer"); } };
    const roomStore = { replace(value) { calls.push(value === null ? "store-clear" : "unexpected-store"); } };
    const clearViews = () => calls.push("views");
    ${source.slice(start, end)}
    return { run: () => dropUnavailableRoom("room", connection), room: () => S, connection: () => roomConnection };
  `,
  )(connection, replacement, snapshot, cache, calls, stale) as {
    run(): boolean;
    room(): unknown;
    connection(): unknown;
  };
  return { cleanup, cache, calls, snapshot, replacement };
}
test("access loss drops cached private room and active preview before clearing room state", () => {
  const { cleanup, cache, calls } = harness();
  expect(cleanup.run()).toBe(true);
  expect(cache.has("room")).toBe(false);
  expect(cache.has("other")).toBe(true);
  expect(calls).toEqual(["viewer", "views", "store-clear"]);
  expect(cleanup.room()).toBeNull();
  expect(cleanup.connection()).toBeNull();
});
test("late access failure from an old connection cannot clear a replacement room owner", () => {
  const { cleanup, cache, calls, snapshot, replacement } = harness(true);
  expect(cleanup.run()).toBe(false);
  expect(cache.get("room")).toBe(snapshot);
  expect(cleanup.room()).toBe(snapshot);
  expect(cleanup.connection()).toBe(replacement);
  expect(calls).toEqual([]);
});
test("repeated terminal failure cannot dispose a room twice", () => {
  const { cleanup, calls } = harness();
  expect(cleanup.run()).toBe(true);
  expect(cleanup.run()).toBe(false);
  expect(calls).toHaveLength(3);
});
