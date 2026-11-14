// Pure presentation/history ownership fixtures. No Worker, browser or CSS playback is represented.
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
  documentMaximum,
  documentWidth,
  documentProgress,
  storedDocumentWidth,
  sheetEndpoint,
  sheetEasing,
  hasSheetSurface,
} from "../svelte/features/room-layout/model";
import { createRoomSheetHistory } from "../svelte/features/room-layout/history";
import { createRoomLayout } from "../svelte/features/room-layout/controller";
import type {
  RoomLayoutBrowser,
  RoomSheet,
} from "../svelte/features/room-layout/types";
import { auditPresentation, auditTailwind } from "./style-policy";

function fixture() {
  const entries: { href: string; state: unknown }[] = [
    { href: "https://vibebook.test/b/abcdef?ui=svelte#emain", state: null },
  ];
  let index = 0,
    backs = 0,
    current = true,
    sheet: RoomSheet | null = null,
    warning = false,
    scheduled = 0;
  const timers = new Map<number, () => void>(),
    microtasks: (() => void)[] = [];
  const browser: RoomLayoutBrowser = {
    href: () => entries[index]!.href,
    state: () => entries[index]!.state,
    storage: null,
    history: {
      pushState(state, _title, url) {
        const href = new URL(String(url), entries[index]!.href).href;
        entries.splice(index + 1);
        entries.push({ state, href });
        index++;
      },
      replaceState(state, _title, url) {
        entries[index] = {
          state,
          href: new URL(String(url), entries[index]!.href).href,
        };
      },
      back() {
        backs++;
      },
    },
    schedule(callback) {
      const id = ++scheduled;
      timers.set(id, callback);
      return id;
    },
    cancel(handle) {
      if (typeof handle === "number") timers.delete(handle);
    },
    enqueue(callback) {
      microtasks.push(callback);
    },
  };
  const owner = createRoomSheetHistory({
    browser,
    current: () => current,
    changed: (value) => {
      sheet = value;
    },
    unconfirmed: (value) => {
      warning = value;
    },
  });
  return {
    owner,
    browser,
    entries,
    read: () => ({ index, backs, sheet, warning }),
    expire() {
      for (const [id, run] of [...timers]) {
        timers.delete(id);
        run();
      }
    },
    flush() {
      for (const run of microtasks.splice(0)) run();
    },
    back() {
      if (index > 0) index--;
      return owner.consumePop();
    },
    forward() {
      if (index + 1 < entries.length) index++;
      return owner.consumePop();
    },
    backForwardBeforeEvent() {
      if (index > 0) {
        index--;
        index++;
      }
      return owner.consumePop();
    },
    foreign() {
      entries[index] = {
        href: "https://vibebook.test/b/ffffff?ui=svelte",
        state: { another: true },
      };
    },
    deny() {
      current = false;
    },
  };
}

