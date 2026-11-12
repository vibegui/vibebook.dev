// Typed application routes (M2): validated Hono handlers chained into one app whose type (AppType) the Svelte client
// consumes through hc<AppType> (svelte/lib/client/api.ts, import type only: no backend code reaches the browser).
// The vanilla app calls the same paths with the same payloads. Routes move here slice by slice
// (docs/svelte-migration/api-coverage.md); index.ts mounts this app after its auth middleware.
//
// Handlers never touch c.env: they get ApiServices (src/services.ts, built per request by index.ts for the signed-in
// person), whose types are plain wire types. So AppType's declaration (.api-types, `bun run build:api-types`) stays free
// of Worker and Cloudflare types, and every response is checked against its shared schema type with `satisfies`, so a
// handler and the schema the client validates with can't drift apart.
import { Hono } from "hono";
import { validator } from "hono/validator";
import type * as z from "zod/mini";
import {
  ArchiveBody,
  type ErrorBody,
  type OkResult,
  PostMessageBody,
  type PostMessageResult,
  PushSubscribeBody,
  type PushKeyResult,
  type PushTestResult,
  PushUnsubscribeBody,
  ResolveWaitBody,
  RoomOrderBody,
  TINTS,
  TintBody,
  UploadHeaders,
  type UploadFileResult,
} from "../shared/schemas";

export type Bind = string | number | null;
/** What the typed routes may do, bound to the signed-in person. Authorization stays in each route (isMember). */
export interface ApiServices {
  /** Is the signed-in person a member of this room? */
  isMember(roomId: string): Promise<boolean>;
  humanPost(roomId: string, text: string, thread: string): Promise<PostMessageResult>;
  /** Validates type/size/secrets and stores the file; throws an Error whose message is user-facing. */
  storeFile(roomId: string, type: string, body: ArrayBuffer, name: string): Promise<UploadFileResult>;
  fileTypes: readonly string[];
  maxBytes(type: string): number;
  sizeError(type: string): string;
  typesError: string;
  /** One D1 statement / one statement run for several rows (a batch). */
  sql(query: string, ...binds: Bind[]): Promise<void>;
  sqlBatch(query: string, rows: Bind[][]): Promise<void>;
  /** First-party analytics for the signed-in person (runs after the response). */
  track(name: string, dims?: Record<string, string | number | boolean | undefined>): void;
  /** Tell the person's other tabs and devices to refetch /api/me (after the response). */
  pokeMe(): void;
  vapidKey: string | null;
  pushToMe(p: { title: string; body: string; url: string; tag: string }): Promise<number>;
}
export type ApiCtx = { Variables: { email: string; svc: ApiServices } };

/** A JSON body checked against its shared schema; anything else is a 400 { error } before the handler runs. */
const body = <S extends z.ZodMiniType>(schema: S, error = "bad request") =>
  validator("json", (value, c) => {
    const r = schema.safeParse(value);
    return r.success ? (r.data as z.output<S>) : c.json({ error } satisfies ErrorBody, 400);
  });
const ok = { ok: true as const } satisfies OkResult;
const forbidden = { error: "forbidden" } satisfies ErrorBody;

const roomPosts = new Hono<ApiCtx>()
  .post(
    "/api/books/:id/post",
    validator("json", (value, c) => {
      const r = PostMessageBody.safeParse(value);
      return r.success ? r.data : c.json({ ok: false as const, error: "invalid message payload" } satisfies PostMessageResult, 400);
    }),
    async (c) => {
      const svc = c.get("svc"), id = c.req.param("id");
      if (!(await svc.isMember(id))) return c.json({ ok: false as const, error: "forbidden" } satisfies PostMessageResult, 403);
      const { text, thread } = c.req.valid("json");
      const out = await svc.humanPost(id, text, thread || "main");
      if (!out.ok) return c.json({ ok: false as const, error: out.error } satisfies PostMessageResult, 400);
      svc.track("home_route_sent", { book: id, epic: out.thread !== "main" });
      return c.json({ ok: true as const, id: out.id, thread: out.thread } satisfies PostMessageResult, 200);
    },
  )
  // Binary upload: the body is the file; headers carry its type and name. Stored in R2 under <book>/<file> (rooms.ts).
  .post(
    "/api/books/:id/files",
    validator("header", (value, c) => {
      const r = UploadHeaders.safeParse(value);
      return r.success ? r.data : c.json({ error: c.get("svc").typesError } satisfies ErrorBody, 415);
    }),
    async (c) => {
      const svc = c.get("svc"), id = c.req.param("id");
      if (!(await svc.isMember(id))) return c.json(forbidden, 403);
      const h = c.req.valid("header");
      const type = h["content-type"].split(";")[0].trim().toLowerCase();
      if (!svc.fileTypes.includes(type)) return c.json({ error: svc.typesError } satisfies ErrorBody, 415);
      if (Number(c.req.header("content-length") ?? 0) > svc.maxBytes(type)) return c.json({ error: svc.sizeError(type) } satisfies ErrorBody, 413);
      try {
        const meta = await svc.storeFile(id, type, await c.req.arrayBuffer(), decodeURIComponent(h["x-filename"] ?? ""));
        svc.track("file_uploaded", { book: id, type, size: meta.size });
        return c.json(meta satisfies UploadFileResult, 200);
      } catch (e) {
        return c.json({ error: e instanceof Error ? e.message : String(e) } satisfies ErrorBody, 400);
      }
    },
  );

