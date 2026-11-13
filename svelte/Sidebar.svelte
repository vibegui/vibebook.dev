<script lang="ts">
  // The room's navigation is rendered by Svelte. The bridge keeps shared artwork,
  // formatting and the existing host actions in one place during the migration.
  import People from "./People.svelte";
  import EpicTree from "./features/navigation/EpicTree.svelte";
  import PinnedItems from "./features/pins/PinnedItems.svelte";
  import type { SidebarProps } from "./sidebar";
  let {
    room,
    thread,
    foldOpen = { off: false, friends: null },
    friends = [],
    vb,
    send,
    request,
    onopen,
    onarchchange,
    navigation,
    pins,
    onopenpinfile,
    onopenpinapp,
  }: SidebarProps = $props();

  const count = (th: string) =>
    room.counts
      ? (room.counts[th] ?? 0) +
        room.messages.filter(
          (m) => m.thread === th && m.id > (room.countsAt ?? 0),
        ).length
      : room.messages.filter((m) => m.thread === th).length;
  const selected = $derived(room.epics.find((epic) => epic.id === thread));
</script>

<button type="button" class="sheetGrab" aria-label={vb.t("Fechar")}
  ><i></i></button
>
{@html vb.roomStrip()}
<div class="sideHead">
  <div class="sideTop">
    <a data-nav href="/app" class="muted">{@html vb.icon("back")} vibebooks</a>
    {#if selected}
      <button
        type="button"
        class="iconBtn phOnly"
        id="sideArch"
        title={selected.archived
          ? vb.t("Desarquivar épico")
          : vb.t("Arquivar épico (concluído)")}
        aria-label={selected.archived
          ? vb.t("Desarquivar épico")
          : vb.t("Arquivar épico")}
        >{@html vb.icon(selected.archived ? "undo" : "check", 18)}</button
      >
      <button
        type="button"
        class="iconBtn phOnly"
        id="sideDel"
        title={vb.t("Apagar épico")}
        aria-label={vb.t("Apagar épico")}>{@html vb.icon("trash", 18)}</button
      >
    {/if}
    <button
      type="button"
      class="iconBtn"
      id="railToggle"
      title={vb.t("Recolher menu")}
      aria-label={vb.t("Recolher menu")}
      aria-expanded="true">{@html vb.icon("sidebar", 20)}</button
    >
  </div>
</div>
<div class="sec threadsSec">
  <button
    type="button"
    class="thread"
    class:sel={thread === "main"}
    class:waiting={vb.waitsIn("main").length > 0}
    data-thread="main"
    title={`${vb.bookTitle()}${room.book?.summary ? ` · ${room.book.summary}` : ""}`}
  >
    {@html vb.roomMark("ri roomIco")}<span class="rt">{vb.bookTitle()}</span>
    {#if !thread.startsWith("pre:")}
      <span
        class="rowEdit phOnly"
        role="button"
        tabindex="0"
        id="sideRename"
        title={vb.t("Renomear")}
        >{@html vb.icon("pencil", 13)} {vb.t("editar")}</span
      >
    {/if}
    {@html vb.waitPill("main")}<span class="n">{count("main")}</span>
  </button>
  <EpicTree
    {room}
    {thread}
    session={navigation}
    {send}
    {onopen}
    {onarchchange}
    vb={{
      t: vb.t,
      name: vb.name,
      epicBusy: vb.epicBusy,
      waitCount: (id) => vb.waitsIn(id).length,
    }}
  />
</div>
<PinnedItems
  {room}
  session={pins}
  {send}
  {request}
  onopenfile={onopenpinfile}
  onopenapp={onopenpinapp}
  t={vb.t}
/>
{#snippet agentArtwork(email: string)}{@html vb.agentRows(email)}{/snippet}
{#snippet sandboxArtwork()}{@html vb.sbxRows()}{/snippet}
<People
  {room}
  {friends}
  {foldOpen}
  vb={{ t: vb.t, name: vb.name, ago: vb.ago, avatarUrl: vb.avatarUrl }}
  agents={agentArtwork}
  sandboxes={sandboxArtwork}
  onfoldchange={(key, value) => {
    foldOpen[key] = value;
  }}
/>
