// Read side of the event stream (rows written by track.ts), ported from holocard.
//
// One D1 read per call fetches the raw events in the window; rankings are
// aggregated in JS. That makes cross-filtering free: each ranking respects every
// active filter EXCEPT its own, so clicking "BR" filters pages and sources but
// leaves the country list whole to click through.
import type { Env } from "./index";

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
    let dims: Record<string, unknown> = {};
    try {
      dims = JSON.parse(r.dims);
    } catch {
      // a corrupt dims blob must not drop the event
    }
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

const ACTIVITY = ["message", "ai_run", "book_created", "signup", "invite_sent"] as const;

/** Product back office: KPIs, activity per day, funnel, AI usage, people and books. */
export async function adminOverview(env: Pick<Env, "DB">, daysIn?: number) {
  const days = Math.min(Math.max(daysIn ?? 30, 1), 90);
  const since = Date.now() - days * DAY_MS;
  const events = await load(env, days);
  const db = env.DB;
  const [users, books, newUsers, newBooks, activeBooks, recentUsers, topBooks] = await Promise.all([
    db.prepare(`SELECT count(*) AS n FROM users`).first<{ n: number }>(),
    db.prepare(`SELECT count(*) AS n FROM books`).first<{ n: number }>(),
    db.prepare(`SELECT count(*) AS n FROM users WHERE created_at >= ?`).bind(since).first<{ n: number }>(),
    db.prepare(`SELECT count(*) AS n FROM books WHERE created_at >= ?`).bind(since).first<{ n: number }>(),
    db.prepare(`SELECT count(*) AS n FROM books WHERE updated_at >= ?`).bind(since).first<{ n: number }>(),
    db
      .prepare(
        `SELECT u.email, u.name, u.created_at, (SELECT count(*) FROM members m WHERE m.email = u.email) AS books,
           (SELECT max(ts) FROM events e WHERE e.user = u.email) AS last_seen
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
  ]);

  const count = (name: string) => events.filter((e) => e.name === name).length;
  const people = (pred: (e: Raw) => boolean) => new Set(events.filter(pred).map((e) => e.user || e.visitor)).size;
  const runs = events.filter((e) => e.name === "ai_run");
  const msgsByBook = new Map<string, number>();
  for (const e of events) if (e.name === "message") msgsByBook.set(str(e.dims.book), (msgsByBook.get(str(e.dims.book)) ?? 0) + 1);

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
      { step: "Visitou a landing", n: people((e) => e.name === "pageview" && e.path === "/") },
      { step: "Abriu o login", n: people((e) => e.name === "pageview" && e.path === "/login") },
      { step: "Pediu código", n: people((e) => e.name === "login_code_sent") },
      { step: "Entrou", n: people((e) => e.name === "login") },
      { step: "Criou vibebook", n: people((e) => e.name === "book_created") },
      { step: "Convidou alguém", n: people((e) => e.name === "invite_sent") },
      { step: "Chamou a @ai", n: people((e) => e.name === "ai_run") },
    ],
    ai: ["fast", "medium", "heavy"].map((mode) => {
      const r = runs.filter((e) => (e.dims.mode ?? "fast") === mode);
      const ms = r.map((e) => Number(e.dims.ms) || 0).filter(Boolean);
      return {
        mode,
        runs: r.length,
        failures: r.filter((e) => e.dims.ok === false).length,
        avgMs: ms.length ? Math.round(ms.reduce((a, b) => a + b, 0) / ms.length) : null,
        tools: r.reduce((a, e) => a + (Number(e.dims.tools) || 0), 0),
      };
    }),
    logins: rank(events.filter((e) => e.name === "login"), (e) => str(e.dims.method) || "(?)", (e) => e.user, 5),
    users: recentUsers.results,
    books: topBooks.results.map((b) => ({ ...b, messages: msgsByBook.get(String(b.id)) ?? 0 })),
  };
}
