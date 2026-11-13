import * as z from "zod/mini";
import type { Attachment, Room } from "../../../shared/room";
export const FileTarget = z.object({
  roomId: z.string().check(z.regex(/^[a-z0-9]{6,40}$/)),
  id: z.string().check(z.regex(/^[0-9a-f]{1,64}$/)),
});
export type FileTarget = z.infer<typeof FileTarget>;
export type ViewerKind =
  "image" | "audio" | "markdown" | "csv" | "text" | "html" | "pdf" | "download";
export type ViewerInput = FileTarget & {
  metadata?: Attachment;
  label?: string;
};
export function fileTargetFromRoomURL(value: string): FileTarget | null {
  try {
    const url = new URL(value);
    const room = /^\/b\/([a-z0-9]{6,40})\/?$/.exec(url.pathname)?.[1];
    const file = /^#f([0-9a-f]{1,64})$/.exec(url.hash)?.[1];
    const parsed = FileTarget.safeParse({ roomId: room, id: file });
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
export function fileTargetFromURL(
  value: string | URL,
  origin: string,
): FileTarget | null {
  try {
    const url = new URL(value, origin);
    if (url.origin !== new URL(origin).origin) return null;
    const match = /^\/api\/books\/([^/]+)\/files\/([^/]+)$/.exec(url.pathname);
    if (!match) return null;
    const parsed = FileTarget.safeParse({
      roomId: decodeURIComponent(match[1]!),
      id: decodeURIComponent(match[2]!),
    });
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
export function fileURL(input: FileTarget, escape = false) {
  const target = FileTarget.parse(input);
  return `/api/books/${target.roomId}/files/${target.id}?ui=svelte${escape ? "&esc=1" : ""}`;
}
export function fileRoomURL(input: FileTarget) {
  const target = FileTarget.parse(input);
  return `/b/${target.roomId}?ui=svelte#f${target.id}`;
}
export function sameFile(a: Attachment, b: Attachment) {
  return (
    a.id === b.id &&
    a.name === b.name &&
    a.type === b.type &&
    a.size === b.size &&
    a.ts === b.ts &&
    a.author === b.author
  );
}
/** Upload timestamps retain version order when an old file is attached to a newer message. */
export function knownViewerFiles(
  room: Pick<Room, "files" | "messages" | "origins"> &
    Partial<Pick<Room, "filesAll">>,
) {
  const files = new Map<string, Attachment>();
  for (const file of room.files || []) files.set(file.id, file);
  if (!room.filesAll)
    for (const message of [...room.messages, ...(room.origins || [])])
      for (const file of message.files || [])
        if (!files.has(file.id)) files.set(file.id, file);
  return [...files.values()];
}
export function fileVersions(
  room: Pick<Room, "files" | "messages" | "origins"> &
    Partial<Pick<Room, "filesAll">>,
  name: string,
) {
  return knownViewerFiles(room)
    .filter((file) => file.name === name)
    .map((file, index) => ({ file, index }))
    .sort((a, b) => b.file.ts - a.file.ts || a.index - b.index)
    .map((item) => item.file);
}
export function viewerKind(type: string, name: string): ViewerKind {
  const mime = type.split(";")[0]!.trim().toLowerCase();
  if (mime.startsWith("image/") && mime !== "image/svg+xml") return "image";
  if (mime.startsWith("audio/")) return "audio";
  if (mime === "text/html") return "html";
  if (mime === "application/pdf") return "pdf";
  if (
    mime === "text/markdown" ||
    (mime === "text/plain" && /\.(md|markdown)$/i.test(name))
  )
    return "markdown";
  if (mime === "text/csv" || (mime === "text/plain" && /\.csv$/i.test(name)))
    return "csv";
  if (mime === "text/plain") return "text";
  return "download";
}
/** Bounded data projection, never HTML or a cloned live table. */
export function csvData(text: string, maxRows = 2000, maxColumns = 50) {
  const rows: string[][] = [];
  let row: string[] = [],
    cell = "",
    quoted = false,
    truncated = false,
    index = 0;
  const delimiter = text.slice(0, 200).includes(",") ? "," : ";";
  const pushCell = () => {
    if (row.length < maxColumns) row.push(cell.replace(/\r$/, ""));
    else truncated = true;
    cell = "";
  };
  for (; index < text.length && rows.length < maxRows; index++) {
    const char = text[index];
    if (quoted) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          cell += '"';
          index++;
        } else quoted = false;
      } else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === delimiter) pushCell();
    else if (char === "\n") {
      pushCell();
      rows.push(row);
      row = [];
    } else cell += char;
  }
  if (index < text.length) truncated = true;
  if (rows.length < maxRows && (cell || row.length)) {
    pushCell();
    rows.push(row);
  }
  return { rows, truncated };
}
export function csvRows(text: string, maxRows = 2000, maxColumns = 50) {
  return csvData(text, maxRows, maxColumns).rows;
}
export function externalFileURL(
  target: FileTarget,
  origin: string,
  iosStandalone: boolean,
) {
  const url = new URL(fileURL(target), origin).href;
  return iosStandalone && url.startsWith("https:") ? `x-safari-${url}` : url;
}
