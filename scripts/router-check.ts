// The router's fixed rules (src/router.ts rule()), on the cases the A/B got wrong (14/11). bun scripts/router-check.ts
import { rule } from "../src/router-rule";
const G = "gui@x.dev", M = "gimenes@x.dev";
const base = { agent: false, tag: null, for_who: null, mentions_you: false, reply_author: null, epic_owner: null };
const d = (r: ReturnType<typeof rule>) => (r === null ? "model" : r === "skip" ? "skip" : r.decision);
const cases: [string, ReturnType<typeof rule>, string][] = [
  ["Gui's request in Gui's epic, for Gimenes", rule({ ...base, author: G, epic_owner: G }, M), "ignore"],
  ["Gui replying to his own Claude, for Gimenes", rule({ ...base, author: G, reply_author: G }, M), "ignore"],
  ["Gui's message, for Gui: Jev decides (biased to wake)", rule({ ...base, author: G, epic_owner: M }, G), "model"],
  ["Gui @mentions Gimenes in Gui's epic", rule({ ...base, author: G, epic_owner: G, mentions_you: true }, M), "model"],
  ["Gui replies to Gimenes's Claude", rule({ ...base, author: G, reply_author: M }, M), "model"],
  ["Gui in the main thread, no epic", rule({ ...base, author: G }, M), "model"],
  ["Gui in Gimenes's epic", rule({ ...base, author: G, epic_owner: M }, M), "model"],
  ["someone else's Claude talking", rule({ ...base, author: G, agent: true }, M), "skip"],
  ["your reminder", rule({ ...base, author: "ai", tag: "reminder", for_who: M }, M), "wake"],
];
let bad = 0;
for (const [name, got, want] of cases) { const ok = d(got) === want; bad += +!ok; console.log(`${ok ? "ok " : "BAD"} ${name}: ${d(got)}${ok ? "" : ` (want ${want})`}`); }
if (bad) process.exit(1);
