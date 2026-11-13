import { get, writable } from "svelte/store";
import type { Decision } from "../../../shared/room";
import type { RequestRoomCommand } from "../../roomConnection";

export type DecisionsState = {
  pending: Record<number, boolean>;
  issues: Record<number, string>;
};
export type DecisionsClock = {
  schedule(callback: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
const defaultClock: DecisionsClock = {
  schedule: (fn, ms) => setTimeout(fn, ms),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
export const DECISION_CONFIRMATION_TIMEOUT = 10_000;
/** The canonical array keeps its server order; presentation reverses a copy. */
export const decisionRows = (decisions: readonly Decision[]) =>
  decisions.slice().reverse();

/** One mounted room owns pending commands; late replies never mutate another mount. */
export function createDecisionsSession(roomId: string, clock = defaultClock) {
  const state = writable<DecisionsState>({ pending: {}, issues: {} });
  let active = true;
  let decisions: readonly Decision[] = [];
  const operations = new Map<number, { token: symbol; timer?: unknown }>();
  function finish(id: number, issue?: string) {
    const operation = operations.get(id);
    if (operation?.timer !== undefined) clock.cancel(operation.timer);
    operations.delete(id);
    state.update((s) => {
      const pending = { ...s.pending },
        issues = { ...s.issues };
      delete pending[id];
      if (issue) issues[id] = issue;
      else delete issues[id];
      return { pending, issues };
    });
  }
  return {
    state,
    sync(next: readonly Decision[]) {
      if (!active) return;
      decisions = next;
      // Canonical removal also covers deletion by somebody else, before or after our ACK.
      for (const id of operations.keys())
        if (!decisions.some((d) => d.id === id)) finish(id);
      for (const id of Object.keys(get(state).issues).map(Number))
        if (!decisions.some((d) => d.id === id)) finish(id);
    },
    async remove(
      currentRoomId: string,
      id: number,
      request: RequestRoomCommand,
    ): Promise<void> {
      if (
        !active ||
        currentRoomId !== roomId ||
        operations.has(id) ||
        !decisions.some((d) => d.id === id)
      )
        return;
      const token = Symbol();
      operations.set(id, { token });
      state.update((s) => {
        const issues = { ...s.issues };
        delete issues[id];
        return { pending: { ...s.pending, [id]: true }, issues };
      });
      const owns = () => active && operations.get(id)?.token === token;
      try {
        const result = await request({ t: "decision.del", id });
        if (!owns()) return;
        if (!result.ok) {
          finish(id, result.error);
          return;
        }
        // An ACK does not remove UI data: the room event supplies the canonical list.
        const operation = operations.get(id)!;
        operation.timer = clock.schedule(() => {
          if (owns()) finish(id, "unconfirmed");
        }, DECISION_CONFIRMATION_TIMEOUT);
      } catch (error) {
        if (owns())
          finish(id, error instanceof Error ? error.message : "failed");
      }
    },
    dispose() {
      active = false;
      for (const operation of operations.values())
        if (operation.timer !== undefined) clock.cancel(operation.timer);
      operations.clear();
    },
  };
}
