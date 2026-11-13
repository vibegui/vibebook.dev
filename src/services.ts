// The services the typed routes (src/api.ts) get, built per request from the Worker's bindings for the signed-in
// person. This is the one place that knows both Env and ApiServices; the routes and their browser-facing types don't.
import type { ApiServices } from "./api";
import type { Env } from "./index";
import { LISTEN_FRESH, poke } from "./person";
import { EMAIL_RE } from "./auth";
import { cookieLang, reqLang } from "./lang";
import { uiShellPath, uiVariant, type UiVariant } from "../shared/uiVariant";
import { MeBook, MeData, MeFriend, MeResult, MeWait } from "../shared/schemas";
import { routeMessage } from "./route-home";
import { startRoom } from "./start-room";
import { befriend, bookStub, createBook, FILE_TYPES, inviteMember, isMember, maxBytes, searchRooms, sizeError, setRoomIcon, storeFile, TYPES_ERROR, waitsFor } from "./rooms";
import { track } from "./track";
import { pushTo } from "./webpush";
import { checkFreestyleKey, sandboxOps, saveKey } from "./sandbox";
import { connOps } from "./mcpconn";

// The app shell's version per UI variant, per isolate (a deploy is a new isolate): open tabs compare it to reload.
const appVersions = new Map<UiVariant, string>();
async function currentVersion(env: Env, url: string) {
  const variant = uiVariant(url);
  let version = appVersions.get(variant);
  if (version === undefined) {
    version = ((await env.ASSETS.fetch(new Request(new URL(uiShellPath(url), url), { method: "HEAD" }))).headers.get("etag") ?? "").replace(/[^\w-]/g, "");
    appVersions.set(variant, version);
  }
  return version;
}

/** GET /api/me: served from your Person DO while nothing changed (rooms, waits and your own writes poke it stale). */
export async function meFor(env: Env, ctx: { waitUntil(p: Promise<unknown>): void }, email: string, req: Request): Promise<MeResult> {
  const db = env.DB;
  const person = env.PEOPLE.get(env.PEOPLE.idFromName(email));
  const cached = await person.fetch("https://person/me").catch(() => null);
  if (cached?.ok) {
    // A cache written by an older deploy that no longer fits the schema is recomputed, not served.
    const hit = MeData.safeParse(await cached.json().catch(() => null));
    if (hit.success) return { ...hit.data, v: await currentVersion(env, req.url), cached: true };
  }
  // One round trip's worth: the four reads run together.
  const [books, friends, me, waits] = await Promise.all([
    db.prepare(
      `SELECT b.id, b.title, b.folder, b.summary, b.updated_at, b.created_at, b.icon, b.busy_until, m.position, m.tint, m.opened_at, coalesce(b.last_human_id, 0) AS last_human_id, coalesce(b.last_agent_id, 0) AS last_agent_id,
         coalesce(r.last_id, 0) AS read_id,
         (SELECT count(*) FROM sandboxes s WHERE s.book_id = b.id AND s.state = 'running') AS sandboxes_running,
         (SELECT group_concat(email) FROM members m2 WHERE m2.book_id = b.id) AS members
       FROM books b JOIN members m ON m.book_id = b.id
       LEFT JOIN human_reads r ON r.email = m.email AND r.book_id = b.id
       WHERE m.email = ? AND m.archived_at IS NULL ORDER BY b.updated_at DESC`,
    ).bind(email).all(),
    db.prepare(
      `SELECT f.b AS email, u.name, u.avatar, u.email IS NOT NULL AS joined,
         (SELECT count(*) FROM members x JOIN members y ON x.book_id = y.book_id
           WHERE x.email = f.a AND y.email = f.b) AS shared
       FROM friends f LEFT JOIN users u ON u.email = f.b
       WHERE f.a = ? ORDER BY shared DESC, f.b`,
    ).bind(email).all(),
    db.prepare(`SELECT name, avatar, lang FROM users WHERE email = ?`).bind(email).first<{ name: string | null; avatar: number | null; lang: string | null }>(),
    waitsFor(db, email),
  ]);
  // Remember the language for emails sent later (mentions, invites): an explicit choice wins, else the browser's, once.
  const lang = cookieLang(req) ?? (me?.lang ? null : reqLang(req));
  if (me && lang && lang !== me.lang) ctx.waitUntil(db.prepare(`UPDATE users SET lang = ? WHERE email = ?`).bind(lang, email).run());
  // Every D1 column is nullable: the columns a legacy row may leave empty get their neutral value, then each row is
  // checked on its own. A row that still doesn't fit is dropped and logged (never served or cached unchecked), so one
  // bad row costs that row, not the whole home.
  const dropped: string[] = [];
  const keep = <T>(list: string, schema: { safeParse(v: unknown): { success: true; data: T } | { success: false } }, rows: unknown[]) =>
    rows.flatMap((row) => {
      const r = schema.safeParse(row);
      if (r.success) return [r.data];
      dropped.push(list);
      return [];
    });
  const out: MeData = {
    email,
    name: me?.name ?? null,
    avatar: me?.avatar ?? null,
    books: keep("books", MeBook, books.results),
    friends: keep("friends", MeFriend, friends.results.map((f) => ({ ...f, joined: Number(f.joined ?? 0), shared: Number(f.shared ?? 0) }))),
    waits: keep("waits", MeWait, waits.map((w) => ({ ...w, room: w.room ?? "", thread: w.thread ?? "main", author: w.author ?? "", text: w.text ?? "", ts: w.ts ?? 0 }))),
  };
  if (dropped.length) console.error("/api/me dropped rows off schema", dropped);
  const gen = cached?.headers.get("x-gen");
  if (gen) ctx.waitUntil(person.fetch("https://person/me", { method: "PUT", body: JSON.stringify(out), headers: { "x-gen": gen } }).then(() => {}, () => {}));
  return { ...out, v: await currentVersion(env, req.url) };
}

