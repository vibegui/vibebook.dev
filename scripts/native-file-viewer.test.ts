// Pure owners and HTTP stream fixtures; not browser/media/provider acceptance.
import { expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Room, Attachment } from "../shared/room";
import type { RequestRoomCommand } from "../svelte/roomConnection";
import { createFileViewer } from "../svelte/features/file-viewer/session";
import { createViewerHistory } from "../svelte/features/file-viewer/history";
import {
  createFileReadApi,
  FILE_PREVIEW_BYTES,
} from "../svelte/features/file-viewer/api";
import {
  csvRows,
  fileTargetFromURL,
  fileVersions,
  viewerKind,
} from "../svelte/features/file-viewer/model";
import { manualClock, deferred, settle } from "./native-home-fixtures";
const attachment = (id = "aa", ts = 1): Attachment => ({
  id,
  name: "report.md",
  type: "text/markdown",
  size: 2,
  ts,
  author: "a",
});
const room = (extra: Partial<Room> = {}): Room => ({
  id: "aaaaaa",
  me: "a",
  members: ["a"],
  book: { title: "Room", owner: "a" },
  messages: [],
  epics: [],
  online: [],
  suggestions: [],
  typing: {},
  files: [attachment()],
  filesAll: true,
  ...extra,
});
function browser(initial = "https://test.local/b/aaaaaa?ui=svelte") {
  let at = 0,
    backs = 0;
  const entries: { url: string; state: unknown }[] = [
    { url: initial, state: null },
  ];
  const history = {
    pushState(data: unknown, _unused: string, url?: string | URL | null) {
      entries.splice(++at);
      entries.push({
        url: new URL(url ?? entries[at - 1]!.url, entries[at - 1]!.url).href,
        state: data,
      });
    },
    replaceState(data: unknown, _unused: string, url?: string | URL | null) {
      entries[at] = {
        url: new URL(url ?? entries[at]!.url, entries[at]!.url).href,
        state: data,
      };
    },
    back() {
      backs++;
    },
  };
  return {
    history,
    href: () => entries[at]!.url,
    state: () => entries[at]!.state,
    pop() {
      at = Math.max(0, at - 1);
    },
    forward() {
      at = Math.min(entries.length - 1, at + 1);
    },
    get backs() {
      return backs;
    },
    entries,
  };
}
function fixture() {
  const nav = browser(),
    timer = manualClock();
  const session = createFileViewer({
    ...nav,
    clock: timer.clock,
    api: {
      probe: async () => ({ type: "text/markdown", size: 2 }),
      text: async () => ({
        metadata: { type: "text/markdown" },
        text: "ok",
        truncated: false,
      }),
    },
  });
  session.sync(room(), async () => ({ ok: true }));
  return { session, nav, timer };
}
test("exact URL validation and response MIME determine executable preview kind", () => {
  expect(
    fileTargetFromURL("/api/books/aaaaaa/files/aa", "https://test.local"),
  ).toEqual({ roomId: "aaaaaa", id: "aa" });
  for (const value of [
    "https://evil.local/api/books/aaaaaa/files/aa",
    "/api/books/aaaaaa/files/aa%2Fbb",
    "/api/books/aaaaaa/files/aa/more",
    "/api/books/aaaaaa/files/nope",
  ])
    expect(fileTargetFromURL(value, "https://test.local")).toBeNull();
  expect(viewerKind("text/plain", "file.html")).toBe("text");
  expect(viewerKind("image/svg+xml", "file.svg")).toBe("download");
  expect(viewerKind("text/html", "file.txt")).toBe("html");
});
test("version order follows immutable upload timestamps and full index is authoritative", () => {
  const old = attachment("aa", 1),
    fresh = attachment("bb", 4);
  const value = room({ files: [fresh, old] });
  expect(fileVersions(value, "report.md").map((file) => file.id)).toEqual([
    "bb",
    "aa",
  ]);
  expect(csvRows('a,b\n"c,d","e""f"\r\n')).toEqual([
    ["a", "b"],
    ["c,d", 'e"f'],
  ]);
  expect(csvRows("a;b;c\nx;y;z", 1, 2)).toEqual([["a", "b"]]);
});
test("new same-name version does not retarget selected old file; changed witness and full removal fail closed", async () => {
  const { session } = fixture();
  expect(
    session.open({ roomId: "aaaaaa", id: "aa", metadata: attachment() }),
  ).toBe(true);
  await settle();
  expect(get(session.state).content?.text).toBe("ok");
  session.sync(
    room({ files: [attachment("bb", 5), attachment()] }),
    async () => ({ ok: true }),
  );
  expect(get(session.state).target?.id).toBe("aa");
  expect(get(session.state).versions.map((file) => file.id)).toEqual([
    "bb",
    "aa",
  ]);
  session.sync(room({ files: [] }), async () => ({ ok: true }));
  expect(get(session.state).error).toBe("missing");
  expect(
    session.open({ roomId: "aaaaaa", id: "aa", metadata: attachment() }),
  ).toBe(false);
  session.dispose();
});
test("partial reconnect retains selected version and reloads once; ACK alone times out with explicit recovery", async () => {
  const { session, timer } = fixture();
  session.open({ roomId: "aaaaaa", id: "aa" });
  await settle();
  let calls = 0;
  const request: RequestRoomCommand = async () => {
    calls++;
    return { ok: true };
  };
  session.sync(room({ files: [], filesAll: false }), request, true);
  await settle();
  expect(calls).toBe(1);
  expect(get(session.state).file?.id).toBe("aa");
  for (let i = 0; i < 5; i++)
    session.sync(room({ files: [], filesAll: false }), request);
  await settle();
  expect(calls).toBe(1);
  timer.advance(10000);
  expect(get(session.state).indexError).toBe("index-unconfirmed");
  session.retryIndex();
  await settle();
  expect(calls).toBe(2);
  session.sync(room(), request);
  expect(get(session.state).indexPending).toBe(false);
  session.dispose();
});
test("late ignored-abort read cannot overwrite new selection, reset or deadline retry", async () => {
  const nav = browser(),
    timer = manualClock(),
    old = deferred<{
      metadata: { type: string };
      text: string;
      truncated: boolean;
    }>();
  let reads = 0;
  const session = createFileViewer({
    ...nav,
    clock: timer.clock,
    api: {
      probe: async () => ({ type: "text/markdown", size: 2 }),
      text: async () =>
        ++reads === 1
          ? old.promise
          : {
              metadata: { type: "text/markdown" },
              text: "new",
              truncated: false,
            },
    },
  });
  session.sync(
    room({ files: [attachment(), attachment("bb", 2)] }),
    async () => ({ ok: true }),
  );
  session.open({ roomId: "aaaaaa", id: "aa" });
  await settle();
  timer.advance(20000);
  expect(get(session.state).error).toBe("read-timeout");
  session.retry();
  await settle();
  expect(get(session.state).content?.text).toBe("new");
  old.resolve({
    metadata: { type: "text/markdown" },
    text: "old",
    truncated: false,
  });
  await settle();
  expect(get(session.state).content?.text).toBe("new");
  const ticket = get(session.state).content!.operation;
  session.reset();
  session.ready(ticket);
  expect(get(session.state).open).toBe(false);
  session.dispose();
});
test("account and room replacement synchronously close preview and reject departed callbacks", async () => {
  const { session } = fixture();
  session.open({ roomId: "aaaaaa", id: "aa" });
  await settle();
  const ticket = get(session.state).content!.operation;
  session.sync(room({ me: "b", members: ["b"] }), async () => ({ ok: true }));
  expect(get(session.state).open).toBe(false);
  session.mediaError(ticket);
  expect(get(session.state).error).toBe("");
  session.dispose();
  expect(session.open({ roomId: "aaaaaa", id: "aa" })).toBe(false);
});
test("owned Back closes once, Forward adopts same entry, and close queues route until actual pop", () => {
  const nav = browser(),
    timer = manualClock();
  let closes = 0,
    routes = 0;
  const queue: (() => void)[] = [];
  const history = createViewerHistory({
    ...nav,
    clock: timer.clock,
    closed: () => closes++,
    enqueue: (callback) => queue.push(callback),
  });
  history.open({ roomId: "aaaaaa", id: "aa" });
  expect(nav.entries.length).toBe(2);
  nav.pop();
  expect(history.consumePop()).toBe("handled");
  expect(closes).toBe(1);
  nav.forward();
  history.open({ roomId: "aaaaaa", id: "aa" });
  expect(nav.entries.length).toBe(2);
  history.closeUser();
  expect(nav.backs).toBe(1);
  expect(history.deferNavigation(() => routes++)).toBe(true);
  expect(routes).toBe(0);
  nav.pop();
  expect(history.consumePop()).toBe("handled");
  queue.forEach((callback) => callback());
  expect(routes).toBe(1);
  expect(history.consumePop()).toBe("none");
  history.dispose();
});
test("direct deep link has a safe base entry and versions replace history", () => {
  const nav = browser("https://test.local/b/aaaaaa?ui=svelte&t=epic#faa"),
    timer = manualClock();
  const history = createViewerHistory({
    ...nav,
    clock: timer.clock,
    closed: () => {},
  });
  history.open({ roomId: "aaaaaa", id: "aa" });
  expect(nav.entries[0]!.url).not.toContain("#f");
  history.open({ roomId: "aaaaaa", id: "bb" });
  expect(nav.entries.length).toBe(2);
  expect(nav.href()).toContain("#fbb");
  history.dispose();
});
test("range probe cancels body and rejects malformed ranges, errors and mismatching status", async () => {
  let cancelled = 0;
  const api = createFileReadApi(async (_url, init) => {
    expect(new Headers(init?.headers).get("range")).toBe("bytes=0-0");
    expect(init?.cache).toBe("no-store");
    return new Response(
      new ReadableStream({
        cancel() {
          cancelled++;
        },
      }),
      {
        status: 206,
        headers: {
          "content-range": "bytes 0-0/2",
          "content-type": "text/plain",
        },
      },
    );
  });
  expect(
    (
      await api.probe(
        { roomId: "aaaaaa", id: "aa" },
        new AbortController().signal,
      )
    ).size,
  ).toBe(2);
  expect(cancelled).toBe(1);
  const invalid = createFileReadApi(
    async () =>
      new Response("x", {
        status: 206,
        headers: { "content-range": "bytes 1-1/2" },
      }),
  );
  await expect(
    invalid.probe({ roomId: "aaaaaa", id: "aa" }, new AbortController().signal),
  ).rejects.toThrow("invalid-range");
  const denied = createFileReadApi(
    async () => new Response("No", { status: 403 }),
  );
  await expect(
    denied.text({ roomId: "aaaaaa", id: "aa" }, new AbortController().signal),
  ).rejects.toThrow("forbidden");
});
test("text preview is streamed and byte/character bounded with cancellation", async () => {
  let cancelled = 0;
  const api = createFileReadApi(
    async () =>
      new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new Uint8Array(FILE_PREVIEW_BYTES + 8).fill(97));
          },
          cancel() {
            cancelled++;
          },
        }),
        { headers: { "content-type": "text/plain" } },
      ),
  );
  const result = await api.text(
    { roomId: "aaaaaa", id: "aa" },
    new AbortController().signal,
  );
  expect(result.truncated).toBe(true);
  expect(result.text.length).toBe(300000);
  expect(cancelled).toBe(1);
});

