// Writes public/pt/changelog.html and public/en/changelog.html from scripts/changelog.json (newest release first).
// Shipped something a person would notice? Add it to the top release of changelog.json (or start a new one for the
// day), with a screenshot from a test room in public/changelog/, then `bun scripts/changelog.ts`. See AGENTS.md.
import { readFileSync, writeFileSync } from "node:fs";

type L = { pt: string; en: string };
type Ls = { pt: string[]; en: string[] };
type Release = { date: string; slug: string; title: L; intro: L; features: { title: L; text: L; image?: string; alt?: L }[]; improvements?: Ls; fixes?: Ls };

const releases: Release[] = JSON.parse(readFileSync(new URL("./changelog.json", import.meta.url), "utf8"));
const l = (pt: string, en: string): L => ({ pt, en });
const T = {
  title: l("Changelog · vibebook", "Changelog · vibebook"),
  desc: l("Tudo que o vibebook ganhou desde o começo, lançamento por lançamento, com prints.", "Everything vibebook shipped since day one, release by release, with screenshots."),
  kick: l("Changelog", "Changelog"),
  h1: l("O que mudou no vibebook", "What changed in vibebook"),
  lede: l("Cada lançamento, do mais novo pro mais antigo: o que você passa a poder fazer, o que melhorou e o que consertamos.", "Every release, newest first: what you can do now, what got better and what we fixed."),
  toc: l("Lançamentos", "Releases"),
  imp: l("Melhorias", "Improvements"),
  fix: l("Correções", "Fixes"),
  home: l("Início", "Home"),
  sec: l("Segurança", "Security"),
  signin: l("Entrar", "Sign in"),
};
const LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="4" width="22" height="24" rx="5" fill="#fff"/><rect x="7" y="9" width="11" height="3" rx="1.5" fill="#1d5fc4"/><rect x="7" y="15" width="8" height="3" rx="1.5" fill="#1d5fc4"/><circle cx="24" cy="23" r="7" fill="#f2dc4a"/><path d="M24 19.5l1 2.4 2.5 1.1-2.5 1.1-1 2.4-1-2.4-2.5-1.1 2.5-1.1z" fill="#14305e"/></svg>`;

const CSS = `
header.top .w { width: min(1120px, 100% - 48px); }
header.top .kick { color: var(--sun); font-weight: 600; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; margin: 0 0 14px; }
.cl { display: grid; grid-template-columns: 220px 1fr; gap: 48px; width: min(1120px, 100% - 48px); margin: 0 auto; align-items: start; }
.cl > * { min-width: 0; }
.cl-toc { position: sticky; top: 84px; font-size: 14px; margin-left: -12px; max-height: calc(100vh - 110px); overflow: auto; }
.cl-toc p { padding-left: 12px; color: var(--dim); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 10px; }
.cl-toc ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
.cl-toc a { display: grid; gap: 1px; color: var(--mute); text-decoration: none; padding: 6px 10px; border-radius: 9px; border-left: 2px solid transparent; }
.cl-toc a small { color: var(--dim); font-size: 12px; }
.cl-toc a:hover { color: var(--ink); background: var(--panel); }
.cl-toc a.on { color: var(--ink); border-left-color: var(--sun); background: var(--panel); }
.rel { padding: 8px 0 56px; scroll-margin-top: 80px; border-bottom: 1px solid var(--line); margin-bottom: 40px; }
.rel:last-child { border-bottom: 0; }
.rel time { display: inline-block; color: var(--sun); font-weight: 600; font-size: 13px; letter-spacing: .04em; margin-bottom: 8px; }
.rel h2 { font-size: clamp(26px, 3.6vw, 36px); }
.rel h2 a { color: inherit; text-decoration: none; }
.rel .intro { color: var(--soft); margin: 10px 0 26px; max-width: 680px; font-size: 17px; }
.feat { margin: 0 0 30px; }
.feat h3 { font: 600 19px/1.3 var(--sans); letter-spacing: -0.01em; margin: 0 0 6px; }
.feat p { margin: 0; color: var(--soft); font-size: 15.5px; line-height: 1.6; max-width: 680px; }
.feat figure { margin: 14px 0 0; }
.feat img { display: block; width: 100%; max-width: 860px; height: auto; border-radius: 14px; border: 1px solid var(--line); background: var(--panel); }
.rel h4 { font: 600 13px var(--sans); color: var(--dim); text-transform: uppercase; letter-spacing: .08em; margin: 26px 0 8px; }
.rel ul { margin: 0; padding-left: 20px; color: var(--soft); font-size: 15px; line-height: 1.6; max-width: 720px; }
.rel li { margin: 3px 0; }
@media (max-width: 860px) {
  .cl { grid-template-columns: 1fr; gap: 8px; width: calc(100% - 48px); }
  .cl-toc { top: 0; z-index: 5; margin: 0 -24px; padding: 10px 24px; background: rgb(10 13 19 / .92); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); max-height: none; }
  .cl-toc p { display: none; }
  .cl-toc ol { display: flex; overflow-x: auto; gap: 6px; scrollbar-width: none; }
  .cl-toc a { white-space: nowrap; border: 1px solid var(--line); border-radius: 999px; padding: 6px 12px; display: block; }
  .cl-toc a span { display: none; }
  .cl-toc a.on { border-color: var(--sun); }
  .rel { scroll-margin-top: 70px; }
}
`;
const JS = `
const as=[...document.querySelectorAll('.cl-toc a')];
const io=new IntersectionObserver((es)=>{for(const e of es)if(e.isIntersecting){as.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id));const on=as.find(a=>a.classList.contains('on'));on&&on.scrollIntoView({block:'nearest',inline:'nearest'});}},{rootMargin:'-20% 0px -70% 0px'});
document.querySelectorAll('.rel').forEach(s=>io.observe(s));
`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const day = (d: string, lang: "pt" | "en") => new Date(`${d}T12:00:00Z`).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function page(lang: "pt" | "en") {
  const o = lang === "pt" ? "en" : "pt";
  const g = (x: L) => x[lang];
  const list = (x?: Ls) => (x?.[lang].length ? `<ul>${x[lang].map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : "");
  const toc = releases.map((r) => `<li><a href="#${r.slug}"><small>${esc(day(r.date, lang))}</small><span>${esc(g(r.title))}</span></a></li>`).join("");
  const body = releases
    .map(
      (r) => `<section class="rel" id="${r.slug}">
  <time datetime="${r.date}">${esc(day(r.date, lang))}</time>
  <h2><a href="#${r.slug}">${esc(g(r.title))}</a></h2>
  <p class="intro">${esc(g(r.intro))}</p>
${r.features.map((f) => `  <div class="feat"><h3>${esc(g(f.title))}</h3><p>${esc(g(f.text))}</p>${f.image ? `<figure><img src="/${esc(f.image)}" alt="${esc(f.alt ? g(f.alt) : g(f.title))}" loading="lazy" /></figure>` : ""}</div>`).join("\n")}
${r.improvements?.[lang].length ? `  <h4>${g(T.imp)}</h4>${list(r.improvements)}` : ""}
${r.fixes?.[lang].length ? `  <h4>${g(T.fix)}</h4>${list(r.fixes)}` : ""}
</section>`,
    )
    .join("\n");
  return `<!doctype html>
<html lang="${lang === "pt" ? "pt-BR" : "en"}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${esc(g(T.title))}</title>
<meta name="description" content="${esc(g(T.desc))}" />
<link rel="canonical" href="https://vibebook.dev/${lang}/changelog" />
<link rel="alternate" hreflang="pt-BR" href="https://vibebook.dev/pt/changelog" />
<link rel="alternate" hreflang="en" href="https://vibebook.dev/en/changelog" />
<meta name="theme-color" content="#0a0d13" />
<meta property="og:title" content="${esc(g(T.title))}" />
<meta property="og:description" content="${esc(g(T.desc))}" />
<meta property="og:image" content="https://vibebook.dev/${lang === "en" ? "og-en.png" : "og.png"}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..700,0..100,0..1&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/site.css" />
<style>${CSS}</style>
</head>
<body>
<nav><div class="w">
  <a class="logo" href="/${lang}" aria-label="vibebook">${LOGO}vibebook</a>
  <span class="sp"></span>
  <a class="l" href="/${lang}">${g(T.home)}</a>
  <a class="l" href="/${lang}/docs">Docs</a>
  <a class="l" href="/${lang}/changelog" aria-current="page">Changelog</a>
  <a class="l" href="/${lang}/how-it-works">${g(T.sec)}</a>
  <a class="l" href="/${o}/changelog" hreflang="${o}" lang="${o}">${o.toUpperCase()}</a>
  <a class="btn sm" href="/app">${g(T.signin)}</a>
</div></nav>
<header class="top"><div class="w">
  <p class="kick">${g(T.kick)}</p>
  <h1>${g(T.h1)}</h1>
  <p class="lede">${esc(g(T.lede))}</p>
</div></header>
<div class="cl">
<aside class="cl-toc"><p>${g(T.toc)}</p><ol>${toc}</ol></aside>
<main>
${body}
</main>
</div>
<footer><div class="w"><span>vibebook · ${lang === "pt" ? "feito com ✨ no Rio de Janeiro por" : "made with ✨ in Rio de Janeiro by"} <a href="https://vibegui.com" rel="noopener">vibegui</a></span><span><a href="https://github.com/vibegui/vibebook.dev" rel="noopener">GitHub</a></span></div></footer>
<script>${JS}</script>
</body>
</html>
`;
}

for (const lang of ["pt", "en"] as const) writeFileSync(`public/${lang}/changelog.html`, page(lang));
console.log(`wrote public/pt/changelog.html, public/en/changelog.html (${releases.length} releases)`);
