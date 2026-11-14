import { fileTargetFromRoomURL } from "./model";
import type { FileViewer } from "./session";
/** Only an owned, matching overlay can be adopted; every validated file route
 * bypasses the old sheet pop handler so Back/Forward still reaches its file. */
export function consumeFileViewerPop(
  viewer: FileViewer | null,
  scope: { roomId: string; account: string; thread: string } | null,
  sheetPop: () => boolean,
  href: string,
): boolean {
  const outcome = viewer?.popOutcome() ?? "none";
  if (outcome === "handled") return true;
  if (fileTargetFromRoomURL(href))
    return viewer?.restoreHistory(scope) ?? false;
  return outcome === "route" ? false : sheetPop();
}
