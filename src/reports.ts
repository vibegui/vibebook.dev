// vibebook's own numbers, yesterday vs the 7 days before, as markdown for the MCP tool `metrics` (METRICS_EMAILS only).
// The daily posts are room reminders (reminders/*.md in vibebook-growth and vibebook-product) that tell a Claude to call it.
// - growth: our own D1 events: visitors, pageviews, the funnel, active people, top pages/sources.
// - product: Cloudflare's GraphQL analytics for the Worker (requests, errors, CPU/wall time,
//   response bytes) and the zone (requests, bandwidth, cache). Needs CF_ANALYTICS_TOKEN (Account Analytics: Read,
//   Zone Analytics: Read, Zone: Read); without it the report says so instead of showing numbers.
// Test people (@test.vibebook.dev) are left out. Check: bun scripts/reports-check.ts (formatting only).
import { AiSpend } from "../shared/schemas";
import type { Env } from "./index";

const DAY = 86_400_000;
const BRT = 3 * 3600_000; // São Paulo, no DST since 2019
const NOT_TEST = `coalesce(user, '') NOT LIKE '%@test.vibebook.dev'`;
const FUNNEL = [
  ["pageview", "visitaram o site"],
  ["login", "fizeram login (e-mail, Google, GitHub ou convite)"],
  ["signup", "criaram conta"],
  ["book_created", "criaram uma sala"],
  ["agent_connected", "conectaram o Claude"],
] as const;

/** [start, end) of "yesterday" in São Paulo, in ms. */
export function yesterday(now = Date.now()) {
  const end = Math.floor((now - BRT) / DAY) * DAY + BRT;
  return { start: end - DAY, end };
}

const pct = (a: number, b: number) => (b ? `${a >= b ? "+" : ""}${Math.round(((a - b) / b) * 100)}%` : "novo");
/** "12 (+20% vs média 10)" against the daily average of the week before. */
export const vs = (n: number, weekTotal: number) => {
  const avg = weekTotal / 7;
  return avg ? `**${n}** (${pct(n, avg)} vs média ${avg < 10 ? avg.toFixed(1) : Math.round(avg)})` : `**${n}**`;
};
export const bytes = (n: number) => (n >= 1e9 ? `${(n / 1e9).toFixed(1)} GB` : n >= 1e6 ? `${(n / 1e6).toFixed(1)} MB` : `${Math.round(n / 1e3)} KB`);
const day = (ms: number) => new Date(ms - BRT).toISOString().slice(0, 10);

async function counts(env: Env, start: number, end: number) {
  const r = await env.DB.prepare(
    `SELECT name, count(*) AS n, count(DISTINCT coalesce(nullif(visitor, ''), user)) AS v FROM events
     WHERE name IN (${FUNNEL.map(() => "?").join(",")}) AND ts >= ? AND ts < ? AND ${NOT_TEST} GROUP BY name`,
  )
    .bind(...FUNNEL.map((f) => f[0]), start, end)
    .all<{ name: string; n: number; v: number }>();
  const active = await env.DB.prepare(
    `SELECT count(DISTINCT user) AS n FROM events WHERE ts >= ? AND ts < ? AND user != '' AND name != 'login_code_sent' AND ${NOT_TEST}`,
  )
    .bind(start, end)
    .first<{ n: number }>();
  const by = Object.fromEntries(r.results.map((x) => [x.name, x]));
  return { by: (k: string) => by[k] ?? { n: 0, v: 0 }, active: active?.n ?? 0 };
}

