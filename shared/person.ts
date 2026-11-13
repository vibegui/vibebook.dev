// The Person DO's /ws-me notices. Browser-safe; the literal msg:1 is a flag,
// not a message ID. Keep this independent of room/Worker implementations.
import * as z from "zod/mini";
export const PersonEventSchemas = {
  me: z.object({
    t: z.literal("me"),
    book: z.optional(z.string()),
    msg: z.optional(z.literal(1)),
  }),
  agents: z.object({ t: z.literal("agents"), book: z.string() }),
};
export const PersonEventSchema = z.discriminatedUnion("t", [
  PersonEventSchemas.me,
  PersonEventSchemas.agents,
]);
export type PersonEvent = z.infer<typeof PersonEventSchema>;
/** Accept raw WebSocket event.data only. Binary/non-JSON/unknown notices are ignored. */
export function parsePersonEvent(data: unknown): PersonEvent | null {
  if (typeof data !== "string") return null;
  try {
    const value: unknown = JSON.parse(data);
    const parsed = PersonEventSchema.safeParse(value);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
