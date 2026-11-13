// Opt-in runtime acceptance. Owns real dev:app and temporarily edits isolated
// checkout sources; never run beside another editor/server in this checkout.
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { closeSync, openSync, readFileSync, readdirSync } from "node:fs";
import { mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { request as httpRequest } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  chromium,
  expect as baseExpect,
  type Browser,
  type Page,
} from "@playwright/test";
import { startupTimeout, DEVELOPMENT_READY_URLS } from "./dev-app";
import { nativeBrowserFixtures } from "./native-browser-fixtures";

const root = fileURLToPath(new URL("..", import.meta.url));
const base = "http://127.0.0.1:5173";
const worker = "http://127.0.0.1:8787";
const output = process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-app-hmr-runtime";
const expect = baseExpect.configure({ timeout: 60_000 });
const token = randomBytes(6).toString("hex");
const coldStartMs = startupTimeout(process.env.DEV_APP_STARTUP_TIMEOUT_MS);
const backupRoot = resolve(output, `source-backups-${token}`);
const result: Record<string, unknown> = {
  scope:
    "Real full-app source HMR and local Worker proxy, not full feature/production acceptance",
  limitations: [
    "Requires an isolated checkout, installed Chromium/dependencies and migrated local D1 with DEV_EMAIL configured in .dev.vars.",
    "Creates one local fixture room; no production data or credentials are used.",
    "OAuth provider callbacks, mobile/accessibility parity, collaborative editor content and production bundle integrity are separate gates.",
    "Draft check covers the existing room/session-owned composer; Svelte component-local state may reset.",
    "Linux /proc process identity checks cover observed descendants; very short-lived unobserved descendants are not claimed.",
    "Startup/shutdown and initial build memory are real; run only after other memory-heavy checks finish.",
  ],
};
const steps: string[] = [];
const errors: string[] = [];
const changes = new Map<string, { before: string; after: string }>();
const created: string[] = [];
let browser: Browser | undefined;
let page: Page | undefined;
let child: { pid: number; exited: Promise<number> } | undefined;
let logFd: number | undefined;
let launcherStart: string | null = null;
const shutdowns: { exitCode: number; observedDescendants: number }[] = [];
let sampler: ReturnType<typeof setInterval> | undefined;
const observed = new Map<number, { start: string; pgid: number }>();
assert.equal(
  process.platform,
  "linux",
  "Process identity acceptance requires Linux /proc",
);
await mkdir(output, { recursive: true });
const step = (message: string) => {
  steps.push(message);
  console.log(message);
};
const poll = async (
  check: () => boolean | Promise<boolean>,
  label: string,
  timeout = 120_000,
) => {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try {
      if (await check()) return;
    } catch {
      /* Navigation/restart/declaration writes may be transient. */
    }
    await Bun.sleep(200);
  }
  throw new Error(`Timed out: ${label}`);
};
const responds = async (origin: string) => {
  try {
    await fetch(origin, { signal: AbortSignal.timeout(1000) });
    return true;
  } catch {
    return false;
  }
};
const readyEndpoint = async (url: string) => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
    const ready = response.status === 200;
    await response.body?.cancel();
    return ready;
  } catch {
    return false;
  }
};
const identity = (pid: number) => {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
    const fields = stat.slice(stat.lastIndexOf(")") + 2).split(/\s+/);
    return fields[19]!;
  } catch {
    return null;
  }
};
function sample() {
  if (!child) return;
  const rows: number[][] = [];
  for (const name of readdirSync("/proc")) {
    if (!/^\d+$/.test(name)) continue;
    try {
      const stat = readFileSync(`/proc/${name}/stat`, "utf8");
      const fields = stat.slice(stat.lastIndexOf(")") + 2).split(/\s+/);
      rows.push([Number(name), Number(fields[1]), Number(fields[2])]);
    } catch {
      /* A process may exit between the directory and stat read. */
    }
  }
  const parents = new Set(
    [...observed]
      .filter(([pid, value]) => identity(pid) === value.start)
      .map(([pid]) => pid),
  );
  if (identity(child.pid) === launcherStart) parents.add(child.pid);
  let previous = -1;
  while (parents.size !== previous) {
    previous = parents.size;
    for (const [pid, ppid, pgid] of rows) {
      if (!pid || !ppid || !pgid || !parents.has(ppid)) continue;
      parents.add(pid);
      const start = identity(pid);
      if (start) observed.set(pid, { start, pgid });
    }
  }
}
async function launch(label: string) {
  observed.clear();
  logFd = openSync(`${output}/${label}.log`, "w");
  child = Bun.spawn([process.execPath, "run", "dev:app"], {
    cwd: root,
    detached: true,
    stdout: logFd,
    stderr: logFd,
    env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
  });
  launcherStart = identity(child.pid);
  assert(launcherStart, "Launched dev:app identity missing");
  sampler = setInterval(sample, 1000);
}
async function stopOwned() {
  if (!child) return;
  sample();
  const owned = child;
  try {
    if (identity(owned.pid) === launcherStart)
      process.kill(-owned.pid, "SIGTERM");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
  }
  const code = await Promise.race([
    owned.exited,
    Bun.sleep(15_000).then(() => {
      throw new Error("dev:app supervisor did not exit");
    }),
  ]);
  if (sampler) clearInterval(sampler);
  sampler = undefined;
  await poll(
    () => [...observed].every(([pid, value]) => identity(pid) !== value.start),
    "all observed dev descendants exit",
    15_000,
  );
  await poll(
    async () => !(await responds(base)) && !(await responds(worker)),
    "both owned listening ports close",
    15_000,
  );
  shutdowns.push({ exitCode: code, observedDescendants: observed.size });
  child = undefined;
  if (logFd !== undefined) closeSync(logFd);
  logFd = undefined;
}
async function mutate(path: string, transform: (source: string) => string) {
  const absolute = resolve(root, path);
  assert(!changes.has(absolute), `Mutation already active: ${path}`);
  const before = await readFile(absolute, "utf8");
  const after = transform(before);
  assert.notEqual(after, before, `Mutation anchor absent: ${path}`);
  const backup = resolve(backupRoot, path);
  await mkdir(dirname(backup), { recursive: true });
  await writeFile(backup, before);
  changes.set(absolute, { before, after });
  await writeFile(absolute, after);
}
async function restore() {
  for (const [path, value] of [...changes].reverse()) {
    assert.equal(
      await readFile(path, "utf8"),
      value.after,
      `Concurrent edit preserved; restore ${path} manually from harness records`,
    );
    await writeFile(path, value.before);
    changes.delete(path);
  }
}
function rawRequest(
  path: string,
  headers: Record<string, string> = {},
  upgrade = false,
): Promise<number> {
  return new Promise((done, reject) => {
    const req = httpRequest({
      hostname: "127.0.0.1",
      port: 5173,
      method: "GET",
      path,
      headers: {
        ...headers,
        ...(upgrade
          ? {
              connection: "Upgrade",
              upgrade: "websocket",
              "sec-websocket-version": "13",
              "sec-websocket-key": randomBytes(16).toString("base64"),
            }
          : {}),
      },
    });
    req.setTimeout(10_000, () =>
      req.destroy(new Error("HTTP/WS probe timeout")),
    );
    req.on("response", (res) => {
      res.resume();
      done(res.statusCode ?? 0);
    });
    req.on("upgrade", (_res, socket) => {
      socket.destroy();
      done(101);
    });
    req.on("error", reject);
    req.end();
  });
}

