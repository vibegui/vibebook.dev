/** Browser-owned timer boundary, shared by UI request and module owners. */
export type ClientClock = {
  schedule(fn: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
export const clientClock: ClientClock = {
  schedule: (fn, ms) => setTimeout(fn, ms),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
