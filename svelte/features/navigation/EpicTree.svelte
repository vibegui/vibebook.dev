<script lang="ts">
  import { get } from "svelte/store";
  import { onDestroy, tick, untrack } from "svelte";
  import type { Room, Epic } from "../../../shared/room";
  import type { RoomMutations } from "../room-sidebar/session";
  import Button from "../../lib/ui/Button.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import WaitBadge from "../waits/WaitBadge.svelte";
  import type { WaitReference } from "../waits/model";
  import Input from "../../lib/ui/Input.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import Select from "../../lib/ui/Select.svelte";
  import Tabs from "../../lib/ui/Tabs.svelte";
  import { cn } from "../../lib/ui/utils";
  import {
    archivedEpics,
    activeEpics,
    epicForest,
    reorderEpics,
    visibleEpics,
  } from "./model";
  import {
    enterNavigationThread,
    toggleNavigationBranch,
    type NavigationSession,
  } from "./session";

  let {
    room,
    thread,
    session,
    mutations,
    onopen,
    onarchchange,
    vb,
  }: {
    room: Room;
    thread: string;
    session: NavigationSession;
    mutations: RoomMutations;
    onopen: (id: string) => void;
    onarchchange: (archived: boolean) => void;
    vb: {
      t: (text: string, vars?: Record<string, string | number>) => string;
      name: (email: string) => string;
      epicBusy: (epic: Epic) => string | null;
      waitsIn: (thread: string) => readonly WaitReference[];
    };
  } = $props();
  const uid = $props.id();
  let navigation = $derived(session.state);
  const mutation = untrack(() => mutations.state);
  const mutationBusy = $derived(
    $mutation.phase === "pending" || $mutation.phase === "unconfirmed",
  );
  let error = $state("");
  let drag = $state<string | null>(null);
  let dropTarget = $state<string | null>(null);
  let dropAfter = $state(false);
  let input: HTMLInputElement | null = $state(null);
  let disposed = false;
  const rowNodes = new Map<string, HTMLElement>();
  let generation = 0;
  type OrderRequest = {
    ids: string[];
    from: string;
    thread: string;
    generation: number;
    anchor: HTMLElement | null;
  };
  let requested = $state<OrderRequest | null>(null);
  let announcement = $state("");
  onDestroy(() => {
    disposed = true;
    generation++;
    rowNodes.clear();
  });
  const indentation = [
    "tw:pl-0",
    "tw:pl-2",
    "tw:pl-4",
    "tw:pl-6",
    "tw:pl-8",
    "tw:pl-10",
    "tw:pl-12",
  ];
  const active = $derived(activeEpics(room.epics, thread));
  const archived = $derived(archivedEpics(room.epics, room.messages));
  const mode = $derived(
    $navigation.archived && archived.length > 0 ? "archived" : "active",
  );
  const forest = $derived(epicForest(mode === "archived" ? archived : active));
  const entryForest = $derived(epicForest(room.epics));
  const workingEpics = $derived(
    new Set(
      room.epics.filter((epic) => vb.epicBusy(epic)).map((epic) => epic.id),
    ),
  );
  const rows = $derived(
    visibleEpics(forest, $navigation.closed, workingEpics, true),
  );
  const rowIds = $derived(
    new Map(rows.map((row, index) => [row.epic.id, `${uid}-row-${index}`])),
  );
  $effect(() => {
    enterNavigationThread(session, entryForest, thread);
  });

  function switchMode(value: string) {
    if (disposed) return;
    generation++;
    requested = null;
    const archived = value === "archived";
    navigation.update((state) => ({ ...state, archived }));
    onarchchange(archived);
    drag = null;
    dropTarget = null;
    error = "";
  }
  async function submit(command: Parameters<RoomMutations["run"]>[0]) {
    if (disposed || mutationBusy || session.roomId !== room.id) return false;
    error = "";
    const success = await mutations.run(command);
    return success;
  }
  async function add(event: SubmitEvent) {
    event.preventDefault();
    if (disposed) return;
    const title = $navigation.draft.trim(),
      original = $navigation.draft,
      draftOwner = navigation;
    if (!title) return input?.focus();
    if (await submit({ t: "epic", title }))
      if (get(draftOwner).draft === original)
        draftOwner.update((value) => ({ ...value, draft: "" }));
  }
  function siblings(id: string) {
    const parent = forest.parents.get(id);
    return parent ? (forest.children.get(parent) ?? []) : forest.roots;
  }
  function adjacent(id: string, direction: -1 | 1) {
    const peers = siblings(id);
    return peers[peers.findIndex((epic) => epic.id === id) + direction];
  }
  async function reorder(from: string, to: string, after: boolean) {
    const ids = reorderEpics(room.epics, from, to, after);
    if (!ids || disposed) return;
    requested = null;
    const version = ++generation;
    const active = document.activeElement;
    const anchor =
      active instanceof HTMLElement && rowNodes.get(from)?.contains(active)
        ? active
        : null;
    const targetThread = thread;
    if (await submit({ t: "epic.order", ids }))
      if (!disposed && generation === version && thread === targetThread)
        requested = { ids, from, anchor, generation: version, thread };
  }
  function registerRow(node: HTMLElement, id: string) {
    rowNodes.set(id, node);
    return {
      destroy() {
        if (rowNodes.get(id) === node) rowNodes.delete(id);
      },
    };
  }
  $effect(() => {
    const request = requested;
    if (!request) return;
    if (request.thread !== thread || mode !== "active") {
      requested = null;
      generation++;
      return;
    }
    const current = room.epics.map((epic) => epic.id);
    if (!current.includes(request.from)) {
      requested = null;
      restoreOrderFocus(request);
      return;
    }
    const known = new Set(current),
      expectedIds = new Set(request.ids);
    const expected = request.ids.filter((id) => known.has(id));
    const actual = current.filter((id) => expectedIds.has(id));
    if (
      actual.length !== expected.length ||
      actual.some((id, index) => id !== expected[index])
    )
      return;
    requested = null;
    announcement = vb.t("Ordem dos épicos atualizada.");
    restoreOrderFocus(request);
  });
  function restoreOrderFocus(request: OrderRequest) {
    const anchor = request.anchor;
    if (!anchor) return;
    const eligible = () =>
      document.activeElement === document.body ||
      document.activeElement === anchor;
    if (!eligible()) return;
    void tick().then(() => {
      if (disposed || request.generation !== generation || !eligible()) return;
      if (document.activeElement === anchor && !anchor.matches(":disabled"))
        return;
      const row = rowNodes.get(request.from);
      if (row?.hidden) return;
      const target =
        row?.querySelector<HTMLElement>("[data-epic-thread]") ?? input;
      target?.focus({ preventScroll: true });
    });
  }
  function move(id: string, direction: -1 | 1) {
    const target = adjacent(id, direction);
    if (mode === "active" && target) reorder(id, target.id, direction === 1);
  }
  function startDrag(event: DragEvent, id: string) {
    if (mutationBusy || mode !== "active" || !event.dataTransfer)
      return event.preventDefault();
    event.dataTransfer.setData("text/vb-epic", id);
    event.dataTransfer.effectAllowed = "move";
    drag = id;
  }
  function canDrop(event: DragEvent, id: string) {
    return (
      !mutationBusy &&
      mode === "active" &&
      drag !== id &&
      event.dataTransfer?.types.includes("text/vb-epic")
    );
  }
  function over(event: DragEvent, id: string) {
    if (!canDrop(event, id)) return;
    event.preventDefault();
    const bounds =
      event.currentTarget instanceof HTMLElement
        ? event.currentTarget.getBoundingClientRect()
        : null;
    dropTarget = id;
    dropAfter = !!bounds && event.clientY >= bounds.top + bounds.height / 2;
  }
  function drop(event: DragEvent, id: string) {
    const after = dropAfter;
    dropTarget = null;
    if (!canDrop(event, id)) return;
    event.preventDefault();
    const from = event.dataTransfer?.getData("text/vb-epic");
    if (from) reorder(from, id, after);
    drag = null;
  }
