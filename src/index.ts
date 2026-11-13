import { authApi, uploadsApi, type ApiServices, type AuthServices } from "./api";
import { CROSS_SITE, UNAUTHENTICATED } from "../shared/schemas";
import { services } from "./services";
import { uiNavigationUrl, uiShellPath, uiVariant, type UiVariant } from "../shared/uiVariant";
import "server-only";
import { type Context, Hono } from "hono";
import { cookieLang, reqLang } from "./lang";
import type { OAuthHelpers } from "@cloudflare/workers-oauth-provider";
import { ensureAgent, markDelivered, unreadRooms } from "./agent";
import { accessPage, filePage, roomAccess, roomMeta } from "./access";
import { auth, authServices, EMAIL_RE, identify } from "./auth";
import type { Book } from "./book";
import { connect, providerFor } from "./connect";
import { handleMcp, isAdminMcp } from "./mcp";
import { routeMessage } from "./route-home";
import { startRoom } from "./start-room";
import { growthReport, productReport } from "./reports";
import { mountConnections, retireTokens } from "./mcpconn";
import { validUnsub } from "./mentionmail";
import { sendDigests } from "./digest";

import { jwks } from "./mcpauth";
import { befriend, bookStub, createBook, setRoomIcon, docRoomName, docRoomStub, FILE_TYPES, fileHeaders, inviteMember, isMember, maxBytes, searchRooms, sizeError, TYPES_ERROR, storeFile, waitsFor } from "./rooms";
import { requestContext, track } from "./track";
import { pushTo } from "./webpush";
export { Book } from "./book";
export { Person } from "./person";
import { markListening, poke, pokeRoom } from "./person";
export { DocRoom } from "./docroom";

export type Env = {
  DB: D1Database;
  /** Web Push (VAPID, base64url): public = 65-byte P-256 point, private = 32-byte scalar. Missing: no native notifications. */
  VAPID_PUBLIC_KEY?: string;
  VAPID_PRIVATE_KEY?: string;
  ASSETS: Fetcher;
  /** The landing as a deco Studio site (site/, Worker vibebook-site). Missing or failing: the static page in public/. */
  SITE?: Fetcher;
  BOOK: DurableObjectNamespace<Book>;
  /** The app's push channel per person (src/person.ts). */
  PEOPLE: DurableObjectNamespace;
  DOC_ROOMS: DurableObjectNamespace<import("./docroom").DocRoom>;
  OAUTH_KV: KVNamespace;
  OAUTH_PROVIDER: OAuthHelpers;
  AGENT_LIMIT: RateLimit;
  EMAIL: SendEmail;
  AI_LIMIT: RateLimit;
  UPLOAD_LIMIT: RateLimit;
  FILES: R2Bucket;
  LOGIN_LIMIT: RateLimit;
  OPENROUTER_API_KEY: string;
  SESSION_SECRET: string;
  PUBLIC_ORIGIN?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  MODEL_ROUTE: string;
  // Daily reports (src/reports.ts): rooms to post in, and the read-only Cloudflare analytics token (secret).
  METRICS_ROOMS?: string;
  /** The room every report_issue is posted in (vibebook-product). */
  ISSUES_ROOM?: string;
  AGENT_STREAK_OFF?: string;
  FREESTYLE_API?: string; // local dev only: a mock of api.freestyle.sh
  CF_ACCOUNT_ID?: string;
  CF_ANALYTICS_TOKEN?: string;
  MODEL_FAST: string;
  MODEL_CLASSIFY: string;
  /** Jev decision model for @vibe's grading (src/jev.ts); "off" disables it. */
  MODEL_JUDGE?: string;
  DEV_EMAIL?: string;
  MCP_AUTH_TOKEN?: string;
};

