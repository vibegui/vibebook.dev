<script lang="ts">
  import type { Component } from "svelte";
  import type { Writable } from "svelte/store";
  let {
    component: Current,
    values,
  }: {
    component: Component<Record<string, unknown>>;
    values: Writable<Record<string, unknown>>;
  } = $props();
</script>

<Current {...$values} />
