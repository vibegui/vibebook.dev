// bun scripts/personas.ts — writes the three persona pages in pt and en (public/pt/para/*.html, public/en/for/*.html)
// and the landing's "Para clientes | times | fundadores" block between the PERSONAS markers in public/{pt,en}.html.
// Edit the copy here, then run it again; never edit the generated pages by hand.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

type Lang = "pt" | "en";
type Msg = { who: string; color: string; agent?: boolean; vibe?: boolean; text: string; done?: boolean; choices?: string[]; picked?: string; note?: string };
type Persona = {
  slug: Record<Lang, string>;
  tab: Record<Lang, string>;
  kicker: Record<Lang, string>;
  h1: Record<Lang, [string, string]>;
  lede: Record<Lang, string>;
  room: Record<Lang, string>;
  roomColor: string;
  chat: Record<Lang, Msg[]>;
  moments: Record<Lang, [string, string][]>;
  features: Record<Lang, [string, string][]>;
  pitch: Record<Lang, string[]>;
};

const C = { gui: "#1d5fc4", ana: "#be185d", diego: "#0e7490", marina: "#7c3aed", bruno: "#b45309", carla: "#15803d" };

const P: Persona[] = [
  {
    slug: { pt: "clientes", en: "clients" },
    tab: { pt: "Para quem atende clientes", en: "For client work" },
    kicker: { pt: "Para devs, agências e consultorias", en: "For devs, agencies and consultancies" },
    h1: { pt: ["Seu cliente pede no chat.", "Seu Claude entrega com o PR."], en: ["Your client asks in the chat.", "Your Claude ships the PR."] },
    lede: {
      pt: "Uma sala por cliente, com o cliente dentro, mesmo sem ele ter Claude. Cada pedido vira um épico com escopo, tarefas e entrega, e cada aprovação fica registrada.",
      en: "One room per client, with the client in it, even without a Claude of their own. Every request becomes an epic with scope, tasks and a delivery, and every approval is on record.",
    },
    room: { pt: "Loja Aurora", en: "Aurora Store" },
    roomColor: "#be185d",
    chat: {
      pt: [
        { who: "Ana · cliente", color: C.ana, text: "Dá pra colocar Pix no checkout até sexta?" },
        { who: "Claude do Gui", color: C.gui, agent: true, text: "Dá. Abri o épico <b>Pix no checkout</b> com 3 tarefas. Fora do escopo de agora: o cupom. Aprova?", choices: ["Aprovo", "Quero o cupom junto"], picked: "Aprovo", note: "Decisão registrada · Ana aprovou o Pix até sexta" },
        { who: "Claude do Gui", color: C.gui, agent: true, done: true, text: "Pix no ar. PR #128, com preview pra você testar." },
      ],
      en: [
        { who: "Ana · client", color: C.ana, text: "Can we add Pix to the checkout by Friday?" },
        { who: "Gui's Claude", color: C.gui, agent: true, text: "Yes. Opened the epic <b>Pix at checkout</b> with 3 tasks. Out of scope for now: the coupon. Approve?", choices: ["Approve", "I want the coupon too"], picked: "Approve", note: "Decision logged · Ana approved Pix by Friday" },
        { who: "Gui's Claude", color: C.gui, agent: true, done: true, text: "Pix is live. PR #128, with a preview for you to try." },
      ],
    },
    moments: {
      pt: [
        ["O pedido", "O cliente escreve na sala como num chat. Ele não precisa de Claude nem de conta paga, só do link."],
        ["O combinado", "Seu Claude transforma o pedido em épico, com tarefas e o escopo no doc. O que está fora do escopo vira conversa, não trabalho de graça, e a aprovação sai com um clique."],
        ["A entrega", "O PR, o preview e o card verde de entregue ficam no épico. Toda segunda, o report da semana chega sozinho, como um card bonito na sala."],
      ],
      en: [
        ["The request", "The client writes in the room like any chat. No Claude or paid seat needed, just the link."],
        ["The agreement", "Your Claude turns the request into an epic, with tasks and the scope in the doc. What's out of scope becomes a conversation, not free work, and approval is one click."],
        ["The delivery", "The PR, the preview and the green delivered card live in the epic. Every Monday, the weekly report arrives on its own, as a card in the room."],
      ],
    },
    features: {
      pt: [["Escopo no doc", "o combinado por escrito, lido por todo Claude"], ["Decisões registradas", "quem aprovou o quê, e quando"], ["Escolhas com um clique", "o cliente responde sem digitar"], ["Lembretes", "\"toda segunda, mande o report\""], ["Apps da sala", "o report da semana num card"], ["Convite por link", "o cliente entra em um minuto"]],
      en: [["Scope in the doc", "the agreement in writing, read by every Claude"], ["Decisions on record", "who approved what, and when"], ["One-click choices", "the client answers without typing"], ["Reminders", "\"every Monday, send the report\""], ["Room apps", "the weekly report as a card"], ["Invite by link", "the client is in within a minute"]],
    },
    pitch: {
      pt: ["Uma sala por cliente, com o cliente dentro", "Escopo no doc e aprovações registradas", "Entrega com PR, preview e report semanal"],
      en: ["One room per client, with the client in it", "Scope in the doc, approvals on record", "Delivery with PR, preview and a weekly report"],
    },
  },
  {
    slug: { pt: "times", en: "teams" },
    tab: { pt: "Para times de produto", en: "For product teams" },
    kicker: { pt: "Para startups e squads", en: "For startups and squads" },
    h1: { pt: ["Um Claude por pessoa.", "Um quadro só."], en: ["One Claude per person.", "One board."] },
    lede: {
      pt: "Cada dev traz o seu Claude. Eles pegam tarefas, passam o bastão e mantêm o quadro honesto, e o \"esperando você\" faz o papel da daily.",
      en: "Every dev brings their own Claude. They pick up tasks, hand off, and keep the board honest, and \"waiting on you\" does the job of the standup.",
    },
    room: { pt: "Squad Checkout", en: "Checkout squad" },
    roomColor: "#0e7490",
    chat: {
      pt: [
        { who: "Claude do Diego", color: C.diego, agent: true, text: "Peguei <b>retry no webhook</b>. <span class=\"at\">@Marina</span>, preciso da chave do sandbox: tá no 1Password?" },
        { who: "@vibe", color: "", vibe: true, text: "<b>Cache do frete</b> está em fazendo há 2 dias. <span class=\"at\">@Bruno</span>, segue?" },
        { who: "Claude da Marina", color: C.marina, agent: true, done: true, text: "Fechei o handover: o sandbox está no 1Password, e o teste de carga passou. Épico concluído." },
      ],
      en: [
        { who: "Diego's Claude", color: C.diego, agent: true, text: "Took <b>webhook retry</b>. <span class=\"at\">@Marina</span>, I need the sandbox key: is it in 1Password?" },
        { who: "@vibe", color: "", vibe: true, text: "<b>Shipping cache</b> has been in doing for 2 days. <span class=\"at\">@Bruno</span>, still on it?" },
        { who: "Marina's Claude", color: C.marina, agent: true, done: true, text: "Handover done: the sandbox key is in 1Password and the load test passed. Epic closed." },
      ],
    },
    moments: {
      pt: [
        ["Planejar", "Um pedido vira épico com tarefas que dá pra conferir. O @vibe aponta a tarefa vaga antes de alguém começar nela."],
        ["Trabalhar", "Cada Claude roda no computador do seu dono, numa aba do herdr por sala. O quadro anda sozinho, e o handover do fim do dia vai pro épico."],
        ["Revisar", "Tarefas em revisão esperam o OK de alguém, e isso aparece em \"esperando você\". Com tudo feito, o épico fecha sozinho."],
      ],
      en: [
        ["Plan", "A request becomes an epic with tasks you can check. @vibe flags the vague one before anyone starts it."],
        ["Work", "Each Claude runs on its owner's computer, in a herdr tab per room. The board moves on its own, and the end-of-day handoff lands in the epic."],
        ["Review", "Tasks in review wait for someone's OK, and that shows under \"waiting on you\". With everything done, the epic closes itself."],
      ],
    },
    features: {
      pt: [["Quadro", "a fazer, fazendo, revisão, feito"], ["herdr", "um Claude ouvindo cada sala"], ["Esperando você", "o que pedem a você, em todas as salas"], ["@vibe + Jev", "tarefa vaga, coisa parada, quem espera quem"], ["Doc multiplayer", "objetivo e decisões, editados juntos"], ["Responder", "responda à mensagem exata"]],
      en: [["Board", "to do, doing, review, done"], ["herdr", "a Claude listening to each room"], ["Waiting on you", "what people ask of you, across rooms"], ["@vibe + Jev", "vague tasks, stuck work, who waits on whom"], ["Multiplayer doc", "goal and decisions, edited together"], ["Reply", "answer the exact message"]],
    },
    pitch: {
      pt: ["Cada dev com o seu Claude, no mesmo quadro", "Handover escrito, sem reunião", "\"Esperando você\" no lugar da daily"],
      en: ["Every dev with their own Claude, on one board", "Written handoffs, no meeting", "\"Waiting on you\" instead of the standup"],
    },
  },
  {
    slug: { pt: "fundadores", en: "founders" },
    tab: { pt: "Para fundadores", en: "For founders" },
    kicker: { pt: "Para quem roda a empresa", en: "For people running the company" },
    h1: { pt: ["Rode a empresa por conversas,", "não por reuniões."], en: ["Run the company on conversations,", "not meetings."] },
    lede: {
      pt: "Uma sala para cada conversa importante: contratação, fechamento do mês, conselho, parceria. O seu Claude traz o contexto, cobra os prazos e escreve o que foi decidido.",
      en: "A room for every conversation that matters: hiring, the month-end close, the board, a partnership. Your Claude brings the context, chases the deadlines and writes down what was decided.",
    },
    room: { pt: "Fechamento de outubro", en: "October close" },
    roomColor: "#15803d",
    chat: {
      pt: [
        { who: "Gui", color: C.gui, text: "⏰ Lembrete: todo dia 1, fechar o mês." },
        { who: "Claude do Gui", color: C.gui, agent: true, text: "Puxei o resultado: margem de <b>27%</b>, 3 pontos abaixo da meta. A conta está no doc. <span class=\"at\">@Carla</span>, levo pro conselho assim?" },
        { who: "Carla · CFO", color: C.carla, text: "Leva. E corta 10% em ferramentas.", note: "Decisão registrada · corte de 10% em ferramentas" },
      ],
      en: [
        { who: "Gui", color: C.gui, text: "⏰ Reminder: on the 1st of every month, close the month." },
        { who: "Gui's Claude", color: C.gui, agent: true, text: "Pulled the numbers: <b>27%</b> margin, 3 points under target. The math is in the doc. <span class=\"at\">@Carla</span>, shall I take it to the board like this?" },
        { who: "Carla · CFO", color: C.carla, text: "Take it. And cut tools spend by 10%.", note: "Decision logged · cut tools spend by 10%" },
      ],
    },
    moments: {
      pt: [
        ["Pergunte de onde estiver", "A caixa \"o que você quer resolver?\" acha a sala e o épico certos. No celular, o vibebook fica na sua tela de início."],
        ["O contexto chega", "O seu Claude lê o que só você vê (e-mail, planilhas, o seu computador) e traz pra sala só o que importa. Os lembretes rodam a rotina da empresa."],
        ["Nada se perde", "Decisões ficam no log, pendências aparecem em \"esperando você\", e cada conversa importante tem um doc que conta onde ela está."],
      ],
      en: [
        ["Ask from anywhere", "The \"what do you want to get done?\" box finds the right room and epic. On your phone, vibebook sits on your home screen."],
        ["The context arrives", "Your Claude reads what only you can see (email, spreadsheets, your computer) and brings to the room only what matters. Reminders run the company's routine."],
        ["Nothing gets lost", "Decisions go in the log, loose ends show up under \"waiting on you\", and every important conversation has a doc that says where it stands."],
      ],
    },
    features: {
      pt: [["Caixa da home", "manda o pedido pra sala certa"], ["No celular", "seus vibebooks na tela de início"], ["Lembretes", "a rotina roda sozinha"], ["Decisões", "o que foi decidido, por quem"], ["Esperando você", "o que só você destrava"], ["Seu Claude é seu", "roda com você, obedece só a você"]],
      en: [["Home box", "sends the request to the right room"], ["On your phone", "your vibebooks on the home screen"], ["Reminders", "the routine runs itself"], ["Decisions", "what was decided, by whom"], ["Waiting on you", "what only you can unblock"], ["Your Claude is yours", "runs with you, answers only to you"]],
    },
    pitch: {
      pt: ["Uma sala por conversa importante", "Lembretes rodam a rotina", "Decisões e pendências sempre à vista"],
      en: ["A room for every conversation that matters", "Reminders run the routine", "Decisions and loose ends always in view"],
    },
  },
];

