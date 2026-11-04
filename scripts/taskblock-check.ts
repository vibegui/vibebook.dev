// bun scripts/taskblock-check.ts: the doc ⇄ tasks checklist sync (src/taskblock.ts).
import { parseBlock, reconcile, renderBlock } from "../src/taskblock";

let fails = 0;
const check = (ok: unknown, what: string) => { console.log(`${ok ? "✓" : "✗"} ${what}`); if (!ok) fails++; };

const seed = "# Épico\n\n**Objetivo:** algo.\n\n## Contexto\n\n- \n\n## Decisões\n\n- \n";
const tasks = [{ id: "a", title: "Criar conta", done: false }, { id: "b", title: "Deploy", done: true }];

const doc = renderBlock(seed, tasks);
check(doc.indexOf("## Tarefas") < doc.indexOf("## Contexto") && doc.indexOf("**Objetivo:**") < doc.indexOf("## Tarefas"), "the section goes after the goal, before Contexto");
check(doc.includes("- [ ] Criar conta\n- [x] Deploy"), "tasks render as a checklist");
check(renderBlock(doc, tasks) === doc, "rendering again changes nothing");
check(JSON.stringify(parseBlock(doc)) === JSON.stringify([{ done: false, title: "Criar conta" }, { done: true, title: "Deploy" }]), "parse reads it back");
check(parseBlock(seed) === null, "a doc without the section has no checklist");

let r = reconcile(parseBlock(doc.replace("- [ ] Criar conta", "- [x] Criar conta"))!, tasks);
check(r.update.length === 1 && r.update[0].id === "a" && r.update[0].done === true && !r.add.length && !r.del.length, "ticking [x] marks the task done");
r = reconcile(parseBlock(doc.replace("Criar conta", "Criar conta Cloudflare"))!, tasks);
check(r.update[0]?.id === "a" && r.update[0].title === "Criar conta Cloudflare" && !r.add.length && !r.del.length, "editing a line renames its task");
r = reconcile(parseBlock(doc.replace("- [x] Deploy", "- [x] Deploy\n- [ ] Trocar DNS\n- [ ] "))!, tasks);
check(r.add.length === 1 && r.add[0].title === "Trocar DNS" && !r.update.length, "a new line adds a task (empty ones are ignored)");
r = reconcile(parseBlock(doc.replace("- [ ] Criar conta\n", ""))!, tasks);
check(r.del.length === 1 && r.del[0] === "a" && !r.add.length, "removing a line deletes its task");
const withNote = doc.replace("- [x] Deploy", "- [x] Deploy\n\nObs.: o DNS só depois do QA.");
check(renderBlock(withNote, tasks).includes("Obs.: o DNS só depois do QA."), "other text in the section is kept");

if (fails) { console.log(`\n${fails} check(s) failed`); process.exit(1); }
console.log("\nall checks passed");
