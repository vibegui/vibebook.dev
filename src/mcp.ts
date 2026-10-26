// Admin MCP: plain JSON-RPC over POST (same shape as holocard), bearer MCP_AUTH_TOKEN.
// Each tool points at a ui://vibebook/* MCP-App resource; deco studio renders the
// single-file bundle (mcp-app/, built into dist-mcp/) in a sandboxed iframe and
// the app picks its view from the tool name.
import bundledHtml from "../dist-mcp/index.html";
import { adminOverview, DIMENSIONS, trafficOverview } from "./analytics";
import type { Env } from "./index";

const MCP_APP_MIME = "text/html;profile=mcp-app";
const HTML = bundledHtml as unknown as string;

const RESOURCES = [
  { uri: "ui://vibebook/admin", name: "Back office", description: "KPIs, atividade por dia, funil, uso da AI, pessoas e vibebooks." },
  { uri: "ui://vibebook/traffic", name: "Tráfego", description: "Page views com filtro cruzado: páginas, origens, países, navegador, rede." },
];

const TOOLS = [
  {
    name: "admin_overview",
    description:
      "Back office do vibebook: usuários, vibebooks, mensagens e chamadas @ai no período, atividade por dia, funil (landing → login → vibebook → convite → @ai), uso da AI por modo, usuários recentes e vibebooks mais ativos.",
    inputSchema: { type: "object", properties: { days: { type: "number", description: "Janela em dias (1-90, padrão 30)" } } },
    _meta: { ui: { resourceUri: "ui://vibebook/admin" } },
    run: (env: Env, a: Record<string, unknown>) => adminOverview(env, Number(a.days) || undefined),
  },
  {
    name: "traffic_overview",
    description:
      "Tráfego do site: page views por dia e rankings de página, origem, utm, país, navegador, sistema, dispositivo, rede (ASN), faixa de IP e colo. Cada dimensão é um filtro e cada ranking ignora o próprio filtro (filtro cruzado).",
    inputSchema: {
      type: "object",
      properties: {
        days: { type: "number", description: "Janela em dias (1-90, padrão 7)" },
        ...Object.fromEntries(DIMENSIONS.map((d) => [d, { type: "string", description: `Filtra por ${d}` }])),
      },
    },
    _meta: { ui: { resourceUri: "ui://vibebook/traffic" } },
    run: (env: Env, a: Record<string, unknown>) => {
      const q: Record<string, unknown> = { days: Number(a.days) || undefined };
      for (const d of DIMENSIONS) if (typeof a[d] === "string" && a[d]) q[d] = a[d];
      return trafficOverview(env, q);
    },
  },
];

const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
};

const rpcError = (id: unknown, code: number, message: string, status = 200) =>
  Response.json({ jsonrpc: "2.0", id, error: { code, message } }, { status });

export async function handleMcp(request: Request, env: Env): Promise<Response> {
  if (!env.MCP_AUTH_TOKEN) return rpcError(null, -32002, "MCP_AUTH_TOKEN is not configured.", 503);
  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token || !safeEqual(token, env.MCP_AUTH_TOKEN)) return rpcError(null, -32001, "Unauthorized. Send Authorization: Bearer <token>.", 401);
  if (request.method !== "POST") return new Response("MCP endpoint: POST JSON-RPC", { status: 405 });

  const body = (await request.json().catch(() => null)) as { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, any> } | null;
  if (!body || body.jsonrpc !== "2.0" || !body.method) return rpcError(null, -32600, "Invalid Request", 400);
  if (body.id === undefined) return new Response(null, { status: 202 });
  const p = body.params ?? {};
  try {
    let result: unknown;
    switch (body.method) {
      case "initialize":
        result = {
          protocolVersion: "2024-11-05",
          capabilities: { tools: { listChanged: false }, resources: {} },
          serverInfo: { name: "vibebook", version: "0.1.0" },
          instructions: "Back office do vibebook (somente leitura). Comece por admin_overview; para tráfego e origens use traffic_overview.",
        };
        break;
      case "ping":
        result = {};
        break;
      case "tools/list":
        result = { tools: TOOLS.map(({ run, ...t }) => t) };
        break;
      case "tools/call": {
        const tool = TOOLS.find((t) => t.name === p.name);
        if (!tool) throw new Error(`Unknown tool: ${p.name}`);
        const out = await tool.run(env, p.arguments && typeof p.arguments === "object" ? p.arguments : {});
        result = { content: [{ type: "text", text: JSON.stringify(out) }], structuredContent: out, isError: false };
        break;
      }
      case "resources/list":
        result = { resources: RESOURCES.map((r) => ({ ...r, mimeType: MCP_APP_MIME })) };
        break;
      case "resources/read": {
        if (!RESOURCES.some((r) => r.uri === p.uri)) throw new Error(`Unknown resource: ${p.uri}`);
        result = { contents: [{ uri: p.uri, mimeType: MCP_APP_MIME, text: HTML }] };
        break;
      }
      case "prompts/list":
        result = { prompts: [] };
        break;
      case "resources/templates/list":
        result = { resourceTemplates: [] };
        break;
      default:
        return rpcError(body.id, -32601, `Method not found: ${body.method}`);
    }
    return Response.json({ jsonrpc: "2.0", id: body.id, result });
  } catch (e) {
    return rpcError(body.id, -32603, e instanceof Error ? e.message : String(e));
  }
}