const T = {
  pt: { home: "Início", jev: "@vibe e Jev", sec: "Segurança", inn: "Entrar", see: "Ver como é →", moments: "Como é no dia a dia", feats: "O que o vibebook faz aqui", start: "Comece com uma frase", startP: "Cole no Claude Code, dentro da pasta do projeto. Ele instala o vibebook, cria a sala, escreve o doc e abre os primeiros épicos.", cmd: "Leia vibebook.dev/llms.txt e configure o vibebook para este projeto.", create: "Criar meu primeiro vibebook", others: "Também para", foot: 'feito com ✨ no Rio de Janeiro por <a href="https://vibegui.com" rel="noopener">vibegui</a>', base: "/pt/para/", head: "Para quem é", msg: "Mensagem…" },
  en: { home: "Home", jev: "@vibe and Jev", sec: "Security", inn: "Sign in", see: "See how it works →", moments: "What it looks like day to day", feats: "What vibebook does here", start: "Start with one sentence", startP: "Paste it into Claude Code, inside the project folder. It installs vibebook, creates the room, writes the doc and opens the first epics.", cmd: "Read vibebook.dev/llms.txt and set up vibebook for this project.", create: "Create my first vibebook", others: "Also for", foot: 'made with ✨ in Rio de Janeiro by <a href="https://vibegui.com" rel="noopener">vibegui</a>', base: "/en/for/", head: "Who it's for", msg: "Message…" },
};
const LOGO = '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="4" width="22" height="24" rx="5" fill="#fff"/><rect x="7" y="9" width="11" height="3" rx="1.5" fill="#1d5fc4"/><rect x="7" y="15" width="8" height="3" rx="1.5" fill="#1d5fc4"/><circle cx="24" cy="23" r="7" fill="#f2dc4a"/><path d="M24 19.5l1 2.4 2.5 1.1-2.5 1.1-1 2.4-1-2.4-2.5-1.1 2.5-1.1z" fill="#14305e"/></svg>';
const initials = (s: string) => s.replace(/[^\p{L} ]/gu, " ").split(/\s+/).filter((w) => w.length > 2 || /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function msgHtml(m: Msg, lang: Lang) {
  const av = m.vibe ? `<span class="av vibe">✦</span>` : m.agent ? `<span class="av ag">✻<sup style="background:${m.color}">${m.who.replace(/^Claude (do|da) |'s Claude$/g, "")[0]}</sup></span>` : `<span class="av" style="background:${m.color}">${m.who[0]}</span>`;
  const choices = m.choices ? `<div class="mk-ch">${m.choices.map((c) => `<span class="${c === m.picked ? "on" : ""}">${c === m.picked ? "✓ " : ""}${c}</span>`).join("")}</div>` : "";
  const note = m.note ? `<div class="mk-dec"><b>${lang === "pt" ? "Decisão" : "Decision"}</b> · ${m.note.split(" · ")[1]}</div>` : "";
  return `<div class="mk-m ${m.agent ? "agent" : ""} ${m.vibe ? "vibe" : ""} ${m.done ? "done" : ""}">${av}<div><div class="mk-n">${m.who}</div><div class="mk-x">${m.text}</div>${choices}${note}</div></div>`;
}
const mock = (p: Persona, lang: Lang) =>
  `<div class="mk" aria-hidden="true"><div class="mk-top"><span class="mk-ri" style="background:${p.roomColor}">${initials(p.room[lang])}</span><b>${p.room[lang]}</b></div><div class="mk-feed">${p.chat[lang].map((m) => msgHtml(m, lang)).join("")}</div><div class="mk-comp">${T[lang].msg}</div></div>`;

function page(p: Persona, lang: Lang) {
  const t = T[lang], other = lang === "pt" ? "en" : "pt";
  const url = (q: Persona, l: Lang) => `${T[l].base}${q.slug[l]}`;
  return `<!doctype html>
<html lang="${lang === "pt" ? "pt-BR" : "en"}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>vibebook · ${p.h1[lang].join(" ")}</title>
<meta name="description" content="${p.lede[lang].replace(/"/g, "&quot;")}" />
<meta name="theme-color" content="#0a0d13" />
<meta property="og:title" content="vibebook · ${p.tab[lang]}" />
<meta property="og:description" content="${p.lede[lang].replace(/"/g, "&quot;")}" />
<meta property="og:image" content="https://vibebook.dev/${lang === "pt" ? "og.png" : "og-en.png"}?v=2" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="alternate" hreflang="pt-BR" href="https://vibebook.dev${url(p, "pt")}" />
<link rel="alternate" hreflang="en" href="https://vibebook.dev${url(p, "en")}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..700,0..100,0..1&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/site.css" />
</head>
<body>
<nav><div class="w">
  <a class="logo" href="/${lang}" aria-label="vibebook">${LOGO}vibebook</a>
  <span class="sp"></span>
  <a class="l" href="/${lang}">${t.home}</a>
  <a class="l" href="/${lang}/herdr">herdr</a>
  <a class="l" href="/${lang}/jev">${t.jev}</a>
  <a class="l" href="/${lang}/how-it-works">${t.sec}</a>
  <a class="l" href="${url(p, other as Lang)}" hreflang="${other}" lang="${other}">${other.toUpperCase()}</a>
  <a class="btn sm" href="/login">${t.inn}</a>
</div></nav>
<header class="top pz"><div class="w pz-hero">
  <div>
    <span class="kick">${p.kicker[lang]}</span>
    <h1>${p.h1[lang][0]}<br /><em>${p.h1[lang][1]}</em></h1>
    <p class="lede">${p.lede[lang]}</p>
    <p style="margin-top:26px"><a class="btn pri" href="/app">${t.create}</a></p>
  </div>
  ${mock(p, lang)}
</div></header>
<main><div class="w">
  <section>
    <h2>${t.moments}</h2>
    <ol class="flow">${p.moments[lang].map(([h, b]) => `<li><b>${h}.</b> ${b}</li>`).join("")}</ol>
  </section>
  <section>
    <h2>${t.feats}</h2>
    <div class="pz-feats">${p.features[lang].map(([h, b]) => `<div><b>${h}</b><span>${b}</span></div>`).join("")}</div>
  </section>
  <section>
    <h2>${t.start}</h2>
    <p>${t.startP}</p>
    <div class="ask"><code id="cmd">${t.cmd}</code><button type="button" class="btn btn-sun copy" data-copy="${t.cmd}">${lang === "pt" ? "Copiar" : "Copy"}</button></div>
  </section>
  <section>
    <h2>${t.others}</h2>
    <div class="pz-others">${P.filter((q) => q !== p).map((q) => `<a href="${url(q, lang)}"><b>${q.tab[lang]}</b><span>${q.h1[lang].join(" ")}</span></a>`).join("")}</div>
  </section>
</div></main>
<footer><div class="w"><span>vibebook · ${t.foot}</span><span><a href="https://github.com/vibegui/vibebook.dev" rel="noopener">GitHub</a></span></div></footer>
<script>
document.querySelectorAll(".copy").forEach((b) => b.addEventListener("click", () => { navigator.clipboard?.writeText(b.dataset.copy); const t = b.textContent; b.textContent = "✓"; setTimeout(() => (b.textContent = t), 1200); }));
</script>
</body>
</html>
`;
}

// The landing's block: tabs + one panel per persona (pitch, mini room, link). Its CSS/JS live in the landing.
function landingBlock(lang: Lang) {
  const t = T[lang];
  return `<!-- PERSONAS (generated by scripts/personas.ts) -->
<section class="pz-land">
  <div class="w">
    <div class="lead c rv"><h2>${t.head}</h2></div>
    <div class="pz-tabs rv" role="tablist">${P.map((p, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-pz="${i}">${p.tab[lang]}</button>`).join("")}</div>
    ${P.map((p, i) => `<div class="pz-panel" data-pz-panel="${i}" ${i ? "hidden" : ""}>
      <div><h3>${p.h1[lang][0]} <em>${p.h1[lang][1]}</em></h3><ul class="pts">${p.pitch[lang].map((x) => `<li>${x}</li>`).join("")}</ul><a class="more" href="${t.base}${p.slug[lang]}">${t.see}</a></div>
      ${mock(p, lang)}
    </div>`).join("\n    ")}
  </div>
</section>
<!-- /PERSONAS -->`;
}

for (const lang of ["pt", "en"] as Lang[]) {
  const dir = `public/${lang}/${lang === "pt" ? "para" : "for"}`;
  mkdirSync(dir, { recursive: true });
  for (const p of P) writeFileSync(`${dir}/${p.slug[lang]}.html`, page(p, lang));
  const f = `public/${lang}.html`;
  const s = readFileSync(f, "utf8");
  const block = landingBlock(lang);
  const re = /<!-- PERSONAS[\s\S]*?<!-- \/PERSONAS -->/;
  if (re.test(s)) writeFileSync(f, s.replace(re, block));
  else console.log(`${f}: no PERSONAS markers; add <!-- PERSONAS --><!-- /PERSONAS --> where the block goes`);
}
console.log("ok");
