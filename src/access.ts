// A room link opened by someone without access (/b/<id>): a page with the room's name for link previews (WhatsApp,
// Slack, iMessage read og:*) and a card to ask to join. The title is readable by anyone holding the link, on purpose.
import { escapeHtml } from "./auth";

export type AccessState = "out" | "ask" | "asked" | "missing";

const DESC = "Sala no vibebook: chat, doc e tarefas pras pessoas e os Claudes delas trabalharem juntos.";

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
<meta property="og:image" content="${origin}/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${name}" />
<meta name="twitter:image" content="${origin}/og.png" />`;
}

const LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true" width="28" height="28"><rect x="3" y="4" width="22" height="24" rx="5" fill="#1d5fc4"/><rect x="7" y="9" width="11" height="3" rx="1.5" fill="#fff"/><rect x="7" y="15" width="8" height="3" rx="1.5" fill="#fff"/><circle cx="24" cy="23" r="7" fill="#f2dc4a"/><path d="M24 19.5l1 2.4 2.5 1.1-2.5 1.1-1 2.4-1-2.4-2.5-1.1 2.5-1.1z" fill="#14305e"/></svg>`;

export function accessPage(o: { origin: string; id: string; title: string | null; state: AccessState; email?: string; auto?: boolean }) {
  const title = escapeHtml(o.title ?? "");
  const next = encodeURIComponent(`/b/${o.id}?pedir=1`);
  const body =
    o.state === "missing"
      ? `<h1>Sala não encontrada</h1><p>O link pode estar errado, ou a sala não existe mais.</p><a class="btn" href="/app">Abrir o vibebook</a>`
      : `<p class="k">Peça permissão para entrar no vibebook</p><h1>${title}</h1>${
          o.state === "out"
            ? `<p>Esta sala é fechada. Entre com seu email e peça acesso: quem está nela libera.</p><a class="btn" href="/login?next=${next}">Entrar e pedir acesso</a>`
            : o.state === "ask"
              ? `<p>Você entrou como <b>${escapeHtml(o.email ?? "")}</b>. Quem está na sala vê seu pedido e libera.</p><button class="btn" id="ask" type="button">Pedir acesso</button><p class="err" id="err" hidden></p>`
              : `<p class="ok">✓ Pedido enviado.</p><p>Quando liberarem, você recebe um email com o link, e esta página abre a sala.</p>`
        }`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="robots" content="noindex" />
<meta name="theme-color" content="#1d5fc4" />
${roomMeta(o.origin, o.id, o.state === "missing" ? null : o.title)}
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
</style>
</head>
<body>
<main><div class="card">
  <a class="logo" href="/">${LOGO}vibebook</a>
  ${body}
</div></main>
${
  o.state === "ask"
    ? `<script>
const b = document.getElementById("ask"), err = document.getElementById("err");
async function ask() {
  b.disabled = true; b.textContent = "Pedindo…";
  const r = await fetch("/api/books/${o.id}/request", { method: "POST" }).catch(() => null);
  if (r && r.ok) return location.replace("/b/${o.id}");
  b.disabled = false; b.textContent = "Pedir acesso";
  err.hidden = false; err.textContent = r && r.status === 429 ? "Muitos pedidos agora. Tente de novo em um minuto." : "Não deu pra pedir agora. Tente de novo.";
}
b.onclick = ask;${o.auto ? "\nask();" : ""}
</script>`
    : o.state === "asked"
      ? `<script>setInterval(() => fetch("/api/books/${o.id}/access").then((r) => r.json()).then((j) => j.member && location.reload()).catch(() => {}), 15000);</script>`
      : ""
}
</body>
</html>`;
}
