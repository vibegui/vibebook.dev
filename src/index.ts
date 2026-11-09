import { type Context, Hono } from "hono";
import { cookieLang, reqLang } from "./lang";
import type { OAuthHelpers } from "@cloudflare/workers-oauth-provider";
import { ensureAgent, markDelivered, unreadRooms } from "./agent";
import { accessPage, filePage, roomMeta } from "./access";
import { auth, EMAIL_RE, identify } from "./auth";
import type { Book } from "./book";
import { connect, providerFor } from "./connect";
import { handleMcp, isAdminMcp } from "./mcp";
import { routeMessage } from "./route-home";
import { startRoom } from "./start-room";
import { growthReport, productReport } from "./reports";
import { mountSandbox } from "./sandbox";
import { validUnsub } from "./mentionmail";
import { sendDigests } from "./digest";
import { renderApp, withBridge } from "./embed";
import { befriend, bookStub, createBook, setRoomIcon, docRoomName, docRoomStub, FILE_TYPES, fileHeaders, inviteMember, isMember, MAX_FILE_BYTES, storeFile, waitsFor } from "./rooms";
import { requestContext, track } from "./track";
export { Book } from "./book";
export { Person } from "./person";
import { LISTEN_FRESH, markListening, poke, pokeRoom } from "./person";
export { DocRoom } from "./docroom";

export type Env = {
  DB: D1Database;
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

type Ctx = { Bindings: Env; Variables: { email: string } };

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
  `CREATE TABLE IF NOT EXISTS agent_reads (agent TEXT, book_id TEXT, email TEXT, last_id INTEGER, delivered_id INTEGER, PRIMARY KEY (agent, book_id))`,
  `CREATE INDEX IF NOT EXISTS agent_reads_email ON agent_reads (email, book_id)`,
  `CREATE TABLE IF NOT EXISTS notify_agents (key TEXT PRIMARY KEY, email TEXT, agent TEXT, created_at INTEGER)`,
  // What each person has seen in each room in the app (the switcher's unread dots).
  // One-time upload links for agents: the file goes from disk (curl) to R2 without passing through the model.
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
  `CREATE INDEX IF NOT EXISTS sandboxes_book ON sandboxes (book_id)`,
  // Someone opened a room link without access and asked to join (/b/<id> → "Pedir acesso"). A member approves (=
  // invite) or declines (denied = 1, kept so the same person can't keep asking).
  `CREATE TABLE IF NOT EXISTS access_requests (book_id TEXT, email TEXT, ts INTEGER, denied INTEGER DEFAULT 0, PRIMARY KEY (book_id, email))`,
  `CREATE TABLE IF NOT EXISTS human_reads (email TEXT, book_id TEXT, last_id INTEGER, PRIMARY KEY (email, book_id))`,
  // Cloud agents (src/sandbox.ts): a person's freestyle.sh API key, AES-GCM encrypted, and their sandboxes per room.
  `CREATE TABLE IF NOT EXISTS freestyle_keys (email TEXT PRIMARY KEY, enc TEXT, iv TEXT, at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS claude_tokens (email TEXT PRIMARY KEY, enc TEXT, iv TEXT, at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS sandboxes (id TEXT PRIMARY KEY, email TEXT, book_id TEXT, name TEXT, vm_id TEXT, identity_id TEXT, ready INTEGER DEFAULT 0, created_at INTEGER)`,
];
let schemaReady: Promise<unknown> | undefined;
// Columns added after launch; ALTER fails harmlessly once they exist.
const ALTERS = [`ALTER TABLE sandboxes ADD COLUMN state TEXT`, `ALTER TABLE sandboxes ADD COLUMN run_s INTEGER`, `ALTER TABLE sandboxes ADD COLUMN rate REAL`, `ALTER TABLE sandboxes ADD COLUMN disk_rate REAL`, `ALTER TABLE sandboxes ADD COLUMN checked_at INTEGER`, `ALTER TABLE users ADD COLUMN name TEXT`, `ALTER TABLE books ADD COLUMN last_msg_id INTEGER`, `ALTER TABLE members ADD COLUMN archived_at INTEGER`, `ALTER TABLE books ADD COLUMN epics TEXT`, `ALTER TABLE books ADD COLUMN last_human_id INTEGER`, `ALTER TABLE books ADD COLUMN last_agent_id INTEGER`, `ALTER TABLE agents ADD COLUMN listening_at INTEGER`, `ALTER TABLE agents ADD COLUMN listen_room TEXT`, `ALTER TABLE agents ADD COLUMN repo TEXT`, `ALTER TABLE agent_reads ADD COLUMN seen_at INTEGER`, `ALTER TABLE users ADD COLUMN avatar INTEGER`, `ALTER TABLE users ADD COLUMN mention_mail INTEGER`, `ALTER TABLE members ADD COLUMN claude_on INTEGER`, `ALTER TABLE members ADD COLUMN position INTEGER`, `ALTER TABLE members ADD COLUMN tint TEXT`, `ALTER TABLE books ADD COLUMN icon INTEGER`, `ALTER TABLE books ADD COLUMN busy_until INTEGER`, `ALTER TABLE members ADD COLUMN opened_at INTEGER`, `ALTER TABLE users ADD COLUMN lang TEXT`, `ALTER TABLE agents ADD COLUMN ctx_tokens INTEGER`, `ALTER TABLE agents ADD COLUMN ctx_window INTEGER`, `ALTER TABLE agents ADD COLUMN ctx_at INTEGER`, `ALTER TABLE agents ADD COLUMN ctx_limits TEXT`, `ALTER TABLE users ADD COLUMN session_after INTEGER`];
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

