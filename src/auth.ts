import { githubEmail, githubName, githubToken } from "./githubIdentity";
import { Hono } from "hono";
import * as z from "zod/mini";
import { reqLang } from "./lang";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { Context } from "hono";
import type { Env } from "./index";
import { track } from "./track";
import type { AuthFail, AuthServices } from "./api";
import { uiNavigationUrl, uiVariant } from "../shared/uiVariant";

const COOKIE = "vb_session";
const MAX_AGE = 60 * 60 * 24 * 30;
const CODE_TTL_MS = 10 * 60 * 1000;
const MAX_CODE_ATTEMPTS = 5;
const SessionPayload = z.object({ email: z.string(), iat: z.number() });
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const enc = new TextEncoder();
const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf instanceof Uint8Array ? buf : new Uint8Array(buf))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

export async function hmac(secret: string, data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}
export const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
};

/** Email of the signed-in user, or null. */
export async function sessionEmail<E extends { Bindings: Env }>(c: Context<E>): Promise<string | null> {
  const env = c.env;
  const raw = getCookie(c, COOKIE);
  if (!raw || !env.SESSION_SECRET) return null;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig || !safeEqual(sig, await hmac(env.SESSION_SECRET, payload))) return null;
  try {
    const parsed = SessionPayload.safeParse(JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))));
    if (!parsed.success) return null;
    const { email, iat } = parsed.data;
    if (Date.now() - iat >= MAX_AGE * 1000) return null;
    // "Sair de todos os aparelhos" sets users.session_after: older cookies stop working (within a minute per server).
    return iat > (await sessionAfter(env, email)) ? email : null;
  } catch {
    return null;
  }
}
const afterSeen = new Map<string, { after: number; at: number }>();
async function sessionAfter(env: Env, email: string) {
  const hit = afterSeen.get(email);
  if (hit && hit.at > Date.now() - 60_000) return hit.after;
  const row = await env.DB.prepare(`SELECT session_after FROM users WHERE email = ?`).bind(email).first<{ session_after: number | null }>().catch(() => null);
  if (afterSeen.size > 20_000) afterSeen.clear();
  afterSeen.set(email, { after: row?.session_after ?? 0, at: Date.now() });
  return row?.session_after ?? 0;
}

