<script lang="ts">
  import { untrack } from "svelte";
  import type { ComponentProps } from "svelte";
  import ThreadHeader from "../room-sidebar/ThreadHeader.svelte";
  import type { ThreadHeaderProps } from "../room-sidebar/types";
  import AgentTrigger from "../agents/AgentTrigger.svelte";
  import NotificationBell from "../notifications/NotificationBell.svelte";
  import type { ApplicationRoomPresentation } from "../application/shellTypes";
  import type { RoomLayoutController } from "../room-layout/types";
  import Button from "../../lib/ui/Button.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  import Badge from "../../lib/ui/Badge.svelte";
  let { presentation, header, trigger, layout, current, boardCount }: { presentation: ApplicationRoomPresentation; header: ThreadHeaderProps; trigger: ComponentProps<typeof AgentTrigger> | null; layout: RoomLayoutController; current(): boolean; boardCount?: number | string } = $props();
  const personal = untrack(() => presentation.services.personal.state), geometry = untrack(() => layout.state);
  const live = (event: Event) => current() && event.currentTarget instanceof HTMLElement && event.currentTarget.isConnected;
  const waits = $derived($personal.me?.waits ?? []);
  const t = (text: string) => presentation.services.t(text);
</script>

<header data-vb-native data-native-room-header class="tw:flex tw:min-w-0 tw:flex-wrap tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground">
  <Button variant="ghost" size="sm" class="tw:min-[901px]:hidden" onclick={(event) => { if (live(event)) presentation.services.actions.home(); }}>← {t("Seus vibebooks")}</Button>
  <div class="tw:min-w-0 tw:flex-1"><ThreadHeader {...header}/></div>
  <Button data-native-board-toggle variant={$geometry.boardFull ? "secondary" : "ghost"} size="sm" aria-label={t("Quadro de tarefas (kanban)")} aria-pressed={$geometry.boardFull} onclick={(event) => { if (live(event)) layout.toggleBoard(); }}><Icon name="board"/><span class="tw:hidden tw:min-[901px]:inline">{t("Quadro")}</span>{#if boardCount}<Badge variant="warning">{boardCount}</Badge>{/if}</Button>
  <Button data-native-inbox-toggle variant="ghost" size="sm" aria-label={t("Caixa de entrada")} title={t("Caixa de entrada: o que espera por você")} onclick={(event) => { if (live(event)) presentation.openInbox(); }}><Icon name="inbox"/>{#if waits.length}<Badge variant={waits.some(wait => /^[ab]\d/.test(wait.ref)) ? "destructive" : "warning"}>{waits.length}</Badge>{/if}</Button>
  <NotificationBell owner={presentation.services.pwa} lang={presentation.services.language}/>
  {#if trigger}<AgentTrigger {...trigger}/>{/if}
  <IconButton data-native-document-toggle icon="file" label={t("mostrar/ocultar documento")} aria-pressed={$geometry.documentVisible} onclick={(event) => { if (live(event)) layout.toggleDocument(); }}/>
</header>
