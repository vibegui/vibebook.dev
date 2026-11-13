import type { Ack, Receipt, Room } from "../../../shared/room";
import type { ChatMessage } from "../../chatTypes";
export const prettyModel = (value: string) =>
  value.replace(
    /^claude-(opus|sonnet|haiku|fable)-(\d+)-(\d+)(?:-\d{8})?$/i,
    (_, family: string, a: string, b: string) =>
      `Claude ${family[0].toUpperCase()}${family.slice(1)} ${a}.${b}`,
  );
export function agentMark(via: string | null | undefined) {
  return /codex|gpt|openai|\bo[1-9]\b/i.test(via || "")
    ? "◎"
    : /gemini/i.test(via || "")
      ? "✦"
      : /cursor/i.test(via || "")
        ? "▲"
        : /copilot/i.test(via || "")
          ? "◉"
          : "✻";
}
export const continues = (
  previous: ChatMessage | undefined,
  current: ChatMessage,
) =>
  !!previous &&
  previous.author === current.author &&
  (previous.kind || null) === (current.kind || null) &&
  (previous.tag || null) === (current.tag || null) &&
  current.ts - previous.ts < 5 * 60_000 &&
  !previous.poll &&
  !current.poll;
export const isNotice = (m: ChatMessage) =>
  m.author === "ai" &&
  (m.tag === "notice" ||
    m.tag === "done" ||
    /^↩ (Reabri|I reopened)/.test(m.text));
export const messageKind = (m: ChatMessage) =>
  m.tag === "reminder"
    ? "reminder"
    : m.tag === "issue"
      ? "issue"
      : isNotice(m)
        ? "notice"
        : "regular";
const foldKey = (m?: ChatMessage) =>
  m?.tag === "reminder"
    ? m.text.split("\n")[0]
    : m?.tag === "issue"
      ? "⚠issue"
      : null;
