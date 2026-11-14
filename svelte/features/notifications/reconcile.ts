import { get, writable } from "svelte/store";
import type { PushApi } from "./api";
export type Subscription = {
  endpoint: string;
  unsubscribe(): Promise<boolean>;
  options?: { applicationServerKey: ArrayBuffer | null };
  toJSON(): { endpoint?: string; keys?: Record<string, string> };
};
export type SubscriptionPort = {
  get(): Promise<Subscription | null>;
  subscribe(key: string): Promise<Subscription>;
  matchesKey?: (subscription: Subscription, key: string) => boolean;
};
export type PushState = {
  status:
    | "idle"
    | "working"
    | "on"
    | "off"
    | "unavailable"
    | "failed"
    | "unconfirmed";
  error: string;
};
/** One queue owns endpoint writes. A UI deadline is not cancellation/rollback:
 * retries/account changes wait for the in-flight write and reconcile afterward. */
export function createPushReconciler(
  api: PushApi,
  port: SubscriptionPort,
  deadline = 20_000,
) {
  const state = writable<PushState>({ status: "idle", error: "" });
  let active = true,
    revision = 0,
    completed = 0,
    desired = { account: null as string | null, enabled: false };
  let running: Promise<void> | null = null;
  let stoppedForLogout = false;
  const endpoints = new Set<string>();
  async function drain() {
    while (active && completed < revision) {
      const ticket = revision,
        next = { ...desired };
      state.set({ status: "working", error: "" });
      const timer = setTimeout(() => {
        if (active && completed < ticket)
          state.set({ status: "unconfirmed", error: "unconfirmed" });
      }, deadline);
      try {
        let subscription = await port.get();
        if (!active) break;
        if (next.account && next.enabled) {
          const key = await api.key();
          if (!active) break;
          if (ticket !== revision) {
            completed = ticket;
            continue;
          }
          if (!key) {
            state.set({ status: "unavailable", error: "no-key" });
            completed = ticket;
            continue;
          }
          if (
            subscription &&
            port.matchesKey &&
            !port.matchesKey(subscription, key)
          ) {
            await api.unsubscribe(subscription.endpoint);
            endpoints.delete(subscription.endpoint);
            if (!active) break;
            if (ticket !== revision) {
              completed = ticket;
              continue;
            }
            if (!(await subscription.unsubscribe()))
              throw new Error("unsubscribe-unconfirmed");
            subscription = null;
            if (!active) break;
            if (ticket !== revision) {
              completed = ticket;
              continue;
            }
          }
          subscription ??= await port.subscribe(key);
          if (!active) break;
          if (ticket !== revision) {
            completed = ticket;
            continue;
          }
          const json = subscription.toJSON();
          if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth)
            throw new Error("invalid-subscription");
          // Do not race or abort this mutation at the UI deadline. Its outcome
          // must settle before another account/mute state may write the endpoint.
          endpoints.add(json.endpoint);
          await api.subscribe({
            endpoint: json.endpoint,
            p256dh: json.keys.p256dh,
            auth: json.keys.auth,
          });
        } else {
          let failure: unknown;
          if (subscription) endpoints.add(subscription.endpoint);
          for (const endpoint of endpoints) {
            try {
              await api.unsubscribe(endpoint);
              endpoints.delete(endpoint);
            } catch (error) {
              failure = error;
            }
          }
          const removed = !subscription || (await subscription.unsubscribe());
          if (failure) throw failure;
          if (!removed) throw new Error("unsubscribe-unconfirmed");
        }
        if (active && ticket === revision)
          state.set({
            status: next.account && next.enabled ? "on" : "off",
            error: "",
          });
      } catch (error) {
        if (active && ticket === revision)
          state.set({
            status: "failed",
            error: error instanceof Error ? error.message : "failed",
          });
      } finally {
        clearTimeout(timer);
        completed = ticket;
      }
    }
  }
  function reconcile() {
    if (!running)
      running = drain().finally(() => {
        running = null;
        if (active && completed < revision) void reconcile();
      });
    return running;
  }
  return {
    state,
    set(account: string | null, enabled: boolean) {
      if (!active || stoppedForLogout) return running ?? Promise.resolve();
      desired = { account, enabled };
      revision++;
      return reconcile();
    },
    retry() {
      if (active) {
        revision++;
        return reconcile();
      }
    },
    async beforeLogout() {
      stoppedForLogout = true;
      desired = { account: null, enabled: false };
      revision++;
      // Invalidate browser delivery even if an old server write is still in
      // flight. Backend removal remains queued; this is not all-device cleanup.
      let local = false;
      const localRevoke = (async () => {
        try {
          const sub = await port.get();
          local = !sub || (await sub.unsubscribe());
        } catch {
          /* Reconciliation exposes its failure. */
        }
      })();
      const pending = reconcile();
      let timer: ReturnType<typeof setTimeout> | undefined;
      const settled = await Promise.race([
        Promise.all([localRevoke, pending]).then(() => true),
        new Promise<false>((resolve) => {
          timer = setTimeout(() => resolve(false), deadline);
        }),
      ]).finally(() => clearTimeout(timer));
      if (active && !settled)
        state.set({ status: "unconfirmed", error: "logout-unconfirmed" });
      return {
        local,
        settled,
        confirmed: local && settled && get(state).status === "off",
      };
    },
    dispose() {
      active = false;
      revision++;
    },
  };
}
