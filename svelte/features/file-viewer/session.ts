import { get, writable } from "svelte/store";
import type { Attachment, Room } from "../../../shared/room";
import type { RequestRoomCommand } from "../../roomConnection";
import { createFileReadApi, type FileReadApi } from "./api";
import {
  FileTarget,
  knownViewerFiles,
  fileVersions,
  viewerKind,
  fileURL,
  sameFile,
  type ViewerInput,
  type ViewerKind,
} from "./model";
import { createViewerHistory, viewerClock, type ViewerClock } from "./history";
import { createFilesSession, type FilesSession } from "../files/session";
export type ViewerContent = {
  kind: ViewerKind;
  url: string;
  text?: string;
  truncated?: boolean;
  operation: number;
};
export type ViewerState = {
  open: boolean;
  room: Room | null;
  target: ViewerInput | null;
  file: Attachment | undefined;
  name: string;
  versions: Attachment[];
  phase: "idle" | "loading" | "ready" | "error";
  error: string;
  content: ViewerContent | null;
  indexPending: boolean;
  indexError: string;
  pinPending: boolean;
  pinError: string;
  closingUnconfirmed: boolean;
};
const blank = (): ViewerState => ({
  open: false,
  room: null,
  target: null,
  file: undefined,
  name: "",
  versions: [],
  phase: "idle",
  error: "",
  content: null,
  indexPending: false,
  indexError: "",
  pinPending: false,
  pinError: "",
  closingUnconfirmed: false,
});
const failure = (error: unknown) =>
  error instanceof Error ? error.message : "read-failed";
