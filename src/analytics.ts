// Read side of the event stream (rows written by track.ts), ported from holocard.
//
// One D1 read per call fetches the raw events in the window; rankings are
// aggregated in JS. That makes cross-filtering free: each ranking respects every
// active filter EXCEPT its own, so clicking "BR" filters pages and sources but
// leaves the country list whole to click through.
import type { Env } from "./index";
import { eventDimensions } from "./storedContainers";

const DAY_MS = 24 * 60 * 60 * 1000;
// ponytail: raw rows aggregated in JS; move rankings to SQL GROUP BY if a window ever passes this.
const MAX_EVENTS = 50_000;

export const DIMENSIONS = ["name", "path", "country", "ref", "utm", "browser", "os", "device", "asn", "ip", "colo"] as const;
export type Dimension = (typeof DIMENSIONS)[number];
export type TrafficQuery = { days?: number } & Partial<Record<Dimension, string>>;

type Raw = { day: string; name: string; path: string; country: string; visitor: string; user: string; dims: Record<string, unknown> };
type Event = Record<Dimension, string> & { day: string; visitor: string };

const BOT_RE = /bot|crawl|spider|scan|curl|wget|python|go-http|java\/|libwww|okhttp|headless|preview|facebookexternalhit|whatsapp/i;
const BROWSERS: Array<[RegExp, string]> = [
  [BOT_RE, "Bot"],
  [/edg\//i, "Edge"],
  [/opr\/|opera/i, "Opera"],
  [/firefox\/|fxios/i, "Firefox"],
  [/chrome\/|crios/i, "Chrome"],
  [/safari\//i, "Safari"],
];
const SYSTEMS: Array<[RegExp, string]> = [
  [/android/i, "Android"],
  [/iphone|ipad|ios /i, "iOS"],
  [/mac os x|macintosh/i, "macOS"],
  [/windows/i, "Windows"],
  [/linux|ubuntu|debian/i, "Linux"],
];
const firstMatch = (rules: Array<[RegExp, string]>, ua: string) => rules.find(([re]) => re.test(ua))?.[1] ?? "(?)";
const device = (ua: string) =>
  BOT_RE.test(ua) ? "bot" : /ipad|tablet/i.test(ua) ? "tablet" : /mobile|android|iphone/i.test(ua) ? "mobile" : ua ? "desktop" : "(?)";
const str = (v: unknown) => (typeof v === "string" && v ? v : "");

function refHost(ref: string): string {
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "").toLowerCase();
    return !host || host === "vibebook.dev" || host === "localhost" ? "(direct)" : host;
  } catch {
    return "(direct)";
  }
}

async function load(env: Pick<Env, "DB">, days: number, where = "") {
  const since = Date.now() - days * DAY_MS;
  const { results } = await env.DB.prepare(
    `SELECT date(ts / 1000, 'unixepoch') AS day, name, coalesce(path, '(none)') AS path,
            coalesce(nullif(country, ''), '?') AS country, coalesce(visitor, '') AS visitor,
            coalesce(user, '') AS user, coalesce(dims, '{}') AS dims
     FROM events WHERE ts >= ? ${where} ORDER BY ts DESC LIMIT ?`,
  )
    .bind(since, MAX_EVENTS)
    .all<Record<string, string>>();
  return results.map((r): Raw => {
    const dims = eventDimensions(r.dims);
    return { day: r.day, name: r.name, path: r.path, country: r.country, visitor: r.visitor || r.user, user: r.user, dims };
  });
}

const dayKeys = (days: number) =>
  Array.from({ length: days }, (_, i) => new Date(Date.now() - (days - 1 - i) * DAY_MS).toISOString().slice(0, 10));

