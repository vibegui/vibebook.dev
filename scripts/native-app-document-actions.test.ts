// Pure action/consent ownership; real SDK/MessagePort/browser proof is separate.
import { expect, test } from "bun:test";
import {
  appDocumentAction,
  type AppDocumentCapability,
} from "../svelte/features/apps/documentAction";
import { createRoomAppTools, toolError } from "../svelte/features/apps/tools";
import { deferred, settle } from "./native-home-fixtures";
import type { Room } from "../shared/room";

test("protected actions await the captured document proof and preserve the actual operation result", async () => {
  const proof = deferred<boolean>(),
    value = { actual: "result" };
  const document = { active: () => true, attest: () => proof.promise };
  let dispatched = 0;
  const result = appDocumentAction(
    () => true,
    () => document,
    async () => {
      dispatched++;
      return value;
    },
  );
  expect(dispatched).toBe(0);
  proof.resolve(true);
  expect(await result).toEqual({ ok: true, value });
  expect(dispatched).toBe(1);
});

test("failed proof or replaced owner/document never starts a protected operation", async () => {
  for (const loss of ["owner", "document", "inactive", "proof"] as const) {
    const proof = deferred<boolean>();
    let current = true,
      active = true,
      dispatched = 0;
    let document: AppDocumentCapability = {
      active: () => active,
      attest: () => proof.promise,
    };
    const result = appDocumentAction(
      () => current,
      () => document,
      async () => ++dispatched,
    );
    if (loss === "owner") current = false;
    if (loss === "document")
      document = { active: () => true, attest: async () => true };
    if (loss === "inactive") active = false;
    proof.resolve(loss !== "proof");
    expect(await result).toEqual({ ok: false });
    expect(dispatched).toBe(0);
  }
});

test("an already dispatched write is neither retried nor falsely claimed rolled back on later departure", async () => {
  const response = deferred<string>();
  let current = true,
    writes = 0;
  const document = { active: () => true, attest: async () => true };
  const result = appDocumentAction(
    () => current,
    () => document,
    () => {
      writes++;
      return response.promise;
    },
  );
  await settle();
  expect(writes).toBe(1);
  current = false;
  response.resolve("canonical ACK");
  expect(await result).toEqual({ ok: true, value: "canonical ACK" });
  expect(writes).toBe(1);
});

test("operation failures propagate without automatic retries", async () => {
  let calls = 0;
  const document = { active: () => true, attest: async () => true };
  await expect(
    appDocumentAction(
      () => true,
      () => document,
      async () => {
        calls++;
        throw Error("Actual refusal");
      },
    ),
  ).rejects.toThrow("Actual refusal");
  expect(calls).toBe(1);
});

test("actual room-tool post reattests after asynchronous consent even before pagehide is observed", async () => {
  const consent = deferred<boolean>();
  let proofAllowed = true,
    writes = 0,
    attestations = 0;
  const document = {
    active: () => true,
    attest: async () => {
      attestations++;
      return proofAllowed;
    },
  };
  const room: Room = {
    id: "aaaaaa",
    me: "me@example.test",
    book: { title: "Controlled room", owner: "me@example.test" },
    members: ["me@example.test"],
    online: [],
    typing: {},
    messages: [],
    suggestions: [],
    epics: [],
  };
  const tools = createRoomAppTools({
    room: () => room,
    current: () => true,
    name: (email) => email,
    ask: () => consent.promise,
    request: async () => {
      const result = await appDocumentAction(
        () => true,
        () => document,
        async () => {
          writes++;
          return { ok: true as const };
        },
      );
      return result.ok ? result.value : { ok: false, error: "disconnected" };
    },
    connections: async () => [],
    call: async () => toolError("No fixture connections"),
    metric: async () => ({}),
    t: (text) => text,
  });
  const pending = tools("vibebook_post", {
    text: "Confirmed draft",
    thread: "main",
  });
  await settle();
  expect(writes).toBe(0);
  proofAllowed = false;
  consent.resolve(true);
  expect((await pending).isError).toBe(true);
  expect(attestations).toBe(1);
  expect(writes).toBe(0);
});
