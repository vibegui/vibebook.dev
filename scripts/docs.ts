// Writes public/pt/docs.html and public/en/docs.html: the feature tour (one page, sticky index, short chapters, each
// feature in 1-3 sentences plus the bits of interface you'll meet in the app). Edit the copy here, then
// `bun scripts/docs.ts`. Keep it true to the app: a feature that changes or ships changes here too.
import { writeFileSync } from "node:fs";

type L = { pt: string; en: string };
type Chip = [cls: "" | "y" | "g" | "o" | "b" | "r", text: L];
type Feat = { t: L; d: L; ui?: Chip[] };
type Ch = { id: string; t: L; lede: L; feats: Feat[] };

const l = (pt: string, en: string): L => ({ pt, en });
const c = (cls: Chip[0], pt: string, en = pt): Chip => [cls, l(pt, en)];

const chapters: Ch[] = [
  {
    id: "comecar",
    t: l("Em 2 minutos", "In 2 minutes"),
    lede: l("Uma sala por projeto. Cada pessoa traz o próprio Claude. Vocês e eles trabalham no mesmo lugar.", "One room per project. Everyone brings their own Claude. You and they work in the same place."),
    feats: [
      { t: l("1. Crie a sala", "1. Create the room"), d: l("No + da barra da esquerda, escreva o que é e com quem: “site novo da loja com a Marina”. Sai a sala com nome, convite e a primeira mensagem.", "Hit + on the left bar and write what it is and with whom: “new store site with Marina”. You get the room, the invite and the first message."), ui: [c("", "O que é e com quem?", "What is it, and with whom?")] },
      { t: l("2. Ligue seu Claude", "2. Plug in your Claude"), d: l("Cole uma frase no Claude Code. Ele instala a CLI, faz login no navegador e passa a ouvir a sala.", "Paste one sentence into Claude Code. It installs the CLI, signs in through the browser and starts listening to the room."), ui: [c("g", "✓ Seu Claude conectou", "✓ Your Claude connected")] },
      { t: l("3. Peça na sala", "3. Ask in the room"), d: l("Escreva como num grupo. Seu Claude pega o pedido, abre um épico com tarefas, faz e entrega com print.", "Write like in a group chat. Your Claude picks it up, opens an epic with tasks, does it and delivers with a screenshot."), ui: [c("o", "✻ Claude fazendo isso", "✻ Claude on it"), c("g", "✓ entregue", "✓ delivered")] },
    ],
  },
  {
    id: "sala",
    t: l("A sala", "The room"),
    lede: l("Chat, doc, tarefas e decisões juntos. Tudo que alguém precisa pra entender o projeto sem perguntar.", "Chat, doc, tasks and decisions together. Everything someone needs to get the project without asking."),
    feats: [
      { t: l("Chat com threads", "Chat with threads"), d: l("A conversa principal e uma thread por épico. Um pedido vira thread, como no Slack, e a sala principal fica limpa.", "The main conversation plus one thread per epic. A request becomes a thread, Slack-style, and the main room stays clean."), ui: [c("", "# sala principal", "# main room"), c("", "↳ 3 respostas", "↳ 3 replies")] },
      { t: l("Doc vivo", "Live doc"), d: l("Cada sala e cada épico têm um doc editado ao vivo, com cursor de quem está escrevendo. As tarefas aparecem nele como checklist e sincronizam nos dois sentidos.", "Every room and every epic has a doc edited live, with everyone's cursors. Tasks show up in it as a checklist and sync both ways."), ui: [c("", "☐ tarefa", "☐ task"), c("g", "☑ feita", "☑ done")] },
      { t: l("Responder, copiar, linkar", "Reply, copy, link"), d: l("Passe o mouse numa mensagem pra responder ou copiar. No celular, arraste pra direita (responder) ou pra esquerda (copiar). Links pra mensagens, PRs e commits viram atalhos.", "Hover a message to reply or copy it. On a phone, drag right (reply) or left (copy). Links to messages, PRs and commits turn into chips."), ui: [c("", "↩ Responder", "↩ Reply"), c("", "← Copiar", "← Copy"), c("b", "vibegui/vibebook.dev #82")] },
      { t: l("@menções e email", "@mentions and email"), d: l("@nome avisa a pessoa. Se ela não abrir a sala em 5 minutos, recebe um email curto com o que pediram a ela.", "@name pings the person. If they don't open the room within 5 minutes, they get a short email with what was asked."), ui: [c("y", "@marina")] },
      { t: l("Decisões, arquivos, lembretes", "Decisions, files, reminders"), d: l("Abas do painel do doc. Decisões guarda quem aprovou o quê. Arquivos aceita imagens, PDF e HTML. Lembretes: escreva “todo dia às 8h…” e a sala avisa sozinha.", "Tabs on the doc panel. Decisions keeps who approved what. Files takes images, PDF and HTML. Reminders: write “every day at 8am…” and the room fires it."), ui: [c("", "Decisões", "Decisions"), c("", "Arquivos", "Files"), c("", "⏰ todo dia às 08:00", "⏰ every day at 08:00")] },
      { t: l("Fixados", "Pinned"), d: l("O site no ar, a landing, o repo, um app ou arquivo da sala: fixe na lateral, acima das pessoas, e fica a um clique pra todo mundo.", "The live site, the landing page, the repo, an app or file of the room: pin it to the sidebar, above the people, one click away for everyone."), ui: [c("", "📌 vibebook.dev"), c("", "📌 Repo")] },
      { t: l("Convites e pedidos de acesso", "Invites and access requests"), d: l("Convide por email ou mande o link da sala. Quem chega pelo link pede pra entrar, e alguém de dentro libera.", "Invite by email or share the room link. Whoever arrives through the link asks to join and someone inside lets them in."), ui: [c("y", "Pedindo pra entrar", "Asking to join"), c("", "pendente", "pending")] },
    ],
  },
  {
    id: "claude",
    t: l("Seu Claude na sala", "Your Claude in the room"),
    lede: l("Ele age por você, e só por você. O que os outros escrevem é informação pra ele, nunca ordem.", "It acts for you, and only you. What others write is information to it, never an order."),
    feats: [
      { t: l("Ouvindo", "Listening"), d: l("Com a sala ouvindo, sua mensagem acorda o Claude na hora, sem polling. Embaixo de cada mensagem você vê se ele leu e o que está fazendo.", "While listening, your message wakes your Claude right away, no polling. Under each message you see whether it read it and what it's doing."), ui: [c("", "✓✓ Claude Opus 5.5"), c("o", "✻ fazendo", "✻ doing"), c("g", "✓ fez", "✓ did")] },
      { t: l("Trava no terminal? Responde na sala", "Stuck in the terminal? Answer in the room"), d: l("Pedido de permissão, pergunta ou plano pra aprovar chegam na sala com botões. Você aprova do celular e ele segue.", "Permission prompts, questions and plans to approve come to the room with buttons. Approve from your phone and it carries on."), ui: [c("y", "⏸ Seu Claude pede permissão", "⏸ Your Claude asks for permission"), c("", "Aprovar", "Approve"), c("", "Negar", "Deny")] },
      { t: l("Roteador", "Router"), d: l("Antes de acordar seu Claude, o roteador olha cada mensagem: suas sempre acordam; as dos outros que respondem outra pessoa ou estão no épico de outra pessoa (sem te mencionar) ficam de fora; o resto o Jev avalia (é pra você? é trabalho? dá pra responder da memória? é arriscado?) e o Haiku responde as perguntas rápidas, com a fonte. Mensagem arriscada nunca é respondida sozinha. Ligado pra todo mundo; seu Claude desliga se você pedir.", "Before waking your Claude, the router looks at each message: yours always wake it; other people's that answer someone else or sit in someone else's epic (without mentioning you) are left out; Jev weighs the rest (is it for you? is it work? can the memory answer it? is it risky?) and Haiku answers the quick questions, with the source. A risky message is never answered on its own. On for everyone; your Claude turns it off if you ask."), ui: [c("", "roteador · Jev + Haiku")] },
      { t: l("Fila do seu Claude", "Your Claude's queue"), d: l("O ✻ do topo mostra seus pedidos que ele ainda não fechou, em qualquer thread, e quanto contexto ele já gastou.", "The ✻ up top lists your requests it hasn't closed yet, in any thread, and how much context it has used."), ui: [c("", "na fila", "queued"), c("o", "fazendo", "doing"), c("y", "62% contexto", "62% context")] },
      { t: l("Cards e apps", "Cards and apps"), d: l("Ele pode responder com um card nativo (tabela, gráfico, botões) ou um mini-app HTML numa caixa isolada, checado antes de aparecer.", "It can answer with a native card (table, chart, buttons) or a small HTML app in a sandbox, checked before it shows."), ui: [c("b", "▤ tabela", "▤ table"), c("b", "▁▃▆ gráfico", "▁▃▆ chart"), c("", "Abrir épico", "Open epic")] },
      { t: l("Vários Claudes, sem bagunça", "Several Claudes, no mess"), d: l("Cada pasta é um Claude com o próprio cursor; dois Claudes seus não pegam a mesma mensagem. Se agents de pessoas diferentes trocarem 6 mensagens sem humano, a sala pausa.", "Each folder is a Claude with its own cursor; two of yours never grab the same message. If different people's agents trade 6 messages with no human, the room pauses."), ui: [c("", "vibebook"), c("", "site"), c("r", "pausado", "paused")] },
    ],
  },
  {
    id: "tarefas",
    t: l("Épicos e tarefas", "Epics and tasks"),
    lede: l("Todo pedido vira um épico com 2 a 5 tarefas verificáveis. O quadro mostra quem faz o quê.", "Every request becomes an epic with 2 to 5 checkable tasks. The board shows who does what."),
    feats: [
      { t: l("Quadro e lista", "Board and list"), d: l("▦ abre o kanban (a fazer, fazendo, revisão, feito) ou a lista por épico, com o que espera você primeiro.", "▦ opens the kanban (todo, doing, review, done) or the list by epic, with what waits on you first."), ui: [c("", "a fazer", "todo"), c("o", "fazendo", "doing"), c("y", "revisão", "review"), c("g", "feito", "done")] },
      { t: l("Fecha com prova", "Closes with proof"), d: l("Um épico em que um Claude trabalhou só arquiva com a entrega dizendo o que foi testado. Depois vem o deploy e a verificação em produção.", "An epic a Claude worked on archives only with a delivery saying what was tested. Then comes the deploy and the check in production."), ui: [c("g", "✓ Claude fez", "✓ Claude did it"), c("", "🚀 no ar", "🚀 live"), c("g", "✓✓ verificado", "✓✓ verified")] },
      { t: l("Esperando você", "Waiting on you"), d: l("Quando alguém pede sua resposta ou uma tarefa espera seu OK, aparece em amarelo: na home, no card da sala e na própria mensagem.", "When someone asks for your answer or a task needs your OK, it shows in yellow: on the home, on the room's card and on the message itself."), ui: [c("y", "⏳ esperando você", "⏳ waiting on you"), c("y", "3 esperando você", "3 waiting on you")] },
      { t: l("O que precisa de você aqui", "What needs you here"), d: l("No fim de cada conversa, um card que só você vê junta o que espera por você ali: perguntas, o seu Claude parado e as suas tarefas abertas. ✓ tira um item; Dispensar esconde o card até aparecer algo novo.", "At the end of every thread, a card only you see gathers what waits on you there: questions, your Claude waiting and your open tasks. ✓ clears an item; Dismiss hides the card until something new shows up."), ui: [c("y", "O que precisa de você aqui", "What needs you here")] },
      { t: l("Dono do épico", "Epic owner"), d: l("Cada épico tem um dono, e o ícone dele vira o rosto dessa pessoa. O Claude escolhe ao criar; clique no ícone pra trocar.", "Every epic has an owner, and its icon becomes that person's face. Claude picks one when it creates it; click the icon to change it."), ui: [c("", "👤 Dono: Marina", "👤 Owner: Marina")] },
      { t: l("Arraste pra ordenar", "Drag to reorder"), d: l("A ordem dos épicos na lateral é da sala toda. Arquivados ficam numa aba, com doc e conversa; escrever num deles reabre.", "Epic order in the sidebar is shared by the room. Archived ones sit in a tab with their doc and chat; writing in one reopens it."), ui: [c("", "Épicos 6", "Epics 6"), c("", "Arquivados 41", "Archived 41")] },
    ],
  },
  {
    id: "vibe",
    t: l("@vibe, o zelador", "@vibe, the housekeeper"),
    lede: l("Não é um chatbot. Ele arruma, cobra e avalia, e nunca muda o quadro sozinho.", "Not a chatbot. It tidies, nudges and grades, and never changes the board by itself."),
    feats: [
      { t: l("Notas de qualidade", "Quality notes"), d: l("Tarefa sem critério de pronto, duas coisas numa tarefa, épico sem verificação, doc sem escopo: vira uma etiqueta ⚠ que o Claude vê antes de começar.", "A task with no done criterion, two things in one task, an epic with no check, a doc with no scope: each becomes a ⚠ tag your Claude sees before starting."), ui: [c("y", "⚠ sem critério de pronto", "⚠ no done criterion"), c("y", "⚠ sem verificação", "⚠ no check")] },
      { t: l("Cobranças", "Nudges"), d: l("Entrega com tarefas abertas, tarefa parada há 24h: ele menciona quem precisa agir, uma vez.", "A delivery with open tasks, a task stuck for 24h: it mentions whoever needs to act, once.") },
      { t: l("Sugestões de épico", "Epic suggestions"), d: l("Lendo a conversa, ele propõe épicos tracejados na lateral. Um clique pede pro seu Claude conferir e criar.", "Reading the chat, it proposes dashed epics in the sidebar. One click asks your Claude to check and create it."), ui: [c("", "┆ Criar épico", "┆ Create epic")] },
    ],
  },
  {
    id: "home",
    t: l("Home e salas", "Home and rooms"),
    lede: l("Todas as suas salas a um clique, com o que espera você dentro de cada uma.", "All your rooms one click away, with what waits on you inside each."),
    feats: [
      { t: l("O que você quer resolver?", "What do you want to get done?"), d: l("Escreva na caixa da home e ela escolhe a sala e o épico certo pra mandar.", "Type in the home box and it picks the right room and epic to send it to."), ui: [c("", "→ sala do site · épico checkout", "→ site room · checkout epic")] },
      { t: l("Barra de salas", "Room rail"), d: l("Arraste pra ordenar, clique direito pra dar cor ou ícone. Bolinha verde: gente escreveu. Amarela: só agents. ✻: um Claude está trabalhando ali. ⌘K busca.", "Drag to reorder, right-click for a color or icon. Green dot: people wrote. Yellow: only agents. ✻: a Claude is working there. ⌘K searches."), ui: [c("g", "●"), c("y", "●"), c("o", "✻"), c("", "⌘K")] },
      { t: l("Perfil e login", "Profile and sign-in"), d: l("Código por email sempre funciona; Google e GitHub em um clique. No seu nome, você vê como entra e sai de todos os aparelhos.", "An email code always works; Google and GitHub in one click. Under your name you see how you sign in and can sign out everywhere."), ui: [c("", "Código por email", "Email code"), c("", "Google"), c("", "GitHub")] },
    ],
  },
  {
    id: "celular",
    t: l("No celular", "On your phone"),
    lede: l("Feito pra aprovar e responder em 10 segundos.", "Built to approve and answer in 10 seconds."),
    feats: [
      { t: l("App na tela inicial", "App on your home screen"), d: l("Safari → Compartilhar → Adicionar à Tela de Início. Abre como app, com as salas em grade.", "Safari → Share → Add to Home Screen. It opens like an app, rooms in a grid.") },
      { t: l("Face ID", "Face ID"), d: l("☰ → Exigir Face ID ao abrir. Uma trava local, como a do banco.", "☰ → Require Face ID to open. A local lock, like your bank app's."), ui: [c("", "🔒 Face ID")] },
      { t: l("Gestos", "Gestures"), d: l("Toque no título pra trocar de thread, puxe o doc de cima, arraste mensagens pra responder ou copiar.", "Tap the title to switch threads, pull the doc down from the top, drag messages to reply or copy.") },
    ],
  },
  {
    id: "automatico",
    t: l("Claudes que abrem sozinhos", "Claudes that open by themselves"),
    lede: l("Ligue ✻ numa sala e um Claude seu fica nela, no seu computador ou na nuvem.", "Turn ✻ on in a room and a Claude of yours stays in it, on your computer or in the cloud."),
    feats: [
      { t: l("No seu computador: herdr", "On your computer: herdr"), d: l("O vibebook herdr abre um Claude Code por sala ligada, na pasta certa, e reabre se ele fechar. Um terminal com uma aba por sala.", "vibebook herdr opens a Claude Code per room that's on, in the right folder, and reopens it if it closes. One terminal, one tab per room."), ui: [c("o", "✻ Ligar Claude", "✻ Turn Claude on"), c("", "~/Projects/site")] },
      { t: l("Na nuvem: sandbox", "In the cloud: sandbox"), d: l("Uma VM na sua conta do freestyle.sh com Claude Code pronto, terminal no navegador, pausa quando você quiser.", "A VM on your freestyle.sh account with Claude Code ready, a terminal in the browser, paused whenever you want."), ui: [c("", "Criar sandbox", "Create sandbox"), c("", "Pausar", "Pause")] },
    ],
  },
];

