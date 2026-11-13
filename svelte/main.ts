import { flushSync, mount, unmount } from "svelte";
import type { Component, ComponentProps } from "svelte";
import { writable } from "svelte/store";
import View from "./View.svelte";
import Home from "./features/home/HomePanel.svelte";
import Archived from "./features/home/ArchivedPanel.svelte";
import AppNavigation from "./features/app-navigation/AppNavigation.svelte";
import Inbox from "./Inbox.svelte";
import InboxMount from "./InboxMount.svelte";
import Tasks from "./Tasks.svelte";
import Board from "./Board.svelte";
import Files from "./Files.svelte";
import FileViewer from "./features/file-viewer/FileViewer.svelte";
import ThreadFiles from "./features/file-viewer/ThreadFiles.svelte";
export { createFileViewer } from "./features/file-viewer/session";
export {
  fileTargetFromURL,
  knownViewerFiles,
  fileVersions,
} from "./features/file-viewer/model";
import Decisions from "./Decisions.svelte";
import Reminders from "./Reminders.svelte";
import Sidebar from "./Sidebar.svelte";
import Chat from "./Chat.svelte";
import Composer from "./Composer.svelte";
export { createComposerDrafts } from "./features/composer/drafts";
export { createRoomStore } from "./roomStore";
export { dismissDialogs } from "./lib/ui/dialogController";
const views = {
  home: Home,
  archived: Archived,
  appNavigation: AppNavigation,
  tasks: Tasks,
  board: Board,
  files: Files,
  fileViewer: FileViewer,
  threadFiles: ThreadFiles,
  reminders: Reminders,
  decisions: Decisions,
  sidebar: Sidebar,
  chat: Chat,
  composer: Composer,
};
type ViewName = keyof typeof views;
export function mountView<K extends ViewName>(
  kind: K,
  target: Element,
  props: ComponentProps<(typeof views)[K]>,
) {
  const values = writable<Record<string, unknown>>(props);
  // The component/props relation is checked at this API; the dynamic host only
  // forwards the already validated prop bag and never reads its fields.
  const component = views[kind] as unknown as Component<
    Record<string, unknown>
  >;
  const instance = flushSync(() =>
    mount(View, { target, props: { component, values } }),
  );
  return {
    update(next: ComponentProps<(typeof views)[K]>) {
      flushSync(() => values.set(next));
    },
    destroy() {
      flushSync(() => {
        void unmount(instance);
      });
    },
  };
}
export function mountInbox(
  target: Element,
  props: ComponentProps<typeof Inbox>,
) {
  const { waits, ...rest } = props;
  const values = writable(waits);
  const c = flushSync(() =>
    mount(InboxMount, { target, props: { props: rest, waits: values } }),
  );
  const destroy = () =>
    flushSync(() => {
      void unmount(c);
    });
  return Object.assign(destroy, {
    updateWaits(next: ComponentProps<typeof Inbox>["waits"]) {
      flushSync(() => values.set(next));
    },
  });
}

export { createPwaService } from "./features/pwa/service";
import type { PwaService } from "./features/pwa/service";
import NotificationBell from "./features/notifications/NotificationBell.svelte";
import InstallCard from "./features/pwa/InstallCard.svelte";
export function mountPwa(
  target: Element,
  kind: "bell" | "install",
  owner: PwaService,
  lang: string,
) {
  const instance = flushSync(() =>
    mount(kind === "bell" ? NotificationBell : InstallCard, {
      target,
      props: { owner, lang },
    }),
  );
  return () => {
    flushSync(() => {
      void unmount(instance);
    });
  };
}
export { pwaLogoutWarning, pwaLogoutFailure } from "./features/pwa/copy";

export { consumeFileViewerPop } from "./features/file-viewer/navigation";
