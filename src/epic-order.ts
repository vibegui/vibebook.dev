/** Hard cap on one epic.order message: far above any room, bounded so a client can't make the DO loop forever. */
export const MAX_ORDER = 5000;

/**
 * The room's new epic order after an `epic.order` {ids}. `current` is every epic id in today's order.
 * The listed epics (unknown ids and repeats dropped) take the slots they occupy today, in the order given; the
 * others keep their slots. So the vanilla app's full permutation reorders everything, and a partial list (just some
 * siblings) reorders only those, at any index (the old 500-id slice silently ignored a drag past epic 500).
 */
export function reorderEpics(current: readonly string[], ids: readonly unknown[]): string[] {
  const known = new Set(current), picked: string[] = [], seen = new Set<string>();
  for (const id of ids.slice(0, MAX_ORDER)) {
    if (typeof id !== "string" || !known.has(id) || seen.has(id)) continue;
    seen.add(id);
    picked.push(id);
  }
  let next = 0;
  return current.map((id) => (seen.has(id) ? picked[next++] : id));
}
