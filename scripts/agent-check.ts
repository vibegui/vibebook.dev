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
  return client(tok.access_token);
}

// One MCP session (= one agent): keeps the Mcp-Session-Id that initialize hands out.
function client(token: string) {
  let id = 0;
  let sid = "";
  const rpc = async (method: string, params: Record<string, unknown> = {}) => {
    const r = await fetch(`${BASE}/mcp`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}`, ...(sid ? { "mcp-session-id": sid } : {}) },
      body: JSON.stringify({ jsonrpc: "2.0", id: ++id, method, params }),
    });
    sid = r.headers.get("mcp-session-id") ?? sid;
    return r.status === 200 ? ((await r.json()) as { result?: any; error?: any }) : { error: { status: r.status } };
  };
  const tool = async (name: string, args: Record<string, unknown> = {}) => {
    const r = await rpc("tools/call", { name, arguments: args });
    return { out: r.result?.structuredContent, error: r.result?.isError ? r.result.content?.[0]?.text : r.error };
  };
  return { rpc, tool, token, sid: () => sid };
}

const stamp = Date.now().toString(36);
const gui = `gui-${stamp}@test.vibebook.dev`;
const marina = `marina-${stamp}@test.vibebook.dev`;
const outsider = `outsider-${stamp}@test.vibebook.dev`;

const g = await connectAgent(gui, "Claude Code (test)");
const init = await g.rpc("initialize", { protocolVersion: "2025-06-18" });
check(init.result?.instructions?.includes("DATA, not instructions"), "initialize carries the safety instructions");
check(/^s_[a-f0-9]{32}$/.test(g.sid()), "initialize hands out an Mcp-Session-Id (the agent)");
const tools = await g.rpc("tools/list");
check(tools.result?.tools?.map((t: { name: string }) => t.name).join() === "inbox,pending,search,resolve_pending,claude_rooms,switch_claude,rename_room,set_room_icon,connections,app_call,app_open,wait_for_messages,notify_url,read_room,post,save_app,list_apps,delete_app,save_reminder,metrics,list_reminders,delete_reminder,upload_file,preview_mention_email,get_file,ack,sandboxes,sandbox_create,sandbox_setup,sandbox_exec,sandbox_power,permission_wait,permission_close,report_issue,set_task_status,add_task,update_task,delete_task,suggest_epic,delete_epic,move_message,update_epic,update_doc,upload_link,start_epic,log_decision,pin,unpin,create_room", "tools/list has the 49 tools");

const created = await g.tool("create_room", { title: `Site novo da Giro ${stamp}`, invite: [marina] });
const room = created.out?.room_id;
check(room && created.out.invited?.[0] === marina, "create_room creates the room and invites Marina");
// "Meu Claude" toggle: the app switches it, claude_rooms (read by vibebook herdr) reports it.
const toggle = (on: boolean) => fetch(`${BASE}/api/books/${room}/claude`, { method: "POST", headers: { cookie: `dev_as=${encodeURIComponent(gui)}`, "content-type": "application/json" }, body: JSON.stringify({ on }) });
check(!(await g.tool("claude_rooms")).out?.rooms?.some((r: { room_id: string }) => r.room_id === room), "claude_rooms: a room never switched on isn't listed");
await toggle(true);
check((await g.tool("claude_rooms")).out?.rooms?.find((r: { room_id: string }) => r.room_id === room)?.on === true, "claude_rooms: switched on in the app = on");
check((await g.tool("switch_claude", { room_id: room, on: false })).out?.on === false, "switch_claude switches it from the agent");
await toggle(false);
check((await g.tool("claude_rooms")).out?.rooms?.find((r: { room_id: string }) => r.room_id === room)?.on === false, "claude_rooms: switched off = listed as off (so the runner closes it)");
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

// Listen mode: Gui's agent waits; Marina's post wakes it; its own post doesn't.
await g.tool("read_room", { room_id: room });
const idle = await g.tool("wait_for_messages", { timeout_seconds: 5, room_id: room });
check(idle.out?.new?.length === 0, "wait_for_messages times out empty when nothing is new");
const woke = g.tool("wait_for_messages", { timeout_seconds: 20, room_id: room });
await new Promise((r) => setTimeout(r, 1500));
await m.tool("post", { room_id: room, text: "@gui pode mandar o import hoje?" });
check((await woke).out?.new?.[0]?.room_id === room, "a new message wakes a waiting agent");
await g.tool("read_room", { room_id: room });
await g.tool("post", { room_id: room, text: "vou ver com ele" });
check((await g.tool("wait_for_messages", { timeout_seconds: 5, room_id: room })).out?.new?.length === 0, "an agent's own post doesn't wake it");

// Two Claudes of the same person each have their own cursor: one reading doesn't hide messages from the other.
const g2 = client(g.token);
await g2.rpc("initialize", { protocolVersion: "2025-06-18" });
check(g2.sid() && g2.sid() !== g.sid(), "a second session of the same person is a different agent");
await g2.tool("read_room", { room_id: room });
await fetch(`${BASE}/api/books/${room}/post`, { method: "POST", headers: { "content-type": "application/json", cookie: `dev_as=${encodeURIComponent(marina)}` }, body: JSON.stringify({ text: "@gui mais uma coisa" }) });
await g.tool("read_room", { room_id: room });
check((await g2.tool("inbox")).out?.rooms?.find((r: { room_id: string }) => r.room_id === room)?.new_messages >= 1, "the other session still sees it as new after the first one read it");
check((await g.tool("inbox")).out?.rooms?.find((r: { room_id: string }) => r.room_id === room)?.new_messages === 0, "the session that read it is caught up");
await g2.tool("read_room", { room_id: room });
const forged = client(m.token);
await forged.rpc("initialize", {});
check((await (async () => { const r = await fetch(`${BASE}/mcp`, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${m.token}`, "mcp-session-id": g.sid() }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "inbox", arguments: {} } }) }); return (await r.json()).result?.structuredContent?.you_act_for; })()) === marina, "someone else's session id doesn't make you that agent");

