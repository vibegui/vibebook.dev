<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "./utils";
  let {
    checked = $bindable(false),
    class: className,
    onchange,
    onCheckedChange,
    ...rest
  }: Omit<
    HTMLInputAttributes,
    "type" | "checked" | "value" | "style" | "class" | "role" | "aria-checked"
  > & {
    checked?: boolean;
    value?: string;
    class?: string;
    onCheckedChange?: (checked: boolean) => void;
  } = $props();
</script>

<span class="tw:relative tw:inline-flex tw:shrink-0 tw:align-middle">
  <input
    type="checkbox"
    role="switch"
    aria-checked={checked}
    bind:checked
    {...rest}
    onchange={(event) => {
      onchange?.(event);
      onCheckedChange?.(event.currentTarget.checked);
    }}
    class={cn(
      "tw:m-0 tw:h-5 tw:w-9 tw:appearance-none tw:rounded-full tw:border tw:border-transparent tw:bg-input tw:p-0 tw:outline-none tw:transition-colors tw:checked:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:motion-reduce:transition-none",
      className,
    )}
  />
  <span
    aria-hidden="true"
    class={cn(
      "tw:pointer-events-none tw:absolute tw:left-0.5 tw:top-0.5 tw:size-4 tw:rounded-full tw:bg-card tw:shadow-xs tw:transition-transform tw:motion-reduce:transition-none",
      checked ? "tw:translate-x-4" : "tw:translate-x-0",
    )}
  ></span>
</span>
