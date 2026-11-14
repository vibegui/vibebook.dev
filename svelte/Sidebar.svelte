<script lang="ts">
  import { onDestroy, untrack, tick } from "svelte";
  import RoomStrip from "./features/app-navigation/RoomStrip.svelte";
  import People from "./People.svelte";
  import EpicTree from "./features/navigation/EpicTree.svelte";
  import PinnedItems from "./features/pins/PinnedItems.svelte";
  import RoomMark from "./features/room-sidebar/RoomMark.svelte";
  import Avatar from "./lib/ui/Avatar.svelte";
  import IconButton from "./lib/ui/IconButton.svelte";
  import Button from "./lib/ui/Button.svelte";
  import WaitBadge from "./features/waits/WaitBadge.svelte";
  import Progress from "./lib/ui/Progress.svelte";
  import ThreadHeader from "./features/room-sidebar/ThreadHeader.svelte";
  import AgentPresenceRows from "./features/room-sidebar/AgentPresenceRows.svelte";
  import SandboxPresenceRows from "./features/room-sidebar/SandboxPresenceRows.svelte";
  import MutationStatus from "./features/room-sidebar/MutationStatus.svelte";
  import { createRoomMutations } from "./features/room-sidebar/session";
  import { messageCount } from "./features/room-sidebar/model";
  import type { SidebarProps } from "./sidebar";
  let {
    appNavigation,
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
    collapsed = false,
    roomIcon,
    roomTint,
    locale,
    mutations,
    presence = { agents: [], sandboxes: [] },
    ontogglerail = () => {},
    onrenameroom = () => {},
    onopenside = () => {},
    onagents = () => {},
    mountSheetHandle,
    hideSheetHandle = false,
  }: SidebarProps = $props();
  const external = untrack(() => !!mutations);
  const owner = untrack(
    () => mutations ?? createRoomMutations(room.me, room.id),
  );
  let active = true;
  let root = $state<HTMLElement | null>(null);
  function expandForCreate(trigger: HTMLButtonElement) {
    if (!active) return;
    const account = room.me,
      id = room.id;
    navigation.state.update((value) => ({ ...value, archived: false }));
    onarchchange(false);
    ontogglerail();
    void tick().then(() => {
      if (
        active &&
        room.me === account &&
        room.id === id &&
        !collapsed &&
        (document.activeElement === document.body ||
          document.activeElement === trigger)
      )
        root?.querySelector<HTMLInputElement>("#newEpic input")?.focus();
    });
  }
  $effect(() => owner.sync(room, request));
  onDestroy(() => {
    active = false;
    if (!external) owner.dispose();
  });
  function open(id: string) {
    if (active) onopen(id);
  }
  function sheetHandle(node: HTMLElement) {
    return { destroy: mountSheetHandle?.(node) };
  }
</script>

<section
  bind:this={root}
  data-vb-native
  data-native-room-sidebar
  class="tw:flex tw:min-h-0 tw:flex-col tw:gap-3 tw:p-2 tw:font-sans tw:text-sm tw:tracking-normal tw:[font-variation-settings:normal] tw:text-foreground"
