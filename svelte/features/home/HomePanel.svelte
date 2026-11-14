<script lang="ts">
  import { onMount, onDestroy, untrack, tick } from "svelte";
  import { MediaQuery } from "svelte/reactivity";
  import Button from "../../lib/ui/Button.svelte";
  import NotificationBell from "../notifications/NotificationBell.svelte";
  import InstallCard from "../pwa/InstallCard.svelte";
  import Badge from "../../lib/ui/Badge.svelte";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import Card from "../../lib/ui/Card.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import Textarea from "../../lib/ui/Textarea.svelte";
  import type { HomeBridge } from "./types";
  import { createHomeSession } from "./session";
  import { homeText, homeIssue } from "./copy";
  import {
    orderedRooms,
    recentRooms,
    destinations,
    roomMembers,
    personAvatar,
  } from "./model";
  import RoomTile from "./RoomTile.svelte";
  import WaitList from "./WaitList.svelte";
  import Onboarding from "../onboarding/Onboarding.svelte";
  import { createOnboardingSession } from "../onboarding/session";
  let {
    pwa,
    personal,
    rooms,
    profile,
    creator,
    onlanguage,
    lang,
    ago,
    onnavigate,
    onhome,
    onarchived,
    onnew,
    onsettings,
    onroomsettings,
    onsearch,
    oninbox,
  }: HomeBridge = $props();
  const account = $derived(personal.state),
    draft = $derived(personal.draft);
  const mobile = new MediaQuery("(max-width:720px)");
  const session = untrack(() => createHomeSession(personal, onnavigate)),
    view = session.state;
  const onboarding = untrack(() => {
      let storage: Storage | null = null;
      try {
        storage = localStorage;
      } catch {
        /* Browser storage may be disabled. */
      }
      return createOnboardingSession(personal, profile, creator, { storage });
    }),
    onboardingView = onboarding.state;
  const text = (
    key: Parameters<typeof homeText>[1],
    vars?: Record<string, string | number>,
  ) => homeText(lang, key, vars);
  let sendButton = $state<HTMLButtonElement | null>(null);
  const suggestion = $derived($view.result);
  $effect(() => {
    if (suggestion)
      void tick().then(() => {
        if (sendButton?.isConnected) sendButton.focus();
      });
  });
  let mounted = false,
    agentTimer: ReturnType<typeof setTimeout> | undefined,
    copyStatus = $state("");
  onDestroy(() => {
    onboarding.dispose();
    session.dispose();
  });
  onMount(() => {
    mounted = true;
    void personal.refresh();
    const poll = () => {
      if (!mounted) return;
      if (!$onboardingView.visible && !$account.agents?.agents.length)
        void personal.refreshAgents();
      agentTimer = setTimeout(poll, 15_000);
    };
    poll();
    return () => {
      mounted = false;
      clearTimeout(agentTimer);
      session.dispose();
    };
  });
  const setup = $derived(
    `Read ${location.origin}/llms.txt and set up vibebook for this project.`,
  );
  async function copy() {
    try {
      if (!navigator.clipboard) throw Error("unavailable");
      await navigator.clipboard.writeText(setup);
      if (mounted) copyStatus = "copied";
    } catch {
      if (mounted) copyStatus = "copyFailed";
    }
  }
</script>

