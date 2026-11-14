import type { BrowserContext, Page } from "@playwright/test";
import type { DocumentPane } from "../svelte/features/documents/types";

export type NativeApplicationProfile = {
  lang: "en" | "pt";
  theme: "light" | "dark";
  width: 1440 | 390;
};
/** Only real Worker contexts. No caller may install canonical/API response mocks. */
export type NativeApplicationAuditFixture = {
  base: string;
  roomId: string;
  ownerEmail: string;
  /** Actual agent post used to exercise the existing Markdown/code path. */
  codeMessageId?: number;
  output: string;
  createProfile(
    profile: NativeApplicationProfile,
  ): Promise<{ context: BrowserContext; page: Page }>;
  openPane(page: Page, pane: Exclude<DocumentPane, "view">): Promise<void>;
  openSidebar(page: Page): Promise<void>;
  step(name: string, run: () => Promise<void>): Promise<void>;
};
