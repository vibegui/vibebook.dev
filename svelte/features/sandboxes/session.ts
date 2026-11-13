import { agentIdentityRead } from "../agents/authority";
import { get, writable } from "svelte/store";
import type {
  CreateSandboxResult,
  SandboxesResult,
} from "../../../shared/schemas";
import {
  AgentsFailure,
  agentsUnauthenticated,
  type AgentsApi,
} from "../agents/api";
import { agentClock, createAgentLease, type AgentClock } from "../agents/lease";
import {
  AGENT_REQUEST_TIMEOUT,
  SETUP_TIMEOUT,
  SANDBOX_POLL,
  knownCreateRefusal,
  preparing,
  type AgentPhase,
} from "../agents/model";
import type { SandboxCredentials } from "./credentials";
export type SandboxCard = SandboxesResult["sandboxes"][number];
export type SandboxState = {
  data: SandboxesResult | null;
  loading: boolean;
  readError: string;
  phase: AgentPhase;
  operation: "create" | "start" | "pause" | "setup" | "remove" | null;
  target: string;
  error: string;
  logs: Readonly<Record<string, string>>;
  candidates: string[];
  created: string | null;
};
const blank = (): SandboxState => ({
  data: null,
  loading: false,
  readError: "",
  phase: "idle",
  operation: null,
  target: "",
  error: "",
  logs: {},
  candidates: [],
  created: null,
});
export const sandboxIdentity = (card: SandboxCard) =>
  JSON.stringify([card.id, card.name, card.vm_id, card.state, card.ready]);
