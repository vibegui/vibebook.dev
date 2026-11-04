#!/usr/bin/env node
// vibebook CLI: one login per machine (OAuth + PKCE, refreshed on its own), the room tools discovered at run time,
// and `listen` for the room linked to this folder. Agents call it through Bash; the token never reaches them.
// Built into public/cli.mjs (bun run build:cli); on npm as vibebook.dev (npm i -g vibebook.dev), or installed by https://vibebook.dev/install.sh.
import { execSync, spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";

const VERSION = "1.0.1";
const HOME = process.env.VIBEBOOK_HOME || join(homedir(), ".vibebook");
const SESSION = join(HOME, "session.json");
const AGENTS = join(HOME, "agents.json");
const DEFAULT_ORIGIN = "https://vibebook.dev";

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