export function foldMessages(list: readonly ChatMessage[]) {
  const out: ChatMessage[] = [];
  for (const m of list) {
    const key = foldKey(m),
      previous = out.at(-1);
    if (key && previous && foldKey(previous) === key)
      out[out.length - 1] = {
        ...m,
        runs: [...(previous.runs || [previous.ts]), m.ts],
        group: [...(previous.group || [previous]), m],
      };
    else out.push(m);
  }
  return out;
}
export const messageSnippet = (m: ChatMessage) =>
  (
    m.text ||
    m.files?.map((f) => f.name).join(", ") ||
    (m.poll ? "votação" : "")
  )
    .replace(/\*\*|`|^[#>]+ ?/gm, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
export function reminderParts(m: ChatMessage) {
  const [heading, ...rest] = m.text.split("\n\n"),
    head = heading.replace(/^⏰\s*/, ""),
    match = head.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  return {
    name: match?.[1],
    head: match?.[2] ?? head,
    body: rest.join("\n\n"),
    runs: m.runs || [m.ts],
  };
}
export function issueParts(m: ChatMessage) {
  const [head, ...rest] = m.text.split("\n\n");
  return { head: head.replace(/^⚠\s*/, ""), body: rest.join("\n\n") };
}
export type MessageStatus = {
  ack: Ack;
  kind: "blocked" | "doing" | "done" | "waiting" | "idle";
  owners: string[];
};
export type Reader = { receipt: Receipt; read: boolean };
export type MessageFooter = { statuses: MessageStatus[]; readers: Reader[] };
export function messageFooters(
  room: Room,
  thread: string,
  now: number,
): Map<number, MessageFooter> {
  const footers = new Map<number, MessageFooter>(),
    seen = new Set<string>();
  const at = (id: number) => {
    let value = footers.get(id);
    if (!value) {
      value = { statuses: [], readers: [] };
      footers.set(id, value);
    }
    return value;
  };
  const latest = new Set<string>();
  for (const ack of [...(room.acks || [])].sort((a, b) => b.ts - a.ts)) {
    const key = `${ack.msg_id}|${ack.who}|${ack.email}`;
    if (latest.has(key)) continue;
    latest.add(key);
    if (ack.status === "dismissed") continue;
    seen.add(key);
    const owners = [
      ...new Set(
        room.epics
          .filter((e) => e.from_msg === ack.msg_id && !e.archived)
          .flatMap((e) =>
            e.tasks
              .filter((t) => t.status !== "done" && t.owner)
              .map((t) => t.owner!),
          ),
      ),
    ];
    const kind =
      ack.status === "blocked"
        ? "blocked"
        : ack.status === "doing" && now - ack.ts < 20 * 60_000
          ? "doing"
          : ack.status === "done"
            ? "done"
            : owners.length
              ? "waiting"
              : "idle";
    at(ack.msg_id).statuses.push({ ack, kind, owners });
  }
  const list = room.messages.filter((m) => m.thread === thread);
  const readers = new Map<string, Receipt>();
  for (const receipt of room.receipts || []) {
    const key = `${receipt.who}|${receipt.email}`;
    const previous = readers.get(key);
    readers.set(
      key,
      previous
        ? {
            ...receipt,
            read: Math.max(previous.read, receipt.read),
            delivered: Math.max(previous.delivered, receipt.delivered),
          }
        : receipt,
    );
  }
  for (const receipt of readers.values()) {
    const message = list.findLast(
      (m) =>
        m.id <= Math.max(receipt.read, receipt.delivered) &&
        !(m.kind === "agent" && m.author === receipt.email),
    );
    if (!message || seen.has(`${message.id}|${receipt.who}|${receipt.email}`))
      continue;
    at(message.id).readers.push({ receipt, read: receipt.read >= message.id });
  }
  for (const footer of footers.values())
    footer.readers.sort((a, b) => Number(b.read) - Number(a.read));
  return footers;
}
export type Worker = { who: string; email: string };
export function threadWorkers(
  room: Room,
  thread: string,
  now: number,
): Worker[] {
  if (thread.startsWith("pre:")) return [];
  const epic = room.epics.find((e) => e.id === thread);
  if (epic?.archived) return [];
  const messages = [
    ...room.messages,
    ...(room.origins || []).filter(
      (o) => !room.messages.some((m) => m.id === o.id),
    ),
  ];
  const branched = new Set(
    room.epics.filter((e) => e.id !== epic?.id).map((e) => e.from_msg),
  );
  const ids = new Set(
    messages
      .filter((m) => m.thread === thread && !branched.has(m.id))
      .map((m) => m.id),
  );
  if (epic?.from_msg) ids.add(epic.from_msg);
  const logical = new Set<string>();
  const latest = [...(room.acks || [])]
    .filter((a) => ids.has(a.msg_id))
    .sort((a, b) => b.ts - a.ts)
    .filter((a) => {
      const key = `${a.msg_id}|${a.who}|${a.email}`;
      if (logical.has(key)) return false;
      logical.add(key);
      return true;
    });
  const acks = latest.filter((a) => a.status !== "dismissed"),
    seen = new Set<string>(),
    workers: Worker[] = [];
  for (const ack of acks) {
    const key = `${ack.who}|${ack.email}`;
    if (
      ack.status === "doing" &&
      now - ack.ts < 20 * 60_000 &&
      !seen.has(key) &&
      acks.find(
        (a) =>
          a.msg_id === ack.msg_id && a.who === ack.who && a.email === ack.email,
      ) === ack
    ) {
      seen.add(key);
      workers.push({ who: ack.who, email: ack.email });
    }
  }
  if (workers.length || !epic) return workers;
  const doing = acks.find(
    (a) => a.status === "doing" && now - a.ts < 20 * 60_000,
  );
  if (doing) return [{ who: doing.who, email: doing.email }];
  if (latest[0]?.status === "done" || latest[0]?.status === "dismissed")
    return [];
  const last = room.messages.findLast(
    (m) => m.thread === thread && m.kind === "agent",
  );
  return last && last.tag !== "done" && now - last.ts < 3 * 60_000
    ? [{ who: last.via || "Agent", email: last.author }]
    : [];
}