<svelte:head><title>vibebook</title></svelte:head>
{#if $onboardingView.visible}
  <Onboarding owner={onboarding} {lang} {onlanguage} />
{:else}
  <main
    data-vb-native="home"
    class="tw:min-h-dvh tw:bg-background tw:p-4 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground tw:sm:p-8"
  >
    <div class="tw:mx-auto tw:max-w-6xl tw:space-y-6">
      <header
        class="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3"
      >
        <a
          href="/"
          class="tw:text-lg tw:font-semibold tw:text-foreground tw:no-underline"
          >vibebook</a
        >
        <div class="tw:flex tw:flex-wrap tw:gap-2">
          {#if oninbox}<Button
              data-native-inbox-toggle
              variant="outline"
              aria-label={text("inbox")}
              aria-haspopup="dialog"
              onclick={(event) => {
                if (event.currentTarget.isConnected)
                  oninbox?.(event.currentTarget);
              }}
              >{text("inbox")}{#if $account.me?.waits.length}<Badge
                  variant="warning"
                  aria-hidden="true">{$account.me.waits.length}</Badge
                >{/if}</Button
            >{/if}
          <NotificationBell owner={pwa} {lang} /><Button
            variant="outline"
            onclick={(event) => {
              if (event.currentTarget.isConnected) onsearch();
            }}>{text("search")}</Button
          ><Button
            variant="ghost"
            onclick={(event) => {
              if (event.currentTarget.isConnected) onsettings("profile");
            }}
            ><Avatar
              name={$account.me?.name || $account.me?.email || "vibebook"}
              src={personAvatar($account.me, $account.me?.email ?? "")}
            />{text("profile")}</Button
          ><Button
            variant="ghost"
            onclick={(event) => {
              if (event.currentTarget.isConnected) onsettings("all");
            }}>{text("settings")}</Button
          >
        </div>
      </header>
      <InstallCard owner={pwa} {lang} />
      {#if !$account.me}{#if $account.loading}<p role="status">
            {text("loading")}
          </p>{/if}{:else}
        {@const me = $account.me}
        <div
          class="tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3"
        >
          <div>
            <Heading
              level={1}
              class="tw:m-0 tw:text-2xl tw:font-semibold tw:leading-8"
              >{me.name
                ? text("greeting", { name: me.name.split(" ")[0] ?? "" })
                : text("home")}</Heading
            >
            <p class="tw:m-0 tw:text-muted-foreground">
              {text("rooms", { n: me.books.length })} · {me.friends.length}
              {text("friends")} ·
              <a
                href="/archived?ui=svelte"
                class="tw:text-link tw:underline tw:underline-offset-2"
                onclick={(event) => {
                  if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  event.preventDefault();
                  if (event.currentTarget.isConnected) onarchived();
                }}>{text("archive")}</a
              >{#if me.waits.length}
                · {text("waiting", { n: me.waits.length })}{/if}
            </p>
          </div>
          <Button
            onclick={(event) => {
              if (event.currentTarget.isConnected) onnew(event.currentTarget);
            }}>{text("new")}</Button
          >
        </div>
        {#if !me.name || !me.avatar}<Card
            class="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:p-3"
            ><p class="tw:m-0 tw:flex-1">
              {!me.name ? text("addName") : text("addPhoto")}
            </p>
            <Button
              variant="outline"
              onclick={(event) => {
                if (event.currentTarget.isConnected) onsettings("profile");
              }}>{text("profile")}</Button
            ></Card
          >{/if}
        {#if $account.agents && !$account.agents.agents.length}<Card
            ><Heading level={2} class="tw:m-0 tw:text-lg tw:font-semibold"
              >{text("setup")}</Heading
            >
            <p class="tw:m-0 tw:text-muted-foreground">{text("setupHelp")}</p>
            <code
              class="tw:block tw:whitespace-pre-wrap tw:break-all tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs"
              >{setup}</code
            ><Button onclick={copy}>{text("copy")}</Button>{#if copyStatus}<p
                role={copyStatus === "copyFailed" ? "alert" : "status"}
              >
                {text(copyStatus === "copyFailed" ? "copyFailed" : "copied")}
              </p>{/if}<Button
              variant="ghost"
              onclick={(event) => {
                if (event.currentTarget.isConnected) onsettings("agents");
              }}>{text("agentSettings")}</Button
            ></Card
          >{/if}
        <form
          class="tw:space-y-3"
          aria-busy={!!$view.busy}
          onsubmit={(event) => {
            event.preventDefault();
            void session.suggest();
          }}
        >
          <Label for="home-ask">{text("ask")}</Label><Textarea
            id="home-ask"
            rows={3}
            maxlength={2000}
            placeholder={text("askPlaceholder")}
            value={$draft.ask}
            disabled={$view.busy === "send"}
            oninput={(event) => session.edit(event.currentTarget.value)}
            onkeydown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.isComposing
              ) {
                event.preventDefault();
                void session.suggest();
              }
            }}
          /><Button
            type="submit"
            loading={$view.busy === "route"}
            disabled={$view.busy === "send"}>{text("find")}</Button
          >
          {#if $view.result}{@const choices = destinations(
              $view.result,
            )}{@const selected = choices[$view.selected]!}<Card
              class="tw:space-y-3 tw:p-4"
              ><p aria-live="polite" class="tw:m-0 tw:break-words">
                {selected.book_id
                  ? text("destination", {
                      where:
                        selected.book_title +
                        (selected.epic_title
                          ? " → " + selected.epic_title
                          : ""),
                    })
                  : text(
                      $view.result.pick ? "createDestination" : "noDestination",
                      { title: selected.book_title },
                    )}
              </p>
              {#if $view.selected === 0 && $view.result.pick && $view.result.reason}<p
                  class="tw:m-0 tw:text-muted-foreground"
                >
                  {$view.result.reason}
                </p>{/if}
              <div class="tw:flex tw:flex-wrap tw:gap-2">
                <Button
                  bind:ref={sendButton}
                  loading={$view.busy === "send"}
                  onclick={() => session.send()}>{text("send")}</Button
                ><Button
                  variant="outline"
                  disabled={$view.busy === "send"}
                  onclick={() => session.cancel()}>{text("cancel")}</Button
                >
              </div>
              <p class="tw:m-0 tw:text-muted-foreground">{text("another")}</p>
              <div class="tw:flex tw:flex-wrap tw:gap-2">
                {#each choices as choice, index}{#if index !== $view.selected}<Button
                      variant="ghost"
                      disabled={!!$view.busy}
                      class="tw:h-auto tw:whitespace-normal tw:text-left"
                      onclick={() => {
                        session.select(index);
                        void tick().then(() => {
                          if (sendButton?.isConnected) sendButton.focus();
                        });
                      }}
                      >{choice.book_id
                        ? choice.book_title +
                          (choice.epic_title ? " → " + choice.epic_title : "")
                        : text("newDestination", {
                            title: choice.book_title,
                          })}</Button
                    >{/if}{/each}
              </div></Card
            >{/if}
          {#if $view.error}<p
              role="alert"
              class="tw:m-0 tw:break-words tw:text-destructive"
            >
              {homeIssue(lang, $view.error)}
            </p>{/if}
        </form>
        {#if mobile.current && me.waits.length}<details>
            <summary class="tw:cursor-pointer tw:p-2"
              >{text("waiting", { n: me.waits.length })}</summary
            ><WaitList
              people={me}
              waits={me.waits}
              {rooms}
              {lang}
              {ago}
              {onnavigate}
            />
          </details>{/if}
        <div class="tw:grid tw:gap-6 tw:lg:grid-cols-[minmax(0,1fr)_18rem]">
          <section aria-label={text("home")} class="tw:min-w-0">
            {#if !me.books.length}<p>{text("empty")}</p>{/if}
            <div
              class="tw:grid tw:grid-cols-3 tw:gap-3 tw:min-[721px]:grid-cols-2"
            >
              {#each mobile.current ? recentRooms(me.books) : orderedRooms(me.books) as room (room.id)}{@const waits =
                  me.waits.filter((wait) => wait.book_id === room.id)}
                <div class="tw:min-w-0 tw:space-y-3">
                  <RoomTile
                    {room}
                    {lang}
                    compact={mobile.current}
                    now={$account.now}
                    seen={$account.seen[room.id] ?? 0}
                    {waits}
                    {onnavigate}
                    onsettings={onroomsettings}
                  />{#if mobile.current}<b
                      class="tw:block tw:break-words tw:text-center"
                      >{room.title}</b
                    >{/if}{#if !mobile.current && waits.length}<div
                      class="tw:rounded-control tw:border tw:border-border tw:bg-card tw:p-3"
                    >
                      <WaitList
                        people={me}
                        waits={waits.slice(0, 3)}
                        {rooms}
                        {lang}
                        {ago}
                        {onnavigate}
                      />{#if waits.length > 3}<details>
                          <summary class="tw:cursor-pointer tw:p-2"
                            >{text("more", { n: waits.length - 3 })}</summary
                          ><WaitList
                            people={me}
                            waits={waits.slice(3)}
                            {rooms}
                            {lang}
                            {ago}
                            {onnavigate}
                          />
                        </details>{/if}
                    </div>{/if}{#if !mobile.current}<div
                      class="tw:flex tw:flex-wrap tw:items-center tw:gap-1"
                    >
                      {#each roomMembers(room).slice(0, 5) as email}<span
                          title={email}
                          ><Avatar
                            name={me.friends.find(
                              (friend) => friend.email === email,
                            )?.name || email}
                            src={personAvatar(me, email)}
                          /></span
                        >{/each}<small class="tw:text-muted-foreground"
                        >{ago(room.updated_at ?? 0)}</small
                      >
                    </div>{/if}
                </div>{/each}
            </div>
          </section>
          <aside class="tw:space-y-4">
            <Card
              ><Heading level={2} class="tw:m-0 tw:text-lg tw:font-semibold"
                >{text("friends")} · {me.friends.length}</Heading
              >{#each me.friends as friend (friend.email)}<div
                  class="tw:flex tw:items-center tw:gap-2"
                >
                  <Avatar
                    name={friend.name || friend.email}
                    src={personAvatar(me, friend.email)}
                  /><span class="tw:min-w-0 tw:break-words"
                    >{friend.name || friend.email}</span
                  >
                </div>{/each}<Button
                variant="outline"
                onclick={(event) => {
                  if (event.currentTarget.isConnected) onsettings("friends");
                }}>{text("manageFriends")}</Button
              ></Card
            ><Button
              variant="outline"
              onclick={(event) => {
                if (event.currentTarget.isConnected) onsettings("agents");
              }}>{text("agentSettings")}</Button
            >
          </aside>
        </div>
      {/if}
      {#if $account.loading && $account.me}<p role="status">
          {text("refreshing")}
        </p>{/if}
      {#if $account.error}<p
          role="alert"
          class="tw:m-0 tw:break-words tw:text-destructive"
        >
          {homeIssue(lang, $account.error)}
        </p>
        <Button
          variant="outline"
          loading={$account.loading}
          onclick={(event) => {
            if (event.currentTarget.isConnected) void personal.refresh();
          }}>{text("retry")}</Button
        >{/if}
    </div>
  </main>
{/if}
