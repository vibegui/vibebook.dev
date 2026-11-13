<script lang="ts">
  // The room's navigation is rendered by Svelte. The bridge keeps shared artwork,
  // formatting and the existing host actions in one place during the migration.
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
  const online = $derived(
    room.members.filter(
      (email) => email === room.me || room.online.includes(email),
    ),
  );
  const offline = $derived(
    room.members.filter((email) => !online.includes(email)),
  );
  const availableFriends = $derived(
    friends.filter((email) => !room.members.includes(email)),
  );
</script>

{#snippet member(email: string)}
  <div class="member">
    {@html vb.avatar(email, room.online.includes(email))}
    {#if room.pending?.includes(email)}
      <div class="fnCol">
        <span class="fnRow"
          ><span class="fn" title={email}
            >{room.names?.[email] || email.split("@")[0]}</span
          ><span class="pendTag" title={vb.t("Convidada(o), ainda não entrou")}
            >{vb.t("pendente")}</span
          ></span
        >
        <small class="memActs"
          ><button
            type="button"
            class="ghost resend"
            data-copyinv={email}
            title={vb.t(
              "Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp",
            )}>{vb.t("copiar")}</button
          >
          ·
          <button
            type="button"
            class="ghost resend"
            data-resend={email}
            title={vb.t("Convidada(o), ainda não entrou")}
            >{vb.t("reenviar")}</button
          ></small
        >
      </div>
    {:else if room.names?.[email]}
      <span class="fn" title={email}>{room.names[email]}</span>
    {:else}
      <div class="fnCol">
        <span class="fn" title={email}>{email.split("@")[0]}</span><small
          class="memActs">@{email.split("@")[1] ?? ""}</small
        >
      </div>
    {/if}
    {#if email !== room.book?.owner && (room.pending?.includes(email) || room.me === room.book?.owner)}
      <button
        type="button"
        class="ghost x"
        data-remove={email}
        aria-label={vb.t("Remover {email}", { email })}
        title={room.pending?.includes(email)
          ? vb.t("Cancelar convite")
          : vb.t("Remover do vibebook")}>{@html vb.icon("x")}</button
      >
    {/if}
  </div>
  {@html vb.agentRows(email)}
{/snippet}

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
<div class="sec">
  {#if room.requests?.length}
    <div class="asks">
      <h4>{vb.t("Pedindo pra entrar")}</h4>
      {#each room.requests as request (request.email)}
        <div class="member reqRow">
          {@html vb.avatar(request.email)}
          <div class="fnCol">
            <span
              class="fn"
              title={`${request.email} · ${vb.t("pediu {ago}", { ago: vb.ago(request.ts) })}`}
              >{request.name || request.email.split("@")[0]}</span
            ><small class="memActs"
              >{vb.t("pediu {ago}", { ago: vb.ago(request.ts) })} ·
              <button
                type="button"
                class="ghost resend okAsk"
                data-ask={request.email}
                data-ok="1"
                title={vb.t("Liberar: entra na sala e recebe o link por email")}
                >{vb.t("liberar")}</button
              ></small
            >
          </div>
          <button
            type="button"
            class="ghost x"
            data-ask={request.email}
            data-ok=""
            aria-label={vb.t("Recusar {email}", { email: request.email })}
            title={vb.t("Recusar")}>{@html vb.icon("x")}</button
          >
        </div>
      {/each}
    </div>
  {/if}
  <h4>{vb.t("Pessoas e agents")}</h4>
  {@html vb.sbxRows()}
  {#each online as email (email)}{@render member(email)}{/each}
  {#if offline.length}
    <details class="memMore" data-fold="off" open={foldOpen.off}>
      <summary>{vb.t("{n} offline", { n: offline.length })}</summary
      >{#each offline as email (email)}{@render member(email)}{/each}
    </details>
  {/if}
  {#if availableFriends.length}
    <details
      class="memMore"
      data-fold="friends"
      open={foldOpen.friends ?? room.members.length <= 1}
    >
      <summary>{vb.t("Seus amigos")} · {availableFriends.length}</summary>
      {#each availableFriends as email (email)}<button
          type="button"
          class="friendAdd"
          data-add={email}
          title={vb.t("Adicionar {email}", { email })}
          >{@html vb.avatar(email)}<span class="fn">{vb.name(email)}</span><b
            >{@html vb.icon("plus")}</b
          ></button
        >{/each}
    </details>
  {/if}
  <form class="row" id="invite" style="margin-top:8px">
    <input
      type="email"
      required
      placeholder={vb.t("convidar por email")}
      list="friendList"
      autocomplete="off"
    /><button aria-label={vb.t("convidar por email")}
      >{@html vb.icon("plus")}</button
    >
  </form>
  <datalist id="friendList"
    >{#each availableFriends as email}<option value={email}
      ></option>{/each}</datalist
  >
</div>
