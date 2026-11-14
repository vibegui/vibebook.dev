// MCP connections without third-party tokens in vibebook (Nov 2026, "Conexões MCP sem token no vibebook").
// vibebook only says who is looking and from which room; the MCP server (or the gateway in front of it, like deco
// Studio's /mcp/gateway/<id>) decides and holds the real credentials.
// - Identity seal: every call to a connection carries X-Vibebook-Identity, a 5-minute EdDSA JWT (iss = this origin,
//   sub = the person's email, room, aud = the connection URL). The key is derived from SESSION_SECRET (HKDF), so there
//   is no new secret; the public half is at /.well-known/jwks.json.
// - OAuth per person: a server that answers 401 is signed into by each person once (RFC 9728 discovery, RFC 8414
//   metadata, dynamic client registration, PKCE S256). vibebook keeps the resulting grant (it identifies the person and
//   their org on that server, nothing else), sealed, never sent to a browser, an iframe or an agent.
import type { Env } from "./index";
import { checkUrl } from "./reader";
import { seal, unseal } from "./sandbox";
import { protectedResourceMetadata, authorizationServerMetadata, clientRegistration, providerGrant, providerOAuthError, type AuthorizationServerMetadata, type ProviderGrant } from "./mcpOAuthResponses";

const te = new TextEncoder();
const b64u = (b: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const rand = (n = 32) => b64u(crypto.getRandomValues(new Uint8Array(n)));

// ---- identity seal ----
let keyP: Promise<{ priv: CryptoKey; jwk: Record<string, string> }> | null = null;
function identityKey(env: Pick<Env, "SESSION_SECRET">) {
  return (keyP ??= (async () => {
    const base = await crypto.subtle.importKey("raw", te.encode(env.SESSION_SECRET), "HKDF", false, ["deriveBits"]);
    const seed = new Uint8Array(await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt: te.encode("vibebook"), info: te.encode("identity-seal v1") }, base, 256));
    // PKCS#8 wrapper for a raw Ed25519 seed (RFC 8410).
    const pkcs8 = new Uint8Array([0x30, 0x2e, 0x02, 0x01, 0x00, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x04, 0x22, 0x04, 0x20, ...seed]);
    const priv = (await crypto.subtle.importKey("pkcs8", pkcs8, { name: "Ed25519" }, true, ["sign"])) as CryptoKey;
    const x = String(((await crypto.subtle.exportKey("jwk", priv)) as JsonWebKey).x);
    const kid = b64u(await crypto.subtle.digest("SHA-256", te.encode(x))).slice(0, 16);
    return { priv, jwk: { kty: "OKP", crv: "Ed25519", x, kid, alg: "EdDSA", use: "sig" } };
  })());
}
export async function jwks(env: Pick<Env, "SESSION_SECRET">) {
  return { keys: [(await identityKey(env)).jwk] };
}
export async function identityJwt(env: Pick<Env, "SESSION_SECRET">, origin: string, o: { email: string; room: string; aud: string }) {
  const k = await identityKey(env);
  const now = Math.floor(Date.now() / 1000);
  const head = b64u(te.encode(JSON.stringify({ alg: "EdDSA", typ: "JWT", kid: k.jwk.kid })));
  const body = b64u(te.encode(JSON.stringify({ iss: origin, sub: o.email, email: o.email, room: o.room, aud: o.aud, iat: now, exp: now + 300, jti: rand(9) })));
  const sig = await crypto.subtle.sign({ name: "Ed25519" }, k.priv, te.encode(`${head}.${body}`));
  return `${head}.${body}.${b64u(sig)}`;
}

