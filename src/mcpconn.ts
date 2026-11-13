// MCP connections and apps (Nov 2026, F1 of "MCP apps no vibebook"): a room links remote MCP servers (Rituals,
// anjo.chat's admin, anything speaking Streamable HTTP) and opens their MCP Apps (tools with `_meta.ui.resourceUri`)
// as a tab of the doc panel.
// - Scope: "room" = every member (and their Claudes) uses it with the owner's token; "me" = only the owner and their
//   Claudes see it. The token is pasted by the person in the app, AES-GCM encrypted (sandbox.ts vault) and only ever
//   sent from the Worker to that server: never to the browser, the iframe or an agent.
// - The app's HTML (`ui://` resource) is served with a CSP built from the resource's own `_meta.ui.csp` and runs in an
//   opaque-origin iframe (srcdoc, sandbox allow-scripts); its tools/call go through the host page to /call here.
// - Agents: MCP tools `connections`, `app_call`, `app_open` (src/agent.ts).
import * as z from "zod/mini";
import { ConnectionContext } from "../shared/schemas";
import { uiNavigationUrl, uiVariant } from "../shared/uiVariant";
import type { Env } from "./index";
import { checkUrl } from "./reader";
import { findSecret } from "./secrets";
import { seal, unseal } from "./sandbox";
import { bookStub } from "./rooms";
import { AuthNeeded, finishAuth, forget, identityJwt, signedInTo, startAuth, tokenFor } from "./mcpauth";

/** Who is looking: every call carries their identity seal, and their own sign-in when the server wants one. */
export type Who = { email: string; room: string; origin: string };

export type Conn = { id: string; book_id: string; owner: string; scope: "room" | "me"; url: string; title: string; enc: string | null; iv: string | null; tools: string | null; ctx: string | null; created_at: number };
// A server's tools as it lists them (external input): checked when listed and again when read back from D1, so the
// public connection answers and the app host only ever see the shape below. Extra keys in annotations/_meta are kept
// (hosts and apps read more than we name). A tool that doesn't fit is dropped, not trusted.
const ToolSchema = z.object({
  name: z.string(),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
  inputSchema: z.optional(z.unknown()),
  annotations: z.optional(z.looseObject({ readOnlyHint: z.optional(z.boolean()), title: z.optional(z.string()) })),
  _meta: z.optional(
    z.looseObject({
      ui: z.optional(z.looseObject({ resourceUri: z.optional(z.string()), visibility: z.optional(z.array(z.string())) })),
      "ui/resourceUri": z.optional(z.string()),
    }),
  ),
});
type Tool = z.infer<typeof ToolSchema>;
const toolList = (v: unknown): Tool[] => (Array.isArray(v) ? v.flatMap((t) => { const r = ToolSchema.safeParse(t); return r.success ? [r.data] : []; }) : []);
const json = (s: string | null, empty: unknown) => { try { return s ? JSON.parse(s) : empty; } catch { return empty; } };

const MAX_CONNS = 10; // per room
const PROTOCOL = "2025-06-18";
const UI_EXT = "io.modelcontextprotocol/ui";
const MIME_APP = "text/html;profile=mcp-app";

export const canUse = (c: Conn, email: string) => c.scope === "room" || c.owner === email;
export const uiOf = (t: Tool) => { const u = t._meta?.ui?.resourceUri ?? t._meta?.["ui/resourceUri"]; return typeof u === "string" && u.startsWith("ui://") ? u : null; };
const modelVisible = (t: Tool) => !t._meta?.ui?.visibility || t._meta.ui.visibility.includes("model");
const toolsOf = (c: Conn): Tool[] => toolList(json(c.tools, []));
const ctxOf = (c: Conn): Record<string, z.infer<typeof ConnectionContext>> => {
  const all = json(c.ctx, {});
  if (!all || typeof all !== "object" || Array.isArray(all)) return {};
  return Object.fromEntries(Object.entries(all).flatMap(([k, v]) => { const r = ConnectionContext.safeParse(v); return r.success ? [[k, r.data]] : []; }));
};
const firstLine = (s = "") => s.split("\n")[0].slice(0, 200);

