<script lang="ts">
  import { iconPaths, type IconName } from "./icons";
  import { cn } from "./utils";
  let { name, class: className }: { name: IconName; class?: string } = $props();
</script>

<svg
  aria-hidden="true"
  focusable="false"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.75"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={cn("tw:size-4 tw:shrink-0", className)}
>
  {#each iconPaths[name] as d}<path {d} />{/each}
</svg>
