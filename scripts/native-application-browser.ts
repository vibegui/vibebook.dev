// Integrated NativeApplication/RoomScope against a real disposable loopback
// Worker. Fixtures enter through public HTTP/MCP, never SQL or fabricated WS.
import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import {
  chromium,
  expect as baseExpect,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import * as z from "zod/mini";
import {
  AttachmentSchema,
  CreateRoomResult,
  MeResult,
  OkResult,
  PostMessageResult,
} from "../shared/schemas";
import { parseRoomEvent, record } from "../shared/validation";
import { createRoomStore } from "../svelte/roomStore";
import { createRoomApi } from "../svelte/transport";
import type { FetchLike } from "../svelte/transport";
import type { DocumentPane } from "../svelte/features/documents/types";
import {
  nativeBrowserFixtures,
  localBrowserError,
} from "./native-browser-fixtures";
import { nativeTestAgent } from "./native-test-mcp";
import type {
  NativeApplicationProfile,
  NativeApplicationAuditFixture,
} from "./native-application-browser-types";

type SocketCloseObservation = {
  path: string;
  invokedMs: number;
  readyBefore: number;
  readyAfter?: number;
  codePassed: number | null;
  closedMs?: number;
  lifetimeAfterInvocationMs?: number;
  closedCode?: number;
  wasClean?: boolean;
  threw?: string;
};
declare global {
  interface Window {
    __nativeSocketCloseObservations?: SocketCloseObservation[];
  }
}
import { auditNativeApplicationProfiles } from "./native-application-profiles";
import { auditNativeAppNavigation } from "./native-app-navigation-probe";
import { vanillaAppNavigationDriver } from "./app-navigation-ui-driver";
import {
  auditNativeApplicationLifecycle,
  type ApplicationSockets,
} from "./native-application-lifecycle";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
  "Disposable loopback Worker only",
);
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-application-browser";
await mkdir(output, { recursive: true });
const expect = baseExpect.configure({ timeout: 60_000 }),
  token = randomBytes(6).toString("hex");
const ownerEmail = `native-root-owner-${token}@example.test`,
  peerEmail = `native-root-peer-${token}@example.test`;
const phases: {
  name: string;
  status: "running" | "passed" | "failed";
  ms: number;
}[] = [];
const errors: ReturnType<typeof localBrowserError>[] = [];
const report: Record<string, unknown> = {
  status: "running",
  suppliedRevision: process.env.TEST_APP_REVISION ?? null,
  phases,
  pageErrors: errors,
  scope:
    "Actual NativeApplication/RoomScope with real Worker/D1/Book/R2/DocRoom, public HTTP/MCP fixture setup and real browser events",
  gaps: [
    "DEV example.test identities do not verify email/login provider issuance",
    "No hosted provider, external MCP app, production deployment or crash durability acceptance",
    "Chromium viewport/keyboard is not Safari/iOS/hardware touch/IME/AT acceptance",
    "Fixture rooms, messages and real local OAuth grant remain in disposable Worker persistence",
    "This functional gate is not a timing/performance benchmark",
    "No canonical/API/WebSocket responses are mocked; legacy Google CSS/local-runner discovery isolation is explicitly listed",
  ],
};
let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null,
  closing: Promise<void> | null = null,
  interrupted = false;