>
  {#if collapsed}
    <IconButton
      icon="sidebar"
      label={vb.t("Abrir menu")}
      aria-expanded="false"
      onclick={ontogglerail}
    />
    <a
      href="/app?ui=svelte"
      data-nav
      aria-label={vb.t("Seus vibebooks")}
      class="tw:rounded-control tw:p-2 tw:text-center tw:text-foreground tw:no-underline tw:hover:bg-muted"
      >←</a
    >
    {#each [{ id: "main", title: room.book.title, tasks: [], owner: undefined }, ...room.epics.filter((epic) => !epic.archived || epic.id === thread)] as epic (epic.id)}
      <Button
        variant={thread === epic.id ? "secondary" : "ghost"}
        class="tw:h-auto tw:flex-col tw:gap-1 tw:p-1"
        aria-current={thread === epic.id ? "page" : undefined}
        title={epic.title}
        onclick={(event) => {
          if (event.currentTarget.isConnected) open(epic.id);
        }}
        >{#if epic.id === "main"}<RoomMark
            title={room.book.title}
            src={roomIcon}
            tint={roomTint}
          />{:else}<Avatar
            name={epic.owner ? vb.name(epic.owner) : epic.title}
            src={epic.owner ? vb.avatarUrl?.(epic.owner) : undefined}
          />{/if}{#if epic.tasks.length}<Progress
            value={epic.tasks.filter((task) => task.done).length}
            max={epic.tasks.length}
            label={vb.t("Tarefas")}
          />{/if}<WaitBadge
          waits={vb.waitsIn(epic.id)}
          label={(n) => vb.t("{n} coisas esperando você", { n })}
          taskLabel={vb.t("Tarefa sua pendente")}
        /></Button
      >
    {/each}
    <IconButton
      icon="plus"
      label={vb.t("Novo épico")}
      onclick={(event) => expandForCreate(event.currentTarget)}
    />
    {#if room.requests?.length}<Button
        variant="outline"
        title={vb.t("{n} pedindo pra entrar", { n: room.requests.length })}
        onclick={ontogglerail}>+{room.requests.length}</Button
      >{/if}
    {#each room.members.slice(0, 8) as email}<span
        role="img"
        aria-label={`${vb.name(email)}${room.online.includes(email) ? ` · ${vb.t("online")}` : ""}`}
        class={room.online.includes(email)
          ? "tw:rounded-full tw:ring-2 tw:ring-success"
          : "tw:rounded-full"}
        ><Avatar name={vb.name(email)} src={vb.avatarUrl?.(email)} /></span
      >{/each}
    <MutationStatus {owner} t={vb.t} />
  {:else}
    {#if !hideSheetHandle}<button
        type="button"
        use:sheetHandle
        aria-label={vb.t("Fechar")}
        class="tw:mx-auto tw:h-5 tw:w-12 tw:rounded-full tw:border-0 tw:bg-muted tw:min-[901px]:hidden"
        onclick={onopenside}
      ></button>{/if}
    {#if appNavigation}<RoomStrip
        controller={appNavigation.controller}
        lang={appNavigation.lang}
      />{/if}
    <div class="tw:flex tw:items-center tw:gap-2">
      <a
        href="/app?ui=svelte"
        data-nav
        class="tw:flex-1 tw:text-muted-foreground tw:no-underline tw:hover:text-foreground"
        >← vibebooks</a
      ><IconButton
        icon="sidebar"
        label={vb.t("Recolher menu")}
        aria-expanded="true"
        onclick={ontogglerail}
      />
    </div>
    <div class="tw:flex tw:items-center tw:gap-1">
      <Button
        variant={thread === "main" ? "secondary" : "ghost"}
        class="tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2"
        onclick={(event) => {
          if (event.currentTarget.isConnected) open("main");
        }}
        ><RoomMark
          title={room.book.title}
          src={roomIcon}
          tint={roomTint}
        /><span class="tw:flex-1 tw:truncate">{room.book.title}</span><WaitBadge
          waits={vb.waitsIn("main")}
          label={(n) => vb.t("{n} coisas esperando você", { n })}
          taskLabel={vb.t("Tarefa sua pendente")}
        /><span class="tw:text-xs tw:text-muted-foreground"
          >{messageCount(room, "main")}</span
        ></Button
      ><IconButton
        icon="pencil"
        label={vb.t("Renomear")}
        onclick={onrenameroom}
      />
    </div>
    {#if thread !== "main" && !thread.startsWith("pre:")}<div
        class="tw:min-[901px]:hidden"
      >
        <ThreadHeader
          {room}
          {thread}
          {owner}
          {vb}
          {roomIcon}
          {roomTint}
          {onopenside}
          {onrenameroom}
        />
      </div>{/if}
    <EpicTree
      {room}
      {thread}
      session={navigation}
      mutations={owner}
      {onarchchange}
      onopen={open}
      vb={{
        t: vb.t,
        name: vb.name,
        epicBusy: vb.epicBusy,
        waitsIn: vb.waitsIn,
      }}
    />
    <PinnedItems
      {room}
      session={pins}
      {send}
      {request}
      onopenfile={onopenpinfile}
      onopenapp={onopenpinapp}
      t={vb.t}
    />
    {#snippet agents(email: string)}<AgentPresenceRows
        {presence}
        {email}
        t={vb.t}
        name={vb.name}
        ago={vb.ago}
        {locale}
      />{/snippet}
    {#snippet sandboxes()}<SandboxPresenceRows
        {presence}
        t={vb.t}
        name={vb.name}
        onopen={onagents}
        {locale}
      />{/snippet}
    <People
      {room}
      {friends}
      {foldOpen}
      vb={{ t: vb.t, name: vb.name, ago: vb.ago, avatarUrl: vb.avatarUrl }}
      {agents}
      {sandboxes}
      onfoldchange={(key, value) => {
        foldOpen[key] = value;
      }}
    />
    <MutationStatus {owner} t={vb.t} />
  {/if}
</section>
