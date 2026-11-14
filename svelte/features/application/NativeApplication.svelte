<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import AppShell from "./AppShell.svelte";
  import RoomShell from "../room-shell/RoomShell.svelte";
  import { createBrowserApplicationServices } from "./browser";
  import { createRoomResources } from "./roomResources";

  let {
    browser = window,
    document: doc = document,
    shellVersion,
  }: {
    browser?: Window & typeof globalThis;
    document?: Document;
    shellVersion: string | null;
  } = $props();
  const resources = untrack(createRoomResources);
  const services = untrack(() => createBrowserApplicationServices({
    window: browser,
    document: doc,
    shellVersion,
    onIdentityReset: resources.reset,
  }));
  onDestroy(() => {
    // Invalidate room actors before clearing their account-owned draft banks.
    services.dispose();
    resources.dispose();
  });
</script>

<AppShell {services}>
  {#snippet roomSnippet(presentation)}
    <RoomShell {presentation} {resources} />
  {/snippet}
</AppShell>
