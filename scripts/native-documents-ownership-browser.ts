// Focused real Worker/Book/DocRoom ownership diagnosis; no canonical/API/Yjs mocks.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import {
  chromium,
  expect as baseExpect,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import * as z from "zod/mini";
import { AccessContext } from "../shared/schemas";
import {
  nativeBrowserFixtures,
  nativeDocumentMode,
  openNativeRoomPane,
  localBrowserError,
} from "./native-browser-fixtures";
const expect = baseExpect.configure({ timeout: 45_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base));
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-documents-ownership";
await mkdir(output, { recursive: true });
const steps: { name: string; status: string; ms?: number }[] = [],
  pageErrors: { name: string; locations: string[] }[] = [];
const report: Record<string, unknown> = {
  status: "running",
  harnessRevision: (await Bun.$`git rev-parse HEAD`.quiet()).text().trim(),
  suppliedAppRevision: process.env.TEST_APP_REVISION ?? null,
  steps,
  pageErrors,
  scope:
    "Real HTTP-created room, native UI Yjs writes, independent real Book snapshot mirror read, real DEV identity/access UI and 390px native document keyboard navigation",
  gaps: [
    "DEV identity switching does not test production session issuance",
    "Chromium viewport is not hardware touch/iOS/IME acceptance",
    "No DB seeding or fabricated canonical/transport frames; public-font/local-runner isolation only",
    "Single focused lifecycle cohort, not the full document suite",
  ],
};
let substep = "launch";
async function step(name: string, run: () => Promise<void>) {
  substep = name;
  const value = { name, status: "running", ms: 0 };
  steps.push(value);
  const start = Date.now();
  try {
    await run();
    value.status = "passed";
  } catch (error) {
    value.status = "failed";
    throw error;
  } finally {
    value.ms = Date.now() - start;
  }
}
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
let context: BrowserContext | null = null,
  page: Page | null = null;
