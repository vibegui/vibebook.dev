// Real loopback profile/friend HTTP behavior + browser-owned virtual WebAuthn. No fabricated Me state.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, expect as baseExpect } from "@playwright/test";
import { MeResult } from "../shared/schemas";
const expect = baseExpect.configure({ timeout: 60_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base),
  "Use a loopback DEV_EMAIL Worker",
);
const output = process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-account";
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
const page = await context.newPage(),
  cdp = await context.newCDPSession(page);
const report: Record<string, unknown> = {
  revisionSuppliedByRunner: process.env.TEST_APP_REVISION ?? null,
  scope:
    "Real account/profile/friend requests and canonical reads; browser CDP virtual authenticator delivers actual WebAuthn APIs after native user gestures.",
  gaps: [
    "Virtual authenticator does not prove hardware Face ID/Touch ID, iOS, cancellation UX or five-minute OS suspension behavior.",
    "DEV_EMAIL is not a production session: actual cookie logout/all-device revocation and cross-tab server atomicity remain provider/browser gates.",
    "No injected canonical Me state or intercepted profile/friend response is used.",
  ],
};
const initial = MeResult.parse(
  await (await context.request.get(`${base}/api/me?ui=svelte`)).json(),
);
const friend = `native-account-${Date.now()}@example.test`;
try {
  await cdp.send("WebAuthn.enable");
  const { authenticatorId } = await cdp.send(
    "WebAuthn.addVirtualAuthenticator",
    {
      options: {
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
        automaticPresenceSimulation: true,
      },
    },
  );
  await page.goto(`${base}/app?ui=svelte`, {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  report.loadedVersion = await page
    .locator('meta[name="vb-v"]')
    .getAttribute("content");
  await page
    .getByRole("button", { name: "Your profile", exact: true })
    .first()
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Your account",
    exact: true,
  });
  await expect(dialog).toBeVisible();
  assert.equal(
    (await cdp.send("WebAuthn.getCredentials", { authenticatorId })).credentials
      .length,
    0,
    "Opening settings must not create a credential",
  );
  const wanted = `Native Account ${Date.now()}`;
  await dialog.locator("#account-name").fill(wanted);
  await dialog.getByRole("button", { name: "Save name", exact: true }).click();
  await expect
    .poll(
      async () =>
        MeResult.parse(
          await (await context.request.get(`${base}/api/me?ui=svelte`)).json(),
        ).name,
    )
    .toBe(wanted);
  // Acknowledge asynchronous Me-cache invalidation honestly: use explicit read recovery if first app read was stale.
  const refresh = dialog.getByRole("button", { name: "Refresh", exact: true });
  await expect
    .poll(
      async () =>
        (await dialog.getByText(wanted, { exact: true }).count()) > 0 ||
        (await refresh.isVisible()),
    )
    .toBe(true);
  if (await refresh.isVisible()) await refresh.click();
  await expect(dialog.getByText(wanted, { exact: true })).toBeVisible();
  await dialog.locator("#account-friend").fill(friend);
  await dialog.getByRole("button", { name: "Invite", exact: true }).click();
  await expect
    .poll(async () =>
      MeResult.parse(
        await (await context.request.get(`${base}/api/me?ui=svelte`)).json(),
      ).friends.some((value) => value.email === friend),
    )
    .toBe(true);
  await expect
    .poll(
      async () =>
        (await dialog.getByText(friend, { exact: true }).count()) > 0 ||
        (await refresh.isVisible()),
    )
    .toBe(true);
  if (await refresh.isVisible()) await refresh.click();
  await expect(dialog.getByText(friend, { exact: true })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  const row = dialog
    .locator("li")
    .filter({ has: page.getByText(friend, { exact: true }) });
  await row.getByRole("button", { name: "Remove", exact: true }).click();
  const removal = page.getByRole("alertdialog", {
    name: "Remove friend?",
    exact: true,
  });
  await expect(removal).toBeVisible();
  await expect(
    removal.getByRole("button", { name: "Cancel", exact: true }),
  ).toBeFocused();
  await removal.getByRole("button", { name: "Remove", exact: true }).click();
  await expect
    .poll(async () =>
      MeResult.parse(
        await (await context.request.get(`${base}/api/me?ui=svelte`)).json(),
      ).friends.some((value) => value.email === friend),
    )
    .toBe(false);
  await expect
    .poll(
      async () =>
        (await dialog.getByText(friend, { exact: true }).count()) === 0 ||
        (await refresh.isVisible()),
    )
    .toBe(true);
  if (await refresh.isVisible()) await refresh.click();
  await expect(dialog.getByText(friend, { exact: true })).toHaveCount(0);
  const lock = dialog.getByRole("checkbox", {
    name: "Require Face ID when opening",
  });
  await lock.check();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("vb.lock")))
    .not.toBeNull();
  assert.equal(
    (await cdp.send("WebAuthn.getCredentials", { authenticatorId })).credentials
      .length,
    1,
  );
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await page.reload({ waitUntil: "domcontentloaded" });
  const screen = page.locator("[data-device-lock]");
  await expect(screen).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(screen).toBeVisible();
  await screen
    .getByRole("button", { name: "Unlock with Face ID", exact: true })
    .click();
  await expect(screen).not.toBeVisible();
  await page
    .getByRole("button", { name: "Your profile", exact: true })
    .first()
    .click();
  await lock.uncheck();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("vb.lock")))
    .toBeNull();
  await page.screenshot({ path: `${output}/mobile-account.png` });
  report.passed = true;
  report.virtualWebAuthn = true;
  report.canonicalNameAndFriend = true;
} catch (error) {
  report.passed = false;
  report.failure = error instanceof Error ? error.message : String(error);
  await page.screenshot({ path: `${output}/failure.png` }).catch(() => {});
  throw error;
} finally {
  // Isolated fixture data only; restore this development account's original display name and remove the synthetic friend.
  await context.request
    .post(`${base}/api/me`, {
      headers: { origin: base },
      data: { name: initial.name || "Native QA" },
    })
    .catch(() => {});
  await context.request
    .delete(`${base}/api/friends/${encodeURIComponent(friend)}`, {
      headers: { origin: base },
    })
    .catch(() => {});
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
