// Runtime schemas for what the browser sends the Worker (M1): the TypeScript types are derived from them, so a schema
// edit changes every consumer's type. Browser-safe: zod/mini only, no Worker or database types.
import * as z from "zod/mini";

export const PostMessageBody = z.object({
  text: z.string(),
  thread: z.optional(z.string()),
});
export type PostMessageBody = z.infer<typeof PostMessageBody>;

/** Upload headers: the file's media type and its name (URI-encoded, the vanilla app's x-filename). */
export const UploadHeaders = z.object({
  "content-type": z.string(),
  "x-filename": z.optional(z.string()),
});

// Responses the browser reads back: validated at the boundary with the same schemas the types come from.
export const PostMessageResult = z.union([
  z.object({ ok: z.literal(true), id: z.number(), thread: z.string() }),
  z.object({ ok: z.literal(false), error: z.string() }),
]);
export type PostMessageResult = z.infer<typeof PostMessageResult>;

export const SaveReminderResult = z.object({
  ok: z.boolean(),
  name: z.optional(z.string()),
  error: z.optional(z.string()),
  every: z.optional(z.nullable(z.string())),
  cron: z.optional(z.nullable(z.string())),
  timezone: z.optional(z.string()),
  next_at: z.optional(z.string()),
});
export type SaveReminderResult = z.infer<typeof SaveReminderResult>;

export const AttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  author: z.string(),
  ts: z.number(),
  embed: z.optional(z.boolean()),
});
export const UploadFileResult = z.extend(AttachmentSchema, {
  reminder: z.optional(SaveReminderResult),
});
export type UploadFileResult = z.infer<typeof UploadFileResult>;

/** Any error answer of the app's routes. */
export const ErrorBody = z.object({ error: z.string() });

// Slice 2: small account/room mutations. Lenient where the old handlers were (unknown tint → none, non-string ids dropped).
export const TINTS = [
  "blue",
  "green",
  "yellow",
  "orange",
  "pink",
  "purple",
] as const;
export const PushSubscribeBody = z.object({
  endpoint: z.string().check(z.startsWith("https://"), z.maxLength(1000)),
  p256dh: z.string().check(z.minLength(1)),
  auth: z.string().check(z.minLength(1)),
});
export const PushUnsubscribeBody = z.object({
  endpoint: z.optional(z.string()),
});
export const ResolveWaitBody = z.object({
  book_id: z.string().check(z.minLength(1)),
  ref: z.string().check(z.startsWith("m")),
});
export const RoomOrderBody = z.object({ ids: z.array(z.unknown()) });
export const TintBody = z.object({ tint: z.optional(z.nullable(z.string())) });
export const ArchiveBody = z.object({ archived: z.optional(z.boolean()) });

export const OkResult = z.object({ ok: z.literal(true) });
export type OkResult = z.infer<typeof OkResult>;
export const PushKeyResult = z.object({ key: z.nullable(z.string()) });
export type PushKeyResult = z.infer<typeof PushKeyResult>;
export const PushTestResult = z.object({
  ok: z.literal(true),
  sent: z.number(),
});
export type PushTestResult = z.infer<typeof PushTestResult>;
export type ErrorBody = z.infer<typeof ErrorBody>;

