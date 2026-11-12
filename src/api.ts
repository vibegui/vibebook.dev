// Typed application routes (M2): validated Hono handlers chained into one app whose type (AppType) the Svelte client
// consumes through hc<AppType> (svelte/lib/client/api.ts, import type only: no backend code reaches the browser).
// The vanilla app calls the same paths with the same payloads. Routes move here slice by slice
// (docs/svelte-migration/api-coverage.md); index.ts mounts this app after its auth middleware.
import { Hono } from "hono";
import { validator } from "hono/validator";
import type * as z from "zod/mini";
import { ArchiveBody, PostMessageBody, PushSubscribeBody, PushUnsubscribeBody, ResolveWaitBody, RoomOrderBody, TINTS, TintBody, UploadHeaders } from "../shared/schemas";
import { poke } from "./person";
import { pushTo } from "./webpush";
import type { Env } from "./index";
import { bookStub, FILE_TYPES, isMember, maxBytes, sizeError, storeFile, TYPES_ERROR } from "./rooms";
import { track } from "./track";

// The route types the browser sees carry only what's on the wire: no Worker bindings in AppType, so its declaration
// (.api-types, `bun run build:api-types`) doesn't drag the backend and its Cloudflare types into the browser program.
// Handlers reach the bindings through this one accessor instead of c.env.
export type ApiCtx = { Variables: { email: string } };
const bindings = (c: { env: unknown }): Env => c.env as Env; // the Worker always runs these routes with its Env
const waitUntil = (c: { executionCtx: { waitUntil(p: Promise<unknown>): void } }, p: Promise<unknown>) => c.executionCtx.waitUntil(p);

/** A JSON body checked against its shared schema; anything else is a 400 { error } before the handler runs. */
const body = <S extends z.ZodMiniType>(schema: S, error = "bad request") =>
  validator("json", (value, c) => {
    const r = schema.safeParse(value);
    return r.success ? (r.data as z.output<S>) : c.json({ error }, 400);
  });
const member = async (c: { env: unknown; req: { param(k: "id"): string }; get(k: "email"): string }) => isMember(bindings(c).DB, c.req.param("id"), c.get("email"));

const roomPosts = new Hono<ApiCtx>()
  .post(
    "/api/books/:id/post",
    validator("json", (value, c) => {
      const r = PostMessageBody.safeParse(value);
      return r.success ? r.data : c.json({ ok: false as const, error: "invalid message payload" }, 400);
    }),
    async (c) => {
      const email = c.get("email");
      const id = c.req.param("id");
      if (!(await isMember(bindings(c).DB, id, email))) return c.json({ ok: false as const, error: "forbidden" }, 403);
      const { text, thread } = c.req.valid("json");
      const out = await bookStub(bindings(c), id).humanPost(id, email, text, thread || "main");
      if (!out.ok) return c.json({ ok: false as const, error: out.error }, 400);
      waitUntil(c, track(bindings(c), "home_route_sent", { user: email, dims: { book: id, epic: out.thread !== "main" } }));
      return c.json({ ok: true as const, id: out.id, thread: out.thread }, 200);
    },
  )
  // Binary upload: the body is the file; headers carry its type and name. Stored in R2 under <book>/<file> (rooms.ts).
  .post(
    "/api/books/:id/files",
    validator("header", (value, c) => {
      const r = UploadHeaders.safeParse(value);
      return r.success ? r.data : c.json({ error: TYPES_ERROR }, 415);
    }),
    async (c) => {
      const email = c.get("email");
      const id = c.req.param("id");
      if (!(await isMember(bindings(c).DB, id, email))) return c.json({ error: "forbidden" }, 403);
      const h = c.req.valid("header");
      const type = h["content-type"].split(";")[0].trim().toLowerCase();
      if (!FILE_TYPES.includes(type)) return c.json({ error: TYPES_ERROR }, 415);
      if (Number(c.req.header("content-length") ?? 0) > maxBytes(type)) return c.json({ error: sizeError(type) }, 413);
      try {
        const meta = await storeFile(bindings(c), id, email, type, await c.req.arrayBuffer(), decodeURIComponent(h["x-filename"] ?? ""));
        waitUntil(c, track(bindings(c), "file_uploaded", { user: email, dims: { book: id, type, size: meta.size } }));
        return c.json(meta, 200);
      } catch (e) {
        return c.json({ error: e instanceof Error ? e.message : String(e) }, 400);
      }
    },
  );