export function createFileViewer(options: {
  href: () => string;
  state: () => unknown;
  history: Pick<History, "pushState" | "replaceState" | "back">;
  api?: FileReadApi;
  clock?: ViewerClock;
  enqueue?: (callback: () => void) => void;
}) {
  const clock = options.clock ?? viewerClock,
    api = options.api ?? createFileReadApi(),
    state = writable<ViewerState>(blank());
  let active = true,
    room: Room | null = null,
    request: RequestRoomCommand | undefined,
    sequence = 0,
    indexSequence = 0,
    indexRequested = false,
    indexTimer: unknown | null = null,
    readTimer: unknown | null = null,
    controller: AbortController | null = null,
    trigger: HTMLElement | null = null;
  let pins: FilesSession | null = null,
    unsubscribePins: (() => void) | undefined;
  const disposePins = () => {
    unsubscribePins?.();
    unsubscribePins = undefined;
    pins?.dispose();
    pins = null;
  };
  const cancel = (timer: unknown | null) => {
    if (timer !== null) clock.cancel(timer);
  };
  const cancelRead = () => {
    sequence++;
    controller?.abort();
    controller = null;
    cancel(readTimer);
    readTimer = null;
  };
  const cancelIndex = () => {
    indexSequence++;
    cancel(indexTimer);
    indexTimer = null;
  };
  const closed = () => {
    cancelRead();
    cancelIndex();
    indexRequested = false;
    state.set(blank());
  };
  const history = createViewerHistory({
    ...options,
    clock,
    closed,
    unconfirmed: () => {
      if (active)
        state.update((value) => ({ ...value, closingUnconfirmed: true }));
    },
  });
  const owns = (ticket: number) =>
    active &&
    room !== null &&
    get(state).open &&
    ticket === sequence &&
    room.id === get(state).target?.roomId &&
    room.me === get(state).room?.me;
  function failed(ticket: number, error: string) {
    if (!owns(ticket)) return;
    cancelRead();
    state.update((value) => ({
      ...value,
      phase: "error",
      error,
      content: null,
    }));
  }
  function model() {
    const value = get(state);
    if (!value.open || !room || !value.target) return;
    const files = knownViewerFiles(room),
      found = files.find((file) => file.id === value.target!.id);
    if (
      found &&
      value.target.metadata &&
      !sameFile(found, value.target.metadata)
    ) {
      failed(sequence, "metadata-changed");
      return;
    }
    if (room.filesAll && !found) {
      failed(sequence, "missing");
      return;
    }
    const selected = found ?? value.file,
      name = selected?.name ?? value.name;
    const versions = selected ? fileVersions(room, selected.name) : [];
    if (selected && !versions.some((file) => file.id === selected.id))
      versions.push(selected);
    state.update((current) => ({
      ...current,
      room,
      file: selected,
      name,
      versions,
    }));
  }
  function loadIndex(force = false) {
    if (
      !active ||
      !room ||
      !request ||
      !get(state).open ||
      room.filesAll ||
      (indexRequested && !force)
    )
      return;
    cancelIndex();
    indexRequested = true;
    const ticket = indexSequence,
      scope = { id: room.id, me: room.me },
      send = request;
    state.update((value) => ({ ...value, indexPending: true, indexError: "" }));
    const own = () =>
      active &&
      ticket === indexSequence &&
      room?.id === scope.id &&
      room.me === scope.me &&
      get(state).open;
    const expire = () => {
      if (own()) {
        cancelIndex();
        indexRequested = false;
        state.update((value) => ({
          ...value,
          indexPending: false,
          indexError: "index-unconfirmed",
        }));
      }
    };
    indexTimer = clock.schedule(expire, 20_000);
    void Promise.resolve()
      .then(() =>
        own() ? send({ t: "files.get" }) : { ok: false, error: "disposed" },
      )
      .then(
        (result) => {
          if (!own()) return;
          if (room?.filesAll) {
            cancelIndex();
            state.update((value) => ({
              ...value,
              indexPending: false,
              indexError: "",
            }));
            return;
          }
          cancel(indexTimer);
          if (!result.ok) {
            indexRequested = false;
            state.update((value) => ({
              ...value,
              indexPending: false,
              indexError: result.error,
            }));
            return;
          }
          indexTimer = clock.schedule(expire, 10_000);
        },
        (error) => {
          if (own()) {
            cancel(indexTimer);
            indexRequested = false;
            state.update((value) => ({
              ...value,
              indexPending: false,
              indexError: failure(error),
            }));
          }
        },
      );
  }
  async function read() {
    const value = get(state);
    if (!active || !room || !value.open || !value.target) return;
    cancelRead();
    const ticket = sequence,
      target = FileTarget.parse(value.target);
    controller = new AbortController();
    const signal = controller.signal;
    state.update((current) => ({
      ...current,
      phase: "loading",
      error: "",
      content: null,
    }));
    readTimer = clock.schedule(() => failed(ticket, "read-timeout"), 20_000);
    try {
      const probe = await api.probe(target, signal);
      if (!owns(ticket)) return;
      const selected = get(state).file,
        name = selected?.name ?? probe.name ?? value.target.label ?? "file",
        kind = viewerKind(probe.type, name);
      if (selected) {
        const declared = viewerKind(selected.type, selected.name);
        if (
          (probe.size !== undefined && probe.size !== selected.size) ||
          (declared !== kind &&
            !(
              kind === "text" &&
              (declared === "markdown" || declared === "csv")
            ))
        )
          throw Error("metadata-changed");
      }
      const actual = selected ? viewerKind(selected.type, selected.name) : kind;
      state.update((current) => ({
        ...current,
        name,
        content: {
          kind: actual,
          url: fileURL(target, actual === "html"),
          operation: ticket,
        },
      }));
      if (actual === "markdown" || actual === "csv" || actual === "text") {
        const text = await api.text(target, signal);
        if (!owns(ticket)) return;
        cancel(readTimer);
        readTimer = null;
        state.update((current) => ({
          ...current,
          phase: "ready",
          content: {
            kind: actual,
            url: fileURL(target),
            text: text.text,
            truncated: text.truncated,
            operation: ticket,
          },
        }));
      } else if (actual === "download") {
        cancel(readTimer);
        readTimer = null;
        state.update((current) => ({ ...current, phase: "ready" }));
      }
    } catch (error) {
      if (owns(ticket)) failed(ticket, failure(error));
    }
  }
  function open(input: ViewerInput, element?: HTMLElement) {
    if (
      !active ||
      !room ||
      room.id !== input.roomId ||
      !room.members.includes(room.me)
    )
      return false;
    const parsed = FileTarget.safeParse(input);
    if (!parsed.success) return false;
    if (history.deferNavigation(() => open(input, element))) return true;
    const files = knownViewerFiles(room),
      found = files.find((file) => file.id === input.id);
    if (room.filesAll && !found && input.metadata) return false;
    if (input.metadata && (!found || !sameFile(found, input.metadata)))
      return false;
    const previous = get(state);
    if (!previous.open) trigger = element?.isConnected ? element : null;
    cancelRead();
    cancelIndex();
    indexRequested = false;
    history.open(input);
    const pinState = pins ? get(pins.state) : null;
    state.set({
      ...blank(),
      open: true,
      room,
      target: input,
      file: found,
      name: found?.name ?? input.label ?? "file",
      pinPending: !!pinState?.pending,
      pinError: pinState?.error ?? "",
    });
    model();
    loadIndex();
    if (get(state).phase !== "error") void read();
    return true;
  }
  return {
    state,
    sync(next: Room, send: RequestRoomCommand, freshSnapshot = false) {
      if (!active) return;
      if (!next.members.includes(next.me)) {
        closed();
        history.reset();
        disposePins();
        room = null;
        request = undefined;
        trigger = null;
        return;
      }
      if (room && (room.id !== next.id || room.me !== next.me)) {
        closed();
        history.reset();
        trigger = null;
        disposePins();
      }
      room = next;
      request = send;
      if (!pins) {
        pins = createFilesSession(next.id, clock);
        unsubscribePins = pins.state.subscribe((value) =>
          state.update((current) => ({
            ...current,
            pinPending: !!value.pending,
            pinError: value.error,
          })),
        );
      }
      pins.sync(next, freshSnapshot);
      if (freshSnapshot) {
        cancelIndex();
        indexRequested = false;
        state.update((value) => ({
          ...value,
          indexPending: false,
          indexError: "",
        }));
      }
      if (next.filesAll && get(state).indexPending) {
        cancelIndex();
        state.update((value) => ({
          ...value,
          indexPending: false,
          indexError: "",
        }));
      }
      if (get(state).open) {
        model();
        if (freshSnapshot) loadIndex();
      }
    },
    open,
    select(id: string) {
      const value = get(state);
      if (
        !value.open ||
        !value.target ||
        !value.versions.some((file) => file.id === id)
      )
        return;
      const file = value.versions.find((file) => file.id === id)!;
      open({ roomId: value.target.roomId, id, metadata: file });
    },
    retry() {
      if (active && room && get(state).open) {
        model();
        const value = get(state),
          found = knownViewerFiles(room).find(
            (file) => file.id === value.target?.id,
          );
        if (
          (room.filesAll && !found) ||
          (found &&
            value.target?.metadata &&
            !sameFile(found, value.target.metadata))
        )
          return;
        void read();
      }
    },
    retryIndex() {
      loadIndex(true);
    },
    current: owns,
    popOutcome: history.consumePop,
    restoreHistory(
      scope: { roomId: string; account: string; thread: string } | null,
    ) {
      const target = history.incomingTarget();
      if (
        !scope ||
        !active ||
        !room ||
        !target ||
        room.id !== scope.roomId ||
        room.me !== scope.account ||
        target.roomId !== scope.roomId ||
        (new URL(options.href()).searchParams.get("t") || "main") !==
          scope.thread
      )
        return false;
      return open(target);
    },
    togglePin() {
      const value = get(state);
      if (
        active &&
        value.open &&
        value.file &&
        request &&
        pins &&
        room &&
        room.id === value.target?.roomId
      )
        void pins.toggle(value.file, request);
    },
    ready(ticket: number) {
      if (!owns(ticket)) return;
      cancel(readTimer);
      readTimer = null;
      state.update((value) => ({ ...value, phase: "ready", error: "" }));
    },
    mediaError(ticket: number) {
      failed(ticket, "preview-failed");
    },
    closeUser() {
      if (!get(state).open) return;
      closed();
      history.closeUser();
    },
    closeNavigation() {
      closed();
      history.closeNavigation();
    },
    consumePop: () => history.consumePop() === "handled",
    deferNavigation: history.deferNavigation,
    returnFocus() {
      return trigger?.isConnected ? trigger : null;
    },
    reset() {
      closed();
      history.reset();
      disposePins();
      room = null;
      request = undefined;
      trigger = null;
    },
    dispose() {
      active = false;
      closed();
      history.dispose();
      disposePins();
      room = null;
      request = undefined;
      trigger = null;
    },
  };
}
export type FileViewer = ReturnType<typeof createFileViewer>;
