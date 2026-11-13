import { describe, expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Attachment, Pin } from "../shared/room";
import type { RoomCommand } from "../shared/commands";
import { normalizePinLink, pinAppTarget, resolvePin } from "../svelte/features/pins/model";
import { createPinsSession, disposePinsSession, openPinDraft, closePinDraft, rejectPinRequest, removePinnedItem, submitPinDraft, syncPinsSession, updatePinDraft, type PinsClock } from "../svelte/features/pins/session";

const pin = (id: string, ref = "https://example.com/", title = "Example"): Pin => ({ id, kind: "link", ref, title });
const file: Attachment = { id: "f", name: "report.pdf", type: "application/pdf", author: "me@test", size: 100, ts: 1 };
function fakeClock() {
  let sequence = 0;
  const tasks = new Map<number, () => void>();
  const cancelled: number[] = [];
  const clock: PinsClock = {
    schedule(callback) { const id = ++sequence; tasks.set(id, callback); return id; },
    cancel(handle) { tasks.delete(Number(handle)); cancelled.push(Number(handle)); },
  };
  return { clock, tasks, cancelled, flush() { const current = [...tasks.values()]; tasks.clear(); current.forEach(callback => callback()); } };
}
function draft() {
  const timer = fakeClock(), session = createPinsSession("room-a", timer.clock);
  openPinDraft(session);
  updatePinDraft(session, { url: "example.com", title: "Example" });
  const commands: RoomCommand[] = [];
  const send = (command: RoomCommand) => { commands.push(command); return true; };
  return { session, timer, commands, send };
}

describe("native pinned target resolution", () => {
  test("normalizes bare and HTTP links while rejecting executable/invalid URLs", () => {
    expect(normalizePinLink(" example.com/docs ")).toBe("https://example.com/docs");
    expect(normalizePinLink("http://example.com")).toBe("http://example.com/");
    for (const value of ["", "javascript://alert(1)", "data://text/html", "ftp://example.com", "https://", "https://exa mple.com", "https://example.com/\u0000x"]) expect(normalizePinLink(value)).toBeNull();
  });
  test("resolves typed file/app targets and exposes missing/unknown targets without hrefs", () => {
    expect(resolvePin({ id: "f-pin", kind: "file", ref: "f" }, { files: [file] })).toEqual({ kind: "file", file, label: "report.pdf", detail: "arquivo" });
    expect(resolvePin({ id: "gone", kind: "file", ref: "gone" }, { files: [file] }).kind).toBe("unavailable");
    expect(pinAppTarget("chart")).toEqual({ connectionId: "room", tool: "chart" });
    expect(pinAppTarget("123456abcdef/chart")).toEqual({ connectionId: "123456abcdef", tool: "chart" });
    expect(pinAppTarget("room/chart")).toEqual({ connectionId: "room", tool: "chart" });
    expect(pinAppTarget("room/../../evil")).toBeNull();
    expect(resolvePin({ id: "app", kind: "app", ref: "chart" }, { files: [], filesAll: true }).kind).toBe("unavailable");
    expect(resolvePin({ id: "app", kind: "app", ref: "chart" }, { files: [], filesAll: false }).kind).toBe("app");
    expect(resolvePin({ id: "invalid", kind: "other", ref: "javascript:alert(1)" }, {}).kind).toBe("unavailable");
  });
});

