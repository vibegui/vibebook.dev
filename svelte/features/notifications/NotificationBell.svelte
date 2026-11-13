<script lang="ts">
  import { onDestroy } from "svelte";
  import type { PwaService } from "../pwa/service";
  import { pwaText, pwaPermission } from "../pwa/copy";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  let { owner, lang }: { owner: PwaService; lang: string } = $props();
  const view = owner.state,
    push = owner.push;
  let open = $state(false),
    active = true;
  onDestroy(() => {
    active = false;
  });
  const current = (event: Event) =>
    active &&
    event.currentTarget instanceof Element &&
    event.currentTarget.isConnected;
  const text = (key: Parameters<typeof pwaText>[1], n?: number) =>
    pwaText(lang, key, n);
  const label = $derived(
    $view.permission === "granted"
      ? text($view.muted ? "off" : "on")
      : text("enable"),
  );
</script>

<span
  data-vb-native
  data-native-notifications
  class="tw:inline-flex tw:items-center tw:gap-1 tw:font-sans tw:text-sm tw:text-foreground"
>
  <Button
    variant="ghost"
    size="sm"
    aria-label={label}
    title={label}
    onclick={(event) => {
      if (!active || !event.currentTarget.isConnected) return;
      void owner.bell().then((success) => {
        if (active && !success) open = true;
      });
    }}><Icon name={$view.muted ? "bellOff" : "bell"} /></Button
  >
  <Button
    variant="ghost"
    size="sm"
    aria-label={text("help")}
    title={text("help")}
    onclick={(event) => {
      if (!current(event)) return;
      open = true;
      void owner.refresh();
    }}>⋯</Button
  >
</span>
<Dialog bind:open title={text("settings")} closeLabel={text("close")}>
  <p class="tw:m-0">
    {text("permission")}: {pwaPermission(lang, $view.permission)}
  </p>
  {#if $view.iosWeb}<p class="tw:m-0 tw:leading-6">
      {text("ios")}
    </p>{:else if $view.permission === "denied"}<p class="tw:m-0 tw:leading-6">
      {text("denied")}
    </p>{:else if $view.permission === "unsupported"}<p class="tw:m-0">
      {text("unsupported")}
    </p>{:else if $view.permission === "default"}<Button
      onclick={(event) => {
        if (active && event.currentTarget.isConnected) void owner.bell();
      }}>{text("enable")}</Button
    >{/if}
  <label class="tw:flex tw:items-center tw:gap-2"
    ><input
      type="checkbox"
      checked={$view.muted}
      onchange={(event) => {
        if (current(event)) owner.mute(event.currentTarget.checked);
      }}
    />{text("mute")}</label
  >
  {#if $push.status === "working"}<p role="status" class="tw:m-0">
      {text("working")}
    </p>{/if}
  {#if $push.status === "unavailable"}<p role="status" class="tw:m-0">
      {text("unavailable")}
    </p>{/if}
  {#if $push.status === "unconfirmed"}<p
      role="alert"
      class="tw:m-0 tw:text-destructive"
    >
      {text("waiting")}
    </p>{:else if $push.error || ($view.error && $view.error !== "storage")}<p
      role="alert"
      class="tw:m-0 tw:text-destructive"
    >
      {text("failed")}
    </p>{/if}
  {#if $view.error === "storage"}<p role="alert" class="tw:m-0">
      {text("storage")}
    </p>{/if}
  <div class="tw:flex tw:flex-wrap tw:gap-2">
    <Button
      variant="outline"
      onclick={(event) => {
        if (current(event)) owner.retry();
      }}>{text("retry")}</Button
    ><Button
      variant="outline"
      loading={$view.testing}
      disabled={$view.permission !== "granted" ||
        $view.muted ||
        $push.status !== "on"}
      onclick={(event) => {
        if (current(event)) void owner.test();
      }}>{text("test")}</Button
    >
  </div>
  {#if $view.sent !== null}<p
      role="status"
      class="tw:m-0 tw:text-muted-foreground"
    >
      {text("sent", $view.sent)}
    </p>{/if}
  <details class="tw:space-y-2">
    <summary
      class="tw:cursor-pointer tw:rounded-control tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
      >{text("steps")}</summary
    >
    <p class="tw:m-0 tw:leading-6">
      {$view.ios ? text("ios") : text("android")}
    </p>
  </details>
</Dialog>
