// i18n check for public/app.html: every t("…") key has an English entry in EN, and no Portuguese-looking text is
// left outside t(…) in the app's script. Run: bun scripts/i18n-check.ts (exit 1 on missing keys or leftovers).
const src = await Bun.file(new URL("../svelte/legacy/host.js", import.meta.url)).text();
const lineOf = (i: number) => src.slice(0,i).split("\n").length;

// EN: the object literal between `const EN = {` and the line `};`.
const enStart = src.indexOf("const EN = {");
const enEnd = src.indexOf("\n};", enStart) + 3;
const EN: Record<string, string> = new Function(`return ${src.slice(enStart + "const EN = ".length, enEnd - 1)}`)();

// Keys: t("…") with a plain double-quoted string (escapes allowed).
const keyRe = /(?<![\w$.])t\("((?:[^"\\\n]|\\.)*)"/g;
const keys = new Map<string, number>();
for (const m of src.matchAll(keyRe)) {
  if (m.index! >= enStart && m.index! < enEnd) continue;
  const k = JSON.parse(`"${m[1]}"`);
  if (!keys.has(k)) keys.set(k, lineOf(m.index!));
}
// Svelte components share the host translation dictionary; check their keys too.
for await (const file of new Bun.Glob("svelte/**/*.{svelte,ts}").scan(".")) {
  const component = await Bun.file(file).text();
  for (const m of component.matchAll(/\b(?:vb\.)?t\((["'])((?:\\.|(?!\1).)*)\1/g)) {
    const k: string = new Function(`return ${m[1]}${m[2]}${m[1]}`)();
    if (!keys.has(k)) keys.set(k, 0);
  }
}
const missing = [...keys].filter(([k]) => !(k in EN));
const unused = Object.keys(EN).filter((k) => !keys.has(k));
// Placeholders must match between the Portuguese key and the English text.
const ph = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
const badVars = Object.entries(EN).filter(([k, v]) => ph(k) !== ph(v));

// Leftovers: Portuguese-looking words in code lines, after removing comments and t("…") calls.
const PT = /[ãõçáéíóúâêôà]|\b(você|voce|não|sala|salas|épico|tarefa|tarefas|esperando|apagar|enviar|enviando|cancelar|arquivar|entrar|sair|novo|nova|pessoas|amigos|mensagem|clique|aqui|ainda|seu|sua|seus|nada|pra|para|com|está|agora|ouvindo|conectar|copiar|remover|abrir|fechar|votação|lembrete|decisões|arquivos)\b/i;
// Intentional: data compared with server content, the epic doc seed (doc markdown, same as src/book.ts), regexes.
const ALLOW = [
  'textContent.trim().toLowerCase() === "tarefas"', // the doc's "## Tarefas" heading (server-written markdown)
  '=== "[[tarefas]]"', // the doc marker line (markdown)
  "**Objetivo:** o que este épico entrega", // epic doc seed, same text as epicDocSeed in src/book.ts
  'const STOP = new Set(["e", "de", "do"', // stop words for initials (data, not UI)
  'replace(/[^\\p{L}\\p{N} ]/gu', // regex
  "const ghChips = (h) =>", // regex over link HTML
  "const FILE_KINDS = [", // tab labels, each shown through t() (keys in EN)
  'LANG === "en" ? "en-US" : "pt-BR"', // locale names
  'document.documentElement.lang = LANG === "en" ? "en" : "pt-BR"',
  'aria-label="Idioma / Language"', // the switch speaks both
  "Read ${location.origin}/llms.txt and set up vibebook", // already English
];
const leftovers: string[] = [];
let at = -1;
src.split("\n").forEach((line) => {
  at += 1; const start = at; at += line.length;
  if (start >= enStart && start < enEnd) return;
  if (/^\s*\/\//.test(line)) return; // comment line
  if (ALLOW.some((a) => line.includes(a))) return;
  let code = line
    .replace(/(?<![\w$.])t\("(?:[^"\\]|\\.)*"/g, 't(""') // t("…") keys
    .replace(/(^|[;{}),]\s*)\/\/ .*$/, "$1") // trailing // comment
    .replace(/\/\*.*?\*\//g, "");
  // Only text that sits in string literals / templates / markup, not identifiers: drop ${…}-free code tokens roughly
  // by keeping what's inside quotes, backticks, or between > and <.
  const texts = [...code.matchAll(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|>([^<>`$]+)</g)].map((m) => m[1] ?? m[2] ?? m[3]);
  const tpl = [...code.matchAll(/`([^`]*)`/g)].map((m) => m[1].replace(/\$\{[^}]*\}/g, " "));
  const hit = [...texts, ...tpl].find((x) => x && PT.test(x));
  if (hit) leftovers.push(`${lineOf(start)}: ${line.trim().slice(0, 160)}`);
});

console.log(`${keys.size} keys, ${Object.keys(EN).length} in EN`);
if (unused.length) console.log(`unused EN entries (${unused.length}):\n  ${unused.join("\n  ")}`);
if (badVars.length) console.log(`placeholder mismatch (${badVars.length}):\n  ${badVars.map(([k]) => k).join("\n  ")}`);
if (missing.length) console.log(`missing in EN (${missing.length}):\n${missing.map(([k, l]) => `  ${l}: ${JSON.stringify(k)}`).join("\n")}`);
if (leftovers.length) console.log(`Portuguese outside t() (${leftovers.length}):\n  ${leftovers.join("\n  ")}`);
const fail = missing.length || leftovers.length || badVars.length;
console.log(fail ? "FAIL" : "ok");
process.exit(fail ? 1 : 0);