/** What the app and agents get: no token, no raw URL path (it may carry a key). */
export function publicConn(c: Conn, email: string, signed?: Set<string>) {
  const tools = toolsOf(c);
  return {
    id: c.id, title: c.title, host: new URL(c.url).host, scope: c.scope, owner: c.owner, mine: c.owner === email, created_at: c.created_at,
    // auth: "token" = the old pasted Bearer (to be removed); "identity" = no secret here, each person signs in on the
    // server when it asks (signed_in tells whether this person already did).
    auth: c.enc ? ("token" as const) : ("identity" as const), signed_in: !c.enc && !!signed?.has(c.url),
    // Screens first: tools with a UI only the app calls (visibility ["app"], e.g. autogui's APP_*) are the views meant to
    // be opened; the rest of the UI tools render a tool result and sit behind "ver todas" in the tab.
    apps: tools.filter(uiOf).map((t) => ({ tool: t.name, title: t.title || t.annotations?.title || t.name, description: firstLine(t.description), screen: !!t._meta?.ui?.visibility && !t._meta.ui.visibility.includes("model") })).sort((a, b) => Number(b.screen) - Number(a.screen)),
    tools: tools.filter(modelVisible).map((t) => ({ name: t.name, description: firstLine(t.description), read_only: !!t.annotations?.readOnlyHint, app: !!uiOf(t) })),
    context: ctxOf(c),
  };
}

export async function listConns(env: Env, book: string, email: string) {
  // A connection whose owner left the room stops: nobody keeps using the token of someone who isn't here anymore.
  const r = await env.DB.prepare(`SELECT c.* FROM mcp_connections c JOIN members m ON m.book_id = c.book_id AND m.email = c.owner WHERE c.book_id = ? ORDER BY c.created_at`).bind(book).all<Conn>();
  return r.results.filter((c) => canUse(c, email));
}
export async function getConn(env: Env, book: string, id: string, email: string) {
  const c = await env.DB.prepare(`SELECT c.* FROM mcp_connections c JOIN members m ON m.book_id = c.book_id AND m.email = c.owner WHERE c.id = ? AND c.book_id = ?`).bind(id, book).first<Conn>();
  return c && canUse(c, email) ? c : null;
}

// ---- A tiny Streamable HTTP MCP client (JSON or SSE answers). ----
// ponytail: one session per connection per isolate, re-initialized on 404/400; enough for a few calls a minute.
const sessions = new Map<string, string | null>();
let rpcId = 0;
async function post(url: string, token: string | null, body: unknown, session?: string | null, identity?: string) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream", "mcp-protocol-version": PROTOCOL, ...(token ? { authorization: `Bearer ${token}` } : {}), ...(session ? { "mcp-session-id": session } : {}), ...(identity ? { "x-vibebook-identity": identity } : {}) },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
    redirect: "manual",
  });
  return r;
}
async function answer(r: Response, id: number) {
  const text = (await r.text()).slice(0, 4_000_000);
  if (!r.ok) throw new Error(`servidor MCP respondeu ${r.status}${r.status === 401 ? " (token errado ou faltando)" : ""}: ${text.slice(0, 160)}`);
  const msgs = (r.headers.get("content-type") || "").includes("text/event-stream")
    ? text.split(/\r?\n\r?\n/).map((ev) => ev.split(/\r?\n/).filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).join("")).filter(Boolean)
    : [text];
  for (const m of msgs) {
    let j: any; try { j = JSON.parse(m); } catch { continue; }
    for (const x of Array.isArray(j) ? j : [j]) if (x?.id === id) { if (x.error) throw new Error(`MCP: ${String(x.error.message).slice(0, 200)}`); return x.result; }
  }
  throw new Error("o servidor MCP não respondeu essa chamada");
}
/** 401 from a server we hold no pasted token for: this person has to sign in there (the app shows "Entrar"). */
function needsSignIn(r: Response, url: string, legacy: boolean) {
  if (r.status !== 401 || legacy) return;
  const e = new AuthNeeded(new URL(url).host) as AuthNeeded & { wwwAuth?: string | null };
  e.wwwAuth = r.headers.get("www-authenticate");
  r.body?.cancel();
  throw e;
}
async function init(url: string, token: string | null, identity?: string, legacy = !!token) {
  const id = ++rpcId;
  const r = await post(url, token, { jsonrpc: "2.0", id, method: "initialize", params: { protocolVersion: PROTOCOL, capabilities: { extensions: { [UI_EXT]: { mimeTypes: [MIME_APP] } } }, clientInfo: { name: "vibebook", version: "1" } } }, null, identity);
  needsSignIn(r, url, legacy);
  const session = r.headers.get("mcp-session-id");
  const result = await answer(r, id);
  await post(url, token, { jsonrpc: "2.0", method: "notifications/initialized" }, session, identity).then((x) => x.body?.cancel()).catch(() => {});
  return { session, result };
}
export async function rpc(env: Env, c: Pick<Conn, "id" | "url" | "enc" | "iv">, method: string, params: unknown, who: Who) {
  const legacy = !!(c.enc && c.iv);
  const token = legacy ? await unseal(env, c.enc!, c.iv!) : await tokenFor(env, who.origin, who.email, c.url);
  const identity = await identityJwt(env, who.origin, { email: who.email, room: who.room, aud: c.url });
  const key = `${c.id}:${who.email}`; // sessions per person: each one signs in on their own
  for (let attempt = 0; ; attempt++) {
    if (!sessions.has(key)) sessions.set(key, (await init(c.url, token, identity, legacy)).session);
    const id = ++rpcId;
    const r = await post(c.url, token, { jsonrpc: "2.0", id, method, params }, sessions.get(key), identity);
    needsSignIn(r, c.url, legacy);
    if ((r.status === 404 || r.status === 400) && attempt === 0 && sessions.get(key)) { sessions.delete(key); await r.body?.cancel(); continue; }
    return answer(r, id);
  }
}
async function listTools(env: Env, c: Pick<Conn, "id" | "url" | "enc" | "iv">, who: Who) {
  const out: unknown[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < 5; page++) { // ≤5 pages: a server can't make us loop
    const r = await rpc(env, c, "tools/list", cursor ? { cursor } : {}, who);
    if (Array.isArray(r?.tools)) out.push(...r.tools);
    cursor = typeof r?.nextCursor === "string" ? r.nextCursor : undefined; if (!cursor) break;
  }
  return toolList(out.slice(0, 200)).map((t) => ({ ...t, description: (t.description ?? "").slice(0, 2000) }));
}