export async function growthReport(env: Env, now = Date.now()) {
  const { start, end } = yesterday(now);
  const [y, w] = await Promise.all([counts(env, start, end), counts(env, start - 7 * DAY, start)]);
  const top = async (expr: string, limit: number) =>
    (
      await env.DB.prepare(
        `SELECT ${expr} AS k, count(DISTINCT visitor) AS v FROM events WHERE name = 'pageview' AND ts >= ? AND ts < ? GROUP BY k ORDER BY v DESC LIMIT ${limit}`,
      )
        .bind(start, end)
        .all<{ k: string | null; v: number }>()
    ).results.filter((x) => x.k);
  const [pages, rawRefs] = await Promise.all([top("path", 5), top("json_extract(dims, '$.ref')", 100)]);
  const refs = externalRefs(rawRefs as { k: string; v: number }[]);
  const pv = y.by("pageview"), pw = w.by("pageview");
  const funnel = FUNNEL.map(([k, label], i) => {
    // pageview and login count distinct people (one visitor logs in more than once); the rest are one-per-person events
    const count = (key: string) => (key === "pageview" || key === "login" ? y.by(key).v : y.by(key).n);
    const n = count(k);
    const prev = i ? count(FUNNEL[i - 1][0]) : 0;
    return `${i + 1}. ${n} ${label}${i && prev ? ` (${Math.round((n / prev) * 100)}%)` : ""}`;
  });
  return [
    `**📈 Growth · ${day(end - 1)}** (ontem, vs média diária dos 7 dias antes)`,
    "",
    `- Visitantes: ${vs(pv.v, pw.v)}`,
    `- Pageviews: ${vs(pv.n, pw.n)}`,
    `- Pessoas ativas (logadas, qualquer ação): ${vs(y.active, w.active)}`,
    `- Contas novas: ${vs(y.by("signup").n, w.by("signup").n)} · salas novas: ${vs(y.by("book_created").n, w.by("book_created").n)}`,
    "",
    "**Funil de ontem**",
    ...funnel,
    pages.length ? `\n**Páginas** ${pages.map((p) => `${p.k} (${p.v})`).join(" · ")}` : "",
    refs.length ? `**De onde vieram** ${refs.map((p) => `${p.k} (${p.v})`).join(" · ")}` : "",
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");
}

/** Referrers folded to their host, our own pages left out (that's navigation, not a source). */
export function externalRefs(rows: { k: string; v: number }[]) {
  const by = new Map<string, number>();
  for (const r of rows) {
    let host = "";
    try { host = new URL(r.k).hostname.replace(/^www\./, ""); } catch { continue; }
    if (!host || /(^|\.)vibebook\.dev$|^127\.0\.0\.1$|^localhost$/.test(host)) continue;
    by.set(host, (by.get(host) ?? 0) + r.v);
  }
  return [...by].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => ({ k, v }));
}

async function cfQuery(env: Env, query: string, variables: Record<string, unknown>) {
  const r = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: { authorization: `Bearer ${env.CF_ANALYTICS_TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const j = (await r.json().catch(() => ({}))) as { data?: any; errors?: { message: string }[] };
  if (!r.ok || j.errors?.length) throw new Error(j.errors?.map((e) => e.message).join("; ") || `HTTP ${r.status}`);
  return j.data;
}

const WORKER_Q = `query($acc: string!, $from: Time!, $to: Time!) { viewer { accounts(filter: { accountTag: $acc }) {
  workersInvocationsAdaptive(limit: 10, filter: { scriptName: "vibebook", datetime_geq: $from, datetime_lt: $to }) {
    dimensions { status } sum { requests errors subrequests responseBodySize } quantiles { cpuTimeP50 cpuTimeP99 wallTimeP50 wallTimeP99 } } } } }`;
const ZONE_Q = `query($zone: string!, $from: Date!, $to: Date!) { viewer { zones(filter: { zoneTag: $zone }) {
  httpRequests1dGroups(limit: 10, filter: { date_geq: $from, date_lt: $to }) { dimensions { date } sum { requests bytes cachedBytes threats } uniq { uniques } } } } }`;

/** Failures agents reported themselves (MCP report_issue): yesterday vs the week before by kind, then the latest texts.
 *  dims parsed here, not with json_extract: a `what` cut mid-emoji is JSON SQLite refuses (D1 "malformed JSON"). */
async function issuesLine(env: Env, start: number, end: number) {
  const r = await env.DB.prepare(`SELECT ts, dims FROM events WHERE name = 'agent_issue' AND ts >= ? AND ts < ? AND ${NOT_TEST} ORDER BY ts DESC LIMIT 500`)
    .bind(start - 7 * DAY, Date.now())
    .all<{ ts: number; dims: string }>();
  const rows = r.results.map((x) => {
    let d: { kind?: string; model?: string; what?: string } = {};
    try {
      d = JSON.parse(x.dims);
    } catch {
      // Rows from before fitDims: the JSON was cut at 512 chars. Take what's there.
      const f = (k: string) => new RegExp(`"${k}":"((?:[^"\\\\]|\\\\.)*)`).exec(x.dims)?.[1]?.replace(/\\(.)/g, "$1");
      d = { kind: f("kind"), model: f("model"), what: f("what") ? `${f("what")}…` : undefined };
    }
    return { ts: x.ts, kind: d.kind || "other", model: d.model, what: d.what ?? "" };
  });
  const y = rows.filter((x) => x.ts >= start && x.ts < end);
  const w = rows.filter((x) => x.ts < start);
  const kinds = Object.entries(y.reduce<Record<string, number>>((m, x) => ((m[x.kind] = (m[x.kind] ?? 0) + 1), m), {})).map(([k, n]) => `${k} ${n}`).join(", ");
  // The latest ones (7 days up to now), so they can be read and turned into work: the text is the Claude's own, secret-filtered.
  const items = rows
    .filter((x) => x.ts >= end - 7 * DAY)
    .slice(0, 10)
    .map((x) => `\n  - ${day(x.ts)} · ${x.kind}${x.model ? ` · ${x.model}` : ""}: ${x.what.replace(/\s+/g, " ").slice(0, 220)}`)
    .join("");
  return `- Falhas reportadas pelos Claudes (\`report_issue\`): ${vs(y.length, w.length)}${kinds ? ` · ${kinds}` : ""}${items}`;
}

