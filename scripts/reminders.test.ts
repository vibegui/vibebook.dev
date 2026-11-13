import { describe, expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Reminder } from "../shared/room";
import type { CommandOutcome } from "../shared/commands";
import type { UploadFileResponse } from "../shared/rpc";
import {
  createRemindersSession,
  reminderFileName,
  type ReminderClock,
} from "../svelte/features/reminders/session";
const reminder: Reminder = {
  id: "r",
  name: "daily",
  text: "Every Monday at 9am UTC: report",
  owner: "me@test",
  enabled: true,
};
const upload: UploadFileResponse = {
  id: "file",
  name: "reminders/daily.md",
  type: "text/markdown",
  author: "me@test",
  ts: 1,
  size: 12,
};
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((yes) => {
    resolve = yes;
  });
  return { promise, resolve };
}
function clock() {
  const jobs = new Set<() => void>();
  const value: ReminderClock = {
    schedule: (fn) => {
      jobs.add(fn);
      return fn;
    },
    cancel: (job) => jobs.delete(job as () => void),
  };
  return {
    value,
    fire() {
      for (const job of [...jobs]) {
        jobs.delete(job);
        job();
      }
    },
    jobs,
  };
}

describe("native reminder session", () => {
  test("enable waits for ACK and canonical state; rejected/offline requests remain unchanged", async () => {
    const s = createRemindersSession("room");
    s.sync([reminder]);
    const answer = deferred<CommandOutcome>();
    const pending = s.mutate("r", "enable", () => answer.promise, false);
    expect(get(s.state).pending.r.enabled).toBe(false);
    answer.resolve({ ok: true });
    expect(await pending).toBe(true);
    expect(get(s.state).pending.r).toBeDefined();
    s.sync([{ ...reminder, enabled: false }]);
    expect(get(s.state).pending.r).toBeUndefined();
    expect(
      await s.mutate(
        "r",
        "enable",
        async () => ({ ok: false, error: "offline" }),
        true,
      ),
    ).toBe(false);
    expect(get(s.state).rowIssues.r.detail).toBe("offline");
    expect(get(s.state).pending.r).toBeUndefined();
    s.dispose();
  });
  test("canonical event before ACK is recognized; acknowledgement without event expires without pretending success", async () => {
    const time = clock(),
      s = createRemindersSession("room", time.value);
    s.sync([reminder]);
    const answer = deferred<CommandOutcome>(),
      pending = s.mutate("r", "enable", () => answer.promise, false);
    s.sync([{ ...reminder, enabled: false }]);
    expect(get(s.state).pending.r).toBeDefined();
    answer.resolve({ ok: true });
    await pending;
    expect(get(s.state).pending.r).toBeUndefined();
    await s.mutate("r", "delete", async () => ({ ok: true }));
    expect(time.jobs.size).toBe(1);
    time.fire();
    expect(get(s.state).rowIssues.r.kind).toBe("unconfirmed");
    s.dispose();
  });
  test("delete failure remains retryable and disposal rejects late ACK ownership", async () => {
    const s = createRemindersSession("room");
    s.sync([reminder]);
    expect(
      await s.mutate("r", "delete", async () => ({
        ok: false,
        error: "refused",
      })),
    ).toBe(false);
    expect(get(s.state).rowIssues.r.detail).toBe("refused");
    const answer = deferred<CommandOutcome>(),
      pending = s.mutate("r", "delete", () => answer.promise);
    s.dispose();
    answer.resolve({ ok: true });
    expect(await pending).toBe(false);
  });
  test("upload keeps edited text/name and server parse failures without overwriting drafts", async () => {
    const s = createRemindersSession("room");
    s.open({ name: "daily.md", text: "first" });
    const answer = deferred<UploadFileResponse>(),
      saving = s.save(() => answer.promise);
    s.edit({ text: "edited while saving" });
    answer.resolve({ ...upload, reminder: { ok: false, error: "needs time" } });
    await saving;
    expect(get(s.state).draft).toEqual({
      name: "daily",
      text: "edited while saving",
      fixed: true,
    });
    expect(get(s.state).issue?.detail).toBe("needs time");
    await s.save(async () => {
      throw new Error("upload refused");
    });
    expect(get(s.state).draft?.text).toBe("edited while saving");
    expect(get(s.state).issue?.detail).toBe("upload refused");
    s.open({ name: "daily", text: "first" });
    const success = deferred<UploadFileResponse>(),
      wait = s.save(() => success.promise);
    s.edit({ name: "another", text: "new request" });
    success.resolve(upload);
    await wait;
    expect(get(s.state).draft).toEqual({
      name: "another",
      text: "new request",
    });
    s.dispose();
  });
  test("cancel, a new form and unmount invalidate stale upload completions", async () => {
    const s = createRemindersSession("room");
    s.open({ name: "daily", text: "old" });
    const answer = deferred<UploadFileResponse>(),
      saving = s.save(() => answer.promise);
    s.cancel();
    s.open({ name: "next", text: "next" });
    answer.resolve(upload);
    await saving;
    expect(get(s.state).draft?.text).toBe("next");
    expect(get(s.state).saving).toBe(false);
    const later = deferred<UploadFileResponse>(),
      wait = s.save(() => later.promise);
    s.dispose();
    const before = get(s.state);
    later.resolve({ ...upload, reminder: { ok: false, error: "late" } });
    await wait;
    expect(get(s.state)).toBe(before);
  });
  test("normalizes supported file names", () => {
    expect(reminderFileName(" daily.md ")).toBe("daily");
    expect(reminderFileName("one/two\\three")).toBe("one-two-three");
  });
});
