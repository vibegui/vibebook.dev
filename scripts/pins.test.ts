import { describe, expect, test } from "bun:test";
import { get } from "svelte/store";
import { reduceRoom } from "../svelte/roomStore";
import type { Attachment, Pin, Room } from "../shared/room";
import type { CommandOutcome, RoomCommand } from "../shared/commands";
import type { RequestRoomCommand } from "../svelte/roomConnection";
import {
  normalizePinLink,
  pinAppTarget,
  resolvePin,
} from "../svelte/features/pins/model";
import {
  createPinsSession,
  disposePinsSession,
  openPinDraft,
  closePinDraft,
  requestPinnedFiles,
  removePinnedItem,
  submitPinDraft,
  syncPinsSession,
  updatePinDraft,
} from "../svelte/features/pins/session";

const pin = (
  id: string,
  ref = "https://example.com/",
  title = "Example",
): Pin => ({ id, kind: "link", ref, title });
const file: Attachment = {
  id: "f",
  name: "report.pdf",
  type: "application/pdf",
  author: "me@test",
  size: 100,
  ts: 1,
};
function controlledOutcome() {
  let resolve!: (outcome: CommandOutcome) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<CommandOutcome>((done, fail) => {
    resolve = done;
    reject = fail;
  });
  return { promise, resolve, reject };
}
function draft(roomId = "room-a") {
  const session = createPinsSession(roomId);
  openPinDraft(session);
  updatePinDraft(session, { url: "example.com", title: "Example" });
  const commands: RoomCommand[] = [];
  const outcomes: ReturnType<typeof controlledOutcome>[] = [];
  const request: RequestRoomCommand = (command) => {
    commands.push(command);
    const outcome = controlledOutcome();
    outcomes.push(outcome);
    return outcome.promise;
  };
  const send = (command: RoomCommand) => {
    commands.push(command);
    return true;
  };
  return { session, commands, outcomes, request, send };
}

describe("native pinned target resolution", () => {
  test("normalizes HTTP links and rejects executable or malformed links", () => {
    expect(normalizePinLink(" example.com/docs ")).toBe(
      "https://example.com/docs",
    );
    expect(normalizePinLink("http://example.com")).toBe("http://example.com/");
    for (const value of [
      "",
      "javascript://alert(1)",
      "data://text/html",
      "ftp://example.com",
      "https://",
      "https://exa mple.com",
      "https://example.com/\u0000x",
    ])
      expect(normalizePinLink(value)).toBeNull();
  });
  test("distinguishes partial metadata from truly unavailable file/app targets", () => {
    expect(
      resolvePin({ id: "f-pin", kind: "file", ref: "f" }, { files: [file] }),
    ).toEqual({ kind: "file", file, label: "report.pdf", detail: "arquivo" });
    expect(
      resolvePin(
        { id: "gone", kind: "file", ref: "gone" },
        { files: [file], filesAll: true },
      ).kind,
    ).toBe("unavailable");
    expect(
      resolvePin(
        { id: "old", kind: "file", ref: "old", title: "Older report" },
        { files: [], filesAll: false },
      ),
    ).toEqual({ kind: "file-unloaded", id: "old", label: "Older report" });
    expect(pinAppTarget("chart")).toEqual({
      connectionId: "room",
      tool: "chart",
    });
    expect(pinAppTarget("123456abcdef/chart")).toEqual({
      connectionId: "123456abcdef",
      tool: "chart",
    });
    expect(pinAppTarget("room/chart")).toEqual({
      connectionId: "room",
      tool: "chart",
    });
    expect(pinAppTarget("room/../../evil")).toBeNull();
    expect(
      resolvePin(
        { id: "app", kind: "app", ref: "chart" },
        { files: [], filesAll: true },
      ).kind,
    ).toBe("unavailable");
    expect(
      resolvePin(
        { id: "app", kind: "app", ref: "chart" },
        { files: [], filesAll: false },
      ).kind,
    ).toBe("app");
    expect(
      resolvePin(
        { id: "invalid", kind: "other", ref: "javascript:alert(1)" },
        {},
      ).kind,
    ).toBe("unavailable");
  });
});