async function startSession<E extends { Bindings: Env }>(c: Context<E>, email: string) {
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
// /authorize?… is the agent-connect consent page (OAuth), reached through login.
const safeNext = (next: string | undefined) => (next && /^\/(app|b\/[a-z0-9]+|archived(?:$|\?)|authorize\?|api\/books\/[a-z0-9]+\/files\/[a-z0-9]+$)/.test(next) ? next : "/app");

/** The login page for an error or a retry, in the same UI as where the person was going (`next` carries ?ui=svelte). */
const loginUrl = (c: Context, next: string | undefined, query: string) => uiNavigationUrl(`/login${query}`, c.req.url, uiVariant(new URL(safeNext(next), c.req.url)));

const codeHash = (env: Env, email: string, code: string) => hmac(env.SESSION_SECRET, `code:${email}:${code}`);

// Cheap filter in front of email sends; not a security boundary.
const sameOrigin = (c: Context) => {
  const origin = c.req.header("origin");
  return !origin || origin === new URL(c.req.url).origin;
};

/** Signed-in email; in local dev (DEV_EMAIL) the dev_as cookie picks the identity so two browsers can be two people. */
export async function identify<E extends { Bindings: Env }>(c: Context<E>): Promise<string | null> {
  const email = await sessionEmail(c);
  const env = c.env;
  // DEV_EMAIL is local dev only: even if it ever reached production config, it works on loopback alone.
  if (email || !env.DEV_EMAIL || !/^(127\.0\.0\.1|localhost)$/.test(new URL(c.req.url).hostname)) return email;
  const as = getCookie(c, "dev_as");
  return (as && EMAIL_RE.test(as) ? as : env.DEV_EMAIL).toLowerCase();
}

/** The public auth routes' side (src/api.ts authApi): every check and write of the old handlers, answering a value
 *  or { error, status }. Built per request; the route only validates the body and turns the answer into JSON. */
export function authServices<E extends { Bindings: Env }>(c: Context<E>, deps: Pick<AuthServices, "roomAccess">): AuthServices {
  const fail = (error: string, status: AuthFail["status"]): AuthFail => ({ error, status });
  const OK = { ok: true as const };
  return {
    ...deps,
    providers: { google: !!(c.env.GOOGLE_CLIENT_ID && c.env.GOOGLE_CLIENT_SECRET), github: !!(c.env.GITHUB_CLIENT_ID && c.env.GITHUB_CLIENT_SECRET), email: true },
    sameOrigin: sameOrigin(c),
    safeNext,
    loginUrl: (next, query) => loginUrl(c, next, query),
    async emailStart(raw) {
      const ip = c.req.header("cf-connecting-ip") ?? "local";
      const email = raw.trim().toLowerCase();
      const en = reqLang(c.req.raw) === "en";
      if (!EMAIL_RE.test(email)) return fail(en ? "Invalid email." : "Email inválido.", 400);
      const [byIp, byEmail] = await Promise.all([
        c.env.LOGIN_LIMIT.limit({ key: `ip:${ip}` }),
        c.env.LOGIN_LIMIT.limit({ key: `email:${email}` }),
      ]);
      if (!byIp.success || !byEmail.success) return fail(en ? "Too many tries. Wait a minute." : "Muitas tentativas. Espera um minuto.", 429);

      const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, "0");
      await c.env.DB.prepare(
        // Asking for a new code doesn't reset the wrong guesses while the last code is still valid: at most
        // MAX_CODE_ATTEMPTS guesses per CODE_TTL per email, however many codes are requested.
        `INSERT INTO login_codes (email, hash, expires_at, attempts) VALUES (?, ?, ?, 0)
         ON CONFLICT(email) DO UPDATE SET hash = excluded.hash, expires_at = excluded.expires_at,
           attempts = CASE WHEN login_codes.expires_at > ?4 THEN login_codes.attempts ELSE 0 END`,
      )
        .bind(email, await codeHash(c.env, email, code), Date.now() + CODE_TTL_MS, Date.now())
        .run();

      c.executionCtx.waitUntil(track(c.env, "login_code_sent", { user: email }));
      if (c.env.DEV_EMAIL) {
        console.log(`[dev] login code for ${email}: ${code}`);
        return OK;
      }
      try {
        await c.env.EMAIL.send({
          to: email,
          from: { email: "login@vibebook.dev", name: "vibebook" },
          subject: en ? `${code} is your vibebook code` : `${code} é seu código do vibebook`,
          text: en ? `Your code to sign in to vibebook: ${code}\n\nIt works for 10 minutes. If this wasn't you, ignore this email.` : `Seu código para entrar no vibebook: ${code}\n\nVale por 10 minutos. Se não foi você, ignore este email.`,
          html: emailHtml(
            en ? "Your sign-in code" : "Seu código para entrar",
            `<p style="font-size:40px;letter-spacing:8px;font-weight:700;margin:24px 0;color:#14305e">${code}</p><p>${en ? "It works for 10 minutes. If this wasn't you, ignore this email." : "Vale por 10 minutos. Se não foi você, ignore este email."}</p>`,
          ),
        });
      } catch (e) {
        console.error("login email failed", { email, error: String(e) });
        return fail(en ? "We couldn't send the email right now. Try again in a moment." : "Não conseguimos enviar o email agora. Tenta de novo em instantes.", 502);
      }
      return OK;
    },
    async emailVerify(body) {
      const email = (body.email ?? "").trim().toLowerCase();
      const code = (body.code ?? "").replace(/\D/g, "");
      const en = reqLang(c.req.raw) === "en";
      const ip = c.req.header("cf-connecting-ip") ?? "local";
      const lim = await Promise.all([c.env.LOGIN_LIMIT.limit({ key: `verify-ip:${ip}` }), c.env.LOGIN_LIMIT.limit({ key: `verify:${email}` })]);
      if (lim.some((r) => !r.success)) return fail(en ? "Too many tries. Wait a minute." : "Muitas tentativas. Espera um minuto.", 429);
      // Count the attempt before comparing, atomically: parallel guesses can't all read "attempts < 5".
      const row = await c.env.DB.prepare(`UPDATE login_codes SET attempts = attempts + 1 WHERE email = ? RETURNING hash, expires_at, attempts - 1 AS attempts`).bind(email).first<{
        hash: string;
        expires_at: number;
        attempts: number;
      }>();
      if (row && row.expires_at > Date.now() && row.attempts >= MAX_CODE_ATTEMPTS)
        return fail(en ? "Too many wrong codes. Wait 10 minutes and ask for a new one." : "Muitas tentativas erradas. Espera 10 minutos e pede um código novo.", 429);
      if (!row || row.expires_at < Date.now()) return fail(en ? "Code expired. Ask for a new one." : "Código expirado. Pede um novo.", 400);
      if (!safeEqual(row.hash, await codeHash(c.env, email, code))) {
        return fail(en ? "Wrong code." : "Código errado.", 400);
      }
      await c.env.DB.prepare(`DELETE FROM login_codes WHERE email = ?`).bind(email).run();
      await startSession(c, email);
      c.executionCtx.waitUntil(track(c.env, "login", { user: email, dims: { method: "email" } }));
      return { ok: true, next: safeNext(body.next) };
    },
    logout: () => deleteCookie(c, COOKIE, { path: "/" }),
    async logoutAll() {
      const email = await sessionEmail(c);
      if (!email) return fail("unauthenticated", 401);
      await c.env.DB.prepare(`UPDATE users SET session_after = ? WHERE email = ?`).bind(Date.now(), email).run();
      afterSeen.delete(email);
      deleteCookie(c, COOKIE, { path: "/" });
      c.executionCtx.waitUntil(track(c.env, "logout_all", { user: email }));
      return OK;
    },
  };
}

