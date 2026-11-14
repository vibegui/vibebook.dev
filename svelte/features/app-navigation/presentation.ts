import { get, writable } from "svelte/store";
import type { AppNavigationSession } from "./controller";
import type { ClientClock } from "../../lib/client/clock";
import { createDeferredModule } from "../deferred-view/module";

export type NavigationDialogIntent = Readonly<{
  kind: "search" | "create" | "settings" | "archive" | "rename";
  account: string;
  identityRevision: number;
  revision: number;
  roomId: string | null;
  trigger: HTMLElement | null;
}>;

/** Public module code may settle after an intent closes; only current canonical intent can render/open UI. */
export function createNavigationPresentation<T>(controller: AppNavigationSession, load: () => Promise<T>, clock?: ClientClock) {
  let active = true, revision = 0;
  let binding: NavigationDialogIntent | null = null;
  let creatorBinding: object | null = null;
  const state = writable<NavigationDialogIntent | null>(null);
  const module = createDeferredModule(load, { current: () => active, clock });
  const identity = () => get(controller.personal.state);
  const owns = (intent: NavigationDialogIntent) => {
    const value = identity();
    return active && binding === intent && value.me?.email === intent.account && value.identityRevision === intent.identityRevision;
  };
  const sync = () => {
    if (!active) return;
    const person = identity(), search = get(controller.search.state), creator = get(controller.creator.state), nav = get(controller.state);
    const kind = search.open ? "search" : creator.open && !creator.inline && creator.binding ? "create" : nav.settingsId ? "settings" : nav.archiveId ? "archive" : nav.renameId ? "rename" : null;
    const roomId = kind === "settings" ? nav.settingsId : kind === "archive" ? nav.archiveId : kind === "rename" ? nav.renameId : null;
    const nextCreator = kind === "create" ? creator.binding : null;
    if (!person.me || !kind) { binding = null; creatorBinding = null; state.set(null); return; }
    if (binding?.kind === kind && binding.roomId === roomId && binding.account === person.me.email && binding.identityRevision === person.identityRevision && creatorBinding === nextCreator) return;
    creatorBinding = nextCreator;
    binding = Object.freeze({ kind, account: person.me.email, identityRevision: person.identityRevision, revision: ++revision, roomId, trigger: controller.returnFocus(null) });
    state.set(binding);
    if (active && binding) void module.ensure();
  };
  const stops = [controller.personal.state.subscribe(sync), controller.search.state.subscribe(sync), controller.creator.state.subscribe(sync), controller.state.subscribe(sync)];
  return {
    state, module, owns,
    close(intent: NavigationDialogIntent) {
      if (!owns(intent)) return;
      if (intent.kind === "search") controller.search.close();
      else if (intent.kind === "create") controller.creator.close();
      else controller.closeSettings();
    },
    returnFocus(intent: NavigationDialogIntent, fallback: HTMLElement | null) {
      const person = identity();
      return active && (!binding || binding === intent) && person.me?.email === intent.account && person.identityRevision === intent.identityRevision ? intent.trigger?.isConnected ? intent.trigger : fallback : null;
    },
    dispose() { active = false; binding = null; creatorBinding = null; for (const stop of stops) stop(); state.set(null); module.dispose(); },
  };
}
