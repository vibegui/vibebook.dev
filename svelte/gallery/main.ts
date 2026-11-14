import { mount, unmount } from "svelte";
import Gallery from "./Gallery.svelte";
import RoomLayoutFixture from "./RoomLayoutFixture.svelte";

export function mountGallery(target: Element) {
  const instance = mount(new URLSearchParams(location.search).get("probe") === "room-layout" ? RoomLayoutFixture : Gallery, { target });
  return () => unmount(instance);
}
