import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import {
  chromium,
  expect as baseExpect,
  type Page,
  type WebSocketRoute,
} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as z from "zod/mini";
import {
  nativeBrowserFixtures,
  openNativeSidebar,
} from "./native-browser-fixtures";
import { nativeTestAgent } from "./native-test-mcp";
import { AttachmentSchema } from "../shared/schemas";

const expect = baseExpect.configure({ timeout: 60_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
  "Use a loopback test Worker with DEV_EMAIL enabled",
);
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-pins-browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const result: Record<string, unknown> = {
  scope:
    "Incremental native pinned items against a real loopback Worker; not production or full sidebar acceptance",
  gaps: [
    "No supported public file-deletion operation exists, so a truly deleted-file pin is covered by unit/DOM tests, not created by modifying the test database or fabricating room frames.",
    "Unavailable-app acceptance covers the real disconnected MCP target through the existing Apps adapter; it does not claim that the remaining legacy Apps UI is native.",
  ],
};
const errors: string[] = [];
let failedPage: Page | undefined;
let stopAppFixture: (() => void) | undefined;
const step = (value: string) => {
  result.step = value;
  console.log(value);
};
const pinResponse = z.object({ ok: z.literal(true), id: z.string() });
const pinsResponse = z.object({
  pins: z.array(
    z.object({
      id: z.string(),
      kind: z.string(),
      ref: z.string(),
      title: z.optional(z.string()),
    }),
  ),
});
function wireObject(raw: string | Buffer): Record<string, unknown> | null {
  try {
    const parsed = z
      .record(z.string(), z.unknown())
      .safeParse(JSON.parse(raw.toString()));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

try {
  // An actual loopback MCP app fixture, reached by the Worker's supported connection API.
  // Its protocol answers are fixture data; room HTTP/WS state always comes from Book.
  const appMethods: string[] = [];
  const appHTML =
    "<!doctype html><html lang='en'><head><meta charset='utf-8'><title>Native pins app</title></head><body><h1>Native pins app ready</h1><p>Real local MCP resource opened from a pinned app.</p></body></html>";
  const appFixture = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    async fetch(request) {
      if (request.method !== "POST")
        return new Response("MCP POST only", { status: 405 });
      const body = z
        .object({
          id: z.optional(z.union([z.string(), z.number()])),
          method: z.string(),
          params: z.optional(z.unknown()),
        })
        .parse(await request.json());
      appMethods.push(body.method);
      if (body.id === undefined) return new Response(null, { status: 202 });
      let answer: unknown;
      switch (body.method) {
        case "initialize":
          answer = {
            protocolVersion: "2025-03-26",
            capabilities: { tools: {}, resources: {} },
            serverInfo: { name: "Native pins verification", version: "1" },
          };
          break;
        case "tools/list":
          answer = {
            tools: [
              {
                name: "pins_proof",
                title: "Pinned verification app",
                description: "A local read-only browser fixture",
                inputSchema: { type: "object", properties: {} },
                annotations: { readOnlyHint: true },
                _meta: { ui: { resourceUri: "ui://native-pins/proof" } },
              },
            ],
          };
          break;
        case "tools/call":
          answer = {
            content: [{ type: "text", text: "Native pins fixture data" }],
            structuredContent: { ready: true },
          };
          break;
        case "resources/read":
          answer = {
            contents: [
              {
                uri: "ui://native-pins/proof",
                mimeType: "text/html;profile=mcp-app",
                text: appHTML,
              },
            ],
          };
          break;
        default:
          return Response.json({
            jsonrpc: "2.0",
            id: body.id,
            error: { code: -32601, message: "Fixture method not implemented" },
          });
      }
      return Response.json({ jsonrpc: "2.0", id: body.id, result: answer });
    },
  });
  stopAppFixture = () => {
    appFixture.stop(true);
  };
  const appURL = `http://127.0.0.1:${appFixture.port}/mcp`;
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
    "real OAuth/PKCE agent uses supported local pin/unpin/connect/disconnect tools",
    "real uploads populate R2 and Book's file index; no direct database edits",
    "transparent WebSocket observer counts real client commands and real server snapshots",
    "temporarily holds and releases authentic pins/files server messages without editing or fabricating their payloads",
    "temporary browser-side room socket closure exercises offline sends/reconnection",
    "actual loopback read-only MCP server serves the pinned app resource",
  ];
  const created = await context.request.post(`${base}/api/books`, {
    data: { title: "Native pinned items verification" },
    headers: { origin: base },
  });
  assert(created.ok(), `Create room: ${created.status()}`);
  const { id } = z.object({ id: z.string() }).parse(await created.json());
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
  step("Creating real file history and a local MCP app connection");
  const agent = await nativeTestAgent(page, base);
  const upload = async (name: string, text: string) => {
    const response = await context.request.post(
      `${base}/api/books/${id}/files`,
      {
        headers: {
          origin: base,
          "content-type": "text/plain",
          "x-filename": encodeURIComponent(name),
        },
        data: text,
      },
    );
    assert(response.ok(), `Upload ${name}: ${response.status()}`);
    return AttachmentSchema.parse(await response.json());
  };
  const older = await upload(
    "older-pinned-report.txt",
    "Canonical older pinned file body",
  );
  for (let index = 0; index < 13; index++)
    await upload(`recent-${index}.txt`, `Recent fixture ${index}`);
  const newer = await upload(older.name, "Newer version of the report");
  const connection = z
    .object({ ok: z.literal(true), connection: z.object({ id: z.string() }) })
    .parse(
      await agent("connect_mcp", {
        room_id: id,
        url: appURL,
        scope: "me",
        title: "Native pins fixture",
      }),
    ).connection;
  result.files = { older: older.id, newer: newer.id, uploads: 15 };
  result.connection = connection.id;

  let disconnected = false;
  let holdPins = false;
  let holdFiles = false;
  let snapshots = 0;
  let initialFiles: string[] = [];
  const sockets: WebSocketRoute[] = [];
  const sent: Record<string, unknown>[] = [];
  const heldPins: (() => void)[] = [];
  const heldFiles: (() => void)[] = [];
  const pinRequests = new Set<string>();
  await context.routeWebSocket(
    (url) => url.pathname === `/ws/${id}`,
    async (socket) => {
      if (disconnected) {
        await socket.close({ code: 1012, reason: "local pins verification" });
        return;
      }
      const server = socket.connectToServer();
      socket.onMessage((raw) => {
        const command = wireObject(raw);
        if (command) sent.push(command);
        if (
          (command?.t === "pin.add" || command?.t === "pin.del") &&
          typeof command.cid === "string"
        )
          pinRequests.add(command.cid);
        server.send(raw);
      });
      server.onMessage((raw) => {
        const frame = wireObject(raw);
        if (frame?.t === "state") {
          snapshots++;
          initialFiles = z
            .array(z.object({ id: z.string() }))
            .parse(frame.files)
            .map((file) => file.id);
        }
        if (frame?.t === "pins" && holdPins) {
          heldPins.push(() => socket.send(raw));
          return;
        }
        if (
          frame?.t === "result" &&
          typeof frame.cid === "string" &&
          pinRequests.has(frame.cid) &&
          holdPins
        ) {
          const cid = frame.cid;
          heldPins.push(() => {
            socket.send(raw);
            pinRequests.delete(cid);
          });
          return;
        }
        if (frame?.t === "files" && holdFiles) {
          heldFiles.push(() => socket.send(raw));
          return;
        }
        socket.send(raw);
        if (frame?.t === "result" && typeof frame.cid === "string")
          pinRequests.delete(frame.cid);
      });
      sockets.push(socket);
    },
  );
  const flushPins = () => {
    holdPins = false;
    for (const deliver of heldPins.splice(0)) deliver();
  };
  const flushFiles = () => {
    holdFiles = false;
    for (const deliver of heldFiles.splice(0)) deliver();
  };
  const count = (type: string, field?: string, value?: string) =>
    sent.filter(
      (command) => command.t === type && (!field || command[field] === value),
    ).length;
  const pins = page.locator("[data-native-pins]");
  const row = (pinID: string) => pins.locator(`[data-pin-id="${pinID}"]`);
  const show = async () => {
    await openNativeSidebar(page);
    await expect(pins).toBeVisible();
    await pins.scrollIntoViewIfNeeded();
  };
  const navigate = async () => {
    const before = snapshots;
    await page.goto(`${base}/b/${id}?ui=svelte`);
    await show();
    await expect.poll(() => snapshots).toBeGreaterThan(before);
  };
  const openForm = async () => {
    await show();
    if (!(await pins.getByRole("form").count()))
      await pins
        .getByRole("button", { name: "Pin a link", exact: true })
        .click();
    const url = pins.getByRole("textbox", { name: "Link to pin", exact: true });
    await expect(url).toBeFocused();
    return {
      form: pins.getByRole("form"),
      url,
      title: pins.getByRole("textbox", {
        name: "Name (optional)",
        exact: true,
      }),
      save: pins.getByRole("button", { name: "Pin", exact: true }),
    };
  };
  const canonicalPins = async () =>
    pinsResponse.parse(await agent("read_room", { room_id: id, all: true }))
      .pins;
  await navigate();
  assert(
    !initialFiles.includes(older.id),
    "Unpinned older file must be outside the real initial newest-12 window",
  );
  result.initialFiles = { count: initialFiles.length, olderExcluded: true };

  step(
    "Checking create/cancel focus and live remote changes without losing the draft",
  );
  let form = await openForm();
  await form.url.fill(`${base}/demo?cancelled-pin`);
  await form.title.fill("Cancelled pin draft");
  const beforeCancel = count("pin.add");
  await pins.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(form.form).toHaveCount(0);
  await expect(
    pins.getByRole("button", { name: "Pin a link", exact: true }),
  ).toBeFocused();
  assert.equal(count("pin.add"), beforeCancel);
  form = await openForm();
  await form.url.fill(`${base}/llms.txt`);
  await form.title.fill("Worker reference");
  const remote = pinResponse.parse(
    await agent("pin", {
      room_id: id,
      kind: "link",
      ref: `${base}/en/docs`,
      title: "Remote reference",
    }),
  );
  await expect(row(remote.id)).toContainText("Remote reference");
  await expect(form.url).toHaveValue(`${base}/llms.txt`);
  await expect(form.title).toHaveValue("Worker reference");

  step(
    "Checking one queued add, edits before the real receipt, and canonical update",
  );
  holdPins = true;
  const addBaseline = count("pin.add");
  await form.save.click();
  await expect(form.save).toBeDisabled();
  await expect.poll(() => heldPins.length).toBeGreaterThan(0);
  await form.title.press("Enter");
  await form.title.fill("Edited while awaiting confirmation");
  flushPins();
  await agent("pin", {
    room_id: id,
    kind: "link",
    ref: `${base}/en/docs`,
    title: "Remote reference updated",
  });
  await expect(
    pins.getByRole("link", { name: /Worker reference/ }),
  ).toBeVisible();
  await expect(form.title).toHaveValue("Edited while awaiting confirmation");
  await expect(form.save).toBeEnabled();
  assert.equal(
    count("pin.add"),
    addBaseline + 1,
    "Pending form must not queue an implicit duplicate on Enter",
  );
  await form.save.click();
  await expect(form.form).toHaveCount(0);
  const canonical = await canonicalPins();
  const link = canonical.find((pin) => pin.ref === `${base}/llms.txt`);
  assert(link, "Real backend did not persist the browser-created pin");
  assert.equal(link.title, "Edited while awaiting confirmation");
  await expect(row(link.id)).toContainText(link.title);
  const popupPromise = page.waitForEvent("popup");
  await row(link.id).getByRole("link").click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(`${base}/llms.txt`);
  assert((await popup.locator("body").innerText()).includes("vibebook"));
  await popup.close();

  step("Checking explicit duplicate no-op and canonical removal once");
  form = await openForm();
  await form.url.fill(`${base}/llms.txt`);
  await form.title.fill("Edited while awaiting confirmation");
  const duplicateBaseline = count("pin.add");
  await form.save.click();
  await expect(pins.getByRole("status")).toContainText(
    "This link is already pinned",
  );
  await expect(form.form).toHaveCount(0);
  assert.equal(
    count("pin.add"),
    duplicateBaseline,
    "Identical existing pin is a user-visible no-op, not a new command",
  );
  holdPins = true;
  const deleteBaseline = count("pin.del", "id", link.id);
  await row(link.id)
    .getByRole("button", {
      name: "Unpin Edited while awaiting confirmation",
      exact: true,
    })
    .click();
  await expect.poll(() => heldPins.length).toBeGreaterThan(0);
  await expect(row(link.id)).toHaveCount(1);
  assert.equal(count("pin.del", "id", link.id), deleteBaseline + 1);
  flushPins();
  await expect(row(link.id)).toHaveCount(0);
  assert(!(await canonicalPins()).some((pin) => pin.id === link.id));

  step(
    "Resolving an older remote-pinned file through a real files.get response",
  );
  holdFiles = true;
  const filesBaseline = count("files.get");
  const oldPin = pinResponse.parse(
    await agent("pin", {
      room_id: id,
      kind: "file",
      ref: older.id,
      title: "Older report",
    }),
  );
  await expect(row(oldPin.id)).toBeVisible();
  await expect.poll(() => heldFiles.length).toBeGreaterThan(0);
  assert.equal(count("files.get"), filesBaseline + 1);
  await row(oldPin.id).getByRole("button").first().click();
  assert.equal(
    count("files.get"),
    filesBaseline + 1,
    "Clicking a queued lookup must not request the same full index twice",
  );
  flushFiles();
  const viewer = page.locator("#viewer");
  await expect(viewer).toBeVisible();
  await expect(viewer).toHaveAttribute("data-fid", older.id);
  await expect(viewer.locator(".vbody")).toContainText(
    "Canonical older pinned file body",
  );
  await viewer.locator(".vsel").selectOption(newer.id);
  await expect(viewer).toHaveAttribute("data-fid", newer.id);
  await expect(viewer.locator(".vbody")).toContainText(
    "Newer version of the report",
  );
  await viewer.getByRole("button", { name: "Close", exact: true }).click();
  await show();
  await row(oldPin.id).getByRole("button").first().click();
  await expect(viewer).toHaveAttribute("data-fid", older.id);
  await expect(viewer.locator(".vbody")).toContainText(
    "Canonical older pinned file body",
  );
  await viewer.getByRole("button", { name: "Close", exact: true }).click();
  result.olderFile = {
    pin: oldPin.id,
    filesRequests: count("files.get") - filesBaseline,
    selectedVersionReturnsToPinnedID: true,
  };

  step(
    "Opening a real pinned MCP app and handling its later unavailable connection",
  );
  const appPin = pinResponse.parse(
    await agent("pin", {
      room_id: id,
      kind: "app",
      ref: `${connection.id}/pins_proof`,
      title: "Pinned verification app",
    }),
  );
  await show();
  await row(appPin.id).getByRole("button").first().click();
  await expect(
    page
      .frameLocator(".connFrame")
      .getByRole("heading", { name: "Native pins app ready", exact: true }),
  ).toBeVisible();
  assert(appMethods.includes("resources/read"));
  await agent("disconnect_mcp", { room_id: id, connection_id: connection.id });
  await navigate();
  await row(appPin.id).getByRole("button").first().click();
  await expect(page.locator(".toast")).toContainText(
    "That app isn't in the connections you can use in this room",
  );
  await expect(page.locator(".connFrame")).toHaveCount(0);
  await show();
  await row(appPin.id)
    .getByRole("button", { name: "Unpin Pinned verification app", exact: true })
    .click();
  await expect(row(appPin.id)).toHaveCount(0);
  result.app = {
    activatedThroughRealMCP: true,
    disconnectedTargetHandledByExistingAppsAdapter: true,
    fixtureMethods: [...new Set(appMethods)],
  };

  step(
    "Keeping drafts offline, reconnecting, and sending only after an explicit retry",
  );
  form = await openForm();
  await form.url.fill(`${base}/en/connect`);
  await form.title.fill("Offline retained pin");
  disconnected = true;
  await Promise.all(
    sockets
      .splice(0)
      .map((socket) =>
        socket.close({ code: 1012, reason: "local pins verification" }),
      ),
  );
  const offlineBaseline = count("pin.add");
  await form.save.click();
  await expect(pins.getByRole("alert")).toContainText(
    "Offline. Your draft has been kept",
  );
  await expect(form.url).toHaveValue(`${base}/en/connect`);
  await expect(form.title).toHaveValue("Offline retained pin");
  assert.equal(count("pin.add"), offlineBaseline);
  const beforeReconnect = snapshots;
  disconnected = false;
  await expect.poll(() => snapshots).toBeGreaterThan(beforeReconnect);
  await expect(form.url).toHaveValue(`${base}/en/connect`);
  await expect(form.title).toHaveValue("Offline retained pin");
  assert.equal(
    count("pin.add"),
    offlineBaseline,
    "Reconnect must not retry a pin mutation automatically",
  );
  await form.save.click();
  await expect(form.form).toHaveCount(0);
  assert.equal(count("pin.add"), offlineBaseline + 1);
  assert(
    (await canonicalPins()).some((pin) => pin.title === "Offline retained pin"),
  );
  // API49 includes pinned file metadata in fresh snapshots. Verify the exact old file remains directly usable.
  await show();
  await row(oldPin.id).getByRole("button").first().click();
  await expect(viewer).toHaveAttribute("data-fid", older.id);
  await expect(viewer.locator(".vbody")).toContainText(
    "Canonical older pinned file body",
  );
  await viewer.getByRole("button", { name: "Close", exact: true }).click();
  // Closing the viewer pops its #f<id> history entry; a goto racing that back() is aborted.
  await expect.poll(() => new URL(page.url()).hash).toBe("");

  step("Checking EN/PT responsive accessibility and keyboard focus");
  const audit = async (language: "en" | "pt", width: number, dark: boolean) => {
    await context.addCookies([{ name: "vb_lang", value: language, url: base }]);
    await page.setViewportSize({ width, height: width <= 900 ? 844 : 1000 });
    await navigate();
    await page.evaluate((value) => {
      document.documentElement.dataset.theme = value ? "dark" : "light";
    }, dark);
    const add = pins.getByRole("button", {
      name: language === "en" ? "Pin a link" : "Fixar um link",
      exact: true,
    });
    await add.focus();
    await add.press("Enter");
    const url = pins.getByRole("textbox", {
      name: language === "en" ? "Link to pin" : "Link pra fixar",
      exact: true,
    });
    await expect(url).toBeFocused();
    await url.fill(`${base}/en/docs?keyboard=${language}-${width}`);
    const name = pins.getByRole("textbox", {
      name: language === "en" ? "Name (optional)" : "Nome (opcional)",
      exact: true,
    });
    await name.fill(
      language === "en" ? "Keyboard draft" : "Rascunho do teclado",
    );
    const native = await pins.evaluate((element) => ({
      boundary: element.hasAttribute("data-vb-native"),
      family: getComputedStyle(element.querySelector("h2") ?? element)
        .fontFamily,
      pageWidth: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    assert(native.boundary);
    assert(native.family.includes("Inter var"));
    assert(
      native.pageWidth <= native.viewport,
      "Native pinned items must not cause horizontal document overflow",
    );
    const accessibility = await new AxeBuilder({ page })
      .include("[data-native-pins]")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(accessibility.violations, []);
    const key = `pins-${language}-${dark ? "dark" : "light"}-${width}`;
    result[key] = { native, violations: accessibility.violations };
    await pins.screenshot({ path: `${output}/${key}.png` });
    if (width <= 900) {
      const lastControl = pins
        .locator("[data-pin-id]")
        .last()
        .getByRole("button", { name: /^(Unpin|Desafixar) / });
      await lastControl.scrollIntoViewIfNeeded();
      await expect(lastControl).toBeInViewport({ ratio: 0.95 });
      await lastControl.click({ trial: true });
      result[`${key}-scroll`] = {
        lastControl: await lastControl.boundingBox(),
        viewport: page.viewportSize(),
      };
      await page.screenshot({ path: `${output}/${key}-scroll.png` });
    }
    const beforeKeyboardCancel = count("pin.add");
    await name.press("Escape");
    await expect(pins.getByRole("form")).toHaveCount(0);
    await expect(add).toBeFocused();
    assert.equal(count("pin.add"), beforeKeyboardCancel);
    if (width <= 900) {
      // One real pointer click on a blurred mobile form must perform its action without focus-induced geometry drift.
      await add.click();
      await expect(url).toBeFocused();
      await page.evaluate(() => {
        if (document.activeElement instanceof HTMLElement)
          document.activeElement.blur();
      });
      const cancel = pins.getByRole("button", {
        name: language === "en" ? "Cancel" : "Cancelar",
        exact: true,
      });
      await cancel.scrollIntoViewIfNeeded();
      await cancel.click();
      await expect(pins.getByRole("form")).toHaveCount(0);
      await expect(add).toBeFocused();
    }
  };
  for (const language of ["en", "pt"] as const) {
    await audit(language, 1440, false);
    await audit(language, 900, true);
    await audit(language, 390, true);
  }
  assert.deepEqual(errors, []);
  result.commands = {
    pinAdd: count("pin.add"),
    pinDelete: count("pin.del"),
    filesGet: count("files.get"),
    realRoomSnapshots: snapshots,
  };
  result.status = "pass";
  console.log(
    "PASS native pins: real canonical writes, queued-edit retention, explicit no-op, older-file lookup/version identity, MCP app/unavailable target, offline/reconnect, EN/PT responsive axe and keyboard focus",
  );
} catch (error) {
  result.status = "fail";
  result.failure = String(error);
  if (failedPage && !failedPage.isClosed()) {
    await Promise.allSettled([
      failedPage.screenshot({ path: `${output}/failure.png` }),
      failedPage
        .content()
        .then((content) => writeFile(`${output}/failure.html`, content)),
    ]);
  }
  throw error;
} finally {
  result.errors = errors;
  await writeFile(
    `${output}/results.json`,
    JSON.stringify(result, null, 2) + "\n",
  );
  await browser.close();
  stopAppFixture?.();
}
