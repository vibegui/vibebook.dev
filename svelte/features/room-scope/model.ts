import type { Room, Message } from "../../../shared/room";
import type { MeResult } from "../../../shared/schemas";
import { fold } from "../composer/model";
export function roomMessages(room: Room): Message[] {
  return [
    ...room.messages,
    ...(room.origins ?? []).filter(
      (origin) => !room.messages.some((message) => message.id === origin.id),
    ),
  ];
}
export function roomName(room: Room, me: MeResult | null, email: string) {
  return email === "ai"
    ? "@vibe"
    : room.names?.[email] ||
        (me?.email === email
          ? me.name
          : me?.friends.find((friend) => friend.email === email)?.name) ||
        email.split("@")[0]!;
}
export function roomAvatar(room: Room, me: MeResult | null, email: string) {
  const version =
    room.avatars?.[email] ??
    (me?.email === email
      ? me.avatar
      : me?.friends.find((friend) => friend.email === email)?.avatar);
  return version
    ? `/api/avatar/${encodeURIComponent(email)}?v=${version}`
    : undefined;
}
export function roomMention(room: Room, me: MeResult | null, handle: string) {
  const key = fold(handle);
  if (key === "vibe" || key === "ai") return "ai";
  return (
    room.members.find((email) => {
      const local = email.split("@")[0]!;
      const display =
        room.names?.[email] ||
        (me?.email === email
          ? me.name
          : me?.friends.find((friend) => friend.email === email)?.name) ||
        "";
      return [
        fold(display.split(/\s+/)[0] || ""),
        fold(local.split(/[._+-]/)[0]!),
        fold(local),
      ]
        .filter(Boolean)
        .includes(key);
    }) ?? null
  );
}
