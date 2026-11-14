import type { ApplicationShellEffects, ApplicationTheme } from "./shellTypes";
/** No imports of the host or feature mounts. Studio resolves the semantic theme. */
export function createApplicationShellEffects(
  win: Window,
  doc: Document,
): ApplicationShellEffects {
  const read = (): ApplicationTheme =>
    doc.documentElement.dataset.theme === "light"
      ? "light"
      : doc.documentElement.dataset.theme === "dark"
        ? "dark"
        : "auto";
  return {
    origin: win.location.origin,
    theme: read,
    setTheme(theme) {
      if (theme === "auto") delete doc.documentElement.dataset.theme;
      else doc.documentElement.dataset.theme = theme;
      try {
        if (theme === "auto") win.localStorage.removeItem("vb.theme");
        else win.localStorage.setItem("vb.theme", theme);
      } catch {
        /* The visible setting still applies without persistent storage. */
      }
    },
    setLanguage(language) {
      doc.cookie = `vb_lang=${language}; path=/; max-age=31536000; samesite=lax`;
      win.location.reload();
    },
    documentLanguage(language) {
      doc.documentElement.lang = language === "en" ? "en" : "pt-BR";
    },
    listenTheme(callback) {
      const observer = new MutationObserver(callback);
      observer.observe(doc.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      const storage = (event: StorageEvent) => {
        if (event.key === "vb.theme") {
          const value = event.newValue;
          if (value === "light" || value === "dark")
            doc.documentElement.dataset.theme = value;
          else delete doc.documentElement.dataset.theme;
          callback();
        }
      };
      win.addEventListener("storage", storage);
      return () => {
        observer.disconnect();
        win.removeEventListener("storage", storage);
      };
    },
    listenNavigation(callback) {
      const click = (event: MouseEvent) => {
        const target = event.target;
        const anchor =
          target instanceof Element
            ? target.closest<HTMLAnchorElement>("a[data-nav]")
            : null;
        if (anchor) callback(event, anchor);
      };
      doc.addEventListener("click", click);
      return () => doc.removeEventListener("click", click);
    },
  };
}
