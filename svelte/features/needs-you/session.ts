import type { Room } from "../../../shared/room";
import type { Wait } from "../../types";
import {
  needsItems,
  needsStorageKey,
  dismissedKeys,
  type NeedsBinding,
  type NeedsItem,
  type NeedsView,
} from "./model";
import { createAgentLease, type AgentClock } from "../agents/lease";
import { HomeFailure, type HomeApi } from "../home/api";
export function createNeedsYou(options: {
  read(): { room: Room; thread: string; waits: readonly Wait[] } | null;
  current(): boolean;
  storage: Pick<Storage, "getItem" | "setItem"> | null;
  clock?: AgentClock;
  resolve: HomeApi["resolve"];
  navigate(id: number, thread: string): void;
  changed(): void;
  denied(): void;
  resolved(): void;
}) {
  let active = true,
    target = "",
    operation = 0,
    busy = false,
    failed: NeedsItem[] = [],
    inFlight: NeedsItem[] = [];
  const lease = createAgentLease(options.clock),
    hidden = new Map<string, Set<string>>(),
    stored = new Map<string, string | null>();
  function read() {
    if (!active || !options.current()) return null;
    const value = options.read();
    if (!value) return null;
    const binding: NeedsBinding = {
      account: value.room.me,
      roomId: value.room.id,
      thread: value.thread,
    };
    const key = needsStorageKey(binding);
    if (target !== key) {
      target = key;
      operation++;
      lease.cancel();
      busy = false;
      failed = [];
      inFlight = [];
    }
    try {
      const raw = options.storage?.getItem(key) ?? null;
      if (!stored.has(key) || stored.get(key) !== raw) {
        stored.set(key, raw);
        hidden.set(key, dismissedKeys(raw));
      }
    } catch {}
    if (!hidden.has(key)) hidden.set(key, new Set());
    const latest = options.read();
    if (
      !active ||
      !options.current() ||
      !latest ||
      latest.room.id !== binding.roomId ||
      latest.room.me !== binding.account ||
      latest.thread !== binding.thread
    )
      return null;
    return {
      binding,
      key,
      items: needsItems(latest.room, latest.thread, latest.waits),
    };
  }
  const owned = (binding: NeedsBinding) => {
    const value = read();
    return value && value.key === needsStorageKey(binding) ? value : null;
  };
  const matching = (binding: NeedsBinding, items: readonly NeedsItem[]) => {
    const value = owned(binding);
    return value
      ? items.filter((item) =>
          value.items.some(
            (now) => now.key === item.key && now.signature === item.signature,
          ),
        )
      : [];
  };
  async function send(binding: NeedsBinding, items: NeedsItem[]) {
    if (!owned(binding) || busy || !items.length) return;
    const ticket = ++operation;
    busy = true;
    failed = [];
    inFlight = items;
    options.changed();
    if (!owned(binding) || ticket !== operation) return;
    const writes = matching(binding, items).flatMap((item) =>
      item.wait?.ref.startsWith("m") ? [{ ref: item.wait.ref }] : [],
    );
    if (!writes.length) {
      busy = false;
      options.changed();
      return;
    }
    try {
      await lease.run(
        (signal) =>
          Promise.all(
            writes.map((write) => {
              if (!owned(binding) || ticket !== operation)
                throw Error("cancelled");
              return options.resolve(binding.roomId, write.ref, signal);
            }),
          ),
        20_000,
      );
      if (!owned(binding) || ticket !== operation) return;
      busy = false;
      inFlight = [];
      options.resolved();
      if (owned(binding) && ticket === operation) options.changed();
    } catch (error) {
      if (!owned(binding) || ticket !== operation) return;
      busy = false;
      if (error instanceof HomeFailure && error.status === 401) {
        options.denied();
        return;
      }
      inFlight = [];
      failed = matching(binding, items);
      options.changed();
    }
  }
  return {
    view(): NeedsView | null {
      const value = read();
      if (!value || value.binding.thread.startsWith("pre:")) return null;
      if (
        busy &&
        inFlight.length &&
        !inFlight.some((item) =>
          value.items.some(
            (now) => now.key === item.key && now.signature === item.signature,
          ),
        )
      ) {
        operation++;
        lease.cancel();
        busy = false;
        inFlight = [];
      }
      failed = matching(value.binding, failed);
      return {
        binding: value.binding,
        items: value.items.filter(
          (item) => !hidden.get(value.key)?.has(item.key),
        ),
        busy,
        error: !!failed.length,
        operation,
      };
    },
    dismiss(binding: NeedsBinding, selected: readonly NeedsItem[]) {
      if (busy) return;
      const items = matching(binding, selected).filter(
          (item) => !hidden.get(needsStorageKey(binding))?.has(item.key),
        ),
        value = owned(binding);
      if (!value || !items.length) return;
      const keys = hidden.get(value.key) ?? new Set<string>();
      for (const item of items) keys.add(item.key);
      const limited = new Set([...keys].slice(-200));
      hidden.set(value.key, limited);
      try {
        if (options.storage) {
          const raw = JSON.stringify([...limited]);
          options.storage.setItem(value.key, raw);
          stored.set(value.key, raw);
        }
      } catch {}
      options.changed();
      if (!owned(binding)) return;
      // Resolving a wait is idempotent (DELETE by account/book/ref). Local hiding
      // remains separate from HTTP success; failures offer only explicit retry.
      const writes = matching(binding, items).filter((item) =>
        item.wait?.ref.startsWith("m"),
      );
      if (writes.length) void send(binding, writes);
    },
    retry(binding: NeedsBinding, expected: number) {
      if (expected !== operation || busy) return;
      const items = matching(binding, failed);
      if (items.length) void send(binding, items);
    },
    navigate(binding: NeedsBinding, item: NeedsItem) {
      if (matching(binding, [item]).length && item.messageId)
        options.navigate(item.messageId, binding.thread);
    },
    dispose() {
      active = false;
      operation++;
      lease.cancel();
      failed = [];
      inFlight = [];
      hidden.clear();
      stored.clear();
      busy = false;
    },
  };
}
export type NeedsYouSession = ReturnType<typeof createNeedsYou>;