const contexts = new Set<BrowserContext>();
async function closeBrowser() {
  if (browser) {
    const owned = browser;
    browser = null;
    closing = owned.close();
  }
  await closing;
}
async function closeInvocationEvidence() {
  return Promise.all(
    [...contexts]
      .flatMap((context) => context.pages())
      .map(async (page) => {
        try {
          return await page.evaluate(
            () => window.__nativeSocketCloseObservations ?? [],
          );
        } catch {
          return [];
        }
      }),
  );
}
function sourceLocations(error: unknown): string[] {
  return error instanceof Error
    ? [
        ...new Set(
          [
            ...(error.stack ?? "").matchAll(
              /\bat [^\n]*?\b(scripts\/native-application-(?:browser|lifecycle|profiles)\.ts:\d+:\d+)\)?(?:\n|$)/g,
            ),
          ].map((match) => match[1]!),
        ),
      ]
    : [];
}
const signal = () => {
  interrupted = true;
  process.exitCode = 130;
  void closeBrowser().catch(() => {});
};
process.on("SIGINT", signal);
process.on("SIGTERM", signal);
async function step(name: string, run: () => Promise<void>) {
  const item: (typeof phases)[number] = { name, status: "running", ms: 0 };
  phases.push(item);
  console.info(`[native-application] ${name}`);
  const started = Date.now();
  try {
    if (interrupted) throw Error("Interrupted");
    await run();
    item.status = "passed";
  } catch (error) {
    item.status = "failed";
    throw error;
  } finally {
    item.ms = Date.now() - started;
  }
}
async function identity(
  email: string,
  profile: NativeApplicationProfile = {
    lang: "en",
    theme: "light",
    width: 1440,
  },
) {
  assert(email.endsWith("@example.test") && browser);
  const context = await browser.newContext({
    locale: profile.lang === "en" ? "en-US" : "pt-BR",
    viewport: { width: profile.width, height: 1000 },
    reducedMotion: "reduce",
  });
  contexts.add(context);
  context.on("close", () => contexts.delete(context));
  context.setDefaultTimeout(60_000);
  context.setDefaultNavigationTimeout(90_000);
  await nativeBrowserFixtures(context, base);
  await context.addInitScript((origin) => {
    const began = Date.now(),
      original = WebSocket.prototype.close;
    const observations: SocketCloseObservation[] = [];
    window.__nativeSocketCloseObservations = observations;
    WebSocket.prototype.close = function (
      this: WebSocket,
      ...args: Parameters<WebSocket["close"]>
    ) {
      const url = new URL(this.url);
      const local = url.host === new URL(origin).host;
      const path = url.pathname;
      if (
        !local ||
        !/^\/(?:ws\/[a-f0-9]{6,40}|yjs\/[a-f0-9]{6,40}(?:~[\w-]+)?|ws-me)$/.test(
          path,
        )
      )
        return original.apply(this, args);
      const observation: SocketCloseObservation = {
        path,
        invokedMs: Date.now() - began,
        readyBefore: this.readyState,
        codePassed: args[0] ?? null,
      };
      if (observations.length === 128) observations.shift();
      observations.push(observation);
      this.addEventListener(
        "close",
        (event) => {
          observation.closedMs = Date.now() - began;
          observation.lifetimeAfterInvocationMs =
            observation.closedMs - observation.invokedMs;
          observation.closedCode = event.code;
          observation.wasClean = event.wasClean;
        },
        { once: true },
      );
      try {
        return original.apply(this, args);
      } catch (error) {
        observation.threw =
          error instanceof Error ? error.name : "UnknownError";
        throw error;
      } finally {
        observation.readyAfter = this.readyState;
      }
    };
  }, base);
  await context.addCookies([
    { name: "dev_as", value: email, url: base },
    { name: "vb_lang", value: profile.lang, url: base },
  ]);
  await context.addInitScript((theme) => {
    // Context init scripts also run in opaque App frames. Theme is an
    // application-document fixture, not a write into untrusted child realms.
    if (window !== window.top) return;
    localStorage.setItem("vb.theme", theme);
  }, profile.theme);
  const response = await context.request.get(`${base}/api/me?ui=svelte`);
  assert(response.ok(), "Local DEV identity must be enabled");
  const me = MeResult.parse(await response.json());
  assert.equal(
    me.email,
    email,
    "Worker must resolve distinct real test identities",
  );
  return { context, me };
}
function observe(page: Page, roomId: string) {
  const store = createRoomStore(),
    sent: Record<string, number> = {},
    received: Record<string, number> = {};
  page.on("pageerror", (error) => errors.push(localBrowserError(error, base)));
  const active = new Map<object, keyof ApplicationSockets>();
  const activeCounts: ApplicationSockets = { book: 0, personal: 0, yjs: 0 };
  const observedAt = Date.now();
  const socketEvents: {
    kind: keyof ApplicationSockets;
    path: string;
    createdMs: number;
    closedMs?: number;
    lifetimeMs?: number;
  }[] = [];
  page.on("websocket", (socket) => {
    const path = new URL(socket.url()).pathname;
    const kind =
      path === "/ws-me"
        ? "personal"
        : path.startsWith("/ws/")
          ? "book"
          : path.startsWith("/yjs/")
            ? "yjs"
            : null;
    if (kind) {
      active.set(socket, kind);
      activeCounts[kind]++;
      // Only these known local route shapes are retained; never URL queries,
      // cookies, access codes, frames, userinfo or arbitrary remote paths.
      const safePath =
        /^\/(?:ws\/[a-f0-9]{6,40}|yjs\/[a-f0-9]{6,40}(?:~[\w-]+)?|ws-me)$/.test(
          path,
        )
          ? path
          : "/" + kind;
      const event: (typeof socketEvents)[number] = {
        kind,
        path: safePath,
        createdMs: Date.now() - observedAt,
      };
      if (socketEvents.length === 128) socketEvents.shift();
      socketEvents.push(event);
      socket.on("close", () => {
        if (!active.delete(socket)) return;
        activeCounts[kind]--;
        event.closedMs = Date.now() - observedAt;
        event.lifetimeMs = event.closedMs - event.createdMs;
      });
    }
    if (path !== `/ws/${roomId}`) return;
    socket.on("framesent", ({ payload }) => {
      try {
        const value: unknown = JSON.parse(payload.toString());
        if (record(value) && typeof value.t === "string")
          sent[value.t] = (sent[value.t] ?? 0) + 1;
      } catch {
        /* Non-JSON data is not a Book command. */
      }
    });
    socket.on("framereceived", ({ payload }) => {
      try {
        const event = parseRoomEvent(payload.toString());
        received[event.t] = (received[event.t] ?? 0) + 1;
        store.apply(event, roomId);
      } catch {
        errors.push({ name: "InvalidRealBookFrame", locations: [] });
      }
    });
  });
  return {
    store,
    sent,
    received,
    activeCounts,
    socketEvents,
    activeSockets(): ApplicationSockets {
      const counts = { book: 0, personal: 0, yjs: 0 };
      for (const kind of active.values()) counts[kind]++;
      return counts;
    },
  };
}
function roomApi(context: BrowserContext, id: string) {
  const fetcher: FetchLike = async (input, init) => {
    const request =
      input instanceof Request
        ? new Request(input, init)
        : new Request(new URL(String(input), base), init);
    const response = await context.request.fetch(request.url, {
      method: request.method,
      headers: { ...Object.fromEntries(request.headers), origin: base },
      data: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : Buffer.from(await request.arrayBuffer()),
    });
    return new Response(new Uint8Array(await response.body()), {
      status: response.status(),
      headers: response.headers(),
    });
  };
  return createRoomApi(id, fetcher);
}
async function post(
  context: BrowserContext,
  id: string,
  text: string,
  thread = "main",
) {
  const response = await context.request.post(`${base}/api/books/${id}/post`, {
    headers: { origin: base },
    data: { text, thread },
  });
  assert(response.ok(), `Real message POST status ${response.status()}`);
  const result = PostMessageResult.parse(await response.json());
  assert(result.ok, "Actual message refused");
  return result.id;
}
export async function openIntegratedSidebar(page: Page) {
  const layout = page.locator("[data-native-room-layout]");
  await expect(layout).toBeVisible();
  if ((page.viewportSize()?.width ?? 1440) <= 900) {
    if ((await layout.getAttribute("data-sheet")) !== "side")
      await page
        .locator("[data-native-room-header] [data-native-thread-header]")
        .getByRole("button", {
          name: /^(Switch conversation|Trocar de conversa)$/,
        })
        .click();
    await expect(layout).toHaveAttribute("data-sheet", "side");
  } else {
    const expand = page
      .locator("[data-native-room-sidebar]")
      .getByRole("button", { name: /^(Open menu|Abrir menu)$/ });
    if (await expand.isVisible()) await expand.click();
  }
}
export async function openIntegratedPane(
  page: Page,
  pane: Exclude<DocumentPane, "view">,
) {
  const layout = page.locator("[data-native-room-layout]");
  const content: Record<Exclude<DocumentPane, "view">, string> = {
    doc: "[data-native-document]",
    board: "[data-board-scope]",
    files: '[data-vb-native="files"]',
    apps: "[data-native-apps]",
    agents: "[data-native-agents]",
    decisions: "[data-decisions-panel]",
    reminders: "[data-reminders-panel]",
  };
  await expect(layout).toBeVisible();
  const full = page.locator("[data-native-board-toggle]");
  if ((await full.getAttribute("aria-pressed")) === "true") await full.click();
  if ((page.viewportSize()?.width ?? 1440) <= 900) {
    const button = page.locator(
      `[data-room-peek] [data-document-pane="${pane}"]`,
    );
    if (pane === "board") {
      await full.click();
      await expect(full).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(content.board)).toBeVisible();
      return;
    }
    if (
      (await layout.getAttribute("data-sheet")) !== "doc" ||
      (await layout.getAttribute("data-pane")) !== pane
    )
      await button.click();
    await expect(layout).toHaveAttribute("data-sheet", "doc");
  } else {
    const button = page.locator(
      `[data-room-document-toolbar] [data-document-pane="${pane}"]`,
    );
    if (!(await button.isVisible()))
      await page.locator("[data-native-document-toggle]").click();
    if ((await layout.getAttribute("data-pane")) !== pane) await button.click();
  }
  await expect(layout).toHaveAttribute("data-pane", pane);
  // A selected pane or a loading placeholder is not feature readiness. Include
  // its actual first module load before font/a11y/history assertions continue.
  await expect(page.locator(content[pane])).toBeVisible();
}
async function expectThread(page: Page, roomId: string, thread = "main") {
  await expect
    .poll(() => {
      const url = new URL(page.url());
      return {
        path: url.pathname,
        ui: url.searchParams.get("ui"),
        thread: url.searchParams.get("t") ?? "main",
      };
    })
    .toEqual({ path: "/b/" + roomId, ui: "svelte", thread });
}
async function nativeEdit(page: Page) {
  await openIntegratedPane(page, "doc");
  const editor = page.locator("[data-document-editor] .cm-content");
  if (!(await editor.isVisible()))
    await page
      .locator("[data-native-document] > footer")
      .getByRole("button", { name: /^(Edit|Editar)$/ })
      .click();
  await expect(editor).toBeVisible();
  await expect(page.locator("[data-native-document]")).toContainText(
    "Live connection synchronized. Server persistence is asynchronous.",
  );
  return editor;
}
async function anchor(page: Page) {
  return page.locator("[data-room-chat]").evaluate((node) => {
    const bounds = node.getBoundingClientRect(),
      candidates = [...node.querySelectorAll<HTMLElement>('[id^="m"]')].filter(
        (row) =>
          /^m\d+$/.test(row.id) &&
          row.getBoundingClientRect().top >= bounds.top + 8 &&
          row.getBoundingClientRect().bottom < bounds.bottom - 8,
      );
    const first = candidates[0];
    if (!first) throw Error("No fully visible actual message anchor");
    return {
      id: first.id,
      y: first.getBoundingClientRect().top - bounds.top,
      top: node.scrollTop,
      height: node.scrollHeight,
      client: node.clientHeight,
    };
  });
}

