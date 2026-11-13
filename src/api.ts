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
  CreateSandboxBody,
  ConnectionCallBody,
  type ConnectionCallResult,
  ConnectionContextBody,
  type ConnectionError,
  type ConnectionsResult,
  ConnectionUiQuery,
  type ConnectionUiResult,
  CreateConnectionBody,
  type CreateConnectionResult,
  type MeResult,
  AVATAR_TYPES,
  type AvatarResult,
  ImageHeaders,
  type RoomIconResult,
  type RefreshConnectionResult,
  type CreateSandboxResult,
  type SandboxesResult,
  type SandboxSetupResult,
  type SandboxTerminalResult,
  AgentDbRow,
  AgentLimits,
  type AgentsResult,
  RoomSandbox,
  ClaudeTokenBody,
  type ConnectedResult,
  FreestyleKeyBody,
  CreateRoomBody,
  type CreateRoomResult,
  RouteResult,
  SetNameBody,
  type SetNameResult,
  StartRoomResult,
  TextBody,
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
  type AuthProviders,
  type LoginContext,
  LoginContextQuery,
  EmailVerifyBody,
  type EmailVerifyResult,
  type AccessContext,
  type AgentGrantsResult,
  RevokeAgentsBody,
  type RevokeAgentsResult,
  type ConsentContext,
  type ConsentError,
  type RouterStats,
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
  createRoom(title?: string): Promise<string>;
  /** One model call turns "what and with whom" into a room + invites; false = over the AI limit. */
  startRoom(text: string): Promise<unknown | false>;
  /** The home box: which room/epic this text belongs to; false = over the AI limit; throws when the model fails. */
  routeHome(text: string): Promise<unknown | false>;
  /** The request came from our own pages (no Origin, or ours). */
  sameOrigin: boolean;
  /** Per-person rate limit for pasting secrets (LOGIN_LIMIT): false = over it. */
  allowSecretTry(key: string): Promise<boolean>;
  /** Seal and keep one of the person's secrets (replaces the old one). */
  saveSecret(table: "freestyle_keys" | "claude_tokens", value: string): Promise<void>;
  /** Ask freestyle whether this API key works: null = it does, else freestyle's reason. */
  checkFreestyleKey(key: string): Promise<string | null>;
  /** How recent a listener's last call must be to count as listening (ms). */
  listenFresh: number;
  /** The signed-in person's own sandboxes (by id + email); room membership is checked by the route. */
  sandboxes: {
    list(roomId: string): Promise<SandboxesResult>;
    /** Throws an Error whose message is user-facing. */
    create(roomId: string, name: string): Promise<{ id: string; vm_id: string; name: string }>;
    /** null = done; "not_found"; else freestyle's error. */
    power(sid: string, act: "pause" | "start"): Promise<string | null>;
    /** Throws freestyle's error. */
    setup(sid: string): Promise<SandboxSetupResult>;
    /** false = no such sandbox of yours. */
    remove(sid: string): Promise<boolean>;
    /** null = no such sandbox of yours; throws freestyle's error. */
    terminal(sid: string): Promise<SandboxTerminalResult | null>;
  };
  /** The home and rail's one read: your rooms, friends and waits, plus the app shell's version. */
  me(): Promise<MeResult>;
  /** Per-person upload rate limit (UPLOAD_LIMIT): false = over it. */
  allowUpload(): Promise<boolean>;
  /** Store your profile picture (R2 avatars/<email>); returns its new version. */
  saveAvatar(type: string, bytes: ArrayBuffer): Promise<number>;
  /** Set (or with null remove) a room's icon; returns its version or null. Throws a user-facing Error. */
  setRoomIcon(roomId: string, img: { type: string; body: ArrayBuffer } | null): Promise<number | null>;
  /** The room's MCP connections as this person sees them (src/mcpconn.ts connOps); membership is checked by the route. */
  connections: {
    list(roomId: string): Promise<ConnectionsResult>;
    create(roomId: string, b: CreateConnectionBody): Promise<CreateConnectionResult | ConnFail>;
    remove(roomId: string, cid: string): Promise<OkResult | ConnFail>;
    refresh(roomId: string, cid: string): Promise<RefreshConnectionResult | ConnFail>;
    ui(roomId: string, cid: string, tool: string): Promise<ConnectionUiResult | ConnFail>;
    call(roomId: string, cid: string, name: string, args: unknown): Promise<ConnectionCallResult | ConnFail>;
    context(roomId: string, cid: string, tool: string, text: string): Promise<OkResult | ConnFail>;
    signout(roomId: string, cid: string): Promise<OkResult | ConnFail>;
  };
  /** Your Claudes' OAuth grants (src/connect.ts grantOps): list them, revoke some (at most 100 per call). */
  grants: { list(): Promise<AgentGrantsResult>; revoke(ids: string[]): Promise<number> };
  /** The consent page's context for this request's /authorize query (src/connect.ts consentContext); headers carry the
   *  consent transaction's binding cookie. */
  /** The hub router's A/B for this person (src/router.ts), all rooms or one. */
  routerStats(roomId?: string): Promise<RouterStats>;
  consentContext(): Promise<{ context: ConsentContext; headers: [string, string][] } | (ConsentError & { status: 400 })>;
}
/** A failed connection call and its status; sign_in = sign in on that server first (401). */
export type ConnFail = { error: string; status: 400 | 401 | 404 | 429 | 502; sign_in?: true };
export type ApiCtx = { Variables: { email: string; svc: ApiServices } };