export const api = roomPosts
  // Native notifications: this device's push subscription (the app's 🔔). One row per endpoint.
  .get("/api/push/key", (c) => c.json({ key: bindings(c).VAPID_PUBLIC_KEY ?? null }, 200))
  .post("/api/push/subscribe", body(PushSubscribeBody, "bad subscription"), async (c) => {
    const b = c.req.valid("json");
    await bindings(c).DB.prepare(`INSERT OR REPLACE INTO push_subs (endpoint, email, p256dh, auth, ua, created_at) VALUES (?, ?, ?, ?, ?, ?)`)
      .bind(b.endpoint, c.get("email"), b.p256dh.slice(0, 200), b.auth.slice(0, 100), (c.req.header("user-agent") ?? "").slice(0, 200), Date.now()).run();
    waitUntil(c, track(bindings(c), "push_subscribed", { user: c.get("email") }));
    return c.json({ ok: true as const }, 200);
  })
  .post("/api/push/unsubscribe", body(PushUnsubscribeBody), async (c) => {
    await bindings(c).DB.prepare(`DELETE FROM push_subs WHERE endpoint = ? AND email = ?`).bind(c.req.valid("json").endpoint ?? "", c.get("email")).run();
    return c.json({ ok: true as const }, 200);
  })
  .post("/api/push/test", async (c) => {
    const sent = await pushTo(bindings(c), [c.get("email")], { title: "vibebook", body: "Notificações ligadas neste aparelho ✓", url: "/app", tag: "test" });
    return c.json({ ok: true as const, sent }, 200);
  })
  // ✓ on a wait: "I answered elsewhere / not for me" (asks only).
  .post("/api/waits/resolve", body(ResolveWaitBody), async (c) => {
    const { book_id, ref } = c.req.valid("json");
    await bindings(c).DB.prepare(`DELETE FROM waits WHERE book_id = ? AND ref = ? AND email = ?`).bind(book_id, ref, c.get("email")).run();
    waitUntil(c, poke(bindings(c), [c.get("email")], { t: "me" })); // your other tabs and devices
    waitUntil(c, track(bindings(c), "wait_resolved", { user: c.get("email"), dims: { book: book_id } }));
    return c.json({ ok: true as const }, 200);
  })
  // The rail's order, per person (drag a tile).
  .post("/api/rooms/order", body(RoomOrderBody), async (c) => {
    const list = c.req.valid("json").ids.filter((x): x is string => typeof x === "string").slice(0, 300);
    if (!list.length) return c.json({ error: "ids required" }, 400);
    const st = bindings(c).DB.prepare(`UPDATE members SET position = ? WHERE book_id = ? AND email = ?`);
    await bindings(c).DB.batch(list.map((id, i) => st.bind(i, id, c.get("email"))));
    return c.json({ ok: true as const }, 200);
  })
  // A room's color on your rail (yours only).
  .post("/api/books/:id/tint", body(TintBody), async (c) => {
    if (!(await member(c))) return c.json({ error: "forbidden" }, 403);
    const { tint } = c.req.valid("json");
    const ok = (TINTS as readonly string[]).includes(tint ?? "");
    await bindings(c).DB.prepare(`UPDATE members SET tint = ? WHERE book_id = ? AND email = ?`).bind(ok ? tint : null, c.req.param("id"), c.get("email")).run();
    return c.json({ ok: true as const }, 200);
  })
  // Archive is per person; archived: false restores.
  .post("/api/books/:id/archive", body(ArchiveBody), async (c) => {
    if (!(await member(c))) return c.json({ error: "forbidden" }, 403);
    const { archived } = c.req.valid("json");
    const id = c.req.param("id"), email = c.get("email");
    await bindings(c).DB.prepare(`UPDATE members SET archived_at = ? WHERE book_id = ? AND email = ?`).bind(archived === false ? null : Date.now(), id, email).run();
    waitUntil(c, track(bindings(c), archived === false ? "book_restored" : "book_archived", { user: email, dims: { book: id } }));
    return c.json({ ok: true as const }, 200);
  });

export type AppType = typeof api;
