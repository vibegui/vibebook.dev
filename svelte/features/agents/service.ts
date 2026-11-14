import type { Room } from "../../../shared/room";
import type { RequestRoomCommand } from "../../roomConnection";
import type { Wait } from "../home/model";
import type { AgentsResult } from "../../../shared/schemas";
import type { FetchLike } from "../../transport";
import { createAgentsApi, type AgentsApi } from "./api";
import { createAgentAccountSession } from "./account";
import { createRoomAgentSession, type RoomAgentSession } from "./room";
import { createSandboxCredentials } from "../sandboxes/credentials";
import { agentClock, type AgentClock } from "./lease";
/** One authenticated document owns these actors. Identity reset is synchronous and must precede room/account replacement. */
export function createAgentsService(options: {
  origin: string;
  api?: AgentsApi;
  clock?: AgentClock;
  storage?: Pick<Storage, "getItem" | "setItem"> | null;
  runnerFetch?: FetchLike;
  onData?: (roomId: string, data: AgentsResult | null) => void;
  onChanged?: () => void;
  onUnauthorized?: () => void;
}) {
  const api = options.api ?? createAgentsApi(),
    clock = options.clock ?? agentClock;
  let account = "",
    active = true,
    sessionDenied = false,
    attached: RoomAgentSession | null = null;
  const rooms = new Map<string, RoomAgentSession>();
  let attachment: object | null = null;
  const refreshTimers = new Map<string, unknown>();
  let personal: ReturnType<typeof createAgentAccountSession> | null = null,
    credentials: ReturnType<typeof createSandboxCredentials> | null = null;
  function reset() {
    for (const timer of refreshTimers.values()) clock.cancel(timer);
    refreshTimers.clear();
    for (const room of rooms.values()) room.dispose();
    rooms.clear();
    attached = null;
    attachment = null;
    personal?.dispose();
    credentials?.dispose();
    personal = credentials = null;
    account = "";
    sessionDenied = false;
  }
  function invalidate(roomId?: string) {
    if (!active || !account) return;
    const id = roomId ?? attached?.roomId;
    if (id && rooms.has(id)) {
      const previous = refreshTimers.get(id);
      if (previous !== undefined) clock.cancel(previous);
      refreshTimers.set(
        id,
        clock.schedule(() => {
          refreshTimers.delete(id);
          const room = rooms.get(id);
          if (active && room?.current()) void room.refresh(true);
        }, 600),
      );
    }
    options.onChanged?.();
  }
  function deny() {
    sessionDenied = true;
    personal?.deny();
    credentials?.deny();
    for (const room of rooms.values()) room.deny(true);
    options.onChanged?.();
    options.onUnauthorized?.();
  }
  function roomActor(id: string) {
    if (!personal || !credentials) throw Error("Agent account unavailable");
    return createRoomAgentSession(account, id, api, personal, credentials, {
      origin: options.origin,
      clock,
      storage: options.storage,
      runnerFetch: options.runnerFetch,
      allowMutation: () => rooms.size <= 32,
      onUnauthorized: deny,
      onData: (data) => {
        if (active && attached?.roomId === id) options.onData?.(id, data);
      },
      onChanged: () => options.onChanged?.(),
    });
  }
  function identity(email: string) {
    if (!active || account === email) return;
    reset();
    account = email;
    personal = createAgentAccountSession(email, {
      api,
      clock,
      onUnauthorized: deny,
      onIdentityProved: () => {
        sessionDenied = false;
      },
      onChanged: () => invalidate(),
    });
    credentials = createSandboxCredentials(email, api, {
      clock,
      onUnauthorized: deny,
      onChanged: () => {
        if (active && attached?.current()) {
          void attached.sandboxes.refresh(true);
          invalidate();
        }
      },
    });
  }
  function detach() {
    if (!active) return;
    attachment = null;
    attached?.detach();
    attached = null;
    for (const [id, owner] of rooms)
      if (!owner.hasPending()) {
        owner.dispose();
        rooms.delete(id);
      }
  }
  return {
    identity,
    invalidate,
    refreshAccount() {
      return active && personal ? personal.refresh(true) : Promise.resolve();
    },
    account(email: string) {
      identity(email);
      return personal;
    },
    sync(
      room: Room,
      thread: string,
      waits: readonly Wait[],
      pane: boolean,
      visible: boolean,
      request: RequestRoomCommand,
    ): RoomAgentSession | null {
      if (!active || !room.me) return null;
      identity(room.me);
      let owner = rooms.get(room.id);
      if (attached && attached !== owner) attached.detach();
      for (const [id, candidate] of rooms)
        if (candidate !== owner && !candidate.hasPending()) {
          candidate.dispose();
          rooms.delete(id);
        }
      if (!owner) {
        if (!personal || !credentials) return null;
        owner = roomActor(room.id);
        if (sessionDenied) owner.deny(true);
        rooms.set(room.id, owner);
      }
      attached = owner;
      owner.setRequest(request);
      owner.sync(room, thread, waits, pane, visible);
      return owner;
    },
    /** Room UI replacement can reuse the same actor; cleanup owns a lease,
     * rather than merely comparing the reused actor object. */
    claimAttachment() {
      const token = {};
      attachment = token;
      return () => {
        if (attachment === token) detach();
      };
    },
    detach,
    reset,
    dispose() {
      reset();
      active = false;
    },
  };
}
export type AgentsService = ReturnType<typeof createAgentsService>;