test("closing deadline keeps pending traversal, latest queued intent wins only after matching late pop", () => {
  const nav = browser(),
    timer = manualClock(),
    queue: (() => void)[] = [];
  let unconfirmed = 0,
    old = 0,
    newer = 0;
  const history = createViewerHistory({
    ...nav,
    clock: timer.clock,
    enqueue: (callback) => queue.push(callback),
    closed: () => {},
    unconfirmed: () => unconfirmed++,
  });
  history.open({ roomId: "aaaaaa", id: "aa" });
  history.closeUser();
  history.deferNavigation(() => old++);
  timer.advance(1500);
  expect(unconfirmed).toBe(1);
  expect(nav.href()).toContain("#faa");
  expect(queue.length).toBe(0);
  history.deferNavigation(() => newer++);
  nav.pop();
  expect(history.consumePop()).toBe("handled");
  queue.forEach((callback) => callback());
  expect(old).toBe(0);
  expect(newer).toBe(1);
  history.dispose();
});
test("reset fences already enqueued close navigation and late traversal does not revive it", () => {
  const nav = browser(),
    timer = manualClock(),
    queue: (() => void)[] = [];
  let routes = 0;
  const history = createViewerHistory({
    ...nav,
    clock: timer.clock,
    enqueue: (callback) => queue.push(callback),
    closed: () => {},
  });
  history.open({ roomId: "aaaaaa", id: "aa" });
  history.closeUser();
  history.deferNavigation(() => routes++);
  nav.pop();
  history.consumePop();
  history.reset();
  queue.forEach((callback) => callback());
  expect(routes).toBe(0);
  expect(history.consumePop()).toBe("none");
  history.dispose();
});
