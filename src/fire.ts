import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import type { Env } from "./index";
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

export type FireIn = { text?: unknown; file_id?: unknown; history?: unknown };
export type FireOut = { ok: true; file: { id: string; name: string; type: string; size: number; ts: number }; opened: boolean; ms: number } | { ok: false; error: string };

export async function fire(env: Env, bookId: string, email: string, b: FireIn): Promise<FireOut> {
  const text = typeof b.text === "string" ? b.text.trim().slice(0, 2000) : "";
  if (!text) return { ok: false, error: "empty" };
  const history = Array.isArray(b.history) ? b.history.filter((x): x is string => typeof x === "string").slice(-12).map((x) => x.slice(0, 500)) : [];
  const t0 = Date.now();
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
    model: createOpenRouter({ apiKey: env.OPENROUTER_API_KEY })(env.MODEL_FAST, { reasoning: { enabled: false, effort: "none" } }),
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
  await track(env, "fire", { user: email, dims: { book: bookId, ms, chars: text.length, size: body.length, cost: Number((usage as { raw?: { cost?: number } }).raw?.cost) || 0, created: !fid } });
  return { ok: true, file: { id: meta.id, name: meta.name, type, size: meta.size, ts: meta.ts }, opened, ms };
}