/** Claudes stuck in the terminal (permission, question, plan) that asked in the room, and how many the room answered. */
async function unblockLine(env: Env, start: number, end: number) {
  const r = await env.DB.prepare(`SELECT name, count(*) AS n FROM events WHERE name IN ('terminal_ask', 'terminal_answered') AND ts >= ? AND ts < ? AND ${NOT_TEST} GROUP BY name`).bind(start, end).all<{ name: string; n: number }>();
  const n = (k: string) => r.results.find((x) => x.name === k)?.n ?? 0;
  return n("terminal_ask") ? `\n- Travas do terminal levadas pra sala (permissão, pergunta, plano): **${n("terminal_ask")}**, resolvidas pela sala ${n("terminal_answered")}; o resto caiu no terminal` : "";
}

/** Opening a room (the WS state): how many, average size, and the fattest one with its biggest fields. */
async function wsStateLine(env: Env, start: number, end: number) {
  const r = await env.DB.prepare(`SELECT count(*) AS n, avg(json_extract(dims, '$.bytes')) AS avg, max(json_extract(dims, '$.bytes')) AS mx FROM events WHERE name = 'ws_state' AND ts >= ? AND ts < ?`).bind(start, end).first<{ n: number; avg: number; mx: number }>();
  if (!r?.n) return "";
  const big = await env.DB.prepare(`SELECT json_extract(dims, '$.book') AS book, json_extract(dims, '$.top') AS top FROM events WHERE name = 'ws_state' AND ts >= ? AND ts < ? ORDER BY json_extract(dims, '$.bytes') DESC LIMIT 1`).bind(start, end).first<{ book: string; top: string }>();
  const push = await env.DB.prepare(`SELECT json_extract(dims, '$.t') AS t, count(*) AS n, sum(json_extract(dims, '$.bytes')) AS b FROM events WHERE name = 'ws_push' AND ts >= ? AND ts < ? GROUP BY t ORDER BY b DESC LIMIT 4`).bind(start, end).all<{ t: string; n: number; b: number }>();
  const pushes = push.results.map((x) => `${x.t} ${bytes(x.b)} (${x.n}×)`).join(" · ");
  // Who opens rooms that often (a phone reconnecting on every wake, a tab left open across deploys…): name only.
  const who = await env.DB.prepare(`SELECT user, count(*) AS n, sum(json_extract(dims, '$.bytes')) AS b FROM events WHERE name = 'ws_state' AND ts >= ? AND ts < ? GROUP BY user ORDER BY n DESC LIMIT 3`).bind(start, end).all<{ user: string; n: number; b: number }>();
  const people = who.results.map((x) => `${(x.user ?? "?").split("@")[0]} ${x.n}× (${bytes(x.b)})`).join(" · ");
  // Reconnects by the close code of the socket they replace (rc): 1006 = dropped without a close (network/sleep), 1001 = going away (deploy/tab), none = a fresh open.
  const rcs = await env.DB.prepare(`SELECT coalesce(json_extract(dims, '$.rc'), '-') AS rc, count(*) AS n FROM events WHERE name = 'ws_state' AND ts >= ? AND ts < ? GROUP BY rc ORDER BY n DESC LIMIT 6`).bind(start, end).all<{ rc: string; n: number }>();
  const rcLine = rcs.results.map((x) => `${x.rc === "-" ? "abertura" : `rc ${x.rc}`} ${x.n}×`).join(" · ");
  return `\n- Abrir sala (estado do WS, últimas 24h): **${r.n}×**, média ${bytes(r.avg)}, maior ${bytes(r.mx)} (sala ${big?.book}: ${big?.top})${people ? `\n  - Quem mais abriu: ${people}` : ""}${rcLine ? `\n  - Reconexões pelo código do socket anterior: ${rcLine}` : ""}${pushes ? `\n- Empurrões grandes pelo WS (≥20 KB): ${pushes}` : ""}`;
}

