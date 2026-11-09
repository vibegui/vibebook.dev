// First-party analytics: the Worker is the collector, events are D1 rows
// (same pattern as holocard). track() never breaks a request: errors are logged.
// Every new surface ships with at least one track() call.
import type { Env } from "./index";

type Dims = Record<string, string | number | boolean | undefined>;

export interface TrackOpts {
  user?: string | null;
  path?: string;
  visitor?: string;
  country?: string;
  dims?: Dims;
}

/** dims as JSON in ≤512 chars, always valid: the longest string is shortened (by code point) until it fits.
 *  Slicing the JSON itself left rows SQLite's json_extract refuses ("malformed JSON"), e.g. report_issue's 500-char `what`. */
export function fitDims(dims: Record<string, unknown>, max = 512) {
  const d = { ...dims };
  let s = JSON.stringify(d);
  while (s.length > max) {
    const k = Object.keys(d).filter((x) => typeof d[x] === "string").sort((a, b) => String(d[b]).length - String(d[a]).length)[0];
    if (!k) return null;
    const cps = Array.from(String(d[k]));
    d[k] = cps.slice(0, Math.max(0, cps.length - Math.max(2, Math.floor((s.length - max) / 2)))).join("") + "…"; // ≥ half the excess: an emoji is 2 chars of JSON
    if (cps.length <= 1) delete d[k];
    s = JSON.stringify(d);
  }
  return s;
}

export async function track(env: Pick<Env, "DB">, name: string, opts: TrackOpts = {}): Promise<void> {
  try {
    const dims = opts.dims ? Object.fromEntries(Object.entries(opts.dims).filter(([, v]) => v !== undefined)) : null;
    await env.DB.prepare(`INSERT INTO events (name, path, visitor, country, user, dims, ts) VALUES (?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        name,
        opts.path ?? null,
        opts.visitor ?? null,
        opts.country ?? null,
        opts.user ?? null,
        dims ? fitDims(dims) : null,
        Date.now(),
      )
      .run();
  } catch (error) {
    console.error("track failed", { name, error: String(error) });
  }
}

/** Cookieless daily visitor id: hash of secret + UTC day + ip + ua. Rotates daily, never follows a person across days. */
export async function visitorHash(env: Pick<Env, "SESSION_SECRET">, request: Request): Promise<string> {
  const ip = request.headers.get("cf-connecting-ip") ?? "";
  const ua = request.headers.get("user-agent") ?? "";
  const day = new Date().toISOString().slice(0, 10);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${env.SESSION_SECRET}:${day}:${ip}:${ua}`));
  return [...new Uint8Array(digest)].slice(0, 8).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** IP reduced to a network range: enough to spot a scanner, never a person. */
const ipRange = (ip: string) =>
  !ip ? undefined : ip.includes(":") ? `${ip.split(":").slice(0, 3).join(":")}::/48` : `${ip.split(".").slice(0, 3).join(".")}.0/24`;

/** Request-level context for a page view: visitor, country and the dims the traffic screen slices by. */
export async function requestContext(env: Pick<Env, "SESSION_SECRET">, request: Request, response?: Response): Promise<TrackOpts> {
  const cf = ((request as Request & { cf?: Record<string, unknown> }).cf ?? {}) as Record<string, unknown>;
  const url = new URL(request.url);
  return {
    path: url.pathname.startsWith("/b/") ? "/b/:id" : url.pathname,
    visitor: await visitorHash(env, request),
    country: typeof cf.country === "string" ? cf.country : undefined,
    dims: {
      ref: request.headers.get("referer")?.slice(0, 200) || undefined,
      ua: request.headers.get("user-agent")?.slice(0, 200) || undefined,
      asn: cf.asn ? String(cf.asn) : undefined,
      asOrg: typeof cf.asOrganization === "string" ? cf.asOrganization : undefined,
      colo: typeof cf.colo === "string" ? cf.colo : undefined,
      ip: ipRange(request.headers.get("cf-connecting-ip") ?? ""),
      utm: url.searchParams.get("utm_source") || undefined,
      status: response?.status,
    },
  };
}
