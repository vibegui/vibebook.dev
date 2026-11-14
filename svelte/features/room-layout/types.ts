import type { Snippet } from "svelte";
import type { Readable } from "svelte/store";
import type { DocumentPane } from "../documents/types";

export type RoomSheet = "side" | "doc";
export type RoomLayoutState = {
  pane: DocumentPane;
  sheet: RoomSheet | null;
  boardFull: boolean;
  documentVisible: boolean;
  sidebarCollapsed: boolean;
  mobile: boolean;
  closingUnconfirmed: boolean;
  presentedSheet: RoomSheet | null;
  draggingSheet: RoomSheet | null;
  documentWidth: number;
  documentMaximum: number;
  resizing: boolean;
  active: boolean;
  animationUnavailable: boolean;
};
/** All nodes belong to one mounted RoomLayout. The chat cell is the scroller. */
export type RoomLayoutCells = {
  root: HTMLElement;
  viewport: HTMLElement;
  sidebar: HTMLElement;
  header: HTMLElement;
  peek: HTMLElement;
  attention: HTMLElement;
  chat: HTMLElement;
  composer: HTMLElement;
  documentToolbar: HTMLElement;
  document: HTMLElement;
  board: HTMLElement;
  scrim: HTMLElement;
};
export type RoomLayoutController = {
  readonly state: Readable<RoomLayoutState>;
  read(): RoomLayoutState;
  setPane(
    pane: DocumentPane,
    options?: { open?: boolean; toggle?: boolean },
  ): void;
  toggleBoard(): void;
  toggleDocument(): void;
  toggleSidebar(): void;
  openSheet(which: RoomSheet): void;
  closeSheet(pick?: boolean): void;
  /** Close without Back; true requires the caller's route write to replace. */
  takeSheetEntry(): boolean;
  beforeNavigation(): void;
  /** Sheet-only: FileViewer pop/restore MUST run first. */
  consumePop(): boolean;
  /** FileViewer pending navigation MUST be checked before this queue. */
  deferNavigation(callback: () => void): boolean;
  retryHistory(): void;
  mount(cells: RoomLayoutCells): () => void;
  bindHandle(node: HTMLElement, sheet: RoomSheet, opening: boolean): () => void;
  bindWidthInput(node: HTMLInputElement): () => void;
  setViewerGate(gate: {
    deferNavigation(callback: () => void): boolean;
  }): () => void;
  dispose(): void;
};
export type RoomLayoutProps = {
  controller: RoomLayoutController;
  sidebar: Snippet;
  header: Snippet;
  peek: Snippet;
  attention?: Snippet;
  chat: Snippet;
  composer: Snippet;
  documentToolbar: Snippet;
  document: Snippet;
  board: Snippet;
  /** Exact scroller attachment; cleanup must detach only this same node. */
  onChatSurface?: (node: HTMLElement) => void | (() => void);
  onCells?: (cells: RoomLayoutCells) => void | (() => void);
  labels: {
    documentWidth: string;
    closeDocument: string;
    closeSidebar: string;
    closeSheet: string;
    historyUnconfirmed: string;
    historyRetry: string;
    animationUnavailable: string;
  };
};
export type RoomLayoutOptions = {
  /** Fixed account/room/connection scope supplied by the data owner. */
  scopeKey: string;
  current(): boolean;
  onDocumentClosed(): void;
  onPane?(pane: DocumentPane): void;
  sidebarCollapsed?: boolean;
  browser?: RoomLayoutBrowser;
};
export type RoomLayoutBrowser = {
  href(): string;
  state(): unknown;
  history: Pick<History, "pushState" | "replaceState" | "back">;
  storage: Pick<Storage, "getItem" | "setItem"> | null;
  schedule(callback: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
  enqueue(callback: () => void): void;
};
