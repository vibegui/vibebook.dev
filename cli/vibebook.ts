#!/usr/bin/env node
// vibebook CLI: one login per machine (OAuth + PKCE, refreshed on its own), the room tools discovered at run time,
// and `listen` for the room linked to this folder. Agents call it through Bash; the token never reaches them.
// Built into public/cli.mjs (bun run build:cli); on npm as vibebook.dev (npm i -g vibebook.dev), or installed by https://vibebook.dev/install.sh.
import { execFileSync, execSync, spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { appendFileSync, chmodSync, closeSync, existsSync, fstatSync, mkdirSync, openSync, readdirSync, readFileSync, readSync, renameSync, rmSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";

const VERSION = "1.4.0";
const HOME = process.env.VIBEBOOK_HOME || join(homedir(), ".vibebook");
const SESSION = join(HOME, "session.json");
const AGENTS = join(HOME, "agents.json");
const DEFAULT_ORIGIN = "https://vibebook.dev";
const HERDR = join(HOME, "herdr.json");

type Session = { origin: string; client_id: string; access_token: string; refresh_token?: string; expires_at: number };
type Tool = { name: string; description: string; inputSchema: { properties?: Record<string, { description?: string }>; required?: string[] } };

// `vibebook call` answers in JSON even when it fails, so `| jq` shows the error instead of "parse error".
let jsonErrors = false;
const die = (msg: string, code = 1): never => {
  if (jsonErrors) process.stdout.write(`${JSON.stringify({ ok: false, error: msg })}\n`);
  else process.stderr.write(`${msg}\n`);
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
  // Written aside and renamed in place: another vibebook process never reads half a file.
  const tmp = `${f}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), { mode: 0o600 });
  chmodSync(tmp, 0o600);
  renameSync(tmp, f);
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
const linkedRoom = (root: string) => readFileSync(join(root, ".vibebook"), "utf8").match(/^room_id=([a-z0-9]+)/m)?.[1];
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
// --code-file (a cloud sandbox vibebook created): the server already authorized this machine for its person and left
// {origin, client_id, code, verifier, redirect} in a 0600 file; the CLI redeems it with PKCE and deletes the file.
async function loginFromFile(path: string) {
  const f = readJson<{ origin: string; client_id: string; code: string; verifier: string; redirect: string } | null>(path, null);
  if (!f?.code) return die(`no login in ${path}`);
  try { rmSync(path); } catch {}
  await finishLogin(f.origin, f.redirect, f.verifier, "", "", async () => "", { client_id: f.client_id, code: f.code });
  return f.origin;
}
// --paste (a machine whose loopback the browser can't reach: a cloud sandbox, SSH): the consent page redirects to
// <origin>/oauth/code, which shows the code, and the person pastes it here.
async function login(origin: string, paste = false) {
  const verifier = b64url(randomBytes(32));
  const challenge = b64url(createHash("sha256").update(verifier).digest());
  const state = b64url(randomBytes(16));
  if (paste) return finishLogin(origin, `${origin}/oauth/code`, verifier, challenge, state, async (url) => {
    process.stderr.write(`Abra este link no navegador, autorize e cole aqui o código que aparecer:\n\n${url}\n\nCódigo: `);
    const line = await new Promise<string>((res) => process.stdin.once("data", (d) => res(String(d))));
    process.stdin.pause();
    return line.trim();
  });
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
  return finishLogin(origin, `http://127.0.0.1:${port}/callback`, verifier, challenge, state, async (url) => {
    process.stderr.write(`Abrindo o navegador para conectar. Se não abrir, acesse:\n${url}\n`);
    openBrowser(url);
    const timer = setTimeout(() => rejectCode(new Error("timed out after 5 minutes")), 5 * 60_000);
    return got.finally(() => (clearTimeout(timer), server.close()));
  });
}
async function finishLogin(origin: string, redirect: string, verifier: string, challenge: string, state: string, getCode: (url: string) => Promise<string>, preset?: { client_id: string; code: string }) {
  if (preset) return exchange(origin, redirect, verifier, preset.client_id, preset.code);
  const reg = await fetch(`${origin}/oauth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ client_name: "vibebook CLI", redirect_uris: [redirect], token_endpoint_auth_method: "none", grant_types: ["authorization_code", "refresh_token"], response_types: ["code"] }),
  });
  if (!reg.ok) die(`could not register with ${origin}: ${reg.status} ${await reg.text()}`);
  const { client_id } = (await reg.json()) as { client_id: string };
  const url = `${origin}/authorize?${new URLSearchParams({ response_type: "code", client_id, redirect_uri: redirect, code_challenge: challenge, code_challenge_method: "S256", state, scope: "rooms offline_access", resource: `${origin}/mcp` })}`;
  const code = await getCode(url);
  if (!code) die("no code");
  return exchange(origin, redirect, verifier, client_id, code);
}
async function exchange(origin: string, redirect: string, verifier: string, client_id: string, code: string) {
  const tok = await fetch(`${origin}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirect, client_id, code_verifier: verifier, resource: `${origin}/mcp` }),
  });
  if (!tok.ok) die(`login failed: ${tok.status} ${await tok.text()}`);
  const t = (await tok.json()) as { access_token: string; refresh_token?: string; expires_in?: number };
  writePrivate(SESSION, { origin, client_id, access_token: t.access_token, refresh_token: t.refresh_token, expires_at: Date.now() + (t.expires_in ?? 3600) * 1000 } satisfies Session);
}
// Several vibebook processes share one session (listen, herdr, every call): only one may spend the refresh token,
// or the others' copies die with it. A lock dir serializes the refresh; whoever waited re-reads the fresh tokens.
const fresh = (s: Session | null) => !!s && Date.now() < s.expires_at - 60_000;
async function session(): Promise<Session> {
  let s = readJson<Session | null>(SESSION, null);
  if (!s) return die("Not logged in. Ask your human to run, in their own terminal: vibebook login");
  if (fresh(s)) return s;
  const lock = `${SESSION}.lock`;
  for (let i = 0; ; i++) {
    try {
      mkdirSync(lock);
      break;
    } catch {
      try {
        if (Date.now() - statSync(lock).mtimeMs > 30_000) rmSync(lock, { recursive: true, force: true }); // a crashed refresher
      } catch {}
      if (i > 100) return die("vibebook session is locked by another process; try again in a moment", 75);
      await new Promise((r) => setTimeout(r, 100));
      const again = readJson<Session | null>(SESSION, null);
      if (fresh(again)) return again as Session;
    }
  }
  const quit = (m: string, code?: number): never => (rmSync(lock, { recursive: true, force: true }), die(m, code));
  try {
    s = readJson<Session | null>(SESSION, null) ?? s;
    if (fresh(s)) return s;
    if (!s.refresh_token) return quit("Session expired. Ask your human to run, in their own terminal: vibebook login");
    const r = await fetch(`${s.origin}/oauth/token`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: s.refresh_token, client_id: s.client_id }),
    });
    if (r.status === 400 || r.status === 401) return quit("Could not refresh the session. Ask your human to run, in their own terminal: vibebook login");
    if (!r.ok) return quit(`vibebook unreachable (${r.status}); try again in a moment`, 75);
    const t = (await r.json()) as { access_token: string; refresh_token?: string; expires_in?: number };
    const next = { ...s, access_token: t.access_token, refresh_token: t.refresh_token ?? s.refresh_token, expires_at: Date.now() + (t.expires_in ?? 3600) * 1000 };
    writePrivate(SESSION, next);
    return next;
  } finally {
    rmSync(lock, { recursive: true, force: true });
  }
}

