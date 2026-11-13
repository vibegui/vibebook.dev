import { get, writable } from "svelte/store";
import type { SearchResult } from "../../../shared/schemas";
import type { PersonalSession } from "../home/personal";
import {
  roomMatches,
  messageTarget,
  epicTarget,
  targetHref,
  type RoomTarget,
} from "../home/model";
import { authClock, createAuthOwner, type AuthClock } from "../auth/owner";
export function createSearchSession(
  personal: PersonalSession,
  navigate: (target: RoomTarget) => void,
  clock: AuthClock = authClock,
) {
  const state = writable({
    open: false,
    query: "",
    selected: 0,
    result: null as SearchResult | null,
    loading: false,
    error: "",
  });
  let owner = createAuthOwner(clock),
    timer: unknown | null = null,
    active = true;
  const cancel = () => {
    if (timer !== null) clock.cancel(timer);
    timer = null;
    owner.cancel();
  };
  let identityRevision = get(personal.state).identityRevision;
  const stopIdentity = personal.state.subscribe(value => {
    if (value.identityRevision === identityRevision) return;
    identityRevision = value.identityRevision;
    cancel();
    owner.dispose();
    state.set({ open: false, query: "", selected: 0, result: null, loading: false, error: "" });
  });
  const targets = () => {
    const s = get(state),
      me = get(personal.state).me;
    return [
      ...roomMatches(me?.books ?? [], s.query).map((room) => ({
        roomId: room.id,
      })),
      ...(s.result?.epics ?? []).map(epicTarget),
      ...(s.result?.messages ?? []).map(messageTarget),
    ];
  };
  return {
    state,
    targets,
    open() {
      if (!active) return;
      cancel();
      owner.dispose();
      owner = createAuthOwner(clock);
      state.set({
        open: true,
        query: "",
        selected: 0,
        result: null,
        loading: false,
        error: "",
      });
    },
    close() {
      cancel();
      owner.dispose();
      state.update((s) => ({ ...s, open: false, loading: false }));
    },
    edit(query: string) {
      if (!active || !get(state).open) return;
      cancel();
      state.update((s) => ({
        ...s,
        query,
        selected: 0,
        result: null,
        loading: query.trim().length >= 2,
        error: "",
      }));
      const submitted = query.trim();
      if (submitted.length < 2) return;
      timer = clock.schedule(() => {
        timer = null;
        void owner.run(
          (signal) => personal.api.search(submitted, signal),
          (result) =>
            state.update((s) => ({
              ...s,
              result,
              loading: false,
              selected: 0,
            })),
          (error) =>
            state.update((s) => ({
              ...s,
              loading: false,
              error: error instanceof Error ? error.message : "network",
            })),
        );
      }, 250);
    },
    move(delta: number) {
      const count = targets().length;
      if (count)
        state.update((s) => ({
          ...s,
          selected: (s.selected + delta + count) % count,
        }));
    },
    select(index: number) {
      if (index >= 0 && index < targets().length)
        state.update((s) => ({ ...s, selected: index }));
    },
    activateTarget(target: RoomTarget) {
      if (
        !active ||
        !get(state).open ||
        !targets().some((current) => targetHref(current) === targetHref(target))
      )
        return;
      this.close();
      navigate(target);
    },
    activate(index = get(state).selected) {
      const target = targets()[index];
      if (target) this.activateTarget(target);
    },
    dispose() {
      stopIdentity();
      active = false;
      cancel();
      owner.dispose();
    },
  };
}
export type SearchSession = ReturnType<typeof createSearchSession>;
