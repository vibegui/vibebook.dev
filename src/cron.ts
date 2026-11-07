// 5-field cron ("min hour day month weekday") in a time zone, for room reminders. Supports *, n, a-b, */n, a-b/n and
// lists; weekday 0-7 (0 and 7 = Sunday). Day and weekday both restricted = either matches (classic cron).
const RANGES: [number, number][] = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 7]];

export type Cron = { sets: Set<number>[]; anyDay: boolean; anyDow: boolean };

export function parseCron(expr: string): Cron {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("cron needs 5 fields: minute hour day month weekday, e.g. \"0 9 * * 1-5\"");
  const sets = parts.map((p, i) => {
    const [lo, hi] = RANGES[i];
    const s = new Set<number>();
    for (const item of p.split(",")) {
      const m = item.match(/^(\*|(\d+)(?:-(\d+))?)(?:\/(\d+))?$/);
      if (!m) throw new Error(`bad cron field "${p}"`);
      const a = m[1] === "*" ? lo : +m[2];
      const b = m[1] === "*" ? hi : m[3] ? +m[3] : m[4] ? hi : a;
      const step = m[4] ? +m[4] : 1;
      if (a < lo || b > hi || a > b || step < 1) throw new Error(`cron field "${p}" out of range ${lo}-${hi}`);
      for (let v = a; v <= b; v += step) s.add(i === 4 && v === 7 ? 0 : v);
    }
    return s;
  });
  return { sets, anyDay: parts[2] === "*", anyDow: parts[4] === "*" };
}

/** ms to add to UTC to get the wall clock in tz at instant t. */
function offset(t: number, tz: string) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })
      .formatToParts(new Date(t))
      .map((x) => [x.type, +x.value]),
  );
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(t / 1000) * 1000;
}

/** Next instant (ms) strictly after `after` that matches, or null if none within ~4 years. Throws on a bad tz. */
export function nextRun(c: Cron, tz: string, after: number): number | null {
  const [min, hour, day, month, dow] = c.sets;
  // Walk the wall clock as a UTC date, jumping by whole months/days/hours when a coarser field doesn't match.
  const d = new Date(Math.floor((after + offset(after, tz)) / 60_000) * 60_000 + 60_000);
  for (let i = 0; i < 5000; i++) {
    const dayOk = c.anyDay && c.anyDow ? true : c.anyDay ? dow.has(d.getUTCDay()) : c.anyDow ? day.has(d.getUTCDate()) : day.has(d.getUTCDate()) || dow.has(d.getUTCDay());
    if (!month.has(d.getUTCMonth() + 1)) d.setUTCMonth(d.getUTCMonth() + 1, 1), d.setUTCHours(0, 0);
    else if (!dayOk) d.setUTCDate(d.getUTCDate() + 1), d.setUTCHours(0, 0);
    else if (!hour.has(d.getUTCHours())) d.setUTCHours(d.getUTCHours() + 1, 0);
    else if (!min.has(d.getUTCMinutes())) d.setUTCMinutes(d.getUTCMinutes() + 1);
    else {
      const wall = d.getTime();
      const utc = wall - offset(wall - offset(wall, tz), tz);
      if (utc > after) return utc;
      d.setUTCMinutes(d.getUTCMinutes() + 1); // DST fold: this wall time already passed
    }
  }
  return null;
}

const DOW = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const DOW_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/** The common shapes in words ("todo dia às 08:00", "toda segunda às 10:00", "dias úteis às 09:30"); anything else
 * stays as the cron itself. In the room's language (en = English, else Portuguese). */
export function cronWords(expr: string, en = false) {
  const [mi, h, d, mo, w] = expr.trim().split(/\s+/);
  if (!/^\d+$/.test(mi ?? "") || !/^\d+$/.test(h ?? "") || mo !== "*") return `cron ${expr.trim()}`;
  const hm = `${h.padStart(2, "0")}:${mi.padStart(2, "0")}`;
  if (en) {
    if (d === "*" && w === "*") return `every day at ${hm}`;
    if (d === "*" && w === "1-5") return `weekdays at ${hm}`;
    if (d === "*" && /^[0-7](,[0-7])*$/.test(w)) return `every ${[...new Set(w.split(",").map((x) => DOW_EN[+x % 7]))].join(", ")} at ${hm}`;
    if (/^\d+$/.test(d) && w === "*") return `every month on day ${d} at ${hm}`;
    return `cron ${expr.trim()}`;
  }
  const at = `às ${hm}`;
  if (d === "*" && w === "*") return `todo dia ${at}`;
  if (d === "*" && (w === "1-5")) return `dias úteis ${at}`;
  if (d === "*" && /^[0-7](,[0-7])*$/.test(w)) {
    const days = [...new Set(w.split(",").map((x) => DOW[+x % 7]))];
    const fem = (x: string) => !/^(sábado|domingo)$/.test(x);
    return days.length === 1 ? `${fem(days[0]) ? "toda" : "todo"} ${days[0]} ${at}` : `${days.join(", ")} ${at}`;
  }
  if (/^\d+$/.test(d) && w === "*") return `todo dia ${d} do mês ${at}`;
  return `cron ${expr.trim()}`;
}
