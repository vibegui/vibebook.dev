import type { MeResult } from "../shared/schemas";
/** Canonical Personal wait DTO. Vanilla's independent legacy bridge stays separate. */
export type Wait = MeResult["waits"][number];

export type Bridge = {
  t: (s: string, vars?: Record<string, string | number>) => string;
  ago: (ts: number) => string;
};
