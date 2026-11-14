<script lang="ts">
  import { onDestroy } from "svelte";
  import type { PwaService } from "./service";
  import { pwaText } from "./copy";
  import Button from "../../lib/ui/Button.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  let { owner, lang }: { owner: PwaService; lang: string } = $props();
  const view = $derived(owner.state);
  let active = true;
  onDestroy(() => {
    active = false;
  });
  const current = (event: Event) =>
    active &&
    event.currentTarget instanceof Element &&
    event.currentTarget.isConnected;
  const text = (key: Parameters<typeof pwaText>[1]) => pwaText(lang, key);
</script>

{#if !$view.standalone && !$view.dismissed && $view.coarse}
  <section
    data-vb-native
    data-native-install
    class="tw:mb-4 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-foreground"
  >
    <div class="tw:flex tw:items-center tw:gap-3">
      <img
        src="/icon-192.png"
        alt=""
        class="tw:size-10 tw:rounded-control"
      /><Heading class="tw:flex-1 tw:text-lg">{text("install")}</Heading
      ><IconButton
        icon="close"
        label={text("close")}
        onclick={(event) => {
          if (current(event)) owner.dismissInstall();
        }}
      />
    </div>
    <p class="tw:m-0 tw:text-muted-foreground">{text("benefits")}</p>
    {#if !$view.ios || $view.safari}<Button
        loading={$view.installBusy}
        onclick={(event) => {
          if (current(event)) void owner.install();
        }}>{$view.canInstall ? text("installNow") : text("how")}</Button
      >{/if}
    {#if $view.steps || ($view.ios && !$view.safari)}<p
        role="status"
        class="tw:m-0 tw:leading-6"
      >
        {$view.ios ? text("ios") : text("android")}
      </p>{/if}
    {#if $view.error === "install"}<p role="alert" class="tw:text-destructive">
        {text("failed")}
      </p>{/if}
  </section>{/if}