// Slice 3: account and room lists. Database rows are parsed against these before they leave the Worker.
export const EmailBody = z.object({ email: z.string() });
export const ArchivedRoom = z.object({
  id: z.string(),
  title: z.string(),
  folder: z.nullable(z.string()),
  summary: z.nullable(z.string()),
  updated_at: z.number(),
  archived_at: z.number(),
  members: z.nullable(z.string()),
});
export const ArchivedResult = z.object({ books: z.array(ArchivedRoom) });
export type ArchivedResult = z.infer<typeof ArchivedResult>;
export const SearchResult = z.object({
  rooms: z.number(),
  failed: z.optional(z.number()),
  epics: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      archived: z.boolean(),
      ts: z.number(),
      room_id: z.string(),
      room: z.string(),
    }),
  ),
  messages: z.array(
    z.object({
      id: z.number(),
      thread: z.string(),
      topic: z.nullable(z.string()),
      author: z.string(),
      by_agent: z.boolean(),
      via: z.nullable(z.string()),
      ts: z.number(),
      files: z.array(z.object({ id: z.string(), name: z.string() })),
      snippet: z.string(),
      room_id: z.string(),
      room: z.string(),
    }),
  ),
});
export type SearchResult = z.infer<typeof SearchResult>;
/** Query values remain permissive strings; the existing handler trims/slices q. */
export const SearchQuery = z.object({ q:z.optional(z.string()) });
export type SearchQuery = z.infer<typeof SearchQuery>;
export const LoginsResult = z.object({
  logins: z.array(
    z.object({ method: z.string(), last: z.number(), n: z.number() }),
  ),
  providers: z.object({ google: z.boolean(), github: z.boolean() }),
});
export type LoginsResult = z.infer<typeof LoginsResult>;

// Slice 4: the room's "Ligar Claude" toggle and access requests.
export const ClaudeToggleBody = z.object({ on: z.optional(z.boolean()) });
export const ClaudeToggleResult = z.object({
  ok: z.literal(true),
  claude_on: z.boolean(),
});
export type ClaudeToggleResult = z.infer<typeof ClaudeToggleResult>;
export const AccessRequestResult = z.object({
  ok: z.literal(true),
  member: z.optional(z.literal(true)),
});
export type AccessRequestResult = z.infer<typeof AccessRequestResult>;
export const DecideRequestBody = z.object({
  email: z.string(),
  ok: z.boolean(),
});
export const AccessResult = z.object({ member: z.boolean() });
export type AccessResult = z.infer<typeof AccessResult>;

// Slice 5: your name, new rooms and the home's router.
export const SetNameBody = z.object({ name: z.optional(z.string()) });
export const SetNameResult = z.object({
  ok: z.literal(true),
  name: z.string(),
});
export type SetNameResult = z.infer<typeof SetNameResult>;
export const CreateRoomBody = z.object({ title: z.optional(z.string()) });
export const CreateRoomResult = z.object({ id: z.string() });
export type CreateRoomResult = z.infer<typeof CreateRoomResult>;
export const TextBody = z.object({ text: z.optional(z.string()) });
export const StartRoomResult = z.object({
  id: z.string(),
  invited: z.array(z.string()),
  unknown: z.array(z.string()),
  cost: z.number(),
});
export type StartRoomResult = z.infer<typeof StartRoomResult>;
export const RoomPick = z.object({
  book_id: z.string(),
  book_title: z.string(),
  epic_id: z.nullable(z.string()),
  epic_title: z.nullable(z.string()),
});
export const RouteResult = z.object({
  pick: z.nullable(RoomPick),
  reason: z.optional(z.string()),
  alternatives: z.array(RoomPick),
  new_room_title: z.string(),
  cost: z.number(),
});
export type RouteResult = z.infer<typeof RouteResult>;

// Slice 6: the person's freestyle API key and Claude subscription token (sealed on the server, never sent back).
export const ConnectedResult = z.object({ connected: z.boolean() });
export type ConnectedResult = z.infer<typeof ConnectedResult>;
export const FreestyleKeyBody = z.object({ key: z.optional(z.string()) });
export const ClaudeTokenBody = z.object({ token: z.optional(z.string()) });

