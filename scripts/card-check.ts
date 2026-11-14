// Card validation: bun scripts/card-check.ts
import { cardOf } from "../src/card";
const assert = (c: unknown, m: string) => { if (!c) { console.error("FAIL", m); process.exitCode = 1; } };
  const ok = cardOf({ root: "c", elements: { c: { type: "Card", props: { title: "Deploy" }, children: ["t", "f", "tb", "a"] }, t: { type: "Text", props: { content: "Tudo verde" } }, f: { type: "Fields", children: ["f1"] }, f1: { type: "Field", props: { label: "p50", value: "220ms" } }, tb: { type: "Table", props: { headers: ["rota", "ms"], rows: [["/api/me", 220]] } }, a: { type: "Actions", children: ["b"] }, b: { type: "Button", props: { label: "Aprovar" } } } }, "r1");
  assert(ok.elements.tb.props.rows && (ok.elements.tb.props.rows as string[][])[0][1] === "220", "numbers become text");
  const bad = (x: unknown, why: RegExp) => { try { cardOf(x, "r1"); assert(false, "should fail: " + why); } catch (e) { assert(why.test((e as Error).message), (e as Error).message); } };
  bad({ root: "c", elements: { c: { type: "Script" } } }, /unknown component/);
  bad({ root: "t", elements: { t: { type: "Text", props: { content: "x" } } } }, /root element must be a Card/);
  bad({ root: "c", elements: { c: { type: "Card", children: ["i"] }, i: { type: "Image", props: { url: "https://evil.example/p.gif" } } } }, /file of this room/);
  bad({ root: "c", elements: { c: { type: "Card", children: ["a"] }, a: { type: "Actions", children: ["t"] }, t: { type: "Text", props: { content: "x" } } } }, /can't be inside/);
  bad({ root: "c", elements: { c: { type: "Card", children: ["l"] }, l: { type: "LinkButton", props: { label: "x", url: "javascript:alert(1)" } } } }, /http/);
  // Places in the room: a message, an epic, the doc; anything else that starts with # is refused.
  for (const url of ["#m42", "#ee21aabee", "#doc", "#doc:e21aabee"]) cardOf({ root: "c", elements: { c: { type: "Card", children: ["l"] }, l: { type: "LinkButton", props: { label: "ir", url } } } }, "r1");
  bad({ root: "c", elements: { c: { type: "Card", children: ["l"] }, l: { type: "LinkButton", props: { label: "x", url: "#x<script>" } } } }, /http/);
  // Several series, deltas, a primary link button.
  const multi = cardOf({ root: "c", elements: { c: { type: "Card", children: ["ch", "f"] }, ch: { type: "Chart", props: { kind: "line", labels: ["s1", "s2"], series: [{ name: "a", values: [1, "2"] }, { name: "b", values: [3, 4] }] } }, f: { type: "Fields", children: ["x"] }, x: { type: "Field", props: { label: "erros", value: "3", delta: "-40%", good: "down", trend: "4 sem: 5 · 4 · 3" } } } }, "r1");
  assert((multi.elements.ch.props.series as { values: number[] }[])[0].values[1] === 2, "series values become numbers");
  assert(multi.elements.x.props.good === "down" && multi.elements.x.props.delta === "-40%", "field keeps delta and good");
  bad({ root: "c", elements: { c: { type: "Card", children: ["ch"] }, ch: { type: "Chart", props: { labels: ["a", "b"], series: [{ name: "x", values: [1] }] } } } }, /one number per label/);
  bad({ root: "c", elements: { c: { type: "Card", children: ["ch"] }, ch: { type: "Chart", props: { labels: ["a"], series: [1, 2, 3, 4, 5].map((n) => ({ name: String(n), values: [n] })) } } } }, /1-4 series/);
  console.log("card checks passed");

