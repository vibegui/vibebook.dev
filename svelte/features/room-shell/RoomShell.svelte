<script lang="ts">
  import { untrack } from "svelte";
  import type { ApplicationRoomPresentation } from "../application/shellTypes";
  import type { RoomResources } from "../application/roomResources";
  import type { RoomScopeBrowser } from "../room-scope/types";
  import type { RoomLayoutBrowser } from "../room-layout/types";
  import RoomScene from "./RoomScene.svelte";
  import RoomStatus from "./RoomStatus.svelte";
  let {
    presentation,
    resources,
    browser,
    layoutBrowser,
  }: {
    presentation: ApplicationRoomPresentation;
    resources: RoomResources;
    browser?: RoomScopeBrowser;
    layoutBrowser?: RoomLayoutBrowser;
  } = $props();
  const root = untrack(() => presentation.services.rootRoom.state),
    application = untrack(() => presentation.services.state);
  const authorized = $derived.by(() => {
    $root.generation;
    $root.room;
    $root.connection;
    $application.navigationGeneration;
    $application.sessionDenied;
    return presentation.services.roomScope();
  });
</script>

{#if authorized}{#key JSON.stringify( [authorized.roomId, authorized.account, authorized.identityRevision, authorized.roomGeneration] )}
    <RoomScene
      {presentation}
      {resources}
      scope={authorized}
      {browser}
      {layoutBrowser}
    />
  {/key}{:else}<RoomStatus
    snapshot={$root}
    services={presentation.services}
  />{/if}
