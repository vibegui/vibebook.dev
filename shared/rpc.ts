import type { Attachment } from "./room";

/** Browser-facing room HTTP operations. These contracts contain DTOs, never Worker implementation types. */
export interface PostMessageRequest {
  text: string;
  thread?: string;
}
export type PostMessageResponse =
  { ok: true; id: number; thread: string } | { ok: false; error: string };
export type SaveReminderResult = {
  ok: boolean;
  name?: string;
  error?: string;
  every?: string | null;
  cron?: string | null;
  timezone?: string;
  next_at?: string;
};
export type UploadFileResponse = Attachment & { reminder?: SaveReminderResult };
export interface RoomApi {
  postMessage(input: PostMessageRequest): Promise<PostMessageResponse>;
  uploadFile(input: {
    name: string;
    type: string;
    body: BodyInit;
  }): Promise<UploadFileResponse>;
}