test("width reserves the real container/rail instead of the browser's unallocated width", () => {
  expect(documentMaximum(1440, false)).toBe(848);
  expect(documentMaximum(1440, true)).toBe(1052);
  expect(documentMaximum(1360, false)).toBe(768);
  expect(documentWidth(900, 1360, false)).toBe(768);
  expect(documentWidth(473, 901, false)).toBe(309);
  expect(documentWidth(473, 1440, false)).toBe(473);
  expect(storedDocumentWidth("473")).toBe(473);
  expect(storedDocumentWidth("0")).toBe(380);
  expect(storedDocumentWidth("bad")).toBe(380);
  expect(documentProgress(260, 1440, false)).toBe(0);
  expect(documentProgress(848, 1440, false)).toBe(1);
});
test("measured fast-close threshold and release curve preserve actual endpoints", () => {
  expect(sheetEndpoint(1, 819, 679.8, 348)).toBe(0);
  expect(sheetEndpoint(0, 460, 529.6, 348)).toBe(0);
  expect(sheetEndpoint(0, 460, 600, 348)).toBe(1);
  expect(sheetEndpoint(1, 819, 814, 348)).toBe(1);
  expect(sheetEasing(0)).toBe(0);
  expect(sheetEasing(1)).toBe(1);
  let previous = 0;
  for (const x of [0.01, 0.05, 0.1, 0.2, 0.4, 0.6, 0.8, 0.99]) {
    const next = sheetEasing(x);
    expect(next).toBeGreaterThan(previous);
    expect(next).toBeLessThanOrEqual(1);
    previous = next;
  }
});
test("full Board has no document-sheet surface to seek after replacing the pane", () => {
  expect(
    hasSheetSurface("doc", { documentVisible: true, boardFull: false }),
  ).toBe(true);
  expect(
    hasSheetSurface("doc", { documentVisible: false, boardFull: true }),
  ).toBe(false);
  expect(
    hasSheetSurface("doc", { documentVisible: true, boardFull: true }),
  ).toBe(false);
  expect(
    hasSheetSurface("side", { documentVisible: false, boardFull: true }),
  ).toBe(true);
});
test("switching sheets uses one history entry; real Back and Forward close/restore it", () => {
  const f = fixture();
  f.owner.open("side");
  f.owner.open("doc");
  expect(f.entries).toHaveLength(2);
  expect(f.read().sheet).toBe("doc");
  expect(f.back()).toBe(true);
  expect(f.read().sheet).toBeNull();
  expect(f.forward()).toBe(true);
  expect(f.read().sheet).toBe("doc");
  f.owner.dispose();
});
test("close queues navigation until matching Back, and pending deadline is not completion", () => {
  const f = fixture();
  let navigation = 0;
  f.owner.open("doc");
  f.owner.close();
  expect(f.read().backs).toBe(1);
  expect(f.owner.deferNavigation(() => navigation++)).toBe(true);
  f.expire();
  f.flush();
  expect(f.read().warning).toBe(true);
  expect(navigation).toBe(0);
  expect(f.back()).toBe(true);
  expect(f.read().warning).toBe(false);
  expect(navigation).toBe(0);
  f.flush();
  expect(navigation).toBe(1);
  f.owner.dispose();
});
test("same-URL pop and Back→Forward before a delayed event do not confirm departure", () => {
  const f = fixture();
  let navigation = 0;
  f.owner.open("doc");
  f.owner.close();
  f.owner.deferNavigation(() => navigation++);
  expect(f.owner.consumePop()).toBe(true);
  f.flush();
  expect(navigation).toBe(0);
  expect(f.backForwardBeforeEvent()).toBe(true);
  f.expire();
  f.flush();
  expect(f.read().warning).toBe(true);
  expect(navigation).toBe(0);
  expect(f.back()).toBe(true);
  f.flush();
  expect(navigation).toBe(1);
  f.owner.dispose();
});
test("an explicit retry and late pop never replay an intent into a replaced owner", () => {
  const f = fixture();
  let navigation = 0;
  f.owner.open("side");
  f.owner.close();
  f.owner.deferNavigation(() => navigation++);
  f.expire();
  f.owner.retry();
  expect(f.read().backs).toBe(2);
  f.deny();
  expect(f.back()).toBe(false);
  f.flush();
  expect(navigation).toBe(0);
  f.owner.dispose();
});
test("a queued intent is obsolete after disposal and only the latest pending intent runs", () => {
  const first = fixture();
  let result = "none";
  first.owner.open("doc");
  first.owner.close();
  first.owner.deferNavigation(() => {
    result = "old";
  });
  first.owner.deferNavigation(() => {
    result = "latest";
  });
  first.back();
  first.flush();
  expect(result).toBe("latest");
  first.owner.dispose();
  const second = fixture();
  second.owner.open("doc");
  second.owner.close();
  second.owner.deferNavigation(() => {
    result = "disposed";
  });
  second.back();
  second.owner.dispose();
  second.flush();
  expect(result).toBe("latest");
});
test("taking a sheet entry asks the route owner to replace, never asynchronously backs", () => {
  const f = fixture();
  f.owner.open("doc");
  expect(f.owner.take()).toBe(true);
  expect(f.read().backs).toBe(0);
  expect(f.read().sheet).toBeNull();
  expect(f.browser.state()).toBeNull();
  f.browser.history.replaceState(null, "", "/b/abcdef?ui=svelte#eabc123");
  expect(f.entries).toHaveLength(2);
  expect(f.owner.take()).toBe(false);
  f.owner.dispose();
});
test("foreign route/history state is not rewritten or consumed by old sheet cleanup", () => {
  const f = fixture();
  f.owner.open("doc");
  f.foreign();
  f.owner.beforeNavigation();
  expect(f.browser.state()).toEqual({ another: true });
  expect(f.owner.consumePop()).toBe(false);
  expect(f.read().backs).toBe(0);
  f.owner.dispose();
});
test("viewer-first deferral and exact gate cleanup cannot apply into a replaced scope", () => {
  const f = fixture();
  let current = true;
  const owner = createRoomLayout({
    scopeKey: "owned-account-room",
    current: () => current,
    browser: f.browser,
    onDocumentClosed() {},
  });
  const first: (() => void)[] = [],
    second: (() => void)[] = [];
  const stopOld = owner.setViewerGate({
    deferNavigation: (run) => {
      first.push(run);
      return true;
    },
  });
  owner.setViewerGate({
    deferNavigation: (run) => {
      second.push(run);
      return true;
    },
  });
  stopOld();
  owner.toggleBoard();
  expect(first).toHaveLength(0);
  expect(second).toHaveLength(1);
  expect(owner.read().boardFull).toBe(false);
  current = false;
  second[0]!();
  expect(owner.read().boardFull).toBe(false);
  owner.dispose();
  expect(owner.read().active).toBe(false);
});
test("one Board placement has explicit full/pane transitions and independent desktop document visibility", () => {
  const f = fixture();
  const owner = createRoomLayout({
    scopeKey: "room",
    current: () => true,
    browser: f.browser,
    onDocumentClosed() {},
  });
  owner.toggleBoard();
  expect(owner.read().boardFull).toBe(true);
  expect(owner.read().documentVisible).toBe(false);
  owner.toggleDocument();
  expect(owner.read().documentVisible).toBe(true);
  expect(owner.read().boardFull).toBe(true);
  owner.setPane("board");
  expect(owner.read().pane).toBe("board");
  expect(owner.read().boardFull).toBe(false);
  owner.dispose();
});
test("production geometry stays in the sole stylesheet with no authored JS presentation", () => {
  for (const file of [
    "types.ts",
    "browser.ts",
    "controller.ts",
    "history.ts",
    "model.ts",
    "playback.ts",
    "geometry.ts",
    "RoomLayout.svelte",
    "RoomLayoutFrame.svelte",
  ]) {
    const path = `svelte/features/room-layout/${file}`,
      source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
    expect(auditPresentation(path, source)).toEqual([]);
    expect(source).not.toMatch(
      /\.animate\s*\(|setKeyframes\s*\(|new\s+(?:Animation|KeyframeEffect)|\.style\b|insertRule\s*\(/,
    );
  }
  expect(
    auditTailwind(
      "svelte/styles/tailwind.css",
      readFileSync(
        new URL("../svelte/styles/tailwind.css", import.meta.url),
        "utf8",
      ),
    ),
  ).toEqual([]);
});
