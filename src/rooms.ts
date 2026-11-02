// Room (vibebook) operations shared by the app API and the agent MCP.
import { emailHtml, escapeHtml, inviteLink } from "./auth";
import type { Env } from "./index";
import { track } from "./track";

export const isMember = async (db: D1Database, bookId: string, email: string) =>
  !!(await db.prepare(`SELECT 1 FROM members WHERE book_id = ? AND email = ?`).bind(bookId, email).first());

export const befriend = (db: D1Database, a: string, b: string) => {
  const now = Date.now();
  const q = `INSERT OR IGNORE INTO friends (a, b, created_at) VALUES (?, ?, ?)`;
  return db.batch([db.prepare(q).bind(a, b, now), db.prepare(q).bind(b, a, now)]);
};

export const bookStub = (env: Env, id: string) => env.BOOK.get(env.BOOK.idFromName(id));

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
export async function inviteMember(env: Env, ctx: { waitUntil(p: Promise<unknown>): void }, origin: string, inviter: string, bookId: string, who: string) {
  await env.DB.prepare(`INSERT OR IGNORE INTO members (book_id, email) VALUES (?, ?)`).bind(bookId, who).run();
  await befriend(env.DB, inviter, who);
  ctx.waitUntil(track(env, "invite_sent", { user: inviter, dims: { book: bookId } }));
  if (!env.DEV_EMAIL && (await env.LOGIN_LIMIT.limit({ key: `invite:${inviter}` })).success) {
    const book = await env.DB.prepare(`SELECT title FROM books WHERE id = ?`).bind(bookId).first<{ title: string }>();
    const url = await inviteLink(env, origin, who, bookId);
    const title = book?.title ?? "um vibebook";
    const name = inviter.split("@")[0];
    ctx.waitUntil(
      env.EMAIL.send({
        to: who,
        from: { email: "convite@vibebook.dev", name: "vibebook" },
        replyTo: inviter,
        subject: `${name} te chamou pro vibebook "${title}"`,
        text: `${inviter} te convidou para o vibebook "${title}".\n\nEntra aqui: ${url}\n\nTraga seu Claude (1 minuto): no Claude.ai, Configurações → Conectores → Adicionar conector personalizado, URL ${origin}/mcp, e Permitir.\nClaude Code e outros agents: ${origin}/pt/connect`,
        html: emailHtml(
          `${escapeHtml(name)} te chamou pro vibebook`,
          `<p style="font-size:18px;font-weight:700">${escapeHtml(title)}</p><p>${escapeHtml(inviter)} quer tocar esse projeto com você no vibebook: uma sala com chat, documento e tarefas, onde o seu Claude e o de ${escapeHtml(name)} também conversam.</p><p style="margin:24px 0"><a href="${url}" style="background:#1d5fc4;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700">Abrir a sala</a></p><p style="font-size:13px;color:#6b7383">O botão já te deixa logado e vale por 24h. Depois disso é só entrar com seu email.</p>
<div style="margin-top:28px;padding:18px 20px;background:#f3f6fb;border-radius:14px"><p style="margin:0 0 8px;font-weight:700">✦ Traga seu Claude (1 minuto)</p><ol style="margin:0;padding-left:20px;line-height:1.6"><li>No Claude.ai: Configurações → Conectores → <b>Adicionar conector personalizado</b></li><li>Cole a URL <b>${origin}/mcp</b> e clique em Conectar</li><li>Entre com este email e clique em <b>Permitir</b></li></ol><p style="margin:10px 0 0;font-size:14px">Usa o Claude Code ou outro agent? <a href="${origin}/pt/connect" style="color:#1d5fc4;font-weight:700">Passo a passo completo</a></p></div>`,
        ),
      }).catch((e) => console.error("invite email failed", { who, error: String(e) })),
    );
  }
  await bookStub(env, bookId).fetch("https://book/members-changed", { method: "POST" });
}
