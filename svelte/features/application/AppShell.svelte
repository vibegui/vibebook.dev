<script lang="ts">
  import { onMount, onDestroy, untrack } from "svelte";
  import type { Snippet } from "svelte";
  import type { BrowserApplicationServices } from "./browser";
  import type {
    ApplicationRoomPresentation,
    ApplicationShellEffects,
    ApplicationTheme,
  } from "./shellTypes";
  import { createApplicationShellEffects } from "./shellBrowser";
  import { createApplicationInbox } from "./inbox";
  import AppNavigation from "../app-navigation/AppNavigation.svelte";
  import Home from "../home/HomePanel.svelte";
  import Archived from "../home/ArchivedPanel.svelte";
  import AccountSettings from "../account/AccountSettings.svelte";
  import DeviceLockScreen from "../account/DeviceLockScreen.svelte";
  import Inbox from "../../Inbox.svelte";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  import type { HomeBridge } from "../home/types";
  import { personAvatar } from "../home/model";
  let {
    services,
    roomSnippet,
    effects = createApplicationShellEffects(window, document),
  }: {
    services: BrowserApplicationServices;
    roomSnippet: Snippet<[ApplicationRoomPresentation]>;
    effects?: ApplicationShellEffects;
  } = $props();
  const application = untrack(() => services.state),
    personal = untrack(() => services.personal.state),
    room = untrack(() => services.rootRoom.state);
  const inbox = untrack(() => createApplicationInbox(services)),
    inboxView = inbox.state;
  let active = true,
    theme = $state<ApplicationTheme>(untrack(() => effects.theme()));
  const current = () => active && services.active();
  const ago = (ts: number) => {
    const minutes = Math.round((Date.now() - ts) / 60000);
    return minutes < 1
      ? services.t("agora")
      : minutes < 60
        ? `${minutes} min`
        : minutes < 1440
          ? `${Math.round(minutes / 60)} h`
          : `${Math.round(minutes / 1440)} d`;
  };
  function nextTheme() {
    if (!current()) return;
    theme = theme === "auto" ? "light" : theme === "light" ? "dark" : "auto";
    effects.setTheme(theme);
  }
  const language = (value: "pt" | "en") => {
    if (current() && value !== services.language) effects.setLanguage(value);
  };
  const displayName = (email: string) =>
    $room.room?.names?.[email] ||
    ($personal.me?.email === email
      ? $personal.me.name
      : $personal.me?.friends.find((friend) => friend.email === email)?.name) ||
    email.split("@")[0]!;
  const avatar = (email: string) => {
    const version = $room.room?.avatars?.[email];
    return version
      ? `/api/avatar/${encodeURIComponent(email)}?v=${version}`
      : personAvatar($personal.me, email);
  };
  const home = $derived<HomeBridge>({
    pwa: services.pwa,
    personal: services.personal,
    rooms: services.rooms,
    profile: services.account,
    creator: services.navigation.creator,
    lang: services.language,
    ago,
    onnavigate: (target) => {
      if (current()) services.actions.navigate(target);
    },
    onhome: () => {
      if (current()) services.actions.home();
    },
    onarchived: () => {
      if (current()) services.actions.archived();
    },
    onnew: (trigger) => {
      if (current()) services.navigation.openCreate(trigger);
    },
    onsettings: (section) => {
      if (current()) services.actions.openAccount(section);
    },
    onroomsettings: (id, trigger) => {
      if (current()) services.navigation.openSettings(id, trigger);
    },
    onsearch: () => {
      if (current()) services.navigation.openSearch();
    },
    onlanguage: language,
  });
  onMount(() => {
    effects.documentLanguage(services.language);
    const stopTheme = effects.listenTheme(() => {
      if (active) theme = effects.theme();
    });
    const stopNavigation = effects.listenNavigation((event, anchor) => {
      if (
        !current() ||
        !anchor.isConnected ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download")
      )
        return;
      event.preventDefault();
      services.actions.navigate(anchor.href);
    });
    services.start();
    return () => {
      stopTheme();
      stopNavigation();
    };
  });
  onDestroy(() => {
    active = false;
    inbox.dispose();
    services.dispose();
  });
</script>

<div data-vb-native data-native-app-shell class={[$application.route.kind === "room" ? "tw:grid tw:h-dvh tw:min-h-0 tw:grid-cols-[minmax(0,1fr)] tw:grid-rows-[auto_minmax(0,1fr)] tw:overflow-hidden" : "tw:min-h-dvh", "tw:bg-background tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground"]}>
  {#if !$application.sessionDenied}
    {#if $personal.me}<AppNavigation controller={services.navigation} lang={services.language} {theme} ontheme={nextTheme} onlanguage={language} onreload={() => { if (current()) services.actions.reload(); }}/>{/if}
    {#if $application.route.kind === "home"}<Home {...home}/>
    {:else if $application.route.kind === "archived"}<Archived {...home}/>
    {:else if $application.route.kind === "room"}<div data-native-room-root class="tw:col-start-1 tw:row-start-2 tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-hidden">{@render roomSnippet({ services, openInbox: inbox.open })}</div>{/if}
    <AccountSettings owner={services.account} device={services.device} pwa={services.pwa} agents={services.agents} origin={effects.origin} lang={services.language} vb={{ t: services.t, ago }} {theme} onTheme={nextTheme} onLanguage={language} onArchive={() => { if (current()) { services.account.close(); services.actions.archived(); } }} onLogout={all => { if (current() && services.account.current()) void services.actions.logout(all); }}/>
    {#if $inboxView.binding}{#key $inboxView.binding}<Snapshot value={$inboxView.binding}>
      {#snippet children(binding)}
        <Inbox waits={$personal.me?.waits ?? []} roomId={$room.roomId} all={$inboxView.all} vb={{ t: services.t, ago }} displayName={displayName} avatarUrl={avatar}
          ontab={all => inbox.tab(binding, all)} onclose={() => inbox.close(binding)} onresolve={wait => inbox.resolve(binding, wait)}
          onopen={(wait, event) => { if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); if (event.currentTarget instanceof Element && event.currentTarget.isConnected) inbox.openWait(binding, wait); }}/>
      {/snippet}
    </Snapshot>{/key}{/if}
  {/if}
  <DeviceLockScreen owner={services.device} lang={services.language} />
</div>