type Bucket = { events: number; visitors: Set<string> };
function rank<T>(items: T[], key: (e: T) => string, who: (e: T) => string, limit: number) {
  const map = new Map<string, Bucket>();
  for (const item of items) {
    const k = key(item);
    const b = map.get(k) ?? { events: 0, visitors: new Set() };
    b.events++;
    b.visitors.add(who(item));
    map.set(k, b);
  }
  return [...map]
    .map(([key, b]) => ({ key, events: b.events, visitors: b.visitors.size }))
    .sort((a, b) => b.events - a.events)
    .slice(0, limit);
}

function stackByDay<T extends { day: string; visitor: string }>(days: number, items: T[], key: (e: T) => string) {
  const byDay = new Map<string, Map<string, Bucket>>();
  for (const e of items) {
    const d = byDay.get(e.day) ?? new Map<string, Bucket>();
    const b = d.get(key(e)) ?? { events: 0, visitors: new Set() };
    b.events++;
    b.visitors.add(e.visitor);
    d.set(key(e), b);
    byDay.set(e.day, d);
  }
  return dayKeys(days).map((day) => ({
    day,
    names: Object.fromEntries([...(byDay.get(day) ?? [])].map(([k, b]) => [k, { events: b.events, visitors: b.visitors.size }])),
  }));
}

/** Traffic: page views and their request dimensions, cross-filtered. */
export async function trafficOverview(env: Pick<Env, "DB">, query: TrafficQuery = {}) {
  const days = Math.min(Math.max(query.days ?? 7, 1), 90);
  const events: Event[] = (await load(env, days, `AND name = 'pageview'`)).map((r) => {
    const ua = str(r.dims.ua);
    return {
      day: r.day,
      visitor: r.visitor,
      name: r.name,
      path: r.path,
      country: r.country,
      ref: refHost(str(r.dims.ref)),
      utm: str(r.dims.utm) || "(none)",
      browser: firstMatch(BROWSERS, ua),
      os: firstMatch(SYSTEMS, ua),
      device: device(ua),
      asn: r.dims.asn ? `AS${r.dims.asn}${r.dims.asOrg ? ` ${str(r.dims.asOrg)}` : ""}` : "(?)",
      ip: str(r.dims.ip) || "(?)",
      colo: str(r.dims.colo) || "(?)",
    };
  });
  const matches = (e: Event, except: Dimension | null) => DIMENSIONS.every((d) => d === except || !query[d] || e[d] === query[d]);
  const scoped = events.filter((e) => matches(e, null));
  const dimensions = Object.fromEntries(
    DIMENSIONS.map((d) => [d, rank(events.filter((e) => matches(e, d)), (e) => e[d], (e) => e.visitor, 12)]),
  );
  return {
    days,
    filters: Object.fromEntries(DIMENSIONS.map((d) => [d, query[d] ?? null])),
    // colour follows the page, never its rank: order computed without filters
    seriesOrder: rank(events, (e) => e.path, (e) => e.visitor, 8).map((r) => r.key),
    totals: { events: scoped.length, visitors: new Set(scoped.map((e) => e.visitor)).size },
    series: stackByDay(days, scoped, (e) => e.path),
    dimensions,
  };
}

const ACTIVITY = ["message", "ai_run", "home_route", "agent_call", "book_created", "signup", "invite_sent"] as const;

// ai_run rows before per-model tracking only had a mode; these were the models behind each mode then.
const LEGACY_MODEL: Record<string, string> = {
  fast: "anthropic/claude-sonnet-5.5",
  medium: "anthropic/claude-opus-5.5",
  heavy: "anthropic/claude-fable-5.1",
  smart: "anthropic/claude-sonnet-5.5",
};
const modelOf = (e: { dims: Record<string, unknown> }) => str(e.dims.model) || LEGACY_MODEL[str(e.dims.mode) || "fast"] || "?";
const num = (v: unknown) => Number(v) || 0;

const WEEK_MS = 7 * DAY_MS;

