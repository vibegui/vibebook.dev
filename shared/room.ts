// JSON DTOs shared by the Cloudflare Worker and browser. Keep this module free of backend imports.
export interface BookMeta {
  title: string;
  owner: string;
  summary?: string | null;
  folder?: string | null;
}
export interface Suggestion {
  title: string;
  tasks: string[];
  why?: string;
}
export interface Decision {
  id: number;
  text: string;
  who: string;
  kind: string;
  ts: number;
}
export interface Pin {
  id: string;
  kind: string;
  ref: string;
  title?: string;
  author?: string;
  ts?: number;
}
export interface Poll {
  id: string;
  question: string;
  options: string[];
  multi: boolean;
  closed: boolean;
  author: string;
  votes: string[][];
}

export const TASK_STATUSES = ["todo", "doing", "review", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
export interface Task {
  id: string;
  title: string;
  done: boolean;
  status: TaskStatus;
  owner?: string | null;
  due?: string | null;
  flags?: string[];
}
export interface Epic {
  id: string;
  title: string;
  tasks: Task[];
  archived?: boolean;
  owner?: string | null;
  from_msg?: number | null;
  parent?: string | null;
  kept?: boolean;
  files?: { id: string; name: string; type: string; n: number }[];
  flags?: string[];
  prod?: { stage: string; note?: string; at?: number } | null;
}
export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  author: string;
  ts: number;
  embed?: boolean;
}
export interface Message {
  id: number;
  thread: string;
  author: string;
  ts: number;
  text: string;
  kind?: string | null;
  tag?: string | null;
  via?: string | null;
  reply_to?: number | null;
  choices?: string | null;
  poll?: string | null;
  card?: string | null;
  quiet?: boolean;
  cut?: boolean;
  for_who?: string | null;
  files?: Attachment[];
}
export interface Ack {
  msg_id: number;
  agent?: string;
  email: string;
  who: string;
  status: string;
  ts: number;
  note?: string | null;
}
export interface Reminder {
  id: string;
  name?: string | null;
  text: string;
  owner: string;
  enabled: boolean;
  error?: string | null;
  every?: string | null;
  cron?: string | null;
  next_at?: number | null;
  thread?: string;
  tz?: string;
  file_id?: string | null;
}
export interface Room {
  id: string;
  me: string;
  book: BookMeta;
  messages: Message[];
  epics: Epic[];
  roomTasks?: Task[];
  typing: Record<string, string>;
  members: string[];
  online: string[];
  names?: Record<string, string>;
  avatars?: Record<string, number>;
  pending?: string[];
  requests?: { email: string; name?: string | null; ts: number }[];
  suggestions: Suggestion[];
  files?: Attachment[];
  filesN?: number;
  filesAll?: boolean;
  reminders?: Reminder[];
  acks?: Ack[];
  receipts?: { email: string; who: string; read: number; delivered: number }[];
  counts?: Record<string, number>;
  countsAt?: number;
  full?: string[];
  complete?: boolean;
  origins?: Message[];
  docs?: Record<string, string>;
  doc?: string;
  docNotes?: string[];
  decisions?: Decision[];
  pins?: Pin[];
  polls?: Record<string, Poll>;
}
export type DocumentContentEvent = {
  t: "doc";
  text: string;
  epic?: string | null;
  stale?: false;
  fetched?: boolean;
  by?: string;
};
export type DocumentInvalidationEvent = {
  t: "doc";
  epic: string;
  stale: true;
  by?: string;
};
export type RoomEvent =
  | ({ t: "state" } & Omit<Room, "id" | "typing">)
  | { t: "msg"; m: Message }
  | { t: "moved"; id: number; thread: string }
  | { t: "delta"; id: number; text: string }
  | { t: "typing"; id: number; mode: string; note?: string }
  | { t: "closed"; id: number; choices: string }
  | { t: "epics"; epics: Epic[]; roomTasks?: Task[] }
  | { t: "epicsPatch"; changed: Epic[]; order: string[]; roomTasks?: Task[] }
  | DocumentContentEvent
  | DocumentInvalidationEvent
  | { t: "docNotes"; notes: string[] }
  | { t: "meta"; title?: string; folder?: string; summary?: string }
  | { t: "suggestions"; suggestions: Room["suggestions"] }
  | { t: "requests"; requests: Room["requests"] }
  | {
      t: "members";
      members: string[];
      pending?: string[];
      requests?: Room["requests"];
      names?: Room["names"];
      avatars?: Room["avatars"];
    }
  | { t: "files"; files: Attachment[] }
  | { t: "fileAdd"; file: Attachment }
  | { t: "reminders"; reminders: Reminder[] }
  | { t: "decisions"; decisions: Decision[] }
  | { t: "pins"; pins: Room["pins"] }
  | { t: "receipts"; receipts: Room["receipts"] }
  | { t: "older"; messages: Message[]; thread: string; more: boolean }
  | { t: "acks" | "ackRows"; acks: Ack[] }
  | { t: "poll"; poll: Poll }
  | { t: "online"; online: string[] }
  | { t: "conns" }
  | { t: "error"; error?: string }
  | { t: "blocked"; text: string; reason: string };
