<script lang="ts">
  import { cn } from "./utils";
  let {
    name,
    src,
    class: className,
  }: { name: string; src?: string; class?: string } = $props();
  let failed = $state(false);
  $effect(() => {
    void src;
    failed = false;
  });
  const initials = $derived(
    name
      .trim()
      .split(/[\s@._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => Array.from(part)[0])
      .join("")
      .toLocaleUpperCase(),
  );
</script>

<span
  aria-hidden="true"
  class={cn(
    "tw:inline-grid tw:size-8 tw:shrink-0 tw:place-items-center tw:overflow-hidden tw:rounded-full tw:border tw:border-border tw:bg-muted tw:font-sans tw:text-xs tw:font-medium tw:text-foreground",
    className,
  )}
>
  {#if src && !failed}<img
      {src}
      alt=""
      class="tw:size-full tw:object-cover"
      onerror={() => {
        failed = true;
      }}
    />{:else}{initials || "?"}{/if}
</span>