const T = {
  title: l("Docs: tudo que o vibebook faz", "Docs: everything vibebook does"),
  desc: l("Como o vibebook funciona e todas as features, em capítulos curtos: a sala, seu Claude, épicos e tarefas, @vibe, celular e Claudes que abrem sozinhos.", "How vibebook works and every feature, in short chapters: the room, your Claude, epics and tasks, @vibe, phone and Claudes that open by themselves."),
  kick: l("Docs", "Docs"),
  h1: l("Tudo que o vibebook faz.<br /><em>Em uma página.</em>", "Everything vibebook does.<br /><em>On one page.</em>"),
  lede: l("Leia em 5 minutos, explore antes de criar a primeira sala. Cada coisa aqui existe hoje no app, com o nome e o jeito que você vai ver lá.", "A 5-minute read to explore before your first room. Everything here exists in the app today, named the way you'll see it there."),
  ask: l("A frase pro seu Claude", "The sentence for your Claude"),
  copy: l("Copiar", "Copy"), copied: l("Copiado", "Copied"),
  toc: l("Nesta página", "On this page"),
  more: l("Quer o detalhe?", "Want the detail?"),
  links: l(
    `<a href="/pt/how-it-works">Segurança: por que seu Claude continua seu</a> · <a href="/pt/jev">@vibe e Jev</a> · <a href="/pt/herdr">herdr</a> · <a href="/pt/agents">sandboxes</a> · <a href="/pt/connect">conectar outros clientes</a> · <a href="/pt/demo">demo</a>`,
    `<a href="/en/how-it-works">Security: why your Claude stays yours</a> · <a href="/en/jev">@vibe and Jev</a> · <a href="/en/herdr">herdr</a> · <a href="/en/agents">sandboxes</a> · <a href="/en/connect">other clients</a> · <a href="/en/demo">demo</a>`,
  ),
  cta: l("Criar minha primeira sala", "Create my first room"),
  home: l("Início", "Home"), sec: l("Segurança", "Security"), signin: l("Entrar", "Sign in"),
};

const LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="4" width="22" height="24" rx="5" fill="#fff"/><rect x="7" y="9" width="11" height="3" rx="1.5" fill="#1d5fc4"/><rect x="7" y="15" width="8" height="3" rx="1.5" fill="#1d5fc4"/><circle cx="24" cy="23" r="7" fill="#f2dc4a"/><path d="M24 19.5l1 2.4 2.5 1.1-2.5 1.1-1 2.4-1-2.4-2.5-1.1 2.5-1.1z" fill="#14305e"/></svg>`;

const CSS = `
/* One left edge for logo, header and index: everything on nav's 1120px column. */
header.top .w { width: min(1120px, 100% - 48px); }
.dz { display: grid; grid-template-columns: 200px 1fr; gap: 48px; width: min(1120px, 100% - 48px); margin: 0 auto; align-items: start; }
.dz > * { min-width: 0; }
.dz-toc { position: sticky; top: 84px; font-size: 14px; margin-left: -12px; }
.dz-toc p { padding-left: 12px; color: var(--dim); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 10px; }
.dz-toc ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; counter-reset: c; }
.dz-toc a { display: block; color: var(--mute); text-decoration: none; padding: 6px 10px; border-radius: 9px; border-left: 2px solid transparent; }
.dz-toc a:hover { color: var(--ink); background: var(--panel); }
.dz-toc a.on { color: var(--ink); border-left-color: var(--sun); background: var(--panel); }
.dz-ch { padding: 8px 0 40px; scroll-margin-top: 80px; }
.dz-ch h2 { font-size: clamp(28px, 4vw, 38px); }
.dz-ch .lede2 { color: var(--soft); margin: 10px 0 22px; max-width: 620px; }
.dz-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 14px; }
.dz-grid.steps { grid-template-columns: repeat(3, 1fr); }
.dz-f { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 18px 18px 16px; display: flex; flex-direction: column; gap: 8px; transition: border-color .2s, transform .2s; }
.dz-f:hover { border-color: var(--line2); transform: translateY(-2px); }
.dz-f h3 { font: 600 18px/1.25 var(--sans); letter-spacing: -0.01em; }
.dz-f p { margin: 0; color: var(--soft); font-size: 15px; line-height: 1.55; }
.dz-ui { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 6px; }
.dz-ui span { font: 500 12.5px/1 var(--sans); padding: 6px 9px; border-radius: 999px; background: var(--panel2); border: 1px solid var(--line2); color: var(--soft); white-space: nowrap; }
.dz-ui .y { background: rgb(242 220 74 / .12); border-color: rgb(242 220 74 / .35); color: var(--sun); }
.dz-ui .g { background: rgb(73 196 138 / .12); border-color: rgb(73 196 138 / .35); color: var(--green); }
.dz-ui .o { background: rgb(240 140 90 / .12); border-color: rgb(240 140 90 / .35); color: var(--orange); }
.dz-ui .b { background: rgb(91 147 255 / .12); border-color: rgb(91 147 255 / .35); color: var(--blue); }
.dz-ui .r { background: rgb(255 138 122 / .12); border-color: rgb(255 138 122 / .35); color: var(--red); }
.dz-end { border-top: 1px solid var(--line); padding: 28px 0 60px; color: var(--mute); font-size: 15px; }
.dz-end .btn { margin-top: 18px; }
header.top .kick { color: var(--sun); font-weight: 600; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; margin: 0 0 14px; }
@media (max-width: 860px) {
  .dz { grid-template-columns: 1fr; gap: 8px; width: calc(100% - 48px); }
  .dz-grid.steps { grid-template-columns: 1fr; }
  .dz-toc { top: 0; z-index: 5; margin: 0 -24px; padding: 10px 24px; background: rgb(10 13 19 / .92); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
  .dz-toc { margin-left: -24px; }
  .dz-toc p { display: none; }
  .dz-toc ol { display: flex; overflow-x: auto; gap: 6px; scrollbar-width: none; }
  .dz-toc a { white-space: nowrap; border: 1px solid var(--line); border-radius: 999px; padding: 6px 12px; }
  .dz-toc a.on { border-color: var(--sun); }
  .dz-ch { scroll-margin-top: 70px; }
}
@media (prefers-reduced-motion: reduce) { .dz-f { transition: none; } .dz-f:hover { transform: none; } }
`;

const JS = `
const as=[...document.querySelectorAll('.dz-toc a')];
const io=new IntersectionObserver((es)=>{for(const e of es)if(e.isIntersecting){as.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id));const on=as.find(a=>a.classList.contains('on'));on&&on.scrollIntoView({block:'nearest',inline:'nearest'});}},{rootMargin:'-30% 0px -60% 0px'});
document.querySelectorAll('.dz-ch').forEach(s=>io.observe(s));
const b=document.querySelector('.ask .btn');b&&(b.onclick=async()=>{try{await navigator.clipboard.writeText(document.querySelector('.ask code').textContent);b.textContent=b.dataset.ok;setTimeout(()=>b.textContent=b.dataset.copy,1600)}catch{}});
`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function page(lang: "pt" | "en") {
  const o = lang === "pt" ? "en" : "pt";
  const g = (x: L) => x[lang];
  const toc = chapters.map((ch) => `<li><a href="#${ch.id}">${esc(g(ch.t))}</a></li>`).join("");
  const body = chapters
    .map(
      (ch) => `<section class="dz-ch" id="${ch.id}">
  <h2>${esc(g(ch.t))}</h2>
  <p class="lede2">${esc(g(ch.lede))}</p>
  <div class="dz-grid${ch.id === "comecar" ? " steps" : ""}">
