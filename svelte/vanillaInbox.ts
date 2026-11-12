import { mount, unmount, type ComponentProps } from "svelte";
import Inbox from "./Inbox.svelte";

/** Preserve the small on-demand Inbox entry used by the vanilla app. */
export function mountInbox(
  target: Element,
  props: ComponentProps<typeof Inbox>,
) {
  const instance = mount(Inbox, { target, props });
  return () => unmount(instance);
}
