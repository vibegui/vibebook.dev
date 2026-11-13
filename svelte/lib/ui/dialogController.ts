import { flushSync } from "svelte";

const active = new Set<() => void>();

export function registerDialog(close: () => void): () => void {
  active.add(close);
  return () => {
    active.delete(close);
  };
}

/** Finish modal teardown before opening a native dialog or changing routes. */
export function dismissDialogs(): void {
  flushSync(() => {
    for (const close of [...active]) close();
  });
}
