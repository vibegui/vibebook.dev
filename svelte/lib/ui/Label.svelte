<script lang="ts">
  import type { HTMLLabelAttributes } from "svelte/elements";
  import { cn } from "./utils";
  let {
    children,
    class: className,
    ...rest
  }: Omit<HTMLLabelAttributes, "style" | "class"> & {
    class?: string;
  } = $props();
</script>

<label
  class={cn(
    "tw:font-sans tw:text-sm tw:font-medium tw:leading-5 tw:text-foreground",
    className,
  )}
  {...rest}>{@render children?.()}</label
>
