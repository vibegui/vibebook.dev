import type { Room } from "../../../shared/room";
export type PeopleRoom = Pick<
  Room,
  | "id"
  | "me"
  | "book"
  | "members"
  | "online"
  | "pending"
  | "requests"
  | "names"
  | "avatars"
>;
export type PeopleAction = "invite" | "resend" | "remove" | "approve" | "deny";
export const normalizeEmail = (email: string) => email.trim().toLowerCase();
export function canRemove(room: PeopleRoom, email: string) {
  return (
    room.members.includes(email) &&
    email !== room.book.owner &&
    (!!room.pending?.includes(email) || room.me === room.book.owner)
  );
}
export function canAct(room: PeopleRoom, action: PeopleAction, email: string) {
  if (!room.members.includes(room.me)) return false;
  if (action === "remove") return !!canRemove(room, email);
  if (action === "resend") return !!room.pending?.includes(email);
  if (action === "approve" || action === "deny")
    return !!room.requests?.some((r) => r.email === email);
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !room.members.includes(email)
  );
}
export function peopleModel(room: PeopleRoom, friends: readonly string[]) {
  const online = room.members.filter(
    (email) => email === room.me || room.online.includes(email),
  );
  return {
    online,
    offline: room.members.filter((email) => !online.includes(email)),
    friends: friends.filter((email) => !room.members.includes(email)),
  };
}
export function inviteMessage(
  room: PeopleRoom,
  email: string,
  origin: string,
  t: (text: string, vars?: Record<string, string | number>) => string,
) {
  const url = `${origin}/b/${room.id}`;
  return `${t('Te convidei pro vibebook "{title}": {url}', { title: room.book.title, url })}\n\n${t("1. Entra com {email} (o convite chegou nesse email).", { email })}\n${t("2. Manda isto pro seu Claude Code:")}\n\nRead ${origin}/llms.txt and set up vibebook for this project. Room: ${url}`;
}
