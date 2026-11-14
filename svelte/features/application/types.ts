import type { RoomTarget } from "../home/model";
import type { ApplicationRoute } from "../app-navigation/router";
import type { RootConnection, RootRoomTransition, RootRoomSnapshot } from "../root-room/session";
import type { DocumentPane } from "../documents/types";
import type { AgentClock } from "../agents/lease";

export type ApplicationRoomScope = {
  roomId: string;
  account: string;
  identityRevision: number;
  roomGeneration: number;
  navigationGeneration: number;
  connection: RootConnection;
};
export type ApplicationRoomIntent = { scope: ApplicationRoomScope; target: RoomTarget; pane?: DocumentPane };
/** A single live RoomShell, not a component/mount registry. Cleanup may only
 * detach the exact adapter installed by this scope. */
export type ApplicationRoomAdapter = {
  beforeNavigation(): void;
  reset(reason: "identity" | "navigation" | "terminal" | "dispose"): void;
  consumePop(): boolean;
  deferNavigation(callback: () => void): boolean;
  onTarget(intent: ApplicationRoomIntent): void;
  onTransition(transition: RootRoomTransition): void;
  onTerminal(snapshot: RootRoomSnapshot): void;
};
export type ApplicationState = {
  route: ApplicationRoute;
  href: string;
  navigationGeneration: number;
  pane: DocumentPane;
  availableVersion: string | null;
  sessionDenied: boolean;
  lifecycle: "idle" | "started" | "disposed";
};
export type ApplicationBrowser = {
  origin: string;
  href(): string;
  history: Pick<History, "pushState" | "replaceState">;
  socketUrl(path: string): string;
  visible(): boolean;
  listenVisibility(callback: () => void): () => void;
  listenPop(callback: () => void): () => void;
  enqueue(callback: () => void): void;
  navigateDocument(href: string): void;
  reload(): void;
  logoutPost(all: boolean): Promise<{ ok: boolean }>;
  logoutWarning(): void;
  logoutFailure(): void;
  shellVersion: string | null;
  storage?: Pick<Storage, "getItem" | "setItem"> | null;
  clock?: AgentClock;
};
