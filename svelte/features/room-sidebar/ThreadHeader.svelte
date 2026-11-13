<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { ThreadHeaderProps } from "./types";
  import { epicIdentity, suggestionAt } from "./model";
  import RoomMark from "./RoomMark.svelte";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  import MutationStatus from "./MutationStatus.svelte";
  let {
    room,
    thread,
    owner,
    vb,
    onopenside,
    onrenameroom,
    roomIcon,
    roomTint,
    titleId,
  }: ThreadHeaderProps = $props();
  const status = untrack(() => owner.state);
  const epic = $derived(room.epics.find((item) => item.id === thread));
  const suggestion = $derived(suggestionAt(room, thread));
  const title = $derived(suggestion?.title ?? epic?.title ?? room.book.title);
  const busy = $derived(
    $status.phase === "pending" || $status.phase === "unconfirmed",
  );
  let rename = $state(false),
    remove = $state(false),
    value = $state(""),
    snapshot = $state(""),
    target = $state("");
  let active = true;
  $effect(() => {
    if (
      target &&
      (!epic ||
        epic.id !== target ||
        (rename
          ? JSON.stringify([epic.id, epic.title])
          : epicIdentity(epic)) !== snapshot)
    ) {
      rename = false;
      remove = false;
      target = "";
    }
  });
  function begin(mode: "rename" | "delete") {
    if (!active || busy || !epic) return;
    target = epic.id;
    snapshot =
      mode === "rename"
        ? JSON.stringify([epic.id, epic.title])
        : epicIdentity(epic);
    value = epic.title;
    rename = mode === "rename";
    remove = mode === "delete";
  }
  function current() {
    return (
      active &&
      !!epic &&
      epic.id === target &&
      (rename ? JSON.stringify([epic.id, epic.title]) : epicIdentity(epic)) ===
        snapshot &&
      room.members.includes(room.me)
    );
  }
  async function save(event: SubmitEvent) {
    event.preventDefault();
    if (!rename || !current() || busy || !value.trim()) return;
    const expected = target;
    if (await owner.run({ t: "epic.rename", id: target, title: value }))
      if (active && target === expected) rename = false;
  }
  async function erase() {
    if (!remove || !current() || busy) return;
    const expected = target;
    if (await owner.run({ t: "epic.del", id: target }))
      if (active && target === expected) remove = false;
  }
  onDestroy(() => {
    active = false;
  });
</script>

<div
  data-vb-native
  data-native-thread-header
  class="tw:flex tw:min-w-0 tw:flex-1 tw:flex-wrap tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:tracking-normal tw:[font-variation-settings:normal] tw:text-foreground"
>
  {#if !epic && !suggestion}<RoomMark
      {title}
      src={roomIcon}
      tint={roomTint}
    />{:else}<Avatar
      name={title}
      src={epic?.owner ? vb.avatarUrl?.(epic.owner) : undefined}
    />{/if}
  <Heading level={2} class="tw:min-w-0 tw:flex-1"
    ><Button
      id={titleId}
      variant="ghost"
      class="tw:min-w-0 tw:flex-1 tw:justify-start tw:truncate tw:font-semibold tw:md:flex-none"
      title={room.book.summary || title}
      onclick={(event) => {
        if (!event.currentTarget.isConnected) return;
        if (matchMedia("(max-width: 900px)").matches) onopenside();
        else if (!suggestion) epic ? begin("rename") : onrenameroom();
      }}>{title}</Button
    ></Heading
  >
  <IconButton
    icon="chevronDown"
    label={vb.t("Trocar de conversa")}
    onclick={(event) => {
      if (event.currentTarget.isConnected) onopenside();
    }}
  />
  {#if suggestion}<span class="tw:text-xs tw:text-muted-foreground"
      >✦ {vb.t("sugestão do @vibe")}</span
    >{:else if room.book.folder && !epic}<span
      class="tw:text-xs tw:text-muted-foreground">{room.book.folder}</span
    >{/if}
  {#if epic}
    <IconButton
      icon="pencil"
      disabled={busy}
      label={vb.t("Renomear")}
      onclick={() => begin("rename")}
    />
    <IconButton
      icon={epic.archived ? "undo" : "check"}
      disabled={busy}
      label={vb.t(epic.archived ? "Desarquivar épico" : "Arquivar épico")}
      onclick={(event) => {
        if (active && event.currentTarget.isConnected && epic)
          void owner.run({
            t: "epic.archive",
            id: epic.id,
            archived: !epic.archived,
          });
      }}
    />
    <IconButton
      icon="trash"
      disabled={busy}
      label={vb.t("Apagar épico")}
      onclick={() => begin("delete")}
    />
  {/if}
  <MutationStatus {owner} t={vb.t} />
</div>
<Dialog
  bind:open={rename}
  title={vb.t("Nome do épico:")}
  closeLabel={vb.t("Cancelar")}
  ><form onsubmit={save} class="tw:space-y-3">
    <Label
      >{vb.t("Nome do épico:")}<Input
        bind:value
        maxlength={200}
        disabled={busy}
        required
      /></Label
    ><Button type="submit" disabled={busy || !value.trim()}
      >{vb.t("Salvar")}</Button
    >
  </form></Dialog
>
<AlertDialog
  bind:open={remove}
  title={vb.t("Apagar épico")}
  description={vb.t(
    'Apagar o épico "{title}", as tasks e a discussão dele? Não dá pra desfazer.',
    { title: epic?.title ?? "" },
  )}
  confirmLabel={vb.t("Apagar")}
  cancelLabel={vb.t("Cancelar")}
  busy={$status.phase === "pending"}
  confirmDisabled={busy || !current()}
  onconfirm={erase}
/>