// ---- How full a Claude Code session's context is ----
// The transcript (~/.claude/projects/<folder>/<session>.jsonl) logs each model call's usage: the newest one's input
// (fresh + cached) is what the context holds now. A /compact after it means "just emptied". The window isn't in the
// transcript: 1M (Claude 5), or VIBEBOOK_CONTEXT_WINDOW.
const CTX_WINDOW = Number(process.env.VIBEBOOK_CONTEXT_WINDOW) || 1_000_000;
function sessionContext(sid: string): { tokens: number; window: number } | undefined {
  if (!/^[\w-]{8,80}$/.test(sid)) return;
  try {
    const root = join(homedir(), ".claude", "projects");
    const dir = readdirSync(root).find((d) => existsSync(join(root, d, `${sid}.jsonl`)));
    if (!dir) return;
    const fd = openSync(join(root, dir, `${sid}.jsonl`), "r");
    const size = fstatSync(fd).size;
    const n = Math.min(size, 4 << 20); // the tail is enough: one usage line per model call
    const buf = Buffer.alloc(n);
    readSync(fd, buf, 0, n, size - n);
    closeSync(fd);
    const lines = buf.toString("utf8").split("\n");
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('"compact_boundary"')) return { tokens: 0, window: CTX_WINDOW };
      if (!lines[i].includes('"usage"')) continue;
      try {
        const u = JSON.parse(lines[i])?.message?.usage;
        if (u) return { tokens: (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0), window: CTX_WINDOW };
      } catch {} // the first line of the tail is usually cut
    }
  } catch {}
}
// Claude Code hands its statusLine command what the transcript lacks: the model's context window and the plan's
// limits (5-hour and weekly, % used + reset). `vibebook statusline [your command]` keeps them per session in
// ~/.vibebook/status/<session>.json, then runs your command with the same input (its output is the statusline).
const STATUS = join(HOME, "status");
type Status = { window?: number; limits?: Record<string, { p: number; r: number }>; at: number };
function statusline() {
  const input = readFileSync(0);
  try {
    const j = JSON.parse(input.toString());
    if (/^[\w-]{8,80}$/.test(j.session_id ?? "")) {
      const limits: Status["limits"] = {};
      for (const k of ["five_hour", "seven_day"]) {
        const l = j.rate_limits?.[k];
        if (typeof l?.used_percentage === "number") limits[k] = { p: Math.round(l.used_percentage), r: Number(l.resets_at) || 0 };
      }
      mkdirSync(STATUS, { recursive: true });
      writeFileSync(join(STATUS, `${j.session_id}.json`), JSON.stringify({ window: Number(j.context_window?.context_window_size) || undefined, limits, at: Date.now() } satisfies Status));
    }
  } catch {}
  const rest = process.argv.slice(process.argv.indexOf("statusline") + 1).join(" ").trim();
  if (rest) process.stdout.write(execSync(rest, { input, stdio: ["pipe", "pipe", "ignore"] }));
}
const sessionStatus = (sid: string): Status | undefined => {
  if (!/^[\w-]{8,80}$/.test(sid)) return;
  const s = readJson<Status | null>(join(STATUS, `${sid}.json`), null);
  return s && Date.now() - s.at < 6 * 3600_000 ? s : undefined;
};
/** Sent with every call made from inside Claude Code, so the room can show this Claude's context bar (and, with
 *  the statusline wrapper, the plan's limits on hover). */
