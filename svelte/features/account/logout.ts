import { get } from "svelte/store";
import type { PersonalSession } from "../home/personal";
export type LogoutIdentity = { email: string; revision: number };
export function personalLogoutIdentity(
  personal: PersonalSession | null,
): LogoutIdentity | null {
  if (!personal) return null;
  const value = get(personal.state);
  return value.me
    ? { email: value.me.email, revision: value.identityRevision }
    : null;
}
/** Fences observed document identity changes only. Cookies can change before a server sees the POST; this is not a server-bound logout intent. */
export function createAccountLogout(options: {
  identity(): LogoutIdentity | null;
  beforeLogout(): Promise<{ confirmed: boolean }>;
  warning(): void;
  post(all: boolean): Promise<{ ok: boolean }>;
  success(all: boolean): void;
  failure(): void;
  reload(): void;
}) {
  let pending = false,
    active = true;
  const run = async (all: boolean) => {
    if (!active || pending) return;
    const identity = options.identity();
    if (!identity) return;
    pending = true;
    const current = () => {
      const next = options.identity();
      return (
        active &&
        next?.email === identity.email &&
        next.revision === identity.revision
      );
    };
    try {
      const cleanup = await options.beforeLogout();
      if (!current()) throw Error("identity-changed");
      if (!cleanup.confirmed) options.warning();
      // A blocking warning can yield control to external session updates.
      if (!current()) throw Error("identity-changed");
      const response = await options.post(all);
      if (!response.ok || !current()) throw Error("logout-unconfirmed");
      options.success(all);
    } catch {
      if (active) {
        options.failure();
        options.reload();
      }
    }
    // Navigation/reload is terminal for this document; repeated clicks never start another cleanup or POST.
  };
  return Object.assign(run, {
    dispose() {
      active = false;
    },
  });
}
