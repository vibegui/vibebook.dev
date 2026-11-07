#!/usr/bin/env node

// cli/vibebook.ts
import { execFileSync, execSync, spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { appendFileSync, chmodSync, closeSync, existsSync, fstatSync, mkdirSync, openSync, readdirSync, readFileSync, readSync, renameSync, rmSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
var VERSION = "1.2.0";
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
  const tmp = `${f}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), { mode: 384 });
  chmodSync(tmp, 384);
  renameSync(tmp, f);
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
var linkedRoom = (root) => readFileSync(join(root, ".vibebook"), "utf8").match(/^room_id=([a-z0-9]+)/m)?.[1];
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
var fresh = (s) => !!s && Date.now() < s.expires_at - 60000;
async function session() {
  let s = readJson(SESSION, null);
  if (!s)
    return die("Not logged in. Ask your human to run, in their own terminal: vibebook login");
  if (fresh(s))
    return s;
  const lock = `${SESSION}.lock`;
  for (let i = 0;; i++) {
    try {
      mkdirSync(lock);
      break;
    } catch {
      try {
        if (Date.now() - statSync(lock).mtimeMs > 30000)
          rmSync(lock, { recursive: true, force: true });
      } catch {}
      if (i > 100)
        return die("vibebook session is locked by another process; try again in a moment", 75);
      await new Promise((r) => setTimeout(r, 100));
      const again = readJson(SESSION, null);
      if (fresh(again))
        return again;
    }
  }
  const quit = (m, code) => (rmSync(lock, { recursive: true, force: true }), die(m, code));
  try {
    s = readJson(SESSION, null) ?? s;
    if (fresh(s))
      return s;
    if (!s.refresh_token)
      return quit("Session expired. Ask your human to run, in their own terminal: vibebook login");
    const r = await fetch(`${s.origin}/oauth/token`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: s.refresh_token, client_id: s.client_id })
    });
    if (r.status === 400 || r.status === 401)
      return quit("Could not refresh the session. Ask your human to run, in their own terminal: vibebook login");
    if (!r.ok)
      return quit(`vibebook unreachable (${r.status}); try again in a moment`, 75);
    const t = await r.json();
    const next = { ...s, access_token: t.access_token, refresh_token: t.refresh_token ?? s.refresh_token, expires_at: Date.now() + (t.expires_in ?? 3600) * 1000 };
    writePrivate(SESSION, next);
    return next;
  } finally {
    rmSync(lock, { recursive: true, force: true });
  }
}
var CTX_WINDOW = Number(process.env.VIBEBOOK_CONTEXT_WINDOW) || 1e6;
function sessionContext(sid) {
  if (!/^[\w-]{8,80}$/.test(sid))
    return;
  try {
    const root = join(homedir(), ".claude", "projects");
    const dir = readdirSync(root).find((d) => existsSync(join(root, d, `${sid}.jsonl`)));
    if (!dir)
      return;
    const fd = openSync(join(root, dir, `${sid}.jsonl`), "r");
    const size = fstatSync(fd).size;
    const n = Math.min(size, 4 << 20);
    const buf = Buffer.alloc(n);
    readSync(fd, buf, 0, n, size - n);
    closeSync(fd);
    const lines = buf.toString("utf8").split(`
`);
    for (let i = lines.length - 1;i >= 0; i--) {
      if (lines[i].includes('"compact_boundary"'))
        return { tokens: 0, window: CTX_WINDOW };
      if (!lines[i].includes('"usage"'))
        continue;
      try {
        const u = JSON.parse(lines[i])?.message?.usage;
        if (u)
          return { tokens: (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0), window: CTX_WINDOW };
      } catch {}
    }
  } catch {}
}
var STATUS = join(HOME, "status");
function statusline() {
  const input = readFileSync(0);
  try {
    const j = JSON.parse(input.toString());
    if (/^[\w-]{8,80}$/.test(j.session_id ?? "")) {
      const limits = {};
      for (const k of ["five_hour", "seven_day"]) {
        const l = j.rate_limits?.[k];
        if (typeof l?.used_percentage === "number")
          limits[k] = { p: Math.round(l.used_percentage), r: Number(l.resets_at) || 0 };
      }
      mkdirSync(STATUS, { recursive: true });
      writeFileSync(join(STATUS, `${j.session_id}.json`), JSON.stringify({ window: Number(j.context_window?.context_window_size) || undefined, limits, at: Date.now() }));
    }
  } catch {}
  const rest = process.argv.slice(process.argv.indexOf("statusline") + 1).join(" ").trim();
  if (rest)
    process.stdout.write(execSync(rest, { input, stdio: ["pipe", "pipe", "ignore"] }));
}
var sessionStatus = (sid) => {
  if (!/^[\w-]{8,80}$/.test(sid))
    return;
  const s = readJson(join(STATUS, `${sid}.json`), null);
  return s && Date.now() - s.at < 6 * 3600000 ? s : undefined;
};
var myContext = () => {
  const sid = process.env.CLAUDE_CODE_SESSION_ID;
  const c = sid ? sessionContext(sid) : undefined;
  if (!sid || !c)
    return {};
  const st = sessionStatus(sid);
  const h = { "x-vibebook-context": `${c.tokens}/${st?.window ?? c.window}` };
  if (st?.limits && Object.keys(st.limits).length)
    h["x-vibebook-limits"] = JSON.stringify(st.limits);
  return h;
};
var rpcId = 0;
async function rpc(method, params, agent) {
  const s = await session();
  const r = await fetch(`${s.origin}/mcp`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${s.access_token}`, "mcp-session-id": agent, ...myContext() },
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
var COMPACT_AT = Number(process.env.VIBEBOOK_COMPACT_AT) || 0.75;
var herdr = (...args) => JSON.parse(execFileSync("herdr", args, { stdio: ["ignore", "pipe", "pipe"] }).toString()).result;
var PROJECTS = join(homedir(), "Projects");
var LISTEN_PROMPT = 'Ouça a sala do vibebook desta pasta: rode `vibebook listen --model "<seu modelo>"` em background (Bash run_in_background); quando ele sair, `vibebook call read_room`, aja nas mensagens from_your_human e volte a ouvir. (Com o plugin, é o /vibebook:listen.)';
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
function terminalApp() {
  try {
    for (const pid of execFileSync("pgrep", ["-x", "herdr"]).toString().split(/\s+/).filter(Boolean)) {
      let p = pid;
      for (let i = 0;i < 10 && p && p !== "1"; i++) {
        const [ppid, ...cmd] = execFileSync("ps", ["-o", "ppid=,comm=", "-p", p]).toString().trim().split(/\s+/);
        const app = cmd.join(" ").match(/^(.*?\.app)\/Contents\/MacOS\//)?.[1];
        if (app)
          return app;
        p = ppid;
      }
    }
  } catch {}
}
function herdrServer() {
  const allowed = new Set([readJson(SESSION, null)?.origin ?? DEFAULT_ORIGIN, DEFAULT_ORIGIN]);
  const port = Number(process.env.VIBEBOOK_HERDR_PORT || 47321);
  createServer((req, res) => {
    const origin = req.headers.origin ?? "";
    const send = (code, body) => {
      res.writeHead(code, { "content-type": "application/json", ...allowed.has(origin) ? { "access-control-allow-origin": origin, "access-control-allow-private-network": "true", vary: "origin" } : {} });
      res.end(JSON.stringify(body));
    };
    if (!allowed.has(origin) || req.headers.host !== `127.0.0.1:${port}`)
      return send(403, { error: "origin" });
    if (req.method === "OPTIONS")
      return send(204, null);
    const u = new URL(req.url ?? "/", "http://127.0.0.1");
    const map = readJson(HERDR, {});
    if (u.pathname === "/ping")
      return send(200, { ok: true, rooms: Object.keys(map).filter((r) => map[r].workspace) });
    if (u.pathname === "/where") {
      const room = u.searchParams.get("room") ?? "";
      if (!/^[a-z0-9]{6,40}$/.test(room))
        return send(400, { error: "room" });
      const folder = map[room]?.folder ?? roomFolder(room, (u.searchParams.get("title") ?? "").slice(0, 200));
      const how = map[room]?.folder ? "used" : (() => {
        try {
          return linkedRoom(folder) === room;
        } catch {
          return false;
        }
      })() ? "linked" : existsSync(folder) ? "slug" : "new";
      return send(200, { folder, home: homedir(), how });
    }
    if (u.pathname !== "/focus")
      return send(404, { error: "not found" });
    const ws = map[u.searchParams.get("room") ?? ""]?.workspace;
    if (!ws)
      return send(404, { error: "Nenhum Claude aberto pra essa sala no herdr." });
    try {
      herdr("workspace", "focus", ws);
      const app = terminalApp();
      if (app)
        execFileSync("open", ["-a", app]);
      send(200, { ok: true });
    } catch (e) {
      send(500, { error: String(e.message ?? e) });
    }
  }).on("error", (e) => process.stderr.write(`vibebook herdr: botão "ir pro Claude" desligado (${e.message})
`)).listen(port, "127.0.0.1");
}
async function herdrSync(agent, tools) {
  const res = await callTool("claude_rooms", {}, agent, tools);
  const rooms = JSON.parse(res.content[0]?.text ?? "{}").rooms ?? [];
  const deaf = new Set(rooms.filter((r) => r.on && r.listening === false).map((r) => r.room_id));
  const map = readJson(HERDR, {});
  const live = new Set(herdr("workspace", "list").workspaces.map((w) => w.workspace_id));
  const panes = herdr("pane", "list").panes;
  const on = new Map(rooms.filter((r) => r.on).map((r) => [r.room_id, r.title]));
  const log = (m) => process.stdout.write(`${new Date().toLocaleTimeString()} ${m}
`);
  for (const [room, title] of on) {
    const e = map[room] ??= {};
    if (e.workspace && live.has(e.workspace)) {
      if (!deaf.has(room))
        delete e.deaf_since;
      else
        e.deaf_since ??= Date.now();
      if (e.listening && e.deaf_since && Date.now() - e.deaf_since > 3 * 60000 && Date.now() - (e.prompted_at ?? 0) > 5 * 60000)
        e.listening = false;
      const cp = panes.find((x) => x.workspace_id === e.workspace && x.agent === "claude");
      const cs = cp?.agent_session?.value;
      const cx0 = cs ? sessionContext(cs) : undefined;
      const cx = cx0 && cs ? { ...cx0, window: sessionStatus(cs)?.window ?? cx0.window } : undefined;
      if (cp && cx && cx.tokens >= cx.window * COMPACT_AT && (cp.agent_status === "idle" || cp.agent_status === "done") && Date.now() - (e.compacted_at ?? 0) > 15 * 60000) {
        try {
          herdr("agent", "prompt", cp.pane_id, "/compact");
          e.compacted_at = Date.now();
          log(`${title}: contexto em ${Math.round(cx.tokens / cx.window * 100)}%, mandei /compact`);
        } catch {}
        continue;
      }
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
    const there = panes.find((p) => p.agent === "claude" && (p.cwd === e.folder || p.foreground_cwd === e.folder));
    if (there) {
      e.workspace = there.workspace_id;
      try {
        herdr("workspace", "rename", there.workspace_id, title.slice(0, 40));
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
    e.workspace = w.workspace.workspace_id;
    const args = ["agent", "start", `vb-${room}`, "--kind", "claude", "--pane", w.root_pane.pane_id, "--timeout", "60000", "--"];
    if (e.session)
      args.push("--resume", e.session);
    e.listening = true;
    e.prompted_at = Date.now();
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
  herdrOrder([...on.keys()], map);
}
function herdrOrder(order, map) {
  const list = herdr("workspace", "list").workspaces;
  const ours = new Map(order.filter((r) => map[r]?.workspace).map((r) => [map[r].workspace, r]));
  const current = list.map((w) => w.workspace_id);
  const desired = [...order.map((r) => map[r]?.workspace).filter((w) => !!w && current.includes(w)), ...current.filter((w) => !ours.has(w))];
  let i = 0;
  while (i < desired.length && current[i] === desired[i])
    i++;
  if (i === desired.length)
    return;
  const focused = list.find((w) => w.focused)?.workspace_id;
  let refocus;
  const tabs = herdr("tab", "list").tabs;
  for (const ws of desired.slice(i)) {
    const room = ours.get(ws);
    const panes = herdr("pane", "list").panes.filter((p) => p.workspace_id === ws);
    let newWs;
    const newTab = new Map;
    for (const p of panes) {
      const tabLabel = tabs.find((t) => t.tab_id === p.tab_id)?.label ?? "1";
      let r;
      if (!newWs)
        r = herdr("pane", "move", p.pane_id, "--new-workspace", "--label", list.find((w) => w.workspace_id === ws)?.label ?? room ?? "1", "--tab-label", tabLabel);
      else if (newTab.has(p.tab_id))
        r = herdr("pane", "move", p.pane_id, "--tab", newTab.get(p.tab_id), "--split", "right", "--no-focus");
      else
        r = herdr("pane", "move", p.pane_id, "--new-tab", "--workspace", newWs, "--label", tabLabel, "--no-focus");
      const moved = r.move_result.pane;
      newWs = moved.workspace_id;
      newTab.set(p.tab_id, moved.tab_id);
    }
    if (newWs) {
      if (room)
        map[room].workspace = newWs;
      if (ws === focused)
        refocus = newWs;
    }
  }
  writePrivate(HERDR, map);
  const back = refocus ?? focused;
  if (back)
    try {
      herdr("workspace", "focus", back);
    } catch {}
  process.stdout.write(`${new Date().toLocaleTimeString()} reordenei ${desired.length - i} workspace(s): salas na ordem do vibebook, depois o resto
`);
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
  vibebook statusline [command]  as Claude Code's statusLine: keeps the session's context window and plan
                                 limits for the room, then runs your own statusline command (if any) with the same input
  vibebook update                install the latest version

Options: --model "Claude Opus 5.5" (or VIBEBOOK_MODEL) names the agent in the room; --origin for a local server.`;
async function main() {
  const cmd = flags.version ? "version" : pos[0];
  if (cmd === "statusline")
    return statusline();
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
            const title = (t) => (t ?? "").replace(/[\p{Cc}"`]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 60);
            for (const r of out.new)
              process.stdout.write(`vibebook: ${r.new_messages} nova(s) em "${title(r.title)}" room_id=${r.room_id}
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
      const lock = join(HOME, "herdr.pid");
      const other = Number(existsSync(lock) ? readFileSync(lock, "utf8") : 0);
      if (other && other !== process.pid) {
        let alive = true;
        try {
          process.kill(other, 0);
        } catch {
          alive = false;
        }
        if (alive)
          return die(`vibebook herdr is already running (pid ${other}); one per machine is enough`);
      }
      writeFileSync(lock, String(process.pid));
      const release = () => {
        try {
          if (Number(readFileSync(lock, "utf8")) === process.pid)
            unlinkSync(lock);
        } catch {}
      };
      process.on("exit", release);
      for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"])
        process.on(sig, () => process.exit(0));
      const tools = await listTools(agent);
      if (!flags.once)
        herdrServer();
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