// ---- OAuth client (per person, per MCP server URL) ----
export class AuthNeeded extends Error {
  constructor(host: string) { super(`entre em ${host} pra usar esta conexão`); }
}
const okUrl = (env: Env, raw: string) => {
  if (env.DEV_EMAIL && /^http:\/\/(127\.0\.0\.1|localhost):\d+\//.test(raw)) return raw;
  const r = checkUrl(raw);
  if ("error" in r) throw new Error(`OAuth: ${r.error}`);
  return r.url;
};
async function getJson(env: Env, url: string): Promise<unknown> {
  const r = await fetch(okUrl(env, url), { headers: { accept: "application/json" }, redirect: "manual", signal: AbortSignal.timeout(10_000) });
  if (!r.ok) { await r.body?.cancel(); return null; }
  return r.json().catch(() => null);
}
/** Resource metadata (RFC 9728) → authorization server metadata (RFC 8414). Falls back to the resource's own origin. */
async function discover(env: Env, resource: string, wwwAuth?: string | null) {
  const u = new URL(resource);
  const tries: string[] = [];
  const hinted = /resource_metadata="([^"]+)"/.exec(wwwAuth || "")?.[1];
  if (hinted) { const h = new URL(hinted, resource); if (h.host === u.host) h.protocol = u.protocol; tries.push(h.href); } // a proxy may say http:
  tries.push(`${u.origin}/.well-known/oauth-protected-resource${u.pathname.replace(/\/$/, "")}`, `${u.origin}/.well-known/oauth-protected-resource`);
  let prm: ReturnType<typeof protectedResourceMetadata> = null;
  for (const t of tries) if ((prm = protectedResourceMetadata(await getJson(env, t).catch(() => null)))) break;
  const issuer = String(prm?.authorization_servers?.[0] || u.origin).replace(/\/$/, "");
  const iu = new URL(issuer);
  const path = iu.pathname === "/" ? "" : iu.pathname;
  let as: AuthorizationServerMetadata | null = null;
  for (const t of [`${iu.origin}/.well-known/oauth-authorization-server${path}`, `${iu.origin}/.well-known/openid-configuration${path}`, `${issuer}/.well-known/openid-configuration`])
    if ((as = authorizationServerMetadata(await getJson(env, t).catch(() => null)))) break;
  if (!as?.authorization_endpoint || !as?.token_endpoint) throw new Error(`${u.host} pede login, mas não publica como (OAuth sem metadata)`);
  return { issuer, as, scope: prm?.scopes_supported?.join(" ") ?? "" };
}
async function clientFor(env: Env, issuer: string, as: AuthorizationServerMetadata, redirect: string) {
  const row = await env.DB.prepare(`SELECT client_id, secret_enc, secret_iv FROM mcp_oauth_clients WHERE issuer = ? AND redirect = ?`).bind(issuer, redirect).first<{ client_id: string; secret_enc: string | null; secret_iv: string | null }>();
  if (row) return { id: row.client_id, secret: row.secret_enc && row.secret_iv ? await unseal(env, row.secret_enc, row.secret_iv) : null };
  if (!as.registration_endpoint) throw new Error("o servidor não aceita registro de cliente (DCR); conecte por outro caminho");
  const r = await fetch(okUrl(env, as.registration_endpoint), {
    method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, redirect: "manual", signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({ client_name: "vibebook", redirect_uris: [redirect], grant_types: ["authorization_code", "refresh_token"], response_types: ["code"], token_endpoint_auth_method: "none" }),
  });
  const j = clientRegistration(await r.json().catch(() => null));
  if (!r.ok || !j?.client_id) throw new Error(`registro de cliente falhou (${r.status})`);
  const sec = j.client_secret ? await seal(env, String(j.client_secret)) : { enc: null, iv: null };
  await env.DB.prepare(`INSERT OR REPLACE INTO mcp_oauth_clients (issuer, redirect, client_id, secret_enc, secret_iv, token_endpoint, at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .bind(issuer, redirect, String(j.client_id), sec.enc, sec.iv, String(as.token_endpoint), Date.now()).run();
  return { id: String(j.client_id), secret: j.client_secret ? String(j.client_secret) : null };
}
/** The authorize URL that signs this person into the connection's server; the browser goes there and comes back to callback. */
export async function startAuth(env: Env, origin: string, o: { email: string; book: string; cid: string; resource: string; back: string; wwwAuth?: string | null }) {
  const { issuer, as, scope } = await discover(env, o.resource, o.wwwAuth);
  const redirect = `${origin}/api/mcp-oauth/callback`;
  const client = await clientFor(env, issuer, as, redirect);
  // An opaque presentation hint only; the exact full state remains the DB key.
  // This keeps expired/replayed native callbacks on the native error surface.
  const state = `${new URL(o.back, origin).searchParams.get("ui") === "svelte" ? "svelte." : ""}${rand()}`, verifier = rand(48);
  const challenge = b64u(await crypto.subtle.digest("SHA-256", te.encode(verifier)));
  await env.DB.prepare(`INSERT INTO mcp_oauth_states (state, email, book_id, conn_id, resource, issuer, verifier, back, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(state, o.email, o.book, o.cid, o.resource, issuer, verifier, o.back, Date.now() + 10 * 60e3).run();
  const q = new URLSearchParams({ response_type: "code", client_id: client.id, redirect_uri: redirect, code_challenge: challenge, code_challenge_method: "S256", state, resource: o.resource });
  if (scope) q.set("scope", scope);
  return `${okUrl(env, as.authorization_endpoint)}${String(as.authorization_endpoint).includes("?") ? "&" : "?"}${q}`;
}
async function tokenRequest(env: Env, issuer: string, redirect: string, form: Record<string, string>) {
  const cl = await env.DB.prepare(`SELECT client_id, secret_enc, secret_iv, token_endpoint FROM mcp_oauth_clients WHERE issuer = ? AND redirect = ?`).bind(issuer, redirect).first<{ client_id: string; secret_enc: string | null; secret_iv: string | null; token_endpoint: string }>();
  if (!cl) throw new Error("cliente OAuth sumiu; conecte de novo");
  const body = new URLSearchParams({ ...form, client_id: cl.client_id });
  if (cl.secret_enc && cl.secret_iv) body.set("client_secret", await unseal(env, cl.secret_enc, cl.secret_iv));
  const r = await fetch(okUrl(env, cl.token_endpoint), { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" }, body, redirect: "manual", signal: AbortSignal.timeout(10_000) });
  const raw: unknown = await r.json().catch(() => null), j = providerGrant(raw);
  if (!r.ok || !j) { const error = providerOAuthError(raw); throw new Error(`o servidor recusou o login (${r.status}${error ? `: ${error}` : ""})`); }
  return j;
}
async function saveGrant(env: Env, email: string, resource: string, issuer: string, t: ProviderGrant, keepRefresh?: { enc: string | null; iv: string | null }) {
  const a = await seal(env, t.access_token);
  const rf = t.refresh_token ? await seal(env, t.refresh_token) : keepRefresh ?? { enc: null, iv: null };
  const exp = Date.now() + Math.min(Math.max(Number(t.expires_in) || 3600, 60), 30 * 86400) * 1000;
  await env.DB.prepare(`INSERT OR REPLACE INTO mcp_grants (email, resource, issuer, access_enc, access_iv, refresh_enc, refresh_iv, expires_at, at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(email, resource, issuer, a.enc, a.iv, rf.enc, rf.iv, exp, Date.now()).run();
}
/** Back from the server's consent: the code becomes this person's grant. Returns where to send the browser. */
export async function finishAuth(env: Env, origin: string, email: string, state: string, code: string) {
  const s = await env.DB.prepare(`DELETE FROM mcp_oauth_states WHERE state = ? RETURNING *`).bind(state).first<{ email: string; book_id: string; conn_id: string; resource: string; issuer: string; verifier: string; back: string; expires_at: number }>();
  if (!s || s.expires_at < Date.now()) throw new Error("login expirado; tente de novo");
  if (s.email !== email) throw new Error("esse login foi começado por outra conta");
  const redirect = `${origin}/api/mcp-oauth/callback`;
  const t = await tokenRequest(env, s.issuer, redirect, { grant_type: "authorization_code", code, redirect_uri: redirect, code_verifier: s.verifier, resource: s.resource });
  await saveGrant(env, email, s.resource, s.issuer, t);
  return s;
}
/** The access token for (person, server), refreshed when it's about to expire; null when they haven't signed in. */
export async function tokenFor(env: Env, origin: string, email: string, resource: string) {
  const g = await env.DB.prepare(`SELECT * FROM mcp_grants WHERE email = ? AND resource = ?`).bind(email, resource).first<{ issuer: string; access_enc: string; access_iv: string; refresh_enc: string | null; refresh_iv: string | null; expires_at: number }>();
  if (!g) return null;
  if (g.expires_at > Date.now() + 60e3) return unseal(env, g.access_enc, g.access_iv);
  if (!g.refresh_enc || !g.refresh_iv) return null;
  try {
    const t = await tokenRequest(env, g.issuer, `${origin}/api/mcp-oauth/callback`, { grant_type: "refresh_token", refresh_token: await unseal(env, g.refresh_enc, g.refresh_iv), resource });
    await saveGrant(env, email, resource, g.issuer, t, { enc: g.refresh_enc, iv: g.refresh_iv });
    return t.access_token;
  } catch {
    await env.DB.prepare(`DELETE FROM mcp_grants WHERE email = ? AND resource = ?`).bind(email, resource).run();
    return null;
  }
}
export async function signedInTo(env: Env, email: string) {
  return new Set((await env.DB.prepare(`SELECT resource FROM mcp_grants WHERE email = ?`).bind(email).all<{ resource: string }>()).results.map((r) => r.resource));
}
export async function forget(env: Env, email: string, resource: string) {
  await env.DB.prepare(`DELETE FROM mcp_grants WHERE email = ? AND resource = ?`).bind(email, resource).run();
}
