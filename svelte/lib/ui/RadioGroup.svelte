<script lang="ts">
  import { cn } from "./utils";
  const uid = $props.id();
  let {
    value = $bindable(""),
    label,
    name = uid,
    items,
    disabled = false,
    onValueChange,
    class: className,
  }: {
    value?: string;
    label: string;
    name?: string;
    items: readonly { value: string; label: string; disabled?: boolean }[];
    disabled?: boolean;
    onValueChange?: (value: string) => void;
    class?: string;
  } = $props();
</script>

<div
  role="radiogroup"
  aria-label={label}
  class={cn(
    "tw:grid tw:grid-cols-1 tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground",
    className,
  )}
>
  {#each items as item (item.value)}
    <label class="tw:flex tw:items-center tw:gap-2">
      <span class="tw:relative tw:inline-flex tw:size-4 tw:shrink-0">
        <input
          type="radio"
          {name}
          value={item.value}
          disabled={disabled || item.disabled}
          bind:group={value}
          onchange={() => onValueChange?.(item.value)}
          class="tw:m-0 tw:size-4 tw:appearance-none tw:rounded-full tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:opacity-50"
        />
        {#if value === item.value}<span
            aria-hidden="true"
            class="tw:pointer-events-none tw:absolute tw:inset-1 tw:rounded-full tw:bg-primary"
          ></span>{/if}
      </span>
      <span>{item.label}</span>
    </label>
  {/each}
</div>
