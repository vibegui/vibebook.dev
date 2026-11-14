import { client } from "../../lib/client/api";
import type { FetchLike } from "../../transport";
import {
  UNAUTHENTICATED,
  MeResult,
  AgentGrantsResult,
  AgentsResult,
  ClaudeToggleResult,
  ConnectedResult,
  CreateSandboxResult,
  ErrorBody,
  OkResult,
  RevokeAgentsResult,
  SandboxesResult,
  SandboxSetupResult,
  SandboxTerminalResult,
} from "../../../shared/schemas";
export class AgentsFailure extends Error {
  constructor(
    message: string,
    readonly status = 0,
  ) {
    super(message);
  }
}
export const agentsUnauthenticated = (error: unknown) =>
  error instanceof AgentsFailure &&
  error.status === 401 &&
  error.message === UNAUTHENTICATED.error;
type Answer = { ok: boolean; status: number; json(): Promise<unknown> };
async function read<T>(
  response: Answer,
  schema: { parse(value: unknown): T },
): Promise<T> {
  const value: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = ErrorBody.safeParse(value);
    throw new AgentsFailure(
      error.success ? error.data.error : `HTTP ${response.status}`,
      response.status,
    );
  }
  try {
    return schema.parse(value);
  } catch {
    throw new AgentsFailure("Invalid agent response");
  }
}
/** Inferred authorized Hono routes; credentials remain request bodies, never query strings or persisted client state. */
export function createAgentsApi(fetcher?: FetchLike) {
  const api = client("/", fetcher).api,
    room = api.books[":id"],
    sandbox = api.sandboxes[":sid"];
  const roomParam = (id: string) => ({ id: encodeURIComponent(id) });
  const sandboxParam = (sid: string) => ({ sid: encodeURIComponent(sid) });
  return {
    identity: (signal?: AbortSignal) =>
      api.me
        .$get(
          { query: { ui: "svelte" } },
          { init: { signal, cache: "no-store" } },
        )
        .then((response) => read(response, MeResult))
        .then((me) => me.email),
    grants: (signal?: AbortSignal) =>
      api.agents
        .$get({}, { init: { signal, cache: "no-store" } })
        .then((response) => read(response, AgentGrantsResult)),
    revoke: (ids: readonly string[], signal?: AbortSignal) =>
      api.agents.revoke
        .$post(
          { json: { ids: [...ids] } },
          { init: { signal, cache: "no-store" } },
        )
        .then((response) => read(response, RevokeAgentsResult)),
    room: (id: string, signal?: AbortSignal) =>
      room.agents
        .$get({ param: roomParam(id) }, { init: { signal, cache: "no-store" } })
        .then((response) => read(response, AgentsResult)),
    focus: (id: string, signal?: AbortSignal) =>
      room.focus
        .$post(
          { param: roomParam(id) },
          { init: { signal, cache: "no-store" } },
        )
        .then((response) => read(response, OkResult)),
    toggle: (id: string, on: boolean, signal?: AbortSignal) =>
      room.claude
        .$post(
          { param: roomParam(id), json: { on } },
          { init: { signal, cache: "no-store" } },
        )
        .then((response) => read(response, ClaudeToggleResult)),
    sandboxes: (id: string, signal?: AbortSignal) =>
      room.sandboxes
        .$get({ param: roomParam(id) }, { init: { signal, cache: "no-store" } })
        .then((response) => read(response, SandboxesResult)),
    create: (id: string, name: string, signal?: AbortSignal) =>
      room.sandboxes
        .$post(
          { param: roomParam(id), json: { name } },
          { init: { signal, cache: "no-store" } },
        )
        .then((response) => read(response, CreateSandboxResult)),
    power: (id: string, action: "start" | "pause", signal?: AbortSignal) =>
      (action === "start"
        ? sandbox.start.$post(
            { param: sandboxParam(id) },
            { init: { signal, cache: "no-store" } },
          )
        : sandbox.pause.$post(
            { param: sandboxParam(id) },
            { init: { signal, cache: "no-store" } },
          )
      ).then((response) => read(response, OkResult)),
    setup: (id: string, signal?: AbortSignal) =>
      sandbox.setup
        .$post(
          { param: sandboxParam(id) },
          { init: { signal, cache: "no-store" } },
        )
        .then((response) => read(response, SandboxSetupResult)),
    remove: (id: string, signal?: AbortSignal) =>
      sandbox
        .$delete(
          { param: sandboxParam(id) },
          { init: { signal, cache: "no-store" } },
        )
        .then((response) => read(response, OkResult)),
    terminal: (id: string, signal?: AbortSignal) =>
      sandbox.terminal
        .$post(
          { param: sandboxParam(id) },
          { init: { signal, cache: "no-store" } },
        )
        .then((response) => read(response, SandboxTerminalResult)),
    connected: (signal?: AbortSignal) =>
      api.freestyle
        .$get({}, { init: { signal, cache: "no-store" } })
        .then((response) => read(response, ConnectedResult)),
    saveKey: (key: string, signal?: AbortSignal) =>
      api.freestyle
        .$post({ json: { key } }, { init: { signal, cache: "no-store" } })
        .then((response) => read(response, OkResult)),
    removeKey: (signal?: AbortSignal) =>
      api.freestyle
        .$delete({}, { init: { signal, cache: "no-store" } })
        .then((response) => read(response, OkResult)),
    saveToken: (token: string, signal?: AbortSignal) =>
      api["claude-token"]
        .$post({ json: { token } }, { init: { signal, cache: "no-store" } })
        .then((response) => read(response, OkResult)),
    removeToken: (signal?: AbortSignal) =>
      api["claude-token"]
        .$delete({}, { init: { signal, cache: "no-store" } })
        .then((response) => read(response, OkResult)),
  };
}
export type AgentsApi = ReturnType<typeof createAgentsApi>;