app.use("*", async (c, next) => {
  await ensureSchema(c.env.DB);
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
    return c.json({ error: "cross-site request refused" }, 403);
  await next();
  if (NO_FRAME.test(url.pathname) && c.res.status !== 101) {
    c.res = new Response(c.res.body, c.res);
    c.res.headers.set("x-frame-options", "DENY");
    c.res.headers.set("content-security-policy", "frame-ancestors 'none'");
  }
});

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
  const res = await c.env.ASSETS.fetch(new Request(new URL("/app", c.req.url), c.req.raw));
  const v = res.headers.get("etag");
  return res.status === 200 && v ? new HTMLRewriter().on("head", { element: (el) => { el.append(`<meta name="vb-v" content="${v.replace(/[^\w-]/g, "")}" />`, { html: true }); } }).transform(res) : res;
};
let appVersion: string | undefined; // per isolate = per deploy
const currentVersion = async (env: Env, url: string) =>
  (appVersion ??= ((await env.ASSETS.fetch(new Request(new URL("/app", url), { method: "HEAD" }))).headers.get("etag") ?? "").replace(/[^\w-]/g, ""));
// Landing and demo live at /pt and /en. "/" and "/demo" pick one: cookie first, then the browser's main
// language (pt unless it starts with "en"). Opening /pt or /en remembers the choice.
const LANG_COOKIE = "vb_lang";
const pickLang = reqLang;
for (const path of ["", "/demo", "/docs", "/connect", "/how-it-works", "/herdr", "/agents"]) {
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
    else if ((res.headers.get("content-type") ?? "").includes("text/html")) res.headers.set("content-security-policy", "sandbox allow-scripts allow-forms allow-popups allow-modals");
    return res;
  });
