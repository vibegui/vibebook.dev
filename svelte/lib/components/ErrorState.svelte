<script lang="ts">
  import Button from "../ui/Button.svelte";
  import Icon from "../ui/Icon.svelte";
  import { cn } from "../ui/utils";
  let {
    title,
    description,
    compact = false,
    onretry,
    retryLabel,
  }: { title: string; description?: string; compact?: boolean } & (
    | { onretry: () => void; retryLabel: string }
    | { onretry?: never; retryLabel?: never }
  ) = $props();
</script>

<div
  role="alert"
  class={cn(
    "tw:flex tw:items-start tw:gap-3 tw:rounded-control tw:border tw:border-destructive/20 tw:bg-destructive/10 tw:font-sans tw:text-sm tw:text-foreground",
    compact ? "tw:p-3" : "tw:p-5",
  )}
>
  <Icon name="warning" class="tw:mt-0.5 tw:text-destructive" />
  <div class="tw:min-w-0 tw:flex-1 tw:space-y-1">
    <p class="tw:m-0 tw:font-medium">{title}</p>
    {#if description}<p class="tw:m-0 tw:leading-5 tw:text-foreground">
        {description}
      </p>{/if}{#if onretry && retryLabel}<Button
        variant="outline"
        size="sm"
        onclick={onretry}>{retryLabel}</Button
      >{/if}
  </div>
</div>
