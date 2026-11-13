<script lang="ts" generics="T">
  import { untrack } from "svelte";
  import type { Snippet } from "svelte";

  let { value, children }: { value: T; children: Snippet<[T]> } = $props();
  // Key this instance by value: connected old controls retain their original
  // identity while Svelte schedules replacement of the surrounding DOM.
  const captured = untrack(() => value);
</script>

{@render children(captured)}
