<script lang="ts">
  import { onDestroy, tick, untrack } from "svelte";
  import type { PanelProps } from "../../panels";
  import type { RoomCommand } from "../../../shared/commands";
  import type { TaskStatus } from "../../../shared/room";
  import {
    adjacentStatus,
    boardModel,
    isTaskStatus,
    lanes,
    readBoardMode,
    type AddTarget,
    type BoardTask,
  } from "./model";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import Badge from "../../lib/ui/Badge.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import Select from "../../lib/ui/Select.svelte";
  import Tabs from "../../lib/ui/Tabs.svelte";
  import EmptyState from "../../lib/components/EmptyState.svelte";
  import ErrorState from "../../lib/components/ErrorState.svelte";
  import { cn } from "../../lib/ui/utils";

  let {
    room,
    thread,
    send,
    onopen,
    vb,
  }: Pick<PanelProps, "room" | "thread" | "send" | "onopen"> & {
    vb: Pick<PanelProps["vb"], "t" | "name">;
  } = $props();
  const uid = $props.id();
  const model = $derived(boardModel(room, thread));
  let mode = $state(readBoardMode());
  let title = $state("");
  let addInput = $state<HTMLInputElement | null>(null);
  let error = $state("");
  let announcement = $state("");
  let over = $state<TaskStatus | null>(null);
  let dragging = $state<string | null>(null);
  let selectedTarget = $state<AddTarget>(
    untrack(() => {
      const initial =
        model.targets.find((target) => target.id === model.scope) ??
        model.targets.find((target) => target.id !== "main") ??
        model.targets[0];
      return initial ?? { id: thread, title: thread };
    }),
  );
  const targetValid = $derived(
    model.targets.some((target) => target.id === selectedTarget.id),
  );
  const targetItems = $derived([
    ...(!targetValid
      ? [
          {
            value: selectedTarget.id,
            label: selectedTarget.title,
            disabled: true,
          },
        ]
      : []),
    ...model.targets.map((target) => ({
      value: target.id,
      label: target.title,
    })),
  ]);
  const options = $derived(
    lanes.map((lane) => ({ value: lane.value, label: vb.t(lane.label) })),
  );
  const openGroups = $derived(
    model.groups
      .map((group) => ({
        ...group,
        tasks: group.tasks.filter((task) => task.status !== "done"),
      }))
      .filter((group) => group.tasks.length),
  );
  const mine = $derived(
    model.tasks.filter(
      (task) => task.owner === room.me && task.status !== "done",
    ),
  );
  const cards = new Map<string, HTMLElement>();
  let generation = 0;
  let disposed = false;
  type MoveRequest = {
    id: string;
    status: TaskStatus;
    generation: number;
    focus?: { key: string; node: HTMLElement; selector: string };
  };
  let requested = $state<MoveRequest | null>(null);
  onDestroy(() => {
    disposed = true;
    generation++;
    cards.clear();
  });

  function registerCard(node: HTMLElement, key: string) {
    cards.set(key, node);
    return {
      destroy() {
        if (cards.get(key) === node) cards.delete(key);
      },
    };
  }
  function dispatch(command: RoomCommand) {
    try {
      if (send(command)) {
        error = "";
        return true;
      }
    } catch {
      /* Keep drafts and controls when a socket closes during send. */
    }
    error = vb.t("Não deu pra enviar agora. Tente de novo.");
    return false;
  }
  function move(task: BoardTask, status: TaskStatus, key: string) {
    if (task.status === status) return true;
    const active = document.activeElement;
    const focused =
      active instanceof HTMLElement && cards.get(key)?.contains(active)
        ? active
        : null;
    if (!dispatch({ t: "task.status", id: task.id, status })) return false;
    requested = {
      id: task.id,
      status,
      generation: ++generation,
      ...(focused
        ? {
            focus: {
              key,
              node: focused,
              selector: focused.matches("select")
                ? "select"
                : "[data-board-open]",
            },
          }
        : {}),
    };
    return true;
  }
  $effect(() => {
    const request = requested;
    if (!request) return;
    const current = [
      ...(room.roomTasks ?? []),
      ...room.epics.flatMap((epic) => epic.tasks),
    ].find((task) => task.id === request.id);
    if (!current) {
      requested = null;
      restoreFocus(request);
      return;
    }
    if (current.status !== request.status) return;
    requested = null;
    announcement = `${current.title}: ${vb.t(lanes.find((lane) => lane.value === current.status)?.label ?? current.status)}`;
    restoreFocus(request);
  });
  function restoreFocus(request: MoveRequest) {
    const focus = request.focus;
    if (
      !focus ||
      (document.activeElement !== focus.node &&
        document.activeElement !== document.body)
    )
      return;
    void tick().then(() => {
      if (
        disposed ||
        request.generation !== generation ||
        (document.activeElement !== focus.node &&
          document.activeElement !== document.body)
      )
        return;
      const replacement =
        cards.get(focus.key)?.querySelector<HTMLElement>(focus.selector) ??
        addInput;
      replacement?.focus({ preventScroll: true });
      replacement?.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }
  function changeMode(value: string) {
    if (value !== "board" && value !== "list") return;
    mode = value;
    generation++;
    requested = null;
    try {
      localStorage.setItem("vb.boardMode", value);
    } catch {
      /* Preference is optional. */
    }
  }
  function keyboard(event: KeyboardEvent, task: BoardTask, key: string) {
    const next =
      event.key === "ArrowRight"
        ? adjacentStatus(task.status, 1)
        : event.key === "ArrowLeft"
          ? adjacentStatus(task.status, -1)
          : undefined;
    if (!next) return;
    event.preventDefault();
    move(task, next, key);
  }
  function drop(event: DragEvent, status: TaskStatus) {
    event.preventDefault();
    over = null;
    const id = event.dataTransfer?.getData("application/x-vibebook-task");
    const task = model.tasks.find((candidate) => candidate.id === id);
    dragging = null;
    if (task) move(task, status, `board:${task.id}`);
  }
  function add(event: SubmitEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    if (!targetValid) {
      error = vb.t("Escolha um épico.");
      return;
    }
    if (
      dispatch({ t: "task.add", epic: selectedTarget.id, title: title.trim() })
    )
      title = "";
  }
</script>

<section
  data-vb-native
  data-board-scope={model.scope ?? "all"}
  aria-label={vb.t("Quadro de tarefas")}
  class="tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground"
>
  <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
    {model.title ??
      (model.scope ? selectedTarget.title : vb.t("Todos os épicos"))}
  </p>
  {#if model.missingScope || !targetValid || error}<ErrorState
      title={model.missingScope
        ? vb.t("Épico não encontrado.")
        : !targetValid
          ? vb.t("Escolha um épico.")
          : error}
      compact
    />{/if}
  <p role="status" aria-live="polite" class="tw:sr-only">{announcement}</p>
  <p id={`${uid}-keys`} class="tw:sr-only">
    {vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")}
  </p>
  <Tabs
    class="tw:flex-1 tw:overflow-hidden"
    label={vb.t("Quadro de tarefas")}
    items={[
      { value: "board", label: vb.t("Quadro") },
      { value: "list", label: vb.t("Lista") },
    ]}
    value={mode}
    onValueChange={changeMode}
  >
    {#snippet children(value)}
      {#if value === mode}
        {#if value === "board"}
          <div class="tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2">
            <div
              class="tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3"
            >
              {#each lanes as lane (lane.value)}
                {@const tasks = model.tasks.filter(
                  (task) => task.status === lane.value,
                )}
                <section
                  data-lane={lane.value}
                  aria-label={vb.t(lane.label)}
                  ondragover={(event) => {
                    if (
                      event.dataTransfer?.types.includes(
                        "application/x-vibebook-task",
                      )
                    ) {
                      event.preventDefault();
                      over = lane.value;
                    }
                  }}
                  ondragleave={() => {
                    over = null;
                  }}
                  ondrop={(event) => drop(event, lane.value)}
                  class={cn(
                    "tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3",
                    over === lane.value && "tw:ring-2 tw:ring-ring",
                  )}
                >
                  <h3
                    class="tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal"
                  >
                    {vb.t(lane.label)}<Badge>{tasks.length}</Badge>
                  </h3>
                  <div class="tw:space-y-3">
                    {#each tasks as task (task.id)}{@render card(
                        task,
                        `board:${task.id}`,
                        false,
                      )}
                    {:else}<p
                        class="tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground"
                      >
                        {vb.t(
                          lane.value === "todo"
                            ? "Nada a fazer."
                            : "Arraste um card pra cá.",
                        )}
                      </p>{/each}
                  </div>
                </section>
              {/each}
            </div>
          </div>
        {:else}
          <div class="tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto">
            {#if mine.length}<section
                class="tw:space-y-2"
                aria-label={vb.t("Esperando você")}
              >
                <h3
                  class="tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal"
                >
                  {vb.t("Esperando você")}<Badge variant="warning"
                    >{mine.length}</Badge
                  >
                </h3>
                {#each mine as task (task.id)}{@render card(
                    task,
                    `mine:${task.id}`,
                    true,
                  )}{/each}
              </section>{/if}
            {#each openGroups as group (group.id)}<section
                class="tw:space-y-2"
                aria-label={group.title}
              >
                <h3
                  class="tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal"
                >
                  {group.title}<Badge>{group.tasks.length}</Badge>
                </h3>
                {#each group.tasks as task (task.id)}{@render card(
                    task,
                    `group:${task.id}`,
                    true,
                  )}{/each}
              </section>{:else}<EmptyState
                title={vb.t("Nenhuma tarefa aberta.")}
              />{/each}
          </div>
        {/if}
      {/if}
    {/snippet}
  </Tabs>
  <form
    onsubmit={add}
    class="tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2"
    data-board-add
  >
    <div class="tw:min-w-36 tw:flex-1 tw:space-y-1">
      <Label for={`${uid}-title`}>{vb.t("Nova tarefa")}</Label>
      <Input
        id={`${uid}-title`}
        placeholder={vb.t("nova tarefa")}
        bind:ref={addInput}
        bind:value={title}
      />
    </div>
    {#if !model.scope}<div class="tw:min-w-32 tw:flex-1 tw:space-y-1">
        <Label for={`${uid}-epic`}>{vb.t("Épico")}</Label>
        <Select
          id={`${uid}-epic`}
          aria-invalid={!targetValid}
          items={targetItems}
          value={selectedTarget.id}
          onValueChange={(value) => {
            const next = model.targets.find((target) => target.id === value);
            if (!next) return false;
            selectedTarget = next;
            error = "";
          }}
        />
      </div>{/if}
    <Button type="submit" disabled={!title.trim() || !targetValid}
      ><Icon name="plus" />{vb.t("Nova tarefa")}</Button
    >
  </form>
</section>

{#snippet card(task: BoardTask, key: string, row: boolean)}
  <article
    use:registerCard={key}
    data-board-task={task.id}
    data-status={task.status}
    draggable={!row}
    ondragstart={(event) => {
      if (event.target instanceof Element && event.target.closest("select")) {
        event.preventDefault();
        return;
      }
      if (event.dataTransfer) {
        event.dataTransfer.setData("application/x-vibebook-task", task.id);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setDragImage(event.currentTarget, 20, 20);
      }
      dragging = task.id;
    }}
    ondragend={() => {
      dragging = null;
      over = null;
    }}
    class={cn(
      "tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs",
      row && "tw:flex tw:flex-wrap tw:items-center",
      dragging === task.id && "tw:opacity-50",
      task.status !== "done" &&
        task.owner === room.me &&
        "tw:ring-1 tw:ring-ring/20",
    )}
  >
    <button
      type="button"
      data-board-open
      data-epic={task.epicId}
      aria-describedby={`${uid}-keys`}
      onclick={() => onopen?.(task.epicId)}
      onkeydown={(event) => keyboard(event, task, key)}
      class={cn(
        "tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring",
        !row && "tw:pr-10",
      )}
    >
      <span
        class={cn(
          "tw:block tw:break-words tw:font-medium",
          task.status === "done" && "tw:line-through",
        )}>{task.title}</span
      >
      {#if task.flags?.length}<Badge
          variant="warning"
          title={`@vibe: ${task.flags.join(" · ")}`}
          ><Icon name="warning" class="tw:size-3" />{task.flags.join(
            " · ",
          )}</Badge
        >{/if}
      <span
        class="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground"
      >
        <Badge>{task.epicTitle}</Badge>
        {#if task.owner}<Avatar
            name={vb.name(task.owner)}
            src={`/api/avatar/${encodeURIComponent(task.owner)}`}
            class="tw:size-6"
          /><span
            >{task.owner === room.me ? vb.t("você") : vb.name(task.owner)}</span
          >{/if}
        {#if task.due}<span class="tw:inline-flex tw:items-center tw:gap-1"
            ><Icon name="calendar" class="tw:size-3" />{task.due}</span
          >{/if}
      </span>
    </button>
    {#if !row}<span
        data-board-drag
        draggable="true"
        aria-hidden="true"
        title={vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")}
        class="tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing"
        ><Icon name="grip" /></span
      >{/if}
    <div
      class={cn(
        "tw:min-w-32 tw:space-y-1 tw:p-3",
        !row && "tw:border-t tw:border-border",
      )}
    >
      <Label for={`${uid}-${key}`}>{vb.t("Status")}</Label>
      <Select
        id={`${uid}-${key}`}
        aria-label={`${vb.t("Status")}: ${task.title}`}
        value={task.status}
        items={options}
        onValueChange={(value) => {
          if (isTaskStatus(value)) move(task, value, key);
          return false;
        }}
      />
    </div>
  </article>
{/snippet}
