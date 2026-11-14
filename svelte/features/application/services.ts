import { get, readonly, writable } from "svelte/store";
import { createHomeApi, type HomeApi } from "../home/api";
import { createPersonalSession } from "../home/personal";
import { createRoomsSession } from "../rooms/session";
import { createAccountApi, type AccountApi } from "../account/api";
import { createAccountSession } from "../account/session";
import { createAccountLogout, personalLogoutIdentity } from "../account/logout";
import type { DeviceLock } from "../account/device";
import { createAgentsService } from "../agents/service";
import type { AgentsApi } from "../agents/api";
import type { PwaService } from "../pwa/service";
import { createAppNavigationSession } from "../app-navigation/controller";
import { applicationRoute, createApplicationRouter, roomIdFromPath } from "../app-navigation/router";
import { createRootRoomSession, type RootRoomSnapshot } from "../root-room/session";
import { createAppsAuthority } from "../apps/authority";
import { createApplicationPersonalChannel } from "./personal-channel";
import type { createPersonalConnection } from "../home/connection";
import type { RoomTarget } from "../home/model";
import type { HomeSettings } from "../home/types";
import type { DocumentPane } from "../documents/types";
import type { ApplicationBrowser, ApplicationState, ApplicationRoomScope, ApplicationRoomAdapter, ApplicationRoomIntent } from "./types";
import { uiNavigationUrl } from "../../../shared/uiVariant";
import type { FetchLike } from "../../transport";

