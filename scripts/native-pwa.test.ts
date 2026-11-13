import { describe, expect, test } from "bun:test";
import { get } from "svelte/store";
import {
  createPushReconciler,
  type Subscription,
} from "../svelte/features/notifications/reconcile";
import type { PushApi } from "../svelte/features/notifications/api";
import { createPushApi } from "../svelte/features/notifications/api";
import { notificationPolicy } from "../svelte/features/notifications/policy";
import { installOutcome } from "../svelte/features/pwa/platform";
import { notificationTarget } from "../service-worker/payload";
import { mkdtemp, mkdir, writeFile, symlink, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createDevelopmentRequestPolicy } from "../svelte/build/developmentRequests";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((yes) => {
    resolve = yes;
  });
  return { promise, resolve };
}
function fixture() {
  const calls: string[] = [];
  let subscription: Subscription | null = null;
  const port = {
    get: async () => subscription,
    subscribe: async () => {
      calls.push("browser:subscribe");
      const sub: Subscription = {
        endpoint: "https://push.example.test/device",
        toJSON: () => ({
          endpoint: sub.endpoint,
          keys: { p256dh: "public", auth: "auth" },
        }),
        unsubscribe: async () => {
          calls.push("browser:unsubscribe");
          if (subscription === sub) subscription = null;
          return true;
        },
      };
      subscription = sub;
      return sub;
    },
  };
  const api: PushApi = {
    key: async () => "key",
    subscribe: async () => {
      calls.push("server:subscribe");
      return { ok: true };
    },
    unsubscribe: async () => {
      calls.push("server:unsubscribe");
      return { ok: true };
    },
    test: async () => ({ ok: true, sent: 0 }),
  };
  return { calls, port, api };
}
describe("native push ownership", () => {
  test("disposal during either key-rotation await cannot start a new browser subscription", async () => {
    for (const phase of ["server", "browser"] as const) {
      const f = fixture(),
        entered = deferred<void>(),
        pending = deferred<void>();
      let rotate = false;
      const service = createPushReconciler(f.api, {
        ...f.port,
        matchesKey: () => !rotate,
      });
      try {
        await service.set("a@example.test", true);
        rotate = true;
        if (phase === "server")
          f.api.unsubscribe = async () => {
            entered.resolve();
            await pending.promise;
            return { ok: true };
          };
        else {
          const sub = (await f.port.get())!;
          sub.unsubscribe = async () => {
            entered.resolve();
            await pending.promise;
            return true;
          };
        }
        const rotating = service.set("a@example.test", true);
        await entered.promise;
        service.dispose();
        pending.resolve();
        await rotating;
        expect(
          f.calls.filter((call) => call === "browser:subscribe"),
        ).toHaveLength(1);
      } finally {
        service.dispose();
        pending.resolve();
      }
    }
  });
  test("account replacement during key rotation cannot subscribe with the stale account's key", async () => {
    const f = fixture(),
      entered = deferred<void>(),
      pending = deferred<void>(),
      keys: string[] = [];
    let key = "initial",
      blocked = false;
    f.api.key = async () => key;
    f.api.unsubscribe = async () => {
      if (!blocked) {
        blocked = true;
        entered.resolve();
        await pending.promise;
      }
      return { ok: true };
    };
    const service = createPushReconciler(f.api, {
      ...f.port,
      matchesKey: (_sub, next) => next === "initial",
      subscribe: async (next) => {
        keys.push(next);
        return f.port.subscribe();
      },
    });
    try {
      await service.set("old@example.test", true);
      key = "stale";
      const rotating = service.set("old@example.test", true);
      await entered.promise;
      key = "current";
      const replaced = service.set("new@example.test", true);
      pending.resolve();
      await rotating;
      await replaced;
      expect(keys).toEqual(["initial", "current"]);
      expect(get(service.state).status).toBe("on");
    } finally {
      service.dispose();
      pending.resolve();
    }
  });
  test("a late enable write settles before mute reconciliation; UI timeout does not cancel it", async () => {
    const f = fixture(),
      entered = deferred<void>(),
      pending = deferred<{ ok: true }>();
    f.api.subscribe = async () => {
      f.calls.push("server:subscribe:start");
      entered.resolve();
      await pending.promise;
      f.calls.push("server:subscribe:end");
      return { ok: true };
    };
    const service = createPushReconciler(f.api, f.port, 5);
    try {
      const running = service.set("a@example.test", true);
      await entered.promise;
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(get(service.state).status).toBe("unconfirmed");
      const muted = service.set("a@example.test", false);
      expect(f.calls).not.toContain("server:unsubscribe");
      pending.resolve({ ok: true });
      await running;
      await muted;
      expect(f.calls).toEqual([
        "browser:subscribe",
        "server:subscribe:start",
        "server:subscribe:end",
        "server:unsubscribe",
        "browser:unsubscribe",
      ]);
      expect(get(service.state).status).toBe("off");
    } finally {
      service.dispose();
    }
  });
  test("account replacement reconciles only after an old account's in-flight write", async () => {
    const f = fixture(),
      entered = deferred<void>(),
      pending = deferred<void>();
    let writes = 0;
    f.api.subscribe = async () => {
      f.calls.push(`server:subscribe:${++writes}`);
      if (writes === 1) {
        entered.resolve();
        await pending.promise;
      }
      return { ok: true };
    };
    const service = createPushReconciler(f.api, f.port);
    try {
      const first = service.set("old@example.test", true);
      await entered.promise;
      const replacement = service.set("new@example.test", true);
      expect(writes).toBe(1);
      pending.resolve();
      await first;
      await replacement;
      expect(writes).toBe(2);
      expect(get(service.state).status).toBe("on");
    } finally {
      service.dispose();
    }
  });
  test("failed server cleanup retains the endpoint for a real retry after local unsubscribe", async () => {
    const f = fixture();
    let fail = true;
    f.api.unsubscribe = async () => {
      f.calls.push("server:unsubscribe");
      if (fail) throw new Error("offline");
      return { ok: true };
    };
    const service = createPushReconciler(f.api, f.port);
    try {
      await service.set("a@example.test", true);
      await service.set("a@example.test", false);
      expect(get(service.state).status).toBe("failed");
      expect(await f.port.get()).toBeNull();
      fail = false;
      await service.retry();
      expect(get(service.state).status).toBe("off");
      expect(
        f.calls.filter((call) => call === "server:unsubscribe"),
      ).toHaveLength(2);
    } finally {
      service.dispose();
    }
  });
  test("logout revokes local delivery while an old server mutation remains unconfirmed", async () => {
    const f = fixture(),
      entered = deferred<void>(),
      pending = deferred<void>();
    f.api.subscribe = async () => {
      entered.resolve();
      await pending.promise;
      return { ok: true };
    };
    const service = createPushReconciler(f.api, f.port, 5);
    try {
      const initial = service.set("a@example.test", true);
      await entered.promise;
      const result = await service.beforeLogout();
      expect(result).toEqual({ local: true, settled: false, confirmed: false });
      expect(get(service.state).status).toBe("unconfirmed");
      expect(await f.port.get()).toBeNull();
      pending.resolve();
      await initial;
      expect(f.calls).toContain("server:unsubscribe");
      expect(get(service.state).status).toBe("off");
      await service.set("other@example.test", true);
      expect(get(service.state).status).toBe("off");
    } finally {
      service.dispose();
    }
  });
});
test("notification navigation preserves each existing tab's opt-in and defaults new windows to vanilla", () => {
  const origin = "https://vibebook.example.test",
    target = "/b/abc123?t=thread#m1";
  const native = new URL(
    notificationTarget(target, origin, `${origin}/app?ui=svelte`),
  );
  expect(native.searchParams.get("ui")).toBe("svelte");
  expect(native.searchParams.get("t")).toBe("thread");
  expect(
    new URL(
      notificationTarget("/b/abc123?ui=svelte#m1", origin, `${origin}/app`),
    ).searchParams.has("ui"),
  ).toBe(false);
  expect(
    new URL(notificationTarget("/app?ui=svelte", origin)).searchParams.has(
      "ui",
    ),
  ).toBe(false);
  for (const unsafe of [
    "https://evil.example.test/b/abc123",
    "javascript:alert(1)",
    "/auth/logout",
    "//evil.example.test/app",
  ])
    expect(new URL(notificationTarget(unsafe, origin)).pathname).toBe("/app");
});
test("only emitted stable worker assets are public; raw worker realm source and symlink escapes remain private", async () => {
  const root = await mkdtemp(join(tmpdir(), "vibebook-worker-policy-"));
  try {
    await Promise.all(
      ["svelte", "shared", "collab", "public", "service-worker"].map((path) =>
        mkdir(join(root, path)),
      ),
    );
    await writeFile(
      join(root, "public/sw.js"),
      "self.addEventListener('push',()=>{});",
    );
    const source = join(root, "service-worker/notifications.ts");
    await writeFile(source, "export {};");
    await symlink(source, join(root, "svelte/worker.ts"));
    await symlink(source, join(root, "public/sw-source.js"));
    const policy = createDevelopmentRequestPolicy(root);
    expect(() => policy.assertRequest("/sw.js")).not.toThrow();
    for (const url of [
      `/@fs/${source}?raw`,
      `/@fs/${root}/%73ervice-worker/notifications.ts?raw`,
      `/@id/${source}?raw`,
      "/worker.ts?raw",
      "/sw-source.js?raw",
    ])
      expect(() => policy.assertRequest(url)).toThrow("[client-boundary]");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
test("foreground policy keeps mute/self/quiet suppression and explicit agent relevance", () => {
  const room = {
    me: "me@example.test",
    messages: [{ id: 1, author: "me@example.test" }],
  };
  const base = { text: "hello", author: "other@example.test", thread: "main" };
  const policy = (
    message: Parameters<typeof notificationPolicy>[0],
    hidden = true,
    muted = false,
  ) =>
    notificationPolicy(message, room, "main", hidden, muted, (handle) =>
      handle === "me" ? room.me : null,
    );
  expect(policy(base)).toMatchObject({ chime: true, browser: true });
  expect(policy(base, false)).toMatchObject({ chime: false, browser: false });
  expect(policy({ ...base, author: room.me })).toMatchObject({ chime: false });
  expect(policy({ ...base, quiet: true })).toMatchObject({ chime: false });
  expect(policy(base, true, true)).toMatchObject({ chime: false });
  expect(policy({ ...base, kind: "agent" })).toMatchObject({ chime: false });
  expect(policy({ ...base, kind: "agent", reply_to: 1 })).toMatchObject({
    chime: true,
  });
  expect(policy({ ...base, kind: "agent", text: "@me help" })).toMatchObject({
    mentioned: true,
    chime: true,
  });
});
test("install outcomes and typed push responses reject malformed data; sent zero remains zero", async () => {
  expect(installOutcome({ outcome: "dismissed" })).toBe("dismissed");
  expect(() => installOutcome({ outcome: "success" })).toThrow();
  const valid = createPushApi(async () => Response.json({ ok: true, sent: 0 }));
  expect(await valid.test()).toEqual({ ok: true, sent: 0 });
  const malformed = createPushApi(async () =>
    Response.json({ ok: true, sent: "1" }),
  );
  await expect(malformed.test()).rejects.toThrow();
  const failed = createPushApi(async () =>
    Response.json({ error: "offline" }, { status: 503 }),
  );
  await expect(failed.key()).rejects.toThrow("offline");
});
