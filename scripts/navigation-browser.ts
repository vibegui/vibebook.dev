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
import { nativeTestAgent } from "./native-test-mcp";
import { PostMessageResult } from "../shared/schemas";

const expect = baseExpect.configure({ timeout: 60_000 });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
assert(
  /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
  "Use a loopback test Worker",
);
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-navigation-browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const result: Record<string, unknown> = {
  scope:
    "Incremental native epic navigation; not full native sidebar or production acceptance",
};
const errors: string[] = [];
let page: Page | undefined;
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
  context.setDefaultTimeout(60_000);
  context.setDefaultNavigationTimeout(120_000);
  await context.addCookies([{ name: "vb_lang", value: "en", url: base }]);
  result.fixtures = [
    ...(await nativeBrowserFixtures(context, base)),
    "real local OAuth/PKCE MCP agent creates nested epics through supported tools",
    "temporary browser-side WebSocket closure for rejected sends",
  ];
  const created = await context.request.post(`${base}/api/books`, {
    data: { title: "Native epic navigation verification" },
    headers: { origin: base },
  });
  assert(created.ok(), `Create room: ${created.status()}`);
  const { id } = z.object({ id: z.string() }).parse(await created.json());
  result.room = id;
  page = await context.newPage();
  const current = page;
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" ||
      (message.type() === "warning" && message.text().includes("[svelte]"))
    )
      errors.push(message.text());
  });
  step("Creating real nested epics through local OAuth and MCP");
  const agent = await nativeTestAgent(page, base);
  const newEpic = async (title: string, parent?: string) => {
    let message: number | undefined;
    if (parent) {
      const response = await context.request.post(
        `${base}/api/books/${id}/post`,
        {
          data: { thread: parent, text: `Verify ${title}` },
          headers: { origin: base },
        },
      );
      assert(response.ok(), `Seed nested request: ${response.status()}`);
      const posted = PostMessageResult.parse(await response.json());
      assert(posted.ok, "Seed nested request rejected");
      message = posted.id;
    }
    return z.object({ epic_id: z.string() }).parse(
      await agent("start_epic", {
        room_id: id,
        title,
        why: "Verify the native hierarchy, navigation and persistence against real room state.",
        tasks: [`Keep ${title} active`],
        ...(message ? { from_message_id: message } : { backlog: true }),
      }),
    ).epic_id;
  };
  const parent = await newEpic("Parent workflow");
  const child = await newEpic("Child workflow", parent);
  const leaf = await newEpic("Leaf workflow", child);
  const other = await newEpic("Second branch");
  const oldParent = await newEpic("Archived parent");
  const oldChild = await newEpic("Archived child", oldParent);
  await agent("update_epic", {
    room_id: id,
    epic_id: oldParent,
    archived: true,
  });
  await agent("update_epic", {
    room_id: id,
    epic_id: oldChild,
    archived: true,
  });
  result.epics = { parent, child, leaf, other, oldParent, oldChild };
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
  const nav = page.getByRole("region", {
    name: "Epics",
    exact: true,
    includeHidden: true,
  });
  const row = (epic: string) => nav.locator(`li[data-epic="${epic}"]`);
  const title = (epic: string) => row(epic).locator("[data-epic-thread]");
  const disclosure = (epic: string) =>
    row(epic).getByRole("button", { name: /^(Expand|Collapse) branch:/ });
  const show = async (region = nav) => {
    await expect(region).toBeAttached();
    if (!(await region.isVisible())) await current.locator("#roomName").click();
    await expect(region).toBeVisible();
  };
  const navigate = async (thread = "main") => {
    ready = false;
    await current.goto(
      `${base}/b/${id}?ui=svelte${thread === "main" ? "" : `&t=${thread}`}`,
    );
    await show();
    await expect.poll(() => ready).toBe(true);
  };
  const draft = nav.getByRole("textbox", { name: "New epic", exact: true });
  const submit = nav.getByRole("button", { name: "Create epic", exact: true });
  await navigate();
  step(
    "Checking nested metadata, keyboard disclosure and live draft retention",
  );
  await expect(row(child)).toHaveAttribute("data-depth", "1");
  await expect(row(leaf)).toHaveAttribute("data-depth", "2");
  await disclosure(parent).focus();
  await disclosure(parent).press("Enter");
  await expect(row(child)).toBeHidden();
  await expect(
    row(parent).getByRole("img", { name: "Work in a sub-epic", exact: true }),
  ).toBeVisible();
  await draft.fill("Draft survives live updates");
  await agent("update_epic", {
    room_id: id,
    epic_id: leaf,
    title: "Leaf initial live update",
  });
  await expect(row(leaf).locator("[data-epic-title]")).toContainText(
    "Leaf initial live update",
  );
  await expect(draft).toHaveValue("Draft survives live updates");
  await expect(row(child)).toBeHidden();
  await navigate(leaf);
  await expect(row(leaf)).toBeVisible();
  await expect(title(leaf)).toHaveAttribute("aria-current", "page");
  await disclosure(parent).click();
  await expect(row(leaf)).toBeHidden();
  await agent("update_epic", {
    room_id: id,
    epic_id: leaf,
    title: "Leaf updated remotely",
  });
  await expect(row(leaf).locator("[data-epic-title]")).toContainText(
    "Leaf updated remotely",
  );
  await expect(row(leaf)).toBeHidden();
  await disclosure(parent).click();
  await title(parent).click();
  await expect(title(parent)).toHaveAttribute("aria-current", "page");
  await title(parent).click();
  await expect(row(child)).toBeHidden();
  await title(parent).press("Space");
  await expect(row(child)).toBeVisible();
  step("Checking archived hierarchy, owner changes and keyboard ordering");
  await nav.getByRole("tab", { name: /^Archived/ }).click();
  await expect(row(oldChild)).toHaveAttribute("data-depth", "1");
  await expect(nav.locator("#newEpic")).toHaveCount(0);
  await nav.getByRole("tab", { name: /^Epics/ }).click();
  await row(child).locator("summary").click();
  const owner = row(child).getByRole("combobox", {
    name: "Epic owner: Child workflow",
    exact: true,
  });
  await owner.selectOption("");
  await expect(owner).toHaveValue("");
  const roots = () =>
    nav
      .locator('li[data-depth="0"]:not([hidden])')
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("data-epic")),
      );
  await expect.poll(roots).toEqual([parent, other]);
  await row(other).locator("summary").click();
  const moveUp = row(other).getByRole("button", {
    name: "Move up: Second branch",
    exact: true,
  });
  await moveUp.focus();
  await moveUp.press("Enter");
  await expect.poll(roots).toEqual([other, parent]);
  await expect
    .poll(() =>
      row(other).evaluate((element) =>
        element.contains(document.activeElement),
      ),
    )
    .toBe(true);
  step("Checking real sibling drag without changing hierarchy");
  const from = row(other).locator('[role="group"]');
  const to = row(parent).locator('[role="group"]');
  await from.hover();
  const bounds = await from.boundingBox();
  assert(bounds);
  await page.mouse.move(bounds.x + 45, bounds.y + 15);
  await page.mouse.down();
  await page.mouse.move(bounds.x + 53, bounds.y + 23, { steps: 5 });
  const target = await to.boundingBox();
  assert(target);
  await to.hover({ position: { x: 15, y: target.height - 3 } });
  await to.hover({ position: { x: 20, y: target.height - 2 } });
  await page.mouse.up();
  await expect.poll(roots).toEqual([parent, other]);
  await expect(row(child)).toHaveAttribute("data-depth", "1");
  await expect(row(leaf)).toHaveAttribute("data-depth", "2");
  await navigate();
  await expect.poll(roots).toEqual([parent, other]);
  await row(child).locator("summary").click();
  await expect(owner).toHaveValue("");
  step("Checking disconnected draft retention, owner rollback and retry");
  disconnected = true;
  await Promise.all(
    sockets
      .splice(0)
      .map((socket) =>
        socket.close({ code: 1012, reason: "local verification" }),
      ),
  );
  await draft.fill("Retained navigation draft");
  await submit.click();
  await expect(nav.getByRole("alert")).toContainText("Couldn't send it now");
  await expect(draft).toHaveValue("Retained navigation draft");
  const memberValue = await owner
    .locator("option")
    .evaluateAll((options) =>
      options
        .flatMap((option) =>
          option instanceof HTMLOptionElement && option.value
            ? [option.value]
            : [],
        )
        .find(Boolean),
    );
  assert(memberValue);
  await owner.selectOption(memberValue);
  await expect(owner).toHaveValue("");
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
  await expect(
    nav
      .locator("[data-epic-title]")
      .filter({ hasText: "Retained navigation draft" }),
  ).toBeVisible();
  step("Checking responsive Studio tokens and native navigation accessibility");
  const audit = async (name: string, region = nav) => {
    await show(region);
    const theme = await region.evaluate((element) => {
      const probe = document.createElement("div");
      probe.style.backgroundColor = "var(--vb-sidebar)";
      element.append(probe);
      const style = getComputedStyle(element);
      const result = {
        actual: style.backgroundColor,
        expected: getComputedStyle(probe).backgroundColor,
        family: style.fontFamily,
        pageWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
      };
      probe.remove();
      return result;
    });
    assert.equal(theme.actual, theme.expected);
    assert(theme.family.includes("Inter var"));
    assert(theme.pageWidth <= theme.viewport);
    const accessibility = await new AxeBuilder({ page: current })
      .include("section[data-vb-native]")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(accessibility.violations, []);
    result[name] = { theme, violations: accessibility.violations };
    await region.screenshot({ path: `${output}/${name}.png` });
  };
  await audit("navigation-light-1440");
  await page.evaluate(() => {
    document.documentElement.dataset.theme = "dark";
  });
  await page.setViewportSize({ width: 768, height: 1000 });
  await audit("navigation-dark-768");
  await page.setViewportSize({ width: 390, height: 844 });
  await audit("navigation-dark-390");
  for (const width of [900, 390]) {
    await page.setViewportSize({ width, height: 844 });
    step("Checking the mobile form stays reachable with expanded epic actions");
    await draft.scrollIntoViewIfNeeded();
    await expect(draft).toBeInViewport({ ratio: 0.95 });
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
    });
    await submit.hover();
    const sheetHeight: number = await page
      .locator("#side")
      .evaluate((el) => el.clientHeight);
    const sheetScroll: number = await page
      .locator("#side")
      .evaluate((el) => el.scrollTop);
    const submitBounds = await submit.boundingBox();
    await page.mouse.down();
    assert.equal(
      await page.locator("#side").evaluate((el) => el.clientHeight),
      sheetHeight,
    );
    assert.equal(
      await page.locator("#side").evaluate((el) => el.scrollTop),
      sheetScroll,
    );
    assert.deepEqual(await submit.boundingBox(), submitBounds);
    await page.mouse.up(); // Empty submission focuses the field without writing a new epic.
    await expect(draft).toBeFocused();
    assert.equal(
      await page.locator("#side").evaluate((el) => el.clientHeight),
      sheetHeight,
      "Focusing the mobile form must not resize its scrollport mid-click",
    );
    await expect(submit).toBeInViewport({ ratio: 0.95 });
    result[`mobileForm${width}`] = {
      sheetHeight,
      bounds: await draft.boundingBox(),
      viewport: page.viewportSize(),
      focused: await draft.evaluate(
        (element) => element === document.activeElement,
      ),
    };
    await page.screenshot({
      path: `${output}/navigation-form-dark-${width}.png`,
    });
  }
  step("Checking Portuguese input and navigation accessibility");
  await context.addCookies([{ name: "vb_lang", value: "pt", url: base }]);
  await page.reload();
  const portuguese = page.getByRole("region", {
    name: "Épicos",
    exact: true,
    includeHidden: true,
  });
  await show(portuguese);
  await portuguese
    .getByRole("textbox", { name: "Novo épico", exact: true })
    .fill("Navegação verificada");
  await portuguese
    .getByRole("button", { name: "Criar épico", exact: true })
    .click();
  await expect(
    portuguese
      .locator("[data-epic-title]")
      .filter({ hasText: "Navegação verificada" }),
  ).toBeVisible();
  await audit("navigation-pt-390", portuguese);
  assert.deepEqual(errors, []);
  result.status = "pass";
  console.log(
    "PASS native epic navigation: hierarchy, disclosure, live draft state, archive, owner, ordering/drag, persistence, disconnect/retry, responsive EN/PT axe",
  );
} catch (error) {
  result.status = "fail";
  result.failure = String(error);
  if (page && !page.isClosed()) {
    await Promise.allSettled([
      page.screenshot({ path: `${output}/failure.png` }),
      page
        .content()
        .then((content) => writeFile(`${output}/failure.html`, content)),
    ]);
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
