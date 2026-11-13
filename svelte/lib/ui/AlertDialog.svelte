<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { buttonVariants } from "./button";
  import { registerDialog } from "./dialogController";
  let {
    open = $bindable(false),
    title,
    description,
    confirmLabel,
    cancelLabel,
    busy = false,
    error = "",
    onconfirm,
    onOpenChange,
    returnFocus,
  }: {
    open?: boolean;
    title: string;
    description?: string;
    confirmLabel: string;
    cancelLabel: string;
    busy?: boolean;
    error?: string;
    onconfirm: () => void;
    onOpenChange?: (open: boolean) => void;
    returnFocus?: () => HTMLElement | null;
  } = $props();
  let cancelButton = $state<HTMLButtonElement | null>(null);
  $effect(() => {
    if (open)
      return registerDialog(() => {
        open = false;
        onOpenChange?.(false);
      });
  });
</script>

<AlertDialog.Root bind:open {onOpenChange}>
  <AlertDialog.Portal>
    <AlertDialog.Overlay
      data-vb-native
      class="tw:fixed tw:inset-0 tw:z-40 tw:m-0 tw:box-border tw:bg-scrim"
    />
    <AlertDialog.Content
      data-vb-native
      preventScroll={false}
      preventBodyPointerEvents={false}
      preventOverflowTextSelection={false}
      onOpenAutoFocus={(event) => {
        event.preventDefault();
        cancelButton?.focus();
      }}
      onCloseAutoFocus={(event) => {
        const target = returnFocus?.();
        if (target?.isConnected) {
          event.preventDefault();
          target.focus();
        }
      }}
      onEscapeKeydown={(event) => {
        if (busy) event.preventDefault();
      }}
      class="tw:fixed tw:left-1/2 tw:top-1/2 tw:z-50 tw:m-0 tw:box-border tw:flex tw:max-h-[90dvh] tw:w-[calc(100%-2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:flex-col tw:gap-4 tw:overflow-auto tw:rounded-surface tw:border tw:border-solid tw:border-border tw:bg-card tw:p-6 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg tw:outline-none"
    >
      <AlertDialog.Title
        class="tw:m-0 tw:text-lg tw:font-semibold tw:leading-6 tw:tracking-tight"
        >{title}</AlertDialog.Title
      >
      {#if description}<AlertDialog.Description
          class="tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-sm tw:text-muted-foreground"
          >{description}</AlertDialog.Description
        >{/if}
      {#if error}<p role="alert" class="tw:m-0 tw:text-sm tw:text-destructive">
          {error}
        </p>{/if}
      <div class="tw:flex tw:flex-wrap tw:justify-end tw:gap-2">
        <AlertDialog.Cancel
          bind:ref={cancelButton}
          disabled={busy}
          class={buttonVariants({ variant: "outline" })}
          >{cancelLabel}</AlertDialog.Cancel
        >
        <AlertDialog.Action
          disabled={busy}
          aria-busy={busy || undefined}
          onclick={(event) => {
            event.preventDefault();
            onconfirm();
          }}
          class={buttonVariants({ variant: "destructive" })}
          >{confirmLabel}</AlertDialog.Action
        >
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
