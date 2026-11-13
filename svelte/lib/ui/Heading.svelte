<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "./utils";
  let {
    level = 2,
    children,
    class: className,
    ...rest
  }: Omit<
    HTMLAttributes<HTMLHeadingElement>,
    "style" | "class" | "children"
  > & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: Snippet;
    class?: string;
  } = $props();
  const tag = $derived(`h${level}`);
</script>

<svelte:element
  this={tag}
  {...rest}
  class={cn(
    "tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal tw:[font-variation-settings:normal]",
    className,
  )}>{@render children()}</svelte:element
>
