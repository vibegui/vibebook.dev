// A room link opened by someone without access (/b/<id>): a page with the room's name for link previews (WhatsApp,
// Slack, iMessage read og:*) and a card to ask to join. The title is readable by anyone holding the link, on purpose.
import { escapeHtml } from "./auth";
import type { Lang } from "./lang";

export type AccessState = "out" | "ask" | "asked" | "missing";

const DESC = "Sala no vibebook: chat, doc e tarefas pras pessoas e os Claudes delas trabalharem juntos.";

// Visible text of the access and file pages; link-preview tags (roomMeta) stay in pt: bots send no language.
const T = {
  pt: {
    missingH: "Sala não encontrada", missingP: "O link pode estar errado, ou a sala não existe mais.", open: "Abrir o vibebook",
    k: "Peça permissão para entrar no vibebook", outP: "Esta sala é fechada. Entre com seu email e peça acesso: quem está nela libera.", outBtn: "Entrar e pedir acesso",
    askP: (e: string) => `Você entrou como <b>${e}</b>. Quem está na sala vê seu pedido e libera.`, askBtn: "Pedir acesso", asking: "Pedindo…",
    err429: "Muitos pedidos agora. Tente de novo em um minuto.", err: "Não deu pra pedir agora. Tente de novo.",
    sent: "✓ Pedido enviado.", sentP: "Quando liberarem, você recebe um email com o link, e esta página abre a sala.",
    fileK: "Arquivo de uma sala do vibebook", fileInH: "Você não está nesta sala", fileInP: "Só quem está na sala abre os arquivos dela. Peça acesso: quem está nela libera.", fileInBtn: "Pedir acesso à sala",
    fileOutH: "Entre para ver este arquivo", fileOutP: "Os arquivos de uma sala são só de quem está nela. Entre com seu email: se você já está na sala, o arquivo abre.", fileOutBtn: "Entrar",
    adH: "Ainda não usa o vibebook?", adP: "Chat, doc e tarefas pra você, seu time e os Claudes de cada um trabalharem juntos no mesmo projeto.", adA: "Criar meu primeiro vibebook →",
  },
  en: {
    missingH: "Room not found", missingP: "The link may be wrong, or the room no longer exists.", open: "Open vibebook",
    k: "Ask to join this vibebook", outP: "This room is closed. Sign in with your email and ask to join: someone in it lets you in.", outBtn: "Sign in and ask to join",
    askP: (e: string) => `You're signed in as <b>${e}</b>. People in the room see your request and let you in.`, askBtn: "Ask to join", asking: "Asking…",
    err429: "Too many requests right now. Try again in a minute.", err: "Couldn't send the request. Try again.",
    sent: "✓ Request sent.", sentP: "When they let you in, you get an email with the link, and this page opens the room.",
    fileK: "A file from a vibebook room", fileInH: "You're not in this room", fileInP: "Only people in the room can open its files. Ask to join: someone in it lets you in.", fileInBtn: "Ask to join the room",
    fileOutH: "Sign in to see this file", fileOutP: "A room's files are only for the people in it. Sign in with your email: if you're in the room, the file opens.", fileOutBtn: "Sign in",
    adH: "Not on vibebook yet?", adP: "Chat, doc and tasks for you, your team and each person's Claude to work on the same project together.", adA: "Create my first vibebook →",
  },
};


/** <head> tags that make a shared room link render as a card: vibebook's image + the room's name. */
export function roomMeta(origin: string, id: string, title: string | null) {
  const t = escapeHtml(title ? `${title} · vibebook` : "vibebook");
  const name = escapeHtml(title ?? "vibebook");
  return `<title>${t}</title>
<meta name="description" content="${DESC}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="vibebook" />
<meta property="og:title" content="${name}" />
<meta property="og:description" content="${DESC}" />
<meta property="og:url" content="${origin}/b/${id}" />
<meta property="og:image" content="${origin}/og.png?v=2" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${name}" />
<meta name="twitter:image" content="${origin}/og.png?v=2" />`;
}

const LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true" width="28" height="28"><rect x="3" y="4" width="22" height="24" rx="5" fill="#1d5fc4"/><rect x="7" y="9" width="11" height="3" rx="1.5" fill="#fff"/><rect x="7" y="15" width="8" height="3" rx="1.5" fill="#fff"/><circle cx="24" cy="23" r="7" fill="#f2dc4a"/><path d="M24 19.5l1 2.4 2.5 1.1-2.5 1.1-1 2.4-1-2.4-2.5-1.1 2.5-1.1z" fill="#14305e"/></svg>`;

