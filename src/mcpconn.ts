// MCP connections and apps (Nov 2026, F1 of "MCP apps no vibebook"): a room links remote MCP servers (Rituals,
// anjo.chat's admin, anything speaking Streamable HTTP) and opens their MCP Apps (tools with `_meta.ui.resourceUri`)
// as a tab of the doc panel.
// - Scope: "room" = every member (and their Claudes) uses it with the owner's token; "me" = only the owner and their
//   Claudes see it. The token is pasted by the person in the app, AES-GCM encrypted (sandbox.ts vault) and only ever
//   sent from the Worker to that server: never to the browser, the iframe or an agent.
// - The app's HTML (`ui://` resource) is served with a CSP built from the resource's own `_meta.ui.csp` and runs in an
//   opaque-origin iframe (srcdoc, sandbox allow-scripts); its tools/call go through the host page to /call here.
// - Agents: MCP tools `connections`, `app_call`, `app_open` (src/agent.ts).
import type { Env } from "./index";
import { checkUrl } from "./reader";
import { findSecret } from "./secrets";
import { seal, unseal } from "./sandbox";
import { bookStub } from "./rooms";

export type Conn = { id: string; book_id: string; owner: string; scope: "room" | "me"; url: string; title: string; enc: string | null; iv: string | null; tools: string | null; ctx: string | null; created_at: number };
type Tool = { name: string; title?: string; description?: string; inputSchema?: unknown; annotations?: { readOnlyHint?: boolean; title?: string }; _meta?: { ui?: { resourceUri?: string; visibility?: string[] }; "ui/resourceUri"?: string } };

const MAX_CONNS = 10; // per room
const PROTOCOL = "2025-06-18";
const UI_EXT = "io.modelcontextprotocol/ui";
const MIME_APP = "text/html;profile=mcp-app";

export const canUse = (c: Conn, email: string) => c.scope === "room" || c.owner === email;
export const uiOf = (t: Tool) => { const u = t._meta?.ui?.resourceUri ?? t._meta?.["ui/resourceUri"]; return typeof u === "string" && u.startsWith("ui://") ? u : null; };
const modelVisible = (t: Tool) => !t._meta?.ui?.visibility || t._meta.ui.visibility.includes("model");
const toolsOf = (c: Conn): Tool[] => { try { return JSON.parse(c.tools || "[]"); } catch { return []; } };
const ctxOf = (c: Conn): Record<string, { text: string; by: string; at: number }> => { try { return JSON.parse(c.ctx || "{}"); } catch { return {}; } };
const firstLine = (s = "") => s.split("\n")[0].slice(0, 200);

/** What the app and agents get: no token, no raw URL path (it may carry a key). */
export function publicConn(c: Conn, email: string) {
  const tools = toolsOf(c);
  return {
    id: c.id, title: c.title, host: new URL(c.url).host, scope: c.scope, owner: c.owner, mine: c.owner === email, created_at: c.created_at,
    apps: tools.filter(uiOf).map((t) => ({ tool: t.name, title: t.title || t.annotations?.title || t.name, description: firstLine(t.description) })),
    tools: tools.filter(modelVisible).map((t) => ({ name: t.name, description: firstLine(t.description), read_only: !!t.annotations?.readOnlyHint, app: !!uiOf(t) })),
    context: ctxOf(c),
  };
}

export async function listConns(env: Env, book: string, email: string) {
  const r = await env.DB.prepare(`SELECT * FROM mcp_connections WHERE book_id = ? ORDER BY created_at`).bind(book).all<Conn>();
  return r.results.filter((c) => canUse(c, email));
}
export async function getConn(env: Env, book: string, id: string, email: string) {
  const c = await env.DB.prepare(`SELECT * FROM mcp_connections WHERE id = ? AND book_id = ?`).bind(id, book).first<Conn>();
  return c && canUse(c, email) ? c : null;
}

