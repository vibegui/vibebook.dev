import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { z } from "zod";
import { cardOf } from "./card";
import type { Env } from "./index";
import { growthReport, productReport } from "./reports";
import { bookStub, storeFile } from "./rooms";
import { track } from "./track";

/**
 * Modo Fire (Gui, 14/11, epic "Modo Fire"): the person talks, each pause of their live transcription comes here, and
 * a fast model (MODEL_FAST, Haiku) applies it to the file open beside the chat, right away, as a new version with the
 * same name (the panel follows the newest). No file open: it starts a new HTML page and opens it beside. When the
 * person stops, the app posts the whole transcript with the file as their message, so their own Claude (the slow
 * one) reviews and fixes what Haiku did. Haiku has no tools and touches nothing but this one file.
 */
const EDITABLE = ["text/html", "text/markdown", "text/plain"];
const MAX_FILE = 200_000;

// vibebook's own report rooms (METRICS_ROOMS): the fast model gets yesterday's numbers, so a card about visits or
// errors has real data instead of "—" (Gui #2378: the card "didn't update" because Haiku had nothing to put in it).
// Cached per isolate for 5 min: a session sends a piece every few seconds.
let dataCache: { at: number; key: string; text: string } | null = null;
async function roomData(env: Env, bookId: string, text: string, history: string[]) {
  if (!(env.METRICS_ROOMS ?? "").split(",").map((x) => x.trim()).includes(bookId)) return "";
  const prod = /produto|product|erro|error|lat[eê]n|banda|bandwidth|request|requisi|cpu|deploy|worker|tr[aá]fego|traffic/i.test([text, ...history].join(" "));
  const key = prod ? "gp" : "g";
  if (dataCache && dataCache.key === key && Date.now() - dataCache.at < 300_000) return dataCache.text;
  const parts = await Promise.all([growthReport(env).catch(() => ""), prod ? productReport(env).catch(() => "") : ""]);
  const out = parts.filter(Boolean).join("\n\n").slice(0, 12_000);
  dataCache = { at: Date.now(), key, text: out };
  return out;
}

export type FireIn = { text?: unknown; file_id?: unknown; history?: unknown; card_msg?: unknown; thread?: unknown };
export type FireOut =
  | { ok: true; mode: "file"; file: { id: string; name: string; type: string; size: number; ts: number }; opened: boolean; ms: number }
  | { ok: true; mode: "card"; card_msg: number; ms: number }
  | { ok: false; error: string };

// The chat's native card catalog (src/card.ts), as the model needs it. A request a card can answer (numbers, a status,
// a dashboard, a table, a small chart, a checklist) becomes a card drawn by the app instead of an HTML page (Gui 14/11,
// #2367: "antes de decidir fazer um html, se puder ser resolvido por um json render nativo, tenta isso").
const CATALOG = `A card is JSON: {"root":"c","elements":{"<id>":{"type":"<Type>","props":{...},"children":["<id>",...]}}}. Types:
Card {title, subtitle} (the root, children any) · Section {title} (children any) · Text {content, style: plain|bold|muted|code}
Fields (children: Field) · Field {label, value, delta?: "+12%" | "-3%", good?: "down" (when lower is better), trend?: "4 sem: 6,0k · 6,2k"} (a number tile) · Table {headers:[...], rows:[[...]]} (≤50 rows, ≤10 cols)
Chart {title, kind: bar|line, data:[{label, value:number}]} (1-30 points), or {title, kind, labels:[...], series:[{name, values:[numbers]}]} (≤4 series) · Divider · Actions (children: LinkButton) · LinkButton {label, url (https), style?: primary}.
Numbers go as Field tiles INSIDE a Fields element (never a bare Field), a few per Fields. Short labels, numbers as text with units. No HTML anywhere.`;

