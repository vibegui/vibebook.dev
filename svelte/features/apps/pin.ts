import { writable } from "svelte/store";
import type { Room } from "../../../shared/room";
import type { RequestRoomCommand } from "../../roomConnection";
import { createAuthOwner, authClock, type AuthClock } from "../auth/owner";
export function createAppPinOwner(
  current: () => boolean,
  clock: AuthClock = authClock,
) {
  const state = writable<{
      phase: "idle" | "pending" | "waiting" | "unconfirmed";
      ref: string;
    }>({ phase: "idle", ref: "" }),
    requests = createAuthOwner(clock);
  let active = true,
    room: Room | null = null,
    operation: { ref: string; desired: boolean; ack: boolean } | null = null,
    timer: unknown | null = null;
  function cancel() {
    if (timer !== null) clock.cancel(timer);
    timer = null;
    requests.cancel();
    operation = null;
    state.set({ phase: "idle", ref: "" });
  }
  function settle() {
    if (!active || !current() || !room || !operation) return;
    const present = (room.pins || []).some(
      (pin) => pin.kind === "app" && pin.ref === operation?.ref,
    );
    if (present === operation.desired) cancel();
  }
  return {
    state,
    sync(value: Room) {
      if (!active) return;
      room = value;
      settle();
    },
    toggle(ref: string, request: RequestRoomCommand) {
      if (!active || !current() || !room || operation) return;
      const pin = room.pins?.find(
          (pin) => pin.kind === "app" && pin.ref === ref,
        ),
        intent = { ref, desired: !pin, ack: false };
      operation = intent;
      state.set({ phase: "pending", ref });
      void requests.run(
        () =>
          request(
            pin
              ? { t: "pin.del", id: pin.id }
              : { t: "pin.add", kind: "app", ref },
          ),
        (result) => {
          if (!active || !current() || operation !== intent) return;
          settle();
          if (operation !== intent) return;
          if (!result.ok) {
            state.set({ phase: "unconfirmed", ref });
            return;
          }
          intent.ack = true;
          state.set({ phase: "waiting", ref });
          timer = clock.schedule(() => {
            if (active && current() && operation === intent)
              state.set({ phase: "unconfirmed", ref });
          }, 10_000);
        },
        () => {
          if (active && current() && operation === intent) {
            settle();
            if (operation === intent) state.set({ phase: "unconfirmed", ref });
          }
        },
      );
    },
    review() {
      if (active && current()) cancel();
    },
    dispose() {
      if (!active) return;
      active = false;
      cancel();
      requests.dispose();
      room = null;
    },
  };
}
