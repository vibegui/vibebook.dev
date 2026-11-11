import { checkEmbed } from "./embed";
import { poke } from "./person";
// Room (vibebook) operations shared by the app API and the agent MCP.
import type { Lang } from "./lang";
import { emailHtml, escapeHtml, inviteLink } from "./auth";
import type { Env } from "./index";
import { findSecret } from "./secrets";
import { track } from "./track";

export const isMember = async (db: D1Database, bookId: string, email: string) =>
  !!(await db.prepare(`SELECT 1 FROM members WHERE book_id = ? AND email = ?`).bind(bookId, email).first());

export const befriend = (db: D1Database, a: string, b: string) => {
  const now = Date.now();
  const q = `INSERT OR IGNORE INTO friends (a, b, created_at) VALUES (?, ?, ?)`;
  return db.batch([db.prepare(q).bind(a, b, now), db.prepare(q).bind(b, a, now)]);
};

export const bookStub = (env: Env, id: string) => env.BOOK.get(env.BOOK.idFromName(id));
/** The co-editing relay for a room's doc (epic = "" for the room's own doc). */
export const docRoomName = (id: string, epic?: string) => (epic ? `${id}~${epic}` : id);
export const docRoomStub = (env: Env, id: string, epic?: string) => env.DOC_ROOMS.get(env.DOC_ROOMS.idFromName(docRoomName(id, epic)));

