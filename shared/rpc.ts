import type {
  PostMessageBody,
  PostMessageResult,
  SaveReminderResult as SaveReminder,
  UploadFileResult,
} from "./schemas";

/** Browser-facing room HTTP operations. The wire types are derived from the runtime schemas in schemas.ts (M1). */
export type PostMessageRequest = PostMessageBody;
export type PostMessageResponse = PostMessageResult;
export type SaveReminderResult = SaveReminder;
export type UploadFileResponse = UploadFileResult;
export interface RoomApi {
  postMessage(input: PostMessageRequest): Promise<PostMessageResponse>;
  uploadFile(input: {
    name: string;
    type: string;
    body: BodyInit;
  }): Promise<UploadFileResponse>;
}
