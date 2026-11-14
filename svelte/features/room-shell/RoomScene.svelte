<script lang="ts">
  import { onDestroy, tick, untrack } from "svelte";
  import { get } from "svelte/store";
  import type { ApplicationRoomPresentation } from "../application/shellTypes";
  import type { ApplicationRoomScope } from "../application/types";
  import type { RoomResources } from "../application/roomResources";
  import type { RoomScope, RoomScopeBrowser } from "../room-scope/types";
  import type { RoomLayoutBrowser } from "../room-layout/types";
  import { createRoomScope } from "../room-scope/controller";
  import { createRoomScopeBrowser } from "../room-scope/browser";
  import { createRoomLayout } from "../room-layout/controller";
  import { createRoomLayoutBrowser } from "../room-layout/browser";
  import RoomLayout from "../room-layout/RoomLayout.svelte";
  import Sidebar from "../../Sidebar.svelte";
  import Chat from "../../Chat.svelte";
  import Composer from "../../Composer.svelte";
  import DocumentPanel from "../documents/DocumentPanel.svelte";
  import DocumentToolbar from "../documents/DocumentToolbar.svelte";
  import AgentBanners from "../agents/AgentBanners.svelte";
  import ThreadFiles from "../file-viewer/ThreadFiles.svelte";
  import SuggestionPreview from "../room-sidebar/SuggestionPreview.svelte";
  import RoomHeader from "./RoomHeader.svelte";
  import { attachRoomEdgeBack } from "./edgeBack";
  import type { RoomLayoutCells } from "../room-layout/types";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  import { viewerText } from "../file-viewer/copy";
  import { createDeferredModule } from "../deferred-view/module";
  import DeferredViewStatus from "../deferred-view/DeferredViewStatus.svelte";
  let {
    presentation,
    resources,
    scope,
    browser: suppliedBrowser,
    layoutBrowser: suppliedLayoutBrowser,
  }: {
    presentation: ApplicationRoomPresentation;
    resources: RoomResources;
    scope: ApplicationRoomScope;
    browser?: RoomScopeBrowser;
    layoutBrowser?: RoomLayoutBrowser;
  } = $props();
  const services = untrack(() => presentation.services),
    captured = untrack(() => scope);
  let active = true,
    scoped: RoomScope | undefined;
  const current = () => active && services.ownsRoom(captured);
  const browser = untrack(
    () => suppliedBrowser ?? createRoomScopeBrowser(window, document),
  );
  const layout = untrack(() =>
    createRoomLayout({
      scopeKey: JSON.stringify([
        captured.roomId,
        captured.account,
        captured.identityRevision,
        captured.roomGeneration,
      ]),
      current,
      onDocumentClosed: () => scoped?.actions.closeDocument(),
      onPane: (pane) => {
        if (current() && get(services.state).pane !== pane)
          services.actions.selectPane(pane);
      },
      browser: suppliedLayoutBrowser ?? createRoomLayoutBrowser(window),
    }),
  );
  const owner = untrack(() =>
      createRoomScope({ services, resources, layout, browser }),
    ),
    view = owner.state,
    geometry = layout.state;
  scoped = owner;
  function back(expectedThread: string) {
    const value = get(owner.state);
    if (!current() || !value || value.header.thread !== expectedThread) return;
    if (expectedThread !== "main") owner.actions.setThread("main");
    else services.actions.home();
  }
  function edgeBack(cells: RoomLayoutCells) {
    const win = cells.root.ownerDocument.defaultView;
    return attachRoomEdgeBack(cells.root, {
      current,
      mobile: () => get(layout.state).mobile,
      standalone: () => !!win && (win.matchMedia("(display-mode: standalone)").matches || ("standalone" in win.navigator && win.navigator.standalone === true)),
      target: () => get(owner.state)?.header.thread ?? "",
      back,
    });
  }
  const boardModule = untrack(() =>
      createDeferredModule(
        () => import("../../Board.svelte").then((module) => module.default),
        { current },
      ),
    ),
    boardView = boardModule.state;
  const filesModule = untrack(() =>
      createDeferredModule(
        () => import("../../Files.svelte").then((module) => module.default),
        { current },
      ),
    ),
    filesView = filesModule.state;
  const decisionsModule = untrack(() =>
      createDeferredModule(
        () => import("../../Decisions.svelte").then((module) => module.default),
        { current },
      ),
    ),
    decisionsView = decisionsModule.state;
  const remindersModule = untrack(() =>
      createDeferredModule(
        () => import("../../Reminders.svelte").then((module) => module.default),
        { current },
      ),
    ),
    remindersView = remindersModule.state;
  const appsModule = untrack(() =>
      createDeferredModule(
        () =>
          import("../apps/AppsPanel.svelte").then((module) => module.default),
        { current },
      ),
    ),
    appsView = appsModule.state;
  const agentsModule = untrack(() =>
      createDeferredModule(
        () =>
          import("../agents/AgentsPane.svelte").then(
            (module) => module.default,
          ),
        { current },
      ),
    ),
    agentsView = agentsModule.state;
  const viewerModule = untrack(() =>
      createDeferredModule(
        () =>
          import("../file-viewer/FileViewer.svelte").then(
            (module) => module.default,
          ),
        { current },
      ),
    ),
    viewerView = viewerModule.state;
  const Board = $derived($boardView.component),
    Files = $derived($filesView.component),
    Decisions = $derived($decisionsView.component),
    Reminders = $derived($remindersView.component),
    AppsPanel = $derived($appsView.component),
    AgentsPane = $derived($agentsView.component),
    FileViewer = $derived($viewerView.component);
  const viewerState = owner.viewer.state;
  const documentShown = $derived(
    !$geometry.boardFull &&
      ($geometry.mobile
        ? $geometry.sheet === "doc" || $geometry.presentedSheet === "doc"
        : $geometry.documentVisible),
  );
  let boardMounted = $state(false);
  $effect(() => {
    if ($geometry.boardFull || (documentShown && $geometry.pane === "board")) {
      boardMounted = true;
      void boardModule.ensure();
    }
    if (documentShown) {
      if ($geometry.pane === "files") void filesModule.ensure();
      if ($geometry.pane === "apps") void appsModule.ensure();
      if ($geometry.pane === "decisions") void decisionsModule.ensure();
      if ($geometry.pane === "reminders") void remindersModule.ensure();
      if ($geometry.pane === "agents") void agentsModule.ensure();
    }
    if ($viewerState.open) void viewerModule.ensure();
  });
  $effect(() => {
    const revision = $view?.chatRevision;
    if (revision === undefined) return;
    void tick().then(() => {
      if (current() && owner.current() && get(view)?.chatRevision === revision)
        owner.chatRendered(revision);
    });
  });
  onDestroy(() => {
    active = false;
    boardModule.dispose();
    filesModule.dispose();
    decisionsModule.dispose();
    remindersModule.dispose();
    appsModule.dispose();
    agentsModule.dispose();
    viewerModule.dispose();
    owner.dispose();
    layout.dispose();
    scoped = undefined;
  });
  function filesSurface(node: HTMLElement) {
    return { destroy: owner.attachFiles(node) };
  }
  function taskSurface(node: HTMLElement) {
    return { destroy: owner.attachAttention(node) };
  }
  const labels = {
    documentWidth:
      services.language === "en" ? "Document width" : "Largura do documento",
    closeDocument:
      services.language === "en" ? "Close document" : "Fechar documento",
    closeSidebar: services.language === "en" ? "Close sidebar" : "Fechar menu",
    closeSheet: services.t("Fechar"),
    historyUnconfirmed:
      services.language === "en"
        ? "Navigation is not confirmed. Review the current page before continuing."
        : "A navegação ainda não foi confirmada. Confira a página atual antes de continuar.",
    historyRetry: services.t("Tentar de novo"),
    animationUnavailable:
      services.language === "en"
        ? "Room layout could not initialize. Reload the page to try again."
        : "Não foi possível iniciar o layout da sala. Recarregue a página para tentar novamente.",
  };