// Slice 7: a room's Claudes (people's own agents) and cloud sandboxes, for Pessoas and the ✻ pane.
const num = z.nullable(z.number());
const str = z.nullable(z.string());
export const AgentLimits = z.record(
  z.string(),
  z.object({ p: z.number(), r: z.number() }),
);
export const AgentContext = z.object({
  tokens: z.number(),
  window: z.number(),
  at: num,
  limits: z.nullable(AgentLimits),
});
export const RoomAgent = z.object({
  email: z.string(),
  who: z.string(),
  repo: str,
  seen_at: num,
  listening: z.boolean(),
  all_rooms: z.boolean(),
  context: z.nullable(AgentContext),
});
export const RoomSandbox = z.object({
  id: z.string(),
  email: z.string(),
  name: str,
  state: str,
  run_s: num,
  rate: num,
  disk_rate: num,
  checked_at: num,
  created_at: num,
});
export const AgentsResult = z.object({
  claude_on: z.boolean(),
  sandboxes: z.array(RoomSandbox),
  agents: z.array(RoomAgent),
});
export type AgentsResult = z.infer<typeof AgentsResult>;
/** One agents row as D1 returns it (parsed on the server before it becomes a RoomAgent). */
export const AgentDbRow = z.object({
  email: z.string(),
  who: str,
  repo: str,
  seen_at: num,
  listening_at: num,
  listen_room: str,
  ctx_tokens: num,
  ctx_window: num,
  ctx_at: num,
  ctx_limits: str,
});

// Slice 8: the person's own cloud sandboxes in a room (freestyle.sh VMs; the key never leaves the server).
export const SandboxCard = z.object({
  id: z.string(),
  name: z.string(),
  vm_id: z.string(),
  ready: z.boolean(),
  state: z.string(),
  error: z.optional(z.string()),
  log: z.optional(z.string()),
  created_at: z.number(),
  rate: z.number(),
  cost: z.number(),
});
export const SandboxesResult = z.object({
  connected: z.boolean(),
  claude: z.boolean(),
  sandboxes: z.array(SandboxCard),
});
export type SandboxesResult = z.infer<typeof SandboxesResult>;
export const CreateSandboxBody = z.object({ name: z.optional(z.string()) });
export const CreateSandboxResult = z.object({
  ok: z.literal(true),
  id: z.string(),
  vm_id: z.string(),
  name: z.string(),
});
export type CreateSandboxResult = z.infer<typeof CreateSandboxResult>;
export const SandboxSetupResult = z.object({
  ok: z.boolean(),
  log: z.string(),
  error: z.optional(z.string()),
});
export type SandboxSetupResult = z.infer<typeof SandboxSetupResult>;
export const SandboxTerminalResult = z.object({
  token: z.string(),
  url: z.string(),
});
export type SandboxTerminalResult = z.infer<typeof SandboxTerminalResult>;

// Slice 9: a room's MCP connections (src/mcpconn.ts). No token or URL path ever reaches the browser.
export const ConnectionApp = z.object({
  tool: z.string(),
  title: z.string(),
  description: z.string(),
  screen: z.boolean(),
});
export const ConnectionTool = z.object({
  name: z.string(),
  description: z.string(),
  read_only: z.boolean(),
  app: z.boolean(),
});
export const ConnectionContext = z.object({
  text: z.string(),
  by: z.string(),
  at: z.number(),
});
export const Connection = z.object({
  id: z.string(),
  title: z.string(),
  host: z.string(),
  scope: z.enum(["room", "me"]),
  owner: z.string(),
  mine: z.boolean(),
  created_at: z.number(),
  auth: z.enum(["token", "identity"]),
  signed_in: z.boolean(),
  apps: z.array(ConnectionApp),
  tools: z.array(ConnectionTool),
  context: z.record(z.string(), ConnectionContext),
});
export type Connection = z.infer<typeof Connection>;
export const ConnectionsResult = z.object({ connections: z.array(Connection) });
export type ConnectionsResult = z.infer<typeof ConnectionsResult>;
/** `token` is refused with a message (connections no longer take one); kept so that error still reaches the person. */
export const CreateConnectionBody = z.object({
  url: z.optional(z.string()),
  scope: z.optional(z.string()),
  title: z.optional(z.string()),
  token: z.optional(z.unknown()),
});
export type CreateConnectionBody = z.infer<typeof CreateConnectionBody>;
export const CreateConnectionResult = z.object({
  ok: z.literal(true),
  connection: z.nullable(z.extend(Connection, { needs_sign_in: z.boolean() })),
});
export type CreateConnectionResult = z.infer<typeof CreateConnectionResult>;
export const RefreshConnectionResult = z.object({
  ok: z.literal(true),
  connection: Connection,
});
export type RefreshConnectionResult = z.infer<typeof RefreshConnectionResult>;
export const ConnectionUiQuery = z.object({ tool: z.optional(z.string()) });
export const ConnectionUiResult = z.object({
  html: z.string(),
  tool: z.object({
    name: z.string(),
    title: z.optional(z.string()),
    description: z.optional(z.string()),
    inputSchema: z.optional(z.unknown()),
    annotations: z.optional(z.unknown()),
    _meta: z.optional(z.unknown()),
  }),
});
export type ConnectionUiResult = z.infer<typeof ConnectionUiResult>;
export const ConnectionCallBody = z.object({
  name: z.optional(z.string()),
  arguments: z.optional(z.unknown()),
});
export type ConnectionCallBody = z.infer<typeof ConnectionCallBody>;
export const ConnectionCallResult = z.object({ result: z.unknown() });
export type ConnectionCallResult = z.infer<typeof ConnectionCallResult>;
export const ConnectionContextBody = z.object({
  tool: z.optional(z.string()),
  text: z.optional(z.string()),
});
export type ConnectionContextBody = z.infer<typeof ConnectionContextBody>;
/** A failed connection call: sign_in = this person must sign in on that server first (401). */
export const ConnectionError = z.object({
  error: z.string(),
  sign_in: z.optional(z.literal(true)),
});
export type ConnectionError = z.infer<typeof ConnectionError>;