/** The public /auth routes' side (src/auth.ts authServices): no session needed, so it is its own app, mounted before
 *  the Worker's sign-in middleware. Same checks as before the move: origin, rate limits, code hash, attempts. */
export interface AuthServices {
  providers: AuthProviders;
  sameOrigin: boolean;
  /** Where to go after login: a same-site app path, else /app. */
  safeNext(next: string | undefined): string;
  /** /login plus a query, in the UI (?ui=svelte) that `next` carries. */
  loginUrl(next: string | undefined, query: string): string;
  emailStart(email: string): Promise<OkResult | AuthFail>;
  emailVerify(body: EmailVerifyBody): Promise<EmailVerifyResult | AuthFail>;
  /** Drop this browser's session cookie. */
  logout(): void;
  /** Sign out every browser of the signed-in person. */
  logoutAll(): Promise<OkResult | AuthFail>;
  /** Where the caller (signed in or not) stands with a room, from its link: the access page's context. */
  roomAccess(roomId: string): Promise<AccessContext>;
}
export type AuthFail = { error: string; status: 400 | 401 | 403 | 429 | 502 };
export type AuthCtx = { Variables: { auth: AuthServices } };

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
      // The validator's context is untyped: name the services' type so the 415 body stays { error: string }.
      const svc: ApiServices = c.get("svc");
      return r.success ? r.data : c.json({ error: svc.typesError } satisfies ErrorBody, 415);
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