export type ApplicationPwa = Pick<PwaService, "account" | "beforeLogout" | "dispose">;
export function createApplicationServices<Pwa extends ApplicationPwa>(options: {
  browser: ApplicationBrowser;
  pwa(): Pwa;
  homeApi?: HomeApi;
  accountApi?: AccountApi;
  agentsApi?: AgentsApi;
  runnerFetch?: FetchLike;
  device?: Pick<DeviceLock, "cancel" | "dispose" | "visibility">;
  roomConnection?: Parameters<typeof createRootRoomSession>[0]["connection"];
  personalConnection?: (options: Parameters<typeof createPersonalConnection>[0]) => ReturnType<typeof createPersonalConnection>;
  /** Account-owned document drafts outside these services reset here, once. */
  onIdentityReset?: () => void;
}) {
  const browser = options.browser;
  const state = writable<ApplicationState>({ route: applicationRoute(browser.href()), href: browser.href(), navigationGeneration: 0, pane: "doc", availableVersion: null, sessionDenied: false, lifecycle: "idle" });
  let active = true, started = false, epoch = 0, resettingIdentity = false, sessionDenied = false, pwaDisposed = false;
  let queuedNavigation: { value: string | RoomTarget; replace: boolean } | null = null;
  let lease: { scope: ApplicationRoomScope; adapter: ApplicationRoomAdapter } | null = null;
  let pending: { target: RoomTarget; navigation: number; roomGeneration: number | null; account: string | null; pane?: DocumentPane } | null = null;
  let authority: { scope: ApplicationRoomScope; owner: ReturnType<typeof createAppsAuthority> } | null = null;
  const pwa = options.pwa();
  let identityRevision = 0;
  const personal = createPersonalSession(options.homeApi ?? createHomeApi(), {
    clock: browser.clock,
    onVersion(version) {
      if (!active) return;
      const mine = browser.shellVersion;
      const changed = !!version && !!mine && mine !== "development" && version !== "development" && mine !== version;
      personal.updateAvailable(changed);
      if (!active) return;
      state.update(value => ({ ...value, availableVersion: changed ? version : null }));
    },
    onUnauthorized: denySession,
    onIdentityChange: resetIdentity,
  });
  const rooms = createRoomsSession(personal, browser.clock);
  const account = createAccountSession(personal, options.accountApi ?? createAccountApi(), browser.clock);
  const agents = createAgentsService({ origin: browser.origin, api: options.agentsApi, clock: browser.clock, storage: browser.storage, runnerFetch: options.runnerFetch,
    onUnauthorized: denySession,
  });
  const root = createRootRoomSession({
    url: (id, thread, code) => browser.socketUrl(`/ws/${id}?t=${encodeURIComponent(thread)}${code ? `&rc=${encodeURIComponent(code)}` : ""}`),
    connection: options.roomConnection,
    acceptIdentity: value => personal.acceptIdentity(value),
    // This executes before RootRoomSession cache insertion AND state publication.
    cacheAllowed: room => !sessionDenied && !(authority && authority.scope.roomId === room.id && authority.scope.account === room.me && authority.scope.connection === root.read().connection && authority.owner.denied()),
    onOpen(snapshot) {
      if (pending?.target.roomId === snapshot.roomId) {
        pending.roomGeneration = snapshot.generation;
        pending.account = snapshot.room?.me ?? null;
      }
      flushTarget();
    },
    onTransition(transition) {
      const snapshot = transition.snapshot, room = snapshot.room;
      if (!room || !ownsSnapshot(snapshot)) return;
      pwa.account(room.me);
      if (!ownsSnapshot(snapshot)) return;
      if (transition.event.t === "state" || transition.event.t === "meta") personal.roomMeta(room.id, { title: room.book.title, folder: room.book.folder, summary: room.book.summary });
      if (!ownsSnapshot(snapshot)) return;
      if (transition.event.t === "state" && room.messages.length) personal.seen(room.id, room.messages.at(-1)!.id);
      if (transition.event.t === "msg") personal.seen(room.id, transition.event.m.id);
      if (!ownsSnapshot(snapshot)) return;
      const current = currentLease();
      current?.adapter.onTransition(transition);
      if (root.read() !== snapshot || !active) return;
      flushTarget();
    },
    onTerminal(snapshot) {
      pending = null;
      const prior = detach();
      clearAuthority();
      agents.detach();
      prior?.adapter.reset("terminal");
      if (active && root.read() === snapshot) prior?.adapter.onTerminal(snapshot);
    },
  });
  const navigation = createAppNavigationSession(personal, rooms, {
    navigate: value => navigate(value), home: () => navigate("/app"), archived: () => navigate("/archived"),
    settings: (section) => openAccount(section),
    rename: (id, title) => root.read().room?.id === id && currentRoomId() === id ? root.request({ t: "title", title }) : Promise.resolve({ ok: false, error: "offline" }),
  }, browser.clock);
  const router = createApplicationRouter({
    current: browser.href, history: browser.history, document: browser.navigateDocument,
    beforeChange() {
      epoch++;
      channel.routeChanged();
      currentLease()?.adapter.beforeNavigation();
      account.close(); options.device?.cancel(); navigation.pageLeft();
    },
    consumePop: () => currentLease()?.adapter.consumePop() ?? false,
    deferNavigation: callback => currentLease()?.adapter.deferNavigation(callback) ?? false,
    sameRoom(target) {
      const snapshot = root.read();
      if (snapshot.roomId !== target.roomId || !snapshot.room || !snapshot.connection) return false;
      publishRoute();
      queueTarget(target, snapshot.generation, snapshot.room.me);
      return true;
    },
    activate: activateRoute,
  });
  const channel = createApplicationPersonalChannel({
    personal, agents, clock: browser.clock, connection: options.personalConnection,
    listenIdentity: callback => personal.state.subscribe(value => callback({ account: value.me?.email ?? null, revision: value.identityRevision })),
    currentRoom: currentRoomId,
    room: () => { const scope = roomScope(); return scope ? { roomId: scope.roomId, account: scope.account, connection: scope.connection } : null; },
    refreshRoom: refreshRoomAgents,
    url: () => browser.socketUrl("/ws-me"), visible: browser.visible, listenVisibility: browser.listenVisibility,
  });
  const logout = createAccountLogout({
    identity: () => personalLogoutIdentity(personal), beforeLogout: () => pwa.beforeLogout(),
    warning: browser.logoutWarning, post: browser.logoutPost, failure: browser.logoutFailure, reload: browser.reload,
    success: all => browser.navigateDocument(all ? uiNavigationUrl("/login", browser.href(), "svelte") : "/"),
  });
  const stopPersonal = personal.state.subscribe(value => {
    if (!active) return;
    if (value.identityRevision !== identityRevision) resetIdentity();
    if (value.me) pwa.account(value.me.email);
  });
  let stopPop = () => {}, stopVisibility = () => {};
  function currentRoomId() { return roomIdFromPath(new URL(browser.href()).pathname); }
  function ownsSnapshot(snapshot: RootRoomSnapshot) {
    const current = root.read();
    return active && !sessionDenied && current.generation === snapshot.generation && current.connection === snapshot.connection && current.room?.id === snapshot.room?.id && current.room?.me === snapshot.room?.me;
  }
  function roomScope(): ApplicationRoomScope | null {
    const value = root.read(), room = value.room;
    return active && !sessionDenied && room && value.connection && room.id === currentRoomId() && room.members.includes(room.me)
      ? { roomId: room.id, account: room.me, identityRevision: get(personal.state).identityRevision, roomGeneration: value.generation, navigationGeneration: router.generation(), connection: value.connection } : null;
  }
  function owns(scope: ApplicationRoomScope) {
    const current = roomScope();
    return !!current && current.roomId === scope.roomId && current.account === scope.account && current.identityRevision === scope.identityRevision && current.roomGeneration === scope.roomGeneration && current.connection === scope.connection;
  }
  function currentLease() { return lease && owns(lease.scope) ? lease : null; }
  function detach() { const prior = lease; lease = null; return prior; }
  function clearAuthority() { const prior = authority; authority = null; prior?.owner.dispose(); }
  function queueTarget(target: RoomTarget, roomGeneration: number | null, account: string | null, pane?: DocumentPane) {
    pending = { target: { ...target }, navigation: router.generation(), roomGeneration, account, pane };
    flushTarget();
  }
  function flushTarget() {
    const value = pending, scope = roomScope(), current = currentLease();
    if (!value || !scope || !current || value.navigation !== router.generation() || value.target.roomId !== scope.roomId || value.roomGeneration !== scope.roomGeneration || value.account !== null && value.account !== scope.account) return;
    pending = null; // A reentrant onTarget cannot replay this intent.
    const requested = value.target.thread || "main", room = root.read().room!;
    const thread = requested === "main" || requested.startsWith("pre:") || room.epics.some(epic => epic.id === requested) ? requested : "main";
    root.selectThread(thread);
    if (!owns(scope) || currentLease() !== current || scope.navigationGeneration !== router.generation()) return;
    current.adapter.onTarget({ scope, target: { ...value.target, thread }, ...(value.pane ? { pane: value.pane } : {}) });
  }
  function publishRoute() {
    const href = browser.href();
    navigation.syncPath(href);
    state.update(value => ({ ...value, href, route: applicationRoute(href), navigationGeneration: router.generation() }));
  }
  function activateRoute(route = applicationRoute(browser.href())) {
    if (!active || sessionDenied) return;
    const intent = ++epoch;
    channel.routeChanged(); pending = null;
    const prior = detach(); clearAuthority(); agents.detach();
    prior?.adapter.reset("navigation");
    if (!active || epoch !== intent) return;
    root.leave();
    if (!active || epoch !== intent) return;
    state.update(value => ({ ...value, pane: "doc" }));
    publishRoute();
    if (!active || epoch !== intent) return;
    if (route.kind === "document") { browser.navigateDocument(route.url); return; }
    if (route.kind === "room") {
      pending = { target: { ...route.target }, navigation: router.generation(), roomGeneration: null, account: null };
      void personal.refresh();
      root.open(route.target.roomId, route.target.thread || "main");
    }
  }
  function navigate(value: string | RoomTarget, replace = false) {
    if (!active || !started || sessionDenied) return;
    if (resettingIdentity) { queuedNavigation = { value, replace }; return; }
    router.go(value, replace);
  }
  function resetIdentity() {
    const revision = get(personal.state).identityRevision;
    if (!active || revision === identityRevision) return;
    identityRevision = revision; resettingIdentity = true;
    const intent = ++epoch;
    pending = null; channel.resetIdentity();
    const prior = detach(); clearAuthority();
    root.resetAccount(); rooms.reset(); agents.reset(); navigation.pageLeft(); account.close(); options.device?.cancel();
    options.onIdentityReset?.();
    prior?.adapter.reset("identity");
    resettingIdentity = false;
    const queued = queuedNavigation; queuedNavigation = null;
    if (queued) navigate(queued.value, queued.replace);
    else if (started && !sessionDenied) browser.enqueue(() => { if (active && epoch === intent) activateRoute(); });
  }
  function openAccount(section: HomeSettings = "all", trigger?: HTMLElement) {
    if (!active || !started || resettingIdentity || sessionDenied) return;
    account.close(); options.device?.cancel();
    account.open(section, trigger);
  }
  function syncAgents() {
    const snapshot = root.read();
    if (!roomScope() || !snapshot.room) return null;
    const scope = roomScope()!;
    return agents.sync(snapshot.room, snapshot.thread, personal.peek()?.waits ?? [], get(state).pane === "agents", browser.visible(), command => owns(scope) ? root.request(command) : Promise.resolve({ ok: false, error: "disconnected" }));
  }
  function refreshRoomAgents() { return syncAgents()?.refresh(true); }
  function disposePwa() { if (!pwaDisposed) { pwaDisposed = true; pwa.dispose(); } }
  /** Called only for an already-classified global unauthenticated response;
   * membership/report/MCP sign-in errors must not invoke this document boundary. */
  function denySession() {
    if (!active || sessionDenied) return;
    sessionDenied = true;
    // Clear canonical private data and synchronously run the ordinary identity
    // reset before redirecting. These document owners cannot recover from old
    // Room/member projections or controls that remain connected until a flush.
    personal.revoke();
    root.dispose(); channel.dispose(); agents.dispose(); account.dispose(); rooms.dispose(); navigation.dispose(); options.device?.cancel();
    disposePwa();
    state.update(value => ({ ...value, sessionDenied: true }));
    if (active) browser.navigateDocument(uiNavigationUrl(`/login?next=${encodeURIComponent(new URL(browser.href()).pathname + new URL(browser.href()).search + new URL(browser.href()).hash)}`, browser.href(), "svelte"));
  }
  return {
    active: () => active && started && !sessionDenied,
    state: readonly(state), personal, rooms, navigation, account, pwa, agents, personalChannel: channel,
    rootRoom: { state: readonly(root.state), read: root.read, cache: root.cache, send: root.send, request: root.request, resync: root.resync },
    router: { go: navigate, pop: () => { if (active && !sessionDenied) router.pop(); }, generation: router.generation },
    roomScope, ownsRoom: owns, syncAgents, refreshRoomAgents,
    appsAuthority() {
      const scope = roomScope();
      if (!scope) return null;
      if (authority && !owns(authority.scope)) clearAuthority();
      if (!authority) {
        const owner = createAppsAuthority(() => owns(scope));
        authority = { scope, owner };
        owner.listen(() => { if (root.read().connection === scope.connection) root.cache.delete(scope.roomId); });
      }
      return authority.owner;
    },
    attachRoom(scope: ApplicationRoomScope, adapter: ApplicationRoomAdapter) {
      if (!owns(scope)) return () => {};
      const prior = detach(), current = { scope, adapter };
      lease = current;
      if (prior && prior.adapter !== adapter) prior.adapter.reset("navigation");
      if (lease === current && owns(scope)) flushTarget();
      return () => { if (lease === current) lease = null; };
    },
    actions: {
      navigate, home: () => navigate("/app"), archived: () => navigate("/archived"), openAccount, logout, sessionLost: denySession,
      selectThread(thread: string) { const snapshot = root.read(); if (snapshot.roomId) navigate({ roomId: snapshot.roomId, thread }); },
      selectPane(pane: DocumentPane) {
        const scope = roomScope(); if (!scope) return;
        state.update(value => ({ ...value, pane }));
        queueTarget({ roomId: scope.roomId, thread: root.read().thread }, scope.roomGeneration, scope.account, pane);
        syncAgents();
      },
      retryRoom() { if (active && currentRoomId()) { root.cache.delete(currentRoomId()!); activateRoute(); } },
      reload: browser.reload,
    },
    start() {
      if (!active || started) return;
      started = true;
      stopPop = browser.listenPop(() => { if (active && !sessionDenied) router.pop(); });
      stopVisibility = browser.listenVisibility(() => { if (!active) return; options.device?.visibility(!browser.visible()); if (browser.visible()) syncAgents(); });
      state.update(value => ({ ...value, lifecycle: "started" }));
      channel.start(); personal.start(); activateRoute();
    },
    dispose() {
      if (!active) return;
      active = false; epoch++; pending = null;
      const prior = detach(); clearAuthority();
      stopPop(); stopVisibility(); stopPersonal(); channel.dispose(); logout.dispose(); router.dispose();
      root.dispose(); navigation.dispose(); account.dispose(); agents.dispose(); rooms.dispose(); personal.dispose(); options.device?.dispose(); disposePwa();
      prior?.adapter.reset("dispose");
      state.update(value => ({ ...value, lifecycle: "disposed" }));
    },
  };
}
export type ApplicationServices<Pwa extends ApplicationPwa = PwaService> = ReturnType<typeof createApplicationServices<Pwa>>;
