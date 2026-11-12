<script lang="ts">
  import { cn } from "./utils";
  let {
    vertical = false,
    class: className,
  }: { vertical?: boolean; class?: string } = $props();
</script>

<div
  role="separator"
  aria-orientation={vertical ? "vertical" : "horizontal"}
  class={cn(
    "tw:shrink-0 tw:bg-border",
    vertical ? "tw:h-full tw:w-px" : "tw:h-px tw:w-full",
    className,
  )}
></div>
