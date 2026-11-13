import * as z from "zod/mini";
import {
  FileTarget,
  fileRoomURL,
  fileTargetFromRoomURL,
  type FileTarget as Target,
} from "./model";
export type ViewerClock = {
  schedule(callback: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
export const viewerClock: ViewerClock = {
  schedule: (callback, ms) => setTimeout(callback, ms),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
const HistoryRecord = z.object({
  token: z.string(),
  roomId: z.string(),
  id: z.string(),
  returnURL: z.string(),
});
const HistoryState = z.object({ vbFileViewer: HistoryRecord });
type RecordData = z.infer<typeof HistoryRecord>;
/** Own just one overlay history entry. A route never races an already requested Back. */
export function createViewerHistory(options: {
  href: () => string;
  state: () => unknown;
  history: Pick<History, "pushState" | "replaceState" | "back">;
  clock?: ViewerClock;
  closed: () => void;
  unconfirmed?: () => void;
  enqueue?: (callback: () => void) => void;
}) {
  const clock = options.clock ?? viewerClock,
    enqueue = options.enqueue ?? queueMicrotask;
  let active = true,
    record: RecordData | null = null,
    pending: RecordData | null = null,
    timer: unknown | null = null,
    queued: (() => void) | null = null,
    sequence = 0,
    intent = 0;
  const local = (value: string, roomId: string) => {
    try {
      const current = new URL(options.href()),
        url = new URL(value, current);
      return url.origin === current.origin &&
        new RegExp(`^/b/${roomId}/?$`).test(url.pathname)
        ? url.pathname + url.search + url.hash
        : null;
    } catch {
      return null;
    }
  };
  const current = () => {
    const parsed = HistoryState.safeParse(options.state());
    if (!parsed.success) return null;
    const target = FileTarget.safeParse(parsed.data.vbFileViewer);
    if (
      !target.success ||
      !local(parsed.data.vbFileViewer.returnURL, target.data.roomId) ||
      !local(options.href(), target.data.roomId)
    )
      return null;
    return parsed.data.vbFileViewer;
  };
  const write = (entry: RecordData, replace: boolean) => {
    const target = FileTarget.parse(entry),
      url = new URL(fileRoomURL(target), options.href()),
      previous = new URL(options.href());
    url.pathname = previous.pathname;
    url.search = previous.search;
    options.history[replace ? "replaceState" : "pushState"](
      { vbFileViewer: entry },
      "",
      url.pathname + url.search + url.hash,
    );
  };
  const clearTimer = () => {
    if (timer !== null) clock.cancel(timer);
    timer = null;
  };
  const finishPending = (matched: boolean) => {
    clearTimer();
    pending = null;
    const next = queued;
    queued = null;
    const owner = intent;
    if (matched && next)
      enqueue(() => {
        if (active && intent === owner) next();
      });
  };
  return {
    incomingTarget() {
      const entry = current(),
        target = fileTargetFromRoomURL(options.href());
      return entry && target?.roomId === entry.roomId && target.id === entry.id
        ? target
        : null;
    },
    open(input: Target) {
      if (!active) return;
      intent++;
      const target = FileTarget.parse(input),
        existing = current(),
        url = new URL(options.href());
      if (record && existing?.token === record.token) {
        record = { ...record, ...target };
        write(record, true);
        return;
      }
      if (
        existing &&
        existing.roomId === target.roomId &&
        url.hash === `#f${target.id}`
      ) {
        record = { ...existing, ...target };
        return;
      }
      if (/^#f[0-9a-f]+$/.test(url.hash)) {
        url.hash = "";
        options.history.replaceState(null, "", url.pathname + url.search);
      }
      const returnURL = local(
        url.pathname + url.search + url.hash,
        target.roomId,
      );
      if (!returnURL) throw Error("viewer-route-mismatch");
      record = {
        ...target,
        token: `file-${++sequence}-${Math.random().toString(36).slice(2)}`,
        returnURL,
      };
      write(record, false);
    },
    replace(input: Target) {
      if (!active || !record) return;
      const target = FileTarget.parse(input);
      if (target.roomId !== record.roomId) return;
      record = { ...record, ...target };
      if (current()?.token === record.token) write(record, true);
    },
    closeUser() {
      if (!active || !record) return;
      const entry = record;
      record = null;
      if (current()?.token !== entry.token) return;
      pending = entry;
      options.history.back();
      clearTimer();
      timer = clock.schedule(() => {
        if (!active || pending?.token !== entry.token) return;
        timer = null;
        options.unconfirmed?.();
      }, 1500);
    },
    closeNavigation() {
      if (!active) return;
      intent++;
      const owned = record;
      record = null;
      const entry = current();
      if (owned && entry?.token === owned.token)
        options.history.replaceState(
          null,
          "",
          new URL(options.href()).pathname +
            new URL(options.href()).search +
            new URL(options.href()).hash,
        );
    },
    deferNavigation(callback: () => void) {
      if (!active || !pending) return false;
      intent++;
      queued = callback;
      return true;
    },
    consumePop(): "handled" | "route" | "none" {
      if (!active) return "none";
      const entry = pending ?? record;
      if (!entry) return "none";
      const url = new URL(options.href()),
        here = url.pathname + url.search + url.hash;
      record = null;
      options.closed();
      const expected = here === entry.returnURL;
      if (pending) finishPending(expected);
      return expected ? "handled" : "route";
    },
    reset() {
      intent++;
      record = null;
      pending = null;
      queued = null;
      clearTimer();
    },
    dispose() {
      intent++;
      active = false;
      record = null;
      pending = null;
      queued = null;
      clearTimer();
    },
  };
}
export type ViewerHistory = ReturnType<typeof createViewerHistory>;
