import { get, writable } from "svelte/store";
import type { Room, Suggestion } from "../../../shared/room";
import type { RoomCommand } from "../../../shared/commands";
import type { RequestRoomCommand } from "../../roomConnection";
import { suggestionIdentity } from "./model";
type Command = Extract<
  RoomCommand,
  {
    t:
      | "epic"
      | "epic.owner"
      | "epic.order"
      | "epic.rename"
      | "epic.archive"
      | "epic.del"
      | "suggestion";
  }
>;
export type MutationState = {
  phase: "idle" | "pending" | "error" | "unconfirmed";
  error: string;
};
export const ROOM_MUTATION_WAIT = 10_000;
export function createRoomMutations(
  account: string,
  roomId: string,
  clock = {
    schedule: (fn: () => void, ms: number): unknown => setTimeout(fn, ms),
    cancel: (timer: unknown) =>
      clearTimeout(timer as ReturnType<typeof setTimeout>),
  },
) {
  const state = writable<MutationState>({ phase: "idle", error: "" });
  let active = true,
    room: Room | undefined,
    request: RequestRoomCommand | undefined;
  type Operation = {
    token: symbol;
    command: Command;
    baseline: Set<string>;
    suggestion?: Suggestion;
    ack: boolean;
    timer?: unknown;
    resolve: (success: boolean) => void;
  };
  let operation: Operation | undefined;
  function cancel() {
    if (operation?.timer !== undefined) clock.cancel(operation.timer);
    operation?.resolve(false);
    operation = undefined;
  }
  const own = (op: Operation) => active && operation === op;
  function matches(op: Operation) {
    if (!room) return false;
    const command = op.command;
    if (command.t === "suggestion")
      return (
        !!op.suggestion &&
        !room.suggestions.some(
          (value) =>
            suggestionIdentity(value) === suggestionIdentity(op.suggestion!),
        )
      );
    if (command.t === "epic")
      return room.epics.some(
        (epic) =>
          !op.baseline.has(epic.id) &&
          epic.title === command.title.trim().slice(0, 200),
      );
    if (command.t === "epic.order") {
      const ids = new Set(command.ids),
        actual = room.epics
          .filter((epic) => ids.has(epic.id))
          .map((epic) => epic.id),
        present = new Set(actual);
      return (
        JSON.stringify(actual) ===
        JSON.stringify(command.ids.filter((id) => present.has(id)))
      );
    }
    const epic = room.epics.find((epic) => epic.id === command.id);
    if (command.t === "epic.del") return !epic;
    if (!epic) return false;
    if (command.t === "epic.owner") return (epic.owner ?? "") === command.owner;
    if (command.t === "epic.rename")
      return epic.title === command.title.trim().slice(0, 200);
    return !!epic.archived === (command.archived !== false);
  }
  function settle() {
    const op = operation;
    if (!op?.ack || !matches(op)) return;
    if (op.timer !== undefined) clock.cancel(op.timer);
    operation = undefined;
    state.set({ phase: "idle", error: "" });
    op.resolve(true);
  }
  function uncertain(op: Operation, error: string) {
    if (!own(op)) return;
    if (op.timer !== undefined) clock.cancel(op.timer);
    op.timer = undefined;
    state.set({ phase: "unconfirmed", error });
  }
  return {
    account,
    roomId,
    state,
    sync(next: Room, send: RequestRoomCommand) {
      if (!active) return;
      if (
        next.id !== roomId ||
        next.me !== account ||
        !next.members.includes(account)
      ) {
        cancel();
        room = undefined;
        request = undefined;
        state.set({ phase: "idle", error: "" });
        return;
      }
      room = next;
      request = send;
      const current = operation?.command;
      if (
        current &&
        "id" in current &&
        current.t !== "epic.del" &&
        !next.epics.some((epic) => epic.id === current.id)
      ) {
        cancel();
        state.set({ phase: "idle", error: "" });
        return;
      }
      settle();
    },
    suggestionIntent() {
      const op = operation;
      return op?.command.t === "suggestion" && op.suggestion
        ? {
            index: op.command.i,
            accept: !!op.command.accept,
            identity: suggestionIdentity(op.suggestion),
          }
        : null;
    },
    run(command: Command): Promise<boolean> {
      if (!active || !room || !request || operation)
        return Promise.resolve(false);
      if (
        command.t === "suggestion" &&
        (!room.suggestions[command.i] ||
          (command.expected &&
            suggestionIdentity(command.expected) !==
              suggestionIdentity(room.suggestions[command.i]!)))
      )
        return Promise.resolve(false);
      if ("id" in command && !room.epics.some((epic) => epic.id === command.id))
        return Promise.resolve(false);
      const send = request;
      return new Promise<boolean>((resolve) => {
        const op: Operation = {
          token: Symbol(),
          command,
          baseline: new Set(room!.epics.map((epic) => epic.id)),
          suggestion:
            command.t === "suggestion"
              ? room!.suggestions[command.i]
              : undefined,
          ack: false,
          resolve,
        };
        operation = op;
        state.set({ phase: "pending", error: "" });
        op.timer = clock.schedule(() => uncertain(op, "timeout"), 20_000);
        void Promise.resolve()
          .then(() => {
            if (!own(op)) return { ok: false as const, error: "offline" };
            if (
              command.t === "suggestion" &&
              (!room?.suggestions[command.i] ||
                suggestionIdentity(room.suggestions[command.i]!) !==
                  suggestionIdentity(op.suggestion!))
            )
              return { ok: false as const, error: "changed" };
            return send(
              command.t === "suggestion"
                ? { ...command, expected: op.suggestion }
                : command,
            );
          })
          .then(
            (result) => {
              if (!own(op)) return;
              if (!result.ok) {
                if (
                  result.error === "offline" ||
                  result.error === "invalid command" ||
                  result.error === "changed" ||
                  result.error === "suggestion changed" ||
                  result.error === "unknown epic"
                ) {
                  cancel();
                  state.set({ phase: "error", error: result.error });
                } else uncertain(op, result.error);
                return;
              }
              op.ack = true;
              if (op.timer !== undefined) clock.cancel(op.timer);
              settle();
              if (own(op))
                op.timer = clock.schedule(
                  () => uncertain(op, "unconfirmed"),
                  ROOM_MUTATION_WAIT,
                );
            },
            (error) =>
              uncertain(op, error instanceof Error ? error.message : "failed"),
          );
      });
    },
    review() {
      if (get(state).phase !== "unconfirmed") return;
      cancel();
      state.set({ phase: "idle", error: "" });
    },
    dispose() {
      active = false;
      cancel();
      room = undefined;
      request = undefined;
      state.set({ phase: "idle", error: "" });
    },
  };
}
export type RoomMutations = ReturnType<typeof createRoomMutations>;
