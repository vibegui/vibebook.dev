import { type Context, Hono } from "hono";
import type { OAuthHelpers } from "@cloudflare/workers-oauth-provider";
import { ensureAgent, markDelivered, unreadRooms } from "./agent";
import { auth, EMAIL_RE, identify } from "./auth";
import type { Book } from "./book";
import { connect, providerFor } from "./connect";
import { handleMcp, isAdminMcp } from "./mcp";
import { routeMessage } from "./route-home";
import { befriend, bookStub, createBook, FILE_TYPES, fileHeaders, inviteMember, isMember, MAX_FILE_BYTES, storeFile } from "./rooms";
import { requestContext, track } from "./track";
export { Book } from "./book";

export type Env = {
  DB: D1Database;
  ASSETS: Fetcher;
  /** The landing as a deco Studio site (site/, Worker vibebook-site). Missing or failing: the static page in public/. */
  SITE?: Fetcher;
  BOOK: DurableObjectNamespace<Book>;
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
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  MODEL_ROUTE: string;
  MODEL_FAST: string;
  MODEL_SMART: string;
  MODEL_CLASSIFY: string;
  FIRECRAWL_API_KEY?: string;
  READ_LIMIT: RateLimit;
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
  `CREATE TABLE IF NOT EXISTS agent_reads (agent TEXT, book_id TEXT, email TEXT, last_id INTEGER, delivered_id INTEGER, PRIMARY KEY (agent, book_id))`,
  `CREATE INDEX IF NOT EXISTS agent_reads_email ON agent_reads (email, book_id)`,
  `CREATE TABLE IF NOT EXISTS notify_agents (key TEXT PRIMARY KEY, email TEXT, agent TEXT, created_at INTEGER)`,
  // What each person has seen in each room in the app (the switcher's unread dots).
  `CREATE TABLE IF NOT EXISTS human_reads (email TEXT, book_id TEXT, last_id INTEGER, PRIMARY KEY (email, book_id))`,
];
let schemaReady: Promise<unknown> | undefined;
export const ensureSchema = (db: D1Database) =>
  (schemaReady ??= db.batch(SCHEMA.map((s) => db.prepare(s))).then(() =>
    // Columns added after launch; ALTER fails harmlessly once they exist.
    Promise.all(
      [`ALTER TABLE users ADD COLUMN name TEXT`, `ALTER TABLE books ADD COLUMN last_msg_id INTEGER`, `ALTER TABLE members ADD COLUMN archived_at INTEGER`, `ALTER TABLE books ADD COLUMN epics TEXT`, `ALTER TABLE books ADD COLUMN last_human_id INTEGER`, `ALTER TABLE books ADD COLUMN last_agent_id INTEGER`].map((q) => db.prepare(q).run().catch(() => {})),
    ),
  ));


const app = new Hono<Ctx>();

