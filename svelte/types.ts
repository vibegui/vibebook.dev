import type { MeResult, InboxResult } from "../shared/schemas";
/** Canonical Personal wait DTO. Vanilla's independent legacy bridge stays separate. */
export type Wait = MeResult["waits"][number];

// A @mention held back for the digest (not an ask that became a wait): shown in the inbox so it isn't missed.
export type InboxMention = InboxResult["mentions"][number];

// One of the person's open tasks (todo/doing/review) across rooms.
export type InboxTask = InboxResult["tasks"][number];

export type Bridge = {
  t: (s: string, vars?: Record<string, string | number>) => string;
  ago: (ts: number) => string;
};
