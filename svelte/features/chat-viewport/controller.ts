import type { Room, RoomEvent, Message } from "../../../shared/room";
import type { RoomCommand } from "../../../shared/commands";
import { visibleChatMessages } from "../chat/privacy";

export const CHAT_WINDOW = 60,
  MESSAGE_SEARCH_PAGES = 15;
export type KeepChat = "stay" | boolean | undefined;
export type ScrollMetrics = { top: number; height: number; client: number };
export type ScrollCapture = ScrollMetrics & { scope: number };
export type ChatSurface = {
  connected(): boolean;
  metrics(): ScrollMetrics;
  top(value: number): void;
  message(id: number): { reveal(): void; highlight(): void } | null;
  listen(scroll: () => void, growth: () => void): () => void;
};
export function createChatViewport(options: {
  current(): boolean;
  send(command: RoomCommand): boolean;
  render(keep?: KeepChat): void;
  selectThread(thread: string): void;
  notice(kind: "searching" | "missing" | "offline"): void;
  schedule?: (callback: () => void, milliseconds: number) => unknown;
  cancel?: (timer: unknown) => void;
}) {
  let active = true,
    room: Room | null = null,
    thread = "main",
    connectionGeneration = -1,
    scope = 0,
    live = false,
    count = CHAT_WINDOW,
    pinned = true;
  const reads = new Map<string, { fill: boolean; timer: unknown | null }>(),
    done = new Set<string>(),
    filled = new Set<string>(),
    failedReads = new Set<string>(),
    deferred = new Set<unknown>();
  let pending: { id: number; pages: number; scope: number } | null = null,
    timer: unknown | null = null,
    surface: ChatSurface | null = null,
    stop: (() => void) | null = null,
    lastTop = 0;
  const schedule =
    options.schedule ?? ((callback, ms) => setTimeout(callback, ms));
  const cancel =
    options.cancel ??
    ((value) => clearTimeout(value as ReturnType<typeof setTimeout>));
  const current = () =>
    active && !!room && room.members.includes(room.me) && options.current();
  const owns = (ticket: number) => current() && ticket === scope;
  const messages = () =>
    room?.messages.filter((message) => message.thread === thread) ?? [];
  const complete = () =>
    !!room &&
    (!!room.complete || !!room.full?.includes(thread) || done.has(thread));
  function clearTimer() {
    if (timer !== null) cancel(timer);
    timer = null;
  }
  function later(callback: () => void, milliseconds: number) {
    const ticket = scope;
    const value = schedule(() => {
      deferred.delete(value);
      if (owns(ticket)) callback();
    }, milliseconds);
    deferred.add(value);
  }
  function detach() {
    stop?.();
    stop = null;
    surface = null;
    clearTimer();
    pending = null;
    for (const value of deferred) cancel(value);
    deferred.clear();
  }
  function clearReads() {
    for (const [key, value] of reads) {
      if (value.timer !== null) cancel(value.timer);
      if (value.fill) filled.delete(key);
    }
    reads.clear();
  }
  function bottom() {
    if (current() && surface?.connected() && pinned)
      surface.top(surface.metrics().height);
  }
  function pull(fill = false) {
    if (!current() || thread.startsWith("pre:") || reads.has(thread)) return;
    const ticket = scope,
      selected = thread,
      operation: { fill: boolean; timer: unknown | null } = {
        fill,
        timer: null,
      };
    failedReads.delete(selected);
    reads.set(selected, operation);
    let sent = false;
    try {
      sent = options.send({
        t: "older",
        thread: selected,
        before: messages()[0]?.id ?? 0,
      });
    } catch {
      /* A failed queued read owns no pending response. */
    }
    // A passive render must not turn a failed initial fill into an automatic
    // retry. Keep its attempt marker; explicit loadOlder/go or a fresh snapshot
    // may initiate another owned read.
    const failed = () => {
      if (!owns(ticket) || reads.get(selected) !== operation) return;
      reads.delete(selected);
      failedReads.add(selected);
      pending = null;
      clearTimer();
      options.notice("offline");
      if (owns(ticket)) later(() => options.render("stay"), 0);
    };
    if (!sent) failed();
    else if (owns(ticket) && reads.get(selected) === operation)
      operation.timer = schedule(failed, 10_000);
  }
  function reveal(id: number) {
    if (!current() || !surface?.connected()) return false;
    const ticket = scope,
      previousSurface = surface,
      element = surface.message(id);
    if (!element) return false;
    pinned = false;
    element.reveal();
    if (owns(ticket) && surface === previousSurface && surface.connected())
      element.highlight();
    return true;
  }
  function go(id: number, requested?: string) {
    if (!current() || !room || !Number.isSafeInteger(id) || id <= 0) return;
    const identity = [room.id, room.me, connectionGeneration] as const;
    const loaded = room.messages.find((message) => message.id === id);
    const message =
      loaded &&
      visibleChatMessages(room, loaded.thread).some((value) => value.id === id)
        ? loaded
        : undefined;
    const wanted = message?.thread || requested;
    if (
      wanted &&
      wanted !== thread &&
      (wanted === "main" || room.epics.some((epic) => epic.id === wanted))
    ) {
      options.selectThread(wanted);
      if (
        !current() ||
        !room ||
        room.id !== identity[0] ||
        room.me !== identity[1] ||
        connectionGeneration !== identity[2] ||
        thread !== wanted
      )
        return;
    }
    const ticket = scope;
    const found = reveal(id);
    if (!owns(ticket)) return;
    if (found) {
      pending = null;
      clearTimer();
      return;
    }
    if (message) {
      const all = visibleChatMessages(room, thread),
        index = all.findIndex((value) => value.id === id);
      if (index >= 0) {
        count = Math.max(count, all.length - index + 10);
        options.render(true);
        if (!owns(ticket)) return;
        const shown = reveal(id);
        if (!owns(ticket)) return;
        if (shown) {
          pending = null;
          clearTimer();
          return;
        }
      }
    }
    if (pending?.id === id && pending.scope === scope) return;
    clearTimer();
    pending = { id, pages: 1, scope };
    options.notice("searching");
    if (owns(ticket)) pull();
  }
  return {
    sync(
      next: Room,
      selected: string,
      generation: number,
      authoritative: boolean,
      fresh = false,
    ) {
      if (!active) return false;
      if (!next.members.includes(next.me)) {
        scope++;
        detach();
        clearReads();
        room = null;
        done.clear();
        filled.clear();
        failedReads.clear();
        return true;
      }
      const newConnection =
        !room ||
        room.id !== next.id ||
        room.me !== next.me ||
        connectionGeneration !== generation;
      const changed = newConnection || selected !== thread;
      if (changed || fresh) {
        scope++;
        detach();
        if (changed) {
          count = CHAT_WINDOW;
          pinned = true;
        }
      }
      if (changed || fresh) clearReads();
      if (newConnection || fresh) {
        done.clear();
        filled.clear();
        failedReads.clear();
      }
      room = next;
      thread = selected;
      connectionGeneration = generation;
      live = authoritative;
      return changed;
    },
    selection(): {
      list: Message[];
      previous: Message | undefined;
      more: boolean;
    } {
      if (!current() || !room || thread.startsWith("pre:"))
        return { list: [], previous: undefined, more: false };
      const all = visibleChatMessages(room, thread),
        list = all.slice(-count);
      return {
        list,
        previous: all[all.length - list.length - 1],
        more:
          all.length > list.length ||
          ((!!all.length || failedReads.has(thread)) && !complete()),
      };
    },
    ensureFilled() {
      if (
        current() &&
        room &&
        live &&
        visibleChatMessages(room, thread).length < CHAT_WINDOW &&
        !complete() &&
        !reads.has(thread) &&
        !filled.has(thread)
      ) {
        filled.add(thread);
        pull(true);
      }
    },
    loadOlder() {
      if (!current() || thread.startsWith("pre:") || reads.has(thread)) return;
      if (room && visibleChatMessages(room, thread).length > count) {
        count += CHAT_WINDOW;
        options.render(true);
        return;
      }
      if (!complete() && (messages().length || failedReads.has(thread))) pull();
    },
    older(event: Extract<RoomEvent, { t: "older" }>) {
      if (!current()) return;
      const read = reads.get(event.thread);
      if (read?.timer !== null && read?.timer !== undefined) cancel(read.timer);
      reads.delete(event.thread);
      failedReads.delete(event.thread);
      if (!event.more) done.add(event.thread);
      if (event.thread !== thread) return;
      count += event.messages.length;
      const ticket = scope,
        search = pending;
      options.render(read?.fill ? false : true);
      if (!owns(ticket) || !search || pending !== search) return;
      if (
        room &&
        visibleChatMessages(room, thread).some(
          (message) => message.id === search.id,
        )
      ) {
        pending = null;
        clearTimer();
        timer = schedule(() => {
          timer = null;
          if (owns(ticket) && pending === null) go(search.id);
        }, 50);
      } else if (event.more && search.pages < MESSAGE_SEARCH_PAGES) {
        search.pages++;
        pull();
      } else {
        pending = null;
        options.notice("missing");
      }
    },
    go,
    attach(next: ChatSurface) {
      if (!current() || surface === next) return;
      stop?.();
      surface = next;
      lastTop = next.metrics().top;
      const ticket = scope;
      stop = next.listen(
        () => {
          if (!owns(ticket) || surface !== next || !next.connected()) return;
          const value = next.metrics();
          if (value.height - value.top - value.client < 80) pinned = true;
          else if (value.top < lastTop - 2) pinned = false;
          lastTop = value.top;
          if (value.top < 150 && !pinned) this.loadOlder();
        },
        () => {
          if (owns(ticket) && surface === next) bottom();
        },
      );
    },
    capture(): ScrollCapture | null {
      return current() && surface?.connected()
        ? { ...surface.metrics(), scope }
        : null;
    },
    afterRender(keep: KeepChat, before: ScrollCapture | null) {
      if (
        !current() ||
        !surface?.connected() ||
        !before ||
        before.scope !== scope
      )
        return;
      const ticket = scope,
        ownedSurface = surface;
      if (keep === "stay") ownedSurface.top(before.top);
      else if (keep)
        ownedSurface.top(
          before.top + ownedSurface.metrics().height - before.height,
        );
      else {
        pinned = true;
        bottom();
      }
      if (owns(ticket) && surface === ownedSurface)
        lastTop = ownedSurface.metrics().top;
    },
    pinned: () => pinned,
    defer: later,
    cancelSearch() {
      pending = null;
      clearTimer();
    },
    reset() {
      scope++;
      detach();
      room = null;
      clearReads();
      done.clear();
      filled.clear();
      failedReads.clear();
      count = CHAT_WINDOW;
      live = false;
      pinned = true;
    },
    dispose() {
      active = false;
      scope++;
      detach();
      room = null;
      clearReads();
      done.clear();
      filled.clear();
      failedReads.clear();
    },
  };
}
export type ChatViewport = ReturnType<typeof createChatViewport>;
