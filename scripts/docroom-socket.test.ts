// Actual pinned dependency/prototype unit boundary, not a real DO/hibernation/browser test.
import { expect, mock, spyOn, test } from "bun:test";
import { Doc } from "yjs";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { DocRoom } = await import("../src/docroom");
const { YDurableObjects, WSSharedDoc } = await import("y-durableobjects");
function invoke(
  prototype: object,
  name: string,
  receiver: object,
  ...args: unknown[]
): unknown {
  const method: unknown = Reflect.get(prototype, name);
  if (typeof method !== "function")
    throw Error(`Missing pinned relay method ${name}`);
  return Reflect.apply(method, receiver, args);
}
function socket() {
  const frames: Uint8Array[] = [];
  return {
    readyState: 1,
    frames,
    send(message: Uint8Array) {
      if (this.readyState !== 1)
        throw new TypeError("Can't call WebSocket send() after close().");
      frames.push(message);
    },
  };
}
function fixture(sockets: ReturnType<typeof socket>[] = []) {
  const doc = new WSSharedDoc(),
    sessions = new Map<ReturnType<typeof socket>, () => void>();
  let commits = 0,
    writes = 0;
  const persisted = new Doc();
  const receiver = {
    doc,
    sessions,
    awarenessClients: new Set<number>(),
    state: { getWebSockets: () => sockets },
    storage: {
      getYDoc: async () => persisted,
      storeUpdate: async () => {
        writes++;
      },
      commit: async () => {
        commits++;
      },
    },
    registerWebSocket(ws: ReturnType<typeof socket>) {
      return invoke(DocRoom.prototype, "registerWebSocket", receiver, ws);
    },
    unregisterWebSocket(ws: ReturnType<typeof socket>) {
      return invoke(
        YDurableObjects.prototype,
        "unregisterWebSocket",
        receiver,
        ws,
      );
    },
    watch() {
      return invoke(DocRoom.prototype, "watch", receiver);
    },
    cleanup() {
      return invoke(YDurableObjects.prototype, "cleanup", receiver);
    },
  };
  return {
    receiver,
    doc,
    sessions,
    commits: () => commits,
    writes: () => writes,
    dispose() {
      for (const unsubscribe of sessions.values()) unsubscribe();
      sessions.clear();
      doc.awareness.destroy();
      doc.destroy();
      persisted.destroy();
    },
  };
}
test("actual dependency startup skips closed sockets and retains exact actual session identity", async () => {
  const live = socket(),
    closed = socket();
  closed.readyState = 3;
  const f = fixture([live, closed]);
  try {
    await invoke(YDurableObjects.prototype, "onStart", f.receiver);
    expect(closed.frames).toHaveLength(0);
    expect(live.frames.length).toBeGreaterThan(0);
    expect([...f.sessions.keys()]).toEqual([live]);
  } finally {
    f.dispose();
  }
});
test("DocRoom startup clears the public pinned Awareness interval without destroying protocol ownership", async () => {
  const live = socket(), f = fixture([live]);
  const awareness = f.doc.awareness;
  // The vendor's declaration is public but any-typed. Keep the observed handle
  // unknown in first-party test code and assert exact identity at the native API.
  const interval: unknown = awareness._checkInterval;
  const clear = spyOn(globalThis, "clearInterval"),
    destroy = spyOn(awareness, "destroy");
  let notifications = 0;
  const observe = () => { notifications++; };
  awareness.on("update", observe);
  try {
    expect(interval).toBeDefined();
    await invoke(DocRoom.prototype, "onStart", f.receiver);
    expect(clear).toHaveBeenCalledTimes(1);
    expect(clear.mock.calls[0]?.[0] === interval).toBe(true);
    expect(destroy).not.toHaveBeenCalled();
    expect(f.doc.awareness === awareness).toBe(true);
    expect([...f.sessions.keys()]).toEqual([live]);
    expect(live.frames.length).toBeGreaterThan(0);
    awareness.setLocalState({ name: "still active" });
    expect(notifications).toBe(1);
    expect(awareness.getLocalState()).toEqual({ name: "still active" });
    expect(f.receiver.awarenessClients.has(f.doc.clientID)).toBe(true);
  } finally {
    clear.mockRestore();
    destroy.mockRestore();
    awareness.off("update", observe);
    f.dispose();
  }
});
test("actual awareness removal skips other closed peers and inherited unregister commits normally", async () => {
  const first = socket(),
    closing = socket(),
    live = socket(),
    f = fixture([first, closing, live]);
  const logged = spyOn(console, "error").mockImplementation(() => {});
  try {
    await invoke(YDurableObjects.prototype, "onStart", f.receiver);
    f.doc.awareness.setLocalState({ name: "unit collaborator" });
    const before = live.frames.length;
    first.readyState = 3;
    closing.readyState = 3;
    await invoke(
      YDurableObjects.prototype,
      "webSocketClose",
      f.receiver,
      first,
    );
    expect(f.sessions.has(first)).toBe(false);
    expect(f.sessions.has(closing)).toBe(true);
    expect(live.frames.length).toBeGreaterThan(before);
    expect(logged).not.toHaveBeenCalled();
    await invoke(
      YDurableObjects.prototype,
      "webSocketClose",
      f.receiver,
      closing,
    );
    live.readyState = 3;
    await invoke(YDurableObjects.prototype, "webSocketClose", f.receiver, live);
    expect(f.sessions.size).toBe(0);
    expect(f.commits()).toBe(1);
  } finally {
    logged.mockRestore();
    f.dispose();
  }
});
test("only exact after-close TypeError with nonOPEN post-error state is tolerated", () => {
  const f = fixture();
  const race = socket();
  race.send = () => {
    race.readyState = 3;
    throw new TypeError("Can't call WebSocket send() after close().");
  };
  const unexpected = socket();
  unexpected.send = () => {
    throw new Error("unexpected storage/runtime failure");
  };
  const stillOpen = socket();
  stillOpen.send = () => {
    throw new TypeError("Can't call WebSocket send() after close().");
  };
  try {
    expect(() => f.receiver.registerWebSocket(race)).not.toThrow();
    expect(f.sessions.size).toBe(0);
    expect(() => f.receiver.registerWebSocket(unexpected)).toThrow(
      "unexpected storage/runtime failure",
    );
    expect(() => f.receiver.registerWebSocket(stillOpen)).toThrow(
      "Can't call WebSocket send() after close().",
    );
    expect(f.sessions.size).toBe(0);
  } finally {
    f.dispose();
  }
});
