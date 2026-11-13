import { authClient, client } from "../../lib/client/api";
import {
  AccessContext,
  AccessRequestResult,
  ConsentContext,
  ConsentError,
  EmailVerifyResult,
  ErrorBody,
  LoginContext,
  OkResult,
} from "../../../shared/schemas";
import type { FetchLike } from "../../transport";
export class AuthFailure extends Error {
  constructor(
    message: string,
    readonly status = 0,
    readonly returnTo?: string,
  ) {
    super(message);
  }
}
type ResponseBody = { ok: boolean; status: number; json(): Promise<unknown> };
async function json(response: ResponseBody): Promise<unknown> {
  const value: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = ErrorBody.safeParse(value);
    throw new AuthFailure(
      error.success ? error.data.error : `HTTP ${response.status}`,
      response.status,
    );
  }
  return value;
}
export function oauthQuery(search: string) {
  const query = new Map<string, string | string[]>();
  for (const [key, value] of new URLSearchParams(search)) {
    const before = query.get(key);
    query.set(
      key,
      before === undefined
        ? value
        : Array.isArray(before)
          ? [...before, value]
          : [before, value],
    );
  }
  return Object.fromEntries(query);
}
export function createAuthApi(fetcher?: FetchLike) {
  const auth = authClient("/", fetcher).auth,
    api = client("/", fetcher).api;
  return {
    async login(search: string, signal?: AbortSignal) {
      const query = new URLSearchParams(search);
      const value = await json(
        await auth.context.$get(
          {
            query: {
              next: query.get("next") ?? undefined,
              error: query.get("error") ?? undefined,
            },
          },
          { init: { signal } },
        ),
      );
      return LoginContext.parse(value);
    },
    async start(email: string, signal?: AbortSignal) {
      return OkResult.parse(
        await json(
          await auth.email.start.$post(
            { json: { email } },
            { init: { signal } },
          ),
        ),
      );
    },
    async verify(
      email: string,
      code: string,
      next: string,
      signal?: AbortSignal,
    ) {
      return EmailVerifyResult.parse(
        await json(
          await auth.email.verify.$post(
            { json: { email, code, next } },
            { init: { signal } },
          ),
        ),
      );
    },
    async access(id: string, signal?: AbortSignal) {
      return AccessContext.parse(
        await json(
          await auth.room[":id"].$get(
            { param: { id: encodeURIComponent(id) } },
            { init: { signal } },
          ),
        ),
      );
    },
    async ask(id: string, signal?: AbortSignal) {
      return AccessRequestResult.parse(
        await json(
          await api.books[":id"].request.$post(
            { param: { id: encodeURIComponent(id) } },
            { init: { signal } },
          ),
        ),
      );
    },
    async consent(search: string, signal?: AbortSignal) {
      // OAuth protocol parameter values pass unchanged to the published typed endpoint; the provider validates them.
      const response = await api.authorize.context.$get(
        { query: oauthQuery(search) },
        { init: { signal } },
      );
      const value: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const error = ConsentError.safeParse(value);
        throw new AuthFailure(
          error.success ? error.data.error : `HTTP ${response.status}`,
          response.status,
          error.success ? error.data.redirect_to : undefined,
        );
      }
      return ConsentContext.parse(value);
    },
  };
}
export type AuthApi = ReturnType<typeof createAuthApi>;
