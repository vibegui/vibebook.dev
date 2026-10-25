import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { auth, EMAIL_RE, emailHtml, escapeHtml, inviteLink, sessionEmail } from "./auth";
export { Book } from "./book";

export type Env = {
  DB: D1Database;
  ASSETS: Fetcher;
  BOOK: DurableObjectNamespace;
  EMAIL: SendEmail;
  AI_LIMIT: RateLimit;
  UPLOAD_LIMIT: RateLimit;
  FILES: R2Bucket;
  LOGIN_LIMIT: RateLimit;
  OPENROUTER_API_KEY: string;
  SESSION_SECRET: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  MODEL_FAST: string;
  MODEL_MEDIUM: string;
  MODEL_HEAVY: string;
  MODEL_CLASSIFY: string;
  FIRECRAWL_API_KEY?: string;
  READ_LIMIT: RateLimit;
  DEV_EMAIL?: string;
};

type Ctx = { Bindings: Env; Variables: { email: string } };

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, created_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS books (id TEXT PRIMARY KEY, title TEXT, folder TEXT, summary TEXT, owner TEXT, created_at INTEGER, updated_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS members (book_id TEXT, email TEXT, PRIMARY KEY (book_id, email))`,
  `CREATE TABLE IF NOT EXISTS friends (a TEXT, b TEXT, created_at INTEGER, PRIMARY KEY (a, b))`,
  `CREATE TABLE IF NOT EXISTS login_codes (email TEXT PRIMARY KEY, hash TEXT, expires_at INTEGER, attempts INTEGER)`,
];
let schemaReady: Promise<unknown> | undefined;
export const ensureSchema = (db: D1Database) =>
  (schemaReady ??= db.batch(SCHEMA.map((s) => db.prepare(s))).then(() =>
    // Columns added after launch; ALTER fails harmlessly once they exist.
    db.prepare(`ALTER TABLE users ADD COLUMN name TEXT`).run().catch(() => {}),
  ));

async function identify(c: Parameters<typeof sessionEmail>[0]): Promise<string | null> {
  const email = await sessionEmail(c);
  if (email || !(c.env as Env).DEV_EMAIL) return email;
  // Local dev only: pick identity via cookie so two browsers can be two people.
  const as = getCookie(c, "dev_as");
  return (as && EMAIL_RE.test(as) ? as : (c.env as Env).DEV_EMAIL!).toLowerCase();
}

const app = new Hono<Ctx>();

app.use("*", async (c, next) => {
  await ensureSchema(c.env.DB);
  await next();
});

app.route("/auth", auth);

// App shell: /login is public; /app and /b/* bounce to /login without a session.
const shell = (c: { env: Env; req: { url: string } }) => c.env.ASSETS.fetch(new URL("/app", c.req.url));
app.get("/login", shell);
app.get("/app", async (c) => ((await identify(c)) ? shell(c) : c.redirect("/login")));
app.get("/b/*", async (c) =>
  (await identify(c)) ? shell(c) : c.redirect(`/login?next=${encodeURIComponent(new URL(c.req.url).pathname)}`),
);

app.use("*", async (c, next) => {
  const email = await identify(c);
  if (!email) return c.json({ error: "unauthenticated" }, 401);
  await c.env.DB.prepare(`INSERT OR IGNORE INTO users (email, created_at) VALUES (?, ?)`)
    .bind(email, Date.now())
    .run();
  c.set("email", email);
  await next();
});

const isMember = async (db: D1Database, bookId: string, email: string) =>
  !!(await db.prepare(`SELECT 1 FROM members WHERE book_id = ? AND email = ?`).bind(bookId, email).first());

const befriend = (db: D1Database, a: string, b: string) => {
  const now = Date.now();
  const q = `INSERT OR IGNORE INTO friends (a, b, created_at) VALUES (?, ?, ?)`;
  return db.batch([db.prepare(q).bind(a, b, now), db.prepare(q).bind(b, a, now)]);
};

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
      `SELECT b.id, b.title, b.folder, b.summary, b.updated_at,
         (SELECT group_concat(email) FROM members m2 WHERE m2.book_id = b.id) AS members
       FROM books b JOIN members m ON m.book_id = b.id
       WHERE m.email = ? ORDER BY b.updated_at DESC`,
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
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  const now = Date.now();
  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO books (id, title, folder, summary, owner, created_at, updated_at) VALUES (?, ?, NULL, '', ?, ?, ?)`,
    ).bind(id, (title || "Novo vibebook").slice(0, 120), email, now, now),
    c.env.DB.prepare(`INSERT INTO members (book_id, email) VALUES (?, ?)`).bind(id, email),
  ]);
  return c.json({ id });
});

