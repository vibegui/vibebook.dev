<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Textarea from "../../lib/ui/Textarea.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import { TINTS } from "../../../shared/schemas";
  import {
    roomMatches,
    targetHref,
    epicTarget,
    messageTarget,
    type RoomTarget,
  } from "../home/model";
  import { homeText, homeIssue, type HomeLanguage } from "../home/copy";
  import { roomIconPng } from "../rooms/images";
  import type { AppNavigationSession } from "./controller";
  let { controller, lang, focusBack, current }: { controller: AppNavigationSession; lang: HomeLanguage; focusBack(): HTMLElement | null; current(): boolean } = $props();
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
  let searchInput = $state<HTMLInputElement | null>(null),
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
  onMount(() => { mounted = true; });
  onDestroy(() => { mounted = false; imageSequence++; });
  async function upload(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    const input = event.currentTarget,
      file = input.files?.[0],
      id = $nav.settingsId;
    if (!current() || !mounted || !input.isConnected || !file || !id) return;
    const ticket = ++imageSequence,
      identity = $personal.identityRevision;
    imageBusy = true;
    imageError = "";
    try {
      const image = await roomIconPng(file);
      if (
        current() && mounted &&
        ticket === imageSequence &&
        identity === $personal.identityRevision &&
        input.isConnected &&
        $nav.settingsId === id
      )
        await controller.rooms.icon(id, image);
    } catch (error) {
      if (
        current() && mounted &&
        ticket === imageSequence &&
        identity === $personal.identityRevision
      )
        imageError = error instanceof Error ? error.message : "network";
    } finally {
      if (
        current() && mounted &&
        ticket === imageSequence &&
        identity === $personal.identityRevision
      )
        imageBusy = false;
    }
  }

</script>

<Dialog
  open={$search.open}
  title={text("search")}
  closeLabel={text("close")}
  onOpenChange={(open) => {
    if (!open && current()) controller.search.close();
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
      if (current() && event.currentTarget.isConnected)
        controller.search.edit(event.currentTarget.value);
    }}
    onkeydown={(event) => {
      if (!current() || !event.currentTarget.isConnected) return;
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
          if (!current() || !event.currentTarget.isConnected) { event.preventDefault(); return; }
          if (
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
          )
            return;
          event.preventDefault();
          if (current() && event.currentTarget.isConnected)
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
        if (current() && event.currentTarget.isConnected)
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
        if (current() && event.currentTarget.isConnected)
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
            if (!open && current() && !$creator.inline && controller.creator.owns(binding))
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
                !current() ||
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
                  current() && event.currentTarget.isConnected &&
                  !$creator.inline &&
                  controller.creator.owns(binding)
                )
                  controller.creator.edit(event.currentTarget.value, binding);
              }}
              onkeydown={(event) => {
                if (
                  current() && event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.isComposing &&
                  !$creator.inline &&
                  current() && event.currentTarget.isConnected &&
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
                    current() && event.currentTarget.isConnected &&
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
    if (!open && current()) controller.closeSettings();
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
              if (current() && event.currentTarget.isConnected)
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
            if (current() && event.currentTarget.isConnected)
              controller.rooms.icon(room.id, null);
          }}>{text("removeIcon")}</Button
        >{/if}
    </div>
    <div class="tw:flex tw:flex-wrap tw:gap-2">
      <Button
        variant="outline"
        disabled={!!$mutations.pending.order}
        onclick={(event) => {
          if (current() && event.currentTarget.isConnected) controller.move(room.id, -1);
        }}>{text("moveUp")}</Button
      ><Button
        variant="outline"
        disabled={!!$mutations.pending.order}
        onclick={(event) => {
          if (current() && event.currentTarget.isConnected) controller.move(room.id, 1);
        }}>{text("moveDown")}</Button
      >{#if $nav.roomId === room.id && controller.callbacks.rename}<Button
          variant="outline"
          onclick={(event) => {
            if (current() && event.currentTarget.isConnected) controller.askRename(room.id);
          }}>{text("rename")}</Button
        >{/if}<Button
        variant="destructive"
        onclick={(event) => {
          if (current() && event.currentTarget.isConnected) controller.askArchive(room.id);
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
    if (!open && current()) controller.closeSettings();
  }}
  initialFocus={() => archiveCancel}
  returnFocus={focusBack}
>
  {#if archiveRoom}<div class="tw:flex tw:flex-wrap tw:gap-2">
      <Button
        bind:ref={archiveCancel}
        variant="outline"
        onclick={(event) => {
          if (current() && event.currentTarget.isConnected) controller.closeSettings();
        }}>{text("cancel")}</Button
      ><Button
        variant="destructive"
        loading={!!$mutations.pending[`archive:${archiveRoom.id}`]}
        onclick={(event) => {
          if (current() && event.currentTarget.isConnected) controller.confirmArchive();
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
    if (!open && current()) controller.closeSettings();
  }}
  initialFocus={() => renameInput}
  returnFocus={focusBack}
>
  {#if renameRoom}<form
      class="tw:space-y-3"
      onsubmit={(event) => {
        event.preventDefault();
        if (!current() || !event.currentTarget.isConnected) return;
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
          if (current() && event.currentTarget.isConnected)
            controller.editRename(event.currentTarget.value);
        }}
        disabled={$nav.renameBusy ||
          !!$mutations.pending[`rename:${renameRoom.id}`]}
      />
      <div class="tw:flex tw:flex-wrap tw:gap-2">
        <Button
          variant="outline"
          onclick={(event) => {
            if (current() && event.currentTarget.isConnected) controller.closeSettings();
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
