import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { Context } from "hono";
import type { Env } from "./index";
import { track } from "./track";

const COOKIE = "vb_session";
const MAX_AGE = 60 * 60 * 24 * 30;
const CODE_TTL_MS = 10 * 60 * 1000;
const MAX_CODE_ATTEMPTS = 5;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const enc = new TextEncoder();
const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf instanceof Uint8Array ? buf : new Uint8Array(buf))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

async function hmac(secret: string, data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}
const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
};

/** Email of the signed-in user, or null. */
export async function sessionEmail(c: Context<any>): Promise<string | null> {
  const env = c.env as Env;
  const raw = getCookie(c, COOKIE);
  if (!raw || !env.SESSION_SECRET) return null;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig || !safeEqual(sig, await hmac(env.SESSION_SECRET, payload))) return null;
  try {
    const { email, iat } = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof email === "string" && Date.now() - iat < MAX_AGE * 1000 ? email : null;
  } catch {
    return null;
  }
}

async function startSession(c: Context<{ Bindings: Env }>, email: string) {
  const payload = b64url(enc.encode(JSON.stringify({ email: email.toLowerCase(), iat: Date.now() })));
  setCookie(c, COOKIE, `${payload}.${await hmac(c.env.SESSION_SECRET, payload)}`, {
    httpOnly: true,
    secure: new URL(c.req.url).protocol === "https:",
    sameSite: "Lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

// Only follow same-site relative paths after login.
const safeNext = (next: string | undefined) => (next && /^\/(app|b\/[a-z0-9]+)/.test(next) ? next : "/app");

const codeHash = (env: Env, email: string, code: string) => hmac(env.SESSION_SECRET, `code:${email}:${code}`);

// Cheap filter in front of email sends; not a security boundary.
const sameOrigin = (c: Context) => {
  const origin = c.req.header("origin");
  return !origin || origin === new URL(c.req.url).origin;
};

export const auth = new Hono<{ Bindings: Env }>();

auth.get("/providers", (c) => c.json({ google: !!(c.env.GOOGLE_CLIENT_ID && c.env.GOOGLE_CLIENT_SECRET), email: true }));

auth.post("/email/start", async (c) => {
  if (!sameOrigin(c)) return c.json({ error: "bad origin" }, 403);
  const ip = c.req.header("cf-connecting-ip") ?? "local";
  const { email: raw } = await c.req.json<{ email?: string }>().catch(() => ({ email: "" }));
  const email = (raw ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return c.json({ error: "Email inválido." }, 400);
  const [byIp, byEmail] = await Promise.all([
    c.env.LOGIN_LIMIT.limit({ key: `ip:${ip}` }),
    c.env.LOGIN_LIMIT.limit({ key: `email:${email}` }),
  ]);
  if (!byIp.success || !byEmail.success) return c.json({ error: "Muitas tentativas. Espera um minuto." }, 429);

  const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, "0");
  await c.env.DB.prepare(
    `INSERT INTO login_codes (email, hash, expires_at, attempts) VALUES (?, ?, ?, 0)
     ON CONFLICT(email) DO UPDATE SET hash = excluded.hash, expires_at = excluded.expires_at, attempts = 0`,
  )
    .bind(email, await codeHash(c.env, email, code), Date.now() + CODE_TTL_MS)
    .run();

  c.executionCtx.waitUntil(track(c.env, "login_code_sent", { user: email }));
  if (c.env.DEV_EMAIL) {
    console.log(`[dev] login code for ${email}: ${code}`);
    return c.json({ ok: true });
  }
  try {
    await c.env.EMAIL.send({
      to: email,
      from: { email: "login@vibebook.dev", name: "vibebook" },
      subject: `${code} é seu código do vibebook`,
      text: `Seu código para entrar no vibebook: ${code}\n\nVale por 10 minutos. Se não foi você, ignore este email.`,
      html: emailHtml(
        "Seu código para entrar",
        `<p style="font-size:40px;letter-spacing:8px;font-weight:700;margin:24px 0;color:#14305e">${code}</p><p>Vale por 10 minutos. Se não foi você, ignore este email.</p>`,
      ),
    });
  } catch (e) {
    console.error("login email failed", { email, error: String(e) });
    return c.json({ error: "Não conseguimos enviar o email agora. Tenta de novo em instantes." }, 502);
  }
  return c.json({ ok: true });
});

auth.post("/email/verify", async (c) => {
  if (!sameOrigin(c)) return c.json({ error: "bad origin" }, 403);
  const body = await c.req.json<{ email?: string; code?: string; next?: string }>().catch(() => ({}) as Record<string, string>);
  const email = (body.email ?? "").trim().toLowerCase();
  const code = (body.code ?? "").replace(/\D/g, "");
  const row = await c.env.DB.prepare(`SELECT hash, expires_at, attempts FROM login_codes WHERE email = ?`).bind(email).first<{
    hash: string;
    expires_at: number;
    attempts: number;
  }>();
  if (!row || row.expires_at < Date.now() || row.attempts >= MAX_CODE_ATTEMPTS)
    return c.json({ error: "Código expirado. Pede um novo." }, 400);
  if (!safeEqual(row.hash, await codeHash(c.env, email, code))) {
    await c.env.DB.prepare(`UPDATE login_codes SET attempts = attempts + 1 WHERE email = ?`).bind(email).run();
    return c.json({ error: "Código errado." }, 400);
  }
  await c.env.DB.prepare(`DELETE FROM login_codes WHERE email = ?`).bind(email).run();
  await startSession(c, email);
  c.executionCtx.waitUntil(track(c.env, "login", { user: email, dims: { method: "email" } }));
  return c.json({ ok: true, next: safeNext(body.next) });
});

auth.get("/google/start", async (c) => {
  if (!c.env.GOOGLE_CLIENT_ID) return c.redirect("/login");
  const state = b64url(crypto.getRandomValues(new Uint8Array(16)));
  setCookie(c, "vb_oauth", `${state}|${safeNext(c.req.query("next"))}`, { httpOnly: true, secure: true, sameSite: "Lax", path: "/auth", maxAge: 600 });
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: c.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${new URL(c.req.url).origin}/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  }).toString();
  return c.redirect(url.toString());
});

auth.get("/google/callback", async (c) => {
  const [state, next] = (getCookie(c, "vb_oauth") ?? "").split("|");
  deleteCookie(c, "vb_oauth", { path: "/auth" });
  if (!state || state !== c.req.query("state") || !c.req.query("code")) return c.redirect("/login?error=google");
  const tok = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: c.req.query("code")!,
      client_id: c.env.GOOGLE_CLIENT_ID!,
      client_secret: c.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${new URL(c.req.url).origin}/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  }).then((r) => r.json<{ access_token?: string }>());
  if (!tok.access_token) return c.redirect("/login?error=google");
  const info = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { authorization: `Bearer ${tok.access_token}` },
  }).then((r) => r.json<{ email?: string; email_verified?: boolean; given_name?: string; name?: string }>());
  if (!info.email || !info.email_verified) return c.redirect("/login?error=google");
  await startSession(c, info.email);
  c.executionCtx.waitUntil(track(c.env, "login", { user: info.email.toLowerCase(), dims: { method: "google" } }));
  const gname = (info.given_name || info.name || "").trim().slice(0, 60);
  if (gname)
    await c.env.DB.prepare(`INSERT INTO users (email, created_at, name) VALUES (?, ?, ?) ON CONFLICT(email) DO UPDATE SET name = COALESCE(users.name, excluded.name)`)
      .bind(info.email.toLowerCase(), Date.now(), gname)
      .run()
      .catch(() => {});
  return c.redirect(safeNext(next));
});

