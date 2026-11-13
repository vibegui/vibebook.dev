import { get, writable } from "svelte/store";
import type { RoomFile } from "../../panels";
import type { CommandOutcome, RoomCommand } from "../../../shared/commands";
import type { FilesRoom } from "./types";
import { currentFile } from "./model";
export type FileRequest = (command: RoomCommand) => Promise<CommandOutcome>;
export const FILES_CONFIRMATION_TIMEOUT = 10_000;
export type FilesClock = {
  schedule(callback: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
const defaultClock: FilesClock = {
  schedule: (callback, ms) => setTimeout(callback, ms),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
export function createFilesSession(
  roomId: string,
  clock: FilesClock = defaultClock,
) {
  const state = writable({
    kind: "all",
    directory: "",
    pending: null as null | {
      id: string;
      pin: boolean;
      pinId?: string;
      ack: boolean;
    },
    error: "",
    loading: false,
    loadError: "",
  });
  let active = true;
  let canonical: FilesRoom | null = null;
  let sequence = 0;
  let loadSequence = 0;
  let pinTimer: unknown | null = null;
  let loadTimer: unknown | null = null;
  const cancelPinTimer = () => {
    if (pinTimer !== null) clock.cancel(pinTimer);
    pinTimer = null;
  };
  const cancelLoadTimer = () => {
    if (loadTimer !== null) clock.cancel(loadTimer);
    loadTimer = null;
  };
  const reconciled = () => {
    const pending = get(state).pending;
    if (!pending?.ack || !canonical) return;
    const confirmed = pending.pin
      ? canonical.pins?.some(
          (pin) => pin.kind === "file" && pin.ref === pending.id,
        )
      : !canonical.pins?.some((pin) => pin.id === pending.pinId);
    if (confirmed) {
      cancelPinTimer();
      state.update((value) => ({ ...value, pending: null }));
    }
  };
  async function outcome(
    request: FileRequest,
    command: RoomCommand,
  ): Promise<CommandOutcome> {
    try {
      return await request(command);
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
  return {
    roomId,
    state,
    sync(room: FilesRoom, freshSnapshot = false) {
      if (!active || room.id !== roomId) return;
      canonical = room;
      // Each reconnect state has a fresh partial index. Ordinary panel renders do not reset a request.
      if (
        freshSnapshot ||
        (room.filesAll && (get(state).loading || get(state).loadError))
      ) {
        cancelLoadTimer();
        ++loadSequence;
        state.update((value) => ({ ...value, loading: false, loadError: "" }));
      }
      reconciled();
    },
    select(kind: string, directory: string) {
      if (active) state.update((value) => ({ ...value, kind, directory }));
    },
    open(selected: RoomFile, callback: (file: RoomFile) => void) {
      if (!active || !canonical) return false;
      const file = currentFile(canonical, selected);
      if (!file) return false;
      callback(file);
      return true;
    },
    async load(request: FileRequest) {
      if (!active || !canonical || canonical.filesAll || get(state).loading)
        return;
      const ticket = ++loadSequence;
      state.update((value) => ({ ...value, loading: true, loadError: "" }));
      const result = await outcome(request, { t: "files.get" });
      if (!active || ticket !== loadSequence) return;
      if (!result.ok)
        state.update((value) => ({
          ...value,
          loading: false,
          loadError: result.error,
        }));
      else if (get(state).loading) {
        loadTimer = clock.schedule(() => {
          if (!active || ticket !== loadSequence) return;
          loadTimer = null;
          state.update((value) => ({
            ...value,
            loading: false,
            loadError: "unconfirmed",
          }));
        }, FILES_CONFIRMATION_TIMEOUT);
      }
      // An ACK confirms acceptance; only the authoritative full index ends loading.
    },
    async toggle(selected: RoomFile, request: FileRequest) {
      if (!active || !canonical || get(state).pending) return;
      const file = currentFile(canonical, selected);
      if (!file) return;
      const pin = canonical.pins?.find(
        (pin) => pin.kind === "file" && pin.ref === file.id,
      );
      const ticket = ++sequence;
      state.update((value) => ({
        ...value,
        pending: { id: file.id, pin: !pin, pinId: pin?.id, ack: false },
        error: "",
      }));
      const result = await outcome(
        request,
        pin
          ? { t: "pin.del", id: pin.id }
          : { t: "pin.add", kind: "file", ref: file.id },
      );
      if (!active || ticket !== sequence) return;
      if (!result.ok) {
        state.update((value) => ({
          ...value,
          pending: null,
          error: result.error,
        }));
        return;
      }
      state.update((value) => ({
        ...value,
        pending: value.pending ? { ...value.pending, ack: true } : null,
      }));
      reconciled();
      if (get(state).pending)
        pinTimer = clock.schedule(() => {
          if (!active || ticket !== sequence || !get(state).pending) return;
          pinTimer = null;
          state.update((value) => ({
            ...value,
            pending: null,
            error: "unconfirmed",
          }));
        }, FILES_CONFIRMATION_TIMEOUT);
    },
    dispose() {
      active = false;
      cancelPinTimer();
      cancelLoadTimer();
      sequence++;
      loadSequence++;
      canonical = null;
    },
  };
}
export type FilesSession = ReturnType<typeof createFilesSession>;
