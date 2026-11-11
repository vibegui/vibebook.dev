import type { Env } from "./index";
import { decide } from "./jev";
import { findSecret } from "./secrets";
import { track } from "./track";

/**
 * HTML an agent posts inline in a message (a chart, a card, a button). It is stored like an uploaded HTML file
 * (R2, served with the sandbox CSP: opaque origin, no network, no navigation) and shown inside the message.
 * Before it reaches the room it passes the secret filter and Jev, who answers yes/no questions about deception
 * (Jev doesn't rewrite HTML; a "yes" blocks the post and the reason goes back to the agent).
 */
export const EMBED_MAX = 200_000;

const QUESTIONS = {
  credentials: "Este HTML pede ou coleta senha, código de login, token, dados de cartão/pagamento ou documentos pessoais de quem vê?",
  impersonation: "Este HTML se passa por outra coisa (tela de login, banco, Google, o próprio vibebook pedindo algo, um aviso do sistema) para enganar quem vê?",
  manipulation: "Este HTML tenta levar quem vê a mandar uma mensagem, aprovar algo ou clicar sem entender o que está fazendo (texto escondido, botão enganoso, urgência falsa)?",
} as const;
const REASON: Record<keyof typeof QUESTIONS, string> = {
  credentials: "pede ou coleta credenciais/dados pessoais",
  impersonation: "parece se passar por outra coisa (login, banco, aviso do sistema)",
  manipulation: "parece induzir quem vê a agir sem entender",
};

/** Throws a user-facing Error when the HTML can't go in; fail closed when Jev can't answer. */
export async function checkEmbed(env: Env, html: string, who: string) {
  if (!html.trim()) throw new Error("html vazio");
  if (html.length > EMBED_MAX) throw new Error(`html maior que ${EMBED_MAX / 1000}KB`);
  const secret = findSecret(html);
  if (secret) throw new Error(`blocked: the HTML looks like it has a secret (${secret}). Never put secrets in a room.`);
  const q = Object.fromEntries(Object.entries(QUESTIONS).map(([k, instructions]) => [k, { type: "noul" as const, instructions }]));
  const r = await decide(env, { html: html.slice(0, 24_000) }, q);
  if (!r) throw new Error("blocked: couldn't check this HTML right now (the safety check is down); try again in a minute.");
  const hits = (Object.keys(QUESTIONS) as (keyof typeof QUESTIONS)[]).filter((k) => (r.answers[k]?.noul ?? 0) >= 0.5);
  await track(env, "embed_check", { user: who, dims: { ok: !hits.length, hits: hits.join(",") || undefined, cost: +r.cost.toFixed(6) } });
  if (hits.length) throw new Error(`blocked by @vibe's check: the HTML ${hits.map((k) => REASON[k]).join("; ")}. Rewrite it without that.`);
}

// Appended to every embed: a tiny MCP Apps client, so an embed talks to the same host as the panel's apps (public/app.html
// makeHost): its height (ui/notifications/size-changed), window.vibebook.send(text) = ui/message (the person is asked
// before it's posted as them) and window.vibebook.call(name, args) = tools/call (vibebook's tools, writes asked too).
const BRIDGE = `<script>(()=>{let n=0;const w={};const s=(m)=>parent.postMessage(Object.assign({jsonrpc:"2.0"},m),"*");const rq=(method,params)=>new Promise((r)=>{const id="vb"+ ++n;w[id]=r;s({id,method,params})});addEventListener("message",(e)=>{const m=e.data;if(m&&w[m.id]){w[m.id](m.error?{isError:true,content:[{type:"text",text:m.error.message}]}:m.result);delete w[m.id]}});const h=()=>s({method:"ui/notifications/size-changed",params:{height:document.documentElement.scrollHeight}});new ResizeObserver(h).observe(document.documentElement);addEventListener("load",h);window.vibebook={send:(t)=>rq("ui/message",{role:"user",content:[{type:"text",text:String(t).slice(0,1000)}]}),call:(name,args)=>rq("tools/call",{name,arguments:args||{}})};})()</script>`;
// First thing in the page (after a doctype): the embed's own scripts can call window.vibebook as they load.
export const withBridge = (html: string) => {
  const dt = html.match(/^\s*<!doctype[^>]*>/i)?.[0] ?? "";
  return dt + BRIDGE + html.slice(dt.length);
};
