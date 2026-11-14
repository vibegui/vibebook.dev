import { get, writable } from "svelte/store";
import type { PersonalSession } from "../home/personal";
import type { NewRoomSession, NewRoomBinding } from "../home/session";
import type { AccountSession, AccountBinding } from "../account/session";
import { authClock, type AuthClock } from "../auth/owner";
import {
  ONBOARDING_DONE,
  ONBOARDING_SKIP_CLAUDE,
  ONBOARDING_POLL,
  ONBOARDING_POLL_LIMIT,
  ONBOARDING_CONNECTED_DELAY,
  onboardingStep,
  onboardingEligible,
  type OnboardingStep,
} from "./model";
export type OnboardingState = {
  visible: boolean;
  step: OnboardingStep;
  name: string;
  connectedNotice: boolean;
  polls: number;
  profileBinding: AccountBinding | null;
  creatorBinding: NewRoomBinding | null;
};
/** Page-owned orchestration only: Personal owns canonical data/drafts/agent HTTP;
 * the existing profile and creator singletons remain the only mutation owners. */
export function createOnboardingSession(
  personal: PersonalSession,
  profile: AccountSession,
  creator: NewRoomSession,
  options: {
    clock?: AuthClock;
    storage?: Pick<Storage, "getItem" | "setItem"> | null;
  } = {},
) {
  const clock = options.clock ?? authClock;
  const stored = (key: string) => {
    try {
      return options.storage?.getItem(key) === "1";
    } catch {
      return false;
    }
  };
  let dismissed = stored(ONBOARDING_DONE),
    skipped = stored(ONBOARDING_SKIP_CLAUDE),
    back: OnboardingStep | null = null,
    connected = false,
    active = true,
    expired = false,
    account = "",
    revision = get(personal.state).identityRevision;
  let phase = 0,
    previousStep: OnboardingStep | null = null,
    previousVisible = false,
    profileBinding: AccountBinding | null = null,
    creatorBinding: NewRoomBinding | null = null,
    nameTarget: string | null = null,
    creating = false,
    syncing = false,
    dirty = false;
  let pollTimer: unknown | null = null,
    pollDeadline: unknown | null = null,
    advanceTimer: unknown | null = null,
    read = 0,
    polls = 0,
    emptySeen = false,
    lastAgents = get(personal.state).agents;
  const state = writable<OnboardingState>({
    visible: false,
    step: 1,
    name: "",
    connectedNotice: false,
    polls: 0,
    profileBinding: null,
    creatorBinding: null,
  });
  const current = () =>
    active &&
    !expired &&
    !!account &&
    get(personal.state).identityRevision === revision &&
    personal.peek()?.email === account;
  const cancel = (value: unknown | null) => {
    if (value !== null) clock.cancel(value);
  };
  function stopPolling() {
    read++;
    cancel(pollTimer);
    cancel(pollDeadline);
    pollTimer = pollDeadline = null;
  }
  function stopStep() {
    phase++;
    stopPolling();
    cancel(advanceTimer);
    advanceTimer = null;
  }
  function releaseProfile() {
    const old = profileBinding;
    profileBinding = null;
    if (old) profile.close(old);
  }
  function releaseCreator() {
    const old = creatorBinding;
    creatorBinding = null;
    if (old) creator.close(old);
  }
  function save(key: string) {
    try {
      options.storage?.setItem(key, "1");
    } catch {
      /* In-memory skip still works; a reload may need the step again. */
    }
  }
  function publish(value: OnboardingState) {
    const before = get(state);
    if (
      before.visible !== value.visible ||
      before.step !== value.step ||
      before.name !== value.name ||
      before.connectedNotice !== value.connectedNotice ||
      before.polls !== value.polls ||
      before.profileBinding !== value.profileBinding ||
      before.creatorBinding !== value.creatorBinding
    )
      state.set(value);
  }
  function poll() {
    if (
      !current() ||
      !get(state).visible ||
      get(state).step !== 2 ||
      advanceTimer !== null ||
      polls >= ONBOARDING_POLL_LIMIT
    )
      return;
    cancel(pollTimer);
    pollTimer = null;
    const ticket = ++read,
      stage = phase;
    polls++;
    state.update((value) => ({ ...value, polls }));
    let finished = false;
    const finish = () => {
      if (finished || !current() || ticket !== read || stage !== phase) return;
      finished = true;
      cancel(pollDeadline);
      pollDeadline = null;
      if (advanceTimer === null && polls < ONBOARDING_POLL_LIMIT)
        pollTimer = clock.schedule(() => {
          pollTimer = null;
          poll();
        }, ONBOARDING_POLL);
    };
    pollDeadline = clock.schedule(finish, 20_000);
    void Promise.resolve(personal.loadAgents()).then(finish, finish);
  }
  function sync() {
    if (!active || expired) return;
    if (syncing) {
      dirty = true;
      return;
    }
    syncing = true;
    try {
      do {
        dirty = false;
        update();
      } while (dirty && active && !expired);
    } finally {
      syncing = false;
    }
  }
  function update() {
    const data = get(personal.state),
      me = data.me;
    if (
      account &&
      (data.identityRevision !== revision || (me && me.email !== account))
    ) {
      expired = true;
      stopStep();
      releaseProfile();
      releaseCreator();
      publish({
        ...get(state),
        visible: false,
        name: "",
        connectedNotice: false,
        profileBinding: null,
        creatorBinding: null,
      });
      return;
    }
    if (!me) return;
    if (!account) {
      account = me.email;
      revision = data.identityRevision;
      state.update((value) => ({ ...value, name: me.name ?? "" }));
    }
    if (!current()) return;
    if (
      nameTarget !== null &&
      profileBinding &&
      profile.owns(profileBinding) &&
      get(profile.state).phase === "idle" &&
      me.name === nameTarget
    ) {
      nameTarget = null;
      back = null;
    }
    const visible = !dismissed && (onboardingEligible(me, false) || creating),
      step =
        nameTarget !== null ? 1 : onboardingStep(me, back, connected, skipped);
    const changed = visible !== previousVisible || step !== previousStep;
    if (changed) {
      stopStep();
      previousVisible = visible;
      previousStep = step;
      emptySeen = false;
      lastAgents = data.agents;
      polls = 0;
    }
    if (!visible) {
      creating = false;
      releaseProfile();
      releaseCreator();
      publish({
        ...get(state),
        visible: false,
        connectedNotice: false,
        polls,
        profileBinding: null,
        creatorBinding: null,
      });
      return;
    }
    if (step === 1) {
      if (!profileBinding || !profile.owns(profileBinding)) {
        profileBinding = null;
        if (!get(profile.state).open) profileBinding = profile.openInline();
      }
    } else releaseProfile();
    if (step === 3) {
      if (!creatorBinding || !creator.owns(creatorBinding)) {
        creatorBinding = null;
        if (!creating && !get(creator.state).open)
          creatorBinding = creator.openInline();
      }
    } else {
      creating = false;
      releaseCreator();
    }
    let notice = changed ? false : get(state).connectedNotice;
    if (step === 2 && data.agents !== lastAgents) {
      lastAgents = data.agents;
      if (data.agents?.agents.length) {
        stopPolling();
        notice = emptySeen;
        const stage = phase;
        if (advanceTimer === null)
          advanceTimer = clock.schedule(
            () => {
              advanceTimer = null;
              if (
                current() &&
                phase === stage &&
                get(state).visible &&
                get(state).step === 2
              ) {
                connected = true;
                back = null;
                sync();
              }
            },
            emptySeen ? ONBOARDING_CONNECTED_DELAY : 0,
          );
      } else if (data.agents) emptySeen = true;
    }
    publish({
      ...get(state),
      visible: true,
      step,
      connectedNotice: notice,
      polls,
      profileBinding,
      creatorBinding,
    });
    if (changed && step === 2) poll();
  }
  const stopPersonal = personal.state.subscribe(sync),
    stopProfile = profile.state.subscribe(sync),
    stopCreator = creator.state.subscribe((value) => {
      if (creating && !value.busy && value.error) creating = false;
      sync();
    });
  return {
    state,
    personal,
    profile,
    creator,
    current,
    actionScope() {
      const value = get(state),
        identity = get(personal.state);
      return `${value.visible ? `${identity.identityRevision}:${identity.me?.email}:${value.step}` : ""}:${value.profileBinding?.generation ?? "-"}:${value.creatorBinding?.generation ?? "-"}`;
    },
    editName(name: string) {
      if (current() && get(state).step === 1)
        state.update((value) => ({ ...value, name }));
    },
    continueName() {
      const value = get(state),
        name = value.name.trim();
      if (
        !current() ||
        !value.visible ||
        value.step !== 1 ||
        !profileBinding ||
        !profile.owns(profileBinding) ||
        ["pending", "confirming", "unconfirmed"].includes(
          get(profile.state).phase,
        ) ||
        !name ||
        name.length > 60
      )
        return;
      nameTarget = name;
      back = 1;
      profile.rename(name);
      sync();
    },
    photo(convert: (current: () => boolean) => Promise<Blob>) {
      if (
        current() &&
        get(state).visible &&
        get(state).step === 1 &&
        profileBinding &&
        profile.owns(profileBinding) &&
        !["pending", "confirming", "unconfirmed"].includes(
          get(profile.state).phase,
        )
      )
        profile.photo(convert);
    },
    reviewProfile() {
      if (current() && profileBinding && profile.owns(profileBinding)) {
        profile.review();
        profile.refresh();
        sync();
      }
    },
    back() {
      const value = get(state);
      if (!current() || !value.visible) return;
      stopStep();
      nameTarget = null;
      creating = false;
      back = value.step === 3 && !connected ? 2 : 1;
      sync();
    },
    skipClaude() {
      if (!current() || get(state).step !== 2) return;
      stopStep();
      skipped = true;
      save(ONBOARDING_SKIP_CLAUDE);
      back = null;
      sync();
    },
    skipHome() {
      if (!current()) return;
      dismissed = true;
      save(ONBOARDING_DONE);
      creating = false;
      nameTarget = null;
      stopStep();
      sync();
    },
    editRoom(text: string) {
      if (current() && creatorBinding && creator.owns(creatorBinding))
        creator.edit(text, creatorBinding);
    },
    createRoom() {
      if (
        !current() ||
        !get(state).visible ||
        get(state).step !== 3 ||
        !creatorBinding ||
        !creator.owns(creatorBinding) ||
        get(creator.state).busy
      )
        return;
      creating = true;
      const operation = creator.submit(creatorBinding);
      if (!operation) creating = false;
      sync();
      return operation;
    },
    dispose() {
      if (!active) return;
      active = false;
      stopStep();
      stopPersonal();
      stopProfile();
      stopCreator();
      releaseProfile();
      releaseCreator();
    },
  };
}
export type OnboardingSession = ReturnType<typeof createOnboardingSession>;