// Slice 10: GET /api/me, the home and rail's one read (served from the Person DO's cache while nothing changed).
export const MeBook = z.object({
  id: z.string(),
  title: str,
  folder: str,
  summary: str,
  updated_at: num,
  created_at: num,
  icon: num,
  busy_until: num,
  position: num,
  tint: str,
  opened_at: num,
  last_human_id: z.number(),
  last_agent_id: z.number(),
  read_id: z.number(),
  sandboxes_running: z.number(),
  /** The room's members' emails, comma-separated (D1 group_concat). */
  members: str,
});
export const MeFriend = z.object({
  email: z.string(),
  name: str,
  avatar: num,
  /** 1 = has an account, 0 = invited only (D1 boolean). */
  joined: z.number(),
  shared: z.number(),
});
export const MeWait = z.object({
  book_id: z.string(),
  room: z.string(),
  /** m<msg> an ask to you, t<task> your task in review, a/b<msg> your Claude waiting on you. */
  ref: z.string(),
  thread: z.string(),
  topic: str,
  author: z.string(),
  author_name: str,
  text: z.string(),
  ts: z.number(),
});
export const MeData = z.object({
  email: z.string(),
  name: str,
  avatar: num,
  books: z.array(MeBook),
  friends: z.array(MeFriend),
  waits: z.array(MeWait),
});
export type MeData = z.infer<typeof MeData>;
/** v = the app shell's version (a new deploy makes open tabs reload); cached = served from the Person DO. */
export const MeResult = z.extend(MeData, {
  v: z.string(),
  cached: z.optional(z.literal(true)),
});
export type MeResult = z.infer<typeof MeResult>;
/** Unknown UI names intentionally retain the existing vanilla fallback. */
export const MeQuery = z.object({ ui:z.optional(z.string()) });
export type MeQuery = z.infer<typeof MeQuery>;

// Slice 11: the two image uploads (raw bytes; the app resizes first). Their type is the request's content-type.
export const ImageHeaders = z.object({
  "content-type": z.optional(z.string()),
});
export const AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const AvatarResult = z.object({
  ok: z.literal(true),
  avatar: z.number(),
});
export type AvatarResult = z.infer<typeof AvatarResult>;
/** icon = the new version, or null when the icon was removed (a JSON body). */
export const RoomIconResult = z.object({ ok: z.literal(true), icon: num });
export type RoomIconResult = z.infer<typeof RoomIconResult>;

