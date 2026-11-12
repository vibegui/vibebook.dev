import type { RoomCommand } from "../shared/commands";
import type { RoomEvent } from "../shared/room";
import type { PostMessageRequest, PostMessageResponse, RoomApi, UploadFileResponse } from "../shared/rpc";
import { isAttachment, isRoomCommand, parseRoomEvent, record } from "../shared/validation";

/** The socket surface needed by the UI, allowing deterministic transport tests without a server. */
export interface RoomSocket { readonly readyState: number; send(data: string): void }
export function sendRoomCommand(socket: RoomSocket | null | undefined, command: RoomCommand): boolean {
  if (!isRoomCommand(command)) throw new TypeError("Invalid room command");
  if (!socket || socket.readyState !== 1) return false;
  socket.send(JSON.stringify(command));
  return true;
}
export function receiveRoomEvent(raw: unknown): RoomEvent {
  if (typeof raw !== "string") throw new TypeError("Room events must be JSON text");
  return parseRoomEvent(raw);
}

/** Typed HTTP calls with response validation. Authorization and business rules remain on the Worker. */
export type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export function createRoomApi(roomId: string, fetcher: FetchLike = fetch): RoomApi {
  const base = `/api/books/${encodeURIComponent(roomId)}`;
  async function json(response: Response): Promise<unknown> {
    const value: unknown = await response.json();
    if (!response.ok) throw new Error(record(value) && typeof value.error === "string" ? value.error : `HTTP ${response.status}`);
    return value;
  }
  return {
    async postMessage(input: PostMessageRequest): Promise<PostMessageResponse> {
      const value = await json(await fetcher(`${base}/post`, {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(input)}));
      if (!record(value) || typeof value.ok !== "boolean") throw new TypeError("Invalid post response");
      if (value.ok === false && typeof value.error === "string") return {ok:false,error:value.error};
      if (value.ok === true && typeof value.id === "number" && typeof value.thread === "string") return {ok:true,id:value.id,thread:value.thread};
      throw new TypeError("Invalid post response");
    },
    async uploadFile(input): Promise<UploadFileResponse> {
      const value = await json(await fetcher(`${base}/files`, {method:"POST",headers:{"content-type":input.type,"x-filename":encodeURIComponent(input.name)},body:input.body}));
      if (!isAttachment(value)) throw new TypeError("Invalid upload response");
      if ("reminder" in value) {
        const reminder = value.reminder;
        if (!record(reminder) || typeof reminder.ok !== "boolean" || (reminder.error !== undefined && typeof reminder.error !== "string") || (reminder.name !== undefined && typeof reminder.name !== "string") || (reminder.every !== undefined && reminder.every !== null && typeof reminder.every !== "string") || (reminder.next_at !== undefined && typeof reminder.next_at !== "string") || (reminder.cron !== undefined && reminder.cron !== null && typeof reminder.cron !== "string") || (reminder.timezone !== undefined && typeof reminder.timezone !== "string")) throw new TypeError("Invalid reminder response");
        return {...value,reminder:{ok:reminder.ok,...(typeof reminder.name === "string" ? {name:reminder.name}:{}),...(typeof reminder.error === "string" ? {error:reminder.error}:{}),...(typeof reminder.every === "string" || reminder.every === null ? {every:reminder.every}:{}),...(typeof reminder.next_at === "string" ? {next_at:reminder.next_at}:{}),...(typeof reminder.cron === "string" || reminder.cron === null ? {cron:reminder.cron}:{}),...(typeof reminder.timezone === "string" ? {timezone:reminder.timezone}:{})}};
      }
      return value;
    },
  };
}