</script>

<RoomLayout controller={layout} {labels} onChatSurface={owner.attachChat} onCells={edgeBack}>
  {#snippet sidebar()}{#if $view}<Sidebar
        {...$view.sidebar}
        oninbox={() => {
          if (current()) presentation.openInbox();
        }}
        hideSheetHandle
      />{/if}{/snippet}
  {#snippet header()}{#if $view}<RoomHeader
        {presentation}
        header={$view.header}
        trigger={$view.trigger}
        boardCount={$view.toolbar.counts?.board}
        {layout}
        {current}
        {back}
      />{/if}{/snippet}
  {#snippet peek()}{#if $view}<DocumentToolbar {...$view.peek} />{/if}{/snippet}
  {#snippet attention()}{#if $view}
      <div class="tw:px-4">
        <div class={$geometry.boardFull ? "tw:hidden" : ""}>
          {#if $view.banners}<AgentBanners {...$view.banners} />{/if}
        </div>
        <ThreadFiles {...$view.threadFiles} />
      </div>
    {/if}{/snippet}
  {#snippet chat()}{#if $view}
      {#if $view.suggestion}<SuggestionPreview
          {...$view.suggestion}
        />{:else if $view.chat}<Chat {...$view.chat} />{/if}
    {/if}{/snippet}
  {#snippet composer()}{#if $view?.composer}<Composer
        {...$view.composer}
        hidden={$view.composer.hidden || $geometry.boardFull}
      />{/if}{/snippet}
  {#snippet documentToolbar()}{#if $view}<DocumentToolbar
        {...$view.toolbar}
      />{/if}{/snippet}
  {#snippet document()}{#if $view}
      <div
        use:taskSurface
        class={$geometry.pane === "doc"
          ? "tw:flex tw:h-full tw:min-h-0 tw:flex-col"
          : "tw:hidden"}
        hidden={$geometry.pane !== "doc"}
      >
        <DocumentPanel {...$view.document} />
      </div>
      <div
        use:filesSurface
        class={$geometry.pane === "files"
          ? "tw:h-full tw:min-h-0 tw:overflow-auto"
          : "tw:hidden"}
        hidden={$geometry.pane !== "files"}
      >
        {#if Files}<Files {...$view.files} />{:else}<DeferredViewStatus
            phase={$filesView.phase}
            lang={services.language}
            label={services.language === "en" ? "Files" : "Arquivos"}
            retry={() => {
              void filesModule.retry();
            }}
            {current}
          />{/if}
      </div>
      <div
        class={$geometry.pane === "apps" ? "tw:min-h-0" : "tw:hidden"}
        hidden={$geometry.pane !== "apps"}
      >
        {#if AppsPanel}<AppsPanel
            props={$view.apps}
          />{:else}<DeferredViewStatus
            phase={$appsView.phase}
            lang={services.language}
            label={services.language === "en" ? "Apps" : "Apps"}
            retry={() => {
              void appsModule.retry();
            }}
            {current}
          />{/if}
      </div>
      <div
        class={$geometry.pane === "decisions" ? "tw:min-h-0" : "tw:hidden"}
        hidden={$geometry.pane !== "decisions"}
      >
        {#if Decisions}<Decisions
            {...$view.decisions}
          />{:else}<DeferredViewStatus
            phase={$decisionsView.phase}
            lang={services.language}
            label={services.language === "en" ? "Decisions" : "Decisões"}
            retry={() => {
              void decisionsModule.retry();
            }}
            {current}
          />{/if}
      </div>
      <div
        class={$geometry.pane === "reminders" ? "tw:min-h-0" : "tw:hidden"}
        hidden={$geometry.pane !== "reminders"}
      >
        {#if Reminders}<Reminders
            {...$view.reminders}
          />{:else}<DeferredViewStatus
            phase={$remindersView.phase}
            lang={services.language}
            label={services.language === "en" ? "Reminders" : "Lembretes"}
            retry={() => {
              void remindersModule.retry();
            }}
            {current}
          />{/if}
      </div>
      {#if $geometry.pane === "agents" && $view.agents}{#if AgentsPane}<AgentsPane
            {...$view.agents}
          />{:else}<DeferredViewStatus
            phase={$agentsView.phase}
            lang={services.language}
            label={services.language === "en" ? "Agents" : "Agents"}
            retry={() => {
              void agentsModule.retry();
            }}
            {current}
          />{/if}{/if}
    {/if}{/snippet}
  {#snippet board()}{#if $view && boardMounted}{#if Board}<Board
          {...$view.board}
        />{:else}<DeferredViewStatus
          phase={$boardView.phase}
          lang={services.language}
          label={services.language === "en" ? "Board" : "Quadro"}
          retry={() => {
            void boardModule.retry();
          }}
          {current}
        />{/if}{/if}{/snippet}
</RoomLayout>
{#if $view}{#if FileViewer}<FileViewer
      {...$view.viewer}
    />{:else if $viewerState.open && $viewerState.target}{#key $viewerState.target}<Snapshot
        value={$viewerState.target}
        >{#snippet children(target)}<Dialog
            open
            title={$viewerState.name ||
              (services.language === "en" ? "File" : "Arquivo")}
            closeLabel={services.language === "en"
              ? "Close file"
              : "Fechar arquivo"}
            fullScreen
            returnFocus={owner.viewer.returnFocus}
            onOpenChange={(open) => {
              if (
                !open &&
                !FileViewer &&
                current() &&
                get(viewerState).target === target
              )
                owner.viewer.closeUser();
            }}
            ><DeferredViewStatus
              phase={$viewerView.phase}
              lang={services.language}
              label={services.language === "en" ? "File" : "Arquivo"}
              retry={() => {
                void viewerModule.retry();
              }}
              current={() => current() && get(viewerState).target === target}
            /></Dialog
          >{/snippet}</Snapshot
      >{/key}{/if}
  {#if !FileViewer && $viewerState.closingUnconfirmed}<aside
      role="alert"
      class="tw:fixed tw:inset-x-4 tw:top-4 tw:z-50 tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg"
    >
      <p>{viewerText(services.language, "closing")}</p>
      <Button
        onclick={(event) => {
          if (event.currentTarget.isConnected && current())
            services.actions.reload();
        }}>{viewerText(services.language, "reload")}</Button
      >
    </aside>{/if}
  {#if $view.notice}<aside
      data-vb-native
      role="status"
      class="tw:fixed tw:bottom-4 tw:left-1/2 tw:z-30 tw:max-w-[calc(100vw-2rem)] tw:-translate-x-1/2 tw:rounded-control tw:border tw:border-border tw:bg-popover tw:p-3 tw:font-sans tw:text-sm tw:text-popover-foreground tw:shadow-md"
    >
      {$view.notice}
    </aside>{/if}
{/if}
