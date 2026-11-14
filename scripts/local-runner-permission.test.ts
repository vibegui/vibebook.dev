import { expect, test } from "bun:test";
import { get } from "svelte/store";
import {
  createLocalRunner,
  localNetworkPermission,
  LOCAL_RUNNER_ORIGIN,
} from "../svelte/features/agents/runner";
const flush = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve();
};
test("synchronous focusing publication cancellation/disposal cannot dispatch an old focus request", async () => {
  for (const action of ["cancel", "dispose"] as const) {
    let calls = 0;
    const runner = createLocalRunner({
      fetcher: async () => {
        calls++;
        return Response.json({});
      },
    });
    const stop = runner.state.subscribe((value) => {
      if (value.focusing) runner[action]();
    });
    await runner.focus("old");
    expect(calls).toBe(0);
    expect(get(runner.state).focusing).toBe(false);
    stop();
    runner.dispose();
  }
});
test("failed focus distinguishes known local-network blocks from unavailable/unsupported permission", async () => {
  for (const permission of [
    "denied",
    "prompt",
    "granted",
    null,
  ] satisfies (PermissionState | null)[]) {
    const calls: { url: string; init?: RequestInit }[] = [];
    const runner = createLocalRunner({
      fetcher: async (url, init) => {
        calls.push({ url: String(url), init });
        throw TypeError("Failed to fetch");
      },
      permission: async () => permission,
    });
    try {
      await runner.focus("room /id");
      expect(get(runner.state)).toMatchObject({
        focusing: false,
        focusError: true,
        focusBlocked: permission === "denied" || permission === "prompt",
      });
      expect(calls).toHaveLength(1);
      expect(calls[0].url).toBe(
        `${LOCAL_RUNNER_ORIGIN}/focus?room=room%20%2Fid`,
      );
      expect(calls[0].init).toMatchObject({
        credentials: "omit",
        cache: "no-store",
      });
    } finally {
      runner.dispose();
    }
  }
});
test("success and explicit runner error do not query browser permission", async () => {
  let queries = 0;
  for (const result of [{}, { error: "runner failure" }]) {
    const runner = createLocalRunner({
      fetcher: async () => Response.json(result),
      permission: async () => {
        queries++;
        return "denied";
      },
    });
    await runner.focus("room");
    expect(get(runner.state)).toMatchObject({
      focusing: false,
      focusError: "error" in result,
      focusBlocked: false,
    });
    runner.dispose();
  }
  expect(queries).toBe(0);
});
test("cancel/dispose fence an ignored late permission query without reviving old errors", async () => {
  for (const action of ["cancel", "dispose"] as const) {
    let resolve!: (value: PermissionState) => void;
    const permission = new Promise<PermissionState>((yes) => {
      resolve = yes;
    });
    const runner = createLocalRunner({
      fetcher: async () => {
        throw TypeError("Failed to fetch");
      },
      permission: () => permission,
    });
    const task = runner.focus("old");
    await flush();
    runner[action]();
    await task;
    resolve("denied");
    await flush();
    expect(get(runner.state)).toMatchObject({
      focusing: false,
      focusBlocked: false,
      focusError: false,
    });
    runner.dispose();
  }
});
test("actual permission adapter uses original receiver, validates result and tolerates unsupported browser API", async () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "navigator");
  const calls: unknown[] = [];
  let value: unknown = { state: "denied" };
  const permissions = {
    query(this: object, descriptor: unknown) {
      expect(this === permissions).toBe(true);
      calls.push(descriptor);
      return Promise.resolve(value);
    },
  };
  try {
    Object.defineProperty(globalThis, "navigator", {
      value: { permissions },
      configurable: true,
    });
    expect(await localNetworkPermission()).toBe("denied");
    expect(calls).toEqual([{ name: "local-network-access" }]);
    for (const result of [null, [], {}, { state: "unexpected" }]) {
      value = result;
      expect(await localNetworkPermission()).toBeNull();
    }
    Object.defineProperty(globalThis, "navigator", {
      value: {
        permissions: {
          query() {
            throw TypeError("Unsupported permission name");
          },
        },
      },
      configurable: true,
    });
    expect(await localNetworkPermission()).toBeNull();
  } finally {
    if (original) Object.defineProperty(globalThis, "navigator", original);
    else Reflect.deleteProperty(globalThis, "navigator");
  }
});
