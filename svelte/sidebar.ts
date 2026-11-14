import type { AppNavigationSession } from "./features/app-navigation/controller";
import type { HomeLanguage } from "./features/home/copy";
import type { Room, Epic, Attachment } from "../shared/room";
import type { RequestRoomCommand } from "./roomConnection";
import type { SendRoomCommand } from "../shared/commands";
import type { NavigationSession } from "./features/navigation/session";
import type { PinsSession } from "./features/pins/session";
import type { PinAppTarget } from "./features/pins/model";

/** Formatting and canonical status data only; native sidebar never accepts HTML. */
export type SidebarBridge = {
  t: (text: string, vars?: Record<string, string | number>) => string;
  ago: (ts: number) => string;
  name: (email: string) => string;
  avatarUrl?: (email: string) => string | undefined;
  epicBusy: (epic: Epic) => string | null;
  waitsIn: (
    thread: string,
  ) => readonly import("./features/waits/model").WaitReference[];
};

export type SidebarProps = {
  appNavigation?: { controller: AppNavigationSession; lang: HomeLanguage };
  room: Room;
  thread: string;
  collapsed?: boolean;
  roomIcon?: string;
  roomTint?: string | null;
  locale?: string;
  mutations?: import("./features/room-sidebar/session").RoomMutations;
  presence?: import("./features/room-sidebar/model").Presence;
  ontogglerail?: () => void;
  onrenameroom?: () => void;
  onopenside?: () => void;
  onagents?: () => void;
  /** Pending F50 shell geometry adapter, disposed with its native handle. */
  mountSheetHandle?: (node: HTMLElement) => () => void;
  foldOpen?: { off: boolean; friends: boolean | null };
  friends?: string[];
  vb: SidebarBridge;
  send: SendRoomCommand;
  request: RequestRoomCommand;
  onopen: (id: string) => void;
  onarchchange: (archived: boolean) => void;
  navigation: NavigationSession;
  pins: PinsSession;
  onopenpinfile: (file: Attachment) => void;
  onopenpinapp: (app: PinAppTarget) => void;
};
