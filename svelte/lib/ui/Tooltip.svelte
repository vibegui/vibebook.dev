<script lang="ts">
  import { Tooltip } from "bits-ui";
  import type { Snippet } from "svelte";
  import { buttonVariants } from "./button";
  let { label, children }: { label: string; children: Snippet } = $props();
</script>

<Tooltip.Provider delayDuration={250}>
  <Tooltip.Root>
    <Tooltip.Trigger
      type="button"
      aria-label={label}
      class={buttonVariants({ variant: "ghost", size: "icon" })}
      >{@render children()}</Tooltip.Trigger
    >
    <Tooltip.Portal>
      <Tooltip.Content
        data-vb-native
        sideOffset={6}
        class="tw:z-50 tw:m-0 tw:box-border tw:max-w-xs tw:rounded-control tw:border tw:border-solid tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:font-sans tw:text-xs tw:leading-4 tw:text-popover-foreground tw:shadow-md"
        >{label}</Tooltip.Content
      >
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
