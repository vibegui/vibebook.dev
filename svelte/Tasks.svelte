<script lang="ts">
  import TaskList from "./TaskList.svelte";
  import type { PanelProps } from "./panels";

  let props: PanelProps = $props();
</script>

<!-- Drafts and active edits belong to one room/thread, while live updates in
     that same scope preserve the existing editor and input state. -->
{#key JSON.stringify([props.room.id, props.thread])}
  <TaskList {...props} />
{/key}
