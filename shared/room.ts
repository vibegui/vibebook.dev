// JSON DTOs shared by the Cloudflare Worker and browser (M1): runtime schemas first, every type derived from them.
// Browser-safe: zod/mini only, no backend imports. The events built from these live in events.ts.
import * as z from "zod/mini";

const str = z.string();
const num = z.number();
const bool = z.boolean();
const opt = <T extends z.ZodMiniType>(t: T) => z.optional(t);
const maybe = <T extends z.ZodMiniType>(t: T) => z.optional(z.nullable(t));
const strings = z.array(str);

export const TASK_STATUSES = ["todo", "doing", "review", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const BookMetaSchema = z.object({
  title: str,
  owner: str,
  summary: maybe(str),
  folder: maybe(str),
});
export type BookMeta = z.infer<typeof BookMetaSchema>;
export const SuggestionSchema = z.object({
  title: str,
  tasks: strings,
  why: opt(str),
});
export type Suggestion = z.infer<typeof SuggestionSchema>;
export const DecisionSchema = z.object({
  id: num,
  text: str,
  who: str,
  kind: str,
  ts: num,
});
export type Decision = z.infer<typeof DecisionSchema>;
export const PinSchema = z.object({
  id: str,
  kind: str,
  ref: str,
  title: opt(str),
  author: opt(str),
  ts: opt(num),
});
export type Pin = z.infer<typeof PinSchema>;
export const PollSchema = z.object({
  id: str,
  question: str,
  options: strings,
  multi: bool,
  closed: bool,
  author: str,
  votes: z.array(strings),
});
export type Poll = z.infer<typeof PollSchema>;
export const TaskSchema = z.object({
  id: str,
  title: str,
  done: bool,
  status: z.enum(TASK_STATUSES),
  owner: maybe(str),
  due: maybe(str),
  flags: opt(strings),
  epic_id: opt(str),
});
export type Task = z.infer<typeof TaskSchema>;
export const EpicSchema = z.object({
  id: str,
  title: str,
  tasks: z.array(TaskSchema),
  archived: opt(bool),
  owner: maybe(str),
  from_msg: maybe(num),
  parent: maybe(str),
  kept: opt(bool),
  files: opt(z.array(z.object({ id: str, name: str, type: str, n: num }))),
  flags: opt(strings),
  prod: maybe(z.object({ stage: str, note: opt(str), at: opt(num) })),
});
export type Epic = z.infer<typeof EpicSchema>;
export const AttachmentSchema = z.object({
  id: str,
  name: str,
  type: str,
  size: num,
  author: str,
  ts: num,
  embed: opt(bool),
});
export type Attachment = z.infer<typeof AttachmentSchema>;
export const MessageSchema = z.object({
  id: num,
  thread: str,
  author: str,
  ts: num,
  text: str,
  kind: maybe(str),
  tag: maybe(str),
  via: maybe(str),
  reply_to: maybe(num),
  choices: maybe(str),
  poll: maybe(str),
  card: maybe(str),
  quiet: opt(bool),
  cut: opt(bool),
  answers_ask: opt(bool),
  for_who: maybe(str),
  files: opt(z.array(AttachmentSchema)),
});
export type Message = z.infer<typeof MessageSchema>;
export const AckSchema = z.object({
  msg_id: num,
  agent: opt(str),
  email: str,
  who: str,
  status: str,
  ts: num,
  note: maybe(str),
});
export type Ack = z.infer<typeof AckSchema>;
export const ReminderSchema = z.object({
  id: str,
  name: maybe(str),
  text: str,
  owner: str,
  enabled: bool,
  error: maybe(str),
  every: maybe(str),
  cron: maybe(str),
  next_at: maybe(num),
  thread: opt(str),
  tz: opt(str),
  file_id: maybe(str),
});
export type Reminder = z.infer<typeof ReminderSchema>;
export const AccessRequestSchema = z.object({
  email: str,
  name: maybe(str),
  ts: num,
});
export const ReceiptSchema = z.object({
  email: str,
  who: str,
  read: num,
  delivered: num,
  agent: opt(str),
  ts: opt(num),
});

/** What opening a room sends (the `state` event, without its `t`). */
export const RoomSnapshotSchema = z.object({
  me: str,
  book: BookMetaSchema,
  messages: z.array(MessageSchema),
  epics: z.array(EpicSchema),
  roomTasks: opt(z.array(TaskSchema)),
  members: strings,
  online: strings,
  names: opt(z.record(str, str)),
  avatars: opt(z.record(str, num)),
  pending: opt(strings),
  requests: opt(z.array(AccessRequestSchema)),
  suggestions: z.array(SuggestionSchema),
  files: opt(z.array(AttachmentSchema)),
  filesN: opt(num),
  filesAll: opt(bool),
  reminders: opt(z.array(ReminderSchema)),
  acks: opt(z.array(AckSchema)),
  receipts: opt(z.array(ReceiptSchema)),
  counts: opt(z.record(str, num)),
  countsAt: opt(num),
  full: opt(strings),
  complete: opt(bool),
  origins: opt(z.array(MessageSchema)),
  docs: opt(z.record(str, str)),
  doc: opt(str),
  docNotes: opt(strings),
  decisions: opt(z.array(DecisionSchema)),
  pins: opt(z.array(PinSchema)),
  polls: opt(z.record(str, PollSchema)),
});
/** The room as the browser keeps it: the snapshot plus its id and who is typing. */
export type Room = z.infer<typeof RoomSnapshotSchema> & {
  id: string;
  typing: Record<string, string>;
};

export type {
  DocumentContentEvent,
  DocumentInvalidationEvent,
  RoomEvent,
} from "./events";
