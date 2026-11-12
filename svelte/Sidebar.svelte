<script lang="ts">
  // The room's navigation is rendered by Svelte. The bridge keeps shared artwork,
  // formatting and the existing host actions in one place during the migration.
  import type { Room, Epic } from "../shared/room";
  type Bridge = {
    t: (text: string, vars?: Record<string, string | number>) => string;
    icon: (name: string, size?: number) => string;
    avatar: (email: string, online?: boolean) => string;
    ago: (ts: number) => string;
    name: (email: string) => string;
    initials: (title: string) => string;
    bookTitle: () => string;
    roomMark: (classes: string) => string;
    roomStrip: () => string;
    pinsSec: () => string;
    sbxRows: () => string;
    agentRows: (email: string) => string;
    epicIco: (epic: Epic, pick: boolean) => string;
    epicBusy: (epic: Epic) => string | null;
    waitPill: (thread: string) => string;
    waitsIn: (thread: string) => unknown[];
    prodMark: (epic: Epic) => string;
  };
  let {
    room,
    thread,
    archOpen = false,
    foldOpen = { off: false, friends: null },
    friends = [],
    vb,
  }: {
    room: Room;
    thread: string;
    archOpen?: boolean;
    foldOpen?: { off: boolean; friends: boolean | null };
    friends?: string[];
    vb: Bridge;
  } = $props();

  const count = (th: string) =>
    room.counts
      ? (room.counts[th] ?? 0) +
        room.messages.filter(
          (m) => m.thread === th && m.id > (room.countsAt ?? 0),
        ).length
      : room.messages.filter((m) => m.thread === th).length;
  const last = (epic: Epic) =>
    room.messages.reduce(
      (n, m) => (m.thread === epic.id && m.id > n ? m.id : n),
      0,
    );
  const selected = $derived(room.epics.find((epic) => epic.id === thread));
  const active = $derived(room.epics.filter((epic) => !epic.archived));
  const archived = $derived(
    room.epics
      .filter((epic) => epic.archived)
      .map((epic, i) => ({ epic, last: last(epic), i }))
      .sort((a, b) => b.last - a.last || b.i - a.i)
      .map(({ epic }) => epic),
  );
  const showArch = $derived(archOpen && archived.length > 0);
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

{#snippet epicRow(epic: Epic)}
  {@const done = epic.tasks.filter((task) => task.done).length}
  {@const busy = vb.epicBusy(epic)}
  <button
    type="button"
    class="thread"
    class:sel={thread === epic.id}
    class:archived={!!epic.archived}
    class:busy={!!busy}
    class:waiting={vb.waitsIn(epic.id).length > 0}
    data-thread={epic.id}
    title={`${epic.title} · ${done}/${epic.tasks.length} tasks${epic.archived ? ` · ${vb.t("arquivado")}` : ""}${busy ? ` · ${vb.t("{who} está trabalhando aqui", { who: busy })}` : ""}`}
  >
    {@html vb.epicIco(epic, true)}<span class="rt">{epic.title}</span>
    {#if busy}<span
        class="claudeSpin"
        aria-label={vb.t("{who} está trabalhando", { who: busy })}>✻</span
      >{/if}
    {@html vb.waitPill(epic.id)}{@html vb.prodMark(epic)}
    <span class="n"
      >{epic.tasks.length ? `${done}/${epic.tasks.length}` : ""}</span
    >
  </button>
{/snippet}

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
  {#if archived.length}
    <div class="epTabs" role="tablist">
      <button
        type="button"
        role="tab"
        data-arch=""
        class:on={!showArch}
        aria-selected={!showArch}
        >{vb.t("Épicos")} <b>{active.length}</b></button
      >
      <button
        type="button"
        role="tab"
        data-arch="1"
        class:on={showArch}
        aria-selected={showArch}
        >{vb.t("Arquivados")} <b>{archived.length}</b></button
      >
    </div>
  {/if}
  <div class="epList" class:arch={showArch}>
    {#each showArch ? archived : active as epic (epic.id)}{@render epicRow(
        epic,
      )}{/each}
    {#if !showArch}
      <form id="newEpic" class="newRoom">
        <input
          placeholder={vb.t("Novo épico: escreva o título…")}
          aria-label={vb.t("Novo épico")}
          enterkeyhint="done"
        /><button class="ri" aria-label={vb.t("Criar épico")}
          >{@html vb.icon("plus")}</button
        >
      </form>
      {#each room.suggestions as suggestion, i}
        <button
          type="button"
          class="thread pre"
          class:sel={thread === `pre:${i}`}
          data-thread={`pre:${i}`}
          title={`${suggestion.title} · ${vb.t("sugestão do @vibe, clique para ver")}`}
          ><span class="ri">{vb.initials(suggestion.title)}</span><span
            class="rt">{suggestion.title}</span
          ><span class="n">{suggestion.tasks.length || ""}</span></button
        >
      {/each}
    {/if}
  </div>
</div>
{@html vb.pinsSec()}
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
