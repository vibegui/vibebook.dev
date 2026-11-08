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
  console.log("card checks passed");

