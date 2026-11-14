import { get, writable } from "svelte/store";
import type { BrowserApplicationServices } from "./browser";
import type { Wait } from "../../types";
import { HomeFailure } from "../home/api";
import { messageIdentity } from "../home/model";
import { AUTH_REQUEST_TIMEOUT, type AuthClock } from "../auth/owner";
import { createAgentLease } from "../agents/lease";
export type InboxBinding = { account: string; revision: number; generation: number };
/** Global Inbox presentation owns no canonical waits. Every callback belongs to
 * one account/opening, including the interval before outgoing DOM is flushed. */
export function createApplicationInbox(services: Pick<BrowserApplicationServices, "active" | "state" | "personal" | "actions">, clock?: AuthClock) {
  const state = writable<{ binding: InboxBinding | null; all: boolean }>({ binding: null, all: false });
  let active = true, generation = 0, pending = false;
  const writer = createAgentLease(clock ? { ...clock, now: () => Date.now() } : undefined);
  const owns = (binding: InboxBinding) => {
    const account = get(services.personal.state);
    return active && services.active() && get(state).binding === binding && account.identityRevision === binding.revision && account.me?.email === binding.account;
  };
  function close(expected?: InboxBinding) {
    if (expected && get(state).binding !== expected) return;
    generation++; writer.cancel(); pending = false;
    state.update(value => ({ ...value, binding: null }));
  }
  const stopPersonal = services.personal.state.subscribe(value => {
    const binding = get(state).binding;
    if (binding && (value.identityRevision !== binding.revision || value.me?.email !== binding.account)) close(binding);
  });
  let navigation = get(services.state).navigationGeneration;
  const stopRoute = services.state.subscribe(value => {
    if (navigation !== value.navigationGeneration || value.sessionDenied || value.lifecycle === "disposed") close();
    navigation = value.navigationGeneration;
  });
  const canonical = (wait: Wait) => services.personal.peek()?.waits.some(value => value.book_id === wait.book_id && value.ref === wait.ref && value.thread === wait.thread && value.author === wait.author);
  return {
    state, owns,
    open() {
      if (!active || !services.active()) return;
      const data = get(services.personal.state); if (!data.me) return;
      close(); state.update(value => ({ ...value, binding: { account: data.me!.email, revision: data.identityRevision, generation: ++generation } }));
    },
    close,
    tab(binding: InboxBinding, all: boolean) { if (owns(binding)) state.update(value => ({ ...value, all })); },
    openWait(binding: InboxBinding, wait: Wait) {
      if (!owns(binding) || !canonical(wait)) return;
      close(binding);
      services.actions.navigate({ roomId: wait.book_id, thread: wait.thread, messageId: /^[mab]/.test(wait.ref) ? messageIdentity(wait.ref.slice(1)) : undefined });
    },
    async resolve(binding: InboxBinding, wait: Wait) {
      if (!owns(binding) || pending || !canonical(wait) || !wait.ref.startsWith("m")) return;
      pending = true;
      try {
        await writer.run(signal => services.personal.api.resolve(wait.book_id, wait.ref, signal), AUTH_REQUEST_TIMEOUT);
        if (!owns(binding)) return;
        services.personal.invalidate(); void services.personal.refresh();
      } catch (error) {
        if (!owns(binding)) return;
        if (error instanceof HomeFailure && error.status === 401) services.actions.sessionLost();
        else throw error;
      } finally { if (owns(binding)) pending = false; }
    },
    dispose() { if (!active) return; active = false; stopPersonal(); stopRoute(); writer.cancel(); pending = false; state.update(value => ({ ...value, binding: null })); },
  };
}
