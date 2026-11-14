<script lang="ts">
  import RoomLayoutFrame from "./RoomLayoutFrame.svelte";
  import type { RoomLayoutProps } from "./types";
  let props: RoomLayoutProps = $props();
</script>

{#key props.controller}<RoomLayoutFrame {...props} />{/key}
