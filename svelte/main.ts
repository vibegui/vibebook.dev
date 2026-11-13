import { flushSync, mount, unmount } from "svelte";
import type { Component, ComponentProps } from "svelte";
import { writable } from "svelte/store";
import View from "./View.svelte";
import Inbox from "./Inbox.svelte";
import InboxMount from "./InboxMount.svelte";
import Tasks from "./Tasks.svelte";
import Board from "./Board.svelte";
import Files from "./Files.svelte";
import Decisions from "./Decisions.svelte";
import Reminders from "./Reminders.svelte";
import Sidebar from "./Sidebar.svelte";
import Chat from "./Chat.svelte";
export { createRoomStore } from "./roomStore";
export { dismissDialogs } from "./lib/ui/dialogController";
const views = {
  tasks: Tasks,
  board: Board,
  files: Files,
  reminders: Reminders,
  decisions: Decisions,
  sidebar: Sidebar,
  chat: Chat,
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
