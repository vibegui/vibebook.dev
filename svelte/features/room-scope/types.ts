import type { ComponentProps } from "svelte";
import type { Readable } from "svelte/store";
import type { BrowserApplicationServices } from "../application/browser";
import type { ApplicationRoomScope } from "../application/types";
import type { RoomResources } from "../application/roomResources";
import type { RoomLayoutController } from "../room-layout/types";
import type { ChatProps } from "../../chatTypes";
import type { ComposerProps } from "../composer/types";
import type { SidebarProps } from "../../sidebar";
import type {
  ThreadHeaderProps,
  SuggestionPreviewProps,
} from "../room-sidebar/types";
import type { PanelProps } from "../../panels";
import type { DocumentProps } from "../documents/types";
import type { DocumentSession } from "../documents/session";
import type { FilesProps } from "../files/types";
import type { AppsProps } from "../apps/types";
import type { FileViewer } from "../file-viewer/session";
import type DocumentToolbar from "../documents/DocumentToolbar.svelte";
import type FileViewerComponent from "../file-viewer/FileViewer.svelte";
import type ThreadFiles from "../file-viewer/ThreadFiles.svelte";
import type AgentsPane from "../agents/AgentsPane.svelte";
import type AgentBanners from "../agents/AgentBanners.svelte";
import type AgentTrigger from "../agents/AgentTrigger.svelte";
import type { FetchLike } from "../../transport";

/** Component props refer to the actual native feature contract, never copied
 * backend DTOs. Every room property aliases the RootRoomSession canonical frame. */
export type RoomScopePresentation = {
  scope: ApplicationRoomScope;
  sidebar: SidebarProps;
  header: ThreadHeaderProps;
  chat: ChatProps | null;
  composer: ComposerProps | null;
  suggestion: SuggestionPreviewProps | null;
  document: { owner: DocumentSession; props: DocumentProps };
  toolbar: ComponentProps<typeof DocumentToolbar>;
  peek: ComponentProps<typeof DocumentToolbar>;
  board: PanelProps;
  files: FilesProps;
  decisions: PanelProps;
  reminders: PanelProps;
  apps: AppsProps;
  agents: ComponentProps<typeof AgentsPane> | null;
  banners: ComponentProps<typeof AgentBanners> | null;
  trigger: ComponentProps<typeof AgentTrigger> | null;
  threadFiles: ComponentProps<typeof ThreadFiles>;
  viewer: ComponentProps<typeof FileViewerComponent>;
  chatRevision: number;
  notice: string;
};
export type RoomScopeBrowser = {
  origin: string;
  href(): string;
  historyState(): unknown;
  history: Pick<History, "pushState" | "replaceState" | "back">;
  storage: Pick<Storage, "getItem" | "setItem"> | null;
  fetcher: FetchLike;
  iosStandalone: boolean;
  visible(): boolean;
  listenVisibility(callback: () => void): () => void;
  openExternal(url: string): void;
  awarenessColor(account: string): string;
  clock?: {
    schedule(
      callback: () => void,
      ms: number,
    ): number | ReturnType<typeof setTimeout>;
    cancel(handle: unknown): void;
  };
  enqueue(callback: () => void): void;
};
export type RoomScopeOptions = {
  services: BrowserApplicationServices;
  resources: RoomResources;
  layout: RoomLayoutController;
  browser: RoomScopeBrowser;
};
export type RoomScope = {
  readonly state: Readable<RoomScopePresentation | null>;
  readonly viewer: FileViewer;
  current(): boolean;
  attachChat(element: HTMLElement): () => void;
  attachFiles(element: HTMLElement): () => void;
  attachAttention(element: HTMLElement): () => void;
  chatRendered(revision: number): void;
  actions: {
    setPane: RoomLayoutController["setPane"];
    setThread(thread: string): void;
    openFile(
      id: string | import("../../../shared/room").Attachment,
      trigger?: HTMLElement,
      label?: string,
    ): boolean;
    navigateMessage(id: number, thread?: string): void;
    loadOlder(): void;
    retry(): void;
    closeNavigation(): void;
    closeDocument(): void;
  };
  dispose(): void;
};
