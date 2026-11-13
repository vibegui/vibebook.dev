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
import { nativeBrowserFixtures } from "./native-browser-fixtures";

const expect = baseExpect.configure({ timeout: 60_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
  "Use a local test Worker",
);
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-board-browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const result: Record<string, unknown> = {
  scope:
    "Native board/list incremental verification; not production or full feature parity",
};
const errors: string[] = [];
let failedPage: Page | undefined;
const step = (value: string) => {
  result.step = value;
  console.log(value);
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
    "transparent WebSocket forwarding observes initial room readiness",
    "temporary browser-side WebSocket closure for rejected sends",
    "unfinished control task preserves the epic during status moves",
  ];
  const created = await context.request.post(`${base}/api/books`, {
    data: { title: "Native board verification" },
    headers: { origin: base },
  });
  assert(created.ok(), `Create local room: ${created.status()}`);
  const { id } = z.object({ id: z.string() }).parse(await created.json());
  result.room = id;
  let disconnected = false;
  let ready = false;
  const sockets: WebSocketRoute[] = [];
  await context.routeWebSocket(
    (url) => url.pathname === `/ws/${id}`,
    async (socket) => {
      if (disconnected) {
        await socket.close({ code: 1012, reason: "local verification" });
        return;
      }
      const server = socket.connectToServer();
      server.onMessage((message) => {
        ready = true;
        socket.send(message);
      });
      sockets.push(socket);
    },
  );
  const page = await context.newPage();
  failedPage = page;
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const board = page.getByRole("region", { name: "Task board", exact: true });
  const showBoard = async () => {
    const toggle = page.locator("#toggleBoard");
    await expect(toggle).toBeAttached();
    if (await toggle.isVisible()) {
      if ((await toggle.getAttribute("aria-pressed")) !== "true")
        await toggle.click();
    } else {
      const tab = page.locator('button[data-pane="board"]');
      if (!(await tab.isVisible())) {
        const peek = page.locator("#peekTxt");
        if (await peek.isVisible()) await peek.click();
        else await page.locator("#toggleDoc").click();
      }
      await tab.click();
    }
    await expect(board).toBeVisible();
    await expect.poll(() => ready).toBe(true);
  };
  const navigate = async (path: string) => {
    ready = false;
    await page.goto(`${base}${path}`);
    await showBoard();
  };
  const draft = board.getByRole("textbox", { name: "New task", exact: true });
  const submit = board.getByRole("button", { name: "New task", exact: true });
  const card = (title: string) =>
    board.locator("[data-board-task]").filter({ hasText: title });
  const add = async (title: string) => {
    await draft.fill(title);
    await submit.click();
    await expect(card(title)).toBeVisible();
  };
  await navigate(`/b/${id}?ui=svelte`);
  step("Checking room tasks without any epics");
  await expect(board).toHaveAttribute("data-board-scope", "all");
  await add("Standalone room task");
  await expect(
    card("Standalone room task").locator("[data-board-open]"),
  ).toHaveAttribute("data-epic", "main");
  await page
    .getByRole("textbox", { name: "New epic", exact: true })
    .fill("Board workflow");
  await page.locator("#newEpic").getByRole("button").click();
  const epic = page
    .locator("button[data-thread]")
    .filter({ hasText: "Board workflow" });
  await expect(epic).toBeVisible();
  const epicID = await epic.getAttribute("data-thread");
  assert(epicID && /^[a-z0-9]+$/.test(epicID));
  await board
    .getByRole("combobox", { name: "Epic", exact: true })
    .selectOption(epicID);
  await add("Keep epic active");
  await add("Keyboard workflow task");
  const target = card("Keyboard workflow task");
  const taskID = await target.getAttribute("data-board-task");
  assert(taskID && /^[a-z0-9]+$/.test(taskID));
  const open = target.locator("[data-board-open]");
  const status = target.getByRole("combobox", {
    name: "Status: Keyboard workflow task",
    exact: true,
  });
  step("Checking keyboard movement, native status selection and focus");
  await open.focus();
  await open.press("ArrowRight");
  await expect(target).toHaveAttribute("data-status", "doing");
  await expect(open).toBeFocused();
  await status.focus();
  await status.selectOption("review");
  await expect(target).toHaveAttribute("data-status", "review");
  await expect(status).toHaveValue("review");
  await expect(status).toBeFocused();
  await expect(board.getByRole("status")).toContainText(
    "Keyboard workflow task",
  );
  step("Checking real drag and drop");
  const grip = target.locator("[data-board-drag]");
  await grip.hover();
  const bounds = await grip.boundingBox();
  assert(bounds, "Drag grip has no geometry");
  await page.mouse.down();
  // Activate before target hover autoscrolls the narrow lane viewport.
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 8,
    bounds.y + bounds.height / 2 + 8,
    { steps: 5 },
  );
  const doingLane = board.locator('[data-lane="doing"]');
  // Two movements reliably deliver dragover: https://playwright.dev/docs/input#dragging-manually
  await doingLane.hover({ position: { x: 20, y: 20 } });
  await doingLane.hover({ position: { x: 25, y: 25 } });
  await page.mouse.up();
  await expect(target).toHaveAttribute("data-status", "doing");
  await status.selectOption("review");
  await expect(target).toHaveAttribute("data-status", "review");
  await board.getByRole("tab", { name: "List", exact: true }).click();
  await expect(
    board.getByRole("tab", { name: "List", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(card("Standalone room task")).toBeVisible();
  await expect(target).toBeVisible();
  await draft.fill("Draft survives view changes");
  await board.getByRole("tab", { name: "Board", exact: true }).click();
  await expect(draft).toHaveValue("Draft survives view changes");
  await board.getByRole("tab", { name: "List", exact: true }).click();
  await expect(draft).toHaveValue("Draft survives view changes");
  await draft.fill("");
  step("Checking persisted mode/status and native Enter/Space navigation");
  await navigate(`/b/${id}?ui=svelte`);
  await expect(
    board.getByRole("tab", { name: "List", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(status).toHaveValue("review");
  await open.press("Enter");
  await showBoard();
  await expect(board).toHaveAttribute("data-board-scope", epicID);
  await expect(card("Standalone room task")).toHaveCount(0);
  await navigate(`/b/${id}?ui=svelte`);
  await open.press("Space");
  await showBoard();
  await expect(board).toHaveAttribute("data-board-scope", epicID);
  await board.getByRole("tab", { name: "Board", exact: true }).click();
  const audit = async (name: string) => {
    const theme = await board.evaluate((element) => {
      const probe = document.createElement("span");
      probe.style.backgroundColor = "var(--vb-background)";
      document.body.append(probe);
      const expected = getComputedStyle(probe).backgroundColor;
      probe.remove();
      const style = getComputedStyle(element);
      const headings = [...element.querySelectorAll("h3")].map((heading) => {
        const typography = getComputedStyle(heading);
        return {
          family: typography.fontFamily,
          weight: typography.fontWeight,
          size: typography.fontSize,
          leading: typography.lineHeight,
          tracking: typography.letterSpacing,
        };
      });
      return {
        expected,
        actual: style.backgroundColor,
        family: style.fontFamily,
        pageWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
        headings,
      };
    });
    assert.equal(
      theme.actual,
      theme.expected,
      "Legacy background leaked into native board",
    );
    assert(theme.family.includes("Inter var"));
    for (const heading of theme.headings) {
      assert(
        heading.family.includes("Inter var"),
        "Legacy heading font leaked into board",
      );
      assert.equal(heading.weight, "500");
      assert.equal(heading.size, "14px");
      assert.equal(heading.leading, "20px");
      assert(["0px", "normal"].includes(heading.tracking));
    }
    assert(
      theme.pageWidth <= theme.viewport,
      "Board overflow escaped its horizontal scroller",
    );
    const accessibility = await new AxeBuilder({ page })
      .include('section[aria-label="Task board"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(accessibility.violations, [], `${name} accessibility`);
    result[name] = { theme, violations: accessibility.violations };
    await board.screenshot({ path: `${output}/${name}.png` });
  };
  step("Checking light/dark responsive board and list accessibility");
  await board.evaluate((element) => {
    element.setAttribute("data-layout-proof", "preserved");
  });
  await draft.fill("Preserved layout draft");
  await audit("board-light-1440");
  await page.evaluate(() => {
    document.documentElement.dataset.theme = "dark";
  });
  await page.setViewportSize({ width: 768, height: 1000 });
  await showBoard();
  await audit("board-dark-768");
  await page.setViewportSize({ width: 390, height: 844 });
  await showBoard();
  await audit("board-dark-390");
  await board.getByRole("tab", { name: "List", exact: true }).click();
  await audit("list-dark-390");
  step("Checking layout round trip without remount or draft/focus loss");
  await draft.focus();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(board).toBeVisible();
  await expect(board).toHaveAttribute("data-layout-proof", "preserved");
  await expect(draft).toHaveValue("Preserved layout draft");
  await expect(draft).toBeFocused();
  await expect(
    board.getByRole("tab", { name: "List", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.setViewportSize({ width: 390, height: 844 });
  await showBoard();
  await expect(board).toHaveAttribute("data-layout-proof", "preserved");
  await expect(draft).toHaveValue("Preserved layout draft");
  await draft.fill("");
  result.layoutRoundTrip =
    "1440→768→390→1440→390 preserves native DOM, draft and mode; automatic desktop return preserves focus";
  step("Checking disconnected drafts, status rollback and retry");
  assert(sockets.length > 0);
  disconnected = true;
  await Promise.all(
    sockets
      .splice(0)
      .map((socket) =>
        socket.close({ code: 1012, reason: "local verification" }),
      ),
  );
  await draft.fill("Retained board draft");
  await submit.click();
  await expect(board.getByRole("alert")).toContainText("Couldn't send it now");
  await expect(draft).toHaveValue("Retained board draft");
  await status.selectOption("todo");
  await expect(status).toHaveValue("review");
  await expect(target).toHaveAttribute("data-status", "review");
  await board.getByRole("tab", { name: "Board", exact: true }).click();
  await expect(draft).toHaveValue("Retained board draft");
  disconnected = false;
  await expect
    .poll(
      async () => {
        await submit.click();
        return draft.inputValue();
      },
      { timeout: 60_000 },
    )
    .toBe("");
  await expect(card("Retained board draft")).toBeVisible();
  await navigate(`/b/${id}?ui=svelte&t=${epicID}`);
  await expect(card("Retained board draft")).toBeVisible();
  await expect(status).toHaveValue("review");
  step("Checking board scrolling keeps the form and final card reachable");
  for (const title of [
    "Scroll task one",
    "Scroll task two",
    "Final scroll task",
  ])
    await add(title);
  const last = card("Final scroll task");
  await last.scrollIntoViewIfNeeded();
  await expect(last).toBeInViewport({ ratio: 0.95 });
  const formBounds = await board.locator("form").boundingBox();
  const viewport = page.viewportSize();
  assert(
    formBounds &&
      viewport &&
      formBounds.y >= 0 &&
      formBounds.y + formBounds.height <= viewport.height,
    "Board content pushed the task form outside the viewport",
  );
  result.scrolling = { formBounds, viewport };
  await board.screenshot({ path: `${output}/board-scroll-390.png` });
  assert.deepEqual(errors, []);
  result.status = "pass";
  console.log(
    "PASS native board/list: room tasks, creation, keyboard/drag/status, focus, mode/persistence, Enter/Space, responsive axe, disconnected retention/retry",
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
