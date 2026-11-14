import { createApplicationServices } from "./services";
import type { ApplicationBrowser } from "./types";
import { createPwaService } from "../pwa/service";
import { browserDeviceLock } from "../account/device";
import { createHomeApi } from "../home/api";
import { createAccountApi } from "../account/api";
import { createAgentsApi } from "../agents/api";
import { pwaLogoutWarning, pwaLogoutFailure } from "../pwa/copy";
import { resolveApplicationLanguage, applicationLocale, createApplicationCopy } from "./copy";

/** The production document binds browser effects once. Core services have no
 * globals, selectors, HTML strings, mount registry or framework lifecycle. */
export function createBrowserApplicationServices(options: {
  window: Window & typeof globalThis;
  document: Document;
  shellVersion: string | null;
  onIdentityReset?: () => void;
}) {
  const win = options.window, doc = options.document;
  const language = resolveApplicationLanguage(doc.cookie, win.navigator.language);
  const t = createApplicationCopy(language);
  let storage: Storage | null = null;
  try { storage = win.localStorage; } catch { /* Disabled browser storage is supported. */ }
  const browser: ApplicationBrowser = {
    origin: win.location.origin,
    href: () => win.location.href,
    history: win.history,
    socketUrl(path) {
      const url = new URL(path, win.location.href);
      url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
      return url.href;
    },
    visible: () => doc.visibilityState === "visible",
    listenVisibility(callback) { doc.addEventListener("visibilitychange", callback); return () => doc.removeEventListener("visibilitychange", callback); },
    listenPop(callback) { win.addEventListener("popstate", callback); return () => win.removeEventListener("popstate", callback); },
    enqueue: callback => win.queueMicrotask(callback),
    navigateDocument: href => { win.location.href = href; },
    reload: () => win.location.reload(),
    logoutPost: all => win.fetch(all ? "/auth/logout-all" : "/auth/logout", { method: "POST" }),
    logoutWarning: () => win.alert(pwaLogoutWarning(language)),
    logoutFailure: () => win.alert(pwaLogoutFailure(language)),
    shellVersion: options.shellVersion,
    storage,
  };
  const fetcher: typeof fetch = win.fetch.bind(win);
  const device = browserDeviceLock();
  const services = createApplicationServices({
    browser, pwa: createPwaService, device,
    homeApi: createHomeApi(fetcher), accountApi: createAccountApi(fetcher), agentsApi: createAgentsApi(fetcher),
    runnerFetch: fetcher,
    onIdentityReset: options.onIdentityReset,
  });
  return { ...services, device, language, locale: applicationLocale(language), t };
}
export type BrowserApplicationServices = ReturnType<typeof createBrowserApplicationServices>;
