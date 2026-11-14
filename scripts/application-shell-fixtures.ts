import { get } from "svelte/store";
import { createApplicationServices } from "../svelte/features/application/services";
import { createApplicationCopy } from "../svelte/features/application/copy";
import { createDeviceLock } from "../svelte/features/account/device";
import { createPwaService } from "../svelte/features/pwa/service";
import type { BrowserApplicationServices } from "../svelte/features/application/browser";
import type {
  ApplicationShellEffects,
  ApplicationTheme,
} from "../svelte/features/application/shellTypes";
import type { AgentsApi } from "../svelte/features/agents/api";
import type { HomeApi } from "../svelte/features/home/api";
import type { RoomConnectionOptions } from "../svelte/roomConnection";
import type { RoomCommand } from "../shared/commands";
import { homeApi, me, manualClock } from "./native-home-fixtures";
export function shellFixture(overrides: Partial<HomeApi> = {}) {
  const timer = manualClock();
  let href = "https://vibebook.test/app?ui=svelte",
    canonical = me(),
    theme: ApplicationTheme = "auto";
  let themeListener = () => {},
    navListener: Parameters<
      ApplicationShellEffects["listenNavigation"]
    >[0] = () => {};
  const stopped: string[] = [],
    documents: string[] = [],
    names: string[] = [],
    languages: string[] = [],
    connectionCallbacks: RoomConnectionOptions[] = [],
    roomCommands: RoomCommand[] = [];
  const device = createDeviceLock({
    storage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    credentials: null,
    random: (size) => new Uint8Array(size),
    clock: timer.clock,
  });
  const agentsApi: AgentsApi = {
    identity: async () => canonical.email,
    grants: async () => ({ agents: [], last_used: null }),
    revoke: async () => ({ ok: true, removed: 0 }),
    room: async () => ({ claude_on: false, agents: [], sandboxes: [] }),
    toggle: async (_id, on) => ({ ok: true, claude_on: on }),
    sandboxes: async () => ({ connected: true, claude: true, sandboxes: [] }),
    create: async () => ({
      ok: true,
      id: "fixture",
      vm_id: "vm",
      name: "fixture",
    }),
    power: async () => ({ ok: true }),
    setup: async () => ({ ok: true, log: "" }),
    remove: async () => ({ ok: true }),
    terminal: async () => ({
      url: "wss://api.freestyle.sh/v5/vms/vm/pty",
      token: "controlled-fixture",
    }),
    connected: async () => ({ connected: true }),
    saveKey: async () => ({ ok: true }),
    removeKey: async () => ({ ok: true }),
    saveToken: async () => ({ ok: true }),
    removeToken: async () => ({ ok: true }),
  };
  const core = createApplicationServices({
    browser: {
      origin: "https://vibebook.test",
      href: () => href,
      history: {
        pushState(_state, _title, url) {
          href = new URL(String(url), href).href;
        },
        replaceState(_state, _title, url) {
          href = new URL(String(url), href).href;
        },
      },
      socketUrl: (path) => `wss://vibebook.test${path}`,
      visible: () => true,
      listenVisibility: () => () => stopped.push("visibility"),
      listenPop: () => () => stopped.push("pop"),
      enqueue: queueMicrotask,
      navigateDocument: (value) => documents.push(value),
      reload: () => documents.push("reload"),
      logoutPost: async () => ({ ok: true }),
      logoutWarning: () => {},
      logoutFailure: () => {},
      shellVersion: "development",
      clock: { ...timer.clock, now: () => 1 },
    },
    homeApi: homeApi({ me: async () => canonical, ...overrides }),
    agentsApi,
    device,
    pwa: createPwaService,
    accountApi: {
      logins: async () => ({
        logins: [],
        providers: { google: false, github: false },
      }),
      name: async (name) => {
        names.push(name);
        return { ok: true, name };
      },
      avatar: async () => ({ ok: true, avatar: 1 }),
      addFriend: async () => ({ ok: true }),
      removeFriend: async () => ({ ok: true }),
    },
    runnerFetch: async () =>
      new Response("null", { headers: { "content-type": "application/json" } }),
    personalConnection: () => ({ start() {}, restart() {}, dispose() {} }),
    roomConnection(options) {
      connectionCallbacks.push(options);
      return {
        start() {},
        dispose() {},
        resync() {},
        send(command) {
          roomCommands.push(command);
          return true;
        },
        request: async (command) => {
          roomCommands.push(command);
          return { ok: true };
        },
      };
    },
  });
  const services: BrowserApplicationServices = {
    ...core,
    device,
    language: "en",
    locale: "en-US",
    t: createApplicationCopy("en"),
  };
  const effects: ApplicationShellEffects = {
    origin: "https://vibebook.test",
    theme: () => theme,
    setTheme(value) {
      theme = value;
      themeListener();
    },
    setLanguage: (value) => languages.push(value),
    documentLanguage: (value) => languages.push(`document:${value}`),
    listenTheme(callback) {
      themeListener = callback;
      return () => stopped.push("theme");
    },
    listenNavigation(callback) {
      navListener = callback;
      return () => stopped.push("navigation");
    },
  };
  return {
    services,
    effects,
    timer,
    stopped,
    documents,
    names,
    languages,
    connectionCallbacks,
    roomCommands,
    canonical(value: typeof canonical) {
      canonical = value;
    },
    href: () => href,
    theme: () => theme,
    navigate(event: MouseEvent, anchor: HTMLAnchorElement) {
      navListener(event, anchor);
    },
    identity: () => get(core.personal.state).identityRevision,
  };
}
