import type { Message, Room } from "../../../shared/room";
import type { ClientClock } from "../../lib/client/clock";
import { createDeferredModule } from "../deferred-view/module";
import { messageById, visibleMessage } from "../chat/privacy";

/** Public identity only. Content/receipt updates retain the live interactive
 * session, whose existing canonical guards decide whether its operation survives. */
export const interactiveIdentity = (room: Room, message: Message) =>
  JSON.stringify([
    room.id,
    room.me,
    message.id,
    message.thread,
    message.author,
    message.kind,
  ]);

export function interactiveCurrent(room: Room, message: Message): boolean {
  const canonical = messageById(room, message.id);
  return (
    !!canonical &&
    room.members.includes(room.me) &&
    !!(message.card || message.choices || message.poll) &&
    visibleMessage(room, canonical) &&
    interactiveIdentity(room, canonical) ===
      interactiveIdentity(room, message) &&
    canonical.card === message.card &&
    canonical.choices === message.choices &&
    canonical.poll === message.poll &&
    canonical.text === message.text
  );
}

/** One rendered message owns only module transport; never canonical state or
 * queued actions. Resolving an import cannot dispatch/replay a room command. */
export function createInteractivePresentation<T>(
  read: () => { room: Room; message: Message },
  load: () => Promise<T>,
  clock?: ClientClock,
) {
  const initial = read(),
    identity = interactiveIdentity(initial.room, initial.message);
  let active = true;
  const current = () => {
    if (!active) return false;
    const value = read();
    return (
      identity === interactiveIdentity(value.room, value.message) &&
      interactiveCurrent(value.room, value.message)
    );
  };
  const module = createDeferredModule(load, { current, clock });
  return {
    ...module,
    current,
    dispose() {
      active = false;
      module.dispose();
    },
  };
}
