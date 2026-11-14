import { expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Room } from "../shared/room";
import {
  createAgentsApi,
  AgentsFailure,
  type AgentsApi,
} from "../svelte/features/agents/api";
import { createAgentAccountSession } from "../svelte/features/agents/account";
import {
  createAgentLease,
  type AgentClock,
} from "../svelte/features/agents/lease";
import { createSandboxCredentials } from "../svelte/features/sandboxes/credentials";
import {
  createSandboxSession,
  sandboxIdentity,
  type SandboxCard,
} from "../svelte/features/sandboxes/session";
import {
  createTerminalSession,
  type TerminalSocket,
} from "../svelte/features/sandboxes/terminalSession";
import type { TerminalRenderer } from "../svelte/features/sandboxes/terminalRenderer";
import {
  terminalEndpoint,
  terminalProtocols,
  terminalDimensions,
  terminalControl,
} from "../svelte/features/sandboxes/terminalProtocol";
import { agentQueue } from "../svelte/features/agents/model";
import { sandboxStateText } from "../svelte/features/sandboxes/copy";
import { sandboxLog } from "../svelte/features/sandboxes/log";
import { createRoomAgentSession } from "../svelte/features/agents/room";
function deferred<T>() {
  let resolve!: (value: T) => void, reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
function clock() {
  let now = 0;
  const timers = new Map<number, { at: number; fn(): void }>();
  let id = 0;
  const owner: AgentClock = {
    now: () => now,
    schedule(fn, ms) {
      const key = ++id;
      timers.set(key, { at: now + ms, fn });
      return key;
    },
    cancel(handle) {
      if (typeof handle === "number") timers.delete(handle);
    },
  };
  return {
    owner,
    advance(ms: number) {
      now += ms;
      for (const [key, timer] of [...timers])
        if (timer.at <= now && timers.delete(key)) timer.fn();
    },
  };
}
const flush = async () => {
  for (let i = 0; i < 12; i++) await Promise.resolve();
};
const card = (): SandboxCard => ({
  id: "vm-one",
  vm_id: "external-one",
  name: "one",
  state: "running",
  ready: true,
  created_at: 0,
  rate: 0.13,
  cost: 0,
});
const fixtureRoom = (): Room => ({
  id: "room",
  me: "me@test",
  book: { title: "Room", owner: "me@test" },
  members: ["me@test"],
  names: {},
  online: [],
  typing: {},
  messages: [],
  epics: [],
  suggestions: [],
  polls: {},
});
function apiFixture() {
  let cards = [card()];
  const api: AgentsApi = {
    identity: async () => "me@test",
    grants: async () => ({ agents: [], last_used: null }),
    revoke: async () => ({ ok: true, removed: 0 }),
    room: async () => ({ claude_on: false, agents: [], sandboxes: [] }),
    focus: async () => ({ ok: true }),
    toggle: async (_id, on) => ({ ok: true, claude_on: on }),
    sandboxes: async () => ({
      connected: true,
      claude: true,
      sandboxes: cards,
    }),
    create: async () => ({
      ok: true,
      id: "new",
      vm_id: "external-new",
      name: "new",
    }),
    power: async () => ({ ok: true }),
    setup: async () => ({ ok: true, log: "ready" }),
    remove: async () => ({ ok: true }),
    terminal: async () => ({
      url: "wss://api.freestyle.sh/v5/vms/external-one/pty?slug=claude&exec=claude",
      token: "private-token",
    }),
    connected: async () => ({ connected: true }),
    saveKey: async () => ({ ok: true }),
    removeKey: async () => ({ ok: true }),
    saveToken: async () => ({ ok: true }),
    removeToken: async () => ({ ok: true }),
  };
  return {
    api,
    cards(value: SandboxCard[]) {
      cards = value;
    },
  };
}
test("sandbox states have explicit English/Portuguese copy including partial and future states", () => {
  expect(sandboxStateText("creating", "en")).toBe("creating");
  expect(sandboxStateText("error", "en")).toBe("error");
  expect(sandboxStateText(null, "en")).toBe("unknown state");
  expect(sandboxStateText("future", "en")).toBe("unknown state (future)");
  expect(sandboxStateText("creating", "pt")).toBe("criando");
  expect(sandboxStateText("error", "pt")).toBe("erro");
});
test("terminal destination and control validation preserves VM identity and local-only mocks", () => {
  const url =
    "wss://api.freestyle.sh/v5/vms/external-one/pty?slug=claude&exec=claude";
  expect(
    terminalEndpoint(url, "https://vibebook.dev", "external-one").hostname,
  ).toBe("api.freestyle.sh");
  expect(() =>
    terminalEndpoint(url, "https://vibebook.dev", "other"),
  ).toThrow();
  expect(() =>
    terminalEndpoint(
      url.replace("api.freestyle.sh", "evil.test"),
      "https://vibebook.dev",
      "external-one",
    ),
  ).toThrow();
  expect(() =>
    terminalEndpoint(
      "ws://localhost:123/v5/vms/external-one/pty?slug=claude&exec=claude",
      "https://vibebook.dev",
      "external-one",
    ),
  ).toThrow();
  expect(
    terminalEndpoint(
      "ws://localhost:123/mock/v5/vms/external-one/pty?slug=claude&exec=claude",
      "http://localhost:8797",
      "external-one",
    ).protocol,
  ).toBe("ws:");
  expect(terminalProtocols("secret")).toEqual([
    "freestyle-pty",
    "freestyle-identity.c2VjcmV0",
  ]);
  expect(terminalDimensions(Infinity, 4)).toBe(false);
  expect(terminalDimensions(80, 24)).toBe(true);
  expect(terminalControl('{"type":"sessionInfo"}')).toBe("connected");
  expect(terminalControl('{"type":"unknown"}')).toBeNull();
});
test("owner deadline settles even when transport ignores abort and late callbacks cannot replace it", async () => {
  const time = clock(),
    pending = deferred<string>(),
    lease = createAgentLease(time.owner);
  const result = lease
    .run(() => pending.promise, 20_000)
    .catch((error: Error) => error.message);
  await flush();
  time.advance(20_000);
  expect(await result).toBe("timeout");
  pending.resolve("late");
  await flush();
});
test("sandbox power waits for own ACK and canonical desired state; uncertainty prevents duplicate toggle", async () => {
  const time = clock(),
    fixture = apiFixture(),
    credentials = createSandboxCredentials("me@test", fixture.api, {
      clock: time.owner,
    });
  const pending = deferred<{ ok: true }>();
  let writes = 0;
  fixture.api.power = async () => {
    writes++;
    return pending.promise;
  };
  const owner = createSandboxSession(
    "me@test",
    "room",
    fixture.api,
    credentials,
    { clock: time.owner },
  );
  await owner.refresh();
  const work = owner.power("vm-one", "pause", sandboxIdentity(card()));
  await flush();
  fixture.cards([{ ...card(), state: "paused" }]);
  await owner.refresh(true);
  expect(get(owner.state).phase).toBe("pending");
  time.advance(20_000);
  await work;
  expect(get(owner.state).phase).toBe("unconfirmed");
  await owner.power(
    "vm-one",
    "start",
    sandboxIdentity({ ...card(), state: "paused" }),
  );
  expect(writes).toBe(1);
  pending.resolve({ ok: true });
  await flush();
  expect(get(owner.state).phase).toBe("unconfirmed");
  owner.dispose();
  credentials.dispose();
});
test("sandbox denial cannot be undone by a cached membership update", async () => {
  const fixture = apiFixture(),
    credentials = createSandboxCredentials("me@test", fixture.api);
  fixture.api.sandboxes = async () => {
    throw new AgentsFailure("denied", 403);
  };
  const owner = createSandboxSession(
    "me@test",
    "room",
    fixture.api,
    credentials,
  );
  await owner.refresh();
  owner.authorize(true);
  expect(owner.current()).toBe(false);
  expect(get(owner.state).data).toBeNull();
  fixture.api.sandboxes = async () => ({
    connected: true,
    claude: true,
    sandboxes: [card()],
  });
  await owner.refresh(true);
  expect(owner.current()).toBe(true);
  owner.dispose();
  credentials.dispose();
});
test("room denial stays latched across old canonical snapshots and recovers only on fresh authorized HTTP", async () => {
  const fixture = apiFixture(),
    account = createAgentAccountSession("me@test", { api: fixture.api }),
    credentials = createSandboxCredentials("me@test", fixture.api);
  fixture.api.room = async () => {
    throw new AgentsFailure("denied", 403);
  };
  const owner = createRoomAgentSession(
      "me@test",
      "room",
      fixture.api,
      account,
      credentials,
      { origin: "https://vibebook.dev" },
    ),
    room = fixtureRoom();
  owner.sync(room, "main", [], false, false);
  await flush();
  owner.sync({ ...room }, "main", [], false, false);
  expect(owner.current()).toBe(false);
  expect(owner.sandboxes.current()).toBe(false);
  fixture.api.room = async () => ({
    claude_on: false,
    agents: [],
    sandboxes: [],
  });
  await owner.refresh(true);
  expect(owner.current()).toBe(true);
  owner.dispose();
  account.dispose();
  credentials.dispose();
});
test("secret rejection is localized state without retaining credential or raw server text", async () => {
  const fixture = apiFixture();
  fixture.api.saveKey = async () => {
    throw new AgentsFailure("received secret-private", 400);
  };
  const owner = createSandboxCredentials("me@test", fixture.api);
  owner.sync(false, false);
  await owner.write("key", "secret-private");
  expect(get(owner.state).phase).toBe("error");
  expect(JSON.stringify(get(owner.state)).includes("secret-private")).toBe(
    false,
  );
  owner.dispose();
});
test("setup log projection removes known credentials and bounds visible historical output", () => {
  expect(
    sandboxLog("CLAUDE_CODE_OAUTH_TOKEN=sk-ant-secret api_key=secret123"),
  ).toBe("CLAUDE_CODE_OAUTH_TOKEN=[redacted] api_key=[redacted]");
  expect(sandboxLog("x".repeat(80_000)).length).toBe(64_000);
});
test("terminal hung factory has an owner deadline and disposes a late renderer", async () => {
  const time = clock(),
    fixture = apiFixture(),
    pending = deferred<TerminalRenderer>();
  let disposed = 0;
  const renderer: TerminalRenderer = {
    cols: 80,
    rows: 24,
    write() {},
    focus() {},
    input() {},
    dispose() {
      disposed++;
    },
  };
  const owner = createTerminalSession("me@test", "room", fixture.api, {
    clock: time.owner,
    origin: "https://vibebook.dev",
    current: () => true,
    canOpen: () => true,
  });
  owner.open(card());
  const work = owner.mount(() => pending.promise, get(owner.state).generation);
  await flush();
  time.advance(20_000);
  await work;
  expect(get(owner.state).phase).toBe("error");
  pending.resolve(renderer);
  await flush();
  expect(disposed).toBe(1);
  owner.dispose();
});
test("old terminal control ticket cannot write to a newer connection", async () => {
  const fixture = apiFixture(),
    sent: (string | ArrayBufferLike | Blob | ArrayBufferView)[] = [];
  const socket: TerminalSocket = {
    readyState: 1,
    binaryType: "arraybuffer",
    onopen: null,
    onmessage: null,
    onerror: null,
    onclose: null,
    send(value) {
      sent.push(value);
    },
    close() {},
  };
  const renderer: TerminalRenderer = {
    cols: 80,
    rows: 24,
    write() {},
    focus() {},
    input() {},
    dispose() {},
  };
  const owner = createTerminalSession("me@test", "room", fixture.api, {
    origin: "https://vibebook.dev",
    current: () => true,
    canOpen: () => true,
    socket: () => socket,
  });
  owner.open(card());
  const old = get(owner.state).generation;
  owner.open(card());
  const next = get(owner.state).generation;
  await owner.mount(async () => renderer, next);
  owner.key("Esc", old);
  expect(sent.length).toBe(0);
  owner.key("Esc", next);
  expect(sent.length).toBe(1);
  owner.dispose();
});
test("denied room retry has a deadline and preserves its denial latch after network failure", async () => {
  const time = clock(),
    fixture = apiFixture(),
    account = createAgentAccountSession("me@test", {
      api: fixture.api,
      clock: time.owner,
    }),
    credentials = createSandboxCredentials("me@test", fixture.api, {
      clock: time.owner,
    });
  fixture.api.room = async () => {
    throw new AgentsFailure("denied", 403);
  };
  const owner = createRoomAgentSession(
    "me@test",
    "room",
    fixture.api,
    account,
    credentials,
    { origin: "https://vibebook.dev", clock: time.owner },
  );
  owner.sync(fixtureRoom(), "main", [], false, false);
  await flush();
  fixture.api.room = () => new Promise(() => {});
  const retry = owner.refresh(true);
  await flush();
  time.advance(20_000);
  await retry;
  expect(get(owner.state).loading).toBe(false);
  expect(get(owner.state).readError).toBe("read-failed");
  expect(owner.current()).toBe(false);
  owner.dispose();
  account.dispose();
  credentials.dispose();
});
test("inferred Agent API keeps credential in POST body and validates response metadata", async () => {
  const calls: {
    url: string;
    method: string;
    body: string;
    cache: RequestCache;
  }[] = [];
  const api = createAgentsApi(async (input, init) => {
    const request = new Request(
      new URL(
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.href
            : input.url,
        "https://vibebook.dev",
      ),
      init,
    );
    calls.push({
      url: request.url,
      method: request.method,
      body: await request.text(),
      cache: request.cache,
    });
    return new Response(
      JSON.stringify(
        request.method === "GET"
          ? { agents: [], last_used: null }
          : { ok: true },
      ),
      { headers: { "Content-Type": "application/json" } },
    );
  });
  await api.saveKey("private-key");
  expect(calls[0]?.url.includes("private-key")).toBe(false);
  expect(calls[0]?.method).toBe("POST");
  expect(JSON.parse(calls[0]?.body || "{}")).toEqual({ key: "private-key" });
  await api.grants();
  expect(calls[1]?.cache).toBe("no-store");
});
test("old renderer cancellation cannot abort a new terminal mount", async () => {
  const fixture = apiFixture(),
    oldRenderer = deferred<TerminalRenderer>();
  let oldDisposed = 0;
  const signals: AbortSignal[] = [];
  const old: TerminalRenderer = {
      cols: 80,
      rows: 24,
      write() {},
      input() {},
      focus() {},
      dispose() {
        oldDisposed++;
      },
    },
    next: TerminalRenderer = { ...old, dispose() {} };
  const socket: TerminalSocket = {
    readyState: 1,
    binaryType: "arraybuffer",
    onopen: null,
    onclose: null,
    onerror: null,
    onmessage: null,
    close() {},
    send() {},
  };
  const owner = createTerminalSession("me@test", "room", fixture.api, {
    origin: "https://vibebook.dev",
    current: () => true,
    canOpen: () => true,
    socket: () => socket,
  });
  owner.open(card());
  const first = owner.mount(
    () => oldRenderer.promise,
    get(owner.state).generation,
  );
  await flush();
  owner.open(card());
  const second = owner.mount(async (_callbacks, signal) => {
    signals.push(signal);
    return next;
  }, get(owner.state).generation);
  await first;
  await second;
  expect(signals[0]?.aborted).toBe(false);
  expect(get(owner.state).phase).toBe("connecting");
  oldRenderer.resolve(old);
  await flush();
  expect(oldDisposed).toBe(1);
  owner.dispose();
});
test("account replacement synchronously fences old grant replies and clears metadata", async () => {
  const { createAgentsService } =
    await import("../svelte/features/agents/service");
  const fixture = apiFixture(),
    pending = deferred<Awaited<ReturnType<AgentsApi["grants"]>>>();
  fixture.api.grants = () => pending.promise;
  const service = createAgentsService({
      origin: "https://vibebook.dev",
      api: fixture.api,
    }),
    first = service.account("first@test")!;
  const work = first.refresh();
  await flush();
  const next = service.account("next@test")!;
  pending.resolve({
    agents: [{ id: "old-private-grant", client: "old", connected_at: 1 }],
    last_used: null,
  });
  await work;
  await flush();
  expect(get(first.state).grants).toBeNull();
  expect(next.account).toBe("next@test");
  expect(get(next.state).grants).toBeNull();
  service.dispose();
});
test("shared session rejection clears account grants immediately; unrelated membership failures do not globally erase them", async () => {
  const { UNAUTHENTICATED } = await import("../shared/schemas");
  const fixture = apiFixture();
  fixture.api.grants = async () => ({
    agents: [{ id: "private", client: "my agent", connected_at: 1 }],
    last_used: null,
  });
  let unauthorized = 0;
  const owner = createAgentAccountSession("me@test", {
    api: fixture.api,
    onUnauthorized: () => {
      unauthorized++;
    },
  });
  await owner.refresh();
  fixture.api.grants = async () => {
    throw new AgentsFailure("forbidden", 403);
  };
  await owner.refresh(true);
  expect(owner.current()).toBe(true);
  expect(get(owner.state).grants?.agents[0]?.id).toBe("private");
  fixture.api.grants = async () => {
    throw new AgentsFailure(UNAUTHENTICATED.error, 401);
  };
  await owner.refresh(true);
  expect(owner.current()).toBe(false);
  expect(get(owner.state).grants).toBeNull();
  expect(unauthorized).toBe(1);
  fixture.api.grants = async () => ({ agents: [], last_used: null });
  await owner.refresh(true);
  expect(owner.current()).toBe(true);
  owner.dispose();
});
test("known session loss from toggle clears shared room/account/wait/credential projections and ignores cached room authority", async () => {
  const { createAgentsService } =
      await import("../svelte/features/agents/service"),
    { UNAUTHENTICATED } = await import("../shared/schemas");
  const fixture = apiFixture();
  fixture.api.grants = async () => ({
    agents: [{ id: "private", client: "mine", connected_at: 1 }],
    last_used: null,
  });
  const service = createAgentsService({
    origin: "https://vibebook.dev",
    api: fixture.api,
  });
  const account = service.account("me@test")!;
  await account.refresh();
  const room = fixtureRoom(),
    owner = service.sync(room, "main", [], false, false, async () => ({
      ok: true,
    }))!;
  await owner.refresh();
  await owner.sandboxes.refresh();
  fixture.api.toggle = async () => {
    throw new AgentsFailure(UNAUTHENTICATED.error, 401);
  };
  await owner.toggle();
  expect(account.current()).toBe(false);
  expect(get(account.state).grants).toBeNull();
  expect(get(owner.state).room).toBeNull();
  expect(get(owner.state).waits.length).toBe(0);
  expect(get(owner.sandboxes.state).data).toBeNull();
  expect(owner.credentials.current()).toBe(false);
  expect(get(owner.terminal.state).open).toBe(false);
  service.sync({ ...room }, "main", [], false, false, async () => ({
    ok: true,
  }));
  expect(owner.current()).toBe(false);
  expect(get(owner.state).room).toBeNull();
  service.dispose();
});
test("initial terminal focus is owned and respects intervening user intent", async () => {
  const fixture = apiFixture();
  let focus = 0,
    allowed = true;
  const socket: TerminalSocket = {
    readyState: 1,
    binaryType: "arraybuffer",
    onopen: null,
    onclose: null,
    onerror: null,
    onmessage: null,
    close() {},
    send() {},
  };
  const renderer: TerminalRenderer = {
    cols: 80,
    rows: 24,
    write() {},
    input() {},
    focus() {
      focus++;
    },
    dispose() {},
  };
  const owner = createTerminalSession("me@test", "room", fixture.api, {
    origin: "https://vibebook.dev",
    current: () => true,
    canOpen: () => true,
    socket: () => socket,
  });
  owner.open(card());
  await owner.mount(
    async () => renderer,
    get(owner.state).generation,
    () => allowed,
  );
  if (socket.onopen) Reflect.apply(socket.onopen, socket, [new Event("open")]);
  expect(focus).toBe(1);
  owner.open(card());
  await owner.mount(
    async () => renderer,
    get(owner.state).generation,
    () => allowed,
  );
  allowed = false;
  if (socket.onopen) Reflect.apply(socket.onopen, socket, [new Event("open")]);
  expect(focus).toBe(1);
  owner.dispose();
});
test("toggle membership refusal revokes only this room and preserves authorized account grant metadata", async () => {
  const { createAgentsService } =
    await import("../svelte/features/agents/service");
  const fixture = apiFixture(),
    service = createAgentsService({
      origin: "https://vibebook.dev",
      api: fixture.api,
    }),
    account = service.account("me@test")!;
  await account.refresh();
  const owner = service.sync(
    fixtureRoom(),
    "main",
    [],
    false,
    false,
    async () => ({ ok: true }),
  )!;
  await owner.refresh();
  fixture.api.toggle = async () => {
    throw new AgentsFailure("forbidden", 403);
  };
  await owner.toggle();
  expect(owner.current()).toBe(false);
  expect(get(owner.state).room).toBeNull();
  expect(account.current()).toBe(true);
  expect(get(account.state).grants !== null).toBe(true);
  service.dispose();
});
test("canonical membership removal clears retained room projections and stale snapshots cannot reopen them", async () => {
  const fixture = apiFixture(),
    account = createAgentAccountSession("me@test", { api: fixture.api }),
    credentials = createSandboxCredentials("me@test", fixture.api),
    owner = createRoomAgentSession(
      "me@test",
      "room",
      fixture.api,
      account,
      credentials,
      { origin: "https://vibebook.dev" },
    );
  const room = fixtureRoom();
  owner.sync(room, "main", [], false, false);
  await owner.refresh();
  owner.sync({ ...room, members: [] }, "main", [], false, false);
  expect(get(owner.state).room).toBeNull();
  expect(get(owner.state).data).toBeNull();
  expect(owner.current()).toBe(false);
  owner.dispose();
  account.dispose();
  credentials.dispose();
});
test("global denial recovery cannot accept cookie B identity-free grants for captured account A", async () => {
  const { UNAUTHENTICATED } = await import("../shared/schemas");
  const fixture = apiFixture();
  let email = "other@test",
    grantReads = 0;
  const owner = createAgentAccountSession("me@test", { api: fixture.api });
  fixture.api.grants = async () => {
    throw new AgentsFailure(UNAUTHENTICATED.error, 401);
  };
  await owner.refresh();
  fixture.api.grants = async () => {
    grantReads++;
    return {
      agents: [{ id: "other-private", client: "B", connected_at: 1 }],
      last_used: null,
    };
  };
  fixture.api.identity = async () => email;
  await owner.refresh(true);
  expect(owner.current()).toBe(false);
  expect(get(owner.state).grants).toBeNull();
  expect(grantReads).toBe(0);
  email = "me@test";
  fixture.api.grants = async () => {
    grantReads++;
    return { agents: [], last_used: null };
  };
  await owner.refresh(true);
  expect(owner.current()).toBe(true);
  expect(grantReads).toBe(1);
  owner.dispose();
});
test("identity change during recovering read rejects its result and late identity proof after disposal is inert", async () => {
  const { UNAUTHENTICATED } = await import("../shared/schemas");
  const fixture = apiFixture(),
    owner = createAgentAccountSession("me@test", { api: fixture.api });
  fixture.api.grants = async () => {
    throw new AgentsFailure(UNAUTHENTICATED.error, 401);
  };
  await owner.refresh();
  let proofs = 0;
  fixture.api.identity = async () =>
    ++proofs === 1 ? "me@test" : "other@test";
  fixture.api.grants = async () => ({
    agents: [{ id: "untrusted-result", client: "changed", connected_at: 1 }],
    last_used: null,
  });
  await owner.refresh(true);
  expect(owner.current()).toBe(false);
  expect(get(owner.state).grants).toBeNull();
  const pending = deferred<string>();
  fixture.api.identity = () => pending.promise;
  const work = owner.refresh(true);
  await flush();
  owner.dispose();
  pending.resolve("me@test");
  await work;
  await flush();
  expect(get(owner.state).grants).toBeNull();
});
test("shared global denial also gates a newly created cached-room actor before exposing projections", async () => {
  const { createAgentsService } =
      await import("../svelte/features/agents/service"),
    { UNAUTHENTICATED } = await import("../shared/schemas");
  const fixture = apiFixture(),
    service = createAgentsService({
      origin: "https://vibebook.dev",
      api: fixture.api,
    });
  const account = service.account("me@test")!;
  fixture.api.grants = async () => {
    throw new AgentsFailure(UNAUTHENTICATED.error, 401);
  };
  await account.refresh();
  let roomReads = 0;
  fixture.api.identity = async () => "cookie-b@test";
  fixture.api.room = async () => {
    roomReads++;
    return { claude_on: true, agents: [], sandboxes: [] };
  };
  const owner = service.sync(
    { ...fixtureRoom(), id: "unseen-room" },
    "main",
    [],
    false,
    false,
    async () => ({ ok: true }),
  )!;
  expect(owner.current()).toBe(false);
  expect(get(owner.state).room).toBeNull();
  await owner.refresh();
  expect(owner.current()).toBe(false);
  expect(get(owner.state).room).toBeNull();
  expect(get(owner.state).data).toBeNull();
  expect(roomReads).toBe(0);
  service.dispose();
});

test("queue excludes server-marked approval replies even when the parent question is outside the loaded history", () => {
  const room = fixtureRoom();
  room.messages = [
    {
      id: 1,
      thread: "main",
      author: room.me,
      ts: 100,
      text: "Aprovar",
      reply_to: 999,
      answers_ask: true,
    },
    {
      id: 2,
      thread: "main",
      author: room.me,
      ts: 101,
      text: "Please investigate",
    },
  ];
  expect(agentQueue(room, 200).map((item) => item.message.id)).toEqual([2]);
});
