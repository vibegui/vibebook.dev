// Diagnostic against an actual built native Apps bridge, real HTTP/Book/R2 and
// two controlled documents. No source-eligibility mocks or canonical fixtures.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createHash, randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, expect as baseExpect } from "@playwright/test";
import * as z from "zod/mini";
import { MeResult } from "../shared/schemas";
import { createRoomApi } from "../svelte/transport";
import {
  localBrowserError,
  nativeBrowserFixtures,
  openNativeRoomPane,
} from "./native-browser-fixtures";

const expect = baseExpect.configure({ timeout: 45_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base));
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-app-navigation";
await mkdir(output, { recursive: true });
const marker = `Controlled room marker ${randomBytes(12).toString("hex")}`;
// Neither document contains the marker. It can only arrive through room-read.
function documentHtml(stage: "initial" | "replacement", destination?: string) {
  return `<!doctype html><meta charset="utf-8"><title>Controlled ${stage} document</title>
<p id="stage">${stage}</p><output id="result" data-outcome="pending"></output>
${destination ? '<button id="navigate">Navigate same frame</button>' : ""}
<script>
const output = document.getElementById('result');
const readId = ${stage === "initial" ? 101 : 201};
function send(method, params, id) { parent.postMessage({jsonrpc:'2.0',method,params,...(id === undefined ? {} : {id})}, '*'); }
addEventListener('message', event => {
  if(event.source !== parent || !event.data || event.data.jsonrpc !== '2.0') return;
  const value = event.data;
  if(value.id === 1 && value.result) {
    send('ui/notifications/initialized', {});
    send('tools/call', {name:'vibebook_read',arguments:{limit:1}}, readId);
  }
  if(value.id !== readId) return;
  if(value.error || value.result?.isError) { output.dataset.outcome='refused'; return; }
  const room = value.result?.structuredContent?.room;
  if(typeof room?.title === 'string') { output.textContent=room.title; output.dataset.outcome='read'; }
  else output.dataset.outcome='unexpected';
});
${destination ? `document.getElementById('navigate').onclick=()=>{location.href=${JSON.stringify(destination)}};` : ""}
send('ui/initialize', {appInfo:{name:'controlled-navigation-probe',version:'1'},appCapabilities:{},protocolVersion:'2026-01-26'}, 1);
</script>`;
}
const replacement = documentHtml("replacement");
assert(!replacement.includes(marker));
let replacementRequests = 0;
const server = createServer((request, response) => {
  if (request.url !== "/replacement") {
    response.writeHead(404).end();
    return;
  }
  replacementRequests++;
  response.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(replacement);
});
await new Promise<void>((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
const address = server.address();
assert(address && typeof address !== "string");
const replacementOrigin = `http://127.0.0.1:${address.port}`;
const report: Record<string, unknown> = {
  status: "running",
  scope:
    "Controlled self-navigation across real opaque native room-App documents; diagnostic, not a passing security assertion",
  suppliedAppRevision: process.env.TEST_APP_REVISION ?? null,
  pageErrors: [],
  gaps: [
    "No remote MCP/provider navigation is represented",
    "No BFCache proof; a separate restored-document cohort is required",
    "A missing response or failed navigation is inconclusive, never evidence that capability is denied",
    "No navigation policy or SDK change is introduced",
  ],
};
let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null;
try {
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
  });
  await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
  report.fixtures = await nativeBrowserFixtures(context, base);
  const meResponse = await context.request.get(`${base}/api/me?ui=svelte`);
  assert(meResponse.ok(), "Requires a signed-in local DEV Worker");
  report.appVersion = MeResult.parse(await meResponse.json()).v;
  const assets = await context.request.get(`${base}/svelte-preview/app.js`);
  assert(assets.ok(), "Built native app entry missing");
  report.entrySha256 = createHash("sha256")
    .update(await assets.body())
    .digest("hex");
  const created = await context.request.post(`${base}/api/books`, {
    headers: { origin: base },
    data: { title: marker },
  });
  assert(created.ok(), `Create fixture room: ${created.status()}`);
  const roomId = z.object({ id: z.string() }).parse(await created.json()).id;
  report.fixtureRoom = roomId;
  const api = createRoomApi(roomId, async (input, init) => {
    const request =
      input instanceof Request
        ? new Request(input, init)
        : new Request(new URL(String(input), base), init);
    const response = await context.request.fetch(request.url, {
      method: request.method,
      headers: { ...Object.fromEntries(request.headers), origin: base },
      data:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : Buffer.from(await request.arrayBuffer()),
    });
    return new Response(new Uint8Array(await response.body()), {
      status: response.status(),
      headers: response.headers(),
    });
  });
  const initial = documentHtml("initial", `${replacementOrigin}/replacement`);
  assert(!initial.includes(marker));
  const file = await api.uploadFile({
    name: "apps/capability-probe.html",
    type: "text/html",
    body: initial,
  });
  assert.equal(
    file.name,
    "apps/capability-probe.html",
    "Fixture must be a real supported room app",
  );
  const page = await context.newPage();
  const pageErrors: { name: string; locations: string[] }[] = [];
  report.pageErrors = pageErrors;
  page.on("pageerror", (error) =>
    pageErrors.push(localBrowserError(error, [base, replacementOrigin])),
  );
  await page.goto(`${base}/b/${roomId}?ui=svelte`);
  await openNativeRoomPane(page, "apps");
  await page
    .locator("[data-native-apps]")
    .getByRole("button", { name: /capability-probe/ })
    .click();
  const selector = "[data-native-app-frame] iframe";
  const frame = page.frameLocator(selector);
  await expect(frame.locator("#stage")).toHaveText("initial");
  await expect(frame.locator("#result")).toHaveText(marker);
  const sandbox = await page.locator(selector).getAttribute("sandbox");
  assert(
    sandbox?.includes("allow-scripts") &&
      !sandbox.includes("allow-same-origin"),
  );
  report.initialRead = true;
  assert.equal(
    await frame.locator("#stage").evaluate(() => self.origin),
    "null",
    "Initial document must have an opaque origin",
  );
  // Install the listener in the real host before the controlled iframe gesture.
  const navigated = page.evaluate(
    (selector) =>
      new Promise<{ sameElement: boolean; sameWindow: boolean }>(
        (resolve, reject) => {
          const frame = document.querySelector(selector);
          if (!(frame instanceof HTMLIFrameElement)) {
            reject(Error("Missing app frame"));
            return;
          }
          const before = frame.contentWindow;
          frame.dataset.probeNavigationReady = "1";
          const timer = setTimeout(
            () => reject(Error("Controlled iframe navigation timeout")),
            30_000,
          );
          frame.addEventListener(
            "load",
            () => {
              clearTimeout(timer);
              resolve({
                sameElement: frame === document.querySelector(selector),
                sameWindow: frame.contentWindow === before,
              });
            },
            { once: true },
          );
        },
      ),
    selector,
  );
  // Observe the diagnostic promise immediately so a failed gesture cannot leave
  // a rejected Playwright evaluation unhandled while teardown closes the page.
  const navigationResult = navigated.then(
    (value) => ({ value }),
    () => ({ value: null }),
  );
  await expect(page.locator(selector)).toHaveAttribute(
    "data-probe-navigation-ready",
    "1",
  );
  await frame.getByRole("button", { name: "Navigate same frame" }).click();
  const { value: identity } = await navigationResult;
  assert(
    identity?.sameElement && identity.sameWindow,
    "Diagnostic requires the same iframe element and WindowProxy",
  );
  report.navigation = identity;
  await expect(frame.locator("#stage")).toHaveText("replacement");
  assert.equal(
    await frame.locator("#stage").evaluate(() => self.origin),
    "null",
    "Replacement must retain the opaque sandbox origin",
  );
  assert(
    replacementRequests > 0,
    "Replacement must be delivered by the controlled second HTTP origin",
  );
  report.replacementOriginDiffers = replacementOrigin !== base;
  await expect(frame.locator("#result")).not.toHaveAttribute(
    "data-outcome",
    "pending",
  );
  const outcome = await frame.locator("#result").getAttribute("data-outcome");
  if (outcome === "read") {
    await expect(frame.locator("#result")).toHaveText(marker);
    report.capabilityInheritance = "observed";
  } else {
    assert.equal(outcome, "refused", "Unexpected reply cannot prove denial");
    report.capabilityInheritance = "explicitly refused";
  }
  report.status = "diagnosed";
  report.interpretation =
    "Observed means browsing-context capability survived replacement; refused means only this controlled request was denied. Neither result establishes BFCache or pre-load race safety.";
} catch (error) {
  report.status = "inconclusive";
  report.failure = error instanceof Error ? error.name : "UnknownError";
  process.exitCode = 1;
} finally {
  await browser?.close();
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
  await writeFile(`${output}/results.json`, JSON.stringify(report, null, 2));
}
