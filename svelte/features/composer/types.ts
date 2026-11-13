import type { Room } from "../../../shared/room";
import type { UploadFileResult, AgentsResult } from "../../../shared/schemas";
import type { ChatBridge } from "../../chatTypes";
import type { RequestRoomCommand } from "../../roomConnection";
import type { SpeechFactory } from "./speech";
import type { ComposerDrafts } from "./drafts";
export type ComposerUpload = (
  input: { name: string; type: string; body: File },
  signal: AbortSignal,
) => Promise<UploadFileResult>;
export type ComposerAgent = Pick<
  AgentsResult["sandboxes"][number],
  "name" | "email"
>;
export type ComposerProps = {
  room: Room;
  thread: string;
  vb: ChatBridge;
  drafts: ComposerDrafts;
  request: RequestRoomCommand;
  upload: ComposerUpload;
  navigate: (id: number) => void;
  agents?: readonly ComposerAgent[];
  hidden?: boolean;
  speechFactory?: SpeechFactory | null;
};
export type ComposerScope = Readonly<{
  account: string;
  roomId: string;
  thread: string;
}>;