// Slice 5: your name, new rooms and the home's router. Model answers are parsed with their schema before they leave.
export const homeApi = roomApi
  .post("/api/me", body(SetNameBody), async (c) => {
    const clean = (c.req.valid("json").name ?? "").replace(/[<>"@\p{Cc}]/gu, "").replace(/\s+/g, " ").trim().slice(0, 60);
    if (!clean) return c.json({ error: "Nome vazio." } satisfies ErrorBody, 400);
    await c.get("svc").sql(`UPDATE users SET name = ? WHERE email = ?`, clean, c.get("email"));
    return c.json({ ok: true as const, name: clean } satisfies SetNameResult, 200);
  })
  .post("/api/books", body(CreateRoomBody), async (c) => {
    const svc = c.get("svc"), id = await svc.createRoom(c.req.valid("json").title);
    svc.track("book_created", { book: id });
    return c.json({ id } satisfies CreateRoomResult, 200);
  })
  .post("/api/books/start", body(TextBody), async (c) => {
    const text = (c.req.valid("json").text ?? "").trim();
    if (!text) return c.json({ error: "Escreva o que é e com quem." } satisfies ErrorBody, 400);
    const out = await c.get("svc").startRoom(text);
    if (out === false) return c.json({ error: "Muitos pedidos seguidos. Espera um minuto." } satisfies ErrorBody, 429);
    return c.json(StartRoomResult.parse(out) satisfies StartRoomResult, 200);
  })
  .post("/api/route", body(TextBody), async (c) => {
    const svc = c.get("svc");
    if (!svc.sameOrigin) return c.json({ error: "bad origin" } satisfies ErrorBody, 403);
    const text = (c.req.valid("json").text ?? "").trim();
    if (!text) return c.json({ error: "Escreva alguma coisa." } satisfies ErrorBody, 400);
    try {
      const out = await svc.routeHome(text);
      if (out === false) return c.json({ error: "Muitos pedidos seguidos. Espera um minuto." } satisfies ErrorBody, 429);
      return c.json(RouteResult.parse(out) satisfies RouteResult, 200);
    } catch {
      return c.json({ error: "Não consegui sugerir agora. Escolha a sala na lista abaixo." } satisfies ErrorBody, 502);
    }
  });

// Slice 6: your freestyle.sh key and Claude subscription token (cloud agents). Only "connected" ever comes back.
const tooMany = { error: "Muitas tentativas. Espera um minuto." } satisfies ErrorBody;
export const keysApi = homeApi
  .get("/api/freestyle", async (c) => {
    const rows = await c.get("svc").sqlAll(`SELECT 1 FROM freestyle_keys WHERE email = ?`, c.get("email"));
    return c.json({ connected: rows.length > 0 } satisfies ConnectedResult, 200);
  })
  .post("/api/freestyle", body(FreestyleKeyBody), async (c) => {
    const svc = c.get("svc");
    if (!(await svc.allowSecretTry(`fs:${c.get("email")}`))) return c.json(tooMany, 429);
    const key = (c.req.valid("json").key ?? "").trim();
    if (key.length < 16 || key.length > 400) return c.json({ error: "Essa não parece uma API key do freestyle." } satisfies ErrorBody, 400);
    const refused = await svc.checkFreestyleKey(key);
    if (refused !== null) return c.json({ error: `O freestyle recusou a key: ${refused}` } satisfies ErrorBody, 400);
    await svc.saveSecret("freestyle_keys", key);
    svc.track("freestyle_connected");
    return c.json(ok, 200);
  })
  .delete("/api/freestyle", async (c) => {
    await c.get("svc").sql(`DELETE FROM freestyle_keys WHERE email = ?`, c.get("email"));
    return c.json(ok, 200);
  })
  // The person's Claude subscription token (from `claude setup-token` in their own terminal): sandboxes start logged in.
  .post("/api/claude-token", body(ClaudeTokenBody), async (c) => {
    const svc = c.get("svc");
    if (!(await svc.allowSecretTry(`ct:${c.get("email")}`))) return c.json(tooMany, 429);
    // The terminal wraps the long token over lines: copied, it comes with spaces/newlines in the middle.
    const tok = (c.req.valid("json").token ?? "").replace(/\s+/g, "");
    if (!/^sk-ant-[A-Za-z0-9_.-]{20,2000}$/.test(tok)) return c.json({ error: "Isso não parece um token do claude setup-token (começa com sk-ant-)." } satisfies ErrorBody, 400);
    await svc.saveSecret("claude_tokens", tok);
    svc.track("claude_token_saved");
    return c.json(ok, 200);
  })
  .delete("/api/claude-token", async (c) => {
    await c.get("svc").sql(`DELETE FROM claude_tokens WHERE email = ?`, c.get("email"));
    return c.json(ok, 200);
  });

// Slice 7: the room's Claudes (sessions connected to this room) and everyone's cloud sandboxes in it.
const limitsOf = (s: string | null) => {
  try {
    const r = AgentLimits.safeParse(s ? JSON.parse(s) : null);
    return r.success ? r.data : null;
  } catch {
    return null;
  }
};
export const agentsApi = keysApi.get("/api/books/:id/agents", async (c) => {
  const svc = c.get("svc"), id = c.req.param("id"), now = Date.now();
  // In parallel; your own members row is also the membership check.
  const [rows, mine, sbx] = await Promise.all([
    // Only the sessions connected to this room: listening to it (or to all their rooms), or that read/posted here in the last hour.
    svc.sqlAll(
      `SELECT a.email, coalesce(a.model, a.client) AS who, a.repo, a.seen_at, a.listening_at, a.listen_room, a.ctx_tokens, a.ctx_window, a.ctx_at, a.ctx_limits
       FROM agents a JOIN members m ON m.email = a.email AND m.book_id = ?1
       LEFT JOIN agent_reads r ON r.agent = a.id AND r.book_id = ?1
       WHERE substr(a.id, 1, 2) != 'n_' AND (((a.listen_room = ?1 OR a.listen_room IS NULL) AND a.listening_at > ?2) OR r.seen_at > ?3)
       ORDER BY a.seen_at DESC LIMIT 40`,
      id,
      now - svc.listenFresh,
      now - 3600_000,
    ),
    svc.sqlAll(`SELECT claude_on FROM members WHERE book_id = ? AND email = ?`, id, c.get("email")),
    // Everyone's cloud sandboxes in this room, as last seen by their owner's list (src/sandbox.ts): they cost money.
    svc.sqlAll(`SELECT id, email, name, state, run_s, rate, disk_rate, checked_at, created_at FROM sandboxes WHERE book_id = ? ORDER BY created_at`, id),
  ]);
  const me = mine[0] as { claude_on?: number | null } | undefined;
  if (!me) return c.json(forbidden, 403);
  const out: AgentsResult = {
    claude_on: !!me.claude_on,
    sandboxes: sbx.map((s) => RoomSandbox.parse(s)),
    agents: rows.map((row) => {
      const a = AgentDbRow.parse(row);
      return {
        email: a.email,
        who: a.who || "agent",
        repo: a.repo,
        seen_at: a.seen_at,
        listening: !!a.listening_at && now - a.listening_at < svc.listenFresh && (a.listen_room === id || !a.listen_room),
        all_rooms: !a.listen_room,
        // How full its context was at its last call (only from the CLI inside Claude Code); older than 1h = unknown.
        context: a.ctx_tokens != null && a.ctx_window && now - (a.ctx_at ?? 0) < 3600_000 ? { tokens: a.ctx_tokens, window: a.ctx_window, at: a.ctx_at, limits: limitsOf(a.ctx_limits) } : null,
      };
    }),
  };
  return c.json(out, 200);
});

// Slice 8: your cloud sandboxes (freestyle.sh). Errors keep the old shape: { error } with 400/404/502.
const notFound = { error: "not found" } satisfies ErrorBody;
const failed = (e: unknown) => ({ error: e instanceof Error ? e.message : String(e) }) satisfies ErrorBody;
const power = (act: "pause" | "start") => async (c: import("hono").Context<ApiCtx, "/api/sandboxes/:sid/pause" | "/api/sandboxes/:sid/start">) => {
  const r = await c.get("svc").sandboxes.power(c.req.param("sid"), act);
  if (r === "not_found") return c.json(notFound, 404);
  if (r !== null) return c.json({ error: r } satisfies ErrorBody, 502);
  return c.json(ok, 200);
};
export const sandboxApi = agentsApi
  .get("/api/books/:id/sandboxes", async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    return c.json((await svc.sandboxes.list(id)) satisfies SandboxesResult, 200);
  })
  .post("/api/books/:id/sandboxes", body(CreateSandboxBody), async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    try {
      const r = await svc.sandboxes.create(id, c.req.valid("json").name ?? "");
      return c.json({ ok: true as const, ...r } satisfies CreateSandboxResult, 200);
    } catch (e) {
      return c.json(failed(e), 400);
    }
  })
  .post("/api/sandboxes/:sid/pause", (c) => power("pause")(c))
  .post("/api/sandboxes/:sid/start", (c) => power("start")(c))
  .post("/api/sandboxes/:sid/setup", async (c) => {
    try {
      return c.json((await c.get("svc").sandboxes.setup(c.req.param("sid"))) satisfies SandboxSetupResult, 200);
    } catch (e) {
      return c.json(failed(e), 502);
    }
  })
  .delete("/api/sandboxes/:sid", async (c) => {
    if (!(await c.get("svc").sandboxes.remove(c.req.param("sid")))) return c.json(notFound, 404);
    return c.json(ok, 200);
  })
  .post("/api/sandboxes/:sid/terminal", async (c) => {
    try {
      const t = await c.get("svc").sandboxes.terminal(c.req.param("sid"));
      return t ? c.json(t satisfies SandboxTerminalResult, 200) : c.json(notFound, 404);
    } catch (e) {
      return c.json(failed(e), 502);
    }
  });

