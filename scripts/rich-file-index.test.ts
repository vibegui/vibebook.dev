import { expect, test } from "bun:test";
import type { Attachment, Message, Room } from "../shared/room";
import { reduceRoom } from "../svelte/roomStore";
import {
  collectRoomFiles,
  createRichFileIndex,
} from "../svelte/features/rich-text/roomFiles";
import { fileTarget, knownFiles } from "../svelte/features/rich-text/links";
import { createRichSession } from "../svelte/features/rich-text/session";
import type { RichContext } from "../svelte/features/rich-text/types";
const scope = {
  roomId: "abc123",
  account: "me@example.test",
  roomGeneration: 1,
  identityRevision: 1,
};
const file = (id: string, name = "shared.txt", ts = 1): Attachment => ({
  id,
  name,
  ts,
  type: "text/plain",
  size: 10,
  author: scope.account,
});
const message = (id: number): Message => ({
  id,
  thread: "main",
  author: scope.account,
  kind: null,
  text: `Message ${id}`,
  ts: id,
});
function fixture() {
  let scans = 0,
    sourceReads = 0,
    available = true,
    current = true,
    latestScope = { ...scope };
  function track(room: Room) {
    const messages = room.messages;
    // Count actual canonical-message iteration in the production collector.
    // Reference checks do not iterate; no fake replacement collector is injected.
    Object.defineProperty(messages, Symbol.iterator, {
      configurable: true,
      value: function* () {
        scans++;
        yield* messages.values();
      },
    });
    return room;
  }
  let room: Room = track({
    id: scope.roomId,
    me: scope.account,
    book: { owner: scope.account, title: "Room" },
    members: [scope.account],
    online: [],
    typing: {},
    messages: Array.from({ length: 660 }, (_, index) => message(index + 1)),
    epics: [],
    suggestions: [],
    files: [file("aa")],
  });
  const index = createRichFileIndex(
    scope,
    () => {
      sourceReads++;
      return available ? { scope: latestScope, room } : null;
    },
    () => current,
  );
  const context = (idPrefix = "fixture"): RichContext => ({
    room,
    fileIndex: index,
    pageUrl: "https://example.test/b/abc123",
    idPrefix,
  });
  return {
    index,
    context,
    get room() {
      return room;
    },
    set room(value: Room) {
      room = track(value);
    },
    scans: () => scans,
    sourceReads: () => sourceReads,
    available: (value: boolean) => {
      available = value;
    },
    current: (value: boolean) => {
      current = value;
    },
    scope: (value: typeof scope) => {
      latestScope = value;
    },
  };
}
test("60 actual RichSessions share one canonical-file scan and retain nodes across receipt/text-only snapshots", () => {
  const h = fixture(),
    sessions = Array.from({ length: 60 }, () => createRichSession()),
    text = "Read [shared file](/api/books/abc123/files/aa).";
  const first = sessions.map((session, i) =>
    session.render(text, "markdown", h.context(`row-${i}`)),
  );
  expect(h.scans()).toBe(1);
  const receipt = reduceRoom(
    h.room,
    { t: "receipts", receipts: [] },
    scope.roomId,
  );
  if (!receipt) throw Error("Expected actual receipt projection");
  h.room = receipt;
  sessions.forEach((session, i) =>
    expect(
      session.render(text, "markdown", h.context(`row-${i}`)) === first[i],
    ).toBe(true),
  );
  expect(h.scans()).toBe(1);
  const changed = reduceRoom(
    h.room,
    { t: "delta", id: 660, text: "Updated text only" },
    scope.roomId,
  );
  if (!changed) throw Error("Expected actual delta projection");
  h.room = changed;
  sessions.forEach((session, i) =>
    expect(
      session.render(text, "markdown", h.context(`row-${i}`)) === first[i],
    ).toBe(true),
  );
  expect(h.scans()).toBe(2);
  for (const session of sessions) session.dispose();
  h.index.dispose();
});
test("canonical file replacement/removal, older history and origins preserve exact fresh ordering and versions", () => {
  const h = fixture(),
    aa = file("aa"),
    bb = file("bb", "shared.txt", 3),
    cc = file("cc", "origin.txt", 2);
  const older = {
    ...message(0),
    files: [file("aa", "obsolete duplicate"), bb],
  };
  const history = reduceRoom(
    h.room,
    { t: "older", messages: [older], thread: "main", more: false },
    scope.roomId,
  );
  if (!history) throw Error("Expected actual older projection");
  h.room = { ...history, origins: [{ ...message(999), files: [cc, bb] }] };
  expect(h.index.read(h.room)?.files).toEqual([aa, bb, cc]);
  expect(h.index.read(h.room)?.files).toEqual(collectRoomFiles(h.room));
  expect(
    fileTarget("/api/books/abc123/files/aa", "", h.context()),
  ).toMatchObject({ attachment: aa, version: 1 });
  const update = file("aa", "renamed.txt", 4);
  const added = reduceRoom(
    h.room,
    { t: "fileAdd", file: update },
    scope.roomId,
  );
  if (!added) throw Error("Expected actual file projection");
  h.room = added;
  expect(h.index.read(h.room)?.files[0] === update).toBe(true);
  expect(
    fileTarget("/api/books/abc123/files/aa", "", h.context()),
  ).toMatchObject({ file: { name: "renamed.txt" } });
  const full = reduceRoom(h.room, { t: "files", files: [] }, scope.roomId);
  if (!full) throw Error("Expected actual full-index projection");
  h.room = {
    ...full,
    messages: h.room.messages.filter((row) => row.id !== 0),
    origins: [],
  };
  expect(h.index.read(h.room)?.files).toEqual([]);
  expect(
    fileTarget("/api/books/abc123/files/aa", "fallback", h.context())
      ?.attachment,
  ).toBeUndefined();
  h.index.dispose();
});
test("current-reference checks reject old cached and partial/full-file projected contexts without borrowing files", () => {
  const h = fixture(),
    old = h.room;
  const first = h.index.read(old);
  expect(first?.files.map((item) => item.id)).toEqual(["aa"]);
  h.room = { ...old, files: [file("bb")] };
  expect(h.index.read(old)).toBeNull();
  const projected = { ...h.room, files: [] };
  expect(h.index.read(projected)).toBeNull();
  expect(knownFiles({ ...h.context(), room: projected })).toEqual([]);
  expect(h.index.read(h.room)?.files.map((item) => item.id)).toEqual(["bb"]);
  const foreign = {
    ...h.room,
    id: "def456",
    me: "other@example.test",
    files: [file("cc")],
  };
  expect(h.index.read(foreign)).toBeNull();
  expect(knownFiles({ ...h.context(), room: foreign })).toEqual(foreign.files);
  h.index.dispose();
});
test("account/room/generation authority changes and disposal irreversibly stop the old service", () => {
  for (const changed of [
    { ...scope, account: "other@example.test" },
    { ...scope, roomId: "def456" },
    { ...scope, roomGeneration: 2 },
    { ...scope, identityRevision: 2 },
  ]) {
    const h = fixture();
    expect(h.index.read(h.room)).not.toBeNull();
    h.scope(changed);
    expect(h.index.read(h.room)).toBeNull();
    h.scope(scope);
    expect(h.index.read(h.room)).toBeNull();
    const reads = h.sourceReads();
    h.index.dispose();
    expect(h.index.read(h.room)).toBeNull();
    expect(h.sourceReads()).toBe(reads);
  }
});
test("current-owner invalidation clears the service permanently even when source props remain identical", () => {
  const h = fixture();
  expect(h.index.read(h.room)).not.toBeNull();
  h.current(false);
  expect(h.index.read(h.room)).toBeNull();
  const reads = h.sourceReads();
  h.current(true);
  expect(h.index.read(h.room)).toBeNull();
  expect(h.sourceReads()).toBe(reads);
});
test("missing authoritative snapshot clears cached view; names/policy/local-ID session keys remain effective", () => {
  const h = fixture(),
    first = h.index.read(h.room);
  h.available(false);
  expect(h.index.read(h.room)).toBeNull();
  h.available(true);
  expect(h.index.read(h.room) === first).toBe(false);
  const session = createRichSession(),
    text = "Hello @me [file](/api/books/abc123/files/aa)",
    nodes = session.render(text, "markdown", h.context());
  h.room = { ...h.room, names: { [scope.account]: "New name" } };
  expect(session.render(text, "markdown", h.context()) === nodes).toBe(false);
  const named = session.render(text, "markdown", h.context());
  expect(
    session.render(text, "markdown", {
      ...h.context(),
      idPrefix: "another",
    }) === named,
  ).toBe(false);
  const prefixed = session.render(text, "markdown", {
    ...h.context(),
    idPrefix: "another",
  });
  expect(
    session.render(text, "markdown", {
      ...h.context(),
      idPrefix: "another",
      policy: "document",
    }) === prefixed,
  ).toBe(false);
  session.dispose();
  h.index.dispose();
});