/** Active = any event of a signed-in person except asking for a login code. One row per person per day (ts index). */
async function activeDays(env: Pick<Env, "DB">, since: number) {
  const { results } = await env.DB.prepare(
    `SELECT user, min(ts) AS ts FROM events WHERE ts >= ? AND user IS NOT NULL AND user != '' AND name != 'login_code_sent'
     GROUP BY user, date(ts / 1000, 'unixepoch')`,
  )
    .bind(since)
    .all<{ user: string; ts: number }>();
  return results;
}

/** Week-over-week return plus signup cohorts (last 6 weeks): % of each cohort active 1–4 weeks after signing up. */
async function retention(env: Pick<Env, "DB">) {
  const now = Date.now();
  const since = now - 10 * WEEK_MS;
  const [days, signups] = await Promise.all([
    activeDays(env, since),
    env.DB.prepare(`SELECT email, created_at FROM users WHERE created_at >= ?`).bind(now - 6 * WEEK_MS).all<{ email: string; created_at: number }>(),
  ]);
  const activeIn = (from: number, to: number) => new Set(days.filter((d) => d.ts >= from && d.ts < to).map((d) => d.user));
  const lastWeek = activeIn(now - 2 * WEEK_MS, now - WEEK_MS);
  const thisWeek = activeIn(now - WEEK_MS, now);
  const back = [...lastWeek].filter((u) => thisWeek.has(u)).length;
  const cohorts = Array.from({ length: 6 }, (_, i) => {
    const start = now - (6 - i) * WEEK_MS;
    const members = signups.results.filter((u) => u.created_at >= start && u.created_at < start + WEEK_MS).map((u) => u.email);
    const weeks = [1, 2, 3, 4].map((w) => {
      const from = start + w * WEEK_MS;
      if (from >= now) return null; // that week hasn't happened yet
      const active = activeIn(from, Math.min(from + WEEK_MS, now));
      return members.length ? Math.round((members.filter((m) => active.has(m)).length / members.length) * 100) : null;
    });
    return { week: new Date(start).toISOString().slice(0, 10), size: members.length, weeks };
  });
  return { lastWeek: lastWeek.size, thisWeek: thisWeek.size, back, rate: lastWeek.size ? Math.round((back / lastWeek.size) * 100) : null, cohorts };
}

