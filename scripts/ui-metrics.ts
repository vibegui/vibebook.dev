// Controlled CURRENT vanilla/native frontend benchmark. Synthetic fixtures are not Worker/provider E2E evidence.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, realpath, mkdir, writeFile } from "node:fs/promises";
import { resolve, sep, relative } from "node:path";
import {
  cpus,
  totalmem,
  freemem,
  loadavg,
  platform,
  arch,
  release,
} from "node:os";
import { gzipSync } from "node:zlib";
import {
  chromium,
  expect as baseExpect,
  type Browser,
  type BrowserContext,
} from "@playwright/test";
import {
  MeResult,
  AgentsResult,
  AgentGrantsResult,
  SandboxesResult,
  ConnectionsResult,
  PushKeyResult,
  LoginsResult,
} from "../shared/schemas";
import { parseCommandEnvelope, record } from "../shared/validation";
import type { RoomEvent } from "../shared/room";
import {
  createMetricRoom,
  checkedEvent,
  summarize,
  workloads,
  type Workload,
} from "./ui-metrics-model";
import { assessBudgets } from "./ui-metrics-budgets";
import { metricShell } from "./ui-metrics-shell";
import { metricDocumentContent } from "./ui-metrics-document-model";
type Variant = "vanilla" | "svelte";
const variants: Variant[] = ["vanilla", "svelte"];
const devices = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;
type Device = (typeof devices)[number];
function integer(name: string, fallback: number, min: number, max: number) {
  const value = Number(process.env[name] ?? fallback);
  assert(
    Number.isInteger(value) && value >= min && value <= max,
    `${name}: integer ${min}..${max}`,
  );
  return value;
}
const config = {
  repetitions: integer("METRICS_REPETITIONS", 7, 7, 30),
  warmups: integer("METRICS_WARMUPS", 1, 1, 3),
  historyPages: integer("METRICS_HISTORY_PAGES", 3, 1, 20),
  scrollFrames: integer("METRICS_SCROLL_FRAMES", 30, 10, 180),
  seed: integer("METRICS_SEED", 421, 0, 2147483647),
  cpuRate: 4,
  devices,
  lifecycleCycles: 20,
  fontPolicy: process.env.METRICS_FONTS ?? "network-public-fonts",
  forceGC: true,
  cohortDeclaredExclusive: process.env.METRICS_EXCLUSIVE === "1",
  stepTimeoutMs: integer("METRICS_STEP_TIMEOUT_MS", 30000, 1000, 120000),
  failFast: process.env.METRICS_FAIL_FAST !== "0",
};
const expect = baseExpect.configure({ timeout: config.stepTimeoutMs });
assert(["local-only", "network-public-fonts"].includes(config.fontPolicy));
const profiles = (process.env.METRICS_PROFILES ?? "long")
  .split(",")
  .map((name) => {
    assert(workloads[name], `Unknown profile ${name}`);
    return workloads[name];
  });
assert(
  new Set(profiles.map((profile) => profile.name)).size === profiles.length,
  "Profiles must be unique",
);
for (const profile of profiles) {
  assert(
    profile.messages >= 1000 &&
      profile.epics >= 30 &&
      profile.epics * profile.tasksPerEpic >= 200,
    "Final comparison requires the plan's minimum common workload",
  );
  assert(
    config.historyPages <= Math.ceil((profile.messages * 0.6 - 60) / 100),
    "History pages exceed the synthetic main-thread history",
  );
}
const publicRoot = await realpath(
    resolve(process.env.METRICS_PUBLIC_ROOT ?? "public"),
  ),
  output = process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-ui-metrics";
await mkdir(output, { recursive: true });
const hash = (body: Uint8Array) =>
  createHash("sha256").update(body).digest("hex");
type Asset = {
  key: string;
  sourcePath: string;
  sourceSHA256: string;
  servedSHA256: string;
  rawBytes: number;
  gzipBytes: number;
  body: Buffer;
  gzip: Buffer;
  type: string;
  injectedVersion?: boolean;
  shellETag?: string;
  shellVersionDomain?: string;
  builtEntryVersion?: string | null;
};
const assets = new Map<string, Asset>();
async function asset(key: string, path: string, htmlVariant?: Variant) {
  const previous = assets.get(key);
  if (previous) return previous;
  const file = await realpath(resolve(publicRoot, path));
  assert(file.startsWith(publicRoot + sep), "Asset escaped public root");
  const original = await readFile(file);
  let body = original,
    shellETag: string | undefined,
    shellVersionDomain: string | undefined,
    builtEntryVersion: string | null | undefined,
    injectedVersion = false;
  if (htmlVariant) {
    shellETag = `"${hash(original)}"`;
    const served = metricShell(original.toString(), shellETag, htmlVariant);
    versions[htmlVariant] = served.version;
    shellVersionDomain = served.versionDomain;
    builtEntryVersion = served.entryVersion;
    body = Buffer.from(served.body);
    injectedVersion = true;
  }
  const gzip = gzipSync(body),
    value = {
      key,
      sourcePath: relative(publicRoot, file).replaceAll(sep, "/"),
      sourceSHA256: hash(original),
      servedSHA256: hash(body),
      rawBytes: body.length,
      gzipBytes: gzip.length,
      body,
      gzip,
      type: Bun.file(file).type || "application/octet-stream",
      injectedVersion,
      shellETag,
      shellVersionDomain,
      builtEntryVersion,
    };
  assets.set(key, value);
  return value;
}
const versions: Record<Variant, string> = { vanilla: "", svelte: "" };
try {
  await asset("@shell/vanilla", "app.html", "vanilla");
  await asset("@shell/svelte", "app-svelte.html", "svelte");
} catch (error) {
  const sources = await Promise.all(
    ["app.html", "app-svelte.html"].map(async (path) => {
      try {
        const bytes = await readFile(resolve(publicRoot, path));
        return { path, sha256: hash(bytes), bytes: bytes.length };
      } catch {
        return { path, unavailable: true };
      }
    }),
  );
  await writeFile(
    `${output}/preflight-failure.json`,
    JSON.stringify(
      {
        status: "failed",
        phase: "shell-preflight",
        sources,
        scope: "No browser was started and no timing sample exists",
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : { name: "UnknownError" },
      },
      null,
      2,
    ),
  );
  throw error;
}
type FixtureRoom = ReturnType<typeof createMetricRoom>;
type RunFixture = {
  rooms: FixtureRoom[];
  variant: Variant;
  unsupported: string[];
  commands: Record<string, number>;
  deliveredEvents: Record<string, number>;
  deliveredUTF8Bytes: number;
  sockets: Map<string, Set<{ send(data: string): void }>>;
  http: Record<string, number>;
  personalSockets: number;
};
let fixture: RunFixture | null = null;
function event(current: RunFixture, roomId: string, value: RoomEvent) {
  const valid = checkedEvent(value),
    body = JSON.stringify(valid);
  current.deliveredEvents[value.t] =
    (current.deliveredEvents[value.t] || 0) + 1;
  current.deliveredUTF8Bytes += Buffer.byteLength(body);
  for (const socket of current.sockets.get(roomId) || []) socket.send(body);
}
const json = (value: unknown) =>
  Response.json(value, {
    headers: { "cache-control": "no-store", "x-metrics-kind": "fixture" },
  });
