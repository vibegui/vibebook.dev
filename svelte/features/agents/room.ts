import { agentIdentityRead } from "./authority";
import { get, writable } from "svelte/store";
import type { Room } from "../../../shared/room";
import type { AgentsResult } from "../../../shared/schemas";
import type { RequestRoomCommand } from "../../roomConnection";
import type { FetchLike } from "../../transport";
import type { Wait } from "../home/model";
import { AgentsFailure, agentsUnauthenticated, type AgentsApi } from "./api";
import { createAgentLease, agentClock, type AgentClock } from "./lease";
import {
  AGENT_REQUEST_TIMEOUT,
  agentPresence,
  agentQueue,
  type AgentPhase,
} from "./model";
import { createLocalRunner } from "./runner";
import type { AgentAccountSession, AgentAccountState } from "./account";
import { createSandboxSession } from "../sandboxes/session";
import { createTerminalSession } from "../sandboxes/terminalSession";
import type { SandboxCredentials } from "../sandboxes/credentials";
export type RoomAgentState = {
  room: Room | null;
  thread: string;
  waits: readonly Wait[];
  data: AgentsResult | null;
  loading: boolean;
  readError: string;
  togglePhase: AgentPhase;
  toggleError: string;
  dismissPhase: AgentPhase;
  dismissError: string;
  dismissId: number | null;
  askedAt: number;
  now: number;
  hasAgent: boolean | null;
  setupDismissed: boolean;
  offerDismissed: boolean;
  startDismissed: boolean;
  welcome: boolean;
  setupFeedback: boolean;
  listeningFeedback: boolean;
  pane: boolean;
};
export function createRoomAgentSession(
  account: string,
  roomId: string,
  api: AgentsApi,
  accountOwner: AgentAccountSession,
  credentials: SandboxCredentials,
  options: {
    origin: string;
    clock?: AgentClock;
    storage?: Pick<Storage, "getItem" | "setItem"> | null;
    runnerFetch?: FetchLike;
    allowMutation?: () => boolean;
    onData?: (data: AgentsResult | null) => void;
    onChanged?: () => void;
    onUnauthorized?: () => void;
  },
) {
  const clock = options.clock ?? agentClock,
    reader = createAgentLease(clock),
    toggleLease = createAgentLease(clock),
    runner = createLocalRunner({
      clock,
      fetcher: options.runnerFetch,
      relayFocus: async (id, signal) => {
        if (id !== roomId || !mutable()) throw new AgentsFailure("offline");
        try {
          return await api.focus(id, signal);
        } catch (error) {
          if (
            current() &&
            error instanceof AgentsFailure &&
            [401, 403].includes(error.status)
          ) {
            deny(agentsUnauthenticated(error));
            if (agentsUnauthenticated(error)) options.onUnauthorized?.();
          }
          throw error;
        }
      },
    });
  const stored = (key: string, value: string) => {
    try {
      return options.storage?.getItem(key) === value;
    } catch {
      return false;
    }
  };
  const state = writable<RoomAgentState>({
    room: null,
    thread: "main",
    waits: [],
    data: null,
    loading: false,
    readError: "",
    togglePhase: "idle",
    toggleError: "",
    dismissPhase: "idle",
    dismissError: "",
    dismissId: null,
    askedAt: 0,
    now: clock.now(),
    hasAgent: null,
    setupDismissed: stored("vb.setupOff", "1"),
    offerDismissed: stored("vb.claudeBar.off", "off"),
    startDismissed: stored(`vb.start.${roomId}`, "off"),
    welcome: false,
    setupFeedback: false,
    listeningFeedback: false,
    pane: false,
  });
  let active = true,
    attached = false,
    visible = true,
    denied = false,
    identityRequired = false,
    member = false,
    request: RequestRoomCommand | undefined,
    readTicket = 0,
    toggleTicket = 0,
    dismissTicket = 0,
    readPromise: Promise<void> | null = null,
    pendingToggle: { wanted: boolean; ticket: number } | null = null,
    pendingDismiss: { id: number; ticket: number } | null = null,
    unsubscribeAccount: (() => void) | null = null;
  const timers = new Map<string, unknown>();
  function cancelTimer(name: string) {
    if (timers.has(name)) clock.cancel(timers.get(name));
    timers.delete(name);
  }
  const scoped = () => active && attached && member;
  const current = () => scoped() && !denied;
  const mutable = () => current() && (options.allowMutation?.() ?? true);
  const sandboxes = createSandboxSession(account, roomId, api, credentials, {
    clock,
    current,
    allowMutation: options.allowMutation,
    onUnauthorized: options.onUnauthorized,
    onMembershipDenied: deny,
    onChanged: () => {
      if (active) {
        options.onChanged?.();
        if (attached) void refresh(true);
      }
    },
  });
  const terminal = createTerminalSession(account, roomId, api, {
    clock,
    origin: options.origin,
    current,
    onUnauthorized: options.onUnauthorized,
    canOpen: (id, vmId) =>
      sandboxes.current() &&
      !!get(sandboxes.state).data?.sandboxes.some(
        (card) =>
          card.id === id && card.vm_id === vmId && card.state !== "deleted",
      ),
  });
  const stopSandbox = sandboxes.state.subscribe(() => {
    if (active) terminal.reconcile();
  });
  function feedback(
    kind: "setupFeedback" | "listeningFeedback",
    milliseconds: number,
  ) {
    cancelTimer(kind);
    state.update((value) => ({ ...value, [kind]: true }));
    timers.set(
      kind,
      clock.schedule(() => {
        timers.delete(kind);
        if (active) state.update((value) => ({ ...value, [kind]: false }));
      }, milliseconds),
    );
  }
  function tick() {
    cancelTimer("clock");
    if (!current() || !visible) return;
    state.update((value) => ({ ...value, now: clock.now() }));
    const value = get(state);
    void runner.probe(
      roomId,
      value.room?.book.title ?? "",
      value.pane && !!value.data?.claude_on,
    );
    timers.set("clock", clock.schedule(tick, 10_000));
  }
  function settleDismiss() {
    const op = pendingDismiss,
      room = get(state).room;
    if (
      !op ||
      !room ||
      agentQueue(room, clock.now()).some((item) => item.message.id === op.id)
    )
      return;
    pendingDismiss = null;
    cancelTimer("dismiss");
    state.update((value) => ({
      ...value,
      dismissId: null,
      dismissPhase: "idle",
      dismissError: "",
    }));
  }
  function refresh(force = false): Promise<void> {
    if (!scoped()) return Promise.resolve();
    if (readPromise && !force) return readPromise;
    if (force) {
      readTicket++;
      reader.cancel();
      readPromise = null;
    }
    const ticket = ++readTicket;
    state.update((value) => ({ ...value, loading: true, readError: "" }));
    const job = reader
      .run(
        (signal) =>
          agentIdentityRead(api, account, signal, identityRequired, () =>
            api.room(roomId, signal),
          ),
        AGENT_REQUEST_TIMEOUT,
      )
      .then(
        (data) => {
          if (!scoped() || ticket !== readTicket) return;
          denied = false;
          identityRequired = false;
          sandboxes.authorize(true);
          const previous = get(state),
            before = agentPresence(previous.data, account, clock.now()),
            after = agentPresence(data, account, clock.now());
          if (before.on && !before.around && after.around)
            feedback("listeningFeedback", 5000);
          state.update((value) => ({
            ...value,
            data,
            loading: false,
            readError: "",
          }));
          options.onData?.(data);
          void runner.probe(
            roomId,
            previous.room?.book.title ?? "",
            previous.pane && data.claude_on,
          );
        },
        (error: unknown) => {
          if (!scoped() || ticket !== readTicket) return;
          const refusal =
            error instanceof AgentsFailure && [401, 403].includes(error.status);
          if (refusal) {
            deny(agentsUnauthenticated(error));
            if (agentsUnauthenticated(error)) options.onUnauthorized?.();
          }
          state.update((value) => ({
            ...value,
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
  const onAccount = (value: AgentAccountState) => {
    if (!active) return;
    const next = value.grants === null ? null : !!value.grants.agents.length,
      previous = get(state).hasAgent;
    if (previous === false && next === true && attached)
      feedback("setupFeedback", 6000);
    if (previous !== next)
      state.update((current) => ({ ...current, hasAgent: next }));
  };
  const unsubscribeSource = accountOwner.state.subscribe(onAccount);
  function deny(sessionLost = false) {
    denied = true;
    identityRequired ||= sessionLost;
    readTicket++;
    reader.cancel();
    readPromise = null;
    toggleTicket++;
    pendingToggle = null;
    toggleLease.cancel();
    dismissTicket++;
    pendingDismiss = null;
    for (const name of [
      "clock",
      "dismiss",
      "setupFeedback",
      "listeningFeedback",
    ])
      cancelTimer(name);
    runner.cancel();
    terminal.close(undefined, false);
    sandboxes.deny(sessionLost);
    sandboxes.visible(false);
    state.update((value) => ({
      ...value,
      room: null,
      waits: [],
      data: null,
      loading: false,
      readError: "denied",
      togglePhase: "idle",
      dismissPhase: "idle",
      dismissId: null,
      hasAgent: null,
      welcome: false,
      setupFeedback: false,
      listeningFeedback: false,
    }));
    options.onData?.(null);
  }
  return {
    account,
    roomId,
    state,
    runner,
    sandboxes,
    credentials,
    terminal,
    current,
    deny,
    refresh,
    sync(
      room: Room,
      thread: string,
      waits: readonly Wait[],
      pane: boolean,
      isVisible = true,
    ) {
      if (!active || room.id !== roomId || room.me !== account) return;
      const first = !attached,
        wasMember = member,
        before = get(state);
      attached = true;
      visible = isVisible;
      member = room.members.includes(account);
      if (
        before.room !== room ||
        before.thread !== thread ||
        before.waits !== waits ||
        before.pane !== pane
      )
        state.update((value) => ({
          ...value,
          room: denied || !member ? null : room,
          thread,
          waits: denied || !member ? [] : waits,
          pane,
        }));
      sandboxes.authorize(room.members.includes(account) && !denied);
      sandboxes.visible(current() && pane && visible);
      settleDismiss();
      if (first) {
        unsubscribeAccount?.();
        unsubscribeAccount = accountOwner.watch();
        void refresh();
        try {
          const key = `vb.welcomed.${account}`;
          if (
            room.book.owner &&
            room.book.owner !== account &&
            options.storage &&
            !options.storage.getItem(key)
          ) {
            options.storage.setItem(key, "1");
            state.update((value) => ({ ...value, welcome: true }));
          }
        } catch {
          /* The existing no-storage behavior skips guided onboarding. */
        }
      }
      if (!current()) {
        terminal.close(undefined, false);
        runner.cancel();
        cancelTimer("clock");
        if (!member && (!denied || before.room || before.data)) deny();
        else if (member && !wasMember && !first) void refresh(true);
        return;
      }
      if (visible) {
        if (!timers.has("clock")) tick();
      } else {
        cancelTimer("clock");
        runner.cancel();
      }
      if (pane && before.pane !== pane)
        void runner.probe(
          roomId,
          room.book.title,
          !!get(state).data?.claude_on,
        );
    },
    async toggle() {
      const before = get(state);
      if (!mutable() || !before.data || pendingToggle) return;
      const op = { wanted: !before.data.claude_on, ticket: ++toggleTicket };
      pendingToggle = op;
      state.update((value) => ({
        ...value,
        togglePhase: "pending",
        toggleError: "",
        ...(op.wanted ? { askedAt: clock.now() } : {}),
      }));
      try {
        const result = await toggleLease.run((signal) => {
          if (!current()) throw new AgentsFailure("offline");
          return api.toggle(roomId, op.wanted, signal);
        }, AGENT_REQUEST_TIMEOUT);
        if (!active || pendingToggle !== op || op.ticket !== toggleTicket)
          return;
        pendingToggle = null;
        // The toggle endpoint returns this authoritative member field after its UPDATE; the other agent rows are unchanged.
        state.update((value) => ({
          ...value,
          data: value.data
            ? { ...value.data, claude_on: result.claude_on }
            : null,
          togglePhase: "idle",
          toggleError: "",
        }));
        options.onChanged?.();
        if (attached) await refresh(true);
      } catch (error) {
        if (!active || pendingToggle !== op || op.ticket !== toggleTicket)
          return;
        if (agentsUnauthenticated(error)) {
          deny(true);
          options.onUnauthorized?.();
          return;
        }
        if (error instanceof AgentsFailure && error.status === 403) {
          deny();
          return;
        }
        const definite =
          error instanceof AgentsFailure &&
          ([400, 401, 403, 429].includes(error.status) ||
            error.message === "offline");
        if (definite) pendingToggle = null;
        state.update((value) => ({
          ...value,
          togglePhase: definite ? "error" : "unconfirmed",
          toggleError: definite ? "toggle-failed" : "unconfirmed",
        }));
        if (!definite && attached) await refresh(true);
      }
    },
    reviewToggle() {
      if (!active || get(state).togglePhase !== "unconfirmed") return;
      toggleTicket++;
      pendingToggle = null;
      toggleLease.cancel();
      state.update((value) => ({
        ...value,
        togglePhase: "idle",
        toggleError: "",
      }));
    },
    async dismiss(id: number) {
      const room = get(state).room;
      if (
        !mutable() ||
        !room ||
        !request ||
        pendingDismiss ||
        !agentQueue(room, clock.now()).some((item) => item.message.id === id)
      )
        return;
      const op = { id, ticket: ++dismissTicket },
        send = request;
      pendingDismiss = op;
      state.update((value) => ({
        ...value,
        dismissId: id,
        dismissPhase: "pending",
        dismissError: "",
      }));
      try {
        const result = await Promise.resolve().then(() =>
          current()
            ? send({ t: "ack.dismiss", id })
            : { ok: false as const, error: "offline" },
        );
        if (!active || pendingDismiss !== op || op.ticket !== dismissTicket)
          return;
        if (!result.ok) {
          const definite =
            result.error === "offline" || result.error === "invalid command";
          if (definite) pendingDismiss = null;
          state.update((value) => ({
            ...value,
            dismissPhase: definite ? "error" : "unconfirmed",
            dismissError: definite ? "dismiss-failed" : "unconfirmed",
          }));
          return;
        }
        settleDismiss();
        if (pendingDismiss === op)
          timers.set(
            "dismiss",
            clock.schedule(() => {
              timers.delete("dismiss");
              if (active && pendingDismiss === op)
                state.update((value) => ({
                  ...value,
                  dismissPhase: "unconfirmed",
                  dismissError: "unconfirmed",
                }));
            }, 10_000),
          );
      } catch {
        if (active && pendingDismiss === op)
          state.update((value) => ({
            ...value,
            dismissPhase: "unconfirmed",
            dismissError: "unconfirmed",
          }));
      }
    },
    reviewDismiss() {
      if (!active || get(state).dismissPhase !== "unconfirmed") return;
      dismissTicket++;
      pendingDismiss = null;
      cancelTimer("dismiss");
      state.update((value) => ({
        ...value,
        dismissId: null,
        dismissPhase: "idle",
        dismissError: "",
      }));
    },
    setRequest(send: RequestRoomCommand) {
      if (active) request = send;
    },
    dismissBanner(kind: "setup" | "offer" | "start") {
      if (!current()) return;
      const key =
        kind === "setup"
          ? "vb.setupOff"
          : kind === "offer"
            ? "vb.claudeBar.off"
            : `vb.start.${roomId}`;
      try {
        options.storage?.setItem(key, kind === "setup" ? "1" : "off");
      } catch {
        /* In-memory dismissal remains available. */
      }
      state.update((value) => ({
        ...value,
        [kind === "setup"
          ? "setupDismissed"
          : kind === "offer"
            ? "offerDismissed"
            : "startDismissed"]: true,
      }));
    },
    closeWelcome() {
      if (active) state.update((value) => ({ ...value, welcome: false }));
    },
    hasPending() {
      return (
        !!pendingToggle ||
        !!pendingDismiss ||
        ["pending", "unconfirmed"].includes(get(sandboxes.state).phase)
      );
    },
    detach() {
      attached = false;
      visible = false;
      request = undefined;
      readTicket++;
      reader.cancel();
      readPromise = null;
      runner.cancel();
      terminal.close(undefined, false);
      sandboxes.visible(false);
      unsubscribeAccount?.();
      unsubscribeAccount = null;
      for (const name of ["clock", "setupFeedback", "listeningFeedback"])
        cancelTimer(name);
      state.update((value) => ({
        ...value,
        room: null,
        waits: [],
        pane: false,
        data: null,
        loading: false,
        setupFeedback: false,
        listeningFeedback: false,
        welcome: false,
      }));
    },
    dispose() {
      active = false;
      attached = false;
      request = undefined;
      readTicket++;
      toggleTicket++;
      dismissTicket++;
      reader.cancel();
      toggleLease.cancel();
      runner.dispose();
      terminal.dispose();
      sandboxes.dispose();
      stopSandbox();
      unsubscribeAccount?.();
      unsubscribeSource();
      for (const timer of timers.values()) clock.cancel(timer);
      timers.clear();
      pendingToggle = null;
      pendingDismiss = null;
      state.update((value) => ({
        ...value,
        room: null,
        waits: [],
        data: null,
        loading: false,
        welcome: false,
        togglePhase: "idle",
        dismissPhase: "idle",
      }));
    },
  };
}
export type RoomAgentSession = ReturnType<typeof createRoomAgentSession>;