try {
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  if (interrupted) throw Error("Interrupted startup");
  report.browserVersion = browser.version();
  const owner = await identity(ownerEmail),
    peer = await identity(peerEmail);
  report.meVersion = owner.me.v;
  const a = await owner.context.newPage(),
    b = await peer.context.newPage();
  let roomA = "",
    roomB = "",
    epic = "",
    roomTitle = "",
    fileId = "",
    codeMessageId = 0;
  const docSeed = `# Native integrated document\n\nCanonical Unicode café 日本語 ${token}\n`,
    fileText = `Real R2 integrated viewer ${token}\n`;
  const agent = await nativeTestAgent(a, base);
  await step(
    "real HTTP/MCP Book/D1/R2 setup and variant/build identity",
    async () => {
      roomTitle = `Native integrated room ${token}`;
      for (const title of [roomTitle, `Native second room ${token}`]) {
        const response = await owner.context.request.post(`${base}/api/books`, {
          headers: { origin: base },
          data: { title },
        });
        assert(response.ok());
        const created = CreateRoomResult.parse(await response.json());
        if (!roomA) roomA = created.id;
        else roomB = created.id;
      }
      const invite = await owner.context.request.post(
        `${base}/api/books/${roomA}/members`,
        { headers: { origin: base }, data: { email: peerEmail } },
      );
      assert(invite.ok());
      OkResult.parse(await invite.json());
      epic = z.object({ epic_id: z.string() }).parse(
        await agent("start_epic", {
          room_id: roomA,
          title: `Integrated thread ${token}`,
          why: "Real RootScope browser verification",
          tasks: ["Canonical fixture task"],
          backlog: true,
        }),
      ).epic_id;
      await agent("update_doc", { room_id: roomA, markdown: docSeed });
      await agent("update_doc", {
        room_id: roomA,
        epic_id: epic,
        markdown: `# Real lifecycle epic document\n\n${token} café 日本語\n`,
      });
      for (let index = 0; index < 96; index++)
        await post(
          owner.context,
          roomA,
          `Real fixture ${token} row ${String(index).padStart(3, "0")} — neutral reproducible message text for reading-anchor coverage.`,
        );
      // Human posts intentionally render literally. Use a real agent post for
      // the existing Markdown path, never change product rendering for a test.
      // MCP agentPost returns ok/id; HTTP humanPost additionally returns thread.
      const codeMessage = z
        .object({ ok: z.literal(true), id: z.number() })
        .parse(
          await agent("post", {
            room_id: roomA,
            thread: "main",
            model: "native-browser-fixture",
            text: "```ts\nconst nativeRootFixture = 'real Book message';\n```\nCanonical code block for the actual CommitMono role.",
          }),
        );
      assert(codeMessage.ok);
      codeMessageId = codeMessage.id;
      await post(owner.context, roomA, `Real epic message ${token}`, epic);
      const file = AttachmentSchema.parse(
        await roomApi(owner.context, roomA).uploadFile({
          name: `integrated-${token}.txt`,
          type: "text/plain",
          body: fileText,
        }),
      );
      fileId = file.id;
      const selected = await owner.context.request.get(
          `${base}/b/${roomA}?ui=svelte`,
        ),
        html = await selected.text();
      assert.equal(selected.headers()["x-vibebook-ui"], "svelte");
      const unselected = await owner.context.request.get(`${base}/b/${roomA}`);
      assert.equal(unselected.headers()["x-vibebook-ui"], "vanilla");
      assert(
        !(await unselected.text()).includes("/svelte-preview/app.js"),
        "Unselected vanilla default must remain",
      );
      const entry = html.match(
          /<script\b[^>]*\bsrc=["']([^"']*\/svelte-preview\/app\.js[^"']*)["']/,
        )?.[1],
        css = html.match(
          /href=["']([^"']*\/svelte-preview\/ui\.css[^"']*)["']/,
        )?.[1];
      assert(entry && css);
      const entryResponse = await owner.context.request.get(
          new URL(entry, base).href,
        ),
        cssResponse = await owner.context.request.get(new URL(css, base).href);
      assert(entryResponse.ok() && cssResponse.ok());
      report.application = {
        roomA,
        roomB,
        epic,
        fileId,
        codeMessageId,
        vanillaDefault: true,
        entrySha256: createHash("sha256")
          .update(await entryResponse.body())
          .digest("hex"),
        cssSha256: createHash("sha256")
          .update(await cssResponse.body())
          .digest("hex"),
        shellVersion:
          html.match(/name=["']vb-v["'][^>]*content=["']([^"']+)/)?.[1] ?? null,
      };
      await expect
        .poll(async () =>
          MeResult.parse(
            await (
              await owner.context.request.get(`${base}/api/me?ui=svelte`)
            ).json(),
          ).books.some((book) => book.id === roomA),
        )
        .toBe(true);
    },
  );
  const aWire = observe(a, roomA),
    bWire = observe(b, roomA);
  report.wire = {
    owner: {
      sent: aWire.sent,
      received: aWire.received,
      active: aWire.activeCounts,
      sockets: aWire.socketEvents,
    },
    peer: {
      sent: bWire.sent,
      received: bWire.received,
      active: bWire.activeCounts,
      sockets: bWire.socketEvents,
    },
  };
  await step(
    "Native Home → room/thread/Back with app-owned room and thread drafts",
    async () => {
      await a.goto(`${base}/app?ui=svelte`);
      await expect(a.locator('[data-vb-native="home"]')).toBeVisible();
      const freshVersion = MeResult.parse(
        await (
          await owner.context.request.get(`${base}/api/me?ui=svelte`)
        ).json(),
      ).v;
      assert.equal(
        await a.locator('meta[name="vb-v"]').getAttribute("content"),
        freshVersion,
        "Worker shell metadata must use the Me version domain",
      );
      await expect(a.locator('[data-vb-native="update"]')).toHaveCount(0);
      await a
        .locator(`[data-vb-native="home"] [data-room-id="${roomA}"] a`)
        .click();
      await expect(
        a.locator("[data-native-app-shell] [data-native-room-layout]"),
      ).toBeVisible();
      await expect.poll(() => aWire.store.get()?.me).toBe(ownerEmail);
      const composer = a.locator("[data-native-composer] #input");
      await composer.fill(`Root draft ${token}`);
      await openIntegratedSidebar(a);
      await a.locator(`[data-epic-thread="${epic}"]`).click();
      await expectThread(a, roomA, epic);
      await expect(composer).toHaveValue("");
      await composer.fill(`Thread draft ${token}`);
      await a.goBack();
      await expectThread(a, roomA);
      await expect(composer).toHaveValue(`Root draft ${token}`);
      await a
        .locator('[data-vb-native="room-navigation"]')
        .getByRole("button", { name: "Your vibebooks", exact: true })
        .click();
      await expect(a.locator('[data-vb-native="home"]')).toBeVisible();
      await a
        .locator(`[data-vb-native="home"] [data-room-id="${roomB}"] a`)
        .click();
      await expect(composer).toBeVisible();
      await expect(composer).toHaveValue("");
      await composer.fill(`Second room draft ${token}`);
      await a.goBack();
      await expect(a.locator('[data-vb-native="home"]')).toBeVisible();
      await a.goBack();
      await expect(a.locator("[data-native-room-layout]")).toBeVisible();
      await expect(composer).toHaveValue(`Root draft ${token}`);
      await openIntegratedSidebar(a);
      await a.locator(`[data-epic-thread="${epic}"]`).click();
      await expectThread(a, roomA, epic);
      await expect(composer).toHaveValue(`Thread draft ${token}`);
      await a.goBack();
      await expectThread(a, roomA);
      await expect(composer).toHaveValue(`Root draft ${token}`);
      await b.goto(`${base}/b/${roomA}?ui=svelte`);
      await expect.poll(() => bWire.store.get()?.me).toBe(peerEmail);
      await expect(b.locator("[data-native-composer] #input")).toBeVisible();
    },
  );
  await step(
    "actual native compose → Worker ACK/canonical Book WS → second native client",
    async () => {
      const text = `Native UI send ${token}`,
        composer = a.locator("[data-native-composer] #input");
      await composer.fill(text);
      await a.locator("[data-composer-send]").click();
      await expect
        .poll(
          () =>
            aWire.store.get()?.messages.find((message) => message.text === text)
              ?.id,
        )
        .toBeGreaterThan(0);
      const id = aWire.store
        .get()!
        .messages.find((message) => message.text === text)!.id;
      await expect(a.locator(`[data-room-chat] #m${id}`)).toContainText(text);
      await expect(b.locator(`[data-room-chat] #m${id}`)).toContainText(text);
      await expect(composer).toHaveValue("");
      report.sentMessage = id;
    },
  );
  await step(
    "unpinned reading anchor → full Board → real hidden peer WS update → restore",
    async () => {
      const reading: {
        checkpoint: string;
        before?: Awaited<ReturnType<typeof anchor>>;
        peerMessage?: number;
        windowBefore?: string[];
        windowAfterRestore?: string[];
        snapshots: unknown[];
      } = { checkpoint: "fonts-ready", snapshots: [] };
      report.reading = reading;
      const capture = async () => {
        const geometry = await a.evaluate((prior) => {
          const node = document.querySelector<HTMLElement>("[data-room-chat]"),
            layout = document.querySelector("[data-native-room-layout]");
          if (!node) return { missingScroller: true };
          const rect = node.getBoundingClientRect(),
            rows = [...node.querySelectorAll<HTMLElement>('[id^="m"]')].filter(
              (row) => /^m\d+$/.test(row.id),
            );
          const row = prior
            ? node.querySelector<HTMLElement>("#" + prior.id)
            : null;
          return {
            top: node.scrollTop,
            height: node.scrollHeight,
            client: node.clientHeight,
            rect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
            },
            visible: node.getClientRects().length > 0,
            pane: layout?.getAttribute("data-pane"),
            sheet: layout?.getAttribute("data-sheet"),
            boardPressed: document
              .querySelector("[data-native-board-toggle]")
              ?.getAttribute("aria-pressed"),
            mountedRows: rows.length,
            rowIds: rows.map((row) => row.id),
            firstId: rows[0]?.id,
            lastId: rows.at(-1)?.id,
            anchor: row
              ? { id: row.id, y: row.getBoundingClientRect().top - rect.top }
              : null,
          };
        }, reading.before ?? null);
        reading.snapshots.push({ checkpoint: reading.checkpoint, geometry });
      };
      const checkpoint = async (name: string) => {
        reading.checkpoint = name;
        console.info("[native-application:reading] " + name);
        await capture();
      };
      try {
        await a.evaluate(() => document.fonts.ready);
        const scroller = a.locator("[data-room-chat]");
        await checkpoint("wheel-unpin");
        await scroller.hover();
        await a.mouse.wheel(0, -800);
        await expect
          .poll(() =>
            scroller.evaluate(
              (node) => node.scrollHeight - node.scrollTop - node.clientHeight,
            ),
          )
          .toBeGreaterThan(200);
        const before = await anchor(a);
        const windowIds = () =>
          scroller.evaluate((node) =>
            [...node.querySelectorAll<HTMLElement>('[id^="m"]')]
              .filter((row) => /^m\d+$/.test(row.id))
              .map((row) => row.id),
          );
        const windowBefore = await windowIds();
        reading.windowBefore = windowBefore;
        assert(
          windowBefore.length > 0 && windowBefore.length <= 60,
          "Reading fixture must use the bounded initial message window",
        );
        reading.before = before;
        assert(before.top > 150);
        await checkpoint("hide-with-full-board");
        await a.locator("[data-native-board-toggle]").click();
        await expect(scroller).toBeHidden();
        await expect(
          a.locator('[data-room-board][data-placement="full"]'),
        ).toBeVisible();
        await checkpoint("peer-post-while-hidden");
        const id = await post(
          peer.context,
          roomA,
          `Peer hidden update ${token}`,
        );
        reading.peerMessage = id;
        await checkpoint("actual-canonical-peer-message");
        await expect
          .poll(() =>
            aWire.store.get()?.messages.some((message) => message.id === id),
          )
          .toBe(true);
        await checkpoint("hidden-canonical-update-keeps-reading-window");
        // Give the actual application its DOM flush before checking that the
        // new canonical tail remains deferred while this reader is unpinned.
        await a.evaluate(
          () =>
            new Promise<void>((resolve) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              ),
            ),
        );
        assert.deepEqual(
          await windowIds(),
          windowBefore,
          "Canonical append must not roll the unpinned DOM window",
        );
        await expect(a.locator(`[data-room-chat] #m${id}`)).toHaveCount(0);
        await checkpoint("restore-chat-visibility");
        await a.locator("[data-native-board-toggle]").click();
        await expect(scroller).toBeVisible();
        await checkpoint("restore-visible-anchor-y");
        await expect
          .poll(() =>
            scroller.evaluate((node, prior) => {
              const row = node.querySelector<HTMLElement>(`#${prior.id}`);
              return row
                ? Math.abs(
                    row.getBoundingClientRect().top -
                      node.getBoundingClientRect().top -
                      prior.y,
                  )
                : Infinity;
            }, before),
          )
          .toBeLessThan(2);
        await checkpoint("restore-scroll-top");
        await expect
          .poll(() =>
            scroller.evaluate(
              (node, prior) => Math.abs(node.scrollTop - prior),
              before.top,
            ),
          )
          .toBeLessThan(2);
        const after = await scroller.evaluate((node, id) => {
          const row = node.querySelector<HTMLElement>(`#${id}`);
          if (!row) throw Error("Reading anchor left mounted window");
          return {
            top: node.scrollTop,
            y:
              row.getBoundingClientRect().top -
              node.getBoundingClientRect().top,
          };
        }, before.id);
        assert(
          Math.abs(after.top - before.top) < 2,
          "Reading scrollTop must survive Board hide",
        );
        assert(
          Math.abs(after.y - before.y) < 2,
          "Visible message anchor must survive the real hidden update",
        );
        const windowAfterRestore = await windowIds();
        reading.windowAfterRestore = windowAfterRestore;
        assert.deepEqual(
          windowAfterRestore,
          windowBefore,
          "Restoring chat must retain every mounted reading row",
        );
        await expect(a.locator(`[data-room-chat] #m${id}`)).toHaveCount(0);
        Object.assign(reading, { before, after, peerMessage: id });
        await checkpoint("real-wheel-repin-shows-deferred-canonical-tail");
        await scroller.hover();
        await a.mouse.wheel(0, 40_000);
        await expect(a.locator(`[data-room-chat] #m${id}`)).toBeVisible();
        await expect
          .poll(() =>
            scroller.evaluate(
              (node) => node.scrollHeight - node.scrollTop - node.clientHeight,
            ),
          )
          .toBeLessThan(2);
        const repinnedWindow = await windowIds();
        assert(
          repinnedWindow.length <= 60,
          "Repin retains a bounded message window",
        );
        assert.equal(
          repinnedWindow.at(-1),
          "m" + id,
          "Real repin must reveal the actual canonical peer tail",
        );
        Object.assign(reading, { repinnedWindow });
        await checkpoint("real-wheel-unpin-before-own-ui-send");
        await scroller.hover();
        await a.mouse.wheel(0, -800);
        await expect
          .poll(() =>
            scroller.evaluate(
              (node) => node.scrollHeight - node.scrollTop - node.clientHeight,
            ),
          )
          .toBeGreaterThan(200);
        assert(
          (await scroller.evaluate((node) => node.scrollTop)) > 150,
          "Own-send reading fixture must not trigger older-history loading",
        );
        const ownSendBefore = await anchor(a),
          ownText = "Own native send while unpinned " + token;
        Object.assign(reading, { ownSendBefore });
        await checkpoint("own-ui-send-while-unpinned");
        const composer = a.locator("[data-native-composer] #input");
        await composer.fill(ownText);
        await a.locator("[data-composer-send]").click();
        await expect
          .poll(
            () =>
              aWire.store
                .get()
                ?.messages.find((message) => message.text === ownText)?.id,
          )
          .toBeGreaterThan(0);
        const ownId = aWire.store
          .get()
          ?.messages.find((message) => message.text === ownText)?.id;
        assert(ownId, "Real own-send canonical message must be observed");
        Object.assign(reading, { ownMessage: ownId });
        await checkpoint("own-canonical-message-forces-latest-bottom");
        await expect(a.locator("[data-room-chat] #m" + ownId)).toBeVisible();
        await expect(b.locator("[data-room-chat] #m" + ownId)).toContainText(
          ownText,
        );
        await expect(composer).toHaveValue("");
        await expect
          .poll(() =>
            scroller.evaluate(
              (node) => node.scrollHeight - node.scrollTop - node.clientHeight,
            ),
          )
          .toBeLessThan(2);
        const ownSendWindow = await windowIds();
        assert(
          ownSendWindow.length <= 60,
          "Own send must retain a bounded latest window",
        );
        assert.equal(
          ownSendWindow.at(-1),
          "m" + ownId,
          "Own send must reveal its actual canonical latest message",
        );
        Object.assign(reading, { ownSendWindow });
        await checkpoint("passed");
      } finally {
        try {
          await capture();
        } catch (error) {
          reading.snapshots.push({
            checkpoint: reading.checkpoint,
            diagnosticError:
              error instanceof Error ? error.name : "UnknownError",
          });
        }
      }
    },
  );
  await step(
    "real R2 native Viewer and actual browser Back/Forward",
    async () => {
      await openIntegratedPane(a, "files");
      const file = a.locator(
        `[data-vb-native="files"] [data-file-id="${fileId}"]`,
      );
      await expect(file).toBeVisible();
      await file.getByRole("button").first().click();
      await expect(
        a.locator(`[data-file-viewer][data-file-id="${fileId}"]`),
      ).toContainText(fileText.trim());
      await a.goBack();
      await expect(a.locator("[data-file-viewer]")).toHaveCount(0);
      await a.goForward();
      await expect(
        a.locator(`[data-file-viewer][data-file-id="${fileId}"]`),
      ).toBeVisible();
      await a.getByRole("button", { name: "Close file", exact: true }).click();
      await expect(a.locator("[data-file-viewer]")).toHaveCount(0);
    },
  );
  await step(
    "native live Document ↔ vanilla live Document through actual Yjs/DocRoom",
    async () => {
      const documentEvidence: { checkpoint: string; completed: string[] } = {
        checkpoint: "create-vanilla-peer",
        completed: [],
      };
      report.document = documentEvidence;
      const documentCheckpoint = (name: string) => {
        documentEvidence.completed.push(documentEvidence.checkpoint);
        documentEvidence.checkpoint = name;
        console.info("[native-application:document] " + name);
      };
      const vanilla = await peer.context.newPage();
      vanilla.on("pageerror", (error) =>
        errors.push(localBrowserError(error, base)),
      );
      await vanilla.goto(`${base}/b/${roomA}`);
      documentCheckpoint("vanilla-real-room-ready");
      await expect(vanilla.locator(".book:not(.skel)")).toBeAttached();
      const welcome = vanilla.locator("dialog.welcome[open]");
      if (await welcome.isVisible())
        await welcome.getByRole("button", { name: /^(Skip|Pular)$/ }).click();
      documentCheckpoint("vanilla-edit-mode");
      if ((await vanilla.locator(".doc").getAttribute("data-view")) !== "edit")
        await vanilla.locator("#docEditBar").click();
      const oldEditor = vanilla.locator("#cm .cm-content");
      await expect(oldEditor).toBeVisible();
      documentCheckpoint("native-live-editor-synchronized");
      const editor = await nativeEdit(a);
      documentCheckpoint("native-canonical-document-seed");
      await expect(editor).toContainText(docSeed.split("\n")[2]!);
      documentCheckpoint("native-insert-unicode");
      await editor.click();
      await a.keyboard.press("ControlOrMeta+End");
      await a.keyboard.insertText(`\nNative integrated edit ${token}`);
      documentCheckpoint("native-edit-arrives-at-vanilla");
      await expect(oldEditor).toContainText(`Native integrated edit ${token}`);
      documentCheckpoint("vanilla-insert-unicode");
      await oldEditor.click();
      await vanilla.keyboard.press("ControlOrMeta+End");
      await vanilla.keyboard.insertText(`\nVanilla integrated edit ${token}`);
      documentCheckpoint("vanilla-edit-arrives-at-native");
      await expect(editor).toContainText(`Vanilla integrated edit ${token}`);
      documentCheckpoint("real-mcp-read-confirms-mirror");
      await expect
        .poll(
          async () =>
            z.object({ doc: z.string() }).parse(
              await agent("read_room", {
                room_id: roomA,
                epic_id: "main",
                all: true,
              }),
            ).doc,
        )
        .toContain(`Vanilla integrated edit ${token}`);
      documentCheckpoint("close-vanilla-peer");
      await vanilla.close();
      documentCheckpoint("passed");
    },
  );
  await step(
    "mobile real sidebar thread entry and Viewer/sheet navigation baseline",
    async () => {
      await a.setViewportSize({ width: 390, height: 900 });
      await openIntegratedSidebar(a);
      await a.locator(`[data-epic-thread="${epic}"]`).click();
      await expectThread(a, roomA, epic);
      await expect(a.locator("[data-native-composer] #input")).toHaveValue(
        `Thread draft ${token}`,
      );
      await a.goBack();
      await expect(a.locator("[data-native-room-layout]")).toBeVisible();
      await expectThread(a, roomA);
      await openIntegratedPane(a, "files");
      await a
        .locator(`[data-vb-native="files"] [data-file-id="${fileId}"]`)
        .getByRole("button")
        .first()
        .click();
      await expect(a.locator("[data-file-viewer]")).toBeVisible();
      await a.goBack();
      await expect(a.locator("[data-file-viewer]")).toHaveCount(0);
      await expect(a.locator("[data-native-room-layout]")).toHaveAttribute(
        "data-sheet",
        "doc",
      );
      await a.goBack();
      await expect
        .poll(() =>
          a.locator("[data-native-room-layout]").getAttribute("data-sheet"),
        )
        .toBeNull();
      await a.goForward();
      await expect(a.locator("[data-native-room-layout]")).toHaveAttribute(
        "data-sheet",
        "doc",
      );
      await a.goForward();
      await expect(
        a.locator(`[data-file-viewer][data-file-id="${fileId}"]`),
      ).toBeVisible();
      await a.goBack();
      await expect(a.locator("[data-file-viewer]")).toHaveCount(0);
      await a.goBack();
      await expect
        .poll(() =>
          a.locator("[data-native-room-layout]").getAttribute("data-sheet"),
        )
        .toBeNull();
    },
  );
  await a.setViewportSize({ width: 1440, height: 1000 });
  // All seven dependent core phases above must pass before any of these
  // independent audits starts. Each later audit uses its own fresh contexts.
  const independentAudits: {
    name: string;
    status: "running" | "passed" | "failed";
    failure?: { name: string; phase: string; sourceLocations: string[] };
    closeInvocations?: Awaited<ReturnType<typeof closeInvocationEvidence>>;
  }[] = [];
  const independentFailures: Error[] = [];
  report.independentAudits = independentAudits;
  const independentAudit = async (name: string, run: () => Promise<void>) => {
    const result: (typeof independentAudits)[number] = {
      name,
      status: "running",
    };
    independentAudits.push(result);
    try {
      if (interrupted) throw Error("Interrupted");
      await run();
      result.status = "passed";
    } catch (error) {
      result.status = "failed";
      result.failure = {
        name: error instanceof Error ? error.name : "UnknownError",
        phase: phases.at(-1)?.name ?? name,
        sourceLocations: sourceLocations(error),
      };
      // Snapshot at this failure, before fresh audits or final teardown can
      // let closing transports disappear and obscure the lifecycle evidence.
      result.closeInvocations = await closeInvocationEvidence();
      if (interrupted) throw error;
      independentFailures.push(
        error instanceof Error ? error : new Error("Independent audit failed"),
      );
    }
  };
  await independentAudit("lifecycle", async () => {
    await auditNativeApplicationLifecycle({
      page: a,
      roomId: roomA,
      secondRoomId: roomB,
      epicId: epic,
      async openRoom(id, thread) {
        // Preserve this document and application heap across real router cycles.
        await a
          .locator(
            '[data-vb-native="room-navigation"] [data-room-id="' + id + '"] a',
          )
          .click();
        await expectThread(a, id);
        await expect(a.locator("[data-native-room-layout]")).toBeVisible();
        await expect(a.locator("[data-native-composer] #input")).toBeVisible();
        if (thread) {
          await openIntegratedSidebar(a);
          await a.locator('[data-epic-thread="' + thread + '"]').click();
          await expectThread(a, id, thread);
        }
      },
      async openEditor() {
        await nativeEdit(a);
      },
      async closeEditor() {
        await a
          .locator("[data-native-document] > footer")
          .getByRole("button", { name: "Done", exact: true })
          .click();
        await expect(
          a.locator("[data-document-editor] .cm-editor"),
        ).toHaveCount(0);
      },
      activeSockets: aWire.activeSockets,
      step,
      onEvidence: (evidence) => {
        report.lifecycle = evidence;
      },
    });
  });
  const profileFixture: NativeApplicationAuditFixture = {
    base,
    roomId: roomA,
    ownerEmail,
    codeMessageId,
    output,
    openPane: openIntegratedPane,
    openSidebar: openIntegratedSidebar,
    step,
    async createProfile(profile) {
      const value = await identity(ownerEmail, profile);
      const page = await value.context.newPage();
      page.on("pageerror", (error) =>
        errors.push(localBrowserError(error, base)),
      );
      return { context: value.context, page };
    },
  };
  report.profileAuditArtifact = "native-root-profiles.json";
  await independentAudit("profiles", async () => {
    report.profileAudit = await auditNativeApplicationProfiles(profileFixture);
  });
  for (const variant of ["svelte", "vanilla"] as const) await independentAudit(`app-navigation-authority-${variant}`, async () => {
    const appNavigation = await auditNativeAppNavigation({...profileFixture,...(variant === "vanilla" ? {ui:vanillaAppNavigationDriver} : {})});
    report[variant === "svelte" ? "appNavigation" : "vanillaAppNavigation"] = appNavigation;
    // A controlled replacement document inheriting the original App's room read
    // capability is a security finding, not a passing functional receipt.
    await step(
      `${variant} replacement App authority requires an explicit refusal`,
      async () => {
        assert.equal(
          appNavigation.verdict,
          "explicit-denial",
          "Replacement App read authority must be explicitly refused; inherited or inconclusive evidence cannot pass",
        );
      },
    );
  });
  await independentAudit("page-errors", async () => {
    assert.deepEqual(errors, []);
  });
  if (independentFailures.length)
    throw new AggregateError(
      independentFailures,
      "Independent native application audits failed; see each retained audit result",
    );
  report.status = "passed";
} catch (error) {
  report.status = interrupted ? "interrupted" : "failed";
  report.failure = {
    name: error instanceof Error ? error.name : "UnknownError",
    phase:
      error instanceof AggregateError
        ? "post-core independent audits"
        : (phases.at(-1)?.name ?? "setup"),
    // Only repository-owned source locations, never exception text, URLs,
    // document content or authorization material from the first stack line.
    sourceLocations: sourceLocations(error),
  };
  process.exitCode = interrupted ? 130 : 1;
} finally {
  // Collect before closing the browser: teardown must not masquerade as an
  // application's earlier close invocation. The hook stores no socket refs.
  report.browserCloseInvocations = await closeInvocationEvidence();
  await closeBrowser();
  contexts.clear();
  process.off("SIGINT", signal);
  process.off("SIGTERM", signal);
  await writeFile(`${output}/results.json`, JSON.stringify(report, null, 2));
}