// ---- A tiny Streamable HTTP MCP client (JSON or SSE answers). ----
// ponytail: one session per connection per isolate, re-initialized on 404/400; enough for a few calls a minute.
const sessions = new Map<string, string | null>();
let rpcId = 0;
async function post(url: string, token: string | null, body: unknown, session?: string | null) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream", "mcp-protocol-version": PROTOCOL, ...(token ? { authorization: `Bearer ${token}` } : {}), ...(session ? { "mcp-session-id": session } : {}) },
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
async function init(url: string, token: string | null) {
  const id = ++rpcId;
  const r = await post(url, token, { jsonrpc: "2.0", id, method: "initialize", params: { protocolVersion: PROTOCOL, capabilities: { extensions: { [UI_EXT]: { mimeTypes: [MIME_APP] } } }, clientInfo: { name: "vibebook", version: "1" } } });
  const session = r.headers.get("mcp-session-id");
  const result = await answer(r, id);
  await post(url, token, { jsonrpc: "2.0", method: "notifications/initialized" }, session).then((x) => x.body?.cancel()).catch(() => {});
  return { session, result };
}
export async function rpc(env: Env, c: Pick<Conn, "id" | "url" | "enc" | "iv">, method: string, params: unknown = {}) {
  const token = c.enc && c.iv ? await unseal(env, c.enc, c.iv) : null;
  for (let attempt = 0; ; attempt++) {
    if (!sessions.has(c.id)) sessions.set(c.id, (await init(c.url, token)).session);
    const id = ++rpcId;
    const r = await post(c.url, token, { jsonrpc: "2.0", id, method, params }, sessions.get(c.id));
    if ((r.status === 404 || r.status === 400) && attempt === 0 && sessions.get(c.id)) { sessions.delete(c.id); await r.body?.cancel(); continue; }
    return answer(r, id);
  }
}
async function listTools(env: Env, c: Pick<Conn, "id" | "url" | "enc" | "iv">) {
  const out: Tool[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < 5; page++) { // ≤5 pages: a server can't make us loop
    const r = await rpc(env, c, "tools/list", cursor ? { cursor } : {});
    out.push(...(r?.tools ?? []));
    cursor = r?.nextCursor; if (!cursor) break;
  }
  return out.slice(0, 200).map((t) => ({ name: String(t.name), title: t.title, description: String(t.description ?? "").slice(0, 2000), inputSchema: t.inputSchema, annotations: t.annotations, _meta: t._meta }));
}

/** One tool on a connection the caller may use. Tools must be on the cached list (refresh to pick up new ones). */
export async function callTool(env: Env, c: Conn, name: string, args: unknown) {
  if (!toolsOf(c).some((t) => t.name === name)) throw new Error(`${c.title} não tem a tool ${name}`);
  return rpc(env, c, "tools/call", { name, arguments: args && typeof args === "object" ? args : {} });
}

