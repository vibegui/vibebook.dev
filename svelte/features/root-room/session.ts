import { get, writable } from "svelte/store";
import type { Room, RoomEvent } from "../../../shared/room";
import type { RoomCommand, CommandOutcome } from "../../../shared/commands";
import {
  createRoomConnection,
  type RoomConnectionOptions,
} from "../../roomConnection";
import { reduceRoom } from "../../roomStore";

export type RootConnection = ReturnType<typeof createRoomConnection>;
export type RootRoomSnapshot = {
  roomId: string | null;
  room: Room | null;
  thread: string;
  phase: "idle" | "loading" | "cached" | "live" | "removed" | "unavailable";
  generation: number;
  snapshotGeneration: number;
  connection: RootConnection | null;
  typingNotes: ReadonlyMap<number, string>;
};
export type RootRoomTransition = {
  event: RoomEvent;
  previous: Room | null;
  snapshot: RootRoomSnapshot;
};
export function createRootRoomSession(options: {
  url(roomId: string, thread: string, lastCloseCode: string): string;
  /** Temporary host thread adapter; callers can instead use selectThread. */
  thread?: () => string;
  acceptIdentity(account: string): boolean;
  cacheAllowed?: (room: Room) => boolean;
  onOpen(snapshot: RootRoomSnapshot): void;
  onTransition(transition: RootRoomTransition): void;
  onTerminal(snapshot: RootRoomSnapshot): void;
  connection?: (options: RoomConnectionOptions) => RootConnection;
}) {
  const blank = (generation: number): RootRoomSnapshot => ({
    roomId: null,
    room: null,
    thread: "main",
    phase: "idle",
    generation,
    snapshotGeneration: 0,
    connection: null,
    typingNotes: new Map(),
  });
  const state = writable<RootRoomSnapshot>(blank(0));
  const cache = new Map<string, Room>();
  let active = true,
    generation = 0,
    account: string | null = null;
  const read = () => get(state);
  const owns = (ticket: number, connection: RootConnection) =>
    active && ticket === generation && read().connection === connection;
  function leave() {
    const connection = read().connection;
    generation++;
    state.set(blank(generation));
    connection?.dispose();
  }
  function terminal(
    ticket: number,
    connection: RootConnection,
    phase: "removed" | "unavailable",
  ) {
    if (!owns(ticket, connection)) return;
    const current = read();
    if (current.roomId) cache.delete(current.roomId);
    // Revoke public state before notifying consumers or disposing pending requests.
    generation++;
    const next = { ...blank(generation), roomId: current.roomId, phase };
    state.set(next);
    connection.dispose();
    if (active && generation === next.generation && read() === next)
      options.onTerminal(next);
  }
  function receive(
    event: RoomEvent,
    roomId: string,
    ticket: number,
    connection: RootConnection,
  ) {
    if (!owns(ticket, connection)) return;
    const before = read(),
      previous = before.room;
    if (event.t === "epicsPatch" && previous) {
      const known = new Set([
        ...previous.epics.map((epic) => epic.id),
        ...event.changed.map((epic) => epic.id),
      ]);
      if (event.order.some((id) => !known.has(id))) {
        connection.resync();
        return;
      }
    }
    if (event.t === "state") {
      // Identity replacement can synchronously reset/dispose this session.
      if (options.acceptIdentity(event.me) || !owns(ticket, connection)) return;
      if (account !== null && account !== event.me) {
        cache.clear();
      }
      account = event.me;
    }
    const room = reduceRoom(previous, event, roomId);
    if (!room) {
      if (event.t === "error")
        options.onTransition({ event, previous, snapshot: before });
      return;
    }
    // Membership is authority, not a presentation update. Do not publish a
    // nonmember snapshot or wait for a subsequent socket close to revoke it.
    if (
      (event.t === "state" || event.t === "members") &&
      !room.members.includes(room.me)
    ) {
      terminal(ticket, connection, "removed");
      return;
    }
    const notes = new Map(before.typingNotes);
    if (event.t === "state") notes.clear();
    else if (event.t === "delta") notes.delete(event.id);
    else if (event.t === "typing") {
      if (event.note) notes.set(event.id, event.note);
      else notes.delete(event.id);
    }
    const next: RootRoomSnapshot = {
      ...before,
      room,
      thread: options.thread?.() ?? before.thread,
      phase: event.t === "state" ? "live" : before.phase,
      snapshotGeneration:
        before.snapshotGeneration + (event.t === "state" ? 1 : 0),
      typingNotes: notes,
    };
    if (event.t === "state") cache.delete(roomId);
    if (
      room.members.includes(room.me) &&
      (options.cacheAllowed?.(room) ?? true)
    )
      cache.set(roomId, room);
    else cache.delete(roomId);
    while (cache.size > 12) {
      const oldest = cache.keys().next();
      if (oldest.done) break;
      cache.delete(oldest.value);
    }
    state.set(next);
    if (owns(ticket, connection))
      options.onTransition({ event, previous, snapshot: next });
  }
  return {
    state,
    read,
    /** Eviction-only compatibility surface for existing Viewer/Apps access adapters. */
    cache: {
      delete: (id: string) => cache.delete(id),
      clear: () => cache.clear(),
    },
    open(roomId: string, selected = "main") {
      if (!active) return;
      const intent = generation + 1;
      leave();
      if (!active || generation !== intent) return;
      const ticket = generation;
      const cached = cache.get(roomId);
      const room =
        cached &&
        cached.members.includes(cached.me) &&
        (account === null || cached.me === account)
          ? cached
          : null;
      const thread =
        room &&
        selected !== "main" &&
        !selected.startsWith("pre:") &&
        !room.epics.some((epic) => epic.id === selected)
          ? "main"
          : selected;
      const connection = (options.connection ?? createRoomConnection)({
        url: (code) => {
          const current = options.thread?.() ?? read().thread;
          return options.url(
            roomId,
            current.startsWith("pre:") ? "main" : current,
            code,
          );
        },
        onEvent: (event) => receive(event, roomId, ticket, connection),
        onRemoved: () => terminal(ticket, connection, "removed"),
        onUnavailable: () => terminal(ticket, connection, "unavailable"),
      });
      const next: RootRoomSnapshot = {
        ...blank(ticket),
        roomId,
        room,
        thread,
        phase: room ? "cached" : "loading",
        connection,
      };
      state.set(next);
      if (owns(ticket, connection)) options.onOpen(next);
      if (owns(ticket, connection)) connection.start();
    },
    selectThread(thread: string) {
      if (active) state.update((current) => ({ ...current, thread }));
    },
    send(command: RoomCommand): boolean {
      return active ? (read().connection?.send(command) ?? false) : false;
    },
    request(command: RoomCommand, timeout?: number): Promise<CommandOutcome> {
      const connection = read().connection,
        ticket = generation;
      if (!active || !connection)
        return Promise.resolve({ ok: false, error: "offline" });
      return connection
        .request(command, timeout)
        .then((outcome) =>
          owns(ticket, connection)
            ? outcome
            : { ok: false, error: "disconnected" },
        );
    },
    resync() {
      if (active) read().connection?.resync();
    },
    leave,
    resetAccount() {
      cache.clear();
      account = null;
      leave();
    },
    dispose() {
      if (!active) return;
      active = false;
      leave();
      cache.clear();
      account = null;
    },
  };
}
export type RootRoomSession = ReturnType<typeof createRootRoomSession>;
