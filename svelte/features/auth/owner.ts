export const AUTH_REQUEST_TIMEOUT = 20_000;
export type AuthClock = {
  schedule(fn: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
export const authClock: AuthClock = {
  schedule: (fn, ms) => setTimeout(fn, ms),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
/** One mounted page owns each async action. An expired/replaced request never navigates or steals a newer draft. */
export function createAuthOwner(clock: AuthClock = authClock) {
  let active = true,
    sequence = 0,
    pending = false,
    timer: unknown | null = null,
    controller: AbortController | null = null;
  const cancel = () => {
    sequence++;
    pending = false;
    controller?.abort();
    controller = null;
    if (timer !== null) clock.cancel(timer);
    timer = null;
  };
  return {
    active: () => active,
    async run<T>(
      operation: (signal: AbortSignal) => Promise<T>,
      success: (value: T) => void,
      failure: (error: unknown) => void,
    ) {
      if (!active || pending) return false;
      const ticket = ++sequence;
      pending = true;
      controller = new AbortController();
      const owns = () => active && ticket === sequence;
      timer = clock.schedule(() => {
        if (!owns()) return;
        cancel();
        failure(new Error("timeout"));
      }, AUTH_REQUEST_TIMEOUT);
      try {
        const result = await operation(controller.signal);
        if (owns()) {
          cancel();
          success(result);
          return true;
        }
      } catch (error) {
        if (owns()) {
          cancel();
          failure(error);
        }
      }
      return false;
    },
    cancel,
    dispose() {
      active = false;
      cancel();
    },
  };
}
