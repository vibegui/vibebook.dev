<script lang="ts">
  import type { ComponentProps } from "svelte";
  import PeoplePanel from "./features/people/PeoplePanel.svelte";
  let { room, ...rest }: ComponentProps<typeof PeoplePanel> = $props();
</script>

{#key room.id}<PeoplePanel {room} {...rest} />{/key}
