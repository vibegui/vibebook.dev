import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { auth, EMAIL_RE, emailHtml, escapeHtml, sessionEmail } from "./auth";
export { Book } from "./book";

export type Env = {
  DB: D1Database;
  ASSETS: Fetcher;
  BOOK: DurableObjectNamespace;
  EMAIL: SendEmail;
  AI_LIMIT: RateLimit;
  LOGIN_LIMIT: RateLimit;
  OPENROUTER_API_KEY: string;
  SESSION_SECRET: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  MODEL_FAST: string;
  MODEL_MEDIUM: string;
  MODEL_HEAVY: string;
  MODEL_CLASSIFY: string;
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
  (schemaReady ??= db.batch(SCHEMA.map((s) => db.prepare(s))));

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
      `SELECT f.b AS email, u.email IS NOT NULL AS joined,
         (SELECT count(*) FROM members x JOIN members y ON x.book_id = y.book_id
           WHERE x.email = f.a AND y.email = f.b) AS shared
       FROM friends f LEFT JOIN users u ON u.email = f.b
       WHERE f.a = ? ORDER BY shared DESC, f.b`,
    )
    .bind(email)
    .all();
  return c.json({ email, books: books.results, friends: friends.results });
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
    const url = `${new URL(c.req.url).origin}/b/${id}`;
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
          `<p style="font-size:18px;font-weight:700">${escapeHtml(title)}</p><p>${escapeHtml(email)} quer planejar isso com você. Tem chat, épicos, tasks e uma AI que organiza tudo.</p><p style="margin-top:24px"><a href="${url}" style="background:#1d5fc4;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700">Abrir o vibebook</a></p>`,
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

app.get("/ws/:id", async (c) => {
  const id = c.req.param("id");
  if (c.req.header("upgrade") !== "websocket") return c.text("expected websocket", 426);
  if (!(await isMember(c.env.DB, id, c.get("email")))) return c.json({ error: "forbidden" }, 403);
  const req = new Request(`https://book/ws?book=${id}`, c.req.raw);
  req.headers.set("x-email", c.get("email"));
  return c.env.BOOK.get(c.env.BOOK.idFromName(id)).fetch(req);
});

export default app;
