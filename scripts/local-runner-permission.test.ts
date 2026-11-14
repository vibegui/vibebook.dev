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
test("synchronous focusing publication cancellation/disposal cannot dispatch an old relay request", async () => {
  for (const action of ["cancel", "dispose"] as const) {
    let calls = 0;
    const runner = createLocalRunner({
      relayFocus: async () => {
        calls++;
        return { ok: true };
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
test("focus uses the authenticated relay even when local network permission is denied and never contacts loopback", async () => {
  let queries = 0,
    probes = 0;
  const calls: string[] = [];
  const runner = createLocalRunner({
    fetcher: async () => {
      probes++;
      throw Error("Unexpected loopback request");
    },
    permission: async () => {
      queries++;
      return "denied";
    },
    relayFocus: async (roomId, signal) => {
      expect(signal.aborted).toBe(false);
      calls.push(roomId);
      return { ok: true };
    },
  });
  await runner.focus("room /id");
  expect(calls).toEqual(["room /id"]);
  expect(queries).toBe(0);
  expect(probes).toBe(0);
  expect(get(runner.state)).toMatchObject({
    focusing: false,
    focusError: false,
    focusBlocked: false,
  });
  runner.dispose();
});
test("folder/ping hints contact only the fixed credentialless loopback after an existing permission grant", async () => {
  for (const permission of [
    "denied",
    "prompt",
    "granted",
    null,
  ] satisfies (PermissionState | null)[]) {
    const calls: { url: string; init?: RequestInit }[] = [];
    const runner = createLocalRunner({
      permission: async () => permission,
      fetcher: async (url, init) => {
        calls.push({ url: String(url), init });
        return Response.json(
          String(url).endsWith("/ping")
            ? { rooms: ["room /id"] }
            : { folder: "/home/project", home: "/home" },
        );
      },
    });
    await runner.probe("room /id", "Title & room", true);
    expect(calls.length).toBe(permission === "granted" ? 2 : 0);
    for (const call of calls) {
      expect(call.url.startsWith(LOCAL_RUNNER_ORIGIN + "/")).toBe(true);
      expect(call.init).toMatchObject({
        credentials: "omit",
        cache: "no-store",
      });
    }
    expect(get(runner.state).where?.folder ?? null).toBe(
      permission === "granted" ? "/home/project" : null,
    );
    runner.dispose();
  }
});
test("cancel/dispose before permission resolves cannot initiate a late hint request", async () => {
  for (const action of ["cancel", "dispose"] as const) {
    let resolve!: (value: PermissionState) => void,
      calls = 0;
    const permission = new Promise<PermissionState>((yes) => {
      resolve = yes;
    });
    const runner = createLocalRunner({
      permission: () => permission,
      fetcher: async () => {
        calls++;
        return Response.json({});
      },
    });
    const task = runner.probe("old", "Old", true);
    await flush();
    runner[action]();
    await task;
    resolve("granted");
    await flush();
    expect(calls).toBe(0);
    runner.dispose();
  }
});
test("late relay completion cannot revive cancelled/disposed state; errors do not offer browser permission instructions", async () => {
  for (const action of ["cancel", "dispose"] as const) {
    let resolve!: (value: { ok: true }) => void;
    const result = new Promise<{ ok: true }>((yes) => {
      resolve = yes;
    });
    const runner = createLocalRunner({ relayFocus: () => result });
    const task = runner.focus("old");
    await flush();
    runner[action]();
    await task;
    resolve({ ok: true });
    await flush();
    expect(get(runner.state)).toMatchObject({
      focusing: false,
      focusError: false,
      focusBlocked: false,
    });
    runner.dispose();
  }
  const runner = createLocalRunner({
    relayFocus: async () => {
      throw Error("server unavailable");
    },
  });
  await runner.focus("room");
  expect(get(runner.state)).toMatchObject({
    focusing: false,
    focusError: true,
    focusBlocked: false,
  });
  runner.dispose();
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

test("inferred focus API sends same-origin POST and rejects a successful non-contract body", async () => {
  const { createAgentsApi } = await import("../svelte/features/agents/api");
  const calls: { url: string; method: string }[] = [];
  let response: unknown = { ok: true };
  const api = createAgentsApi(async (input, init) => {
    const request = new Request(
      new URL(String(input), "https://vibebook.test"),
      init,
    );
    calls.push({ url: request.url, method: request.method });
    return Response.json(response);
  });
  expect(await api.focus("room /id")).toEqual({ ok: true });
  expect(new URL(calls[0].url).pathname).toBe("/api/books/room%20%2Fid/focus");
  expect(calls[0].method).toBe("POST");
  expect(calls[0].url).not.toContain(LOCAL_RUNNER_ORIGIN);
  response = { status: "queued" };
  await expect(api.focus("room /id")).rejects.toThrow("Invalid agent response");
});
