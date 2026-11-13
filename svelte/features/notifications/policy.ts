import type { Message, Room } from "../../../shared/room";
export function notificationPolicy(
  message: Pick<
    Message,
    "text" | "kind" | "author" | "quiet" | "for_who" | "reply_to" | "thread"
  >,
  room: Pick<Room, "me"> & {
    messages: readonly Pick<Message, "id" | "author">[];
  },
  thread: string,
  hidden: boolean,
  muted: boolean,
  target: (handle: string) => string | null | undefined,
) {
  const bot = message.kind === "agent" || message.author === "ai";
  const mentioned = [
    ...message.text.matchAll(/(?:^|[\s(])@([\p{L}\p{N}._-]+)/gu),
  ].some((match) => target(match[1]) === room.me);
  if ((message.author === room.me && !bot) || message.quiet || muted)
    return { chime: false, browser: false, mentioned };
  if (
    bot &&
    message.author !== room.me &&
    !mentioned &&
    message.for_who !== room.me &&
    room.messages.find((value) => value.id === message.reply_to)?.author !==
      room.me
  )
    return { chime: false, browser: false, mentioned };
  const chime = hidden || message.thread !== thread || mentioned;
  return { chime, browser: chime && hidden, mentioned };
}
