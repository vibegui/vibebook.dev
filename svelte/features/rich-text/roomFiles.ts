import type { Attachment, Room } from "../../../shared/room";
import type { ApplicationRoomScope } from "../application/types";

/** Preserve the existing file-first, message-then-origin insertion/dedup order. */
export function collectRoomFiles(room: Room): Attachment[] {
  const files = new Map<string, Attachment>();
  for (const file of room.files || []) files.set(file.id, file);
  for (const message of [...room.messages, ...(room.origins || [])])
    for (const file of message.files || [])
      if (!files.has(file.id)) files.set(file.id, file);
  return [...files.values()];
}
export const roomFileFingerprint = (files: readonly Attachment[]) =>
  JSON.stringify(
    files.map((file) => [
      file.id,
      file.name,
      file.type,
      file.ts,
      file.size,
      file.author,
    ]),
  );
type Scope = Pick<
  ApplicationRoomScope,
  "roomId" | "account" | "roomGeneration" | "identityRevision"
>;
export type RichFileView = Readonly<{
  files: readonly Attachment[];
  fingerprint: string;
}>;
export type RichFileReader = { read(room: Room): RichFileView | null };
export type RichFileIndex = RichFileReader & { dispose(): void };
const sameScope = (a: Scope, b: Scope) =>
  a.roomId === b.roomId &&
  a.account === b.account &&
  a.roomGeneration === b.roomGeneration &&
  a.identityRevision === b.identityRevision;

/** A single RoomScope owns this one-snapshot cache. Each read checks CURRENT
 * canonical scope/references, not just the previous cached snapshot. Projected
 * partial-file rooms and old contexts never borrow another snapshot's files. */
export function createRichFileIndex(
  scope: Scope,
  canonical: () => { scope: Scope; room: Room } | null,
  current: () => boolean = () => true,
): RichFileIndex {
  const expected: Scope = {
    roomId: scope.roomId,
    account: scope.account,
    roomGeneration: scope.roomGeneration,
    identityRevision: scope.identityRevision,
  };
  let active = true,
    readCanonical = canonical,
    owns = current;
  let previous: readonly unknown[] | undefined, view: RichFileView | undefined;
  const clear = () => {
    previous = undefined;
    view = undefined;
  };
  const dispose = () => {
    active = false;
    readCanonical = () => null;
    owns = () => false;
    clear();
  };
  return {
    read(room) {
      if (!active) return null;
      if (!owns()) {
        dispose();
        return null;
      }
      const latest = readCanonical();
      if (!active) return null;
      if (!owns()) {
        dispose();
        return null;
      }
      if (!latest) {
        clear();
        return null;
      }
      if (
        !sameScope(expected, latest.scope) ||
        latest.room.id !== expected.roomId ||
        latest.room.me !== expected.account
      ) {
        dispose();
        return null;
      }
      if (
        room.id !== expected.roomId ||
        room.me !== expected.account ||
        room.files !== latest.room.files ||
        room.messages !== latest.room.messages ||
        room.origins !== latest.room.origins
      )
        return null;
      const refs = [
        latest.room.files,
        latest.room.messages,
        latest.room.origins,
      ];
      if (!previous || !refs.every((ref, index) => ref === previous?.[index])) {
        const files = Object.freeze(collectRoomFiles(latest.room));
        view = Object.freeze({
          files,
          fingerprint: roomFileFingerprint(files),
        });
        previous = refs;
      }
      return view ?? null;
    },
    dispose,
  };
}