export async function createBook(env: Env, email: string, title?: string) {
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO books (id, title, folder, summary, owner, created_at, updated_at) VALUES (?, ?, NULL, '', ?, ?, ?)`).bind(
      id,
      (title || "Novo vibebook").slice(0, 120),
      email,
      now,
      now,
    ),
    env.DB.prepare(`INSERT INTO members (book_id, email) VALUES (?, ?)`).bind(id, email),
  ]);
  return id;
}

/** Adds `who` to the room, befriends, emails a magic link (rate-limited per inviter) and tells the DO. */
export async function inviteMember(env: Env, ctx: { waitUntil(p: Promise<unknown>): void }, origin: string, inviter: string, bookId: string, who: string, inviterLang: Lang = "pt") {
  await env.DB.prepare(`INSERT OR IGNORE INTO members (book_id, email) VALUES (?, ?)`).bind(bookId, who).run();
  ctx.waitUntil(poke(env, [who], { t: "me" })); // the room shows up in their rail at once
  await befriend(env.DB, inviter, who);
  ctx.waitUntil(track(env, "invite_sent", { user: inviter, dims: { book: bookId } }));
  if (!env.DEV_EMAIL && (await env.LOGIN_LIMIT.limit({ key: `invite:${inviter}` })).success) {
    const [book, known] = await Promise.all([
      env.DB.prepare(`SELECT title FROM books WHERE id = ?`).bind(bookId).first<{ title: string }>(),
      env.DB.prepare(`SELECT lang FROM users WHERE email = ?`).bind(who).first<{ lang: string | null }>(),
    ]);
    // The invitee's own language when they've used vibebook, else the inviter's (likely the same team).
    const en = (known?.lang ?? inviterLang) === "en";
    const url = await inviteLink(env, origin, who, bookId);
    const title = book?.title ?? (en ? "a vibebook" : "um vibebook");
    const name = inviter.split("@")[0];
    const connect = `${origin}/${en ? "en" : "pt"}/connect`;
    const setup = `Read ${origin}/llms.txt and set up vibebook for this project. Room: ${origin}/b/${bookId}`;
    ctx.waitUntil(
      env.EMAIL.send({
        to: who,
        from: { email: "convite@vibebook.dev", name: "vibebook" },
        replyTo: inviter,
        subject: en ? `${name} invited you to the vibebook "${title}"` : `${name} te chamou pro vibebook "${title}"`,
        text: en
          ? `${inviter} invited you to the vibebook "${title}".\n\nOpen it: ${url}\n\nBring your Claude: paste this in Claude Code, inside the project folder:\n${setup}\nOther clients: ${connect}`
          : `${inviter} te convidou para o vibebook "${title}".\n\nEntra aqui: ${url}\n\nTraga seu Claude: cole isto no Claude Code, dentro da pasta do projeto:\n${setup}\nOutros clientes: ${connect}`,
        html: emailHtml(
          en ? `${escapeHtml(name)} invited you to vibebook` : `${escapeHtml(name)} te chamou pro vibebook`,
          `<p style="font-size:18px;font-weight:700">${escapeHtml(title)}</p><p>${
            en
              ? `${escapeHtml(inviter)} wants to run this project with you on vibebook: a room with chat, a doc and tasks, where your Claude and ${escapeHtml(name)}'s talk too.`
              : `${escapeHtml(inviter)} quer tocar esse projeto com você no vibebook: uma sala com chat, documento e tarefas, onde o seu Claude e o de ${escapeHtml(name)} também conversam.`
          }</p><p style="margin:24px 0"><a href="${url}" style="background:#1d5fc4;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700">${en ? "Open the room" : "Abrir a sala"}</a></p><p style="font-size:13px;color:#6b7383">${
            en ? "The button signs you in and works for 24h. After that, just sign in with your email." : "O botão já te deixa logado e vale por 24h. Depois disso é só entrar com seu email."
          }</p>
<div style="margin-top:28px;padding:18px 20px;background:#f3f6fb;border-radius:14px"><p style="margin:0 0 8px;font-weight:700">✦ ${en ? "Bring your Claude" : "Traga seu Claude"}</p><p style="margin:0 0 8px">${
            en ? "Paste this in <b>Claude Code</b>, inside the project folder:" : "Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:"
          }</p><p style="margin:0;font-family:ui-monospace,Menlo,monospace;font-size:13px;background:#fff;border:1px solid #dde4ee;border-radius:8px;padding:10px 12px">${escapeHtml(setup)}</p><p style="margin:10px 0 0;font-size:14px">${en ? "Claude.ai or another client?" : "Claude.ai ou outro cliente?"} <a href="${connect}" style="color:#1d5fc4;font-weight:700">${en ? "Step by step" : "Passo a passo"}</a></p></div>`,
        ),
      }).catch((e) => console.error("invite email failed", { who, error: String(e) })),
    );
  }
  await bookStub(env, bookId).fetch("https://book/members-changed", { method: "POST" });
}

// A room's icon (e.g. its site's favicon), shared by the room: R2 `icons/<book>`, books.icon = version (null = none).
export const ICON_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/x-icon", "image/vnd.microsoft.icon"];
export async function setRoomIcon(env: Env, bookId: string, img: { type: string; body: ArrayBuffer } | null): Promise<number | null> {
  if (!img) {
    await env.FILES.delete(`icons/${bookId}`);
    await env.DB.prepare(`UPDATE books SET icon = NULL WHERE id = ?`).bind(bookId).run();
    return null;
  }
  if (!ICON_TYPES.includes(img.type)) throw new Error("Use PNG, JPEG, WebP, GIF ou ICO (SVG não).");
  if (!img.body.byteLength || img.body.byteLength > 256_000) throw new Error("Ícone vazio ou maior que 256KB.");
  await env.FILES.put(`icons/${bookId}`, img.body, { httpMetadata: { contentType: img.type } });
  const v = Date.now();
  await env.DB.prepare(`UPDATE books SET icon = ? WHERE id = ?`).bind(v, bookId).run();
  return v;
}

// Files: images, PDF, HTML, Markdown and audio (no SVG: it can carry script without our sandbox applying to <img>).
// HTML is served under a sandbox CSP with no same-origin (see fileHeaders), so it can't touch vibebook.dev.
// Audio: recordings already made (iPhone's Voice Memos exports .m4a, recorders .mp3/.wav); played with <audio> in the app.
export const AUDIO_TYPES = ["audio/mp4", "audio/x-m4a", "audio/m4a", "audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/wave", "audio/aac", "audio/x-aac", "audio/ogg", "audio/webm", "audio/flac", "audio/x-flac"];
export const FILE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf", "text/html", "text/markdown", ...AUDIO_TYPES];
/** reminders/<name>.md: a room reminder (Book.reminderFile reads its schedule). */
export const REMINDER_FILE = /^reminders\/([^\\/\u0000-\u001f]{1,60})\.md$/i;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_AUDIO_BYTES = 50 * 1024 * 1024;
export const maxBytes = (type: string) => (type.startsWith("audio/") ? MAX_AUDIO_BYTES : MAX_FILE_BYTES);
export const TYPES_ERROR = "Tipo de arquivo não suportado (imagens, PDF, HTML, Markdown e áudio).";
export const sizeError = (type: string) => `Arquivo vazio ou maior que ${maxBytes(type) / 1024 / 1024}MB.`;
export type StoredFile = { id: string; name: string; type: string; size: number; author: string; ts: number; reminder?: { ok: boolean; name: string; error?: string; every?: string | null; next_at?: string } };

/** Validates and stores one file in R2 + the room's index. Throws an Error whose message is user-facing. */
export async function storeFile(env: Env, bookId: string, email: string, type: string, body: ArrayBuffer, rawName: string): Promise<StoredFile> {
  if (!FILE_TYPES.includes(type)) throw new Error(TYPES_ERROR);
  if (!body.byteLength || body.byteLength > maxBytes(type)) throw new Error(sizeError(type));
  const text = type.startsWith("text/") ? new TextDecoder().decode(body) : "";
  if (text) {
    const secret = findSecret(text);
    if (secret) throw new Error(`Não subi: o arquivo parece ter ${secret}. Segredo não entra na sala.`);
  }
  if (!(await env.UPLOAD_LIMIT.limit({ key: email })).success) throw new Error("Muitos uploads. Espera um minuto.");
  const rem = type === "text/markdown" ? REMINDER_FILE.exec(rawName.trim()) : null;
  const agentMd = type === "text/markdown" ? /^agents\/([^\\/\u0000-\u001f]{1,60})\.md$/i.exec(rawName.trim()) : null; // a sandbox's CLAUDE.md (src/sandbox.ts)
  const appHtml = type === "text/html" ? /^apps\/([\w.-]{1,60})\.html$/i.exec(rawName.trim()) : null; // a room app (Conexões → Esta sala)
  // A room app can ask to post or move tasks as whoever opens it: it passes the same check as HTML posted in a message.
  if (appHtml) await checkEmbed(env, text, email);
  const name = rem ? `reminders/${rem[1].trim()}.md` : agentMd ? `agents/${agentMd[1].trim()}.md` : appHtml ? `apps/${appHtml[1]}.html` : (rawName || `arquivo.${{ "text/html": "html", "text/markdown": "md" }[type] ?? type.split("/")[1]}`).replace(/[\\/\u0000-\u001f]/g, "_").slice(0, 120);
  const meta = { id: crypto.randomUUID().replace(/-/g, "").slice(0, 16), name, type, size: body.byteLength, author: email, ts: Date.now() };
  await env.FILES.put(`${bookId}/${meta.id}`, body, { httpMetadata: { contentType: type }, customMetadata: { name, author: email } });
  await bookStub(env, bookId).fetch(`https://book/file?book=${bookId}`, { method: "POST", body: JSON.stringify(meta) });
  if (rem) return { ...meta, reminder: await bookStub(env, bookId).reminderFile(bookId, email, rem[1].trim(), text, meta.id) };
  return meta;
}

