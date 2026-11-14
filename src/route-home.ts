// Home composer: "where should this go?". One D1 query lists the person's rooms with their epics
// (books.epics is kept in sync by the DO), one cheap model call (MODEL_ROUTE, reasoning off) picks the
// room + epic. The model only sees ids from that list; anything else is dropped.
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { z } from "zod";
import type { Env } from "./index";
import { cachedHomeEpics } from "./storedContainers";
import type { RoomPick as SharedRoomPick } from "../shared/schemas";

export type RoomPick = z.infer<typeof SharedRoomPick>;

const MAX_ROOMS = 40;

export async function routeMessage(env: Env, email: string, text: string) {
  const rows = await env.DB.prepare(
    `SELECT b.id, b.title, b.folder, b.summary, b.epics FROM books b JOIN members m ON m.book_id = b.id
     WHERE m.email = ? AND m.archived_at IS NULL ORDER BY b.updated_at DESC LIMIT ?`,
  )
    .bind(email, MAX_ROOMS)
    .all<{ id: string; title: string; folder: string | null; summary: string | null; epics: string | null }>();
  const rooms = rows.results.map((b) => ({ ...b, epics: cachedHomeEpics(b.epics) }));
  if (!rooms.length) return { pick: null, alternatives: [], new_room_title: text.slice(0, 60), cost: 0 };

  const listing = rooms
    .map((b) =>
      [
        `room ${b.id} | ${b.title}${b.folder ? ` | pasta ${b.folder}` : ""}${b.summary ? ` | ${b.summary.slice(0, 160)}` : ""}`,
        ...b.epics.map((e) => `  epic ${e.id} | ${e.title}${e.open ? ` (${e.open} tarefas abertas)` : ""}`),
      ].join("\n"),
    )
    .join("\n");

  const { output, usage } = await generateText({
    model: createOpenRouter({ apiKey: env.OPENROUTER_API_KEY })(env.MODEL_ROUTE, { reasoning: { enabled: false, effort: "none" } }),
    temperature: 0,
    output: Output.object({
      schema: z.object({
        room_id: z.string().describe("best room id from the list, or empty if none fits"),
        epic_id: z.string().describe("epic id inside that room when the message clearly belongs to it, else empty"),
        reason: z.string().describe("why, in the message's language, one short sentence, max 12 words"),
        alternatives: z.array(z.object({ room_id: z.string(), epic_id: z.string() })).max(2).describe("other plausible places, best first"),
        new_room_title: z.string().describe("if no room fits, a short title for a new room; else empty"),
      }),
    }),
    prompt: `A person typed a message on their home screen. Pick the room (and epic, if one clearly fits) where it should be posted so the right people discuss it. Use only ids from the list. Prefer the room whose project the message is about. Inside that room, pick the epic whose topic the message touches (DNS or domain → an epic about the domain; bookings or rentals → an epic about rentals); leave epic_id empty only when none matches.
Do not force a fit: if no room is clearly about this subject, leave room_id empty and give new_room_title (2 to 5 words). A loose association (same company, "it's also a project") is not a fit.
reason: one short sentence, max 12 words, no ids, written in the same language as the message (Portuguese message → Portuguese reason; a room is a "sala" in Portuguese).

Message:
"""
${text.slice(0, 2000)}
"""

Their rooms (most recently active first):
${listing}`,
  });

  const toPick = (roomId: string, epicId: string): RoomPick | null => {
    const b = rooms.find((r) => r.id === roomId);
    if (!b) return null;
    const e = b.epics.find((x) => x.id === epicId) ?? null;
    return { book_id: b.id, book_title: b.title, epic_id: e?.id ?? null, epic_title: e?.title ?? null };
  };
  const pick = toPick(output.room_id, output.epic_id);
  const alternatives = output.alternatives
    .map((a) => toPick(a.room_id, a.epic_id))
    .filter((a): a is RoomPick => !!a && !(a.book_id === pick?.book_id && a.epic_id === pick?.epic_id));
  const cost = Number((usage as { raw?: { cost?: number } }).raw?.cost) || 0;
  return { pick, reason: output.reason.slice(0, 160), alternatives, new_room_title: (output.new_room_title || text).slice(0, 60), cost };
}