// Slice 9: the room's MCP connections. Sign-in and its OAuth callback stay browser redirects (src/mcpconn.ts).
const connFail = (r: ConnFail) => ({ error: r.error, ...(r.sign_in ? { sign_in: true as const } : {}) }) satisfies ConnectionError;
const uiQuery = validator("query", (value, c) => {
  const r = ConnectionUiQuery.safeParse(value);
  return r.success ? r.data : c.json({ error: "bad request" } satisfies ErrorBody, 400);
});
export const connectionsApi = sandboxApi
  .get("/api/books/:id/connections", async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    return c.json((await svc.connections.list(id)) satisfies ConnectionsResult, 200);
  })
  .post("/api/books/:id/connections", body(CreateConnectionBody), async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const r = await svc.connections.create(id, c.req.valid("json"));
    return "error" in r ? c.json(connFail(r), r.status) : c.json(r satisfies CreateConnectionResult, 200);
  })
  .delete("/api/books/:id/connections/:cid", async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const r = await svc.connections.remove(id, c.req.param("cid"));
    return "error" in r ? c.json(connFail(r), r.status) : c.json(ok, 200);
  })
  .post("/api/books/:id/connections/:cid/refresh", async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const r = await svc.connections.refresh(id, c.req.param("cid"));
    return "error" in r ? c.json(connFail(r), r.status) : c.json(r satisfies RefreshConnectionResult, 200);
  })
  .get("/api/books/:id/connections/:cid/ui", uiQuery, async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const r = await svc.connections.ui(id, c.req.param("cid"), c.req.valid("query").tool ?? "");
    return "error" in r ? c.json(connFail(r), r.status) : c.json(r satisfies ConnectionUiResult, 200);
  })
  .post("/api/books/:id/connections/:cid/call", body(ConnectionCallBody), async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const b = c.req.valid("json");
    const r = await svc.connections.call(id, c.req.param("cid"), b.name ?? "", b.arguments);
    return "error" in r ? c.json(connFail(r), r.status) : c.json(r satisfies ConnectionCallResult, 200);
  })
  .post("/api/books/:id/connections/:cid/context", body(ConnectionContextBody), async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const b = c.req.valid("json");
    const r = await svc.connections.context(id, c.req.param("cid"), (b.tool ?? "").slice(0, 100), (b.text ?? "").slice(0, 4000));
    return "error" in r ? c.json(connFail(r), r.status) : c.json(ok, 200);
  })
  .post("/api/books/:id/connections/:cid/signout", async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    const r = await svc.connections.signout(id, c.req.param("cid"));
    return "error" in r ? c.json(connFail(r), r.status) : c.json(ok, 200);
  });

