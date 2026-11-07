// bun scripts/reports-check.ts: the daily reports' pure helpers (src/reports.ts).
import { bytes, externalRefs, vs, yesterday } from "../src/reports";
const assert = (ok: boolean, m: string) => { if (!ok) throw new Error(m); };
// 2026-11-07 10:00 São Paulo = 13:00 UTC → yesterday = 2026-11-06 00:00..24:00 São Paulo = 03:00 UTC .. 03:00 UTC
const y = yesterday(Date.UTC(2026, 10, 7, 13));
assert(y.start === Date.UTC(2026, 10, 6, 3) && y.end === Date.UTC(2026, 10, 7, 3), "yesterday in São Paulo");
assert(yesterday(Date.UTC(2026, 10, 7, 2)).end === Date.UTC(2026, 10, 6, 3), "before 3am UTC is still the 6th in SP");
assert(vs(12, 70) === "**12** (+20% vs média 10)", vs(12, 70));
assert(vs(3, 0) === "**3**", "no baseline");
assert(bytes(2_500_000) === "2.5 MB", bytes(2_500_000));
const r = externalRefs([{ k: "https://vibebook.dev/pt", v: 9 }, { k: "https://www.google.com/", v: 2 }, { k: "https://google.com/search", v: 1 }, { k: "bad", v: 5 }]);
assert(r.length === 1 && r[0].k === "google.com" && r[0].v === 3, JSON.stringify(r));
console.log("ok");
