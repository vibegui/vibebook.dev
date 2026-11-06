// Connecting an agent: OAuth 2.1 (DCR + CIMD + PKCE, via workers-oauth-provider) in front of /mcp.
// /authorize signs the person in with the normal vibebook session and asks for consent; the grant's
// props carry only their email. The app lists and revokes grants through /api/agents.
import { reqLang } from "./lang";
import { AuthorizationError, CimdFetchError, type ConsentDescription, OAuthProvider } from "@cloudflare/workers-oauth-provider";
import { type Context, Hono } from "hono";
import { handleAgentMcp } from "./agent";
import { escapeHtml, identify } from "./auth";
import type { Env } from "./index";
import { track } from "./track";

export const SCOPE = "rooms";
export type AgentProps = { email: string; client: string };

// The resource URL is the request's own origin, so local dev (http://localhost:8787) works like prod.
const providers = new Map<string, OAuthProvider<Env>>();
export function providerFor(origin: string, defaultHandler: ExportedHandler<Env>) {
  let p = providers.get(origin);
  if (!p) {
    p = new OAuthProvider<Env>({
      apiRoute: "/mcp",
      apiHandler: {
        fetch: (req: Request, env: Env, ctx: ExecutionContext) => handleAgentMcp(req, env, ctx, (ctx as unknown as { props: AgentProps }).props),
      },
      defaultHandler,
      authorizeEndpoint: "/authorize",
      tokenEndpoint: "/oauth/token",
      clientRegistrationEndpoint: "/oauth/register",
      clientIdMetadataDocumentEnabled: true,
      scopesSupported: [SCOPE, "offline_access"],
      requiredScopes: [SCOPE],
      resourceMetadata: { resource: `${origin}/mcp`, authorization_servers: [origin] },
      // A connection lives while the agent keeps using it; idle for 30 days, it has to reconnect.
      refreshTokenIdleTTL: 30 * 24 * 60 * 60,
    });
    providers.set(origin, p);
  }
  return p;
}

type Lang = "pt" | "en";
const lang = (c: Context): Lang => reqLang(c.req.raw);

const T = {
  pt: {
    title: (n: string) => `Conectar ${n} ao vibebook`,
    lede: (me: string) => `Conectado como <b>${me}</b>. Ele vai poder:`,
    can: ["Ver as salas em que você está, e só elas", "Ler as mensagens, o doc e as tarefas", "Postar nas salas em seu nome, marcado como “agent de você”"],
    cant: "Ele não vê seu email, não convida ninguém sem você pedir e você desconecta quando quiser em vibebook.dev/app.",
    from: (d: string) => `Publicado por <b>${d}</b>.`,
    self: "Esse app se registrou sozinho: o nome não é verificado.",
    goes: (h: string) => `O acesso vai para <b>${h}</b>.`,
    local: "Isso manda o acesso para um app no seu computador. Continue só se você acabou de pedir pra conectar.",
    allow: "Permitir",
    deny: "Cancelar",
    expired: "Esse pedido expirou ou já foi usado. Volte ao seu agent e tente conectar de novo.",
  },
  en: {
    title: (n: string) => `Connect ${n} to vibebook`,
    lede: (me: string) => `Signed in as <b>${me}</b>. It will be able to:`,
    can: ["See the rooms you're in, and only those", "Read messages, the doc and tasks", "Post in rooms for you, labeled as “your agent”"],
    cant: "It can't see your email inbox, won't invite anyone unless you ask, and you can disconnect it anytime at vibebook.dev/app.",
    from: (d: string) => `Published by <b>${d}</b>.`,
    self: "This app registered itself; its name is not verified.",
    goes: (h: string) => `Access goes to <b>${h}</b>.`,
    local: "This sends access to an app on your computer. Continue only if you just asked to connect.",
    allow: "Allow",
    deny: "Cancel",
    expired: "This request expired or was already used. Go back to your agent and connect again.",
  },
};

