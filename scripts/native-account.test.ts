// Pure owners and actual typed HTTP boundary fixtures, not Worker/WebAuthn runtime acceptance.
import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { createAccountSession } from "../svelte/features/account/session";
import {
  AccountFailure,
  createAccountApi,
  type AccountApi,
} from "../svelte/features/account/api";
import { createPersonalSession } from "../svelte/features/home/personal";
import {
  createDeviceLock,
  DEVICE_LOCK_AFTER,
} from "../svelte/features/account/device";
import {
  deferred,
  homeApi,
  manualClock,
  me,
  settle,
} from "./native-home-fixtures";
import type { LoginsResult } from "../shared/schemas";
function api(overrides: Partial<AccountApi> = {}): AccountApi {
  return {
    logins: async () => ({
      logins: [],
      providers: { google: false, github: false },
    }),
    name: async (name) => ({ ok: true, name }),
    avatar: async () => ({ ok: true, avatar: 2 }),
    addFriend: async () => ({ ok: true }),
    removeFriend: async () => ({ ok: true }),
    ...overrides,
  };
}
async function fixture(overrides: Partial<AccountApi> = {}) {
  const time = manualClock();
  let canonical = me();
  const personal = createPersonalSession(
    homeApi({ me: async () => canonical }),
    { clock: time.clock },
  );
  await personal.refresh();
  const owner = createAccountSession(personal, api(overrides), time.clock);
  owner.open();
  return {
    time,
    personal,
    owner,
    canonical: (value: ReturnType<typeof me>) => {
      canonical = value;
    },
    dispose: () => {
      owner.dispose();
      personal.dispose();
    },
  };
}
test("mutation ACK never substitutes for canonical profile confirmation; bounded wait and explicit read recover", async () => {
  let writes = 0;
  const h = await fixture({
    name: async (name) => {
      writes++;
      return { ok: true, name };
    },
  });
  h.owner.rename("New");
  await settle();
  expect(get(h.owner.state).phase).toBe("confirming");
  expect(get(h.owner.state).me?.name).toBe("Me");
  h.time.advance(10_000);
  expect(get(h.owner.state).phase).toBe("unconfirmed");
  expect(writes).toBe(1);
  h.canonical(me({ name: "New" }));
  h.owner.refresh();
  await settle();
  expect(get(h.owner.state).phase).toBe("idle");
  expect(writes).toBe(1);
  h.dispose();
});
test("collaborator reversal before ACK remains unconfirmed and permits only explicit mutation retry", async () => {
  const response = deferred<{ ok: true; name: string }>();
  let writes = 0;
  const h = await fixture({
    name: async () => {
      writes++;
      return response.promise;
    },
  });
  h.owner.rename("Wanted");
  h.canonical(me({ name: "Other" }));
  await h.personal.refresh();
  response.resolve({ ok: true, name: "Wanted" });
  await settle();
  h.time.advance(10_000);
  h.owner.rename("Second");
  expect(writes).toBe(1);
  h.owner.review();
  h.owner.rename("Second");
  await settle();
  expect(writes).toBe(2);
  h.dispose();
});
test("identity replacement closes private state synchronously and fences late mutation/read results", async () => {
  const response = deferred<{ ok: true; name: string }>(),
    history = deferred<LoginsResult>();
  const h = await fixture({
    name: () => response.promise,
    logins: () => history.promise,
  });
  h.owner.rename("Private A");
  h.personal.acceptIdentity("b@test", false);
  expect(get(h.owner.state)).toMatchObject({
    open: false,
    me: null,
    logins: null,
  });
  response.resolve({ ok: true, name: "Private A" });
  history.resolve({
    logins: [{ method: "email", last: 1, n: 1 }],
    providers: { google: true, github: false },
  });
  await settle();
  expect(get(h.owner.state)).toMatchObject({
    open: false,
    me: null,
    logins: null,
  });
  h.dispose();
});
test("closed avatar conversion never uploads after reopening same account", async () => {
  const conversion = deferred<Blob>();
  let uploads = 0;
  const h = await fixture({
    avatar: async () => {
      uploads++;
      return { ok: true, avatar: 2 };
    },
  });
  h.owner.photo(() => conversion.promise);
  h.owner.close();
  h.owner.open();
  conversion.resolve(new Blob(["image"]));
  await settle();
  expect(uploads).toBe(0);
  expect(get(h.owner.state).phase).toBe("idle");
  h.dispose();
});
test("ignored-abort conversion deadline fences upload and requires explicit recovery", async () => {
  const conversion = deferred<Blob>();
  let uploads = 0;
  const h = await fixture({
    avatar: async () => {
      uploads++;
      return { ok: true, avatar: 2 };
    },
  });
  h.owner.photo(() => conversion.promise);
  h.time.advance(20_000);
  expect(get(h.owner.state).phase).toBe("unconfirmed");
  conversion.resolve(new Blob(["image"]));
  await settle();
  expect(uploads).toBe(0);
  h.owner.review();
  expect(get(h.owner.state).phase).toBe("idle");
  h.dispose();
});
test("known server refusal retains account and permits explicit correction without uncertainty", async () => {
  const h = await fixture({
    addFriend: async () => {
      throw new AccountFailure("invalid email", 400);
    },
  });
  h.owner.add("bad");
  await settle();
  expect(get(h.owner.state).phase).toBe("error");
  expect(get(h.owner.state).me?.email).toBe("me@test.com");
  h.dispose();
});
test("typed Account API rejects malformed success and preserves explicit server failure", async () => {
  const broken = createAccountApi(
    async () =>
      new Response(
        JSON.stringify({
          logins: [],
          providers: { google: "yes", github: false },
        }),
        { headers: { "content-type": "application/json" } },
      ),
  );
  await expect(broken.logins(new AbortController().signal)).rejects.toThrow(
    "invalid-response",
  );
  const denied = createAccountApi(
    async () =>
      new Response(JSON.stringify({ error: "forbidden" }), { status: 403 }),
  );
  await expect(
    denied.name("X", new AbortController().signal),
  ).rejects.toMatchObject({ status: 403, message: "forbidden" });
});
function device(stored: string | null = null) {
  const time = manualClock(),
    data = new Map<string, string>(stored ? [["vb.lock", stored]] : []);
  let now = 0,
    creates = 0,
    gets = 0;
  const result = deferred<Credential | null>();
  const owner = createDeviceLock({
    storage: {
      getItem: (key) => data.get(key) ?? null,
      setItem: (key, value) => {
        data.set(key, value);
      },
      removeItem: (key) => {
        data.delete(key);
      },
    },
    credentials: {
      create: async () => {
        creates++;
        return result.promise;
      },
      get: async () => {
        gets++;
        return result.promise;
      },
    },
    random: (size) => new Uint8Array(size),
    now: () => now,
    clock: time.clock,
  });
  return {
    owner,
    result,
    time,
    data,
    now: (value: number) => {
      now = value;
    },
    calls: () => ({ creates, gets }),
  };
}
const credential = (): Credential & { rawId: ArrayBuffer } => ({
  id: "local",
  type: "public-key",
  rawId: new Uint8Array([1, 2, 3]).buffer,
});
test("local lock setup and unlock never prompt automatically; cancellation leaves stored state unchanged", async () => {
  const h = device();
  expect(h.calls()).toEqual({ creates: 0, gets: 0 });
  const pending = h.owner.configure(true, "me@test", () => true);
  expect(h.calls().creates).toBe(1);
  h.result.resolve(null);
  await pending;
  expect(h.data.has("vb.lock")).toBe(false);
  expect(get(h.owner.state).error).toBe("device-failed");
  h.owner.dispose();
});
test("late credential creation from old account/disposed owner never stores a key", async () => {
  for (const disposed of [false, true]) {
    const h = device();
    let current = true;
    const pending = h.owner.configure(true, "a@test", () => current);
    current = false;
    if (disposed) h.owner.dispose();
    h.result.resolve(credential());
    await pending;
    expect(h.data.has("vb.lock")).toBe(false);
    h.owner.dispose();
  }
});
test("ignored-abort device prompt is bounded and late credentials cannot clear the lock", async () => {
  const h = device("AQID");
  expect(get(h.owner.state).locked).toBe(true);
  const pending = h.owner.unlock();
  h.time.advance(60_000);
  expect(get(h.owner.state)).toMatchObject({
    busy: false,
    locked: true,
    error: "timeout",
  });
  h.result.resolve(credential());
  await pending;
  expect(get(h.owner.state).locked).toBe(true);
  h.owner.dispose();
});
test("local lock reappears only after five minutes hidden and requires a new real unlock gesture", async () => {
  const h = device("AQID");
  const pending = h.owner.unlock();
  h.result.resolve(credential());
  await pending;
  expect(get(h.owner.state).locked).toBe(false);
  h.owner.visibility(true);
  h.now(DEVICE_LOCK_AFTER + 1);
  h.owner.visibility(false);
  expect(get(h.owner.state).locked).toBe(true);
  expect(h.calls().gets).toBe(1);
  h.owner.dispose();
});
test("unsupported device authentication remains explicit without clearing an existing local lock", () => {
  const data = new Map([["vb.lock", "AQID"]]);
  const owner = createDeviceLock({
    storage: {
      getItem: (key) => data.get(key) ?? null,
      setItem: (key, value) => {
        data.set(key, value);
      },
      removeItem: (key) => {
        data.delete(key);
      },
    },
    credentials: null,
    random: (size) => new Uint8Array(size),
  });
  expect(get(owner.state)).toMatchObject({
    supported: false,
    enabled: true,
    locked: true,
  });
  owner.dispose();
});

