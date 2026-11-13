// Incremental native Decisions, People and Reminders failure acceptance.
// Start a loopback Worker with DEV_EMAIL and no model credentials, then run this
// script. No database seeding, fabricated room frames or mocked API responses.
import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import {
  chromium,
  expect as baseExpect,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as z from "zod/mini";
import { UploadFileResult } from "../shared/schemas";
import { parseRoomEvent } from "../shared/validation";
import { createRoomStore } from "../svelte/roomStore";
import { nativeBrowserFixtures } from "./native-browser-fixtures";
import { nativeTestAgent } from "./native-test-mcp";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
  "Use a loopback test Worker",
);
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-secondary-panels";
const expect = baseExpect.configure({ timeout: 60_000 });
const token = randomBytes(5).toString("hex");
const ownerEmail = `secondary-owner-${token}@example.test`;
const invitedEmail = `secondary-invite-${token}@example.test`;
const approvedEmail = `secondary-approved-${token}@example.test`;
const deniedEmail = `secondary-denied-${token}@example.test`;
const forbiddenEmail = `secondary-outsider-${token}@example.test`;
const result: Record<string, unknown> = {
  scope:
    "Incremental native Decisions/People plus real Reminder failed-processing path; not complete M6/M7 or production acceptance",
  gaps: [
    "Successful AI schedule creation, next-run calculation, alarm execution and successful-reminder enable/edit are not verified: they require usable MODEL_ROUTE credentials.",
    "Reminder processing failure is claimed only if the real typed upload answers reminder.ok=false; a model-backed success is reported as a missing failure-path gate.",
    "Clipboard rejection is an explicit browser capability fixture; all room data, permissions, HTTP responses and WS events are real.",
    "Four EN/PT, desktop/mobile, light/dark profiles cover these axes; this is not the complete product regression matrix.",
    "Fixture rooms, OAuth grant and example.test identities remain in the local database; no production data is touched.",
  ],
};
const errors: string[] = [];
const commands: Record<string, number> = {};
const events: Record<string, number> = {};
const audits: unknown[] = [];
let page: Page | undefined;
let reminderFailureVerified = false;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const contexts: BrowserContext[] = [];
const roomStore = createRoomStore();
const step = (value: string) => {
  result.step = value;
  console.log(value);
};
async function identity(email: string, clipboardFailure = false) {
  assert(email.endsWith("@example.test"));
  const context = await browser.newContext({
    locale: "en-US",
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  contexts.push(context);
  await nativeBrowserFixtures(context, base);
  await context.addCookies([
    { name: "dev_as", value: email, url: base },
    { name: "vb_lang", value: "en", url: base },
  ]);
  if (clipboardFailure)
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async () => {
            throw new Error("Verification clipboard permission denied");
          },
        },
      });
    });
  const me = await context.request.get(`${base}/api/me?ui=svelte`);
  assert(me.ok(), "Worker must have local DEV_EMAIL enabled");
  assert.equal(
    (await me.json()).email,
    email,
    "Distinct DEV identity must reach the actual Worker",
  );
  return context;
}
async function openPane(target: Page, pane: "decisions" | "reminders") {
  await target.locator(`[data-pane="${pane}"]:visible`).first().click();
  await expect(target.locator(`[data-${pane}-panel]`)).toBeVisible();
}
async function openPeople(target: Page) {
  if (
    (target.viewportSize()?.width ?? 1440) <= 900 &&
    !(await target.locator("[data-people-panel]").isVisible())
  )
    await target.locator("#roomName").click();
  await expect(target.locator("[data-people-panel]")).toBeVisible();
  // Existing offline members live in an explicit, user-controlled disclosure.
  for (const disclosure of await target
    .locator("[data-people-panel] details")
    .all())
    if ((await disclosure.getAttribute("open")) === null)
      await disclosure.locator("summary").click();
}
const sha = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");