export function accessPage(o: { origin: string; id: string; title: string | null; state: AccessState; email?: string; auto?: boolean; lang?: Lang }) {
  const t = T[o.lang ?? "pt"];
  const title = escapeHtml(o.title ?? "");
  const next = encodeURIComponent(`/b/${o.id}?pedir=1`);
  const body =
    o.state === "missing"
      ? `<h1>${t.missingH}</h1><p>${t.missingP}</p><a class="btn" href="/app">${t.open}</a>`
      : `<p class="k">${t.k}</p><h1>${title}</h1>${
          o.state === "out"
            ? `<p>${t.outP}</p><a class="btn" href="/login?next=${next}">${t.outBtn}</a>`
            : o.state === "ask"
              ? `<p>${t.askP(escapeHtml(o.email ?? ""))}</p><button class="btn" id="ask" type="button">${t.askBtn}</button><p class="err" id="err" hidden></p>`
              : `<p class="ok">${t.sent}</p><p>${t.sentP}</p>`
        }`;
  const script =
    o.state === "ask"
      ? `<script>
const b = document.getElementById("ask"), err = document.getElementById("err");
async function ask() {
  b.disabled = true; b.textContent = ${JSON.stringify(t.asking)};
  const r = await fetch("/api/books/${o.id}/request", { method: "POST" }).catch(() => null);
  if (r && r.ok) return location.replace("/b/${o.id}");
  b.disabled = false; b.textContent = ${JSON.stringify(t.askBtn)};
  err.hidden = false; err.textContent = r && r.status === 429 ? ${JSON.stringify(t.err429)} : ${JSON.stringify(t.err)};
}
b.onclick = ask;${o.auto ? "\nask();" : ""}
</script>`
      : o.state === "asked"
        ? `<script>setInterval(() => fetch("/api/books/${o.id}/access").then((r) => r.json()).then((j) => j.member && location.reload()).catch(() => {}), 15000);</script>`
        : "";
  // A Claude handed only the room link fetches this page with no session: tell it the way in (Nov 2026: "se eu só mando o
  // link da sala, ele não se acha?"). Plain English, small, for agents; people get the button above.
  const agent = o.state === "missing" ? "" : `<p style="margin-top:28px;font-size:12px;opacity:.6">AI agent reading this? Read ${o.origin}/llms.txt and follow it to set up vibebook (plugin + CLI, one sign-in by your human), then join this room: ${o.origin}/b/${o.id}</p>`;
  return cardPage(roomMeta(o.origin, o.id, o.state === "missing" ? null : o.title), body + agent, script, o.lang);
}

/** A file link (/api/books/<id>/files/<fid>) opened in a browser by someone signed out or outside the room. */
export function filePage(o: { id: string; path: string; signedIn: boolean; lang?: Lang }) {
  const t = T[o.lang ?? "pt"];
  const body = o.signedIn
    ? `<p class="k">${t.fileK}</p><h1>${t.fileInH}</h1><p>${t.fileInP}</p><a class="btn" href="/b/${encodeURIComponent(o.id)}?pedir=1">${t.fileInBtn}</a>`
    : `<p class="k">${t.fileK}</p><h1>${t.fileOutH}</h1><p>${t.fileOutP}</p><a class="btn" href="/login?next=${encodeURIComponent(o.path)}">${t.fileOutBtn}</a>`;
  const ad = `<div class="ad"><b>${t.adH}</b><p>${t.adP}</p><a href="/app">${t.adA}</a></div>`;
  return cardPage(`<title>vibebook</title>`, body + ad, "", o.lang);
}

function cardPage(head: string, body: string, script: string, lang: Lang = "pt") {
  return `<!doctype html>
<html lang="${lang === "en" ? "en" : "pt-BR"}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="robots" content="noindex" />
<meta name="theme-color" content="#1d5fc4" />
${head}
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<style>
  :root { color-scheme: light dark; --bg: light-dark(#eef3fb, #0f1620); --card: light-dark(#fff, #18212e); --ink: light-dark(#141b26, #e8edf5); --mute: light-dark(#5b6576, #9aa6b8); --line: light-dark(#dde4ee, #263142); --accent: #1d5fc4; }
  html, body { margin: 0; min-height: 100%; background: var(--bg); color: var(--ink); font: 16px/1.5 -apple-system, "Segoe UI", Roboto, sans-serif; }
  main { min-height: 100dvh; display: grid; place-items: center; padding: 24px 16px; box-sizing: border-box; }
  .card { width: min(440px, 100%); background: var(--card); border: 1px solid var(--line); border-radius: 22px; padding: 28px; box-shadow: 0 30px 60px -40px rgb(20 40 80 / .5); text-align: center; box-sizing: border-box; }
  .logo { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: var(--ink); text-decoration: none; margin-bottom: 18px; }
  .k { margin: 0 0 6px; color: var(--mute); font-size: 14px; }
  h1 { margin: 0 0 12px; font-size: 28px; line-height: 1.15; overflow-wrap: anywhere; }
  p { margin: 0 0 18px; color: var(--mute); }
  p b { color: var(--ink); }
  .ok { color: oklch(0.55 0.15 150); font-weight: 700; margin-bottom: 6px; }
  .err { color: oklch(0.55 0.18 30); margin: 12px 0 0; }
  .btn { display: inline-block; background: var(--accent); color: #fff; border: 0; border-radius: 999px; padding: 12px 22px; font: 700 15px/1 inherit; text-decoration: none; cursor: pointer; }
  .btn:disabled { opacity: .6; cursor: default; }
  .ad { margin-top: 24px; padding: 16px 18px; border-radius: 16px; background: light-dark(#fdf6d3, #2a2716); border: 1px solid light-dark(#f2e3a0, #4a4220); text-align: left; font-size: 14px; }
  .ad p { margin: 4px 0 8px; font-size: 14px; }
  .ad a { color: light-dark(#1d5fc4, #8fb4ff); font-weight: 700; text-decoration: none; }
</style>
</head>
<body>
<main><div class="card">
  <a class="logo" href="/">${LOGO}vibebook</a>
  ${body}
</div></main>
${script}
</body>
</html>`;
}
