// SOURCE-ONLY harness: fresh disposable loopback identity; real profile HTTP and canonical reads.
// Claude grants are a controlled capability fixture; this does not prove OAuth/provider delivery.
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";
import { MeResult } from "../shared/schemas";
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base), "Use a disposable loopback DEV_EMAIL Worker");
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-gpu"] });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "en-US" });
await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
const page = await context.newPage();
const initial = MeResult.parse(await (await context.request.get(`${base}/api/me`)).json());
assert.equal(initial.books.length, 0, "Do not alter an existing or invited user's account for this fresh-user fixture");
let grantConnected = false;
await page.route("**/api/agents", route => route.fulfill({ json: { agents: grantConnected ? [{ id: "controlled-onboarding-grant", client: "Controlled Claude", connected_at: Date.now(), used_at: null }] : [], last_used: null } }));
try {
  const reset = await context.request.post(`${base}/api/me`, { data: { name: "" } }); assert(reset.ok());
  await page.goto(`${base}/app?ui=svelte`, { waitUntil: "domcontentloaded", timeout: 120_000 });
  const wizard = page.locator("[data-native-onboarding]");
  await expect(wizard).toHaveAttribute("data-onboarding-step", "1");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("textbox", { name: "Your name", exact: true }).fill("Onboarding Fixture");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(wizard).toHaveAttribute("data-onboarding-step", "2", { timeout: 30_000 });
  assert.equal(MeResult.parse(await (await context.request.get(`${base}/api/me`)).json()).name, "Onboarding Fixture");
  await page.reload(); // Canonical name recovers directly to the connect step.
  await expect(wizard).toHaveAttribute("data-onboarding-step", "2");
  grantConnected = true;
  await expect(wizard).toHaveAttribute("data-onboarding-step", "3", { timeout: 30_000 });
  const draft = wizard.getByRole("textbox", { name: "Your first room", exact: true });
  await draft.fill("First-room draft retained across Back");
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(wizard).toHaveAttribute("data-onboarding-step", "1");
  await page.getByRole("button", { name: "Skip and see the home", exact: true }).click();
  await expect(wizard).toHaveCount(0);
  await page.reload(); await expect(wizard).toHaveCount(0);
  assert.equal(await page.evaluate(() => localStorage.getItem("vb.obDone")), "1");
  // This harness intentionally does not call model-backed start-room or fabricate a room result.
  // The actual creator/authoritative-ID path is separately covered by owner fixtures.
} finally {
  await context.request.post(`${base}/api/me`, { data: { name: initial.name ?? "" } });
  await browser.close();
}