app.post("/api/books/:id/members", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const { email: invitee } = await c.req.json<{ email: string }>();
  const who = (invitee ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(who)) return c.json({ error: "invalid email" }, 400);
  await c.env.DB.prepare(`INSERT OR IGNORE INTO members (book_id, email) VALUES (?, ?)`).bind(id, who).run();
  await befriend(c.env.DB, email, who);
  if (!c.env.DEV_EMAIL && (await c.env.LOGIN_LIMIT.limit({ key: `invite:${email}` })).success) {
    const book = await c.env.DB.prepare(`SELECT title FROM books WHERE id = ?`).bind(id).first<{ title: string }>();
    const url = await inviteLink(c.env, new URL(c.req.url).origin, who, id);
    const title = book?.title ?? "um vibebook";
    const inviter = email.split("@")[0];
    c.executionCtx.waitUntil(
      c.env.EMAIL.send({
        to: who,
        from: { email: "convite@vibebook.dev", name: "vibebook" },
        replyTo: email,
        subject: `${inviter} te chamou pro vibebook "${title}"`,
        text: `${email} te convidou para o vibebook "${title}".\n\nEntra aqui: ${url}`,
        html: emailHtml(
          `${escapeHtml(inviter)} te chamou pro vibebook`,
          `<p style="font-size:18px;font-weight:700">${escapeHtml(title)}</p><p>${escapeHtml(email)} quer planejar isso com você. Tem chat, épicos, tasks e uma AI que organiza tudo.</p><p style="font-size:13px;color:#6b7383">O botão já te deixa logado e vale por 24h. Depois disso é só entrar com seu email.</p><p style="margin-top:24px"><a href="${url}" style="background:#1d5fc4;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700">Abrir o vibebook</a></p>`,
        ),
      }).catch((e) => console.error("invite email failed", { who, error: String(e) })),
    );
  }
  await c.env.BOOK.get(c.env.BOOK.idFromName(id)).fetch("https://book/members-changed", { method: "POST" });
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
  await c.env.BOOK.get(c.env.BOOK.idFromName(id)).fetch("https://book/members-changed", { method: "POST" });
  return c.json({ ok: true });
});

// Files: images + PDF only (no SVG/HTML: they can carry script). Stored in R2 under <book>/<file>.
const FILE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf"];
const MAX_FILE_BYTES = 10 * 1024 * 1024;

app.post("/api/books/:id/files", async (c) => {
  const email = c.get("email");
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
  const type = (c.req.header("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!FILE_TYPES.includes(type)) return c.json({ error: "Tipo de arquivo não suportado (imagens e PDF)." }, 415);
  if (Number(c.req.header("content-length") ?? 0) > MAX_FILE_BYTES) return c.json({ error: "Arquivo maior que 10MB." }, 413);
  if (!(await c.env.UPLOAD_LIMIT.limit({ key: email })).success) return c.json({ error: "Muitos uploads. Espera um minuto." }, 429);
  const body = await c.req.arrayBuffer();
  if (!body.byteLength || body.byteLength > MAX_FILE_BYTES) return c.json({ error: "Arquivo vazio ou maior que 10MB." }, 413);
  const raw = decodeURIComponent(c.req.header("x-filename") ?? "") || `arquivo.${type.split("/")[1]}`;
  const name = raw.replace(/[\\/\u0000-\u001f]/g, "_").slice(0, 120);
  const meta = { id: crypto.randomUUID().replace(/-/g, "").slice(0, 16), name, type, size: body.byteLength, author: email, ts: Date.now() };
  await c.env.FILES.put(`${id}/${meta.id}`, body, { httpMetadata: { contentType: type }, customMetadata: { name, author: email } });
  await c.env.BOOK.get(c.env.BOOK.idFromName(id)).fetch(`https://book/file?book=${id}`, { method: "POST", body: JSON.stringify(meta) });
  return c.json(meta);
});

app.get("/api/books/:id/files/:fid", async (c) => {
  const id = c.req.param("id");
  if (!(await isMember(c.env.DB, id, c.get("email")))) return c.json({ error: "forbidden" }, 403);
  const obj = await c.env.FILES.get(`${id}/${c.req.param("fid")}`);
  if (!obj) return c.notFound();
  const type = obj.httpMetadata?.contentType ?? "application/octet-stream";
  return new Response(obj.body, {
    headers: {
      "content-type": FILE_TYPES.includes(type) ? type : "application/octet-stream",
      "content-disposition": `inline; filename*=UTF-8''${encodeURIComponent(obj.customMetadata?.name ?? "arquivo")}`,
      "x-content-type-options": "nosniff",
      "content-security-policy": "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
      "cache-control": "private, max-age=86400",
    },
  });
});

app.get("/ws/:id", async (c) => {
  const id = c.req.param("id");
  if (c.req.header("upgrade") !== "websocket") return c.text("expected websocket", 426);
  if (!(await isMember(c.env.DB, id, c.get("email")))) return c.json({ error: "forbidden" }, 403);
  const req = new Request(`https://book/ws?book=${id}`, c.req.raw);
  req.headers.set("x-email", c.get("email"));
  return c.env.BOOK.get(c.env.BOOK.idFromName(id)).fetch(req);
});

export default app;
