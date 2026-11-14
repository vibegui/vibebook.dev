<script lang="ts">
  import RoomShell from "../svelte/features/room-shell/RoomShell.svelte";
  import type { ApplicationRoomPresentation } from "../svelte/features/application/shellTypes";
  import type { RoomResources } from "../svelte/features/application/roomResources";
  import type { RoomScopeBrowser } from "../svelte/features/room-scope/types";
  import type { RoomLayoutBrowser } from "../svelte/features/room-layout/types";
  let {
    presentation,
    resources,
    browser,
    layoutBrowser,
  }: {
    presentation: ApplicationRoomPresentation;
    resources: RoomResources;
    browser: RoomScopeBrowser;
    layoutBrowser: RoomLayoutBrowser;
  } = $props();
</script>

<RoomShell {presentation} {resources} {browser} {layoutBrowser} />
