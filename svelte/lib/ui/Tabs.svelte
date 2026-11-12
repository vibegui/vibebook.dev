<script lang="ts">
  import { Tabs } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "./utils";
  export type TabItem = { value: string; label: string; disabled?: boolean };
  let {
    items,
    label,
    value = $bindable(""),
    onValueChange,
    children,
    class: className,
  }: {
    items: readonly TabItem[];
    label: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: Snippet<[string]>;
    class?: string;
  } = $props();
</script>

<Tabs.Root
  bind:value
  {onValueChange}
  class={cn(
    "tw:flex tw:min-h-0 tw:flex-col tw:gap-3 tw:font-sans tw:text-sm tw:text-foreground",
    className,
  )}
>
  <Tabs.List
    aria-label={label}
    class="tw:flex tw:shrink-0 tw:gap-1 tw:rounded-control tw:bg-muted tw:p-1"
  >
    {#each items as item (item.value)}
      <Tabs.Trigger
        type="button"
        value={item.value}
        disabled={item.disabled}
        class="tw:flex-1 tw:rounded-md tw:border tw:border-transparent tw:bg-transparent tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:leading-5 tw:text-muted-foreground tw:outline-none tw:transition-colors tw:hover:text-foreground tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-card tw:data-[state=active]:text-card-foreground tw:data-[state=active]:shadow-xs tw:motion-reduce:transition-none"
        >{item.label}</Tabs.Trigger
      >
    {/each}
  </Tabs.List>
  {#each items as item (item.value)}
    <Tabs.Content
      value={item.value}
      class="tw:min-h-0 tw:flex-1 tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring"
      >{@render children(item.value)}</Tabs.Content
    >
  {/each}
</Tabs.Root>