/** Links a remote MCP server to a room (the app's Conectar MCP, MCP connect_mcp, `vibebook connect`). Throws a user-facing Error. */
export async function createConn(env: Env, book: string, email: string, b: { url?: unknown; token?: unknown; scope?: unknown; title?: unknown }, wait: (p: Promise<unknown>) => void, track: (env: Env, name: string, o: object) => Promise<unknown>) {
  const raw = String(b.url ?? "").trim();
  // Local dev may point at a loopback MCP (the test server); prod only reaches public hosts.
  const local = env.DEV_EMAIL && /^http:\/\/(127\.0\.0\.1|localhost):\d+\//.test(raw);
  const ok = local ? { url: raw } : checkUrl(raw);
  if ("error" in ok) throw new Error(`URL: ${ok.error}`);
  const token = String(b.token ?? "").replace(/\s+/g, "").replace(/^Bearer/i, "") || null;
  if (token && token.length > 4000) throw new Error("token longo demais");
  const n: { n: number } | null = await env.DB.prepare(`SELECT COUNT(*) n FROM mcp_connections WHERE book_id = ?`).bind(book).first();
  if ((n?.n ?? 0) >= MAX_CONNS) throw new Error(`no máximo ${MAX_CONNS} conexões por sala`);
  const cid = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  const sealed = token ? await seal(env, token) : { enc: null, iv: null };
  const { session, result } = await init(ok.url, token);
  sessions.set(cid, session);
  const title = String(b.title || result?.serverInfo?.title || result?.serverInfo?.name || new URL(ok.url).host).slice(0, 60);
  const tools = await listTools(env, { id: cid, url: ok.url, ...sealed });
  const scope = b.scope === "me" ? "me" : "room";
  await env.DB.prepare(`INSERT INTO mcp_connections (id, book_id, owner, scope, url, title, enc, iv, tools, ctx, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '{}', ?)`)
    .bind(cid, book, email, scope, ok.url, title, sealed.enc, sealed.iv, JSON.stringify(tools), Date.now()).run();
  wait(track(env, "mcp_connected", { user: email, dims: { book, host: new URL(ok.url).host, scope, tools: tools.length, apps: tools.filter(uiOf).length } }));
  wait(bookStub(env, book).connsChanged());
  const row = await getConn(env, book, cid, email);
  return row && publicConn(row, email);
}
export async function deleteConn(env: Env, book: string, cid: string, email: string) {
  const x = await getConn(env, book, cid, email);
  if (!x) throw new Error("conexão não encontrada");
  if (x.owner !== email) throw new Error("só quem conectou pode remover");
  await env.DB.prepare(`DELETE FROM mcp_connections WHERE id = ?`).bind(x.id).run();
  sessions.delete(x.id);
  await bookStub(env, book).connsChanged();
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
export async function appHtml(env: Env, c: Conn, tool: string) {
  const t = toolsOf(c).find((x) => x.name === tool);
  const uri = t && uiOf(t);
  if (!uri) throw new Error(`${tool} não é um app`);
  const r = await rpc(env, c, "resources/read", { uri });
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
  const fail = (c: any, e: unknown, status = 502) => c.json({ error: e instanceof Error ? e.message : String(e) }, status);

  app.get("/api/books/:id/connections", async (c: any) => {
    const no = await guard(c); if (no) return no;
    const email = c.get("email");
    return c.json({ connections: (await listConns(c.env, c.req.param("id"), email)).map((x) => publicConn(x, email)) });
  });

  app.post("/api/books/:id/connections", async (c: any) => {
    const no = await guard(c); if (no) return no;
    const id = c.req.param("id"), email = c.get("email");
    if (!(await c.env.LOGIN_LIMIT.limit({ key: `mcp:${email}` })).success) return c.json({ error: "Muitas tentativas. Espera um minuto." }, 429);
    const b = await c.req.json().catch(() => ({}));
    try { return c.json({ ok: true, connection: await createConn(c.env, id, email, b, (x) => c.executionCtx.waitUntil(x), deps.track) }); }
    catch (e) { return fail(c, e, 400); }
  });

  app.delete("/api/books/:id/connections/:cid", async (c: any) => {
    const no = await guard(c); if (no) return no;
    try { await deleteConn(c.env, c.req.param("id"), c.req.param("cid"), c.get("email")); return c.json({ ok: true }); }
    catch (e) { return fail(c, e, 400); }
  });

  app.post("/api/books/:id/connections/:cid/refresh", async (c: any) => {
    const no = await guard(c); if (no) return no;
    const x = await conn(c); if (!x) return c.json({ error: "conexão não encontrada" }, 404);
    try {
      const tools = await listTools(c.env, x);
      await c.env.DB.prepare(`UPDATE mcp_connections SET tools = ? WHERE id = ?`).bind(JSON.stringify(tools), x.id).run();
      return c.json({ ok: true, connection: publicConn({ ...x, tools: JSON.stringify(tools) }, c.get("email")) });
    } catch (e) { return fail(c, e); }
  });

  // The app's HTML for an opaque-origin iframe (the page puts it in srcdoc).
  app.get("/api/books/:id/connections/:cid/ui", async (c: any) => {
    const no = await guard(c); if (no) return no;
    const x = await conn(c); if (!x) return c.json({ error: "conexão não encontrada" }, 404);
    try {
      const a = await appHtml(c.env, x, String(c.req.query("tool") ?? ""));
      c.executionCtx.waitUntil(deps.track(c.env, "app_open", { user: c.get("email"), dims: { book: x.book_id, host: new URL(x.url).host, tool: a.tool.name, via: "app" } }));
      return c.json({ html: a.html, tool: { name: a.tool.name, title: a.tool.title, description: a.tool.description, inputSchema: a.tool.inputSchema, annotations: a.tool.annotations, _meta: a.tool._meta } });
    } catch (e) { return fail(c, e); }
  });

  // tools/call from the open app (a person's click), or the host's first call when opening it.
  app.post("/api/books/:id/connections/:cid/call", async (c: any) => {
    const no = await guard(c); if (no) return no;
    const email = c.get("email");
    if (!(await c.env.AGENT_LIMIT.limit({ key: `app:${email}` })).success) return c.json({ error: "muitas chamadas no último minuto" }, 429);
    const x = await conn(c); if (!x) return c.json({ error: "conexão não encontrada" }, 404);
    const b = await c.req.json().catch(() => ({}));
    try {
      const result = await callTool(c.env, x, String(b.name ?? ""), b.arguments);
      c.executionCtx.waitUntil(deps.track(c.env, "app_call", { user: email, dims: { book: x.book_id, host: new URL(x.url).host, tool: String(b.name), via: "app" } }));
      return c.json({ result });
    } catch (e) { return fail(c, e); }
  });

  // ui/update-model-context: what the open app says about itself, kept per tool so every Claude in the room reads it.
  app.post("/api/books/:id/connections/:cid/context", async (c: any) => {
    const no = await guard(c); if (no) return no;
    const x = await conn(c); if (!x) return c.json({ error: "conexão não encontrada" }, 404);
    const b = await c.req.json().catch(() => ({}));
    const text = String(b.text ?? "").slice(0, 4000), tool = String(b.tool ?? "").slice(0, 100);
    if (findSecret(text)) return c.json({ error: "parece um segredo; não guardei" }, 400);
    const ctx = ctxOf(x);
    ctx[tool] = { text, by: c.get("email"), at: Date.now() };
    await c.env.DB.prepare(`UPDATE mcp_connections SET ctx = ? WHERE id = ?`).bind(JSON.stringify(ctx), x.id).run();
    return c.json({ ok: true });
  });
}
