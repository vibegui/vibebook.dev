import { get, writable } from "svelte/store";
import type { ArchivedResult, RouteResult } from "../../../shared/schemas";
import type { PersonalSession } from "./personal";
import { destinations, type RoomTarget } from "./model";
import { createAccountPageOwner } from "./ownership";
import { authClock, createAuthOwner, type AuthClock } from "../auth/owner";
const issue = (error: unknown) =>
  error instanceof Error ? error.message : "network";
const roomId = (value: string) => {
  if (!/^[a-z0-9]{6,40}$/.test(value)) throw Error("invalid-response");
  return value;
};
/** Page ownership expires on navigation. The text store belongs to the account and survives remount/refresh. */
export function createHomeSession(
  personal: PersonalSession,
  navigate: (target: RoomTarget) => void,
  clock: AuthClock = authClock,
) {
  const state = writable({
    busy: "" as "" | "route" | "send",
    error: "",
    result: null as RouteResult | null,
    selected: 0,
    source: "",
  });
  const owner = createAccountPageOwner(personal, clock, () => {
    state.set({ busy: "", error: "", result: null, selected: 0, source: "" });
  });
  const failure = (error: unknown) =>
    state.update((s) => ({ ...s, busy: "", error: issue(error) }));
  return {
    state,
    edit(text: string) {
      if (!owner.active()) return;
      personal.editAsk(text);
      if (get(state).busy === "route") owner.cancel();
      state.update((s) => ({
        ...s,
        busy: s.busy === "send" ? "send" : "",
        result: null,
        error: "",
      }));
    },
    suggest() {
      if (!owner.active() || get(state).busy) return;
      const text = get(personal.draft).ask.trim();
      if (!text) return;
      state.update((s) => ({
        ...s,
        busy: "route",
        error: "",
        result: null,
        source: text,
      }));
      return owner.run(
        (signal) => personal.api.route(text, signal),
        (result) =>
          state.update((s) => ({ ...s, busy: "", result, selected: 0 })),
        failure,
      );
    },
    select(selected: number) {
      const s = get(state);
      if (
        owner.active() &&
        s.result &&
        !s.busy &&
        selected >= 0 &&
        selected < destinations(s.result).length
      )
        state.update((v) => ({ ...v, selected }));
    },
    cancel() {
      if (!owner.active() || get(state).busy === "send") return;
      owner.cancel();
      state.update((s) => ({ ...s, busy: "", result: null, error: "" }));
    },
    send() {
      const s = get(state),
        text = get(personal.draft).ask.trim();
      if (!owner.active() || s.busy || !s.result || text !== s.source) return;
      const destination = destinations(s.result)[s.selected];
      if (!destination) return;
      if (
        destination.book_id &&
        !get(personal.state).me?.books.some(
          (room) => room.id === destination.book_id,
        )
      ) {
        failure(Error("unavailable"));
        return;
      }
      state.update((value) => ({ ...value, busy: "send", error: "" }));
      return owner.run(
        async (signal) => {
          if (!destination.book_id) {
            const created = await personal.api.startRoom(text, signal);
            return {
              id: roomId(created.id),
              unknown: created.unknown,
              thread: undefined,
            };
          }
          const posted = await personal.api.post(
            destination.book_id,
            text,
            destination.epic_id ?? "main",
          );
          if (!posted.ok) throw Error(posted.error);
          return {
            id: roomId(destination.book_id),
            unknown: [],
            thread: posted.thread === "main" ? undefined : posted.thread,
          };
        },
        (result) => {
          if (get(personal.draft).ask.trim() === text) personal.editAsk("");
          if (result.unknown.length) personal.notice(result.id, result.unknown);
          navigate({ roomId: result.id, thread: result.thread });
        },
        failure,
      );
    },
    dispose() {
      owner.dispose();
    },
  };
}
export function createNewRoomSession(
  personal: PersonalSession,
  navigate: (target: RoomTarget) => void,
  clock: AuthClock = authClock,
) {
  const state = writable({ open: false, busy: false, error: "" });
  let owner = createAuthOwner(clock),
    active = true;
  let identityRevision = get(personal.state).identityRevision;
  const stopIdentity = personal.state.subscribe((value) => {
    if (value.identityRevision === identityRevision) return;
    identityRevision = value.identityRevision;
    owner.dispose();
    state.set({ open: false, busy: false, error: "" });
  });
  return {
    state,
    open() {
      if (!active || get(state).open) return;
      owner.dispose();
      owner = createAuthOwner(clock);
      state.set({ open: true, busy: false, error: "" });
    },
    edit(text: string) {
      if (get(state).open) personal.editCreate(text);
    },
    close() {
      owner.dispose();
      state.update((s) => ({ ...s, open: false, busy: false }));
    },
    submit() {
      if (!owner.active() || get(state).busy || !get(state).open) return;
      const text = get(personal.draft).create.trim();
      if (!text) {
        state.update((s) => ({ ...s, error: "empty" }));
        return;
      }
      state.update((s) => ({ ...s, busy: true, error: "" }));
      return owner.run(
        (signal) => personal.api.startRoom(text, signal),
        (created) => {
          const id = roomId(created.id);
          if (get(personal.draft).create.trim() === text)
            personal.editCreate("");
          if (created.unknown.length) personal.notice(id, created.unknown);
          state.set({ open: false, busy: false, error: "" });
          navigate({ roomId: id });
        },
        (error) =>
          state.update((s) => ({ ...s, busy: false, error: issue(error) })),
      );
    },
    dispose() {
      stopIdentity();
      active = false;
      owner.dispose();
    },
  };
}
export function createArchivedSession(
  personal: PersonalSession,
  clock: AuthClock = authClock,
) {
  const state = writable({
    books: [] as ArchivedResult["books"],
    loaded: false,
    loading: false,
    pending: null as string | null,
    error: "",
  });
  const reader = createAuthOwner(clock),
    writer = createAuthOwner(clock);
  let active = true,
    sequence = 0,
    timers: unknown[] = [];
  const cancelTimers = () => {
    for (const handle of timers) clock.cancel(handle);
    timers = [];
  };
  const identityRevision = get(personal.state).identityRevision;
  const stopIdentity = personal.state.subscribe((value) => {
    if (!active || value.identityRevision === identityRevision) return;
    active = false;
    sequence++;
    cancelTimers();
    reader.dispose();
    writer.dispose();
    state.set({
      books: [],
      loaded: false,
      loading: false,
      pending: null,
      error: "",
    });
  });
  const failure = (error: unknown) =>
    state.update((s) => ({ ...s, loading: false, error: issue(error) }));
  function accept(result: ArchivedResult) {
    const pending = get(state).pending,
      complete = !!pending && !result.books.some((room) => room.id === pending);
    if (complete) {
      sequence++;
      cancelTimers();
      writer.cancel();
    }
    state.update((s) => ({
      ...s,
      books: result.books,
      loaded: true,
      loading: false,
      ...(complete ? { pending: null, error: "" } : {}),
    }));
  }
  async function load() {
    if (!active) return;
    reader.cancel();
    state.update((s) => ({ ...s, loading: true, error: "" }));
    return reader.run(
      (signal) => personal.api.archived(signal),
      accept,
      failure,
    );
  }
  return {
    state,
    load,
    restore(id: string) {
      if (
        !active ||
        get(state).pending ||
        !get(state).books.some((room) => room.id === id)
      )
        return;
      const ticket = ++sequence;
      cancelTimers();
      state.update((s) => ({ ...s, pending: id, error: "" }));
      return writer.run(
        (signal) => personal.api.archive(id, false, signal),
        () => {
          void personal.refresh();
          const check = async () => {
            if (!active || ticket !== sequence) return;
            reader.cancel();
            await reader.run(
              (signal) => personal.api.archived(signal),
              (result) => {
                if (!active || ticket !== sequence) return;
                accept(result);
              },
              () => {},
            );
          };
          void check();
          for (const ms of [1000, 3000, 6000])
            timers.push(
              clock.schedule(() => {
                void check();
              }, ms),
            );
          timers.push(
            clock.schedule(() => {
              if (active && ticket === sequence && get(state).pending === id) {
                cancelTimers();
                state.update((s) => ({
                  ...s,
                  pending: null,
                  error: "unconfirmed",
                }));
              }
            }, 10_000),
          );
        },
        (error) =>
          state.update((s) => ({ ...s, pending: null, error: issue(error) })),
      );
    },
    dispose() {
      stopIdentity();
      active = false;
      sequence++;
      cancelTimers();
      reader.dispose();
      writer.dispose();
    },
  };
}
export type HomeSession = ReturnType<typeof createHomeSession>;
export type NewRoomSession = ReturnType<typeof createNewRoomSession>;
export type ArchivedSession = ReturnType<typeof createArchivedSession>;