/** The Claudes' tool calls (agent_call) by tool and client: what the /mcp requests are. */
async function agentCallLine(env: Env, start: number, end: number) {
  const r = await env.DB.prepare(`SELECT json_extract(dims, '$.tool') AS tool, json_extract(dims, '$.client') AS client, count(*) AS n FROM events WHERE name = 'agent_call' AND ts >= ? AND ts < ? GROUP BY tool, client ORDER BY n DESC LIMIT 6`).bind(start, end).all<{ tool: string; client: string; n: number }>();
  const total = await env.DB.prepare(`SELECT count(*) AS n FROM events WHERE name = 'agent_call' AND ts >= ? AND ts < ?`).bind(start, end).first<{ n: number }>();
  if (!total?.n) return "";
  return `\n- Chamadas de tool dos Claudes (últimas 24h, sem as escutas wait_for_messages/claude_rooms): **${total.n}** · ${r.results.map((x) => `${x.tool}/${x.client || "?"} ${x.n}`).join(" · ")}`;
}

export async function productReport(env: Env, now = Date.now()) {
  const { start, end } = yesterday(now);
  const head = `**⚙️ Produto · ${day(end - 1)}** (ontem, vs média diária dos 7 dias antes)\n\n${await issuesLine(env, start, end).catch((e) => `- Falhas reportadas pelos Claudes: não consegui ler (${String((e as Error)?.message ?? e).slice(0, 160)})`)}${await unblockLine(env, start, end).catch(() => "")}${await wsStateLine(env, now - DAY, now).catch(() => "")}${await agentCallLine(env, now - DAY, now).catch(() => "")}`;
  if (!env.CF_ANALYTICS_TOKEN) return `${head}\n\nSem números da Cloudflare ainda: falta o token de analytics (secret \`CF_ANALYTICS_TOKEN\`, leitura de analytics da conta e da zona vibebook.dev).`;
  try {
    const iso = (ms: number) => new Date(ms).toISOString();
    const worker = async (from: number, to: number) => {
      const rows = (await cfQuery(env, WORKER_Q, { acc: env.CF_ACCOUNT_ID, from: iso(from), to: iso(to) })).viewer.accounts[0]?.workersInvocationsAdaptive ?? [];
      const sum = (k: string) => rows.reduce((t: number, r: any) => t + (r.sum?.[k] ?? 0), 0);
      // Quantiles come per row (status, etc.); the busiest row stands for the day.
      const q = [...rows].sort((a: any, b: any) => b.sum.requests - a.sum.requests)[0]?.quantiles ?? {};
      // Errors by invocation status: a socket or long-poll the client dropped (clientDisconnected) is not a bug.
      const byStatus = rows.filter((r: any) => r.sum.errors).sort((a: any, b: any) => b.sum.errors - a.sum.errors).map((r: any) => `${r.dimensions?.status ?? "?"} ${r.sum.errors}`).join(" · ");
      return { requests: sum("requests"), errors: sum("errors"), sub: sum("subrequests"), body: sum("responseBodySize"), q, byStatus };
    };
    const [wy, ww] = await Promise.all([worker(start, end), worker(start - 7 * DAY, start)]);
    let zone = "";
    const zid = await zoneId(env);
    if (zid) {
      const days = (await cfQuery(env, ZONE_Q, { zone: zid, from: day(start - 7 * DAY + 1), to: day(end + 1) })).viewer.zones[0]?.httpRequests1dGroups ?? [];
      const yd = days.find((d: any) => d.dimensions.date === day(end - 1));
      const wk = days.filter((d: any) => d.dimensions.date !== day(end - 1));
      const tot = (k: string) => wk.reduce((t: number, d: any) => t + (d.sum[k] ?? 0), 0);
      if (yd) zone = [
        "",
        "**Zona vibebook.dev** (tudo que passa pela CF)",
        `- Requests: ${vs(yd.sum.requests, tot("requests"))} · visitantes únicos ${yd.uniq.uniques}`,
        `- Banda: **${bytes(yd.sum.bytes)}** (média ${bytes(tot("bytes") / 7)}) · do cache ${yd.sum.bytes ? Math.round((yd.sum.cachedBytes / yd.sum.bytes) * 100) : 0}%`,
        yd.sum.threats ? `- Ameaças bloqueadas: ${yd.sum.threats}` : "",
      ].filter(Boolean).join("\n");
      zone += await kindLines(env, zid, start, end, now).catch((e) => `\n\n(requests por tipo indisponíveis: ${String((e as Error).message).slice(0, 120)})`);
      zone += await bytesLines(env, zid, start, end).catch((e) => `\n\n(banda por rota indisponível: ${String((e as Error).message).slice(0, 120)})`);
    }
    const errRate = wy.requests ? ((wy.errors / wy.requests) * 100).toFixed(2) : "0";
    return [
      head,
      "",
      "**Worker vibebook**",
      `- Requests: ${vs(wy.requests, ww.requests)}`,
      `- Erros: ${vs(wy.errors, ww.errors)} (${errRate}% dos requests)${wy.byStatus ? ` · ${wy.byStatus}` : ""}`,
      `- Tempo de parede p50 / p99: **${ms(wy.q.wallTimeP50)} / ${ms(wy.q.wallTimeP99)}** · CPU p50 / p99: ${ms(wy.q.cpuTimeP50)} / ${ms(wy.q.cpuTimeP99)}`,
      `- Resposta enviada: **${bytes(wy.body)}** (média ${bytes(ww.body / 7)}) · subrequests ${wy.sub}`,
      zone,
    ].join("\n");
  } catch (e) {
    return `${head}\n\nNão consegui ler a Cloudflare: ${String((e as Error).message).slice(0, 300)}`;
  }
}
// Requests by kind in a window (zone, adaptive): the Claudes' MCP (/mcp: long-polls and tool calls), the app's API and
// sockets, and everything else (pages, assets). Per hour, so yesterday and the last hour compare.
const KIND_Q = `query($zone: string!, $from: Time!, $to: Time!) { viewer { zones(filter: { zoneTag: $zone }) {
  all: httpRequestsAdaptiveGroups(limit: 1, filter: { datetime_geq: $from, datetime_lt: $to }) { count }
  mcp: httpRequestsAdaptiveGroups(limit: 1, filter: { datetime_geq: $from, datetime_lt: $to, clientRequestPath: "/mcp" }) { count }
  api: httpRequestsAdaptiveGroups(limit: 1, filter: { datetime_geq: $from, datetime_lt: $to, clientRequestPath_like: "/api/%" }) { count }
  ws: httpRequestsAdaptiveGroups(limit: 1, filter: { datetime_geq: $from, datetime_lt: $to, clientRequestPath_like: "/ws%" }) { count } } } }`;