export const api = roomPosts
  // Native notifications: this device's push subscription (the app's 🔔). One row per endpoint.
  .get("/api/push/key", (c) => c.json({ key: c.get("svc").vapidKey } satisfies PushKeyResult, 200))
  .post("/api/push/subscribe", body(PushSubscribeBody, "bad subscription"), async (c) => {
    const b = c.req.valid("json"), svc = c.get("svc");
    await svc.sql(`INSERT OR REPLACE INTO push_subs (endpoint, email, p256dh, auth, ua, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      b.endpoint, c.get("email"), b.p256dh.slice(0, 200), b.auth.slice(0, 100), (c.req.header("user-agent") ?? "").slice(0, 200), Date.now());
    svc.track("push_subscribed");
    return c.json(ok, 200);
  })
  .post("/api/push/unsubscribe", body(PushUnsubscribeBody), async (c) => {
    await c.get("svc").sql(`DELETE FROM push_subs WHERE endpoint = ? AND email = ?`, c.req.valid("json").endpoint ?? "", c.get("email"));
    return c.json(ok, 200);
  })
  .post("/api/push/test", async (c) => {
    const sent = await c.get("svc").pushToMe({ title: "vibebook", body: "Notificações ligadas neste aparelho ✓", url: "/app", tag: "test" });
    return c.json({ ok: true as const, sent } satisfies PushTestResult, 200);
  })
  // ✓ on a wait: "I answered elsewhere / not for me" (asks only).
  .post("/api/waits/resolve", body(ResolveWaitBody), async (c) => {
    const { book_id, ref } = c.req.valid("json"), svc = c.get("svc");
    await svc.sql(`DELETE FROM waits WHERE book_id = ? AND ref = ? AND email = ?`, book_id, ref, c.get("email"));
    svc.pokeMe(); // your other tabs and devices
    svc.track("wait_resolved", { book: book_id });
    return c.json(ok, 200);
  })
  // The rail's order, per person (drag a tile).
  .post("/api/rooms/order", body(RoomOrderBody), async (c) => {
    const list = c.req.valid("json").ids.filter((x): x is string => typeof x === "string").slice(0, 300);
    if (!list.length) return c.json({ error: "ids required" } satisfies ErrorBody, 400);
    const email = c.get("email");
    await c.get("svc").sqlBatch(`UPDATE members SET position = ? WHERE book_id = ? AND email = ?`, list.map((id, i) => [i, id, email]));
    return c.json(ok, 200);
  })
  // A room's color on your rail (yours only).
  .post("/api/books/:id/tint", body(TintBody), async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const { tint } = c.req.valid("json");
    const known = (TINTS as readonly string[]).includes(tint ?? "");
    await svc.sql(`UPDATE members SET tint = ? WHERE book_id = ? AND email = ?`, known ? tint ?? null : null, id, c.get("email"));
    return c.json(ok, 200);
  })
  // Archive is per person; archived: false restores.
  .post("/api/books/:id/archive", body(ArchiveBody), async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const { archived } = c.req.valid("json");
    await svc.sql(`UPDATE members SET archived_at = ? WHERE book_id = ? AND email = ?`, archived === false ? null : Date.now(), id, c.get("email"));
    svc.track(archived === false ? "book_restored" : "book_archived", { book: id });
    return c.json(ok, 200);
  });

export type AppType = typeof api;
