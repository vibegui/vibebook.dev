import type { Message, Attachment } from "../shared/room";

// Consecutive reminder/issue messages add view-only folding metadata.
export type ChatMessage = Message & {
  runs?: number[];
  group?: ChatMessage[];
};

// Markup helpers are the host's existing trusted/sanitized renderers. User text
// always passes through esc/linkify or the sanitized markdown renderer.
export type ChatBridge = {
  t: (text: string, vars?: Record<string, string | number>) => string;
  icon: (name: string, size?: number) => string;
  name: (email: string) => string;
  avatar: (email: string) => string;
  agentAvatar: (email: string, via?: string | null) => string;
  ago: (ts: number) => string;
  hhmm: (ts: number) => string;
  dateTime?: (ts: number) => string;
  continues: (previous: ChatMessage | undefined, current: ChatMessage) => boolean;
  waiting: (id: number) => boolean;
  typingLabel?: (mode: string) => string;
  typingNote?: (id: number) => string | undefined;
  remHtml: (message: ChatMessage, origin?: boolean) => string;
  issueHtml: (message: ChatMessage) => string;
  isNotice: (message: ChatMessage) => boolean;
  noticeHtml: (message: ChatMessage) => string;
  mentions: (html: string) => string;
  md: (text: string) => string;
  linkify: (html: string) => string;
  esc: (text: string) => string;
  quoteHtml: (id: number) => string;
  attHtml: (files?: Attachment[]) => string;
  cardHtml: (message: ChatMessage) => string;
  choiceHtml: (message: ChatMessage) => string;
  pollHtml: (id: string) => string;
  threadCards: (id: number) => string;
};
