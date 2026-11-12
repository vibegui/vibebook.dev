<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";
  import { cn } from "./utils";
  let {
    value = $bindable(""),
    items,
    class: className,
    ...rest
  }: Omit<
    HTMLSelectAttributes,
    "value" | "multiple" | "style" | "class" | "children"
  > & {
    value?: string;
    items: readonly { value: string; label: string; disabled?: boolean }[];
    class?: string;
  } = $props();
</script>

<select
  bind:value
  {...rest}
  class={cn(
    "tw:h-9 tw:w-full tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:opacity-50 tw:aria-invalid:border-destructive",
    className,
  )}
>
  {#each items as item (item.value)}<option
      value={item.value}
      disabled={item.disabled}>{item.label}</option
    >{/each}
</select>
