import type { BrowserApplicationServices } from "./browser";
import type { ApplicationLanguage } from "./copy";
export type ApplicationTheme = "auto" | "light" | "dark";
export type ApplicationRoomPresentation = {
  services: BrowserApplicationServices;
  openInbox(): void;
};
/** Browser presentation effects; account/transport ownership remains in services. */
export type ApplicationShellEffects = {
  origin: string;
  theme(): ApplicationTheme;
  setTheme(theme: ApplicationTheme): void;
  setLanguage(language: ApplicationLanguage): void;
  documentLanguage(language: ApplicationLanguage): void;
  listenTheme(callback: () => void): () => void;
  listenNavigation(
    callback: (event: MouseEvent, anchor: HTMLAnchorElement) => void,
  ): () => void;
};
