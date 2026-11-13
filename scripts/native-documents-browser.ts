// Real loopback Worker/Book/DocRoom verification. No canonical/API/provider mocks.
import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { request as httpRequest } from "node:http";
import { mkdir, writeFile } from "node:fs/promises";
import {
  chromium,
  expect as baseExpect,
  type BrowserContext,
  type Page,
  type WebSocketRoute,
} from "@playwright/test";
import * as z from "zod/mini";
import { nativeBrowserFixtures } from "./native-browser-fixtures";
import { nativeTestAgent } from "./native-test-mcp";
const expect = baseExpect.configure({ timeout: 90_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
const app = process.env.TEST_SOURCE_URL ?? base;
for (const value of [base, app])
  assert(
    /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(value),
    "Loopback only",
  );
assert.equal(
  new URL(app).hostname,
  new URL(base).hostname,
  "Worker/source must share cookie hostname",
);
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-documents-browser";
await mkdir(output, { recursive: true });
const results: Record<string, unknown> = {
  status: "running",
  servedRevisionSuppliedByRunner: process.env.TEST_APP_REVISION ?? null,
  harnessRevision: (await Bun.$`git rev-parse HEAD`.quiet()).text().trim(),
  phases: [],
  fixtures: [
    "legacy font/local runner isolation",
    "Yjs transport disconnect only; server frames forwarded unchanged",
  ],
  gaps: [
    "Chromium only; mobile viewport is not Safari/iOS, hardware IME or touch-device acceptance",
    "DEV identities do not verify email/session issuance",
    "Mirror convergence is observable; crash durability/replication is not proven",
    "No backend database/KV seeding or fabricated canonical events",
    "Harness leaves uniquely named local rooms and its real OAuth grant for inspection; use disposable Worker persistence",
  ],
};
const phases: string[] = [];
results.phases = phases;
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const contexts: BrowserContext[] = [];
let phase = "setup";
const stopped = () => void browser.close();
process.once("SIGINT", stopped);
process.once("SIGTERM", stopped);
function relay(context: BrowserContext) {
  let offline = false;
  const pairs = new Set<{ client: WebSocketRoute; server: WebSocketRoute }>();
  const stats = {
    real4003: 0,
    connections: 0,
    stale: 0,
    fetched: 0,
    fullTextCommands: 0,
  };
  context.on("page", (page) =>
    page.on("websocket", (socket) => {
      if (!new URL(socket.url()).pathname.startsWith("/ws/")) return;
      socket.on("framesent", (event) => {
        if (typeof event.payload !== "string") return;
        try {
          if (JSON.parse(event.payload).t === "doc") stats.fullTextCommands++;
        } catch {
          /* Not a JSON command. */
        }
      });
      socket.on("framereceived", (event) => {
        if (typeof event.payload !== "string") return;
        try {
          const frame = JSON.parse(event.payload);
          if (frame.t === "doc") frame.stale ? stats.stale++ : stats.fetched++;
        } catch {
          /* Ignore non-JSON. */
        }
      });
    }),
  );
  return {
    stats,
    async install() {
      await context.routeWebSocket(
        (url) => url.pathname.startsWith("/yjs/"),
        (client) => {
          if (offline) {
            client.close({
              code: 1012,
              reason: "Declared test transport outage",
            });
            return;
          }
          const server = client.connectToServer(),
            pair = { client, server };
          pairs.add(pair);
          stats.connections++;
          client.onMessage((data) => server.send(data));
          server.onMessage((data) => client.send(data));
          const safeCode = (code: number | undefined) =>
            !code || code === 1006 || code === 1005 ? 1011 : code;
          client.onClose((code, reason) => {
            pairs.delete(pair);
            server.close({ code: safeCode(code), reason });
          });
          server.onClose((code, reason) => {
            pairs.delete(pair);
            if (code === 4003) stats.real4003++;
            client.close({ code: safeCode(code), reason });
          });
        },
      );
    },
    cut() {
      offline = true;
      for (const pair of [...pairs]) {
        pair.client.close({
          code: 1012,
          reason: "Declared test transport outage",
        });
        pair.server.close({ code: 1012 });
      }
      pairs.clear();
    },
    restore() {
      offline = false;
    },
  };
}
async function upgradeStatus(context: BrowserContext, path: string) {
  const cookie = (await context.cookies(base))
    .map((value) => value.name + "=" + value.value)
    .join("; ");
  return new Promise<number>((resolve, reject) => {
    const request = httpRequest(new URL(path, base), {
      headers: {
        cookie,
        origin: base,
        connection: "Upgrade",
        upgrade: "websocket",
        "sec-websocket-version": "13",
        "sec-websocket-key": randomBytes(16).toString("base64"),
      },
    });
    request.setTimeout(30_000, () =>
      request.destroy(new Error("Upgrade probe deadline")),
    );
    request.on("response", (response) => {
      response.resume();
      resolve(response.statusCode ?? 0);
    });
    request.on("upgrade", (_response, socket) => {
      socket.destroy();
      resolve(101);
    });
    request.on("error", reject);
    request.end();
  });
}
async function identity(context: BrowserContext, email: string) {
  const response = await context.request.get(
    `${base}/api/dev/as?email=${encodeURIComponent(email)}`,
  );
  assert(response.ok(), "DEV identity endpoint required");
  await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
  const me = await context.request.get(base + "/api/me");
  const value = z
    .object({ email: z.string(), v: z.string() })
    .parse(await me.json());
  assert.equal(value.email, email);
  return value;
}
const nativeEditor = (page: Page) =>
  page.locator("[data-document-editor] .cm-content");
const oldEditor = (page: Page) => page.locator("#cm .cm-content");
async function edit(page: Page, native: boolean) {
  if (native) {
    await page.locator('[data-document-pane="doc"]:visible').first().click();
    const button = page
      .locator("[data-native-document] > footer")
      .getByRole("button", { name: "Edit", exact: true });
    if (await button.count()) await button.click();
  } else {
    if ((await page.locator(".doc").getAttribute("data-view")) !== "edit")
      await page.locator("#docEditBar").click();
  }
  const editor = native ? nativeEditor(page) : oldEditor(page);
  await expect(editor).toBeVisible();
  await expect(editor).toHaveAttribute("contenteditable", "true");
  return editor;
}
async function copiedEditorText(page: Page, native: boolean) {
  const editor = native ? nativeEditor(page) : oldEditor(page);
  await editor.click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.press("ControlOrMeta+c");
  const text = await page.evaluate(() => navigator.clipboard.readText());
  await page.keyboard.press("ArrowRight");
  return text;
}
async function append(page: Page, native: boolean, text: string) {
  const editor = native ? nativeEditor(page) : oldEditor(page);
  await editor.click();
  await page.keyboard.press("ControlOrMeta+End");
  await page.keyboard.insertText(text);
}
try {
  const suffix = Date.now().toString(36);
  const ownerEmail = `doc-owner-${suffix}@example.test`,
    peerEmail = `doc-peer-${suffix}@example.test`,
    otherEmail = `doc-other-${suffix}@example.test`;
  const owner = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
  });
  const peer = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
  });
  contexts.push(owner, peer);
  for (const context of contexts) {
    await context.grantPermissions(["clipboard-read", "clipboard-write"], {
      origin: base,
    });
    if (app !== base)
      await context.grantPermissions(["clipboard-read", "clipboard-write"], {
        origin: app,
      });
    context.setDefaultTimeout(90_000);
    context.setDefaultNavigationTimeout(120_000);
    await nativeBrowserFixtures(context, base);
  }
  const aWire = relay(owner),
    bWire = relay(peer);
  await aWire.install();
  await bWire.install();
  const me = await identity(owner, ownerEmail);
  await identity(peer, peerEmail);
  results.version = me.v;
  const a = await owner.newPage(),
    b = await peer.newPage();
  const agent = await nativeTestAgent(a, base);
  const created = await owner.request.post(base + "/api/books", {
    headers: { origin: base },
    data: { title: `Document verification ${suffix}` },
  });
  assert(created.ok());
  const room = z.object({ id: z.string() }).parse(await created.json()).id;
  results.room = room;
  async function invite(email: string) {
    const response = await owner.request.post(
      `${base}/api/books/${room}/members`,
      { headers: { origin: base }, data: { email } },
    );
    assert(response.ok(), `Invite status ${response.status()}`);
  }
  await invite(peerEmail);
  const epic = z
    .object({ epic_id: z.string() })
    .parse(
      await agent("start_epic", {
        room_id: room,
        title: "Document scope",
        why: "Real CRDT verification",
        tasks: ["Canonical task"],
        backlog: true,
      }),
    ).epic_id;
  async function setDoc(markdown: string, epicId?: string) {
    await agent("update_doc", {
      room_id: room,
      markdown,
      ...(epicId ? { epic_id: epicId } : {}),
    });
  }
  async function readDoc(epicId?: string) {
    const value = z
      .object({
        doc: z.string(),
        epics: z.array(
          z.object({ id: z.string(), doc: z.optional(z.string()) }),
        ),
      })
      .parse(
        await agent("read_room", {
          room_id: room,
          all: true,
          epic_id: epicId ?? "main",
        }),
      );
    return epicId
      ? (value.epics.find((item) => item.id === epicId)?.doc ?? "")
      : value.doc;
  }
  const rootSeed = "# Real document\n\nRoot αβ 日本語 👩🏽‍💻\n";
  await setDoc(rootSeed);
  await a.goto(`${app}/b/${room}?ui=svelte`);
  await b.goto(`${base}/b/${room}`);
  await expect(a.locator("[data-native-document]")).toBeAttached();
  assert.equal(
    await b.locator("[data-native-document]").count(),
    0,
    "Vanilla remains default",
  );
  results.shellVersion = await a
    .locator('meta[name="vb-v"]')
    .evaluateAll((nodes) => nodes[0]?.getAttribute("content") ?? null);
  const scripts = await a
    .locator("script[src]")
    .evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("src") ?? ""),
    );
  const asset = scripts.find((src) => /app\.js/.test(src));
  if (asset) {
    const bytes = await owner.request.get(new URL(asset, app).href);
    assert(bytes.ok());
    results.asset = {
      path: new URL(asset, app).pathname,
      sha256: createHash("sha256")
        .update(await bytes.body())
        .digest("hex"),
    };
  } else
    assert(
      scripts.some((src) => src.includes("svelte/main")),
      "Recognizable compiled or source entry required",
    );
  phase = "unicode and collaborative undo";
  await edit(a, true);
  await edit(b, false);
  await append(a, true, "\nNative café 日本語 🧪");
  await expect(oldEditor(b)).toContainText("Native café 日本語 🧪");
  await append(b, false, "\nVanilla Ω🚀");
  await expect(nativeEditor(a)).toContainText("Vanilla Ω🚀");
  // Separate real editor undo capture groups; no fake timer or direct Y.Doc mutation.
  await a.waitForTimeout(650);
  await append(a, true, "\nUNDO_NATIVE_MARKER");
  await expect(oldEditor(b)).toContainText("UNDO_NATIVE_MARKER");
  await a.keyboard.press("ControlOrMeta+z");
  await expect(nativeEditor(a)).not.toContainText("UNDO_NATIVE_MARKER");
  await expect(oldEditor(b)).not.toContainText("UNDO_NATIVE_MARKER");
  await expect.poll(() => readDoc()).toContain("Vanilla Ω🚀");
  await setDoc((await readDoc()) + "\nAGENT_CANONICAL_UPDATE\n");
  await expect(nativeEditor(a)).toContainText("AGENT_CANONICAL_UPDATE");
  await expect(oldEditor(b)).toContainText("AGENT_CANONICAL_UPDATE");
  phases.push(phase);
  phase = "scoped epic, crumbs and >8k offline reconnect";
  await a.goto(`${app}/b/${room}?ui=svelte&t=${epic}`);
  await b.goto(`${base}/b/${room}?t=${epic}`);
  await edit(a, true);
  await edit(b, false);
  const crumb = a.getByRole("navigation", { name: "Document scope" });
  await expect(crumb).toBeVisible();
  await crumb.getByRole("button").first().click();
  await expect(nativeEditor(a)).toContainText("AGENT_CANONICAL_UPDATE");
  await crumb.getByRole("button").last().click();
  await expect(nativeEditor(a)).not.toContainText("AGENT_CANONICAL_UPDATE");
  const original = await nativeEditor(a).elementHandle();
  assert(original);
  aWire.cut();
  const offline =
    "\n```text\n" +
    Array.from(
      { length: 160 },
      (_, i) => `offline-${i}-日本語-${"x".repeat(55)}`,
    ).join("\n") +
    "\n```\nOFFLINE_END\n";
  assert(offline.length > 8192);
  await append(a, true, offline);
  await append(b, false, "\nONLINE_PEER_MARKER\n");
  aWire.restore();
  await expect
    .poll(() => copiedEditorText(a, true))
    .toContain("ONLINE_PEER_MARKER");
  await expect.poll(() => copiedEditorText(b, false)).toContain("OFFLINE_END");
  assert(
    await original.evaluate((node) => node.isConnected),
    "Transient reconnect keeps same CM element/Y.Doc owner",
  );
  await expect.poll(() => readDoc(epic)).toContain("OFFLINE_END");
  await expect.poll(() => readDoc(epic)).toContain("ONLINE_PEER_MARKER");
  await expect
    .poll(() => aWire.stats.stale + bWire.stats.stale)
    .toBeGreaterThan(0);
  await expect
    .poll(() => aWire.stats.fetched + bWire.stats.fetched)
    .toBeGreaterThan(0);
  phases.push(phase);
  phase = "all-editor4003 authorized recovery";
  const beforeKickA = aWire.stats.real4003,
    beforeKickB = bWire.stats.real4003,
    beforeWrites = aWire.stats.fullTextCommands;
  await invite(otherEmail);
  await expect.poll(() => aWire.stats.real4003).toBeGreaterThan(beforeKickA);
  await expect.poll(() => bWire.stats.real4003).toBeGreaterThan(beforeKickB);
  await expect(nativeEditor(a)).toHaveAttribute("contenteditable", "true");
  assert(
    await original.evaluate((node) => node.isConnected),
    "Authorized peer resumes original CM/Y.Doc",
  );
  await append(a, true, "\nAFTER_AUTHORIZED_KICK\n");
  await expect
    .poll(() => copiedEditorText(b, false))
    .toContain("AFTER_AUTHORIZED_KICK");
  assert.equal(
    aWire.stats.fullTextCommands,
    beforeWrites,
    "Recovery must not resend whole-text fallback doc command",
  );
  phases.push(phase);
  phase = "deleted open epic cannot retarget room document";
  const rootBeforeDelete = await readDoc();
  await agent("delete_epic", { room_id: room, epic_id: epic });
  await expect(
    a.getByRole("navigation", { name: "Document scope" }),
  ).toHaveCount(0);
  await expect.poll(() => readDoc()).toBe(rootBeforeDelete);
  assert.equal(
    await upgradeStatus(owner, `/yjs/${room}~${epic}`),
    404,
    "Fresh deleted scope upgrade must be refused",
  );
  phases.push(phase);
  phase = "task slot, real Mermaid and uploaded image";
  const image = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jD1kAAAAASUVORK5CYII=",
    "base64",
  );
  const upload = await owner.request.post(
    `${base}/api/books/${room}/files?name=pixel.png`,
    { headers: { origin: base, "content-type": "image/png" }, data: image },
  );
  assert(upload.ok());
  const uploaded = z.object({ id: z.string() }).parse(await upload.json());
  const imageUrl = `/api/books/${room}/files/${uploaded.id}`;
  await setDoc(
    `# Real preview\n\n![safe image](${imageUrl})\n\n\`\`\`mermaid\ngraph TD\nA-->B\n\`\`\`\n\n\`\`\`mermaid\ngraph TD\nA-->B\n\`\`\`\n\n## Tarefas\n- [ ] Canonical root task\n`,
  );
  await a.goto(`${app}/b/${room}?ui=svelte`);
  await a.locator('[data-document-pane="doc"]:visible').first().click();
  const done = a
    .locator("[data-native-document] > footer")
    .getByRole("button", { name: "Done", exact: true });
  if (await done.count()) await done.click();
  await expect(a.locator("[data-document-tasks]")).toHaveCount(1);
  const preview = a.locator("[data-document-preview]");
  await expect(preview.locator("img")).toHaveCount(1);
  await expect
    .poll(() =>
      preview
        .locator("img")
        .evaluate(
          (node) =>
            node instanceof HTMLImageElement &&
            node.complete &&
            node.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await expect(preview.locator("img")).toHaveAttribute(
    "referrerpolicy",
    "no-referrer",
  );
  await expect(preview.locator("figure svg")).toHaveCount(2, {
    timeout: 120_000,
  });
  const svgSafety = await preview.locator("figure svg").evaluateAll((nodes) => {
    const ids = nodes.flatMap((node) =>
      Array.from(node.querySelectorAll("[id]")).map((item) => item.id),
    );
    return {
      unique: new Set(ids).size === ids.length,
      active: nodes.some(
        (node) => !!node.querySelector("script,foreignObject,style,image"),
      ),
      unsafe: nodes.some((node) =>
        Array.from(node.querySelectorAll("*")).some((item) =>
          Array.from(item.attributes).some((attr) =>
            /^on|^style$/i.test(attr.name),
          ),
        ),
      ),
    };
  });
  assert(
    svgSafety.unique && !svgSafety.active && !svgSafety.unsafe,
    "Native Mermaid SVG must be inert with private diagram IDs",
  );
  phases.push(phase);
  phase = "removed member privacy and authorized peer resume";
  await b.goto(`${app}/b/${room}?ui=svelte`);
  await edit(a, true);
  await edit(b, true);
  const kicked = aWire.stats.real4003;
  const removal = await owner.request.delete(
    `${base}/api/books/${room}/members/${encodeURIComponent(peerEmail)}`,
    { headers: { origin: base } },
  );
  assert(removal.ok());
  await expect.poll(() => aWire.stats.real4003).toBeGreaterThan(kicked);
  await expect(nativeEditor(a)).toHaveAttribute("contenteditable", "true");
  await expect
    .poll(async () =>
      b
        .locator('[data-document-editor] .cm-content[contenteditable="true"]')
        .count(),
    )
    .toBe(0);
  await expect
    .poll(async () => b.locator("[data-document-preview]").count())
    .toBe(0);
  await append(a, true, "\nPRIVATE_AFTER_REMOVAL\n");
  await expect.poll(() => readDoc()).toContain("PRIVATE_AFTER_REMOVAL");
  assert(
    !(await b.locator("body").innerText()).includes("PRIVATE_AFTER_REMOVAL"),
  );
  const deniedFile = await peer.request.get(base + imageUrl, {
    headers: { "cache-control": "no-cache" },
  });
  assert.equal(deniedFile.status(), 403);
  phases.push(phase);
  phase = "scope disposal, account replacement and mobile controls";
  const staleEditor = await nativeEditor(a).elementHandle();
  assert(staleEditor);
  await a.goto(`${app}/app?ui=svelte`);
  assert(
    !(await staleEditor
      .evaluate((node) => node.isConnected)
      .catch(() => false)),
  );
  await identity(owner, `doc-foreign-${suffix}@example.test`);
  // Full navigation intentionally tests a real account boundary, not fabricated internal account callbacks.
  await a.goto(`${app}/b/${room}?ui=svelte`);
  await expect(a.locator("[data-document-preview]")).toHaveCount(0);
  await expect(a.locator("[data-document-editor] .cm-content")).toHaveCount(0);
  await identity(owner, ownerEmail);
  await a.setViewportSize({ width: 390, height: 844 });
  await a.goto(`${app}/b/${room}?ui=svelte`);
  await a.locator('[data-document-pane="doc"]:visible').first().click();
  await expect(a.locator("[data-native-document]")).toBeVisible();
  await a.locator('[data-document-pane="doc"]:visible').first().focus();
  await a.keyboard.press("ArrowRight");
  assert(
    await a.evaluate(() =>
      document.activeElement?.hasAttribute("data-document-pane"),
    ),
    "Mobile tab keyboard focus stays in native controls",
  );
  phases.push(phase);
  results.transport = { native: aWire.stats, peer: bWire.stats };
  results.additionalGaps = [
    "Account replacement is navigation-bound; same-document queued private callback protection needs its separate source/DOM evidence",
    "No hardware touch drag/Back, IME or multi-process browser crash acceptance",
  ];
  results.status = "passed";
} catch {
  // Never serialize provider errors, URLs, DOM, cookies, codes, tokens or handles.
  results.status = "failed";
  results.failedPhase = phase;
  results.failure =
    "An assertion or live operation failed; inspect the named phase interactively against disposable local persistence.";
  process.exitCode = 1;
} finally {
  await browser.close();
  process.removeListener("SIGINT", stopped);
  process.removeListener("SIGTERM", stopped);
  await writeFile(
    output + "/results.json",
    JSON.stringify(results, null, 2) + "\n",
  );
  console.log(
    JSON.stringify({ status: results.status, phase, phases, output }),
  );
}