// Slice 10: GET /api/me (POST /api/me, your name, is slice 5).
export const meApi = connectionsApi.get("/api/me", async (c) => c.json((await c.get("svc").me()) satisfies MeResult, 200));

// Slice 11: the profile picture and the room icon, raw image bytes (the app resizes them first). Same-origin only.
const imageHeaders = validator("header", (value, c) => {
  const r = ImageHeaders.safeParse(value);
  return r.success ? r.data : c.json({ error: "bad request" } satisfies ErrorBody, 400);
});
const mediaType = (h: { "content-type"?: string }) => (h["content-type"] ?? "").split(";")[0].trim().toLowerCase();
const slowDown = { error: "Muitos uploads. Espera um minuto." } satisfies ErrorBody;
export const uploadsApi = meApi
  .post("/api/me/avatar", imageHeaders, async (c) => {
    const svc = c.get("svc");
    if (!svc.sameOrigin) return c.json({ error: "bad origin" } satisfies ErrorBody, 403);
    const type = mediaType(c.req.valid("header"));
    if (!AVATAR_TYPES.includes(type)) return c.json({ error: "Use uma imagem PNG, JPEG ou WebP." } satisfies ErrorBody, 415);
    const bytes = await c.req.arrayBuffer();
    if (!bytes.byteLength || bytes.byteLength > 1_000_000) return c.json({ error: "Imagem vazia ou maior que 1MB." } satisfies ErrorBody, 413);
    if (!(await svc.allowUpload())) return c.json(slowDown, 429);
    const avatar = await svc.saveAvatar(type, bytes);
    svc.track("avatar_set");
    return c.json({ ok: true as const, avatar } satisfies AvatarResult, 200);
  })
  .post("/api/books/:id/icon", imageHeaders, async (c) => {
    const svc = c.get("svc"), id = c.req.param("id");
    if (!svc.sameOrigin) return c.json({ error: "bad origin" } satisfies ErrorBody, 403);
    if (!(await svc.isMember(id))) return c.json(forbidden, 403);
    if (!(await svc.allowUpload())) return c.json(slowDown, 429);
    const type = mediaType(c.req.valid("header"));
    try {
      // A JSON body removes the icon; anything else is the image (setRoomIcon checks type and size).
      const icon = await svc.setRoomIcon(id, type === "application/json" ? null : { type, body: await c.req.arrayBuffer() });
      svc.track("room_icon", { book: id, set: icon !== null });
      return c.json({ ok: true as const, icon } satisfies RoomIconResult, 200);
    } catch (e) {
      return c.json(failed(e), 400);
    }
  })
  // Slice 13: your connected Claudes (OAuth grants), moved from src/connect.ts.
  .get("/api/agents", async (c) => c.json((await c.get("svc").grants.list()) satisfies AgentGrantsResult, 200))
  .post("/api/agents/revoke", body(RevokeAgentsBody, "ids must be a list"), async (c) => {
    const svc = c.get("svc");
    if (!svc.sameOrigin) return c.json({ error: "bad origin" } satisfies ErrorBody, 403);
    const removed = await svc.grants.revoke(c.req.valid("json").ids);
    return c.json({ ok: true as const, removed } satisfies RevokeAgentsResult, 200);
  })
  .delete("/api/agents/:id", async (c) => {
    const svc = c.get("svc");
    if (!svc.sameOrigin) return c.json({ error: "bad origin" } satisfies ErrorBody, 403);
    await svc.grants.revoke([c.req.param("id")]);
    return c.json(ok, 200);
  })
  // Slice 14: the agent-connect consent page's context (the approval itself stays the form POST /authorize).
  .get("/api/authorize/context", async (c) => {
    const r = await c.get("svc").consentContext();
    if ("error" in r) return c.json({ error: r.error, ...(r.redirect_to ? { redirect_to: r.redirect_to } : {}) } satisfies ConsentError, 400);
    for (const [k, v] of r.headers) c.header(k, v, { append: k.toLowerCase() === "set-cookie" });
    return c.json(r.context satisfies ConsentContext, 200);
  })
  // The hub router's A/B (src/router.ts), for the room app apps/roteador-ab.html (vibebook_router_stats).
  .get("/api/router/stats", async (c) => {
    const svc = c.get("svc"), room = c.req.query("room") || undefined;
    if (room && !(await svc.isMember(room))) return c.json(forbidden, 403);
    return c.json((await svc.routerStats(room)) satisfies RouterStats, 200);
  });