async function kinds(env: Env, zone: string, from: number, to: number) {
  const z = (await cfQuery(env, KIND_Q, { zone, from: new Date(from).toISOString(), to: new Date(to).toISOString() })).viewer.zones[0] ?? {};
  const n = (k: string) => z[k]?.[0]?.count ?? 0;
  const h = (to - from) / 3600_000;
  const per = (x: number) => Math.round(x / h);
  return { mcp: per(n("mcp")), app: per(n("api") + n("ws")), other: per(n("all") - n("mcp") - n("api") - n("ws")) };
}
async function kindLines(env: Env, zone: string, start: number, end: number, now: number) {
  const [y, last] = await Promise.all([kinds(env, zone, start, end), kinds(env, zone, now - 3600_000, now)]);
  const row = (k: { mcp: number; app: number; other: number }) => `Claudes (/mcp) **${k.mcp}** · app (/api, /ws) ${k.app} · páginas e o resto ${k.other}`;
  return ["", "**Requests por hora, por tipo**", `- Ontem (média): ${row(y)}`, `- Última hora: ${row(last)}`].join("\n");
}
// Where the bandwidth went: yesterday's paths by bytes sent (ids folded into :id), plus content types, so a spike
// arrives with its origin instead of a guess.
// requestSource "eyeball" = real visitors and Claudes. The Workers' own Cache API calls also land in the zone's
// analytics (the site's /__deco_cache/*, the cached OAuth client metadata of claude.ai), and a cache miss there reads
// as a 504: Nov 2026's report listed 49 of those as errors.
const BYTES_Q = `query($zone: string!, $from: Time!, $to: Time!) { viewer { zones(filter: { zoneTag: $zone }) {
  paths: httpRequestsAdaptiveGroups(limit: 300, orderBy: [sum_edgeResponseBytes_DESC], filter: { datetime_geq: $from, datetime_lt: $to, requestSource: "eyeball" }) { count sum { edgeResponseBytes } dimensions { clientRequestPath } }
  types: httpRequestsAdaptiveGroups(limit: 6, orderBy: [sum_edgeResponseBytes_DESC], filter: { datetime_geq: $from, datetime_lt: $to, requestSource: "eyeball" }) { count sum { edgeResponseBytes } dimensions { edgeResponseContentTypeName } }
  errs: httpRequestsAdaptiveGroups(limit: 50, orderBy: [count_DESC], filter: { datetime_geq: $from, datetime_lt: $to, edgeResponseStatus_geq: 500, requestSource: "eyeball" }) { count dimensions { clientRequestPath edgeResponseStatus } } } } }`;
