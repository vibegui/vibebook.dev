import type {
  ArchivedResult,
  MeResult,
  RouteResult,
  SearchResult,
} from "../../../shared/schemas";
export type RoomSummary = MeResult["books"][number];
export type Wait = MeResult["waits"][number];
export type ArchivedRoom = ArchivedResult["books"][number];
export type Destination =
  | NonNullable<RouteResult["pick"]>
  | { book_id: null; epic_id: null; book_title: string; epic_title: null };
export type RoomTarget = {
  roomId: string;
  thread?: string;
  messageId?: number;
  fileId?: string;
  document?: boolean;
};
export const orderedRooms = (books: readonly RoomSummary[]) =>
  [...books].sort(
    (a, b) =>
      (a.position ?? 1e9) - (b.position ?? 1e9) ||
      (a.created_at ?? 0) - (b.created_at ?? 0),
  );
export const recentRooms = (books: readonly RoomSummary[]) =>
  [...books].sort(
    (a, b) =>
      (b.opened_at ?? 0) - (a.opened_at ?? 0) ||
      (b.updated_at ?? 0) - (a.updated_at ?? 0),
  );
export const unread = (room: RoomSummary, seen = 0) =>
  room.last_human_id > Math.max(room.read_id, seen)
    ? "human"
    : room.last_agent_id > Math.max(room.read_id, seen)
      ? "agent"
      : null;
export function personAvatar(me: MeResult | null, email: string) {
  const version =
    me?.email === email
      ? me.avatar
      : me?.friends.find((friend) => friend.email === email)?.avatar;
  return version
    ? `/api/avatar/${encodeURIComponent(email)}?v=${version}`
    : undefined;
}
export const roomMembers = (room: RoomSummary) =>
  (room.members ?? "").split(",").filter(Boolean);
export const roomIcon = (room: RoomSummary) =>
  room.icon
    ? `/api/books/${encodeURIComponent(room.id)}/icon?v=${room.icon}`
    : undefined;
export const roomInitials = (title: string | null) =>
  (
    (title ?? "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => Array.from(word)[0] ?? "")
      .join("") || "v"
  ).toLocaleUpperCase();
export const fold = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
export const roomMatches = (books: readonly RoomSummary[], query: string) =>
  orderedRooms(books)
    .filter(
      (room) =>
        !query ||
        fold(room.title ?? "").includes(fold(query)) ||
        fold(room.folder ?? "").includes(fold(query)),
    )
    .slice(0, 12);
export const messageIdentity = (value: string | number | undefined) => {
  if (value === undefined) return undefined;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : undefined;
};
export function targetHref(target: RoomTarget) {
  const query = new URLSearchParams({ ui: "svelte" });
  if (target.thread && target.thread !== "main") query.set("t", target.thread);
  return `/b/${encodeURIComponent(target.roomId)}?${query}${target.fileId ? "#f" + encodeURIComponent(target.fileId) : target.messageId ? "#m" + target.messageId : target.document ? "#doc" : ""}`;
}
export function waitTarget(wait: Wait): RoomTarget {
  const id = /^[mab](\d+)$/.exec(wait.ref)?.[1];
  return {
    roomId: wait.book_id,
    thread: wait.thread,
    messageId: messageIdentity(id),
  };
}
export const messageTarget = (
  message: SearchResult["messages"][number],
): RoomTarget => ({
  roomId: message.room_id,
  thread: message.thread,
  messageId: messageIdentity(message.id),
});
export const epicTarget = (
  epic: SearchResult["epics"][number],
): RoomTarget => ({ roomId: epic.room_id, thread: epic.id });
export function destinations(result: RouteResult): Destination[] {
  return [
    ...(result.pick ? [result.pick] : []),
    ...result.alternatives,
    {
      book_id: null,
      epic_id: null,
      book_title: result.new_room_title,
      epic_title: null,
    },
  ];
}
export const tintClasses = {
  blue: "tw:bg-primary/15 tw:text-primary",
  green: "tw:bg-success/15 tw:text-foreground",
  yellow: "tw:bg-warning/15 tw:text-foreground",
  orange: "tw:bg-warning/25 tw:text-foreground",
  pink: "tw:bg-destructive/15 tw:text-foreground",
  purple: "tw:bg-secondary tw:text-secondary-foreground",
  none: "tw:bg-muted tw:text-foreground",
} as const;
export const roomTint = (room: RoomSummary) =>
  tintClasses[
    room.tint && Object.hasOwn(tintClasses, room.tint)
      ? (room.tint as keyof typeof tintClasses)
      : "none"
  ];
