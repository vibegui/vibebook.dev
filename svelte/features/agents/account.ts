import { agentIdentityRead } from "./authority";
import { get, writable } from "svelte/store";
import type { AgentGrantsResult } from "../../../shared/schemas";
import {
  createAgentsApi,
  AgentsFailure,
  agentsUnauthenticated,
  type AgentsApi,
} from "./api";
import {
  createAgentLease,
  agentClock,
  AgentLeaseFailure,
  type AgentClock,
} from "./lease";
import {
  AGENT_REQUEST_TIMEOUT,
  CONNECT_POLL,
  CONNECT_POLL_LIMIT,
  type AgentPhase,
} from "./model";
export type AgentAccountState = {
  grants: AgentGrantsResult | null;
  loading: boolean;
  readError: string;
  phase: AgentPhase;
  error: string;
};
const blank = (): AgentAccountState => ({
  grants: null,
  loading: false,
  readError: "",
  phase: "idle",
  error: "",
});
/** Account-owned, non-secret grant metadata. Component teardown never grants a late request a new identity. */
export function createAgentAccountSession(
  account: string,
  options: {
    api?: AgentsApi;
    clock?: AgentClock;
    onChanged?: () => void;
    onUnauthorized?: () => void;
    onIdentityProved?: () => void;
  } = {},
) {
  const api = options.api ?? createAgentsApi(),
    clock = options.clock ?? agentClock,
    state = writable<AgentAccountState>(blank()),
    reader = createAgentLease(clock),
    writer = createAgentLease(clock);
  let active = true,
    denied = false,
    identityRequired = false,
    watchers = 0,
    polls = 0,
    readTicket = 0,
    mutation = 0,
    readPromise: Promise<void> | null = null,
    timer: unknown | null = null;
  let pending: { ids: string[]; ack: boolean } | null = null;
  const clearTimer = () => {
    if (timer !== null) clock.cancel(timer);
    timer = null;
  };
  const current = () => active && !denied;
  function deny() {
    denied = true;
    identityRequired = true;
    readTicket++;
    reader.cancel();
    readPromise = null;
    mutation++;
    pending = null;
    writer.cancel();
    clearTimer();
    state.set({ ...blank(), readError: "read-failed" });
  }
  function settle() {
    const grants = get(state).grants;
    if (
      !pending ||
      !grants ||
      !pending.ids.every(
        (id) => !grants.agents.some((grant) => grant.id === id),
      )
    )
      return;
    // Current canonical absence is sufficient to stop a repeated revoke; it does not claim who removed the grants.
    pending = null;
    state.update((value) => ({ ...value, phase: "idle", error: "" }));
  }
  function schedule() {
    clearTimer();
    const grants = get(state).grants;
    if (
      active &&
      watchers &&
      grants &&
      !grants.agents.length &&
      polls < CONNECT_POLL_LIMIT
    )
      timer = clock.schedule(() => {
        timer = null;
        polls++;
        void refresh();
      }, CONNECT_POLL);
  }
  function refresh(force = false): Promise<void> {
    if (!active) return Promise.resolve();
    if (readPromise && !force) return readPromise;
    if (force) {
      readTicket++;
      reader.cancel();
      readPromise = null;
    }
    clearTimer();
    const ticket = ++readTicket,
      provingIdentity = identityRequired;
    state.update((value) => ({ ...value, loading: true, readError: "" }));
    const job = reader
      .run(
        (signal) =>
          agentIdentityRead(api, account, signal, identityRequired, () =>
            api.grants(signal),
          ),
        AGENT_REQUEST_TIMEOUT,
      )
      .then(
        (grants) => {
          if (!active || ticket !== readTicket) return;
          if (provingIdentity) options.onIdentityProved?.();
          denied = false;
          identityRequired = false;
          state.update((value) => ({
            ...value,
            grants,
            loading: false,
            readError: "",
          }));
          settle();
          schedule();
        },
        (error: unknown) => {
          if (!active || ticket !== readTicket) return;
          if (agentsUnauthenticated(error)) {
            deny();
            options.onUnauthorized?.();
          }
          state.update((value) => ({
            ...value,
            loading: false,
            readError:
              error instanceof AgentLeaseFailure && error.code === "cancelled"
                ? ""
                : "read-failed",
          }));
        },
      )
      .finally(() => {
        if (ticket === readTicket) readPromise = null;
      });
    readPromise = job;
    return job;
  }
  return {
    account,
    state,
    current,
    deny,
    refresh,
    watch() {
      if (!active) return () => {};
      if (!watchers) polls = 0;
      watchers++;
      void refresh();
      let attached = true;
      return () => {
        if (!attached) return;
        attached = false;
        watchers = Math.max(0, watchers - 1);
        if (!watchers) {
          clearTimer();
          if (!pending) {
            readTicket++;
            reader.cancel();
            readPromise = null;
            state.update((value) => ({ ...value, loading: false }));
          }
        }
      };
    },
    async revoke(ids: readonly string[]) {
      const grants = get(state).grants;
      if (!current() || pending || !grants || !ids.length) return;
      const selected = [...new Set(ids)];
      if (
        !selected.every((id) => grants.agents.some((grant) => grant.id === id))
      )
        return;
      const ticket = ++mutation,
        op = { ids: selected, ack: false };
      pending = op;
      state.update((value) => ({ ...value, phase: "pending", error: "" }));
      try {
        await writer.run(
          (signal) => api.revoke(selected, signal),
          AGENT_REQUEST_TIMEOUT,
        );
        if (!active || ticket !== mutation || pending !== op) return;
        op.ack = true;
        options.onChanged?.();
        await refresh(true);
        if (active && pending === op)
          state.update((value) => ({
            ...value,
            phase: "unconfirmed",
            error: "canonical-unconfirmed",
          }));
      } catch (error) {
        if (!active || ticket !== mutation || pending !== op) return;
        if (agentsUnauthenticated(error)) {
          deny();
          options.onUnauthorized?.();
          return;
        }
        const definite =
          error instanceof AgentsFailure &&
          [400, 401, 403, 429].includes(error.status);
        if (definite) pending = null;
        state.update((value) => ({
          ...value,
          phase: definite ? "error" : "unconfirmed",
          error: definite ? "revoke-failed" : "unconfirmed",
        }));
        if (!definite) await refresh();
      }
    },
    review() {
      if (!active || get(state).phase !== "unconfirmed") return;
      mutation++;
      pending = null;
      writer.cancel();
      state.update((value) => ({ ...value, phase: "idle", error: "" }));
    },
    dispose() {
      active = false;
      watchers = 0;
      readTicket++;
      mutation++;
      pending = null;
      clearTimer();
      reader.cancel();
      writer.cancel();
      readPromise = null;
      state.set(blank());
    },
  };
}
export type AgentAccountSession = ReturnType<typeof createAgentAccountSession>;
