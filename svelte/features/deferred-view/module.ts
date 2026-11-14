import { get, writable } from "svelte/store";
import { authClock, type AuthClock } from "../auth/owner";

export type DeferredModuleState<T> =
  | { phase: "idle" | "loading" | "error"; component: null }
  | { phase: "ready"; component: T };

/** The module is requested only by an actual view intent. A settled component
 * has stable identity across parent store updates and later pane visits.
 * Imports cannot be aborted; deadline/disposal fences ignore late completion. */
export function createDeferredModule<T>(
  load: () => Promise<T>,
  options: {
    current(): boolean;
    clock?: AuthClock;
    timeoutMs?: number;
  },
) {
  const state = writable<DeferredModuleState<T>>({
    phase: "idle",
    component: null,
  });
  const clock = options.clock ?? authClock,
    timeoutMs = options.timeoutMs ?? 20_000;
  let current = options.current,
    active = true,
    generation = 0;
  let timer: unknown | null = null,
    pending: Promise<void> | null = null;
  const clear = () => {
    if (timer !== null) clock.cancel(timer);
    timer = null;
  };
  function start() {
    if (!active || !current()) return pending;
    const ticket = ++generation;
    const owns = () => active && generation === ticket;
    state.set({ phase: "loading", component: null });
    timer = clock.schedule(() => {
      if (!owns()) return;
      timer = null;
      pending = null;
      generation++;
      if (current()) state.set({ phase: "error", component: null });
    }, timeoutMs);
    pending = Promise.resolve()
      .then(async () => {
        if (!owns()) return;
        if (!current()) {
          clear();
          pending = null;
          return;
        }
        const component = await load();
        if (!owns()) return;
        clear();
        pending = null;
        if (current()) state.set({ phase: "ready", component });
      })
      .catch(() => {
        if (!owns()) return;
        clear();
        pending = null;
        if (current()) state.set({ phase: "error", component: null });
      });
    return pending;
  }
  return {
    state,
    ensure() {
      return get(state).phase === "idle" ? start() : pending;
    },
    retry() {
      return get(state).phase === "error" ? start() : pending;
    },
    dispose() {
      active = false;
      generation++;
      clear();
      pending = null;
      // A pending native import must not retain the departed room/account via
      // the ownership predicate while its transport completes independently.
      current = () => false;
    },
  };
}