// Uploaded HTML runs in an opaque origin: scripts may run (reports draw charts) but can't reach vibebook.dev's
// cookies or storage, can't fetch anything, submit forms, open popups or navigate the top page. Images only from
// here or data: (no tracking pixels); fonts from Google Fonts.
const HTML_CSP =
  "sandbox allow-scripts; default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'none'; form-action 'none'; base-uri 'none'; frame-ancestors 'self'";
const FILE_CSP = "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'";

export const fileHeaders = (type: string, name: string) => ({
  "content-type": FILE_TYPES.includes(type) ? (type === "text/html" ? "text/html; charset=utf-8" : type === "text/markdown" ? "text/plain; charset=utf-8" : type) : "application/octet-stream",
  "content-disposition": `inline; filename*=UTF-8''${encodeURIComponent(name)}`,
  "x-content-type-options": "nosniff",
  "content-security-policy": type === "text/html" ? HTML_CSP : FILE_CSP,
  "referrer-policy": "no-referrer",
  "cross-origin-opener-policy": "same-origin",
  "cache-control": "private, max-age=86400",
});

/** "Esperando você": what people are waiting on this person for, newest first, in rooms they haven't archived.
 * ref m<id> = a message Jev read as an ask to them; t<id> = a task of theirs in review. */
export const waitsFor = async (db: D1Database, email: string, bookId?: string) =>
  (
    await db
      .prepare(
        `SELECT w.book_id, b.title AS room, w.ref, w.thread, w.topic, w.author, u.name AS author_name, w.text, w.ts
         FROM waits w JOIN members m ON m.book_id = w.book_id AND m.email = w.email JOIN books b ON b.id = w.book_id
         LEFT JOIN users u ON u.email = w.author
         WHERE w.email = ? AND m.archived_at IS NULL AND (?2 IS NULL OR w.book_id = ?2)
           AND NOT (w.ref LIKE 'a%' AND w.ts < ?3) ORDER BY w.ts DESC LIMIT 60`,
      )
      .bind(email, bookId ?? null, Date.now() - 15 * 60e3) // a hook question lives ≤630s; a row it left behind (killed) expires
      .all<{ book_id: string; room: string; ref: string; thread: string; topic: string | null; author: string; author_name: string | null; text: string; ts: number }>()
  ).results;

// Search across the person's rooms (⌘K and MCP search): the newest-opened 30 rooms, each asked in parallel
// (Book.search), merged newest first. Worst case per call: 30 DO calls, no network or model call behind them.
// ponytail: fan-out over rooms; a D1 index of messages if people get hundreds of rooms.
export async function searchRooms(env: Env, email: string, q: string, room?: string) {
  const rooms = (
    await env.DB.prepare(
      `SELECT b.id, b.title FROM books b JOIN members m ON m.book_id = b.id
       WHERE m.email = ?1 AND m.archived_at IS NULL AND (?2 IS NULL OR b.id = ?2)
       ORDER BY coalesce(m.opened_at, 0) DESC, b.updated_at DESC LIMIT 30`,
    )
      .bind(email, room ?? null)
      .all<{ id: string; title: string }>()
  ).results;
  const per = await Promise.all(
    rooms.map(async (r) => {
      try {
        const out = await bookStub(env, r.id).search(r.id, q, room ? 20 : 8);
        return { ...out, room: r };
      } catch {
        return { messages: [], epics: [], room: r, failed: true };
      }
    }),
  );
  const messages = per.flatMap((p) => p.messages.map((m) => ({ ...m, room_id: p.room.id, room: p.room.title }))).sort((a, b) => b.ts - a.ts).slice(0, 30);
  const epics = per.flatMap((p) => p.epics.map((e) => ({ ...e, room_id: p.room.id, room: p.room.title }))).sort((a, b) => b.ts - a.ts).slice(0, 15);
  return { rooms: rooms.length, failed: per.filter((p) => "failed" in p).length, epics, messages };
}