const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 0,
  async fetch(request) {
    const url = new URL(request.url),
      path = url.pathname;
    if (path.startsWith("/api/")) {
      const current = fixture;
      if (!current) return new Response("No benchmark run", { status: 503 });
      current.http[path] = (current.http[path] || 0) + 1;
      if (path === "/api/me")
        return json(
          MeResult.parse({
            email: current.rooms[0].root.me,
            name: "Benchmark user",
            avatar: null,
            books: current.rooms.map((room, index) => ({
              id: room.id,
              title: room.root.book.title,
              owner: room.root.me,
              summary: room.root.book.summary ?? null,
              folder: null,
              created_at: 1,
              updated_at: 1,
              read_id: room.all.at(-1)?.id || 0,
              last_human_id: room.all.at(-1)?.id || 0,
              last_agent_id: 0,
              sandboxes_running: 0,
              members: room.root.members.join(","),
              icon: null,
              busy_until: null,
              position: index,
              tint: null,
              opened_at: null,
            })),
            friends: [],
            waits: [],
            v: versions[
              url.searchParams.get("ui") === "svelte" ? "svelte" : "vanilla"
            ],
          }),
        );
      if (request.method === "GET" && path === "/api/me/logins")
        return json(
          LoginsResult.parse({
            logins: [],
            providers: { google: false, github: false },
          }),
        );
      if (path === "/api/agents")
        return json(AgentGrantsResult.parse({ agents: [], last_used: null }));
      if (/^\/api\/books\/[a-f0-9]+\/agents$/.test(path))
        return json(
          AgentsResult.parse({ claude_on: false, agents: [], sandboxes: [] }),
        );
      if (/^\/api\/books\/[a-f0-9]+\/sandboxes$/.test(path))
        return json(
          SandboxesResult.parse({
            connected: false,
            claude: false,
            sandboxes: [],
          }),
        );
      if (/^\/api\/books\/[a-f0-9]+\/connections$/.test(path))
        return json(ConnectionsResult.parse({ connections: [] }));
      if (path === "/api/push/key")
        return json(PushKeyResult.parse({ key: null }));
      current.unsupported.push(`${request.method} ${path}`);
      return Response.json(
        { error: "Unsupported benchmark fixture endpoint" },
        { status: 501 },
      );
    }
    try {
      const variant: Variant =
        url.searchParams.get("ui") === "svelte" ? "svelte" : "vanilla";
      const value =
        /^\/b\/[a-f0-9]+\/?$/.test(path) || path === "/app" || path === "/"
          ? await asset(
              `@shell/${variant}`,
              variant === "svelte" ? "app-svelte.html" : "app.html",
              variant,
            )
          : await asset(path, path.slice(1));
      const compressed =
        (request.headers.get("accept-encoding") || "").includes("gzip") &&
        value.gzipBytes < value.rawBytes;
      return new Response(
        new Uint8Array(compressed ? value.gzip : value.body),
        {
          headers: {
            "content-type": value.type,
            "cache-control": "no-store",
            vary: "Accept-Encoding",
            "x-metrics-asset": value.key,
            ...(value.shellETag ? { etag: value.shellETag } : {}),
            ...(compressed ? { "content-encoding": "gzip" } : {}),
            ...(path.startsWith("/b/") || path === "/app"
              ? { "x-vibebook-ui": variant }
              : {}),
          },
        },
      );
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
});
const base = server.url.origin;
type ProbeSample = { ms: number; start: number; end: number };
type Probe = {
  pending: {
    key: string;
    event?: string;
    gesture?: "click" | "input";
    start: number | null;
    matchTitle?: string;
  } | null;
  results: Record<string, ProbeSample>;
  arm(
    key: string,
    event?: string,
    gesture?: "click" | "input",
    matchTitle?: string,
  ): void;
  finish(): Promise<void>;
  longTasks: { start: number; duration: number }[];
};
declare global {
  interface Window {
    __vbFrontendMetrics: Probe;
  }
}
async function installProbe(context: BrowserContext) {
  await context.addInitScript(() => {
    const probe: Probe = {
      pending: null,
      results: {},
      longTasks: [],
      arm(key, event, gesture, matchTitle) {
        this.pending = {
          key,
          event,
          gesture,
          start: gesture ? null : performance.now(),
          matchTitle,
        };
      },
      async finish() {
        const pending = this.pending;
        if (!pending || pending.start === null) return;
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
        if (this.pending !== pending) return;
        this.results[pending.key] = {
          ms: performance.now() - pending.start,
          start: pending.start,
          end: performance.now(),
        };
        this.pending = null;
      },
    };
    window.__vbFrontendMetrics = probe;
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          probe.longTasks.push({
            start: entry.startTime,
            duration: entry.duration,
          });
      }).observe({ type: "longtask", buffered: true });
    } catch {}
    document.addEventListener(
      "click",
      () => {
        if (probe.pending?.gesture === "click" && probe.pending.start === null)
          probe.pending.start = performance.now();
      },
      true,
    );
    document.addEventListener(
      "input",
      (event) => {
        if (
          probe.pending?.gesture !== "input" ||
          probe.pending.start !== null ||
          !(event.target instanceof HTMLElement) ||
          !event.target.closest("#composer,[data-native-composer]")
        )
          return;
        probe.pending.start = performance.now();
        void probe.finish();
      },
      true,
    );
    // routeWebSocket owns the browser constructor. Observe real DOM outcomes
    // through Playwright instead of wrapping that constructor or its events.
  });
}
type Resource = {
  url: string;
  phase: string;
  type: string;
  assetKey?: string;
  status?: number;
  transferBytes: number | null;
  decodedDataBytes: number;
  encodedDataBytes: number;
  completed: boolean;
  failed?: string;
  cache?: boolean;
};
function environment() {
  return {
    timestamp: new Date().toISOString(),
    platform: platform(),
    arch: arch(),
    release: release(),
    cpuModels: [...new Set(cpus().map((cpu) => cpu.model))],
    cpuCount: cpus().length,
    totalMemoryBytes: totalmem(),
    freeMemoryBytes: freemem(),
    loadAverage: loadavg(),
    bun: Bun.version,
    node: process.version,
  };
}
const results: { [key: string]: unknown } = {
  status: "running",
  scope:
    "Controlled synthetic CURRENT browser frontends; not Worker/database/provider/network/deployment acceptance",
  harnessRevision: execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim(),
  servedRevisionSuppliedByRunner: process.env.TEST_APP_REVISION ?? null,
  config,
  profiles,
  environmentStart: environment(),
  samples: [],
  gaps: [
    "No real Worker/D1/R2/AI/provider/CRDT persistence or production network costs. HTTP/WS fixtures are deliberately simulated.",
    "Fresh contexts and cache disabled; browser process, OS files, DNS/TLS and local static server are warm. Browser launch is excluded.",
    "Controlled shells emulate the Worker's head metadata augmentation with the SHA-256 ETag of original public shell bytes and the same fixture Me.v. This declared synthetic ETag domain is not Cloudflare's production ETag. Actual bundle query versions and original/served hashes remain recorded separately.",
    "Public font network is allowed by default. Failed, blocked or missing font transfers remain unknown/unverified; requested local font bytes never establish matched production font totals.",
    "Desktop and 390px Chromium viewports use 4x CPU throttling and reduced motion. A narrow viewport is not a touch hardware/iOS/Safari/IME/GPU acceptance claim.",
    "Entry readiness requires the complete canonical synthetic Markdown preview on desktop before fonts and two frames. Mobile must keep that document hidden. Older runs only asserted chat readiness; their timing endpoints are not interchangeable with this stronger contract. Their captured resource bytes remain historical evidence.",
    "History/update/compose/switch/inbox intervals end after automation observes the asserted DOM outcome plus two animation frames; they include Playwright polling/protocol overhead, not pure inbound-WebSocket/render latency. Start is browser arm time or the captured real click/input. Two frames are paint opportunities, not compositor presentation proof.",
    "CDP task/script/layout counters complement latency; frame timing is headless RAF, not a user's display FPS.",
    "Small-sample p95 uses nearest rank and can equal the observed maximum. No inferential significance/confidence interval claim.",
    "Deferred bytes cover only exercised interactions and Inbox. Editor/Yjs/MCP/media/tool graphs not visited are unmeasured, not zero.",
    "Synthetic workload is deterministic, not representative production telemetry. Full raw samples and failures are retained.",
    "Twenty room/thread navigation cycles here use controlled Book transport. Actual Yjs editor/provider disposal is measured by the separate real-Worker lifecycle cohort; no simulated Yjs server is supplied here.",
    "Post-GC heap/DOM counters and controlled socket counts expose retention signals, but do not directly enumerate observer instances or prove no detached component trees. Real-Worker lifecycle artifacts remain required.",
  ],
};
type Sample = {
  variant: Variant;
  device: string;
  profile: string;
  repetition: number;
  warmup: boolean;
  status: string;
  metrics: Record<string, number | null>;
  resources: Resource[];
  [key: string]: unknown;
};
const samples: Sample[] = [];
results.samples = samples;
let browser: Browser | undefined,
  cancelled = false;
