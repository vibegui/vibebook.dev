import type { Message, Attachment } from "../shared/room";
import type {
  RichFileReference,
  RichNavigation,
} from "./features/rich-text/types";
export type ChatMessage = Message & { runs?: number[]; group?: ChatMessage[] };
/** Formatting data only. HTML ownership is explicitly listed in LegacyChatIntegrations. */
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
/** Temporary, incomplete migrations: F20/F21 interactive bodies and F15 origin thread-card bodies.
 * These callbacks may return trusted/sanitized HTML, never an entire message/frame/footer. Remove each with its slice. */
export type LegacyChatIntegrations = {
  interactiveBody: (message: ChatMessage) => string;
  threadCards: (id: number) => string;
};
export type ChatEmbedControls = {
  thread: string;
  ask: (what: string, detail: string) => Promise<boolean>;
  resize: (height: number) => void;
};
export type ChatActions = {
  /** Temporary F49 protocol integration. Native iframe geometry/consent/lifetime are component-owned. */
  mountEmbed?: (
    frame: HTMLIFrameElement,
    file: Attachment,
    controls: ChatEmbedControls,
  ) => () => void;
  navigateRich?: (target: RichNavigation) => void;
  openFileReference?: (file: RichFileReference) => void;
  reply: (id: number) => void;
  navigate: (id: number, thread?: string) => void;
  openFile: (file: Attachment) => void;
};
