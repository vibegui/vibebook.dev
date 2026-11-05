#!/usr/bin/env node
// vibebook CLI: one login per machine (OAuth + PKCE, refreshed on its own), the room tools discovered at run time,
// and `listen` for the room linked to this folder. Agents call it through Bash; the token never reaches them.
// Built into public/cli.mjs (bun run build:cli); on npm as vibebook.dev (npm i -g vibebook.dev), or installed by https://vibebook.dev/install.sh.
import { execFileSync, execSync, spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { appendFileSync, chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";

const VERSION = "1.2.0";
const HOME = process.env.VIBEBOOK_HOME || join(homedir(), ".vibebook");
const SESSION = join(HOME, "session.json");
const AGENTS = join(HOME, "agents.json");
const DEFAULT_ORIGIN = "https://vibebook.dev";
const HERDR = join(HOME, "herdr.json");

type Session = { origin: string; client_id: string; access_token: string; refresh_token?: string; expires_at: number };
type Tool = { name: string; description: string; inputSchema: { properties?: Record<string, { description?: string }>; required?: string[] } };

const die = (msg: string, code = 1): never => {
  process.stderr.write(`${msg}\n`);
  process.exit(code);
};
const readJson = <T>(f: string, fallback: T): T => {
  try {
    return JSON.parse(readFileSync(f, "utf8")) as T;
  } catch {
    return fallback;
  }
};
const writePrivate = (f: string, data: unknown) => {
  mkdirSync(dirname(f), { recursive: true, mode: 0o700 });
  writeFileSync(f, JSON.stringify(data, null, 2), { mode: 0o600 });
  chmodSync(f, 0o600);
};

// ---- args ----
const argv = process.argv.slice(2);
const flags: Record<string, string | true> = {};
const pos: string[] = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) {
    const [k, v] = a.slice(2).split("=", 2);
    if (v !== undefined) flags[k] = v;
    else if (argv[i + 1] !== undefined && !argv[i + 1].startsWith("--")) flags[k] = argv[++i];
    else flags[k] = true;
  } else if (a === "-d") flags.data = argv[++i] ?? "";
  else pos.push(a);
}
const flag = (k: string) => (typeof flags[k] === "string" ? (flags[k] as string) : undefined);

