#!/usr/bin/env node

// cli/vibebook.ts
import { execFileSync, execSync, spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { appendFileSync, chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
var VERSION = "1.1.0";
var HOME = process.env.VIBEBOOK_HOME || join(homedir(), ".vibebook");
var SESSION = join(HOME, "session.json");
var AGENTS = join(HOME, "agents.json");
var DEFAULT_ORIGIN = "https://vibebook.dev";
var HERDR = join(HOME, "herdr.json");
var die = (msg, code = 1) => {
  process.stderr.write(`${msg}
`);
  process.exit(code);
};
var readJson = (f, fallback) => {
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return fallback;
  }
};
var writePrivate = (f, data) => {
  mkdirSync(dirname(f), { recursive: true, mode: 448 });
  writeFileSync(f, JSON.stringify(data, null, 2), { mode: 384 });
  chmodSync(f, 384);
};
var argv = process.argv.slice(2);
var flags = {};
var pos = [];
for (let i = 0;i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) {
    const [k, v] = a.slice(2).split("=", 2);
    if (v !== undefined)
      flags[k] = v;
    else if (argv[i + 1] !== undefined && !argv[i + 1].startsWith("--"))
      flags[k] = argv[++i];
    else
      flags[k] = true;
  } else if (a === "-d")
    flags.data = argv[++i] ?? "";
  else
    pos.push(a);
}
var flag = (k) => typeof flags[k] === "string" ? flags[k] : undefined;
function repoRoot() {
  try {
    return execSync("git rev-parse --show-toplevel", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return process.cwd();
  }
}
function linkedRoom(root) {
  const own = readFileSync(join(root, ".vibebook"), { encoding: "utf8", flag: "r" }).match(/^room_id=([a-z0-9]+)/m)?.[1];
  return own;
}
function roomHere(root) {
  try {
    const r = linkedRoom(root);
    if (r)
      return r;
  } catch {}
  for (const f of ["README.md", "AGENTS.md", "CLAUDE.md"]) {
    try {
      const m = readFileSync(join(root, f), "utf8").match(/vibebook\.dev\/b\/([a-z0-9]{12})/);
      if (m)
        return m[1];
    } catch {}
  }
  return;
}
function agentId(root) {
  const all = readJson(AGENTS, {});
  if (!all[root]) {
    all[root] = `s_${randomBytes(16).toString("hex")}`;
    writePrivate(AGENTS, all);
  }
  return all[root];
}
var b64url = (b) => b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
function openBrowser(url) {
  if (process.env.VIBEBOOK_NO_BROWSER)
    return;
  const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  try {
    spawn(cmd, args, { stdio: "ignore", detached: true }).unref();
  } catch {}
}
async function login(origin) {
  const verifier = b64url(randomBytes(32));
  const challenge = b64url(createHash("sha256").update(verifier).digest());
  const state = b64url(randomBytes(16));
  let resolveCode;
  let rejectCode;
  const got = new Promise((res, rej) => (resolveCode = res, rejectCode = rej));
  const server = createServer((req, res) => {
    const u = new URL(req.url ?? "/", "http://127.0.0.1");
    if (u.pathname !== "/callback")
      return res.writeHead(404).end();
    const ok = u.searchParams.get("state") === state && u.searchParams.get("code");
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(`<!doctype html><meta charset="utf-8"><body style="font:16px system-ui;padding:40px">${ok ? "vibebook conectado. Pode fechar esta aba e voltar ao terminal." : "Não deu certo. Volte ao terminal e rode <code>vibebook login</code> de novo."}</body>`);
    if (ok)
      resolveCode(u.searchParams.get("code"));
    else
      rejectCode(new Error(u.searchParams.get("error_description") || u.searchParams.get("error") || "state mismatch"));
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  const redirect = `http://127.0.0.1:${port}/callback`;
  const reg = await fetch(`${origin}/oauth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ client_name: "vibebook CLI", redirect_uris: [redirect], token_endpoint_auth_method: "none", grant_types: ["authorization_code", "refresh_token"], response_types: ["code"] })
  });
  if (!reg.ok)
    die(`could not register with ${origin}: ${reg.status} ${await reg.text()}`);
  const { client_id } = await reg.json();
  const url = `${origin}/authorize?${new URLSearchParams({ response_type: "code", client_id, redirect_uri: redirect, code_challenge: challenge, code_challenge_method: "S256", state, scope: "rooms offline_access", resource: `${origin}/mcp` })}`;
  process.stderr.write(`Abrindo o navegador para conectar. Se não abrir, acesse:
${url}
`);
  openBrowser(url);
  const timer = setTimeout(() => rejectCode(new Error("timed out after 5 minutes")), 5 * 60000);
  const code = await got.finally(() => (clearTimeout(timer), server.close()));
  const tok = await fetch(`${origin}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirect, client_id, code_verifier: verifier, resource: `${origin}/mcp` })
  });
  if (!tok.ok)
    die(`login failed: ${tok.status} ${await tok.text()}`);
  const t = await tok.json();
  writePrivate(SESSION, { origin, client_id, access_token: t.access_token, refresh_token: t.refresh_token, expires_at: Date.now() + (t.expires_in ?? 3600) * 1000 });
}
async function session() {
  const s = readJson(SESSION, null);
  if (!s)
    return die("Not logged in. Ask your human to run, in their own terminal: vibebook login");
  if (Date.now() < s.expires_at - 60000)
    return s;
  if (!s.refresh_token)
    return die("Session expired. Ask your human to run, in their own terminal: vibebook login");
  const r = await fetch(`${s.origin}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: s.refresh_token, client_id: s.client_id })
  });
  if (r.status === 400 || r.status === 401)
    return die("Could not refresh the session. Ask your human to run, in their own terminal: vibebook login");
  if (!r.ok)
    return die(`vibebook unreachable (${r.status}); try again in a moment`, 75);
  const t = await r.json();
  const next = { ...s, access_token: t.access_token, refresh_token: t.refresh_token ?? s.refresh_token, expires_at: Date.now() + (t.expires_in ?? 3600) * 1000 };
  writePrivate(SESSION, next);
  return next;
}
var rpcId = 0;
async function rpc(method, params, agent) {
  const s = await session();
  const r = await fetch(`${s.origin}/mcp`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${s.access_token}`, "mcp-session-id": agent },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++rpcId, method, params })
  });
  if (r.status === 401)
    return die("Session rejected. Ask your human to run, in their own terminal: vibebook login");
  if (r.status >= 500)
    throw Object.assign(new Error(`vibebook ${r.status}`), { transient: true });
  const j = await r.json();
  if (j.error)
    die(j.error.message);
  return j.result;
}
var listTools = async (agent) => (await rpc("tools/list", {}, agent)).tools;
async function callTool(name, args, agent, tools) {
  const t = (tools ?? await listTools(agent)).find((x) => x.name === name);
  if (!t)
    return die(`unknown tool ${name}; see: vibebook tools`);
  const props = Object.keys(t.inputSchema.properties ?? {});
  const root = repoRoot();
  if (props.includes("room_id") && args.room_id === undefined && roomHere(root))
    args.room_id = roomHere(root);
  if (props.includes("repo") && args.repo === undefined)
    args.repo = basename(root);
  const model = flag("model") ?? process.env.VIBEBOOK_MODEL;
  if (props.includes("model") && args.model === undefined && model)
    args.model = model;
  const res = await rpc("tools/call", { name, arguments: args }, agent);
  return res;
}
var printResult = (res) => {
  for (const c of res.content) {
    if (c.type === "text")
      process.stdout.write(`${c.text}
`);
    else if (c.data) {
      const f = join(tmpdir(), `vibebook-${randomBytes(4).toString("hex")}.${(c.mimeType ?? "").split("/")[1] || "bin"}`);
      writeFileSync(f, Buffer.from(c.data, "base64"));
      process.stdout.write(`${c.type} saved to ${f}
`);
    }
  }
  if (res.isError)
    process.exit(1);
};
function readData() {
  const d = flag("data") ?? pos[2];
  if (d === undefined)
    return {};
  const raw = d === "@-" ? readFileSync(0, "utf8") : d.startsWith("@") ? readFileSync(d.slice(1), "utf8") : d;
  try {
    const v = JSON.parse(raw);
    if (!v || typeof v !== "object" || Array.isArray(v))
      throw 0;
    return v;
  } catch {
    return die(`arguments must be a JSON object, e.g. '{"room_id":"abc"}' (or -d @file.json, -d @-)`);
  }
}
var herdr = (...args) => JSON.parse(execFileSync("herdr", args, { stdio: ["ignore", "pipe", "pipe"] }).toString()).result;
var PROJECTS = join(homedir(), "Projects");
var slug = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "sala";
function roomFolder(room, title) {
  const look = (dir, depth) => {
    let names = [];
    try {
      names = readdirSync(dir);
    } catch {
      return;
    }
    if (names.includes(".vibebook")) {
      try {
        if (linkedRoom(dir) === room)
          return dir;
      } catch {}
    }
    if (depth === 0)
      return;
    for (const n of names)
      if (!n.startsWith(".") && n !== "node_modules" && n !== "_archive") {
        const f = look(join(dir, n), depth - 1);
        if (f)
          return f;
      }
  };
  return look(PROJECTS, 2) ?? join(PROJECTS, slug(title));
}
function linkFolder(folder, room) {
  mkdirSync(folder, { recursive: true });
  const f = join(folder, ".vibebook");
  try {
    if (linkedRoom(folder) === room)
      return;
  } catch {}
  writeFileSync(f, `room_id=${room}
`);
  const exclude = join(folder, ".git", "info", "exclude");
  if (existsSync(exclude) && !readFileSync(exclude, "utf8").split(`
`).includes(".vibebook"))
    appendFileSync(exclude, `
.vibebook
`);
}
async function herdrSync(agent, tools) {
  const res = await callTool("claude_rooms", {}, agent, tools);
  const rooms = JSON.parse(res.content[0]?.text ?? "{}").rooms ?? [];
  const map = readJson(HERDR, {});
  const live = new Set(herdr("workspace", "list").workspaces.map((w) => w.workspace_id));
  const panes = herdr("pane", "list").panes;
  const on = new Map(rooms.filter((r) => r.on).map((r) => [r.room_id, r.title]));
  const log = (m) => process.stdout.write(`${new Date().toLocaleTimeString()} ${m}
`);
  for (const [room, title] of on) {
    const e = map[room] ??= {};
    if (e.workspace && live.has(e.workspace))
      continue;
    e.folder ??= roomFolder(room, title);
    linkFolder(e.folder, room);
    const there = panes.find((p) => p.agent === "claude" && (p.cwd === e.folder || p.foreground_cwd === e.folder));
    if (there) {
      e.workspace = there.workspace_id;
      try {
        herdr("workspace", "rename", there.workspace_id, title.slice(0, 40));
      } catch {}
      log(`${title}: adotei o Claude que já estava em ${e.folder}`);
      if (there.agent_status === "idle" || there.agent_status === "done")
        try {
          herdr("agent", "prompt", there.pane_id, "/vibebook:listen");
        } catch {}
      continue;
    }
    const w = herdr("workspace", "create", "--cwd", e.folder, "--label", title.slice(0, 40), "--no-focus");
    e.workspace = w.workspace.workspace_id;
    const args = ["agent", "start", `vb-${room}`, "--kind", "claude", "--pane", w.root_pane.pane_id, "--timeout", "60000", "--"];
    if (e.session)
      args.push("--resume", e.session);
    writePrivate(HERDR, map);
    try {
      herdr(...args, "/vibebook:listen");
      log(`${title}: abri um Claude em ${e.folder}${e.session ? " (retomando a conversa)" : ""}`);
    } catch (err) {
      log(`${title}: Claude aberto em ${e.folder}, esperando você confirmar no herdr (${String(err.stderr ?? err).match(/"message":"([^"]+)"/)?.[1] ?? "não ficou pronto"})`);
    }
  }
  for (const [room, e] of Object.entries(map)) {
    if (on.has(room) || !e.workspace)
      continue;
    if (live.has(e.workspace)) {
      const p = panes.find((x) => x.workspace_id === e.workspace && x.agent === "claude");
      if (p?.agent_session?.value)
        e.session = p.agent_session.value;
      herdr("workspace", "close", e.workspace);
      log(`${rooms.find((r) => r.room_id === room)?.title ?? room}: Claude desligado, fechei a aba (a conversa fica pra retomar)`);
    }
    delete e.workspace;
  }
  writePrivate(HERDR, map);
}
var HELP = `vibebook ${VERSION}: your vibebook rooms from the terminal (for you and your Claude).

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
      process.stdout.write(`Conectado a ${origin}. Toda sessão do Claude nesta máquina usa este login.
