<script lang="ts">
  import { Dialog } from "bits-ui";
  import { untrack } from "svelte";
  import Button from "../../lib/ui/Button.svelte";
  import type { DeviceLock } from "./device";
  let { owner, lang }: { owner: DeviceLock; lang: string } = $props();
  const view = untrack(() => owner.state);
  const en = $derived(lang === "en");
  let button: HTMLButtonElement | null = $state(null);
</script>

<Dialog.Root open={$view.locked}>
  <Dialog.Portal>
    <Dialog.Content
      data-vb-native
      data-device-lock
      onEscapeKeydown={(event) => event.preventDefault()}
      onInteractOutside={(event) => event.preventDefault()}
      onOpenAutoFocus={(event) => {
        event.preventDefault();
        button?.focus();
      }}
      class="tw:fixed tw:inset-0 tw:z-[9999] tw:m-0 tw:grid tw:place-content-center tw:justify-items-center tw:gap-4 tw:bg-background tw:p-6 tw:font-sans tw:text-foreground tw:outline-none"
    >
      <img
        src="/favicon.svg"
        width="64"
        height="64"
        alt=""
        class="tw:rounded-control"
      />
      <Dialog.Title class="tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold"
        >vibebook</Dialog.Title
      >
      <Dialog.Description class="tw:text-sm tw:text-muted-foreground"
        >{en
          ? "Unlock this device to continue."
          : "Desbloqueie este aparelho para continuar."}</Dialog.Description
      >
      <Button
        bind:ref={button}
        disabled={$view.busy || !$view.supported}
        onclick={(event) => {
          if (event.currentTarget.isConnected) void owner.unlock();
        }}>{en ? "Unlock with Face ID" : "Desbloquear com Face ID"}</Button
      >
      {#if !$view.supported}<p
          role="alert"
          class="tw:text-sm tw:text-destructive"
        >
          {en
            ? "Device authentication is unavailable in this browser."
            : "A autenticação do aparelho não está disponível neste navegador."}
        </p>{/if}
      {#if $view.error}<p role="alert" class="tw:text-sm tw:text-destructive">
          {en
            ? "Could not unlock. Tap to try again."
            : "Não deu para desbloquear. Toque para tentar de novo."}
        </p>{/if}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
