import { describe, expect, test } from "bun:test";
import { get } from "svelte/store";
import {
  createPeopleSession,
  type PeopleClock,
} from "../svelte/features/people/session";
import {
  canAct,
  canRemove,
  inviteMessage,
  peopleModel,
  type PeopleRoom,
} from "../svelte/features/people/model";
import { createPeopleRequest } from "../svelte/features/people/api";
const owner = "owner@test.com",
  member = "member@test.com",
  pending = "pending@test.com",
  newcomer = "new@test.com";
const room = (): PeopleRoom => ({
  id: "room",
  me: owner,
  book: { title: "<Room>", owner },
  members: [owner, member, pending],
  online: [member],
  pending: [pending],
  requests: [{ email: newcomer, name: "New", ts: 1 }],
});
function deferred() {
  let resolve!: () => void, reject!: (error: Error) => void;
  const promise = new Promise<void>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
function clock() {
  const jobs = new Set<() => void>();
  const value: PeopleClock = {
    schedule: (fn) => {
      jobs.add(fn);
      return fn;
    },
    cancel: (job) => {
      jobs.delete(job as () => void);
    },
  };
  return {
    value,
    jobs,
    fire() {
      for (const fn of [...jobs]) {
        jobs.delete(fn);
        fn();
      }
    },
  };
}
describe("native People", () => {
  test("owner/member/pending authorization mirrors existing role controls and canonical requests", () => {
    const r = room();
    expect(canRemove(r, owner)).toBe(false);
    expect(canRemove(r, member)).toBe(true);
    expect(canRemove({ ...r, me: member }, owner)).toBe(false);
    expect(canRemove({ ...r, me: member }, pending)).toBe(true);
    expect(canRemove({ ...r, me: member }, member)).toBe(false);
    expect(canAct(r, "approve", newcomer)).toBe(true);
    expect(canAct(r, "deny", member)).toBe(false);
    expect(canAct(r, "invite", member)).toBe(false);
    expect(canAct({ ...r, me: "outsider@test.com" }, "resend", pending)).toBe(
      false,
    );
    expect(peopleModel(r, [member, newcomer])).toEqual({
      online: [owner, member],
      offline: [pending],
      friends: [newcomer],
    });
  });
  test("invites wait for HTTP success and canonical rows; duplicates guarded and edited draft preserved", async () => {
    const s = createPeopleSession("room"),
      r = room(),
      reply = deferred();
    s.sync(r);
    s.edit(` ${newcomer.toUpperCase()} `);
    const calls: string[] = [];
    const request = async (action: string, email: string) => {
      calls.push(`${action}:${email}`);
      await reply.promise;
    };
    const operation = s.mutate("invite", get(s.state).draft, request);
    await s.mutate("invite", newcomer, request);
    expect(calls).toEqual([`invite:${newcomer}`]);
    expect(r.members).not.toContain(newcomer);
    s.edit("another@test.com");
    reply.resolve();
    expect(await operation).toBe(true);
    expect(get(s.state).draft).toBe("another@test.com");
    expect(get(s.state).pending[newcomer]).toBe("invite");
    s.sync({ ...r, members: [...r.members, newcomer] });
    expect(get(s.state).pending).toEqual({});
    s.dispose();
  });
  test("canonical before response is reconciled; a friend invitation never clears a different form draft", async () => {
    const s = createPeopleSession("room"),
      r = room(),
      reply = deferred();
    s.sync(r);
    s.edit("another@test.com");
    const operation = s.mutate("invite", newcomer, () => reply.promise);
    s.sync({ ...r, members: [...r.members, newcomer] });
    reply.resolve();
    await operation;
    expect(get(s.state).pending).toEqual({});
    expect(get(s.state).draft).toBe("another@test.com");
    s.dispose();
  });
  test("HTTP rejection preserves draft, explicit retry succeeds and resend requires no canonical delta", async () => {
    const s = createPeopleSession("room");
    s.sync(room());
    s.edit(newcomer);
    await s.mutate("invite", newcomer, async () => {
      throw new Error("offline");
    });
    expect(get(s.state).issues[newcomer]).toBe("offline");
    expect(get(s.state).draft).toBe(newcomer);
    expect(await s.mutate("resend", pending, async () => {})).toBe(true);
    expect(get(s.state).pending).toEqual({});
    s.dispose();
  });
  test("clipboard failure never changes backend success, and copied text never claims a failed invitation succeeded", async () => {
    const s = createPeopleSession("room");
    s.sync(room());
    await s.copy(pending, async () => {
      throw new Error("denied");
    });
    await s.mutate("resend", pending, async () => {});
    expect(get(s.state).clipboard).toEqual({
      email: pending,
      status: "failed",
    });
    expect(get(s.state).notices[pending]).toBe("resend");
    await s.copy(newcomer, async () => {});
    await s.mutate("invite", newcomer, async () => {
      throw new Error("forbidden");
    });
    expect(get(s.state).clipboard?.status).toBe("copied");
    expect(get(s.state).notices[newcomer]).toBeUndefined();
    expect(get(s.state).issues[newcomer]).toBe("forbidden");
    s.dispose();
  });
  test("both HTTP and post-success canonical waits are bounded, late replies and timer callbacks cannot steal retry", async () => {
    const time = clock(),
      s = createPeopleSession("room", time.value),
      r = room(),
      old = deferred();
    s.sync(r);
    const operation = s.mutate("invite", newcomer, () => old.promise);
    const callbacks = [...time.jobs];
    time.fire();
    expect(get(s.state).issues[newcomer]).toBe("unconfirmed");
    await s.mutate("invite", newcomer, async () => {});
    old.resolve();
    expect(await operation).toBe(false);
    for (const fn of callbacks) fn();
    expect(get(s.state).pending[newcomer]).toBe("invite");
    time.fire();
    expect(get(s.state).pending).toEqual({});
    expect(get(s.state).issues[newcomer]).toBe("unconfirmed");
    s.dispose();
  });
  test("canonical removal requires original authorization; request denial/approval reconcile against authoritative requests", async () => {
    const time = clock(),
      s = createPeopleSession("room", time.value),
      r = room();
    s.sync(r);
    await s.mutate("remove", member, async () => {});
    expect(get(s.state).pending[member]).toBe("remove");
    s.sync({ ...r, members: r.members.filter((x) => x !== member) });
    expect(get(s.state).pending).toEqual({});
    await s.mutate("approve", newcomer, async () => {});
    s.sync({ ...r, members: [...r.members, newcomer] });
    expect(get(s.state).pending[newcomer]).toBe("approve");
    s.sync({ ...r, requests: [], members: [...r.members, newcomer] });
    expect(get(s.state).pending).toEqual({});
    expect(time.jobs.size).toBe(0);
    s.dispose();
  });
  test("room switch/unmount suppress late backend and clipboard completions and release timers", async () => {
    const time = clock(),
      s = createPeopleSession("room", time.value),
      reply = deferred(),
      clipboard = deferred();
    s.sync(room());
    const action = s.mutate("resend", pending, () => reply.promise),
      copy = s.copy(pending, () => clipboard.promise);
    s.dispose();
    const before = get(s.state);
    reply.resolve();
    clipboard.resolve();
    await action;
    await copy;
    expect(get(s.state)).toEqual(before);
    expect(time.jobs.size).toBe(0);
    const fresh = createPeopleSession("other");
    fresh.sync(room());
    expect(
      await fresh.mutate("remove", member, async () => {
        throw new Error("wrong room");
      }),
    ).toBe(false);
    fresh.dispose();
  });
  test("invalid and existing-member invitations report an issue without sending", async () => {
    const s = createPeopleSession("room");
    s.sync(room());
    let sent = 0;
    const request = async () => {
      sent++;
    };
    await s.mutate("invite", "a@b", request);
    expect(get(s.state).issues["a@b"]).toBe("invalid-email");
    await s.mutate("invite", member, request);
    expect(get(s.state).issues[member]).toBe("already-member");
    expect(sent).toBe(0);
    s.dispose();
  });
  test("remote removal or access decision invalidates obsolete requests and ignores late failure", async () => {
    for (const action of ["remove", "deny", "approve"] as const) {
      const time = clock(),
        s = createPeopleSession("room", time.value),
        r = room(),
        reply = deferred(),
        email = action === "remove" ? member : newcomer;
      s.sync(r);
      const operation = s.mutate(action, email, () => reply.promise);
      s.sync({
        ...r,
        members:
          action === "remove"
            ? r.members.filter((x) => x !== member)
            : r.members,
        requests: [],
      });
      expect(get(s.state).pending).toEqual({});
      reply.reject(new Error("stale404"));
      await operation;
      expect(get(s.state).issues).toEqual({});
      expect(time.jobs.size).toBe(0);
      s.dispose();
    }
  });
  test("invitation text includes exact room, email and setup instructions as plain text", () => {
    const text = inviteMessage(
      room(),
      newcomer,
      "https://example.test",
      (s, vars) =>
        s.replace(/\{(\w+)\}/g, (_, key) => String(vars?.[key] ?? "")),
    );
    expect(text).toContain('"<Room>"');
    expect(text).toContain(newcomer);
    expect(text).toContain("https://example.test/b/room");
    expect(text).toContain(
      "Read https://example.test/llms.txt and set up vibebook",
    );
  });
  test("typed HTTP adapter scopes encoded room/email, validates success and surfaces server failures", async () => {
    const requests: { url: string; init?: RequestInit }[] = [];
    let response = new Response('{"ok":true}');
    const api = createPeopleRequest("room/a", async (input, init) => {
      requests.push({ url: String(input), init });
      return response.clone();
    });
    await api("invite", newcomer);
    await api("remove", "email+tag@test.com");
    await api("approve", newcomer);
    expect(requests[0].url).toContain("room%2Fa/members");
    expect(requests[1].url).toContain("email%2Btag%40test.com");
    expect(requests[1].init?.method).toBe("DELETE");
    expect(JSON.parse(String(requests[2].init?.body))).toEqual({
      email: newcomer,
      ok: true,
    });
    response = new Response('{"error":"forbidden"}', { status: 403 });
    await expect(api("deny", newcomer)).rejects.toThrow("forbidden");
    response = new Response('{"ok":false}');
    await expect(api("resend", pending)).rejects.toThrow(
      "Invalid people response",
    );
  });
});
