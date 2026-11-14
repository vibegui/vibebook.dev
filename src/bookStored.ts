// Narrow stored JSON at the point it becomes room output or mutation input.
// Invalid siblings are isolated; diagnostics never contain stored contents.
import * as z from "zod/mini";
import {
  AttachmentSchema,
  EpicSchema,
  SuggestionSchema,
  type Attachment,
  type Poll,
  type Suggestion,
} from "../shared/room";
import { record } from "../shared/validation";
export type StoredIssue = (kind: string) => void;
const ignore: StoredIssue = () => {};
function json(raw: unknown, kind: string, issue: StoredIssue): unknown {
  if (raw == null) return null;
  if (typeof raw !== "string") {
    issue(kind);
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    issue(kind);
    return null;
  }
}
function strings(value: unknown, kind: string, issue: StoredIssue): string[] {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    issue(kind);
    return [];
  }
  const values: unknown[] = value;
  if (values.some((item) => typeof item !== "string")) issue(kind);
  return values.filter((item): item is string => typeof item === "string");
}
export const storedNotes = (raw: unknown, issue: StoredIssue = ignore) =>
  strings(json(raw, "notes-json", issue), "notes", issue);
export function storedHashes(
  raw: unknown,
  issue: StoredIssue = ignore,
): Record<string, string> {
  const value = json(raw, "hashes-json", issue);
  if (value == null) return {};
  if (!record(value)) {
    issue("hashes");
    return {};
  }
  return Object.fromEntries(
    Object.entries(value).flatMap(([key, item]) => {
      if (typeof item === "string") return [[key, item]];
      issue("hash");
      return [];
    }),
  );
}
export function storedFlags(
  raw: unknown,
  issue: StoredIssue = ignore,
): Record<string, string[]> {
  const value = json(raw, "flags-json", issue);
  if (value == null) return {};
  if (!record(value)) {
    issue("flags");
    return {};
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      strings(item, "flag-notes", issue),
    ]),
  );
}
const Prod = z.pick(EpicSchema, { prod: true });
export function storedProd(raw: unknown, issue: StoredIssue = ignore) {
  const value = json(raw, "prod-json", issue);
  if (value == null) return null;
  // Older rows may omit at/note or store their absence as null.
  const compatible = record(value)
    ? { ...value, at: value.at ?? undefined, note: value.note ?? undefined }
    : value;
  const parsed = Prod.safeParse({ prod: compatible });
  if (!parsed.success) {
    issue("prod");
    return null;
  }
  return parsed.data.prod ?? null;
}
const EpicFile = z.pick(AttachmentSchema, { id: true, name: true, type: true });
export function storedEpicFiles(raw: unknown, issue: StoredIssue = ignore) {
  const value = json(raw, "epic-files-json", issue);
  if (value == null) return [];
  if (!Array.isArray(value)) {
    issue("epic-files");
    return [];
  }
  const values: unknown[] = value;
  return values.flatMap((item) => {
    const parsed = EpicFile.safeParse(item);
    if (parsed.success) return [parsed.data];
    issue("epic-file");
    return [];
  });
}
export function storedSuggestions(
  raw: unknown,
  issue: StoredIssue = ignore,
): Suggestion[] {
  const value = json(raw, "suggestions-json", issue);
  if (value == null) return [];
  if (!Array.isArray(value)) {
    issue("suggestions");
    return [];
  }
  const values: unknown[] = value;
  return values.flatMap((item) => {
    // An absent task list means no suggested tasks; absent why is optional.
    const compatible = record(item)
      ? { ...item, tasks: item.tasks ?? [], why: item.why ?? undefined }
      : item;
    const parsed = SuggestionSchema.safeParse(compatible);
    if (parsed.success) return [parsed.data];
    issue("suggestion");
    return [];
  });
}
export function storedFileRows(
  rows: readonly unknown[],
  issue: StoredIssue = ignore,
): Attachment[] {
  return rows.flatMap((row) => {
    const parsed = AttachmentSchema.safeParse(row);
    if (parsed.success) return [parsed.data];
    issue("file-row");
    return [];
  });
}
const bit = z.optional(z.nullable(z.union([z.number(), z.boolean()])));
const PollRow = z.object({
  id: z.string(),
  question: z.string(),
  options: z.string(),
  author: z.string(),
  multi: bit,
  closed: bit,
});
const VoteRow = z.object({
  poll_id: z.string(),
  email: z.string(),
  opt: z.number(),
});
const Options = z.array(z.string());
export function storedPollRows(
  rows: readonly unknown[],
  voteRows: readonly unknown[],
  ids?: readonly string[],
  issue: StoredIssue = ignore,
): Record<string, Poll> {
  const votes = voteRows.flatMap((row) => {
    const parsed = VoteRow.safeParse(row);
    if (parsed.success && Number.isInteger(parsed.data.opt))
      return [parsed.data];
    issue("vote-row");
    return [];
  });
  const output = new Map<string, Poll>();
  for (const row of rows) {
    const parsed = PollRow.safeParse(row);
    if (!parsed.success) {
      issue("poll-row");
      continue;
    }
    const value = parsed.data;
    if (ids && !ids.includes(value.id)) continue;
    const options = Options.safeParse(
      json(value.options, "poll-options-json", issue),
    );
    // Never filter an individual option: its index owns the persisted votes.
    if (!options.success) {
      issue("poll-options");
      continue;
    }
    output.set(value.id, {
      id: value.id,
      question: value.question,
      options: options.data,
      multi: !!value.multi,
      closed: !!value.closed,
      author: value.author,
      votes: options.data.map((_, index) =>
        votes
          .filter((vote) => vote.poll_id === value.id && vote.opt === index)
          .map((vote) => vote.email),
      ),
    });
  }
  return Object.fromEntries(output);
}