type Operation = {
  kind: "create" | "start" | "pause" | "setup" | "remove";
  id: string;
  baseline: Set<string>;
  result?: CreateSandboxResult;
  ack: boolean;
  sequence: number;
};
export function createSandboxSession(
  account: string,
  roomId: string,
  api: AgentsApi,
  credentials: SandboxCredentials,
  options: {
    clock?: AgentClock;
    current?: () => boolean;
    allowMutation?: () => boolean;
    onChanged?: () => void;
    onUnauthorized?: () => void;
    onMembershipDenied?: () => void;
  } = {},
) {
  const clock = options.clock ?? agentClock,
    state = writable<SandboxState>(blank()),
    reader = createAgentLease(clock),
    writer = createAgentLease(clock);
  let active = true,
    allowed = true,
    denied = false,
    identityRequired = false,
    visible = false,
    readTicket = 0,
    sequence = 0,
    pending: Operation | null = null,
    readPromise: Promise<void> | null = null,
    poll: unknown | null = null,
    wait: unknown | null = null;
  function clearTimer(timer: unknown | null) {
    if (timer !== null) clock.cancel(timer);
  }
  function clearWait() {
    clearTimer(wait);
    wait = null;
  }
  function deny(sessionLost = false) {
    denied = true;
    identityRequired ||= sessionLost;
    readTicket++;
    reader.cancel();
    readPromise = null;
    sequence++;
    pending = null;
    writer.cancel();
    clearWait();
    clearTimer(poll);
    poll = null;
    state.set({ ...blank(), readError: "denied" });
  }
  function complete() {
    const created = pending?.result?.id ?? null;
    pending = null;
    clearWait();
    state.update((value) => ({
      ...value,
      phase: "idle",
      operation: null,
      target: "",
      error: "",
      candidates: [],
      created,
    }));
  }
  function settle() {
    const data = get(state).data,
      op = pending;
    if (!data || !op) return;
    if (op.kind === "create") {
      if (
        op.ack &&
        op.result &&
        data.sandboxes.some(
          (card) =>
            card.id === op.result!.id &&
            card.vm_id === op.result!.vm_id &&
            card.name === op.result!.name,
        )
      )
        complete();
      else if (!op.ack)
        state.update((value) => ({
          ...value,
          candidates: data.sandboxes
            .filter((card) => !op.baseline.has(card.id))
            .map((card) => card.id),
        }));
      return;
    }
    const card = data.sandboxes.find((item) => item.id === op.id);
    if (!card) {
      writer.cancel();
      complete();
      return;
    }
    if (op.kind === "remove") return;
    if (
      op.ack &&
      ((op.kind === "start" && card.state === "running") ||
        (op.kind === "pause" && card.state === "paused"))
    ) {
      complete();
      return;
    }
    if (op.kind === "setup" && op.ack && card.ready) complete();
  }
  function schedule() {
    clearTimer(poll);
    poll = null;
    const data = get(state).data;
    if (
      active &&
      allowed &&
      visible &&
      data?.sandboxes.some((card) => preparing(card.state, card.ready))
    )
      poll = clock.schedule(() => {
        poll = null;
        void refresh();
      }, SANDBOX_POLL);
  }
  function refresh(force = false): Promise<void> {
    if (!active || !allowed) return Promise.resolve();
    if (readPromise && !force) return readPromise;
    if (force) {
      readTicket++;
      reader.cancel();
      readPromise = null;
    }
    clearTimer(poll);
    poll = null;
    const ticket = ++readTicket;
    state.update((value) => ({ ...value, loading: true, readError: "" }));
    const job = reader
      .run(
        (signal) =>
          agentIdentityRead(api, account, signal, identityRequired, () =>
            api.sandboxes(roomId, signal),
          ),
        AGENT_REQUEST_TIMEOUT,
      )
      .then(
        (data) => {
          if (!active || ticket !== readTicket) return;
          denied = false;
          identityRequired = false;
          state.update((value) => ({
            ...value,
            data,
            loading: false,
            readError: "",
          }));
          credentials.authorize();
          credentials.sync(data.connected, data.claude);
          settle();
          schedule();
        },
        (error: unknown) => {
          if (!active || ticket !== readTicket) return;
          const refusal =
            error instanceof AgentsFailure && [401, 403].includes(error.status);
          if (refusal) denied = true;
          if (agentsUnauthenticated(error)) {
            deny(true);
            options.onUnauthorized?.();
          } else if (error instanceof AgentsFailure && error.status === 403) {
            deny();
            options.onMembershipDenied?.();
          }
          state.update((value) => ({
            ...value,
            ...(refusal ? { data: null } : {}),
            loading: false,
            readError: refusal ? "denied" : "read-failed",
          }));
        },
      )
      .finally(() => {
        if (ticket === readTicket) readPromise = null;
      });
    readPromise = job;
    return job;
  }
  async function run(kind: Operation["kind"], id: string, input: string) {
    const data = get(state).data;
    if (
      !active ||
      !allowed ||
      denied ||
      !(options.current?.() ?? true) ||
      !(options.allowMutation?.() ?? true) ||
      pending ||
      !data ||
      credentials.account !== account ||
      !credentials.current() ||
      ["pending", "unconfirmed"].includes(get(credentials.state).phase)
    )
      return;
    if (kind !== "create" && !data.sandboxes.some((card) => card.id === id))
      return;
    const op: Operation = {
      kind,
      id,
      baseline: new Set(data.sandboxes.map((card) => card.id)),
      ack: false,
      sequence: ++sequence,
    };
    pending = op;
    state.update((value) => ({
      ...value,
      phase: "pending",
      operation: kind,
      target: id,
      error: "",
      candidates: [],
      created: null,
    }));
    try {
      const result = await writer.run(
        (signal) =>
          kind === "create"
            ? api.create(roomId, input, signal)
            : kind === "setup"
              ? api.setup(id, signal)
              : kind === "remove"
                ? api.remove(id, signal)
                : api.power(id, kind, signal),
        kind === "setup" ? SETUP_TIMEOUT : AGENT_REQUEST_TIMEOUT,
      );
      if (!active || pending !== op || op.sequence !== sequence) return;
      op.ack = true;
      if (kind === "create" && "id" in result) op.result = result;
      if (kind === "setup" && "log" in result) {
        state.update((value) => ({
          ...value,
          logs: { ...value.logs, [id]: result.log },
        }));
        if (!result.ok) {
          pending = null;
          state.update((value) => ({
            ...value,
            phase: "error",
            error: "setup-incomplete",
          }));
          options.onChanged?.();
          await refresh(true);
          return;
        }
      }
      options.onChanged?.();
      await refresh(true);
      if (active && pending === op)
        wait = clock.schedule(() => {
          wait = null;
          if (active && pending === op)
            state.update((value) => ({
              ...value,
              phase: "unconfirmed",
              error: "canonical-unconfirmed",
            }));
        }, 10_000);
    } catch (error) {
      if (!active || pending !== op || op.sequence !== sequence) return;
      if (agentsUnauthenticated(error)) {
        deny();
        credentials.deny();
        options.onUnauthorized?.();
        return;
      }
      if (
        kind === "create" &&
        error instanceof AgentsFailure &&
        error.status === 403
      ) {
        deny();
        options.onMembershipDenied?.();
        return;
      }
      const definite =
        error instanceof AgentsFailure &&
        (kind === "create"
          ? knownCreateRefusal(error.status, error.message)
          : [401, 403, 404].includes(error.status));
      if (definite) pending = null;
      state.update((value) => ({
        ...value,
        phase: definite ? "error" : "unconfirmed",
        error: definite ? "action-refused" : "unconfirmed",
      }));
      if (!definite) {
        options.onChanged?.();
        await refresh(true);
      }
    }
  }
  return {
    account,
    roomId,
    state,
    refresh,
    deny,
    current: () =>
      active && allowed && !denied && (options.current?.() ?? true),
    authorize(value: boolean) {
      if (!active || allowed === value) return;
      allowed = value;
      if (!value) {
        sequence++;
        pending = null;
        writer.cancel();
        clearWait();
        visible = false;
        readTicket++;
        reader.cancel();
        readPromise = null;
        clearTimer(poll);
        poll = null;
        state.update((current) => ({
          ...current,
          data: null,
          loading: false,
          readError: "denied",
          phase: "idle",
          operation: null,
          target: "",
          logs: {},
          error: "",
          candidates: [],
        }));
      }
    },
    visible(value: boolean) {
      if (!active || visible === value) return;
      visible = value;
      if (value) void refresh();
      else {
        clearTimer(poll);
        poll = null;
        if (!pending) {
          readTicket++;
          reader.cancel();
          readPromise = null;
          state.update((current) => ({ ...current, loading: false }));
        }
      }
    },
    create(name = "") {
      return run("create", "", name);
    },
    power(id: string, action: "start" | "pause", expected: string) {
      const card = get(state).data?.sandboxes.find((item) => item.id === id);
      if (!card || sandboxIdentity(card) !== expected) return Promise.resolve();
      return run(action, id, "");
    },
    setup(id: string, expected: string) {
      const card = get(state).data?.sandboxes.find((item) => item.id === id);
      if (!card || sandboxIdentity(card) !== expected) return Promise.resolve();
      return run("setup", id, "");
    },
    remove(id: string, expected: string) {
      const card = get(state).data?.sandboxes.find((item) => item.id === id);
      if (!card || sandboxIdentity(card) !== expected) return Promise.resolve();
      return run("remove", id, "");
    },
    review() {
      if (!active || get(state).phase !== "unconfirmed") return;
      sequence++;
      pending = null;
      clearWait();
      writer.cancel();
      state.update((value) => ({
        ...value,
        phase: "idle",
        operation: null,
        target: "",
        error: "",
        candidates: [],
      }));
    },
    dispose() {
      active = false;
      allowed = false;
      visible = false;
      readTicket++;
      sequence++;
      pending = null;
      clearWait();
      clearTimer(poll);
      poll = null;
      reader.cancel();
      writer.cancel();
      readPromise = null;
      state.set(blank());
    },
  };
}
export type SandboxSession = ReturnType<typeof createSandboxSession>;
