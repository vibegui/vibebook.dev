import { client } from "../../lib/client/api";
import type { FetchLike } from "../../transport";
import {
  UNAUTHENTICATED,
  AiSpend,
  RouterStats,
  ConnectionsResult,
  CreateConnectionResult,
  RefreshConnectionResult,
  ConnectionUiResult,
  ConnectionCallResult,
  ConnectionError,
  OkResult,
} from "../../../shared/schemas";
export class AppsFailure extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly signIn = false,
  ) {
    super(message);
  }
  get membershipDenied() {
    return this.status === 403 && this.message === "forbidden";
  }
  get sessionDenied() {
    return (
      this.status === 401 &&
      !this.signIn &&
      this.message === UNAUTHENTICATED.error
    );
  }
  get accessDenied() {
    return this.membershipDenied || this.sessionDenied;
  }
}
async function read<T>(
  response: { ok: boolean; status: number; json(): Promise<unknown> },
  schema: { parse(input: unknown): T },
): Promise<T> {
  const value: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const failure = ConnectionError.safeParse(value);
    throw new AppsFailure(
      failure.success ? failure.data.error : `HTTP ${response.status}`,
      response.status,
      failure.success && failure.data.sign_in === true,
    );
  }
  try {
    return schema.parse(value);
  } catch {
    throw Error("Invalid connection response");
  }
}
/** Every request shape is inferred from the existing authenticated Hono routes. */
export function createAppsApi(roomId: string, fetcher?: FetchLike) {
  const connections = client("/", fetcher).api.books[":id"].connections;
  const id = encodeURIComponent(roomId),
    param = (cid: string) => ({ id, cid: encodeURIComponent(cid) });
  return {
    list: (signal: AbortSignal) =>
      connections
        .$get({ param: { id } }, { init: { signal, cache: "no-store" } })
        .then((value) => read(value, ConnectionsResult)),
    create: (url: string, scope: "me" | "room", signal: AbortSignal) =>
      connections
        .$post({ param: { id }, json: { url, scope } }, { init: { signal } })
        .then((value) => read(value, CreateConnectionResult)),
    remove: (cid: string, signal: AbortSignal) =>
      connections[":cid"]
        .$delete({ param: param(cid) }, { init: { signal } })
        .then((value) => read(value, OkResult)),
    refresh: (cid: string, signal: AbortSignal) =>
      connections[":cid"].refresh
        .$post({ param: param(cid) }, { init: { signal } })
        .then((value) => read(value, RefreshConnectionResult)),
    signout: (cid: string, signal: AbortSignal) =>
      connections[":cid"].signout
        .$post({ param: param(cid) }, { init: { signal } })
        .then((value) => read(value, OkResult)),
    ui: (cid: string, tool: string, signal: AbortSignal) =>
      connections[":cid"].ui
        .$get(
          { param: param(cid), query: { tool } },
          { init: { signal, cache: "no-store" } },
        )
        .then((value) => read(value, ConnectionUiResult)),
    call: (cid: string, name: string, args: unknown, signal: AbortSignal) =>
      connections[":cid"].call
        .$post(
          { param: param(cid), json: { name, arguments: args } },
          { init: { signal } },
        )
        .then((value) => read(value, ConnectionCallResult)),
    context: (cid: string, tool: string, text: string, signal: AbortSignal) =>
      connections[":cid"].context
        .$post(
          { param: param(cid), json: { tool, text } },
          { init: { signal } },
        )
        .then((value) => read(value, OkResult)),
  };
}
export type AppsApi = ReturnType<typeof createAppsApi>;

export function createAppMetrics(fetcher?: FetchLike) {
  const api = client("/", fetcher).api;
  return async (
    kind: "spend" | "router",
    roomId: string,
    roomOnly: boolean,
    signal: AbortSignal,
  ) =>
    kind === "spend"
      ? read(
          await api.metrics["ai-spend"].$get(
            { query: { room: roomId } },
            { init: { signal, cache: "no-store" } },
          ),
          AiSpend,
        )
      : read(
          await api.router.stats.$get(
            { query: roomOnly ? { room: roomId } : {} },
            { init: { signal, cache: "no-store" } },
          ),
          RouterStats,
        );
}
