<script lang="ts">
  import type { ComponentProps } from "svelte";
  import type { Readable } from "svelte/store";
  import Inbox from "./Inbox.svelte";
  let {
    props,
    waits,
  }: {
    props: Omit<ComponentProps<typeof Inbox>, "waits">;
    waits: Readable<ComponentProps<typeof Inbox>["waits"]>;
  } = $props();
</script>

<Inbox {...props} waits={$waits} />
