import type { RoomCommand } from "../shared/commands";
import type { RoomEvent } from "../shared/room";
import { receiveRoomEvent, sendRoomCommand } from "./transport";

type Socket = Pick<
  WebSocket,
  "readyState" | "send" | "close" | "onopen" | "onmessage" | "onclose"
>;
type Timer = number | ReturnType<typeof setTimeout>;
export interface RoomConnectionOptions {
  url: (lastCloseCode: string) => string;
  onEvent: (event: RoomEvent) => void;
  onRemoved: () => void;
  onUnavailable: () => void;
  createSocket?: (url: string) => Socket;
  schedule?: (callback: () => void, delay: number) => Timer;
  cancel?: (timer: Timer) => void;
}

/** One room owns its socket and timers until disposal, including callbacks already queued by the browser. */
export function createRoomConnection(options: RoomConnectionOptions) {
  const schedule = options.schedule ?? setTimeout;
  const cancel = options.cancel ?? clearTimeout;
  const createSocket =
    options.createSocket ?? ((url: string) => new WebSocket(url));
  let socket: Socket | null = null;
  let retry: Timer | undefined;
  let stable: Timer | undefined;
  let disposed = false;
  let hasSnapshot = false;
  let tries = 0;
  let lastCode = "";
  const clearTimers = () => {
    if (retry !== undefined) cancel(retry);
    if (stable !== undefined) cancel(stable);
    retry = stable = undefined;
  };
  const dispose = () => {
    disposed = true;
    clearTimers();
    const previous = socket;
    socket = null;
    if (previous) {
      previous.onopen = previous.onmessage = previous.onclose = null;
      previous.close();
    }
  };
  const connect = () => {
    if (disposed) return;
    retry = undefined;
    const current = createSocket(options.url(lastCode));
    socket = current;
    const owns = () => !disposed && socket === current;
    current.onopen = () => {
      if (!owns()) return;
      stable = schedule(() => {
        if (!owns()) return;
        stable = undefined;
        if (current.readyState === 1) tries = 0;
      }, 15_000);
    };
    current.onmessage = (message) => {
      if (!owns()) return;
      const event = receiveRoomEvent(message.data);
      if (event.t === "state") hasSnapshot = true;
      options.onEvent(event);
    };
    current.onclose = (event) => {
      if (!owns()) return;
      socket = null;
      clearTimers();
      current.onopen = current.onmessage = current.onclose = null;
      if (event.code === 4003) {
        dispose();
        options.onRemoved();
        return;
      }
      if (!hasSnapshot && event.code !== 1000) {
        dispose();
        options.onUnavailable();
        return;
      }
      lastCode = String(event.code || "");
      retry = schedule(connect, Math.min(30_000, 1000 * 2 ** tries++));
    };
  };
  return {
    start() {
      if (!socket && retry === undefined && !disposed) connect();
    },
    dispose,
    send(command: RoomCommand) {
      return sendRoomCommand(socket, command);
    },
    /** Request a fresh snapshot using the normal reconnect/backoff path. */
    resync() {
      socket?.close();
    },
  };
}
