import type { Epic, Room, Suggestion } from "../../../shared/room";
import { prettyModel } from "../chat/model";
import type { AgentsResult } from "../../../shared/schemas";
export type Presence = Pick<AgentsResult, "agents" | "sandboxes">;
export { suggestionIdentity } from "../../../shared/suggestions";
export const epicIdentity = (value: Epic) => JSON.stringify(value);
export function suggestionAt(room: Room, thread: string) {
  if (!/^pre:\d+$/.test(thread)) return undefined;
  return room.suggestions[Number(thread.slice(4))];
}
export function messageCount(
  room: Pick<Room, "messages" | "counts" | "countsAt">,
  thread: string,
) {
  const loaded = room.messages.filter((message) => message.thread === thread);
  return room.counts
    ? (room.counts[thread] ?? 0) +
        loaded.filter((message) => message.id > (room.countsAt ?? 0)).length
    : loaded.length;
}
/** Preserve loaded newest-message precedence, descendant traversal cap and summarized versions. */
export function treeFiles(
  room: Pick<Room, "epics" | "messages">,
  epicId: string,
) {
  const ids = [epicId],
    children = new Map<string, string[]>();
  for (const epic of room.epics)
    if (epic.parent)
      children.set(epic.parent, [
        ...(children.get(epic.parent) ?? []),
        epic.id,
      ]);
  for (let index = 0; index < ids.length && ids.length < 60; index++)
    for (const child of children.get(ids[index]) ?? [])
      if (!ids.includes(child)) ids.push(child);
  type File = NonNullable<Epic["files"]>[number];
  const names = new Map<
    string,
    { file: File; seen: Set<string>; count: number }
  >();
  for (let index = room.messages.length - 1; index >= 0; index--) {
    const message = room.messages[index]!;
    if (!ids.includes(message.thread)) continue;
    for (const file of message.files ?? []) {
      const previous = names.get(file.name);
      if (previous) previous.seen.add(file.id);
      else
        names.set(file.name, {
          file: { id: file.id, name: file.name, type: file.type, n: 1 },
          seen: new Set([file.id]),
          count: 0,
        });
    }
  }
  for (const id of ids)
    for (const file of room.epics.find((epic) => epic.id === id)?.files ?? []) {
      const previous = names.get(file.name);
      if (previous)
        previous.count = Math.max(previous.count, file.n, previous.seen.size);
      else
        names.set(file.name, { file, seen: new Set([file.id]), count: file.n });
    }
  return [...names.values()].map(({ file, seen, count }) => ({
    ...file,
    n: Math.max(count, seen.size),
  }));
}
export function agentRows(presence: Presence, email: string) {
  const seen = new Set<string>();
  return presence.agents
    .filter((agent) => agent.email === email)
    .sort((a, b) => Number(b.listening) - Number(a.listening))
    .filter((agent) => {
      const id = prettyModel(agent.who) + agent.repo;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .slice(0, 3);
}
export function contextPercent(tokens: number, window: number) {
  return Number.isFinite(tokens) && Number.isFinite(window) && window > 0
    ? Math.max(0, Math.min(100, Math.round((tokens / window) * 100)))
    : 0;
}
export function sandboxCost(
  sandbox: Presence["sandboxes"][number],
  now: number,
) {
  const running =
    sandbox.state === "running"
      ? Math.max(0, now - (sandbox.checked_at ?? now)) / 1000
      : 0;
  const cost =
    (((sandbox.run_s ?? 0) + running) / 3600) * (sandbox.rate ?? 0) +
    (Math.max(0, now - (sandbox.created_at ?? now)) / 3600000) *
      (sandbox.disk_rate ?? 0);
  return Number.isFinite(cost) ? cost : 0;
}
