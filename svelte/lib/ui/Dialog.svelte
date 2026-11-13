<script lang="ts">
  import { Dialog } from "bits-ui";
  import type { Snippet } from "svelte";
  import Icon from "./Icon.svelte";
  import { buttonVariants } from "./button";
  import { cn } from "./utils";
  import { registerDialog } from "./dialogController";
  let {
    open = $bindable(false),
    title,
    description,
    trigger,
    children,
    closeLabel,
    sheet = false,
    onOpenChange,
    initialFocus,
  }: {
    open?: boolean;
    title: string;
    description?: string;
    trigger?: Snippet;
    children: Snippet;
    closeLabel: string;
    sheet?: boolean;
    onOpenChange?: (open: boolean) => void;
    initialFocus?: () => HTMLElement | null;
  } = $props();
  $effect(() => {
    if (open)
      return registerDialog(() => {
        open = false;
        onOpenChange?.(false);
      });
  });
</script>

<Dialog.Root bind:open {onOpenChange}>
  {#if trigger}<Dialog.Trigger
      type="button"
      class={buttonVariants({ variant: "outline" })}
      >{@render trigger()}</Dialog.Trigger
    >{/if}
  <Dialog.Portal>
    <Dialog.Overlay
      data-vb-native
      class="tw:fixed tw:inset-0 tw:z-40 tw:m-0 tw:box-border tw:bg-scrim"
    />
    <Dialog.Content
      data-vb-native
      onOpenAutoFocus={(event) => {
        const target = initialFocus?.();
        if (target) {
          event.preventDefault();
          target.focus();
        }
      }}
      preventScroll={false}
      preventBodyPointerEvents={false}
      preventOverflowTextSelection={false}
      class={cn(
        "tw:fixed tw:z-50 tw:m-0 tw:box-border tw:flex tw:max-h-[90dvh] tw:flex-col tw:gap-4 tw:overflow-auto tw:border tw:border-solid tw:border-border tw:bg-card tw:p-6 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg tw:outline-none",
        sheet
          ? "tw:inset-x-0 tw:bottom-0 tw:rounded-t-surface tw:sm:inset-y-0 tw:sm:left-auto tw:sm:right-0 tw:sm:max-h-none tw:sm:w-96 tw:sm:rounded-none"
          : "tw:left-1/2 tw:top-1/2 tw:w-[calc(100%-2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:rounded-surface",
      )}
    >
      <div class="tw:flex tw:items-start tw:gap-3">
        <div class="tw:min-w-0 tw:flex-1 tw:space-y-1">
          <Dialog.Title
            class="tw:m-0 tw:font-sans tw:text-lg tw:font-semibold tw:leading-6 tw:tracking-tight"
            >{title}</Dialog.Title
          >
          {#if description}<Dialog.Description
              class="tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground"
              >{description}</Dialog.Description
            >{/if}
        </div>
        <Dialog.Close
          type="button"
          aria-label={closeLabel}
          class={buttonVariants({ variant: "ghost", size: "icon" })}
          ><Icon name="close" /></Dialog.Close
        >
      </div>
      {@render children()}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
