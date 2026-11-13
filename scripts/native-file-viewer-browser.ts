// Real loopback Worker/R2/Book/browser verification. No room-state interception or fabricated canonical rows.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, expect, type Page } from "@playwright/test";
import * as z from "zod/mini";
import { createRoomApi } from "../svelte/transport";
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base),
  "Use loopback DEV_EMAIL Worker",
);
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-viewer-browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const result: Record<string, unknown> = {
  scope:
    "Real authorized typed HTTP uploads, native version/history/media/HTML sandbox and opt-in access presentation; no provider/account lifecycle is fabricated.",
  revisionSuppliedByRunner: process.env.TEST_APP_REVISION ?? null,
  gaps: [
    "Uploads use supported typed HTTP API rather than composer UI.",
    "Chromium PDF iframe resource delivery is checked; native PDF plugin rendering remains platform-dependent.",
    "No actual iOS standalone/Safari handoff or production deployment acceptance.",
    "Cookie cache gate uses a separate unrouted context; legacy pre-Vary fresh cache entries and same-cookie revoked membership remain documented backend limits.",
  ],
};
let failedPage: Page | undefined;
function wav() {
  const bytes = Buffer.alloc(44 + 8000);
  bytes.write("RIFF");
  bytes.writeUInt32LE(bytes.length - 8, 4);
  bytes.write("WAVEfmt ", 8);
  bytes.writeUInt32LE(16, 16);
  bytes.writeUInt16LE(1, 20);
  bytes.writeUInt16LE(1, 22);
  bytes.writeUInt32LE(8000, 24);
  bytes.writeUInt32LE(8000, 28);
  bytes.writeUInt16LE(1, 32);
  bytes.writeUInt16LE(8, 34);
  bytes.write("data", 36);
  bytes.writeUInt32LE(8000, 40);
  bytes.fill(128, 44);
  return bytes;
}
function pdf() {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] >>",
  ];
  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (const [i, obj] of objects.entries()) {
    offsets.push(Buffer.byteLength(body));
    body += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  }
  const xref = Buffer.byteLength(body);
  body += `xref\n0 4\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((n) => `${String(n).padStart(10, "0")} 00000 n \n`)
    .join("")}trailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(body);
}
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
    reducedMotion: "reduce",
  });
  context.setDefaultTimeout(60000);
  context.setDefaultNavigationTimeout(120000);
  await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
  const created = await context.request.post(base + "/api/books", {
    headers: { origin: base },
    data: { title: "Native viewer verification" },
  });
  assert(created.ok());
  const id = z.object({ id: z.string() }).parse(await created.json()).id;
  result.room = id;
  const api = createRoomApi(id, async (input, init) => {
    const req =
      input instanceof Request
        ? new Request(input, init)
        : new Request(new URL(String(input), base), init);
    const res = await context.request.fetch(req.url, {
      method: req.method,
      headers: { ...Object.fromEntries(req.headers), origin: base },
      data:
        req.method === "GET" ? undefined : Buffer.from(await req.arrayBuffer()),
    });
    return new Response(await res.text(), {
      status: res.status(),
      headers: res.headers(),
    });
  });
  const upload = (name: string, body: string | Buffer, type: string) =>
    api.uploadFile({ name, type, body });
  const old = await upload(
      "report.md",
      "# Older immutable version",
      "text/markdown",
    ),
    newest = await upload(
      "report.md",
      "# Newest immutable version",
      "text/markdown",
    );
  const html = await upload(
    "viewer.html",
    '<!doctype html><title>Native HTML fixture</title><h1>Sandboxed real HTML</h1><script>try{void parent.document;document.body.dataset.isolation="failed"}catch{document.body.dataset.isolation="blocked"}</script>',
    "text/html",
  );
  const image = await upload(
      "viewer.png",
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jYuQAAAAASUVORK5CYII=",
        "base64",
      ),
      "image/png",
    ),
    audio = await upload("viewer.wav", wav(), "audio/wav"),
    document = await upload("viewer.pdf", pdf(), "application/pdf");
  result.files = {
    old: old.id,
    newest: newest.id,
    html: html.id,
    image: image.id,
    audio: audio.id,
    pdf: document.id,
  };
  const vanilla = await context.request.get(`${base}/b/${id}`);
  assert(
    !(await vanilla.text()).includes('name="vb-ui" content="svelte"'),
    "Vanilla remains default",
  );
  const page = await context.newPage();
  failedPage = page;
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const open = async (fid: string) => {
    await page.goto(`${base}/b/${id}?ui=svelte#f${fid}`);
    await expect(page.locator("[data-file-id]")).toHaveAttribute(
      "data-file-id",
      fid,
    );
  };
  await open(newest.id);
  result.appVersion = await page
    .locator('meta[name="vb-v"]')
    .getAttribute("content");
  await expect(
    page.getByRole("heading", { name: "Newest immutable version" }),
  ).toBeVisible();
  await page.getByLabel("File version", { exact: true }).selectOption(old.id);
  await expect(
    page.getByRole("heading", { name: "Older immutable version" }),
  ).toBeVisible();
  assert(new URL(page.url()).hash === `#f${old.id}`);
  await page.goBack();
  await expect(page.locator("[data-file-viewer]")).not.toBeVisible();
  await page.goForward();
  await expect(page.locator("[data-file-id]")).toHaveAttribute(
    "data-file-id",
    old.id,
  );
  await page.getByRole("button", { name: "Close file", exact: true }).click();
  await expect.poll(() => new URL(page.url()).hash).toBe("");
  await open(image.id);
  await expect(page.locator("[data-file-viewer] img")).toBeVisible();
  assert(
    await page
      .locator("[data-file-viewer] img")
      .evaluate(
        (node) => node instanceof HTMLImageElement && node.naturalWidth > 0,
      ),
  );
  await open(audio.id);
  await expect
    .poll(() =>
      page
        .locator("[data-file-viewer] audio")
        .evaluate((node) =>
          node instanceof HTMLAudioElement ? node.readyState : 0,
        ),
    )
    .toBeGreaterThan(0);
  await open(html.id);
  const frame = page.locator("[data-file-viewer] iframe");
  await expect(frame).toHaveAttribute("sandbox", "allow-scripts");
  await expect(
    page
      .frameLocator("[data-file-viewer] iframe")
      .getByRole("heading", { name: "Sandboxed real HTML" }),
  ).toBeVisible();
  await expect(
    page.frameLocator("[data-file-viewer] iframe").locator("body"),
  ).toHaveAttribute("data-isolation", "blocked");
  await page
    .frameLocator("[data-file-viewer] iframe")
    .locator("body")
    .press("Escape");
  await expect(page.locator("[data-file-viewer]")).not.toBeVisible();
  await open(document.id);
  await expect(page.locator("[data-file-viewer] iframe")).toHaveAttribute(
    "src",
    `/api/books/${id}/files/${document.id}?ui=svelte`,
  );
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await open(newest.id);
    await page.getByRole("button", { name: "Close file", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-file-viewer]")).not.toBeVisible();
  }
  assert(errors.length === 0, errors.join("\n"));
  result.ui =
    "PASS exact Markdown versions, Back/Forward, image decode, audio metadata, HTML sandbox/Escape, PDF resource URL and desktop/mobile keyboard close";
  // No context.route/routeWebSocket calls: interception disables Chromium HTTP cache and would invalidate this gate.
  const cacheContext = await browser.newContext();
  const cachePage = await cacheContext.newPage();
  await cachePage.goto(base + "/login");
  const raw = `/api/books/${id}/files/${image.id}?ui=svelte`;
  const first = await cachePage.evaluate(async (url) => {
    const response = await fetch(url);
    const img = new Image();
    img.src = url;
    document.body.append(img);
    await new Promise<void>((yes, no) => {
      img.onload = () => yes();
      img.onerror = () => no(Error("initial image failed"));
    });
    return { status: response.status, vary: response.headers.get("vary") };
  }, raw);
  assert(first.status === 200 && first.vary?.toLowerCase().includes("cookie"));
  const switchResult = await cachePage.evaluate(async () => {
    const response = await fetch(
      "/api/dev/as?email=viewer-outsider%40example.test",
    );
    return response.status;
  });
  assert(switchResult === 200, "Supported DEV account switch must succeed");
  const after = await cachePage.evaluate(async (url) => {
    const response = await fetch(url);
    const img = new Image();
    img.src = url;
    document.body.append(img);
    const decoded = await new Promise<boolean>((yes) => {
      img.onload = () => yes(true);
      img.onerror = () => yes(false);
    });
    return { status: response.status, decoded };
  }, raw);
  assert(
    after.status === 403 && !after.decoded,
    "Same exact cached file URL must reauthorize account B",
  );
  result.cache =
    "PASS real unrouted same-context A→B exact URL fetch and image reauthorization";
  const access = await cacheContext.request.get(base + raw, {
    headers: { accept: "text/html" },
  });
  assert(access.status() === 403);
  assert(
    (await access.text()).includes('name="vb-page" content="file-access"'),
  );
  await cachePage.goto(base + raw);
  await expect(
    cachePage.getByText("Only room members can open this file"),
  ).toBeVisible();
  result.access = "PASS real signed-in non-member403 native file-access shell";
  await cacheContext.close();
  result.pass = true;
} catch (error) {
  result.pass = false;
  result.error = error instanceof Error ? error.message : String(error);
  if (failedPage)
    await failedPage
      .screenshot({ path: output + "/failure.png", fullPage: true })
      .catch(() => {});
  throw error;
} finally {
  await writeFile(output + "/report.json", JSON.stringify(result, null, 2));
  await browser.close();
}
