import { TASK_STATUSES } from "./room";
import type { PostMessageRequest } from "./rpc";
import type {
  Ack,
  Attachment,
  BookMeta,
  Decision,
  Epic,
  Message,
  Pin,
  Poll,
  Reminder,
  RoomEvent,
  Suggestion,
  Task,
} from "./room";
import type { RoomCommand } from "./commands";

// Small JSON validators: no Worker or UI dependency, and no unchecked JSON.parse casts at transport boundaries.
type Check = (value: unknown) => boolean;
export const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const str: Check = (value) => typeof value === "string";
const num: Check = (value) =>
  typeof value === "number" && Number.isFinite(value);
const bool: Check = (value) => typeof value === "boolean";
const nullable =
  (check: Check): Check =>
  (value) =>
    value === null || check(value);
const array =
  (check: Check): Check =>
  (value) =>
    Array.isArray(value) && value.every(check);
const dict =
  (check: Check): Check =>
  (value) =>
    record(value) && Object.values(value).every(check);
const strings = array(str);
const oneOf =
  (...values: readonly string[]): Check =>
  (value) =>
    typeof value === "string" && values.includes(value);
const status = oneOf(...TASK_STATUSES);
const shape =
  (
    required: Record<string, Check>,
    optional: Record<string, Check> = {},
  ): Check =>
  (value) =>
    record(value) &&
    Object.entries(required).every(([key, check]) => check(value[key])) &&
    Object.entries(optional).every(
      ([key, check]) => value[key] === undefined || check(value[key]),
    );
export const isAttachment = (value: unknown): value is Attachment =>
  shape(
    { id: str, name: str, type: str, size: num, author: str, ts: num },
    { embed: bool },
  )(value);
const taskCheck = shape(
  { id: str, title: str, done: bool, status },
  { owner: nullable(str), due: nullable(str), flags: strings, epic_id: str },
);
export const isTask = (value: unknown): value is Task => taskCheck(value);
const epicCheck = shape(
  { id: str, title: str, tasks: array(isTask) },
  {
    archived: bool,
    kept: bool,
    owner: nullable(str),
    from_msg: nullable(num),
    parent: nullable(str),
    flags: strings,
    prod: nullable(shape({ stage: str }, { at: num, note: str })),
    files: array(shape({ id: str, name: str, type: str, n: num })),
  },
);
export const isEpic = (value: unknown): value is Epic => epicCheck(value);
const messageCheck = shape(
  { id: num, thread: str, author: str, ts: num, text: str },
  {
    kind: nullable(str),
    tag: nullable(str),
    via: nullable(str),
    reply_to: nullable(num),
    choices: nullable(str),
    poll: nullable(str),
    card: nullable(str),
    files: array(isAttachment),
    quiet: bool,
    cut: bool,
    for_who: nullable(str),
  },
);
export const isMessage = (value: unknown): value is Message =>
  messageCheck(value);
const ackCheck = shape(
  { msg_id: num, email: str, who: str, status: str, ts: num },
  { agent: str, note: nullable(str) },
);
export const isAck = (value: unknown): value is Ack => ackCheck(value);
const reminderCheck = shape(
  { id: str, text: str, owner: str, enabled: bool },
  {
    name: nullable(str),
    error: nullable(str),
    every: nullable(str),
    cron: nullable(str),
    next_at: nullable(num),
    thread: str,
    tz: str,
    file_id: nullable(str),
  },
);
export const isReminder = (value: unknown): value is Reminder =>
  reminderCheck(value);
const bookCheck = shape(
  { title: str, owner: str },
  { summary: nullable(str), folder: nullable(str) },
);
export const isBookMeta = (value: unknown): value is BookMeta =>
  bookCheck(value);
const suggestionCheck = shape({ title: str, tasks: strings }, { why: str });
export const isSuggestion = (value: unknown): value is Suggestion =>
  suggestionCheck(value);
const decisionCheck = shape({
  id: num,
  text: str,
  who: str,
  kind: str,
  ts: num,
});
export const isDecision = (value: unknown): value is Decision =>
  decisionCheck(value);