try {
  step(
    "Record actual source/build identity and verify vanilla stays the default",
  );
  const owner = await identity(ownerEmail, true);
  const made = await owner.request.post(`${base}/api/books`, {
    headers: { origin: base },
    data: { title: `Native secondary panels ${token}` },
  });
  assert(made.ok(), `Create fixture room ${made.status()}`);
  const room = z.object({ id: z.string() }).parse(await made.json()).id;
  result.room = room;
  const source = Bun.spawnSync(["git", "rev-parse", "HEAD"], {
    cwd: new URL("..", import.meta.url).pathname,
  });
  assert.equal(source.exitCode, 0);
  const shellResponse = await owner.request.get(`${base}/b/${room}?ui=svelte`);
  const shell = await shellResponse.text();
  const entry = shell.match(
    /<script\b[^>]*\bsrc=["']([^"']*\/svelte-preview\/app\.js[^"']*)["']/,
  )?.[1];
  assert(
    entry,
    "Run against the compiled full Svelte application, not a gallery or mocked page",
  );
  const asset = await owner.request.get(new URL(entry, base).href);
  assert(asset.ok());
  result.application = {
    sourceHead: source.stdout.toString().trim(),
    entry,
    entrySha256: sha(await asset.body()),
    shellVersion:
      shell.match(/name=["']vb-v["'][^>]*content=["']([^"']+)/)?.[1] ?? null,
    shellEtag: shellResponse.headers().etag ?? null,
  };
  const vanilla = await (await owner.request.get(`${base}/b/${room}`)).text();
  assert(
    !vanilla.includes("/svelte-preview/app.js") &&
      !vanilla.includes("/bootstrap.ts"),
    "Unselected room stays vanilla",
  );

  page = await owner.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("websocket", (socket) => {
    if (new URL(socket.url()).pathname !== `/ws/${room}`) return;
    socket.on("framesent", ({ payload }) => {
      try {
        const value = JSON.parse(payload.toString());
        if (typeof value.t === "string")
          commands[value.t] = (commands[value.t] ?? 0) + 1;
      } catch {
        /* Not room JSON. */
      }
    });
    socket.on("framereceived", ({ payload }) => {
      try {
        const event = parseRoomEvent(payload.toString());
        events[event.t] = (events[event.t] ?? 0) + 1;
        roomStore.apply(event, room);
      } catch (error) {
        errors.push(`Invalid real room frame: ${String(error)}`);
      }
    });
  });
  const agent = await nativeTestAgent(page, base);
  await page.goto(`${base}/b/${room}?ui=svelte`);
  await expect(page.locator("#input")).toBeVisible();
  await expect.poll(() => roomStore.get()?.me).toBe(ownerEmail);

  step(
    "Decisions: real MCP decision/approval, native keyboard cancel, confirm and canonical WS deletion",
  );
  await openPane(page, "decisions");
  await expect(
    page.locator("[data-decisions-panel] [data-decision-id]"),
  ).toHaveCount(0);
  const created = z.object({ ok: z.literal(true), id: z.number() }).parse(
    await agent("log_decision", {
      room_id: room,
      text: `Canonical decision ${token}`,
      kind: "decision",
    }),
  );
  await agent("log_decision", {
    room_id: room,
    text: `Canonical approval ${token}`,
    kind: "approval",
  });
  await expect.poll(() => roomStore.get()?.decisions?.length).toBe(2);
  const row = page.locator(`[data-decision-id="${created.id}"]`);
  await expect(row).toContainText(`Canonical decision ${token}`);
  const trigger = row.locator("[data-ddel]");
  const beforeDelete = commands["decision.del"] ?? 0;
  await trigger.focus();
  await page.keyboard.press("Enter");
  let dialog = page.getByRole("alertdialog");
  await expect(dialog.getByRole("button").first()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button").last()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  assert.equal(commands["decision.del"] ?? 0, beforeDelete);
  await trigger.click();
  await page.getByRole("alertdialog").getByRole("button").first().click();
  await expect(row).toBeVisible();
  assert.equal(commands["decision.del"] ?? 0, beforeDelete);
  await trigger.click();
  await page.getByRole("alertdialog").getByRole("button").last().click();
  await expect
    .poll(() =>
      roomStore.get()?.decisions?.some((value) => value.id === created.id),
    )
    .toBe(false);
  await expect(row).toHaveCount(0);
  assert.equal(commands["decision.del"], beforeDelete + 1);
  result.decisions = "pass";

  step(
    "People: real invitations, clipboard rejection independent of success, and Worker permissions",
  );
  await openPeople(page);
  const people = page.locator("[data-people-panel]");
  const input = people.locator('form input[type="email"]');
  await input.fill(invitedEmail);
  await input.press("Enter");
  await expect
    .poll(() => roomStore.get()?.members.includes(invitedEmail))
    .toBe(true);
  await openPeople(page);
  await expect(people.locator(`[data-person="${invitedEmail}"]`)).toBeVisible();
  await expect(
    people.getByRole("alert").filter({ hasText: /copiar|copy/i }),
  ).toBeVisible();
  await expect(input).toHaveValue("");
  assert.equal(
    await people.locator(`[data-remove="${ownerEmail}"]`).count(),
    0,
    "Owner removal is unavailable",
  );
  const outsider = await identity(forbiddenEmail);
  const forbidden = await outsider.request.post(
    `${base}/api/books/${room}/members`,
    {
      headers: { origin: base },
      data: { email: "forbidden-target@example.test" },
    },
  );
  assert.equal(forbidden.status(), 403);
  const invited = await identity(invitedEmail);
  const removeOwner = await invited.request.delete(
    `${base}/api/books/${room}/members/${encodeURIComponent(ownerEmail)}`,
    { headers: { origin: base } },
  );
  assert(
    [400, 403].includes(removeOwner.status()),
    "Member cannot remove room owner",
  );

  step(
    "People: separate real identities request access; native approve/deny and removal follow canonical WS",
  );
  const approved = await identity(approvedEmail);
  const denied = await identity(deniedEmail);
  for (const context of [approved, denied]) {
    const request = await context.request.post(
      `${base}/api/books/${room}/request`,
      { headers: { origin: base } },
    );
    assert(request.ok(), `Request access ${request.status()}`);
  }
  await expect.poll(() => roomStore.get()?.requests?.length).toBe(2);
  await expect(
    people.locator(`[data-access-request="${approvedEmail}"]`),
  ).toBeVisible();
  await people.locator(`[data-ask="${approvedEmail}"][data-ok="1"]`).click();
  await expect
    .poll(() => roomStore.get()?.members.includes(approvedEmail))
    .toBe(true);
  await expect
    .poll(() =>
      roomStore.get()?.requests?.some((value) => value.email === approvedEmail),
    )
    .toBe(false);
  await people.locator(`[data-ask="${deniedEmail}"][data-ok=""]`).click();
  dialog = page.getByRole("alertdialog");
  await expect(dialog.getByRole("button").first()).toBeFocused();
  await dialog.getByRole("button").last().click();
  await expect
    .poll(() =>
      roomStore.get()?.requests?.some((value) => value.email === deniedEmail),
    )
    .toBe(false);
  assert.equal(roomStore.get()?.members.includes(deniedEmail), false);
  await openPeople(page);
  const remove = people.locator(`[data-remove="${approvedEmail}"]`);
  await remove.click();
  await page.getByRole("alertdialog").getByRole("button").first().click();
  await expect(remove).toBeFocused();
  assert(roomStore.get()?.members.includes(approvedEmail));
  await remove.click();
  await page.getByRole("alertdialog").getByRole("button").last().click();
  await expect
    .poll(() => roomStore.get()?.members.includes(approvedEmail))
    .toBe(false);
  const access = await approved.request.get(`${base}/api/books/${room}/access`);
  assert.deepEqual(await access.json(), { member: false });
  result.people = "pass";

  step(
    "Reminders: initial empty UI, actual typed processing failure, preserved draft and real deletion",
  );
  await openPane(page, "reminders");
  const reminders = page.locator("[data-reminders-panel]");
  assert.equal(roomStore.get()?.reminders?.length, 0);
  await expect(reminders.locator("#remNew")).toBeVisible();
  await expect(
    reminders.getByText(/No reminders yet|Nenhum lembrete ainda/),
  ).toBeVisible();
  await reminders.locator("#remNew").focus();
  await page.keyboard.press("Enter");
  await expect(reminders.locator('textarea[name="text"]')).toBeFocused();
  const reminderText = `Intentionally no schedule. Do not invent one. Verification ${token}.`;
  await reminders.locator('input[name="name"]').fill(`failure-${token}`);
  await reminders.locator('textarea[name="text"]').fill(reminderText);
  const uploading = page.waitForResponse(
    (response) =>
      new URL(response.url()).pathname === `/api/books/${room}/files` &&
      response.request().method() === "POST",
    { timeout: 120_000 },
  );
  await reminders.locator("#remSave").click();
  const upload = await uploading;
  assert(upload.ok(), `Real typed file upload ${upload.status()}`);
  const saved = UploadFileResult.parse(await upload.json());
  result.reminderUpload = saved.reminder ?? null;
  if (saved.reminder?.ok === false) {
    reminderFailureVerified = true;
    await expect(reminders.locator("#remErr")).toHaveText(
      saved.reminder.error || "failed",
    );
    await expect(reminders.locator('textarea[name="text"]')).toHaveValue(
      reminderText,
    );
    await expect(reminders.locator('input[name="name"]')).toHaveValue(
      `failure-${token}`,
    );
    await expect(reminders.locator('input[name="name"]')).toHaveAttribute(
      "readonly",
      "",
    );
    await expect
      .poll(() => roomStore.get()?.reminders?.some((value) => !!value.error))
      .toBe(true);
    const failedReminder = roomStore
      .get()!
      .reminders!.find((value) => !!value.error)!;
    await expect(
      reminders.locator(`[data-rem-on="${failedReminder.id}"]`),
    ).toBeDisabled();
    await reminders.locator("#remCancel").click();
    await expect(reminders.locator("#remNew")).toBeFocused();
    await reminders.locator(`[data-rem-del="${failedReminder.id}"]`).click();
    await page.getByRole("alertdialog").getByRole("button").last().click();
    await expect
      .poll(() =>
        roomStore
          .get()
          ?.reminders?.some((value) => value.id === failedReminder.id),
      )
      .toBe(false);
    await expect(
      reminders.locator(`[data-rem-del="${failedReminder.id}"]`),
    ).toHaveCount(0);
    result.remindersFailure =
      "pass: real canonical error row deleted through reminder.delete";
  } else {
    result.remindersFailure =
      "unverified: real upload did not return reminder.ok=false; no failure response was fabricated";
  }

  step(
    "Audit native panels across EN/PT, desktop/mobile and light/dark, including keyboard dialogs",
  );
  for (const profile of [
    { lang: "en", width: 1440, dark: false },
    { lang: "pt", width: 1440, dark: true },
    { lang: "en", width: 390, dark: true },
    { lang: "pt", width: 390, dark: false },
  ]) {
    await owner.addCookies([
      { name: "vb_lang", value: profile.lang, url: base },
    ]);
    await page.setViewportSize({ width: profile.width, height: 900 });
    await page.evaluate(
      (dark) => localStorage.setItem("vb.theme", dark ? "dark" : "light"),
      profile.dark,
    );
    await page.reload();
    await expect(page.locator("#input")).toBeVisible();
    for (const panel of ["people", "decisions", "reminders"] as const) {
      if (profile.width <= 900) await page.keyboard.press("Escape");
      if (panel === "people") await openPeople(page);
      else await openPane(page, panel);
      const selector = `[data-${panel}-panel]`;
      const target = page.locator(selector);
      await target.scrollIntoViewIfNeeded();
      const native = await target.evaluate((element) => ({
        boundary: element.hasAttribute("data-vb-native"),
        width: element.getBoundingClientRect().width,
        viewport: innerWidth,
        family: getComputedStyle(element).fontFamily,
        dark: document.documentElement.dataset.theme,
        lang: document.documentElement.lang,
      }));
      assert(native.boundary);
      assert(native.width <= native.viewport);
      assert(
        native.family.includes("Inter"),
        "Native panel uses the owned application typography",
      );
      assert.equal(native.dark, profile.dark ? "dark" : "light");
      assert.equal(native.lang, profile.lang === "en" ? "en" : "pt-BR");
      const accessibility = await new AxeBuilder({ page })
        .include(selector)
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      assert.deepEqual(accessibility.violations, []);
      const key = `${panel}-${profile.lang}-${profile.width}-${profile.dark ? "dark" : "light"}`;
      await target.screenshot({ path: `${output}/${key}.png` });
      audits.push({ key, native, violations: accessibility.violations });
      if (panel === "decisions") {
        const deleteButton = target.locator("[data-ddel]").first();
        await deleteButton.focus();
        await page.keyboard.press("Enter");
        await expect(
          page.getByRole("alertdialog").getByRole("button").first(),
        ).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(deleteButton).toBeFocused();
      }
      if (panel === "reminders" && reminderFailureVerified) {
        await target.locator("#remNew").click();
        await expect(target.locator('textarea[name="text"]')).toBeFocused();
        await target.locator("#remCancel").click();
        await expect(target.locator("#remNew")).toBeFocused();
      }
    }
  }
  assert.deepEqual(errors, []);
  assert(
    (events.decisions ?? 0) > 0 && (events.members ?? 0) > 0,
    "Canonical decision/member broadcasts observed",
  );
  if (reminderFailureVerified)
    assert(
      (commands["reminder.delete"] ?? 0) > 0 && (events.reminders ?? 0) > 0,
    );
  result.status = reminderFailureVerified
    ? "pass-scoped"
    : "partial-reminder-failure-unverified";
} catch (error) {
  result.status = "fail";
  result.failure = String(error);
  if (page && !page.isClosed())
    await Promise.allSettled([
      page.screenshot({ path: `${output}/failure.png` }),
      page.content().then((html) => writeFile(`${output}/failure.html`, html)),
    ]);
  throw error;
} finally {
  result.errors = errors;
  result.commands = commands;
  result.events = events;
  result.audits = audits;
  await writeFile(
    `${output}/results.json`,
    JSON.stringify(result, null, 2) + "\n",
  );
  for (const context of contexts) await context.close();
  await browser.close();
}
