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
import { openNativeSidebar } from "./native-browser-fixtures";
const expect = baseExpect.configure({ timeout: 90000 });
type Variant = "vanilla" | "svelte";
const variants: Variant[] = ["vanilla", "svelte"];
function integer(name: string, fallback: number, min: number, max: number) {
  const value = Number(process.env[name] ?? fallback);
  assert(
    Number.isInteger(value) && value >= min && value <= max,
    `${name}: integer ${min}..${max}`,
  );
  return value;
}
const config = {
  repetitions: integer("METRICS_REPETITIONS", 3, 3, 30),
  warmups: integer("METRICS_WARMUPS", 1, 0, 3),
  historyPages: integer("METRICS_HISTORY_PAGES", 3, 1, 20),
  scrollFrames: integer("METRICS_SCROLL_FRAMES", 30, 10, 180),
  seed: integer("METRICS_SEED", 421, 0, 2147483647),
  width: integer("METRICS_WIDTH", 1440, 1000, 2560),
  height: integer("METRICS_HEIGHT", 1000, 700, 1600),
  fontPolicy: process.env.METRICS_FONTS ?? "local-only",
  forceGC: process.env.METRICS_FORCE_GC === "1",
  cohortDeclaredExclusive: process.env.METRICS_EXCLUSIVE === "1",
};
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
for (const profile of profiles)
  assert(
    config.historyPages <= Math.ceil((profile.messages * 0.6 - 60) / 100),
    "History pages exceed the synthetic main-thread history",
  );
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
};
const assets = new Map<string, Asset>();
async function asset(key: string, path: string, htmlVariant?: Variant) {
  const previous = assets.get(key);
  if (previous) return previous;
  const file = await realpath(resolve(publicRoot, path));
  assert(file.startsWith(publicRoot + sep), "Asset escaped public root");
  const original = await readFile(file);
  let body = original,
    injectedVersion = false;
  if (htmlVariant) {
    const source = original.toString(),
      version =
        source.match(/<meta\s+name=["']vb-v["']\s+content=["']([^"']+)/)?.[1] ??
        hash(original).slice(0, 20);
    versions[htmlVariant] = version;
    if (!source.includes('name="vb-v"') && !source.includes("name='vb-v'")) {
      body = Buffer.from(
        source.replace(
          /<head\b[^>]*>/i,
          (match) => `${match}\n<meta name="vb-v" content="${version}">`,
        ),
      );
      injectedVersion = true;
    }
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
    };
  assets.set(key, value);
  return value;
}
const versions: Record<Variant, string> = { vanilla: "", svelte: "" };
await asset("@shell/vanilla", "app.html", "vanilla");
await asset("@shell/svelte", "app-svelte.html", "svelte");
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
    const Original = window.WebSocket;
    window.WebSocket = class extends Original {
      constructor(url: string | URL, protocols?: string | string[]) {
        if (protocols === undefined) super(url);
        else super(url, protocols);
        this.addEventListener("message", (event) => {
          if (typeof event.data !== "string") return;
          try {
            const value = JSON.parse(event.data),
              pending = probe.pending;
            if (
              !pending?.event ||
              value.t !== pending.event ||
              (pending.matchTitle && value.book?.title !== pending.matchTitle)
            )
              return;
            if (pending.start === null) pending.start = performance.now();
            void probe.finish();
          } catch {}
        });
      }
    };
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
    "Default local-only font policy blocks external fonts; native local fonts remain measured. Optional network-public-fonts changes this experiment.",
    "Desktop headless Chromium/reduced motion only; no iOS/Safari/mobile/IME/hardware GPU claim.",
    "Switch/inbox DOM probes include automation observation overhead. Two animation frames are paint opportunities, not compositor presentation proof.",
    "CDP task/script/layout counters complement latency; frame timing is headless RAF, not a user's display FPS.",
    "Small-sample p95 uses nearest rank and can equal the observed maximum. No inferential significance/confidence interval claim.",
    "Deferred bytes cover only exercised interactions and Inbox. Editor/Yjs/MCP/media/tool graphs not visited are unmeasured, not zero.",
    "Synthetic workload is deterministic, not representative production telemetry. Full raw samples and failures are retained.",
  ],
};
type Sample = {
  variant: Variant;
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
  };
  fixture = runFixture;
  let phase = "entry";
  const sample: Sample = {
    variant,
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
    viewport: { width: config.width, height: config.height },
    locale: "en-US",
    colorScheme: "light",
    reducedMotion: "reduce",
    serviceWorkers: "block",
  });
  context.setDefaultTimeout(90000);
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
      socket.onMessage(() => {});
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
  const messageSelector =
    variant === "svelte" ? "#msgs [data-chat-message]" : "#msgs .msg[id^=m]";
  const bodySelector =
    variant === "svelte" ? "#msgs [data-message-body]" : "#msgs .txt";
  async function layout() {
    return page.locator("#msgs").evaluate((element, selector) => {
      const rect = element.getBoundingClientRect(),
        rows = Array.from(
          element.querySelectorAll<HTMLElement>(
            selector.replace(/^#msgs /, ""),
          ),
        ),
        visible = rows.filter((row) => {
          const r = row.getBoundingClientRect();
          return r.bottom > rect.top && r.top < rect.bottom;
        });
      return {
        scrollTop: element.scrollTop,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight,
        renderedMessages: rows.length,
        firstDOM: rows[0]?.id || null,
        firstVisible: visible[0]?.id || null,
      };
    }, messageSelector);
  }
  async function sidebar() {
    if (variant === "svelte") await openNativeSidebar(page);
  }
  try {
    const first = rooms[0],
      last = first.all.filter((message) => message.thread === "main").at(-1)!;
    const response = await page.goto(
      `${base}/b/${first.id}${variant === "svelte" ? "?ui=svelte" : ""}`,
      { waitUntil: "domcontentloaded" },
    );
    assert.equal(response?.headers()["x-vibebook-ui"], variant);
    await expect(page.locator("#composer textarea")).toBeVisible();
    await expect(page.locator("#composer textarea")).toBeEnabled();
    await expect(page.locator(`#m${last.id}`)).toBeVisible();
    assert.equal(
      (await page.locator("[data-native-composer]").count()) > 0,
      variant === "svelte",
    );
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
    phase = "history";
    const beforeHistory = await counters(),
      historyStart = await layout();
    for (let index = 0; index < config.historyPages; index++) {
      const key = `history${index + 1}`,
        oldest = (await layout()).firstDOM;
      await page
        .locator("#msgs")
        .evaluate((element) => (element.scrollTop = element.scrollHeight));
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
      await arm(key, "older");
      await page
        .locator("#msgs")
        .evaluate((element) => (element.scrollTop = 0));
      await result(key);
      await expect.poll(async () => (await layout()).firstDOM).not.toBe(oldest);
    }
    sample.historyBefore = historyStart;
    sample.historyAfter = await layout();
    deltas("history", beforeHistory, await counters());
    phase = "scroll";
    const beforeScroll = await counters();
    const frames = await page
      .locator("#msgs")
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
    phase = "receiptUpdate";
    await page
      .locator("#msgs")
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
    await result("receiptUpdate");
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
    phase = "compose";
    await page
      .locator("#msgs")
      .evaluate((element) => (element.scrollTop = element.scrollHeight));
    const composeBefore = await counters(),
      draft = "Synthetic Unicode compose café 日本語 🧪";
    await arm("draftInput", undefined, "input");
    await page.locator("#composer textarea").focus();
    await page.keyboard.insertText(draft);
    await result("draftInput");
    await expect(page.locator("#composer textarea")).toHaveValue(draft);
    await arm("composeEcho", "msg", "click");
    await page
      .locator(variant === "svelte" ? "[data-composer-send]" : "#sendBtn")
      .click();
    await result("composeEcho");
    await expect(page.locator("#msgs")).toContainText(draft);
    await expect(page.locator("#composer textarea")).toHaveValue("");
    deltas("compose", composeBefore, await counters());
    phase = "threadSwitch";
    await sidebar();
    const thread = first.firstActiveEpic;
    await arm("threadSwitch", undefined, "click");
    await page
      .locator(
        variant === "svelte"
          ? `#side [data-epic-thread="${thread}"]`
          : `#side [data-thread="${thread}"]`,
      )
      .first()
      .click();
    await expect(page.locator("#msgs")).toContainText(
      `Synthetic A message ${first.all.filter((message) => message.thread === thread).at(-1)!.id}`,
    );
    await result("threadSwitch", true);
    phase = "roomSwitch";
    await arm("roomSwitch", "state", "click", rooms[1].root.book.title);
    await page
      .locator(
        `a[href="/b/${rooms[1].id}${variant === "svelte" ? "?ui=svelte" : ""}"]:visible`,
      )
      .first()
      .click();
    await result("roomSwitch");
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toBe(`/b/${rooms[1].id}`);
    await expect(page.locator("#msgs")).toContainText("Synthetic B message");
    phase = "inboxDeferred";
    await arm("inboxDeferred", undefined, "click");
    await page.locator("#inboxBtn").click();
    const inbox = page.getByRole("dialog", { name: "Inbox", exact: true });
    await expect(inbox).toBeVisible();
    await result("inboxDeferred", true);
    await inbox.getByRole("button", { name: "Close", exact: true }).click();
    await expect(inbox).not.toBeVisible();
    await page.waitForLoadState("networkidle");
    phase = "settled";
    if (config.forceGC) await cdp.send("HeapProfiler.collectGarbage");
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
}
try {
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  results.chromium = browser.version();
  assert(!cancelled, "Benchmark cancelled during browser startup");
  for (const shape of profiles) {
    for (let index = 0; index < config.warmups; index++)
      for (const variant of variants)
        await run(variant, shape, index + 1, true);
    for (let repetition = 1; repetition <= config.repetitions; repetition++)
      for (const variant of repetition % 2 ? variants : [...variants].reverse())
        await run(variant, shape, repetition, false);
  }
  const summaries = profiles.flatMap((shape) =>
    variants.map((variant) => {
      const rows = samples.filter(
          (sample) =>
            sample.profile === shape.name &&
            sample.variant === variant &&
            !sample.warmup,
        ),
        valid = rows.filter((sample) => sample.status === "passed"),
        keys = [
          ...new Set(valid.flatMap((sample) => Object.keys(sample.metrics))),
        ];
      return {
        profile: shape.name,
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
  results.assets = assetEvidence();
  results.environmentEnd = environment();
  results.status =
    samples.every((sample) => sample.status === "passed") && !changed.length
      ? "passed"
      : "incomplete-or-failed";
  if (changed.length) process.exitCode = 1;
  const byteSummary = samples
    .filter((sample) => !sample.warmup)
    .map((sample) => ({
      profile: sample.profile,
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
    "# Current frontend synthetic long-room benchmark",
    `Status: ${results.status}`,
    "",
    `Chromium: ${browser.version()}; ${arch()}; repetitions ${config.repetitions}; fonts ${config.fontPolicy}; exclusive cohort declared ${config.cohortDeclaredExclusive}.`,
    "",
    "All values below require successful measured samples; failures remain in metrics.json. p95 is nearest rank, not a statistical confidence bound.",
    "",
    "| Workload | Variant | Valid/total | Ready p50/p95 ms | Receipt update p50/p95 ms | Compose echo p50/p95 ms | Room switch p50/p95 ms |",
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
      `| ${summary.profile} | ${summary.variant} | ${summary.passed}/${summary.samples} | ${pair(summary, "entry.readyWithFontsAndTwoFramesMs")} | ${pair(summary, "receiptUpdate.ms")} | ${pair(summary, "composeEcho.ms")} | ${pair(summary, "roomSwitch.ms")} |`,
    );
  lines.push(
    "",
    "| Workload | Variant | Trial/status | Entry local app raw / gzip-reference bytes | Entry known HTTP transfer bytes | Post-entry local app raw / gzip-reference bytes | Missing transfer sizes |",
    "|---|---|---|---:|---:|---:|---:|",
  );
  for (const row of byteSummary) {
    const entry = row.phases.find((phase) => phase.phase === "entry"),
      later = row.phases.filter((phase) => phase.phase !== "entry");
    lines.push(
      `| ${row.profile} | ${row.variant} | ${row.repetition}/${row.status} | ${entry?.requestedAppAssetRawBytes ?? "unmeasured"} / ${entry?.requestedAppAssetGzipReferenceBytes ?? "unmeasured"} | ${entry?.knownEncodedTransferBytes ?? "unmeasured"} | ${later.reduce((sum, phase) => sum + phase.requestedAppAssetRawBytes, 0)} / ${later.reduce((sum, phase) => sum + phase.requestedAppAssetGzipReferenceBytes, 0)} | ${row.phases.reduce((sum, phase) => sum + phase.missingTransferSizes, 0)} |`,
    );
  }
  lines.push(
    "",
    "Scroll RAF intervals, frame-p95/jank counts, thread switching, Inbox loading, CPU/layout counters and heap/nodes are in each raw sample and summaries. V8 heap is not browser RSS.",
  );
  lines.push(
    "",
    "Entry/deferred bytes come from actual requested resources classified by request-start phase, never a directory-wide chunk sum. See byteSummary and resources in metrics.json. gzip references are individually compressed file sizes, not measured transfer or a hypothetical concatenated bundle.",
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