const pinCheck = shape(
  { id: str, kind: str, ref: str },
  { title: str, author: str, ts: num },
);
export const isPin = (value: unknown): value is Pin => pinCheck(value);
const pollCheck = shape({
  id: str,
  question: str,
  options: strings,
  multi: bool,
  closed: bool,
  author: str,
  votes: array(strings),
});
export const isPoll = (value: unknown): value is Poll => pollCheck(value);
const requestCheck = shape({ email: str, ts: num }, { name: nullable(str) });
const receiptCheck = shape(
  { email: str, who: str, read: num, delivered: num },
  { agent: str, ts: num },
);
const documentContentCheck = shape(
  { text: str },
  {
    epic: nullable(str),
    stale: (value) => value === false,
    fetched: bool,
    by: str,
  },
);
const documentInvalidationCheck = shape(
  { epic: str, stale: (value) => value === true },
  { by: str },
);
const documentEventCheck: Check = (value) =>
  record(value) &&
  (value.stale === true
    ? documentInvalidationCheck(value) &&
      value.text === undefined &&
      value.fetched === undefined
    : documentContentCheck(value));
const eventChecks = {
  state: shape(
    {
      me: str,
      book: isBookMeta,
      messages: array(isMessage),
      epics: array(isEpic),
      members: strings,
      online: strings,
      suggestions: array(isSuggestion),
    },
    {
      roomTasks: array(isTask),
      names: dict(str),
      avatars: dict(num),
      pending: strings,
      requests: array(requestCheck),
      files: array(isAttachment),
      filesN: num,
      filesAll: bool,
      reminders: array(isReminder),
      acks: array(isAck),
      receipts: array(receiptCheck),
      counts: dict(num),
      countsAt: num,
      full: strings,
      complete: bool,
      origins: array(isMessage),
      docs: dict(str),
      doc: str,
      docNotes: strings,
      decisions: array(isDecision),
      pins: array(isPin),
      polls: dict(isPoll),
    },
  ),
  msg: shape({ m: isMessage }),
  moved: shape({ id: num, thread: str }),
  delta: shape({ id: num, text: str }),
  typing: shape({ id: num, mode: str }, { note: str }),
  closed: shape({ id: num, choices: str }),
  epics: shape({ epics: array(isEpic) }, { roomTasks: array(isTask) }),
  epicsPatch: shape(
    { changed: array(isEpic), order: strings },
    { roomTasks: array(isTask) },
  ),
  doc: documentEventCheck,
  docNotes: shape({ notes: strings }),
  meta: shape({}, { title: str, folder: str, summary: str }),
  suggestions: shape({ suggestions: array(isSuggestion) }),
  requests: shape({ requests: array(requestCheck) }),
  members: shape(
    { members: strings },
    {
      pending: strings,
      requests: array(requestCheck),
      names: dict(str),
      avatars: dict(num),
    },
  ),
  files: shape({ files: array(isAttachment) }),
  fileAdd: shape({ file: isAttachment }),
  reminders: shape({ reminders: array(isReminder) }),
  decisions: shape({ decisions: array(isDecision) }),
  pins: shape({ pins: array(isPin) }),
  receipts: shape({ receipts: array(receiptCheck) }),
  older: shape({ messages: array(isMessage), thread: str, more: bool }),
  acks: shape({ acks: array(isAck) }),
  ackRows: shape({ acks: array(isAck) }),
  poll: shape({ poll: isPoll }),
  online: shape({ online: strings }),
  conns: shape({}),
  error: shape({}, { error: str }),
  blocked: shape({ text: str, reason: str }),
} satisfies Record<RoomEvent["t"], Check>;
export function isRoomEvent(value: unknown): value is RoomEvent {
  if (
    !record(value) ||
    typeof value.t !== "string" ||
    !Object.hasOwn(eventChecks, value.t)
  )
    return false;
  return eventChecks[value.t as keyof typeof eventChecks](value);
}
// Rolling deployments can pair a new browser with the previous Worker briefly.
// Previous snapshots serialized SQLite's 0/1 flags; normalize those exact values
// here rather than widening every consumer's boolean contract.
function normalizeLegacyFlags(value: unknown): unknown {
  if (!record(value)) return value;
  const flag = (row: unknown, key: string): unknown =>
    record(row) && (row[key] === 0 || row[key] === 1)
      ? { ...row, [key]: row[key] === 1 }
      : row;
  const tasks = (rows: unknown): unknown =>
    Array.isArray(rows) ? rows.map((row) => flag(row, "done")) : rows;
  const epics = (rows: unknown): unknown =>
    Array.isArray(rows)
      ? rows.map((row) =>
          record(row) ? { ...row, tasks: tasks(row.tasks) } : row,
        )
      : rows;
  const reminders = (rows: unknown): unknown =>
    Array.isArray(rows) ? rows.map((row) => flag(row, "enabled")) : rows;
  if (value.t === "state" || value.t === "epics")
    return {
      ...value,
      epics: epics(value.epics),
      ...(value.roomTasks === undefined
        ? {}
        : { roomTasks: tasks(value.roomTasks) }),
      ...(value.reminders === undefined
        ? {}
        : { reminders: reminders(value.reminders) }),
    };
  if (value.t === "epicsPatch")
    return {
      ...value,
      changed: epics(value.changed),
      ...(value.roomTasks === undefined
        ? {}
        : { roomTasks: tasks(value.roomTasks) }),
    };
  if (value.t === "reminders")
    return { ...value, reminders: reminders(value.reminders) };
  return value;
}
export function parseRoomEvent(raw: string): RoomEvent {
  const value: unknown = normalizeLegacyFlags(JSON.parse(raw));
  if (!isRoomEvent(value)) throw new TypeError("Invalid room event");
  return value;
}

