import { get, writable, type Writable } from "svelte/store";
import type { Room } from "../../../shared/room";
import { epicAncestors, epicForest, type EpicForest } from "./model";

export type NavigationState = {
  draft: string;
  closed: ReadonlySet<string>;
  openedFor: string | null;
  archived: boolean;
};
export type NavigationSession = {
  readonly roomId: string;
  readonly state: Writable<NavigationState>;
  readonly storage: NavigationStorage | null;
};
type NavigationStorage = Pick<Storage, "getItem" | "setItem">;

function browserStorage(): NavigationStorage | null {
  try {
    return localStorage;
  } catch {
    return null;
  }
}

function readClosed(
  roomId: string,
  storage: NavigationStorage | null,
): ReadonlySet<string> {
  try {
    const value: unknown = JSON.parse(
      storage?.getItem(`vb.tree.${roomId}`) ?? "[]",
    );
    if (Array.isArray(value) && value.every((id) => typeof id === "string"))
      return new Set<string>(value);
  } catch {
    // Unavailable or malformed device storage must not break room navigation.
  }
  return new Set();
}

function persistClosed(
  session: NavigationSession,
  closed: ReadonlySet<string>,
) {
  try {
    session.storage?.setItem(
      `vb.tree.${session.roomId}`,
      JSON.stringify([...closed]),
    );
  } catch {
    // The current view retains its in-memory state when storage is unavailable.
  }
}

/** The room host owns this session, so rail remounts do not discard navigation drafts. */
export function createNavigationSession(
  roomId: string,
  archived = false,
  storage: NavigationStorage | null = browserStorage(),
): NavigationSession {
  return {
    roomId,
    storage,
    state: writable<NavigationState>({
      draft: "",
      closed: readClosed(roomId, storage),
      openedFor: null,
      archived,
    }),
  };
}

export function enterNavigationThread(
  session: NavigationSession,
  /** Full room hierarchy, independent of the currently displayed tab. */
  forest: EpicForest,
  thread: string,
) {
  const state = get(session.state);
  // A filtered-out selection must still be revealed when its tab becomes visible.
  if (
    !forest.byId.has(thread) &&
    thread !== "main" &&
    !thread.startsWith("pre:")
  )
    return;
  if (state.openedFor === thread) return;
  const closed = new Set(state.closed);
  for (const id of epicAncestors(forest, thread)) closed.delete(id);
  persistClosed(session, closed);
  session.state.set({ ...state, closed, openedFor: thread });
}

export function toggleNavigationBranch(session: NavigationSession, id: string) {
  session.state.update((state) => {
    const closed = new Set(state.closed);
    if (closed.has(id)) closed.delete(id);
    else closed.add(id);
    persistClosed(session, closed);
    return { ...state, closed };
  });
}

/** Track entries even when the expanded sidebar is temporarily unmounted. */
export function syncNavigationSession(
  current: NavigationSession | null,
  room: Pick<Room, "id" | "epics">,
  thread: string,
  archived = false,
) {
  const session =
    current?.roomId === room.id
      ? current
      : createNavigationSession(room.id, archived);
  enterNavigationThread(session, epicForest(room.epics), thread);
  return session;
}
