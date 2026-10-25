import { DurableObject } from "cloudflare:workers";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output, stepCountIs, streamText, tool } from "ai";
import { z } from "zod";
import type { Env } from "./index";

type Mode = "fast" | "medium" | "heavy";
type Msg = { id: number; thread: string; author: string; text: string; ts: number };
type Suggestion = { title: string; tasks: string[] };

const DEFAULT_TITLE = "Novo vibebook";
const CLASSIFY_DELAY_MS = 30_000;
const CLASSIFY_MIN_NEW_MSGS = 3;

const rid = () => crypto.randomUUID().slice(0, 8);

// One Durable Object per vibebook: doc, chat threads (main + one per epic), epics/tasks, live sockets.
export class Book extends DurableObject<Env> {
  sql: SqlStorage;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, thread TEXT, author TEXT, text TEXT, ts INTEGER);
      CREATE TABLE IF NOT EXISTS epics (id TEXT PRIMARY KEY, title TEXT, ts INTEGER);
      CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, epic_id TEXT, title TEXT, done INTEGER DEFAULT 0, ts INTEGER);
      CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT);
    `);
  }

  // ---- storage helpers ----
  get(k: string): string | null {
    return (this.sql.exec(`SELECT v FROM meta WHERE k = ?`, k).toArray()[0]?.v as string) ?? null;
  }
  set(k: string, v: string) {
    this.sql.exec(`INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v`, k, v);
  }
  epics() {
    const tasks = this.sql
      .exec<{ id: string; epic_id: string; title: string; done: number }>(`SELECT id, epic_id, title, done FROM tasks ORDER BY ts`)
      .toArray();
    return this.sql
      .exec<{ id: string; title: string }>(`SELECT id, title FROM epics ORDER BY ts`)
      .toArray()
      .map((e) => ({ ...e, tasks: tasks.filter((t) => t.epic_id === e.id) }));
  }
  messages(thread?: string, limit = 500): Msg[] {
    const rows = thread
      ? this.sql.exec(`SELECT * FROM messages WHERE thread = ? ORDER BY id DESC LIMIT ?`, thread, limit)
      : this.sql.exec(`SELECT * FROM messages ORDER BY id DESC LIMIT ?`, limit);
    return (rows.toArray() as Msg[]).reverse();
  }
  suggestions(): Suggestion[] {
    return JSON.parse(this.get("suggestions") ?? "[]");
  }
  async members(): Promise<string[]> {
    const id = this.get("book_id");
    if (!id) return [];
    const r = await this.env.DB.prepare(`SELECT email FROM members WHERE book_id = ?`).bind(id).all();
    return r.results.map((m) => m.email as string);
  }
  online() {
    return [...new Set(this.sockets().map((ws) => this.ctx.getTags(ws)[0]))];
  }
  sockets(except?: WebSocket) {
    return this.ctx.getWebSockets().filter((ws) => ws !== except && ws.readyState === WebSocket.OPEN);
  }
  broadcast(data: unknown, except?: WebSocket) {
    const s = JSON.stringify(data);
    for (const ws of this.sockets(except)) ws.send(s);
  }

  // ---- mutations (shared by humans over WS and by AI tools) ----
  addMessage(thread: string, author: string, text: string): Msg {
    const ts = Date.now();
    const id = this.sql
      .exec(`INSERT INTO messages (thread, author, text, ts) VALUES (?, ?, ?, ?) RETURNING id`, thread, author, text, ts)
      .one().id as number;
    const m = { id, thread, author, text, ts };
    this.broadcast({ t: "msg", m });
    return m;
  }
  createEpic(title: string, tasks: string[] = []) {
    const id = rid();
    const ts = Date.now();
    this.sql.exec(`INSERT INTO epics (id, title, ts) VALUES (?, ?, ?)`, id, title.slice(0, 200), ts);
    tasks.forEach((t, i) => this.sql.exec(`INSERT INTO tasks (id, epic_id, title, ts) VALUES (?, ?, ?, ?)`, rid(), id, t.slice(0, 300), ts + i));
    this.broadcast({ t: "epics", epics: this.epics() });
    return id;
  }
  addTask(epicId: string, title: string) {
    if (!this.sql.exec(`SELECT 1 FROM epics WHERE id = ?`, epicId).toArray().length) return null;
    const id = rid();
    this.sql.exec(`INSERT INTO tasks (id, epic_id, title, ts) VALUES (?, ?, ?, ?)`, id, epicId, title.slice(0, 300), Date.now());
    this.broadcast({ t: "epics", epics: this.epics() });
    return id;
  }
  setTask(id: string, done?: boolean) {
    if (done === undefined) this.sql.exec(`UPDATE tasks SET done = 1 - done WHERE id = ?`, id);
    else this.sql.exec(`UPDATE tasks SET done = ? WHERE id = ?`, done ? 1 : 0, id);
    this.broadcast({ t: "epics", epics: this.epics() });
  }
  setDoc(text: string, by: string, except?: WebSocket) {
    this.set("doc", text.slice(0, 100_000));
    this.broadcast({ t: "doc", text: this.get("doc"), by }, except);
  }
  async touch(fields: { title?: string; folder?: string; summary?: string } = {}) {
    const id = this.get("book_id");
    if (!id) return;
    await this.env.DB.prepare(
      `UPDATE books SET updated_at = ?, title = COALESCE(?, title), folder = COALESCE(?, folder), summary = COALESCE(?, summary) WHERE id = ?`,
    )
      .bind(Date.now(), fields.title ?? null, fields.folder ?? null, fields.summary ?? null, id)
      .run();
  }

  // ---- transport ----
  async fetch(req: Request) {
    const url = new URL(req.url);
    if (url.pathname === "/members-changed") {
      this.broadcast({ t: "members", members: await this.members() });
      return new Response("ok");
    }
    const email = req.headers.get("x-email");
    const bookId = url.searchParams.get("book");
    if (!email || !bookId) return new Response("bad request", { status: 400 });
    if (!this.get("book_id")) this.set("book_id", bookId);

    const { 0: client, 1: server } = new WebSocketPair();
    this.ctx.acceptWebSocket(server, [email]);
    const book = await this.env.DB.prepare(`SELECT title, folder, summary FROM books WHERE id = ?`).bind(bookId).first();
    server.send(
      JSON.stringify({
        t: "state",
        me: email,
        book,
        doc: this.get("doc") ?? "",
        epics: this.epics(),
        messages: this.messages(),
        suggestions: this.suggestions(),
        members: await this.members(),
        online: this.online(),
      }),
    );
    this.broadcast({ t: "online", online: this.online() });
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer) {
    const email = this.ctx.getTags(ws)[0];
    let m: Record<string, any>;
    try {
      m = JSON.parse(typeof raw === "string" ? raw : new TextDecoder().decode(raw));
    } catch {
      return;
    }
    switch (m.t) {
      case "msg": {
        const text = String(m.text ?? "").trim().slice(0, 4000);
        const thread = m.thread === "main" || this.epics().some((e) => e.id === m.thread) ? m.thread : null;
        if (!text || !thread) return;
        this.addMessage(thread, email, text);
        this.ctx.waitUntil(this.touch());
        if (/(^|\s)@ai\b/i.test(text)) {
          const mode: Mode = ["fast", "medium", "heavy"].includes(m.mode) ? m.mode : "fast";
          this.ctx.waitUntil(this.runAI(thread, mode, email));
        }
        if (!(await this.ctx.storage.getAlarm())) await this.ctx.storage.setAlarm(Date.now() + CLASSIFY_DELAY_MS);
        return;
      }
      case "doc":
        return this.setDoc(String(m.text ?? ""), email, ws);
      case "title": {
        const title = String(m.title ?? "").trim().slice(0, 120);
        if (!title) return;
        this.set("title_locked", "1");
        await this.touch({ title });
        return this.broadcast({ t: "meta", title });
      }
      case "epic":
        if (String(m.title ?? "").trim()) this.createEpic(String(m.title).trim());
        return;
      case "task.add":
        if (String(m.title ?? "").trim()) this.addTask(String(m.epic), String(m.title).trim());
        return;
      case "task.toggle":
        return this.setTask(String(m.id));
      case "suggestion": {
        const s = this.suggestions();
        const [picked] = s.splice(Number(m.i), 1);
        if (!picked) return;
        this.set("suggestions", JSON.stringify(s));
        if (m.accept) this.createEpic(picked.title, picked.tasks);
        return this.broadcast({ t: "suggestions", suggestions: s });
      }
    }
  }

  webSocketClose(ws: WebSocket) {
    this.broadcast({ t: "online", online: this.online().filter((e) => this.sockets(ws).some((s) => this.ctx.getTags(s)[0] === e)) }, ws);
  }

  // ---- AI ----
  model(name: string) {
    return createOpenRouter({ apiKey: this.env.OPENROUTER_API_KEY })(name);
  }

  context(thread: string) {
    const epics = this.epics();
    const epic = epics.find((e) => e.id === thread);
    const board = epics
      .map((e) => `- épico "${e.title}" (id ${e.id})\n${e.tasks.map((t) => `   - [${t.done ? "x" : " "}] ${t.title} (id ${t.id})`).join("\n")}`)
      .join("\n");
    const mainDigest = epic
      ? `\n\nÚltimas mensagens do chat geral:\n${this.messages("main", 15).map((m) => `${m.author}: ${m.text}`).join("\n")}`
      : "";
    return `Você é a AI de um vibebook: um documento compartilhado entre amigos com chat geral, épicos (temas longos com discussão própria) e tasks.