export const foldPath = (p: string) => p.replace(/\/[0-9a-f]{8,}(?=\/|$)/gi, "/:id").replace(/\/avatar\/[^/]+/, "/avatar/:email").replace(/\/upload\/[^/]+/, "/upload/:token");
async function bytesLines(env: Env, zone: string, from: number, to: number) {
  const z = (await cfQuery(env, BYTES_Q, { zone, from: new Date(from).toISOString(), to: new Date(to).toISOString() })).viewer.zones[0] ?? {};
  const by = new Map<string, { b: number; n: number }>();
  for (const r of z.paths ?? []) {
    const k = foldPath(r.dimensions.clientRequestPath);
    const o = by.get(k) ?? { b: 0, n: 0 };
    o.b += r.sum.edgeResponseBytes; o.n += r.count; by.set(k, o);
  }
  const top = [...by].sort((a, b) => b[1].b - a[1].b).slice(0, 8);
  const types = (z.types ?? []).map((r: any) => `${r.dimensions.edgeResponseContentTypeName || "?"} ${bytes(r.sum.edgeResponseBytes)}`).join(" · ");
  const errs = new Map<string, number>();
  for (const r of z.errs ?? []) { const k = `${r.dimensions.edgeResponseStatus} ${foldPath(r.dimensions.clientRequestPath)}`; errs.set(k, (errs.get(k) ?? 0) + r.count); }
  const errTop = [...errs].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, n]) => `\`${k}\` ${n}`).join(" · ");
  return ["", "", "**Banda por rota** (ontem, top 8)", ...top.map(([k, o]) => `- \`${k}\` **${bytes(o.b)}** · ${o.n} req · ${bytes(o.b / o.n)} cada`), `- Por tipo: ${types}`, `- 5xx por rota: ${errTop || "nenhum"}`].join("\n");
}
// Quantiles come in microseconds.
const ms = (us?: number) => (us == null ? "?" : us >= 1e6 ? `${(us / 1e6).toFixed(1)}s` : `${Math.round(us / 1000)}ms`);

async function zoneId(env: Env) {
  const r = await fetch("https://api.cloudflare.com/client/v4/zones?name=vibebook.dev", { headers: { authorization: `Bearer ${env.CF_ANALYTICS_TOKEN}` } });
  const j = (await r.json().catch(() => ({}))) as { result?: { id: string }[] };
  return j.result?.[0]?.id ?? null;
}

