// bun scripts/cron-check.ts
import { cronWords, nextRun, parseCron } from "../src/cron";

let fail = 0;
const eq = (got: number | null, want: string, label: string) => {
  const ok = got === Date.parse(want);
  if (!ok) fail++;
  console.log(ok ? "ok  " : "FAIL", label, got === null ? null : new Date(got).toISOString(), ok ? "" : `want ${want}`);
};
const SP = "America/Sao_Paulo"; // UTC-3, no DST
const t0 = Date.parse("2026-11-06T20:00:00Z"); // Fri 17:00 in São Paulo

eq(nextRun(parseCron("0 9 * * *"), SP, t0), "2026-11-07T12:00:00Z", "daily 9h SP -> Sat 9h");
eq(nextRun(parseCron("0 9 * * 1-5"), SP, t0), "2026-11-09T12:00:00Z", "weekdays 9h -> Mon");
eq(nextRun(parseCron("30 17 * * *"), SP, t0), "2026-11-06T20:30:00Z", "today 17:30");
eq(nextRun(parseCron("0 17 * * *"), SP, t0), "2026-11-07T20:00:00Z", "exactly now -> tomorrow");
eq(nextRun(parseCron("*/15 * * * *"), "UTC", t0), "2026-11-06T20:15:00Z", "every 15 min");
eq(nextRun(parseCron("0 8 1 * *"), SP, t0), "2026-12-01T11:00:00Z", "1st of month");
eq(nextRun(parseCron("0 9 * * 0"), SP, t0), "2026-11-08T12:00:00Z", "Sunday as 0");
eq(nextRun(parseCron("0 9 * * 7"), SP, t0), "2026-11-08T12:00:00Z", "Sunday as 7");
eq(nextRun(parseCron("0 9 * * *"), "America/New_York", Date.parse("2026-03-07T20:00:00Z")), "2026-03-08T13:00:00Z", "NY across DST start (EDT)");
eq(nextRun(parseCron("0 0 29 2 *"), "UTC", t0), "2028-02-29T00:00:00Z", "leap day");
for (const bad of ["* * * *", "60 * * * *", "0 25 * * *", "a * * * *", "5-1 * * * *"]) {
  try {
    parseCron(bad);
    fail++;
    console.log("FAIL accepted", bad);
  } catch {
    console.log("ok   rejects", JSON.stringify(bad));
  }
}
try {
  nextRun(parseCron("0 9 * * *"), "Mars/Base", t0);
  fail++;
  console.log("FAIL accepted bad tz");
} catch {
  console.log("ok   rejects bad tz");
}
for (const [c, w] of [["0 8 * * *", "todo dia às 08:00"], ["0 10 * * 1", "toda segunda às 10:00"], ["30 9 * * 1-5", "dias úteis às 09:30"], ["0 9 * * 6", "todo sábado às 09:00"], ["0 9 * * 1,3", "segunda, quarta às 09:00"], ["0 7 1 * *", "todo dia 1 do mês às 07:00"], ["*/30 * * * *", "cron */30 * * * *"]]) {
  const got = cronWords(c);
  if (got !== w) { fail++; console.log("FAIL words", c, got); } else console.log("ok  ", w);
}
console.log(fail ? `${fail} failed` : "all checks passed");
process.exit(fail ? 1 : 0);
