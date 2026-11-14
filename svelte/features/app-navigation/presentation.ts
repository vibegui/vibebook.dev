import { get, writable, type Readable } from "svelte/store";
import type { AppNavigationSession } from "./controller";
import type { ClientClock } from "../../lib/client/clock";
import { createDeferredModule } from "../deferred-view/module";
export type NavigationDialogKind = "search" | "create" | "settings" | "archive" | "rename";
export type NavigationDialogIntent = Readonly<{
  kind: NavigationDialogKind;
  account: string;
  identityRevision: number;
  revision: number;
  roomId: string | null;
  scopeRoomId: string | null;
  trigger: HTMLElement | null;
}>;
export type NavigationDialogBindings = Readonly<Record<NavigationDialogKind, NavigationDialogIntent | null>>;
export type NavigationDialogOwners = {
  bindings: Readable<NavigationDialogBindings>;
  owns(intent: NavigationDialogIntent): boolean;
  close(intent: NavigationDialogIntent): void;
  returnFocus(intent: NavigationDialogIntent, fallback: HTMLElement | null): HTMLElement | null;
};
const kinds: NavigationDialogKind[] = ["settings", "archive", "rename", "create", "search"];
const empty = (): NavigationDialogBindings => ({ search: null, create: null, settings: null, archive: null, rename: null });
/** Module lifetime is shared public code; each concurrent canonical opening has its own identity. */
export function createNavigationPresentation<T>(controller: AppNavigationSession, load: () => Promise<T>, clock?: ClientClock) {
  let active = true, revision = 0, values = empty();
  let creatorBinding: object | null = null;
  const closedAt = new WeakMap<NavigationDialogIntent, number>();
  const bindings = writable(values), state = writable<NavigationDialogIntent | null>(null);
  const module = createDeferredModule(load, { current: () => active, clock });
  const identity = () => get(controller.personal.state);
  const owns = (intent: NavigationDialogIntent) => {
    const person = identity();
    return active && values[intent.kind] === intent && person.me?.email === intent.account && person.identityRevision === intent.identityRevision && get(controller.state).roomId === intent.scopeRoomId;
  };
  const sync = () => {
    if (!active) return;
    const person = identity(), search = get(controller.search.state), creator = get(controller.creator.state), nav = get(controller.state);
    const open = { search: search.open, create: creator.open && !creator.inline && !!creator.binding, settings: !!nav.settingsId, archive: !!nav.archiveId, rename: !!nav.renameId };
    const next = { ...values };
    let changed = false;
    for (const kind of kinds) {
      const previous = values[kind];
      const roomId = kind === "settings" ? nav.settingsId : kind === "archive" ? nav.archiveId : kind === "rename" ? nav.renameId : null;
      const same = previous && open[kind] && person.me?.email === previous.account && previous.identityRevision === person.identityRevision && previous.scopeRoomId === nav.roomId && previous.roomId === roomId && (kind !== "create" || creatorBinding === creator.binding);
      if (same || (!previous && (!open[kind] || !person.me))) continue;
      // Record closure before any replacement gets a newer revision: an old callback
      // must not return focus after a newer opening, even if that opening also closes.
      if (previous) closedAt.set(previous, revision);
      next[kind] = person.me && open[kind] ? Object.freeze({ kind, account: person.me.email, identityRevision: person.identityRevision, revision: ++revision, roomId, scopeRoomId: nav.roomId, trigger: controller.returnFocus(null) }) : null;
      changed = true;
    }
    creatorBinding = open.create ? creator.binding : null;
    if (!changed) return;
    values = Object.freeze(next);
    const published = values;
    bindings.set(published);
    if (!active || values !== published) return;
    const newest = Object.values(values).filter((value): value is NavigationDialogIntent => value !== null).sort((a, b) => a.revision - b.revision).at(-1) ?? null;
    if (get(state) !== newest) state.set(newest);
    if (active && Object.values(values).some(Boolean)) void module.ensure();
  };
  const stops = [controller.personal.state.subscribe(sync), controller.search.state.subscribe(sync), controller.creator.state.subscribe(sync), controller.state.subscribe(sync)];
  return {
    state, bindings, module, owns,
    close(intent: NavigationDialogIntent) {
      if (!owns(intent)) return;
      if (intent.kind === "search") controller.search.close();
      else if (intent.kind === "create") controller.creator.close();
      else controller.closeSettings();
    },
    returnFocus(intent: NavigationDialogIntent, fallback: HTMLElement | null) {
      const person = identity(), epoch = values[intent.kind] === intent ? revision : closedAt.get(intent);
      return active && epoch === revision && !Object.values(values).some(value => value && value.revision > intent.revision) && person.me?.email === intent.account && person.identityRevision === intent.identityRevision && get(controller.state).roomId === intent.scopeRoomId ? intent.trigger?.isConnected ? intent.trigger : fallback : null;
    },
    dispose() { active = false; values = empty(); creatorBinding = null; for (const stop of stops) stop(); bindings.set(values); state.set(null); module.dispose(); },
  };
}
