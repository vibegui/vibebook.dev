import type { Message, Room } from "../../../shared/room";
export type Choices = { options: string[]; multi: boolean; closed: boolean };
export function choicesOf(raw: Message["choices"]): Choices | null {
  if (!raw || raw.length > 16384) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (
      !value ||
      typeof value !== "object" ||
      !("options" in value) ||
      !Array.isArray(value.options) ||
      value.options.length < 2 ||
      value.options.length > 8 ||
      value.options.some(
        (o) => typeof o !== "string" || !o.trim() || o.length > 120,
      )
    )
      return null;
    return {
      options: value.options,
      multi: "multi" in value && value.multi === true,
      closed: "closed" in value && !!value.closed,
    };
  } catch {
    return null;
  }
}
export const answerOf = (room: Room, message: Message): Message | undefined =>
  room.messages
    .filter(
      (answer) =>
        answer.reply_to === message.id &&
        answer.author === message.author &&
        answer.kind !== "agent",
    )
    .sort((a, b) => a.id - b.id)[0];
export const canAnswer = (room: Room, message: Message): boolean =>
  room.members.includes(room.me) &&
  message.kind === "agent" &&
  message.author === room.me &&
  !answerOf(room, message);