export type AppType = typeof uploadsApi;

const authFail = (f: AuthFail) => ({ error: f.error }) satisfies ErrorBody;
const badOrigin = { error: "bad origin" } satisfies ErrorBody;
/** Public auth routes (the login page, the consent page's sign-out). index.ts mounts them before its sign-in check. */
export const authApi = new Hono<AuthCtx>()
  .get("/auth/providers", (c) => c.json(c.get("auth").providers satisfies AuthProviders, 200))
  .get(
    "/auth/context",
    validator("query", (value, c) => {
      const r = LoginContextQuery.safeParse(value);
      return r.success ? r.data : c.json({ error: "bad request" } satisfies ErrorBody, 400);
    }),
    (c) => {
      const auth = c.get("auth"), q = c.req.valid("query");
      const error = q.error === "google" || q.error === "github" ? q.error : null;
      return c.json({ providers: auth.providers, next: auth.safeNext(q.next), error } satisfies LoginContext, 200);
    },
  )
  .get("/auth/room/:id", async (c) => c.json((await c.get("auth").roomAccess(c.req.param("id"))) satisfies AccessContext, 200))
  .post("/auth/email/start", body(EmailBody, "invalid email"), async (c) => {
    const auth = c.get("auth");
    if (!auth.sameOrigin) return c.json(badOrigin, 403);
    const r = await auth.emailStart(c.req.valid("json").email);
    return "error" in r ? c.json(authFail(r), r.status) : c.json(r satisfies OkResult, 200);
  })
  .post("/auth/email/verify", body(EmailVerifyBody), async (c) => {
    const auth = c.get("auth");
    if (!auth.sameOrigin) return c.json(badOrigin, 403);
    const r = await auth.emailVerify(c.req.valid("json"));
    return "error" in r ? c.json(authFail(r), r.status) : c.json(r satisfies EmailVerifyResult, 200);
  })
  .post("/auth/logout", async (c) => {
    const auth = c.get("auth");
    auth.logout();
    // A form post (the consent page's "Not you?") signs out and goes back to the login with where it came from.
    if (!c.req.header("content-type")?.includes("form")) return c.json(ok, 200);
    const next = auth.safeNext(String((await c.req.parseBody()).next ?? ""));
    return c.redirect(auth.loginUrl(next, `?next=${encodeURIComponent(next)}`), 303);
  })
  .post("/auth/logout-all", async (c) => {
    const auth = c.get("auth");
    if (!auth.sameOrigin) return c.json(badOrigin, 403);
    const r = await auth.logoutAll();
    return "error" in r ? c.json(authFail(r), r.status) : c.json(r satisfies OkResult, 200);
  });
export type AuthAppType = typeof authApi;
