import { get, writable, type Writable } from "svelte/store";
import type { Pin, Room } from "../../../shared/room";
import type { RoomCommand, SendRoomCommand } from "../../../shared/commands";
import { normalizePinLink } from "./model";

type PinMutation = Extract<RoomCommand, { t: "pin.add" | "pin.del" }>;
export type PinDraft = { url: string; title: string };
export type PinIssue = { kind: "invalid-link" | "offline" | "send-failed" | "unconfirmed" | "rejected"; detail?: string };
export type PinsState = {
  adding: boolean;
  draft: PinDraft;
  pending: { sequence: number; command: PinMutation; draft?: PinDraft } | null;
  issue: PinIssue | null;
};
/** One timer per queued mutation releases the retry lock without declaring server failure or retrying it. */
export type PinsClock = { schedule(callback: () => void, ms: number): unknown; cancel(handle: unknown): void };
const clock: PinsClock = {
  schedule: (callback, ms) => setTimeout(callback, ms),
  cancel: handle => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
export type PinsSession = {
  readonly roomId: string;
  readonly state: Writable<PinsState>;
  active: boolean;
  pins: readonly Pin[];
  sequence: number;
  timer: unknown | null;
  readonly clock: PinsClock;
};
const emptyDraft = (): PinDraft => ({ url: "", title: "" });
export function createPinsSession(roomId: string, timer: PinsClock = clock): PinsSession {
  return { roomId, active: true, pins: [], sequence: 0, timer: null, clock: timer,
    state: writable<PinsState>({ adding: false, draft: emptyDraft(), pending: null, issue: null }) };
}
function cancelTimer(session: PinsSession) {
  if (session.timer !== null) session.clock.cancel(session.timer);
  session.timer = null;
}
export function disposePinsSession(session: PinsSession | null) {
  if (!session) return;
  session.active = false;
  cancelTimer(session);
}
export function openPinDraft(session: PinsSession) {
  if (session.active) session.state.update(state => ({ ...state, adding: true, issue: null }));
}
export function updatePinDraft(session: PinsSession, patch: Partial<PinDraft>) {
  if (session.active) session.state.update(state => ({ ...state, draft: { ...state.draft, ...patch }, issue: null }));
}
export function closePinDraft(session: PinsSession) {
  // Closing the form does not cancel a command already sent or discard an edited draft.
  if (session.active) session.state.update(state => ({ ...state, adding: false, issue: null }));
}
function matchesDraft(a: PinDraft, b: PinDraft) { return a.url === b.url && a.title === b.title; }
function confirmed(command: PinMutation, pins: readonly Pin[]) {
  return command.t === "pin.del" ? !pins.some(pin => pin.id === command.id)
    : pins.some(pin => pin.kind === command.kind && pin.ref === command.ref && (!command.title || pin.title === command.title));
}
export function syncPinsSession(current: PinsSession | null, room: Pick<Room, "id" | "pins">): PinsSession {
  let session = current;
  if (!session?.active || session.roomId !== room.id) {
    disposePinsSession(session);
    session = createPinsSession(room.id);
  }
  session.pins = room.pins ?? [];
  const state = get(session.state), pending = state.pending;
  if (pending && confirmed(pending.command, session.pins)) {
    cancelTimer(session);
    const clearDraft = pending.command.t === "pin.add" && pending.draft && matchesDraft(state.draft, pending.draft);
    session.state.set({ ...state, pending: null, issue: null,
      ...(clearDraft ? { adding: false, draft: emptyDraft() } : {}) });
  }
  return session;
}
function queue(session: PinsSession, roomId: string, send: SendRoomCommand, command: PinMutation, draft?: PinDraft): boolean {
  if (!session.active || session.roomId !== roomId || get(session.state).pending) return false;
  const sequence = ++session.sequence;
  session.state.update(state => ({ ...state, pending: { sequence, command, draft }, issue: null }));
  let sent = false;
  try { sent = send(command); } catch {
    session.state.update(state => state.pending?.sequence === sequence ? { ...state, pending: null, issue: { kind: "send-failed" } } : state);
    return false;
  }
  if (!sent) {
    session.state.update(state => state.pending?.sequence === sequence ? { ...state, pending: null, issue: { kind: "offline" } } : state);
    return false;
  }
  // A synchronous test transport may already have applied the canonical response.
  if (session.active && get(session.state).pending?.sequence === sequence) {
    session.timer = session.clock.schedule(() => {
      session.timer = null;
      if (!session.active) return;
      session.state.update(state => state.pending?.sequence === sequence
        ? { ...state, pending: null, issue: { kind: "unconfirmed" } } : state);
    }, 20_000);
  }
  return true;
}
export function submitPinDraft(session: PinsSession, roomId: string, send: SendRoomCommand): boolean {
  if (!session.active || session.roomId !== roomId || get(session.state).pending) return false;
  const state = get(session.state);
  if (!state.adding) return false;
  const ref = normalizePinLink(state.draft.url);
  if (!ref) { session.state.update(state => ({ ...state, issue: { kind: "invalid-link" } })); return false; }
  const title = state.draft.title.trim().slice(0, 80);
  return queue(session, roomId, send, { t: "pin.add", kind: "link", ref, title }, { ...state.draft });
}
export function removePinnedItem(session: PinsSession, roomId: string, id: string, send: SendRoomCommand): boolean {
  if (!session.pins.some(pin => pin.id === id)) return false;
  return queue(session, roomId, send, { t: "pin.del", id });
}
/** Book's WS errors have no request id. Only pin-specific messages may settle this slice's pending action. */
export function rejectPinRequest(session: PinsSession | null, message: string): boolean {
  if (!session?.active || !get(session.state).pending || !/^(?:not a valid URL|only http\(s\) links|20 pins max|blocked: looks like a secret|no pin )/.test(message)) return false;
  cancelTimer(session);
  session.state.update(state => ({ ...state, pending: null, issue: { kind: "rejected", detail: message } }));
  return true;
}
