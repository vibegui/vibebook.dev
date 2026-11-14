<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { tv, type VariantProps } from "tailwind-variants/lite";
  import { cn } from "./utils";
  const variants = tv(
    {
      base: "tw:inline-flex tw:items-center tw:gap-1 tw:rounded-full tw:border tw:border-transparent tw:px-2 tw:py-0.5 tw:font-sans tw:text-xs tw:font-medium tw:leading-4",
      variants: {
        variant: {
          neutral: "tw:bg-muted tw:text-foreground",
          primary: "tw:bg-primary tw:text-primary-foreground",
          success: "tw:border-success/20 tw:bg-success/10 tw:text-foreground",
          warning: "tw:border-warning/20 tw:bg-warning/10 tw:text-foreground",
          destructive:
            "tw:border-destructive/20 tw:bg-destructive/10 tw:text-foreground",
        },
      },
      defaultVariants: { variant: "neutral" },
    },
    { twMerge: false },
  );
  let {
    children,
    variant,
    class: className,
    ...rest
  }: VariantProps<typeof variants> &
    Omit<HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class"> & {
      children?: Snippet;
      class?: string;
    } = $props();
</script>

<span {...rest} class={cn(variants({ variant }), className)}
  >{@render children?.()}</span
>
