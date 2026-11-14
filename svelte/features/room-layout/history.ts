import type { RoomLayoutBrowser, RoomSheet } from "./types";
type Entry = { token: string; sheet: RoomSheet; returnURL: string };
const marker = (value: unknown): { token: string; sheet: RoomSheet } | null => {
  if (!value || typeof value !== "object" || !("vbRoomSheet" in value)) return null;
  const entry = value.vbRoomSheet;
  if (!entry || typeof entry !== "object" || !("token" in entry) || !("sheet" in entry) || typeof entry.token !== "string" || (entry.sheet !== "doc" && entry.sheet !== "side")) return null;
  return { token: entry.token, sheet: entry.sheet };
};
/** One room sheet entry. Back completion fences every deferred route intent. */
export function createRoomSheetHistory(options: {
  browser: RoomLayoutBrowser;
  current(): boolean;
  changed(sheet: RoomSheet | null): void;
  unconfirmed(value: boolean): void;
}) {
  const browser = options.browser;
  let active = true, known: Entry | null = null, pending: Entry | null = null, queued: (() => void) | null = null, timer: unknown | null = null, sequence = 0, intent = 0, unconfirmed = false;
  const here = () => { const url = new URL(browser.href()); return url.pathname + url.search + url.hash; };
  const same = (entry: Entry) => marker(browser.state())?.token === entry.token && here() === entry.returnURL;
  const clearTimer = () => { if (timer !== null) browser.cancel(timer); timer = null; };
  const warning = (value: boolean) => { unconfirmed = value; options.unconfirmed(value); };
  const finish = (matched: boolean) => {
    clearTimer(); pending = null; warning(false);
    const next = queued, ticket = intent; queued = null;
    if (matched && next) browser.enqueue(() => { if (active && options.current() && intent === ticket) next(); });
  };
  const deadline = () => {
    clearTimer();
    timer = browser.schedule(() => { timer = null; if (active && pending) warning(true); }, 1500);
  };
  return {
    open(sheet: RoomSheet) {
      if (!active || !options.current() || pending) return;
      intent++;
      if (known && same(known)) {
        known = { ...known, sheet };
        browser.history.replaceState({ vbRoomSheet: { token: known.token, sheet } }, "", here());
      } else {
        known = { token: `sheet-${++sequence}-${Math.random().toString(36).slice(2)}`, sheet, returnURL: here() };
        browser.history.pushState({ vbRoomSheet: { token: known.token, sheet } }, "", known.returnURL);
      }
      options.changed(sheet);
    },
    take(): boolean {
      if (!active || !options.current() || pending) return false;
      intent++;
      const owned = known && same(known);
      if (owned) { browser.history.replaceState(null, "", here()); known = null; }
      options.changed(null);
      return !!owned;
    },
    close() {
      if (!active || !options.current() || pending) return;
      intent++;
      if (known && same(known)) { pending = known; deadline(); browser.history.back(); }
      options.changed(null);
    },
    retry() {
      if (!active || !options.current() || !pending || !unconfirmed) return;
      // A completed Back with a delayed event is reconciled without another Back.
      if (!same(pending)) { const matched = here() === pending.returnURL; finish(matched); return; }
      warning(false); deadline(); browser.history.back();
    },
    beforeNavigation() {
      if (!active) return;
      intent++; queued = null;
      if (known && same(known)) browser.history.replaceState(null, "", here());
      known = null; finish(false); options.changed(null);
    },
    deferNavigation(callback: () => void) {
      if (!active || !pending) return false;
      intent++; queued = callback; return true;
    },
    consumePop() {
      if (!active) return false;
      if (pending) {
        const stillOwned = same(pending);
        // The base and sheet entry have the same URL. A delayed event observed
        // after Forward must not pretend the requested Back has completed.
        if (stillOwned && options.current()) return true;
        const matched = options.current() && !stillOwned && here() === pending.returnURL;
        options.changed(null); finish(matched); return matched;
      }
      const incoming = marker(browser.state());
      if (known && incoming?.token === known.token && here() === known.returnURL && options.current()) {
        known = { ...known, sheet: incoming.sheet }; options.changed(incoming.sheet); return true;
      }
      if (known) { options.changed(null); return options.current() && here() === known.returnURL; }
      return false;
    },
    dispose() { active = false; intent++; clearTimer(); known = pending = queued = null; },
  };
}
