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
import * as zm from "zod/mini";
import { validator } from "hono/validator";
import type * as z from "zod/mini";
import {
  type AccessRequestResult,
  type AccessResult,
  ClaudeToggleBody,
  type ClaudeToggleResult,
  DecideRequestBody,
  ArchiveBody,
  ArchivedRoom,
  type ArchivedResult,
  EmailBody,
  LoginsResult,
  type SearchResult,
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
  /** Rows of one query, as the database returns them (routes parse them with a schema before answering). */
  sqlAll(query: string, ...binds: Bind[]): Promise<unknown[]>;
  /** Search the person's rooms (rate-limited per person: false = over the limit). */
  search(q: string): Promise<SearchResult | false>;
  loginProviders: { google: boolean; github: boolean };
  isEmail(s: string): boolean;
  befriend(email: string): Promise<void>;
  invite(roomId: string, email: string): Promise<void>;
  /** Remove someone from a room: the owner can't be removed; only the owner removes someone who already joined. */
  removeMember(roomId: string, email: string): Promise<{ error: string; status: 400 | 403 } | null>;
  /** Tell the person's tabs to refetch this room's agents (after the response). */
  pokeAgents(roomId: string): void;
  /** Ask to join a room: unknown room, already a member, over the rate limit, or asked (the owner is told once). */
  requestAccess(roomId: string): Promise<"not_found" | "member" | "limited" | "asked">;
  /** A member approves (invites) or denies a pending request; false = no such pending request. */
  decideRequest(roomId: string, email: string, ok: boolean): Promise<boolean>;
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

// Slice 3: account and room lists.
export const accountApi = api
  .get("/api/archived", async (c) => {
    const rows = await c.get("svc").sqlAll(
      `SELECT b.id, b.title, b.folder, b.summary, b.updated_at, m.archived_at,
         (SELECT group_concat(email) FROM members m2 WHERE m2.book_id = b.id) AS members
       FROM books b JOIN members m ON m.book_id = b.id
       WHERE m.email = ? AND m.archived_at IS NOT NULL ORDER BY m.archived_at DESC`,
      c.get("email"),
    );
    return c.json({ books: zm.array(ArchivedRoom).parse(rows) } satisfies ArchivedResult, 200);
  })
  .get("/api/search", async (c) => {
    const q = (c.req.query("q") ?? "").trim().slice(0, 120);
    const none: SearchResult = { rooms: 0, epics: [], messages: [] }; // typed, so both answers are one SearchResult
    if (q.length < 2) return c.json(none, 200);
    const out = await c.get("svc").search(q);
    if (!out) return c.json({ error: "rate limited" } satisfies ErrorBody, 429);
    return c.json(out satisfies SearchResult, 200);
  })
  .get("/api/me/logins", async (c) => {
    const svc = c.get("svc");
    const rows = await svc.sqlAll(`SELECT COALESCE(json_extract(dims, '$.method'), 'email') AS method, MAX(ts) AS last, COUNT(*) AS n FROM events WHERE user = ? AND name = 'login' GROUP BY 1`, c.get("email"));
    return c.json(LoginsResult.parse({ logins: rows, providers: svc.loginProviders }) satisfies LoginsResult, 200);
  })
  .post("/api/friends", body(EmailBody, "invalid email"), async (c) => {
    const svc = c.get("svc"), who = c.req.valid("json").email.trim().toLowerCase();
    if (!svc.isEmail(who) || who === c.get("email")) return c.json({ error: "invalid email" } satisfies ErrorBody, 400);
    await svc.befriend(who);
    return c.json(ok, 200);
  })
  .delete("/api/friends/:email", async (c) => {
    const me = c.get("email"), who = decodeURIComponent(c.req.param("email")).toLowerCase();
    await c.get("svc").sql(`DELETE FROM friends WHERE (a = ? AND b = ?) OR (a = ? AND b = ?)`, me, who, who, me);
    return c.json(ok, 200);
  })
  .post("/api/books/:id/members", body(EmailBody, "invalid email"), async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const who = c.req.valid("json").email.trim().toLowerCase();
    if (!svc.isEmail(who)) return c.json({ error: "invalid email" } satisfies ErrorBody, 400);
    await svc.invite(id, who);
    return c.json(ok, 200);
  })
  .delete("/api/books/:id/members/:email", async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const no = await svc.removeMember(id, decodeURIComponent(c.req.param("email")).toLowerCase());
    if (no?.status === 400) return c.json({ error: no.error } satisfies ErrorBody, 400);
    if (no) return c.json({ error: no.error } satisfies ErrorBody, 403);
    return c.json(ok, 200);
  });

// Slice 4: "Ligar Claude" and access requests.
export const roomApi = accountApi
  .post("/api/books/:id/claude", body(ClaudeToggleBody), async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const on = !!c.req.valid("json").on;
    await svc.sql(`UPDATE members SET claude_on = ? WHERE book_id = ? AND email = ?`, on ? 1 : 0, id, c.get("email"));
    svc.pokeAgents(id);
    svc.track(on ? "claude_on" : "claude_off", { book: id });
    return c.json({ ok: true as const, claude_on: on } satisfies ClaudeToggleResult, 200);
  })
  .post("/api/books/:id/request", async (c) => {
    const r = await c.get("svc").requestAccess(c.req.param("id"));
    if (r === "not_found") return c.json({ error: "not found" } satisfies ErrorBody, 404);
    if (r === "limited") return c.json({ error: "rate limited" } satisfies ErrorBody, 429);
    const out: AccessRequestResult = r === "member" ? { ok: true, member: true } : { ok: true };
    return c.json(out, 200);
  })
  .post("/api/books/:id/requests", body(DecideRequestBody), async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const { email, ok: approve } = c.req.valid("json");
    if (!(await svc.decideRequest(id, email.toLowerCase(), approve))) return c.json({ error: "no such request" } satisfies ErrorBody, 404);
    svc.track(approve ? "access_approved" : "access_denied", { book: id });
    return c.json(ok, 200);
  })
  .get("/api/books/:id/access", async (c) => c.json({ member: await c.get("svc").isMember(c.req.param("id")) } satisfies AccessResult, 200));

export type AppType = typeof roomApi;
