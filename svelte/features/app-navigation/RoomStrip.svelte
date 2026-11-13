<script lang="ts">
  import Button from "../../lib/ui/Button.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import RoomTile from "../home/RoomTile.svelte";
  import { recentRooms } from "../home/model";
  import { homeText, type HomeLanguage } from "../home/copy";
  import type { AppNavigationSession } from "./controller";
  let {
    controller,
    lang,
  }: { controller: AppNavigationSession; lang: HomeLanguage } = $props();
  const personal = $derived(controller.personal.state),
    nav = $derived(controller.state);
</script>

<nav
  data-vb-native="room-strip"
  aria-label={homeText(lang, "home")}
  class="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border-b tw:border-border tw:bg-background tw:p-2 tw:font-sans tw:text-sm tw:text-foreground tw:min-[901px]:hidden"
>
  <Button
    variant="ghost"
    size="sm"
    onclick={(event) => {
      if (event.currentTarget.isConnected) controller.callbacks.home();
    }}>{homeText(lang, "home")}</Button
  >{#each recentRooms($personal.me?.books ?? []).slice(0, 3) as room (room.id)}<RoomTile
      {room}
      {lang}
      compact
      now={$personal.now}
      selected={$nav.roomId === room.id}
      seen={$personal.seen[room.id] ?? 0}
      waits={$personal.me?.waits.filter((wait) => wait.book_id === room.id)
        .length ?? 0}
      onnavigate={controller.callbacks.navigate}
      onsettings={(id, trigger) => controller.openSettings(id, trigger)}
    />{/each}<IconButton
    icon="search"
    label={homeText(lang, "search")}
    onclick={(event) => {
      if (event.currentTarget.isConnected)
        controller.openSearch(event.currentTarget);
    }}
  />
</nav>
