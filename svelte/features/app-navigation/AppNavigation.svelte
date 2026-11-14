<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Textarea from "../../lib/ui/Textarea.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import { TINTS } from "../../../shared/schemas";
  import {
    orderedRooms,
    roomMatches,
    targetHref,
    epicTarget,
    messageTarget,
    type RoomTarget,
  } from "../home/model";
  import { homeText, homeIssue, type HomeLanguage } from "../home/copy";
  import RoomTile from "../home/RoomTile.svelte";
  import { roomIconPng } from "../rooms/images";
  import type { AppNavigationSession } from "./controller";
  let {
    controller,
    lang,
    theme = "auto",
    ontheme,
    onlanguage,
    onreload = () => location.reload(),
  }: {
    controller: AppNavigationSession;
    lang: HomeLanguage;
    theme?: "auto" | "light" | "dark";
    ontheme: () => void;
    onlanguage: (lang: HomeLanguage) => void;
    onreload?: () => void;
  } = $props();
  const personal = $derived(controller.personal.state),
    draft = $derived(controller.personal.draft),
    nav = $derived(controller.state),
    mutations = $derived(controller.rooms.state),
    search = $derived(controller.search.state),
    creator = $derived(controller.creator.state);
  const text = (
    key: Parameters<typeof homeText>[1],
    vars?: Record<string, string | number>,
  ) => homeText(lang, key, vars);
  const settingsIdentity = $derived($nav.settingsId);
  const selectedRoom = $derived(
    $personal.me?.books.find((room) => room.id === $nav.settingsId),
  );
  const archiveRoom = $derived(
    $personal.me?.books.find((room) => room.id === $nav.archiveId),
  );
  const renameRoom = $derived(
    $personal.me?.books.find((room) => room.id === $nav.renameId),
  );
  const rows = $derived([
    ...roomMatches($personal.me?.books ?? [], $search.query).map((room) => ({
      key: "room:" + room.id,
      target: { roomId: room.id } as RoomTarget,
      title: room.title ?? "vibebook",
      detail: room.folder ?? "",
    })),
    ...($search.result?.epics ?? []).map((epic) => ({
      key: "epic:" + epic.room_id + ":" + epic.id,
      target: epicTarget(epic),
      title: epic.title,
      detail: epic.room + (epic.archived ? " · " + text("archive") : ""),
    })),
    ...($search.result?.messages ?? []).map((message) => ({
      key: "msg:" + message.room_id + ":" + message.id,
      target: messageTarget(message),
      title:
        message.snippet || message.files.map((file) => file.name).join(", "),
      detail: message.room + (message.topic ? " › " + message.topic : ""),
    })),
  ]);
  let homeButton = $state<HTMLButtonElement | null>(null),
    searchInput = $state<HTMLInputElement | null>(null),
    createInput = $state<HTMLTextAreaElement | null>(null),
    archiveCancel = $state<HTMLButtonElement | null>(null),
    renameInput = $state<HTMLInputElement | null>(null);
  let mounted = false,
    imageSequence = 0,
    imageBusy = $state(false),
    imageError = $state("");
  $effect(() => {
    void settingsIdentity;
    imageSequence++;
    imageBusy = false;
    imageError = "";
  });
  $effect(() => {
    if ($nav.settingsId && !selectedRoom) controller.closeSettings();
    if ($nav.archiveId && !archiveRoom) controller.closeSettings();
    if ($nav.renameId && !renameRoom) controller.closeSettings();
    if (
      renameRoom &&
      $nav.renameSubmitted &&
      !$mutations.pending[`rename:${renameRoom.id}`] &&
      !$mutations.issues[`rename:${renameRoom.id}`] &&
      renameRoom.title === $nav.renameDraft.trim()
    )
      controller.closeSettings();
  });
  onDestroy(() => controller.pageLeft());
  onMount(() => {
    mounted = true;
    const shortcut = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        $personal.me
      ) {
        event.preventDefault();
        if ($search.open) controller.search.close();
        else {
          controller.creator.close();
          controller.closeSettings();
          controller.openSearch(
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : undefined,
          );
        }
      }
    };
    document.addEventListener("keydown", shortcut);
    return () => {
      mounted = false;
      imageSequence++;
      controller.pageLeft();
      document.removeEventListener("keydown", shortcut);
    };
  });
  async function upload(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    const input = event.currentTarget,
      file = input.files?.[0],
      id = $nav.settingsId;
    if (!mounted || !input.isConnected || !file || !id) return;
    const ticket = ++imageSequence,
      identity = $personal.identityRevision;
    imageBusy = true;
    imageError = "";
    try {
      const image = await roomIconPng(file);
      if (
        mounted &&
        ticket === imageSequence &&
        identity === $personal.identityRevision &&
        input.isConnected &&
        $nav.settingsId === id
      )
        await controller.rooms.icon(id, image);
    } catch (error) {
      if (
        mounted &&
        ticket === imageSequence &&
        identity === $personal.identityRevision
      )
        imageError = error instanceof Error ? error.message : "network";
    } finally {
      if (
        mounted &&
        ticket === imageSequence &&
        identity === $personal.identityRevision
      )
        imageBusy = false;
    }
  }
  const focusBack = () => controller.returnFocus(homeButton);