const stopped = () => void browser.close();
process.once("SIGINT", stopped);
process.once("SIGTERM", stopped);
async function identity(owner: BrowserContext, email: string) {
  const result = await owner.request.get(
    `${base}/api/dev/as?email=${encodeURIComponent(email)}`,
  );
  assert(result.ok());
  await owner.addCookies([{ name: "vb_lang", value: "en", url: base }]);
  const response = await owner.request.get(`${base}/api/me?ui=svelte`);
  assert(response.ok());
  const me = z
    .object({ email: z.string(), v: z.string() })
    .parse(await response.json());
  assert.equal(me.email, email);
  return me;
}
async function mirrorHas(owner: Page, room: string, marker: string) {
  return owner.evaluate(
    ({ room, marker }) =>
      new Promise<boolean>((resolve, reject) => {
        const socket = new WebSocket(
          `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/${room}?t=main`,
        );
        const timeout = setTimeout(() => {
          socket.close();
          reject(Error("Book snapshot timeout"));
        }, 15_000);
        const finish = (value: boolean) => {
          clearTimeout(timeout);
          socket.close();
          resolve(value);
        };
        socket.onmessage = (event) => {
          if (typeof event.data !== "string") return;
          const value: unknown = JSON.parse(event.data);
          if (
            value &&
            typeof value === "object" &&
            "t" in value &&
            value.t === "state"
          )
            finish(
              "doc" in value &&
                typeof value.doc === "string" &&
                value.doc.includes(marker),
            );
        };
        socket.onerror = () => {
          clearTimeout(timeout);
          socket.close();
          reject(Error("Book snapshot unavailable"));
        };
      }),
    { room, marker },
  );
}
try {
  const suffix = Date.now().toString(36),
    ownerEmail = `doc-scope-owner-${suffix}@example.test`,
    foreignEmail = `doc-scope-foreign-${suffix}@example.test`;
  context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
  });
  context.setDefaultTimeout(45_000);
  context.setDefaultNavigationTimeout(60_000);
  await nativeBrowserFixtures(context, base);
  const owner = context;
  await step("establish DEV owner and create real room", async () => {
    report.apiVersion = (await identity(owner, ownerEmail)).v;
  });
  const created = await owner.request.post(`${base}/api/books`, {
    headers: { origin: base },
    data: { title: `Document ownership diagnosis ${suffix}` },
  });
  assert(created.ok());
  const room = z.object({ id: z.string() }).parse(await created.json()).id;
  report.room = room;
  page = await owner.newPage();
  const current = page;
  current.on("pageerror", (error) => {
    pageErrors.push(localBrowserError(error, base));
  });
  const marker = `OWNED_DOCUMENT_${suffix} αβ 日本語`;
  await step(
    "owner room app readiness and actual native editor write",
    async () => {
      const response = await current.goto(`${base}/b/${room}?ui=svelte`, {
        waitUntil: "domcontentloaded",
      });
      assert(response?.ok());
      await expect(current.locator("[data-native-composer]")).toBeVisible();
      await nativeDocumentMode(current, "edit");
      const editor = current.locator("[data-document-editor] .cm-content");
      await expect(editor).toBeVisible();
      await expect(editor).toHaveAttribute("contenteditable", "true");
      await editor.click();
      await current.keyboard.insertText(marker);
      await expect(editor).toContainText(marker);
      await expect
        .poll(() => mirrorHas(current, room, marker), {
          intervals: [1000, 2000, 3000],
        })
        .toBe(true);
      report.shellVersion = await current
        .locator('meta[name="vb-v"]')
        .getAttribute("content");
      const scripts = await current
        .locator("script[src]")
        .evaluateAll((nodes) =>
          nodes.map((node) => node.getAttribute("src") ?? ""),
        );
      const script = scripts.find((src) => /\/app\.js(?:\?|$)/.test(src));
      if (script) {
        const asset = await owner.request.get(new URL(script, base).href);
        assert(asset.ok());
        report.asset = {
          path: new URL(script, base).pathname,
          sha256: createHash("sha256")
            .update(await asset.body())
            .digest("hex"),
        };
      }
      await current.screenshot({ path: `${output}/01-owner-editor.png` });
    },
  );
  const stale = await current
    .locator("[data-document-editor] .cm-content")
    .elementHandle();
  assert(stale);
  await step("real home readiness and prior editor teardown", async () => {
    await current.goto(`${base}/app?ui=svelte`, {
      waitUntil: "domcontentloaded",
    });
    await expect(current.locator('[data-vb-native="home"]')).toBeVisible();
    await expect(current.locator(".book")).toHaveCount(0);
    assert.equal(
      await stale.evaluate((node) => node.isConnected).catch(() => false),
      false,
    );
    await expect(current.locator(".cm-editor")).toHaveCount(0);
  });
  await step(
    "foreign identity and positive real native access-page readiness",
    async () => {
      await identity(owner, foreignEmail);
      const response = await current.goto(`${base}/b/${room}?ui=svelte`, {
        waitUntil: "domcontentloaded",
      });
      assert(response?.ok());
      await expect(current.locator('[data-vb-native="auth"]')).toBeVisible();
      await expect(
        current.getByRole("button", { name: "Ask to join", exact: true }),
      ).toBeVisible();
      await expect(
        current.getByText(
          `You're signed in as ${foreignEmail}. People in the room see your request and let you in.`,
          { exact: true },
        ),
      ).toBeVisible();
      const proof = await owner.request.get(`${base}/auth/room/${room}`);
      assert(proof.ok());
      const access = AccessContext.parse(await proof.json());
      assert.equal(access.email, foreignEmail);
      assert.equal(access.state, "ask");
      await expect(
        current.locator(
          "[data-document-preview], [data-document-editor], .cm-editor",
        ),
      ).toHaveCount(0);
      assert.equal(
        (await current.locator("body").innerText()).includes(marker),
        false,
      );
      await current.screenshot({ path: `${output}/02-foreign-access.png` });
    },
  );
  await step(
    "restore owner and prove desktop room/editor readiness again",
    async () => {
      await identity(owner, ownerEmail);
      await current.goto(`${base}/b/${room}?ui=svelte`, {
        waitUntil: "domcontentloaded",
      });
      await expect(current.locator("[data-native-composer]")).toBeVisible();
      await nativeDocumentMode(current, "edit");
      await expect(
        current.locator("[data-document-editor] .cm-content"),
      ).toContainText(marker);
    },
  );
  await step(
    "390px genuine native Doc sheet and editor readiness",
    async () => {
      await current.setViewportSize({ width: 390, height: 844 });
      await openNativeRoomPane(current, "doc");
      await expect(current.locator(".book")).toHaveAttribute(
        "data-sheet",
        "doc",
      );
      await expect(current.locator("[data-native-document]")).toBeVisible();
      await current.screenshot({ path: `${output}/03-phone-doc.png` });
    },
  );
  await step(
    "390px native keyboard Doc to Files and back preserves focus/sheet",
    async () => {
      const doc = current.locator(
        '#nativeDocumentPeek button[data-document-pane="doc"]',
      );
      await expect(doc).toBeVisible();
      await doc.focus();
      await current.keyboard.press("ArrowRight");
      await expect(current.locator(".book")).toHaveAttribute(
        "data-pane",
        "files",
      );
      assert.equal(
        await current.evaluate(() =>
          document.activeElement?.getAttribute("data-document-pane"),
        ),
        "files",
      );
      await current.keyboard.press("ArrowLeft");
      await expect(current.locator(".book")).toHaveAttribute(
        "data-pane",
        "doc",
      );
      assert.equal(
        await current.evaluate(() =>
          document.activeElement?.getAttribute("data-document-pane"),
        ),
        "doc",
      );
      await expect(current.locator(".book")).toHaveAttribute(
        "data-sheet",
        "doc",
      );
      await nativeDocumentMode(current, "edit");
      const editor = current.locator("[data-document-editor] .cm-content");
      await expect(editor).toBeVisible();
      await editor.click();
      await current.keyboard.press("ControlOrMeta+End");
      await current.keyboard.insertText(`\nPHONE_OWNER_${suffix}`);
      await expect
        .poll(() => mirrorHas(current, room, `PHONE_OWNER_${suffix}`))
        .toBe(true);
      await current.screenshot({ path: `${output}/04-phone-keyboard.png` });
    },
  );
  assert.deepEqual(pageErrors, []);
  report.status = "passed";
} catch (error) {
  report.status = "failed";
  report.failedSubstep = substep;
  report.failure =
    error instanceof Error
      ? { name: error.name, firstLine: error.message.split("\n")[0] }
      : { name: "UnknownError" };
  if (page)
    await page.screenshot({ path: `${output}/failure.png` }).catch(() => {});
  process.exitCode = 1;
} finally {
  await browser.close();
  process.removeListener("SIGINT", stopped);
  process.removeListener("SIGTERM", stopped);
  await writeFile(
    `${output}/results.json`,
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify({ status: report.status, substep, output, pageErrors }),
  );
}
