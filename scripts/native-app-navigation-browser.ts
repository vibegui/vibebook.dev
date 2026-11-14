// Standalone entry for the same actual Worker probe used by integrated CI.
import assert from "node:assert/strict";
import { chromium, expect as baseExpect } from "@playwright/test";
import { MeResult } from "../shared/schemas";
import { nativeBrowserFixtures } from "./native-browser-fixtures";
import { auditNativeAppNavigation, type NativeAppNavigationFixture } from "./native-app-navigation-probe";
import { vanillaAppNavigationDriver } from "./app-navigation-ui-driver";
import { mkdir, writeFile } from "node:fs/promises";

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
  const fixture: NativeAppNavigationFixture = {
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
  };
  const results: {variant:"svelte"|"vanilla";status:string;verdict:string}[] = [];
  for (const variant of ["svelte", "vanilla"] as const) {
    try {
      const evidence = await auditNativeAppNavigation({...fixture,...(variant === "vanilla" ? {ui:vanillaAppNavigationDriver} : {})});
      results.push({variant,status:evidence.status,verdict:evidence.verdict});
    } catch {
      // A cleanup/startup failure must not suppress the other independent frontend.
      results.push({variant,status:"inconclusive",verdict:"inconclusive"});
    }
  }
  const passed = results.every(result=>result.verdict==="explicit-denial");
  await mkdir(output,{recursive:true});
  await writeFile(`${output}/app-navigation-variants.json`,JSON.stringify({status:passed?"passed":"failed",results},null,2)+"\n");
  console.info(JSON.stringify({status:passed?"passed":"failed",results,output}));
  if (!passed) process.exitCode=results.some(result=>result.verdict==="read-inherited")?2:1;
} finally {
  await browser.close();
}