export function services(env: Env, ctx: { waitUntil(p: Promise<unknown>): void }, email: string, req0: Request): ApiServices {
  return {
    isMember: (roomId) => isMember(env.DB, roomId, email),
    humanPost: (roomId, text, thread) => bookStub(env, roomId).humanPost(roomId, email, text, thread),
    storeFile: (roomId, type, body, name) => storeFile(env, roomId, email, type, body, name),
    fileTypes: FILE_TYPES,
    maxBytes,
    sizeError,
    typesError: TYPES_ERROR,
    sql: async (query, ...binds) => { await env.DB.prepare(query).bind(...binds).run(); },
    sqlBatch: async (query, rows) => { const st = env.DB.prepare(query); await env.DB.batch(rows.map((r) => st.bind(...r))); return; },
    track: (name, dims) => ctx.waitUntil(track(env, name, { user: email, ...(dims ? { dims } : {}) })),
    pokeMe: () => ctx.waitUntil(poke(env, [email], { t: "me" })),
    vapidKey: env.VAPID_PUBLIC_KEY ?? null,
    pushToMe: (p) => pushTo(env, [email], p),
    sqlAll: async (query, ...binds) => (await env.DB.prepare(query).bind(...binds).all()).results,
    search: async (q) => {
      if (!(await env.AGENT_LIMIT.limit({ key: `search:${email}` })).success) return false;
      const out = await searchRooms(env, email, q);
      ctx.waitUntil(track(env, "search", { user: email, dims: { via: "app", hits: out.messages.length + out.epics.length, rooms: out.rooms } }));
      return out;
    },
    loginProviders: { google: !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET), github: !!(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) },
    isEmail: (s) => EMAIL_RE.test(s),
    befriend: async (who) => { await befriend(env.DB, email, who); },
    invite: (roomId, who) => inviteMember(env, ctx, new URL(req0.url).origin, email, roomId, who, reqLang(req0)),
    removeMember: async (roomId, who) => {
      const book = await env.DB.prepare(`SELECT owner FROM books WHERE id = ?`).bind(roomId).first<{ owner: string }>();
      if (who === book?.owner) return { error: "O dono não pode ser removido.", status: 400 };
      const joined = !!(await env.DB.prepare(`SELECT 1 FROM users WHERE email = ?`).bind(who).first());
      if (joined && email !== book?.owner) return { error: "Só quem criou o vibebook remove quem já entrou.", status: 403 };
      await env.DB.prepare(`DELETE FROM members WHERE book_id = ? AND email = ?`).bind(roomId, who).run();
      await bookStub(env, roomId).fetch("https://book/members-changed", { method: "POST" });
      return null;
    },
    pokeAgents: (roomId) => ctx.waitUntil(poke(env, [email], { t: "agents", book: roomId })),
    requestAccess: async (roomId) => {
      if (!(await env.DB.prepare(`SELECT 1 FROM books WHERE id = ?`).bind(roomId).first())) return "not_found";
      if (await isMember(env.DB, roomId, email)) return "member";
      if (!(await env.LOGIN_LIMIT.limit({ key: `ask:${email}` })).success) return "limited";
      const r = await env.DB.prepare(`INSERT OR IGNORE INTO access_requests (book_id, email, ts) VALUES (?, ?, ?)`).bind(roomId, email, Date.now()).run();
      if (r.meta.changes) {
        const name = (await env.DB.prepare(`SELECT name FROM users WHERE email = ?`).bind(email).first<{ name: string | null }>())?.name ?? undefined;
        await bookStub(env, roomId).fetch(`https://book/access-requested?book=${roomId}`, { method: "POST", body: JSON.stringify({ who: email, name }) });
        ctx.waitUntil(track(env, "access_requested", { user: email, dims: { book: roomId } }));
      }
      return "asked";
    },
    decideRequest: async (roomId, who, approve) => {
      const req = await env.DB.prepare(`SELECT email FROM access_requests WHERE book_id = ? AND email = ? AND denied = 0`).bind(roomId, who).first<{ email: string }>();
      if (!req) return false;
      if (approve) {
        await env.DB.prepare(`DELETE FROM access_requests WHERE book_id = ? AND email = ?`).bind(roomId, req.email).run();
        await inviteMember(env, ctx, new URL(req0.url).origin, email, roomId, req.email, reqLang(req0));
      } else await env.DB.prepare(`UPDATE access_requests SET denied = 1 WHERE book_id = ? AND email = ?`).bind(roomId, req.email).run();
      await bookStub(env, roomId).fetch("https://book/requests-changed", { method: "POST" });
      return true;
    },
    createRoom: (title) => createBook(env, email, title),
    startRoom: async (text) => {
      if (!(await env.AI_LIMIT.limit({ key: email })).success) return false;
      const out = await startRoom(env, ctx, new URL(req0.url).origin, email, text, reqLang(req0));
      ctx.waitUntil(track(env, "book_created", { user: email, dims: { book: out.id, start: true, invited: out.invited.length, unknown: out.unknown.length, cost: out.cost } }));
      return out;
    },
    routeHome: async (text) => {
      if (!(await env.AI_LIMIT.limit({ key: email })).success) return false;
      const started = Date.now();
      try {
        const out = await routeMessage(env, email, text);
        ctx.waitUntil(track(env, "home_route", { user: email, dims: { ok: true, picked: !!out.pick, epic: !!out.pick?.epic_id, ms: Date.now() - started, cost: +out.cost.toFixed(6), model: env.MODEL_ROUTE } }));
        return out;
      } catch (e) {
        console.error("home route failed", String(e));
        ctx.waitUntil(track(env, "home_route", { user: email, dims: { ok: false, ms: Date.now() - started } }));
        throw e;
      }
    },
    sameOrigin: !req0.headers.get("origin") || req0.headers.get("origin") === new URL(req0.url).origin,
    allowSecretTry: async (key) => (await env.LOGIN_LIMIT.limit({ key })).success,
    saveSecret: (table, value) => saveKey(env, email, value, table),
    checkFreestyleKey: (key) => checkFreestyleKey(env, key),
    listenFresh: LISTEN_FRESH,
    sandboxes: sandboxOps(env, ctx, email, new URL(req0.url).origin),
    me: () => meFor(env, ctx, email, req0),
    allowUpload: async () => (await env.UPLOAD_LIMIT.limit({ key: email })).success,
    saveAvatar: async (type, bytes) => {
      await env.FILES.put(`avatars/${email}`, bytes, { httpMetadata: { contentType: type } });
      const v = Date.now();
      await env.DB.prepare(`UPDATE users SET avatar = ? WHERE email = ?`).bind(v, email).run();
      return v;
    },
    setRoomIcon: (roomId, img) => setRoomIcon(env, roomId, img),
    connections: connOps(env, ctx, email, new URL(req0.url).origin, track),
  };
}
