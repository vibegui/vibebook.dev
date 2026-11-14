export type AgentClock = {
  now(): number;
  schedule(fn: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
export const agentClock: AgentClock = {
  now: () => Date.now(),
  schedule: (fn, ms) => setTimeout(fn, ms),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
export class AgentLeaseFailure extends Error {
  constructor(readonly code: "timeout" | "cancelled") {
    super(code);
  }
}
/** The deadline settles independently of a fetch implementation that ignores AbortSignal. */
export function createAgentLease(clock: AgentClock = agentClock) {
  let cancelCurrent: (() => void) | undefined;
  return {
    cancel() {
      cancelCurrent?.();
      cancelCurrent = undefined;
    },
    run<T>(
      call: (signal: AbortSignal) => Promise<T>,
      milliseconds: number,
    ): Promise<T> {
      cancelCurrent?.();
      return new Promise<T>((resolve, reject) => {
        let settled = false,
          timer: unknown;
        const controller = new AbortController();
        const finish = (action: () => void) => {
          if (settled) return;
          settled = true;
          clock.cancel(timer);
          if (cancelCurrent === cancel) cancelCurrent = undefined;
          action();
        };
        const cancel = () =>
          finish(() => {
            controller.abort();
            reject(new AgentLeaseFailure("cancelled"));
          });
        cancelCurrent = cancel;
        timer = clock.schedule(
          () =>
            finish(() => {
              controller.abort();
              reject(new AgentLeaseFailure("timeout"));
            }),
          milliseconds,
        );
        void Promise.resolve()
          .then(() => {
            if (settled) throw new AgentLeaseFailure("cancelled");
            return call(controller.signal);
          })
          .then(
            (result) => finish(() => resolve(result)),
            (error: unknown) => finish(() => reject(error)),
          );
      });
    },
  };
}