// ---- where we are: the repo root, its room (.vibebook or a vibebook.dev/b/<id> link), the agent id for it ----
function repoRoot() {
  try {
    return execSync("git rev-parse --show-toplevel", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return process.cwd();
  }
}
function linkedRoom(root: string) {
  const own = readFileSync(join(root, ".vibebook"), { encoding: "utf8", flag: "r" }).match(/^room_id=([a-z0-9]+)/m)?.[1];
  return own;
}
function roomHere(root: string): string | undefined {
  try {
    const r = linkedRoom(root);
    if (r) return r;
  } catch {}
  for (const f of ["README.md", "AGENTS.md", "CLAUDE.md"]) {
    try {
      const m = readFileSync(join(root, f), "utf8").match(/vibebook\.dev\/b\/([a-z0-9]{12})/);
      if (m) return m[1];
    } catch {}
  }
  return undefined;
}
/** One agent per person + folder: reopening a window in the same repo is the same agent, with the same cursor. */
function agentId(root: string) {
  const all = readJson<Record<string, string>>(AGENTS, {});
  if (!all[root]) {
    all[root] = `s_${randomBytes(16).toString("hex")}`;
    writePrivate(AGENTS, all);
  }
  return all[root];
}

// ---- auth ----
const b64url = (b: Buffer) => b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
function openBrowser(url: string) {
  if (process.env.VIBEBOOK_NO_BROWSER) return;
  const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  try {
    spawn(cmd, args, { stdio: "ignore", detached: true }).unref();
  } catch {}
}
async function login(origin: string) {
  const verifier = b64url(randomBytes(32));
  const challenge = b64url(createHash("sha256").update(verifier).digest());
  const state = b64url(randomBytes(16));
  let resolveCode!: (c: string) => void;
  let rejectCode!: (e: Error) => void;
  const got = new Promise<string>((res, rej) => ((resolveCode = res), (rejectCode = rej)));
  const server = createServer((req, res) => {
    const u = new URL(req.url ?? "/", "http://127.0.0.1");
    if (u.pathname !== "/callback") return res.writeHead(404).end();
    const ok = u.searchParams.get("state") === state && u.searchParams.get("code");
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(`<!doctype html><meta charset="utf-8"><body style="font:16px system-ui;padding:40px">${ok ? "vibebook conectado. Pode fechar esta aba e voltar ao terminal." : "Não deu certo. Volte ao terminal e rode <code>vibebook login</code> de novo."}</body>`);
    if (ok) resolveCode(u.searchParams.get("code")!);
    else rejectCode(new Error(u.searchParams.get("error_description") || u.searchParams.get("error") || "state mismatch"));
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  const port = (server.address() as { port: number }).port;
  const redirect = `http://127.0.0.1:${port}/callback`;
  const reg = await fetch(`${origin}/oauth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ client_name: "vibebook CLI", redirect_uris: [redirect], token_endpoint_auth_method: "none", grant_types: ["authorization_code", "refresh_token"], response_types: ["code"] }),
  });
  if (!reg.ok) die(`could not register with ${origin}: ${reg.status} ${await reg.text()}`);
  const { client_id } = (await reg.json()) as { client_id: string };
  const url = `${origin}/authorize?${new URLSearchParams({ response_type: "code", client_id, redirect_uri: redirect, code_challenge: challenge, code_challenge_method: "S256", state, scope: "rooms offline_access", resource: `${origin}/mcp` })}`;
  process.stderr.write(`Abrindo o navegador para conectar. Se não abrir, acesse:\n${url}\n`);
  openBrowser(url);
  const timer = setTimeout(() => rejectCode(new Error("timed out after 5 minutes")), 5 * 60_000);
  const code = await got.finally(() => (clearTimeout(timer), server.close()));
  const tok = await fetch(`${origin}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirect, client_id, code_verifier: verifier, resource: `${origin}/mcp` }),
  });
  if (!tok.ok) die(`login failed: ${tok.status} ${await tok.text()}`);
  const t = (await tok.json()) as { access_token: string; refresh_token?: string; expires_in?: number };
  writePrivate(SESSION, { origin, client_id, access_token: t.access_token, refresh_token: t.refresh_token, expires_at: Date.now() + (t.expires_in ?? 3600) * 1000 } satisfies Session);
}
async function session(): Promise<Session> {
  const s = readJson<Session | null>(SESSION, null);
  if (!s) return die("Not logged in. Ask your human to run, in their own terminal: vibebook login");
  if (Date.now() < s.expires_at - 60_000) return s;
  if (!s.refresh_token) return die("Session expired. Ask your human to run, in their own terminal: vibebook login");
  const r = await fetch(`${s.origin}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: s.refresh_token, client_id: s.client_id }),
  });
  if (r.status === 400 || r.status === 401) return die("Could not refresh the session. Ask your human to run, in their own terminal: vibebook login");
  if (!r.ok) return die(`vibebook unreachable (${r.status}); try again in a moment`, 75);
  const t = (await r.json()) as { access_token: string; refresh_token?: string; expires_in?: number };
  const next = { ...s, access_token: t.access_token, refresh_token: t.refresh_token ?? s.refresh_token, expires_at: Date.now() + (t.expires_in ?? 3600) * 1000 };
  writePrivate(SESSION, next);
  return next;
}

// ---- MCP over the CLI's session ----
let rpcId = 0;
async function rpc(method: string, params: unknown, agent: string): Promise<any> {
  const s = await session();
  const r = await fetch(`${s.origin}/mcp`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${s.access_token}`, "mcp-session-id": agent },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++rpcId, method, params }),
  });
  if (r.status === 401) return die("Session rejected. Ask your human to run, in their own terminal: vibebook login");
  if (r.status >= 500) throw Object.assign(new Error(`vibebook ${r.status}`), { transient: true });
  const j = (await r.json()) as { result?: any; error?: { message: string } };
  if (j.error) die(j.error.message);
  return j.result;
}
const listTools = async (agent: string) => ((await rpc("tools/list", {}, agent)) as { tools: Tool[] }).tools;
/** A tools/call result: JSON text when it parses, else the text; isError exits non-zero. */
async function callTool(name: string, args: Record<string, unknown>, agent: string, tools?: Tool[]) {
  const t = (tools ?? (await listTools(agent))).find((x) => x.name === name);
  if (!t) return die(`unknown tool ${name}; see: vibebook tools`);
  const props = Object.keys(t.inputSchema.properties ?? {});
  // Fill what this folder already knows: its room, its repo name, the model the agent said it is.
  const root = repoRoot();
  if (props.includes("room_id") && args.room_id === undefined && roomHere(root)) args.room_id = roomHere(root);
  if (props.includes("repo") && args.repo === undefined) args.repo = basename(root);
  const model = flag("model") ?? process.env.VIBEBOOK_MODEL;
  if (props.includes("model") && args.model === undefined && model) args.model = model;
  const res = (await rpc("tools/call", { name, arguments: args }, agent)) as { content: { type: string; text?: string; data?: string; mimeType?: string }[]; isError?: boolean };
  return res;
}
// Images (get_file) go to a temp file: the agent reads that file instead of getting base64 in its output.
const printResult = (res: { content: { type: string; text?: string; data?: string; mimeType?: string }[]; isError?: boolean }) => {
  for (const c of res.content) {
    if (c.type === "text") process.stdout.write(`${c.text}\n`);
    else if (c.data) {
      const f = join(tmpdir(), `vibebook-${randomBytes(4).toString("hex")}.${(c.mimeType ?? "").split("/")[1] || "bin"}`);
      writeFileSync(f, Buffer.from(c.data, "base64"));
      process.stdout.write(`${c.type} saved to ${f}\n`);
    }
  }
  if (res.isError) process.exit(1);
};
function readData(): Record<string, unknown> {
  const d = flag("data") ?? pos[2];
  if (d === undefined) return {};
  const raw = d === "@-" ? readFileSync(0, "utf8") : d.startsWith("@") ? readFileSync(d.slice(1), "utf8") : d;
  try {
    const v = JSON.parse(raw);
    if (!v || typeof v !== "object" || Array.isArray(v)) throw 0;
    return v;
  } catch {
    return die("arguments must be a JSON object, e.g. '{\"room_id\":\"abc\"}' (or -d @file.json, -d @-)");
  }
}


