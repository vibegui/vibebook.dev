// vibebook back office: an MCP App rendered by deco studio in a sandboxed iframe.
// The host proxies every tool call, so this page never holds the worker URL or token.
// View = the tool that opened it (admin_overview | traffic_overview); tabs switch by calling the other tool.
import { App, applyDocumentTheme, applyHostFonts, applyHostStyleVariables } from "@modelcontextprotocol/ext-apps";

type Row = { key: string; events: number; visitors: number };
type Series = Array<{ day: string; names: Record<string, { events: number; visitors: number }> }>;
type Admin = {
  days: number;
  kpis: Record<string, number>;
  activityOrder: string[];
  activity: Series;
  funnel: Array<{ step: string; n: number }>;
  ai: Array<{ model: string; role: string; runs: number; failures: number; avgMs: number | null; tools: number; cost: number | null }>;
  routing: { smart: number; routed: number; routeCost: number };
  home: { asks: number; people: number; sent: number; failures: number; noFit: number };
  retention: { lastWeek: number; thisWeek: number; back: number; rate: number | null; cohorts: Array<{ week: string; size: number; weeks: Array<number | null> }> };
  together: Array<{ id: string; title: string; people: number; messages: number; agentMessages: number }>;
  agents: { tools: Row[]; clients: Row[]; failures: number; issues?: { byKind: Row[]; latest: Array<{ user: string; kind: string; model: string; what: string; day: string }> }; connections: Array<{ user: string; client: string; day: string }> };
  latestBooks: Array<{ id: string; title: string; owner: string; members: number; messages: number; created_at: number }>;
  logins: Row[];
  users: Array<{ email: string; name: string | null; created_at: number; books: number; last_seen: number | null; agent_at: number | null }>;
  books: Array<{ id: string; title: string; folder: string | null; owner: string; members: number; messages: number; updated_at: number }>;
};
type Traffic = {
  days: number;
  filters: Record<string, string | null>;
  seriesOrder: string[];
  totals: { events: number; visitors: number };
  series: Series;
  dimensions: Record<string, Row[]>;
};

const root = document.getElementById("root")!;
const tip = document.getElementById("tip")!;
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n: number) => n.toLocaleString("pt-BR");
const SLOTS = ["var(--s1)", "var(--s2)", "var(--s3)", "var(--s4)", "var(--s5)"];
const slot = (i: number) => SLOTS[i] ?? "var(--other)";

function ago(ts: number | null) {
  if (!ts) return "—";
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 60) return `${Math.max(m, 1)} min`;
  const h = Math.round(m / 60);
  return h < 48 ? `${h} h` : `${Math.round(h / 24)} d`;
}
const dayLabel = (d: string) => `${d.slice(8, 10)}/${d.slice(5, 7)}`;

let view: "admin" | "traffic" = "admin";
let days = 30;
let filters: Record<string, string> = {};
const app = new App({ name: "vibebook back office", version: "0.1.0" }, {});

async function call<T>(name: string, args: Record<string, unknown>): Promise<T> {
  const r = await app.callServerTool({ name, arguments: args });
  if (r.isError) throw new Error((r.content?.find((c) => c.type === "text") as { text?: string })?.text ?? `${name} falhou`);
  return r.structuredContent as T;
}

async function load() {
  root.setAttribute("aria-busy", "true");
  try {
    if (view === "admin") renderAdmin(await call<Admin>("admin_overview", { days }));
    else renderTraffic(await call<Traffic>("traffic_overview", { days, ...filters }));
  } catch (e) {
    root.innerHTML = `${header()}<div class="err">${esc(e instanceof Error ? e.message : e)}</div>`;
  }
  root.removeAttribute("aria-busy");
}

function header() {
  return `<header>
    <span class="brand">vibebook</span>
    <div class="tabs" role="tablist">
      <button data-view="admin" class="${view === "admin" ? "on" : ""}">Visão geral</button>
      <button data-view="traffic" class="${view === "traffic" ? "on" : ""}">Tráfego</button>
    </div>
    <span class="spacer"></span>
    <div class="pills">${[7, 30, 90].map((d) => `<button data-days="${d}" class="${days === d ? "on" : ""}">${d}d</button>`).join("")}</div>
  </header>`;
}

