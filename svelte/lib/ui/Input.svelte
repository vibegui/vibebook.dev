<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "./utils";
  let {
    value = $bindable(""),
    class: className,
    ref = $bindable(null),
    ...rest
  }: Omit<HTMLInputAttributes, "type" | "value" | "style" | "class"> & {
    type?:
      | "text"
      | "email"
      | "password"
      | "search"
      | "tel"
      | "url"
      | "date"
      | "datetime-local"
      | "time"
      | "month"
      | "week";
    value?: string;
    class?: string;
    ref?: HTMLInputElement | null;
  } = $props();
</script>

<input
  bind:this={ref}
  bind:value
  class={cn(
    "tw:h-9 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30",
    className,
  )}
  {...rest}
/>
