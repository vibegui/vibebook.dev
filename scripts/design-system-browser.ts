// Local-only, real browser verification of the production UI assets and shared primitives.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, expect as baseExpect, type Route } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as z from "zod/mini";
import type { Wait } from "../svelte/types";
import { verifyStudioPalette } from "./studio-browser";
import { nativeBrowserFixtures } from "./native-browser-fixtures";

const expect = baseExpect.configure({ timeout: 60_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
  "Use a local test Worker",
);
const output = process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-design-system";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const errors: string[] = [];
const expectedNetworkFailures: string[] = [];
const requestFailures: { url: string; error: string | undefined }[] = [];
const results: Record<string, unknown> = {};
const onlyInbox = process.argv.includes("--inbox-only");
results.scope = onlyInbox ? "Inbox debug only" : "Gallery and Inbox";
try {
  const context = await browser.newContext({
    locale: "en-US",
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
  context.setDefaultTimeout(60_000);
  context.setDefaultNavigationTimeout(120_000);
  results.fixtures = [
    ...(await nativeBrowserFixtures(context, base)),
    "deterministic profile waits",
    "held resolve responses and explicit HTTP 500",
  ];
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (
      message.location().url.endsWith("/api/waits/resolve") &&
      /500/.test(message.text())
    )
      expectedNetworkFailures.push(message.text());
    else errors.push(`${message.location().url}: ${message.text()}`);
  });
  page.on("requestfailed", (request) =>
    requestFailures.push({
      url: request.url(),
      error: request.failure()?.errorText,
    }),
  );
  if (!onlyInbox) {
    await page.goto(`${base}/app?ui=svelte&gallery=1`, {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { name: "Component gallery" }),
    ).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    console.log("Gallery loaded; checking fonts and controls");
    const fontState = await page.evaluate(() => ({
      faces: [...document.fonts].map((face) => ({
        family: face.family,
        status: face.status,
      })),
      body: getComputedStyle(document.querySelector("[data-gallery]")!)
        .fontFamily,
      code: getComputedStyle(document.querySelector("pre")!).fontFamily,
      weight: getComputedStyle(document.querySelector("[data-gallery] button")!)
        .fontWeight,
    }));
    assert(
      fontState.faces.some(
        (face) => face.family === "Inter var" && face.status === "loaded",
      ),
    );
    assert(
      fontState.faces.some(
        (face) => face.family === "CommitMono" && face.status === "loaded",
      ),
    );
    assert(
      fontState.body.includes("Inter var") &&
        fontState.code.includes("CommitMono"),
    );
    results.fonts = fontState;
    const title = page.getByLabel("Room name", { exact: true });
    await title.fill("Typed room");
    await expect(title).toHaveValue("Typed room");
    const checkbox = page.getByRole("checkbox", {
      name: "Include archived rooms",
    });
    await checkbox.focus();
    await page.keyboard.press("Space");
    await expect(checkbox).toBeChecked();
    const toggle = page.getByRole("switch", { name: "Notifications" });
    await toggle.focus();
    await page.keyboard.press("Space");
    await expect(toggle).toBeChecked();
    const members = page.getByRole("radio", {
      name: "Room members",
      exact: true,
    });
    const personal = page.getByRole("radio", { name: "Only me", exact: true });
    await members.focus();
    await page.keyboard.press("ArrowDown");
    await expect(personal).toBeChecked();
    await expect(
      page.getByRole("radio", { name: "Unavailable", exact: true }),
    ).toBeDisabled();
    const filter = page.getByRole("combobox", { name: "Show", exact: true });
    await filter.selectOption("active");
    await expect(page.locator("[data-selection-state]")).toHaveText(
      "personal · active",
    );
    await filter.selectOption("all");
    await members.check();
    await expect(page.locator("[data-selection-state]")).toHaveText(
      "room · all",
    );
    await writeFile(`${output}/gallery-before-tabs.html`, await page.content());
    await page.screenshot({
      path: `${output}/gallery-before-tabs.png`,
      fullPage: true,
    });
    results.tabStructure = await page
      .getByRole("tab", { name: "General", exact: true })
      .evaluateAll((nodes) =>
        nodes.map((node) => ({
          section: node.closest("section")?.textContent,
          parent: node.parentElement?.outerHTML,
        })),
      );
    const general = page.getByRole("tab", { name: "General", exact: true });
    await general.focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("tab", { name: "Members", exact: true }),
    ).toHaveAttribute("aria-selected", "true");
    const trigger = page.getByRole("button", {
      name: "Open dialog",
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Edit room" });
    await expect(dialog).toBeVisible();
    assert(
      await page.evaluate(
        () => getComputedStyle(document.body).overflow === "hidden",
      ),
      "Tailwind body scroll lock",
    );
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      assert(
        await dialog.evaluate((element) =>
          element.contains(document.activeElement),
        ),
        "Focus escaped modal",
      );
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    assert(
      await page.evaluate(
        () => getComputedStyle(document.body).overflow !== "hidden",
      ),
      "Scroll lock was not released",
    );
    results.lightStudioPalette = await verifyStudioPalette(page, "light");
    const light = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    results.lightAccessibility = light.violations;
    await page.screenshot({
      path: `${output}/gallery-light-1440.png`,
      fullPage: true,
    });
    await page.getByRole("button", { name: "Use dark theme" }).click();
    results.darkStudioPalette = await verifyStudioPalette(page, "dark");
    const dark = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    results.darkAccessibility = dark.violations;
    await page.screenshot({
      path: `${output}/gallery-dark-1440.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Open sheet" }).click();
    const sheet = page.getByRole("dialog", { name: "Room details" });
    await expect(sheet).toBeVisible();
    const box = await sheet.boundingBox();
    assert(box && box.width <= 390 && box.x >= 0);
    await page.screenshot({ path: `${output}/sheet-dark-390.png` });
    await page.keyboard.press("Escape");
    await page.screenshot({
      path: `${output}/gallery-dark-390.png`,
      fullPage: true,
    });
    const mobile = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    results.mobileAccessibility = mobile.violations;
    assert.deepEqual(light.violations, [], "Light accessibility violations");
    assert.deepEqual(dark.violations, [], "Dark accessibility violations");
    assert.deepEqual(mobile.violations, [], "Mobile accessibility violations");
    // Exercise Studio's high-density media override in the same real DOM.
    const metrics = await context.newCDPSession(page);
    try {
      await metrics.send("Emulation.setDeviceMetricsOverride", {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: false,
      });
      assert.equal(await page.evaluate(() => devicePixelRatio), 2);
      results.darkRetinaStudioPalette = await verifyStudioPalette(page, "dark");
      await page.getByRole("button", { name: "Use light theme" }).click();
      results.lightRetinaStudioPalette = await verifyStudioPalette(
        page,
        "light",
      );
    } finally {
      await metrics.send("Emulation.clearDeviceMetricsOverride");
      await metrics.detach();
    }
    console.log(
      "PASS native gallery: fonts, controls, keyboard tabs, focus trap/restoration, scroll lock, sheet, light/dark/mobile axe",
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });

  const created = await context.request.post(`${base}/api/books`, {
    data: { title: "Design system verification" },
    headers: { origin: base },
  });
  assert(created.ok(), `Create test room: ${created.status()}`);
  const { id } = z.object({ id: z.string() }).parse(await created.json());
  const waits: Wait[] = [
    {
      book_id: id,
      room: "Design system verification",
      ref: "m1",
      thread: "main",
      topic: null,
      author: "peer@example.test",
      author_name: "Peer",
      text: "Please review the typed UI",
      ts: Date.now(),
    },
  ];
  await page.route("**/api/me?ui=svelte", async (route) => {
    const response = await route.fetch();
    const raw: unknown = await response.json();
    if (!raw || typeof raw !== "object" || Array.isArray(raw))
      throw new Error("Invalid local profile response");
    await route.fulfill({ response, json: { ...raw, waits } });
  });
  await page.goto(`${base}/b/${id}?ui=svelte`);
  const inboxTrigger = page.getByRole("button", { name: "Inbox", exact: true });
  await expect(inboxTrigger).toBeVisible();
  await expect(inboxTrigger.locator(".kN")).toHaveText("1");
  const legacyLayout = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ["light", "dark"]) {
      await page.evaluate((value) => {
        document.documentElement.dataset.theme = value;
      }, theme);
      const comparison = await page.evaluate(() => {
        const sheet = [...document.styleSheets].find((item) =>
          item.href?.includes("/svelte-preview/ui.css"),
        );
        if (!sheet) throw new Error("Missing native stylesheet");
        const elements = [...document.querySelectorAll("body, body *")].filter(
          (element) => !element.closest("[data-vb-native]"),
        );
        const properties = [
          "display",
          "position",
          "box-sizing",
          "width",
          "height",
          "margin",
          "padding",
          "border-width",
          "border-style",
          "border-radius",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "color",
          "background-color",
          "overflow",
          "appearance",
        ];
        const snapshot = () =>
          elements.map((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName,
              id: element.id,
              rect: [rect.x, rect.y, rect.width, rect.height],
              styles: properties.map((name) => style.getPropertyValue(name)),
            };
          });
        try {
          sheet.disabled = true;
          const baseline = snapshot();
          sheet.disabled = false;
          const nativeLoaded = snapshot();
          return {
            elements: elements.length,
            mismatches: baseline.flatMap((value, index) =>
              JSON.stringify(value) === JSON.stringify(nativeLoaded[index])
                ? []
                : [{ baseline: value, nativeLoaded: nativeLoaded[index] }],
            ),
          };
        } finally {
          sheet.disabled = false;
        }
      });
      assert(comparison.elements > 20, "Measure the real legacy room shell");
      assert.deepEqual(
        comparison.mismatches,
        [],
        "Native CSS changed legacy layout/defaults",
      );
      legacyLayout.push({ width, theme, ...comparison });
      await page.screenshot({ path: `${output}/legacy-${theme}-${width}.png` });
    }
  }
  results.legacyLayout = legacyLayout;
  await page.setViewportSize({ width: 390, height: 844 });
  await inboxTrigger.click();
  const inbox = page.getByRole("dialog", { name: "Inbox", exact: true });
  await expect(
    inbox.getByRole("link").filter({ hasText: "Please review the typed UI" }),
  ).toBeVisible();
  const link = inbox.getByRole("link");
  await expect(link).toHaveAttribute("href", `/b/${id}?ui=svelte#m1`);
  await expect(
    inbox.getByRole("tab", { name: "This room (1)" }),
  ).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Escape");
  await expect(inbox).toHaveCount(0);
  await expect(inboxTrigger).toBeFocused();
  await inboxTrigger.click();
  await expect(inbox).toBeVisible();
  await page.screenshot({ path: `${output}/inbox-390.png` });
  const inboxAxe = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  results.inboxAccessibility = inboxAxe.violations;
  assert.deepEqual(inboxAxe.violations, []);
  await inbox.getByRole("button", { name: "Close", exact: true }).click();
  await expect(inbox).toHaveCount(0);

  // A pending request must never reopen an abandoned modal or replace a newer one.
  let held: Route | undefined;
  const initialWait = waits[0];
  assert(initialWait);
  await page.route("**/api/waits/resolve", (route) => {
    held = route;
  });
  const resolveButton = () =>
    inbox.getByRole("button", {
      name: "Done (I answered elsewhere, or it's not for me)",
      exact: true,
    });
  const reloadInbox = async () => {
    waits.splice(0, waits.length, initialWait);
    await page.goto(`${base}/b/${id}?ui=svelte`);
    await expect(inboxTrigger.locator(".kN")).toHaveText("1");
    await inboxTrigger.click();
    await expect(inbox).toBeVisible();
  };
  const finish = async (status: number, body: object) => {
    const route = held;
    assert(route, "Missing held resolve request");
    held = undefined;
    const response = page.waitForResponse((response) =>
      response.url().endsWith("/api/waits/resolve"),
    );
    if (status === 200) waits.splice(0, waits.length);
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(body),
    });
    await response;
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
  };
  await reloadInbox();
  await resolveButton().click();
  await expect.poll(() => !!held).toBe(true);
  await page.keyboard.press("Escape");
  await expect(inbox).toHaveCount(0);
  await finish(200, { ok: true });
  await expect(inbox).toHaveCount(0);

  await reloadInbox();
  await resolveButton().click();
  await expect.poll(() => !!held).toBe(true);
  await page.keyboard.press("Escape");
  await inboxTrigger.click();
  const newer = await inbox.getAttribute("id");
  await finish(200, { ok: true });
  await expect(inbox).toHaveAttribute("id", newer!);
  await expect(inbox.getByRole("link")).toHaveCount(0);
  await page.keyboard.press("Escape");

  await reloadInbox();
  await resolveButton().click();
  await expect.poll(() => !!held).toBe(true);
  await finish(500, { error: "simulated test failure" });
  await expect(inbox.getByRole("alert")).toContainText(
    "Couldn't resolve this request",
  );
  await expect(
    inbox.getByRole("link").filter({ hasText: "Please review the typed UI" }),
  ).toBeVisible();
  await expect(resolveButton()).toBeEnabled();
  await page.keyboard.press("Control+k");
  await expect(inbox).toHaveCount(0);
  await expect(page.locator("#swDlg")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#swDlg")).not.toBeVisible();
  results.inboxLifecycle =
    "close/reopen during resolve, recoverable failure, native switcher Escape passed";

  const other = await context.request.post(`${base}/api/books`, {
    data: { title: "Cross-room Inbox verification" },
    headers: { origin: base },
  });
  assert(other.ok());
  const otherRoom = z.object({ id: z.string() }).parse(await other.json());
  const posted = await context.request.post(
    `${base}/api/books/${otherRoom.id}/post`,
    {
      data: { text: "Cross-room target message", thread: "main" },
      headers: { origin: base },
    },
  );
  assert(posted.ok());
  const target = z
    .object({ ok: z.literal(true), id: z.number(), thread: z.string() })
    .parse(await posted.json());
  waits.push({
    ...waits[0]!,
    book_id: otherRoom.id,
    room: "Cross-room Inbox verification",
    ref: `m${target.id}`,
    text: "Open the other test room",
  });
  await page.goto(`${base}/b/${id}?ui=svelte`);
  await expect(inboxTrigger.locator(".kN")).toHaveText("2");
  await inboxTrigger.click();
  await inbox.getByRole("tab", { name: "All (2)", exact: true }).click();
  await inbox
    .getByRole("link")
    .filter({ hasText: "Open the other test room" })
    .click();
  await expect(page).toHaveURL(
    (url) =>
      url.pathname === `/b/${otherRoom.id}` &&
      url.searchParams.get("ui") === "svelte" &&
      url.hash === `#m${target.id}`,
  );
  await expect(inboxTrigger).toBeVisible();
  await expect(
    page.getByText("Cross-room target message", { exact: true }),
  ).toBeVisible();
  results.crossRoomNavigation =
    "Actual Inbox link retained ui=svelte and entered the second room";
  assert.deepEqual(errors, [], "Browser page errors");
  results.room = id;
  results.errors = errors;
  results.status = "pass";
  console.log(
    "PASS real native Inbox: local profile data, Svelte URL, tabs, close/Escape, focus restoration, mobile axe",
  );
} finally {
  await writeFile(
    `${output}/results.json`,
    JSON.stringify(
      { ...results, errors, expectedNetworkFailures, requestFailures },
      null,
      2,
    ) + "\n",
  );
  await browser.close();
}