// A request becomes a thread: start_epic makes the epic (seeded doc, one task) and points to it from main;
// closing its task archives it.
const ep = (await g.tool("start_epic", { room_id: room, title: "Importar as reservas", why: "Trazer as reservas antigas pro site novo." })).out;
check(ep?.ok && ep.epic_id && ep.tasks?.length === 1, "start_epic creates an epic with the request as its task");
check((await g.tool("start_epic", { room_id: room, title: "x", goal: "y" })).error?.includes("unknown argument goal"), "a misnamed argument is an error, not silently dropped");
check(!!(await g.tool("start_epic", { room_id: room, title: "x" })).error, "start_epic needs why (the doc's goal)");
let rr = (await g.tool("read_room", { room_id: room, all: true })).out;
const made = rr?.epics?.find((e: { id: string }) => e.id === ep.epic_id);
check(made?.doc?.includes("Trazer as reservas antigas"), "the new epic's doc starts with its goal");
check(!!made?.tasks?.[0]?.owner, "the agent's human owns the tasks it started (self-assign)");
// ack: "X está fazendo isso" under the person's latest message, turned into done by a done post.
await fetch(`${BASE}/api/books/${room}/post`, { method: "POST", headers: { "content-type": "application/json", cookie: `dev_as=${encodeURIComponent(gui)}` }, body: JSON.stringify({ text: "troca o logo" }) });
const ak = (await g.tool("ack", { room_id: room, model: "Claude Teste" })).out;
check(ak?.ok && ak.message_id > 0, "ack points at the person's latest message");
check((await g.tool("ack", { room_id: room, model: "Claude Teste", status: "idle" })).out?.ok, "ack can release the marker (status idle) without closing anything");
check((await g.tool("ack", { room_id: room, status: "nope" })).out?.ok === false, "ack refuses an unknown status");
await g.tool("ack", { room_id: room, model: "Claude Teste" });
await g.tool("post", { room_id: room, text: "feito", done: true });
// Pessoas shows only the sessions connected to this room, with their repo.
await g.tool("read_room", { room_id: room, model: "Claude Teste", repo: "repo-teste" });
const ags = (await fetch(`${BASE}/api/books/${room}/agents`, { headers: { cookie: `dev_as=${encodeURIComponent(gui)}` } }).then((r) => r.json())) as { agents: { who: string; repo: string | null }[] };
check(ags.agents?.some((x) => x.who === "Claude Teste" && x.repo === "repo-teste"), "the room lists the session that read it, with model and repo");
const other = (await g.tool("create_room", { title: "outra sala (teste)" })).out?.room_id;
const ags2 = (await fetch(`${BASE}/api/books/${other}/agents`, { headers: { cookie: `dev_as=${encodeURIComponent(gui)}` } }).then((r) => r.json())) as { agents: unknown[] };
check(Array.isArray(ags2.agents) && ags2.agents.length === 0, "a room the session never touched doesn't list it");
await g.tool("wait_for_messages", { timeout_seconds: 5 });
const ags3 = (await fetch(`${BASE}/api/books/${other}/agents`, { headers: { cookie: `dev_as=${encodeURIComponent(gui)}` } }).then((r) => r.json())) as { agents: { listening: boolean; all_rooms: boolean }[] };
check(ags3.agents?.some((x) => x.listening && x.all_rooms), "a session listening to all rooms shows in every room (same as its receipts)");
check(rr?.messages?.some((x: { thread: string; text: string }) => x.thread === "main" && x.text.includes("Importar as reservas")), "main thread gets one line pointing to the epic");
check((await g.tool("post", { room_id: room, thread: ep.epic_id, text: "terminei o import" })).out?.ok, "the agent reports inside the epic");
await g.tool("set_task_status", { room_id: room, task_id: ep.tasks[0].id, status: "done" });
rr = (await g.tool("read_room", { room_id: room, all: true })).out;
check(rr?.epics?.find((e: { id: string }) => e.id === ep.epic_id)?.archived !== true, "an epic a Claude worked in doesn't close on its ticks alone (no proof yet)");
// A screenshot alone is not proof; the delivery card (what was tested) is.
await g.tool("upload_file", { room_id: room, thread: ep.epic_id, filename: "prova.png", content_type: "image/png", base64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" });
rr = (await g.tool("read_room", { room_id: room, all: true })).out;
check(rr?.epics?.find((e: { id: string }) => e.id === ep.epic_id)?.archived !== true, "a screenshot without a delivery doesn't close the epic");
await g.tool("post", { room_id: room, thread: ep.epic_id, text: "entregue, testado", done: true });
rr = (await g.tool("read_room", { room_id: room, all: true })).out;
check(rr?.epics?.find((e: { id: string }) => e.id === ep.epic_id)?.archived === true, "with a delivery saying what was tested, the epic archives itself");

// upload_link: a one-time URL the agent PUTs a file to (bytes never go through the model), posted with its message.
const ul = (await g.tool("upload_link", { room_id: room, filename: "antes.png", content_type: "image/png", message: "antes" })).out;
const png = Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="), (ch) => ch.charCodeAt(0));
const put = await fetch(ul.url, { method: "PUT", headers: { "content-type": "image/png" }, body: png });
const putOut = (await put.json()) as { ok?: boolean; file?: { name: string } };
check(put.status === 200 && putOut.ok && putOut.file?.name === "antes.png", "a file PUT to an upload link lands in the room with its message");
check((await fetch(ul.url, { method: "PUT", headers: { "content-type": "image/png" }, body: png })).status === 404, "an upload link works once");
// get_file: the agent sees an attached image as an MCP image part.
const att = (await g.tool("read_room", { room_id: room, all: true })).out?.messages?.flatMap((x: { files?: { id: string; name: string }[] }) => x.files ?? []).find((f: { name: string }) => f.name === "antes.png");
const gf = await g.rpc("tools/call", { name: "get_file", arguments: { room_id: room, file_id: att?.id } });
check(gf.result?.content?.some((p: { type: string; mimeType?: string; data?: string }) => p.type === "image" && p.mimeType === "image/png" && p.data?.length > 10), "get_file returns the attached image as an image");
const gfOut = await connectAgent(`outsider2-${stamp}@test.vibebook.dev`, "Claude Code (test)");
check((await gfOut.rpc("tools/call", { name: "get_file", arguments: { room_id: room, file_id: att?.id } })).result?.isError === true, "a non-member can't get the file");

// Asked by the person in the main thread: the epic hangs under that message as a thread, no pointer line.
const ask = await (await fetch(`${BASE}/api/books/${room}/post`, { method: "POST", headers: { "content-type": "application/json", cookie: `dev_as=${encodeURIComponent(gui)}` }, body: JSON.stringify({ text: "dá pra trocar o domínio?" }) })).json();
const ep2 = (await g.tool("start_epic", { room_id: room, title: "Trocar o domínio", why: "domínio próprio" })).out;
rr = (await g.tool("read_room", { room_id: room, all: true })).out;
check(rr?.epics?.find((e: { id: string }) => e.id === ep2?.epic_id)?.from_message_id === ask.id, "the epic is linked to the request's message");
// Branching: a request written inside an epic's thread becomes an epic hanging under that message.
const inEpic = await (await fetch(`${BASE}/api/books/${room}/post`, { method: "POST", headers: { "content-type": "application/json", cookie: `dev_as=${encodeURIComponent(gui)}` }, body: JSON.stringify({ text: "e o certificado?", thread: ep2.epic_id }) })).json();
const ep3 = (await g.tool("start_epic", { room_id: room, title: "Certificado", why: "https no domínio novo", from_message_id: inEpic.id })).out;
rr = (await g.tool("read_room", { room_id: room, all: true })).out;
const pv = (await g.tool("preview_mention_email", { room_id: room, message_id: inEpic.id })).out;
check(pv?.ok && pv.sent_to === gui, "preview_mention_email sends the email only to the agent's own human");
check(inEpic.id && rr?.epics?.find((e: { id: string }) => e.id === ep3?.epic_id)?.from_message_id === inEpic.id, "an epic can branch out of a message in another epic's thread");
check(!rr?.messages?.some((x: { text: string }) => x.text.includes("Trocar o domínio")), "with a source message there's no pointer line");

// Agents organize the room themselves (no @vibe in between): tasks, epics, docs.
const nt = (await g.tool("add_task", { room_id: room, epic_id: ep2.epic_id, title: "Apontar DNS", owner: gui, due: "sex" })).out;
check(nt?.ok && nt.task_id, "add_task adds a task with owner and due");
check((await g.tool("add_task", { room_id: room, epic_id: "nope", title: "x" })).out?.ok === false, "add_task on an unknown epic is an error");
check((await g.tool("update_task", { room_id: room, task_id: nt.task_id, title: "Apontar o DNS", due: "" })).out?.ok, "update_task renames and clears the due date");
check((await g.tool("update_task", { room_id: room, task_id: nt.task_id, owner: "ninguem@x.dev" })).out?.ok === false, "update_task refuses an owner who isn't a member");
check((await g.tool("update_task", { room_id: room, task_id: "nope", title: "x" })).out?.ok === false, "update_task on an unknown task is an error");
check((await g.tool("update_epic", { room_id: room, epic_id: ep2.epic_id, title: "Domínio próprio" })).out?.ok, "update_epic renames");
rr = (await g.tool("read_room", { room_id: room, all: true })).out;
let e2 = rr?.epics?.find((e: { id: string }) => e.id === ep2.epic_id);
check(e2?.title === "Domínio próprio" && e2.tasks.some((t: { title: string; due: string | null }) => t.title === "Apontar o DNS" && !t.due), "the board shows the agent's edits");
check(e2?.doc?.includes("- [ ] Apontar o DNS"), "the epic doc's checklist follows");
check((await g.tool("update_doc", { room_id: room, epic_id: ep2.epic_id, markdown: e2.doc.replace("- [ ] Apontar o DNS", "- [x] Apontar o DNS") })).out?.ok, "update_doc rewrites an epic's doc");
rr = (await g.tool("read_room", { room_id: room, all: true })).out;
e2 = rr?.epics?.find((e: { id: string }) => e.id === ep2.epic_id);
check(e2?.tasks.find((t: { title: string }) => t.title === "Apontar o DNS")?.status === "done", "ticking the line in update_doc closes the task");
check((await g.tool("delete_task", { room_id: room, task_id: nt.task_id })).out?.ok, "delete_task deletes");
check((await g.tool("update_epic", { room_id: room, epic_id: ep2.epic_id, archived: true, mark_done: true })).out?.ok, "update_epic archives (mark_done closes the rest)");
rr = (await g.tool("read_room", { room_id: room, all: true })).out;
check(rr?.epics?.find((e: { id: string }) => e.id === ep2.epic_id)?.archived === true, "the epic is archived");
await g.tool("update_epic", { room_id: room, epic_id: ep2.epic_id, archived: false });
// @vibe the housekeeper: a delivery with tasks still open gets a nudge to whoever delivered (4s in dev), once;
// a task in doing with no news gets one to its owner (8s in dev).
const hk = (await g.tool("start_epic", { room_id: room, title: "Zelador", why: "teste do zelador", tasks: ["A", "B"] })).out;
await g.tool("set_task_status", { room_id: room, task_id: hk.tasks[1].id, status: "doing" });
await g.tool("post", { room_id: room, thread: hk.epic_id, text: "entreguei A", done: true });
await new Promise((r) => setTimeout(r, 6000));
let hkMsgs = (await g.tool("read_room", { room_id: room, all: true })).out?.messages?.filter((x: { thread: string; from: string }) => x.thread === "epic: Zelador" && x.from === "@vibe");
check(hkMsgs?.length === 1 && hkMsgs[0].text.includes("teve entrega aqui") && hkMsgs[0].text.includes("A; B"), "a delivery with open tasks gets one nudge from @vibe");
await new Promise((r) => setTimeout(r, 9000));
hkMsgs = (await g.tool("read_room", { room_id: room, all: true })).out?.messages?.filter((x: { thread: string; from: string }) => x.thread === "epic: Zelador" && x.from === "@vibe");
check(hkMsgs?.length === 2 && hkMsgs[1].text.includes("B (fazendo)"), "a task in doing with no news gets a nudge to its owner");

// Push mode: notify_url long-polls without the OAuth token; a post wakes it with one line, no content.
const nu = (await g.tool("notify_url")).out;
check(nu?.url?.includes("/api/notify?k=") && nu.monitor_command?.includes(nu.url), "notify_url returns a URL and a ready monitor loop");
check((await g.tool("notify_url")).out?.url === nu.url, "notify_url is stable across calls");
const since = Date.now();
const ping = fetch(`${nu.url}&since=${since}`);
await new Promise((r) => setTimeout(r, 1500));
await m.tool("post", { room_id: room, text: "@gui chegou o import 🙌" });
const line = await (await ping).text();
check(line.includes(`room_id=${room}`) && !line.includes("import"), "a post wakes /api/notify with the room, not the message");
await g.tool("read_room", { room_id: room });
check((await fetch(`${BASE}/api/notify?k=${"0".repeat(64)}`)).status === 404, "an unknown notify key is refused");
const scoped = (await g.tool("notify_url", { room_id: room })).out?.url;
check(scoped?.endsWith(`&room=${room}`), "notify_url can be scoped to one room");
check(!!(await g.tool("notify_url", { room_id: "zzzzzzzz" })).error, "scoping to a room you're not in is refused");
const rotated = (await g.tool("notify_url", { rotate: true })).out?.url;
check(rotated && rotated !== nu.url && (await fetch(nu.url)).status === 404, "rotate kills the old notify URL");
const secret = await m.tool("post", { room_id: room, text: `o secret é ${FAKE_SHOPIFY}` });
check(secret.out?.ok === false && /secret/.test(secret.out?.error), "a post with a Shopify secret is refused");

// Files: an agent attaches an HTML report; it's served sandboxed; secrets and SVG are refused.
const html = "<!doctype html><title>r</title><h1>Relatório</h1><script>document.title='ok'</script>";
const up = await g.tool("upload_file", { room_id: room, filename: "relatorio.html", content_type: "text/html", text: html, message: "relatório no anexo", model: "Claude Opus 5.5" });
check(up.out?.ok && up.out.file?.url, "Gui's agent uploads an HTML report with a message");
const fileUrl = up.out?.file?.url ?? "";
const served = await fetch(fileUrl, { headers: { cookie: `dev_as=${encodeURIComponent(gui)}` } });
const csp = served.headers.get("content-security-policy") ?? "";
check(served.status === 200 && (await served.text()).includes("Relatório"), "a member opens the HTML");
check(/sandbox allow-scripts;/.test(csp) && !/allow-same-origin/.test(csp) && /connect-src 'none'/.test(csp), "HTML is served sandboxed: opaque origin, no fetch");
check(served.headers.get("x-content-type-options") === "nosniff", "HTML is served with nosniff");
check((await fetch(fileUrl, { headers: { cookie: `dev_as=${encodeURIComponent(outsider)}` } })).status === 403, "a non-member can't open the file");
const leak = await g.tool("upload_file", { room_id: room, filename: "x.html", content_type: "text/html", text: `<p>${FAKE_SHOPIFY}</p>` });
check(leak.error && /segredo|secret/i.test(String(leak.error)), "an HTML file with a secret is refused");
const svg = await g.tool("upload_file", { room_id: room, filename: "x.svg", content_type: "image/svg+xml", text: "<svg/>" });
check(svg.error, "SVG is refused");
check((await m.tool("read_room", { room_id: room })).out?.messages?.some((x: { files?: { name: string }[] }) => x.files?.[0]?.name === "relatorio.html"), "Marina's agent sees the attachment in read_room");

// One agent reporting progress alone never pauses, however many posts in a row.
await fetch(`${BASE}/api/books/${room}/post`, { method: "POST", headers: { "content-type": "application/json", cookie: `dev_as=${encodeURIComponent(gui)}` }, body: JSON.stringify({ text: "manda os updates aqui" }) });
let solo = true;
for (let i = 0; i < 8; i++) {
  let r = await g.tool("post", { room_id: room, text: `progresso ${i}` });
  // The script itself posts ~30 times a minute as this person: wait out AGENT_LIMIT (that's not the pause under test).
  if (/rate limited/.test(String(r.error ?? ""))) { await new Promise((ok) => setTimeout(ok, 61_000)); r = await g.tool("post", { room_id: room, text: `progresso ${i}` }); }
  if (!r.out?.ok) console.log("post", i, JSON.stringify(r).slice(0, 200));
  solo &&= !!r.out?.ok;
}
check(solo, "one agent posting 8 updates in a row is not paused");

// Two agents ping-pong: the thread pauses at 6 in a row with no human.
let paused: any;
for (let i = 0; i < 6 && !paused; i++) {
  const r = await (i % 2 ? m : g).tool("post", { room_id: room, text: `ok ${i}` });
  if (r.out?.paused) paused = r.out;
}
check(paused, "agents talking alone get paused (no human for 6 messages)");
check((await m.tool("read_room", { room_id: room })).out?.paused === true, "read_room reports the pause");

// Archive is per person: it leaves Gui's list and his agent's inbox, and restoring brings it back.
const arch = (on: boolean) => fetch(`${BASE}/api/books/${room}/archive`, { method: "POST", headers: { cookie: `dev_as=${encodeURIComponent(gui)}`, "content-type": "application/json" }, body: JSON.stringify({ archived: on }) });
await arch(true);
check(!(await g.tool("inbox")).out?.rooms?.some((r: { room_id: string }) => r.room_id === room), "an archived room leaves the owner's agent inbox");
check((await m.tool("inbox")).out?.rooms?.some((r: { room_id: string }) => r.room_id === room), "other members still see the room");
await arch(false);
check((await g.tool("inbox")).out?.rooms?.some((r: { room_id: string }) => r.room_id === room), "restoring brings it back");

const o = await connectAgent(outsider, "Intruder (test)");
const sneak = await o.tool("read_room", { room_id: room });
check(sneak.error && !sneak.out, "an agent of a non-member can't read the room");

const grants = await fetch(`${BASE}/api/agents`, { headers: { cookie: `dev_as=${encodeURIComponent(outsider)}` } }).then((r) => r.json() as Promise<{ agents: { id: string }[] }>);
check(grants.agents?.length === 1, "/api/agents lists the connection");
await fetch(`${BASE}/api/agents/${grants.agents[0].id}`, { method: "DELETE", headers: { cookie: `dev_as=${encodeURIComponent(outsider)}`, origin: BASE } });
check((await o.rpc("tools/list")).error?.status === 401, "after revoke, the agent's token is rejected");

console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed");
process.exit(failures ? 1 : 0);