/** One bar chart per series, each on its own scale; 2px gaps, 4px rounded tops anchored to the baseline. */
function bars(series: Series, key: string, color: string, label: string, metric: "events" | "visitors" = "events") {
  const vals = series.map((d) => d.names[key]?.[metric] ?? 0);
  const max = Math.max(...vals, 1);
  const W = 300, H = 64, gap = 2, bw = (W - gap * (vals.length - 1)) / vals.length;
  const r = Math.min(4, bw / 2);
  const cols = vals
    .map((v, i) => {
      const h = v ? Math.max((v / max) * H, 2) : 0;
      const x = i * (bw + gap);
      const path = h
        ? `M${x},${H} V${H - h + r} Q${x},${H - h} ${x + r},${H - h} H${x + bw - r} Q${x + bw},${H - h} ${x + bw},${H - h + r} V${H} Z`
        : "";
      return `<g class="col" data-tip="${esc(`${dayLabel(series[i].day)} · ${label}: ${fmt(v)}`)}"><rect class="hit" x="${x}" y="0" width="${bw + gap}" height="${H}"/>${path ? `<path class="bar" d="${path}" fill="${color}"/>` : ""}</g>`;
    })
    .join("");
  // stretched horizontally only, so no text inside the svg; the date ends are HTML
  return `<svg viewBox="0 0 ${W} ${H + 1}" preserveAspectRatio="none" style="height:${H + 1}px" role="img" aria-label="${esc(label)} por dia">
    <line class="grid-line" x1="0" x2="${W}" y1="${H + 0.5}" y2="${H + 0.5}"/>${cols}
  </svg><div class="ends axis-html"><span>${dayLabel(series[0].day)}</span><span>${dayLabel(series[series.length - 1].day)}</span></div>`;
}

/** Stacked bars by day; colour follows the entity (server-sent seriesOrder), never its rank. */
function stacked(series: Series, order: string[], metric: "events" | "visitors") {
  const keys = order.slice(0, SLOTS.length);
  const totals = series.map((d) => Object.values(d.names).reduce((a, n) => a + n[metric], 0));
  const max = Math.max(...totals, 1);
  // drawn at the real pixel width so axis text keeps its size
  const W = Math.max(280, root.clientWidth - 70), H = 170, T = 14, gap = 2, bw = (W - gap * (series.length - 1)) / series.length;
  const cols = series
    .map((d, i) => {
      const x = i * (bw + gap);
      let y = H;
      const parts: Array<[string, number, string]> = keys.map((k, j) => [k, d.names[k]?.[metric] ?? 0, slot(j)]);
      const rest = Object.entries(d.names).filter(([k]) => !keys.includes(k)).reduce((a, [, n]) => a + n[metric], 0);
      if (rest) parts.push(["outras", rest, "var(--other)"]);
      const segs = parts
        .filter(([, v]) => v)
        .map(([, v, c]) => {
          const h = (v / max) * H;
          y -= h;
          // 2px surface gap between stacked segments
          return `<rect class="bar" x="${x}" y="${T + y + 1}" width="${bw}" height="${Math.max(h - 2, 1)}" rx="${Math.min(3, bw / 3)}" fill="${c}"/>`;
        })
        .join("");
      const lines = parts.filter(([, v]) => v).map(([k, v]) => `${k}: ${fmt(v)}`).join(" · ");
      return `<g class="col" data-tip="${esc(`${dayLabel(d.day)} · ${fmt(totals[i])}${lines ? ` (${lines})` : ""}`)}"><rect class="hit" x="${x}" y="0" width="${bw + gap}" height="${H + T}"/>${segs}</g>`;
    })
    .join("");
  const ticks = [0.5, 1].map((t) => `<line class="grid-line" x1="0" x2="${W}" y1="${T + H - t * H}" y2="${T + H - t * H}"/><text class="axis" x="0" y="${T + H - t * H - 4}">${fmt(Math.round(t * max))}</text>`).join("");
  const step = Math.ceil(series.length / 8);
  const labels = series.map((d, i) => (i % step ? "" : `<text class="axis" x="${i * (bw + gap) + bw / 2}" y="${T + H + 14}" text-anchor="middle">${dayLabel(d.day)}</text>`)).join("");
  const legend = [...keys.map((k, j) => [k, slot(j)]), ...(order.length > keys.length ? [["outras", "var(--other)"]] : [])]
    .map(([k, c]) => `<span><i class="key" style="background:${c}"></i>${esc(k)}</span>`)
    .join("");
  return `<div class="legend">${legend}</div><svg viewBox="0 0 ${W} ${T + H + 18}" role="img" aria-label="Page views por dia">${ticks}<line class="grid-line" x1="0" x2="${W}" y1="${T + H}" y2="${T + H}"/>${cols}${labels}</svg>`;
}

