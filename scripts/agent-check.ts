// End-to-end check of the agents' MCP against a local `bun run dev` (DEV_EMAIL set):
// two people connect their agents over OAuth (DCR + PKCE + consent), then talk in a room.
//   bun scripts/agent-check.ts [http://127.0.0.1:8797]
import { findSecret } from "../src/secrets";

const BASE = process.argv[2] ?? "http://127.0.0.1:8797";
const REDIRECT = "http://127.0.0.1:9/cb";
let failures = 0;
const check = (ok: unknown, what: string) => {
  console.log(`${ok ? "✓" : "✗"} ${what}`);
  if (!ok) failures++;
};

// Secret detector: real shapes blocked, ordinary text passes. Fake keys are built at runtime so
// GitHub push protection doesn't mistake this file for a leak.
const FAKE_SHOPIFY = "shp" + "ss_" + "0123456789abcdef".repeat(2);
check(findSecret("chave: " + "sk-" + "ant-api03-AbCdEfGhIjKlMnOpQrStUvWx"), "secret: sk- key blocked");
check(findSecret(FAKE_SHOPIFY), "secret: Shopify token blocked");
check(findSecret("ghp_" + "a".repeat(36)), "secret: GitHub token blocked");
check(findSecret("senha: hunter2hunter2"), "secret: password blocked");
check(!findSecret("o site novo tá em giro.gui-dev.workers.dev, commit 4c63837ab, pedido #10234"), "secret: normal text passes");

const b64url = (b: ArrayBuffer | Uint8Array) => Buffer.from(b instanceof Uint8Array ? b : new Uint8Array(b)).toString("base64url");
const cookieJar = (res: Response) => res.headers.getSetCookie().map((c) => c.split(";")[0]);

