// The services the typed routes (src/api.ts) get, built per request from the Worker's bindings for the signed-in
// person. This is the one place that knows both Env and ApiServices; the routes and their browser-facing types don't.
import type { ApiServices } from "./api";
import type { Env } from "./index";
import { poke } from "./person";
import { EMAIL_RE } from "./auth";
import { reqLang } from "./lang";
import { befriend, bookStub, FILE_TYPES, inviteMember, isMember, maxBytes, searchRooms, sizeError, storeFile, TYPES_ERROR } from "./rooms";
import { track } from "./track";
import { pushTo } from "./webpush";

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
  };
}
