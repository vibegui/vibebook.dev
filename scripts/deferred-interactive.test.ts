import { expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Message, Room } from "../shared/room";
import {
  createInteractivePresentation,
  interactiveCurrent,
} from "../svelte/features/chat-interactive/deferred";

const prompt: Message = {
  id: 1,
  thread: "main",
  author: "me@test",
  kind: "agent",
  text: "Question",
  ts: 1,
  choices: '{"options":["A","B"]}',
};
const room = (message = prompt): Room => ({
  id: "abc123",
  me: "me@test",
  book: { owner: "me@test", title: "Room" },
  members: ["me@test"],
  online: [],
  typing: {},
  messages: [message],
  epics: [],
  suggestions: [],
});
function transport<T>() {
  let resolve!: (value: T) => void, reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
const flush = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve();
};

test("ordinary/private/nonmember rows never request interactive presentation", async () => {
  let calls = 0;
  for (const value of [
    {
      room: room({ ...prompt, choices: undefined }),
      message: { ...prompt, choices: undefined },
    },
    { room: { ...room(), members: [] }, message: prompt },
    {
      room: room({
        ...prompt,
        author: "other@test",
        text: "⏸ Seu Claude asks",
      }),
      message: { ...prompt, author: "other@test", text: "⏸ Seu Claude asks" },
    },
  ]) {
    const owner = createInteractivePresentation(
      () => value,
      async () => ++calls,
    );
    owner.ensure();
    await flush();
    expect(get(owner.state).phase).toBe("idle");
    owner.dispose();
  }
  expect(calls).toBe(0);
});
test("receipt refresh retains the resolved constructor; transport never dispatches an action", async () => {
  const pending = transport<object>(),
    component = {};
  let value = { room: room(), message: prompt },
    calls = 0;
  const owner = createInteractivePresentation(
    () => value,
    () => {
      calls++;
      return pending.promise;
    },
  );
  owner.ensure();
  owner.ensure();
  await flush();
  expect(get(owner.state).phase).toBe("loading");
  value = {
    ...value,
    room: { ...value.room, online: ["me@test"], messages: [{ ...prompt }] },
  };
  pending.resolve(component);
  await flush();
  expect(get(owner.state).component).toBe(component);
  owner.ensure();
  expect(calls).toBe(1);
  expect(owner.current()).toBe(true);
  owner.dispose();
});
test("late message A, replacement account, removal and revocation cannot publish a constructor", async () => {
  for (const change of [
    () => ({ room: room({ ...prompt, id: 2 }), message: { ...prompt, id: 2 } }),
    () => ({
      room: { ...room(), me: "other@test", members: ["other@test"] },
      message: prompt,
    }),
    () => ({ room: { ...room(), messages: [] }, message: prompt }),
    () => ({ room: { ...room(), members: [] }, message: prompt }),
  ]) {
    const pending = transport<object>();
    let value = { room: room(), message: prompt };
    const owner = createInteractivePresentation(
      () => value,
      () => pending.promise,
    );
    owner.ensure();
    await flush();
    value = change();
    pending.resolve({});
    await flush();
    expect(owner.current()).toBe(false);
    expect(get(owner.state).component).toBeNull();
    owner.dispose();
  }
});
test("explicit import retry succeeds; disposed late completion cannot revive controls", async () => {
  let calls = 0;
  const pending = transport<object>(),
    component = {};
  const owner = createInteractivePresentation(
    () => ({ room: room(), message: prompt }),
    () => (++calls === 1 ? Promise.reject(Error("offline")) : pending.promise),
  );
  owner.ensure();
  await flush();
  expect(get(owner.state).phase).toBe("error");
  owner.retry();
  await flush();
  pending.resolve(component);
  await flush();
  expect(get(owner.state).component).toBe(component);
  expect(calls).toBe(2);
  owner.dispose();
  expect(owner.current()).toBe(false);
  const late = transport<object>();
  const old = createInteractivePresentation(
    () => ({ room: room(), message: prompt }),
    () => late.promise,
  );
  old.ensure();
  await flush();
  old.dispose();
  late.resolve({});
  await flush();
  expect(get(old.state).component).toBeNull();
});
test("same-ID changed canonical content fences old connected controls until updated props", () => {
  const latest = {
    ...prompt,
    text: "Replacement",
    choices: '{"options":["C","D"]}',
  };
  expect(interactiveCurrent(room(latest), prompt)).toBe(false);
  expect(interactiveCurrent(room(latest), latest)).toBe(true);
});
