<script lang="ts">
  import Badge from "../../lib/ui/Badge.svelte";
  import { waitIndicator, type WaitReference } from "./model";
  let {
    waits,
    label,
    taskLabel,
    class: className = "",
  }: {
    waits: readonly WaitReference[];
    label: (count: number) => string;
    taskLabel: string;
    class?: string;
  } = $props();
  const indicator = $derived(waitIndicator(waits));
</script>

{#if indicator.asks}<Badge
    data-wait-kind="asks"
    variant={indicator.claude ? "destructive" : "warning"}
    aria-label={label(indicator.asks)}
    title={label(indicator.asks)}
    class={className}>{indicator.asks}</Badge
  >{:else if indicator.tasks}<span
    data-wait-kind="tasks"
    role="img"
    aria-label={taskLabel}
    title={taskLabel}
    class={[
      "tw:inline-block tw:size-2 tw:shrink-0 tw:rounded-full tw:bg-warning",
      className,
    ]}
  ></span>{/if}
