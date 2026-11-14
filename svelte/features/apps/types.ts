import type { Room } from "../../../shared/room";
import type { RequestRoomCommand } from "../../roomConnection";
import type { AppsApi } from "./api";
import type { AppsSession } from "./session";
export type AppsProps = {
  owner: AppsSession;
  api: AppsApi;
  room: Room;
  request: RequestRoomCommand;
  current(): boolean;
  checkAccess(): void;
  name(email: string): string;
  ago(ts: number): string;
  t(text: string, vars?: Record<string, string | number>): string;
  lang: string;
  thread: string;
  openLink(url: string): void;
  metric(kind: "spend" | "router", roomOnly: boolean): Promise<unknown>;
};
