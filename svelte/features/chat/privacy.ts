import type { Message, Room } from "../../../shared/room";
/** Hook visibility is a projection; authoritative records stay unchanged, including unloaded-thread origins. */
export const permissionAsk = (message: Message) =>
  message.kind === "agent" &&
  /^\u23f8/.test(message.text || "") &&
  /"options":\["Aprovar","Negar"\]/.test(message.choices || "");
export const messageById = (room: Room, id: number): Message | undefined =>
  room.messages.find((message) => message.id === id) ||
  room.origins?.find((message) => message.id === id);
export const privateAskForOther = (room: Room, message: Message | undefined) =>
  message?.kind === "agent" &&
  message.author !== room.me &&
  /^(⏸ Seu Claude|❓ Seu Claude)/.test(message.text || "");
export function permissionReply(room: Room, message: Message): boolean {
  if (!message.reply_to || message.kind === "agent") return false;
  const prompt = messageById(room, message.reply_to);
  return !!prompt && permissionAsk(prompt) && prompt.author === message.author;
}
export function visibleMessage(room: Room, message: Message): boolean {
  const parent =
    message.reply_to == null ? undefined : messageById(room, message.reply_to);
  return (
    !privateAskForOther(room, message) &&
    !privateAskForOther(room, parent) &&
    !permissionReply(room, message)
  );
}
export const visibleChatMessages = (room: Room, thread: string) =>
  room.messages.filter(
    (message) => message.thread === thread && visibleMessage(room, message),
  );
