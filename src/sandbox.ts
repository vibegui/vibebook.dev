import { pokeRoom } from "./person";
// Cloud agents: a Claude Code that lives in a freestyle.sh VM instead of on someone's computer.
// - The person connects their own freestyle account by pasting an API key in the app (POST /api/freestyle). It's
//   checked against freestyle, then kept AES-GCM encrypted in D1 (key derived from SESSION_SECRET); it never goes to
//   an agent, a room or the browser again.
// - "Criar sandbox" creates a VM on their account (outbound internet only), writes the room's agents/<name>.md as the
//   folder's CLAUDE.md and runs a setup script in the background inside the VM (Node, Claude Code, the vibebook CLI and
//   plugin, git, tmux, then any ```sh blocks of the .md). The app polls for ~/.vibebook-setup-done.
// - The terminal: the Worker mints a 15-minute freestyle identity token that reaches only that VM's terminal and the
//   browser opens the PTY websocket straight to freestyle (slug "claude", so reopening reattaches). That's where the
//   person logs in to Claude and to vibebook (`vibebook login --paste`) and starts listening.
// - Pause keeps memory and processes (freestyle bills only disk while paused); start resumes them.
import type { Env } from "./index";
import { bookStub, storeFile } from "./rooms";

let API = "https://api.freestyle.sh"; // FREESTYLE_API overrides it in local dev (a mock)
const enc = new TextEncoder();

async function vaultKey(env: Pick<Env, "SESSION_SECRET">) {
  const base = await crypto.subtle.importKey("raw", enc.encode(env.SESSION_SECRET), "HKDF", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "HKDF", hash: "SHA-256", salt: enc.encode("vibebook-freestyle"), info: enc.encode("v1") }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}
const b64 = (u: Uint8Array) => btoa(String.fromCharCode(...u));
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

/** Encrypt/decrypt one secret with the vault key (MCP connection tokens use it too). */
export async function seal(env: Pick<Env, "SESSION_SECRET">, text: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await vaultKey(env), enc.encode(text)));
  return { enc: b64(ct), iv: b64(iv) };
}
export async function unseal(env: Pick<Env, "SESSION_SECRET">, ct: string, iv: string) {
  return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(iv) }, await vaultKey(env), unb64(ct)));
}

// Two secrets per person, same vault: their freestyle API key and their Claude subscription token (`claude setup-token`).
type Vault = "freestyle_keys" | "claude_tokens";
export async function saveKey(env: Env, email: string, key: string, table: Vault = "freestyle_keys") {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await vaultKey(env), enc.encode(key)));
  await env.DB.prepare(`INSERT INTO ${table} (email, enc, iv, at) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET enc = excluded.enc, iv = excluded.iv, at = excluded.at`)
    .bind(email, b64(ct), b64(iv), Date.now())
    .run();
}
export async function loadKey(env: Env, email: string, table: Vault = "freestyle_keys") {
  const r = await env.DB.prepare(`SELECT enc, iv FROM ${table} WHERE email = ?`).bind(email).first<{ enc: string; iv: string }>();
  if (!r) return null;
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(r.iv) }, await vaultKey(env), unb64(r.enc));
  return new TextDecoder().decode(pt);
}