/** One tool on a connection the caller may use. Tools must be on the cached list (refresh to pick up new ones). */
export async function callTool(env: Env, c: Conn, name: string, args: unknown, who: Who) {
  if (!toolsOf(c).some((t) => t.name === name)) throw new Error(`${c.title} não tem a tool ${name}`);
  return rpc(env, c, "tools/call", { name, arguments: args && typeof args === "object" ? args : {} }, who);
}

/** Links a remote MCP server to a room (the app's Conectar MCP, MCP connect_mcp, `vibebook connect`). Throws a user-facing Error. */
export async function createConn(env: Env, book: string, email: string, b: { url?: unknown; token?: unknown; scope?: unknown; title?: unknown }, wait: (p: Promise<unknown>) => void, track: (env: Env, name: string, o: object) => Promise<unknown>, origin = "https://vibebook.dev") {
  const raw = String(b.url ?? "").trim();
  // Local dev may point at a loopback MCP (the test server); prod only reaches public hosts.
  const local = env.DEV_EMAIL && /^http:\/\/(127\.0\.0\.1|localhost):\d+\//.test(raw);
  const ok = local ? { url: raw } : checkUrl(raw);
  if ("error" in ok) throw new Error(`URL: ${ok.error}`);
  // No pasted tokens (Nov 2026): the server sees who calls from the identity seal and signs each person in itself.
  if (b.token) throw new Error("conexões não levam mais token: conecte só a URL; quem usar entra com a própria conta (Entrar em <host> na aba Apps)");
  const n: { n: number } | null = await env.DB.prepare(`SELECT COUNT(*) n FROM mcp_connections WHERE book_id = ?`).bind(book).first();
  if ((n?.n ?? 0) >= MAX_CONNS) throw new Error(`no máximo ${MAX_CONNS} conexões por sala`);
  const cid = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  const sealed = { enc: null, iv: null };
  const who: Who = { email, room: book, origin };
  // A server that asks its own sign-in is linked anyway: the tools come after this person signs in (needs_sign_in).
  let result: any = null, tools: Tool[] = [], needsAuth = false;
  try {
    const first = await init(ok.url, null, await identityJwt(env, origin, { email, room: book, aud: ok.url }));
    result = first.result;
    sessions.set(`${cid}:${email}`, first.session);
    tools = await listTools(env, { id: cid, url: ok.url, ...sealed }, who);
  } catch (e) {
    if (!(e instanceof AuthNeeded)) throw e;
    needsAuth = true;
  }
  const title = String(b.title || result?.serverInfo?.title || result?.serverInfo?.name || new URL(ok.url).host).slice(0, 60);
  const scope = b.scope === "room" ? "room" : "me"; // "minha" by default (hybrid model, Nov 2026)
  await env.DB.prepare(`INSERT INTO mcp_connections (id, book_id, owner, scope, url, title, enc, iv, tools, ctx, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '{}', ?)`)
    .bind(cid, book, email, scope, ok.url, title, sealed.enc, sealed.iv, JSON.stringify(tools), Date.now()).run();
  wait(track(env, "mcp_connected", { user: email, dims: { book, host: new URL(ok.url).host, scope, tools: tools.length, apps: tools.filter(uiOf).length } }));
  wait(bookStub(env, book).connsChanged());
  const row = await getConn(env, book, cid, email);
  return row && { ...publicConn(row, email), needs_sign_in: needsAuth };
}
export async function deleteConn(env: Env, book: string, cid: string, email: string) {
  const x = await getConn(env, book, cid, email);
  if (!x) throw new Error("conexão não encontrada");
  if (x.owner !== email) throw new Error("só quem conectou pode remover");
  await env.DB.prepare(`DELETE FROM mcp_connections WHERE id = ?`).bind(x.id).run();
  for (const k of sessions.keys()) if (k.startsWith(`${x.id}:`)) sessions.delete(k);
  await bookStub(env, book).connsChanged();
}

