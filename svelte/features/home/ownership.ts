import { get } from "svelte/store";
import { createAuthOwner, type AuthClock } from "../auth/owner";
import type { PersonalSession } from "./personal";
/** A page cannot outlive the account that mounted it, even before its queued unmount. */
export function createAccountPageOwner(
  personal: PersonalSession,
  clock: AuthClock,
  onExpired: () => void,
) {
  const owner = createAuthOwner(clock);
  const revision = get(personal.state).identityRevision;
  let expired = false;
  const stop = personal.state.subscribe((value) => {
    if (!expired && value.identityRevision !== revision) {
      expired = true;
      owner.dispose();
      onExpired();
    }
  });
  return {
    ...owner,
    dispose() {
      stop();
      owner.dispose();
    },
  };
}