describe("native pin mutation session", () => {
  test("one queued send waits for authoritative state, not a send boolean", () => {
    const { session, timer, commands, send } = draft();
    expect(submitPinDraft(session, "room-a", send)).toBe(true);
    expect(submitPinDraft(session, "room-a", send)).toBe(false);
    expect(commands).toEqual([{ t: "pin.add", kind: "link", ref: "https://example.com/", title: "Example" }]);
    expect(session.pins).toEqual([]);
    expect(get(session.state).draft.url).toBe("example.com");
    expect(syncPinsSession(session, { id: "room-a", pins: [] })).toBe(session);
    expect(get(session.state).pending).not.toBeNull();
    syncPinsSession(session, { id: "room-a", pins: [pin("p")] });
    expect(get(session.state)).toMatchObject({ pending: null, adding: false, draft: { url: "", title: "" }, issue: null });
    expect(timer.tasks.size).toBe(0);
    timer.flush();
    expect(get(session.state).issue).toBeNull();
  });
  test("matching receipt preserves every user edit typed while waiting", () => {
    const { session, send } = draft();
    submitPinDraft(session, "room-a", send);
    updatePinDraft(session, { url: "next.example.com", title: "Next" });
    syncPinsSession(session, { id: "room-a", pins: [pin("p")] });
    expect(get(session.state)).toMatchObject({ pending: null, adding: true, draft: { url: "next.example.com", title: "Next" } });
  });
  test("different canonical title is not mistaken for confirmation", () => {
    const { session, send } = draft();
    submitPinDraft(session, "room-a", send);
    syncPinsSession(session, { id: "room-a", pins: [pin("p", "https://example.com/", "Someone else's title")] });
    expect(get(session.state).pending).not.toBeNull();
  });
  test("offline and thrown sends preserve drafts and leave an explicit retry possible", () => {
    const { session, timer, send } = draft();
    expect(submitPinDraft(session, "room-a", () => false)).toBe(false);
    expect(get(session.state)).toMatchObject({ pending: null, issue: { kind: "offline" }, draft: { url: "example.com" } });
    expect(submitPinDraft(session, "room-a", () => { throw Error("closed"); })).toBe(false);
    expect(get(session.state).issue?.kind).toBe("send-failed");
    expect(timer.tasks.size).toBe(0);
    expect(submitPinDraft(session, "room-a", send)).toBe(true);
  });
  test("timeout means unconfirmed, preserves edits, and never retries or inserts a pin", () => {
    const { session, timer, commands, send } = draft();
    submitPinDraft(session, "room-a", send);
    updatePinDraft(session, { title: "Edited while queued" });
    timer.flush();
    expect(get(session.state)).toMatchObject({ pending: null, adding: true, issue: { kind: "unconfirmed" }, draft: { title: "Edited while queued" } });
    expect(commands).toHaveLength(1);
    expect(session.pins).toEqual([]);
    syncPinsSession(session, { id: "room-a", pins: [pin("late")] });
    expect(get(session.state).draft.title).toBe("Edited while queued");
    expect(commands).toHaveLength(1);
  });
  test("unpin remains visible until canonical removal and does not repeat on double action", () => {
    const { session, commands, send } = draft();
    syncPinsSession(session, { id: "room-a", pins: [pin("p")] });
    expect(removePinnedItem(session, "room-a", "p", send)).toBe(true);
    expect(removePinnedItem(session, "room-a", "p", send)).toBe(false);
    expect(session.pins).toHaveLength(1);
    syncPinsSession(session, { id: "room-a", pins: [] });
    expect(get(session.state).pending).toBeNull();
    expect(commands).toEqual([{ t: "pin.del", id: "p" }]);
    expect(removePinnedItem(session, "room-a", "gone", send)).toBe(false);
  });
  test("room switch and disposal cancel timers and make stale actions inert", () => {
    const { session, timer, commands, send } = draft();
    submitPinDraft(session, "room-a", send);
    const next = syncPinsSession(session, { id: "room-b", pins: [] });
    expect(session.active).toBe(false);
    expect(timer.tasks.size).toBe(0);
    expect(next.roomId).toBe("room-b");
    expect(submitPinDraft(session, "room-a", send)).toBe(false);
    expect(submitPinDraft(next, "room-a", send)).toBe(false);
    timer.flush();
    expect(commands).toHaveLength(1);
    disposePinsSession(next);
    expect(next.active).toBe(false);
  });
  test("only recognizable pin errors release a queued pin, retaining the draft", () => {
    const { session, timer, send } = draft();
    submitPinDraft(session, "room-a", send);
    expect(rejectPinRequest(session, "task not found")).toBe(false);
    expect(get(session.state).pending).not.toBeNull();
    expect(rejectPinRequest(session, "20 pins max: unpin one first")).toBe(true);
    expect(get(session.state)).toMatchObject({ pending: null, adding: true, issue: { kind: "rejected" }, draft: { url: "example.com" } });
    expect(timer.tasks.size).toBe(0);
  });
  test("a synchronous canonical reply does not leave a stray confirmation timer", () => {
    const { session, timer } = draft();
    submitPinDraft(session, "room-a", () => { syncPinsSession(session, { id: "room-a", pins: [pin("p")] }); return true; });
    expect(get(session.state).pending).toBeNull();
    expect(timer.tasks.size).toBe(0);
  });
  test("closed/invalid drafts do not send, while same-room remounts retain the draft", () => {
    const { session, commands, send } = draft();
    closePinDraft(session);
    expect(submitPinDraft(session, "room-a", send)).toBe(false);
    openPinDraft(session);
    expect(syncPinsSession(session, { id: "room-a", pins: [] })).toBe(session);
    expect(get(session.state).draft.url).toBe("example.com");
    updatePinDraft(session, { url: "javascript://evil" });
    expect(submitPinDraft(session, "room-a", send)).toBe(false);
    expect(get(session.state).issue?.kind).toBe("invalid-link");
    expect(commands).toEqual([]);
  });
});
