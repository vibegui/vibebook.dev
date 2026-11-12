// Runtime schemas for what the browser sends the Worker (M1): the TypeScript types are derived from them, so a schema
// edit changes every consumer's type. Browser-safe: zod/mini only, no Worker or database types.
import * as z from "zod/mini";

export const PostMessageBody = z.object({
  text: z.string(),
  thread: z.optional(z.string()),
});
export type PostMessageBody = z.infer<typeof PostMessageBody>;

/** Upload headers: the file's media type and its name (URI-encoded, the vanilla app's x-filename). */
export const UploadHeaders = z.object({
  "content-type": z.string(),
  "x-filename": z.optional(z.string()),
});

// Responses the browser reads back: validated at the boundary with the same schemas the types come from.
export const PostMessageResult = z.union([
  z.object({ ok: z.literal(true), id: z.number(), thread: z.string() }),
  z.object({ ok: z.literal(false), error: z.string() }),
]);
export type PostMessageResult = z.infer<typeof PostMessageResult>;

export const SaveReminderResult = z.object({
  ok: z.boolean(),
  name: z.optional(z.string()),
  error: z.optional(z.string()),
  every: z.optional(z.nullable(z.string())),
  cron: z.optional(z.nullable(z.string())),
  timezone: z.optional(z.string()),
  next_at: z.optional(z.string()),
});
export type SaveReminderResult = z.infer<typeof SaveReminderResult>;

export const AttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  author: z.string(),
  ts: z.number(),
  embed: z.optional(z.boolean()),
});
export const UploadFileResult = z.extend(AttachmentSchema, {
  reminder: z.optional(SaveReminderResult),
});
export type UploadFileResult = z.infer<typeof UploadFileResult>;

/** Any error answer of the app's routes. */
export const ErrorBody = z.object({ error: z.string() });