export const auth = new Hono<{ Bindings: Env }>();




auth.get("/google/start", async (c) => {
  if (!c.env.GOOGLE_CLIENT_ID) return c.redirect(loginUrl(c, c.req.query("next"), ""));
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
  if (!state || state !== c.req.query("state") || !c.req.query("code")) return c.redirect(loginUrl(c, next, "?error=google"));
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
  if (!tok.access_token) return c.redirect(loginUrl(c, next, "?error=google"));
  const info = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { authorization: `Bearer ${tok.access_token}` },
  }).then((r) => r.json<{ email?: string; email_verified?: boolean; given_name?: string; name?: string }>());
  if (!info.email || !info.email_verified) return c.redirect(loginUrl(c, next, "?error=google"));
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
  // The link signs in only a first-timer, once (security review, Nov 2026): it reached whole accounts, could be
  // forwarded or quoted back in a reply, and swapped the session of whoever was signed in (login CSRF).
  // Someone already signed in goes to the room as they are; an existing account logs in the normal way.
  const current = await sessionEmail(c);
  if (current) return c.redirect(safeNext(next));
  const known = await c.env.DB.prepare(`SELECT 1 FROM users WHERE email = ?`).bind(t.e).first();
  const used = !known && (await c.env.DB.prepare(`INSERT INTO invite_used (sig, ts) VALUES (?, ?) ON CONFLICT DO NOTHING`).bind(sig, Date.now()).run()).meta.changes === 0;
  if (known || used) return c.redirect(`/login?next=${encodeURIComponent(next)}`);
  await startSession(c, t.e);
  c.executionCtx.waitUntil(track(c.env, "login", { user: t.e, dims: { method: "invite" } }));
  return c.redirect(safeNext(next));
});

// Every browser signed in as you (phone, laptop, a stolen cookie) is signed out; your Claudes' logins are separate.

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

