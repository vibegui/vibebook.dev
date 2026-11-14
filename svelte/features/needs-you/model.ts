import type { Room } from "../../../shared/room";
import type { Wait } from "../../types";
export type NeedsBinding = { account: string; roomId: string; thread: string };
export type NeedsItem = {
  key: string;
  signature: string;
  text: string;
  kind: "ask" | "agent" | "review" | "doing" | "todo";
  author?: string;
  messageId?: number;
  wait?: Wait;
};
export function needsItems(
  room: Room,
  thread: string,
  waits: readonly Wait[],
): NeedsItem[] {
  if (
    thread.startsWith("pre:") ||
    (thread !== "main" && !room.epics.some((e) => e.id === thread))
  )
    return [];
  const here = waits.filter(
    (w) => w.book_id === room.id && w.thread === thread,
  );
  const waitingTasks = new Set(
    here.filter((w) => w.ref.startsWith("t")).map((w) => w.ref.slice(1)),
  );
  const tasks =
    thread === "main"
      ? (room.roomTasks ?? [])
      : (room.epics.find((e) => e.id === thread)?.tasks ?? []);
  return [
    ...here.map((wait): NeedsItem => {
      const id = /^[mab]\d+$/.test(wait.ref) ? Number(wait.ref.slice(1)) : NaN;
      return {
        key: `w:${wait.ref}`,
        signature: JSON.stringify([
          "wait",
          wait.ref,
          wait.thread,
          wait.author,
          wait.text,
          wait.ts,
        ]),
        text: wait.text,
        kind: wait.ref.startsWith("t")
          ? "review"
          : wait.ref.startsWith("m")
            ? "ask"
            : "agent",
        author: wait.author,
        messageId: Number.isSafeInteger(id) && id > 0 ? id : undefined,
        wait,
      };
    }),
    ...tasks
      .filter(
        (task) =>
          task.owner === room.me && !task.done && !waitingTasks.has(task.id),
      )
      .map((task): NeedsItem => ({
        key: `t:${task.id}:${task.status}`,
        signature: JSON.stringify([
          "task",
          task.id,
          task.status,
          task.title,
          task.owner,
          task.done,
        ]),
        text: task.title,
        kind:
          task.status === "doing"
            ? "doing"
            : task.status === "review"
              ? "review"
              : "todo",
      })),
  ];
}
// Browser-local keys only, never private text. Isolate accounts as well as targets.
export const needsStorageKey = (binding: NeedsBinding) =>
  `vb.needs.${encodeURIComponent(binding.account)}.${binding.roomId}.${binding.thread}`;
export function dismissedKeys(raw: string | null): Set<string> {
  if (raw && raw.length > 256000) return new Set();
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    return new Set(
      Array.isArray(value)
        ? value
            .filter(
              (key): key is string =>
                typeof key === "string" && key.length <= 1024,
            )
            .slice(-200)
        : [],
    );
  } catch {
    return new Set();
  }
}
export type NeedsView = {
  binding: NeedsBinding;
  items: NeedsItem[];
  busy: boolean;
  error: boolean;
  operation: number;
};