describe("native pin correlated mutation session", () => {
  test("locks synchronously and requests exactly once, even before the first await", async () => {
    const { session, commands, outcomes, request } = draft();
    const attempt = submitPinDraft(session, "room-a", request);
    const pending = get(session.state).pending;
    expect(pending).not.toBeNull();
    await submitPinDraft(session, "room-a", request);
    expect(commands).toEqual([
      {
        t: "pin.add",
        kind: "link",
        ref: "https://example.com/",
        title: "Example",
      },
    ]);
    expect(session.pins).toEqual([]);
    expect(get(session.state).draft.url).toBe("example.com");
    outcomes[0].resolve({ ok: true });
    await attempt;
    expect(get(session.state)).toMatchObject({
      pending: null,
      adding: false,
      draft: { url: "", title: "" },
      issue: null,
    });
    expect(session.pins).toEqual([]); // ACK success does not invent a visible row.
  });
  test("canonical data before ACK cannot settle the request or clear the draft", async () => {
    const { session, outcomes, request } = draft();
    const attempt = submitPinDraft(session, "room-a", request);
    const pending = get(session.state).pending;
    syncPinsSession(session, { id: "room-a", pins: [pin("p")] });
    syncPinsSession(session, { id: "room-a", pins: [pin("p")] });
    expect(get(session.state).pending).toBe(pending);
    expect(get(session.state)).toMatchObject({
      adding: true,
      draft: { url: "example.com", title: "Example" },
    });
    outcomes[0].resolve({ ok: true });
    await attempt;
    expect(get(session.state).pending).toBeNull();
    expect(session.pins).toEqual([pin("p")]);
  });
  test("successful ACK unlocks without needing any new pins event", async () => {
    const { session, outcomes, request } = draft();
    const attempt = submitPinDraft(session, "room-a", request);
    outcomes[0].resolve({ ok: true });
    await attempt;
    expect(get(session.state)).toMatchObject({
      pending: null,
      adding: false,
      issue: null,
    });
    expect(session.pins).toHaveLength(0);
  });
  test("edits typed while awaiting ACK survive both canonical data and successful outcome", async () => {
    const { session, outcomes, request } = draft();
    const attempt = submitPinDraft(session, "room-a", request);
    updatePinDraft(session, { url: "next.example.com", title: "Next" });
    syncPinsSession(session, { id: "room-a", pins: [pin("p")] });
    outcomes[0].resolve({ ok: true });
    await attempt;
    expect(get(session.state)).toMatchObject({
      pending: null,
      adding: true,
      draft: { url: "next.example.com", title: "Next" },
    });
  });
  test("correlated server rejection preserves the draft and displays its actual text", async () => {
    const { session, commands, outcomes, request } = draft();
    const attempt = submitPinDraft(session, "room-a", request);
    outcomes[0].resolve({ ok: false, error: "20 pins max: unpin one first" });
    await attempt;
    expect(get(session.state)).toMatchObject({
      pending: null,
      adding: true,
      draft: { url: "example.com" },
      issue: { kind: "rejected", detail: "20 pins max: unpin one first" },
    });
    expect(commands).toHaveLength(1);
  });
  test("offline is distinct; timeout and disconnected stay unconfirmed and never auto-retry", async () => {
    for (const [error, kind] of [
      ["offline", "offline"],
      ["timeout", "unconfirmed"],
      ["disconnected", "unconfirmed"],
    ] as const) {
      const { session, commands, outcomes, request } = draft();
      const attempt = submitPinDraft(session, "room-a", request);
      updatePinDraft(session, { title: "Edited while waiting" });
      outcomes[0].resolve({ ok: false, error });
      await attempt;
      expect(get(session.state)).toMatchObject({
        pending: null,
        adding: true,
        issue: { kind },
        draft: { title: "Edited while waiting" },
      });
      syncPinsSession(session, { id: "room-a", pins: [pin("late")] });
      expect(get(session.state).draft.title).toBe("Edited while waiting");
      expect(commands).toHaveLength(1);
    }
  });
  test("request exceptions are caught and a later explicit retry can succeed", async () => {
    const { session, commands, outcomes, request } = draft();
    const first = submitPinDraft(session, "room-a", request);
    outcomes[0].reject(Error("unexpected transport failure"));
    await first;
    expect(get(session.state)).toMatchObject({
      pending: null,
      issue: { kind: "send-failed" },
      draft: { url: "example.com" },
    });
    const retry = submitPinDraft(session, "room-a", request);
    expect(commands).toHaveLength(2);
    outcomes[1].resolve({ ok: true });
    await retry;
    expect(get(session.state).pending).toBeNull();
  });
  test("timed-out completion cannot later settle a newer explicit retry", async () => {
    const { session, outcomes, request } = draft();
    const first = submitPinDraft(session, "room-a", request);
    outcomes[0].resolve({ ok: false, error: "timeout" });
    await first;
    const retry = submitPinDraft(session, "room-a", request);
    const newer = get(session.state).pending;
    outcomes[0].resolve({ ok: true });
    await Promise.resolve();
    expect(get(session.state).pending).toBe(newer);
    outcomes[1].resolve({ ok: true });
    await retry;
    expect(get(session.state).pending).toBeNull();
  });
  test("disposed old-room ACK cannot affect a newer session's pending command", async () => {
    const old = draft();
    const first = submitPinDraft(old.session, "room-a", old.request);
    const oldDraft = get(old.session.state).draft;
    disposePinsSession(old.session);
    const next = draft("room-b");
    const second = submitPinDraft(next.session, "room-b", next.request);
    const current = get(next.session.state).pending;
    old.outcomes[0].resolve({ ok: true });
    await first;
    expect(get(old.session.state).draft).toBe(oldDraft);
    expect(get(next.session.state).pending).toBe(current);
    await submitPinDraft(old.session, "room-a", old.request);
    await submitPinDraft(next.session, "room-a", next.request);
    expect(old.commands).toHaveLength(1);
    expect(next.commands).toHaveLength(1);
    next.outcomes[0].resolve({ ok: true });
    await second;
    expect(get(next.session.state).pending).toBeNull();
  });
  test("same-room replacement session also ignores the disposed instance's late outcome", async () => {
    const old = draft();
    const first = submitPinDraft(old.session, "room-a", old.request);
    disposePinsSession(old.session);
    const next = draft();
    const second = submitPinDraft(next.session, "room-a", next.request);
    const current = get(next.session.state).pending;
    old.outcomes[0].resolve({ ok: false, error: "blocked old request" });
    await first;
    expect(get(next.session.state).pending).toBe(current);
    expect(get(next.session.state).issue).toBeNull();
    next.outcomes[0].resolve({ ok: true });
    await second;
  });
  test("unpin stays canonical, waits for ACK after a removal event, and sends only once", async () => {
    const { session, commands, outcomes, request } = draft();
    syncPinsSession(session, { id: "room-a", pins: [pin("p")] });
    const attempt = removePinnedItem(session, "room-a", "p", request);
    await removePinnedItem(session, "room-a", "p", request);
    expect(commands).toEqual([{ t: "pin.del", id: "p" }]);
    expect(session.pins).toHaveLength(1);
    const pending = get(session.state).pending;
    syncPinsSession(session, { id: "room-a", pins: [] });
    expect(get(session.state).pending).toBe(pending);
    outcomes[0].resolve({ ok: true });
    await attempt;
    expect(get(session.state).pending).toBeNull();
    await removePinnedItem(session, "room-a", "gone", request);
    expect(commands).toHaveLength(1);
  });
  test("rejected unpin leaves the server-owned pin visible", async () => {
    const { session, outcomes, request } = draft();
    syncPinsSession(session, { id: "room-a", pins: [pin("p")] });
    const attempt = removePinnedItem(session, "room-a", "p", request);
    outcomes[0].resolve({ ok: false, error: "not allowed" });
    await attempt;
    expect(session.pins).toEqual([pin("p")]);
    expect(get(session.state)).toMatchObject({
      pending: null,
      issue: { kind: "rejected", detail: "not allowed" },
    });
  });
  test("unrelated shared errors and matching room snapshots cannot settle the correlated promise", async () => {
    const { session, outcomes, request } = draft();
    let room: Room = {
      id: "room-a",
      me: "me@test",
      book: { title: "Room", owner: "me@test" },
      messages: [],
      epics: [],
      typing: {},
      members: [],
      online: [],
      suggestions: [],
      pins: [],
    };
    syncPinsSession(session, room);
    const attempt = submitPinDraft(session, "room-a", request);
    const pending = get(session.state).pending;
    for (const error of [
      "blocked: looks like a secret (token)",
      "20 pins max: unpin one first",
      "task not found",
    ]) {
      room = reduceRoom(room, { t: "error", error }, "room-a")!;
      syncPinsSession(session, room);
      expect(get(session.state).pending).toBe(pending);
    }
    outcomes[0].resolve({ ok: true });
    await attempt;
  });
  test("identical existing pins are a user-visible no-op only on explicit submission", async () => {
    const { session, commands, request } = draft();
    const pins = [pin("existing")];
    syncPinsSession(session, { id: "room-a", pins });
    syncPinsSession(session, { id: "room-a", pins: [...pins] });
    expect(get(session.state)).toMatchObject({
      adding: true,
      draft: { url: "example.com", title: "Example" },
      pending: null,
    });
    await submitPinDraft(session, "room-a", request);
    expect(commands).toEqual([]);
    expect(get(session.state)).toMatchObject({
      adding: false,
      draft: { url: "", title: "" },
      issue: { kind: "already-pinned" },
    });
  });
  test("closed and invalid drafts never request; same-room remounts retain a valid draft", async () => {
    const { session, commands, request } = draft();
    closePinDraft(session);
    await submitPinDraft(session, "room-a", request);
    openPinDraft(session);
    expect(syncPinsSession(session, { id: "room-a", pins: [] })).toBe(session);
    expect(get(session.state).draft.url).toBe("example.com");
    updatePinDraft(session, { url: "javascript://evil" });
    await submitPinDraft(session, "room-a", request);
    expect(get(session.state).issue?.kind).toBe("invalid-link");
    expect(commands).toEqual([]);
  });
});