export async function fire(env: Env, bookId: string, email: string, b: FireIn): Promise<FireOut> {
  const text = typeof b.text === "string" ? b.text.trim().slice(0, 2000) : "";
  if (!text) return { ok: false, error: "empty" };
  const history = Array.isArray(b.history) ? b.history.filter((x): x is string => typeof x === "string").slice(-12).map((x) => x.slice(0, 500)) : [];
  const t0 = Date.now();
  const thread = typeof b.thread === "string" ? b.thread : "main";
  const cardMsg = Number(b.card_msg) || 0;
  const model = () => createOpenRouter({ apiKey: env.OPENROUTER_API_KEY })(env.MODEL_FAST, { reasoning: { enabled: false, effort: "none" } });
  const data = await roomData(env, bookId, text, history);
  const said = `${data ? `REAL DATA you may use (vibebook's own report, yesterday vs the 7 days before):\n${data}\n\n` : ""}${history.length ? `What they said before, in this session:\n${history.map((h) => `- ${h}`).join("\n")}\n\n` : ""}NEW SPEECH:\n${text}`;
  const cardMode = async (current?: string) => {
    const { output, usage } = await generateText({
      model: model(), temperature: 0.2, abortSignal: AbortSignal.timeout(45_000),
      output: Output.object({ schema: z.object({ card: z.string().describe("the whole card JSON"), title: z.string().describe("a 2-6 word title for the chat line") }) }),
      system: `You build one native chat card live while a person talks: each new piece of speech is an instruction (or a correction) for it. Apply it and return the WHOLE new card. Keep what they didn't ask to change. Write in the language they speak. Invent no numbers: if they didn't give data, use clear placeholders like "—".\n${CATALOG}`,
      prompt: `${current ? `CURRENT CARD:\n${current}` : "There is no card yet: build it from this request."}\n\n${said}`,
    });
    const card = cardOf(JSON.parse(output.card), bookId);
    const r = await bookStub(env, bookId).fireCard(bookId, email, thread, `🔥 ${output.title}`, card, cardMsg || undefined);
    if (!r.ok) return { ok: false as const, error: r.error };
    await bookStub(env, bookId).firePiece(bookId, email, thread, text, { card_msg: r.id });
    await track(env, "fire", { user: email, dims: { book: bookId, ms: Date.now() - t0, chars: text.length, mode: "card", cost: Number((usage as { raw?: { cost?: number } }).raw?.cost) || 0, created: !cardMsg } });
    return { ok: true as const, mode: "card" as const, card_msg: r.id, ms: Date.now() - t0 };
  };
  // A live card: every piece of speech replaces it.
  if (cardMsg) {
    const row = await bookStub(env, bookId).messageCard(bookId, cardMsg, email);
    if (!row) return { ok: false, error: "not your live card" };
    return cardMode(row);
  }
  // Nothing open yet: the first piece decides what to make, a native card when one can answer it, else a page.
  if (!b.file_id) {
    const { output } = await generateText({
      model: model(), temperature: 0, abortSignal: AbortSignal.timeout(15_000),
      output: Output.object({ schema: z.object({ format: z.enum(["card", "html"]) }) }),
      system: `Choose the format for what a person is asking for, by voice. "card": a native chat card answers it (numbers, metrics, a dashboard, a status, a table, a short list or checklist, a small chart). "html": it needs a page (a layout, a landing page, a document with styling, interactivity, images, long text). Prefer card when both work.\n${CATALOG}`,
      prompt: said,
    }).catch(() => ({ output: { format: "html" as const } }));
    if (output.format === "card") {
      try { return await cardMode(); } catch { /* the model's card didn't validate: make a page instead */ }
    }
  }
  let name = "", type = "text/html", current = "";
  const fid = typeof b.file_id === "string" ? b.file_id : "";
  if (fid) {
    const obj = await env.FILES.get(`${bookId}/${fid}`);
    if (!obj) return { ok: false, error: "file not found in this room" };
    type = obj.httpMetadata?.contentType ?? "";
    if (!EDITABLE.includes(type)) return { ok: false, error: `can't edit ${type} live (html, markdown, text)` };
    name = obj.customMetadata?.name ?? "arquivo.html";
    current = await obj.text();
    if (current.length > MAX_FILE) return { ok: false, error: "file too big to edit live" };
  } else {
    name = `ao-vivo-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")}.html`;
  }
  const kind = type === "text/html" ? "a self-contained HTML page (inline CSS and JS only, no external requests except Google Fonts)" : type === "text/markdown" ? "a Markdown document" : "a plain text file";
  const { text: out, usage } = await generateText({
    model: model(),
    temperature: 0.2,
    abortSignal: AbortSignal.timeout(45_000),
    system: `You edit one file live while a person talks. They are dictating requests in "live mode": each new piece of speech is an instruction (or a correction of the previous one) for this file, which is ${kind}. Apply it right away and return the WHOLE new file, nothing else: no explanation, no code fences. Keep everything they didn't ask to change. If the speech is not an instruction for the file (small talk, a pause filler), return the file unchanged. Write the content in the language they speak.`,
    prompt: `${current ? `CURRENT FILE (${name}):\n${current}` : `There is no file yet: start ${kind} from this request.`}\n\n${history.length ? `What they said before, in this session:\n${history.map((h) => `- ${h}`).join("\n")}\n\n` : ""}NEW SPEECH:\n${text}`,
  });
  const body = out.trim().replace(/^```[\w-]*\n/, "").replace(/\n```$/, "").trim();
  if (!body) return { ok: false, error: "the model returned nothing" };
  const meta = await storeFile(env, bookId, email, type, new TextEncoder().encode(body).buffer as ArrayBuffer, name);
  const opened = !fid ? (((await bookStub(env, bookId).agentOpenFile(bookId, email, meta.id)) as { opened_in_tabs?: number }).opened_in_tabs ?? 0) > 0 : false;
  const ms = Date.now() - t0;
  await bookStub(env, bookId).firePiece(bookId, email, thread, text, { file: { id: meta.id, name: meta.name } });
  await track(env, "fire", { user: email, dims: { book: bookId, ms, chars: text.length, size: body.length, cost: Number((usage as { raw?: { cost?: number } }).raw?.cost) || 0, created: !fid } });
  return { ok: true, mode: "file", file: { id: meta.id, name: meta.name, type, size: meta.size, ts: meta.ts }, opened, ms };
}