test("actual logout helper is single-flight and refuses POST after observed account replacement during cleanup", async () => {
  const { createAccountLogout } =
    await import("../svelte/features/account/logout");
  const cleanup = deferred<{ confirmed: boolean }>();
  let identity = { email: "a@test", revision: 1 },
    posts = 0,
    reloads = 0,
    failures = 0;
  const logout = createAccountLogout({
    identity: () => identity,
    beforeLogout: () => cleanup.promise,
    warning: () => {},
    post: async () => {
      posts++;
      return { ok: true };
    },
    success: () => {
      throw Error("unexpected success");
    },
    failure: () => {
      failures++;
    },
    reload: () => {
      reloads++;
    },
  });
  const pending = logout(false);
  await logout(true);
  identity = { email: "b@test", revision: 2 };
  cleanup.resolve({ confirmed: true });
  await pending;
  expect(posts).toBe(0);
  expect(reloads).toBe(1);
  expect(failures).toBe(1);
});
test("actual logout helper preserves unconfirmed cleanup warning, endpoint choice, failure reload and success navigation", async () => {
  const { createAccountLogout } =
    await import("../svelte/features/account/logout");
  for (const ok of [false, true]) {
    const events: string[] = [];
    const logout = createAccountLogout({
      identity: () => ({ email: "a@test", revision: 1 }),
      beforeLogout: async () => ({ confirmed: false }),
      warning: () => {
        events.push("warning");
      },
      post: async (all) => {
        events.push(all ? "all" : "current");
        return { ok };
      },
      success: (all) => {
        events.push(all ? "login" : "home");
      },
      failure: () => {
        events.push("failure");
      },
      reload: () => {
        events.push("reload");
      },
    });
    await logout(ok);
    expect(events).toEqual(
      ok
        ? ["warning", "all", "login"]
        : ["warning", "current", "failure", "reload"],
    );
    await logout(!ok);
    expect(events).toHaveLength(ok ? 3 : 4);
  }
});
test("disposed logout helper cannot POST, alert or reload after late cleanup", async () => {
  const { createAccountLogout } =
    await import("../svelte/features/account/logout");
  const cleanup = deferred<{ confirmed: boolean }>();
  const events: string[] = [];
  const logout = createAccountLogout({
    identity: () => ({ email: "a@test", revision: 1 }),
    beforeLogout: () => cleanup.promise,
    warning: () => {
      events.push("warning");
    },
    post: async () => {
      events.push("post");
      return { ok: true };
    },
    success: () => {
      events.push("success");
    },
    failure: () => {
      events.push("failure");
    },
    reload: () => {
      events.push("reload");
    },
  });
  const pending = logout(false);
  logout.dispose();
  cleanup.resolve({ confirmed: false });
  await pending;
  expect(events).toEqual([]);
});