describe("native pinned-file Boolean metadata bridge", () => {
  test("partial metadata loads once, resolves canonically and supports explicit reconnect retry", () => {
    const { session, commands, send } = draft();
    const room = {
      id: "room-a",
      pins: [{ id: "older", kind: "file", ref: "old" }],
      files: [file],
      filesAll: false,
    };
    syncPinsSession(session, room);
    expect(requestPinnedFiles(session, room, send)).toBe(true);
    expect(requestPinnedFiles(session, { ...room }, send)).toBe(false);
    expect(commands).toEqual([{ t: "files.get" }]);
    expect(get(session.state).filesPending).toBe(true);
    const full = {
      ...room,
      files: [file, { ...file, id: "old", name: "old.pdf" }],
      filesAll: true,
    };
    syncPinsSession(session, full);
    expect(get(session.state).filesPending).toBe(false);
    expect(resolvePin(room.pins[0], full).kind).toBe("file");
    syncPinsSession(session, room);
    expect(requestPinnedFiles(session, room, send)).toBe(false);
    expect(
      requestPinnedFiles(session, room, send, !get(session.state).filesPending),
    ).toBe(true);
    expect(commands).toEqual([{ t: "files.get" }, { t: "files.get" }]);
  });
  test("metadata offline/throw paths require explicit retries and disposed sessions cannot fetch", () => {
    const { session, commands, send } = draft();
    const room = {
      id: "room-a",
      pins: [{ id: "older", kind: "file", ref: "old" }],
      files: [],
      filesAll: false,
    };
    expect(requestPinnedFiles(session, room, () => false)).toBe(false);
    expect(get(session.state).fileIssue).toBe("offline");
    expect(requestPinnedFiles(session, room, send)).toBe(false);
    expect(
      requestPinnedFiles(
        session,
        room,
        () => {
          throw Error("closed");
        },
        true,
      ),
    ).toBe(false);
    expect(get(session.state).fileIssue).toBe("send-failed");
    expect(requestPinnedFiles(session, room, send, true)).toBe(true);
    expect(commands).toEqual([{ t: "files.get" }]);
    disposePinsSession(session);
    expect(requestPinnedFiles(session, room, send, true)).toBe(false);
  });
});