Responda curto, no idioma de quem falou, como mais um participante da conversa. Várias pessoas falam; cada mensagem vem prefixada pelo email do autor.
Use as ferramentas para organizar: crie épicos com tasks quando surgirem temas grandes, marque tasks feitas, e mantenha o documento como o resumo vivo das decisões.
Você está no ${epic ? `épico "${epic.title}" (id ${epic.id})` : "chat geral"}.

Documento atual:
"""
${this.get("doc") || "(vazio)"}
"""

Épicos e tasks:
${board || "(nenhum)"}${mainDigest}`;
  }

  async runAI(thread: string, mode: Mode, email: string) {
    const { success } = await this.env.AI_LIMIT.limit({ key: email });
    if (!success) {
      this.addMessage(thread, "ai", "Calma 😅 muitos @ai seguidos. Tenta de novo em um minuto.");
      return;
    }
    const modelName = { fast: this.env.MODEL_FAST, medium: this.env.MODEL_MEDIUM, heavy: this.env.MODEL_HEAVY }[mode];
    const msg = this.addMessage(thread, "ai", "");
    this.broadcast({ t: "typing", id: msg.id, mode });

    // Merge consecutive same-role turns; humans are all "user", prefixed by email.
    const history: { role: "user" | "assistant"; content: string }[] = [];
    for (const m of this.messages(thread, 40)) {
      if (m.id === msg.id || (m.author === "ai" && !m.text)) continue;
      const role = m.author === "ai" ? "assistant" : "user";
      const content = role === "user" ? `${m.author}: ${m.text}` : m.text;
      const last = history.at(-1);
      if (last?.role === role) last.content += `\n${content}`;
      else history.push({ role, content });
    }
    if (history[0]?.role === "assistant") history.shift();

    let text = "";
    let lastSent = 0;
    const flush = (force = false) => {
      if (!force && Date.now() - lastSent < 120) return;
      lastSent = Date.now();
      this.broadcast({ t: "delta", id: msg.id, text });
    };
    let failed: unknown;
    try {
      const result = streamText({
        // textStream swallows provider errors; capture them so a failure never reads as "done".
        onError: ({ error }) => {
          failed = error;
        },
        model: this.model(modelName),
        system: this.context(thread),
        messages: history,
        stopWhen: stepCountIs(4),
        tools: {
          create_epic: tool({
            description: "Cria um épico (tema longo com discussão própria) com tasks iniciais.",
            inputSchema: z.object({ title: z.string(), tasks: z.array(z.string()).max(12) }),
            execute: async ({ title, tasks }) => ({ id: this.createEpic(title, tasks) }),
          }),
          add_task: tool({
            description: "Adiciona uma task a um épico existente.",
            inputSchema: z.object({ epic_id: z.string(), title: z.string() }),
            execute: async ({ epic_id, title }) => ({ id: this.addTask(epic_id, title) ?? "epic not found" }),
          }),
          set_task_done: tool({
            description: "Marca ou desmarca uma task como feita.",
            inputSchema: z.object({ task_id: z.string(), done: z.boolean() }),
            execute: async ({ task_id, done }) => (this.setTask(task_id, done), { ok: true }),
          }),
          update_doc: tool({
            description: "Reescreve o documento compartilhado (markdown) inteiro. Preserve o que já existe e incorpore as decisões novas.",
            inputSchema: z.object({ markdown: z.string() }),
            execute: async ({ markdown }) => (this.setDoc(markdown, "ai"), { ok: true }),
          }),
        },
      });
      for await (const d of result.textStream) {
        text += d;
        flush();
      }
      if (failed) throw failed;
      if (!text.trim()) text = "✅ feito.";
    } catch (e) {
      console.error("ai failed", { mode, modelName, error: String(e) });
      text = `${text}\n\n⚠️ A AI falhou (${modelName}). Não é que não tenha resposta, foi erro do provedor. Tenta de novo.`.trim();
    }
    this.sql.exec(`UPDATE messages SET text = ? WHERE id = ?`, text, msg.id);
    flush(true);
  }

  // Debounced background pass with the cheap model: title, folder, summary, epic suggestions.
  async alarm() {
    const since = Number(this.get("classified_at_id") ?? 0);
    const fresh = this.sql.exec(`SELECT count(*) AS n FROM messages WHERE id > ? AND author != 'ai'`, since).one().n as number;
    if (fresh < CLASSIFY_MIN_NEW_MSGS) return;
    const bookId = this.get("book_id");
    if (!bookId) return;
    const folders = await this.env.DB.prepare(
      `SELECT DISTINCT b.folder FROM books b JOIN members m ON m.book_id = b.id
       WHERE m.email IN (SELECT email FROM members WHERE book_id = ?) AND b.folder IS NOT NULL`,
    )
      .bind(bookId)
      .all();
    const lastId = (this.sql.exec(`SELECT max(id) AS id FROM messages`).one().id as number) ?? 0;
    const transcript = this.messages(undefined, 80)
      .map((m) => `[${m.thread === "main" ? "geral" : m.thread}] ${m.author}: ${m.text}`)
      .join("\n");
    try {
      const { output } = await generateText({
        model: this.model(this.env.MODEL_CLASSIFY),
        output: Output.object({
          schema: z.object({
            title: z.string().describe("título curto e específico do vibebook, máx 6 palavras"),
            folder: z.string().describe("pasta para organizar; reutilize uma pasta existente se fizer sentido"),
            summary: z.string().describe("uma frase resumindo do que se trata e o estado atual"),
            suggested_epics: z
              .array(z.object({ title: z.string(), tasks: z.array(z.string()).max(8) }))
              .max(3)
              .describe("épicos que ainda NÃO existem e valeria criar; vazio se nada novo"),
          }),
        }),
        prompt: `Classifique este vibebook (documento compartilhado com chat e épicos).
Pastas que essas pessoas já usam: ${folders.results.map((f) => f.folder).join(", ") || "(nenhuma)"}
Épicos existentes: ${this.epics().map((e) => e.title).join(", ") || "(nenhum)"}
Documento:
${(this.get("doc") ?? "").slice(0, 4000)}

Conversa:
${transcript}`,
      });
      this.set("classified_at_id", String(lastId));
      const title = this.get("title_locked") ? undefined : output.title;
      await this.touch({ title, folder: output.folder, summary: output.summary });
      const existing = new Set([...this.epics().map((e) => e.title.toLowerCase()), ...this.suggestions().map((s) => s.title.toLowerCase())]);
      const suggestions = [...this.suggestions(), ...output.suggested_epics.filter((s) => !existing.has(s.title.toLowerCase()))].slice(-5);
      this.set("suggestions", JSON.stringify(suggestions));
      this.broadcast({ t: "meta", title, folder: output.folder, summary: output.summary });
      this.broadcast({ t: "suggestions", suggestions });
    } catch (e) {
      // Negative cache: mark as classified anyway so a failing provider isn't retried every alarm.
      console.error("classify failed", String(e));
      this.set("classified_at_id", String(lastId));
    }
  }
}
