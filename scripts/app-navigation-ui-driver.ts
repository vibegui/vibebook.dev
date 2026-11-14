import assert from "node:assert/strict";
import {
  expect as baseExpect,
  type Locator,
  type Page,
} from "@playwright/test";

const expect = baseExpect.configure({ timeout: 30_000 });
/** UI-only adaptation. HTTP/R2 fixtures, SDK protocol and capability assertions are shared. */
export type AppNavigationUIDriver = {
  variant: "svelte" | "vanilla";
  frameSelector: string;
  containerSelector: string;
  openRoom(page: Page, base: string, roomId: string): Promise<void>;
  openApps(page: Page): Promise<void>;
  openButton(page: Page): Locator;
};

export function nativeAppNavigationDriver(
  openPane: (page: Page, pane: "apps") => Promise<void>,
): AppNavigationUIDriver {
  return {
    variant: "svelte",
    frameSelector: "[data-native-app-frame] iframe",
    containerSelector: "[data-native-app-frame]",
    async openRoom(page, base, roomId) {
      await page.goto(`${base}/b/${roomId}?ui=svelte`);
      await expect(page.locator("[data-native-room-header]")).toBeVisible();
    },
    openApps: (page) => openPane(page, "apps"),
    openButton: (page) =>
      page
        .locator("[data-native-apps]")
        .getByRole("button", { name: /capability-probe/ }),
  };
}

export const vanillaAppNavigationDriver: AppNavigationUIDriver = {
  variant: "vanilla",
  frameSelector: "#appsPane iframe.connFrame",
  containerSelector: "#appsPane",
  async openRoom(page, base, roomId) {
    await page.goto(`${base}/b/${roomId}`);
    assert(
      !new URL(page.url()).searchParams.has("ui"),
      "Vanilla probe must use the default plain room URL",
    );
    await expect(page.locator(".book .chat")).toBeVisible();
  },
  async openApps(page) {
    const tab = page.locator('.ptabs button[data-pane="apps"]');
    await expect(tab).toBeVisible();
    if ((await page.locator('.doc[data-pane="apps"]').count()) === 0)
      await tab.click();
    await expect(
      page.locator('.doc[data-pane="apps"] #appsPane'),
    ).toBeVisible();
  },
  openButton: (page) =>
    page.locator('#appsPane button[data-conn-open="room/capability-probe"]'),
};
