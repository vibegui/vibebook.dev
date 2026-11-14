<script lang="ts">
  import { onMount, onDestroy, untrack } from "svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Card from "../../lib/ui/Card.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import { buttonVariants } from "../../lib/ui/button";
  import type { HomeBridge } from "./types";
  import { createArchivedSession } from "./session";
  import { homeText, homeIssue } from "./copy";
  import { roomInitials, targetHref } from "./model";
  let { personal, lang, ago, onnavigate, onhome }: HomeBridge = $props();
  const session = untrack(() => createArchivedSession(personal)),
    view = session.state;
  const text = (
    key: Parameters<typeof homeText>[1],
    vars?: Record<string, string | number>,
  ) => homeText(lang, key, vars);
  onDestroy(() => session.dispose());
  onMount(() => {
    let previous = personal.peek();
    const stop = personal.state.subscribe(({ me }) => {
      if (previous && me && me !== previous) void session.load();
      previous = me;
    });
    void session.load();
    return () => {
      stop();
      session.dispose();
    };
  });
</script>

<svelte:head><title>{text("archive")} · vibebook</title></svelte:head>
<main
  data-vb-native="archived"
  class="tw:min-h-dvh tw:bg-background tw:p-4 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground tw:sm:p-8"
>
  <div class="tw:mx-auto tw:max-w-5xl tw:space-y-6">
    <header
      class="tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3"
    >
      <div>
        <Heading level={1} class="tw:m-0 tw:text-2xl tw:font-semibold"
          >{text("archive")}</Heading
        >
        <p class="tw:m-0 tw:text-muted-foreground">{text("archived")}</p>
      </div>
      <a
        href="/app?ui=svelte"
        class={buttonVariants({ variant: "outline" })}
        onclick={(event) => {
          if (
            !event.currentTarget.isConnected ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          event.preventDefault();
          onhome();
        }}>{text("back")}</a
      >
    </header>
    {#if $view.loading}<p role="status">
        {text($view.loaded ? "refreshing" : "loading")}
      </p>{/if}
    <div class="tw:grid tw:gap-4 tw:sm:grid-cols-2">
      {#each $view.books as room (room.id)}<Card class="tw:space-y-3"
          ><div
            class="tw:grid tw:h-24 tw:place-items-center tw:rounded-control tw:bg-muted tw:text-2xl tw:font-semibold"
          >
            {roomInitials(room.title)}
          </div>
          <Heading
            level={2}
            class="tw:m-0 tw:break-words tw:text-lg tw:font-semibold"
            >{room.title}</Heading
          >{#if room.summary}<p
              class="tw:m-0 tw:break-words tw:text-muted-foreground"
            >
              {room.summary}
            </p>{/if}
          <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
            {text("archivedAgo", { ago: ago(room.archived_at) })}
          </p>
          <div class="tw:flex tw:flex-wrap tw:gap-2">
            <a
              href={targetHref({ roomId: room.id })}
              class={buttonVariants({ variant: "ghost" })}
              onclick={(event) => {
                if (
                  event.ctrlKey ||
                  event.metaKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                if (event.currentTarget.isConnected)
                  onnavigate({ roomId: room.id });
              }}>{text("open")}</a
            ><Button
              variant="outline"
              loading={$view.pending === room.id}
              disabled={!!$view.pending}
              onclick={(event) => {
                if (event.currentTarget.isConnected)
                  void session.restore(room.id);
              }}>{text("restore")}</Button
            >
          </div></Card
        >{/each}
    </div>
    {#if $view.loaded && !$view.books.length}<p>{text("noArchived")}</p>{/if}
    {#if $view.error}<p role="alert" class="tw:break-words tw:text-destructive">
        {homeIssue(lang, $view.error)}
      </p>
      <Button
        variant="outline"
        loading={$view.loading}
        onclick={(event) => {
          if (event.currentTarget.isConnected) void session.load();
        }}>{text("retry")}</Button
      >{/if}
  </div>
</main>
