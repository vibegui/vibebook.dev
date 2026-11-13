import type { PostMessageRequest } from "./rpc";
import { PostMessageBody } from "./schemas";
import {
  AckSchema,
  AttachmentSchema,
  BookMetaSchema,
  DecisionSchema,
  EpicSchema,
  MessageSchema,
  PinSchema,
  PollSchema,
  ReminderSchema,
  SuggestionSchema,
  TaskSchema,
  type Ack,
  type Attachment,
  type BookMeta,
  type Decision,
  type Epic,
  type Message,
  type Pin,
  type Poll,
  type Reminder,
  type RoomEvent,
  type Suggestion,
  type Task,
} from "./room";
import { isRoomEventValue } from "./events";
import { CommandId, RoomCommandSchema, type RoomCommand } from "./commands";

// JSON guards built on the shared schemas: no Worker or UI dependency, and no unchecked JSON.parse casts at transport
// boundaries.
export const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const is =
  <T>(schema: { safeParse(value: unknown): { success: boolean } }) =>
  (value: unknown): value is T =>
    schema.safeParse(value).success;
// Each DTO's guard is its schema (shared/room.ts); a valid value is passed on as sent.
export const isAttachment = is<Attachment>(AttachmentSchema);
export const isTask = is<Task>(TaskSchema);
export const isEpic = is<Epic>(EpicSchema);
export const isMessage = is<Message>(MessageSchema);
export const isAck = is<Ack>(AckSchema);
export const isReminder = is<Reminder>(ReminderSchema);
export const isBookMeta = is<BookMeta>(BookMetaSchema);
export const isSuggestion = is<Suggestion>(SuggestionSchema);
export const isDecision = is<Decision>(DecisionSchema);
export const isPin = is<Pin>(PinSchema);
export const isPoll = is<Poll>(PollSchema);
/** One schema per event `t` (shared/events.ts). */
export const isRoomEvent = isRoomEventValue;
// Rolling deployments can pair a new browser with the previous Worker briefly.
// Previous snapshots serialized SQLite's 0/1 flags; normalize those exact values
// here rather than widening every consumer's boolean contract.
function normalizeLegacyFlags(value: unknown): unknown {
  if (!record(value)) return value;
  const flag = (row: unknown, key: string): unknown =>
    record(row) && (row[key] === 0 || row[key] === 1)
      ? { ...row, [key]: row[key] === 1 }
      : row;
  const tasks = (rows: unknown): unknown =>
    Array.isArray(rows) ? rows.map((row) => flag(row, "done")) : rows;
  const epics = (rows: unknown): unknown =>
    Array.isArray(rows)
      ? rows.map((row) =>
          record(row) ? { ...row, tasks: tasks(row.tasks) } : row,
        )
      : rows;
  const reminders = (rows: unknown): unknown =>
    Array.isArray(rows) ? rows.map((row) => flag(row, "enabled")) : rows;
  if (value.t === "state" || value.t === "epics")
    return {
      ...value,
      epics: epics(value.epics),
      ...(value.roomTasks === undefined
        ? {}
        : { roomTasks: tasks(value.roomTasks) }),
      ...(value.reminders === undefined
        ? {}
        : { reminders: reminders(value.reminders) }),
    };
  if (value.t === "epicsPatch")
    return {
      ...value,
      changed: epics(value.changed),
      ...(value.roomTasks === undefined
        ? {}
        : { roomTasks: tasks(value.roomTasks) }),
    };
  if (value.t === "reminders")
    return { ...value, reminders: reminders(value.reminders) };
  return value;
}
export function parseRoomEvent(raw: string): RoomEvent {
  const value: unknown = normalizeLegacyFlags(JSON.parse(raw));
  if (!isRoomEvent(value)) throw new TypeError("Invalid room event");
  return value;
}

// The command schemas live in commands.ts; a valid command is passed on as sent (extra keys are ignored, as before).
export function isRoomCommand(value: unknown): value is RoomCommand {
  return RoomCommandSchema.safeParse(value).success;
}
/** A command off the wire plus its correlation id, if it carried a valid one. `cid` is read even when the command is
 *  invalid, so the sender still gets its answer; a malformed `cid` counts as none. */
export function parseCommandEnvelope(raw: string): {
  cid?: string;
  command: RoomCommand | null;
} {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { command: null };
  }
  const cid =
    record(value) && CommandId.safeParse(value.cid).success
      ? (value.cid as string)
      : undefined;
  // Already-open pre-migration browser tabs sent decision IDs from dataset
  // as strings. Preserve that wire format while exposing a numeric command.
  if (
    record(value) &&
    value.t === "decision.del" &&
    typeof value.id === "string" &&
    /^\d+$/.test(value.id)
  ) {
    const id = Number(value.id);
    if (Number.isSafeInteger(id)) value = { ...value, id };
  }
  return {
    ...(cid ? { cid } : {}),
    command: isRoomCommand(value) ? value : null,
  };
}
export function parseRoomCommand(raw: string): RoomCommand {
  const { command } = parseCommandEnvelope(raw);
  if (!command) throw new TypeError("Invalid room command");
  return command;
}

export function isPostMessageRequest(
  value: unknown,
): value is PostMessageRequest {
  return PostMessageBody.safeParse(value).success;
}