</script>

<section
  data-vb-native
  aria-label={vb.t("Épicos")}
  class="tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-sidebar tw:p-3 tw:font-sans tw:text-sm tw:leading-5 tw:text-sidebar-foreground"
>
  <Tabs
    items={[
      {
        value: "active",
        label: `${vb.t("Épicos")} · ${active.filter((epic) => !epic.archived).length}`,
      },
      {
        value: "archived",
        label: `${vb.t("Arquivados")} · ${archived.length}`,
        disabled: archived.length === 0,
      },
    ]}
    label={vb.t("Épicos")}
    value={mode}
    onValueChange={switchMode}
  >
    {#snippet children(value)}
      {#if value === mode}
        <ul
          aria-label={value === "archived"
            ? vb.t("Arquivados")
            : vb.t("Épicos")}
          class="tw:m-0 tw:list-none tw:space-y-1 tw:p-0"
        >
          {#each rows as row (row.epic.id)}
            {@const epic = row.epic}
            {@const closed = $navigation.closed.has(epic.id)}
            {@const parent = forest.byId.get(forest.parents.get(epic.id) ?? "")}
            {@const working = vb.epicBusy(epic)}
            <li
              use:registerRow={epic.id}
              id={rowIds.get(epic.id)}
              hidden={row.hidden}
              data-epic={epic.id}
              data-depth={row.depth}
              class={indentation[Math.min(row.depth, indentation.length - 1)]}
            >
              <div
                role="group"
                aria-label={epic.title}
                draggable={!mutationBusy && value === "active"}
                ondragstart={(event) => startDrag(event, epic.id)}
                ondragend={() => {
                  drag = null;
                  dropTarget = null;
                }}
                ondragover={(event) => over(event, epic.id)}
                ondragleave={() => {
                  if (dropTarget === epic.id) dropTarget = null;
                }}
                ondrop={(event) => drop(event, epic.id)}
                class={cn(
                  "tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent tw:border-l-4",
                  thread === epic.id &&
                    "tw:border-l-primary tw:bg-sidebar-accent tw:text-sidebar-accent-foreground",
                  dropTarget === epic.id &&
                    (dropAfter ? "tw:border-b-primary" : "tw:border-t-primary"),
                  drag === epic.id && "tw:opacity-50",
                )}
              >
                {#if row.hasChildren}
                  <IconButton
                    icon={closed ? "chevronRight" : "chevronDown"}
                    label={`${vb.t(closed ? "Abrir galho" : "Fechar galho")}: ${epic.title}`}
                    aria-expanded={!closed}
                    aria-controls={(forest.children.get(epic.id) ?? [])
                      .map((child) => rowIds.get(child.id))
                      .join(" ")}
                    class="tw:size-8 tw:p-1"
                    onclick={() => toggleNavigationBranch(session, epic.id)}
                  />
                {:else}<span aria-hidden="true" class="tw:w-8 tw:shrink-0"
                  ></span>{/if}
                <Button
                  variant="ghost"
                  class="tw:h-auto tw:min-h-9 tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2 tw:whitespace-normal tw:px-1 tw:py-2 tw:text-left"
                  data-epic-thread={epic.id}
                  aria-current={thread === epic.id ? "page" : undefined}
                  onclick={() => {
                    if (thread === epic.id && row.hasChildren)
                      toggleNavigationBranch(session, epic.id);
                    else onopen(epic.id);
                  }}
                >
                  <Avatar
                    name={epic.owner ? vb.name(epic.owner) : epic.title}
                    src={epic.owner && room.avatars?.[epic.owner]
                      ? `/api/avatar/${encodeURIComponent(epic.owner)}?v=${room.avatars[epic.owner]}`
                      : undefined}
                    class="tw:size-6 tw:text-xs"
                  />
                  <span
                    class="tw:min-w-0 tw:flex-1 tw:break-words"
                    data-epic-title
                    >{epic.title}{#if epic.archived}<span
                        class="tw:ml-1 tw:text-xs">({vb.t("Arquivado")})</span
                      >{/if}{#if parent}<span class="tw:sr-only">
                        · {vb.t("Subépico de {title}", {
                          title: parent.title,
                        })}</span
                      >{/if}</span
                  >
                  {#if working || (closed && row.busyBelow)}<span
                      role="img"
                      aria-label={working
                        ? vb.t("{who} está trabalhando", { who: working })
                        : vb.t("Trabalho em um subépico")}
                      class="tw:text-primary">✻</span
                    >{/if}
                  <WaitBadge
                    waits={vb.waitsIn(epic.id)}
                    label={(n) => vb.t("{n} coisas esperando você", { n })}
                    taskLabel={vb.t("Tarefa sua pendente")}
                  />
                  {#if epic.prod}<span
                      title={vb.t(
                        epic.prod.stage === "verified"
                          ? "Verificado em prod"
                          : "No ar, falta verificar em prod",
                      )}>{epic.prod.stage === "verified" ? "✓✓" : "🚀"}</span
                    >{/if}
                  {#if epic.tasks.length}<span
                      class={thread === epic.id
                        ? "tw:shrink-0 tw:text-xs tw:text-sidebar-accent-foreground"
                        : "tw:shrink-0 tw:text-xs tw:text-muted-foreground"}
                      >{epic.tasks.filter((task) => task.done).length}/{epic
                        .tasks.length}</span
                    >{/if}
                </Button>
              </div>
              <details class="tw:ml-8 tw:text-xs tw:text-muted-foreground">
                <summary
                  class="tw:cursor-pointer tw:rounded-control tw:px-2 tw:py-1 tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
                  >{vb.t("Ações do épico")}: {epic.title}</summary
                >
                <div class="tw:space-y-2 tw:p-2">
                  <Label for={`${rowIds.get(epic.id)}-owner`}
                    >{vb.t("Dono do épico")}</Label
                  >
                  <Select
                    disabled={mutationBusy}
                    id={`${rowIds.get(epic.id)}-owner`}
                    aria-label={`${vb.t("Dono do épico")}: ${epic.title}`}
                    value={epic.owner ?? ""}
                    items={[
                      { value: "", label: vb.t("Sem dono") },
                      ...room.members.map((email) => ({
                        value: email,
                        label: vb.name(email),
                      })),
                    ]}
                    onValueChange={(owner) => {
                      submit({ t: "epic.owner", id: epic.id, owner });
                      return false;
                    }}
                  />
                  {#if value === "active"}<div
                      class="tw:flex tw:flex-wrap tw:gap-2"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={mutationBusy || !adjacent(epic.id, -1)}
                        aria-label={`${vb.t("Mover para cima")}: ${epic.title}`}
                        onclick={() => move(epic.id, -1)}
                        >{vb.t("Mover para cima")}</Button
                      ><Button
                        variant="outline"
                        size="sm"
                        disabled={mutationBusy || !adjacent(epic.id, 1)}
                        aria-label={`${vb.t("Mover para baixo")}: ${epic.title}`}
                        onclick={() => move(epic.id, 1)}
                        >{vb.t("Mover para baixo")}</Button
                      >
                    </div>{/if}
                </div>
              </details>
            </li>
          {/each}
        </ul>
        {#if value === "active"}
          <form id="newEpic" onsubmit={add} class="tw:space-y-2">
            <Label for={`${uid}-new`}>{vb.t("Novo épico")}</Label>
            <div class="tw:flex tw:gap-2">
              <Input
                id={`${uid}-new`}
                bind:ref={input}
                bind:value={
                  () => (disposed ? "" : $navigation.draft),
                  (value) => {
                    if (!disposed) $navigation.draft = value;
                  }
                }
                placeholder={vb.t("Novo épico: escreva o título…")}
                enterkeyhint="done"
              /><IconButton
                disabled={mutationBusy}
                type="submit"
                icon="plus"
                variant="primary"
                label={vb.t("Criar épico")}
              />
            </div>
          </form>
          {#each room.suggestions as suggestion, index}
            <Button
              variant="outline"
              class="tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:border-dashed tw:text-left"
              aria-current={thread === `pre:${index}` ? "page" : undefined}
              onclick={() => onopen(`pre:${index}`)}
              >{suggestion.title}<span
                class="tw:text-xs tw:text-muted-foreground"
                >{vb.t("sugestão do @vibe, clique para ver")}</span
              ></Button
            >
          {/each}
        {/if}
      {/if}
    {/snippet}
  </Tabs>
  <p role="status" aria-live="polite" class="tw:sr-only">{announcement}</p>
  {#if error}<p role="alert" class="tw:m-0 tw:text-sm tw:text-destructive">
      {error}
    </p>{/if}
</section>