const myContext = (): Record<string, string> => {
  const sid = process.env.CLAUDE_CODE_SESSION_ID;
  const c = sid ? sessionContext(sid) : undefined;
  if (!sid || !c) return {};
  const st = sessionStatus(sid);
  const h: Record<string, string> = { "x-vibebook-context": `${c.tokens}/${st?.window ?? c.window}` };
  if (st?.limits && Object.keys(st.limits).length) h["x-vibebook-limits"] = JSON.stringify(st.limits);
  return h;
};

// ---- MCP over the CLI's session ----
let rpcId = 0;
async function rpc(method: string, params: unknown, agent: string): Promise<any> {
  const s = await session();
  const r = await fetch(`${s.origin}/mcp`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${s.access_token}`, "mcp-session-id": agent, ...myContext() },
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
  // search spans every room by default (its room_id means "only this one"), so the folder's room isn't filled in.
  if (props.includes("room_id") && args.room_id === undefined && name !== "search" && roomHere(root)) args.room_id = roomHere(root);
  if (props.includes("repo") && args.repo === undefined) args.repo = basename(root);
  const model = flag("model") ?? process.env.VIBEBOOK_MODEL;
  if (props.includes("model") && args.model === undefined && model) args.model = model;
  const res = (await rpc("tools/call", { name, arguments: args }, agent)) as { content: { type: string; text?: string; data?: string; mimeType?: string }[]; isError?: boolean };
  return res;
}
// Images (get_file) go to a temp file: the agent reads that file instead of getting base64 in its output.
const printResult = (res: { content: { type: string; text?: string; data?: string; mimeType?: string }[]; isError?: boolean }) => {
  for (const c of res.content) {
    if (c.type === "text") {
      let text = c.text ?? "";
      if (res.isError) try { JSON.parse(text); } catch { text = JSON.stringify({ ok: false, error: text }); }
      process.stdout.write(`${text}\n`);
    }
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
type HerdrRoom = { folder?: string; workspace?: string; session?: string; listening?: boolean; prompted_at?: number; deaf_since?: number; compacted_at?: number; plugin_v?: string; restarting_at?: number };
/** Context share at which the runner /compacts a free Claude (VIBEBOOK_COMPACT_AT, 0-1). */
const COMPACT_AT = Number(process.env.VIBEBOOK_COMPACT_AT) || 0.75;
// The vibebook plugin version Claude Code has installed: a Claude opened before an update still runs the old hooks
// (Claude Code loads them once), so the runner restarts it, resuming the conversation, as soon as it's free.
function pluginVersion() {
  try {
    const j = JSON.parse(readFileSync(join(homedir(), ".claude", "plugins", "installed_plugins.json"), "utf8"));
    return String((j.plugins ?? j)["vibebook@vibebook"]?.[0]?.version ?? "");
  } catch {
    return "";
  }
}
type Pane = { pane_id: string; workspace_id: string; tab_id: string; cwd: string; foreground_cwd?: string; agent?: string; agent_status?: string; agent_session?: { value?: string } };
const herdr = (...args: string[]) => JSON.parse(execFileSync("herdr", args, { stdio: ["ignore", "pipe", "pipe"] }).toString()).result;
const PROJECTS = join(homedir(), "Projects");
// What a Claude that's already running gets typed in. Plain words, not /vibebook:listen: a session that started
// before the plugin was installed (or with it disabled) answers "Unknown command" to the slash command.
const LISTEN_PROMPT = "Ouça a sala do vibebook desta pasta: rode `vibebook listen --model \"<seu modelo>\"` em background (Bash run_in_background); quando ele sair, `vibebook call read_room`, aja nas mensagens from_your_human e volte a ouvir. (Com o plugin, é o /vibebook:listen.)";
// A room's folder name: its first three meaningful words ("Viagem de avião para SP com os dogs" → viagem-aviao-sp).
const STOP = new Set("a o as os e de da do das dos para pra pro com em no na nos nas um uma por que the of for with and to in on at my our".split(" "));
const slug = (t: string) => {
  const words = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  return (words.filter((w) => !STOP.has(w)).slice(0, 3).join("-") || words.slice(0, 3).join("-")).slice(0, 32) || "sala";
};
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
function herdrServer(appMode = false) {
  const allowed = new Set([readJson<Session | null>(SESSION, null)?.origin ?? DEFAULT_ORIGIN, DEFAULT_ORIGIN]);
  const port = Number(process.env.VIBEBOOK_HERDR_PORT || 47321);
  createServer((req, res) => {
    const origin = req.headers.origin ?? "";
    const send = (code: number, body: unknown) => {
      res.writeHead(code, { "content-type": "application/json", ...(allowed.has(origin) ? { "access-control-allow-origin": origin, "access-control-allow-private-network": "true", vary: "origin" } : {}) });
      res.end(JSON.stringify(body));
    };
    // Origin: only the vibebook page. Host: only this exact loopback address (a DNS-rebound name is refused).
    if (!allowed.has(origin) || req.headers.host !== `127.0.0.1:${port}`) return send(403, { error: "origin" });
    if (req.method === "OPTIONS") return send(204, null);
    const u = new URL(req.url ?? "/", "http://127.0.0.1");
    const map = readJson<Record<string, HerdrRoom & { space?: string }>>(appMode ? HERDR_APP : HERDR, {});
    const target = (r: string) => (appMode ? map[r]?.space : map[r]?.workspace);
    if (u.pathname === "/ping") return send(200, { ok: true, rooms: Object.keys(map).filter((r) => target(r)) });
    // Where "Ligar Claude" will open this room: the folder it used before, the one linked by .vibebook, else
    // ~/Projects/<title slug> (how = new when that folder doesn't exist yet). Same rule herdrSync follows.
    if (u.pathname === "/where") {
      const room = u.searchParams.get("room") ?? "";
      if (!/^[a-z0-9]{6,40}$/.test(room)) return send(400, { error: "room" });
      const folder = map[room]?.folder ?? roomFolder(room, (u.searchParams.get("title") ?? "").slice(0, 200));
      const how = map[room]?.folder ? "used" : (() => { try { return linkedRoom(folder) === room; } catch { return false; } })() ? "linked" : existsSync(folder) ? "slug" : "new";
      return send(200, { folder, home: homedir(), how });
    }
    if (u.pathname !== "/focus") return send(404, { error: "not found" });
    const ws = target(u.searchParams.get("room") ?? "");
    if (!ws) return send(404, { error: "Nenhum Claude aberto pra essa sala no herdr." });
    try {
      if (appMode) {
        happ("do", "space.select", "--id", ws);
        execFileSync("open", ["-a", "Herdr"]);
        return send(200, { ok: true });
      }
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
  const rooms = (JSON.parse(res.content[0]?.text ?? "{}") as { rooms?: { room_id: string; title: string; on: boolean; listening?: boolean }[] }).rooms ?? [];
  const deaf = new Set(rooms.filter((r) => r.on && r.listening === false).map((r) => r.room_id));
  const map = readJson<Record<string, HerdrRoom>>(HERDR, {});
  const wsList = herdr("workspace", "list").workspaces as { workspace_id: string; label?: string }[];
  const live = new Set(wsList.map((w) => w.workspace_id));
  const panes = herdr("pane", "list").panes as Pane[];
  const on = new Map(rooms.filter((r) => r.on).map((r) => [r.room_id, r.title]));
  const log = (m: string) => process.stdout.write(`${new Date().toLocaleTimeString()} ${m}\n`);
  for (const [room, title] of on) {
    const e = (map[room] ??= {});
    if (e.workspace && live.has(e.workspace)) {
      // Renamed in the app: the tab follows.
      const label = wsList.find((w) => w.workspace_id === e.workspace)?.label;
      if (label !== undefined && label !== title.slice(0, 40))
        try {
          herdr("workspace", "rename", e.workspace, title.slice(0, 40));
          log(`${label} → ${title}: renomeei a aba`);
        } catch {}
      // Its listener died (the session expired, the loop crashed…): the server sees nobody listening. Once it's free,
      // ask again, at most every 5 minutes (a Claude that just started listening takes a moment to show up).
      // Deaf for a moment is normal (it's handling a message, or just restarted its listener): only 3 minutes in a row
      // of nobody listening counts.
      if (!deaf.has(room)) delete e.deaf_since;
      else e.deaf_since ??= Date.now();
      if (e.listening && e.deaf_since && Date.now() - e.deaf_since > 3 * 60_000 && Date.now() - (e.prompted_at ?? 0) > 5 * 60_000) e.listening = false;
      // Its Claude exited (the pane is back at a shell): start a new one there. Typing the listen prompt into zsh did
      // nothing and the room stayed "abrindo" forever. Two minutes of grace after a start, while Claude boots.
      const inWs = panes.filter((x) => x.workspace_id === e.workspace);
      if (inWs.length && !inWs.some((x) => x.agent === "claude") && Date.now() - (e.prompted_at ?? 0) > 2 * 60_000) {
        e.prompted_at = Date.now();
        e.listening = true;
        e.plugin_v = pluginVersion();
        const updating = !!e.restarting_at;
        delete e.deaf_since;
        delete e.restarting_at;
        writePrivate(HERDR, map);
        if (updating) log(`${title}: reabrindo o Claude com o plugin ${e.plugin_v} (mesma conversa)`);
        try {
          herdr("agent", "start", `vb-${room}`, "--kind", "claude", "--pane", inWs[0].pane_id, "--timeout", "15000", "--", ...(e.session ? ["--resume", e.session] : []), "/vibebook:listen");
          log(`${title}: o Claude tinha fechado, abri outro em ${e.folder ?? "sua pasta"}`);
        } catch (err) {
          const m = (err as Error).message;
          log(/timed out waiting for agent startup/.test(m) ? `${title}: o Claude tinha fechado, abrindo outro (demorou pra subir)` : `${title}: o Claude tinha fechado e não consegui abrir outro (${m.slice(0, 120)})`);
        }
        continue;
      }
      // Plugin updated since this Claude opened: once it's free, end it with /exit (its session kept) and the branch
      // above reopens it with --resume on the next pass. Never while it works or waits on a prompt.
      const pv = pluginVersion();
      const live0 = inWs.find((x) => x.agent === "claude");
      // /exit with its listener running asks "Background work is running": option 1 (exit and stop tasks) is selected.
      // Only that dialog gets an Enter (checked by its text), never a permission prompt.
      if (e.restarting_at && live0 && live0.agent_status === "blocked") {
        try {
          const shown = execFileSync("herdr", ["pane", "read", live0.pane_id, "--source", "visible", "--lines", "15"], { stdio: ["ignore", "pipe", "pipe"] }).toString();
          if (/Background work is running/.test(shown)) herdr("agent", "send-keys", live0.pane_id, "Enter");
        } catch {}
      }
      if (e.restarting_at && live0 && Date.now() - e.restarting_at > 5 * 60_000) {
        // /exit didn't take (it asked something, or got busy): leave this one on the old plugin rather than loop.
        delete e.restarting_at;
        e.plugin_v = pv;
        log(`${title}: não consegui reabrir o Claude pra atualizar o plugin; fica pra quando ele reabrir`);
      }
      if (pv && live0 && e.plugin_v !== pv && !e.restarting_at && (live0.agent_status === "idle" || live0.agent_status === "done") && live0.agent_session?.value) {
        e.session = live0.agent_session.value;
        e.restarting_at = Date.now();
        e.prompted_at = 0; // reopen on the next pass, no grace
        writePrivate(HERDR, map);
        try {
          herdr("agent", "prompt", live0.pane_id, "/exit");
          log(`${title}: plugin do vibebook atualizado (${e.plugin_v ?? "?"} → ${pv}); fechei o Claude livre pra reabrir com a mesma conversa`);
        } catch {}
        continue;
      }
      // Context nearly full: /compact it while it's free (a background listener survives it), at most every 15 min.
      // Nothing else gets typed this round.
      const cp = panes.find((x) => x.workspace_id === e.workspace && x.agent === "claude");
      const cs = cp?.agent_session?.value;
      const cx0 = cs ? sessionContext(cs) : undefined;
      const cx = cx0 && cs ? { ...cx0, window: sessionStatus(cs)?.window ?? cx0.window } : undefined;
      if (cp && cx && cx.tokens >= cx.window * COMPACT_AT && (cp.agent_status === "idle" || cp.agent_status === "done") && Date.now() - (e.compacted_at ?? 0) > 15 * 60_000) {
        try {
          herdr("agent", "prompt", cp.pane_id, "/compact");
          e.compacted_at = Date.now();
          log(`${title}: contexto em ${Math.round((cx.tokens / cx.window) * 100)}%, mandei /compact`);
        } catch {}
        continue;
      }
      // Adopted while busy: ask it to listen once it's free (a prompt typed into a working Claude would interrupt it).
      if (!e.listening) {
        const p = panes.find((x) => x.workspace_id === e.workspace && x.agent === "claude");
        if (p && (p.agent_status === "idle" || p.agent_status === "done"))
          try {
            herdr("agent", "prompt", p.pane_id, LISTEN_PROMPT);
            e.listening = true;
            e.prompted_at = Date.now();
            delete e.deaf_since;
            log(`${title}: o Claude ficou livre, pedi pra ele ouvir a sala`);
          } catch {}
      }
      continue;
    }
    e.listening = false;
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
          herdr("agent", "prompt", there.pane_id, LISTEN_PROMPT);
          e.listening = true;
          e.prompted_at = Date.now();
        } catch {}
      continue;
    }
    const w = herdr("workspace", "create", "--cwd", e.folder, "--label", title.slice(0, 40), "--no-focus");
    e.workspace = w.workspace.workspace_id as string;
    const args = ["agent", "start", `vb-${room}`, "--kind", "claude", "--pane", w.root_pane.pane_id, "--timeout", "60000", "--"];
    if (e.session) args.push("--resume", e.session);
    e.listening = true; // started with /vibebook:listen as its first prompt
    e.plugin_v = pluginVersion();
    e.prompted_at = Date.now();
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
// ---- herdr app (desktop) mode: `vibebook herdr --app` ----
// Same rooms, as spaces in the Herdr window (herdr-app + herdr-core): one space per room whose Claude is on, in the
// room's folder, started with `claude "/vibebook:listen"`; a space already open in that folder with a Claude in it is
// adopted. Off closes only the spaces it maps. Spaces follow the rail's order. ~/.vibebook/herdr-app.json maps them.
const HERDR_APP = join(HOME, "herdr-app.json");
type AppSpace = { id: string; name: string; folder: string; tabs: { terminals: { terminal: string; app: string | null; status: string | null }[] }[] };
const happ = (...args: string[]) => {
  const r = JSON.parse(execFileSync("herdr-app", args, { stdio: ["ignore", "pipe", "pipe"] }).toString());
  if (r?.error) throw new Error(r.error);
  return r;
};
const appClaude = (sp: AppSpace) => sp.tabs.flatMap((t) => t.terminals).find((t) => /claude/i.test(t.app ?? ""));
async function herdrAppSync(agent: string, tools: Tool[]) {
  const res = await callTool("claude_rooms", {}, agent, tools);
  const rooms = (JSON.parse(res.content[0]?.text ?? "{}") as { rooms?: { room_id: string; title: string; on: boolean; listening?: boolean }[] }).rooms ?? [];
  const deaf = new Set(rooms.filter((r) => r.on && r.listening === false).map((r) => r.room_id));
  const map = readJson<Record<string, HerdrRoom & { space?: string }>>(HERDR_APP, {});
  let spaces = happ("ls").spaces as AppSpace[];
  const live = new Set(spaces.map((x) => x.id));
  const on = new Map(rooms.filter((r) => r.on).map((r) => [r.room_id, r.title]));
  const log = (m: string) => process.stdout.write(`${new Date().toLocaleTimeString()} ${m}\n`);
  for (const [room, title] of on) {
    const e = (map[room] ??= {});
    if (e.space && live.has(e.space)) {
      const name = spaces.find((x) => x.id === e.space)?.name;
      if (name !== undefined && name !== title.slice(0, 40))
        try {
          happ("do", "space.rename", "--id", e.space, "--name", title.slice(0, 40));
          log(`${name} → ${title}: renomeei o space`);
        } catch {}
      // Same as the terminal mode: nobody listening for 3 minutes and its Claude is free: ask it again (≤ every 5 min).
      if (!deaf.has(room)) delete e.deaf_since;
      else e.deaf_since ??= Date.now();
      const c = appClaude(spaces.find((x) => x.id === e.space) as AppSpace);
      if (c && e.deaf_since && Date.now() - e.deaf_since > 3 * 60_000 && Date.now() - (e.prompted_at ?? 0) > 5 * 60_000 && (c.status === "idle" || c.status === "done"))
        try {
          execFileSync("hc", ["send", c.terminal, LISTEN_PROMPT], { stdio: "ignore" });
          e.prompted_at = Date.now();
          log(`${title}: ninguém ouvindo, pedi pro Claude ouvir a sala de novo`);
        } catch {}
      continue;
    }
    e.folder ??= roomFolder(room, title);
    linkFolder(e.folder, room);
    const there = spaces.find((x) => x.folder === e.folder && appClaude(x));
    if (there) {
      e.space = there.id;
      try {
        happ("do", "space.rename", "--id", there.id, "--name", title.slice(0, 40));
      } catch {}
      const c = appClaude(there);
      if (c && (c.status === "idle" || c.status === "done"))
        try {
          execFileSync("hc", ["send", c.terminal, LISTEN_PROMPT], { stdio: "ignore" });
          e.prompted_at = Date.now();
        } catch {}
      log(`${title}: adotei o Claude que já estava em ${e.folder}`);
      continue;
    }
    const r = happ("do", "space.new", "--name", title.slice(0, 40), "--folder", e.folder, "--argv", JSON.stringify(["claude"]), "--task", "/vibebook:listen");
    e.space = r.space as string;
    e.prompted_at = Date.now();
    log(`${title}: abri um Claude em ${e.folder}`);
  }
  for (const [room, e] of Object.entries(map)) {
    if (on.has(room) || !e.space) continue;
    if (live.has(e.space)) {
      happ("do", "space.close", "--id", e.space, "--confirmed", "true");
      log(`${rooms.find((r) => r.room_id === room)?.title ?? room}: Claude desligado, fechei o space`);
    }
    delete e.space;
  }
  writePrivate(HERDR_APP, map);
  // The rooms' spaces first, in the rail's order (space.move keeps everything running).
  spaces = happ("ls").spaces as AppSpace[];
  const want = [...on.keys()].map((r) => map[r]?.space).filter((x): x is string => !!x && spaces.some((s) => s.id === x));
  want.forEach((id, i) => {
    if (spaces[i]?.id === id) return;
    happ("do", "space.move", "--id", id, "--index", String(i + 1));
    spaces = happ("ls").spaces as AppSpace[];
  });
}

/** Put the rooms' workspaces first, in the person's room order, and the other workspaces after them. herdr can't reorder
 *  workspaces, but a pane can move into a new workspace (appended at the end) with its process alive: so from the
 *  first one out of place, each room's panes move to a fresh workspace, in order. Claude keeps running. */
function herdrOrder(order: string[], map: Record<string, HerdrRoom>) {
  type Ws = { workspace_id: string; label: string; focused: boolean };
  const list = herdr("workspace", "list").workspaces as Ws[];
  const ours = new Map(order.filter((r) => map[r]?.workspace).map((r) => [map[r].workspace as string, r]));
  const current = list.map((w) => w.workspace_id);
  // The rooms first, in the person's order, then every other workspace as it was; move from the first one out of place.
  const desired = [...order.map((r) => map[r]?.workspace).filter((w): w is string => !!w && current.includes(w)), ...current.filter((w) => !ours.has(w))];
  let i = 0;
  while (i < desired.length && current[i] === desired[i]) i++;
  if (i === desired.length) return;
  const focused = list.find((w) => w.focused)?.workspace_id;
  let refocus: string | undefined;
  const tabs = herdr("tab", "list").tabs as { tab_id: string; workspace_id: string; label: string }[];
  for (const ws of desired.slice(i)) {
    const room = ours.get(ws);
    const panes = (herdr("pane", "list").panes as Pane[]).filter((p) => p.workspace_id === ws);
    let newWs: string | undefined;
    const newTab = new Map<string, string>();
    for (const p of panes) {
      const tabLabel = tabs.find((t) => t.tab_id === p.tab_id)?.label ?? "1";
      let r: any;
      if (!newWs) r = herdr("pane", "move", p.pane_id, "--new-workspace", "--label", list.find((w) => w.workspace_id === ws)?.label ?? room ?? "1", "--tab-label", tabLabel);
      else if (newTab.has(p.tab_id)) r = herdr("pane", "move", p.pane_id, "--tab", newTab.get(p.tab_id) as string, "--split", "right", "--no-focus");
      else r = herdr("pane", "move", p.pane_id, "--new-tab", "--workspace", newWs, "--label", tabLabel, "--no-focus");
      const moved = r.move_result.pane as { workspace_id: string; tab_id: string };
      newWs = moved.workspace_id;
      newTab.set(p.tab_id, moved.tab_id);
    }
    if (newWs) {
      if (room) map[room].workspace = newWs;
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
  process.stdout.write(`${new Date().toLocaleTimeString()} reordenei ${desired.length - i} workspace(s): salas na ordem do vibebook, depois o resto\n`);
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
  vibebook upload <file> [--message ".."] [--thread <epic>] [--room <id>] ['{"thread":"<epic>"}']
  vibebook herdr [--once]        keep one Claude Code per room in herdr: opens it when you switch
                                 "Meu Claude" on in the app, closes it when you switch it off
  vibebook herdr --app           the same in the Herdr desktop app: one space per room (not with the terminal one)
  vibebook statusline [command]  as Claude Code's statusLine: keeps the session's context window and plan
                                 limits for the room, then runs your own statusline command (if any) with the same input
  vibebook update                install the latest version

Options: --model "Claude Opus 5.5" (or VIBEBOOK_MODEL) names the agent in the room; --origin for a local server.`;

// ---- The hub: one WebSocket per machine for every listening Claude ----
// `vibebook listen` used to long-poll the server (a request every 50s, D1 checked every 3s, per Claude). Now the first
// listener starts `vibebook hub` (detached, one per machine: ~/.vibebook/hub.json), which keeps one hibernating socket
// on the person's channel and serves the local listeners: GET 127.0.0.1:<port>/wait?book=<room|*>&since=<gen> answers
// as soon as a message lands in that room (the server's {t:"me", book} poke), else after 50s. A listener then checks the
// server once (wait_for_messages timeout 0), and anyway every 10 min (missed pokes, presence, stalled tasks). Node
// without WebSocket (<22), or no hub: the old long-poll.
const HUB = join(HOME, "hub.json");
const hubPort = () => {
  const h = readJson<{ pid: number; port: number } | null>(HUB, null);
  if (!h) return null;
  try { process.kill(h.pid, 0); return h.port; } catch { return null; }
};
async function ensureHub(): Promise<number | null> {
  if (typeof WebSocket === "undefined" || process.env.VIBEBOOK_NO_HUB) return null;
  let port = hubPort();
  if (port) return port;
  spawn(process.execPath, [process.argv[1], "hub"], { detached: true, stdio: "ignore", env: process.env }).unref();
  for (let i = 0; i < 50 && !port; i++) { await new Promise((r) => setTimeout(r, 100)); port = hubPort(); }
  return port;
}
async function hub() {
  if (hubPort()) return; // one per machine
  let gen = 0, allGen = 0, lastUse = Date.now(), backoff = 1000;
  const books = new Map<string, number>();
  const waiters = new Set<{ book: string; done: () => void }>();
  const seen = (book: string) => (book === "*" ? gen : Math.max(books.get(book) ?? 0, allGen));
  const bump = (book?: string) => {
    gen++;
    if (book) books.set(book, gen); else allGen = gen;
    for (const w of [...waiters]) if (!book || w.book === "*" || w.book === book) { waiters.delete(w); w.done(); }
  };
  const server = createServer((req, res) => {
    lastUse = Date.now();
    const u = new URL(req.url ?? "/", "http://hub");
    const book = u.searchParams.get("book") || "*", since = Number(u.searchParams.get("since") ?? -1);
    const answer = (timeout = false) => { res.writeHead(200, { "content-type": "application/json" }); res.end(JSON.stringify({ gen, timeout })); };
    if (seen(book) > since) return answer();
    const w = { book, done: () => { clearTimeout(timer); answer(); } };
    const timer = setTimeout(() => { waiters.delete(w); answer(true); }, 50_000);
    waiters.add(w);
    req.on("close", () => { if (waiters.delete(w)) clearTimeout(timer); });
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  writePrivate(HUB, { pid: process.pid, port: (server.address() as { port: number }).port });
  const quit = () => { try { if (readJson<{ pid: number } | null>(HUB, null)?.pid === process.pid) unlinkSync(HUB); } catch {} process.exit(0); };
  process.on("SIGTERM", quit).on("SIGINT", quit);
  // Nobody listening for 15 min: go away (the next listener starts a fresh one).
  setInterval(() => { if (!waiters.size && Date.now() - lastUse > 15 * 60_000) quit(); }, 60_000);
  let sock: WebSocket | null = null, ping: ReturnType<typeof setInterval> | undefined;
  const connect = async () => {
    const s = await session();
    const ws = new (WebSocket as any)(`${s.origin.replace(/^http/, "ws")}/mcp`, { headers: { authorization: `Bearer ${s.access_token}` } }) as WebSocket;
    sock = ws;
    let closed = false;
    const again = () => { if (closed) return; closed = true; clearInterval(ping); setTimeout(() => connect().catch(again), backoff); backoff = Math.min(backoff * 2, 60_000); };
    ws.onopen = () => { backoff = 1000; bump(); ping = setInterval(() => { try { ws.send("ping"); } catch {} }, 45_000); }; // (re)connected: everyone checks once
    ws.onmessage = (e) => { try { const m = JSON.parse(String(e.data)); if (m.t === "me" && m.book) bump(m.book); } catch {} };
    ws.onclose = again;
    ws.onerror = again;
  };
  await connect().catch(() => setTimeout(() => connect().catch(() => {}), backoff));
  void sock;
}

async function main() {
  const cmd = flags.version ? "version" : pos[0];
  if (cmd === "statusline") return statusline();
  const root = repoRoot();
  const agent = agentId(root);
  switch (cmd) {
    case "login": {
      const origin = (flag("origin") ?? DEFAULT_ORIGIN).replace(/\/$/, "");
      const file = flag("code-file");
      if (file) { const o = await loginFromFile(file); process.stdout.write(`Conectado a ${o}.\n`); return; }
      await login(origin, !!flags.paste);
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
      jsonErrors = true;
      if (!pos[1]) return die("usage: vibebook call <tool> '{json}'");
      printResult(await callTool(pos[1], readData(), agent));
      return;
    }
    case "hub":
      return hub();
    case "listen": {
      // One-shot: returns when a room has messages this agent hasn't read (run it in the background and start it
      // again after handling). Network trouble waits and retries; only a rejected session stops it.
      const room = flag("room") ?? roomHere(root);
      // The shell that started us (a Claude's background task) can be killed while we wait: then nobody reads our
      // output, and before this we listened forever as an orphan (33 of them on one machine, Nov 2026), keeping the
      // agent "ouvindo" in the room. Parent gone: leave. Stopped by a signal: say which, so the Claude knows why.
      const parent = process.ppid;
      setInterval(() => { if (process.ppid !== parent) process.exit(0); }, 20_000).unref();
      for (const [sig, n] of [["SIGHUP", 1], ["SIGINT", 2], ["SIGTERM", 15]] as const)
        process.on(sig, () => { try { process.stdout.write(`vibebook listen: parado por ${sig} (rode de novo)\n`); } catch {} process.exit(128 + n); });
      const tools = await listTools(agent);
      // One server check: prints what woke us and says so (true), else false.
      const check = async (timeout: number) => {
        const res = await callTool("wait_for_messages", { timeout_seconds: timeout, ...(room ? { room_id: room } : {}) }, agent, tools);
        const out = JSON.parse(res.content[0]?.text ?? "{}") as { new?: { room_id: string; title: string; new_messages: number; url?: string }[]; stalled?: { room_id: string; epic: string; task: string; status: string }[]; next?: string };
        if (out.stalled?.length) {
          // Nothing new for a while, but tasks of your human sit half done: wake up and weigh them (≤1 an hour).
          const one = (t: string) => (t ?? "").replace(/[\p{Cc}"`]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 80);
          process.stdout.write(`vibebook: tarefas suas paradas (${out.stalled.length}). ${(out.next ?? "").replace(/[\p{Cc}`]/gu, " ").slice(0, 700)}\n`);
          for (const s of out.stalled) process.stdout.write(`- room_id=${s.room_id} épico "${one(s.epic)}": ${one(s.task)} (${s.status})\n`);
          return true;
        }
        if (out.new?.length) {
          // The title is written by room members: one line, no quotes (it lands in the agent's context as output).
          const title = (t: string) => (t ?? "").replace(/[\p{Cc}"`]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 60);
          for (const r of out.new) process.stdout.write(`vibebook: ${r.new_messages} nova(s) em "${title(r.title)}" room_id=${r.room_id}\n`);
          return true;
        }
        return false;
      };
      const port = await ensureHub();
      if (port) {
        const wait = async (since: number) => (await (await fetch(`http://127.0.0.1:${port}/wait?book=${room ?? "*"}&since=${since}`)).json()) as { gen: number; timeout: boolean };
        try {
          let since = (await wait(-1)).gen, last = 0, woke = true;
          for (;;) {
            if (woke || Date.now() - last > 10 * 60_000) {
              try { if (await check(0)) return; } catch { await new Promise((r) => setTimeout(r, 15_000)); }
              last = Date.now();
            }
            const r = await wait(since);
            woke = !r.timeout && r.gen > since;
            since = r.gen;
          }
        } catch {} // the hub went away: long-poll below
      }
      for (;;) {
        try {
          if (await check(50)) return;
        } catch (e) {
          await new Promise((r) => setTimeout(r, 15_000));
        }
      }
    }
    case "herdr": {
      const appMode = !!flags.app;
      try {
        if (appMode) happ("ls");
        else execFileSync("herdr", ["status"], { stdio: "ignore" });
      } catch {
        return die(appMode ? "Herdr (the desktop app) isn't open, or herdr-app isn't installed (https://herdr.dev)" : "herdr not found or not running (https://herdr.dev)");
      }
      // One runner per machine: a second one (the herdr plugin's pane plus a manual `vibebook herdr`) would open every
      // room twice. The pid file is released on exit; a stale one (dead pid) is taken over.
      const lock = join(HOME, "herdr.pid");
      const other = Number(existsSync(lock) ? readFileSync(lock, "utf8") : 0);
      if (other && other !== process.pid) {
        let alive = true;
        try { process.kill(other, 0); } catch { alive = false; }
        if (alive) return die(`vibebook herdr is already running (pid ${other}); one per machine is enough`);
      }
      writeFileSync(lock, String(process.pid));
      const release = () => { try { if (Number(readFileSync(lock, "utf8")) === process.pid) unlinkSync(lock); } catch {} };
      process.on("exit", release);
      for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"] as const) process.on(sig, () => process.exit(0));
      const tools = await listTools(agent);
      if (!flags.once) herdrServer(appMode);
      for (;;) {
        try {
          await (appMode ? herdrAppSync : herdrSync)(agent, tools);
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
      const type = ({ png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif", pdf: "application/pdf", html: "text/html", md: "text/markdown" } as Record<string, string>)[ext];
      if (!type) return die("only png, jpg, webp, gif, pdf, html or md");
      const args: Record<string, unknown> = { filename: basename(file), content_type: type };
      if (flag("room")) args.room_id = flag("room");
      if (flag("message")) args.message = flag("message");
      if (flag("thread")) args.thread = flag("thread");
      // Also takes the same JSON as `call` ({"thread":"<epic>","message":".."}): ignoring it once sent a screenshot to main.
      if (pos[2]) {
        let j: Record<string, unknown>;
        try { j = JSON.parse(pos[2]); } catch { return die(`not JSON: ${pos[2]}`); }
        for (const k of ["thread", "message", "room_id"]) if (j[k] != null) args[k] = j[k];
      }
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