/** Connections made with a pasted token before Nov 2026: the token is dropped (each person signs in instead) and the
 *  owner is told once in the room. Idempotent (one UPDATE per row decides who posts), run on the Worker's schema pass. */
export async function retireTokens(env: Env) {
  const rows = (await env.DB.prepare(`SELECT id, book_id, owner, title, url FROM mcp_connections WHERE enc IS NOT NULL`).all<{ id: string; book_id: string; owner: string; title: string; url: string }>()).results;
  for (const r of rows) {
    const done = await env.DB.prepare(`UPDATE mcp_connections SET enc = NULL, iv = NULL WHERE id = ? AND enc IS NOT NULL`).bind(r.id).run();
    if (!done.meta.changes) continue;
    sessions.forEach((_, k) => k.startsWith(`${r.id}:`) && sessions.delete(k));
    await bookStub(env, r.book_id).vibePost(r.book_id, "main", `🔑 @${r.owner.split("@")[0]}, a conexão **${r.title}** usava um token colado, que o vibebook apagou: agora cada pessoa entra no ${new URL(r.url).host} com a própria conta (aba Apps → Entrar). Nada mais guarda a sua senha ou chave aqui.`).catch(() => {});
    await bookStub(env, r.book_id).connsChanged().catch(() => {});
  }
}

