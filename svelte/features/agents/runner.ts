import * as z from "zod/mini";
import { get, writable } from "svelte/store";
import type { FetchLike } from "../../transport";
import { createAgentLease, agentClock, type AgentClock } from "./lease";
import { RUNNER_TTL } from "./model";
export const LOCAL_RUNNER_ORIGIN = "http://127.0.0.1:47321";
const Ping = z.object({ rooms: z.array(z.string()) });
const Where = z.object({
  folder: z.optional(z.nullable(z.string())),
  home: z.optional(z.nullable(z.string())),
  how: z.optional(z.nullable(z.string())),
});
const Focus = z.object({ error: z.optional(z.string()) });
export type RunnerWhere = z.infer<typeof Where>;
export type RunnerState = {
  where: RunnerWhere | null;
  available: boolean;
  rooms: readonly string[];
  probing: boolean;
  focusing: boolean;
  focusError: boolean;
};
const blank = (): RunnerState => ({
  where: null,
  available: false,
  rooms: [],
  probing: false,
  focusing: false,
  focusError: false,
});
/** Only the existing fixed loopback runner is contacted. No browser credential is forwarded. */
export function createLocalRunner(
  options: { fetcher?: FetchLike; clock?: AgentClock } = {},
) {
  const fetcher = options.fetcher ?? fetch,
    clock = options.clock ?? agentClock,
    state = writable<RunnerState>(blank()),
    probeLease = createAgentLease(clock),
    focusLease = createAgentLease(clock);
  let active = true,
    scope = "",
    ticket = 0,
    focusTicket = 0,
    cachedWhere = -Infinity,
    cachedPing = -Infinity,
    probing: Promise<void> | null = null;
  async function json<T>(
    path: string,
    schema: { parse(value: unknown): T },
    signal: AbortSignal,
  ): Promise<T | null> {
    try {
      const response = await fetcher(LOCAL_RUNNER_ORIGIN + path, {
        credentials: "omit",
        cache: "no-store",
        signal,
      });
      if (!response.ok) return null;
      const value: unknown = await response.json();
      return schema.parse(value);
    } catch {
      return null;
    }
  }
  return {
    state,
    probe(roomId: string, title: string, includePing: boolean) {
      if (!active) return Promise.resolve();
      const next = JSON.stringify([roomId, title]);
      if (next === scope && probing) return probing;
      const needWhere =
          next !== scope || clock.now() - cachedWhere >= RUNNER_TTL,
        needPing = includePing && clock.now() - cachedPing >= RUNNER_TTL;
      if (!needWhere && !needPing) return probing ?? Promise.resolve();
      scope = next;
      const own = ++ticket;
      probeLease.cancel();
      state.update((value) => ({ ...value, probing: true }));
      const job = probeLease
        .run(
          (signal) =>
            Promise.all([
              needWhere
                ? json(
                    `/where?room=${encodeURIComponent(roomId)}&title=${encodeURIComponent(title)}`,
                    Where,
                    signal,
                  )
                : Promise.resolve(get(state).where),
              needPing ? json("/ping", Ping, signal) : Promise.resolve(null),
            ]),
          10_000,
        )
        .then(
          ([where, ping]) => {
            if (!active || own !== ticket) return;
            if (needWhere) cachedWhere = clock.now();
            if (needPing) cachedPing = clock.now();
            state.update((value) => ({
              ...value,
              where,
              ...(needPing
                ? { rooms: ping?.rooms ?? [], available: !!ping }
                : {}),
              probing: false,
            }));
          },
          () => {
            if (active && own === ticket) {
              if (needWhere) cachedWhere = clock.now();
              if (needPing) cachedPing = clock.now();
              state.update((value) => ({
                ...value,
                probing: false,
                ...(needWhere ? { where: null } : {}),
                ...(needPing ? { available: false, rooms: [] } : {}),
              }));
            }
          },
        )
        .finally(() => {
          if (own === ticket) probing = null;
        });
      probing = job;
      return job;
    },
    async focus(roomId: string) {
      if (!active || get(state).focusing) return;
      state.update((value) => ({
        ...value,
        focusing: true,
        focusError: false,
      }));
      const own = ++focusTicket;
      try {
        const result = await focusLease.run(
          (signal) =>
            json(`/focus?room=${encodeURIComponent(roomId)}`, Focus, signal),
          10_000,
        );
        if (active && own === focusTicket)
          state.update((value) => ({
            ...value,
            focusing: false,
            focusError: !result || !!result.error,
          }));
      } catch {
        if (active && own === focusTicket)
          state.update((value) => ({
            ...value,
            focusing: false,
            focusError: true,
          }));
      }
    },
    cancel() {
      ticket++;
      focusTicket++;
      probeLease.cancel();
      focusLease.cancel();
      probing = null;
      state.update((value) => ({ ...value, probing: false, focusing: false }));
    },
    dispose() {
      active = false;
      ticket++;
      focusTicket++;
      probeLease.cancel();
      focusLease.cancel();
      probing = null;
      scope = "";
      cachedWhere = cachedPing = -Infinity;
      state.set(blank());
    },
  };
}
export type LocalRunner = ReturnType<typeof createLocalRunner>;
export function runnerPath(where: RunnerWhere | null) {
  const folder = where?.folder;
  if (!folder) return "";
  return where.home && folder.startsWith(where.home + "/")
    ? "~" + folder.slice(where.home.length)
    : folder;
}
