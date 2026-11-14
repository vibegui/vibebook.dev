// Ownership/protocol fixtures. No provider, Worker, browser speech or Claude connection is represented.
import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { createAccountSession } from "../svelte/features/account/session";
import {
  AccountFailure,
  type AccountApi,
} from "../svelte/features/account/api";
import { createPersonalSession } from "../svelte/features/home/personal";
import { createNewRoomSession } from "../svelte/features/home/session";
import { createOnboardingSession } from "../svelte/features/onboarding/session";
import {
  ONBOARDING_DONE,
  ONBOARDING_SKIP_CLAUDE,
  onboardingEligible,
  onboardingStep,
} from "../svelte/features/onboarding/model";
import {
  deferred,
  homeApi,
  manualClock,
  me,
  settle,
} from "./native-home-fixtures";
import type { HomeApi } from "../svelte/features/home/api";
import type { RoomTarget } from "../svelte/features/home/model";

async function fixture(
  options: {
    name?: string;
    api?: Partial<HomeApi>;
    profile?: Partial<AccountApi>;
    flags?: string[];
  } = {},
) {
  const timer = manualClock(),
    flags = new Map((options.flags ?? []).map((key) => [key, "1"]));
  let canonical = me({ name: options.name ?? "", books: [] });
  const personal = createPersonalSession(
    homeApi({ me: async () => canonical, ...options.api }),
    { clock: timer.clock },
  );
  await personal.refresh();
  const profile = createAccountSession(
      personal,
      {
        logins: async () => ({
          logins: [],
          providers: { google: false, github: false },
        }),
        name: async (name) => ({ ok: true, name }),
        avatar: async () => ({ ok: true, avatar: 1 }),
        addFriend: async () => ({ ok: true }),
        removeFriend: async () => ({ ok: true }),
        ...options.profile,
      },
      timer.clock,
    ),
    navigation: RoomTarget[] = [],
    creator = createNewRoomSession(
      personal,
      (target) => navigation.push(target),
      timer.clock,
    );
  const owner = createOnboardingSession(personal, profile, creator, {
    clock: timer.clock,
    storage: {
      getItem: (key) => flags.get(key) ?? null,
      setItem: (key, value) => {
        flags.set(key, value);
      },
    },
  });
  return {
    timer,
    personal,
    profile,
    creator,
    owner,
    navigation,
    flags,
    canonical: (value: typeof canonical) => {
      canonical = value;
    },
    dispose() {
      owner.dispose();
      creator.dispose();
      profile.dispose();
      personal.dispose();
    },
  };
}
test("only zero-room accounts enter; canonical name, skip and manual back recover upstream steps", () => {
  expect(onboardingEligible(null, false)).toBe(false);
  expect(onboardingEligible(me(), false)).toBe(false);
  expect(onboardingEligible(me({ books: [] }), true)).toBe(false);
  expect(onboardingEligible(me({ books: [] }), false)).toBe(true);
  expect(onboardingStep({ name: "" }, null, false, false)).toBe(1);
  expect(onboardingStep({ name: "Ada" }, null, false, false)).toBe(2);
  expect(onboardingStep({ name: "Ada" }, null, false, true)).toBe(3);
  expect(onboardingStep({ name: "Ada" }, 1, true, false)).toBe(1);
});
test("name HTTP success cannot advance until canonical profile confirms", async () => {
  const h = await fixture();
  h.owner.editName("Ada");
  h.owner.continueName();
  await settle();
  expect(get(h.owner.state).step).toBe(1);
  expect(get(h.profile.state).phase).toBe("confirming");
  h.canonical(me({ name: "Ada", books: [] }));
  await h.personal.refresh();
  await settle();
  expect(get(h.owner.state).step).toBe(2);
  expect(get(h.profile.state).binding).toBe(null);
  h.dispose();
});
test("known Claude auto-advances immediately; newly connected Claude has a bounded success stage", async () => {
  const known = await fixture({
    name: "Ada",
    api: {
      agents: async () => ({
        agents: [
          { id: "grant-1", client: "Claude", connected_at: 1, used_at: null },
        ],
        last_used: null,
      }),
    },
  });
  await settle();
  known.timer.advance(0);
  expect(get(known.owner.state).step).toBe(3);
  known.dispose();
  let connected = false;
  const h = await fixture({
    name: "Ada",
    api: {
      agents: async () => ({
        agents: connected
          ? [
              {
                id: "grant-1",
                client: "Claude",
                connected_at: 1,
                used_at: null,
              },
            ]
          : [],
        last_used: null,
      }),
    },
  });
  await settle();
  connected = true;
  h.timer.advance(4000);
  await settle();
  expect(get(h.owner.state).connectedNotice).toBe(true);
  h.timer.advance(1499);
  expect(get(h.owner.state).step).toBe(2);
  h.timer.advance(1);
  expect(get(h.owner.state).step).toBe(3);
  h.dispose();
});
test("skip cancels polling and preserves browser reload flags without cancelling another profile owner", async () => {
  const late = deferred<Awaited<ReturnType<HomeApi["agents"]>>>();
  const h = await fixture({ name: "Ada", api: { agents: () => late.promise } });
  h.owner.skipClaude();
  expect(h.flags.get(ONBOARDING_SKIP_CLAUDE)).toBe("1");
  expect(get(h.owner.state).step).toBe(3);
  h.profile.open("profile");
  const modal = get(h.profile.state).binding;
  h.owner.skipHome();
  expect(h.flags.get(ONBOARDING_DONE)).toBe("1");
  expect(get(h.owner.state).visible).toBe(false);
  expect(get(h.profile.state).binding === modal).toBe(true);
  late.resolve({ agents: [], last_used: null });
  await settle();
  h.timer.advance(30_000);
  expect(get(h.owner.state).visible).toBe(false);
  h.dispose();
});
test("first room uses shared draft and authoritative returned ID; disposal fences late navigation", async () => {
  const late = deferred<Awaited<ReturnType<HomeApi["startRoom"]>>>();
  const h = await fixture({
    name: "Ada",
    flags: [ONBOARDING_SKIP_CLAUDE],
    api: { startRoom: () => late.promise },
  });
  h.owner.editRoom("Build a garden");
  const operation = h.owner.createRoom();
  expect(get(h.creator.state).busy).toBe(true);
  h.owner.skipHome();
  late.resolve({ id: "cccccc", unknown: [], invited: [], cost: 0 });
  await operation;
  expect(h.navigation).toEqual([]);
  expect(get(h.personal.draft).create).toBe("Build a garden");
  h.dispose();
});
test("identity replacement hides steps, clears presentation and ignores old Claude completion", async () => {
  const late = deferred<Awaited<ReturnType<HomeApi["agents"]>>>();
  const h = await fixture({ name: "Ada", api: { agents: () => late.promise } });
  h.canonical(me({ email: "other@test", name: "Other", books: [] }));
  await h.personal.refresh();
  late.resolve({ agents: [], last_used: null });
  await settle();
  h.timer.advance(30_000);
  expect(get(h.owner.state).visible).toBe(false);
  expect(h.owner.current()).toBe(false);
  expect(get(h.profile.state).binding).toBe(null);
  h.dispose();
});
test("optional photo uses the same canonical profile owner; definite name rejection permits correction", async () => {
  let attempts = 0,
    photos = 0;
  const h = await fixture({
    profile: {
      name: async (name) => {
        if (++attempts === 1) throw new AccountFailure("invalid-name", 400);
        return { ok: true, name };
      },
      avatar: async () => {
        photos++;
        return { ok: true, avatar: 1 };
      },
    },
  });
  h.owner.photo(async (current) => {
    expect(current()).toBe(true);
    return new Blob(["jpeg"], { type: "image/jpeg" });
  });
  await settle();
  expect(photos).toBe(1);
  expect(get(h.owner.state).step).toBe(1);
  h.canonical(me({ name: "", avatar: 1, books: [] }));
  await h.personal.refresh();
  await settle();
  h.owner.editName("Ada");
  h.owner.continueName();
  await settle();
  expect(get(h.profile.state).phase).toBe("error");
  h.owner.editName("Grace");
  h.owner.continueName();
  await settle();
  h.canonical(me({ name: "Grace", avatar: 1, books: [] }));
  await h.personal.refresh();
  await settle();
  expect(attempts).toBe(2);
  expect(get(h.owner.state).step).toBe(2);
  h.dispose();
});
test("connect polling is bounded and never restarts from passive canonical renders", async () => {
  let reads = 0;
  const h = await fixture({
    name: "Ada",
    api: {
      agents: async () => {
        reads++;
        return { agents: [], last_used: null };
      },
    },
  });
  await settle();
  for (let i = 0; i < 160; i++) {
    h.timer.advance(4000);
    await settle();
  }
  expect(reads).toBe(150);
  expect(get(h.owner.state).polls).toBe(150);
  await h.personal.refresh();
  h.timer.advance(60_000);
  await settle();
  expect(reads).toBe(150);
  expect(get(h.owner.state).step).toBe(2);
  h.dispose();
});
test("a disposed inline owner cannot close replacement profile or room dialogs", async () => {
  const h = await fixture();
  const oldProfile = get(h.owner.state).profileBinding!;
  h.profile.open("profile");
  const newProfile = get(h.profile.state).binding;
  h.profile.close(oldProfile);
  expect(get(h.profile.state).binding === newProfile).toBe(true);
  h.owner.dispose();
  expect(get(h.profile.state).binding === newProfile).toBe(true);
  h.dispose();
  const room = await fixture({ name: "Ada", flags: [ONBOARDING_SKIP_CLAUDE] });
  const oldCreator = get(room.owner.state).creatorBinding!;
  room.creator.open();
  const replacement = get(room.creator.state).binding;
  room.creator.close(oldCreator);
  expect(get(room.creator.state).binding === replacement).toBe(true);
  room.owner.dispose();
  expect(get(room.creator.state).binding === replacement).toBe(true);
  room.dispose();
});
