// Real Worker room + real pinned xterm renderer; controlled cloud metadata/PTY capability fixture, never a paid VM.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import {
  chromium,
  expect as baseExpect,
  type WebSocketRoute,
} from "@playwright/test";
import * as z from "zod/mini";
import {
  nativeBrowserFixtures,
  openNativeRoomPane,
} from "./native-browser-fixtures";
const expect = baseExpect.configure({ timeout: 60_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base),
  "Loopback DEV_EMAIL Worker only",
);
const output = process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-agents";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  locale: "en-US",
});
await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
const report: Record<string, unknown> = {
  scope:
    "Real Worker room and native xterm/font/theme/keyboard/resize/dialog lifecycle; controlled typed cloud metadata and PTY protocol fixture",
  gaps: [
    "No real Freestyle VM, external setup, paid cloud allocation, credential provider validation, runner launching or actual Claude execution is claimed.",
    "Native synthetic PTY is a protocol/browser capability fixture, not real remote delivery.",
    "Production account authorization, OAuth reconnect and mobile OS keyboards remain separate gates.",
  ],
};
const errors: string[] = [],
  inputs: number[][] = [],
  sizes: { cols: number; rows: number }[] = [];
let connections = 0;
const sockets: WebSocketRoute[] = [];
try {
  await nativeBrowserFixtures(context, base);
  const created = await context.request.post(`${base}/api/books`, {
    headers: { origin: base },
    data: { title: `Native Agents verification ${Date.now()}` },
  });
  assert(created.ok());
  const room = z.object({ id: z.string() }).parse(await created.json()).id;
  const machine = {
    id: "terminal-fixture",
    vm_id: "external-fixture",
    name: "Native terminal fixture",
    state: "running",
    ready: true,
    created_at: Date.now(),
    rate: 0.13,
    cost: 0,
  };
  await context.route(`${base}/api/books/${room}/sandboxes`, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        connected: true,
        claude: true,
        sandboxes: [machine],
      }),
    }),
  );
  const credential = "private-terminal-capability-fixture";
  await context.route(
    `${base}/api/sandboxes/${machine.id}/terminal`,
    (route) => {
      assert.equal(route.request().method(), "POST");
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          token: credential,
          url: "ws://127.0.0.1:47322/v5/vms/external-fixture/pty?slug=claude&exec=claude",
        }),
      });
    },
  );
  await context.routeWebSocket("ws://127.0.0.1:47322/**", (socket) => {
    connections++;
    sockets.push(socket);
    socket.send(JSON.stringify({ type: "sessionInfo" }));
    socket.send(Buffer.from("native terminal ready\r\n"));
    socket.onMessage((message) => {
      if (typeof message === "string") {
        const resize = z
          .object({
            type: z.literal("resize"),
            cols: z.number(),
            rows: z.number(),
          })
          .parse(JSON.parse(message));
        sizes.push({ cols: resize.cols, rows: resize.rows });
      } else {
        inputs.push([...message]);
        socket.send(message);
      }
    });
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${base}/b/${room}?ui=svelte`, {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  report.loadedVersion = await page
    .locator('meta[name="vb-v"]')
    .getAttribute("content");
  await openNativeRoomPane(page, "agents");
  const pane = page.locator("[data-native-agents]");
  await expect(pane.getByText(machine.name, { exact: false })).toBeVisible();
  await pane.getByRole("button", { name: "Terminal", exact: true }).click();
  const terminal = page.locator("[data-native-terminal-renderer]");
  await expect(terminal).toHaveAttribute("data-terminal-phase", "connected");
  await expect(terminal.locator(".xterm")).toBeVisible();
  const themes: unknown[] = [];
  for (const dark of [false, true]) {
    await page.evaluate(
      (value) => document.documentElement.classList.toggle("dark", value),
      dark,
    );
    await expect
      .poll(() =>
        terminal.evaluate((node) => {
          const color = (source: string) => {
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = 1;
            const ctx = canvas.getContext("2d");
            if (!ctx) throw Error("Canvas unavailable");
            ctx.fillStyle = source;
            ctx.fillRect(0, 0, 1, 1);
            const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
            return `rgba(${r}, ${g}, ${b}, ${a! / 255})`;
          };
          const style = getComputedStyle(node),
            selection = getComputedStyle(node, "::selection");
          return (
            node.getAttribute("data-terminal-background") ===
              color(style.backgroundColor) &&
            node.getAttribute("data-terminal-foreground") ===
              color(style.color) &&
            node.getAttribute("data-terminal-selection") ===
              color(selection.backgroundColor)
          );
        }),
      )
      .toBe(true);
    await page.screenshot({
      path: `${output}/terminal-${dark ? "dark" : "light"}.png`,
    });
    themes.push(
      await terminal.evaluate(async (node) => {
        const style = getComputedStyle(node);
        await document.fonts.load(`${style.fontSize} ${style.fontFamily}`, "M");
        return {
          mode: document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
          background: node.getAttribute("data-terminal-background"),
          foreground: node.getAttribute("data-terminal-foreground"),
          selection: node.getAttribute("data-terminal-selection"),
          family: style.fontFamily,
          fontLoaded: document.fonts.check(
            `${style.fontSize} ${style.fontFamily}`,
            "M",
          ),
          registeredMonoLoaded: Array.from(document.fonts).some(
            (face) =>
              face.family.replaceAll('"', "").includes("CommitMono") &&
              face.status === "loaded",
          ),
          recordedFamily: node.getAttribute("data-terminal-font"),
        };
      }),
    );
  }
  for (const value of themes) {
    const theme = z
      .object({
        family: z.string(),
        fontLoaded: z.boolean(),
        registeredMonoLoaded: z.boolean(),
        recordedFamily: z.string(),
      })
      .parse(value);
    assert(theme.family.includes("CommitMono"));
    assert(theme.recordedFamily.includes("CommitMono"));
    assert(theme.fontLoaded);
    assert(theme.registeredMonoLoaded);
  }
  report.themes = themes;
  const dialog = page.getByRole("dialog").filter({ has: terminal });
  await page.keyboard.type("native-initial-focus");
  await expect.poll(() => inputs.flat().includes(110)).toBe(true);
  await dialog.getByRole("button", { name: "Esc", exact: true }).click();
  await expect
    .poll(() => inputs.some((bytes) => bytes.length === 1 && bytes[0] === 27))
    .toBe(true);
  await dialog.getByRole("button", { name: "Ctrl-C", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect
    .poll(() => inputs.some((bytes) => bytes.length === 1 && bytes[0] === 3))
    .toBe(true);
  await page.keyboard.type("native-keyboard");
  await expect.poll(() => inputs.flat().includes(107)).toBe(true);
  await page.setViewportSize({ width: 900, height: 800 });
  await expect.poll(() => sizes.length).toBeGreaterThan(1);
  assert(
    sizes.every(
      (size) =>
        Number.isInteger(size.cols) &&
        size.cols >= 2 &&
        Number.isInteger(size.rows) &&
        size.rows >= 1,
    ),
  );
  assert.equal(
    await page
      .locator("body")
      .evaluate(
        (node, value) => node.textContent?.includes(value) ?? false,
        credential,
      ),
    false,
  );
  sockets[0]!.close({ code: 1000, reason: "controlled PTY disconnect" });
  await expect(terminal).toHaveAttribute("data-terminal-phase", "disconnected");
  assert.equal(connections, 1);
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await expect(terminal).toHaveCount(0);
  await expect(page.locator(".xterm")).toHaveCount(0);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openNativeRoomPane(page, "agents");
  await pane.getByRole("button", { name: "Terminal", exact: true }).click();
  await expect(terminal).toHaveAttribute("data-terminal-phase", "connected");
  assert.equal(connections, 2);
  await page.goto(`${base}/app?ui=svelte`, { waitUntil: "domcontentloaded" });
  await expect(page.locator(".xterm")).toHaveCount(0);
  assert.deepEqual(errors, []);
  report.status = "passed";
  report.pty = {
    connections,
    binaryInputFrames: inputs.length,
    resizes: sizes,
  };
  report.errors = errors;
} catch (error) {
  report.status = "failed";
  report.error = error instanceof Error ? error.message : String(error);
  throw error;
} finally {
  await writeFile(`${output}/result.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
