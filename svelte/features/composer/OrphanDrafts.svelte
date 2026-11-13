<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Room } from "../../../shared/room";
  import type { ChatBridge } from "../../chatTypes";
  import type { ComposerDrafts, OrphanDraft } from "./drafts";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Textarea from "../../lib/ui/Textarea.svelte";
  let {
    room,
    drafts,
    vb,
  }: { room: Room; drafts: ComposerDrafts; vb: ChatBridge } = $props();
  const changes = untrack(() => drafts.changes);
  let selected = $state.raw<OrphanDraft | null>(null),
    open = $state(false),
    notice = $state("");
  let active = true,
    ticket = 0;
  const orphans = $derived.by(() => {
    $changes;
    return drafts.orphans(room);
  });
  const current = $derived(
    selected &&
      orphans.some(
        (item) =>
          item.scope === selected?.scope && item.state === selected?.state,
      ),
  );
  const reviewText = $derived(
    selected
      ? [
          `Thread: ${selected.scope.thread}`,
          selected.state.text,
          selected.state.replyId ? `Reply: ${selected.state.replyId}` : "",
          ...selected.state.attachments.map(
            (item) =>
              `${item.name} (${item.type}, ${item.size} bytes; ${item.phase})`,
          ),
          selected.state.poll.question
            ? `Poll: ${selected.state.poll.question}`
            : "",
          selected.state.poll.multi ? vb.t("Multiple choices allowed") : "",
          ...selected.state.poll.options.filter(Boolean),
        ]
          .filter(Boolean)
          .join("\n\n")
      : "",
  );
  $effect(() => {
    if (selected && !current) {
      open = false;
      selected = null;
      notice = "";
      ticket++;
    }
  });
  async function copy() {
    if (!active || !open || !current || !selected) return;
    const own = ++ticket,
      snapshot = selected;
    try {
      await navigator.clipboard.writeText(reviewText);
      if (active && own === ticket && selected === snapshot && open && current)
        notice = vb.t("Copied");
    } catch {
      if (active && own === ticket && selected === snapshot && open && current)
        notice = vb.t(
          "Could not copy. Select the text below and copy it manually.",
        );
    }
  }
  function discard() {
    if (!active || !open || !current || !selected) return;
    if (drafts.discardOrphan(selected, room)) {
      open = false;
      selected = null;
      ticket++;
    }
  }
  onDestroy(() => {
    active = false;
    ticket++;
  });
</script>

{#if orphans.length}
  <aside
    data-composer-orphans
    class="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:border-t tw:border-border tw:p-2 tw:text-sm tw:text-muted-foreground"
  >
    <span>{vb.t("Drafts from deleted threads")}: {orphans.length}</span>
    {#each orphans as item (item.scope.thread)}
      <Button
        variant="outline"
        size="sm"
        onclick={() => {
          selected = item;
          notice = "";
          open = true;
          ticket++;
        }}>{vb.t("Review draft")}: {item.scope.thread}</Button
      >
    {/each}
  </aside>
{/if}
<Dialog
  bind:open
  title={vb.t("Review draft")}
  closeLabel={vb.t("Close")}
  description={vb.t(
    "The original thread is unavailable. Copy or discard this local draft. Nothing will be sent or moved. Discarding cannot undo an upload or message already sent.",
  )}
>
  <Textarea
    readonly
    value={reviewText}
    aria-label={vb.t("Original draft")}
    rows={8}
  />
  {#if notice}<p
      role="status"
      class="tw:m-0 tw:text-sm tw:text-muted-foreground"
    >
      {notice}
    </p>{/if}
  <div class="tw:flex tw:justify-end tw:gap-2">
    <Button variant="outline" disabled={!current} onclick={copy}
      >{vb.t("Copy")}</Button
    >
    <Button variant="destructive" disabled={!current} onclick={discard}
      >{vb.t("Discard draft")}</Button
    >
  </div>
</Dialog>
