import { createComposerDrafts } from "../composer/drafts";
import { createDocumentDrafts } from "../documents/session";

/** Drafts belong to this application/account, rather than a mounted room. */
export function createRoomResources() {
  const composer = createComposerDrafts();
  const documents = createDocumentDrafts();
  let active = true;
  return {
    composer,
    documents,
    reset() {
      if (!active) return;
      composer.reset();
      documents.clear();
    },
    dispose() {
      if (!active) return;
      active = false;
      composer.dispose();
      documents.clear();
    },
  };
}
export type RoomResources = ReturnType<typeof createRoomResources>;
