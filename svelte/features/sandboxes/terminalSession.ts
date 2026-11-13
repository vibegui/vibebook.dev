import { get, writable } from "svelte/store";
import { agentsUnauthenticated, type AgentsApi } from "../agents/api";
import { agentClock, createAgentLease, type AgentClock } from "../agents/lease";
import { AGENT_REQUEST_TIMEOUT } from "../agents/model";
import {
  terminalEndpoint,
  terminalProtocols,
  terminalDimensions,
  terminalControl,
  TERMINAL_KEYS,
  type TerminalKey,
} from "./terminalProtocol";
import type { SandboxCard } from "./session";
import type {
  TerminalRenderer,
  TerminalRendererCallbacks,
  TerminalSemanticTheme,
} from "./terminalRenderer";
export type TerminalSocket = Pick<
  WebSocket,
  | "readyState"
  | "binaryType"
  | "onopen"
  | "onmessage"
  | "onerror"
  | "onclose"
  | "send"
  | "close"
>;
export type TerminalFactory = (
  callbacks: TerminalRendererCallbacks,
  signal: AbortSignal,
) => Promise<TerminalRenderer>;
export type TerminalState = {
  open: boolean;
  generation: number;
  id: string;
  name: string;
  phase:
    | "idle"
    | "loading"
    | "connecting"
    | "connected"
    | "exited"
    | "disconnected"
    | "error";
  error: string;
  semantic: {
    theme: TerminalSemanticTheme;
    fontFamily: string;
    fontSize: number;
  } | null;
};
const blank = (generation: number): TerminalState => ({
  open: false,
  generation,
  id: "",
  name: "",
  phase: "idle",
  error: "",
  semantic: null,
});
export function createTerminalSession(
  account: string,
  roomId: string,
  api: AgentsApi,
  options: {
    origin: string;
    current(): boolean;
    canOpen(id: string, vmId: string): boolean;
    clock?: AgentClock;
    onUnauthorized?: () => void;
    socket?: (url: string, protocols: string[]) => TerminalSocket;
  },
) {
  const clock = options.clock ?? agentClock,
    lease = createAgentLease(clock),
    state = writable<TerminalState>(blank(0)),
    encoder = new TextEncoder();
  let active = true,
    generation = 0,
    target: Pick<SandboxCard, "id" | "name" | "vm_id"> | null = null,
    socket: TerminalSocket | null = null,
    renderer: TerminalRenderer | null = null,
    controller: AbortController | null = null,
    trigger: HTMLElement | null = null,
    mounting = false,
    connectTimer: unknown | null = null;
  const owned = (ticket: number) =>
    active &&
    get(state).open &&
    ticket === generation &&
    options.current() &&
    !!target &&
    options.canOpen(target.id, target.vm_id);
  function clearTimer() {
    if (connectTimer !== null) clock.cancel(connectTimer);
    connectTimer = null;
  }
  function release() {
    clearTimer();
    controller?.abort();
    controller = null;
    lease.cancel();
    const previous = socket;
    socket = null;
    if (previous) {
      previous.onopen =
        previous.onmessage =
        previous.onerror =
        previous.onclose =
          null;
      previous.close();
    }
    renderer?.dispose();
    renderer = null;
    mounting = false;
  }
  function fail(ticket: number) {
    if (!owned(ticket)) return;
    clearTimer();
    renderer?.input(false);
    state.update((value) => ({
      ...value,
      phase: "error",
      error: "terminal-unavailable",
    }));
    const previous = socket;
    socket = null;
    if (previous) {
      previous.onopen =
        previous.onmessage =
        previous.onerror =
        previous.onclose =
          null;
      previous.close();
    }
  }
  function send(value: string) {
    if (!owned(generation) || socket?.readyState !== 1) return;
    try {
      socket.send(encoder.encode(value));
    } catch {
      fail(generation);
    }
  }
  function resize(cols: number, rows: number) {
    if (
      owned(generation) &&
      socket?.readyState === 1 &&
      terminalDimensions(cols, rows)
    )
      try {
        socket.send(JSON.stringify({ type: "resize", cols, rows }));
      } catch {
        fail(generation);
      }
  }
  return {
    account,
    roomId,
    state,
    current: owned,
    open(card: SandboxCard, element?: HTMLElement) {
      if (
        !active ||
        !options.current() ||
        !options.canOpen(card.id, card.vm_id)
      )
        return;
      generation++;
      release();
      target = { id: card.id, name: card.name, vm_id: card.vm_id };
      trigger = element?.isConnected ? element : null;
      state.set({
        ...blank(generation),
        open: true,
        id: card.id,
        name: card.name,
        phase: "loading",
      });
    },
    async mount(
      factory: TerminalFactory,
      ticket: number,
      autofocus?: () => boolean,
    ) {
      if (!owned(ticket) || mounting || renderer) return;
      mounting = true;
      const mountController = new AbortController();
      controller = mountController;
      const signal = mountController.signal;
      let created: TerminalRenderer | null = null,
        acceptingRenderer = true;
      try {
        created = await lease.run(
          () =>
            factory(
              {
                current: () => owned(ticket),
                data: (value) => {
                  if (owned(ticket)) send(value);
                },
                resize: (cols, rows) => {
                  if (owned(ticket)) resize(cols, rows);
                },
                semantic: (semantic) => {
                  if (owned(ticket))
                    state.update((value) => ({ ...value, semantic }));
                },
                failed: () => fail(ticket),
              },
              signal,
            ).then((result) => {
              if (!acceptingRenderer || !owned(ticket)) {
                result.dispose();
                throw Error("cancelled");
              }
              return result;
            }),
          AGENT_REQUEST_TIMEOUT,
        );
        if (!owned(ticket)) {
          created.dispose();
          return;
        }
        renderer = created;
        state.update((value) => ({ ...value, phase: "connecting" }));
        const credential = await lease.run(
          (abort) => api.terminal(target!.id, abort),
          AGENT_REQUEST_TIMEOUT,
        );
        if (!owned(ticket) || !renderer || !target) return;
        const url = terminalEndpoint(
          credential.url,
          options.origin,
          target.vm_id,
        );
        if (!terminalDimensions(renderer.cols, renderer.rows))
          throw Error("Invalid terminal size");
        url.searchParams.set("cols", String(renderer.cols));
        url.searchParams.set("rows", String(renderer.rows));
        const connected = (
          options.socket ??
          ((address, protocols) => new WebSocket(address, protocols))
        )(url.href, terminalProtocols(credential.token));
        if (!owned(ticket)) {
          connected.close();
          return;
        }
        socket = connected;
        connected.binaryType = "arraybuffer";
        connected.onopen = () => {
          if (!owned(ticket) || socket !== connected) return;
          renderer?.input(true);
          if (autofocus?.() && owned(ticket)) renderer?.focus();
          resize(renderer?.cols ?? 0, renderer?.rows ?? 0);
        };
        connected.onmessage = (event: MessageEvent<unknown>) => {
          if (!owned(ticket) || socket !== connected) return;
          if (event.data instanceof ArrayBuffer) {
            try {
              renderer?.write(new Uint8Array(event.data));
            } catch {
              fail(ticket);
            }
            return;
          }
          const control = terminalControl(event.data);
          if (control === "connected") {
            clearTimer();
            state.update((value) => ({
              ...value,
              phase: "connected",
              error: "",
            }));
          } else if (control === "exited") {
            clearTimer();
            renderer?.input(false);
            state.update((value) => ({ ...value, phase: "exited" }));
          } else if (control === "error") fail(ticket);
        };
        connected.onerror = () => fail(ticket);
        connected.onclose = () => {
          if (!owned(ticket) || socket !== connected) return;
          clearTimer();
          renderer?.input(false);
          socket = null;
          state.update((value) =>
            value.phase === "exited" || value.phase === "error"
              ? value
              : { ...value, phase: "disconnected" },
          );
        };
        connectTimer = clock.schedule(
          () => fail(ticket),
          AGENT_REQUEST_TIMEOUT,
        );
      } catch (error) {
        acceptingRenderer = false;
        if (agentsUnauthenticated(error)) options.onUnauthorized?.();
        if (!renderer || ticket !== generation) mountController.abort();
        if (owned(ticket)) fail(ticket);
        else if (created && created !== renderer) created.dispose();
      } finally {
        if (ticket === generation) mounting = false;
      }
    },
    key(value: TerminalKey, ticket: number) {
      if (!owned(ticket)) return;
      send(TERMINAL_KEYS[value]);
      renderer?.focus();
    },
    focus(ticket: number) {
      if (owned(ticket)) renderer?.focus();
    },
    reconcile() {
      if (target && !options.canOpen(target.id, target.vm_id)) {
        generation++;
        release();
        target = null;
        trigger = null;
        state.set(blank(generation));
      }
    },
    returnFocus(ticket: number) {
      return ticket === generation && options.current() && trigger?.isConnected
        ? trigger
        : null;
    },
    close(ticket = generation, restoreFocus = true) {
      if (!active || ticket !== generation) return;
      release();
      target = null;
      if (!restoreFocus) trigger = null;
      state.set(blank(generation));
    },
    dispose() {
      active = false;
      generation++;
      release();
      target = null;
      trigger = null;
      state.set(blank(generation));
    },
  };
}
export type TerminalSession = ReturnType<typeof createTerminalSession>;