// Magic link in invite emails: signed, 24h, logs in as the invited email only.
const INVITE_TTL_MS = 24 * 60 * 60 * 1000;

export async function inviteLink(env: Env, origin: string, email: string, bookId: string) {
  const payload = b64url(enc.encode(JSON.stringify({ e: email, b: bookId, x: Date.now() + INVITE_TTL_MS })));
  return `${origin}/auth/invite?t=${payload}.${await hmac(env.SESSION_SECRET, `invite:${payload}`)}`;
}

auth.get("/invite", async (c) => {
  const [payload, sig] = (c.req.query("t") ?? "").split(".");
  if (!payload || !sig || !safeEqual(sig, await hmac(c.env.SESSION_SECRET, `invite:${payload}`))) return c.redirect("/login");
  let t: { e?: string; b?: string; x?: number };
  try {
    t = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return c.redirect("/login");
  }
  const next = `/b/${t.b}`;
  // Expired link: still useful, just log in normally and come back to the book.
  if (!t.e || !t.b || !t.x || t.x < Date.now()) return c.redirect(`/login?next=${encodeURIComponent(next)}`);
  await startSession(c, t.e);
  c.executionCtx.waitUntil(track(c.env, "login", { user: t.e, dims: { method: "invite" } }));
  return c.redirect(safeNext(next));
});

auth.post("/logout", (c) => {
  deleteCookie(c, COOKIE, { path: "/" });
  return c.json({ ok: true });
});

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

export const emailHtml =(title: string, body: string) => `<!doctype html><html><body style="margin:0;background:#f3f6fb;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1a2130">
<div style="max-width:480px;margin:0 auto;padding:32px 20px">
<div style="font-weight:800;font-size:22px;color:#1d5fc4;margin-bottom:20px">vibebook</div>
<div style="background:#fff;border-radius:16px;padding:28px">
<h1 style="font-size:20px;margin:0 0 8px">${title}</h1>${body}</div>
<p style="font-size:12px;color:#6b7383;margin-top:20px">vibebook.dev · pensa junto, a AI organiza</p>
</div></body></html>`;
