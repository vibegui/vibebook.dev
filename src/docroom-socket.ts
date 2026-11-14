type RelaySocket = {
  readonly readyState: number;
  send(message: Uint8Array): void;
};
const AFTER_CLOSE = "Can't call WebSocket send() after close().";

/** Preserve the pinned relay's setup/protocol and unsubscribe bookkeeping while
 * guarding both initial sync and subsequent awareness/document broadcasts.
 * The private view is never retained as a session/event owner. */
export function registerDocSocket<T extends RelaySocket>(
  socket: T,
  sessions: Map<T, () => void>,
  register: (view: T) => void,
): void {
  if (socket.readyState !== 1 || sessions.has(socket)) return;
  const view = new Proxy(socket, {
    get(target, key) {
      if (key !== "send") return Reflect.get(target, key, target);
      return (message: Uint8Array) => {
        if (socket.readyState !== 1) return;
        try {
          socket.send(message);
        } catch (error) {
          // A peer can close between the state check and the runtime send. Only
          // the observed closed-socket race is expected; other faults stay visible.
          if (
            socket.readyState !== 1 &&
            error instanceof TypeError &&
            error.message === AFTER_CLOSE
          )
            return;
          throw error;
        }
      };
    },
  });
  try {
    register(view);
  } catch (error) {
    sessions.get(view)?.();
    sessions.delete(view);
    throw error;
  }
  const unsubscribe = sessions.get(view);
  sessions.delete(view);
  if (!unsubscribe) return;
  if (socket.readyState !== 1) unsubscribe();
  else sessions.set(socket, unsubscribe);
}
