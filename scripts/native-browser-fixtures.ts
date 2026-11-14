import assert from "node:assert/strict";
import {
  expect as baseExpect,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import type { DocumentPane } from "../svelte/features/documents/types";
const expect = baseExpect.configure({ timeout: 60_000 });

/** Public local script locations only; never persist error text, auth URLs or query strings. */
export function localBrowserError(
  error: Pick<Error, "name" | "stack">,
  origin: string | readonly string[],
) {
  const allowed = new Set(typeof origin === "string" ? [origin] : origin);
  const locations = new Set<string>();
  for (const match of (error.stack ?? "").matchAll(
    /https?:\/\/(?:127\.0\.0\.1|localhost):\d+\/[^\s)]+/g,
  )) {
    const frame = /^(.*?):(\d+):(\d+)$/.exec(match[0]);
    try {
      const url = new URL(frame?.[1] ?? match[0]);
      if (allowed.has(url.origin) && /\.(?:js|ts)$/.test(url.pathname))
        locations.add(
          `${url.pathname}${frame ? `:${frame[2]}:${frame[3]}` : ""}`,
        );
    } catch {
      /* Ignore non-URL stack formatting. */
    }
  }
  return { name: error.name, locations: [...locations] };
}

/** Shared only by incremental native UI suites, not production acceptance. */
export async function nativeBrowserFixtures(
  context: BrowserContext,
  base: string,
) {
  assert(
    /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
    "Use a local test Worker",
  );
  await context.route("https://fonts.googleapis.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/css", body: "" }),
  );
  await context.route("http://127.0.0.1:47321/**", (route) => {
    const path = new URL(route.request().url()).pathname;
    assert(
      path === "/ping" || path === "/where",
      "Unexpected local runner operation",
    );
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "access-control-allow-origin": base },
      body: path === "/ping" ? '{"rooms":[]}' : "null",
    });
  });
  return [
    "legacy-only Google CSS isolated",
    "local runner: no active rooms/directory",
  ];
}

/** Actual native document controls. Never click an already-selected phone tab: that closes its history-owned sheet. */
export async function openNativeRoomPane(
  page: Page,
  pane: Exclude<DocumentPane, "view">,
) {
  const book = page.locator(".book:not(.skel)");
  await expect(book).toBeAttached({ timeout: 60_000 });
  const boardToggle = page.locator("#toggleBoard");
  if ((await boardToggle.getAttribute("aria-pressed")) === "true") {
    if (await boardToggle.isVisible()) await boardToggle.click();
    else await expect(boardToggle).toHaveAttribute("aria-pressed", "false"); // Responsive board relocation owns this transition.
  }
  if ((page.viewportSize()?.width ?? 1440) <= 900) {
    const peek = page.locator(
      `#nativeDocumentPeek button[data-document-pane="${pane === "board" ? "doc" : pane}"]`,
    );
    await expect(peek).toBeVisible({ timeout: 60_000 });
    if (pane === "board") {
      if ((await book.getAttribute("data-sheet")) !== "doc") await peek.click();
      const tab = page.locator(
        '#nativeDocumentToolbar button[data-document-pane="board"]',
      );
      await expect(tab).toBeVisible();
      if ((await book.getAttribute("data-pane")) !== pane) await tab.click();
    } else if (
      (await book.getAttribute("data-sheet")) !== "doc" ||
      (await book.getAttribute("data-pane")) !== pane
    )
      await peek.click();
    await expect(book).toHaveAttribute("data-sheet", "doc");
  } else {
    if ((await book.getAttribute("class"))?.split(/\s+/).includes("nodoc"))
      await page.locator("#toggleDoc").click();
    const tab = page.locator(
      `#nativeDocumentToolbar button[data-document-pane="${pane}"]`,
    );
    await expect(tab).toBeVisible({ timeout: 60_000 });
    if ((await book.getAttribute("data-pane")) !== pane) await tab.click();
  }
  await expect(book).toHaveAttribute("data-pane", pane);
}

/** Preview-mode AST slot, never the retained hidden legacy #tasks placeholder. */
export function nativeTaskRegion(page: Page, name = "Tasks") {
  return page
    .locator(
      "[data-native-document] [data-document-preview] [data-document-tasks]",
    )
    .getByRole("region", { name, exact: true });
}
export async function showNativeTasks(page: Page, name = "Tasks") {
  await nativeDocumentMode(page, "preview");
  await expect(nativeTaskRegion(page, name)).toBeVisible({ timeout: 60_000 });
}

/** Native header disclosure on phones; the actual native rail disclosure on desktop. */
export async function openNativeSidebar(page: Page) {
  const book = page.locator(".book:not(.skel)");
  await expect(book).toBeAttached({ timeout: 60_000 });
  if ((page.viewportSize()?.width ?? 1440) <= 900) {
    if ((await book.getAttribute("data-sheet")) !== "side")
      await page
        .locator("[data-native-thread-header]")
        .getByRole("button", {
          name: /^(Switch conversation|Trocar de conversa)$/,
        })
        .click();
    await expect(book).toHaveAttribute("data-sheet", "side");
  } else {
    const expand = page
      .locator("[data-native-room-sidebar]")
      .getByRole("button", { name: /^(Open menu|Abrir menu)$/ });
    if (await expand.isVisible()) await expand.click();
  }
  await expect(page.locator("[data-native-room-sidebar]")).toBeVisible();
}

export async function nativeDocumentMode(page: Page, mode: "preview" | "edit") {
  await openNativeRoomPane(page, "doc");
  const toggle = page
    .locator("[data-native-document] > footer")
    .getByRole("button", {
      name: mode === "preview" ? /^(Done|Pronto)$/ : /^(Edit|Editar)$/,
    });
  if (await toggle.isVisible()) await toggle.click();
  await expect(
    page.locator(
      mode === "preview" ? "[data-document-preview]" : "[data-document-editor]",
    ),
  ).toBeVisible({ timeout: 60_000 });
}