// Already signed in: /login goes straight to the app (or to ?next=, which the client keeps safe).
app.get("/login", async (c) => ((await identify(c)) && !c.req.query("next") ? c.redirect("/app") : pageview(c, await shell(c))));
app.get("/app", async (c) => {
  const email = await identify(c);
  return email ? pageview(c, await shell(c), email) : c.redirect("/login");
});
app.get("/archived", async (c) => {
  const email = await identify(c);
  return email ? pageview(c, await shell(c), email) : c.redirect("/login?next=%2Farchived");
});
// A room link: members get the app; anyone else (and link-preview bots) a page with the room's name and "Pedir
// acesso". The title is readable by whoever holds the link, on purpose: that's what makes the shared card useful.
app.get("/b/*", async (c) => {
  const email = await identify(c);
  const url = new URL(c.req.url);
  const id = url.pathname.match(/^\/b\/([a-z0-9]{6,40})/)?.[1] ?? "";
  const book = id ? await c.env.DB.prepare(`SELECT title FROM books WHERE id = ?`).bind(id).first<{ title: string }>() : null;
  if (email && book && (await isMember(c.env.DB, id, email)))
    return pageview(c, new HTMLRewriter().on("title", { element: (el) => { el.replace(roomMeta(url.origin, id, book.title), { html: true }); } }).transform(await shell(c)), email);
  const asked = email && book ? await c.env.DB.prepare(`SELECT 1 FROM access_requests WHERE book_id = ? AND email = ?`).bind(id, email).first() : null;
  const state = !book ? "missing" : !email ? "out" : asked ? "asked" : "ask";
  const res = c.html(accessPage({ origin: url.origin, id, title: book?.title ?? null, state, email: email ?? undefined, auto: url.searchParams.has("pedir"), lang: reqLang(c.req.raw) }), book ? 200 : 404);
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

app.use("*", async (c, next) => {
  const email = await identify(c);
  if (!email) {
    const file = fileLink(c);
    return file ? c.html(filePage({ id: file, path: new URL(c.req.url).pathname, signedIn: false, lang: reqLang(c.req.raw) }), 401) : c.json({ error: "unauthenticated" }, 401);
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
app.get("/api/dev/digest", async (c) => {
  if (!c.env.DEV_EMAIL) return c.notFound();
  return c.json({ sent: await sendDigests(c.env, Date.now(), c.req.query("email") || undefined) });
});
app.get("/api/dev/report", async (c) => {
  if (!c.env.DEV_EMAIL) return c.notFound();
  return c.text(c.req.query("which") === "product" ? await productReport(c.env) : await growthReport(c.env));
});
app.get("/api/dev/as", (c) => {
  if (!c.env.DEV_EMAIL) return c.notFound();
  const email = c.req.query("email") ?? "";
  c.header("set-cookie", `dev_as=${encodeURIComponent(email)}; Path=/; SameSite=Lax`);
  return c.redirect("/");
});

// How you sign in (the profile): per method, the last login and how many, from your own login events (user, ts index).
app.get("/api/me/logins", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT COALESCE(json_extract(dims, '$.method'), 'email') AS method, MAX(ts) AS last, COUNT(*) AS n FROM events WHERE user = ? AND name = 'login' GROUP BY 1`,
  ).bind(c.get("email")).all();
  return c.json({ logins: results, providers: { google: !!(c.env.GOOGLE_CLIENT_ID && c.env.GOOGLE_CLIENT_SECRET), github: !!(c.env.GITHUB_CLIENT_ID && c.env.GITHUB_CLIENT_SECRET) } });
});

app.get("/api/me", async (c) => {
  const email = c.get("email");
  const db = c.env.DB;
  // Served from your Person DO while nothing changed (rooms, waits and your own writes poke it stale).
  const person = c.env.PEOPLE.get(c.env.PEOPLE.idFromName(email));
  const cached = await person.fetch("https://person/me").catch(() => null);
  if (cached?.ok) return c.json({ ...(await cached.json<Record<string, unknown>>()), v: await currentVersion(c.env, c.req.url), cached: true });
  // One round trip's worth: the four reads run together.
  const [books, friends, me, waits] = await Promise.all([db
    .prepare(
      `SELECT b.id, b.title, b.folder, b.summary, b.updated_at, b.created_at, b.icon, b.busy_until, m.position, m.tint, m.opened_at, coalesce(b.last_human_id, 0) AS last_human_id, coalesce(b.last_agent_id, 0) AS last_agent_id,
         coalesce(r.last_id, 0) AS read_id,
         (SELECT count(*) FROM sandboxes s WHERE s.book_id = b.id AND s.state = 'running') AS sandboxes_running,
         (SELECT group_concat(email) FROM members m2 WHERE m2.book_id = b.id) AS members
       FROM books b JOIN members m ON m.book_id = b.id
       LEFT JOIN human_reads r ON r.email = m.email AND r.book_id = b.id
       WHERE m.email = ? AND m.archived_at IS NULL ORDER BY b.updated_at DESC`,
    )
    .bind(email)
    .all(), db
    .prepare(
      `SELECT f.b AS email, u.name, u.avatar, u.email IS NOT NULL AS joined,
         (SELECT count(*) FROM members x JOIN members y ON x.book_id = y.book_id
           WHERE x.email = f.a AND y.email = f.b) AS shared
       FROM friends f LEFT JOIN users u ON u.email = f.b
       WHERE f.a = ? ORDER BY shared DESC, f.b`,
    )
    .bind(email)
    .all(),
    db.prepare(`SELECT name, avatar, lang FROM users WHERE email = ?`).bind(email).first<{ name: string | null; avatar: number | null; lang: string | null }>(),
    waitsFor(db, email)]);
  // Remember the language for emails sent later (mentions, invites): an explicit choice wins, else the browser's, once.
  const lang = cookieLang(c.req.raw) ?? (me?.lang ? null : reqLang(c.req.raw));
  if (me && lang && lang !== me.lang) c.executionCtx.waitUntil(db.prepare(`UPDATE users SET lang = ? WHERE email = ?`).bind(lang, email).run());
  const out = { email, name: me?.name ?? null, avatar: me?.avatar ?? null, books: books.results, friends: friends.results, waits };
  const gen = cached?.headers.get("x-gen");
  if (gen) c.executionCtx.waitUntil(person.fetch("https://person/me", { method: "PUT", body: JSON.stringify(out), headers: { "x-gen": gen } }).catch(() => {}));
  return c.json({ ...out, v: await currentVersion(c.env, c.req.url) });
});

// "✓ resolvido" on an item of "Esperando você" (only asks; a task in review leaves when its status changes).
app.post("/api/waits/resolve", async (c) => {
  const { book_id, ref } = await c.req.json<{ book_id?: string; ref?: string }>().catch(() => ({}) as { book_id?: string; ref?: string });
  if (!book_id || !ref?.startsWith("m")) return c.json({ error: "bad request" }, 400);
  await c.env.DB.prepare(`DELETE FROM waits WHERE book_id = ? AND ref = ? AND email = ?`).bind(book_id, ref, c.get("email")).run();
  c.executionCtx.waitUntil(poke(c.env, [c.get("email")], { t: "me" })); // your other tabs and devices
  c.executionCtx.waitUntil(track(c.env, "wait_resolved", { user: c.get("email"), dims: { book: book_id } }));
  return c.json({ ok: true });
});

// Profile picture: the app resizes it to a small square before sending. R2 `avatars/<email>`, users.avatar = version.
const AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];
app.post("/api/me/avatar", async (c) => {
  const email = c.get("email");
  if (c.req.header("origin") && c.req.header("origin") !== new URL(c.req.url).origin) return c.json({ error: "bad origin" }, 403);
  const type = (c.req.header("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!AVATAR_TYPES.includes(type)) return c.json({ error: "Use uma imagem PNG, JPEG ou WebP." }, 415);
  const body = await c.req.arrayBuffer();
  if (!body.byteLength || body.byteLength > 1_000_000) return c.json({ error: "Imagem vazia ou maior que 1MB." }, 413);
  if (!(await c.env.UPLOAD_LIMIT.limit({ key: email })).success) return c.json({ error: "Muitos uploads. Espera um minuto." }, 429);
  await c.env.FILES.put(`avatars/${email}`, body, { httpMetadata: { contentType: type } });
  const v = Date.now();
  await c.env.DB.prepare(`UPDATE users SET avatar = ? WHERE email = ?`).bind(v, email).run();
  c.executionCtx.waitUntil(track(c.env, "avatar_set", { user: email }));
  return c.json({ ok: true, avatar: v });
});
// Room icon: the app sends a small PNG (it resizes first); members only. ?v=<books.icon> caches it for good.
app.post("/api/books/:id/icon", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (c.req.header("origin") && c.req.header("origin") !== new URL(c.req.url).origin) return c.json({ error: "bad origin" }, 403);
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  if (!(await c.env.UPLOAD_LIMIT.limit({ key: email })).success) return c.json({ error: "Muitos uploads. Espera um minuto." }, 429);
  const type = (c.req.header("content-type") ?? "").split(";")[0].trim().toLowerCase();
  try {
    const v = await setRoomIcon(c.env, id, type === "application/json" ? null : { type, body: await c.req.arrayBuffer() });
    c.executionCtx.waitUntil(track(c.env, "room_icon", { user: email, dims: { book: id, set: v !== null } }));
    return c.json({ ok: true, icon: v });
  } catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});
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
app.get("/api/archived", async (c) => {
  const r = await c.env.DB.prepare(
    `SELECT b.id, b.title, b.folder, b.summary, b.updated_at, m.archived_at,
       (SELECT group_concat(email) FROM members m2 WHERE m2.book_id = b.id) AS members
     FROM books b JOIN members m ON m.book_id = b.id
     WHERE m.email = ? AND m.archived_at IS NOT NULL ORDER BY m.archived_at DESC`,
  )
    .bind(c.get("email"))
    .all();
  return c.json({ books: r.results });
});

// The agents of this room's members: model/client, last seen, and whether they're listening to this room now.
app.get("/api/books/:id/agents", async (c) => {
  const id = c.req.param("id");
  const now = Date.now();
  // In parallel; your own members row is also the membership check.
  const [r, mine, sbx] = await Promise.all([c.env.DB.prepare(
    // Only the sessions connected to this room: listening to it (or to all their rooms), or that read/posted here in the last hour.
    `SELECT a.id, a.email, coalesce(a.model, a.client) AS who, a.repo, a.seen_at, a.listening_at, a.listen_room, a.ctx_tokens, a.ctx_window, a.ctx_at, a.ctx_limits
     FROM agents a JOIN members m ON m.email = a.email AND m.book_id = ?1
     LEFT JOIN agent_reads r ON r.agent = a.id AND r.book_id = ?1
     WHERE substr(a.id, 1, 2) != 'n_' AND (((a.listen_room = ?1 OR a.listen_room IS NULL) AND a.listening_at > ?2) OR r.seen_at > ?3)
     ORDER BY a.seen_at DESC LIMIT 40`,
  )
    .bind(id, now - LISTEN_FRESH, now - 3600_000)
    .all<{ id: string; email: string; who: string; repo: string | null; seen_at: number; listening_at: number | null; listen_room: string | null; ctx_tokens: number | null; ctx_window: number | null; ctx_at: number | null; ctx_limits: string | null }>(),
  c.env.DB.prepare(`SELECT claude_on FROM members WHERE book_id = ? AND email = ?`).bind(id, c.get("email")).first<{ claude_on: number | null }>(),
  // Everyone's cloud sandboxes in this room, as last seen by their owner's list (src/sandbox.ts): they cost money.
  c.env.DB.prepare(`SELECT id, email, name, state, run_s, rate, disk_rate, checked_at, created_at FROM sandboxes WHERE book_id = ? ORDER BY created_at`).bind(id).all()]);
  if (!mine) return c.json({ error: "forbidden" }, 403);
  return c.json({
    claude_on: !!mine?.claude_on,
    sandboxes: sbx.results,
    agents: r.results.map((a) => ({
      email: a.email,
      who: a.who || "agent",
      repo: a.repo,
      seen_at: a.seen_at,
      // A listener long-polls every ≤50s; 2 minutes of silence means it stopped.
      listening: !!a.listening_at && now - a.listening_at < LISTEN_FRESH && (a.listen_room === id || !a.listen_room),
      all_rooms: !a.listen_room,
      // How full its context was at its last call (only from the CLI inside Claude Code); older than 1h = unknown.
      context: a.ctx_tokens != null && a.ctx_window && now - (a.ctx_at ?? 0) < 3600_000 ? { tokens: a.ctx_tokens, window: a.ctx_window, at: a.ctx_at, limits: a.ctx_limits ? JSON.parse(a.ctx_limits) : null } : null,
    })),
  });
});

// Home composer: suggest where a message should go, then post it there.
app.post("/api/route", async (c) => {
  const email = c.get("email");
  if (c.req.header("origin") && c.req.header("origin") !== new URL(c.req.url).origin) return c.json({ error: "bad origin" }, 403);
  const { text } = await c.req.json<{ text?: string }>().catch(() => ({ text: "" }));
  if (!text?.trim()) return c.json({ error: "Escreva alguma coisa." }, 400);
  if (!(await c.env.AI_LIMIT.limit({ key: email })).success) return c.json({ error: "Muitos pedidos seguidos. Espera um minuto." }, 429);
  const started = Date.now();
  try {
    const out = await routeMessage(c.env, email, text.trim());
    c.executionCtx.waitUntil(track(c.env, "home_route", { user: email, dims: { ok: true, picked: !!out.pick, epic: !!out.pick?.epic_id, ms: Date.now() - started, cost: +out.cost.toFixed(6), model: c.env.MODEL_ROUTE } }));
    return c.json(out);
  } catch (e) {
    console.error("home route failed", String(e));
    c.executionCtx.waitUntil(track(c.env, "home_route", { user: email, dims: { ok: false, ms: Date.now() - started } }));
    return c.json({ error: "Não consegui sugerir agora. Escolha a sala na lista abaixo." }, 502);
  }
});

app.post("/api/books/:id/post", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const { text, thread } = await c.req.json<{ text?: string; thread?: string }>().catch(() => ({}) as { text?: string; thread?: string });
  const out = await bookStub(c.env, id).humanPost(id, email, text ?? "", thread || "main");
  if (out.ok) c.executionCtx.waitUntil(track(c.env, "home_route_sent", { user: email, dims: { book: id, epic: out.thread !== "main" } }));
  return out.ok ? c.json(out) : c.json(out, 400);
});

// "Meu Claude" toggle: the person wants a Claude of theirs on this room. `vibebook herdr` on their machine reads it
// (MCP claude_rooms) and opens or closes a Claude Code for the room in herdr.
app.post("/api/books/:id/claude", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const { on } = await c.req.json<{ on?: boolean }>().catch(() => ({ on: false }));
  await c.env.DB.prepare(`UPDATE members SET claude_on = ? WHERE book_id = ? AND email = ?`).bind(on ? 1 : 0, id, email).run();
  c.executionCtx.waitUntil(poke(c.env, [email], { t: "agents", book: id }));
  c.executionCtx.waitUntil(track(c.env, on ? "claude_on" : "claude_off", { user: email, dims: { book: id } }));
  return c.json({ ok: true, claude_on: !!on });
});

// The person's own order of their rooms (dragged in the rail); vibebook herdr orders the herdr workspaces the same way.
app.post("/api/rooms/order", async (c) => {
  const email = c.get("email");
  const { ids } = await c.req.json<{ ids?: unknown }>().catch(() => ({ ids: [] }));
  const list = (Array.isArray(ids) ? ids : []).filter((x): x is string => typeof x === "string").slice(0, 300);
  if (!list.length) return c.json({ error: "ids required" }, 400);
  const st = c.env.DB.prepare(`UPDATE members SET position = ? WHERE book_id = ? AND email = ?`);
  await c.env.DB.batch(list.map((id, i) => st.bind(i, id, email)));
  return c.json({ ok: true });
});

// A room's color in the person's rail: neighbours with the same color read as one group.
const TINTS = ["blue", "green", "yellow", "orange", "pink", "purple"];
app.post("/api/books/:id/tint", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const { tint } = await c.req.json<{ tint?: string | null }>().catch(() => ({ tint: null }));
  await c.env.DB.prepare(`UPDATE members SET tint = ? WHERE book_id = ? AND email = ?`).bind(tint && TINTS.includes(tint) ? tint : null, id, email).run();
  return c.json({ ok: true });
});

app.post("/api/books/:id/archive", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const { archived } = await c.req.json<{ archived?: boolean }>().catch(() => ({ archived: true }));
  await c.env.DB.prepare(`UPDATE members SET archived_at = ? WHERE book_id = ? AND email = ?`).bind(archived === false ? null : Date.now(), id, email).run();
  c.executionCtx.waitUntil(track(c.env, archived === false ? "book_restored" : "book_archived", { user: email, dims: { book: id } }));
  return c.json({ ok: true });
});

app.post("/api/me", async (c) => {
  const { name } = await c.req.json<{ name?: string }>().catch(() => ({ name: "" }));
  const clean = (name ?? "").replace(/[<>"@\p{Cc}]/gu, "").replace(/\s+/g, " ").trim().slice(0, 60);
  if (!clean) return c.json({ error: "Nome vazio." }, 400);
  await c.env.DB.prepare(`UPDATE users SET name = ? WHERE email = ?`).bind(clean, c.get("email")).run();
  return c.json({ ok: true, name: clean });
});

app.post("/api/books", async (c) => {
  const email = c.get("email");
  const { title } = await c.req.json<{ title?: string }>().catch(() => ({ title: undefined }));
  const id = await createBook(c.env, email, title);
  c.executionCtx.waitUntil(track(c.env, "book_created", { user: email, dims: { book: id } }));
  return c.json({ id });
});

// "Novo vibebook" in one step (src/start-room.ts): what it is and with whom → titled room, first message, invites,
// Claude on.
app.post("/api/books/start", async (c) => {
  const email = c.get("email");
  const { text } = await c.req.json<{ text?: string }>().catch(() => ({ text: "" }));
  if (!text?.trim()) return c.json({ error: "Escreva o que é e com quem." }, 400);
  if (!(await c.env.AI_LIMIT.limit({ key: email })).success) return c.json({ error: "Muitos pedidos seguidos. Espera um minuto." }, 429);
  const out = await startRoom(c.env, c.executionCtx, new URL(c.req.url).origin, email, text.trim(), reqLang(c.req.raw));
  c.executionCtx.waitUntil(track(c.env, "book_created", { user: email, dims: { book: out.id, start: true, invited: out.invited.length, unknown: out.unknown.length, cost: out.cost } }));
  return c.json(out);
});

// Ask to join a room you opened by link. Silent when already asked or declined (no way to probe or spam).
app.post("/api/books/:id/request", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  const book = await c.env.DB.prepare(`SELECT 1 FROM books WHERE id = ?`).bind(id).first();
  if (!book) return c.json({ error: "not found" }, 404);
  if (await isMember(c.env.DB, id, email)) return c.json({ ok: true, member: true });
  if (!(await c.env.LOGIN_LIMIT.limit({ key: `ask:${email}` })).success) return c.json({ error: "rate limited" }, 429);
  const r = await c.env.DB.prepare(`INSERT OR IGNORE INTO access_requests (book_id, email, ts) VALUES (?, ?, ?)`).bind(id, email, Date.now()).run();
  if (r.meta.changes) {
    const name = (await c.env.DB.prepare(`SELECT name FROM users WHERE email = ?`).bind(email).first<{ name: string | null }>())?.name ?? undefined;
    await bookStub(c.env, id).fetch(`https://book/access-requested?book=${id}`, { method: "POST", body: JSON.stringify({ who: email, name }) });
    c.executionCtx.waitUntil(track(c.env, "access_requested", { user: email, dims: { book: id } }));
  }
  return c.json({ ok: true });
});
app.get("/api/books/:id/access", async (c) => c.json({ member: await isMember(c.env.DB, c.req.param("id"), c.get("email")) }));
// A member lets someone in (= the usual invite, which emails them the link) or declines (kept, so they can't re-ask).
app.post("/api/books/:id/requests", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const { email: who, ok } = await c.req.json<{ email: string; ok: boolean }>();
  const req = await c.env.DB.prepare(`SELECT email FROM access_requests WHERE book_id = ? AND email = ? AND denied = 0`).bind(id, String(who ?? "").toLowerCase()).first<{ email: string }>();
  if (!req) return c.json({ error: "no such request" }, 404);
  if (ok) {
    await c.env.DB.prepare(`DELETE FROM access_requests WHERE book_id = ? AND email = ?`).bind(id, req.email).run();
    await inviteMember(c.env, c.executionCtx, new URL(c.req.url).origin, email, id, req.email, reqLang(c.req.raw));
  } else await c.env.DB.prepare(`UPDATE access_requests SET denied = 1 WHERE book_id = ? AND email = ?`).bind(id, req.email).run();
  await bookStub(c.env, id).fetch("https://book/requests-changed", { method: "POST" });
  c.executionCtx.waitUntil(track(c.env, ok ? "access_approved" : "access_denied", { user: email, dims: { book: id } }));
  return c.json({ ok: true });
});

app.post("/api/books/:id/members", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const { email: invitee } = await c.req.json<{ email: string }>();
  const who = (invitee ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(who)) return c.json({ error: "invalid email" }, 400);
  await inviteMember(c.env, c.executionCtx, new URL(c.req.url).origin, email, id, who, reqLang(c.req.raw));
  return c.json({ ok: true });
});

app.post("/api/friends", async (c) => {
  const { email: friend } = await c.req.json<{ email: string }>();
  const who = (friend ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(who) || who === c.get("email")) return c.json({ error: "invalid email" }, 400);
  await befriend(c.env.DB, c.get("email"), who);
  return c.json({ ok: true });
});

// Unfriend: removes both directions (shared vibebooks are untouched).
app.delete("/api/friends/:email", async (c) => {
  const me = c.get("email");
  const who = decodeURIComponent(c.req.param("email")).toLowerCase();
  await c.env.DB.prepare(`DELETE FROM friends WHERE (a = ? AND b = ?) OR (a = ? AND b = ?)`).bind(me, who, who, me).run();
  return c.json({ ok: true });
});

// Cancel a pending invite (any member) or remove someone (owner only).
app.delete("/api/books/:id/members/:email", async (c) => {
  const me = c.get("email");
  const id = c.req.param("id");
  const who = decodeURIComponent(c.req.param("email")).toLowerCase();
  const db = c.env.DB;
  if (!(await isMember(db, id, me))) return c.json({ error: "forbidden" }, 403);
  const book = await db.prepare(`SELECT owner FROM books WHERE id = ?`).bind(id).first<{ owner: string }>();
  if (who === book?.owner) return c.json({ error: "O dono não pode ser removido." }, 400);
  const joined = !!(await db.prepare(`SELECT 1 FROM users WHERE email = ?`).bind(who).first());
  if (joined && me !== book?.owner) return c.json({ error: "Só quem criou o vibebook remove quem já entrou." }, 403);
  await db.prepare(`DELETE FROM members WHERE book_id = ? AND email = ?`).bind(id, who).run();
  await bookStub(c.env, id).fetch("https://book/members-changed", { method: "POST" });
  return c.json({ ok: true });
});

// Files: stored in R2 under <book>/<file>; types, limits and serving headers live in rooms.ts.
app.post("/api/books/:id/files", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const type = (c.req.header("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!FILE_TYPES.includes(type)) return c.json({ error: "Tipo de arquivo não suportado (imagens, PDF, HTML e Markdown)." }, 415);
  if (Number(c.req.header("content-length") ?? 0) > MAX_FILE_BYTES) return c.json({ error: "Arquivo maior que 10MB." }, 413);
  try {
    const meta = await storeFile(c.env, id, email, type, await c.req.arrayBuffer(), decodeURIComponent(c.req.header("x-filename") ?? ""));
    c.executionCtx.waitUntil(track(c.env, "file_uploaded", { user: email, dims: { book: id, type, size: meta.size } }));
    return c.json(meta);
  } catch (e) {
    return c.json({ error: e instanceof Error ? e.message : String(e) }, 400);
  }
});

app.get("/api/books/:id/files/:fid", async (c) => {
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, c.get("email"))))
    return fileLink(c) ? c.html(filePage({ id, path: "", signedIn: true, lang: reqLang(c.req.raw) }), 403) : c.json({ error: "forbidden" }, 403);
  const obj = await c.env.FILES.get(`${id}/${c.req.param("fid")}`);
  if (!obj) return c.notFound();
  return new Response(obj.body, { headers: fileHeaders(obj.httpMetadata?.contentType ?? "application/octet-stream", obj.customMetadata?.name ?? "arquivo") });
});