/** Product back office: KPIs, activity per day, funnel, AI usage, people and books. */
export async function adminOverview(env: Pick<Env, "DB">, daysIn?: number) {
  const days = Math.min(Math.max(daysIn ?? 30, 1), 90);
  const since = Date.now() - days * DAY_MS;
  const events = await load(env, days);
  const db = env.DB;
  const [users, books, newUsers, newBooks, activeBooks, recentUsers, topBooks, latestBooks] = await Promise.all([
    db.prepare(`SELECT count(*) AS n FROM users`).first<{ n: number }>(),
    db.prepare(`SELECT count(*) AS n FROM books`).first<{ n: number }>(),
    db.prepare(`SELECT count(*) AS n FROM users WHERE created_at >= ?`).bind(since).first<{ n: number }>(),
    db.prepare(`SELECT count(*) AS n FROM books WHERE created_at >= ?`).bind(since).first<{ n: number }>(),
    db.prepare(`SELECT count(*) AS n FROM books WHERE updated_at >= ?`).bind(since).first<{ n: number }>(),
    db
      .prepare(
        `SELECT u.email, u.name, u.created_at, (SELECT count(*) FROM members m WHERE m.email = u.email) AS books,
           (SELECT max(ts) FROM events e WHERE e.user = u.email) AS last_seen,
           (SELECT max(ts) FROM events e WHERE e.user = u.email AND e.name = 'agent_connected') AS agent_at
         FROM users u ORDER BY u.created_at DESC LIMIT 20`,
      )
      .all(),
    db
      .prepare(
        `SELECT b.id, b.title, b.folder, b.owner, b.created_at, b.updated_at,
           (SELECT count(*) FROM members m WHERE m.book_id = b.id) AS members
         FROM books b ORDER BY b.updated_at DESC LIMIT 20`,
      )
      .all<Record<string, unknown>>(),
    db
      .prepare(
        `SELECT b.id, b.title, b.owner, b.created_at, (SELECT count(*) FROM members m WHERE m.book_id = b.id) AS members
         FROM books b ORDER BY b.created_at DESC LIMIT 10`,
      )
      .all<Record<string, unknown>>(),
  ]);

  const count = (name: string) => events.filter((e) => e.name === name).length;
  const people = (pred: (e: Raw) => boolean) => new Set(events.filter(pred).map((e) => e.user || e.visitor)).size;
  const runs = events.filter((e) => e.name === "ai_run");
  const classify = events.filter((e) => e.name === "classify");
  const homeRoutes = events.filter((e) => e.name === "home_route");
  const llm = [...runs, ...classify, ...homeRoutes]; // every model call we pay for
  const agentCalls = events.filter((e) => e.name === "agent_call");
  const aiCost = llm.reduce((a, e) => a + num(e.dims.cost), 0);
  const msgsByBook = new Map<string, number>();
  const writersByBook = new Map<string, Set<string>>(); // people writing in a room, directly or through their agent
  const agentMsgsByBook = new Map<string, number>();
  for (const e of events)
    if (e.name === "message" && str(e.dims.book)) {
      const b = str(e.dims.book);
      msgsByBook.set(b, (msgsByBook.get(b) ?? 0) + 1);
      if (e.user) (writersByBook.get(b) ?? writersByBook.set(b, new Set()).get(b)!).add(e.user);
      if (e.dims.agent) agentMsgsByBook.set(b, (agentMsgsByBook.get(b) ?? 0) + 1);
    }
  const together = [...writersByBook].filter(([, w]) => w.size >= 2).sort((a, b) => b[1].size - a[1].size || (msgsByBook.get(b[0]) ?? 0) - (msgsByBook.get(a[0]) ?? 0));
  const togetherIds = together.slice(0, 10).map(([id]) => id);
  const [titles, ret] = await Promise.all([
    togetherIds.length
      ? db.prepare(`SELECT id, title FROM books WHERE id IN (${togetherIds.map(() => "?").join(",")})`).bind(...togetherIds).all<{ id: string; title: string }>()
      : Promise.resolve({ results: [] as { id: string; title: string }[] }),
    retention(env),
  ]);

  return {
    days,
    kpis: {
      users: users?.n ?? 0,
      newUsers: newUsers?.n ?? 0,
      activeUsers: people((e) => !!e.user && e.name !== "login_code_sent"),
      books: books?.n ?? 0,
      newBooks: newBooks?.n ?? 0,
      activeBooks: activeBooks?.n ?? 0,
      messages: count("message"),
      aiRuns: runs.length,
      aiFailures: runs.filter((e) => e.dims.ok === false).length,
      aiCost: +aiCost.toFixed(4),
      aiCostPerRun: runs.length ? +(runs.reduce((a, e) => a + num(e.dims.cost), 0) / runs.length).toFixed(5) : 0,
      agentPeople: people((e) => e.name === "agent_call"),
      collaborativeRooms: together.length,
      agentCalls: agentCalls.length,
      visitors: people((e) => e.name === "pageview"),
    },
    activityOrder: [...ACTIVITY],
    activity: stackByDay(
      days,
      events.filter((e) => (ACTIVITY as readonly string[]).includes(e.name)),
      (e) => e.name,
    ),
    // distinct people per step; pre-login steps count daily visitor ids, later ones emails
    funnel: [
      { step: "Visitou a landing", n: people((e) => e.name === "pageview" && ["/", "/pt", "/en"].includes(e.path)) },
      { step: "Abriu o login", n: people((e) => e.name === "pageview" && e.path === "/login") },
      { step: "Pediu código", n: people((e) => e.name === "login_code_sent") },
      { step: "Entrou", n: people((e) => e.name === "login") },
      { step: "Criou vibebook", n: people((e) => e.name === "book_created") },
      { step: "Convidou alguém", n: people((e) => e.name === "invite_sent") },
      { step: "Conectou agent", n: people((e) => e.name === "agent_connected") },
      { step: "Agent agiu na sala", n: people((e) => e.name === "agent_call" && e.dims.tool !== "inbox") },
      { step: "Chamou o @vibe", n: people((e) => e.name === "ai_run") },
    ],
    // Per model, named. Costs exist only for runs tracked after per-model tracking (null before).
    ai: [...new Set(llm.map(modelOf))]
      .map((model) => {
        const r = llm.filter((e) => modelOf(e) === model);
        const ms = r.map((e) => num(e.dims.ms)).filter(Boolean);
        const priced = r.filter((e) => e.dims.cost !== undefined);
        return {
          model,
          role: [...new Set(r.map((e) => (e.name === "classify" ? "classificar" : e.name === "home_route" ? "sugerir sala (home)" : e.dims.mode === "smart" ? "complexo" : e.dims.model ? "simples" : "antes do roteador")))].join(" + "),
          runs: r.length,
          failures: r.filter((e) => e.dims.ok === false).length,
          avgMs: ms.length ? Math.round(ms.reduce((a, b) => a + b, 0) / ms.length) : null,
          tools: r.reduce((a, e) => a + num(e.dims.tools), 0),
          cost: priced.length ? +priced.reduce((a, e) => a + num(e.dims.cost), 0).toFixed(4) : null,
        };
      })
      .sort((a, b) => b.runs - a.runs),
    home: {
      asks: homeRoutes.length,
      people: people((e) => e.name === "home_route"),
      sent: count("home_route_sent"),
      failures: homeRoutes.filter((e) => e.dims.ok === false).length,
      noFit: homeRoutes.filter((e) => e.dims.ok !== false && e.dims.picked === false).length,
    },
    routing: { smart: runs.filter((e) => e.dims.mode === "smart").length, routed: runs.filter((e) => e.dims.model).length, routeCost: +runs.reduce((a, e) => a + num(e.dims.route_cost), 0).toFixed(5) },
    agents: {
      tools: rank(agentCalls, (e) => str(e.dims.tool) || "(?)", (e) => e.user, 8),
      clients: rank(events.filter((e) => e.name === "agent_call" || e.name === "agent_connected"), (e) => str(e.dims.client) || "(?)", (e) => e.user, 5),
      failures: agentCalls.filter((e) => e.dims.ok === false).length,
      // Failures agents reported themselves (MCP report_issue): by kind, and the latest ones.
      issues: {
        byKind: rank(events.filter((e) => e.name === "agent_issue"), (e) => str(e.dims.kind) || "other", (e) => e.user, 4),
        latest: events
          .filter((e) => e.name === "agent_issue")
          .slice(0, 8)
          .map((e) => ({ user: e.user, kind: str(e.dims.kind), model: str(e.dims.model), what: str(e.dims.what), day: e.day })),
      },
      connections: events
        .filter((e) => e.name === "agent_connected") // events come newest first
        .slice(0, 8)
        .map((e) => ({ user: e.user, client: str(e.dims.client), day: e.day })),
    },
    retention: ret,
    together: together.slice(0, 10).map(([id, w]) => ({
      id,
      title: titles.results.find((t) => t.id === id)?.title ?? id,
      people: w.size,
      messages: msgsByBook.get(id) ?? 0,
      agentMessages: agentMsgsByBook.get(id) ?? 0,
    })),
    latestBooks: latestBooks.results.map((b) => ({ ...b, messages: msgsByBook.get(String(b.id)) ?? 0 })),
    logins: rank(events.filter((e) => e.name === "login"), (e) => str(e.dims.method) || "(?)", (e) => e.user, 5),
    users: recentUsers.results,
    books: topBooks.results.map((b) => ({ ...b, messages: msgsByBook.get(String(b.id)) ?? 0 })),
  };
}
