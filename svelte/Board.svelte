<script lang="ts">
  import type { PanelProps } from "./panels";
  import BoardPanel from "./features/board/BoardPanel.svelte";
  let props: PanelProps = $props();
</script>

{#key JSON.stringify([props.room.id, props.thread])}
  <BoardPanel {...props} />
{/key}
