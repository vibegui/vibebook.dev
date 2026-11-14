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
import { auditNativeApplicationProfiles } from "./native-application-profiles";
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
  await context.addCookies([
    { name: "dev_as", value: email, url: base },
    { name: "vb_lang", value: profile.lang, url: base },
  ]);
  await context.addInitScript(
    (theme) => localStorage.setItem("vb.theme", theme),
    profile.theme,
  );
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
      socket.on("close", () => active.delete(socket));
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
    fileId = "";
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
      await post(
        owner.context,
        roomA,
        "```ts\nconst nativeRootFixture = 'real Book message';\n```\nCanonical code block for the actual CommitMono role.",
      );
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
    owner: { sent: aWire.sent, received: aWire.received },
    peer: { sent: bWire.sent, received: bWire.received },
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
        await checkpoint("hidden-native-message-attached");
        await expect(a.locator(`[data-room-chat] #m${id}`)).toBeAttached();
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
        Object.assign(reading, { before, after, peerMessage: id });
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
      const vanilla = await peer.context.newPage();
      vanilla.on("pageerror", (error) =>
        errors.push(localBrowserError(error, base)),
      );
      await vanilla.goto(`${base}/b/${roomA}`);
      await expect(vanilla.locator(".book:not(.skel)")).toBeAttached();
      const welcome = vanilla.locator("dialog.welcome[open]");
      if (await welcome.isVisible())
        await welcome.getByRole("button", { name: /^(Skip|Pular)$/ }).click();
      if ((await vanilla.locator(".doc").getAttribute("data-view")) !== "edit")
        await vanilla.locator("#docEditBar").click();
      const oldEditor = vanilla.locator("#cm .cm-content");
      await expect(oldEditor).toBeVisible();
      const editor = await nativeEdit(a);
      await expect(editor).toContainText(docSeed.split("\n")[2]!);
      await editor.click();
      await a.keyboard.press("ControlOrMeta+End");
      await a.keyboard.insertText(`\nNative integrated edit ${token}`);
      await expect(oldEditor).toContainText(`Native integrated edit ${token}`);
      await oldEditor.click();
      await vanilla.keyboard.press("ControlOrMeta+End");
      await vanilla.keyboard.insertText(`\nVanilla integrated edit ${token}`);
      await expect(editor).toContainText(`Vanilla integrated edit ${token}`);
      await expect
        .poll(
          async () =>
            z.object({ doc: z.string() }).parse(
              await agent("read_room", {
                room_id: roomA,
                thread: "main",
                limit: 1,
              }),
            ).doc,
        )
        .toContain(`Vanilla integrated edit ${token}`);
      await vanilla.close();
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
      await expect(a.locator("[data-document-editor] .cm-editor")).toHaveCount(
        0,
      );
    },
    activeSockets: aWire.activeSockets,
    step,
    onEvidence: (evidence) => {
      report.lifecycle = evidence;
    },
  });
  const profileFixture: NativeApplicationAuditFixture = {
    base,
    roomId: roomA,
    ownerEmail,
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
  report.profileAudit = await auditNativeApplicationProfiles(profileFixture);
  assert.deepEqual(errors, []);
  report.status = "passed";
} catch (error) {
  report.status = interrupted ? "interrupted" : "failed";
  report.failure = {
    name: error instanceof Error ? error.name : "UnknownError",
    phase: phases.at(-1)?.name ?? "setup",
  };
  process.exitCode = interrupted ? 130 : 1;
} finally {
  await closeBrowser();
  contexts.clear();
  process.off("SIGINT", signal);
  process.off("SIGTERM", signal);
  await writeFile(`${output}/results.json`, JSON.stringify(report, null, 2));
}
