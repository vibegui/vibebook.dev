import { AppsFailure } from "./api";
/** Known membership refusal is scoped to one authenticated Book connection, never inferred from report/metrics errors. */
export function createAppsAuthority(baseCurrent: () => boolean) {
  let active = true,
    denied = false;
  const listeners = new Set<() => void>();
  return {
    denied: () => denied,
    current: () => active && !denied && baseCurrent(),
    deny() {
      if (!active || denied) return;
      denied = true;
      for (const listener of [...listeners]) listener();
    },
    listen(listener: () => void) {
      if (!active || denied) {
        listener();
        return () => {};
      }
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispose() {
      if (!active) return;
      active = false;
      for (const listener of [...listeners]) listener();
      listeners.clear();
    },
  };
}
export type AppsAuthority = ReturnType<typeof createAppsAuthority>;

export function appMembershipFailure(
  authority: Pick<AppsAuthority, "deny">,
  error: unknown,
): never {
  if (error instanceof AppsFailure && error.accessDenied) authority.deny();
  throw error;
}
export function appSessionFailure(
  authority: Pick<AppsAuthority, "deny">,
  error: unknown,
): never {
  if (error instanceof AppsFailure && error.sessionDenied) authority.deny();
  throw error;
}
