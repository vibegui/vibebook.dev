// vibebook's own numbers, yesterday vs the 7 days before, as markdown for the MCP tool `metrics` (METRICS_EMAILS only).
// The daily posts are room reminders (reminders/*.md in vibebook-growth and vibebook-product) that tell a Claude to call it.
// - growth: our own D1 events: visitors, pageviews, the funnel, active people, top pages/sources.
// - product: Cloudflare's GraphQL analytics for the Worker (requests, errors, CPU/wall time,
//   response bytes) and the zone (requests, bandwidth, cache). Needs CF_ANALYTICS_TOKEN (Account Analytics: Read,
//   Zone Analytics: Read, Zone: Read); without it the report says so instead of showing numbers.
// Test people (@test.vibebook.dev) are left out. Check: bun scripts/reports-check.ts (formatting only).
import type { Env } from "./index";

const DAY = 86_400_000;
const BRT = 3 * 3600_000; // São Paulo, no DST since 2019
const NOT_TEST = `coalesce(user, '') NOT LIKE '%@test.vibebook.dev'`;
const FUNNEL = [
  ["pageview", "visitaram o site"],
  ["login_code_sent", "pediram código de login"],
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
    const n = k === "pageview" ? y.by(k).v : y.by(k).n;
    const prev = i ? (FUNNEL[i - 1][0] === "pageview" ? y.by("pageview").v : y.by(FUNNEL[i - 1][0]).n) : 0;
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
    sum { requests errors subrequests responseBodySize } quantiles { cpuTimeP50 cpuTimeP99 wallTimeP50 wallTimeP99 } } } } }`;
const ZONE_Q = `query($zone: string!, $from: Date!, $to: Date!) { viewer { zones(filter: { zoneTag: $zone }) {
  httpRequests1dGroups(limit: 10, filter: { date_geq: $from, date_lt: $to }) { dimensions { date } sum { requests bytes cachedBytes threats } uniq { uniques } } } } }`;

/** Failures agents reported themselves (MCP report_issue), yesterday vs the week before, by kind. */
async function issuesLine(env: Env, start: number, end: number) {
  const q = (a: number, b: number) =>
    env.DB.prepare(`SELECT json_extract(dims, '$.kind') AS k, count(*) AS n FROM events WHERE name = 'agent_issue' AND ts >= ? AND ts < ? AND ${NOT_TEST} GROUP BY k`).bind(a, b).all<{ k: string; n: number }>();
  const [y, w] = await Promise.all([q(start, end), q(start - 7 * DAY, start)]);
  const tot = (r: typeof y) => r.results.reduce((t, x) => t + x.n, 0);
  const kinds = y.results.map((x) => `${x.k} ${x.n}`).join(", ");
  return `- Falhas reportadas pelos Claudes (\`report_issue\`): ${vs(tot(y), tot(w))}${kinds ? ` · ${kinds}` : ""}`;
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
  return `\n- Abrir sala (estado do WS, últimas 24h): **${r.n}×**, média ${bytes(r.avg)}, maior ${bytes(r.mx)} (sala ${big?.book}: ${big?.top})`;
}

export async function productReport(env: Env, now = Date.now()) {
  const { start, end } = yesterday(now);
  const head = `**⚙️ Produto · ${day(end - 1)}** (ontem, vs média diária dos 7 dias antes)\n\n${await issuesLine(env, start, end).catch(() => "")}${await unblockLine(env, start, end).catch(() => "")}${await wsStateLine(env, now - DAY, now).catch(() => "")}`;
  if (!env.CF_ANALYTICS_TOKEN) return `${head}\n\nSem números da Cloudflare ainda: falta o token de analytics (secret \`CF_ANALYTICS_TOKEN\`, leitura de analytics da conta e da zona vibebook.dev).`;
  try {
    const iso = (ms: number) => new Date(ms).toISOString();
    const worker = async (from: number, to: number) => {
      const rows = (await cfQuery(env, WORKER_Q, { acc: env.CF_ACCOUNT_ID, from: iso(from), to: iso(to) })).viewer.accounts[0]?.workersInvocationsAdaptive ?? [];
      const sum = (k: string) => rows.reduce((t: number, r: any) => t + (r.sum?.[k] ?? 0), 0);
      // Quantiles come per row (status, etc.); the busiest row stands for the day.
      const q = [...rows].sort((a: any, b: any) => b.sum.requests - a.sum.requests)[0]?.quantiles ?? {};
      return { requests: sum("requests"), errors: sum("errors"), sub: sum("subrequests"), body: sum("responseBodySize"), q };
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
      `- Erros: ${vs(wy.errors, ww.errors)} (${errRate}% dos requests)`,
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
const BYTES_Q = `query($zone: string!, $from: Time!, $to: Time!) { viewer { zones(filter: { zoneTag: $zone }) {
  paths: httpRequestsAdaptiveGroups(limit: 300, orderBy: [sum_edgeResponseBytes_DESC], filter: { datetime_geq: $from, datetime_lt: $to }) { count sum { edgeResponseBytes } dimensions { clientRequestPath } }
  types: httpRequestsAdaptiveGroups(limit: 6, orderBy: [sum_edgeResponseBytes_DESC], filter: { datetime_geq: $from, datetime_lt: $to }) { count sum { edgeResponseBytes } dimensions { edgeResponseContentTypeName } } } } }`;
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
  return ["", "", "**Banda por rota** (ontem, top 8)", ...top.map(([k, o]) => `- \`${k}\` **${bytes(o.b)}** · ${o.n} req · ${bytes(o.b / o.n)} cada`), `- Por tipo: ${types}`].join("\n");
}
// Quantiles come in microseconds.
const ms = (us?: number) => (us == null ? "?" : us >= 1e6 ? `${(us / 1e6).toFixed(1)}s` : `${Math.round(us / 1000)}ms`);

async function zoneId(env: Env) {
  const r = await fetch("https://api.cloudflare.com/client/v4/zones?name=vibebook.dev", { headers: { authorization: `Bearer ${env.CF_ANALYTICS_TOKEN}` } });
  const j = (await r.json().catch(() => ({}))) as { result?: { id: string }[] };
  return j.result?.[0]?.id ?? null;
}