const commandChecks = {
  msg: shape(
    { thread: str },
    { text: str, files: strings, reply_to: nullable(num) },
  ),
  "files.get": shape({}),
  "doc.get": shape({}, { epic: nullable(str) }),
  doc: shape({ text: str }, { epic: nullable(str) }),
  title: shape({ title: str }),
  epic: shape({ title: str }),
  "epic.owner": shape({ id: str, owner: str }),
  "task.add": shape({ epic: str, title: str }),
  older: shape({ thread: str }, { before: num }),
  "pin.add": shape(
    { kind: oneOf("link", "file", "app"), ref: str },
    { title: str },
  ),
  "pin.del": shape({ id: str }),
  "reminder.delete": shape({ id: str }),
  "ack.dismiss": shape({ id: num }),
  "reminder.enable": shape({ id: str, on: bool }),
  "task.toggle": shape({ id: str }),
  "task.status": shape({ id: str, status }),
  "task.rename": shape({ id: str, title: str }),
  "task.del": shape({ id: str }),
  "task.assign": shape({ id: str }, { owner: str, due: str }),
  "decision.del": shape({ id: num }),
  "epic.rename": shape({ id: str, title: str }),
  "epic.del": shape({ id: str }),
  "epic.archive": shape({ id: str }, { archived: bool }),
  "epic.order": shape({ ids: strings }),
  "poll.create": shape({
    thread: str,
    question: str,
    options: strings,
    multi: bool,
  }),
  vote: shape({ id: str, opt: num }),
  "poll.close": shape({ id: str }),
  suggestion: shape({ i: num }, { accept: bool }),
} satisfies Record<RoomCommand["t"], Check>;
export function isRoomCommand(value: unknown): value is RoomCommand {
  if (
    !record(value) ||
    typeof value.t !== "string" ||
    !Object.hasOwn(commandChecks, value.t)
  )
    return false;
  return commandChecks[value.t as keyof typeof commandChecks](value);
}
export function parseRoomCommand(raw: string): RoomCommand {
  let value: unknown = JSON.parse(raw);
  // Already-open pre-migration browser tabs sent decision IDs from dataset
  // as strings. Preserve that wire format while exposing a numeric command.
  if (
    record(value) &&
    value.t === "decision.del" &&
    typeof value.id === "string" &&
    /^\d+$/.test(value.id)
  ) {
    const id = Number(value.id);
    if (Number.isSafeInteger(id)) value = { ...value, id };
  }
  if (!isRoomCommand(value)) throw new TypeError("Invalid room command");
  return value;
}

export function isPostMessageRequest(
  value: unknown,
): value is PostMessageRequest {
  return shape({ text: str }, { thread: str })(value);
}