// ---- The app's HTML with its CSP. ----
const DOMAIN = /^(https?|wss?):\/\/(\*\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(:\d{1,5})?$/i;
const domains = (v: unknown) => (Array.isArray(v) ? v.map(String).filter((d) => DOMAIN.test(d)).slice(0, 20) : []);
export function cspFor(meta: any) {
  const csp = meta?.ui?.csp ?? {};
  const res = domains(csp.resourceDomains).join(" "), conn = domains(csp.connectDomains), frames = domains(csp.frameDomains).join(" "), base = domains(csp.baseUriDomains).join(" ");
  const ws = conn.filter((d) => d.startsWith("https://")).map((d) => d.replace(/^https/, "wss"));
  return [
    "default-src 'none'",
    `script-src 'unsafe-inline' 'unsafe-eval' ${res}`, `style-src 'unsafe-inline' ${res}`,
    `img-src data: blob: https: ${res}`, `font-src data: ${res}`, `media-src data: blob: ${res}`,
    `connect-src ${[...conn, ...ws].join(" ") || "'none'"}`, `frame-src ${frames || "'none'"}`, `base-uri ${base || "'none'"}`, "form-action 'none'",
  ].map((s) => s.trim()).join("; ");
}
export async function appHtml(env: Env, c: Conn, tool: string, who: Who) {
  const t = toolsOf(c).find((x) => x.name === tool);
  const uri = t && uiOf(t);
  if (!uri) throw new Error(`${tool} não é um app`);
  const r = await rpc(env, c, "resources/read", { uri }, who);
  const item = r?.contents?.[0];
  if (!item) throw new Error("o servidor não devolveu o HTML do app");
  const html = typeof item.text === "string" ? item.text : item.blob ? new TextDecoder().decode(Uint8Array.from(atob(item.blob), (ch) => ch.charCodeAt(0))) : "";
  if (!html) throw new Error("HTML do app vazio");
  const csp = cspFor(item._meta).replace(/"/g, "");
  // Right after the doctype (or first): nothing in the page runs before the policy. Before the doctype = quirks mode.
  const meta = `<meta http-equiv="Content-Security-Policy" content="${csp}">`;
  const dt = html.match(/^\s*<!doctype[^>]*>/i)?.[0] ?? "";
  return { html: `${dt}${meta}\n${html.slice(dt.length)}`, tool: t, uri, csp };
}

// ---- Routes ----
export function mountConnections(app: any, deps: { isMember: (db: D1Database, id: string, email: string) => Promise<boolean>; track: (env: Env, name: string, o: object) => Promise<unknown> }) {
  const guard = async (c: any) => (await deps.isMember(c.env.DB, c.req.param("id"), c.get("email")) ? null : c.json({ error: "forbidden" }, 403));
  const conn = async (c: any) => getConn(c.env, c.req.param("id"), c.req.param("cid"), c.get("email"));
  const who = (c: any): Who => ({ email: c.get("email"), room: c.req.param("id"), origin: new URL(c.req.url).origin });

  // Sign in on a connection's server (OAuth per person): the browser goes to its consent page and comes back here.
  app.get("/api/books/:id/connections/:cid/signin", async (c: any) => {
    const no = await guard(c); if (no) return no;
    const x = await conn(c); if (!x) return c.json({ error: "conexão não encontrada" }, 404);
    if (!(await c.env.LOGIN_LIMIT.limit({ key: `mcpauth:${c.get("email")}` })).success) return c.json({ error: "Muitas tentativas. Espera um minuto." }, 429);
    try {
      const w = who(c);
      return c.redirect(await startAuth(c.env, w.origin, { email: w.email, book: x.book_id, cid: x.id, resource: x.url, back: uiNavigationUrl(`/b/${x.book_id}#app:${x.id}`, c.req.url, uiVariant(c.req.url)) }));
    } catch (e) { return c.html(`<p style="font:16px system-ui;padding:24px">Não deu pra entrar: ${String((e as Error).message).replace(/</g, "&lt;")}. <a href="/b/${x.book_id}">Voltar</a></p>`, 400); }
  });
  app.get("/api/mcp-oauth/callback", async (c: any) => {
    const q = c.req.query();
    try {
      if (q.error) throw new Error(String(q.error_description || q.error).slice(0, 200));
      const w = { email: c.get("email"), origin: new URL(c.req.url).origin };
      const s = await finishAuth(c.env, w.origin, w.email, String(q.state ?? ""), String(q.code ?? ""));
      // First person in: fetch the tools with their grant, so the connection is usable right away.
      const x = await getConn(c.env, s.book_id, s.conn_id, w.email);
      if (x && toolsOf(x).length === 0) {
        const tools = await listTools(c.env, x, { email: w.email, room: s.book_id, origin: w.origin }).catch(() => null);
        if (tools) { await c.env.DB.prepare(`UPDATE mcp_connections SET tools = ? WHERE id = ?`).bind(JSON.stringify(tools), x.id).run(); await bookStub(c.env, s.book_id).connsChanged(); }
      }
      c.executionCtx.waitUntil(deps.track(c.env, "mcp_signed_in", { user: w.email, dims: { book: s.book_id, host: new URL(s.resource).host } }));
      return c.redirect(s.back);
    } catch (e) { return c.html(`<p style="font:16px system-ui;padding:24px">Não deu pra entrar: ${String((e as Error).message).replace(/</g, "&lt;")}. <a href="/app">Voltar</a></p>`, 400); }
  });
}

/** The typed routes' side (src/api.ts, slice 9): the signed-in person's view of a room's connections. Room membership
 *  is checked by the route; a failure is { error, status } (401 + sign_in = sign in on that server first). */
export type ConnFail = { error: string; status: 400 | 401 | 404 | 429 | 502; sign_in?: true };
export function connOps(env: Env, ctx: { waitUntil(p: Promise<unknown>): void }, email: string, origin: string, track: (env: Env, name: string, o: object) => Promise<unknown>) {
  const who = (room: string): Who => ({ email, room, origin });
  const fail = (e: unknown, status: 400 | 502 = 502): ConnFail =>
    e instanceof AuthNeeded ? { error: e.message, status: 401, sign_in: true } : { error: e instanceof Error ? e.message : String(e), status };
  const missing: ConnFail = { error: "conexão não encontrada", status: 404 };
  return {
    async list(room: string) {
      const signed = await signedInTo(env, email);
      return { connections: (await listConns(env, room, email)).map((x) => publicConn(x, email, signed)) };
    },
    async create(room: string, b: { url?: string; scope?: string; title?: string; token?: unknown }) {
      if (!(await env.LOGIN_LIMIT.limit({ key: `mcp:${email}` })).success) return { error: "Muitas tentativas. Espera um minuto.", status: 429 } satisfies ConnFail;
      try { return { ok: true as const, connection: await createConn(env, room, email, b, (p) => ctx.waitUntil(p), track, origin) }; }
      catch (e) { return fail(e, 400); }
    },
    async remove(room: string, cid: string) {
      try { await deleteConn(env, room, cid, email); return { ok: true as const }; }
      catch (e) { return fail(e, 400); }
    },
    async refresh(room: string, cid: string) {
      const x = await getConn(env, room, cid, email); if (!x) return missing;
      try {
        const tools = await listTools(env, x, who(room));
        await env.DB.prepare(`UPDATE mcp_connections SET tools = ? WHERE id = ?`).bind(JSON.stringify(tools), x.id).run();
        return { ok: true as const, connection: publicConn({ ...x, tools: JSON.stringify(tools) }, email) };
      } catch (e) { return fail(e); }
    },
    /** The app's HTML for an opaque-origin iframe (the page puts it in srcdoc). */
    async ui(room: string, cid: string, tool: string) {
      const x = await getConn(env, room, cid, email); if (!x) return missing;
      try {
        const a = await appHtml(env, x, tool, who(room));
        ctx.waitUntil(track(env, "app_open", { user: email, dims: { book: x.book_id, host: new URL(x.url).host, tool: a.tool.name, via: "app" } }));
        return { html: a.html, tool: { name: a.tool.name, title: a.tool.title, description: a.tool.description, inputSchema: a.tool.inputSchema, annotations: a.tool.annotations, _meta: a.tool._meta } };
      } catch (e) { return fail(e); }
    },
    /** tools/call from the open app (a person's click), or the host's first call when opening it. */
    async call(room: string, cid: string, name: string, args: unknown) {
      if (!(await env.AGENT_LIMIT.limit({ key: `app:${email}` })).success) return { error: "muitas chamadas no último minuto", status: 429 } satisfies ConnFail;
      const x = await getConn(env, room, cid, email); if (!x) return missing;
      try {
        const result: unknown = await callTool(env, x, name, args, who(room));
        ctx.waitUntil(track(env, "app_call", { user: email, dims: { book: x.book_id, host: new URL(x.url).host, tool: name, via: "app" } }));
        return { result };
      } catch (e) { return fail(e); }
    },
    /** ui/update-model-context: what the open app says about itself, kept per tool so every Claude in the room reads it. */
    async context(room: string, cid: string, tool: string, text: string) {
      const x = await getConn(env, room, cid, email); if (!x) return missing;
      if (findSecret(text)) return { error: "parece um segredo; não guardei", status: 400 } satisfies ConnFail;
      const c = ctxOf(x);
      c[tool] = { text, by: email, at: Date.now() };
      await env.DB.prepare(`UPDATE mcp_connections SET ctx = ? WHERE id = ?`).bind(JSON.stringify(c), x.id).run();
      return { ok: true as const };
    },
    /** Forget this person's sign-in on that connection's server. */
    async signout(room: string, cid: string) {
      const x = await getConn(env, room, cid, email); if (!x) return missing;
      await forget(env, email, x.url);
      sessions.delete(`${x.id}:${email}`);
      return { ok: true as const };
    },
  };
}
export type ConnOps = ReturnType<typeof connOps>;