// What vibebook spent on models (Gui, room #1965): every model call that records its cost in D1 events (by event and
// model), the hub router's own log, and OpenRouter's word for the whole key (it also covers calls that don't record a
// cost, like creating a room in one step). Jev is billed through OpenRouter too, on input only.
const COST_EVENTS: Record<string, "jev" | "llm"> = {
  grade: "jev",
  waits: "jev",
  embed_check: "jev",
  suggest_check: "jev",
  classify: "llm",
  home_route: "llm",
  reminder_parse: "llm",
  mention_mail: "llm",
  mention_mail_preview: "llm",
  ai_run: "llm",
};
export async function aiSpend(env: Env, now = Date.now()): Promise<AiSpend> {
  const names = Object.keys(COST_EVENTS);
  const marks = names.map(() => "?").join(",");
  // name IN (…) and ts: the (name, ts) index covers both.
  const byEvent = await env.DB.prepare(
    `SELECT name, coalesce(json_extract(dims, '$.model'), '') AS model, count(*) AS n, sum(coalesce(json_extract(dims, '$.cost'), 0)) AS cost, min(ts) AS first FROM events WHERE name IN (${marks}) GROUP BY name, model ORDER BY cost DESC`,
  )
    .bind(...names)
    .all<{ name: string; model: string; n: number; cost: number; first: number }>();
  const from = now - 30 * DAY;
  const daily = await env.DB.prepare(
    `SELECT CAST((ts - ?) / ${DAY} AS INTEGER) AS d, name, sum(coalesce(json_extract(dims, '$.cost'), 0)) AS cost FROM events WHERE name IN (${marks}) AND ts >= ? GROUP BY d, name`,
  )
    .bind(from, ...names, from)
    .all<{ d: number; name: string; cost: number }>();
  const router = await env.DB.prepare(`SELECT arm, count(*) AS n, sum(coalesce(cost, 0)) AS cost FROM router_log GROUP BY arm`)
    .all<{ arm: string; n: number; cost: number }>()
    .catch(() => ({ results: [] as { arm: string; n: number; cost: number }[] }));
  let key: { usage: number; limit: number | null; daily: number | null; weekly: number | null; monthly: number | null } | null = null;
  try {
    const r = await fetch("https://openrouter.ai/api/v1/key", { headers: { authorization: `Bearer ${env.OPENROUTER_API_KEY}` }, signal: AbortSignal.timeout(5000) });
    const j = r.ok ? ((await r.json()) as { data?: { usage?: number; limit?: number | null; usage_daily?: number; usage_weekly?: number; usage_monthly?: number } }) : null;
    if (j?.data) key = { usage: j.data.usage ?? 0, limit: j.data.limit ?? null, daily: j.data.usage_daily ?? null, weekly: j.data.usage_weekly ?? null, monthly: j.data.usage_monthly ?? null };
  } catch {}
  const kind = (name: string) => COST_EVENTS[name] ?? "llm";
  const days = Array.from({ length: 30 }, (_, d) => ({ day: new Date(from + d * DAY).toISOString().slice(0, 10), jev: 0, llm: 0, router: 0 }));
  for (const r of daily.results) if (days[r.d]) days[r.d][kind(r.name)] += r.cost;
  const routerTotal = router.results.reduce((s, r) => s + r.cost, 0);
  const total = (k: "jev" | "llm") => byEvent.results.filter((r) => kind(r.name) === k).reduce((s, r) => s + r.cost, 0);
  return AiSpend.parse({
    recorded: { jev: total("jev"), llm: total("llm"), router: routerTotal, since: byEvent.results.length ? new Date(Math.min(...byEvent.results.map((r) => r.first))).toISOString() : null },
    by_event: byEvent.results.map((r) => ({ event: r.name, kind: kind(r.name), model: r.model || (kind(r.name) === "jev" ? "jev" : ""), calls: r.n, cost: r.cost })),
    router: router.results,
    days,
    openrouter_key: key,
    note: "recorded = the calls that log their cost in vibebook's events; openrouter_key = OpenRouter's own total for the key (everything billed on it, including calls that don't log a cost).",
  });
}
