import type { MeResult } from "../shared/schemas";
/** Canonical Personal wait DTO. Vanilla's independent legacy bridge stays separate. */
export type Wait = MeResult["waits"][number];

// A @mention held back for the digest (not an ask that became a wait): shown in the inbox so it isn't missed.
export type InboxMention = {
  book_id: string;
  room: string;
  msg_id: number;
  thread: string;
  author: string;
  author_name: string | null;
  text: string;
  ts: number;
};

// One of the person's open tasks (todo/doing/review) across rooms.
export type InboxTask = {
  book_id: string;
  room: string;
  epic_id: string;
  epic: string | null;
  task_id: string;
  title: string;
  status: string;
  due: string | null;
};

export type Bridge = {
  t: (s: string, vars?: Record<string, string | number>) => string;
  ago: (ts: number) => string;
};
