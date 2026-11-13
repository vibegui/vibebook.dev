import { mount, unmount } from "svelte";
import Gallery from "./Gallery.svelte";

export function mountGallery(target: Element) {
  const instance = mount(Gallery, { target });
  return () => unmount(instance);
}