</script>

<div
  data-vb-native="room-navigation"
  class="tw:flex tw:h-full tw:min-h-0 tw:w-full tw:flex-col tw:items-center tw:gap-2 tw:bg-background tw:p-0 tw:font-sans tw:text-foreground"
>
  <IconButton
    bind:ref={homeButton}
    icon="inbox"
    label={text("home")}
    onclick={(event) => {
      if (event.currentTarget.isConnected) controller.callbacks.home();
    }}
  />
  <div
    class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-y-auto"
    role="list"
    aria-label={text("home")}
  >
    {#each orderedRooms($personal.me?.books ?? []) as room (room.id)}<div
        role="listitem"
      >
        <RoomTile
          {room}
          {lang}
          now={$personal.now}
          compact
          selected={$nav.roomId === room.id}
          seen={$personal.seen[room.id] ?? 0}
          waits={$personal.me?.waits.filter(
            (wait) => wait.book_id === room.id,
          ) ?? []}
          onnavigate={controller.callbacks.navigate}
          onsettings={(id, trigger) => controller.openSettings(id, trigger)}
          ondragstart={(event) => {
            event.dataTransfer?.setData("text/plain", room.id);
            if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
          }}
          ondragover={(event) => event.preventDefault()}
          ondrop={(event) => {
            event.preventDefault();
            const from = event.dataTransfer?.getData("text/plain");
            if (!from) return;
            const target = event.currentTarget;
            if (!(target instanceof HTMLElement)) return;
            const rect = target.getBoundingClientRect();
            controller.drop(
              from,
              room.id,
              event.clientY > rect.top + rect.height / 2,
            );
          }}
        />
      </div>{/each}
  </div>
  <IconButton
    icon={theme === "dark" ? "moon" : "sun"}
    label={text("theme")}
    onclick={(event) => {
      if (event.currentTarget.isConnected) ontheme();
    }}
  />
  <Button
    variant="ghost"
    size="sm"
    onclick={(event) => {
      if (event.currentTarget.isConnected)
        onlanguage(lang === "en" ? "pt" : "en");
    }}
    aria-label={text("language")}>{lang === "en" ? "PT" : "EN"}</Button
  >
  <IconButton
    icon="search"
    label={text("search")}
    onclick={(event) => {
      if (event.currentTarget.isConnected)
        controller.openSearch(event.currentTarget);
    }}
  />
  <IconButton
    icon="plus"
    label={text("new")}
    onclick={(event) => {
      if (event.currentTarget.isConnected)
        controller.openCreate(event.currentTarget);
    }}
  />
</div>
<Dialog
  open={$search.open}
  title={text("search")}
  closeLabel={text("close")}
  onOpenChange={(open) => {
    if (!open) controller.search.close();
  }}
  initialFocus={() => searchInput}
  returnFocus={focusBack}
>
  <Input
    bind:ref={searchInput}
    role="combobox"
    aria-label={text("search")}
    aria-autocomplete="list"
    aria-expanded="true"
    aria-controls="native-room-results"
    aria-activedescendant={rows[$search.selected]
      ? `native-result-${$search.selected}`
      : undefined}
    placeholder={text("searchPlaceholder")}
    value={$search.query}
    oninput={(event) => {
      if (event.currentTarget.isConnected)
        controller.search.edit(event.currentTarget.value);
    }}
    onkeydown={(event) => {
      if (!event.currentTarget.isConnected) return;
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        controller.search.move(event.key === "ArrowDown" ? 1 : -1);
      } else if (event.key === "Enter" && !event.isComposing) {
        event.preventDefault();
        controller.search.activate();
      }
    }}
  />
  <div
    id="native-room-results"
    role="listbox"
    aria-label={text("search")}
    class="tw:space-y-1"
  >
    {#each rows as row, index (row.key)}<a
        href={targetHref(row.target)}
        role="option"
        id={`native-result-${index}`}
        aria-selected={$search.selected === index}
        tabindex="-1"
        class={$search.selected === index
          ? "tw:block tw:w-full tw:rounded-control tw:bg-accent tw:p-3 tw:text-left tw:text-foreground tw:no-underline"
          : "tw:block tw:w-full tw:rounded-control tw:bg-transparent tw:p-3 tw:text-left tw:text-foreground tw:no-underline tw:hover:bg-accent"}
        onclick={(event) => {
          if (
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
          )
            return;
          event.preventDefault();
          if (event.currentTarget.isConnected)
            controller.search.activateTarget(row.target);
        }}
        ><b class="tw:block tw:break-words tw:text-sm tw:font-medium"
          >{row.title}</b
        ><small class="tw:break-words tw:text-muted-foreground"
          >{row.detail}</small
        ></a
      >{/each}
  </div>
  {#if !rows.length && !$search.loading}<p>
      {text($search.query.trim().length >= 2 ? "noConversations" : "noMatches")}
    </p>{/if}{#if $search.loading}<p role="status">
      {text("searching")}
    </p>{/if}{#if $search.result?.failed}<p role="status">{text("partial")}</p>
    <Button
      variant="outline"
      onclick={(event) => {
        if (event.currentTarget.isConnected)
          controller.search.edit($search.query);
      }}>{text("retry")}</Button
    >{/if}{#if $search.error}<p
      role="alert"
      class="tw:break-words tw:text-destructive"
    >
      {homeIssue(lang, $search.error)}
    </p>
    <Button
      variant="outline"
      onclick={(event) => {
        if (event.currentTarget.isConnected)
          controller.search.edit($search.query);
      }}>{text("retry")}</Button
    >{/if}
</Dialog>
{#if $creator.binding}{#key $creator.binding}<Snapshot value={$creator.binding}>
      {#snippet children(binding)}
        <Dialog
          open={$creator.open && !$creator.inline}
          title={text("new")}
          description={text("createHelp")}
          closeLabel={text("close")}
          onOpenChange={(open) => {
            if (!open && !$creator.inline && controller.creator.owns(binding))
              controller.creator.close(binding);
          }}
          initialFocus={() => createInput}
          returnFocus={focusBack}
        >
          <form
            class="tw:space-y-3"
            aria-busy={$creator.busy}
            onsubmit={(event) => {
              event.preventDefault();
              if (
                !event.currentTarget.isConnected ||
                $creator.inline ||
                !controller.creator.owns(binding)
              )
                return;
              void controller.creator.submit(binding);
            }}
          >
            <Label for="native-new-room">{text("createLabel")}</Label><Textarea
              bind:ref={createInput}
              id="native-new-room"
              rows={4}
              placeholder={text("createPlaceholder")}
              value={$draft.create}
              disabled={$creator.busy}
              oninput={(event) => {
                if (
                  event.currentTarget.isConnected &&
                  !$creator.inline &&
                  controller.creator.owns(binding)
                )
                  controller.creator.edit(event.currentTarget.value, binding);
              }}
              onkeydown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.isComposing &&
                  !$creator.inline &&
                  event.currentTarget.isConnected &&
                  controller.creator.owns(binding)
                ) {
                  event.preventDefault();
                  void controller.creator.submit(binding);
                }
              }}
            />
            <div class="tw:flex tw:flex-wrap tw:gap-2">
              <Button
                variant="outline"
                onclick={(event) => {
                  if (
                    event.currentTarget.isConnected &&
                    controller.creator.owns(binding)
                  )
                    controller.creator.close(binding);
                }}>{text("cancel")}</Button
              ><Button type="submit" loading={$creator.busy}
                >{text($creator.busy ? "creating" : "create")}</Button
              >
            </div>
            {#if $creator.error}<p
                role="alert"
                class="tw:break-words tw:text-destructive"
              >
                {homeIssue(lang, $creator.error)}
              </p>{/if}
          </form>
        </Dialog>
      {/snippet}</Snapshot
    >{/key}{/if}
<Dialog
  open={!!selectedRoom}
  title={text("roomSettings", { title: selectedRoom?.title ?? "" })}
  closeLabel={text("close")}
  onOpenChange={(open) => {
    if (!open) controller.closeSettings();
  }}
  returnFocus={focusBack}
>
  {#if selectedRoom}{@const room = selectedRoom}
    <fieldset class="tw:m-0 tw:space-y-2 tw:border-0 tw:p-0">
      <legend>{text("tint")}</legend>
      <div class="tw:flex tw:flex-wrap tw:gap-2">
        {#each [null, ...TINTS] as tint}<Button
            size="sm"
            variant={room.tint === tint ? "secondary" : "outline"}
            aria-pressed={room.tint === tint}
            disabled={!!$mutations.pending[`tint:${room.id}`]}
            onclick={(event) => {
              if (event.currentTarget.isConnected)
                controller.rooms.tint(room.id, tint);
            }}>{text(tint ?? "none")}</Button
          >{/each}
      </div>
    </fieldset>
    <div class="tw:space-y-2">
      <Label for="native-room-icon">{text("icon")}</Label><input
        id="native-room-icon"
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/x-icon,.ico"
        disabled={imageBusy || !!$mutations.pending[`icon:${room.id}`]}
        onchange={upload}
        class="tw:block tw:w-full tw:rounded-control tw:border tw:border-input tw:p-2 tw:text-sm"
      />{#if room.icon}<Button
          variant="outline"
          disabled={!!$mutations.pending[`icon:${room.id}`]}
          onclick={(event) => {
            if (event.currentTarget.isConnected)
              controller.rooms.icon(room.id, null);
          }}>{text("removeIcon")}</Button
        >{/if}
    </div>
    <div class="tw:flex tw:flex-wrap tw:gap-2">
      <Button
        variant="outline"
        disabled={!!$mutations.pending.order}
        onclick={(event) => {
          if (event.currentTarget.isConnected) controller.move(room.id, -1);
        }}>{text("moveUp")}</Button
      ><Button
        variant="outline"
        disabled={!!$mutations.pending.order}
        onclick={(event) => {
          if (event.currentTarget.isConnected) controller.move(room.id, 1);
        }}>{text("moveDown")}</Button
      >{#if $nav.roomId === room.id && controller.callbacks.rename}<Button
          variant="outline"
          onclick={(event) => {
            if (event.currentTarget.isConnected) controller.askRename(room.id);
          }}>{text("rename")}</Button
        >{/if}<Button
        variant="destructive"
        onclick={(event) => {
          if (event.currentTarget.isConnected) controller.askArchive(room.id);
        }}>{text("archiveAction")}</Button
      >
    </div>
    {#each [`tint:${room.id}`, `icon:${room.id}`, "order"] as key}{#if $mutations.issues[key]}<p
          role="alert"
          class="tw:break-words tw:text-destructive"
        >
          {homeIssue(lang, $mutations.issues[key]!)}
        </p>{/if}{/each}{#if imageError}<p
        role="alert"
        class="tw:break-words tw:text-destructive"
      >
        {homeIssue(lang, imageError)}
      </p>{/if}
  {/if}
</Dialog>
<Dialog
  open={!!archiveRoom}
  title={text("archiveTitle", { title: archiveRoom?.title ?? "" })}
  description={text("archiveHelp")}
  closeLabel={text("close")}
  onOpenChange={(open) => {
    if (!open) controller.closeSettings();
  }}
  initialFocus={() => archiveCancel}
  returnFocus={focusBack}
>
  {#if archiveRoom}<div class="tw:flex tw:flex-wrap tw:gap-2">
      <Button
        bind:ref={archiveCancel}
        variant="outline"
        onclick={(event) => {
          if (event.currentTarget.isConnected) controller.closeSettings();
        }}>{text("cancel")}</Button
      ><Button
        variant="destructive"
        loading={!!$mutations.pending[`archive:${archiveRoom.id}`]}
        onclick={(event) => {
          if (event.currentTarget.isConnected) controller.confirmArchive();
        }}>{text("archiveAction")}</Button
      >
    </div>
    {#if $mutations.issues[`archive:${archiveRoom.id}`]}<p
        role="alert"
        class="tw:break-words tw:text-destructive"
      >
        {homeIssue(lang, $mutations.issues[`archive:${archiveRoom.id}`]!)}
      </p>{/if}{/if}
</Dialog>
<Dialog
  open={!!renameRoom}
  title={text("rename")}
  closeLabel={text("close")}
  onOpenChange={(open) => {
    if (!open) controller.closeSettings();
  }}
  initialFocus={() => renameInput}
  returnFocus={focusBack}
>
  {#if renameRoom}<form
      class="tw:space-y-3"
      onsubmit={(event) => {
        event.preventDefault();
        void controller.rename();
      }}
    >
      <Label for="native-room-name">{text("name")}</Label><Input
        bind:ref={renameInput}
        id="native-room-name"
        required
        maxlength={120}
        value={$nav.renameDraft}
        oninput={(event) => {
          if (event.currentTarget.isConnected)
            controller.editRename(event.currentTarget.value);
        }}
        disabled={$nav.renameBusy ||
          !!$mutations.pending[`rename:${renameRoom.id}`]}
      />
      <div class="tw:flex tw:flex-wrap tw:gap-2">
        <Button
          variant="outline"
          onclick={(event) => {
            if (event.currentTarget.isConnected) controller.closeSettings();
          }}>{text("cancel")}</Button
        ><Button
          type="submit"
          loading={$nav.renameBusy ||
            !!$mutations.pending[`rename:${renameRoom.id}`]}
          >{text("save")}</Button
        >
      </div>
      {#if $mutations.issues[`rename:${renameRoom.id}`]}<p
          role="alert"
          class="tw:break-words tw:text-destructive"
        >
          {homeIssue(lang, $mutations.issues[`rename:${renameRoom.id}`]!)}
        </p>{/if}
    </form>{/if}
</Dialog>
{#if $draft.unknown && $draft.unknown.roomId === $nav.roomId}<aside
    data-vb-native="home-notice"
    role="status"
    class="tw:fixed tw:bottom-4 tw:right-4 tw:z-30 tw:flex tw:max-w-[calc(100vw-2rem)] tw:items-start tw:gap-2 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-foreground tw:shadow-lg"
  >
    <p class="tw:m-0 tw:break-words">
      {text("unknown", { who: $draft.unknown.names.join(", ") })}
    </p>
    <IconButton
      icon="close"
      label={text("dismiss")}
      onclick={(event) => {
        if (event.currentTarget.isConnected) controller.personal.clearNotice();
      }}
    />
  </aside>{/if}

{#if $personal.updateAvailable}<Button
    data-vb-native="update"
    class="tw:fixed tw:bottom-4 tw:left-1/2 tw:z-30 tw:max-w-[calc(100vw-2rem)] tw:-translate-x-1/2 tw:whitespace-normal tw:shadow-lg"
    onclick={(event) => {
      if (event.currentTarget.isConnected) onreload();
    }}>{text("update")}</Button
  >{/if}
