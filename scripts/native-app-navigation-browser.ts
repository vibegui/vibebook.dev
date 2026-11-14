// Standalone entry for the same actual Worker probe used by integrated CI.
import assert from "node:assert/strict";
import { chromium, expect as baseExpect } from "@playwright/test";
import { MeResult } from "../shared/schemas";
import { nativeBrowserFixtures } from "./native-browser-fixtures";
import { auditNativeAppNavigation } from "./native-app-navigation-probe";

const expect = baseExpect.configure({ timeout: 30_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base));
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-app-navigation";
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
try {
  const discovery = await browser.newContext();
  let ownerEmail: string;
  try {
    const response = await discovery.request.get(`${base}/api/me?ui=svelte`);
    assert(response.ok(), "Requires a disposable signed-in DEV Worker");
    ownerEmail = MeResult.parse(await response.json()).email;
    assert(
      ownerEmail.endsWith("@example.test"),
      "Synthetic test identity only",
    );
  } finally {
    await discovery.close();
  }
  const evidence = await auditNativeAppNavigation({
    base,
    ownerEmail,
    output,
    async createProfile(profile) {
      const context = await browser.newContext({
        locale: "en-US",
        viewport: { width: profile.width, height: 1000 },
        reducedMotion: "reduce",
      });
      await nativeBrowserFixtures(context, base);
      await context.addCookies([
        { name: "dev_as", value: ownerEmail, url: base },
        { name: "vb_lang", value: profile.lang, url: base },
      ]);
      await context.addInitScript(
        (theme) => localStorage.setItem("vb.theme", theme),
        profile.theme,
      );
      return { context, page: await context.newPage() };
    },
    async openPane(page, pane) {
      assert.equal(
        pane,
        "apps",
        "Standalone probe uses only the real Apps pane",
      );
      const layout = page.locator("[data-native-room-layout]");
      await expect(layout).toBeVisible();
      const tab = page.locator(
        '[data-room-document-toolbar] [data-document-pane="apps"]',
      );
      if (!(await tab.isVisible()))
        await page.locator("[data-native-document-toggle]").click();
      if ((await layout.getAttribute("data-pane")) !== "apps")
        await tab.click();
      await expect(layout).toHaveAttribute("data-pane", "apps");
    },
    async step(name, run) {
      console.info(`[native-app-navigation] ${name}`);
      await run();
    },
  });
  console.info(
    JSON.stringify({
      status: evidence.status,
      verdict: evidence.verdict,
      output,
    }),
  );
  // An observed inherited read is a finding, never a green security receipt.
  if (evidence.verdict !== "explicit-denial")
    process.exitCode = evidence.verdict === "read-inherited" ? 2 : 1;
} finally {
  await browser.close();
}
