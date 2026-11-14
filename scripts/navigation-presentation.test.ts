import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { createPersonalSession } from "../svelte/features/home/personal";
import { createRoomsSession } from "../svelte/features/rooms/session";
import { createAppNavigationSession } from "../svelte/features/app-navigation/controller";
import { createNavigationPresentation } from "../svelte/features/app-navigation/presentation";
import {
  deferred,
  homeApi,
  manualClock,
  me,
  settle,
} from "./native-home-fixtures";

async function fixture() {
  const timer = manualClock();
  let canonical = me();
  const personal = createPersonalSession(
    homeApi({ me: async () => canonical }),
    { clock: timer.clock },
  );
  await personal.refresh();
  const rooms = createRoomsSession(personal, timer.clock);
  const controller = createAppNavigationSession(
    personal,
    rooms,
    { navigate() {}, home() {}, archived() {}, settings() {} },
    timer.clock,
  );
  const late = deferred<{ name: string }>();
  let loads = 0;
  const presentation = createNavigationPresentation(
    controller,
    () => {
      loads++;
      return late.promise;
    },
    timer.clock,
  );
  return {
    personal,
    controller,
    presentation,
    late,
    loads: () => loads,
    replace(email: string) {
      canonical = me({ email });
      personal.acceptIdentity(email);
      return personal.refresh();
    },
    dispose() {
      presentation.dispose();
      controller.dispose();
      rooms.dispose();
      personal.dispose();
    },
  };
}

test("closed navigation does not fetch presentation; late module cannot reopen a cancelled intent", async () => {
  const h = await fixture();
  try {
    await settle();
    expect(h.loads()).toBe(0);
    h.controller.openSearch();
    await settle();
    const intent = get(h.presentation.state)!;
    expect(intent.kind).toBe("search");
    expect(h.loads()).toBe(1);
    h.presentation.close(intent);
    h.late.resolve({ name: "dialogs" });
    await settle();
    expect(get(h.presentation.state)).toBeNull();
    expect(get(h.controller.search.state).open).toBe(false);
    expect(h.presentation.owns(intent)).toBe(false);
    expect(get(h.presentation.module.state).phase).toBe("ready");
  } finally {
    h.dispose();
  }
});

test("queued old close cannot cancel a new intent before DOM flush; loaded module identity remains stable", async () => {
  const h = await fixture();
  try {
    h.controller.openSearch();
    const old = get(h.presentation.state)!;
    h.controller.search.close();
    h.controller.openCreate();
    const current = get(h.presentation.state)!;
    expect(current.kind).toBe("create");
    h.presentation.close(old);
    expect(get(h.controller.creator.state).open).toBe(true);
    const component = { name: "dialogs" };
    h.late.resolve(component);
    await settle();
    const loaded = get(h.presentation.module.state);
    expect(loaded.phase).toBe("ready");
    if (loaded.phase === "ready") expect(loaded.component).toBe(component);
    h.presentation.close(current);
    h.controller.openSearch();
    await settle();
    expect(h.loads()).toBe(1);
  } finally {
    h.dispose();
  }
});

test("account replacement fences old pending closes and focus references without discarding the current intent", async () => {
  const h = await fixture();
  try {
    h.controller.openSearch();
    const old = get(h.presentation.state)!;
    await h.replace("new@example.test");
    h.controller.openSearch();
    const next = get(h.presentation.state)!;
    expect(next.account).toBe("new@example.test");
    expect(next.identityRevision).not.toBe(old.identityRevision);
    h.presentation.close(old);
    expect(get(h.controller.search.state).open).toBe(true);
    expect(h.presentation.returnFocus(old, null)).toBeNull();
    h.late.resolve({ name: "dialogs" });
    await settle();
    expect(h.presentation.owns(next)).toBe(true);
  } finally {
    h.dispose();
  }
});

test("disposal ignores a late module and releases the loader ownership predicate", async () => {
  const h = await fixture();
  h.controller.openSearch();
  await settle();
  const intent = get(h.presentation.state)!;
  h.presentation.dispose();
  h.late.resolve({ name: "late" });
  await settle();
  expect(get(h.presentation.state)).toBeNull();
  expect(h.presentation.owns(intent)).toBe(false);
  expect(get(h.presentation.module.state).phase).not.toBe("ready");
  h.dispose();
});
