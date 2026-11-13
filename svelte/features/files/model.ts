import type { PanelRoom, RoomFile } from "../../panels";
import { fileKind } from "../../panels";
export const fileKinds = [
  ["all", "Tudo"],
  ["img", "Imagens"],
  ["md", "Markdown"],
  ["txt", "Texto e CSV"],
  ["html", "HTML"],
  ["pdf", "PDF"],
  ["audio", "Áudios"],
  ["other", "Outros"],
] as const;
export function filesModel(room: PanelRoom, kind: string, directory: string) {
  const files = (room.files ?? [])
    .map((file, index) => ({ file, index }))
    .sort((a, b) => b.file.ts - a.file.ts || a.index - b.index)
    .map((x) => x.file);
  const counts: Record<string, number> = { all: files.length };
  for (const file of files) {
    const key = fileKind(file);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  const activeKind = counts[kind] ? kind : "all";
  const shown = files.filter(
    (file) => activeKind === "all" || fileKind(file) === activeKind,
  );
  const dirOf = (file: RoomFile) =>
    file.name.includes("/")
      ? file.name.slice(0, file.name.lastIndexOf("/"))
      : "";
  const dir =
    directory &&
    shown.some(
      (file) =>
        dirOf(file) === directory || dirOf(file).startsWith(directory + "/"),
    )
      ? directory
      : "";
  const prefix = dir ? dir + "/" : "";
  const folders = new Map<string, number>();
  const here: RoomFile[] = [];
  for (const file of shown) {
    const parent = dirOf(file);
    if (parent === dir) here.push(file);
    else if (parent.startsWith(prefix)) {
      const sub = parent.slice(prefix.length).split("/")[0];
      folders.set(sub, (folders.get(sub) ?? 0) + 1);
    }
  }
  const versions = new Map<string, number>();
  if (dir)
    for (const file of here)
      versions.set(file.name, (versions.get(file.name) ?? 0) + 1);
  const list = dir
    ? here.filter(
        (file, index) =>
          here.findIndex((other) => other.name === file.name) === index,
      )
    : here;
  return {
    counts,
    kind: activeKind,
    dir,
    prefix,
    list,
    versions,
    folders: [...folders].sort(([a], [b]) => a.localeCompare(b)),
  };
}
/** A tile targets an exact immutable upload, never a different version sharing its name. */
export function currentFile(
  room: PanelRoom,
  selected: RoomFile,
): RoomFile | undefined {
  return room.files?.find(
    (file) =>
      file.id === selected.id &&
      file.name === selected.name &&
      file.type === selected.type &&
      file.ts === selected.ts &&
      file.size === selected.size &&
      file.author === selected.author,
  );
}