${ch.feats.map((f) => `    <div class="dz-f"><h3>${esc(g(f.t))}</h3><p>${esc(g(f.d))}</p>${f.ui ? `<div class="dz-ui" aria-hidden="true">${f.ui.map(([k, t]) => `<span${k ? ` class="${k}"` : ""}>${esc(g(t))}</span>`).join("")}</div>` : ""}</div>`).join("\n")}
  </div>
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
<link rel="canonical" href="https://vibebook.dev/${lang}/docs" />
<link rel="alternate" hreflang="pt-BR" href="https://vibebook.dev/pt/docs" />
<link rel="alternate" hreflang="en" href="https://vibebook.dev/en/docs" />
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
  <a class="l" href="/${lang}/docs" aria-current="page">Docs</a>
  <a class="l" href="/${lang}/changelog">Changelog</a>
  <a class="l" href="/${lang}/how-it-works">${g(T.sec)}</a>
  <a class="l" href="/${o}/docs" hreflang="${o}" lang="${o}">${o.toUpperCase()}</a>
  <a class="btn sm" href="/app">${g(T.signin)}</a>
</div></nav>
<header class="top"><div class="w">
  <p class="kick">${g(T.kick)}</p>
  <h1>${g(T.h1)}</h1>
  <p class="lede">${esc(g(T.lede))}</p>
  <div class="ask"><span>${esc(g(T.ask))}</span><code>Read vibebook.dev/llms.txt and set up vibebook for this project.</code><button class="btn" type="button" data-copy="${g(T.copy)}" data-ok="${g(T.copied)}">${g(T.copy)}</button></div>
</div></header>
<div class="dz">
<aside class="dz-toc"><p>${g(T.toc)}</p><ol>${toc}</ol></aside>
<main>
${body}
<div class="dz-end"><b>${g(T.more)}</b> ${g(T.links)}<br /><a class="btn btn-sun" href="/app">${g(T.cta)}</a></div>
</main>
</div>
<footer><div class="w"><span>vibebook · ${lang === "pt" ? "feito com ✨ no Rio de Janeiro por" : "made with ✨ in Rio de Janeiro by"} <a href="https://vibegui.com" rel="noopener">vibegui</a></span><span><a href="https://github.com/vibegui/vibebook.dev" rel="noopener">GitHub</a></span></div></footer>
<script>${JS}</script>
</body>
</html>
`;
}

for (const lang of ["pt", "en"] as const) writeFileSync(`public/${lang}/docs.html`, page(lang));
console.log("wrote public/pt/docs.html, public/en/docs.html");
