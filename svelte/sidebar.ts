import type { Room, Epic } from "../shared/room";
import type { SendRoomCommand } from "../shared/commands";
import type { NavigationSession } from "./features/navigation/session";

/** Temporary formatting bridge for sidebar sections that still await native migration. */
export type SidebarBridge = {
  t: (text: string, vars?: Record<string, string | number>) => string;
  icon: (name: string, size?: number) => string;
  avatar: (email: string, online?: boolean) => string;
  ago: (ts: number) => string;
  name: (email: string) => string;
  bookTitle: () => string;
  roomMark: (classes: string) => string;
  roomStrip: () => string;
  pinsSec: () => string;
  sbxRows: () => string;
  agentRows: (email: string) => string;
  epicBusy: (epic: Epic) => string | null;
  waitPill: (thread: string) => string;
  waitsIn: (thread: string) => unknown[];
};

export type SidebarProps = {
  room: Room;
  thread: string;
  foldOpen?: { off: boolean; friends: boolean | null };
  friends?: string[];
  vb: SidebarBridge;
  send: SendRoomCommand;
  onopen: (id: string) => void;
  onarchchange: (archived: boolean) => void;
  navigation: NavigationSession;
};