type Ctx = { Bindings: Env; Variables: { email: string; svc: ApiServices; auth: AuthServices } };

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, created_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS books (id TEXT PRIMARY KEY, title TEXT, folder TEXT, summary TEXT, owner TEXT, created_at INTEGER, updated_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS members (book_id TEXT, email TEXT, PRIMARY KEY (book_id, email))`,
  `CREATE TABLE IF NOT EXISTS friends (a TEXT, b TEXT, created_at INTEGER, PRIMARY KEY (a, b))`,
  `CREATE TABLE IF NOT EXISTS login_codes (email TEXT PRIMARY KEY, hash TEXT, expires_at INTEGER, attempts INTEGER)`,
  `CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, name TEXT NOT NULL, path TEXT, visitor TEXT, country TEXT, user TEXT, dims TEXT, ts INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS events_ts ON events (ts)`,
  `CREATE INDEX IF NOT EXISTS events_name_ts ON events (name, ts)`,
  `CREATE INDEX IF NOT EXISTS events_user_ts ON events (user, ts)`,
  // What each person's agent already read in each room (the agent inbox counts from here).
  `CREATE TABLE IF NOT EXISTS agent_cursors (email TEXT, book_id TEXT, last_id INTEGER, PRIMARY KEY (email, book_id))`,
  // Per-person key for /api/notify (push to the agent's client: "room X has news", no content).
  `CREATE TABLE IF NOT EXISTS notify_keys (email TEXT PRIMARY KEY, key TEXT UNIQUE, created_at INTEGER)`,
  // One row per connected agent (an MCP session of someone's Claude), with its own cursor per room and notify key.
  `CREATE TABLE IF NOT EXISTS agents (id TEXT PRIMARY KEY, email TEXT, client TEXT, model TEXT, created_at INTEGER, seen_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS grant_seen (gid TEXT PRIMARY KEY, ts INTEGER)`,
  // The hub's router (src/router.ts): one decision per message and person, for the A/B and its room app.
  `CREATE TABLE IF NOT EXISTS router_log (book_id TEXT, msg_id INTEGER, email TEXT, arm TEXT, decision TEXT, why TEXT, source TEXT, reply_id INTEGER, ms INTEGER, cost REAL, text TEXT, ts INTEGER, PRIMARY KEY (book_id, msg_id, email))`,
  `CREATE INDEX IF NOT EXISTS router_log_email ON router_log (email, ts)`,
  `CREATE TABLE IF NOT EXISTS agent_reads (agent TEXT, book_id TEXT, email TEXT, last_id INTEGER, delivered_id INTEGER, PRIMARY KEY (agent, book_id))`,
  `CREATE INDEX IF NOT EXISTS agent_reads_email ON agent_reads (email, book_id)`,
  `CREATE TABLE IF NOT EXISTS notify_agents (key TEXT PRIMARY KEY, email TEXT, agent TEXT, created_at INTEGER)`,
  // What each person has seen in each room in the app (the switcher's unread dots).
  // One-time upload links for agents: the file goes from disk (curl) to R2 without passing through the model.
  `CREATE TABLE IF NOT EXISTS invite_used (sig TEXT PRIMARY KEY, ts INTEGER)`,
  `CREATE TABLE IF NOT EXISTS upload_links (token TEXT PRIMARY KEY, email TEXT, agent TEXT, book_id TEXT, filename TEXT, type TEXT, message TEXT, thread TEXT, model TEXT, expires_at INTEGER, used INTEGER DEFAULT 0)`,
  // "Esperando você": what someone is waiting on a person for. ref = m<message id> (Jev read the message as an ask
  // to them; deleted when Jev reads their later post in that thread as the answer, or they tick it) or t<task id>
  // (a task of theirs in review, rewritten by the room's epicsChanged).
  `CREATE TABLE IF NOT EXISTS waits (book_id TEXT, ref TEXT, email TEXT, thread TEXT, topic TEXT, author TEXT, text TEXT, ts INTEGER, PRIMARY KEY (book_id, ref, email))`,
  `CREATE INDEX IF NOT EXISTS waits_email ON waits (email, ts)`,
  // Mentions that didn't need the person right away (src/digest.ts): held for the 8h/18h catch-up e-mail.
  `CREATE TABLE IF NOT EXISTS digest_items (email TEXT, book_id TEXT, msg_id INTEGER, thread TEXT, author TEXT, text TEXT, ts INTEGER, PRIMARY KEY (email, book_id, msg_id))`,
  // members' PK is (book_id, email): "my rooms" (/api/me, unreadRooms every 3s per listener) needs email first.
  `CREATE INDEX IF NOT EXISTS members_email ON members (email)`,
  `CREATE INDEX IF NOT EXISTS agents_email ON agents (email)`,
  // Someone opened a room link without access and asked to join (/b/<id> → "Pedir acesso"). A member approves (=
  // invite) or declines (denied = 1, kept so the same person can't keep asking).
  `CREATE TABLE IF NOT EXISTS access_requests (book_id TEXT, email TEXT, ts INTEGER, denied INTEGER DEFAULT 0, PRIMARY KEY (book_id, email))`,
  `CREATE TABLE IF NOT EXISTS human_reads (email TEXT, book_id TEXT, last_id INTEGER, PRIMARY KEY (email, book_id))`,
  // Cloud agents (src/sandbox.ts): a person's freestyle.sh API key, AES-GCM encrypted, and their sandboxes per room.
  `CREATE TABLE IF NOT EXISTS freestyle_keys (email TEXT PRIMARY KEY, enc TEXT, iv TEXT, at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS claude_tokens (email TEXT PRIMARY KEY, enc TEXT, iv TEXT, at INTEGER)`,
  // MCP connections (src/mcpconn.ts): a remote MCP server linked to a room, its token AES-GCM encrypted; scope room = every member uses it, me = only its owner.
  `CREATE TABLE IF NOT EXISTS mcp_connections (id TEXT PRIMARY KEY, book_id TEXT, owner TEXT, scope TEXT, url TEXT, title TEXT, enc TEXT, iv TEXT, tools TEXT, ctx TEXT, created_at INTEGER)`,
  `CREATE INDEX IF NOT EXISTS mcp_conn_book ON mcp_connections (book_id)`,
  // A write someone else asked to make with a room connection's token: waits for its owner (Aprovar/Negar in the Apps tab).
  `CREATE TABLE IF NOT EXISTS mcp_pending (id TEXT PRIMARY KEY, book_id TEXT, conn_id TEXT, owner TEXT, requester TEXT, via TEXT, tool TEXT, args TEXT, status TEXT, result TEXT, created_at INTEGER)`,
  `CREATE INDEX IF NOT EXISTS mcp_pending_conn ON mcp_pending (conn_id, status)`,
  // Sign-in per person on a connection's server (src/mcpauth.ts): the OAuth client vibebook registered there (DCR),
  // the PKCE flows in progress (10 min) and each person's grant (identifies them on that server; sealed).
  `CREATE TABLE IF NOT EXISTS mcp_oauth_clients (issuer TEXT, redirect TEXT, client_id TEXT, secret_enc TEXT, secret_iv TEXT, token_endpoint TEXT, at INTEGER, PRIMARY KEY (issuer, redirect))`,
  `CREATE TABLE IF NOT EXISTS mcp_oauth_states (state TEXT PRIMARY KEY, email TEXT, book_id TEXT, conn_id TEXT, resource TEXT, issuer TEXT, verifier TEXT, back TEXT, expires_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS mcp_grants (email TEXT, resource TEXT, issuer TEXT, access_enc TEXT, access_iv TEXT, refresh_enc TEXT, refresh_iv TEXT, expires_at INTEGER, at INTEGER, PRIMARY KEY (email, resource))`,
  `CREATE TABLE IF NOT EXISTS sandboxes (id TEXT PRIMARY KEY, email TEXT, book_id TEXT, name TEXT, vm_id TEXT, identity_id TEXT, ready INTEGER DEFAULT 0, created_at INTEGER)`,
  `CREATE INDEX IF NOT EXISTS sandboxes_book ON sandboxes (book_id)`,
  `CREATE TABLE IF NOT EXISTS push_subs (endpoint TEXT PRIMARY KEY, email TEXT, p256dh TEXT, auth TEXT, ua TEXT, created_at INTEGER)`,
  `CREATE INDEX IF NOT EXISTS push_subs_email ON push_subs (email)`,
];
let schemaReady: Promise<unknown> | undefined;
// Columns added after launch; ALTER fails harmlessly once they exist.
const ALTERS = [`ALTER TABLE sandboxes ADD COLUMN state TEXT`, `ALTER TABLE sandboxes ADD COLUMN run_s INTEGER`, `ALTER TABLE sandboxes ADD COLUMN rate REAL`, `ALTER TABLE sandboxes ADD COLUMN disk_rate REAL`, `ALTER TABLE sandboxes ADD COLUMN checked_at INTEGER`, `ALTER TABLE users ADD COLUMN name TEXT`, `ALTER TABLE books ADD COLUMN last_msg_id INTEGER`, `ALTER TABLE members ADD COLUMN archived_at INTEGER`, `ALTER TABLE books ADD COLUMN epics TEXT`, `ALTER TABLE books ADD COLUMN last_human_id INTEGER`, `ALTER TABLE books ADD COLUMN last_agent_id INTEGER`, `ALTER TABLE agents ADD COLUMN listening_at INTEGER`, `ALTER TABLE agents ADD COLUMN listen_room TEXT`, `ALTER TABLE agents ADD COLUMN repo TEXT`, `ALTER TABLE agent_reads ADD COLUMN seen_at INTEGER`, `ALTER TABLE users ADD COLUMN avatar INTEGER`, `ALTER TABLE users ADD COLUMN mention_mail INTEGER`, `ALTER TABLE members ADD COLUMN claude_on INTEGER`, `ALTER TABLE members ADD COLUMN position INTEGER`, `ALTER TABLE members ADD COLUMN tint TEXT`, `ALTER TABLE books ADD COLUMN icon INTEGER`, `ALTER TABLE books ADD COLUMN busy_until INTEGER`, `ALTER TABLE members ADD COLUMN opened_at INTEGER`, `ALTER TABLE users ADD COLUMN lang TEXT`, `ALTER TABLE agents ADD COLUMN ctx_tokens INTEGER`, `ALTER TABLE agents ADD COLUMN ctx_window INTEGER`, `ALTER TABLE agents ADD COLUMN ctx_at INTEGER`, `ALTER TABLE agents ADD COLUMN ctx_limits TEXT`, `ALTER TABLE users ADD COLUMN session_after INTEGER`, `ALTER TABLE users ADD COLUMN router INTEGER`];
// Only when the schema text changed since the last run (a cold isolate used to send ~60 DDL writes to the primary).
const schemaKey = (alters: string[]) => { let h = 0; for (const ch of [...SCHEMA, ...alters].join(";")) h = (Math.imul(h, 31) + ch.charCodeAt(0)) | 0; return String(h); };
export const ensureSchema = (db: D1Database) =>
  (schemaReady ??= db.prepare(`SELECT v FROM schema_v WHERE k = 'main'`).first<{ v: string }>().catch(() => null).then((row) => row?.v === schemaKey(ALTERS) ? undefined : migrate(db)));
const migrate = (db: D1Database) =>
  db.batch(SCHEMA.map((s) => db.prepare(s))).then(() =>
    Promise.all(ALTERS.map((q) => db.prepare(q).run().catch(() => {}))),
  ).then(() => db.batch([db.prepare(`CREATE TABLE IF NOT EXISTS schema_v (k TEXT PRIMARY KEY, v TEXT)`), db.prepare(`INSERT OR REPLACE INTO schema_v (k, v) VALUES ('main', ?)`).bind(schemaKey(ALTERS))]));


const app = new Hono<Ctx>();
// A request to the Studio site without our cookies (the session never leaves this Worker) and without its set-cookies
// back. Authorization stays: it's Studio's own token for the site's admin endpoints.
async function toSite(site: Fetcher, req: Request) {
  const fwd = new Request(req);
  fwd.headers.delete("cookie");
  const res = await site.fetch(fwd);
  const out = new Response(res.body, res);
  out.headers.delete("set-cookie");
  return out;
}
const knownUsers = new Set<string>();

let tokensRetired: Promise<unknown> | undefined; // once per isolate: old pasted MCP tokens are dropped (retireTokens)
app.use("*", async (c, next) => {
  await ensureSchema(c.env.DB);
  c.executionCtx.waitUntil((tokensRetired ??= retireTokens(c.env).catch((e) => { tokensRetired = undefined; console.error("retireTokens", String(e)); })));
  await next();
});

// Cross-site guard + anti-framing, before any route.
// - A state-changing request (or a WebSocket upgrade) whose Origin is another site, or that the browser marks
//   cross-site, is refused: the session cookie is SameSite=Lax already, this is the second lock (also for /ws, /yjs).
// - Pages that act with your session (the app, login, OAuth consent, mail links) can't be framed by anyone,
//   so no site can overlay an invisible "Permitir" on the consent page (clickjacking).
// The Studio site's paths never see the session cookie (toSite), so Studio's own origin may call them.
const CROSS_OK = /^\/(deco|_serverFn|_site)\//;
const NO_FRAME = /^\/(app|archived|login|b\/|authorize|auth\/|mail\/)/;
app.use("*", async (c, next) => {
  const url = new URL(c.req.url);
  const origin = c.req.header("origin");
  const writes = !["GET", "HEAD", "OPTIONS"].includes(c.req.method) || c.req.header("upgrade")?.toLowerCase() === "websocket";
  if (writes && !CROSS_OK.test(url.pathname) && ((origin && origin !== url.origin) || c.req.header("sec-fetch-site") === "cross-site"))
    return c.json(CROSS_SITE, 403);
  await next();
  if (NO_FRAME.test(url.pathname) && c.res.status !== 101) {
    c.res = new Response(c.res.body, c.res);
    c.res.headers.set("x-frame-options", "DENY");
    c.res.headers.set("content-security-policy", "frame-ancestors 'none'");
  }
});

app.use("/auth/*", async (c, next) => { c.set("auth", authServices(c, { roomAccess: async (id) => roomAccess(c.env.DB, id, await identify(c)) })); await next(); });
app.route("/", authApi);
app.route("/auth", auth);
app.route("/", connect);

// Page views are counted server-side (no client script, no cookie), off the response path.
const pageview = async (c: Context<Ctx>, res: Response, user?: string | null) => {
  if (c.req.raw.method === "GET")
    c.executionCtx.waitUntil(requestContext(c.env, c.req.raw, res).then((ctx) => track(c.env, "pageview", { ...ctx, user })));
  return res;
};

// App shell: /login is public; /app and /b/* bounce to /login without a session.
// Passes the browser's If-None-Match along, so the app shell can come back as a 304.
// The page carries its own version (the asset's etag) in <meta name="vb-v">, and /api/me says the current one: the
// app shows "Nova versão" when they differ (an installed PWA keeps an old page around for days).
const shell = async (c: { env: Env; req: { url: string; raw: Request } }) => {
  const asset = await c.env.ASSETS.fetch(new Request(new URL(uiShellPath(c.req.url), c.req.url), c.req.raw));
  const res = new Response(asset.body, asset);
  res.headers.set("x-vibebook-ui", uiVariant(c.req.url));
  const v = res.headers.get("etag");
  return res.status === 200 && v ? new HTMLRewriter().on("head", { element: (el) => { el.append(`<meta name="vb-v" content="${v.replace(/[^\w-]/g, "")}" />`, { html: true }); } }).transform(res) : res;
};
// Landing and demo live at /pt and /en. "/" and "/demo" pick one: cookie first, then the browser's main
// language (pt unless it starts with "en"). Opening /pt or /en remembers the choice.
const LANG_COOKIE = "vb_lang";
const pickLang = reqLang;
for (const path of ["", "/demo", "/docs", "/changelog", "/connect", "/how-it-works", "/herdr", "/agents"]) {
  app.get(path || "/", (c) => {
    const url = new URL(c.req.url);
    const res = c.redirect(`/${pickLang(c.req.raw)}${path}${url.search}`, 302);
    res.headers.set("vary", "Accept-Language, Cookie");
    return res;
  });
  for (const lang of ["pt", "en"])
    app.get(`/${lang}${path}`, async (c) => {
      // Every page here is static (public/pt.html, public/en.html, public/<lang>/*.html). The Studio site (site/,
      // binding SITE) no longer serves the home since the Nov 2026 landing; its /_site, /deco routes stay below.
      // The home comes from the Studio-editable site (site/); if it's down, the static copy in public/ answers.
      const fromSite = !path && c.env.SITE ? await toSite(c.env.SITE, c.req.raw).catch(() => null) : null;
      const asset = fromSite && fromSite.status < 500 ? fromSite : await c.env.ASSETS.fetch(c.req.raw);
      const res = new Response(asset.body, asset);
      res.headers.append("set-cookie", `${LANG_COOKIE}=${lang}; Max-Age=31536000; Path=/; SameSite=Lax`);
      return pageview(c, res);
    });
}
// The site's files (/_site) and Studio's endpoints (/deco/meta, /deco/render, /deco/invoke, /_serverFn). Safe on this
// origin because (Nov 2026 review): the site never gets the session cookie (toSite strips it), its sections render
// props only as text, and Studio's preview (/deco/render, props from the URL) answers in a CSP sandbox: an opaque
// origin that can't read vibebook.dev's cookies or call its APIs even if a prop got through.
for (const prefix of ["/_site/*", "/deco/*", "/_serverFn/*"])
  app.all(prefix, async (c) => {
    if (!c.env.SITE) return c.notFound();
    const res = await toSite(c.env.SITE, c.req.raw);
    if (c.req.path.startsWith("/_site/")) res.headers.set("access-control-allow-origin", "*"); // the sandboxed preview loads them cross-origin
    // Every response, not just text/html: an SVG or XHTML from these paths would otherwise run on vibebook.dev.
    res.headers.set("content-security-policy", "sandbox allow-scripts allow-forms allow-popups allow-modals");
    res.headers.set("x-content-type-options", "nosniff");
    return res;
  });
// Already signed in: /login goes straight to the app (or to ?next=, which the client keeps safe).
app.get("/login", async (c) => ((await identify(c)) && !c.req.query("next") ? c.redirect(uiNavigationUrl("/app", c.req.url, uiVariant(c.req.url))) : pageview(c, await shell(c))));
app.get("/app", async (c) => {
  const email = await identify(c);
  return email ? pageview(c, await shell(c), email) : c.redirect(uiNavigationUrl("/login", c.req.url, uiVariant(c.req.url)));
});
app.get("/archived", async (c) => {
  const email = await identify(c);
  const next = uiNavigationUrl("/archived", c.req.url, uiVariant(c.req.url));
  return email ? pageview(c, await shell(c), email) : c.redirect(uiNavigationUrl(`/login?next=${encodeURIComponent(next)}`, c.req.url, uiVariant(c.req.url)));
});
// A room link: members get the app; anyone else (and link-preview bots) a page with the room's name and "Pedir
// acesso". The title is readable by whoever holds the link, on purpose: that's what makes the shared card useful.
app.get("/b/*", async (c) => {
  const email = await identify(c);
  const url = new URL(c.req.url);
  const id = url.pathname.match(/^\/b\/([a-z0-9]{6,40})/)?.[1] ?? "";
  const { state, title } = await roomAccess(c.env.DB, id, email ?? null);
  if (state === "member")
    return pageview(c, new HTMLRewriter().on("title", { element: (el) => { el.replace(roomMeta(url.origin, id, title ?? ""), { html: true }); } }).transform(await shell(c)), email ?? undefined);
  const res = c.html(accessPage({ origin: url.origin, id, title, state, email: email ?? undefined, auto: url.searchParams.has("pedir") && (c.req.header("referer") ?? "").startsWith(`${url.origin}/`) /* only when our own login sent them here: a bare link must not ask (and tell the room who clicked) by itself */, lang: reqLang(c.req.raw), ui: uiVariant(url) }), state === "missing" ? 404 : 200);
  res.headers.set("x-frame-options", "DENY");
  res.headers.set("content-security-policy", "frame-ancestors 'none'");
  return pageview(c, res, email ?? undefined);
});

// Agent file upload by link (MCP upload_link): PUT the raw bytes once, within 10 minutes. The token is the gate.
app.put("/api/upload/:token", async (c) => {
  const db = c.env.DB;
  const link = await db
    .prepare(`UPDATE upload_links SET used = 1 WHERE token = ? AND used = 0 AND expires_at > ? RETURNING *`)
    .bind(c.req.param("token"), Date.now())
    .first<{ email: string; agent: string; book_id: string; filename: string; type: string; message: string; thread: string; model: string }>();
  if (!link) return c.json({ ok: false, error: "link unknown, used or expired: call upload_link again" }, 404);
  if (!(await isMember(db, link.book_id, link.email))) return c.json({ ok: false, error: "not a member" }, 403);
  if (!(await c.env.UPLOAD_LIMIT.limit({ key: link.email })).success) return c.json({ ok: false, error: "rate limited" }, 429);
  const body = await c.req.arrayBuffer();
  try {
    const meta = await storeFile(c.env, link.book_id, link.email, link.type, body, link.filename);
    c.executionCtx.waitUntil(track(c.env, "file_uploaded", { user: link.email, dims: { book: link.book_id, type: link.type, size: meta.size, agent: true } }));
    const posted = await bookStub(c.env, link.book_id).agentPost(link.book_id, link.email, link.message, link.thread || "main", [meta.id], link.model);
    if (posted.ok && posted.id)
      await db.prepare(`UPDATE agent_reads SET last_id = ? WHERE agent = ? AND book_id = ? AND last_id >= ?`).bind(posted.id, link.agent, link.book_id, posted.id - 1).run();
    return c.json({ ok: !!posted.ok, file: { name: meta.name, size: meta.size, url: `${new URL(c.req.url).origin}/api/books/${link.book_id}/files/${meta.id}` }, message_id: posted.id, error: posted.ok ? undefined : posted.error });
  } catch (e) {
    return c.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, 400);
  }
});

// Agent push (Claude Code Monitor): long-polls up to 50s, prints one line per room with unread messages.
// Key-in-URL because a shell loop has no OAuth token; it reveals only room titles and counts.
app.get("/api/notify", async (c) => {
  const key = c.req.query("k") ?? "";
  let row = key.length === 64 ? await c.env.DB.prepare(`SELECT n.email, n.agent, a.client FROM notify_agents n LEFT JOIN agents a ON a.id = n.agent WHERE n.key = ?`).bind(key).first<{ email: string; agent: string; client: string | null }>() : null;
  if (!row && key.length === 64) {
    // URLs from before per-agent cursors (one per person) keep working as their own agent.
    const old = await c.env.DB.prepare(`SELECT email FROM notify_keys WHERE key = ?`).bind(key).first<{ email: string }>();
    if (old) {
      row = { email: old.email, agent: `n_${key.slice(0, 16)}`, client: "notify" };
      await ensureAgent(c.env.DB, row.agent, old.email, "notify");
    }
  }
  if (!row) return c.text("unknown key: call notify_url again\n", 404);
  if (!(await c.env.AGENT_LIMIT.limit({ key: `notify:${row.email}` })).success) return c.text("rate limited\n", 429);
  const since = Number(c.req.query("since")) || 0;
  // &room=<id>: only that room (a repo linked to one room listens to it alone). Membership is in the query.
  const onlyRoom = /^[a-z0-9]{6,32}$/.test(c.req.query("room") ?? "") ? (c.req.query("room") as string) : "";
  const origin = new URL(c.req.url).origin;
  // Presence: this agent is listening (to one room, or to all of its person's rooms when listen_room is null).
  c.executionCtx.waitUntil(markListening(c.env, row.agent, row.email, onlyRoom, true));
  const deadline = Date.now() + 50_000;
  for (;;) {
    // ponytail: D1 every 3s per listener, same as wait_for_messages; a per-person DO with push is the upgrade.
    const r = await unreadRooms(c.env.DB, row.email, row.agent, onlyRoom, since);
    if (r.results.length) {
      c.executionCtx.waitUntil(markDelivered(c.env, { email: row.email, client: row.client ?? "", agent: row.agent }, r.results));
      // Titles are written by room members: one line, no quotes, so they can't pose as more output.
      return c.text(r.results.map((b) => `vibebook: ${b.n} nova(s) em "${safeTitle(b.title)}" room_id=${b.id} ${origin}/b/${b.id}`).join("\n") + "\n");
    }
    if (Date.now() + 3000 > deadline) return c.body(null, 204);
    await new Promise((res) => setTimeout(res, 3000));
  }
});

const safeTitle = (t: string) => (t ?? "").replace(/[\p{Cc}"`]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 60);

// Mention emails: the signed link in the footer turns them off (or back on) without signing in.
app.get("/mail/:onoff{off|on}", async (c) => {
  const email = (c.req.query("e") ?? "").toLowerCase(), on = c.req.param("onoff") === "on";
  if (!email || !(await validUnsub(c.env.SESSION_SECRET, email, c.req.query("s") ?? ""))) return c.text("Link inválido.", 400);
  await c.env.DB.prepare(`UPDATE users SET mention_mail = ? WHERE email = ?`).bind(on ? 1 : 0, email).run();
  c.executionCtx.waitUntil(track(c.env, on ? "mention_mail_on" : "mention_mail_off", { user: email }));
  const back = `/mail/${on ? "off" : "on"}?e=${encodeURIComponent(email)}&s=${encodeURIComponent(c.req.query("s") ?? "")}`;
  return c.html(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>vibebook</title><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:460px;margin:60px auto;padding:0 20px;color:#1a2130"><h1 style="font-size:22px">${on ? "Emails de menção ligados." : "Pronto, sem emails de menção."}</h1><p>${on ? "Quando alguém te mencionar e você não vir em 5 minutos, chega um email." : "Você continua vendo as menções no vibebook."}</p><p><a href="${back}">${on ? "Desligar de novo" : "Mudei de ideia, quero os emails"}</a> · <a href="/app">Abrir o vibebook</a></p></body>`);
});

// `vibebook login --paste` (a cloud sandbox, an SSH box): the consent page lands here and shows the code to paste
// into that terminal. Public: the code alone is useless without the CLI's PKCE verifier.
app.get("/oauth/code", (c) => {
  const code = (c.req.query("code") ?? "").slice(0, 500);
  const esc = (x: string) => x.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
  return c.html(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>vibebook · código</title>
<body style="font:16px system-ui;padding:32px;max-width:560px;margin:auto;color-scheme:light dark">${code
    ? `<h2>Cole este código no terminal</h2><pre id="c" style="white-space:pre-wrap;word-break:break-all;padding:14px;border:1px solid #8884;border-radius:10px;font-size:15px">${esc(code)}</pre><button onclick="navigator.clipboard.writeText(document.getElementById('c').textContent).then(()=>this.textContent='Copiado ✓')" style="font:inherit;padding:10px 16px;border-radius:10px">Copiar</button>`
    : `<h2>Sem código</h2><p>${esc(c.req.query("error_description") ?? c.req.query("error") ?? "Volte ao terminal e rode vibebook login --paste de novo.")}</p>`}</body>`);
});

// A file link opened in a browser tab (not fetched by the app): the room id, so it gets a page instead of JSON.
const fileLink = (c: Context) =>
  c.req.method === "GET" && (c.req.header("accept") ?? "").includes("text/html") ? new URL(c.req.url).pathname.match(/^\/api\/books\/([^/]+)\/files\/[^/]+$/)?.[1] : undefined;

// The public half of the identity seal (src/mcpauth.ts): an MCP server checks X-Vibebook-Identity against it.
app.get("/.well-known/jwks.json", async (c) => c.json(await jwks(c.env), 200, { "cache-control": "public, max-age=3600" }));

app.use("*", async (c, next) => {
  const email = await identify(c);
  if (!email) {
    const file = fileLink(c);
    return file ? c.html(filePage({ id: file, path: new URL(c.req.url).pathname, signedIn: false, lang: reqLang(c.req.raw) }), 401) : c.json(UNAUTHENTICATED, 401);
  }
  // The users row once per isolate, off the request path: a D1 write here cost every request a round trip.
  if (!knownUsers.has(email)) {
    knownUsers.add(email);
    c.executionCtx.waitUntil(
      c.env.DB.prepare(`INSERT OR IGNORE INTO users (email, created_at) VALUES (?, ?)`).bind(email, Date.now()).run()
        .then((r) => (r.meta.changes ? track(c.env, "signup", { user: email }) : undefined))
        .catch(() => knownUsers.delete(email)),
    );
  }
  c.set("email", email);
  await next();
  if (c.req.method !== "GET" && c.req.path.startsWith("/api/") && c.res.status < 400) c.executionCtx.waitUntil(poke(c.env, [email], { t: "me" }));
});


// Local dev only: the daily reports' text, without waiting for the cron.
// Like identify: DEV_EMAIL counts on loopback alone, even if it ever reached production config.
const devOnly = (c: Context) => !c.env.DEV_EMAIL || !/^(127\.0\.0\.1|localhost)$/.test(new URL(c.req.url).hostname);
app.get("/api/dev/digest", async (c) => {
  if (devOnly(c)) return c.notFound();
  return c.json({ sent: await sendDigests(c.env, Date.now(), c.req.query("email") || undefined) });
});
app.get("/api/dev/report", async (c) => {
  if (devOnly(c)) return c.notFound();
  return c.text(c.req.query("which") === "product" ? await productReport(c.env) : await growthReport(c.env));
});
app.get("/api/dev/as", (c) => {
  if (devOnly(c)) return c.notFound();
  const email = c.req.query("email") ?? "";
  c.header("set-cookie", `dev_as=${encodeURIComponent(email)}; Path=/; SameSite=Lax`);
  return c.redirect("/");
});

// How you sign in (the profile): per method, the last login and how many, from your own login events (user, ts index).


// "✓ resolvido" on an item of "Esperando você" (only asks; a task in review leaves when its status changes).
// Native notifications: this device's push subscription (the app's 🔔). One row per endpoint, owned by whoever subscribed last.


// Versioned URLs (?v=) never change: after the access check, the edge cache (Cache API) answers instead of R2.
async function edgeCached(c: Context<Ctx>, load: () => Promise<Response | null>) {
  const url = new URL(c.req.url);
  if (!url.searchParams.get("v")) return (await load()) ?? c.notFound(); // unversioned: could change, not cached
  const key = new Request(url.toString());
  const hit = await caches.default.match(key);
  const res = hit ?? (await load());
  if (!res) return c.notFound();
  if (!hit) {
    const stored = new Response(res.clone().body, res);
    stored.headers.set("cache-control", "public, max-age=31536000, immutable");
    c.executionCtx.waitUntil(caches.default.put(key, stored));
  }
  const out = new Response(res.body, res);
  out.headers.set("cache-control", "private, max-age=31536000, immutable");
  return out;
}
app.get("/api/books/:id/icon", async (c) => {
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, c.get("email")))) return c.json({ error: "forbidden" }, 403);
  return edgeCached(c, async () => {
    const obj = await c.env.FILES.get(`icons/${id}`);
    return obj && new Response(obj.body, { headers: fileHeaders(obj.httpMetadata?.contentType ?? "image/png", "icon") });
  });
});

// Signed-in people only; the URL carries ?v=<version>, so it caches for good.
app.get("/api/avatar/:email", (c) =>
  edgeCached(c, async () => {
    const obj = await c.env.FILES.get(`avatars/${c.req.param("email").toLowerCase()}`);
    return obj && new Response(obj.body, { headers: fileHeaders(obj.httpMetadata?.contentType ?? "image/png", "avatar") });
  }),
);

// Archive is per person: the room leaves your list (and your agent's inbox) and lands in /archived.
// Everyone else keeps it; restoring brings it back. Nothing is deleted.

// The agents of this room's members: model/client, last seen, and whether they're listening to this room now.
// Search everything of yours (⌘K): messages, epics (archived too) and attached files across your rooms.
// GET /api/books/:id/agents is a typed route now (src/api.ts, slice 7).

// Home composer: suggest where a message should go, then post it there.

// Typed routes (src/api.ts): post and upload, mounted here so they run after the auth middleware like before.
// The typed routes get their services (src/services.ts) instead of the bindings.
app.use("/api/*", async (c, next) => { c.set("svc", services(c.env, c.executionCtx, c.get("email"), c.req.raw)); await next(); });
app.route("/", uploadsApi);

// "Meu Claude" toggle: the person wants a Claude of theirs on this room. `vibebook herdr` on their machine reads it
// (MCP claude_rooms) and opens or closes a Claude Code for the room in herdr.

// The person's own order of their rooms (dragged in the rail); vibebook herdr orders the herdr workspaces the same way.

// A room's color in the person's rail: neighbours with the same color read as one group.




// "Novo vibebook" in one step (src/start-room.ts): what it is and with whom → titled room, first message, invites,
// Claude on.

// Ask to join a room you opened by link. Silent when already asked or declined (no way to probe or spam).
// A member lets someone in (= the usual invite, which emails them the link) or declines (kept, so they can't re-ask).



// Unfriend: removes both directions (shared vibebooks are untouched).

// Cancel a pending invite (any member) or remove someone (owner only).

// Files: stored in R2 under <book>/<file>; types, limits and serving headers live in rooms.ts.

app.get("/api/books/:id/files/:fid", async (c) => {
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, c.get("email"))))
    return fileLink(c) ? c.html(filePage({ id, path: "", signedIn: true, lang: reqLang(c.req.raw) }), 403) : c.json({ error: "forbidden" }, 403);
  // Range: iOS Safari's <audio> plays only what answers 206 to a byte range (also lets any player seek).
  const ranged = !!c.req.header("range");
  const obj = await c.env.FILES.get(`${id}/${c.req.param("fid")}`, ranged ? { range: c.req.raw.headers } : undefined);
  if (!obj) return c.notFound();
  const headers = new Headers(fileHeaders(obj.httpMetadata?.contentType ?? "application/octet-stream", obj.customMetadata?.name ?? "arquivo"));
  headers.set("accept-ranges", "bytes");
  const r = obj.range as { offset?: number; length?: number; suffix?: number } | undefined;
  // In the app's viewer (?esc=1), an HTML file gets one listener that tells the viewer about Esc: focus inside the
  // sandboxed frame keeps the key from ever reaching the app, so the viewer couldn't close with it.
  if (!ranged && c.req.query("esc") === "1" && "body" in obj && (obj.httpMetadata?.contentType ?? "").startsWith("text/html")) {
    headers.delete("content-length");
    return new Response(`${await obj.text()}\n<script>addEventListener("keydown",function(e){if(e.key==="Escape")parent.postMessage({vbViewer:"esc"},"*")},true)</script>`, { headers });
  }
  if (!ranged || !r || !("body" in obj)) return new Response("body" in obj ? obj.body : null, { headers });
  const start = r.suffix !== undefined ? Math.max(0, obj.size - r.suffix) : (r.offset ?? 0);
  const len = r.suffix !== undefined ? obj.size - start : (r.length ?? obj.size - start);
  headers.set("content-range", `bytes ${start}-${start + len - 1}/${obj.size}`);
  headers.set("content-length", String(len));
  return new Response(obj.body, { status: 206, headers });
});

// Co-editing a doc (y-websocket): /yjs/<room> or /yjs/<room>~<epic>. Same session cookie as /ws, members only.
app.get("/yjs/:name", async (c) => {
  const [id, epic = ""] = c.req.param("name").split("~");
  if (c.req.header("upgrade")?.toLowerCase() !== "websocket") return c.text("expected websocket", 426);
  if (!(await isMember(c.env.DB, id, c.get("email")))) return c.json({ error: "forbidden" }, 403);
  const seed = await bookStub(c.env, id).docSeed(id, epic || undefined);
  if (seed === null) return c.json({ error: "unknown epic" }, 404);
  const room = docRoomStub(c.env, id, epic || undefined);
  await room.prepare(id, epic, seed);
  return room.fetch(new Request(`https://doc/rooms/${encodeURIComponent(docRoomName(id, epic || undefined))}`, c.req.raw));
});

// The app's own channel (one per person): "something you see changed, fetch it once" instead of polling.
app.get("/ws-me", async (c) => {
  if (c.req.header("upgrade") !== "websocket") return c.text("expected websocket", 426);
  return c.env.PEOPLE.get(c.env.PEOPLE.idFromName(c.get("email"))).fetch(c.req.raw);
});
app.get("/ws/:id", async (c) => {
  const id = c.req.param("id");
  if (c.req.header("upgrade") !== "websocket") return c.text("expected websocket", 426);
  if (!(await isMember(c.env.DB, id, c.get("email")))) return c.json({ error: "forbidden" }, 403);
  // When you last opened the room: the phone home lists rooms by it.
  // When you last opened the room (the phone home's order) and what you've read: your cached /api/me is stale now.
  c.executionCtx.waitUntil(c.env.DB.prepare(`UPDATE members SET opened_at = ? WHERE book_id = ? AND email = ?`).bind(Date.now(), id, c.get("email")).run().then(() => poke(c.env, [c.get("email")], { t: "me" })));
  // t = the thread the app opens on: only it comes with its 60 newest messages and its doc (Book.roomWindow).
  const rc = (c.req.query("rc") ?? "").replace(/\D/g, "").slice(0, 4); // a reconnect's previous close code (ws_state)
  const req = new Request(`https://book/ws?book=${id}&t=${encodeURIComponent(c.req.query("t") ?? "main")}${rc ? `&rc=${rc}` : ""}`, c.req.raw);
  req.headers.set("x-email", c.get("email"));
  return bookStub(c.env, id).fetch(req);
});

// /mcp serves two things: the admin MCP (static bearer MCP_AUTH_TOKEN) and the agents' MCP behind OAuth.
// Everything else (app, /authorize, /oauth/*, discovery) goes through the OAuth provider to the Hono app.
// Cloud agents (freestyle.sh sandboxes): src/sandbox.ts. agents/<name>.md is the sandbox's CLAUDE.md, kept in the
// room's files so people (and their Claudes) edit it there; created with a template the first time.
mountConnections(app, { isMember, track });

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    // Plain http (scanners, mostly) made the OAuth provider throw (its resource URL must be https): every Worker
    // exception in Nov 2026 was one of these. Send them to https, and drop "//..." paths (no route starts that way).
    if (url.protocol === "http:" && !/^(127\.0\.0\.1|localhost|\[::1\])$/.test(url.hostname)) {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname.startsWith("//")) return new Response("not found", { status: 404 });
    if (url.pathname === "/mcp" && isAdminMcp(request, env)) return handleMcp(request, env);
    return providerFor(url.origin, app as unknown as ExportedHandler<Env>).fetch(request, env, ctx);
  },
  // 11:00 and 21:00 UTC = 8h and 18h in São Paulo: the catch-up e-mail.
  scheduled(_event: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(ensureSchema(env.DB).then(() => sendDigests(env)).catch((e) => console.error("digest", String(e))));
  },
} satisfies ExportedHandler<Env>;