test("immutable account/open binding invalidates at close, same-account reopen and identity B before any component disposal", async () => {
  const h = await fixture();
  const first = get(h.owner.state).binding;
  if (!first) throw Error("Missing first binding");
  expect(h.owner.owns(first)).toBe(true);
  h.owner.close();
  h.owner.open();
  const second = get(h.owner.state).binding;
  if (!second) throw Error("Missing second binding");
  expect(h.owner.owns(first)).toBe(false);
  expect(h.owner.owns(second)).toBe(true);
  h.canonical(me({ email: "b@test", name: "B" }));
  h.personal.acceptIdentity("b@test", false);
  await h.personal.refresh();
  h.owner.open();
  expect(h.owner.owns(second)).toBe(false);
  expect(get(h.owner.state).me?.email).toBe("b@test");
  h.dispose();
});
test("device configuration immutable account binding cannot become valid by reopening B", async () => {
  const h = await fixture(),
    lock = device();
  const binding = get(h.owner.state).binding;
  if (!binding) throw Error("Missing binding");
  const pending = lock.owner.configure(true, binding.account, () =>
    h.owner.owns(binding),
  );
  h.canonical(me({ email: "b@test", name: "B" }));
  h.personal.acceptIdentity("b@test", false);
  await h.personal.refresh();
  h.owner.open();
  lock.result.resolve(credential());
  await pending;
  expect(lock.data.has("vb.lock")).toBe(false);
  lock.owner.dispose();
  h.dispose();
});