const finishSignal = () => {
  cancelled = true;
  process.exitCode = 130;
  void browser?.close();
  server.stop(true);
};
process.once("SIGINT", finishSignal);
process.once("SIGTERM", finishSignal);
function assetEvidence() {
  return [...assets.values()].map(({ body, gzip, ...metadata }) => metadata);
}
async function run(
  variant: Variant,
  device: Device,
  shape: Workload,
  repetition: number,
  warmup: boolean,
) {
  const rooms = [
    createMetricRoom(shape, "A", config.seed),
    createMetricRoom(shape, "B", config.seed + 1),
  ];
  const runFixture: RunFixture = {
    rooms,
    variant,
    unsupported: [],
    commands: {},
    deliveredEvents: {},
    deliveredUTF8Bytes: 0,
    sockets: new Map(),
    http: {},
    personalSockets: 0,
  };
  fixture = runFixture;
  let phase = "entry";
  const sample: Sample = {
    variant,
    device: device.name,
    profile: shape.name,
    repetition,
    warmup,
    status: "running",
    metrics: {},
    resources: [],
    fixture: {
      seed: config.seed,
      digests: rooms.map((room) => room.digest),
      totalMessagesPerRoom: shape.messages,
      epicsPerRoom: shape.epics,
      tasksPerRoom: shape.epics * shape.tasksPerEpic,
      initialStateMessages: rooms.map((room) => {
        const state = room.snapshot();
        return state.t === "state" ? state.messages.length : 0;
      }),
    },
  };
  samples.push(sample);
  assert(browser && !cancelled, "Benchmark browser is unavailable");
  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    locale: "en-US",
    colorScheme: "light",
    reducedMotion: "reduce",
    serviceWorkers: "block",
  });
  context.setDefaultTimeout(config.stepTimeoutMs);
  context.setDefaultNavigationTimeout(120000);
  await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
  await installProbe(context);
  const blocked: string[] = [];
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin === base) return route.continue();
    if (
      url.origin === "http://127.0.0.1:47321" &&
      ["/ping", "/where"].includes(url.pathname)
    )
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: { "access-control-allow-origin": base },
        body: url.pathname === "/ping" ? '{"rooms":[]}' : "null",
      });
    if (
      config.fontPolicy === "network-public-fonts" &&
      ["fonts.googleapis.com", "fonts.gstatic.com"].includes(url.hostname)
    )
      return route.continue();
    blocked.push(url.origin + url.pathname);
    return route.abort();
  });
  await context.routeWebSocket(
    (url) => url.pathname === "/ws-me",
    (socket) => {
      runFixture.personalSockets++;
      socket.onMessage(() => {});
      socket.onClose(() => {
        runFixture.personalSockets--;
      });
    },
  );
  await context.routeWebSocket(
    (url) => url.pathname.startsWith("/ws/"),
    (socket) => {
      const url = new URL(socket.url()),
        room = rooms.find((room) => room.id === url.pathname.split("/")[2]);
      if (!room) {
        runFixture.unsupported.push("Unknown room WebSocket");
        socket.close();
        return;
      }
      const set = runFixture.sockets.get(room.id) || new Set();
      set.add(socket);
      runFixture.sockets.set(room.id, set);
      socket.onClose(() => {
        set.delete(socket);
      });
      socket.onMessage((raw) => {
        if (typeof raw !== "string") {
          runFixture.unsupported.push("Non-text Book command");
          return;
        }
        const { cid, command } = parseCommandEnvelope(raw);
        if (!command) {
          runFixture.unsupported.push("Invalid Book command");
          return;
        }
        runFixture.commands[command.t] =
          (runFixture.commands[command.t] || 0) + 1;
        switch (command.t) {
          case "older":
            event(
              runFixture,
              room.id,
              room.older(
                command.thread,
                command.before ?? Number.MAX_SAFE_INTEGER,
              ),
            );
            break;
          case "doc.get":
            event(runFixture, room.id, {
              t: "doc",
              epic: command.epic || "",
              text: command.epic ? room.docs[command.epic] || "" : room.doc,
              fetched: true,
            });
            break;
          case "files.get":
            event(runFixture, room.id, { t: "files", files: [] });
            break;
          case "msg":
            event(
              runFixture,
              room.id,
              room.post(command.text || "", command.thread),
            );
            break;
          default:
            runFixture.unsupported.push(
              `Unsupported Book command ${command.t}`,
            );
            if (cid)
              event(runFixture, room.id, {
                t: "result",
                cid,
                ok: false,
                error: "Unsupported benchmark command",
              });
            return;
        }
        if (cid) event(runFixture, room.id, { t: "result", cid, ok: true });
      });
      event(
        runFixture,
        room.id,
        room.snapshot(url.searchParams.get("t") || "main"),
      );
    },
  );
  const page = await context.newPage(),
    cdp = await context.newCDPSession(page),
    network = new Map<string, Resource>(),
    errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await cdp.send("Performance.enable");
  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: config.cpuRate });
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  cdp.on("Network.requestWillBeSent", (value: unknown) => {
    if (
      !record(value) ||
      typeof value.requestId !== "string" ||
      !record(value.request) ||
      typeof value.request.url !== "string"
    )
      return;
    network.set(value.requestId, {
      url: value.request.url,
      phase,
      type: typeof value.type === "string" ? value.type : "unknown",
      transferBytes: null,
      decodedDataBytes: 0,
      encodedDataBytes: 0,
      completed: false,
    });
  });
  cdp.on("Network.responseReceived", (value: unknown) => {
    if (
      !record(value) ||
      typeof value.requestId !== "string" ||
      !record(value.response)
    )
      return;
    const row = network.get(value.requestId);
    if (!row) return;
    row.status =
      typeof value.response.status === "number"
        ? value.response.status
        : undefined;
    row.cache =
      value.response.fromDiskCache === true ||
      value.response.fromServiceWorker === true;
    const headers = value.response.headers;
    if (record(headers)) {
      const key = Object.keys(headers).find(
          (key) => key.toLowerCase() === "x-metrics-asset",
        ),
        assetKey = key ? headers[key] : null;
      if (typeof assetKey === "string") row.assetKey = assetKey;
    }
  });
  cdp.on("Network.dataReceived", (value: unknown) => {
    if (!record(value) || typeof value.requestId !== "string") return;
    const row = network.get(value.requestId);
    if (!row) return;
    if (typeof value.dataLength === "number")
      row.decodedDataBytes += value.dataLength;
    if (typeof value.encodedDataLength === "number")
      row.encodedDataBytes += value.encodedDataLength;
  });
  cdp.on("Network.loadingFinished", (value: unknown) => {
    if (!record(value) || typeof value.requestId !== "string") return;
    const row = network.get(value.requestId);
    if (row) {
      row.completed = true;
      row.transferBytes =
        typeof value.encodedDataLength === "number"
          ? value.encodedDataLength
          : null;
    }
  });
  cdp.on("Network.loadingFailed", (value: unknown) => {
    if (!record(value) || typeof value.requestId !== "string") return;
    const row = network.get(value.requestId);
    if (row)
      row.failed =
        typeof value.errorText === "string" ? value.errorText : "failed";
  });
  async function counters() {
    const result: unknown = await cdp.send("Performance.getMetrics"),
      out: Record<string, number> = {};
    if (record(result) && Array.isArray(result.metrics))
      for (const metric of result.metrics)
        if (
          record(metric) &&
          typeof metric.name === "string" &&
          typeof metric.value === "number" &&
          Number.isFinite(metric.value)
        )
          out[metric.name] = metric.value;
    return out;
  }
  function deltas(
    name: string,
    before: Record<string, number>,
    after: Record<string, number>,
  ) {
    for (const key of [
      "TaskDuration",
      "ScriptDuration",
      "LayoutDuration",
      "RecalcStyleDuration",
      "LayoutCount",
      "RecalcStyleCount",
    ])
      sample.metrics[`${name}.${key}`] =
        key in before && key in after ? after[key] - before[key] : null;
  }
  async function arm(
    key: string,
    eventType?: string,
    gesture?: "click" | "input",
    title?: string,
  ) {
    await page.evaluate(
      ({ key, eventType, gesture, title }) =>
        window.__vbFrontendMetrics.arm(key, eventType, gesture, title),
      { key, eventType, gesture, title },
    );
  }
  async function result(key: string, manual = false) {
    if (manual) await page.evaluate(() => window.__vbFrontendMetrics.finish());
    await page.waitForFunction(
      (key) => !!window.__vbFrontendMetrics.results[key],
      key,
    );
    const value = await page.evaluate(
      (key) => window.__vbFrontendMetrics.results[key],
      key,
    );
    sample.metrics[`${key}.ms`] = value.ms;
    return value;
  }
  async function delivered(type: string, before: number) {
    await expect
      .poll(() => runFixture.deliveredEvents[type] || 0)
      .toBeGreaterThan(before);
  }
  async function checkpoint(next: string) {
    phase = next;
    const value = {
      phase,
      at: new Date().toISOString(),
      commands: { ...runFixture.commands },
      events: { ...runFixture.deliveredEvents },
    };
    sample.lastCheckpoint = value;
    console.log(
      JSON.stringify({
        profile: shape.name,
        variant,
        repetition,
        warmup,
        checkpoint: value,
      }),
    );
    // Outside measured intervals: retain the last started phase even if killed.
    await writeFile(
      `${output}/metrics.json`,
      JSON.stringify({ ...results, assets: assetEvidence() }, null, 2) + "\n",
    );
  }
  const chatSelector = variant === "svelte" ? "[data-room-chat]" : "#msgs";
  const composerSelector =
    variant === "svelte"
      ? "[data-native-composer] textarea"
      : "#composer textarea";
  const messageRowSelector =
    variant === "svelte" ? "[data-chat-message]" : ".msg[id^=m]";
  const bodySelector = `${chatSelector} ${variant === "svelte" ? "[data-message-body]" : ".txt"}`;
  async function layout() {
    return page.locator(chatSelector).evaluate((element, selector) => {
      const rect = element.getBoundingClientRect(),
        rows = Array.from(element.querySelectorAll<HTMLElement>(selector)),
        visible = rows.filter((row) => {
          const r = row.getBoundingClientRect();
          return r.bottom > rect.top && r.top < rect.bottom;
        });
      const room = element.closest("[data-native-room-layout]");
      const geometry = (node: Element | null) => {
        if (!(node instanceof HTMLElement)) return null;
        const box = node.getBoundingClientRect(),
          css = getComputedStyle(node);
        return {
          top: box.top,
          bottom: box.bottom,
          width: box.width,
          height: box.height,
          clientHeight: node.clientHeight,
          scrollHeight: node.scrollHeight,
          display: css.display,
          position: css.position,
          overflowY: css.overflowY,
          heightRule: css.height,
          minHeight: css.minHeight,
          maxHeight: css.maxHeight,
          gridTemplateRows: css.gridTemplateRows,
          animationName: css.animationName,
        };
      };
      return {
        scrollTop: element.scrollTop,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight,
        renderedMessages: rows.length,
        nativeLayout: room
          ? {
              pane: room.getAttribute("data-pane"),
              sheet: room.getAttribute("data-sheet"),
              boardFull: room.getAttribute("data-board-full"),
              shell: geometry(room.closest("[data-native-app-shell]")),
              root: geometry(room),
              viewport: geometry(room.firstElementChild),
              cells: Object.fromEntries(
                [
                  "header",
                  "peek",
                  "attention",
                  "chat",
                  "composer",
                  "document",
                  "board",
                ].map((role) => [
                  role,
                  geometry(room.querySelector(`[data-room-${role}]`)),
                ]),
              ),
              setup: geometry(room.querySelector("[data-native-agent-setup]")),
              visualViewport: window.visualViewport
                ? {
                    height: window.visualViewport.height,
                    offsetTop: window.visualViewport.offsetTop,
                  }
                : null,
            }
          : null,
        firstDOM: rows[0]?.id || null,
        firstVisible: visible[0]?.id || null,
      };
    }, messageRowSelector);
  }
  async function sidebar() {
    if (device.width > 900) return;
    const root = page.locator(
      variant === "svelte" ? "[data-native-room-layout]" : ".book",
    );
    if ((await root.getAttribute("data-sheet")) !== "side") {
      await page
        .locator(
          variant === "svelte"
            ? '[data-native-room-header] button[aria-label="Switch conversation"]'
            : "#threadTitle",
        )
        .click();
    }
    await expect(root).toHaveAttribute("data-sheet", "side");
  }
  async function roomReady(room: FixtureRoom, thread = "main") {
    await expect.poll(() => new URL(page.url()).pathname).toBe(`/b/${room.id}`);
    await expect(page.locator(composerSelector)).toBeVisible();
    await expect(page.locator(composerSelector)).toBeEnabled();
    if (variant === "svelte")
      await expect(
        page.locator("[data-native-app-shell] [data-native-room-layout]"),
      ).toBeVisible();
    const latest = room.all
      .filter((message) => message.thread === thread)
      .at(-1);
    assert(latest, `Fixture has no message for ${thread}`);
    await expect(page.locator(`#m${latest.id}`)).toBeVisible();
    await expect(page.locator(`#m${latest.id}`)).toContainText(
      latest.text.slice(0, 80),
    );
    await expect
      .poll(() => new URL(page.url()).searchParams.get("t") ?? "main")
      .toBe(thread);
  }
  async function chooseRoom(room: FixtureRoom) {
    // A phone thread pick closes the switcher sheet. Open it again before
    // selecting a room; Home's room tiles are already visible without a sheet.
    if (new URL(page.url()).pathname.startsWith("/b/")) await sidebar();
    await page.locator(`a[href^="/b/${room.id}"]:visible`).first().click();
    await roomReady(room);
  }
  async function chooseThread(room: FixtureRoom, thread: string) {
    await sidebar();
    const side = page.locator(
      variant === "svelte" ? "[data-native-room-sidebar]" : "#side",
    );
    if (variant === "svelte" && thread === "main")
      await side
        .getByRole("button")
        .filter({ hasText: room.root.book.title })
        .first()
        .click();
    else
      await side
        .locator(
          variant === "svelte"
            ? `[data-epic-thread="${thread}"]`
            : `[data-thread="${thread}"]`,
        )
        .first()
        .click();
    await roomReady(room, thread);
  }
  async function postGC() {
    await cdp.send("HeapProfiler.collectGarbage");
    const dom: unknown = await cdp.send("Memory.getDOMCounters");
    return {
      counters: await counters(),
      dom,
      activeBookSockets: Object.fromEntries(
        [...runFixture.sockets].map(([id, sockets]) => [id, sockets.size]),
      ),
      activePersonalSockets: runFixture.personalSockets,
    };
  }
  try {
    await checkpoint("entry");
    const first = rooms[0];
    const response = await page.goto(
      `${base}/b/${first.id}${variant === "svelte" ? "?ui=svelte" : ""}`,
      { waitUntil: "domcontentloaded" },
    );
    assert.equal(response?.headers()["x-vibebook-ui"], variant);
    await roomReady(first);
    assert.equal(
      (await page.locator("[data-native-composer]").count()) > 0,
      variant === "svelte",
    );
    const preview = page.locator(
      variant === "svelte" ? "[data-document-preview]" : "#preview",
    );
    if (device.width > 900) {
      const content = metricDocumentContent(first.doc);
      await expect(preview).toBeVisible();
      // Compare every canonical heading and paragraph, including the truncated
      // final fixture block. A delivered parser, first heading or plain-text
      // fallback alone cannot satisfy visible-document readiness.
      await expect(preview.locator("h1")).toHaveText(content.titles);
      await expect(preview.locator("h2")).toHaveText(content.sections);
      await expect(preview.locator("p")).toHaveText(content.paragraphs);
      sample.entryDocument = {
        required: true,
        visible: true,
        sourceCharacters: first.doc.length,
        sections: content.sections.length,
        paragraphs: content.paragraphs.length,
        sourceSHA256: createHash("sha256").update(first.doc).digest("hex"),
      };
    } else {
      await expect(preview).not.toBeVisible();
      sample.entryDocument = { required: false, visible: false };
    }
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    });
    sample.metrics["entry.readyWithFontsAndTwoFramesMs"] = await page.evaluate(
      () => performance.now(),
    );
    await page.waitForLoadState("networkidle");
    sample.entryLayout = await layout();
    const entryCounters = await counters();
    sample.entryCounters = entryCounters;
    sample.fontEvidence = await page
      .locator(bodySelector)
      .first()
      .evaluate((element) => ({
        family: getComputedStyle(element).fontFamily,
        size: getComputedStyle(element).fontSize,
      }));
    const dom = await cdp.send("DOM.getDocument"),
      bodyNode = await cdp.send("DOM.querySelector", {
        nodeId: dom.root.nodeId,
        selector: bodySelector,
      });
    const platformFonts = bodyNode.nodeId
      ? await cdp.send("CSS.getPlatformFontsForNode", {
          nodeId: bodyNode.nodeId,
        })
      : null;
    sample.platformFonts = platformFonts;
    sample.loadedFontFaces = await page.evaluate(() =>
      [...document.fonts].map((face) => ({
        family: face.family,
        weight: face.weight,
        style: face.style,
        status: face.status,
      })),
    );
    const entryAssets = [...network.values()]
      .filter((resource) => resource.phase === "entry" && resource.assetKey)
      .map((resource) => assets.get(resource.assetKey!)!)
      .filter(Boolean);
    sample.metrics["entry.applicationGzipReferenceBytes"] = entryAssets
      .filter((value) => /(?:javascript|css|html)/.test(value.type))
      .reduce((sum, value) => sum + value.gzipBytes, 0);
    sample.metrics["entry.localFontGzipReferenceBytes"] = entryAssets
      .filter((value) => /\.(?:woff2?|ttf|otf)$/.test(value.sourcePath))
      .reduce((sum, value) => sum + value.gzipBytes, 0);
    const fontDependencies = [...network.values()].filter(
      (resource) =>
        resource.phase === "entry" &&
        (resource.type === "Font" ||
          /fonts\.googleapis\.com|fonts\.gstatic\.com|\.(?:woff2?|ttf|otf)(?:\?|$)/.test(
            resource.url,
          )),
    );
    const fontUnknown =
      fontDependencies.length === 0 ||
      fontDependencies.some(
        (resource) =>
          !resource.completed ||
          !!resource.failed ||
          resource.transferBytes === null ||
          resource.status === undefined ||
          resource.status >= 400,
      ) ||
      !platformFonts?.fonts.some(
        (font) => font.isCustomFont && font.glyphCount > 0,
      ) ||
      blocked.some((url) =>
        /fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url),
      );
    sample.metrics["entry.fontTransferBytes"] = fontUnknown
      ? null
      : fontDependencies.reduce(
          (sum, resource) => sum + resource.transferBytes!,
          0,
        );
    sample.fontTransfer = {
      status: fontUnknown ? "unverified" : "observed-requested-fonts",
      scope:
        "Actual requested font dependencies, including public font CSS. Variant families intentionally differ; not a matched-font experiment or total Unicode font coverage.",
      requests: fontDependencies,
      blocked: blocked.filter((url) =>
        /fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url),
      ),
    };
    await checkpoint("history");
    const beforeHistory = await counters(),
      historyStart = await layout();
    sample.historyBefore = historyStart;
    assert(
      historyStart.clientHeight > 0,
      "History workload requires the real initial Chat scroller to have positive height",
    );
    for (let index = 0; index < config.historyPages; index++) {
      const key = `history${index + 1}`,
        oldest = (await layout()).firstDOM,
        beforeOlder = runFixture.deliveredEvents.older || 0;
      await checkpoint(key);
      await page
        .locator(chatSelector)
        .evaluate((element) => (element.scrollTop = element.scrollHeight));
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
      await arm(key, "older");
      await page
        .locator(chatSelector)
        .evaluate((element) => (element.scrollTop = 0));
      await delivered("older", beforeOlder);
      await expect.poll(async () => (await layout()).firstDOM).not.toBe(oldest);
      await result(key, true);
    }
    sample.historyBefore = historyStart;
    sample.historyAfter = await layout();
    deltas("history", beforeHistory, await counters());
    await checkpoint("scroll");
    const beforeScroll = await counters();
    const frames = await page
      .locator(chatSelector)
      .evaluate(async (element, count) => {
        const times: number[] = [];
        let previous = performance.now();
        for (let index = 0; index < count; index++) {
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => resolve()),
          );
          const now = performance.now();
          times.push(now - previous);
          previous = now;
          element.scrollTop =
            (element.scrollHeight - element.clientHeight) *
            (index / (count - 1));
        }
        return times;
      }, config.scrollFrames);
    sample.scrollFramesMs = frames;
    const frameSummary = summarize(frames);
    sample.scrollFrameSummary = frameSummary;
    sample.metrics["scroll.frameP95Ms"] = frameSummary.p95 ?? null;
    sample.metrics["scroll.framesOver50ms"] = frames.filter(
      (value) => value > 50,
    ).length;
    deltas("scroll", beforeScroll, await counters());
    await checkpoint("receiptUpdate");
    await page
      .locator(chatSelector)
      .evaluate(
        (element) =>
          (element.scrollTop =
            (element.scrollHeight - element.clientHeight) / 2),
      );
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    const anchorBefore = await layout(),
      beforeUpdate = await counters();
    const readSelector =
      variant === "svelte"
        ? '[data-room-chat] [data-reader-read="true"]'
        : "#msgs .seen .sv:not(.dl)";
    // Older history can already contain read marks from the initial snapshot.
    // Require the new receipts to change actual footers, beyond that baseline.
    const readMarksBefore = await page.locator(readSelector).count();
    const beforeReceipts = runFixture.deliveredEvents.receipts || 0;
    await arm("receiptUpdate", "receipts");
    event(runFixture, first.id, {
      t: "receipts",
      receipts: first.root.members.slice(1).map((email, index) => ({
        email,
        who: first.root.names?.[email] || email,
        read: first.all.at(-1)!.id - index,
        delivered: first.all.at(-1)!.id,
        ts: Date.UTC(2026, 1, 1),
      })),
    });
    await delivered("receipts", beforeReceipts);
    await expect
      .poll(() => page.locator(readSelector).count())
      .toBeGreaterThan(readMarksBefore);
    sample.receiptMarks = {
      before: readMarksBefore,
      after: await page.locator(readSelector).count(),
    };
    await result("receiptUpdate", true);
    const anchorAfter = await layout();
    sample.updateAnchor = {
      before: anchorBefore,
      after: anchorAfter,
      preserved: anchorBefore.firstVisible === anchorAfter.firstVisible,
    };
    deltas("receiptUpdate", beforeUpdate, await counters());
    assert.equal(
      anchorBefore.firstVisible,
      anchorAfter.firstVisible,
      "Receipt update changed reading anchor",
    );
    await checkpoint("compose");
    await page
      .locator(chatSelector)
      .evaluate((element) => (element.scrollTop = element.scrollHeight));
    const composeBefore = await counters(),
      draft = "Synthetic Unicode compose café 日本語 🧪";
    await arm("draftInput", undefined, "input");
    await page.locator(composerSelector).focus();
    await page.keyboard.insertText(draft);
    await result("draftInput");
    await expect(page.locator(composerSelector)).toHaveValue(draft);
    const beforeMsg = runFixture.deliveredEvents.msg || 0;
    await arm("composeEcho", "msg", "click");
    await page
      .locator(variant === "svelte" ? "[data-composer-send]" : "#sendBtn")
      .click();
    await delivered("msg", beforeMsg);
    await expect(page.locator(chatSelector)).toContainText(draft);
    await expect(page.locator(composerSelector)).toHaveValue("");
    await result("composeEcho", true);
    deltas("compose", composeBefore, await counters());
    await checkpoint("threadSwitch");
    await sidebar();
    const thread = first.firstActiveEpic;
    await arm("threadSwitch", undefined, "click");
    await page
      .locator(
        variant === "svelte"
          ? `[data-native-room-sidebar] [data-epic-thread="${thread}"]`
          : `#side [data-thread="${thread}"]`,
      )
      .first()
      .click();
    await expect(page.locator(chatSelector)).toContainText(
      `Synthetic A message ${first.all.filter((message) => message.thread === thread).at(-1)!.id}`,
    );
    await result("threadSwitch", true);
    await checkpoint("roomSwitch");
    await sidebar();
    const beforeState = runFixture.deliveredEvents.state || 0;
    await arm("roomSwitch", "state", "click", rooms[1].root.book.title);
    await page.locator(`a[href^="/b/${rooms[1].id}"]:visible`).first().click();
    await delivered("state", beforeState);
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toBe(`/b/${rooms[1].id}`);
    await expect(page.locator(chatSelector)).toContainText(
      "Synthetic B message",
    );
    await result("roomSwitch", true);
    await checkpoint("inboxDeferred");
    await arm("inboxDeferred", undefined, "click");
    await page
      .locator(
        variant === "svelte" ? "[data-native-inbox-toggle]" : "#inboxBtn",
      )
      .click();
    const inbox =
      variant === "vanilla"
        ? page.locator("dialog#inbox[open]")
        : page.getByRole("dialog", { name: "Inbox", exact: true });
    await expect(inbox).toBeVisible();
    await expect(
      inbox.getByRole("heading", { name: "Inbox", exact: true }),
    ).toBeVisible();
    await result("inboxDeferred", true);
    await inbox.getByRole("button", { name: "Close", exact: true }).click();
    await expect(inbox).not.toBeVisible();
    await checkpoint("homeNavigation");
    await sidebar();
    await arm("homeNavigation", undefined, "click");
    await page
      .locator(
        variant === "svelte"
          ? '[data-native-room-sidebar] a[href^="/app"]:visible'
          : device.width > 900
            ? '#switcher a[href="/app"]:visible'
            : '#side a[href="/app"]:visible',
      )
      .first()
      .click();
    await expect.poll(() => new URL(page.url()).pathname).toBe("/app");
    await expect(
      page.locator(
        variant === "svelte"
          ? '[data-vb-native="home"]'
          : device.width > 900
            ? ".home"
            : ".phome",
      ),
    ).toBeVisible();
    await expect(
      page.locator(`a[href^="/b/${first.id}"]:visible`).first(),
    ).toBeVisible();
    // Vanilla phoneHome() renders .phome, not desktop home's .home.
    // Require its real visible menu control as well as the room link above.
    if (variant === "vanilla" && device.width <= 900) {
      await expect(page.locator(".phome #pMenu")).toBeVisible();
      await expect(page.locator(".phome #pMenu")).toBeEnabled();
    }
    await result("homeNavigation", true);
    await chooseRoom(first);
    await checkpoint("navigationLifecycle");
    const lifecycle = {
      scope:
        "controlled room/thread transport; actual editor/provider lifecycle is a separate real-Worker cohort",
      baseline: await postGC(),
      cycles: [] as {
        cycle: number;
        ms: number;
        snapshot: Awaited<ReturnType<typeof postGC>>;
      }[],
    };
    for (let cycle = 1; cycle <= config.lifecycleCycles; cycle++) {
      const start = performance.now(),
        room = rooms[cycle % 2];
      await chooseRoom(room);
      await chooseThread(room, room.firstActiveEpic);
      await chooseThread(room, "main");
      await expect
        .poll(() =>
          [...runFixture.sockets.values()].reduce(
            (count, set) => count + set.size,
            0,
          ),
        )
        .toBe(1);
      lifecycle.cycles.push({
        cycle,
        ms: performance.now() - start,
        snapshot: await postGC(),
      });
      sample.navigationLifecycle = lifecycle;
    }
    await page.waitForLoadState("networkidle");
    await checkpoint("settled");
    await cdp.send("HeapProfiler.collectGarbage");
    const settled = await counters();
    for (const key of [
      "JSHeapUsedSize",
      "JSHeapTotalSize",
      "Nodes",
      "Documents",
    ])
      sample.metrics[`settled.${key}`] = settled[key] ?? null;
    sample.settledCounters = settled;
    const longTasks = await page.evaluate(
      () => window.__vbFrontendMetrics.longTasks,
    );
    sample.longTasks = longTasks;
    sample.metrics["longTasks.totalMs"] = longTasks.reduce(
      (sum, item) => sum + item.duration,
      0,
    );
    sample.metrics["longTasks.count"] = longTasks.length;
    assert.deepEqual(errors, [], "Browser errors invalidate this sample");
    assert.deepEqual(
      runFixture.unsupported,
      [],
      "Unknown fixtures invalidate this sample",
    );
    assert.equal(
      [...network.values()].filter((resource) => resource.type === "Document")
        .length,
      1,
      "Unexpected full-document reload",
    );
    assert.deepEqual(
      [...network.values()]
        .filter(
          (resource) =>
            resource.url.startsWith(base) &&
            typeof resource.status === "number" &&
            resource.status >= 400,
        )
        .map((resource) => new URL(resource.url).pathname),
      [],
      "Missing local assets invalidate this sample",
    );
    sample.status = "passed";
  } catch (error) {
    sample.status = "failed";
    sample.failedPhase = phase;
    sample.error =
      error instanceof Error
        ? error.message.slice(0, 8000)
        : "Benchmark failed";
    console.error(
      JSON.stringify({
        profile: shape.name,
        variant,
        repetition,
        warmup,
        failedPhase: phase,
        error: sample.error,
      }),
    );
    if (!page.isClosed()) {
      sample.probeAtFailure = await page
        .evaluate(() => ({
          pending: window.__vbFrontendMetrics?.pending ?? null,
          results: window.__vbFrontendMetrics?.results ?? {},
        }))
        .catch(() => null);
      sample.layoutAtFailure = await layout().catch(() => null);
    }
    if (!cancelled) process.exitCode = 1;
  } finally {
    sample.resources = [...network.values()];
    sample.blockedExternalRequests = blocked;
    sample.pageErrors = errors;
    sample.fixtureTraffic = {
      http: runFixture.http,
      commands: runFixture.commands,
      events: runFixture.deliveredEvents,
      deliveredUTF8Bytes: runFixture.deliveredUTF8Bytes,
      unsupported: runFixture.unsupported,
    };
    await context.close();
    fixture = null;
    await writeFile(
      `${output}/metrics.json`,
      JSON.stringify({ ...results, assets: assetEvidence() }, null, 2) + "\n",
    );
    console.log(
      `${shape.name} ${variant} ${warmup ? "warmup" : `sample ${repetition}`}: ${sample.status}`,
    );
  }
  return sample.status === "passed";
}
try {
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  results.chromium = browser.version();
  assert(!cancelled, "Benchmark cancelled during browser startup");
  trials: for (const shape of profiles)
    for (const device of devices) {
      for (let index = 0; index < config.warmups; index++)
        for (const variant of variants)
          if (
            !(await run(variant, device, shape, index + 1, true)) &&
            config.failFast
          ) {
            results.stoppedAfterInvalidSample = true;
            break trials;
          }
      for (let repetition = 1; repetition <= config.repetitions; repetition++)
        for (const variant of repetition % 2
          ? variants
          : [...variants].reverse())
          if (
            !(await run(variant, device, shape, repetition, false)) &&
            config.failFast
          ) {
            results.stoppedAfterInvalidSample = true;
            break trials;
          }
    }
  const summaries = profiles.flatMap((shape) =>
    devices.flatMap((device) =>
      variants.map((variant) => {
        const rows = samples.filter(
            (sample) =>
              sample.profile === shape.name &&
              sample.device === device.name &&
              sample.variant === variant &&
              !sample.warmup,
          ),
          valid = rows.filter((sample) => sample.status === "passed"),
          keys = [
            ...new Set(valid.flatMap((sample) => Object.keys(sample.metrics))),
          ];
        return {
          profile: shape.name,
          device: device.name,
          variant,
          samples: rows.length,
          passed: valid.length,
          failed: rows.length - valid.length,
          metrics: Object.fromEntries(
            keys.map((key) => [
              key,
              summarize(
                valid.flatMap((sample) =>
                  typeof sample.metrics[key] === "number"
                    ? [sample.metrics[key]]
                    : [],
                ),
              ),
            ]),
          ),
        };
      }),
    ),
  );
  const changed: string[] = [];
  for (const value of assets.values()) {
    try {
      if (
        hash(await readFile(resolve(publicRoot, value.sourcePath))) !==
        value.sourceSHA256
      )
        changed.push(value.sourcePath);
    } catch {
      changed.push(value.sourcePath);
    }
  }
  results.assetChangesDuringRun = changed;
  results.summaries = summaries;
  const budgets = assessBudgets(summaries, config.historyPages);
  results.budgets = budgets;
  results.performanceAcceptance = budgets.some((row) => row.status === "failed")
    ? "failed"
    : "unverified-pending-real-editor-lifecycle-and-full-scope-review";
  results.assets = assetEvidence();
  results.environmentEnd = environment();
  results.status =
    samples.length ===
      profiles.length *
        devices.length *
        variants.length *
        (config.warmups + config.repetitions) &&
    samples.every((sample) => sample.status === "passed") &&
    !changed.length
      ? "passed"
      : "incomplete-or-failed";
  if (changed.length) process.exitCode = 1;
  const byteSummary = samples
    .filter((sample) => !sample.warmup)
    .map((sample) => ({
      profile: sample.profile,
      device: sample.device,
      variant: sample.variant,
      repetition: sample.repetition,
      status: sample.status,
      phases: [
        ...new Set(sample.resources.map((resource) => resource.phase)),
      ].map((phase) => {
        const resources = sample.resources.filter(
            (resource) => resource.phase === phase,
          ),
          actual = resources.filter((resource) => resource.assetKey);
        return {
          phase,
          requests: resources.length,
          knownEncodedTransferBytes: resources.reduce(
            (sum, item) => sum + (item.transferBytes ?? 0),
            0,
          ),
          missingTransferSizes: resources.filter(
            (item) => item.transferBytes === null,
          ).length,
          requestedAppAssetRawBytes: actual.reduce(
            (sum, item) => sum + (assets.get(item.assetKey!)?.rawBytes ?? 0),
            0,
          ),
          requestedAppAssetGzipReferenceBytes: actual.reduce(
            (sum, item) => sum + (assets.get(item.assetKey!)?.gzipBytes ?? 0),
            0,
          ),
        };
      }),
    }));
  results.byteSummary = byteSummary;
  const lines = [
    "# Fully native versus vanilla controlled long-room benchmark",
    `Status: ${results.status}`,
    "",
    `Chromium: ${browser.version()}; ${arch()}; repetitions ${config.repetitions} per variant and device after ${config.warmups} warmup(s); 1440×1000 / 390×844, 4x CPU; fonts ${config.fontPolicy}; exclusive cohort declared ${config.cohortDeclaredExclusive}.`,
    "",
    "All values below require successful measured samples; failures remain in metrics.json. Fail-fast stops at the first invalid trial by default (METRICS_FAIL_FAST=0 continues). Step timeout defaults to 30 seconds (METRICS_STEP_TIMEOUT_MS); navigation timeout is 120 seconds. p95 is nearest rank, not a statistical confidence bound.",
    "",
    "Action/update intervals include automation observation of the required DOM change and two animation frames. They are not pure WebSocket-event or rendering latency; see gaps in metrics.json. Fixture delivery alone never completes these measurements.",
    "",
    "| Workload / device | Variant | Valid/total | Ready p50/p95 ms | Receipt update p50/p95 ms | Compose echo p50/p95 ms | Room switch p50/p95 ms |",
    "|---|---|---:|---:|---:|---:|---:|",
  ];
  const pair = (summary: (typeof summaries)[number], key: string) => {
    const value = summary.metrics[key];
    return value?.n
      ? `${value.p50?.toFixed(1)} / ${value.p95?.toFixed(1)}`
      : "unmeasured";
  };
  for (const summary of summaries)
    lines.push(
      `| ${summary.profile} / ${summary.device} | ${summary.variant} | ${summary.passed}/${summary.samples} | ${pair(summary, "entry.readyWithFontsAndTwoFramesMs")} | ${pair(summary, "receiptUpdate.ms")} | ${pair(summary, "composeEcho.ms")} | ${pair(summary, "roomSwitch.ms")} |`,
    );
  lines.push(
    "",
    "| Workload / device | Variant | Trial/status | Entry all local asset raw / gzip-reference bytes | Entry known HTTP transfer bytes | Post-entry all local asset raw / gzip-reference bytes | Missing transfer sizes |",
    "|---|---|---|---:|---:|---:|---:|",
  );
  for (const row of byteSummary) {
    const entry = row.phases.find((phase) => phase.phase === "entry"),
      later = row.phases.filter((phase) => phase.phase !== "entry");
    lines.push(
      `| ${row.profile} / ${row.device} | ${row.variant} | ${row.repetition}/${row.status} | ${entry?.requestedAppAssetRawBytes ?? "unmeasured"} / ${entry?.requestedAppAssetGzipReferenceBytes ?? "unmeasured"} | ${entry?.knownEncodedTransferBytes ?? "unmeasured"} | ${later.reduce((sum, phase) => sum + phase.requestedAppAssetRawBytes, 0)} / ${later.reduce((sum, phase) => sum + phase.requestedAppAssetGzipReferenceBytes, 0)} | ${row.phases.reduce((sum, phase) => sum + phase.missingTransferSizes, 0)} |`,
    );
  }
  lines.push(
    "",
    "## Approved budget comparisons (not execution status)",
    "",
    "| Workload / device | Metric | Vanilla median | Native median | Limit | Result |",
    "|---|---|---:|---:|---:|---|",
    ...budgets.map(
      (row) =>
        `| ${row.profile} / ${row.device} | ${row.metric} | ${row.vanilla ?? "unverified"} | ${row.native ?? "unverified"} | ${row.limit ?? "unverified"} | ${row.status} |`,
    ),
    "",
    `Performance acceptance: ${results.performanceAcceptance}. Twenty actual editor/provider lifecycle cycles require the separate real-Worker cohort. Previous hybrid budget failures are historical evidence, not overwritten or cleared by generating this report.`,
    "",
    "Scroll RAF intervals, frame-p95/jank counts, thread switching, Inbox loading, CPU/layout counters and heap/nodes are in each raw sample and summaries. V8 heap is not browser RSS.",
  );
  lines.push(
    "",
    "Entry/deferred totals above include all requested local bodies, including local fonts. Budget metrics separately select application HTML/JS/CSS and actual font dependencies. Bytes come from actual requested resources classified by request-start phase, never a directory-wide chunk sum. See byteSummary and resources in metrics.json. gzip references are individually compressed file sizes, not measured transfer or a hypothetical concatenated bundle.",
    "",
    "This is controlled frontend evidence, not production/Worker/provider acceptance. See config, fixture digests, environment, asset hashes and gaps in metrics.json.",
  );
  await writeFile(`${output}/report.md`, lines.join("\n") + "\n");
} catch (error) {
  results.status = cancelled ? "cancelled" : "aborted";
  results.runnerError =
    error instanceof Error ? error.message.slice(0, 8000) : "Benchmark aborted";
  process.exitCode = cancelled ? 130 : 1;
} finally {
  if (results.status === "running")
    results.status = cancelled ? "cancelled" : "aborted";
  await browser?.close();
  server.stop(true);
  process.removeListener("SIGINT", finishSignal);
  process.removeListener("SIGTERM", finishSignal);
  await writeFile(
    `${output}/metrics.json`,
    JSON.stringify({ ...results, assets: assetEvidence() }, null, 2) + "\n",
  );
}
console.log(
  JSON.stringify({ status: results.status, output, samples: samples.length }),
);
