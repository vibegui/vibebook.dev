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
  import DeviceLockScreen from "../account/DeviceLockScreen.svelte";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import { createDeferredModule } from "../deferred-view/module";
  import DeferredViewStatus from "../deferred-view/DeferredViewStatus.svelte";
  import DeferredRouteStatus from "../deferred-view/DeferredRouteStatus.svelte";
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
  const homeModule = untrack(() =>
      createDeferredModule(
        () =>
          import("../home/HomePanel.svelte").then((module) => module.default),
        { current },
      ),
    ),
    homeModuleView = homeModule.state;
  const archivedModule = untrack(() =>
      createDeferredModule(
        () =>
          import("../home/ArchivedPanel.svelte").then(
            (module) => module.default,
          ),
        { current },
      ),
    ),
    archivedModuleView = archivedModule.state;
  const accountModule = untrack(() =>
      createDeferredModule(
        () =>
          import("../account/AccountSettings.svelte").then(
            (module) => module.default,
          ),
        { current },
      ),
    ),
    accountModuleView = accountModule.state;
  const inboxModule = untrack(() =>
      createDeferredModule(
        () => import("../../Inbox.svelte").then((module) => module.default),
        { current },
      ),
    ),
    inboxModuleView = inboxModule.state;
  const Home = $derived($homeModuleView.component),
    Archived = $derived($archivedModuleView.component),
    AccountSettings = $derived($accountModuleView.component),
    Inbox = $derived($inboxModuleView.component);
  const accountView = untrack(() => services.account.state);
  $effect(() => {
    $application.lifecycle;
    if (!$application.sessionDenied) {
      if ($application.route.kind === "home") void homeModule.ensure();
      if ($application.route.kind === "archived") void archivedModule.ensure();
      if ($accountView.open) void accountModule.ensure();
      if ($inboxView.binding) void inboxModule.ensure();
    }
  });
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
    homeModule.dispose();
    archivedModule.dispose();
    accountModule.dispose();
    inboxModule.dispose();
    inbox.dispose();
    services.dispose();
  });
</script>

<div
  data-vb-native
  data-native-app-shell
  class={[
    $application.route.kind === "room"
      ? "tw:grid tw:h-dvh tw:min-h-0 tw:grid-cols-[minmax(0,1fr)] tw:grid-rows-[minmax(0,1fr)] tw:overflow-hidden tw:min-[901px]:grid-cols-[68px_minmax(0,1fr)]"
      : "tw:grid tw:min-h-dvh tw:grid-cols-[minmax(0,1fr)] tw:grid-rows-[auto_1fr] tw:min-[901px]:grid-cols-[68px_minmax(0,1fr)] tw:min-[901px]:grid-rows-[auto]",
    "tw:bg-background tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground",
  ]}
>
  {#if !$application.sessionDenied}
    {#if $personal.me}<AppNavigation
        controller={services.navigation}
        inRoom={$application.route.kind === "room"}
        lang={services.language}
        {theme}
        ontheme={nextTheme}
        onlanguage={language}
        onreload={() => {
          if (current()) services.actions.reload();
        }}
      />{/if}
    <div
      data-native-application-route
      class={$application.route.kind === "room"
        ? "tw:col-start-1 tw:row-start-1 tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-hidden tw:min-[901px]:col-start-2"
        : "tw:col-start-1 tw:row-start-2 tw:min-w-0 tw:min-[901px]:col-start-2 tw:min-[901px]:row-start-1"}
    >
      {#if $application.route.kind === "home"}{#if Home}<Home
            {...home}
          />{:else}<DeferredRouteStatus
            phase={$homeModuleView.phase}
            lang={services.language}
            label={services.language === "en"
              ? "Your vibebooks"
              : "Seus vibebooks"}
            retry={() => {
              void homeModule.retry();
            }}
            {current}
          />{/if}
      {:else if $application.route.kind === "archived"}{#if Archived}<Archived
            {...home}
          />{:else}<DeferredRouteStatus
            phase={$archivedModuleView.phase}
            lang={services.language}
            label={services.language === "en"
              ? "Archived rooms"
              : "Salas arquivadas"}
            retry={() => {
              void archivedModule.retry();
            }}
            {current}
          />{/if}
      {:else if $application.route.kind === "room"}<div
          data-native-room-root
          class="tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-hidden"
        >
          {@render roomSnippet({ services, openInbox: inbox.open })}
        </div>{/if}
    </div>
    {#if AccountSettings}
      <AccountSettings
        owner={services.account}
        device={services.device}
        pwa={services.pwa}
        agents={services.agents}
        origin={effects.origin}
        lang={services.language}
        vb={{ t: services.t, ago }}
        {theme}
        onTheme={nextTheme}
        onLanguage={language}
        onArchive={() => {
          if (current()) {
            services.account.close();
            services.actions.archived();
          }
        }}
        onLogout={(all) => {
          if (current() && services.account.current())
            void services.actions.logout(all);
        }}
      />
    {:else if $accountView.open && $accountView.binding}{#key $accountView.binding}<Snapshot
          value={$accountView.binding}
          >{#snippet children(binding)}<Dialog
              open
              title={services.language === "en" ? "Your account" : "Sua conta"}
              closeLabel={services.t("Fechar")}
              sheet
              returnFocus={services.account.returnFocus}
              onOpenChange={(open) => {
                if (
                  !open &&
                  !AccountSettings &&
                  current() &&
                  services.account.owns(binding)
                )
                  services.account.close(binding);
              }}
              ><DeferredViewStatus
                phase={$accountModuleView.phase}
                lang={services.language}
                label={services.language === "en"
                  ? "Your account"
                  : "Sua conta"}
                retry={() => {
                  void accountModule.retry();
                }}
                current={() => current() && services.account.owns(binding)}
              /></Dialog
            >{/snippet}</Snapshot
        >{/key}{/if}
    {#if $inboxView.binding}{#key $inboxView.binding}<Snapshot
          value={$inboxView.binding}
        >
          {#snippet children(binding)}
            {#if Inbox}<Inbox
                waits={$personal.me?.waits ?? []}
                roomId={$room.roomId}
                all={$inboxView.all}
                vb={{ t: services.t, ago }}
                {displayName}
                avatarUrl={avatar}
                ontab={(all) => inbox.tab(binding, all)}
                onclose={() => inbox.close(binding)}
                onresolve={(wait) => inbox.resolve(binding, wait)}
                onopen={(wait, event) => {
                  if (
                    event.button !== 0 ||
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  event.preventDefault();
                  if (
                    event.currentTarget instanceof Element &&
                    event.currentTarget.isConnected
                  )
                    inbox.openWait(binding, wait);
                }}
              />{:else}<Dialog
                open
                title={services.t("Caixa de entrada")}
                closeLabel={services.t("Fechar")}
                onOpenChange={(open) => {
                  if (!open && !Inbox && current()) inbox.close(binding);
                }}
                ><DeferredViewStatus
                  phase={$inboxModuleView.phase}
                  lang={services.language}
                  label={services.language === "en"
                    ? "Inbox"
                    : "Caixa de entrada"}
                  retry={() => {
                    void inboxModule.retry();
                  }}
                  current={() => current() && inbox.owns(binding)}
                /></Dialog
              >{/if}
          {/snippet}
        </Snapshot>{/key}{/if}
  {/if}
  <DeviceLockScreen owner={services.device} lang={services.language} />
</div>