try {
  assert(
    !(await responds(base)) && !(await responds(worker)),
    "Ports 5173 and 8787 must be unused; harness will never stop existing servers",
  );
  step("Cancel real dev:app during initial API declaration build");
  await launch("startup-cancel");
  await poll(() => {
    sample();
    return [...observed.keys()].some((pid) => {
      try {
        return readFileSync(`/proc/${pid}/cmdline`, "utf8").includes(
          "tsconfig.api.json",
        );
      } catch {
        return false;
      }
    });
  }, "initial API compiler process appears");
  await stopOwned();
  result.startupCancellation = "pass";

  step("Start real dev:app and wait for Worker plus source Vite");
  await launch("dev-app");
  await poll(
    async () =>
      (await readyEndpoint(DEVELOPMENT_READY_URLS.worker)) &&
      (await readyEndpoint(DEVELOPMENT_READY_URLS.vite)),
    "Worker and Vite ready",
    coldStartMs,
  );
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const context = await browser.newContext({
    locale: "en-US",
    viewport: { width: 1440, height: 1000 },
  });
  await nativeBrowserFixtures(context, base);
  const email = `hmr-${token}@example.test`;
  await context.addCookies([
    { name: "dev_as", value: email, url: base },
    { name: "vb_lang", value: "en", url: base },
  ]);
  const me = await context.request.get(`${base}/api/me?ui=svelte`);
  assert(me.ok(), "Local Worker must have DEV_EMAIL and migrated fixtures");
  assert.equal(
    (await me.json()).email,
    email,
    "Vite proxy must forward the local identity cookie",
  );
  const made = await context.request.post(`${base}/api/books`, {
    headers: { origin: base },
    data: { title: `HMR runtime ${token}` },
  });
  assert(made.ok(), `Exact-origin API write: ${made.status()}`);
  const room = ((await made.json()) as { id: string }).id;
  assert.match(room, /^[a-z0-9]+$/);
  result.room = room;

  step(
    "Check selected source shells, vanilla default and Worker access denial",
  );
  for (const path of ["/app?ui=svelte", `/b/${room}?ui=svelte`]) {
    const response = await context.request.get(base + path);
    const html = await response.text();
    assert(response.ok());
    assert(
      html.includes('src="/bootstrap.ts"') && html.includes("/@vite/client"),
    );
    assert(
      !html.includes('name="vb-v"') && !html.includes("/svelte-preview/app.js"),
    );
  }
  const vanilla = await (await context.request.get(`${base}/b/${room}`)).text();
  assert(
    !vanilla.includes("/bootstrap.ts") && !vanilla.includes("/@vite/client"),
  );
  const denied = await context.request.get(
    `${base}/b/hmrmustnotexist${token}?ui=svelte`,
  );
  assert.equal(denied.status(), 404);
  assert(!(await denied.text()).includes('src="/bootstrap.ts"'));
  const outsider = await browser.newContext();
  try {
    await outsider.addCookies([
      {
        name: "dev_as",
        value: "outsider-" + token + "@example.test",
        url: base,
      },
    ]);
    const inaccessible = await outsider.request.get(
      base + "/b/" + room + "?ui=svelte",
    );
    assert.equal(
      inaccessible.status(),
      200,
      "Existing private room returns Worker access page",
    );
    assert(
      !(await inaccessible.text()).includes('src="/bootstrap.ts"'),
      "Unauthorized identity must not receive source app shell",
    );
  } finally {
    await outsider.close();
  }
  const foreign = await context.request.post(`${base}/api/books`, {
    headers: { origin: "https://foreign.invalid" },
    data: { title: "Must never create" },
  });
  assert.equal(foreign.status(), 403);
  const cookie = (await context.cookies())
    .map((value) => `${value.name}=${value.value}`)
    .join("; ");
  for (const path of [`/ws/${room}`, "/ws-me", `/yjs/${room}`]) {
    assert.equal(
      await rawRequest(path, { origin: base, cookie }, true),
      101,
      `Same-origin WS ${path}`,
    );
    assert.equal(
      await rawRequest(
        path,
        { origin: "https://foreign.invalid", cookie },
        true,
      ),
      403,
      `Foreign-origin WS ${path}`,
    );
  }
  result.proxy =
    "HTTP identity/write and room/personal/editor WS handshakes passed";

  step(
    "Probe actual Vite forbidden files, encoded paths, symlinks and hostile request authorities",
  );
  const fixtureDir = resolve(root, `.wrangler/qa-hmr-${token}`);
  await mkdir(fixtureDir, { recursive: true });
  created.push(fixtureDir);
  await writeFile(
    resolve(fixtureDir, "index.js"),
    'export const secret = "SYNTHETIC_BACKEND_MUST_NOT_SHIP";',
  );
  const link = resolve(root, `svelte/lib/hmr-denied-${token}.js`);
  await symlink(resolve(fixtureDir, "index.js"), link);
  created.push(link);
  for (const path of [
    "src/api.ts",
    "scripts/dev-app.ts",
    "wrangler.jsonc",
    "svelte/build/clientBoundary.ts",
    "svelte/vite.config.ts",
    "svelte/tsconfig.json",
    `.wrangler/qa-hmr-${token}/index.js`,
    `svelte/lib/hmr-denied-${token}.js`,
  ])
    for (const query of ["?raw", "?url"])
      assert.equal(
        await rawRequest(`/@fs/${resolve(root, path)}${query}`),
        403,
        `Forbidden ${path}${query}`,
      );
  for (const path of [
    "/build/clientBoundary.ts?raw",
    "/vite.config.ts?raw",
    `/@fs/${root}/%73cripts/dev-app.ts?raw`,
    `/@fs/${root}/%252e%252e/src/api.ts?raw`,
  ])
    assert.equal(await rawRequest(path), 403, `Encoded/config refusal ${path}`);
  let trapHits = 0;
  const trap = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    fetch() {
      trapHits++;
      return new Response("unexpected outbound fetch");
    },
  });
  try {
    for (const prefix of [
      `http://127.0.0.1:${trap.port}`,
      `//127.0.0.1:${trap.port}`,
    ]) {
      const status = await rawRequest(`${prefix}/app?ui=svelte`, { cookie });
      assert([400, 403].includes(status), `Hostile authority status ${status}`);
    }
    assert.equal(
      trapHits,
      0,
      "No cookie-bearing fetch may follow an incoming authority",
    );
  } finally {
    await trap.stop(true);
  }
  result.pathSecurity = "pass";

  step(
    "Open real room and verify mounted component/style HMR preserves composer draft and connections",
  );
  page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  let snapshots = 0;
  let roomSockets = 0;
  page.on("websocket", (socket) => {
    if (!new URL(socket.url()).pathname.startsWith("/ws/")) return;
    roomSockets++;
    socket.on("framereceived", ({ payload }) => {
      try {
        if (JSON.parse(payload.toString()).t === "state") snapshots++;
      } catch {
        /* Vite/editor frames are not room JSON */
      }
    });
  });
  await page.goto(`${base}/b/${room}?ui=svelte`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("#input")).toBeVisible();
  await poll(() => snapshots > 0, "actual room snapshot");
  await page.evaluate((value) => {
    Object.assign(window, { __hmrVerificationDocument: value });
  }, token);
  const documentId = () =>
    page!.evaluate(() => Reflect.get(window, "__hmrVerificationDocument"));
  await page.locator("#input").fill(`Unsent HMR draft ${token}`);
  const socketsBefore = roomSockets;
  await mutate(
    "svelte/Sidebar.svelte",
    (source) =>
      `${source}\n<span hidden data-hmr-verification="${token}"></span>\n`,
  );
  await expect(
    page.locator(`[data-hmr-verification="${token}"]`),
  ).toBeAttached();
  assert.equal(await documentId(), token, "Component HMR must not navigate");
  await expect(page.locator("#input")).toHaveValue(`Unsent HMR draft ${token}`);
  await mutate(
    "svelte/styles/tailwind.css",
    (source) => `${source}\n:root { --vb-hmr-verification: ${token}; }\n`,
  );
  await poll(
    async () =>
      (await page!.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue("--vb-hmr-verification")
          .trim(),
      )) === token,
    "real stylesheet update",
  );
  assert.equal(await documentId(), token, "Style HMR must not navigate");
  await expect(page.locator("#input")).toHaveValue(`Unsent HMR draft ${token}`);
  assert.equal(
    roomSockets,
    socketsBefore,
    "Component/style HMR must keep the existing room connection",
  );
  assert.equal(
    await page.locator("#vbUpdate").count(),
    0,
    "Production version banner must remain disabled in source mode",
  );
  result.componentAndStyle = "pass";

  step(
    "Edit shared contract, verify declaration watcher plus full reload/reconnection",
  );
  let beforeSnapshots = snapshots;
  await mutate(
    "shared/schemas.ts",
    (source) =>
      `${source}\nexport type HmrContractVerification = { probe: "${token}" };\n`,
  );
  await poll(
    async () =>
      (
        await readFile(resolve(root, ".api-types/shared/schemas.d.ts"), "utf8")
      ).includes("HmrContractVerification"),
    "shared declaration regeneration",
  );
  await poll(
    async () => (await documentId()) !== token && snapshots > beforeSnapshots,
    "shared-contract reload and room reconnect",
  );
  await page.evaluate((value) => {
    Object.assign(window, { __hmrVerificationDocument: value });
  }, token);
  result.sharedContract = "pass";

  step(
    "Edit Worker implementation and API declaration source without manual rebuild/restart",
  );
  beforeSnapshots = snapshots;
  const endpoint = `/api/hmr-verification-${token}`;
  await mutate("src/index.ts", (source) =>
    source.replace(
      'app.route("/auth", auth);',
      `app.get("${endpoint}", (c) => c.json({ probe: "${token}" }));\napp.route("/auth", auth);`,
    ),
  );
  await mutate(
    "src/api.ts",
    (source) =>
      `${source}\nexport type HmrApiVerification = { probe: "${token}" };\n`,
  );
  await poll(async () => {
    try {
      const response = await context.request.get(base + endpoint);
      return response.ok() && (await response.json()).probe === token;
    } catch {
      return false;
    }
  }, "changed Worker route actually responds");
  await poll(
    async () =>
      (
        await readFile(resolve(root, ".api-types/src/api.d.ts"), "utf8")
      ).includes("HmrApiVerification"),
    "API declaration regeneration",
  );
  await poll(
    async () => (await documentId()) !== token && snapshots > beforeSnapshots,
    "backend reload and room reconnect",
  );
  assert.deepEqual(
    errors,
    [],
    "No uncaught application errors during HMR/reloads",
  );
  result.backend = "pass";
  result.liveRoom = { snapshots, roomSockets };
  await restore();
  await browser.close();
  browser = undefined;
  step("Stop dev:app and verify owned descendants plus both ports disappear");
  await stopOwned();
  result.status = "pass";
} catch (error) {
  result.status = "fail";
  result.failure = String(error);
  if (page && !page.isClosed())
    await page.screenshot({ path: `${output}/failure.png` }).catch(() => {});
  throw error;
} finally {
  const cleanup: string[] = [];
  try {
    await restore();
  } catch (error) {
    cleanup.push(String(error));
  }
  await browser?.close().catch((error) => {
    cleanup.push(String(error));
  });
  try {
    await stopOwned();
  } catch (error) {
    cleanup.push(String(error));
  }
  if (sampler) clearInterval(sampler);
  for (const path of created.reverse())
    await rm(path, { recursive: true, force: true });
  if (logFd !== undefined) closeSync(logFd);
  const startupLog = await readFile(
    resolve(output, "dev-app.log"),
    "utf8",
  ).catch(() => "");
  result.startupPhases = startupLog.split("\n").flatMap((line) => {
    if (!line.startsWith("[dev:app] ")) return [];
    try {
      const value: unknown = JSON.parse(line.slice(10));
      if (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        typeof value.name === "string" &&
        "status" in value &&
        typeof value.status === "string" &&
        "elapsedMs" in value &&
        typeof value.elapsedMs === "number" &&
        Number.isFinite(value.elapsedMs)
      )
        return [value];
    } catch {
      /* Keep child logs as evidence even if one phase line is incomplete. */
    }
    return [];
  });
  result.startupDeadlineMs = coldStartMs;
  result.sourceBackups = backupRoot;
  result.shutdowns = shutdowns;
  result.steps = steps;
  result.errors = errors;
  result.cleanupErrors = cleanup;
  if (cleanup.length) result.status = "fail";
  await writeFile(
    `${output}/results.json`,
    JSON.stringify(result, null, 2) + "\n",
  );
  if (cleanup.length) throw new Error(cleanup.join("\n"));
}
