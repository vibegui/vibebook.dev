// Connecting an agent: OAuth 2.1 (DCR + CIMD + PKCE, via workers-oauth-provider) in front of /mcp.
// /authorize signs the person in with the normal vibebook session and asks for consent; the grant's
// props carry only their email. The app lists and revokes grants through /api/agents.
import { reqLang } from "./lang";
import { nativeAuthPage,consentLoginUrl } from "./native-page";
import { AuthorizationError, CimdFetchError, type ConsentDescription, OAuthProvider } from "@cloudflare/workers-oauth-provider";
import { type Context, Hono } from "hono";
import { handleAgentMcp } from "./agent";
import { escapeHtml, identify } from "./auth";
import type { Env } from "./index";
import { track } from "./track";
import type { AgentGrantsResult, ConsentContext, ConsentError } from "../shared/schemas";
import { uiNavigationUrl, uiVariant } from "../shared/uiVariant";
import { withAgentGrant, type AgentProps } from "./agentGrant";
export type { AgentProps } from "./agentGrant";

export const SCOPE = "rooms";

// The resource URL is the request's own origin, so local dev (http://localhost:8787) works like prod.
const providers = new Map<string, OAuthProvider<Env>>();
export function providerFor(origin: string, defaultHandler: ExportedHandler<Env>) {
  let p = providers.get(origin);
  if (!p) {
    p = new OAuthProvider<Env>({
      apiRoute: "/mcp",
      apiHandler: {
        fetch: (req: Request, env: Env, ctx: ExecutionContext) => withAgentGrant(ctx.props, props => handleAgentMcp(req, env, ctx, props)),
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
    other: "Não é você? Entrar com outro email",
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
    other: "Not you? Sign in with another email",
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
  .other { margin-top: 14px; } .other button { background: none; padding: 0; font: 600 14px/1.4 inherit; font-family: inherit; color: oklch(0.45 0.13 250); text-decoration: underline; }
</style></head><body><div class="card">${body}</div></body></html>`;

const consentHtml = (t: (typeof T)[Lang], d: ConsentDescription & { redirectIsLoopback?: boolean }, me: string, handle: string, here: string) => {
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
<div class="row"><button class="yes" name="decision" value="approve">${t.allow}</button><button class="no" name="decision" value="deny">${t.deny}</button></div></form>
<form class="other" method="post" action="/auth/logout"><input type="hidden" name="next" value="${escapeHtml(here)}"><button>${t.other}</button></form>`,
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
  if (!email) return c.redirect(uiNavigationUrl(`/login?next=${encodeURIComponent(url.pathname + url.search)}`, url, uiVariant(url)));
  try {
    const oauth = c.env.OAUTH_PROVIDER;
    const request = await oauth.parseAuthRequest(c.req.raw);
    const details = await oauth.describeConsent(request);
    // Validate the original request before serving native UI. Its typed context GET creates the consent transaction.
    if (uiVariant(url) === "svelte") return nativeAuthPage(c.env, c.req.raw, "consent");
    const consent = await oauth.beginConsent(request);
    consent.headers.set("content-type", "text/html; charset=utf-8");
    return new Response(consentHtml(T[lang(c)], details, email, consent.handle, url.pathname + url.search), { headers: consent.headers });
  } catch (e) {
    if (uiVariant(url) === "svelte" && (e instanceof AuthorizationError || e instanceof CimdFetchError) && !(e instanceof AuthorizationError && e.redirectTo))
      return nativeAuthPage(c.env, c.req.raw, "consent", {status:400});
    return fail(c, e);
  }
});

connect.post("/authorize", async (c) => {
  const email = await identify(c);
  if (!email) return c.redirect(consentLoginUrl(c.req.url));
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
    const gid = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
    const { redirectTo } = await oauth.completeAuthorization({
      request: approved.request,
      userId: email,
      metadata: { client: clientName, at: Date.now(), gid },
      scope: approved.request.scope,
      props: { email, client: clientName, gid } satisfies AgentProps,
    });
    c.executionCtx.waitUntil(track(c.env, "agent_connected", { user: email, dims: { client: clientName } }));
    approved.headers.set("location", redirectTo);
    return new Response(null, { status: 302, headers: approved.headers });
  } catch (e) {
    if (uiVariant(c.req.url) === 'svelte' && !(e instanceof AuthorizationError && e.redirectTo)) {
      const known=e instanceof AuthorizationError || e instanceof CimdFetchError;
      // Presentation only: the provider still owns all validation/consumption and success headers.
      // Keep unexpected failures visible in server logs without disclosing details in the browser.
      if(!known)console.error('Native consent POST failed',e);
      return nativeAuthPage(c.env,c.req.raw,'consent',{status:known?400:500,consentFailure:true});
    }
    return fail(c, e);
  }
});

// App side: which agents are connected, when each was last used, and revoke.
/** The consent page's context for a native page (src/api.ts GET /api/authorize/context): the same parse, description and
 *  consent transaction as GET /authorize, on a request rebuilt at /authorize with the query unchanged (the library only
 *  accepts requests at its authorize endpoint). The transaction's binding cookie goes back with the answer; approving
 *  is still the form POST /authorize. A refused request answers its error, plus the client's error redirect when the
 *  library built one from a request it validated. */
export async function consentContext(env: Env, req: Request, email: string): Promise<{ context: ConsentContext; headers: [string, string][] } | (ConsentError & { status: 400 })> {
  const url = new URL(req.url);
  try {
    const oauth = env.OAUTH_PROVIDER;
    const request = await oauth.parseAuthRequest(new Request(new URL(`/authorize${url.search}`, url.origin), { headers: req.headers }));
    const d = await oauth.describeConsent(request);
    const consent = await oauth.beginConsent(request);
    return {
      context: { client_name: d.clientName, client_domain: d.clientDomain ?? null, redirect_host: d.redirectHost, redirect_is_loopback: !!d.redirectIsLoopback, scope: d.scope, email, handle: consent.handle },
      headers: [...consent.headers],
    };
  } catch (e) {
    if (e instanceof AuthorizationError) return { error: e.description ?? e.code ?? "invalid_request", ...(e.redirectTo ? { redirect_to: e.redirectTo } : {}), status: 400 };
    if (e instanceof CimdFetchError) return { error: "client metadata unavailable", status: 400 };
    throw e;
  }
}

/** Your Claudes' OAuth grants (the home's "connected agents" box): typed routes in src/api.ts call these. */
export function grantOps(env: Env, ctx: { waitUntil(p: Promise<unknown>): void }, email: string) {
  return {
    async list(): Promise<AgentGrantsResult> {
      const { items } = await env.OAUTH_PROVIDER.listUserGrants(email);
      const last = await env.DB.prepare(`SELECT max(ts) AS ts FROM events WHERE user = ? AND name = 'agent_call' AND ts > ?`)
        .bind(email, Date.now() - 90 * 86_400_000)
        .first<{ ts: number | null }>();
      // Last use per grant: grants made since Nov 2026 carry a gid that handleAgentMcp stamps in D1 grant_seen; older
      // ones only have the person-wide last call (null per grant = unknown).
      const gids = items.map((g) => (g.metadata as { gid?: string } | undefined)?.gid).filter(Boolean) as string[];
      const seen = gids.length
        ? Object.fromEntries((await env.DB.prepare(`SELECT gid, ts FROM grant_seen WHERE gid IN (SELECT value FROM json_each(?))`).bind(JSON.stringify(gids)).all<{ gid: string; ts: number }>()).results.map((r) => [r.gid, r.ts]))
        : {};
      return {
        agents: items.map((g) => {
          const gid = (g.metadata as { gid?: string } | undefined)?.gid;
          return { id: g.id, client: String((g.metadata as { client?: string } | undefined)?.client ?? g.clientId), connected_at: g.createdAt * 1000, used_at: gid ? (seen[gid] ?? null) : undefined };
        }),
        last_used: last?.ts ?? null,
      };
    },
    /** Remove several at once (the app's checkbox list), at most 100 per call. */
    async revoke(ids: string[]) {
      const list = ids.slice(0, 100);
      for (const id of list) await env.OAUTH_PROVIDER.revokeGrant(id, email);
      ctx.waitUntil(track(env, "agent_disconnected", { user: email, dims: { n: list.length } }));
      return list.length;
    },
  };
}