// A room app's preview (Apps tab): the template with each {{field}} shown as its name, served like an HTML file.
app.get("/api/books/:id/apps/:name", async (c) => {
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, c.get("email")))) return c.json({ error: "forbidden" }, 403);
  const tpl = await bookStub(c.env, id).appHtml(id, c.req.param("name"));
  if (tpl === null) return c.notFound();
  const fields = Object.fromEntries([...tpl.matchAll(/\{\{\s*([\w.-]+)\s*\}\}/g)].map((m) => [m[1], `‹${m[1]}›`]));
  return new Response(withBridge(renderApp(tpl, fields)), { headers: { ...fileHeaders("text/html", `${c.req.param("name")}.html`), "cache-control": "private, max-age=60" } });
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
  const req = new Request(`https://book/ws?book=${id}`, c.req.raw);
  req.headers.set("x-email", c.get("email"));
  return bookStub(c.env, id).fetch(req);
});

// /mcp serves two things: the admin MCP (static bearer MCP_AUTH_TOKEN) and the agents' MCP behind OAuth.
// Everything else (app, /authorize, /oauth/*, discovery) goes through the OAuth provider to the Hono app.
// Cloud agents (freestyle.sh sandboxes): src/sandbox.ts. agents/<name>.md is the sandbox's CLAUDE.md, kept in the
// room's files so people (and their Claudes) edit it there; created with a template the first time.
mountSandbox(app, { isMember, track });

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.pathname === "/mcp" && isAdminMcp(request, env)) return handleMcp(request, env);
    return providerFor(url.origin, app as unknown as ExportedHandler<Env>).fetch(request, env, ctx);
  },
  // 11:00 and 21:00 UTC = 8h and 18h in São Paulo: the catch-up e-mail.
  scheduled(_event: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(ensureSchema(env.DB).then(() => sendDigests(env)).catch((e) => console.error("digest", String(e))));
  },
} satisfies ExportedHandler<Env>;
