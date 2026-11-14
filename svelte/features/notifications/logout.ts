import { createPushApi, withPushEndpointLock } from "./api";
import { createPushReconciler } from "./reconcile";
import { existingPushRegistration } from "../pwa/registration";
/** confirmed covers this queue's known endpoint/local revocation only; it is
 * neither all-device cleanup nor server fencing of a previous document's write. */
export type PushCleanupResult = {
  local: boolean;
  settled: boolean;
  confirmed: boolean;
};
/** Standalone auth documents have no active app queue. App surfaces must pass
 * their existing owner so pending mutations finish before cleanup reconciles. */
export async function cleanupCurrentDevicePush(owner?: {
  beforeLogout(): Promise<PushCleanupResult>;
}): Promise<PushCleanupResult> {
  if (owner) return owner.beforeLogout();
  if (!("serviceWorker" in navigator) || !("PushManager" in window))
    return { local: true, settled: true, confirmed: true };
  const queue = createPushReconciler(withPushEndpointLock(createPushApi()), {
    get: async () =>
      (await existingPushRegistration())?.pushManager.getSubscription() ?? null,
    subscribe: async () => {
      throw new Error("cleanup-cannot-subscribe");
    },
  });
  try {
    return await queue.beforeLogout();
  } finally {
    queue.dispose();
  }
}
