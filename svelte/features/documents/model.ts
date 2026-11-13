import type { Room } from "../../../shared/room";
export type DocumentMode = "preview" | "edit";
export type DocumentTarget = {
  account: string;
  roomId: string;
  epicId: string | null;
};
export const targetKey = (target: DocumentTarget) =>
  JSON.stringify([target.account, target.roomId, target.epicId]);
export function documentTarget(
  room: Room,
  thread: string,
  roomDocument: boolean,
): DocumentTarget {
  return {
    account: room.me,
    roomId: room.id,
    epicId:
      !roomDocument && room.epics.some((epic) => epic.id === thread)
        ? thread
        : null,
  };
}
export function documentText(room: Room, target: DocumentTarget) {
  if (!target.epicId) return room.doc ?? "";
  if (Object.hasOwn(room.docs ?? {}, target.epicId))
    return room.docs?.[target.epicId] ?? "";
  const epic = room.epics.find((epic) => epic.id === target.epicId);
  return epic
    ? `# ${epic.title}\n\n**Objetivo:** o que este épico entrega e por quê (edite aqui ou peça pro seu Claude).\n\n## Contexto\n\n- \n\n## Decisões\n\n- \n`
    : "";
}
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
function relative(value: unknown) {
  if (!record(value)) return null;
  const id = (raw: unknown) =>
    record(raw) &&
    Number.isSafeInteger(raw.client) &&
    Number(raw.client) >= 0 &&
    Number.isSafeInteger(raw.clock) &&
    Number(raw.clock) >= 0
      ? { client: Number(raw.client), clock: Number(raw.clock) }
      : undefined;
  const type = id(value.type),
    item = id(value.item),
    tname =
      typeof value.tname === "string" && value.tname.length <= 100
        ? value.tname
        : undefined;
  if (!type && !tname) return null;
  if (value.item !== undefined && value.item !== null && !item) return null;
  const assoc =
    Number.isSafeInteger(value.assoc) && Math.abs(Number(value.assoc)) <= 1
      ? Number(value.assoc)
      : 0;
  return {
    ...(type ? { type } : {}),
    ...(tname ? { tname } : {}),
    ...(item ? { item } : {}),
    assoc,
  };
}
/** Remote awareness is untrusted data, including values the vendor interpolates into CSS. */
export function safeAwareness(value: unknown): Record<string, unknown> {
  if (!record(value)) return {};
  const user = record(value.user) ? value.user : {};
  const name =
    typeof user.name === "string"
      ? user.name.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 80)
      : "Anonymous";
  const color =
    typeof user.color === "string" && /^#[0-9a-f]{6}$/i.test(user.color)
      ? user.color
      : "#30bced";
  const cursor = record(value.cursor) ? value.cursor : null,
    anchor = cursor && relative(cursor.anchor),
    head = cursor && relative(cursor.head);
  return {
    user: { name: name || "Anonymous", color, colorLight: `${color}33` },
    ...(anchor && head ? { cursor: { anchor, head } } : {}),
  };
}
