// The Svelte app's HTTP client: Hono's hc over the Worker's own route types (src/api.ts, type-only import: nothing from
// src/ is bundled). Request bodies, params and every response/status shape are inferred from the handlers.
import { hc } from "hono/client";
import {
  ErrorBody,
  GLOBAL_FAILURE_STATUSES,
  type GlobalFailure,
} from "../../../shared/schemas";
import type { AppType } from "../../../.api-types/src/api";

export const client = (
  base = "/",
  fetcher?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
) => hc<AppType>(base, fetcher ? { fetch: fetcher } : {});
export type Client = ReturnType<typeof client>;

/** Statuses any /api call can get from the Worker's global middleware (not part of AppType, which comes from the route
 *  handlers): 401 when signed out, 403 when the cross-site guard refuses a write. Callers check this before reading a
 *  route's own typed answer. */
export function globalFailure(
  response: { status: number },
  body: unknown,
): GlobalFailure | null {
  if (!(GLOBAL_FAILURE_STATUSES as readonly number[]).includes(response.status))
    return null;
  const e = ErrorBody.safeParse(body);
  return {
    status: response.status as GlobalFailure["status"],
    error: e.success ? e.data.error : `HTTP ${response.status}`,
  };
}
