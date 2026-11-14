// The router's bench: every change to the router (src/router-rule.ts, src/router-jev.ts) runs against these cases and
// must not score worse. Cases: scripts/router-cases.json (anonymized seed, in the repo) + with --d1 the ones people's
// agents recorded in production with MCP router_feedback (D1 router_cases, read at run time, never written here).
//   bun scripts/router-bench.ts [--d1] [--min 0.85]
// Needs OPENROUTER_API_KEY in .dev.vars (real Jev calls, ~US$0.00002 each).
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { rule } from "../src/router-rule";
import { jev, own } from "../src/router-jev";

type Case = { note?: string; own: boolean; name: string; sender: string; text: string; topic?: string; recent?: string; memory?: string; expected: "wake" | "ignore" };
const args = process.argv.slice(2), min = Number(args[args.indexOf("--min") + 1]) || 0;
const vars = Object.fromEntries(readFileSync(".dev.vars", "utf8").split("\n").filter((l) => l.includes("=")).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")]));
const env = { ...vars, MODEL_JUDGE: readFileSync("wrangler.jsonc", "utf8").match(/"MODEL_JUDGE":\s*"([^"]+)"/)?.[1] } as never;
const cases: Case[] = JSON.parse(readFileSync("scripts/router-cases.json", "utf8"));
if (args.includes("--d1")) {
  const out = execFileSync("npx", ["wrangler", "d1", "execute", "vibebook", "--remote", "--json", "--command", "SELECT own, name, sender, text, topic, recent, memory, expected, note FROM router_cases ORDER BY ts DESC LIMIT 200"], { encoding: "utf8" });
  for (const r of JSON.parse(out)[0].results as Case[]) cases.push({ ...r, own: !!r.own });
}
let right = 0;
for (const c of cases) {
  const me = c.own ? "me@x" : "me@x", author = c.own ? "me@x" : "other@x";
  const fixed = rule({ author, agent: false, tag: null, for_who: null, mentions_you: /@\S/.test(c.text) && new RegExp(`@${c.name}`, "i").test(c.text), reply_author: null, epic_owner: null }, me);
  const m = { topic: c.topic ?? "sala principal", recent: c.recent ?? "", from: c.sender, text: c.text };
  const memory = c.memory ?? "Room: a product team. People and their agents: Ana (Claude), Bruno (Codex).";
  const got = fixed === "skip" ? "ignore" : fixed ? fixed.decision : c.own ? (await own(env, c.name, memory, m)).decision : ((await jev(env, c.name, memory, m))?.decision ?? "wake");
  const verdict = (got === "answer" ? "wake" : got) === c.expected;
  right += +verdict;
  console.log(`${verdict ? "ok " : "BAD"} ${got.padEnd(6)} (want ${c.expected}) ${c.own ? "own " : "other"} | ${c.note ?? ""} | ${c.text.slice(0, 70)}`);
}
const score = right / cases.length;
console.log(`\n${right}/${cases.length} = ${(score * 100).toFixed(0)}%`);
if (score < min) { console.log(`below --min ${min}`); process.exit(1); }
