import { get, writable, type Writable } from "svelte/store";
import type { Pin, Room } from "../../../shared/room";
import type {
  CommandOutcome,
  RoomCommand,
  SendRoomCommand,
} from "../../../shared/commands";
import { normalizePinLink } from "./model";
import type { RequestRoomCommand } from "../../roomConnection";

type PinMutation = Extract<RoomCommand, { t: "pin.add" | "pin.del" }>;
export type PinDraft = { url: string; title: string };
export type PinIssue = {
  kind:
    | "invalid-link"
    | "offline"
    | "send-failed"
    | "unconfirmed"
    | "already-pinned"
    | "rejected";
  detail?: string;
};
export type PinsState = {
  adding: boolean;
  draft: PinDraft;
  pending: {
    sequence: number;
    command: PinMutation;
    draft?: PinDraft;
  } | null;
  issue: PinIssue | null;
  filesPending: boolean;
  fileIssue: "offline" | "send-failed" | null;
};
export type PinsSession = {
  readonly roomId: string;
  readonly state: Writable<PinsState>;
  active: boolean;
  pins: readonly Pin[];
  filesRequested: boolean;
  sequence: number;
};
const emptyDraft = (): PinDraft => ({ url: "", title: "" });
export function createPinsSession(roomId: string): PinsSession {
  return {
    roomId,
    active: true,
    pins: [],
    filesRequested: false,
    sequence: 0,
    state: writable<PinsState>({
      adding: false,
      draft: emptyDraft(),
      pending: null,
      issue: null,
      filesPending: false,
      fileIssue: null,
    }),
  };
}
export function disposePinsSession(session: PinsSession | null) {
  if (!session) return;
  session.active = false;
  session.sequence++;
}
export function openPinDraft(session: PinsSession) {
  if (session.active)
    session.state.update((state) => ({ ...state, adding: true, issue: null }));
}
export function updatePinDraft(session: PinsSession, patch: Partial<PinDraft>) {
  if (session.active)
    session.state.update((state) => ({
      ...state,
      draft: { ...state.draft, ...patch },
      issue: null,
    }));
}
export function closePinDraft(session: PinsSession) {
  // Closing the form does not cancel a command already sent or discard an edited draft.
  if (session.active)
    session.state.update((state) => ({ ...state, adding: false, issue: null }));
}
function matchesDraft(a: PinDraft, b: PinDraft) {
  return a.url === b.url && a.title === b.title;
}
function alreadyPinnedLink(ref: string, title: string, pins: readonly Pin[]) {
  return pins.some(
    (pin) =>
      pin.kind === "link" && pin.ref === ref && (!title || pin.title === title),
  );
}
export function syncPinsSession(
  current: PinsSession | null,
  room: Pick<Room, "id" | "pins" | "files" | "filesAll">,
): PinsSession {
  let session = current;
  if (!session?.active || session.roomId !== room.id) {
    disposePinsSession(session);
    session = createPinsSession(room.id);
  }
  session.pins = room.pins ?? [];
  let state = get(session.state);
  const unknownFile = room.pins?.some(
    (pin) =>
      pin.kind === "file" && !room.files?.some((file) => file.id === pin.ref),
  );
  if (
    (room.filesAll || !unknownFile) &&
    (state.filesPending || state.fileIssue)
  ) {
    state = { ...state, filesPending: false, fileIssue: null };
    session.state.set(state);
  }
  return session;
}
async function queue(
  session: PinsSession,
  roomId: string,
  request: RequestRoomCommand,
  command: PinMutation,
  draft?: PinDraft,
): Promise<void> {
  if (
    !session.active ||
    session.roomId !== roomId ||
    get(session.state).pending
  )
    return;
  const sequence = ++session.sequence;
  // Lock before calling the transport, including when it returns an already fulfilled promise.
  session.state.update((state) => ({
    ...state,
    pending: { sequence, command, draft },
    issue: null,
  }));
  const owns = () =>
    session.active &&
    session.sequence === sequence &&
    get(session.state).pending?.sequence === sequence;
  let outcome: CommandOutcome;
  try {
    outcome = await request(command);
  } catch {
    if (owns())
      session.state.update((state) => ({
        ...state,
        pending: null,
        issue: { kind: "send-failed" },
      }));
    return;
  }
  if (!owns()) return;
  const state = get(session.state);
  if (outcome.ok) {
    const clearDraft =
      command.t === "pin.add" && draft && matchesDraft(state.draft, draft);
    session.state.set({
      ...state,
      pending: null,
      issue: null,
      ...(clearDraft ? { adding: false, draft: emptyDraft() } : {}),
    });
    return;
  }
  const issue: PinIssue =
    outcome.error === "offline"
      ? { kind: "offline" }
      : outcome.error === "timeout" || outcome.error === "disconnected"
        ? { kind: "unconfirmed" }
        : { kind: "rejected", detail: outcome.error };
  session.state.set({ ...state, pending: null, issue });
}
export async function submitPinDraft(
  session: PinsSession,
  roomId: string,
  request: RequestRoomCommand,
): Promise<void> {
  if (
    !session.active ||
    session.roomId !== roomId ||
    get(session.state).pending
  )
    return;
  const state = get(session.state);
  if (!state.adding) return;
  const ref = normalizePinLink(state.draft.url);
  if (!ref) {
    session.state.update((state) => ({
      ...state,
      issue: { kind: "invalid-link" },
    }));
    return;
  }
  const title = state.draft.title.trim().slice(0, 80);
  if (alreadyPinnedLink(ref, title, session.pins)) {
    // Explicit user submission may finish as a no-op; an incidental room refresh must not do this.
    session.state.set({
      ...state,
      adding: false,
      draft: emptyDraft(),
      issue: { kind: "already-pinned" },
    });
    return;
  }
  return queue(
    session,
    roomId,
    request,
    { t: "pin.add", kind: "link", ref, title },
    { ...state.draft },
  );
}
export async function removePinnedItem(
  session: PinsSession,
  roomId: string,
  id: string,
  request: RequestRoomCommand,
): Promise<void> {
  if (!session.pins.some((pin) => pin.id === id)) return;
  return queue(session, roomId, request, { t: "pin.del", id });
}
/** Load missing pinned-file metadata once, including across temporary rail unmounts. No automatic retries. */
export function requestPinnedFiles(
  session: PinsSession,
  room: Pick<Room, "id" | "pins" | "files" | "filesAll">,
  send: SendRoomCommand,
  retry = false,
): boolean {
  if (!session.active || session.roomId !== room.id || room.filesAll)
    return false;
  const unknown = room.pins?.some(
    (pin) =>
      pin.kind === "file" && !room.files?.some((file) => file.id === pin.ref),
  );
  if (!unknown || (session.filesRequested && !retry)) return false;
  session.filesRequested = true;
  session.state.update((state) => ({
    ...state,
    filesPending: true,
    fileIssue: null,
  }));
  try {
    if (send({ t: "files.get" })) return true;
    session.state.update((state) => ({
      ...state,
      filesPending: false,
      fileIssue: "offline",
    }));
  } catch {
    session.state.update((state) => ({
      ...state,
      filesPending: false,
      fileIssue: "send-failed",
    }));
  }
  return false;
}
