import { get, writable } from "svelte/store";
import type { AgentGrantsResult, MeResult } from "../../../shared/schemas";
import type { HomeApi } from "./api";
import { HomeFailure } from "./api";
import { authClock, createAuthOwner, type AuthClock } from "../auth/owner";
export type PersonalInvalidation =
  { kind: "account" } | { kind: "agents"; book?: string };
/** Account cache survives page changes. Page activation owns drafts' async effects, never the canonical cache. */
export function createPersonalSession(
  api: HomeApi,
  options: {
    clock?: AuthClock;
    onIdentityChange?: () => void;
    onUnauthorized?: () => void;
    onVersion?: (version: string) => void;
  } = {},
) {
  const clock = options.clock ?? authClock;
  const state = writable({
    me: null as MeResult | null,
    agents: null as AgentGrantsResult | null,
    loading: false,
    error: "",
    updateAvailable: false,
    identityRevision: 0,
    now: Date.now(),
    seen: {} as Record<string, number>,
  });
  const draft = writable({
    ask: "",
    create: "",
    unknown: null as null | { roomId: string; names: string[] },
  });
  let identity: string | null = null;
  let active = true,
    inflight = false,
    dirty = false,
    epoch = 0,
    request = 0,
    controller: AbortController | null = null,
    deadline: unknown | null = null,
    refreshTimer: unknown | null = null,
    clockTimer: unknown | null = null;
  const agentsOwner = createAuthOwner(clock);
  let agentsPromise: Promise<boolean> | undefined;
  let agentsInflight = false,
    agentsDirty = false,
    agentsEpoch = 0,
    agentsRequest = 0;
  let agentsTimer: unknown | null = null;
  const clear = (handle: unknown | null) => {
    if (handle !== null) clock.cancel(handle);
  };
  function acceptIdentity(email: string, fromRoom = true) {
    if (!active || identity === email) return false;
    const changed = identity !== null;
    identity = email;
    agentsOwner.cancel();
    agentsRequest++;
    agentsEpoch++;
    agentsInflight = agentsDirty = false;
    agentsPromise = undefined;
    clear(agentsTimer);
    agentsTimer = null;
    // The first authenticated room state also fences a Me request whose account
    // was unknown when it began. A later result may belong to a replaced cookie.
    if (changed || (fromRoom && inflight)) {
      epoch++;
      request++;
      inflight = false;
      dirty = false;
      controller?.abort();
      controller = null;
      clear(deadline);
      clear(refreshTimer);
      deadline = refreshTimer = null;
    }
    if (changed) {
      draft.set({ ask: "", create: "", unknown: null });
      state.update((s) => ({
        ...s,
        me: null,
        identityRevision: s.identityRevision + 1,
        seen: {},
        agents: null,
        loading: false,
        error: "",
      }));
      options.onIdentityChange?.();
    } else state.update((s) => ({ ...s, agents: null }));
    if (fromRoom) void refresh();
    return changed;
  }
  function tick() {
    clear(clockTimer);
    if (!active) return;
    state.update((s) => ({ ...s, now: Date.now() }));
    const now = Date.now(),
      next = Math.min(
        60_000,
        ...(get(state).me?.books ?? [])
          .map((room) => (room.busy_until ?? 0) - now)
          .filter((ms) => ms > 0),
      );
    clockTimer = clock.schedule(tick, Math.max(100, next));
  }
  function invalidated() {
    if (!active) return;
    epoch++;
    dirty = true;
    if (refreshTimer === null)
      refreshTimer = clock.schedule(() => {
        refreshTimer = null;
        void refresh();
      }, 600);
  }
  async function refresh() {
    if (!active) return;
    if (inflight) return;
    clear(refreshTimer);
    refreshTimer = null;
    inflight = true;
    dirty = false;
    const ticket = ++request,
      started = epoch;
    controller = new AbortController();
    const signal = controller.signal;
    state.update((s) => ({ ...s, loading: true, error: "" }));
    deadline = clock.schedule(() => {
      if (!active || ticket !== request) return;
      request++;
      inflight = false;
      controller?.abort();
      controller = null;
      deadline = null;
      state.update((s) => ({ ...s, loading: false, error: "unconfirmed" }));
    }, 20_000);
    try {
      const me = await api.me(signal);
      if (!active || ticket !== request) return;
      if (started === epoch) {
        acceptIdentity(me.email, false);
        state.update((s) => ({ ...s, me, loading: false, error: "" }));
        options.onVersion?.(me.v);
        tick();
      }
    } catch (error) {
      if (active && ticket === request) {
        state.update((s) => ({
          ...s,
          loading: false,
          error: error instanceof Error ? error.message : "network",
        }));
        if (error instanceof HomeFailure && error.status === 401)
          options.onUnauthorized?.();
      }
    } finally {
      if (active && ticket === request) {
        clear(deadline);
        deadline = null;
        controller = null;
        inflight = false;
        if (dirty || started !== epoch) void refresh();
      }
    }
  }
  function readAgents() {
    if (!active) return;
    if (agentsInflight) return agentsPromise;
    clear(agentsTimer);
    agentsTimer = null;
    agentsInflight = true;
    agentsDirty = false;
    const ticket = ++agentsRequest,
      started = agentsEpoch;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      if (!active || ticket !== agentsRequest) return;
      agentsInflight = false;
      if (agentsDirty || started !== agentsEpoch) void readAgents();
    };
    const job = agentsOwner.run(
      (signal) => api.agents(signal),
      (agents) => {
        if (active && ticket === agentsRequest && started === agentsEpoch)
          state.update((s) => ({ ...s, agents }));
        finish();
      },
      finish,
    );
    agentsPromise = job;
    void job.finally(() => {
      if (ticket === agentsRequest) agentsPromise = undefined;
    });
    return job;
  }
  function refreshAgents() {
    if (!active) return;
    agentsEpoch++;
    agentsDirty = true;
    clear(agentsTimer);
    agentsTimer = null;
    return readAgents();
  }
  return {
    state,
    draft,
    api,
    refresh,
    acceptIdentity,
    invalidate: invalidated,
    peek: () => get(state).me,
    updateAvailable(value: boolean) {
      if (active) state.update((s) => ({ ...s, updateAvailable: value }));
    },
    observe(event: PersonalInvalidation) {
      if (!active) return;
      if (event.kind === "account") invalidated();
      else {
        agentsEpoch++;
        agentsDirty = true;
        if (agentsTimer === null)
          agentsTimer = clock.schedule(() => {
            agentsTimer = null;
            void readAgents();
          }, 600);
      }
    },
    refreshAgents,
    loadAgents: readAgents,
    roomMeta(
      roomId: string,
      patch: Partial<
        Pick<MeResult["books"][number], "title" | "folder" | "summary">
      >,
    ) {
      if (!active) return;
      const me = get(state).me,
        room = me?.books.find((value) => value.id === roomId);
      if (
        !me ||
        !room ||
        ((patch.title === undefined || patch.title === room.title) &&
          (patch.folder === undefined || patch.folder === room.folder) &&
          (patch.summary === undefined || patch.summary === room.summary))
      )
        return;
      epoch++;
      state.update((s) => ({
        ...s,
        me: s.me
          ? {
              ...s.me,
              books: s.me.books.map((value) =>
                value.id === roomId
                  ? {
                      ...value,
                      ...(patch.title !== undefined
                        ? { title: patch.title }
                        : {}),
                      ...(patch.folder !== undefined
                        ? { folder: patch.folder }
                        : {}),
                      ...(patch.summary !== undefined
                        ? { summary: patch.summary }
                        : {}),
                    }
                  : value,
              ),
            }
          : null,
      }));
    },
    seen(roomId: string, upto: number) {
      if (active && Number.isSafeInteger(upto) && upto >= 0)
        state.update((s) => ({
          ...s,
          seen: { ...s.seen, [roomId]: Math.max(s.seen[roomId] ?? 0, upto) },
        }));
    },
    editAsk(ask: string) {
      if (active) draft.update((s) => ({ ...s, ask }));
    },
    editCreate(create: string) {
      if (active) draft.update((s) => ({ ...s, create }));
    },
    notice(roomId: string, names: string[]) {
      if (active) draft.update((s) => ({ ...s, unknown: { roomId, names } }));
    },
    clearNotice() {
      if (active) draft.update((s) => ({ ...s, unknown: null }));
    },
    start() {
      if (active) {
        tick();
        void refresh();
      }
    },
    dispose() {
      active = false;
      epoch++;
      request++;
      controller?.abort();
      clear(deadline);
      clear(refreshTimer);
      clear(clockTimer);
      clear(agentsTimer);
      agentsRequest++;
      agentsPromise = undefined;
      agentsOwner.dispose();
    },
  };
}
export type PersonalSession = ReturnType<typeof createPersonalSession>;