`);
      return;
    }
    case "logout":
      writePrivate(SESSION, null);
      process.stdout.write(`Desconectado nesta máquina.
`);
      return;
    case "status": {
      const s = readJson(SESSION, null);
      process.stdout.write(`${JSON.stringify({ logged_in: !!s, origin: s?.origin ?? null, folder: root, room: roomHere(root) ?? null, agent, version: VERSION }, null, 2)}
`);
      return;
    }
    case "tools": {
      const f = (pos[1] ?? "").toLowerCase();
      for (const t of await listTools(agent))
        if (!f || t.name.includes(f) || t.description.toLowerCase().includes(f))
          process.stdout.write(`${t.name}	${t.description.split(/(?<=\.)\s/)[0]}
`);
      return;
    }
    case "describe": {
      const t = (await listTools(agent)).find((x) => x.name === pos[1]);
      if (!t)
        return die(`unknown tool ${pos[1]}; see: vibebook tools`);
      process.stdout.write(`${JSON.stringify(t, null, 2)}
`);
      return;
    }
    case "call": {
      if (!pos[1])
        return die("usage: vibebook call <tool> '{json}'");
      printResult(await callTool(pos[1], readData(), agent));
      return;
    }
    case "listen": {
      const room = flag("room") ?? roomHere(root);
      const tools = await listTools(agent);
      for (;; ) {
        try {
          const res = await callTool("wait_for_messages", { timeout_seconds: 50, ...room ? { room_id: room } : {} }, agent, tools);
          const out = JSON.parse(res.content[0]?.text ?? "{}");
          if (out.new?.length) {
            for (const r of out.new)
              process.stdout.write(`vibebook: ${r.new_messages} nova(s) em "${r.title}" room_id=${r.room_id}${r.url ? ` ${r.url}` : ""}
