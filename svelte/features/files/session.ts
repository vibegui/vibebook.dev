import { get, writable } from "svelte/store";
import type { RoomFile } from "../../panels";
import type { CommandOutcome, RoomCommand } from "../../../shared/commands";
import type { FilesRoom } from "./types";
import { currentFile } from "./model";
export type FileRequest = (command: RoomCommand) => Promise<CommandOutcome>;
export function createFilesSession(roomId: string) {
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
  const reconciled = () => {
    const pending = get(state).pending;
    if (!pending?.ack || !canonical) return;
    const confirmed = pending.pin
      ? canonical.pins?.some(
          (pin) => pin.kind === "file" && pin.ref === pending.id,
        )
      : !canonical.pins?.some((pin) => pin.id === pending.pinId);
    if (confirmed) state.update((value) => ({ ...value, pending: null }));
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
    sync(room: FilesRoom) {
      if (!active || room.id !== roomId) return;
      canonical = room;
      if (room.filesAll && (get(state).loading || get(state).loadError)) {
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
    },
    dispose() {
      active = false;
      sequence++;
      loadSequence++;
      canonical = null;
    },
  };
}
export type FilesSession = ReturnType<typeof createFilesSession>;
