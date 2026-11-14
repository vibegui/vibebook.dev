import type { Room } from "../../../shared/room";
import type { SendRoomCommand } from "../../../shared/commands";
import type { PanelProps } from "../../panels";
import type { RichActions } from "../rich-text/types";
import type { DocumentTarget } from "./model";
export type DocumentPane =
  | "doc"
  | "board"
  | "files"
  | "apps"
  | "decisions"
  | "reminders"
  | "agents"
  | "view";
export type Editor = {
  destroy(): void;
  pause(): void;
  resume(): void;
  focus(): void;
  replace(text: string): void;
  text(): string;
  scroll(): number;
  setScroll(value: number): void;
  selection(): { anchor: number; head: number };
  setSelection(value: { anchor: number; head: number }): void;
};
export type EditorOptions = {
  target: DocumentTarget;
  name: string;
  color: string;
  label: string;
  onText(text: string, local: boolean): void;
  onStatus(status: "connected" | "connecting" | "disconnected"): void;
  onSync(synced: boolean): void;
  onDenied(): void;
};
export type EditorModule = {
  mountEditor(element: HTMLElement, options: EditorOptions): Editor;
};
export type DocumentProps = {
  room: Room;
  thread: string;
  send: SendRoomCommand;
  taskProps: PanelProps;
  actions: RichActions;
  lang: string;
  pane: DocumentPane;
  onPane(pane: DocumentPane): void;
  onAuthorize(): void;
  onMode?(mode: "preview" | "edit"): void;
};
