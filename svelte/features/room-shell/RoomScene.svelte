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
  import Board from "../../Board.svelte";
  import Files from "../../Files.svelte";
  import Decisions from "../../Decisions.svelte";
  import Reminders from "../../Reminders.svelte";
  import DocumentPanel from "../documents/DocumentPanel.svelte";
  import DocumentToolbar from "../documents/DocumentToolbar.svelte";
  import AppsPanel from "../apps/AppsPanel.svelte";
  import AgentsPane from "../agents/AgentsPane.svelte";
  import AgentBanners from "../agents/AgentBanners.svelte";
  import ThreadFiles from "../file-viewer/ThreadFiles.svelte";
  import FileViewer from "../file-viewer/FileViewer.svelte";
  import SuggestionPreview from "../room-sidebar/SuggestionPreview.svelte";
  import RoomHeader from "./RoomHeader.svelte";
  let { presentation, resources, scope, browser: suppliedBrowser, layoutBrowser: suppliedLayoutBrowser }: { presentation: ApplicationRoomPresentation; resources: RoomResources; scope: ApplicationRoomScope; browser?: RoomScopeBrowser; layoutBrowser?: RoomLayoutBrowser } = $props();
  const services = untrack(() => presentation.services), captured = untrack(() => scope);
  let active = true, scoped: RoomScope | undefined;
  const current = () => active && services.ownsRoom(captured);
  const browser = untrack(() => suppliedBrowser ?? createRoomScopeBrowser(window, document));
  const layout = untrack(() => createRoomLayout({
    scopeKey: JSON.stringify([captured.roomId, captured.account, captured.identityRevision, captured.roomGeneration]), current,
    onDocumentClosed: () => scoped?.actions.closeDocument(),
    onPane: pane => { if (current() && get(services.state).pane !== pane) services.actions.selectPane(pane); },
    browser: suppliedLayoutBrowser ?? createRoomLayoutBrowser(window),
  }));
  const owner = untrack(() => createRoomScope({ services, resources, layout, browser })), view = owner.state, geometry = layout.state;
  scoped = owner;
  let boardMounted = $state(false);
  $effect(() => { if ($geometry.boardFull || $geometry.pane === "board") boardMounted = true; });
  $effect(() => {
    const revision = $view?.chatRevision;
    if (revision === undefined) return;
    void tick().then(() => { if (current() && owner.current() && get(view)?.chatRevision === revision) owner.chatRendered(revision); });
  });
  onDestroy(() => { active = false; owner.dispose(); layout.dispose(); scoped = undefined; });
  const labels = { documentWidth: services.language === "en" ? "Document width" : "Largura do documento", closeDocument: services.language === "en" ? "Close document" : "Fechar documento", closeSidebar: services.language === "en" ? "Close sidebar" : "Fechar menu", closeSheet: services.t("Fechar"), historyUnconfirmed: services.language === "en" ? "Navigation is not confirmed. Review the current page before continuing." : "A navegação ainda não foi confirmada. Confira a página atual antes de continuar.", historyRetry: services.t("Tentar de novo") };
</script>

<RoomLayout controller={layout} {labels} onChatSurface={owner.attachChat}>
  {#snippet sidebar()}{#if $view}<Sidebar {...$view.sidebar} hideSheetHandle/>{/if}{/snippet}
  {#snippet header()}{#if $view}<RoomHeader {presentation} header={$view.header} trigger={$view.trigger} boardCount={$view.toolbar.counts?.board} {layout} {current}/>{/if}{/snippet}
  {#snippet peek()}{#if $view}<DocumentToolbar {...$view.peek}/>{/if}{/snippet}
  {#snippet attention()}{#if $view}
    <div class="tw:px-4">
      <div class={$geometry.boardFull ? "tw:hidden" : ""}>{#if $view.banners}<AgentBanners {...$view.banners}/>{/if}</div>
      <ThreadFiles {...$view.threadFiles}/>
    </div>
  {/if}{/snippet}
  {#snippet chat()}{#if $view}
    {#if $view.suggestion}<SuggestionPreview {...$view.suggestion}/>{:else if $view.chat}<Chat {...$view.chat}/>{/if}
  {/if}{/snippet}
  {#snippet composer()}{#if $view?.composer}<Composer {...$view.composer} hidden={$view.composer.hidden || $geometry.boardFull}/>{/if}{/snippet}
  {#snippet documentToolbar()}{#if $view}<DocumentToolbar {...$view.toolbar}/>{/if}{/snippet}
  {#snippet document()}{#if $view}
    <div class={$geometry.pane === "doc" ? "tw:flex tw:h-full tw:min-h-0 tw:flex-col" : "tw:hidden"} hidden={$geometry.pane !== "doc"}><DocumentPanel {...$view.document}/></div>
    <div class={$geometry.pane === "files" ? "tw:min-h-0" : "tw:hidden"} hidden={$geometry.pane !== "files"}><Files {...$view.files}/></div>
    <div class={$geometry.pane === "apps" ? "tw:min-h-0" : "tw:hidden"} hidden={$geometry.pane !== "apps"}><AppsPanel props={$view.apps}/></div>
    <div class={$geometry.pane === "decisions" ? "tw:min-h-0" : "tw:hidden"} hidden={$geometry.pane !== "decisions"}><Decisions {...$view.decisions}/></div>
    <div class={$geometry.pane === "reminders" ? "tw:min-h-0" : "tw:hidden"} hidden={$geometry.pane !== "reminders"}><Reminders {...$view.reminders}/></div>
    {#if $geometry.pane === "agents" && $view.agents}<AgentsPane {...$view.agents}/>{/if}
  {/if}{/snippet}
  {#snippet board()}{#if $view && boardMounted}<Board {...$view.board}/>{/if}{/snippet}
</RoomLayout>
{#if $view}<FileViewer {...$view.viewer}/>
  {#if $view.notice}<aside data-vb-native role="status" class="tw:fixed tw:bottom-4 tw:left-1/2 tw:z-30 tw:max-w-[calc(100vw-2rem)] tw:-translate-x-1/2 tw:rounded-control tw:border tw:border-border tw:bg-popover tw:p-3 tw:font-sans tw:text-sm tw:text-popover-foreground tw:shadow-md">{$view.notice}</aside>{/if}
{/if}