/** The answers the Worker's global middleware gives before any route runs (src/index.ts), so they are not in AppType:
 *  every /api call can get them. 401 = signed out; 403 = a write from another site (the cross-site guard). Routes'
 *  own 403s ({ error: "forbidden" }) are in AppType. */
export const UNAUTHENTICATED = { error: "unauthenticated" } as const;
export const CROSS_SITE = { error: "cross-site request refused" } as const;
export const GLOBAL_FAILURE_STATUSES = [401, 403] as const;
export type GlobalFailure = {
  status: (typeof GLOBAL_FAILURE_STATUSES)[number];
  error: string;
};

// Public auth routes (/auth/*, src/api.ts authApi): what the login page needs, before anyone is signed in.
export const AuthProviders = z.object({
  google: z.boolean(),
  github: z.boolean(),
  email: z.literal(true),
});
export type AuthProviders = z.infer<typeof AuthProviders>;
/** The login page's context: which buttons to show, where to go after (already made safe), and why a provider failed. */
export const LoginContext = z.object({
  providers: AuthProviders,
  next: z.string(),
  error: z.nullable(z.enum(["google", "github"])),
});
export type LoginContext = z.infer<typeof LoginContext>;
export const LoginContextQuery = z.object({
  next: z.optional(z.string()),
  error: z.optional(z.string()),
});
export const EmailVerifyBody = z.object({
  email: z.string(),
  code: z.string(),
  next: z.optional(z.string()),
});
export type EmailVerifyBody = z.infer<typeof EmailVerifyBody>;
export const EmailVerifyResult = z.object({
  ok: z.literal(true),
  next: z.string(),
});
export type EmailVerifyResult = z.infer<typeof EmailVerifyResult>;

/** A room link's page for someone who may not be in it (the access page): the title is readable by whoever holds the
 *  link, on purpose (the shared card). state: missing room, signed out, can ask, already asked, or already a member. */
export const AccessContext = z.object({
  state: z.enum(["missing", "out", "ask", "asked", "member"]),
  title: z.nullable(z.string()),
  email: z.nullable(z.string()),
});
export type AccessContext = z.infer<typeof AccessContext>;

/** Your connected Claudes (one per OAuth grant: each `vibebook login` or connector), on the home's side box.
 *  used_at: last use of that grant; null = never seen, absent = an older grant with no per-grant record. */
export const AgentGrant = z.object({
  id: z.string(),
  client: z.string(),
  connected_at: z.number(),
  used_at: z.optional(z.nullable(z.number())),
});
export type AgentGrant = z.infer<typeof AgentGrant>;
export const AgentGrantsResult = z.object({
  agents: z.array(AgentGrant),
  last_used: z.nullable(z.number()),
});
export type AgentGrantsResult = z.infer<typeof AgentGrantsResult>;
export const RevokeAgentsBody = z.object({ ids: z.array(z.string()) });
export const RevokeAgentsResult = z.object({
  ok: z.literal(true),
  removed: z.number(),
});
export type RevokeAgentsResult = z.infer<typeof RevokeAgentsResult>;

/** The agent-connect consent page's context (GET /api/authorize/context with the /authorize query): what the page must
 *  show (who asks, where the tokens go, a local redirect warning) and the one-time handle the existing form posts back
 *  to POST /authorize. Getting it grants nothing. */
export const ConsentContext = z.object({
  client_name: z.string(),
  client_domain: z.nullable(z.string()),
  redirect_host: z.string(),
  redirect_is_loopback: z.boolean(),
  scope: z.array(z.string()),
  email: z.string(),
  handle: z.string(),
});
export type ConsentContext = z.infer<typeof ConsentContext>;
/** A refused authorization request: the error, and the client's own error redirect when the library built one. */
export const ConsentError = z.object({
  error: z.string(),
  redirect_to: z.optional(z.string()),
});
export type ConsentError = z.infer<typeof ConsentError>;