const page = (title: string, body: string) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#1d5fc4"><title>${title}</title><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Schibsted+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  html, body { margin: 0; background: oklch(0.5 0.17 248); color: oklch(0.2 0.02 250); color-scheme: light; }
  body { font: 16px/1.5 "Schibsted Grotesk", system-ui, sans-serif; min-height: 100dvh; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
  .card { background: #fff; border-radius: 22px; padding: 28px; max-width: 460px; width: 100%; box-shadow: 0 40px 80px -30px oklch(0.15 0.1 250 / .7); box-sizing: border-box; }
  h1 { font: 400 28px/1.1 Caprasimo, Georgia, serif; margin: 0 0 14px; }
  ul { padding-left: 20px; margin: 8px 0 16px; } li + li { margin-top: 4px; }
  .muted { color: oklch(0.45 0.02 250); font-size: 14px; }
  .warn { background: oklch(0.95 0.06 95); border-radius: 12px; padding: 10px 12px; font-size: 14px; }
  .row { display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap; }
  button { font: 700 15px/1 inherit; font-family: inherit; border: 0; border-radius: 999px; padding: 13px 22px; cursor: pointer; }
  .yes { background: oklch(0.9 0.16 98); color: oklch(0.2 0.06 250); box-shadow: 0 4px 0 oklch(0.72 0.14 90); }
  .no { background: transparent; box-shadow: inset 0 0 0 2px oklch(0.91 0.01 245); }
</style></head><body><div class="card">${body}</div></body></html>`;

const consentHtml = (t: (typeof T)[Lang], d: ConsentDescription & { redirectIsLoopback?: boolean }, me: string, handle: string) => {
  const name = escapeHtml(d.clientName);
  return page(
    t.title(name),
    `<h1>${t.title(name)}</h1>
<p>${t.lede(escapeHtml(me))}</p>
<ul>${t.can.map((x) => `<li>${x}</li>`).join("")}</ul>
<p class="muted">${t.cant}</p>
<p class="muted">${d.clientDomain ? t.from(escapeHtml(d.clientDomain)) : t.self} ${t.goes(escapeHtml(d.redirectHost))}</p>
${d.redirectIsLoopback ? `<p class="warn">${t.local}</p>` : ""}
<form method="post"><input type="hidden" name="handle" value="${escapeHtml(handle)}">
<div class="row"><button class="yes" name="decision" value="approve">${t.allow}</button><button class="no" name="decision" value="deny">${t.deny}</button></div></form>`,
  );
};

export const connect = new Hono<{ Bindings: Env }>();

const fail = (c: Context, e: unknown) => {
  if (e instanceof AuthorizationError && e.redirectTo) return c.redirect(e.redirectTo, 302);
  if (e instanceof AuthorizationError || e instanceof CimdFetchError) {
    const t = T[lang(c)];
    return c.html(page("vibebook", `<h1>vibebook</h1><p>${e instanceof AuthorizationError ? escapeHtml(e.description ?? t.expired) : t.expired}</p>`), 400);
  }
  throw e;
};

connect.get("/authorize", async (c) => {
  const email = await identify(c);
  const url = new URL(c.req.url);
  if (!email) return c.redirect(`/login?next=${encodeURIComponent(url.pathname + url.search)}`);
  try {
    const oauth = c.env.OAUTH_PROVIDER;
    const request = await oauth.parseAuthRequest(c.req.raw);
    const details = await oauth.describeConsent(request);
    const consent = await oauth.beginConsent(request);
    consent.headers.set("content-type", "text/html; charset=utf-8");
    return new Response(consentHtml(T[lang(c)], details, email, consent.handle), { headers: consent.headers });
  } catch (e) {
    return fail(c, e);
  }
});

connect.post("/authorize", async (c) => {
  const email = await identify(c);
  if (!email) return c.redirect("/login");
  try {
    const oauth = c.env.OAUTH_PROVIDER;
    const form = await c.req.raw.clone().formData();
    const handle = String(form.get("handle") ?? "");
    if (form.get("decision") !== "approve") {
      const denied = await oauth.denyConsent(c.req.raw, handle);
      return new Response(null, { status: 302, headers: denied.headers });
    }
    const approved = await oauth.approveConsent(c.req.raw, handle, { scope: [SCOPE, "offline_access"] });
    const client = await oauth.lookupClient(approved.request.clientId);
    const clientName = (client?.clientName || approved.request.clientId).slice(0, 80);
    const { redirectTo } = await oauth.completeAuthorization({
      request: approved.request,
      userId: email,
      metadata: { client: clientName, at: Date.now() },
      scope: approved.request.scope,
      props: { email, client: clientName } satisfies AgentProps,
    });
    c.executionCtx.waitUntil(track(c.env, "agent_connected", { user: email, dims: { client: clientName } }));
    approved.headers.set("location", redirectTo);
    return new Response(null, { status: 302, headers: approved.headers });
  } catch (e) {
    return fail(c, e);
  }
});

// App side: which agents are connected, when each was last used, and revoke.
connect.get("/api/agents", async (c) => {
  const email = await identify(c);
  if (!email) return c.json({ error: "unauthenticated" }, 401);
  const { items } = await c.env.OAUTH_PROVIDER.listUserGrants(email);
  const last = await c.env.DB.prepare(`SELECT max(ts) AS ts FROM events WHERE user = ? AND name = 'agent_call' AND ts > ?`)
    .bind(email, Date.now() - 90 * 86_400_000)
    .first<{ ts: number | null }>();
  return c.json({
    agents: items.map((g) => ({ id: g.id, client: g.metadata?.client ?? g.clientId, connected_at: g.createdAt * 1000 })),
    last_used: last?.ts ?? null,
  });
});

connect.delete("/api/agents/:id", async (c) => {
  const email = await identify(c);
  if (!email) return c.json({ error: "unauthenticated" }, 401);
  if (c.req.header("origin") && c.req.header("origin") !== new URL(c.req.url).origin) return c.json({ error: "bad origin" }, 403);
  await c.env.OAUTH_PROVIDER.revokeGrant(c.req.param("id"), email);
  c.executionCtx.waitUntil(track(c.env, "agent_disconnected", { user: email }));
  return c.json({ ok: true });
});
