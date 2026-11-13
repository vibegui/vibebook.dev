import { client } from "../../lib/client/api";
import { createRoomApi, type FetchLike } from "../../transport";
import {
  AgentGrantsResult,
  ArchivedResult,
  ErrorBody,
  MeResult,
  OkResult,
  RoomIconResult,
  RouteResult,
  SearchResult,
  StartRoomResult,
  TINTS,
} from "../../../shared/schemas";
export type RoomTint = (typeof TINTS)[number] | null;
export class HomeFailure extends Error {
  constructor(
    message: string,
    readonly status = 0,
  ) {
    super(message);
  }
}
type Answer = { ok: boolean; status: number; json(): Promise<unknown> };
async function read<T>(
  response: Answer,
  schema: { parse(value: unknown): T },
): Promise<T> {
  const value: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = ErrorBody.safeParse(value);
    throw new HomeFailure(
      error.success ? error.data.error : `HTTP ${response.status}`,
      response.status,
    );
  }
  try {
    return schema.parse(value);
  } catch {
    throw new HomeFailure("invalid-response");
  }
}
export function createHomeApi(fetcher?: FetchLike) {
  const api = client("/", fetcher).api,
    room = api.books[":id"];
  const param = (id: string) => ({ id: encodeURIComponent(id) });
  return {
    me: (signal?: AbortSignal) =>
      api.me
        .$get({ query: { ui: "svelte" } }, { init: { signal } })
        .then((response) => read(response, MeResult)),
    archived: (signal?: AbortSignal) =>
      api.archived
        .$get({}, { init: { signal } })
        .then((response) => read(response, ArchivedResult)),
    search: (q: string, signal?: AbortSignal) =>
      api.search
        .$get({ query: { q } }, { init: { signal } })
        .then((response) => read(response, SearchResult)),
    route: (text: string, signal?: AbortSignal) =>
      api.route
        .$post({ json: { text } }, { init: { signal } })
        .then((response) => read(response, RouteResult)),
    startRoom: (text: string, signal?: AbortSignal) =>
      api.books.start
        .$post({ json: { text } }, { init: { signal } })
        .then((response) => read(response, StartRoomResult)),
    post: (id: string, text: string, thread: string) =>
      createRoomApi(id, fetcher).postMessage({ text, thread }),
    archive: (id: string, archived: boolean, signal?: AbortSignal) =>
      room.archive
        .$post({ param: param(id), json: { archived } }, { init: { signal } })
        .then((response) => read(response, OkResult)),
    order: (ids: string[], signal?: AbortSignal) =>
      api.rooms.order
        .$post({ json: { ids } }, { init: { signal } })
        .then((response) => read(response, OkResult)),
    tint: (id: string, tint: RoomTint, signal?: AbortSignal) =>
      room.tint
        .$post({ param: param(id), json: { tint } }, { init: { signal } })
        .then((response) => read(response, OkResult)),
    icon: (id: string, bytes: Blob | null, signal?: AbortSignal) =>
      room.icon
        .$post(
          {
            param: param(id),
            header: {
              "content-type": bytes ? "image/png" : "application/json",
            },
          },
          { init: { signal, body: bytes ?? "{}" } },
        )
        .then((response) => read(response, RoomIconResult)),
    resolve: (book_id: string, ref: string, signal?: AbortSignal) =>
      api.waits.resolve
        .$post({ json: { book_id, ref } }, { init: { signal } })
        .then((response) => read(response, OkResult)),
    agents: (signal?: AbortSignal) =>
      api.agents
        .$get({}, { init: { signal } })
        .then((response) => read(response, AgentGrantsResult)),
  };
}
export type HomeApi = ReturnType<typeof createHomeApi>;
