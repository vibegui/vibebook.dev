import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import {
  chromium,
  expect as baseExpect,
  type WebSocketRoute,
  type Page,
} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as z from "zod/mini";
import { nativeBrowserFixtures } from "./native-browser-fixtures";

const expect = baseExpect.configure({ timeout: 60_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
  "Use a local test Worker",
);
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-tasks-browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const result: Record<string, unknown> = {
  scope: "Native task panel, not full feature parity/production acceptance",
};
const errors: string[] = [];
let failedPage: Page | undefined;
const step = (name: string) => {
  result.step = name;
  console.log(name);
};
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
    reducedMotion: "reduce",
  });
  await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
  context.setDefaultTimeout(60_000);
  context.setDefaultNavigationTimeout(120_000);
  result.fixtures = [
    ...(await nativeBrowserFixtures(context, base)),
    "temporary room WebSocket closure for failed-send checks",
    "unfinished control task keeps the epic active during completion toggles",
  ];
  const created = await context.request.post(`${base}/api/books`, {
    data: { title: "Native task verification" },
    headers: { origin: base },
  });
  assert(created.ok(), `Create test room: ${created.status()}`);
  const { id } = z.object({ id: z.string() }).parse(await created.json());
  result.room = id;
  let disconnected = false;
  const sockets: WebSocketRoute[] = [];
  await context.routeWebSocket(
    (url) => url.pathname === `/ws/${id}`,
    async (socket) => {
      if (disconnected)
        await socket.close({ code: 1012, reason: "local verification" });
      else {
        socket.connectToServer();
        sockets.push(socket);
      }
    },
  );
  const page = await context.newPage();
  failedPage = page;
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(`${base}/b/${id}?ui=svelte`);
  await page
    .getByRole("textbox", { name: "New epic", exact: true })
    .fill("Task workflow");
  await page.locator("#newEpic").getByRole("button").click();
  const epic = page
    .locator("button[data-epic-thread]")
    .filter({ hasText: "Task workflow" });
  await expect(epic).toBeVisible();
  await epic.click();
  const taskRegion = page.getByRole("region", {
    name: "Tasks",
    exact: true,
    includeHidden: true,
  });
  const showTasks = async () => {
    // A reload first paints the shell; wait for the socket snapshot/component
    // before deciding whether to open the document pane.
    await expect(taskRegion).toBeAttached();
    if (!(await taskRegion.isVisible())) {
      const peek = page.locator("#peekTxt");
      if (await peek.isVisible()) await peek.click();
      else await page.locator("#toggleDoc").click();
    }
    await expect(taskRegion).toBeVisible();
  };
  await showTasks();
  const draft = taskRegion.getByRole("textbox", {
    name: "new task",
    exact: true,
  });
  await draft.fill("Keep epic open during verification");
  await taskRegion
    .getByRole("button", { name: "New task", exact: true })
    .click();
  await expect(
    taskRegion.getByRole("button", {
      name: "Keep epic open during verification",
      exact: true,
    }),
  ).toBeVisible();
  await draft.fill("Verified native task");
  await taskRegion
    .getByRole("button", { name: "New task", exact: true })
    .click();
  const task = taskRegion
    .locator("[data-task]")
    .filter({ hasText: "Verified native task" });
  await expect(task).toBeVisible();
  const taskID = await task.getAttribute("data-task");
  assert(taskID && /^[a-z0-9]+$/.test(taskID), "Invalid fixture task id");
  const row = taskRegion.locator(`[data-task="${taskID}"]`);
  step("Native tasks created through UI; checking edits");
  await row
    .getByRole("button", { name: "Verified native task", exact: true })
    .click();
  const edit = row.locator("[data-task-edit]");
  await edit.fill("Renamed native task");
  await edit.press("Enter");
  await expect(
    row.getByRole("button", { name: "Renamed native task", exact: true }),
  ).toBeVisible();
  const checkbox = row.getByRole("checkbox", { name: "Done", exact: true });
  await checkbox.click();
  await expect(checkbox).toBeChecked();
  await expect(taskRegion.getByRole("progressbar")).toHaveAttribute(
    "value",
    "1",
  );
  await checkbox.click();
  await expect(checkbox).not.toBeChecked();
  const owner = row.getByRole("combobox", { name: "Owner", exact: true });
  const [self] = await owner.selectOption({ index: 1 });
  assert(self);
  await expect(owner).toHaveValue(self);
  const dueButton = () => row.getByRole("button", { name: /^Due date/ });
  await dueButton().click();
  const dueDialog = page.getByRole("dialog", { name: "Due date", exact: true });
  const due = dueDialog.getByRole("textbox", { name: "Due date", exact: true });
  await expect(due).toBeFocused();
  await due.fill("Friday");
  await dueDialog.getByRole("button", { name: "Save", exact: true }).click();
  await expect(dueDialog).toHaveCount(0);
  await expect(dueButton()).toHaveAccessibleName("Due date: Friday");
  step("Checking persistence after reload");
  await page.reload();
  await showTasks();
  await expect(owner).toHaveValue(self);
  await expect(dueButton()).toHaveAccessibleName("Due date: Friday");
  step("Persistence passed; checking modal handoff");
  await dueButton().click();
  await expect(due).toHaveValue("Friday");
  await page.keyboard.press("Control+k");
  await expect(dueDialog).toHaveCount(0);
  await expect(page.locator("#swDlg")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#swDlg")).not.toBeVisible();
  await dueButton().click();
  await page.keyboard.press("Escape");
  await expect(dueDialog).toHaveCount(0);
  await expect(dueButton()).toBeFocused();
  const taskAxe = async (name: string) => {
    const theme = await taskRegion.evaluate((element) => {
      const probe = document.createElement("span");
      probe.style.backgroundColor = "var(--vb-background)";
      document.body.append(probe);
      const expected = getComputedStyle(probe).backgroundColor;
      const actual = getComputedStyle(element).backgroundColor;
      const family = getComputedStyle(element).fontFamily;
      probe.remove();
      return { expected, actual, family };
    });
    assert.equal(
      theme.actual,
      theme.expected,
      "Native task surface leaked legacy background",
    );
    assert(theme.family.includes("Inter var"));
    result[`${name}Theme`] = theme;
    const audit = await new AxeBuilder({ page })
      .include('section[aria-label="Tasks"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    result[name] = audit.violations;
    assert.deepEqual(audit.violations, [], `${name} violations`);
  };
  step("Checking responsive task accessibility");
  await taskAxe("light1440Accessibility");
  await taskRegion.screenshot({ path: `${output}/tasks-light-1440.png` });
  await page.evaluate(() => {
    document.documentElement.dataset.theme = "dark";
  });
  await page.setViewportSize({ width: 768, height: 1000 });
  await showTasks();
  await taskAxe("dark768Accessibility");
  await taskRegion.screenshot({ path: `${output}/tasks-dark-768.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await showTasks();
  await taskAxe("dark390Accessibility");
  await taskRegion.screenshot({ path: `${output}/tasks-dark-390.png` });
  await dueButton().click();
  await expect(due).toBeFocused();
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    assert(
      await dueDialog.evaluate((node) => node.contains(document.activeElement)),
      "Focus escaped due dialog",
    );
  }
  const dialogAxe = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  result.dueDialogAccessibility = dialogAxe.violations;
  assert.deepEqual(dialogAxe.violations, []);
  await page.screenshot({ path: `${output}/task-due-dark-390.png` });
  await page.keyboard.press("Escape");
  await expect(dueDialog).toHaveCount(0);
  await expect(taskRegion).toBeVisible();
  step("Checking disconnected draft and selection retention");
  assert(sockets.length > 0, "Room WebSocket was not intercepted");
  disconnected = true;
  await Promise.all(
    sockets
      .splice(0)
      .map((socket) =>
        socket.close({ code: 1012, reason: "local verification" }),
      ),
  );
  await draft.fill("Preserved disconnected draft");
  await taskRegion
    .getByRole("button", { name: "New task", exact: true })
    .click();
  await expect(taskRegion.getByRole("alert")).toContainText(
    "Couldn't send it now",
  );
  await expect(draft).toHaveValue("Preserved disconnected draft");
  await owner.selectOption("");
  await expect(owner).toHaveValue(self);
  await row
    .getByRole("button", { name: "Renamed native task", exact: true })
    .click();
  await edit.fill("Preserved disconnected rename");
  await edit.press("Enter");
  await expect(edit).toHaveValue("Preserved disconnected rename");
  step("Checking reconnect recovery and retained edits");
  disconnected = false;
  // Retry the same retained draft after the real room transport reconnects.
  await expect
    .poll(
      async () => {
        await taskRegion
          .getByRole("button", { name: "New task", exact: true })
          .click();
        return draft.inputValue();
      },
      { timeout: 60_000 },
    )
    .toBe("");
  await expect(
    taskRegion.getByRole("button", {
      name: "Preserved disconnected draft",
      exact: true,
    }),
  ).toBeVisible();
  // Focusing the retry button may legitimately save on blur once reconnected.
  // Accept either retained editing state or the server-confirmed saved title.
  if (await edit.isVisible()) {
    await expect(edit).toHaveValue("Preserved disconnected rename");
    await edit.press("Enter");
  }
  await expect(
    row.getByRole("button", {
      name: "Preserved disconnected rename",
      exact: true,
    }),
  ).toBeVisible();
  await dueButton().click();
  await due.fill("");
  await dueDialog.getByRole("button", { name: "Save", exact: true }).click();
  await expect(dueButton()).toHaveAccessibleName("Due date");
  await row.getByRole("button", { name: "Delete task", exact: true }).click();
  await expect(row).toHaveCount(0);
  assert.deepEqual(errors, []);
  result.status = "pass";
  console.log(
    "PASS native tasks: create/rename/toggle/owner/due/delete, persistence, modal handoff, responsive axe, disconnect retention/retry",
  );
} catch (error) {
  result.status = "fail";
  result.failure = String(error);
  if (failedPage && !failedPage.isClosed()) {
    const captures = await Promise.allSettled([
      failedPage.screenshot({ path: `${output}/failure.png` }),
      failedPage
        .content()
        .then((content) => writeFile(`${output}/failure.html`, content)),
    ]);
    result.diagnosticFailures = captures
      .filter((capture) => capture.status === "rejected")
      .map((capture) => String(capture.reason));
  }
  throw error;
} finally {
  result.errors = errors;
  await writeFile(
    `${output}/results.json`,
    JSON.stringify(result, null, 2) + "\n",
  );
  await browser.close();
}
