<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import Icon from "./Icon.svelte";
  import { cn } from "./utils";
  let {
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    onchange,
    onCheckedChange,
    ...rest
  }: Omit<
    HTMLInputAttributes,
    "type" | "checked" | "value" | "style" | "class"
  > & {
    checked?: boolean;
    indeterminate?: boolean;
    value?: string;
    class?: string;
    onCheckedChange?: (checked: boolean) => void;
  } = $props();
</script>

<span class="tw:relative tw:inline-flex tw:shrink-0 tw:align-middle">
  <input
    type="checkbox"
    bind:checked
    bind:indeterminate
    {...rest}
    onchange={(event) => {
      onchange?.(event);
      onCheckedChange?.(event.currentTarget.checked);
    }}
    class={cn(
      "tw:m-0 tw:size-4 tw:shrink-0 tw:appearance-none tw:rounded-sm tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:checked:bg-primary tw:indeterminate:border-primary tw:indeterminate:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive",
      className,
    )}
  />
  {#if checked || indeterminate}<span
      aria-hidden="true"
      class="tw:pointer-events-none tw:absolute tw:inset-0 tw:grid tw:place-items-center tw:text-primary-foreground"
      >{#if indeterminate}<span class="tw:h-0.5 tw:w-2 tw:bg-current"
        ></span>{:else}<Icon name="check" class="tw:size-3" />{/if}</span
    >{/if}
</span>
