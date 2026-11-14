import { get, writable } from "svelte/store";
import {
  AgentsFailure,
  agentsUnauthenticated,
  type AgentsApi,
} from "../agents/api";
import { createAgentLease, agentClock, type AgentClock } from "../agents/lease";
import { AGENT_REQUEST_TIMEOUT, type AgentPhase } from "../agents/model";
export type CredentialAction = "key" | "token" | "remove-key" | "remove-token";
export type CredentialState = {
  connected: boolean | null;
  claude: boolean | null;
  phase: AgentPhase;
  action: CredentialAction | null;
  error: string;
  notice: string;
};
const blank = (): CredentialState => ({
  connected: null,
  claude: null,
  phase: "idle",
  action: null,
  error: "",
  notice: "",
});
/** One account owns these two credentials across rooms. No input credential is stored in this state or operation record. */
export function createSandboxCredentials(
  account: string,
  api: AgentsApi,
  options: {
    clock?: AgentClock;
    onChanged?: () => void;
    onUnauthorized?: () => void;
  } = {},
) {
  const clock = options.clock ?? agentClock,
    lease = createAgentLease(clock),
    state = writable<CredentialState>(blank());
  let active = true,
    denied = false,
    sequence = 0,
    pending: { kind: CredentialAction; ack: boolean; ticket: number } | null =
      null,
    wait: unknown | null = null;
  function clearWait() {
    if (wait !== null) clock.cancel(wait);
    wait = null;
  }
  function settle() {
    if (!pending) return;
    const value = get(state),
      removing = pending.kind.startsWith("remove-"),
      present = pending.kind.endsWith("key") ? value.connected : value.claude;
    if (
      !pending.ack ||
      present === null ||
      (removing && present) ||
      (!removing && !present)
    )
      return;
    const notice = pending.ack ? (removing ? "removed" : "saved") : "current";
    pending = null;
    clearWait();
    state.update((current) => ({
      ...current,
      phase: "idle",
      action: null,
      error: "",
      notice,
    }));
  }
  function deny() {
    denied = true;
    sequence++;
    pending = null;
    clearWait();
    lease.cancel();
    state.set(blank());
  }
  return {
    account,
    state,
    deny,
    authorize() {
      if (active) denied = false;
    },
    current: () => active && !denied,
    sync(connected: boolean, claude: boolean) {
      if (!active) return;
      state.update((value) =>
        value.connected === connected && value.claude === claude
          ? value
          : { ...value, connected, claude },
      );
      settle();
    },
    async write(kind: CredentialAction, input = "") {
      if (!active || denied || pending) return;
      const op = { kind, ack: false, ticket: ++sequence };
      pending = op;
      state.update((value) => ({
        ...value,
        phase: "pending",
        action: kind,
        error: "",
        notice: "",
      }));
      try {
        await lease.run(
          (signal) =>
            kind === "key"
              ? api.saveKey(input, signal)
              : kind === "token"
                ? api.saveToken(input, signal)
                : kind === "remove-key"
                  ? api.removeKey(signal)
                  : api.removeToken(signal),
          AGENT_REQUEST_TIMEOUT,
        );
        if (!active || pending !== op || sequence !== op.ticket) return;
        op.ack = true;
        options.onChanged?.();
        settle();
        if (pending === op)
          wait = clock.schedule(() => {
            wait = null;
            if (active && pending === op)
              state.update((value) => ({
                ...value,
                phase: "unconfirmed",
                error: "unconfirmed",
              }));
          }, 10_000);
      } catch (error) {
        if (!active || pending !== op || sequence !== op.ticket) return;
        if (agentsUnauthenticated(error)) {
          deny();
          options.onUnauthorized?.();
          return;
        }
        // These routes return 400/429/401/403 only before saveSecret/delete executes. External storage faults are uncertain.
        const definite =
          error instanceof AgentsFailure &&
          [400, 401, 403, 429].includes(error.status);
        if (definite) pending = null;
        state.update((value) => ({
          ...value,
          phase: definite ? "error" : "unconfirmed",
          error: definite ? "credential-refused" : "unconfirmed",
        }));
        if (!definite) options.onChanged?.();
      }
    },
    review() {
      if (!active || get(state).phase !== "unconfirmed") return;
      sequence++;
      pending = null;
      clearWait();
      lease.cancel();
      state.update((value) => ({
        ...value,
        phase: "idle",
        action: null,
        error: "",
        notice: "",
      }));
    },
    dispose() {
      active = false;
      sequence++;
      pending = null;
      clearWait();
      lease.cancel();
      state.set(blank());
    },
  };
}
export type SandboxCredentials = ReturnType<typeof createSandboxCredentials>;
