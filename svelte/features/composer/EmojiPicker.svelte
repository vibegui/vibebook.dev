<script lang="ts">
  import { onDestroy } from "svelte";
  import type { ChatBridge } from "../../chatTypes";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import { emojiPicks } from "./model";
  let {
    vb,
    open = $bindable(false),
    onpick,
  }: {
    vb: ChatBridge;
    open?: boolean;
    onpick: (value: string) => void;
  } = $props();
  let query = $state(""),
    search = $state<HTMLInputElement | null>(null),
    grid = $state<HTMLDivElement | null>(null);
  const picks = $derived(emojiPicks(query));
  $effect(() => {
    if (open) query = "";
  });
  let active = true;
  onDestroy(() => {
    active = false;
  });
  function choose(value: string) {
    if (!active || !open) return;
    onpick(value);
    open = false;
  }
</script>

<Dialog
  bind:open
  title={vb.t("Emoji")}
  closeLabel={vb.t("Fechar")}
  initialFocus={() =>
    window.matchMedia("(pointer: coarse)").matches
      ? grid?.querySelector("button") || null
      : search}
>
  <Input
    type="search"
    bind:ref={search}
    aria-label={vb.t("Buscar emoji…")}
    placeholder={vb.t("Buscar emoji…")}
    value={query}
    oninput={(event) => (query = event.currentTarget.value)}
    onkeydown={(event) => {
      if (event.key === "Enter" && picks.length) {
        event.preventDefault();
        choose(picks[0].emoji);
      }
    }}
  />
  <div
    bind:this={grid}
    class="tw:grid tw:max-h-60 tw:grid-cols-[repeat(auto-fill,minmax(38px,1fr))] tw:gap-1 tw:overflow-y-auto"
  >
    {#each picks as pick (pick.emoji)}<Button
        variant="ghost"
        class="tw:text-xl"
        title={`:${pick.name}:`}
        aria-label={`:${pick.name}:`}
        onclick={() => choose(pick.emoji)}>{pick.emoji}</Button
      >{/each}
  </div>
</Dialog>
