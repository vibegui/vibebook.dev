import { createAppPinOwner } from "./pin";
import { get, writable } from "svelte/store";
import type { RequestRoomCommand } from "../../roomConnection";
import type { Room } from "../../../shared/room";
import type { Connection } from "../../../shared/schemas";
import { createAuthOwner, authClock, type AuthClock } from "../auth/owner";
import { AppsFailure, type AppsApi } from "./api";
import { appIdentity, signinUrl, type AppTarget } from "./model";
export function createAppsSession(
  api: AppsApi,
  options: {
    current(): boolean;
    navigate(url: string): void;
    changed?(): void;
    denied?(): void;
  },
  clock: AuthClock = authClock,
) {
  const state = writable<{
    room: Room | null;
    denied: boolean;
    connections: Connection[] | null;
    loading: boolean;
    error: string;
    form: boolean;
    url: string;
    scope: "me" | "room";
    pending: boolean;
    unconfirmed: boolean;
    target: AppTarget | null;
    frameRevision: number;
    more: ReadonlySet<string>;
  }>({
    room: null,
    denied: false,
    connections: null,
    loading: false,
    error: "",
    form: false,
    url: "",
    scope: "me",
    pending: false,
    unconfirmed: false,
    target: null,
    frameRevision: 0,
    more: new Set(),
  });
  const reads = createAuthOwner(clock),
    writes = createAuthOwner(clock),
    files = createAuthOwner(clock);
  let active = true,
    denied = false,
    filesRequested = false,
    generation = 0;
  const current = () => {
    const room = get(state).room;
    return active && options.current() && !!room?.members.includes(room.me);
  };
  const pin = createAppPinOwner(current, clock);
  function revoke() {
    if (!active || denied) return;
    denied = true;
    pin.dispose();
    generation++;
    reads.cancel();
    writes.cancel();
    files.cancel();
    state.set({
      ...get(state),
      room: null,
      denied: true,
      connections: null,
      target: null,
      url: "",
      form: false,
      pending: false,
      unconfirmed: false,
      loading: false,
      error: "",
    });
    options.denied?.();
  }
  function load() {
    if (!current()) return;
    reads.cancel();
    const ticket = generation;
    state.update((s) => ({ ...s, loading: true, error: "" }));
    void reads.run(
      (signal) => api.list(signal),
      (result) => {
        if (!current() || ticket !== generation) return;
        state.update((s) => ({
          ...s,
          loading: false,
          connections: result.connections,
          error: "",
        }));
        options.changed?.();
      },
      (error) => {
        if (error instanceof AppsFailure && error.accessDenied) {
          revoke();
          return;
        }
        if (current() && ticket === generation)
          state.update((s) => ({
            ...s,
            loading: false,
            error:
              error instanceof Error ? error.message : "Connection read failed",
          }));
      },
    );
  }
  function mutate<T>(
    run: (signal: AbortSignal) => Promise<T>,
    success?: (value: T) => void,
  ) {
    if (!current() || get(state).pending || get(state).unconfirmed) return;
    const ticket = generation;
    state.update((s) => ({ ...s, pending: true, error: "" }));
    void writes.run(
      run,
      (value) => {
        if (!current() || ticket !== generation) return;
        state.update((s) => ({ ...s, pending: false, error: "" }));
        success?.(value);
        load();
      },
      (error) => {
        if (!current() || ticket !== generation) return;
        if (error instanceof AppsFailure && error.accessDenied) {
          revoke();
          return;
        }
        const uncertain =
          !(error instanceof AppsFailure) || error.status >= 500;
        state.update((s) => ({
          ...s,
          pending: false,
          unconfirmed: uncertain,
          error:
            error instanceof Error ? error.message : "Connection change failed",
        }));
      },
    );
  }
  return {
    state,
    current,
    revoke,
    pin,
    ownsTarget: (target: AppTarget, revision: number) =>
      current() &&
      get(state).target === target &&
      get(state).frameRevision === revision,
    loadFiles(request: RequestRoomCommand, retry = false) {
      if (!current() || get(state).room?.filesAll || (filesRequested && !retry))
        return;
      files.cancel();
      filesRequested = true;
      const ticket = generation;
      void files.run(
        () => request({ t: "files.get" }),
        (result) => {
          if (!current() || ticket !== generation) return;
          if (!result.ok || !get(state).room?.filesAll)
            state.update((s) => ({
              ...s,
              error: result.ok
                ? "Room app files are unconfirmed. Refresh to check again."
                : result.error,
            }));
        },
        () => {
          if (current() && ticket === generation)
            state.update((s) => ({
              ...s,
              error: "Room app files are unconfirmed. Refresh to check again.",
            }));
        },
      );
    },
    connectionCount: () => get(state).connections?.length || 0,
    sync(room: Room, freshSnapshot = false) {
      if (!active || denied) return;
      if (freshSnapshot) filesRequested = false;
      const previous = get(state).room;
      if (previous && (previous.id !== room.id || previous.me !== room.me))
        throw Error("Apps session cannot change account/room");
      if (!room.members.includes(room.me)) {
        revoke();
        return;
      }
      state.update((s) => ({ ...s, room }));
      pin.sync(room);
    },
    load,
    form(open: boolean) {
      if (current()) state.update((s) => ({ ...s, form: open }));
    },
    draft(url: string, scope: "me" | "room") {
      if (current()) state.update((s) => ({ ...s, url, scope }));
    },
    connect() {
      const value = get(state);
      mutate(
        (signal) => api.create(value.url.trim(), value.scope, signal),
        (result) => {
          const room = get(state).room;
          if (result.connection?.needs_sign_in && room)
            options.navigate(signinUrl(room.id, result.connection.id));
          else state.update((s) => ({ ...s, form: false, url: "" }));
        },
      );
    },
    refresh: (cid: string) => mutate((signal) => api.refresh(cid, signal)),
    remove: (cid: string) => {
      if (
        get(state).connections?.some(
          (connection) => connection.id === cid && connection.mine,
        )
      )
        mutate(
          (signal) => api.remove(cid, signal),
          () => {
            state.update((s) => ({
              ...s,
              target: s.target?.connection === cid ? null : s.target,
            }));
          },
        );
    },
    signout: (cid: string) =>
      mutate(
        (signal) => api.signout(cid, signal),
        () => {
          state.update((s) => ({
            ...s,
            target: s.target?.connection === cid ? null : s.target,
          }));
        },
      ),
    review() {
      if (!current()) return;
      state.update((s) => ({ ...s, unconfirmed: false, error: "" }));
      load();
    },
    open(target: AppTarget) {
      if (!current()) return;
      const value = get(state);
      if (!value.room) return;
      const known =
        value.connections && appIdentity(value.room, value.connections, target);
      state.update((s) => ({
        ...s,
        target: { ...target },
        frameRevision: s.frameRevision + 1,
      }));
      if (!known) load();
    },
    back() {
      if (current())
        state.update((s) => ({
          ...s,
          target: null,
          frameRevision: s.frameRevision + 1,
        }));
    },
    reload() {
      if (current())
        state.update((s) => ({ ...s, frameRevision: s.frameRevision + 1 }));
    },
    more(cid: string) {
      if (current())
        state.update((s) => {
          const more = new Set(s.more);
          more.has(cid) ? more.delete(cid) : more.add(cid);
          return { ...s, more };
        });
    },
    dispose() {
      if (!active) return;
      active = false;
      pin.dispose();
      generation++;
      reads.dispose();
      writes.dispose();
      files.dispose();
      state.set({
        room: null,
        denied: false,
        connections: null,
        loading: false,
        error: "",
        form: false,
        url: "",
        scope: "me",
        pending: false,
        unconfirmed: false,
        target: null,
        frameRevision: 0,
        more: new Set(),
      });
    },
  };
}
export type AppsSession = ReturnType<typeof createAppsSession>;
