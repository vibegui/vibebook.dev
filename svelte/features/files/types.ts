import type { PanelProps, RoomFile } from "../../panels";
import type { Room } from "../../roomStore";
import type { FilesSession, FileRequest } from "./session";
export type FilesRoom = PanelProps["room"] & Pick<Room, "filesAll">;
export type FilesProps = Omit<PanelProps, "room"> & {
  room: FilesRoom;
  session: FilesSession;
  request: FileRequest;
  onfolderchange: () => void;
  /** Explicit legacy viewer boundary; the selected immutable upload has been revalidated. */
  onopenfile: (file: RoomFile) => void;
};
