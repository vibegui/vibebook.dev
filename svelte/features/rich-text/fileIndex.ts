import type { Room } from "../../../shared/room";
import type { RequestRoomCommand } from "../../roomConnection";
import type { RichNode } from "./types";
export function hasMissingFileReference(nodes: readonly RichNode[]): boolean {
  return nodes.some(
    (node) =>
      (node.kind === "link" &&
        node.target.kind === "file" &&
        !node.target.attachment) ||
      ("children" in node && hasMissingFileReference(node.children)),
  );
}
/** One read per partial canonical snapshot, shared by every chip in a room's
 * owned Book connection. ACK never makes an index complete; only Room.filesAll
 * does. Failures do not cause render-driven automatic retries. */
export function createFileChipIndex(
  roomId: string,
  account: string,
  current: () => boolean,
  request: RequestRoomCommand,
) {
  let active = true,
    room: Room | null = null,
    attempted = false;
  return {
    sync(next: Room, freshSnapshot = false) {
      if (!active) return;
      if (
        next.id !== roomId ||
        next.me !== account ||
        !next.members.includes(account)
      ) {
        active = false;
        room = null;
        return;
      }
      room = next;
      if (freshSnapshot) attempted = false;
    },
    async load() {
      if (!active || !current() || !room || room.filesAll || attempted) return;
      attempted = true;
      try {
        await request({ t: "files.get" });
      } catch {
        /* Read remains unconfirmed; opening the Viewer exposes explicit retry. */
      }
    },
    dispose() {
      active = false;
      room = null;
    },
  };
}