// Every vibebook email: centered table layout (Gmail/Outlook ignore most CSS), the real logo as a PNG (no SVG in
// mail clients), brand blue, Caprasimo-like title with safe fallbacks, white card on the app's background.
// GitHub, same shape as Google: state in a cookie, code for a token, then only the account's primary verified email.
auth.get("/github/start", async (c) => {
  if (!c.env.GITHUB_CLIENT_ID) return c.redirect(loginUrl(c, c.req.query("next"), ""));
  const state = b64url(crypto.getRandomValues(new Uint8Array(16)));
  setCookie(c, "vb_oauth", `${state}|${safeNext(c.req.query("next"))}`, { httpOnly: true, secure: true, sameSite: "Lax", path: "/auth", maxAge: 600 });
  const url = new URL("https://github.com/login/oauth/authorize");
  url.search = new URLSearchParams({
    client_id: c.env.GITHUB_CLIENT_ID,
    redirect_uri: `${new URL(c.req.url).origin}/auth/github/callback`,
    scope: "read:user user:email",
    state,
    allow_signup: "true",
  }).toString();
  return c.redirect(url.toString());
});

auth.get("/github/callback", async (c) => {
  const [state, next] = (getCookie(c, "vb_oauth") ?? "").split("|");
  deleteCookie(c, "vb_oauth", { path: "/auth" });
  if (!state || state !== c.req.query("state") || !c.req.query("code")) return c.redirect(loginUrl(c, next, "?error=github"));
  const tok = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" },
    body: new URLSearchParams({
      code: c.req.query("code")!,
      client_id: c.env.GITHUB_CLIENT_ID!,
      client_secret: c.env.GITHUB_CLIENT_SECRET!,
      redirect_uri: `${new URL(c.req.url).origin}/auth/github/callback`,
    }),
  }).then(async (r) => r.ok ? githubToken(await r.json()) : null).catch(() => null);
  if (!tok) return c.redirect(loginUrl(c, next, "?error=github"));
  const gh = (path: string) => fetch(`https://api.github.com${path}`, { headers: { authorization: `Bearer ${tok}`, accept: "application/vnd.github+json", "user-agent": "vibebook" } });
  const email = await gh("/user/emails").then(async (r) => r.ok ? githubEmail(await r.json()) : null).catch(() => null);
  if (!email) return c.redirect(loginUrl(c, next, "?error=github"));
  await startSession(c, email);
  c.executionCtx.waitUntil(track(c.env, "login", { user: email.toLowerCase(), dims: { method: "github" } }));
  const gname = await gh("/user").then(async (r) => r.ok ? githubName(await r.json()) : "").catch(() => "");
  if (gname)
    await c.env.DB.prepare(`INSERT INTO users (email, created_at, name) VALUES (?, ?, ?) ON CONFLICT(email) DO UPDATE SET name = COALESCE(users.name, excluded.name)`)
      .bind(email.toLowerCase(), Date.now(), gname)
      .run()
      .catch(() => {});
  return c.redirect(safeNext(next));
});

export const emailHtml = (title: string, body: string) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="light"><link href="https://fonts.googleapis.com/css2?family=Caprasimo&display=swap" rel="stylesheet"></head>
<body style="margin:0;padding:0;background:#eef3fa">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef3fa"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a2130;font-size:15px;line-height:1.55">
<tr><td style="padding:0 4px 20px"><a href="https://vibebook.dev" style="text-decoration:none"><img src="https://vibebook.dev/email-logo.png" width="128" height="26" alt="vibebook" style="display:block;border:0;width:128px;height:26px"></a></td></tr>
<tr><td style="background:#ffffff;border-radius:18px;padding:32px 32px 28px;border:1px solid #dfe6f1">
<h1 style="margin:0 0 10px;font-family:Caprasimo,Georgia,'Times New Roman',serif;font-weight:400;font-size:24px;line-height:1.25;color:#14203a">${title}</h1>${body}</td></tr>
<tr><td style="padding:18px 4px 0;font-size:12px;color:#7a8496"><a href="https://vibebook.dev" style="color:#1d5fc4;text-decoration:none;font-weight:600">vibebook.dev</a> · pensa junto, a AI organiza</td></tr>
</table></td></tr></table></body></html>`;