/** One freestyle REST call with the person's key. Throws an Error with freestyle's message. */
const useEnv = (env: Env) => { if (env.FREESTYLE_API) API = env.FREESTYLE_API; };
export async function fs<T = any>(key: string, method: string, path: string, body?: unknown): Promise<T> {
  const r = await fetch(`${API}${path}`, {
    method,
    headers: { authorization: `Bearer ${key}`, ...(body === undefined ? {} : { "content-type": "application/json" }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await r.text();
  const j = text ? (() => { try { return JSON.parse(text); } catch { return { message: text.slice(0, 200) }; } })() : {};
  if (!r.ok) throw new Error(`freestyle ${r.status}: ${String(j?.message ?? j?.error ?? text).slice(0, 200)}`);
  return j as T;
}

export const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "sala";

/** The default agents/<name>.md for a room: what the person edits (with their Claude) to shape the sandbox. */
export const defaultAgentMd = (title: string, roomUrl: string) => `# Agent da sala ${title}

Este arquivo vira o CLAUDE.md do Claude que roda no sandbox desta sala (${roomUrl}).
Escreva aqui o que ele faz, que repositório usa e como trabalha. Blocos \`\`\`sh abaixo rodam uma vez, na criação.

## Setup

\`\`\`sh
# exemplos: git clone https://github.com/<org>/<repo> . ; npm i -g <cli>
\`\`\`
`;

/** The script that prepares the VM, run detached so the request returns at once (the app polls the done file). */
export function setupScript(o: { roomId: string; folder: string; md: string; origin: string }) {
  const blocks = [...o.md.matchAll(/```(?:sh|bash)\n([\s\S]*?)```/g)].map((m) => m[1]).join("\n");
  const q = (s: string) => `'${s.replace(/'/g, `'\\''`)}'`;
  return `#!/bin/bash
exec > "$HOME/vibebook-setup.log" 2>&1
set -x
S=$(command -v sudo || true)
export DEBIAN_FRONTEND=noninteractive
if ! command -v node >/dev/null || ! command -v tmux >/dev/null || ! command -v git >/dev/null; then
  $S apt-get update -y
  $S apt-get install -y curl ca-certificates git tmux
  command -v node >/dev/null || { curl -fsSL https://deb.nodesource.com/setup_22.x | $S bash - && $S apt-get install -y nodejs; }
fi
$S npm install -g @anthropic-ai/claude-code
curl -fsSL ${o.origin}/install.sh | sh
export PATH="$HOME/.local/bin:$HOME/.vibebook/bin:$PATH"
grep -q '.vibebook/bin' "$HOME/.bashrc" 2>/dev/null || echo 'export PATH="$HOME/.local/bin:$HOME/.vibebook/bin:$PATH"' >> "$HOME/.bashrc"
claude plugin marketplace add vibegui/vibebook.dev || true
claude plugin install vibebook@vibebook || true
# vibebook login, already authorized by the server for the person who created this sandbox (code + PKCE verifier in
# a 0600 file the CLI redeems and deletes). An older sandbox without it falls back to login --paste in the terminal.
if [ -f /tmp/vibebook-login.json ]; then vibebook login --code-file /tmp/vibebook-login.json || echo "vibebook login failed"; fi
# The person's Claude token (written by vibebook to /tmp, never echoed): Claude Code starts logged in.
if [ -f /tmp/vibebook-env ]; then install -m 600 /tmp/vibebook-env "$HOME/.vibebook-env"; rm -f /tmp/vibebook-env; fi
grep -q vibebook-env "$HOME/.bashrc" 2>/dev/null || echo '[ -f "$HOME/.vibebook-env" ] && . "$HOME/.vibebook-env"' >> "$HOME/.bashrc"
mkdir -p "$HOME/${o.folder}" && cd "$HOME/${o.folder}"
[ -d .git ] || git init -q
printf 'room_id=%s\\n' ${q(o.roomId)} > .vibebook
grep -qx .vibebook .git/info/exclude 2>/dev/null || echo .vibebook >> .git/info/exclude
(
:
${blocks}
) || echo "agents .md setup failed"
# Claude Code: no first-run onboarding and the folder already trusted, so it can start on its own.
node -e 'const f=require("os").homedir()+"/.claude.json",fs=require("fs");let j={};try{j=JSON.parse(fs.readFileSync(f,"utf8"))}catch{}j.hasCompletedOnboarding=true;j.projects=j.projects||{};const p=process.argv[1];j.projects[p]={...(j.projects[p]||{}),hasTrustDialogAccepted:true,hasCompletedProjectOnboarding:true};fs.writeFileSync(f,JSON.stringify(j,null,2))' "$HOME/${o.folder}" || true
cat > "$HOME/.vibebook-start" <<'EOS'
[ -f "$HOME/.vibebook-env" ] && . "$HOME/.vibebook-env"
export PATH="$HOME/.local/bin:$HOME/.vibebook/bin:$PATH"
cd "$HOME/${o.folder}"
vibebook status 2>/dev/null | grep -q '"logged_in": true' || vibebook login --paste
claude "/vibebook:listen"
exec bash -l
EOS
# Claude runs in tmux session "claude" from now on; the app's terminal attaches to it.
tmux has-session -t claude 2>/dev/null || tmux new-session -d -s claude -x 160 -y 48 -c "$HOME/${o.folder}" "bash -l $HOME/.vibebook-start"
touch "$HOME/.vibebook-setup-done"
`;
}

// Fully detached (own session, no stdin/stdout), so it outlives the exec call that starts it.
const RUN_SETUP = "(setsid nohup bash /tmp/vibebook-setup.sh </dev/null >/dev/null 2>&1 &) ; sleep 1; echo started";
/** Authorizes this sandbox's vibebook CLI for its person, server-side (no browser): a public client with the code page
 * as redirect, a grant completed for them, and the code + PKCE verifier written to the VM for the CLI to redeem. */
async function writeVibebookLogin(env: Env, key: string, email: string, vmId: string, origin: string, sandbox: string, room: string) {
  const oauth = env.OAUTH_PROVIDER;
  const redirect = `${origin}/oauth/code`;
  const client = await oauth.createClient({ clientName: "vibebook sandbox", redirectUris: [redirect], tokenEndpointAuthMethod: "none", grantTypes: ["authorization_code", "refresh_token"], responseTypes: ["code"] });
  const rnd = (n: number) => btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(n)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const verifier = rnd(32);
  const challenge = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(verifier))))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const gid = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  const { redirectTo } = await oauth.completeAuthorization({
    request: { responseType: "code", clientId: client.clientId, redirectUri: redirect, scope: ["rooms", "offline_access"], state: "sandbox", codeChallenge: challenge, codeChallengeMethod: "S256", resource: `${origin}/mcp` },
    userId: email,
    metadata: { client: "vibebook sandbox", at: Date.now(), gid, sandbox, room },
    scope: ["rooms", "offline_access"],
    props: { email, client: "vibebook sandbox", gid, sandbox, room }, // sandbox: its @handle; room: the only room it reaches
  });
  const code = new URL(redirectTo).searchParams.get("code");
  if (!code) throw new Error("could not authorize the sandbox's vibebook login");
  await fs(key, "PUT", `/v5/vms/${vmId}/fs/write`, { path: "/tmp/vibebook-login.json", content: JSON.stringify({ origin, client_id: client.clientId, code, verifier, redirect }), mode: 384 });
}
/** Hands the person's Claude token to the VM (if they connected one), as a 0600 file the setup moves into $HOME. */
async function writeClaudeEnv(env: Env, key: string, email: string, vmId: string) {
  const tok = await loadKey(env, email, "claude_tokens").catch(() => null);
  if (tok) await fs(key, "PUT", `/v5/vms/${vmId}/fs/write`, { path: "/tmp/vibebook-env", content: `export CLAUDE_CODE_OAUTH_TOKEN='${tok.replace(/'/g, "")}'\n`, mode: 384 });
}
type Row = { id: string; email: string; book_id: string; name: string; vm_id: string; identity_id: string | null; ready: number; created_at: number };
const MAX_PER_ROOM = 3;

/** agents/<name>.md from the room's files (the newest with that name written by this person: its sh blocks run in their
 * VM next to their tokens, so another member's upload of the same name must never be picked), or the template. */
export async function agentFile(env: Env, bookId: string, email: string, name: string, title: string, origin: string) {
  const path = `agents/${name}.md`;
  const f = (await bookStub(env, bookId).files()).find((x: { name: string; author: string }) => x.name === path && x.author === email);
  const obj = f && (await env.FILES.get(`${bookId}/${f.id}`));
  if (obj) return obj.text();
  const md = defaultAgentMd(title, `${origin}/b/${bookId}`);
  await storeFile(env, bookId, email, "text/markdown", new TextEncoder().encode(md).buffer as ArrayBuffer, path);
  return md;
}

/** A new sandbox for this person in this room (the app's Criar sandbox, MCP sandbox_create). Throws a user-facing Error. */
export async function createSandbox(env: Env, email: string, bookId: string, rawName: string, origin: string) {
  useEnv(env);
  const k = await loadKey(env, email).catch(() => null);
  if (!k) throw new Error("Conecte sua conta do freestyle.sh primeiro.");
  const n = await env.DB.prepare(`SELECT count(*) AS n FROM sandboxes WHERE book_id = ? AND email = ?`).bind(bookId, email).first<{ n: number }>();
  if ((n?.n ?? 0) >= MAX_PER_ROOM) throw new Error(`No máximo ${MAX_PER_ROOM} sandboxes seus por sala.`);
  const book = await env.DB.prepare(`SELECT title FROM books WHERE id = ?`).bind(bookId).first<{ title: string }>();
  const title = String(book?.title ?? "sala");
  const name = slug(rawName || title);
  const md = await agentFile(env, bookId, email, name, title, origin);
  const vm = await fs<{ id: string }>(k, "POST", "/v5/vms", {
    displayName: `vibebook · ${title}`.slice(0, 60),
    metadata: { vibebook_room: bookId, vibebook_agent: name },
    firewall: { rules: [{ action: "allow", source: {}, destination: { public: true } }] },
    idleTimeoutSeconds: -1,
  });
  await fs(k, "PUT", `/v5/vms/${vm.id}/fs/write`, { path: "/tmp/vibebook-setup.sh", content: setupScript({ roomId: bookId, folder: name, md, origin }), mode: 493 });
  await fs(k, "PUT", `/v5/vms/${vm.id}/fs/write`, { path: "/tmp/vibebook-CLAUDE.md", content: md });
  await writeClaudeEnv(env, k, email, vm.id);
  await writeVibebookLogin(env, k, email, vm.id, origin, name, bookId);
  await fs(k, "POST", `/v5/vms/${vm.id}/exec-await`, { command: `mkdir -p ~/${name} && cp /tmp/vibebook-CLAUDE.md ~/${name}/CLAUDE.md && ${RUN_SETUP}`, timeoutMs: 15000 });
  const sid = crypto.randomUUID().slice(0, 8);
  await env.DB.prepare(`INSERT INTO sandboxes (id, email, book_id, name, vm_id, identity_id, ready, created_at, state, checked_at) VALUES (?, ?, ?, ?, ?, NULL, 0, ?, 'running', ?)`).bind(sid, email, bookId, name, vm.id, Date.now(), Date.now()).run();
  return { id: sid, vm_id: vm.id, name };
}

/** Runs the setup again from the room's current agents/<name>.md, in the foreground (up to ~4.5 min): fresh vibebook
 * login and Claude token, a syntax check, the setup, and Claude restarted in tmux. Returns the log's last lines. */
export async function redoSetup(env: Env, email: string, sid: string, origin: string) {
  useEnv(env);
  const r = (await env.DB.prepare(`SELECT * FROM sandboxes WHERE id = ? AND email = ?`).bind(sid, email).first()) as Row | null;
  const k = await loadKey(env, email).catch(() => null);
  if (!r || !k) throw new Error("not found");
  const vm = await fs<{ state: string }>(k, "GET", `/v5/vms/${r.vm_id}`);
  if (vm.state !== "running") await fs(k, "POST", `/v5/vms/${r.vm_id}/start`);
  const book = await env.DB.prepare(`SELECT title FROM books WHERE id = ?`).bind(r.book_id).first<{ title: string }>();
  const md = await agentFile(env, r.book_id, r.email, r.name, String(book?.title ?? "sala"), origin);
  await fs(k, "PUT", `/v5/vms/${r.vm_id}/fs/write`, { path: "/tmp/vibebook-setup.sh", content: setupScript({ roomId: r.book_id, folder: r.name, md, origin }), mode: 493 });
  await fs(k, "PUT", `/v5/vms/${r.vm_id}/fs/write`, { path: "/tmp/vibebook-CLAUDE.md", content: md });
  await writeClaudeEnv(env, k, r.email, r.vm_id);
  await writeVibebookLogin(env, k, r.email, r.vm_id, origin, r.name, r.book_id);
  const x = await fs<{ stdout: string | null; stderr: string | null; statusCode: number | null }>(k, "POST", `/v5/vms/${r.vm_id}/exec-await`, {
    command: `mkdir -p ~/${r.name}; cp /tmp/vibebook-CLAUDE.md ~/${r.name}/CLAUDE.md 2>/dev/null; rm -f ~/.vibebook-setup-done; tmux kill-session -t claude 2>/dev/null; bash -n /tmp/vibebook-setup.sh 2>&1 | head -5 && timeout 260 bash /tmp/vibebook-setup.sh; echo "---"; test -f ~/.vibebook-setup-done && echo READY; tail -n 15 ~/vibebook-setup.log 2>/dev/null | cut -c1-200`,
    timeoutMs: 280000,
  });
  const out = redact(`${x.stdout ?? ""}${x.stderr ?? ""}`.trim());
  const ready = /^READY$/m.test(out);
  await env.DB.prepare(`UPDATE sandboxes SET ready = ? WHERE id = ?`).bind(ready ? 1 : 0, r.id).run();
  return { ok: ready, log: out.slice(-2500), error: ready ? undefined : "o setup não terminou: veja o log no card" };
}

/** Routes (all behind the session; rooms checked with isMember). Mounted from index.ts. */
// biome-ignore lint/suspicious/noExplicitAny: the Hono app's context type lives in index.ts
// A sandbox appeared, changed state or went away: the room's Pessoas and everyone's rail (☁) follow, no polling.
const roomChanged = (env: Env, book: string) => Promise.all([pokeRoom(env, book, { t: "agents", book }), pokeRoom(env, book, { t: "me" })]);
export function mountSandbox(app: any, deps: { isMember: (db: D1Database, id: string, email: string) => Promise<boolean>; track: (env: Env, name: string, o: object) => Promise<unknown> }) {
  app.use("/api/*", async (c: any, next: () => Promise<void>) => { if (c.env.FREESTYLE_API) API = c.env.FREESTYLE_API; await next(); });
  const key = async (c: any): Promise<string | null> => loadKey(c.env, c.get("email")).catch(() => null);
  const mine = (c: any, sid: string) => c.env.DB.prepare(`SELECT * FROM sandboxes WHERE id = ? AND email = ?`).bind(sid, c.get("email")).first() as Promise<Row | null>;

  app.get("/api/freestyle", async (c: any) => c.json({ connected: !!(await c.env.DB.prepare(`SELECT 1 FROM freestyle_keys WHERE email = ?`).bind(c.get("email")).first()) }));
  // The person's Claude subscription token (from `claude setup-token` in their own terminal): sandboxes start logged in.
  app.post("/api/claude-token", async (c: any) => {
    const email = c.get("email");
    if (!(await c.env.LOGIN_LIMIT.limit({ key: `ct:${email}` })).success) return c.json({ error: "Muitas tentativas. Espera um minuto." }, 429);
    const { token } = await c.req.json().catch(() => ({}));
    // The terminal wraps the long token over lines: copied, it comes with spaces/newlines in the middle.
    const tok = String(token ?? "").replace(/\s+/g, "");
    if (!/^sk-ant-[A-Za-z0-9_.-]{20,2000}$/.test(tok)) return c.json({ error: "Isso não parece um token do claude setup-token (começa com sk-ant-)." }, 400);
    await saveKey(c.env, email, tok, "claude_tokens");
    c.executionCtx.waitUntil(deps.track(c.env, "claude_token_saved", { user: email }));
    return c.json({ ok: true });
  });
  app.delete("/api/claude-token", async (c: any) => {
    await c.env.DB.prepare(`DELETE FROM claude_tokens WHERE email = ?`).bind(c.get("email")).run();
    return c.json({ ok: true });
  });
  app.post("/api/freestyle", async (c: any) => {
    const email = c.get("email");
    if (!(await c.env.LOGIN_LIMIT.limit({ key: `fs:${email}` })).success) return c.json({ error: "Muitas tentativas. Espera um minuto." }, 429);
    const { key: k } = await c.req.json().catch(() => ({}));
    const apiKey = String(k ?? "").trim();
    if (apiKey.length < 16 || apiKey.length > 400) return c.json({ error: "Essa não parece uma API key do freestyle." }, 400);
    try {
      await fs(apiKey, "GET", "/v5/vms?limit=1");
    } catch (e) {
      return c.json({ error: `O freestyle recusou a key: ${(e as Error).message}` }, 400);
    }
    await saveKey(c.env, email, apiKey);
    c.executionCtx.waitUntil(deps.track(c.env, "freestyle_connected", { user: email }));
    return c.json({ ok: true });
  });
  app.delete("/api/freestyle", async (c: any) => {
    await c.env.DB.prepare(`DELETE FROM freestyle_keys WHERE email = ?`).bind(c.get("email")).run();
    return c.json({ ok: true });
  });

  app.get("/api/books/:id/sandboxes", async (c: any) => {
    const email = c.get("email"), id = c.req.param("id");
    if (!(await deps.isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
    const rows = (await c.env.DB.prepare(`SELECT * FROM sandboxes WHERE book_id = ? AND email = ? ORDER BY created_at`).bind(id, email).all()).results as Row[];
    const k = rows.length ? await key(c) : null;
    const out = await Promise.all(rows.map(async (r) => {
      let state = "unknown", error: string | undefined, log: string | undefined;
      try {
        if (!k) throw new Error("freestyle desconectado");
        const vm = await fs<{ state: string; totalRunSeconds?: number; updatedAt?: string; resources?: { cpu: number; memory: number; storage: number } }>(k, "GET", `/v5/vms/${r.vm_id}`);
        // totalRunSeconds counts finished runs; a running VM adds the current one (since its last state change).
        if (vm.state === "running" && vm.updatedAt) vm.totalRunSeconds = (vm.totalRunSeconds ?? 0) + Math.max(0, (Date.now() - Date.parse(vm.updatedAt)) / 1000);
        state = vm.state;
        // freestyle's list prices (Nov 2026): what this VM has cost so far = hours running × (vCPU + memory) + disk the whole time.
        const res = vm.resources ?? { cpu: 0, memory: 0, storage: 0 };
        const rate = res.cpu * 0.04032 + (res.memory / 1024) * 0.0129, disk = (res.storage / 1024) * 0.000086;
        Object.assign(r, { run_s: vm.totalRunSeconds ?? 0, rate, disk_rate: disk });
        c.executionCtx.waitUntil(c.env.DB.prepare(`UPDATE sandboxes SET state = ?, run_s = ?, rate = ?, disk_rate = ?, checked_at = ? WHERE id = ?`).bind(state, Math.round(vm.totalRunSeconds ?? 0), rate, disk, Date.now(), r.id).run());
        if (!r.ready && state === "running") {
          const x = await fs<{ stdout: string | null; stderr: string | null }>(k, "POST", `/v5/vms/${r.vm_id}/exec-await`, { command: "if [ -f ~/.vibebook-setup-done ]; then echo done; elif [ -f ~/vibebook-setup.log ]; then tail -n 2 ~/vibebook-setup.log | cut -c1-160; else echo nolog; fi", timeoutMs: 10000 });
          const out = (x.stdout ?? "").trim();
          if (out === "done") { r.ready = 1; await c.env.DB.prepare(`UPDATE sandboxes SET ready = 1 WHERE id = ?`).bind(r.id).run(); }
          else log = out === "nolog" ? "o setup não começou (sem log)" : out.split("\n").pop() || (x.stderr ?? "").slice(0, 160);
        }
      } catch (e) {
        error = (e as Error).message;
        if (/ 404:/.test(error)) state = "deleted";
      }
      const x = r as Row & { run_s?: number; rate?: number; disk_rate?: number };
      const cost = ((x.run_s ?? 0) / 3600) * (x.rate ?? 0) + ((Date.now() - r.created_at) / 3600_000) * (x.disk_rate ?? 0);
      return { id: r.id, name: r.name, vm_id: r.vm_id, ready: !!r.ready, state, error, log, created_at: r.created_at, rate: x.rate ?? 0, cost };
    }));
    return c.json({ connected: !!(await c.env.DB.prepare(`SELECT 1 FROM freestyle_keys WHERE email = ?`).bind(email).first()), claude: !!(await c.env.DB.prepare(`SELECT 1 FROM claude_tokens WHERE email = ?`).bind(email).first()), sandboxes: out });
  });

  app.post("/api/books/:id/sandboxes", async (c: any) => {
    const email = c.get("email"), id = c.req.param("id");
    if (!(await deps.isMember(c.env.DB, id, email))) return c.json({ error: "forbidden" }, 403);
    const { name } = await c.req.json().catch(() => ({}));
    try {
      const r = await createSandbox(c.env, email, id, String(name ?? ""), new URL(c.req.url).origin);
      c.executionCtx.waitUntil(deps.track(c.env, "sandbox_created", { user: email, dims: { book: id } }));
      c.executionCtx.waitUntil(roomChanged(c.env, id));
      return c.json({ ok: true, ...r });
    } catch (e) {
      return c.json({ error: (e as Error).message }, 400);
    }
  });

  for (const act of ["pause", "start"] as const)
    app.post(`/api/sandboxes/:sid/${act}`, async (c: any) => {
      const r = await mine(c, c.req.param("sid")), k = await key(c);
      if (!r || !k) return c.json({ error: "not found" }, 404);
      try { await fs(k, "POST", `/v5/vms/${r.vm_id}/${act}`); } catch (e) { return c.json({ error: (e as Error).message }, 502); }
      await c.env.DB.prepare(`UPDATE sandboxes SET state = ? WHERE id = ?`).bind(act === "pause" ? "paused" : "running", r.id).run(); // the rail's ☁ follows at once
      c.executionCtx.waitUntil(deps.track(c.env, `sandbox_${act}`, { user: r.email, dims: { book: r.book_id } }));
      c.executionCtx.waitUntil(roomChanged(c.env, r.book_id));
      return c.json({ ok: true });
    });
  // Run the setup again (it skips what's already installed): for a sandbox stuck preparing.
  app.post("/api/sandboxes/:sid/setup", async (c: any) => {
    try {
      return c.json(await redoSetup(c.env, c.get("email"), c.req.param("sid"), new URL(c.req.url).origin));
    } catch (e) {
      return c.json({ error: (e as Error).message }, 502);
    }
  });
  app.delete("/api/sandboxes/:sid", async (c: any) => {
    const r = await mine(c, c.req.param("sid")), k = await key(c);
    if (!r) return c.json({ error: "not found" }, 404);
    if (k) await fs(k, "DELETE", `/v5/vms/${r.vm_id}`).catch((e) => { if (!/ 404:/.test(e.message)) throw e; });
    if (k && r.identity_id) await fs(k, "DELETE", `/v5/identities/${r.identity_id}`).catch(() => {});
    await c.env.DB.prepare(`DELETE FROM sandboxes WHERE id = ?`).bind(r.id).run();
    c.executionCtx.waitUntil(roomChanged(c.env, r.book_id));
    // Its Claude goes too: the vibebook grants made for it are revoked and it leaves "Conectados" (its folder = its name).
    const { items } = await c.env.OAUTH_PROVIDER.listUserGrants(r.email);
    for (const g of items) if (g.metadata?.client === "vibebook sandbox" && g.metadata?.sandbox === r.name) await c.env.OAUTH_PROVIDER.revokeGrant(g.id, r.email).catch(() => {});
    // Kept (receipts point at it), just no longer listening or recently here.
    const gone = `SELECT id FROM agents WHERE email = ?1 AND client = 'vibebook sandbox' AND repo = ?2`;
    await c.env.DB.batch([
      c.env.DB.prepare(`UPDATE agents SET listening_at = NULL WHERE id IN (${gone})`).bind(r.email, r.name),
      c.env.DB.prepare(`UPDATE agent_reads SET seen_at = 0 WHERE agent IN (${gone})`).bind(r.email, r.name),
    ]);
    return c.json({ ok: true });
  });
  // A 15-minute token that reaches only this VM's terminal: the browser opens the PTY straight to freestyle.
  app.post("/api/sandboxes/:sid/terminal", async (c: any) => {
    const r = await mine(c, c.req.param("sid")), k = await key(c);
    if (!r || !k) return c.json({ error: "not found" }, 404);
    try {
      const vm = await fs<{ state: string }>(k, "GET", `/v5/vms/${r.vm_id}`);
      if (vm.state !== "running" && vm.state !== "starting") await fs(k, "POST", `/v5/vms/${r.vm_id}/start`);
      let ident = r.identity_id;
      if (!ident) {
        ident = (await fs<{ id: string }>(k, "POST", "/v5/identities", {})).id;
        await fs(k, "POST", `/v5/identities/${ident}/permissions/vm`, { vmId: r.vm_id });
        await c.env.DB.prepare(`UPDATE sandboxes SET identity_id = ? WHERE id = ?`).bind(ident, r.id).run();
      }
      const t = await fs<{ token: string }>(k, "POST", `/v5/identities/${ident}/tokens`, { expiresAt: new Date(Date.now() + 15 * 60_000).toISOString() });
      // The first time it waits for the setup, logs in to vibebook (paste) and starts Claude listening; slug
      // "claude" makes every later open reattach to that same session (bash takes over if Claude exits).
      const exec = `bash -lc 'while [ ! -f ~/.vibebook-setup-done ]; do echo "Preparando o sandbox... $(tail -n 1 ~/vibebook-setup.log 2>/dev/null | cut -c1-80)"; sleep 5; done; exec tmux new-session -A -s claude -c ~ "bash -l ~/.vibebook-start"'`;
      return c.json({ token: t.token, url: `${API.replace(/^http/, "ws")}/v5/vms/${r.vm_id}/pty?slug=claude&exec=${encodeURIComponent(exec)}` });
    } catch (e) {
      return c.json({ error: (e as Error).message }, 502);
    }
  });
}

// ---- for agents (MCP sandboxes / sandbox_exec in src/agent.ts): a person's Claude works on that person's own
// sandboxes with the key that stays on the server. Output is redacted (tokens, keys) before it reaches the agent.
export const redact = (s: string) =>
  s.replace(/sk-ant-[A-Za-z0-9_.-]{10,}/g, "sk-ant-…[redacted]").replace(/"(access_token|refresh_token|code|verifier)"\s*:\s*"[^"]*"/g, '"$1":"[redacted]"').replace(/(CLAUDE_CODE_OAUTH_TOKEN|FREESTYLE_API_KEY|API_KEY|TOKEN|SECRET)=\S+/gi, "$1=[redacted]");
export async function agentSandboxes(env: Env, email: string) {
  useEnv(env);
  const k = await loadKey(env, email).catch(() => null);
  if (!k) return { connected: false, sandboxes: [], note: "your human hasn't connected freestyle.sh (Agents → Na nuvem in a room)" };
  const rows = (await env.DB.prepare(`SELECT * FROM sandboxes WHERE email = ? ORDER BY created_at`).bind(email).all()).results as Row[];
  const out = await Promise.all(rows.map(async (r) => {
    try {
      const vm = await fs<{ state: string }>(k, "GET", `/v5/vms/${r.vm_id}`);
      return { sandbox_id: r.id, room_id: r.book_id, name: r.name, state: vm.state, ready: !!r.ready };
    } catch (e) {
      return { sandbox_id: r.id, room_id: r.book_id, name: r.name, state: "unknown", ready: !!r.ready, error: (e as Error).message };
    }
  }));
  return { connected: true, sandboxes: out };
}
export async function agentSandboxPower(env: Env, email: string, sid: string, action: "pause" | "start") {
  useEnv(env);
  const r = (await env.DB.prepare(`SELECT * FROM sandboxes WHERE id = ? AND email = ?`).bind(sid, email).first()) as Row | null;
  if (!r) throw new Error(`no sandbox ${sid} of your human's (call sandboxes)`);
  const k = await loadKey(env, email).catch(() => null);
  if (!k) throw new Error("your human's freestyle.sh isn't connected");
  await fs(k, "POST", `/v5/vms/${r.vm_id}/${action}`);
  const vm = await fs<{ state: string }>(k, "GET", `/v5/vms/${r.vm_id}`);
  await env.DB.prepare(`UPDATE sandboxes SET state = ?, checked_at = ? WHERE id = ?`).bind(vm.state, Date.now(), r.id).run();
  return { sandbox_id: r.id, state: vm.state };
}
export async function agentSandboxExec(env: Env, email: string, sid: string, command: string, timeoutS = 60) {
  useEnv(env);
  const r = (await env.DB.prepare(`SELECT * FROM sandboxes WHERE id = ? AND email = ?`).bind(sid, email).first()) as Row | null;
  if (!r) throw new Error(`no sandbox ${sid} of your human's (call sandboxes)`);
  const k = await loadKey(env, email).catch(() => null);
  if (!k) throw new Error("your human's freestyle.sh isn't connected");
  const vm = await fs<{ state: string }>(k, "GET", `/v5/vms/${r.vm_id}`);
  if (vm.state !== "running") await fs(k, "POST", `/v5/vms/${r.vm_id}/start`);
  const x = await fs<{ stdout: string | null; stderr: string | null; statusCode: number | null }>(k, "POST", `/v5/vms/${r.vm_id}/exec-await`, {
    command: command.slice(0, 8000),
    timeoutMs: Math.min(Math.max(timeoutS, 1), 280) * 1000,
  });
  if (/test -f ~\/\.vibebook-setup-done/.test(command) && /READY|done/.test(x.stdout ?? "")) await env.DB.prepare(`UPDATE sandboxes SET ready = 1 WHERE id = ?`).bind(r.id).run();
  return { exit_code: x.statusCode, stdout: redact(x.stdout ?? "").slice(-12000), stderr: redact(x.stderr ?? "").slice(-4000) };
}
