<script lang="ts">
  import type { PanelProps } from "./panels";
  import DecisionsPanel from "./features/decisions/DecisionsPanel.svelte";
  let { room, vb, request }: PanelProps = $props();
</script>

{#key room.id}<DecisionsPanel {room} {vb} {request} />{/key}
