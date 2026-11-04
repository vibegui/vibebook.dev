// An epic's tasks live in its doc as a GitHub-style checklist under "## Tarefas", synced both ways:
// tasks → doc (renderBlock, after every task change) and doc → tasks (parseBlock + reconcile, after every doc edit).

export type BlockTask = { id: string; title: string; done: boolean };
export type Parsed = { title: string; done: boolean };

const HEAD = /^##[ \t]+Tarefas[ \t]*$/im;
const ITEM = /^\s*[-*]\s+\[( |x|X)\]\s?(.*)$/;
const line = (t: { title: string; done: boolean }) => `- [${t.done ? "x" : " "}] ${t.title}`;

/** Where the "## Tarefas" section is: [start of its body, end of its body] (offsets), or null. */
function section(doc: string): [number, number] | null {
  const m = HEAD.exec(doc);
  if (!m) return null;
  const start = m.index + m[0].length;
  const next = /^#{1,6}\s/m.exec(doc.slice(start));
  return [start, next ? start + next.index : doc.length];
}

/** The checklist under "## Tarefas", or null when the doc has no such section. Empty items are ignored. */
export function parseBlock(doc: string): Parsed[] | null {
  const s = section(doc);
  if (!s) return null;
  const out: Parsed[] = [];
  for (const l of doc.slice(s[0], s[1]).split("\n")) {
    const m = ITEM.exec(l);
    if (m && m[2].trim()) out.push({ done: m[1] !== " ", title: m[2].trim() });
  }
  return out;
}

/** The doc with its "## Tarefas" checklist matching the tasks. Other lines in the section are kept (after the list).
 * No section yet: it goes before the first "## " heading (right after the goal), else at the end. */
export function renderBlock(doc: string, tasks: BlockTask[]): string {
  const list = tasks.map(line).join("\n");
  const s = section(doc);
  if (!s) {
    const block = `## Tarefas\n\n${list}\n\n`;
    const h2 = /^##\s/m.exec(doc);
    return h2 ? doc.slice(0, h2.index) + block + doc.slice(h2.index) : `${doc.replace(/\s*$/, "")}\n\n${block}`;
  }
  const rest = doc.slice(s[0], s[1]).split("\n").filter((l) => !ITEM.test(l)).join("\n").trim();
  return `${doc.slice(0, s[0])}\n\n${list}${rest ? `\n\n${rest}` : ""}\n\n${doc.slice(s[1])}`.replace(/\n{3,}(?=#|$)/g, "\n\n");
}

/** What to change in the tasks so they match the doc's checklist. Pairs exact titles first, then the rest in order
 * (a rename), then leftovers: new lines become tasks, removed lines delete theirs. */
export function reconcile(parsed: Parsed[], tasks: BlockTask[]) {
  const update: { id: string; title?: string; done?: boolean }[] = [];
  const left = [...tasks];
  const unmatched: Parsed[] = [];
  for (const p of parsed) {
    const i = left.findIndex((t) => t.title === p.title);
    if (i < 0) { unmatched.push(p); continue; }
    const [t] = left.splice(i, 1);
    if (t.done !== p.done) update.push({ id: t.id, done: p.done });
  }
  const add: Parsed[] = [];
  for (const p of unmatched) {
    const t = left.shift();
    if (!t) { add.push(p); continue; }
    update.push({ id: t.id, title: p.title, ...(t.done !== p.done ? { done: p.done } : {}) });
  }
  return { update, add, del: left.map((t) => t.id) };
}
