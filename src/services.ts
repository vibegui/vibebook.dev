// The services the typed routes (src/api.ts) get, built per request from the Worker's bindings for the signed-in
// person. This is the one place that knows both Env and ApiServices; the routes and their browser-facing types don't.
import type { ApiServices } from "./api";
import type { Env } from "./index";
import { poke } from "./person";
import { bookStub, FILE_TYPES, isMember, maxBytes, sizeError, storeFile, TYPES_ERROR } from "./rooms";
import { track } from "./track";
import { pushTo } from "./webpush";

export function services(env: Env, ctx: { waitUntil(p: Promise<unknown>): void }, email: string): ApiServices {
  return {
    isMember: (roomId) => isMember(env.DB, roomId, email),
    humanPost: (roomId, text, thread) => bookStub(env, roomId).humanPost(roomId, email, text, thread),
    storeFile: (roomId, type, body, name) => storeFile(env, roomId, email, type, body, name),
    fileTypes: FILE_TYPES,
    maxBytes,
    sizeError,
    typesError: TYPES_ERROR,
    sql: async (query, ...binds) => { await env.DB.prepare(query).bind(...binds).run(); },
    sqlBatch: async (query, rows) => { const st = env.DB.prepare(query); await env.DB.batch(rows.map((r) => st.bind(...r))); },
    track: (name, dims) => ctx.waitUntil(track(env, name, { user: email, ...(dims ? { dims } : {}) })),
    pokeMe: () => ctx.waitUntil(poke(env, [email], { t: "me" })),
    vapidKey: env.VAPID_PUBLIC_KEY ?? null,
    pushToMe: (p) => pushTo(env, [email], p),
  };
}
