// Actual production RoomLayout in a public, synthetic gallery fixture. No backend or canonical room is fabricated.
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium, expect as baseExpect, type Page } from "@playwright/test";
import { serveBuiltGallery } from "./browser-static-gallery";
const expect = baseExpect.configure({ timeout: 30_000 });
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-production-room-layout";
await mkdir(output, { recursive: true });
let base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base));
let gallery: Awaited<ReturnType<typeof serveBuiltGallery>> | null = null,
  browser: Awaited<ReturnType<typeof chromium.launch>> | null = null,
  page: Page | null = null,
  interrupted = false,
  closing: Promise<void> | null = null;
const report: Record<string, unknown> = {
  status: "running",
  suppliedRevision: process.env.TEST_APP_REVISION ?? null,
  scope:
    "Production RoomLayout class/playback/history controller in a neutral gallery; no integrated RoomScope/Worker/provider acceptance",
  gaps: [
    "Physical touch, hardware keyboard/AT, safe-area hardware and Safari/WebKit are not represented",
    "Synthetic pointercancel/input events are named explicitly",
    "Actual FileViewer/RootApp navigation ordering needs the separate integrated browser gate",
    "No real room/editor/Board business state is represented by neutral snippet text",
  ],
};
const checkpoint = (phase: string) => {
  report.phase = phase;
  console.info(`[room-layout] ${phase}`);
};
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
try {
  if (process.env.TEST_PUBLIC_ROOT) {
    gallery = await serveBuiltGallery(process.env.TEST_PUBLIC_ROOT);
    base = gallery.base;
    report.assetProof = gallery.proof;
  }
  checkpoint("launch");
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  if (interrupted) throw Error("Interrupted startup");
  report.browserVersion = browser.version();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await context.route("**/*", (route) =>
    new URL(route.request().url()).origin === base
      ? route.continue()
      : route.abort(),
  );
  await context.addInitScript(() => {
    const changes: string[] = [];
    Object.defineProperty(window, "roomLayoutStyleWrites", { value: changes });
    new MutationObserver((records) => {
      for (const record of records)
        if (
          record.target instanceof Element &&
          record.target.closest("[data-native-room-layout]")
        )
          changes.push(record.target.tagName);
    }).observe(document, {
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });
  });
  page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.name));
  report.pageErrors = errors;
  await page.goto(`${base}/app?ui=svelte&gallery=1&probe=room-layout`, {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });
  await expect(page.locator("[data-native-room-layout]")).toBeVisible();
  report.htmlVersionMarker = await page
    .locator('meta[name="vb-v"]')
    .getAttribute("content");
  const root = page.locator("[data-native-room-layout]"),
    slider = page.getByRole("slider", { name: "Document width" }),
    documentCell = page.locator("[data-room-document]"),
    board = page.locator("[data-layout-fixture-board]"),
    scrim = page.locator("[data-room-scrim]");
  const width = () =>
    documentCell.evaluate((node) => node.getBoundingClientRect().width);
  const alpha = () =>
    scrim.evaluate((node) => Number(getComputedStyle(node).opacity));
  const sheet = () => page!.locator("[data-layout-sheet]").textContent();
  checkpoint("desktop/container-width-native-input");
  await expect.poll(width).toBeCloseTo(380, 1);
  await slider.focus();
  await slider.press("ArrowLeft");
  await expect.poll(width).toBeCloseTo(404, 1);
  await slider.press("ArrowRight");
  await expect.poll(width).toBeCloseTo(380, 1);
  await slider.press("Home");
  await expect.poll(width).toBeCloseTo(260, 1);
  await slider.press("End");
  const containerWidth = await root.evaluate((node) => node.clientWidth);
  await expect.poll(width).toBeCloseTo(containerWidth - 272 - 320, 1);
  await page
    .getByRole("button", { name: "Application rail", exact: true })
    .click();
  const reducedWidth = await root.evaluate((node) => node.clientWidth);
  assert.equal(containerWidth - reducedWidth, 68);
  await expect.poll(width).toBeCloseTo(reducedWidth - 272 - 320, 1);
  await page
    .getByRole("button", { name: "Application rail", exact: true })
    .click();
  await expect.poll(width).toBeCloseTo(containerWidth - 272 - 320, 1);
  await slider.evaluate((node) => {
    if (!(node instanceof HTMLInputElement))
      throw Error("Expected native range");
    node.value = "473";
    node.dispatchEvent(new InputEvent("input", { bubbles: true }));
  });
  await expect.poll(width).toBeCloseTo(473, 1);
  await page.reload();
  await expect.poll(width).toBeCloseTo(473, 1);
  report.resize = {
    containerWidth,
    reducedWidth,
    nativeInput: "Home/End plus declared synthetic input473",
    persisted: await width(),
  };
  checkpoint("desktop/board-identity");
  await page.getByRole("button", { name: "Board pane", exact: true }).click();
  await board
    .getByLabel("Retained Board draft")
    .fill("Retained 🧪 Board draft");
  const before = await board.elementHandle();
  assert(before);
  await board.getByLabel("Retained Board draft").evaluate((node) => {
    if (node instanceof HTMLTextAreaElement) node.setSelectionRange(3, 8);
  });
  await page.getByRole("button", { name: "Full Board", exact: true }).click();
  await expect(page.locator("[data-room-board]")).toHaveAttribute(
    "data-placement",
    "full",
  );
  assert.equal(
    await board.evaluate((node, witness) => node === witness, before),
    true,
  );
  await page.getByRole("button", { name: "Board pane", exact: true }).click();
  await expect(page.locator("[data-room-board]")).toHaveAttribute(
    "data-placement",
    "pane",
  );
  assert.equal(
    await board.evaluate((node, witness) => node === witness, before),
    true,
  );
  await expect(board.getByLabel("Retained Board draft")).toHaveValue(
    "Retained 🧪 Board draft",
  );
  await expect(page.locator("[data-layout-mounts]")).toHaveText("1");
  // Programmatic placement changes must preserve an actively edited Board;
  // trusted pointer clicks intentionally move focus to their clicked control.
  const retainedDraft = board.getByLabel("Retained Board draft");
  await retainedDraft.focus();
  await page
    .getByRole("button", { name: "Full Board", exact: true })
    .evaluate((node) => {
      if (!(node instanceof HTMLButtonElement))
        throw Error("Expected a native button");
      node.click();
    });
  await expect(retainedDraft).toBeFocused();
  await page
    .getByRole("button", { name: "Sidebar rail", exact: true })
    .evaluate((node) => {
      if (!(node instanceof HTMLButtonElement))
        throw Error("Expected a native button");
      node.click();
    });
  await expect(retainedDraft).toBeFocused();
  await page
    .getByRole("button", { name: "Board pane", exact: true })
    .evaluate((node) => {
      if (!(node instanceof HTMLButtonElement))
        throw Error("Expected a native button");
      node.click();
    });
  await expect(retainedDraft).toBeFocused();
  report.boardIdentity = true;
  checkpoint("mobile/one-sheet-entry-back-forward");
  await page
    .getByRole("button", { name: "Document pane", exact: true })
    .click();
  await page.setViewportSize({ width: 390, height: 1000 });
  const initialHistory = await page.evaluate(() => history.length);
  await page
    .getByRole("button", { name: "Open document", exact: true })
    .click();
  await expect.poll(sheet).toBe("doc");
  await expect.poll(alpha).toBe(1);
  assert.equal(await page.evaluate(() => history.length), initialHistory + 1);
  await page.getByRole("button", { name: "Open sidebar", exact: true }).click();
  await expect.poll(sheet).toBe("side");
  assert.equal(await page.evaluate(() => history.length), initialHistory + 1);
  await page.goBack();
  await expect.poll(sheet).toBe("closed");
  await page.goForward();
  await expect.poll(sheet).toBe("side");
  await page
    .getByRole("button", { name: "Close sidebar", exact: true })
    .click();
  await expect.poll(sheet).toBe("closed");
  await expect.poll(alpha).toBe(0);
  // Closing changes presentation before Back completes. Do not let a pending
  // sheet traversal contaminate this independent media-query transition.
  const historyPage = page;
  const hasSheetEntry = () =>
    historyPage.evaluate(() => {
      const state: unknown = history.state;
      return (
        state !== null && typeof state === "object" && "vbRoomSheet" in state
      );
    });
  await expect.poll(hasSheetEntry).toBe(false);
  checkpoint("mobile/full-board-to-desktop-pane");
  await page.getByRole("button", { name: "Full Board", exact: true }).click();
  await expect(page.locator("[data-native-room-layout]")).toHaveAttribute(
    "data-board-full",
    "true",
  );
  await expect(page.locator("[data-room-board]")).toHaveAttribute(
    "data-placement",
    "full",
  );
  assert.equal(
    await board.evaluate((node, witness) => node === witness, before),
    true,
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator("[data-native-room-layout]")).toHaveAttribute(
    "data-board-full",
    "false",
  );
  await expect(page.locator("[data-native-room-layout]")).toHaveAttribute(
    "data-pane",
    "board",
  );
  await expect(page.locator("[data-room-board]")).toHaveAttribute(
    "data-placement",
    "pane",
  );
  assert.equal(
    await board.evaluate((node, witness) => node === witness, before),
    true,
  );
  await expect(page.locator("[data-layout-mounts]")).toHaveText("1");
  await expect(board.getByLabel("Retained Board draft")).toHaveValue(
    "Retained 🧪 Board draft",
  );
  report.mobileFullBoardToDesktop = true;
  // Restore the document pane while still desktop so no new mobile sheet or
  // pending Back is created before the following drag proof.
  await page
    .getByRole("button", { name: "Document pane", exact: true })
    .click();
  await page.setViewportSize({ width: 390, height: 1000 });
  await expect.poll(sheet).toBe("closed");
  await expect.poll(hasSheetEntry).toBe(false);
  const samples: unknown[] = [];
  report.samples = samples;
  checkpoint("mobile/continuous-pending-drag");
  const openHandle = page.locator("[data-layout-open-drag]"),
    handle = await openHandle.boundingBox();
  assert(handle);
  const height = await documentCell.evaluate(
    (node) => node.getBoundingClientRect().height,
  );
  assert(height > 0);
  await page.mouse.move(handle.x + 5, handle.y + 5);
  await page.mouse.down();
  for (const fraction of [0.1, 0.15, 0.2]) {
    await page.mouse.move(handle.x + 5, handle.y + 5 + height * fraction, {
      steps: 1,
    });
    const actual = await documentCell.evaluate((node) => ({
      y: new DOMMatrixReadOnly(getComputedStyle(node).transform).m42,
      height: node.getBoundingClientRect().height,
      animations: node
        .getAnimations()
        .filter(
          (animation): animation is CSSAnimation =>
            animation instanceof CSSAnimation &&
            animation.effect instanceof KeyframeEffect &&
            animation.effect.target === node,
        )
        .map((animation) => ({
          name: animation.animationName,
          time: animation.currentTime,
        })),
    }));
    assert(Math.abs(actual.y + height * (1 - fraction)) < 1);
    assert(Math.abs((await alpha()) - fraction) < 0.01);
    assert(
      actual.animations.some(
        (animation) =>
          animation.name === "vb-room-sheet" &&
          typeof animation.time === "number" &&
          Math.abs(animation.time - fraction * 1000) < 1,
      ),
    );
    samples.push({ fraction, ...actual, opacity: await alpha() });
  }
  await page.mouse.up();
  await expect.poll(alpha).toBe(0);
  await page
    .getByRole("button", { name: "Open document", exact: true })
    .click();
  await expect.poll(alpha).toBe(1);
  const close = page
      .getByRole("button", { name: "Close document", exact: true })
      .filter({ visible: true }),
    closeBox = await close.boundingBox();
  assert(closeBox);
  const distance = Math.max(139.2, height * 0.4);
  samples.push({
    closeDistance: distance,
    measuredHeight: height,
    quarterThreshold: height / 4,
  });
  await page.mouse.move(closeBox.x + 10, closeBox.y + 5);
  await page.mouse.down();
  await page.mouse.move(closeBox.x + 10, closeBox.y + 5 - distance, {
    steps: 5,
  });
  await page.mouse.up();
  await expect.poll(alpha).toBe(0);
  await expect.poll(sheet).toBe("closed");
  checkpoint("mobile/cancel-form-focus-dialog-escape");
  await page.mouse.move(handle.x + 5, handle.y + 5);
  await page.mouse.down();
  await page.mouse.move(handle.x + 5, handle.y + 5 + height * 0.4, {
    steps: 1,
  });
  await openHandle.evaluate((node) =>
    node.dispatchEvent(
      new PointerEvent("pointercancel", {
        pointerId: 1,
        bubbles: true,
        clientY: 0,
      }),
    ),
  );
  await page.mouse.up();
  await expect.poll(sheet).toBe("doc");
  await expect.poll(alpha).toBe(1);
  await page.getByRole("button", { name: "Edit form", exact: true }).click();
  await page.getByLabel("Document draft", { exact: true }).focus();
  const editingHeight = await documentCell.evaluate(
    (node) => node.getBoundingClientRect().height,
  );
  await page.getByLabel("Document draft", { exact: true }).press("Tab");
  await expect(
    page.getByRole("button", { name: "Cancel document form", exact: true }),
  ).toBeFocused();
  assert(
    Math.abs(
      (await documentCell.evaluate(
        (node) => node.getBoundingClientRect().height,
      )) - editingHeight,
    ) < 1,
  );
  await page
    .getByRole("button", { name: "Cancel document form", exact: true })
    .click();
  await expect(page.locator("[data-layout-cancels]")).toHaveText("1");
  await page
    .getByRole("button", { name: "Open nested confirmation", exact: true })
    .click();
  await expect(page.getByRole("alertdialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("alertdialog")).toBeHidden();
  await expect.poll(sheet).toBe("doc");
  await page.keyboard.press("Escape");
  await expect.poll(sheet).toBe("closed");
  checkpoint("mobile/open-sheet-to-full-board-no-stale-seek");
  await page
    .getByRole("button", { name: "Open document", exact: true })
    .click();
  await expect.poll(sheet).toBe("doc");
  await page.getByRole("button", { name: "Full Board", exact: true }).click();
  await expect.poll(sheet).toBe("closed");
  await expect(page.locator("[data-room-board]")).toHaveAttribute(
    "data-placement",
    "full",
  );
  await page.waitForTimeout(31_000); // Exceeds the owned CSS-discovery deadline; negative regression, not readiness.
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page.getByRole("button", { name: "Board pane", exact: true }).click();
  await expect.poll(sheet).toBe("doc");
  await page.getByRole("button", { name: "Full Board", exact: true }).click();
  await expect.poll(sheet).toBe("closed");
  await page
    .getByRole("button", { name: "Document pane", exact: true })
    .click();
  checkpoint("mobile/deferred-route-and-selection-entry");
  await page
    .getByRole("button", { name: "Open document", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Close then navigate", exact: true })
    .click();
  await expect(page.locator("[data-layout-navigations]")).toHaveText("1");
  await expect(page).toHaveURL(/#layout-deferred$/);
  await page.getByRole("button", { name: "Open sidebar", exact: true }).click();
  const pickHistory = await page.evaluate(() => history.length);
  await page.getByRole("button", { name: "Pick thread", exact: true }).click();
  await expect(page).toHaveURL(/#layout-picked$/);
  assert.equal(await page.evaluate(() => history.length), pickHistory);
  checkpoint("dispose/no-style-writes");
  await page
    .getByRole("button", { name: "Dispose layout", exact: true })
    .click();
  const oldSheet = await sheet();
  await page
    .getByRole("button", { name: "Open document", exact: true })
    .click();
  assert.equal(await sheet(), oldSheet);
  report.styleWrites = await page.evaluate(() =>
    Reflect.get(window, "roomLayoutStyleWrites"),
  );
  assert.deepEqual(report.styleWrites, []);
  assert.deepEqual(errors, []);
  report.reducedMotion = await page.evaluate(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  assert.equal(report.reducedMotion, true);
  await page.screenshot({ path: `${output}/room-layout.png` });
  report.status = "passed";
} catch (error) {
  report.status = interrupted ? "interrupted" : "failed";
  report.failure = error instanceof Error ? error.message : String(error);
  process.exitCode = interrupted ? 130 : 1;
} finally {
  await closeBrowser();
  await gallery?.server.stop(true);
  process.off("SIGINT", signal);
  process.off("SIGTERM", signal);
  report.controllerMemory = await readFile("/proc/self/status", "utf8")
    .then((value) =>
      value.split("\n").filter((line) => /^Vm(?:HWM|RSS):/.test(line)),
    )
    .catch(() => null);
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
}