// ---- herdr: one Claude Code per room whose "Meu Claude" is on ----
// ~/.vibebook/herdr.json = { <room_id>: { folder, workspace?, session? } }. On: find (or adopt) the room's herdr
// workspace, else create it in the room's folder and start `claude "/vibebook:listen"` there (resuming the last
// conversation). Off: remember the conversation id and close the workspace. Never touches workspaces it doesn't map.
type HerdrRoom = { folder?: string; workspace?: string; session?: string };
type Pane = { pane_id: string; workspace_id: string; tab_id: string; cwd: string; foreground_cwd?: string; agent?: string; agent_status?: string; agent_session?: { value?: string } };
const herdr = (...args: string[]) => JSON.parse(execFileSync("herdr", args, { stdio: ["ignore", "pipe", "pipe"] }).toString()).result;
const PROJECTS = join(homedir(), "Projects");
const slug = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "sala";
/** The folder whose .vibebook points at this room (~/Projects, two levels down), else ~/Projects/<title slug>. */
function roomFolder(room: string, title: string) {
  const look = (dir: string, depth: number): string | undefined => {
    let names: string[] = [];
    try {
      names = readdirSync(dir);
    } catch {
      return;
    }
    if (names.includes(".vibebook")) {
      try {
        if (linkedRoom(dir) === room) return dir;
      } catch {}
    }
    if (depth === 0) return;
    for (const n of names) if (!n.startsWith(".") && n !== "node_modules" && n !== "_archive") {
      const f = look(join(dir, n), depth - 1);
      if (f) return f;
    }
  };
  return look(PROJECTS, 2) ?? join(PROJECTS, slug(title));
}
/** Link the folder to the room (.vibebook), kept out of git when it's a repo that doesn't track it. */
function linkFolder(folder: string, room: string) {
  mkdirSync(folder, { recursive: true });
  const f = join(folder, ".vibebook");
  try {
    if (linkedRoom(folder) === room) return;
  } catch {}
  writeFileSync(f, `room_id=${room}\n`);
  const exclude = join(folder, ".git", "info", "exclude");
  if (existsSync(exclude) && !readFileSync(exclude, "utf8").split("\n").includes(".vibebook")) appendFileSync(exclude, "\n.vibebook\n");
}
/** The terminal app hosting herdr (walk up from a herdr process to an .app), so "go to my Claude" can raise it. */
function terminalApp(): string | undefined {
  try {
    for (const pid of execFileSync("pgrep", ["-x", "herdr"]).toString().split(/\s+/).filter(Boolean)) {
      let p = pid;
      for (let i = 0; i < 10 && p && p !== "1"; i++) {
        const [ppid, ...cmd] = execFileSync("ps", ["-o", "ppid=,comm=", "-p", p]).toString().trim().split(/\s+/);
        const app = cmd.join(" ").match(/^(.*?\.app)\/Contents\/MacOS\//)?.[1];
        if (app) return app;
        p = ppid;
      }
    }
  } catch {}
}
/** Local endpoint for the app's "↗" button: focus this room's workspace in herdr and raise the terminal. Only the
 *  vibebook origin this machine is logged into may call it (CORS + Private Network Access preflight). */
function herdrServer() {
  const allowed = new Set([readJson<Session | null>(SESSION, null)?.origin ?? DEFAULT_ORIGIN, DEFAULT_ORIGIN]);
  const port = Number(process.env.VIBEBOOK_HERDR_PORT || 47321);
  createServer((req, res) => {
    const origin = req.headers.origin ?? "";
    const send = (code: number, body: unknown) => {
      res.writeHead(code, { "content-type": "application/json", ...(allowed.has(origin) ? { "access-control-allow-origin": origin, "access-control-allow-private-network": "true", vary: "origin" } : {}) });
      res.end(JSON.stringify(body));
    };
    if (!allowed.has(origin)) return send(403, { error: "origin" });
    if (req.method === "OPTIONS") return send(204, null);
    const u = new URL(req.url ?? "/", "http://127.0.0.1");
    const map = readJson<Record<string, HerdrRoom>>(HERDR, {});
    if (u.pathname === "/ping") return send(200, { ok: true, rooms: Object.keys(map).filter((r) => map[r].workspace) });
    if (u.pathname !== "/focus") return send(404, { error: "not found" });
    const ws = map[u.searchParams.get("room") ?? ""]?.workspace;
    if (!ws) return send(404, { error: "Nenhum Claude aberto pra essa sala no herdr." });
    try {
      herdr("workspace", "focus", ws);
      const app = terminalApp();
      if (app) execFileSync("open", ["-a", app]);
      send(200, { ok: true });
    } catch (e) {
      send(500, { error: String((e as Error).message ?? e) });
    }
  })
    .on("error", (e) => process.stderr.write(`vibebook herdr: botão "ir pro Claude" desligado (${(e as Error).message})\n`))
    .listen(port, "127.0.0.1");
}
async function herdrSync(agent: string, tools: Tool[]) {
  const res = await callTool("claude_rooms", {}, agent, tools);
  const rooms = (JSON.parse(res.content[0]?.text ?? "{}") as { rooms?: { room_id: string; title: string; on: boolean }[] }).rooms ?? [];
  const map = readJson<Record<string, HerdrRoom>>(HERDR, {});
  const live = new Set((herdr("workspace", "list").workspaces as { workspace_id: string }[]).map((w) => w.workspace_id));
  const panes = herdr("pane", "list").panes as Pane[];
  const on = new Map(rooms.filter((r) => r.on).map((r) => [r.room_id, r.title]));
  const log = (m: string) => process.stdout.write(`${new Date().toLocaleTimeString()} ${m}\n`);
  for (const [room, title] of on) {
    const e = (map[room] ??= {});
    if (e.workspace && live.has(e.workspace)) continue;
    e.folder ??= roomFolder(room, title);
    linkFolder(e.folder, room);
    // A Claude already open in that folder: adopt its workspace (and ask it to listen) instead of opening a second one.
    const there = panes.find((p) => p.agent === "claude" && (p.cwd === e.folder || p.foreground_cwd === e.folder));
    if (there) {
      e.workspace = there.workspace_id;
      try {
        herdr("workspace", "rename", there.workspace_id, title.slice(0, 40)); // the tab says which room it is
      } catch {}
      log(`${title}: adotei o Claude que já estava em ${e.folder}`);
      if (there.agent_status === "idle" || there.agent_status === "done")
        try {
          herdr("agent", "prompt", there.pane_id, "/vibebook:listen");
        } catch {}
      continue;
    }
    const w = herdr("workspace", "create", "--cwd", e.folder, "--label", title.slice(0, 40), "--no-focus");
    e.workspace = w.workspace.workspace_id as string;
    const args = ["agent", "start", `vb-${room}`, "--kind", "claude", "--pane", w.root_pane.pane_id, "--timeout", "60000", "--"];
    if (e.session) args.push("--resume", e.session);
    writePrivate(HERDR, map); // the workspace exists now: never open a second one if the start below fails
    try {
      herdr(...args, "/vibebook:listen");
      log(`${title}: abri um Claude em ${e.folder}${e.session ? " (retomando a conversa)" : ""}`);
    } catch (err) {
      // Usually Claude Code's "trust this folder?" for a new folder: that answer is the person's, in herdr.
      log(`${title}: Claude aberto em ${e.folder}, esperando você confirmar no herdr (${String((err as { stderr?: Buffer }).stderr ?? err).match(/"message":"([^"]+)"/)?.[1] ?? "não ficou pronto"})`);
    }
  }
  for (const [room, e] of Object.entries(map)) {
    if (on.has(room) || !e.workspace) continue;
    if (live.has(e.workspace)) {
      const p = panes.find((x) => x.workspace_id === e.workspace && x.agent === "claude");
      if (p?.agent_session?.value) e.session = p.agent_session.value;
      herdr("workspace", "close", e.workspace);
      log(`${rooms.find((r) => r.room_id === room)?.title ?? room}: Claude desligado, fechei a aba (a conversa fica pra retomar)`);
    }
    delete e.workspace;
  }
  writePrivate(HERDR, map);
  herdrOrder([...on.keys()], map);
}
/** Put the rooms' workspaces in the person's room order (others stay where they are). herdr can't reorder
 *  workspaces, but a pane can move into a new workspace (appended at the end) with its process alive: so from the
 *  first one out of place, each room's panes move to a fresh workspace, in order. Claude keeps running. */
function herdrOrder(order: string[], map: Record<string, HerdrRoom>) {
  type Ws = { workspace_id: string; label: string; focused: boolean };
  const list = herdr("workspace", "list").workspaces as Ws[];
  const ours = new Map(order.filter((r) => map[r]?.workspace).map((r) => [map[r].workspace as string, r]));
  const current = list.filter((w) => ours.has(w.workspace_id)).map((w) => w.workspace_id);
  const desired = order.map((r) => map[r]?.workspace).filter((w): w is string => !!w && current.includes(w));
  // Only the order among ours matters (other workspaces may sit in between); move from the first one out of place.
  let i = 0;
  while (i < desired.length && current[i] === desired[i]) i++;
  if (i === desired.length) return;
  const focused = list.find((w) => w.focused)?.workspace_id;
  let refocus: string | undefined;
  const tabs = herdr("tab", "list").tabs as { tab_id: string; workspace_id: string; label: string }[];
  for (const ws of desired.slice(i)) {
    const room = ours.get(ws) as string;
    const panes = (herdr("pane", "list").panes as Pane[]).filter((p) => p.workspace_id === ws);
    let newWs: string | undefined;
    const newTab = new Map<string, string>();
    for (const p of panes) {
      const tabLabel = tabs.find((t) => t.tab_id === p.tab_id)?.label ?? "1";
      let r: any;
      if (!newWs) r = herdr("pane", "move", p.pane_id, "--new-workspace", "--label", list.find((w) => w.workspace_id === ws)?.label ?? room, "--tab-label", tabLabel);
      else if (newTab.has(p.tab_id)) r = herdr("pane", "move", p.pane_id, "--tab", newTab.get(p.tab_id) as string, "--split", "right", "--no-focus");
      else r = herdr("pane", "move", p.pane_id, "--new-tab", "--workspace", newWs, "--label", tabLabel, "--no-focus");
      const moved = r.move_result.pane as { workspace_id: string; tab_id: string };
      newWs = moved.workspace_id;
      newTab.set(p.tab_id, moved.tab_id);
    }
    if (newWs) {
      map[room].workspace = newWs;
      if (ws === focused) refocus = newWs;
    }
  }
  writePrivate(HERDR, map);
  // Moving into a new workspace focuses it; give the person back the one they were in.
  const back = refocus ?? focused;
  if (back)
    try {
      herdr("workspace", "focus", back);
    } catch {}
  process.stdout.write(`${new Date().toLocaleTimeString()} reordenei ${desired.length - i} workspace(s) na ordem das salas\n`);
}

const HELP = `vibebook ${VERSION}: your vibebook rooms from the terminal (for you and your Claude).

  vibebook login                 connect this machine (opens the browser; once per machine)
  vibebook logout
  vibebook status                who/where: origin, this folder's room and agent
  vibebook tools [filter]        list the room tools
  vibebook describe <tool>       a tool's arguments
  vibebook call <tool> ['{json}' | -d @file | -d @-]
                                 run a tool; room_id, repo and model are filled in from this folder
  vibebook listen [--room <id>]  wait until the room has messages you haven't read, print them, exit
  vibebook upload <file> [--message ".."] [--thread <epic>] [--room <id>]
  vibebook herdr [--once]        keep one Claude Code per room in herdr: opens it when you switch
                                 "Meu Claude" on in the app, closes it when you switch it off
  vibebook update                install the latest version

Options: --model "Claude Opus 5.5" (or VIBEBOOK_MODEL) names the agent in the room; --origin for a local server.`;

async function main() {
  const cmd = flags.version ? "version" : pos[0];
  const root = repoRoot();
  const agent = agentId(root);
  switch (cmd) {
    case "login": {
      const origin = (flag("origin") ?? DEFAULT_ORIGIN).replace(/\/$/, "");
      await login(origin);
      process.stdout.write(`Conectado a ${origin}. Toda sessão do Claude nesta máquina usa este login.\n`);
      return;
    }
    case "logout":
      writePrivate(SESSION, null);
      process.stdout.write("Desconectado nesta máquina.\n");
      return;
    case "status": {
      const s = readJson<Session | null>(SESSION, null);
      process.stdout.write(`${JSON.stringify({ logged_in: !!s, origin: s?.origin ?? null, folder: root, room: roomHere(root) ?? null, agent, version: VERSION }, null, 2)}\n`);
      return;
    }
    case "tools": {
      const f = (pos[1] ?? "").toLowerCase();
      for (const t of await listTools(agent)) if (!f || t.name.includes(f) || t.description.toLowerCase().includes(f)) process.stdout.write(`${t.name}\t${t.description.split(/(?<=\.)\s/)[0]}\n`);
      return;
    }
    case "describe": {
      const t = (await listTools(agent)).find((x) => x.name === pos[1]);
      if (!t) return die(`unknown tool ${pos[1]}; see: vibebook tools`);
      process.stdout.write(`${JSON.stringify(t, null, 2)}\n`);
      return;
    }
    case "call": {
      if (!pos[1]) return die("usage: vibebook call <tool> '{json}'");
      printResult(await callTool(pos[1], readData(), agent));
      return;
    }
    case "listen": {
      // One-shot: returns when a room has messages this agent hasn't read (run it in the background and start it
      // again after handling). Network trouble waits and retries; only a rejected session stops it.
      const room = flag("room") ?? roomHere(root);
      const tools = await listTools(agent);
      for (;;) {
        try {
          const res = await callTool("wait_for_messages", { timeout_seconds: 50, ...(room ? { room_id: room } : {}) }, agent, tools);
          const out = JSON.parse(res.content[0]?.text ?? "{}") as { new?: { room_id: string; title: string; new_messages: number; url?: string }[] };
          if (out.new?.length) {
            for (const r of out.new) process.stdout.write(`vibebook: ${r.new_messages} nova(s) em "${r.title}" room_id=${r.room_id}${r.url ? ` ${r.url}` : ""}\n`);
            return;
          }
        } catch (e) {
          await new Promise((r) => setTimeout(r, 15_000));
        }
      }
    }
    case "herdr": {
      try {
        execFileSync("herdr", ["status"], { stdio: "ignore" });
      } catch {
        return die("herdr not found or not running (https://herdr.dev)");
      }
      const tools = await listTools(agent);
      if (!flags.once) herdrServer();
      for (;;) {
        try {
          await herdrSync(agent, tools);
        } catch (e) {
          process.stderr.write(`vibebook herdr: ${String((e as Error)?.message ?? e)}\n`);
        }
        if (flags.once) return;
        await new Promise((r) => setTimeout(r, 15_000));
      }
    }
    case "upload": {
      const file = pos[1];
      if (!file || !existsSync(file)) return die("usage: vibebook upload <file> [--message ..] [--thread ..]");
      const ext = file.toLowerCase().split(".").pop() ?? "";
      const type = ({ png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif", pdf: "application/pdf", html: "text/html" } as Record<string, string>)[ext];
      if (!type) return die("only png, jpg, webp, gif, pdf or html");
      const args: Record<string, unknown> = { filename: basename(file), content_type: type };
      if (flag("room")) args.room_id = flag("room");
      if (flag("message")) args.message = flag("message");
      if (flag("thread")) args.thread = flag("thread");
      const res = await callTool("upload_link", args, agent);
      const link = JSON.parse(res.content[0]?.text ?? "{}") as { url?: string; error?: string };
      if (!link.url) return die(res.content[0]?.text ?? "no upload link");
      const put = await fetch(link.url, { method: "PUT", headers: { "content-type": type }, body: readFileSync(file) });
      process.stdout.write(`${await put.text()}\n`);
      if (!put.ok) process.exit(1);
      return;
    }
    case "update": {
      // Installed from npm (vibebook.dev): npm updates it. Installed by install.sh: re-download ~/.vibebook/cli.mjs.
      if (!import.meta.url.startsWith(`file://${HOME}`)) {
        process.stdout.write("Instalado pelo npm: rode npm i -g vibebook.dev@latest (ou bun add -g vibebook.dev@latest).\n");
        return;
      }
      const s = readJson<Session | null>(SESSION, null);
      const origin = (flag("origin") ?? s?.origin ?? DEFAULT_ORIGIN).replace(/\/$/, "");
      const r = await fetch(`${origin}/cli.mjs`);
      if (!r.ok) return die(`could not download: ${r.status}`);
      writeFileSync(join(HOME, "cli.mjs"), await r.text());
      process.stdout.write("Atualizado.\n");
      return;
    }
    case "version":
    case "--version":
      process.stdout.write(`${VERSION}\n`);
      return;
    default:
      process.stdout.write(`${HELP}\n`);
      if (cmd && cmd !== "help" && !flags.help) process.exit(1);
  }
}
main().catch((e) => die(String(e?.message ?? e)));
