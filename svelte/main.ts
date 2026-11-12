import { mount, unmount } from "svelte";
import Inbox from "./Inbox.svelte";

// Entry the vanilla app imports on demand (`import("/svelte/ui.js")`). Each mountX returns a function that unmounts.
export function mountInbox(target: Element, props: Record<string, unknown>) {
  const c = mount(Inbox, { target, props: props as never });
  return () => unmount(c);
}