app.use("*", async (c, next) => {
  await ensureSchema(c.env.DB);
  await next();
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
const shell = (c: { env: Env; req: { url: string } }) => c.env.ASSETS.fetch(new URL("/app", c.req.url));
// Landing and demo live at /pt and /en. "/" and "/demo" pick one: cookie first, then the browser's main
// language (pt unless it starts with "en"). Opening /pt or /en remembers the choice.
const LANG_COOKIE = "vb_lang";
const pickLang = (req: Request) =>
  req.headers.get("cookie")?.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1] ??
  (req.headers.get("accept-language")?.split(",", 1)[0]?.trim().toLowerCase().startsWith("en") ? "en" : "pt");
for (const path of ["", "/demo", "/connect", "/how-it-works"]) {
  app.get(path || "/", (c) => {
    const url = new URL(c.req.url);
    const res = c.redirect(`/${pickLang(c.req.raw)}${path}${url.search}`, 302);
    res.headers.set("vary", "Accept-Language, Cookie");
    return res;
  });
  for (const lang of ["pt", "en"])
    app.get(`/${lang}${path}`, async (c) => {
      // The home comes from the Studio-editable site; if it's down, the static copy in public/ answers.
      const fromSite = !path && c.env.SITE ? await c.env.SITE.fetch(c.req.raw).catch(() => null) : null;
      const asset = fromSite && fromSite.status < 500 ? fromSite : await c.env.ASSETS.fetch(c.req.raw);
      const res = new Response(asset.body, asset);
      res.headers.append("set-cookie", `${LANG_COOKIE}=${lang}; Max-Age=31536000; Path=/; SameSite=Lax`);
      return pageview(c, res);
    });
}
// The site's own files (built JS) and the Studio admin endpoints (/deco/meta, /deco/render, …).
for (const prefix of ["/_site/*", "/deco/*", "/_serverFn/*"])
  app.all(prefix, (c) => (c.env.SITE ? c.env.SITE.fetch(c.req.raw) : c.notFound()));
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
app.get("/b/*", async (c) => {
  const email = await identify(c);
  return email ? pageview(c, await shell(c), email) : c.redirect(`/login?next=${encodeURIComponent(new URL(c.req.url).pathname)}`);
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
  const deadline = Date.now() + 50_000;
  for (;;) {
    // ponytail: D1 every 3s per listener, same as wait_for_messages; a per-person DO with push is the upgrade.
    const r = await unreadRooms(c.env.DB, row.email, row.agent, onlyRoom, since);
    if (r.results.length) {
      c.executionCtx.waitUntil(markDelivered(c.env, { email: row.email, client: row.client ?? "", agent: row.agent }, r.results));
      return c.text(r.results.map((b) => `vibebook: ${b.n} nova(s) em "${b.title}" room_id=${b.id} ${origin}/b/${b.id}`).join("\n") + "\n");
    }
    if (Date.now() + 3000 > deadline) return c.body(null, 204);
    await new Promise((res) => setTimeout(res, 3000));
  }
});

app.use("*", async (c, next) => {
  const email = await identify(c);
  if (!email) return c.json({ error: "unauthenticated" }, 401);
  const created = await c.env.DB.prepare(`INSERT OR IGNORE INTO users (email, created_at) VALUES (?, ?)`)
    .bind(email, Date.now())
    .run();
  if (created.meta.changes) c.executionCtx.waitUntil(track(c.env, "signup", { user: email }));
  c.set("email", email);
  await next();
});


app.get("/api/dev/as", (c) => {
  if (!c.env.DEV_EMAIL) return c.notFound();
  const email = c.req.query("email") ?? "";
  c.header("set-cookie", `dev_as=${encodeURIComponent(email)}; Path=/; SameSite=Lax`);
  return c.redirect("/");
});

app.get("/api/me", async (c) => {
  const email = c.get("email");
  const db = c.env.DB;
  const books = await db
    .prepare(
      `SELECT b.id, b.title, b.folder, b.summary, b.updated_at, coalesce(b.last_human_id, 0) AS last_human_id, coalesce(b.last_agent_id, 0) AS last_agent_id,
         coalesce(r.last_id, 0) AS read_id,
         (SELECT group_concat(email) FROM members m2 WHERE m2.book_id = b.id) AS members
       FROM books b JOIN members m ON m.book_id = b.id
       LEFT JOIN human_reads r ON r.email = m.email AND r.book_id = b.id
       WHERE m.email = ? AND m.archived_at IS NULL ORDER BY b.updated_at DESC`,
    )
    .bind(email)
    .all();
  const friends = await db
    .prepare(
      `SELECT f.b AS email, u.name, u.email IS NOT NULL AS joined,
         (SELECT count(*) FROM members x JOIN members y ON x.book_id = y.book_id
           WHERE x.email = f.a AND y.email = f.b) AS shared
       FROM friends f LEFT JOIN users u ON u.email = f.b
       WHERE f.a = ? ORDER BY shared DESC, f.b`,
    )
    .bind(email)
    .all();
  const me = await db.prepare(`SELECT name FROM users WHERE email = ?`).bind(email).first<{ name: string | null }>();
  return c.json({ email, name: me?.name ?? null, books: books.results, friends: friends.results });
});

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
  const clean = (name ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
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

app.post("/api/books/:id/members", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const { email: invitee } = await c.req.json<{ email: string }>();
  const who = (invitee ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(who)) return c.json({ error: "invalid email" }, 400);
  await inviteMember(c.env, c.executionCtx, new URL(c.req.url).origin, email, id, who);
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
  if (!FILE_TYPES.includes(type)) return c.json({ error: "Tipo de arquivo não suportado (imagens, PDF e HTML)." }, 415);
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
  if (!(await isMember(c.env.DB, id, c.get("email")))) return c.json({ error: "forbidden" }, 403);
  const obj = await c.env.FILES.get(`${id}/${c.req.param("fid")}`);
  if (!obj) return c.notFound();
  return new Response(obj.body, { headers: fileHeaders(obj.httpMetadata?.contentType ?? "application/octet-stream", obj.customMetadata?.name ?? "arquivo") });
});

app.get("/ws/:id", async (c) => {
  const id = c.req.param("id");
  if (c.req.header("upgrade") !== "websocket") return c.text("expected websocket", 426);
  if (!(await isMember(c.env.DB, id, c.get("email")))) return c.json({ error: "forbidden" }, 403);
  const req = new Request(`https://book/ws?book=${id}`, c.req.raw);
  req.headers.set("x-email", c.get("email"));
  return bookStub(c.env, id).fetch(req);
});

// /mcp serves two things: the admin MCP (static bearer MCP_AUTH_TOKEN) and the agents' MCP behind OAuth.
// Everything else (app, /authorize, /oauth/*, discovery) goes through the OAuth provider to the Hono app.
export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.pathname === "/mcp" && isAdminMcp(request, env)) return handleMcp(request, env);
    return providerFor(url.origin, app as unknown as ExportedHandler<Env>).fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
