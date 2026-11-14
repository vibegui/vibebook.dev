import { get, writable } from "svelte/store";
import type {
  AccessContext,
  ConsentContext,
  LoginContext,
} from "../../../shared/schemas";
import { AuthFailure, type AuthApi } from "./api";
import { authClock, createAuthOwner, type AuthClock } from "./owner";
import { authContinuation, consentReturn } from "./navigation";
const errorText = (error: unknown) =>
  error instanceof Error ? error.message : "network";
export function createLoginSession(
  api: AuthApi,
  search: string,
  origin: string,
  navigate: (url: string) => void,
  clock: AuthClock = authClock,
) {
  const state = writable({
    context: null as LoginContext | null,
    phase: "email" as "email" | "code",
    email: "",
    code: "",
    loading: false,
    busy: false,
    error: "",
  });
  const owner = createAuthOwner(clock);
  const fail = (error: unknown) =>
    state.update((s) => ({
      ...s,
      loading: false,
      busy: false,
      error: errorText(error),
    }));
  return {
    state,
    load() {
      if (!owner.active() || get(state).loading || get(state).busy) return;
      state.update((s) => ({ ...s, loading: true, error: "" }));
      return owner.run(
        (signal) => api.login(search, signal),
        (context) =>
          state.update((s) => ({
            ...s,
            context,
            loading: false,
            error: context.error ?? "",
          })),
        fail,
      );
    },
    email(value: string) {
      if (!owner.active()) return;
      state.update((s) => ({ ...s, email: value }));
    },
    code(value: string) {
      if (!owner.active()) return;
      state.update((s) => ({
        ...s,
        code: value.replace(/\D/g, "").slice(0, 6),
      }));
    },
    back() {
      if (!owner.active()) return;
      owner.cancel();
      state.update((s) => ({
        ...s,
        phase: "email",
        code: "",
        busy: false,
        error: "",
      }));
    },
    submit() {
      if (!owner.active()) return;
      const s = get(state);
      if (!s.context || s.busy) return;
      const email = s.email.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        fail(new Error("invalid-email"));
        return;
      }
      if (s.phase === "code" && !/^\d{6}$/.test(s.code)) {
        fail(new Error("invalid-code"));
        return;
      }
      state.update((value) => ({ ...value, email, busy: true, error: "" }));
      if (s.phase === "email")
        return owner.run(
          (signal) => api.start(email, signal),
          () =>
            state.update((value) => ({
              ...value,
              phase: "code",
              code: "",
              busy: false,
            })),
          fail,
        );
      return owner.run(
        (signal) =>
          api.verify(
            email,
            s.code,
            authContinuation(s.context!.next, origin),
            signal,
          ),
        (result) => {
          navigate(authContinuation(result.next, origin));
        },
        fail,
      );
    },
    dispose() {
      owner.dispose();
    },
  };
}
export function createAccessSession(
  api: AuthApi,
  id: string,
  auto: boolean,
  navigate: (url: string) => void,
  clock: AuthClock = authClock,
  continuation?: string,
) {
  const state = writable({
    context: null as AccessContext | null,
    loading: false,
    busy: false,
    error: "",
    signedOut: false,
  });
  const owner = createAuthOwner(clock);
  let active = true,
    autoUsed = false,
    poll: unknown | null = null;
  const stopPoll = () => {
    if (poll !== null) clock.cancel(poll);
    poll = null;
  };
  const target =
    continuation && /^#f[0-9a-f]{1,64}$/.test(continuation)
      ? `/b/${encodeURIComponent(id)}?ui=svelte${continuation}`
      : `/b/${encodeURIComponent(id)}?ui=svelte`;
  const fail = (error: unknown) => {
    const signedOut = error instanceof AuthFailure && error.status === 401;
    state.update((s) => ({
      ...s,
      loading: false,
      busy: false,
      error: errorText(error),
      signedOut,
    }));
    if (!signedOut && get(state).context?.state === "asked") schedule();
  };
  const schedule = () => {
    stopPoll();
    if (active)
      poll = clock.schedule(() => {
        poll = null;
        void load();
      }, 15_000);
  };
  function ask() {
    if (
      !active ||
      get(state).loading ||
      get(state).busy ||
      get(state).context?.state !== "ask"
    )
      return;
    state.update((s) => ({ ...s, busy: true, error: "" }));
    return owner.run(
      (signal) => api.ask(id, signal),
      () => {
        navigate(target);
      },
      fail,
    );
  }
  function load() {
    if (!active || get(state).loading || get(state).busy) return;
    stopPoll();
    state.update((s) => ({ ...s, loading: true, error: "" }));
    return owner.run(
      (signal) => api.access(id, signal),
      (context) => {
        state.update((s) => ({
          ...s,
          context,
          loading: false,
          signedOut: context.state === "out",
        }));
        if (context.state === "member") navigate(target);
        else if (context.state === "asked") schedule();
        else if (context.state === "ask" && auto && !autoUsed) {
          autoUsed = true;
          void ask();
        }
      },
      fail,
    );
  }
  return {
    state,
    load,
    ask,
    dispose() {
      active = false;
      stopPoll();
      owner.dispose();
    },
  };
}
export function createConsentSession(
  api: AuthApi,
  search: string,
  clock: AuthClock = authClock,
  initialFailure = false,
) {
  const state = writable({
    context: null as ConsentContext | null,
    loading: false,
    error: initialFailure ? "consent-failed" : "",
    returnTo: null as string | null,
    signedOut: false,
  });
  const owner = createAuthOwner(clock);
  return {
    state,
    load() {
      if (!owner.active() || get(state).loading) return;
      state.update((s) => ({
        ...s,
        loading: true,
        error: "",
        returnTo: null,
        signedOut: false,
      }));
      return owner.run(
        (signal) => api.consent(search, signal),
        (context) =>
          state.update((s) => ({
            ...s,
            context,
            loading: false,
            signedOut: false,
          })),
        (error) =>
          state.update((s) => ({
            ...s,
            loading: false,
            error: errorText(error),
            signedOut: error instanceof AuthFailure && error.status === 401,
            returnTo:
              error instanceof AuthFailure
                ? consentReturn(error.returnTo)
                : null,
          })),
      );
    },
    dispose() {
      owner.dispose();
    },
  };
}
