<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  import { orderedRooms } from "../home/model";
  import { homeText, type HomeLanguage } from "../home/copy";
  import RoomTile from "../home/RoomTile.svelte";
  import { createNavigationPresentation } from "./presentation";
  import DeferredViewStatus from "../deferred-view/DeferredViewStatus.svelte";
  import { get } from "svelte/store";
  import { untrack } from "svelte";
  import type { AppNavigationSession } from "./controller";
  let {
    controller,
    lang,
    theme = "auto",
    ontheme,
    onlanguage,
    onreload = () => location.reload(),
    inRoom = false,
    loadDialogs = () =>
      import("./AppNavigationDialogs.svelte").then((module) => module.default),
  }: {
    controller: AppNavigationSession;
    lang: HomeLanguage;
    theme?: "auto" | "light" | "dark";
    ontheme: () => void;
    onlanguage: (lang: HomeLanguage) => void;
    onreload?: () => void;
    inRoom?: boolean;
    /** Public-code transport seam; owners and canonical records are never supplied by the loader. */
    loadDialogs?: () => Promise<
      typeof import("./AppNavigationDialogs.svelte").default
    >;
  } = $props();
  const personal = $derived(controller.personal.state),
    draft = $derived(controller.personal.draft),
    nav = $derived(controller.state),
    mutations = $derived(controller.rooms.state),
    search = $derived(controller.search.state);
  const text = (
    key: Parameters<typeof homeText>[1],
    vars?: Record<string, string | number>,
  ) => homeText(lang, key, vars);
  const selectedRoom = $derived(
    $personal.me?.books.find((room) => room.id === $nav.settingsId),
  );
  const archiveRoom = $derived(
    $personal.me?.books.find((room) => room.id === $nav.archiveId),
  );
  const renameRoom = $derived(
    $personal.me?.books.find((room) => room.id === $nav.renameId),
  );
  let homeButton = $state<HTMLButtonElement | null>(null);
  const presentation = untrack(() =>
    createNavigationPresentation(controller, loadDialogs),
  );
  const presentationView = presentation.state,
    moduleView = presentation.module.state;
  const Dialogs = $derived($moduleView.component);
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
  onDestroy(() => {
    presentation.dispose();
    controller.pageLeft();
  });
  onMount(() => {
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
      controller.pageLeft();
      document.removeEventListener("keydown", shortcut);
    };
  });
  const focusBack = () => controller.returnFocus(homeButton);
</script>

<div
  data-vb-native="room-navigation"
  data-native-app-navigation
  class={[
    "tw:col-start-1 tw:row-start-1 tw:min-h-0 tw:min-w-0 tw:w-full tw:items-center tw:gap-2 tw:bg-background tw:p-2 tw:font-sans tw:text-foreground tw:min-[901px]:sticky tw:min-[901px]:top-0 tw:min-[901px]:flex tw:min-[901px]:h-dvh tw:min-[901px]:flex-col tw:min-[901px]:border-r tw:min-[901px]:border-border",
    inRoom ? "tw:hidden" : "tw:flex tw:flex-row",
  ]}
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
    class="tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-row tw:gap-2 tw:overflow-x-auto tw:min-[901px]:flex-col tw:min-[901px]:overflow-x-hidden tw:min-[901px]:overflow-y-auto"
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
{#if Dialogs}<Dialogs
    {controller}
    {lang}
    {presentation}
    fallback={() => homeButton}
  />{:else if $presentationView}{#key $presentationView}<Snapshot
      value={$presentationView}
      >{#snippet children(intent)}<Dialog
          open={presentation.owns(intent)}
          title={text(
            intent.kind === "create"
              ? "new"
              : intent.kind === "settings"
                ? "settings"
                : intent.kind,
          )}
          closeLabel={text("close")}
          onOpenChange={(open) => {
            if (!open && get(moduleView).phase !== "ready")
              presentation.close(intent);
          }}
          returnFocus={() =>
            get(moduleView).phase === "ready"
              ? null
              : presentation.returnFocus(intent, homeButton)}
          ><DeferredViewStatus
            phase={$moduleView.phase}
            {lang}
            label={text(
              intent.kind === "create"
                ? "new"
                : intent.kind === "settings"
                  ? "settings"
                  : intent.kind,
            )}
            current={() => presentation.owns(intent)}
            retry={() => {
              if (presentation.owns(intent)) void presentation.module.retry();
            }}
          /><Button
            variant="outline"
            onclick={(event) => {
              if (
                event.currentTarget.isConnected &&
                get(moduleView).phase !== "ready"
              )
                presentation.close(intent);
            }}>{text("cancel")}</Button
          ></Dialog
        >{/snippet}</Snapshot
    >{/key}{/if}

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