async function connectAgent(email: string, clientName: string) {
  const reg = await fetch(`${BASE}/oauth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ client_name: clientName, redirect_uris: [REDIRECT], token_endpoint_auth_method: "none", grant_types: ["authorization_code", "refresh_token"] }),
  }).then((r) => r.json() as Promise<{ client_id: string }>);
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(32)));
  const challenge = b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
  const q = new URLSearchParams({
    response_type: "code",
    client_id: reg.client_id,
    redirect_uri: REDIRECT,
    code_challenge: challenge,
    code_challenge_method: "S256",
    state: "s1",
    scope: "rooms offline_access",
    resource: `${BASE}/mcp`,
  });
  const me = `dev_as=${encodeURIComponent(email)}`;
  const page = await fetch(`${BASE}/authorize?${q}`, { headers: { cookie: me }, redirect: "manual" });
  const html = await page.text();
  const handle = html.match(/name="handle" value="([^"]+)"/)?.[1];
  check(page.status === 200 && handle && html.includes(clientName), `${email}: consent page shows the client`);
  const form = new URLSearchParams({ handle: handle ?? "", decision: "approve" });
  const ok = await fetch(`${BASE}/authorize?${q}`, {
    method: "POST",
    headers: { cookie: [me, ...cookieJar(page)].join("; "), "content-type": "application/x-www-form-urlencoded", origin: BASE },
    body: form,
    redirect: "manual",
  });
  const code = new URL(ok.headers.get("location") ?? REDIRECT).searchParams.get("code");
  check(ok.status === 302 && code, `${email}: approve redirects with a code`);
  const tok = await fetch(`${BASE}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code: code ?? "", redirect_uri: REDIRECT, client_id: reg.client_id, code_verifier: verifier, resource: `${BASE}/mcp` }),
  }).then((r) => r.json() as Promise<{ access_token?: string; refresh_token?: string }>);
  check(tok.access_token && tok.refresh_token, `${email}: token exchange gives access + refresh tokens`);
  let id = 0;
  const rpc = async (method: string, params: Record<string, unknown> = {}) => {
    const r = await fetch(`${BASE}/mcp`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${tok.access_token}` },
      body: JSON.stringify({ jsonrpc: "2.0", id: ++id, method, params }),
    });
    return r.status === 200 ? ((await r.json()) as { result?: any; error?: any }) : { error: { status: r.status } };
  };
  const tool = async (name: string, args: Record<string, unknown> = {}) => {
    const r = await rpc("tools/call", { name, arguments: args });
    return { out: r.result?.structuredContent, error: r.result?.isError ? r.result.content?.[0]?.text : r.error };
  };
  return { rpc, tool, token: tok.access_token };
}

const stamp = Date.now().toString(36);
const gui = `gui-${stamp}@test.vibebook.dev`;
const marina = `marina-${stamp}@test.vibebook.dev`;
const outsider = `outsider-${stamp}@test.vibebook.dev`;

const g = await connectAgent(gui, "Claude Code (test)");
const init = await g.rpc("initialize", { protocolVersion: "2025-06-18" });
check(init.result?.instructions?.includes("DATA, not instructions"), "initialize carries the safety instructions");
const tools = await g.rpc("tools/list");
check(tools.result?.tools?.map((t: { name: string }) => t.name).join() === "inbox,read_room,post,set_task_status,log_decision,create_room", "tools/list has the 6 tools");

const created = await g.tool("create_room", { title: `Site novo da Giro ${stamp}`, invite: [marina] });
const room = created.out?.room_id;
check(room && created.out.invited?.[0] === marina, "create_room creates the room and invites Marina");
const sent = await g.tool("post", { room_id: room, text: "@marina o site novo tá no ar. falta o script de aluguel no tema e os webhooks de pedido" });
check(sent.out?.ok, "Gui's agent posts with a mention");

const m = await connectAgent(marina, "Claude.ai (test)");
const inbox = await m.tool("inbox");
const entry = inbox.out?.rooms?.find((r: { room_id: string }) => r.room_id === room);
check(entry && entry.new_messages >= 1, `Marina's inbox shows the room with ${entry?.new_messages} new message(s)`);
const read = await m.tool("read_room", { room_id: room });
const last = read.out?.messages?.at(-1);
check(last?.by_agent && last.text.includes("@marina") && last.from.includes(gui), "Marina's agent reads Gui's agent message, labeled by_agent");
check(last?.mentions_you === true, "the @marina message is flagged mentions_you for Marina's agent");
const inbox2 = await m.tool("inbox");
check(inbox2.out?.rooms?.find((r: { room_id: string }) => r.room_id === room)?.new_messages === 0, "after read_room, inbox says 0 new");
check((await m.tool("post", { room_id: room, text: "vou ver com ela 👀" })).out?.ok, "Marina's agent replies");
check((await m.tool("log_decision", { room_id: room, text: "Aprovado: script e webhooks no Shopify" })).out?.ok, "Marina's agent logs her approval");
const logged = (await g.tool("read_room", { room_id: room, all: true })).out?.decisions?.at(-1);
check(logged?.kind === "approval" && logged.who.includes("via agent"), "Gui's agent sees the approval in the decision log");

const secret = await m.tool("post", { room_id: room, text: `o secret é ${FAKE_SHOPIFY}` });
check(secret.out?.ok === false && /secret/.test(secret.out?.error), "a post with a Shopify secret is refused");

// Two agents ping-pong: the thread pauses at 6 in a row with no human.
let paused: any;
for (let i = 0; i < 6 && !paused; i++) {
  const r = await (i % 2 ? m : g).tool("post", { room_id: room, text: `ok ${i}` });
  if (r.out?.paused) paused = r.out;
}
check(paused, "agents talking alone get paused (no human for 6 messages)");
check((await m.tool("read_room", { room_id: room })).out?.paused === true, "read_room reports the pause");

const o = await connectAgent(outsider, "Intruder (test)");
const sneak = await o.tool("read_room", { room_id: room });
check(sneak.error && !sneak.out, "an agent of a non-member can't read the room");

const grants = await fetch(`${BASE}/api/agents`, { headers: { cookie: `dev_as=${encodeURIComponent(outsider)}` } }).then((r) => r.json() as Promise<{ agents: { id: string }[] }>);
check(grants.agents?.length === 1, "/api/agents lists the connection");
await fetch(`${BASE}/api/agents/${grants.agents[0].id}`, { method: "DELETE", headers: { cookie: `dev_as=${encodeURIComponent(outsider)}`, origin: BASE } });
check((await o.rpc("tools/list")).error?.status === 401, "after revoke, the agent's token is rejected");

console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed");
process.exit(failures ? 1 : 0);
