import * as z from "zod/mini";
import { EpicSchema } from "../shared/room";
import { record } from "../shared/validation";

// Book.syncD1 writes a compact epic listing, not the complete room Epic DTO.
// Derive shared fields rather than maintaining a second handwritten Epic type.
const CachedHomeEpic = z.catchall(
  z.extend(z.pick(EpicSchema, { id: true, title: true }), {
    open: z.optional(z.nullable(z.number())),
  }),
  z.unknown(),
);
export type CachedHomeEpic = z.infer<typeof CachedHomeEpic>;

function storedJSON(raw: string | null): unknown {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function cachedHomeEpics(raw: string | null): CachedHomeEpic[] {
  const value = storedJSON(raw);
  if (!Array.isArray(value)) return [];
  // Isolate malformed historical siblings without deleting a valid destination.
  return value.flatMap((item: unknown) => {
    const result = CachedHomeEpic.safeParse(item);
    return result.success ? [result.data] : [];
  });
}

/** Event dimensions are intentionally opaque. Validate only their object
 * container; preserve nullable/extension fields for the existing aggregators. */
export function eventDimensions(raw: string | null): Record<string, unknown> {
  const value = storedJSON(raw);
  return record(value) ? value : {};
}