const ACT_LABEL: Record<string, string> = {
  message: "Mensagens",
  ai_run: "Chamadas @vibe",
  agent_call: "Chamadas de agents",
  home_route: "Pedidos na home",
  book_created: "Vibebooks criados",
  signup: "Cadastros",
  invite_sent: "Convites",
};
// "anthropic/claude-haiku-5.5" → "Claude Haiku 5.5"; "deepseek/deepseek-v4.1-flash" → "DeepSeek V4.1 Flash"
const modelName = (id: string) => {
  const name = id.split("/").pop() ?? id;
  return name
    .replace(/^claude-/, "Claude ")
    .replace(/^deepseek-/, "DeepSeek ")
    .split(/[-\s]/)
    .map((w) => (/^v?\d/.test(w) ? w.toUpperCase() : w[0]?.toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/Claude (\w)/, (_, c) => `Claude ${c.toUpperCase()}`);
};
const usd = (n: number | null) => (n === null ? "—" : n < 0.01 ? `US$ ${n.toFixed(4)}` : `US$ ${n.toFixed(2)}`);

function renderAdmin(d: Admin) {
  const k = d.kpis;
  const top = d.funnel[0]?.n || 1;
  const kpi = (l: string, v: number, sub: string) => `<div class="kpi"><div class="l">${l}</div><div class="v num">${fmt(v)}</div><div class="d">${sub}</div></div>`;
  root.innerHTML = `${header()}
  <div class="kpis">
    ${kpi("Pessoas", k.users, `+${fmt(k.newUsers)} em ${d.days}d · ${fmt(k.activeUsers)} ativas`)}
    ${kpi("Vibebooks", k.books, `+${fmt(k.newBooks)} novos · ${fmt(k.activeBooks)} com movimento`)}
    ${kpi("Mensagens", k.messages, `${k.activeUsers ? (k.messages / k.activeUsers).toFixed(1) : "—"} por pessoa ativa`)}
    ${kpi("Chamadas @vibe", k.aiRuns, k.aiFailures ? `<span class="bad">${fmt(k.aiFailures)} falharam</span>` : "nenhuma falha")}
    <div class="kpi"><div class="l">Custo de AI</div><div class="v num">${usd(k.aiCost)}</div><div class="d">${k.aiCostPerRun ? `${usd(k.aiCostPerRun)} por @vibe` : "desde o rastreio de custo"}</div></div>
    ${kpi("Agents", k.agentPeople, `${fmt(k.agentCalls)} chamadas MCP em ${d.days}d`)}
    <div class="kpi"><div class="l">Voltaram esta semana</div><div class="v num">${d.retention.rate === null ? "—" : `${d.retention.rate}%`}</div><div class="d">${fmt(d.retention.back)} de ${fmt(d.retention.lastWeek)} ativas na semana passada</div></div>
    ${kpi("Salas colaborativas", k.collaborativeRooms, `2+ pessoas escrevendo em ${d.days}d`)}
    ${kpi("Visitantes", k.visitors, `no site em ${d.days}d`)}
  </div>
  <div class="stack"><div class="card"><h3>Atividade por dia <small>cada gráfico na sua própria escala</small></h3>
    <div class="multiples">${d.activityOrder
      .map((name, i) => {
        const total = d.activity.reduce((a, day) => a + (day.names[name]?.events ?? 0), 0);
        return `<div class="mult"><div class="t"><span><i class="key" style="background:${slot(i)}"></i>${ACT_LABEL[name] ?? name}</span><b class="num">${fmt(total)}</b></div>${bars(d.activity, name, slot(i), ACT_LABEL[name] ?? name)}</div>`;
      })
      .join("")}</div></div></div>
  <div class="grid2">
    <div class="card"><h3>Funil <small>pessoas distintas em ${d.days}d</small></h3><div class="funnel">${d.funnel
      .map((s, i) => {
        const prev = i ? d.funnel[i - 1].n : 0;
        const conv = i && prev ? ` · ${Math.round((s.n / prev) * 100)}%` : "";
        return `<div class="fstep" data-tip="${esc(`${s.step}: ${fmt(s.n)} (${Math.round((s.n / top) * 100)}% do topo)`)}"><span>${esc(s.step)}</span><div class="ftrack"><div class="fbar" style="width:${(s.n / top) * 100}%"></div></div><span class="n num"><b>${fmt(s.n)}</b>${conv}</span></div>`;
      })
      .join("")}</div></div>
    <div class="card"><h3>AI por modelo <small>${d.routing.routed ? `roteador mandou ${fmt(d.routing.smart)} de ${fmt(d.routing.routed)} pro modelo forte · roteamento custou ${usd(d.routing.routeCost)}` : ""}</small></h3>
      <div class="tablewrap"><table><thead><tr><th>Modelo</th><th class="r">Chamadas</th><th class="r">Falhas</th><th class="r">Tempo médio</th><th class="r">Custo</th></tr></thead><tbody>${d.ai
        .map((a) => `<tr><td>${esc(modelName(a.model))}<div class="sub">${esc(a.role)} · ${esc(a.model)}</div></td><td class="r num">${fmt(a.runs)}</td><td class="r num">${a.failures ? `<span class="bad">${fmt(a.failures)}</span>` : "0"}</td><td class="r num">${a.avgMs ? `${(a.avgMs / 1000).toFixed(1)} s` : "—"}</td><td class="r num">${usd(a.cost)}</td></tr>`)
        .join("") || `<tr><td colspan="5" class="muted">Nenhuma chamada no período.</td></tr>`}</tbody></table></div>
      <h3 style="margin-top:18px">Caixa da home <small>“O que você quer resolver?”</small></h3>
      ${d.home.asks ? `<div class="rank"><div class="row"><span>Pedidos</span><span class="c num">${fmt(d.home.asks)} · ${fmt(d.home.people)} pessoas</span></div><div class="row"><span>Enviados pra uma sala</span><span class="c num">${fmt(d.home.sent)} · ${Math.round((d.home.sent / d.home.asks) * 100)}%</span></div><div class="row"><span>Sem sala certa (sugeriu nova)</span><span class="c num">${fmt(d.home.noFit)}</span></div>${d.home.failures ? `<div class="row"><span class="bad">Falhas</span><span class="c num bad">${fmt(d.home.failures)}</span></div>` : ""}</div>` : `<div class="muted">Ninguém usou a caixa no período.</div>`}
      <h3 style="margin-top:18px">Como entram</h3>
      ${d.logins.length ? `<div class="rank">${d.logins.map((r) => `<div class="row"><span>${esc(r.key)}</span><span class="c num">${fmt(r.visitors)} pessoas · ${fmt(r.events)} logins</span></div>`).join("")}</div>` : `<div class="muted">Nenhum login no período.</div>`}
    </div>
  </div>
  <div class="grid2">
    <div class="card"><h3>Retenção por semana de cadastro <small>% ativas 1–4 semanas depois</small></h3><div class="tablewrap"><table><thead><tr><th>Semana</th><th class="r">Pessoas</th><th class="r">+1</th><th class="r">+2</th><th class="r">+3</th><th class="r">+4</th></tr></thead><tbody>${d.retention.cohorts
      .map((c) => `<tr><td>${esc(c.week)}</td><td class="r num">${fmt(c.size)}</td>${c.weeks.map((w) => `<td class="r num">${w === null ? "—" : `${w}%`}</td>`).join("")}</tr>`)
      .join("")}</tbody></table></div><div class="muted" style="margin-top:8px">Ativa = qualquer uso logado (abrir o app, escrever, @vibe, agent).</div></div>
    <div class="card"><h3>Salas com mais gente <small>pessoas escrevendo em ${d.days}d (direto ou pelo agent)</small></h3>${d.together.length ? `<div class="tablewrap"><table><thead><tr><th>Sala</th><th class="r">Pessoas</th><th class="r">Msgs</th><th class="r">Por agent</th></tr></thead><tbody>${d.together
      .map((b) => `<tr><td>${esc(b.title)}</td><td class="r num">${b.people}</td><td class="r num">${fmt(b.messages)}</td><td class="r num">${b.messages ? `${Math.round((b.agentMessages / b.messages) * 100)}%` : "—"}</td></tr>`)
      .join("")}</tbody></table></div>` : `<div class="muted">Nenhuma sala com 2+ pessoas escrevendo no período.</div>`}</div>
  </div>
  <div class="grid2">
    <div class="card"><h3>Agents <small>${fmt(k.agentPeople)} pessoas · ${fmt(k.agentCalls)} chamadas${d.agents.failures ? ` · <span class="bad">${fmt(d.agents.failures)} falharam</span>` : ""}</small></h3>
      ${d.agents.tools.length ? `<div class="rank">${d.agents.tools.map((r) => `<div class="row"><span>${esc(r.key)}</span><span class="c num">${fmt(r.events)} · ${fmt(r.visitors)} pessoas</span></div>`).join("")}</div>` : `<div class="muted">Nenhum agent chamou o vibebook no período.</div>`}
      <h3 style="margin-top:18px">Clientes</h3>
      ${d.agents.clients.length ? `<div class="rank">${d.agents.clients.map((r) => `<div class="row"><span>${esc(r.key)}</span><span class="c num">${fmt(r.visitors)} pessoas</span></div>`).join("")}</div>` : `<div class="muted">—</div>`}
      <h3 style="margin-top:18px">Falhas que os Claudes reportaram <small>report_issue</small></h3>
      ${d.agents.issues?.byKind.length ? `<div class="rank">${d.agents.issues.byKind.map((r) => `<div class="row"><span>${esc(r.key)}</span><span class="c num">${fmt(r.events)} · ${fmt(r.visitors)} pessoas</span></div>`).join("")}${d.agents.issues.latest.map((i) => `<div class="row"><span>${esc(i.what)}<div class="sub">${esc(i.kind)} · ${esc(i.model)} · ${esc(i.user)}</div></span><span class="c">${esc(i.day)}</span></div>`).join("")}</div>` : `<div class="muted">Nenhuma no período.</div>`}
      <h3 style="margin-top:18px">Conexões recentes</h3>
      ${d.agents.connections.length ? `<div class="rank">${d.agents.connections.map((c) => `<div class="row"><span>${esc(c.user)}<div class="sub">${esc(c.client)}</div></span><span class="c">${esc(c.day)}</span></div>`).join("")}</div>` : `<div class="muted">Ninguém conectou agent no período.</div>`}
    </div>
    <div class="card"><h3>Salas novas <small>últimas criadas</small></h3><div class="tablewrap"><table><thead><tr><th>Sala</th><th class="r">Pessoas</th><th class="r">Msgs ${d.days}d</th><th class="r">Criada</th></tr></thead><tbody>${d.latestBooks
      .map((b) => `<tr><td>${esc(b.title)}<div class="sub">${esc(b.owner)}</div></td><td class="r num">${b.members}</td><td class="r num">${fmt(b.messages)}</td><td class="r">${ago(b.created_at)}</td></tr>`)
      .join("")}</tbody></table></div></div>
  </div>
  <div class="grid2">
    <div class="card"><h3>Pessoas <small>cadastros mais recentes</small></h3><div class="tablewrap"><table><thead><tr><th>Quem</th><th class="r">Vibebooks</th><th class="r">Entrou</th><th class="r">Visto</th></tr></thead><tbody>${d.users
      .map((u) => `<tr><td>${esc(u.name || u.email.split("@")[0])}${u.agent_at ? ` <span class="sub" title="conectou agent">✦ agent</span>` : ""}<div class="sub">${esc(u.email)}</div></td><td class="r num">${u.books}</td><td class="r">${ago(u.created_at)}</td><td class="r">${ago(u.last_seen)}</td></tr>`)
      .join("")}</tbody></table></div></div>
    <div class="card"><h3>Vibebooks <small>por última atividade</small></h3><div class="tablewrap"><table><thead><tr><th>Vibebook</th><th class="r">Pessoas</th><th class="r">Msgs ${d.days}d</th><th class="r">Atualizado</th></tr></thead><tbody>${d.books
      .map((b) => `<tr><td>${esc(b.title)}<div class="sub">${esc(b.folder || "sem pasta")} · ${esc(b.owner)}</div></td><td class="r num">${b.members}</td><td class="r num">${fmt(b.messages)}</td><td class="r">${ago(b.updated_at)}</td></tr>`)
      .join("")}</tbody></table></div></div>
  </div>`;
}

const PANELS: Array<[string, string]> = [
  ["path", "Páginas"],
  ["ref", "Origens"],
  ["utm", "utm_source"],
  ["country", "Países"],
  ["browser", "Navegador"],
  ["os", "Sistema"],
  ["device", "Dispositivo"],
  ["asn", "Rede (ASN)"],
  ["ip", "Faixa de IP"],
  ["colo", "Colo"],
];

function renderTraffic(d: Traffic) {
  const active = Object.entries(d.filters).filter(([, v]) => v) as Array<[string, string]>;
  root.innerHTML = `${header()}
  <div class="kpis">
    <div class="kpi"><div class="l">Visitantes</div><div class="v num">${fmt(d.totals.visitors)}</div><div class="d">ids diários, sem cookie</div></div>
    <div class="kpi"><div class="l">Page views</div><div class="v num">${fmt(d.totals.events)}</div><div class="d">${d.totals.visitors ? (d.totals.events / d.totals.visitors).toFixed(1) : "—"} por visitante</div></div>
  </div>
  ${active.length ? `<div class="chips">${active.map(([k, v]) => `<button class="chip" data-dim="${esc(k)}" data-val="${esc(v)}">${esc(k)}: ${esc(v)} ×</button>`).join("")}</div>` : ""}
  <div class="stack"><div class="card"><h3>Page views por dia <small>por página</small></h3>${stacked(d.series, d.seriesOrder, "events")}</div></div>
  <div class="grid3">${PANELS.map(([dim, title]) => {
    const rows = d.dimensions[dim] ?? [];
    const max = Math.max(...rows.map((r) => r.visitors), 1);
    return `<div class="card"><h3>${title}</h3>${
      rows.length
        ? `<div class="rank">${rows
            .map((r) => `<button class="row ${d.filters[dim] === r.key ? "on" : ""}" data-dim="${dim}" data-val="${esc(r.key)}" title="${esc(r.key)}"><i class="fill" style="width:${(r.visitors / max) * 100}%"></i><span>${esc(r.key)}</span><span class="c num">${fmt(r.visitors)} · ${fmt(r.events)}</span></button>`)
            .join("")}</div>`
        : `<div class="muted">Nada ainda.</div>`
    }</div>`;
  }).join("")}</div>`;
}

root.addEventListener("click", (e) => {
  const t = (e.target as HTMLElement).closest("button");
  if (!t) return;
  if (t.dataset.view) {
    view = t.dataset.view as typeof view;
    if (view === "traffic" && days > 30) days = 30;
    filters = {};
  } else if (t.dataset.days) days = Number(t.dataset.days);
  else if (t.dataset.dim) {
    const { dim, val } = t.dataset as { dim: string; val: string };
    if (filters[dim] === val) delete filters[dim];
    else filters[dim] = val;
  } else return;
  void load();
});

// one tooltip for every mark: hit targets are bigger than the marks
root.addEventListener("pointermove", (e) => {
  const el = (e.target as Element).closest("[data-tip]") as HTMLElement | null;
  if (!el) return tip.classList.remove("on");
  tip.textContent = el.dataset.tip ?? "";
  tip.classList.add("on");
  const x = Math.min(e.clientX + 12, innerWidth - tip.offsetWidth - 8);
  tip.style.left = `${x}px`;
  tip.style.top = `${Math.max(e.clientY - 36, 4)}px`;
});
root.addEventListener("pointerleave", () => tip.classList.remove("on"));

app.ontoolresult = (r) => {
  // the tool that opened us already ran: render its result without a second call
  const sc = r.structuredContent as Admin | Traffic | undefined;
  if (!sc || r.isError) return;
  if ("kpis" in sc) (view = "admin"), (days = sc.days), renderAdmin(sc);
  else if ("dimensions" in sc) (view = "traffic"), (days = sc.days), renderTraffic(sc);
};
app.onhostcontextchanged = (ctx) => applyHost(ctx);

function applyHost(ctx: ReturnType<App["getHostContext"]>) {
  if (ctx?.theme) applyDocumentTheme(ctx.theme);
  if (ctx?.styles?.variables) applyHostStyleVariables(ctx.styles.variables);
  if (ctx?.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts);
}

await app.connect();
const ctx = app.getHostContext();
applyHost(ctx);
view = ctx?.toolInfo?.tool.name === "traffic_overview" ? "traffic" : "admin";
days = view === "traffic" ? 7 : 30;
if (root.querySelector(".empty")) void load();
