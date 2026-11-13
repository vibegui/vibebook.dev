// Synthetic frontend workload only. No captured user room, Worker/database or model traffic.
import { createHash } from "node:crypto";
import {
  RoomSnapshotSchema,
  type Message,
  type Room,
  type RoomEvent,
} from "../shared/room";
import { isRoomEvent } from "../shared/validation";
export type Workload = {
  name: string;
  messages: number;
  epics: number;
  tasksPerEpic: number;
  docCharacters: number;
  members: number;
  archivedFraction: number;
};
export const workloads: Readonly<Record<string, Workload>> = {
  normal: {
    name: "normal",
    messages: 500,
    epics: 8,
    tasksPerEpic: 6,
    docCharacters: 8000,
    members: 8,
    archivedFraction: 0.5,
  },
  long: {
    name: "long",
    messages: 5000,
    epics: 50,
    tasksPerEpic: 12,
    docCharacters: 40000,
    members: 16,
    archivedFraction: 0.8,
  },
  stress: {
    name: "stress",
    messages: 20000,
    epics: 100,
    tasksPerEpic: 20,
    docCharacters: 100000,
    members: 32,
    archivedFraction: 0.9,
  },
};
const epoch = Date.UTC(2026, 0, 1),
  me = "metrics@example.test";
export function summarize(values: readonly number[]) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b),
    n = sorted.length;
  if (!n)
    return { n: 0, min: null, p50: null, p95: null, max: null, mean: null };
  const quantile = (q: number) => sorted[Math.max(0, Math.ceil(q * n) - 1)];
  return {
    n,
    min: sorted[0],
    p50: quantile(0.5),
    p95: quantile(0.95),
    max: sorted[n - 1],
    mean: sorted.reduce((a, b) => a + b, 0) / n,
  };
}
export function checkedEvent<T extends RoomEvent>(value: T): T {
  if (!isRoomEvent(value)) throw Error(`Invalid benchmark event ${value.t}`);
  return value;
}
export function createMetricRoom(
  shape: Workload,
  label: "A" | "B",
  seed: number,
) {
  const id = label === "A" ? "aabbccdd0011" : "aabbccdd0022",
    members = [
      me,
      ...Array.from(
        { length: shape.members - 1 },
        (_, i) => `person${i}@example.test`,
      ),
    ];
  const names = Object.fromEntries(
    members.map((email, i) => [
      email,
      i ? `Synthetic person ${i}` : "Benchmark user",
    ]),
  );
  const epics = Array.from({ length: shape.epics }, (_, i) => ({
    id: `e${(i + 1).toString(16).padStart(11, "0")}`,
    title: `Synthetic epic ${i + 1}`,
    archived: i < Math.floor(shape.epics * shape.archivedFraction),
    tasks: Array.from({ length: shape.tasksPerEpic }, (_, j) => ({
      id: `f${(i * 1000 + j + 1).toString(16).padStart(11, "0")}`,
      title: `Task ${i + 1}.${j + 1}: review a reproducible example`,
      done: j % 7 === 0,
      status:
        j % 7 === 0
          ? ("done" as const)
          : j % 5 === 0
            ? ("review" as const)
            : ("todo" as const),
      owner: members[(i + j) % members.length],
      due: null,
    })),
  }));
  const paragraph =
    `Reproducible notes for ${label}. Unicode café 日本語. This public example explains a repeated paragraph without private data. `.repeat(
      6,
    );
  const doc = (
    "# Synthetic document\n\n" +
    Array.from(
      { length: 600 },
      (_, i) => `## Section ${i + 1}\n\n${paragraph}\n\n`,
    ).join("")
  ).slice(0, shape.docCharacters);
  const docs = Object.fromEntries(
    epics.map((epic) => [
      epic.id,
      `# ${epic.title}\n\nSynthetic scope.\n\n## Tarefas\n${epic.tasks.map((task) => `- [${task.done ? "x" : " "}] ${task.title}`).join("\n")}\n`,
    ]),
  );
  let random = seed >>> 0;
  const next = () => {
    random = (Math.imul(random, 1664525) + 1013904223) >>> 0;
    return random;
  };
  const all: Message[] = [];
  const previous = new Map<string, number>();
  for (let n = 1; n <= shape.messages; n++) {
    const thread =
        n % 5 < 3
          ? "main"
          : epics[
              (Math.floor(n / 5) * 2 + (n % 5 === 3 ? 0 : 1)) % epics.length
            ].id,
      author = members[next() % members.length];
    const suffix =
      n % 11 === 0
        ? "\n\n```ts\nconst value = 42;\n```"
        : n % 7 === 0
          ? "\n\n| Item | Result |\n| --- | --- |\n| example | ready |"
          : n % 5 === 0
            ? "\n\n- First detail\n- Second detail"
            : "\n\nA short paragraph with **bold**, _emphasis_ and `inline code`.";
    const text = `Synthetic ${label} message ${n}: café 日本語 🧪. Reproducible public test content.${suffix}`;
    all.push({
      id: n,
      author,
      thread,
      ts: epoch + n * 60000,
      text,
      ...(n % 6 === 0 ? { kind: "agent" as const } : {}),
      ...(n % 13 === 0 && previous.has(thread)
        ? { reply_to: previous.get(thread) }
        : {}),
    });
    previous.set(thread, n);
  }
  const root: Room = {
    id,
    me,
    book: {
      title: `Synthetic ${shape.name} room ${label}`,
      owner: me,
      summary: "Public synthetic frontend benchmark",
      folder: null,
    },
    members,
    names,
    online: members.slice(0, 4),
    epics,
    roomTasks: [],
    suggestions: [],
    messages: [],
    typing: {},
    doc,
    docs: {},
    files: [],
    filesN: 0,
    filesAll: true,
    pins: [],
    decisions: [],
    reminders: [],
    polls: {},
    receipts: [],
    acks: [],
  };
  function snapshot(thread = "main"): RoomEvent {
    const counts: Record<string, number> = {},
      sent: Record<string, number> = {};
    for (const message of all)
      counts[message.thread] = (counts[message.thread] || 0) + 1;
    const open = new Set([
      "main",
      thread,
      ...epics.filter((epic) => !epic.archived).map((epic) => epic.id),
    ]);
    const selected = new Set<number>();
    for (const scope of open)
      for (const message of all
        .filter((message) => message.thread === scope)
        .slice(-(scope === thread ? 60 : 5)))
        selected.add(message.id);
    const messages = all.filter((message) => selected.has(message.id));
    for (const message of messages)
      sent[message.thread] = (sent[message.thread] || 0) + 1;
    const latest = all.at(-1)?.id || 0,
      receipts = members
        .slice(1)
        .map((email, i) => ({
          email,
          who: names[email],
          read: Math.max(0, latest - (i + 1) * 200),
          delivered: latest,
          ts: epoch + latest * 60000,
        }));
    const state = RoomSnapshotSchema.parse({
      ...root,
      messages,
      docs: thread === "main" ? {} : { [thread]: docs[thread] || "" },
      counts,
      countsAt: messages.at(-1)?.id || 0,
      full: Object.keys(counts).filter(
        (scope) => (sent[scope] || 0) >= counts[scope],
      ),
      complete: false,
      receipts,
    });
    return checkedEvent({ t: "state", ...state });
  }
  function older(thread: string, before: number) {
    const remaining = all.filter(
      (message) => message.thread === thread && message.id < before,
    );
    return checkedEvent({
      t: "older",
      thread,
      messages: remaining.slice(-100),
      more: remaining.length > 100,
    });
  }
  function post(text: string, thread: string) {
    const message: Message = {
      id: (all.at(-1)?.id || 0) + 1,
      text,
      thread,
      author: me,
      ts: epoch + ((all.at(-1)?.id || 0) + 1) * 60000,
      files: [],
    };
    all.push(message);
    return checkedEvent({ t: "msg", m: message });
  }
  return {
    id,
    root,
    all,
    docs,
    doc,
    snapshot,
    older,
    post,
    digest: createHash("sha256")
      .update(JSON.stringify({ shape, seed, label, root, all, docs }))
      .digest("hex"),
    firstActiveEpic: epics.find((epic) => !epic.archived)!.id,
  };
}
