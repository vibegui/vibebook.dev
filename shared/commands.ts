import * as z from "zod/mini";
import { TASK_STATUSES } from "./room";

// Commands accepted by Book.webSocketMessage (M1): the runtime schemas are the source, the TypeScript type is derived
// from them. Authentication and every business rule stay on the server. Browser-safe: zod/mini only.
const id = z.string();
const num = z.number();
export const RoomCommandSchema = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("msg"),
    thread: z.string(),
    text: z.optional(z.string()),
    files: z.optional(z.array(z.string())),
    reply_to: z.optional(z.nullable(num)),
  }),
  z.object({ t: z.literal("files.get") }),
  z.object({
    t: z.literal("doc.get"),
    epic: z.optional(z.nullable(z.string())),
  }),
  z.object({
    t: z.literal("doc"),
    text: z.string(),
    epic: z.optional(z.nullable(z.string())),
  }),
  z.object({ t: z.literal("title"), title: z.string() }),
  z.object({ t: z.literal("epic"), title: z.string() }),
  z.object({ t: z.literal("epic.owner"), id, owner: z.string() }),
  z.object({ t: z.literal("task.add"), epic: z.string(), title: z.string() }),
  z.object({
    t: z.literal("older"),
    thread: z.string(),
    before: z.optional(num),
  }),
  z.object({
    t: z.literal("pin.add"),
    kind: z.enum(["link", "file", "app"]),
    ref: z.string(),
    title: z.optional(z.string()),
  }),
  z.object({ t: z.literal("pin.del"), id }),
  z.object({ t: z.literal("reminder.delete"), id }),
  z.object({ t: z.literal("ack.dismiss"), id: num }),
  z.object({ t: z.literal("reminder.enable"), id, on: z.boolean() }),
  z.object({ t: z.literal("task.toggle"), id }),
  z.object({ t: z.literal("task.status"), id, status: z.enum(TASK_STATUSES) }),
  z.object({ t: z.literal("task.rename"), id, title: z.string() }),
  z.object({ t: z.literal("task.del"), id }),
  z.object({
    t: z.literal("task.assign"),
    id,
    owner: z.optional(z.string()),
    due: z.optional(z.string()),
  }),
  z.object({ t: z.literal("decision.del"), id: num }),
  z.object({ t: z.literal("epic.rename"), id, title: z.string() }),
  z.object({ t: z.literal("epic.del"), id }),
  z.object({
    t: z.literal("epic.archive"),
    id,
    archived: z.optional(z.boolean()),
  }),
  z.object({ t: z.literal("epic.order"), ids: z.array(z.string()) }),
  z.object({
    t: z.literal("poll.create"),
    thread: z.string(),
    question: z.string(),
    options: z.array(z.string()),
    multi: z.boolean(),
  }),
  z.object({ t: z.literal("vote"), id, opt: num }),
  z.object({ t: z.literal("poll.close"), id }),
  z.object({
    t: z.literal("suggestion"),
    i: num,
    accept: z.optional(z.boolean()),
  }),
]);
export type RoomCommand = z.infer<typeof RoomCommandSchema>;

/** The existing bridge: true only means the command was queued on an open socket (vanilla and the preview use it). */
export type SendRoomCommand = (command: RoomCommand) => boolean;

/** Correlated commands (M1 follow-up, #1899): a command may carry `cid`; the server then answers it once with a
 *  `result` event carrying the same `cid`: ok, or ok: false with the reason (invalid, refused, server error). Commands
 *  without `cid` (vanilla, older tabs) get no extra event, so the wire stays compatible both ways. */
export const COMMAND_ID_MAX = 64;
export const CommandId = z
  .string()
  .check(z.minLength(1), z.maxLength(COMMAND_ID_MAX));
export const CommandResultSchema = z.union([
  z.object({ t: z.literal("result"), cid: CommandId, ok: z.literal(true) }),
  z.object({
    t: z.literal("result"),
    cid: CommandId,
    ok: z.literal(false),
    error: z.string(),
  }),
]);
export type CommandResult = z.infer<typeof CommandResultSchema>;
/** What the typed async client resolves with (the cid is its own business). */
export type CommandOutcome = { ok: true } | { ok: false; error: string };
