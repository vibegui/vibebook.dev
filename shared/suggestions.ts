import type { Suggestion } from "./room";
/** Canonical fields only; object property ordering never changes identity. */
export const suggestionIdentity = (value: Suggestion) =>
  JSON.stringify([value.title, value.why ?? null, value.tasks]);
export const matchesSuggestion = (
  actual: Suggestion | undefined,
  expected: Suggestion | undefined,
) =>
  expected === undefined ||
  (!!actual && suggestionIdentity(actual) === suggestionIdentity(expected));
