import { authClock, type AuthClock } from "../auth/owner";
/** A timeout cancels local ownership, never claims rollback of an HTTP mutation. */
export function createAppRequests(clock: AuthClock = authClock) {
  let active = true;
  const pending = new Set<() => void>();
  return {
    run<T>(operation: (signal: AbortSignal) => Promise<T>): Promise<T> {
      if (!active) return Promise.reject(Error("App is no longer active"));
      return new Promise<T>((resolve, reject) => {
        const controller = new AbortController();
        let done = false,
          timer: unknown;
        const finish = (
          value: { ok: true; value: T } | { ok: false; error: unknown },
        ) => {
          if (done) return;
          done = true;
          clock.cancel(timer);
          pending.delete(cancel);
          controller.abort();
          value.ok ? resolve(value.value) : reject(value.error);
        };
        const cancel = () =>
          finish({ ok: false, error: Error("App is no longer active") });
        pending.add(cancel);
        timer = clock.schedule(
          () =>
            finish({
              ok: false,
              error: Error(
                "Request unconfirmed; it may have completed. Review before trying again.",
              ),
            }),
          20_000,
        );
        try {
          void operation(controller.signal).then(
            (value) => finish({ ok: true, value }),
            (error) => finish({ ok: false, error }),
          );
        } catch (error) {
          finish({ ok: false, error });
        }
      });
    },
    dispose() {
      active = false;
      for (const cancel of [...pending]) cancel();
    },
  };
}
