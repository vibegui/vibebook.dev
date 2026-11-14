<script lang="ts">
  import type { ComposerProps } from "./features/composer/types";
  import NativeComposer from "./features/composer/NativeComposer.svelte";
  let props: ComposerProps = $props();
</script>

{#key props.drafts}{#key `${props.room.me}:${props.room.id}:${props.thread}`}<NativeComposer
      {...props}
    />{/key}{/key}
