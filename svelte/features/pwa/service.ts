import { get, writable } from "svelte/store";
import type { Message, Room } from "../../../shared/room";
import { createPushApi, withPushEndpointLock } from "../notifications/api";
import { createPushReconciler } from "../notifications/reconcile";
import { notificationPolicy } from "../notifications/policy";
import { createChime } from "../notifications/audio";
import {
  installEvent,
  installOutcome,
  platform,
  store,
  stored,
  type InstallEvent,
} from "./platform";
import {
  existingPushRegistration,
  pushRegistration,
  keyBytes,
} from "./registration";
export function createPwaService() {
  const state = writable({
    ...platform(),
    permission:
      "Notification" in window
        ? Notification.permission
        : ("unsupported" as NotificationPermission | "unsupported"),
    muted: stored("vb.mute"),
    dismissed: stored("vb.pwaOff"),
    canInstall: false,
    steps: false,
    installBusy: false,
    error: "",
    sent: null as number | null,
    testing: false,
  });
  const api = createPushApi();
  const endpointApi = withPushEndpointLock(api);
  const push = createPushReconciler(endpointApi, {
    matchesKey: (sub, key) => {
      const bytes = sub.options?.applicationServerKey;
      if (!bytes) return true;
      const actual = new Uint8Array(bytes),
        desired = keyBytes(key);
      return (
        actual.length === desired.length &&
        actual.every((byte, index) => byte === desired[index])
      );
    },
    get: async () =>
      (await existingPushRegistration())?.pushManager.getSubscription() ?? null,
    subscribe: async (key) =>
      (await pushRegistration()).pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: keyBytes(key),
      }),
  });
  const sound = createChime();
  let accountRevision = 0;
  let active = true,
    account: string | null = null,
    leaving = false,
    installed = false,
    install: InstallEvent | null = null;
  const observed = new Set<string>();
  const supported = () =>
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    !get(state).iosWeb;
  const refresh = () => {
    if (active)
      state.update((value) => ({
        ...value,
        ...platform(),
        standalone: installed || platform().standalone,
        permission:
          "Notification" in window ? Notification.permission : "unsupported",
      }));
  };
  const sync = () => {
    refresh();
    if (!active || !account || leaving || !supported())
      return Promise.resolve();
    const value = get(state);
    return push.set(account, value.permission === "granted" && !value.muted);
  };
  const storage = (event: StorageEvent) => {
    if (event.key !== "vb.mute" && event.key !== "vb.pwaOff") return;
    state.update((value) => ({
      ...value,
      muted: stored("vb.mute"),
      dismissed: stored("vb.pwaOff"),
    }));
    void sync();
  };
  const visible = () => {
    if (!document.hidden) void sync();
  };
  const beforeInstall = (event: Event) => {
    if (!active || get(state).ios || !installEvent(event)) return;
    event.preventDefault();
    install = event;
    state.update((value) => ({ ...value, canInstall: true }));
  };
  const appInstalled = () => {
    installed = true;
    install = null;
    refresh();
    state.update((value) => ({ ...value, canInstall: false }));
  };
  const display = matchMedia("(display-mode: standalone)"),
    coarse = matchMedia("(pointer: coarse)");
  window.addEventListener("beforeinstallprompt", beforeInstall);
  window.addEventListener("appinstalled", appInstalled);
  window.addEventListener("storage", storage);
  document.addEventListener("visibilitychange", visible);
  display.addEventListener("change", refresh);
  coarse.addEventListener("change", refresh);
  const updateWorker = () => {
    void existingPushRegistration()
      .then((reg) => reg?.update())
      .catch(() => {
        if (active)
          state.update((value) => ({ ...value, error: "worker-update" }));
      });
  };
  import.meta.hot?.on("vb:pwa-worker", updateWorker);
  return {
    state,
    push: push.state,
    account(email: string) {
      if (!active || leaving || account === email) return;
      account = email;
      accountRevision++;
      observed.clear();
      state.update((value) => ({ ...value, sent: null, testing: false }));
      void sync();
    },
    refresh: sync,
    retry() {
      void sync();
    },
    mute(muted: boolean) {
      if (!active || leaving) return;
      const persisted = store("vb.mute", muted);
      state.update((value) => ({
        ...value,
        muted,
        error: persisted ? "" : "storage",
      }));
      if (!muted) {
        sound.unlock();
        sound.play();
      }
      void sync();
    },
    async bell() {
      if (!active || leaving) return false;
      sound.unlock();
      refresh();
      const value = get(state),
        epoch = accountRevision;
      if (
        value.iosWeb ||
        value.permission === "denied" ||
        value.permission === "unsupported"
      )
        return false;
      if (value.permission === "default") {
        try {
          const permission = await Notification.requestPermission();
          if (!active || leaving || epoch !== accountRevision) return false;
          refresh();
          if (permission === "granted") {
            this.mute(false);
            return true;
          }
        } catch {
          if (active && !leaving && epoch === accountRevision)
            state.update((current) => ({ ...current, error: "permission" }));
        }
        return false;
      }
      this.mute(!value.muted);
      return true;
    },
    dismissInstall() {
      if (!active || leaving) return;
      store("vb.pwaOff", true);
      state.update((value) => ({ ...value, dismissed: true }));
    },
    async install() {
      if (!active || leaving || get(state).installBusy) return;
      const event = install;
      if (!event) {
        state.update((value) => ({ ...value, steps: !value.steps }));
        return;
      }
      install = null;
      state.update((value) => ({
        ...value,
        installBusy: true,
        error: "",
        canInstall: false,
      }));
      try {
        await event.prompt();
        const outcome = installOutcome(await event.userChoice);
        if (active && outcome === "accepted") {
          installed = true;
          refresh();
        }
      } catch {
        if (active) state.update((value) => ({ ...value, error: "install" }));
      } finally {
        if (active) state.update((value) => ({ ...value, installBusy: false }));
      }
    },
    async test() {
      if (!active || leaving || get(state).testing) return;
      const epoch = accountRevision;
      state.update((value) => ({
        ...value,
        testing: true,
        error: "",
        sent: null,
      }));
      try {
        const result = await api.test();
        if (active && epoch === accountRevision)
          state.update((value) => ({ ...value, sent: result.sent }));
      } catch {
        if (active && epoch === accountRevision)
          state.update((value) => ({ ...value, error: "test" }));
      } finally {
        if (active && epoch === accountRevision)
          state.update((value) => ({ ...value, testing: false }));
      }
    },
    notify(
      message: Message,
      room: Room,
      thread: string,
      target: (handle: string) => string | null | undefined,
      label: (message: Message) => string,
    ) {
      if (
        !active ||
        leaving ||
        account !== room.me ||
        observed.has(`${room.id}:${message.id}`)
      )
        return;
      observed.add(`${room.id}:${message.id}`);
      if (observed.size > 500) observed.delete(observed.values().next().value!);
      const policy = notificationPolicy(
        message,
        room,
        thread,
        document.hidden,
        get(state).muted,
        target,
      );
      if (policy.chime) sound.play();
      if (policy.browser && get(state).permission === "granted") {
        try {
          const notification = new Notification(
            `${policy.mentioned ? "@ · " : ""}${label(message)} · ${room.book.title}`,
            {
              body: (message.text || "📎").slice(0, 180),
              tag: `vb-${room.id}`,
              icon: "/apple-touch-icon.png",
            },
          );
          notification.onclick = () => {
            if (active) window.focus();
            notification.close();
          };
        } catch {
          // Mobile browsers require the shared worker's notification API.
          const epoch = accountRevision;
          void pushRegistration()
            .then(async (reg) => {
              if (!active || leaving || epoch !== accountRevision) return;
              await reg.showNotification(
                `${policy.mentioned ? "@ · " : ""}${label(message)} · ${room.book.title}`,
                {
                  body: (message.text || "📎").slice(0, 180),
                  tag: `vb-${room.id}`,
                  icon: "/apple-touch-icon.png",
                  data: {
                    url: `/b/${room.id}${message.thread && message.thread !== "main" ? `?t=${encodeURIComponent(message.thread)}` : ""}#m${message.id}`,
                  },
                },
              );
            })
            .catch(() => {
              if (active && !leaving && epoch === accountRevision)
                state.update((value) => ({ ...value, error: "foreground" }));
            });
        }
      }
    },
    async beforeLogout() {
      leaving = true;
      accountRevision++;
      if (!("serviceWorker" in navigator) || !("PushManager" in window))
        return { local: true, settled: true, confirmed: true };
      return await push.beforeLogout();
    },
    dispose() {
      active = false;
      push.dispose();
      sound.dispose();
      window.removeEventListener("beforeinstallprompt", beforeInstall);
      window.removeEventListener("appinstalled", appInstalled);
      window.removeEventListener("storage", storage);
      document.removeEventListener("visibilitychange", visible);
      display.removeEventListener("change", refresh);
      coarse.removeEventListener("change", refresh);
      import.meta.hot?.off("vb:pwa-worker", updateWorker);
    },
  };
}
export type PwaService = ReturnType<typeof createPwaService>;
