// Requires an already built Svelte preview and a loopback Worker with DEV_EMAIL.
// This script creates isolated rooms through public APIs; it never fabricates room state.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import {
  chromium,
  expect as baseExpect,
  type Page,
  type WebSocketRoute,
} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as z from "zod/mini";
import { createRoomApi } from "../svelte/transport";
import { nativeBrowserFixtures } from "./native-browser-fixtures";
import { nativeTestAgent } from "./native-test-mcp";

const expect = baseExpect.configure({ timeout: 60_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
  "Use a loopback Worker with DEV_EMAIL",
);
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-files-browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const errors: string[] = [];
const result: Record<string, unknown> = {
  scope:
    "Incremental native Files panel against real local HTTP/R2/Book WebSockets. Legacy viewer is exercised through its typed exact-file callback; this is not full Files/upload/viewer migration acceptance.",
  gaps: [
    "Uploads use the actual inferred Hono client and supported raw HTTP route, not drag/drop/paste UI.",
    "Folder/version verification uses the supported agents/ Markdown namespace. Arbitrary upload paths are flattened by storeFile; nested folder projection remains pure/DOM coverage.",
    "No supported file deletion operation: absent-file and same-ID metadata replacement guards remain pure/DOM coverage.",
    "Detached stale controls are exercised without synthesizing state; component HMR-only remount and old-room queued server results remain separate lifecycle tests.",
    "Google font CSS and local runner availability use the shared declared browser fixtures; all room data and mutation receipts are real.",
  ],
};
let failedPage: Page | undefined;
const step = (name: string) => {
  result.step = name;
  console.log(name);
};
const object = (raw: string | Buffer): Record<string, unknown> | null => {
  try {
    const parsed = z
      .record(z.string(), z.unknown())
      .safeParse(JSON.parse(raw.toString()));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
    reducedMotion: "reduce",
  });
  context.setDefaultTimeout(60_000);
  context.setDefaultNavigationTimeout(120_000);
  await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
  result.fixtures = [
    ...(await nativeBrowserFixtures(context, base)),
    "Playwright transparently forwards actual client/server WebSocket payloads except deliberately delaying authentic pins frames; no payload rewriting, fabricated state, or claim of natural network ordering for that fault-injection step",
  ];
  const createRoom = async (title: string) => {
    const response = await context.request.post(`${base}/api/books`, {
      headers: { origin: base },
      data: { title },
    });
    assert(response.ok(), `Create room ${response.status()}`);
    return z.object({ id: z.string() }).parse(await response.json()).id;
  };
  const id = await createRoom("Native Files verification");
  result.room = id;
  const page = await context.newPage();
  failedPage = page;
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" ||
      (message.type() === "warning" && message.text().includes("[svelte]"))
    )
      errors.push(message.text());
  });
  const agent = await nativeTestAgent(page, base);
  // Reuse the application's typed upload API. The fetch adapter carries the real
  // browser-context session through Playwright; responses retain schema validation.
  const api = createRoomApi(id, async (input, init) => {
    const request =
      input instanceof Request
        ? new Request(input, init)
        : new Request(new URL(String(input), base), init);
    const headers = Object.fromEntries(request.headers);
    headers.origin = base;
    const response = await context.request.fetch(request.url, {
      method: request.method,
      headers,
      data:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : Buffer.from(await request.arrayBuffer()),
    });
    return new Response(await response.text(), {
      status: response.status(),
      headers: response.headers(),
    });
  });
  const upload = (name: string, text: string, type = "text/plain") =>
    api.uploadFile({ name, type, body: text });
  step("Uploading real folder/version history beyond the newest-12 snapshot");
  const old = await upload(
    "agents/history.md",
    "Older immutable report body",
    "text/markdown",
  );
  for (let n = 0; n < 13; n++)
    await upload(`recent-${n}.txt`, `Recent real upload ${n}`);
  const newest = await upload(old.name, "Newest report body", old.type);
  const markdown = await upload(
    "agents/notes.md",
    "# Native folder notes",
    "text/markdown",
  );
  const rootOld = await upload("root-history.txt", "Root version one");
  const rootNew = await upload("root-history.txt", "Root version two");
  result.uploads = {
    count: 18,
    old: old.id,
    newest: newest.id,
    markdown: markdown.id,
    root: [rootOld.id, rootNew.id],
  };

  let disconnected = false,
    holdPins = false,
    snapshots = 0;
  let initialIDs: string[] = [];
  const sockets: WebSocketRoute[] = [],
    sent: Record<string, unknown>[] = [],
    receipts: Record<string, unknown>[] = [],
    heldPins: (() => void)[] = [];
  await context.routeWebSocket(
    (url) => url.pathname === `/ws/${id}`,
    async (socket) => {
      if (disconnected) {
        await socket.close({
          code: 1012,
          reason: "native Files offline verification",
        });
        return;
      }
      const server = socket.connectToServer();
      sockets.push(socket);
      socket.onMessage((raw) => {
        const command = object(raw);
        if (command) sent.push(command);
        server.send(raw);
      });
      server.onMessage((raw) => {
        const frame = object(raw);
        if (frame?.t === "result") receipts.push(frame);
        if (frame?.t === "state") {
          snapshots++;
          initialIDs = z
            .array(z.object({ id: z.string() }))
            .parse(frame.files)
            .map((f) => f.id);
        }
        if (frame?.t === "pins" && holdPins) {
          heldPins.push(() => socket.send(raw));
          return;
        }
        socket.send(raw);
      });
    },
  );
  const count = (type: string) =>
    sent.filter((command) => command.t === type).length;
  const panel = page.locator('[data-vb-native="files"]');
  const tile = (fileID: string) => panel.locator(`[data-file-id="${fileID}"]`);
  const pin = (fileID: string) => tile(fileID).locator("button[aria-pressed]");
  const openTile = (fileID: string) => tile(fileID).locator("button").first();
  const show = async () => {
    await expect(panel).toBeAttached();
    // Clipped panel content can have a visible bounding box while the document
    // owner is collapsed. Navigate through the visible controls instead.
    const tab = page.locator('.ptabs [data-pane="files"]');
    const peek = page.locator('#docPeek [data-pane="files"]');
    const book = page.locator(".book");
    if (await peek.isVisible()) {
      // The mobile toolbar toggles an already open sheet closed.
      if (
        (await book.getAttribute("data-sheet")) !== "doc" ||
        (await book.getAttribute("data-pane")) !== "files"
      )
        await peek.click();
    } else if (!(await tab.isVisible())) {
      await page.locator("#toggleDoc").click();
      await tab.click();
    } else if ((await book.getAttribute("data-pane")) !== "files")
      await tab.click();
    await expect(book).toHaveAttribute("data-pane", "files");
    await expect(panel).toBeVisible();
  };
  const canonicalPins = async () =>
    z
      .object({
        pins: z.array(
          z.object({ id: z.string(), kind: z.string(), ref: z.string() }),
        ),
      })
      .parse(await agent("read_room", { room_id: id, all: true })).pins;
  const flushPins = () => {
    holdPins = false;
    for (const deliver of heldPins.splice(0)) deliver();
  };
  const viewer = page.locator("#viewer");
  const closeViewer = async () => {
    await viewer.getByRole("button", { name: "Close", exact: true }).click();
    await expect(viewer).not.toBeVisible();
    await expect.poll(() => new URL(page.url()).hash).toBe("");
  };
  const vanilla = await context.request.get(`${base}/b/${id}`);
  assert(vanilla.ok());
  const vanillaHTML = await vanilla.text();
  assert(
    !vanillaHTML.includes("/svelte-preview/app.js") &&
      !vanillaHTML.includes('src="/bootstrap.ts"'),
    "Unselected room must keep the vanilla shell",
  );
  assert(
    vanillaHTML.includes("function renderFiles()"),
    "Expected existing vanilla inline Files renderer",
  );
  result.vanillaDefault = true;
  const loadedApp = page.waitForResponse(
    (response) => new URL(response.url()).pathname === "/svelte-preview/app.js",
  );
  await page.goto(`${base}/b/${id}?ui=svelte`);
  const appResponse = await loadedApp;
  result.app = {
    revisionSuppliedByRunner: process.env.TEST_APP_REVISION ?? null,
    shellVersion: await page
      .locator('meta[name="vb-v"]')
      .getAttribute("content"),
    loadedEntryURL: appResponse.url(),
    loadedEntryETag: appResponse.headers().etag ?? null,
    loadedEntrySHA256: createHash("sha256")
      .update(await appResponse.body())
      .digest("hex"),
  };
  await expect.poll(() => snapshots).toBeGreaterThan(0);
  assert(
    !initialIDs.includes(old.id),
    "Real snapshot must exclude old unpinned upload",
  );
  assert.equal(
    initialIDs.length,
    12,
    "New unpinned room snapshot must match Book newest-12 query",
  );
  result.initialSnapshot = {
    fileIDs: initialIDs,
    serverRule:
      "src/book.ts:1657: newest 12 uploads plus pinned-file metadata; fresh fixture room has no pins",
  };
  const beforeFull = count("files.get");
  await show();
  await expect(panel.locator(`[data-file-id="${rootOld.id}"]`)).toBeVisible();
  await expect(tile(rootNew.id)).toBeVisible();
  await expect.poll(() => count("files.get")).toBeGreaterThan(beforeFull);
  const folder = panel.locator('[data-fdir="agents"]');
  await folder.focus();
  await folder.press("Enter");
  await expect(tile(newest.id)).toBeVisible();
  await expect(tile(old.id)).toHaveCount(0);
  await expect(panel).toContainText(/2 (versions|versões)/);
  step("Checking grouped versions and exact legacy viewer selection");
  await openTile(newest.id).click();
  await expect(viewer).toHaveAttribute("data-fid", newest.id);
  await expect(viewer.locator(".vbody")).toContainText("Newest report body");
  await viewer.locator(".vsel").selectOption(old.id);
  await expect(viewer).toHaveAttribute("data-fid", old.id);
  await expect(viewer.locator(".vbody")).toContainText(
    "Older immutable report body",
  );
  await closeViewer();
  await openTile(newest.id).click();
  await expect(viewer).toHaveAttribute("data-fid", newest.id);
  await closeViewer();
  await panel.locator('[data-fkind="md"]').click();
  await expect(tile(markdown.id)).toBeVisible();
  await expect(tile(rootOld.id)).toHaveCount(0);
  await panel.locator('[data-fkind="txt"]').click();
  await expect(tile(rootOld.id)).toBeVisible();
  await expect(tile(markdown.id)).toHaveCount(0);
  await panel.locator('[data-fkind="all"]').click();
  await folder.focus();
  await folder.press("Enter");
  await expect(tile(newest.id)).toBeVisible();

  step(
    "Holding authentic pins frames to verify ACK-only timeout and explicit recovery",
  );
  holdPins = true;
  const addBaseline = count("pin.add");
  await pin(newest.id).click();
  await expect.poll(() => heldPins.length).toBeGreaterThan(0);
  const addCommand = [...sent]
    .reverse()
    .find((command) => command.t === "pin.add" && command.ref === newest.id);
  assert(
    addCommand && typeof addCommand.cid === "string",
    "Browser pin must use correlated request",
  );
  await expect
    .poll(() =>
      receipts.some(
        (receipt) => receipt.cid === addCommand.cid && receipt.ok === true,
      ),
    )
    .toBe(true);
  result.delayedCanonicalFaultInjection = {
    mode: "Authentic pins broadcasts withheld while actual correlated success receipt is forwarded; payloads untouched",
    heldFrames: heldPins.length,
    requestCID: addCommand.cid,
    naturalNetworkOrdering: false,
  };
  await expect(pin(newest.id)).toBeDisabled();
  await expect(pin(newest.id)).toHaveAttribute("aria-pressed", "false");
  assert(
    (await canonicalPins()).some(
      (p) => p.kind === "file" && p.ref === newest.id,
    ),
    "Real server must persist the pin while its broadcast is held",
  );
  await expect(panel.getByRole("alert")).toBeVisible();
  await expect(pin(newest.id)).toBeEnabled();
  assert.equal(
    count("pin.add"),
    addBaseline + 1,
    "Timeout must not auto-retry a mutation",
  );
  flushPins();
  await expect(pin(newest.id)).toHaveAttribute("aria-pressed", "true");
  const deleteBaseline = count("pin.del");
  await pin(newest.id).click();
  await expect(pin(newest.id)).toHaveAttribute("aria-pressed", "false");
  assert.equal(count("pin.del"), deleteBaseline + 1);
  assert(!(await canonicalPins()).some((p) => p.ref === newest.id));

  step(
    "Rejecting detached stale selection and reopening exact new upload identity",
  );
  const stale = await openTile(newest.id).elementHandle();
  assert(stale);
  const latest = await upload(
    old.name,
    "Latest real collaborator upload",
    old.type,
  );
  await expect(tile(latest.id)).toBeVisible();
  await expect(tile(newest.id)).toHaveCount(0);
  await stale.evaluate((element) => {
    if (element instanceof HTMLElement) element.click();
  });
  await expect(viewer).not.toBeVisible();
  await openTile(latest.id).click();
  await expect(viewer).toHaveAttribute("data-fid", latest.id);
  await closeViewer();

  step(
    "Offline action preserves selection; reconnect reloads the full index while Files stays selected",
  );
  disconnected = true;
  await Promise.all(
    sockets
      .splice(0)
      .map((socket) =>
        socket.close({ code: 1012, reason: "native Files verification" }),
      ),
  );
  const offlineAdds = count("pin.add");
  await pin(latest.id).click();
  await expect(panel.getByRole("alert")).toBeVisible();
  await expect(tile(latest.id)).toBeVisible();
  assert.equal(count("pin.add"), offlineAdds);
  const snapshotBaseline = snapshots,
    fullBaseline = count("files.get");
  disconnected = false;
  await expect.poll(() => snapshots).toBeGreaterThan(snapshotBaseline);
  await expect.poll(() => count("files.get")).toBeGreaterThan(fullBaseline);
  await expect(panel).toContainText(/3 (versions|versões)/);
  assert.equal(
    count("pin.add"),
    offlineAdds,
    "Reconnect must not retry offline mutation",
  );
  await pin(latest.id).click();
  await expect(pin(latest.id)).toHaveAttribute("aria-pressed", "true");
  assert((await canonicalPins()).some((p) => p.ref === latest.id));

  step(
    "Checking desktop/mobile native markers, keyboard activation, overflow and scoped axe",
  );
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await show();
    const target = openTile(latest.id);
    await target.focus();
    await target.press("Enter");
    await expect(viewer).toHaveAttribute("data-fid", latest.id);
    await closeViewer();
    await show();
    const metrics = await panel.evaluate(async (element) => {
      await document.fonts.ready;
      return {
        native: element.hasAttribute("data-vb-native"),
        overflow: document.documentElement.scrollWidth > innerWidth,
        font: getComputedStyle(element).fontFamily,
        loadedFont: [...document.fonts].some(
          (face) =>
            face.family.replaceAll('"', "") === "Inter var" &&
            face.status === "loaded",
        ),
      };
    });
    assert(metrics.native);
    assert(
      metrics.font.includes("Inter var"),
      "Files must use the loaded Studio UI font",
    );
    assert(metrics.loadedFont, "Studio UI font must be loaded, not a fallback");
    assert(!metrics.overflow, "Files must not overflow the viewport");
    const axe = await new AxeBuilder({ page })
      .include('[data-vb-native="files"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(axe.violations, []);
    await panel.screenshot({ path: `${output}/files-${width}.png` });
    result[`viewport-${width}`] = { metrics, axe: axe.violations };
  }
  step("Disposed old-room controls cannot open files in a new room");
  const disposed = await openTile(latest.id).elementHandle();
  assert(disposed);
  const other = await createRoom("Native Files disposal verification");
  // Real data-nav links keep the document/old handle alive while the room mount disposes.
  await page.keyboard.press("Escape");
  await page.locator(".phHome").click();
  await expect(page).toHaveURL(/\/app(?:\?|$)/);
  const otherLink = page
    .locator(`#app a[data-nav][href="/b/${other}"]`)
    .first();
  await expect(otherLink).toBeVisible();
  await otherLink.click();
  await expect(page).toHaveURL(new RegExp(`/b/${other}(?:\\?|$)`));
  await expect(panel).toBeAttached();
  await disposed.evaluate((element) => {
    if (element instanceof HTMLElement) element.click();
  });
  await expect(page.locator("#viewer")).not.toBeVisible();
  assert.deepEqual(errors, []);
  result.commands = {
    filesGet: count("files.get"),
    pinAdd: count("pin.add"),
    pinDelete: count("pin.del"),
    snapshots,
  };
  result.status = "pass";
  console.log(
    "PASS native Files real HTTP history, full-index reconnect, exact viewer identity, pin ACK timeout/canonical retry, stale/disposed controls, offline recovery, desktop/mobile keyboard and scoped axe",
  );
} catch (error) {
  result.status = "fail";
  result.failure = String(error);
  if (failedPage && !failedPage.isClosed())
    await Promise.allSettled([
      failedPage.screenshot({ path: `${output}/failure.png` }),
      failedPage
        .content()
        .then((html) => writeFile(`${output}/failure.html`, html)),
    ]);
  throw error;
} finally {
  result.errors = errors;
  await writeFile(
    `${output}/results.json`,
    JSON.stringify(result, null, 2) + "\n",
  );
  await browser.close();
}
