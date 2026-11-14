// Deferred module/mount ownership only; no browser geometry/network acceptance.
import { afterEach, expect, test } from "bun:test";
import { plugin } from "bun";
import { readFileSync } from "node:fs";
import { compile, compileModule } from "svelte/compiler";
import { Window } from "happy-dom";
import { writable } from "svelte/store";
const environment = new Window({ url: "http://localhost/" });
for (const name of [
  "window",
  "document",
  "navigator",
  "location",
  "Node",
  "Element",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLTextAreaElement",
  "HTMLButtonElement",
  "DocumentFragment",
  "Text",
  "Comment",
  "MutationObserver",
  "Event",
  "InputEvent",
  "MouseEvent",
  "KeyboardEvent",
  "getComputedStyle",
]) {
  const value =
    name === "window" ? environment : Reflect.get(environment, name);
  Object.defineProperty(globalThis, name, {
    value: name === "getComputedStyle" ? value.bind(environment) : value,
    writable: true,
    configurable: true,
  });
}
plugin({
  name: "deferred-interactive-owned-source",
  setup(build) {
    build.onLoad({ filter: /\.svelte\.js$/ }, (args) => ({
      contents: compileModule(readFileSync(args.path, "utf8"), {
        filename: args.path,
        generate: "client",
      }).js.code,
      loader: "js",
    }));
    build.onLoad({ filter: /\.svelte$/ }, (args) => ({
      contents: compile(readFileSync(args.path, "utf8"), {
        filename: args.path,
        generate: "client",
        css: "injected",
      }).js.code,
      loader: "js",
    }));
  },
});
const { mount, unmount, flushSync, tick } = await import("svelte");
const { default: Harness } =
  await import("./deferred-interactive-harness.svelte");
const { default: InteractiveBody } =
  await import("../svelte/features/chat-interactive/InteractiveBody.svelte");
import type { Room, Message } from "../shared/room";
import type { ChatActions, ChatBridge } from "../svelte/chatTypes";
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
const vb: ChatBridge = {
  t: (text) => text,
  name: (email) => email,
  ago: () => "now",
  hhmm: () => "09:00",
  waiting: () => false,
  locale: "en",
};
let cleanup: (() => Promise<void>) | undefined;
afterEach(async () => {
  await cleanup?.();
  cleanup = undefined;
  document.body.replaceChildren();
});
const settle = async () => {
  for (let i = 0; i < 10; i++) {
    await Promise.resolve();
    flushSync();
    await tick();
  }
};
function pending() {
  let resolve!: (value: typeof InteractiveBody) => void;
  const promise = new Promise<typeof InteractiveBody>((yes) => {
    resolve = yes;
  });
  return { promise, resolve };
}
function render(load: () => Promise<typeof InteractiveBody>) {
  const state = writable({ room: room(), message: prompt }),
    target = document.createElement("div"),
    drafts: string[] = [];
  const actions: ChatActions = {
    request: async () => ({ ok: true }),
    draftReply: (value) => drafts.push(value.text),
    navigate: () => {},
    reply: () => {},
    openFile: () => {},
  };
  document.body.append(target);
  const instance = flushSync(() =>
    mount(Harness, { target, props: { state, actions, vb, load } }),
  );
  cleanup = () => unmount(instance);
  return { state, target, drafts };
}
test("late A import cannot mount A after a canonical message replacement, and loading never dispatches", async () => {
  const old = pending(),
    next = pending();
  let calls = 0;
  const { state, target, drafts } = render(() =>
    ++calls === 1 ? old.promise : next.promise,
  );
  await settle();
  expect(target.querySelector('[aria-busy="true"]') !== null).toBe(true);
  expect(target.querySelector("input")).toBeNull();
  const replacement = { ...prompt, id: 2, choices: '{"options":["C","D"]}' };
  flushSync(() => state.set({ room: room(replacement), message: replacement }));
  await settle();
  old.resolve(InteractiveBody);
  await settle();
  expect(target.querySelector("input")).toBeNull();
  next.resolve(InteractiveBody);
  await settle();
  expect(target.textContent).toContain("C");
  expect(
    target.querySelector('[data-native-interactive-state="ready"]') !== null,
  ).toBe(true);
  expect(drafts).toHaveLength(0);
  expect(calls).toBe(2);
});
test("receipt refresh retains actual choice DOM and selected draft; revocation removes controls", async () => {
  let calls = 0;
  const { state, target, drafts } = render(async () => {
    calls++;
    return InteractiveBody;
  });
  await settle();
  const radio = target.querySelector<HTMLInputElement>('input[type="radio"]');
  if (!radio) throw Error("Missing real choices");
  radio.checked = true;
  radio.dispatchEvent(new Event("change", { bubbles: true }));
  await settle();
  expect(drafts).toEqual(["A"]);
  flushSync(() =>
    state.set({
      room: { ...room(), online: ["me@test"], messages: [{ ...prompt }] },
      message: { ...prompt },
    }),
  );
  await settle();
  expect(target.querySelector('input[type="radio"]') === radio).toBe(true);
  expect(radio.checked).toBe(true);
  expect(calls).toBe(1);
  flushSync(() =>
    state.set({ room: { ...room(), members: [] }, message: prompt }),
  );
  await settle();
  expect(target.querySelector("input")).toBeNull();
  radio.dispatchEvent(new Event("change", { bubbles: true }));
  expect(drafts).toEqual(["A"]);
});
test("explicit import retry mounts current controls; account replacement suppresses ignored old success", async () => {
  let calls = 0;
  const old = pending();
  const { state, target } = render(() =>
    ++calls === 1 ? Promise.reject(Error("offline")) : old.promise,
  );
  await settle();
  expect(target.querySelector('[role="alert"]') !== null).toBe(true);
  target.querySelector<HTMLButtonElement>("button")!.click();
  await settle();
  const replacement = { ...prompt, author: "other@test" };
  flushSync(() =>
    state.set({
      room: { ...room(replacement), me: "other@test", members: ["other@test"] },
      message: replacement,
    }),
  );
  await settle();
  old.resolve(InteractiveBody);
  await settle();
  // A new owner may independently load the public constructor; it only renders
  // the replacement canonical identity, never the original account's controls.
  expect(calls).toBe(3);
  expect(
    target.querySelector('[data-native-interactive-state="ready"]') !== null,
  ).toBe(true);
  expect(target.textContent).not.toContain("offline");
});
