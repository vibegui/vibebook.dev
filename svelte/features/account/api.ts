import { client } from "../../lib/client/api";
import {
  AvatarResult,
  ErrorBody,
  LoginsResult,
  OkResult,
  SetNameResult,
} from "../../../shared/schemas";
import type { FetchLike } from "../../transport";
export class AccountFailure extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}
async function read<T>(
  response: { ok: boolean; status: number; json(): Promise<unknown> },
  schema: { parse(input: unknown): T },
): Promise<T> {
  const value: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = ErrorBody.safeParse(value);
    throw new AccountFailure(
      error.success ? error.data.error : `HTTP ${response.status}`,
      response.status,
    );
  }
  try {
    return schema.parse(value);
  } catch {
    throw Error("invalid-response");
  }
}
export function createAccountApi(fetcher?: FetchLike) {
  const api = client("/", fetcher).api;
  return {
    logins: (signal: AbortSignal) =>
      api.me.logins
        .$get({}, { init: { signal, cache: "no-store" } })
        .then((response) => read(response, LoginsResult)),
    name: (name: string, signal: AbortSignal) =>
      api.me
        .$post({ json: { name } }, { init: { signal } })
        .then((response) => read(response, SetNameResult)),
    avatar: (body: Blob, signal: AbortSignal) =>
      api.me.avatar
        .$post(
          { header: { "content-type": "image/jpeg" } },
          { init: { body, signal } },
        )
        .then((response) => read(response, AvatarResult)),
    addFriend: (email: string, signal: AbortSignal) =>
      api.friends
        .$post({ json: { email } }, { init: { signal } })
        .then((response) => read(response, OkResult)),
    removeFriend: (email: string, signal: AbortSignal) =>
      api.friends[":email"]
        .$delete(
          { param: { email: encodeURIComponent(email) } },
          { init: { signal } },
        )
        .then((response) => read(response, OkResult)),
  };
}
export type AccountApi = ReturnType<typeof createAccountApi>;
