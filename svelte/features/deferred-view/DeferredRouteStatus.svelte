<script lang="ts">
  import type { ComponentProps } from "svelte";
  import DeferredViewStatus from "./DeferredViewStatus.svelte";
  let props: ComponentProps<typeof DeferredViewStatus> = $props();
</script>

<svelte:head><title>vibebook</title></svelte:head>
<main aria-busy={props.phase === "idle" || props.phase === "loading"}>
  <DeferredViewStatus {...props} />
</main>
