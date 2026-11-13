<script lang="ts">
  import type { HTMLProgressAttributes } from "svelte/elements";
  import { cn } from "./utils";
  let {
    value,
    max = 100,
    label,
    class: className,
    ...rest
  }: Omit<
    HTMLProgressAttributes,
    "value" | "max" | "style" | "class" | "aria-label"
  > & {
    value: number;
    max?: number;
    label: string;
    class?: string;
  } = $props();
  const limit = $derived(Number.isFinite(max) && max > 0 ? max : 100);
  const current = $derived(
    Number.isFinite(value) ? Math.min(limit, Math.max(0, value)) : 0,
  );
</script>

<progress
  {...rest}
  max={limit}
  value={current}
  aria-label={label}
  class={cn(
    "tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary",
    className,
  )}>{current}/{limit}</progress
>
