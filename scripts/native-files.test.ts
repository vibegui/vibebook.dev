import { test, expect } from "bun:test";
import { get } from "svelte/store";
import { filesModel } from "../svelte/features/files/model";
import { createFilesSession } from "../svelte/features/files/session";
import type { PanelRoom, RoomFile } from "../svelte/panels";
const file = (id: string, name = "reports/a.md", ts = 1): RoomFile => ({
  id,
  name,
  ts,
  type: "text/markdown",
  size: 10,
  author: "a",
});
const room = (files: RoomFile[], id = "room"): PanelRoom => ({
  id,
  me: "a",
  members: ["a"],
  epics: [],
  book: { title: "room", owner: "a" },
  files,
  pins: [],
});
test("folders count every upload, grouped rows select newest exact identity, root duplicates stay visible", () => {
  const r = room([
    file("old"),
    file("new", "reports/a.md", 3),
    file("b", "reports/sub/b.md"),
    file("root", "a.md"),
    file("root2", "a.md", 2),
  ]);
  expect(filesModel(r, "all", "").folders).toEqual([["reports", 3]]);
  expect(filesModel(r, "all", "").list.map((f) => f.id)).toEqual([
    "root2",
    "root",
  ]);
  const model = filesModel(r, "all", "reports");
  expect(model.list.map((f) => f.id)).toEqual(["new"]);
  expect(model.versions.get("reports/a.md")).toBe(2);
  expect(model.folders).toEqual([["sub", 1]]);
  expect(filesModel(r, "img", "missing").kind).toBe("all");
  expect(filesModel(r, "all", "missing").dir).toBe("");
});
test("partial/full index and a newly arrived version never silently retarget a stale tile", () => {
  const session = createFilesSession("room"),
    old = file("old");
  session.sync(room([old]));
  const opened: string[] = [];
  expect(session.open(old, (f) => opened.push(f.id))).toBe(true);
  session.sync(room([file("new", "reports/a.md", 4)]));
  expect(session.open(old, (f) => opened.push(f.id))).toBe(false);
  session.sync(room([{ ...old, name: "changed" }]));
  expect(session.open(old, (f) => opened.push(f.id))).toBe(false);
  expect(opened).toEqual(["old"]);
  session.dispose();
  expect(
    session.open(old, () => {
      throw Error("disposed");
    }),
  ).toBe(false);
});
test("one pending action, rejected ACK keeps canonical state and selection for retry", async () => {
  const f = file("f"),
    r = room([f]),
    session = createFilesSession("room");
  session.sync(r);
  session.select("md", "reports");
  let calls = 0;
  let finish!: (v: { ok: false; error: string }) => void;
  const request = () => {
    calls++;
    return new Promise<{ ok: false; error: string }>(
      (resolve) => (finish = resolve),
    );
  };
  const pending = session.toggle(f, request);
  await session.toggle(f, request);
  expect(calls).toBe(1);
  finish({ ok: false, error: "offline" });
  await pending;
  expect(get(session.state).error).toBe("offline");
  expect(get(session.state).directory).toBe("reports");
  expect(r.pins).toEqual([]);
  await session.toggle(f, async () => ({ ok: true }));
  expect(get(session.state).pending?.ack).toBe(true);
  session.sync({
    ...r,
    pins: [{ id: "p", kind: "file", ref: "f", title: "" }],
  });
  expect(get(session.state).pending).toBe(null);
});
test("room mismatch and disposed completions cannot mutate another session", async () => {
  const f = file("f"),
    session = createFilesSession("room");
  session.sync(room([f]));
  let complete!: (v: { ok: false; error: string }) => void;
  const pending = session.toggle(
    f,
    () => new Promise((resolve) => (complete = resolve)),
  );
  session.dispose();
  complete({ ok: false, error: "late" });
  await pending;
  expect(get(session.state).error).toBe("");
  const fresh = createFilesSession("new");
  fresh.sync(room([f]));
  expect(
    fresh.open(f, () => {
      throw Error("wrong room");
    }),
  ).toBe(false);
});
test("pin changes wait for both ACK and authoritative pins in either order", async () => {
  const f = file("f"),
    r = room([f]),
    session = createFilesSession("room");
  session.sync(r);
  let ack!: (result: { ok: true }) => void;
  const result = session.toggle(
    f,
    () => new Promise((resolve) => (ack = resolve)),
  );
  session.sync({
    ...r,
    pins: [{ id: "p", kind: "file", ref: "f", title: "" }],
  });
  expect(get(session.state).pending).not.toBe(null);
  ack({ ok: true });
  await result;
  expect(get(session.state).pending).toBe(null);
  let command: unknown;
  await session.toggle(f, async (value) => {
    command = value;
    return { ok: true };
  });
  expect(command).toEqual({ t: "pin.del", id: "p" });
  expect(get(session.state).pending).not.toBe(null);
  // A collaborator can re-pin the same version. Deletion confirms removal of p, not a different pin.
  session.sync({
    ...r,
    pins: [{ id: "new-pin", kind: "file", ref: "f", title: "" }],
  });
  expect(get(session.state).pending).toBe(null);
});
test("partial file index can retry rejection without losing folder/filter and never treats ACK as full metadata", async () => {
  const f = file("f"),
    r = { ...room([f]), filesN: 10, filesAll: false },
    session = createFilesSession("room");
  session.sync(r);
  session.select("md", "reports");
  await session.load(async () => ({ ok: false, error: "offline" }));
  expect(get(session.state).loadError).toBe("offline");
  expect(get(session.state).loading).toBe(false);
  let count = 0;
  await session.load(async (command) => {
    expect(command).toEqual({ t: "files.get" });
    count++;
    return { ok: true };
  });
  await session.load(async () => {
    throw Error("duplicate");
  });
  expect(count).toBe(1);
  expect(get(session.state).loading).toBe(true);
  session.sync({
    ...r,
    filesAll: true,
    files: [f, file("old", "reports/a.md", 0)],
  });
  expect(get(session.state)).toMatchObject({
    loading: false,
    loadError: "",
    kind: "md",
    directory: "reports",
  });
  await session.load(async () => {
    throw Error("already complete");
  });
});
test("full index before rejection and disposal suppress stale load results", async () => {
  const f = file("f"),
    r = room([f]),
    session = createFilesSession("room");
  session.sync(r);
  let finish!: (value: { ok: false; error: string }) => void;
  const pending = session.load(
    () => new Promise((resolve) => (finish = resolve)),
  );
  session.sync({ ...r, filesAll: true });
  finish({ ok: false, error: "late" });
  await pending;
  expect(get(session.state).loadError).toBe("");
  const other = createFilesSession("room");
  other.sync(r);
  const loading = other.load(
    () => new Promise((resolve) => (finish = resolve)),
  );
  other.dispose();
  finish({ ok: false, error: "departed" });
  await loading;
  expect(get(other.state).loadError).toBe("");
});
test("replaced exact-version metadata and wrong-room actions never send or open", async () => {
  const f = file("f"),
    session = createFilesSession("room");
  session.sync(room([f]));
  session.sync(room([{ ...f, size: 55 }]));
  await session.toggle(f, async () => {
    throw Error("stale action sent");
  });
  expect(get(session.state).error).toBe("");
  expect(
    session.open(f, () => {
      throw Error("stale opened");
    }),
  ).toBe(false);
  const empty = createFilesSession("new");
  empty.sync(room([f]));
  await empty.toggle(f, async () => {
    throw Error("wrong room");
  });
});
