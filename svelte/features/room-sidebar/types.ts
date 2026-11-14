import type { Room } from "../../../shared/room";
import type { ChatBridge } from "../../chatTypes";
import type { SidebarBridge } from "../../sidebar";
import type { RoomMutations } from "./session";
export type ThreadHeaderProps = {
  room: Room;
  thread: string;
  owner: RoomMutations;
  vb: SidebarBridge;
  onopenside: () => void;
  onrenameroom: () => void;
  titleId?: string;
  roomIcon?: string;
  roomTint?: string | null;
};
export type SuggestionPreviewProps = {
  room: Room;
  index: number;
  owner: RoomMutations;
  vb: ChatBridge;
};
