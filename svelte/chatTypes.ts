import type { RequestRoomCommand } from "./roomConnection";
import type { Message, Attachment, Room } from "../shared/room";
import type {
  RichFileReference,
  RichNavigation,
} from "./features/rich-text/types";
export type ChatMessage = Message & { runs?: number[]; group?: ChatMessage[] };
/** Formatting data only; all message presentation is native. */
export type ChatBridge = {
  t: (text: string, vars?: Record<string, string | number>) => string;
  name: (email: string) => string;
  knownNames?: Readonly<Record<string, string>>;
  pageUrl?: string;
  locale?: string;
  avatarUrl?: (email: string) => string | undefined;
  ago: (ts: number) => string;
  hhmm: (ts: number) => string;
  dateTime?: (ts: number) => string;
  waiting: (id: number) => boolean;
  typingLabel?: (mode: string) => string;
  typingNote?: (id: number) => string | undefined;
};
export type ChatEmbedControls = {
  revoked?(): void;
  ready: () => void;
  cancel?: () => void;
  deny?: () => void;
  fail?: () => void;
  thread: string;
  ask: (what: string, detail: string) => Promise<boolean>;
  resize: (height: number) => void;
};
export type ChatActions = {
  request: RequestRoomCommand;
  draftReply: (draft: {
    messageId: number;
    thread: string;
    text: string;
  }) => void;
  openApp?: (target: { connection: string; tool: string }) => void;
  /** Temporary F49 protocol integration. Native iframe geometry/consent/lifetime are component-owned. */
  mountEmbed?: (
    frame: HTMLIFrameElement,
    file: Attachment,
    controls: ChatEmbedControls,
  ) => () => void;
  navigateRich?: (target: RichNavigation) => void;
  openFileReference?: (file: RichFileReference) => void;
  ensureFileIndex?: () => void;
  reply: (id: number) => void;
  navigate: (id: number, thread?: string) => void;
  openFile: (file: Attachment) => void;
};

/** Real Chat props are also used by source-only tooling tests, which do not compile Svelte declarations. */
export type ChatProps = {
  room: Room;
  thread: string;
  list: ChatMessage[];
  previous?: ChatMessage;
  more?: boolean | number;
  origin?: ChatMessage | null;
  replyCount?: number;
  needsYou?: {
    view: import("./features/needs-you/model").NeedsView;
    owner: import("./features/needs-you/session").NeedsYouSession;
  };
  vb: ChatBridge;
  actions: ChatActions;
  onloadolder: () => void;
};
