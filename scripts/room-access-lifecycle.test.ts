import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
const source = readFileSync(new URL("../svelte/legacy/host.js", import.meta.url), "utf8");
const start = source.indexOf("function dropUnavailableRoom("), end = source.indexOf("function openBook(", start);
if (start < 0 || end < 0) throw Error("Missing actual terminal room adapter");
// Execute the actual presentation adapter. Typed session tests separately prove
// terminal ownership, synchronous cache eviction and stale-callback fences.
function harness() {
  const calls: string[] = [], app = { innerHTML: "private room" };
  const run = Function("calls", "$app", `let S={id:'private'},roomConnection={};const nativeViewer={reset(){calls.push('viewer')}};const clearViews=()=>calls.push('views');const t=value=>value;const icon=()=>'';${source.slice(start,end)};return {terminal:dropUnavailableRoom,room:()=>S,connection:()=>roomConnection};`)(calls, app) as { terminal(snapshot: { phase: "removed" | "unavailable" }): void; room(): unknown; connection(): unknown };
  return { calls, app, run };
}
test("terminal room adapter closes native previews and views before replacing its presentation", () => {
  const h = harness(); h.run.terminal({ phase: "removed" });
  expect(h.calls).toEqual(["viewer", "views"]); expect(h.run.room()).toBeNull(); expect(h.run.connection()).toBeNull(); expect(h.app.innerHTML).toContain("Você foi removido"); expect(h.app.innerHTML).not.toContain("private room");
});
test("unavailable-room presentation retains the existing invitation continuation", () => {
  const h = harness(); h.run.terminal({ phase: "unavailable" }); expect(h.app.innerHTML).toContain("Peça para alguém de dentro te convidar"); expect(h.app.innerHTML).toContain('data-nav href="/app"');
});
