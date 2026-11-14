import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { createDeferredModule } from "../svelte/features/deferred-view/module";
import type { AuthClock } from "../svelte/features/auth/owner";
const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
};
function deferred<T>() {
  let resolve!: (value: T) => void, reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
function clockFixture() {
  const timers = new Map<number, () => void>();
  let serial = 0;
  const clock: AuthClock = {
    schedule: (callback) => {
      const id = ++serial;
      timers.set(id, callback);
      return id;
    },
    cancel: (handle) => {
      if (typeof handle === "number") timers.delete(handle);
    },
  };
  return {
    clock,
    timers,
    expire() {
      const entries = [...timers.values()];
      timers.clear();
      for (const fn of entries) fn();
    },
  };
}
test("inactive views do not import; concurrent requests share a promise and component stays stable on repeated visits", async () => {
  let calls = 0;
  const pending = deferred<{ view: string }>(),
    clock = clockFixture();
  const module = createDeferredModule(
    () => {
      calls++;
      return pending.promise;
    },
    { current: () => true, clock: clock.clock },
  );
  expect(calls).toBe(0);
  expect(get(module.state).phase).toBe("idle");
  const first = module.ensure();
  expect(module.ensure()).toBe(first);
  await flush();
  expect(calls).toBe(1);
  const component = { view: "retained" };
  pending.resolve(component);
  await first;
  expect(get(module.state)).toEqual({ phase: "ready", component });
  module.ensure();
  module.retry();
  expect(get(module.state).component).toBe(component);
  expect(calls).toBe(1);
  expect(clock.timers.size).toBe(0);
  module.dispose();
});
test("late module completion cannot publish into a departed owner or a replacement account", async () => {
  const pending = deferred<{ view: string }>(),
    clock = clockFixture();
  let current = true;
  const module = createDeferredModule(() => pending.promise, {
    current: () => current,
    clock: clock.clock,
  });
  const promise = module.ensure();
  await flush();
  current = false;
  module.dispose();
  pending.resolve({ view: "old-account" });
  await promise;
  expect(get(module.state).component).toBeNull();
  expect(clock.timers.size).toBe(0);
});
test("deadline releases the old request, explicit retry owns the result, and late old success cannot replace it", async () => {
  const old = deferred<string>(),
    next = deferred<string>(),
    clock = clockFixture();
  let calls = 0;
  const module = createDeferredModule(
    () => (++calls === 1 ? old.promise : next.promise),
    { current: () => true, clock: clock.clock },
  );
  const before = module.ensure();
  await flush();
  clock.expire();
  expect(get(module.state).phase).toBe("error");
  module.ensure();
  expect(calls).toBe(1);
  const retry = module.retry();
  await flush();
  next.resolve("new");
  await retry;
  old.resolve("stale");
  await before;
  expect(get(module.state)).toEqual({ phase: "ready", component: "new" });
  module.dispose();
});
test("import rejection is visible and never automatically retried by a store update", async () => {
  let calls = 0;
  const clock = clockFixture();
  const module = createDeferredModule(
    async () => {
      calls++;
      throw Error("network");
    },
    { current: () => true, clock: clock.clock },
  );
  await module.ensure();
  expect(get(module.state).phase).toBe("error");
  module.ensure();
  expect(calls).toBe(1);
  expect(clock.timers.size).toBe(0);
  module.dispose();
  module.retry();
  expect(calls).toBe(1);
});
test("departing before the import microtask prevents starting an unrequested old-view fetch", async () => {
  let calls = 0;
  const clock = clockFixture();
  const module = createDeferredModule(
    async () => {
      calls++;
      return "component";
    },
    { current: () => true, clock: clock.clock },
  );
  const pending = module.ensure();
  module.dispose();
  await pending;
  expect(calls).toBe(0);
  expect(clock.timers.size).toBe(0);
});