`);
            return;
          }
        } catch (e) {
          await new Promise((r) => setTimeout(r, 15000));
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
      for (;; ) {
        try {
          await herdrSync(agent, tools);
        } catch (e) {
          process.stderr.write(`vibebook herdr: ${String(e?.message ?? e)}
`);
        }
        if (flags.once)
          return;
        await new Promise((r) => setTimeout(r, 15000));
      }
    }
    case "upload": {
      const file = pos[1];
      if (!file || !existsSync(file))
        return die("usage: vibebook upload <file> [--message ..] [--thread ..]");
      const ext = file.toLowerCase().split(".").pop() ?? "";
      const type = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif", pdf: "application/pdf", html: "text/html" }[ext];
      if (!type)
        return die("only png, jpg, webp, gif, pdf or html");
      const args = { filename: basename(file), content_type: type };
      if (flag("room"))
        args.room_id = flag("room");
      if (flag("message"))
        args.message = flag("message");
      if (flag("thread"))
        args.thread = flag("thread");
      const res = await callTool("upload_link", args, agent);
      const link = JSON.parse(res.content[0]?.text ?? "{}");
      if (!link.url)
        return die(res.content[0]?.text ?? "no upload link");
      const put = await fetch(link.url, { method: "PUT", headers: { "content-type": type }, body: readFileSync(file) });
      process.stdout.write(`${await put.text()}
`);
      if (!put.ok)
        process.exit(1);
      return;
    }
    case "update": {
      if (!import.meta.url.startsWith(`file://${HOME}`)) {
        process.stdout.write(`Instalado pelo npm: rode npm i -g vibebook.dev@latest (ou bun add -g vibebook.dev@latest).
`);
        return;
      }
      const s = readJson(SESSION, null);
      const origin = (flag("origin") ?? s?.origin ?? DEFAULT_ORIGIN).replace(/\/$/, "");
      const r = await fetch(`${origin}/cli.mjs`);
      if (!r.ok)
        return die(`could not download: ${r.status}`);
      writeFileSync(join(HOME, "cli.mjs"), await r.text());
      process.stdout.write(`Atualizado.
`);
      return;
    }
    case "version":
    case "--version":
      process.stdout.write(`${VERSION}
`);
      return;
    default:
      process.stdout.write(`${HELP}
`);
      if (cmd && cmd !== "help" && !flags.help)
        process.exit(1);
  }
}
main().catch((e) => die(String(e?.message ?? e)));
