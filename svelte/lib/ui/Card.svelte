<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "./utils";
  let {
    title,
    description,
    children,
    class: className,
  }: {
    title?: string;
    description?: string;
    children: Snippet;
    class?: string;
  } = $props();
</script>

<section
  class={cn(
    "tw:space-y-4 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-5 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-xs",
    className,
  )}
>
  {#if title || description}<div class="tw:space-y-1">
      {#if title}<h2
          class="tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal"
        >
          {title}
        </h2>{/if}{#if description}<p
          class="tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground"
        >
          {description}
        </p>{/if}
    </div>{/if}
  {@render children()}
</section>
