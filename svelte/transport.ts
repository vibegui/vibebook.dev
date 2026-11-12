import type { RoomCommand } from "../shared/commands";
import type { RoomEvent } from "../shared/room";
import type { RoomApi } from "../shared/rpc";
import {
  AttachmentSchema,
  ErrorBody,
  PostMessageResult,
  UploadFileResult,
} from "../shared/schemas";
import { isRoomCommand, parseRoomEvent } from "../shared/validation";
import { client } from "./lib/client/api";

/** The socket surface needed by the UI, allowing deterministic transport tests without a server. */
export interface RoomSocket {
  readonly readyState: number;
  send(data: string): void;
}
export function sendRoomCommand(
  socket: RoomSocket | null | undefined,
  command: RoomCommand,
): boolean {
  if (!isRoomCommand(command)) throw new TypeError("Invalid room command");
  if (!socket || socket.readyState !== 1) return false;
  socket.send(JSON.stringify(command));
  return true;
}
export function receiveRoomEvent(raw: unknown): RoomEvent {
  if (typeof raw !== "string")
    throw new TypeError("Room events must be JSON text");
  return parseRoomEvent(raw);
}

/** HTTP calls through the inferred Hono client (svelte/lib/client/api.ts): request shapes come from the Worker's
 *  validated routes, and responses are checked against the shared schemas before the UI sees them. Authorization and
 *  business rules stay on the Worker. */
export type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;
/** What these helpers read of a response (both fetch's Response and hc's typed ClientResponse have it). */
type Answer = { ok: boolean; status: number; json(): Promise<unknown> };
async function body(response: Answer): Promise<unknown> {
  try {
    return await response.json();
  } catch (error) {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    throw error;
  }
}
function failure(response: Answer, value: unknown): Error {
  const e = ErrorBody.safeParse(value);
  return new Error(e.success ? e.data.error : `HTTP ${response.status}`);
}
export function createRoomApi(
  roomId: string,
  fetcher: FetchLike = fetch,
): RoomApi {
  const api = client("/", fetcher);
  const room = api.api.books[":id"];
  const id = encodeURIComponent(roomId); // hc puts params into the path as they are

  return {
    async postMessage(input) {
      const response = await room.post.$post({
        param: { id },
        json: input,
      });
      const value = await body(response);
      // 400 with { ok: false } is a business answer (empty message…), not a failure.
      if (response.ok || response.status === 400) {
        const r = PostMessageResult.safeParse(value);
        if (r.success) return r.data;
        if (response.ok) throw new TypeError("Invalid post response");
      }
      throw failure(response, value);
    },
    async uploadFile(input) {
      // The file is the raw body (hc's init.body), its type and name go in the validated headers.
      const response = await room.files.$post(
        {
          param: { id },
          header: {
            "content-type": input.type,
            "x-filename": encodeURIComponent(input.name),
          },
        },
        { init: { body: input.body } },
      );
      const value = await body(response);
      if (!response.ok) throw failure(response, value);
      const r = UploadFileResult.safeParse(value);
      if (!r.success)
        throw new TypeError(
          AttachmentSchema.safeParse(value).success
            ? "Invalid reminder response"
            : "Invalid upload response",
        );
      return r.data;
    },
  };
}
