<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import Button from "../../lib/ui/Button.svelte";
  import type { Room } from "../../../shared/room";
  import type { DocumentPane } from "./types";
  import type { DocumentSession } from "./session";
  let {
    owner,
    room,
    pane,
    lang,
    counts = {},
    agentTitle = "Agents",
    agentState = "",
    onPane,
    compact = false,
  }: {
    owner: DocumentSession;
    room: Room;
    pane: DocumentPane;
    lang: string;
    counts?: Partial<Record<DocumentPane, number | string>>;
    agentTitle?: string;
    agentState?: string;
    onPane(pane: DocumentPane): void;
    compact?: boolean;
  } = $props();
  const view = untrack(() => owner.state),
    en = $derived(lang === "en");
  let active = true;
  onDestroy(() => (active = false));
  const allItems: { id: DocumentPane; label: string }[] = $derived([
    { id: "doc", label: "Doc" },
    { id: "board", label: en ? "Board" : "Quadro" },
    { id: "files", label: en ? "Files" : "Arquivos" },
    { id: "apps", label: "Apps" },
    { id: "decisions", label: en ? "Decisions" : "Decisões" },
    { id: "reminders", label: en ? "Reminders" : "Lembretes" },
    { id: "agents", label: "Agents" },
  ]);
  const epic = $derived(
    room.epics.find((epic) => epic.id === $view.target?.epicId),
  );
  const docCount = $derived(
    epic?.tasks.length
      ? `${epic.tasks.filter((task) => task.done).length}/${epic.tasks.length}`
      : "",
  );
  const docTitle = $derived(
    $view.text
      .match(/^#\s+(.+)$/m)?.[1]
      .replace(/[*_`]/g, "")
      .trim() ||
      epic?.title ||
      room.book.title,
  );
  const items = $derived(
    allItems.filter((item) => !compact || item.id !== "board"),
  );
  function choose(event: MouseEvent, id: DocumentPane) {
    event.stopPropagation();
    if (
      !active ||
      !(event.currentTarget instanceof HTMLElement) ||
      !event.currentTarget.isConnected
    )
      return;
    onPane(id);
  }
  function key(event: KeyboardEvent) {
    if (
      !active ||
      !(event.currentTarget instanceof HTMLElement) ||
      !event.currentTarget.isConnected
    )
      return;
    const buttons = [
        ...event.currentTarget.querySelectorAll<HTMLButtonElement>(
          "button[data-document-pane]",
        ),
      ],
      at = buttons.findIndex((button) => button === document.activeElement);
    let next = at;
    if (event.key === "ArrowRight") next = (at + 1) % buttons.length;
    else if (event.key === "ArrowLeft")
      next = (at - 1 + buttons.length) % buttons.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = buttons.length - 1;
    else return;
    event.preventDefault();
    buttons[next]?.focus();
    buttons[next]?.click();
  }
</script>

<div
  data-vb-native
  class="tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:border-b tw:border-border tw:bg-background tw:p-2 tw:font-sans tw:text-foreground"
>
  <div
    role={compact ? "toolbar" : "tablist"}
    aria-label={en ? "Room panels" : "Painéis da sala"}
    onkeydown={key}
    class="tw:flex tw:min-w-0 tw:flex-1 tw:gap-1 tw:overflow-x-auto"
  >
    {#each items as item}<Button
        size="sm"
        variant={pane === item.id ? "secondary" : "ghost"}
        disabled={$view.denied && item.id !== "doc"}
        role={compact ? undefined : "tab"}
        aria-selected={compact ? undefined : pane === item.id}
        aria-pressed={compact ? pane === item.id : undefined}
        tabindex={compact || pane === item.id ? 0 : -1}
        data-document-pane={item.id}
        title={item.id === "agents"
          ? agentTitle
          : item.id === "doc"
            ? docTitle
            : item.label}
        onclick={(event) => choose(event, item.id)}
        ><span>{item.label}</span
        >{#if compact && item.id === "doc" && docCount}<span
            class="tw:text-xs tw:text-muted-foreground">{docCount}</span
          >{:else if counts[item.id]}<span
            class="tw:text-xs tw:text-muted-foreground">{counts[item.id]}</span
          >{/if}{#if item.id === "agents" && agentState}<span
            aria-label={agentTitle}
            class={agentState === "blocked"
              ? "tw:size-2 tw:rounded-full tw:bg-destructive"
              : agentState === "busy"
                ? "tw:size-2 tw:rounded-full tw:bg-warning"
                : "tw:size-2 tw:rounded-full tw:bg-success"}
          ></span>{/if}</Button
      >{/each}
  </div>
  {#if !compact && pane === "doc"}<div
      role="group"
      aria-label={en ? "Document mode" : "Modo do documento"}
      class="tw:flex tw:gap-1"
    >
      <Button
        variant={$view.mode === "preview" ? "secondary" : "ghost"}
        size="sm"
        aria-pressed={$view.mode === "preview"}
        onclick={(event) => {
          if (active && event.currentTarget.isConnected) owner.mode("preview");
        }}>{en ? "Read" : "Ver"}</Button
      ><Button
        variant={$view.mode === "edit" ? "secondary" : "ghost"}
        size="sm"
        disabled={$view.denied}
        aria-pressed={$view.mode === "edit"}
        onclick={(event) => {
          if (active && event.currentTarget.isConnected) owner.mode("edit");
        }}>{en ? "Edit" : "Editar"}</Button
      >
    </div>{/if}
</div>
