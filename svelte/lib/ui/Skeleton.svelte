<script lang="ts">
  import { cn } from "./utils";
  let { class: className }: { class?: string } = $props();
</script>

<div
  aria-hidden="true"
  class={cn(
    "tw:animate-pulse tw:rounded-control tw:bg-muted tw:motion-reduce:animate-none",
    className,
  )}
></div>
