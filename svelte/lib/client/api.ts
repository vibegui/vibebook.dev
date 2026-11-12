// The Svelte app's HTTP client: Hono's hc over the Worker's own route types (src/api.ts, type-only import: nothing from
// src/ is bundled). Request bodies, params and every response/status shape are inferred from the handlers.
import { hc } from "hono/client";
import type { AppType } from "../../../.api-types/src/api";

export const client = (
  base = "/",
  fetcher?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
) => hc<AppType>(base, fetcher ? { fetch: fetcher } : {});
export type Client = ReturnType<typeof client>;
