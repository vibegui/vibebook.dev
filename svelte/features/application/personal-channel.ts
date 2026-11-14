import { createPersonalConnection } from "../home/connection";
import type { PersonalSession } from "../home/personal";
import type { AgentsService } from "../agents/service";
import { authClock, type AuthClock } from "../auth/owner";

export type PersonalChannelIdentity = {
  account: string | null;
  revision: number;
};
export type PersonalChannelRoom = {
  roomId: string;
  account: string;
  /** Immutable identity of the active Book connection; no transport methods escape. */
  connection: object;
};
type ConnectionOptions = Parameters<typeof createPersonalConnection>[0];

/** One document coordinates its existing account/agent owners with the personal
 * channel. It owns no account cache, authorization policy, PWA or room transport. */
export function createApplicationPersonalChannel(options: {
  personal: Pick<
    PersonalSession,
    "observe" | "invalidate" | "refresh" | "refreshAgents"
  >;
  agents: Pick<AgentsService, "refreshAccount">;
  listenIdentity(
    callback: (identity: PersonalChannelIdentity) => void,
  ): () => void;
  currentRoom(): string | null;
  room(): PersonalChannelRoom | null;
  refreshRoom(): unknown;
  url: ConnectionOptions["url"];
  visible: ConnectionOptions["visible"];
  listenVisibility: ConnectionOptions["listenVisibility"];
  connection?: (
    options: ConnectionOptions,
  ) => ReturnType<typeof createPersonalConnection>;
  clock?: AuthClock;
}) {
  const clock = options.clock ?? authClock;
  let active = true,
    started = false,
    generation = 0,
    routeGeneration = 0;
  let identity: PersonalChannelIdentity = { account: null, revision: 0 };
  let connection: ReturnType<typeof createPersonalConnection> | null = null;
  let refreshTimer: unknown | null = null,
    refreshRevision = 0;
  let unlisten = () => {};
  function routeChanged() {
    routeGeneration++;
    refreshRevision++;
    if (refreshTimer !== null) clock.cancel(refreshTimer);
    refreshTimer = null;
  }
  function connect(next: PersonalChannelIdentity) {
    const ticket = ++generation;
    routeChanged();
    identity = { ...next };
    const captured = identity;
    const prior = connection;
    connection = null;
    prior?.dispose();
    if (!active || !started || !captured.account || ticket !== generation)
      return;
    const owns = () => active && ticket === generation && identity === captured;
    const room = () => {
      const value = options.room();
      return value?.account === captured.account ? value : null;
    };
    const sameRoom = (before: PersonalChannelRoom, route: number) => {
      if (!owns() || route !== routeGeneration) return false;
      const current = room();
      return (
        current?.roomId === before.roomId &&
        current.connection === before.connection
      );
    };
    function refresh(connected: boolean) {
      if (!owns()) return;
      options.personal.invalidate();
      if (!owns()) return;
      void options.personal.refresh();
      if (!owns()) return;
      void options.personal.refreshAgents();
      if (!owns()) return;
      if (connected) void options.agents.refreshAccount();
      if (!owns()) return;
      if (room()) options.refreshRoom();
    }
    const owner = (options.connection ?? createPersonalConnection)({
      url: options.url,
      visible: options.visible,
      listenVisibility: options.listenVisibility,
      clock,
      currentRoom: () => (owns() ? options.currentRoom() : null),
      onAccount() {
        if (owns()) options.personal.observe({ kind: "account" });
      },
      onAgents(book) {
        if (!owns()) return;
        options.personal.observe({ kind: "agents", book });
        if (!owns()) return;
        const selected = room();
        if (!selected || (book !== "*" && book !== selected.roomId)) return;
        routeChanged();
        const revision = refreshRevision,
          route = routeGeneration;
        const before = { ...selected };
        refreshTimer = clock.schedule(() => {
          if (revision !== refreshRevision || !sameRoom(before, route)) return;
          refreshTimer = null;
          options.refreshRoom();
          if (sameRoom(before, route)) void options.agents.refreshAccount();
        }, 600);
      },
      onConnected: () => refresh(true),
      onVisible: () => refresh(false),
    });
    if (!owns()) {
      owner.dispose();
      return;
    }
    connection = owner;
    owner.start();
  }
  return {
    start() {
      if (!active || started) return;
      started = true;
      const stop = options.listenIdentity((next) => {
        if (!active) return;
        if (
          identity.account !== next.account ||
          identity.revision !== next.revision
        )
          connect(next);
      });
      if (active) unlisten = stop;
      else stop();
    },
    restart() {
      if (active && started) connect(identity);
    },
    /** PersonalSession's synchronous identity-reset hook can precede queued
     * store subscribers. Revoke now; never reopen the old account while waiting. */
    resetIdentity() {
      if (active) connect({ account: null, revision: identity.revision });
    },
    routeChanged,
    dispose() {
      if (!active) return;
      active = false;
      generation++;
      routeChanged();
      unlisten();
      connection?.dispose();
      connection = null;
    },
  };
}
