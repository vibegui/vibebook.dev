import { client } from "../../lib/client/api";
import {
  ErrorBody,
  OkResult,
  PushKeyResult,
  PushSubscribeBody,
  PushTestResult,
} from "../../../shared/schemas";
import type { FetchLike } from "../../transport";
async function value(response: {
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
}) {
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const failure = ErrorBody.safeParse(body);
    throw new Error(
      failure.success ? failure.data.error : `HTTP ${response.status}`,
    );
  }
  return body;
}
export function createPushApi(fetcher?: FetchLike) {
  const api = client("/", fetcher).api.push;
  return {
    async key() {
      return PushKeyResult.parse(await value(await api.key.$get())).key;
    },
    async subscribe(input: { endpoint: string; p256dh: string; auth: string }) {
      const body = PushSubscribeBody.parse(input);
      return OkResult.parse(
        await value(await api.subscribe.$post({ json: body })),
      );
    },
    async unsubscribe(endpoint: string) {
      return OkResult.parse(
        await value(await api.unsubscribe.$post({ json: { endpoint } })),
      );
    },
    async test() {
      return PushTestResult.parse(await value(await api.test.$post()));
    },
  };
}
export type PushApi = ReturnType<typeof createPushApi>;
/** Cooperating live tabs serialize endpoint writes. This cannot fence a request
 * already accepted by the server after its owning document has disappeared. */
export function withPushEndpointLock(api: PushApi): PushApi {
  const exclusive = <T>(action: () => Promise<T>) =>
    typeof navigator !== "undefined" && navigator.locks
      ? navigator.locks.request("vibebook.push.endpoint", action)
      : action();
  return {
    ...api,
    subscribe: (input) => exclusive(() => api.subscribe(input)),
    unsubscribe: (endpoint) => exclusive(() => api.unsubscribe(endpoint)),
  };
}
