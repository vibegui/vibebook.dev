<script lang="ts">
  import type { RoomCommand } from "../shared/commands";
  import type { PanelProps, Task } from "./panels";
  import Button from "./lib/ui/Button.svelte";
  import IconButton from "./lib/ui/IconButton.svelte";
  import Icon from "./lib/ui/Icon.svelte";
  import Input from "./lib/ui/Input.svelte";
  import Select from "./lib/ui/Select.svelte";
  import Checkbox from "./lib/ui/Checkbox.svelte";
  import Badge from "./lib/ui/Badge.svelte";
  import Dialog from "./lib/ui/Dialog.svelte";
  import Progress from "./lib/ui/Progress.svelte";
  import Field from "./lib/components/Field.svelte";
  import ErrorState from "./lib/components/ErrorState.svelte";
  import { cn } from "./lib/ui/utils";

  let {
    room,
    thread,
    vb,
    send,
    waits = [],
  }: Pick<PanelProps, "room" | "thread" | "send" | "waits"> & {
    vb: Pick<PanelProps["vb"], "t" | "name">;
  } = $props();
  const uid = $props.id();
  const list = $derived(
    room.epics.find((epic) => epic.id === thread) ??
      (thread === "main" && room.roomTasks?.length
        ? { id: "main", tasks: room.roomTasks, flags: [] }
        : null),
  );
  const waiting = (task: Task) =>
    waits.some(
      (wait) => wait.book_id === room.id && wait.ref === `t${task.id}`,
    );
  const tasks = $derived(
    (list?.tasks ?? [])
      .map((task, index) => ({ task, index }))
      .sort(
        (a, b) =>
          (a.task.done ? 2 : waiting(a.task) ? 0 : 1) -
            (b.task.done ? 2 : waiting(b.task) ? 0 : 1) || a.index - b.index,
      )
      .map((row) => row.task),
  );
  const done = $derived(list?.tasks.filter((task) => task.done).length ?? 0);
  const owners = $derived([
    { value: "", label: vb.t("sem dono") },
    ...(room.members ?? []).map((email) => ({
      value: email,
      label: email === room.me ? vb.t("você") : vb.name(email),
    })),
  ]);
  let edit = $state<string | null>(null);
  let title = $state("");
  let editInput = $state<HTMLInputElement | null>(null);
  let newTitle = $state("");
  let error = $state("");
  let dueID = $state<string | null>(null);
  let dueOpen = $state(false);
  let dueDraft = $state("");
  let dueInput = $state<HTMLInputElement | null>(null);
  const dueTask = $derived(list?.tasks.find((task) => task.id === dueID));

  $effect(() => {
    if (edit && editInput) {
      editInput.focus();
      editInput.select();
    }
  });
  $effect(() => {
    if (dueID && !dueTask) closeDue();
    if (edit && !list?.tasks.some((task) => task.id === edit)) edit = null;
  });
  function dispatch(command: RoomCommand): boolean {
    try {
      if (send(command)) {
        error = "";
        return true;
      }
    } catch {
      /* Keep form data when a socket closes during dispatch. */
    }
    error = vb.t("Não deu pra enviar agora. Tente de novo.");
    return false;
  }
  function save(task: Task, accept = true) {
    if (edit !== task.id) return;
    if (!accept || !title.trim() || title === task.title) {
      edit = null;
      return;
    }
    if (dispatch({ t: "task.rename", id: task.id, title })) edit = null;
  }
  function openDue(task: Task) {
    dueID = task.id;
    dueDraft = task.due ?? "";
    dueOpen = true;
  }
  function closeDue() {
    dueOpen = false;
    dueID = null;
    dueDraft = "";
  }
</script>

{#if list}
  <section
    class="tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground"
    aria-label={vb.t("Tarefas")}
  >
    <header class="tw:flex tw:items-center tw:gap-3">
      <h3 class="tw:m-0 tw:font-sans tw:text-sm tw:font-semibold">
        {vb.t("Tarefas")}
      </h3>
      <Badge>{done}/{list.tasks.length}</Badge>
      <Progress
        label={vb.t("Tarefas")}
        value={done}
        max={Math.max(1, list.tasks.length)}
        aria-valuetext={`${done}/${list.tasks.length}`}
        class="tw:ml-auto tw:max-w-24"
      />
    </header>
    {#if list.flags?.length}<Badge
        variant="warning"
        title={`@vibe: ${list.flags.join(" · ")}`}
        ><Icon name="warning" class="tw:size-3" />{list.flags.join(
          " · ",
        )}</Badge
      >{/if}
    {#if error && !dueOpen}<ErrorState title={error} compact />{/if}
    <div class="tw:space-y-2">
      {#each tasks as task (task.id)}
        <div
          data-task={task.id}
          role="group"
          aria-label={task.title}
          class={cn(
            "tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2",
            task.done
              ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground"
              : "tw:border-border tw:bg-card tw:text-card-foreground",
            !task.done && task.owner === room.me && "tw:border-ring/50",
            waiting(task) && "tw:bg-warning/10",
          )}
        >
          <Checkbox
            checked={task.done}
            aria-label={vb.t("Feita")}
            onclick={(event) => {
              event.preventDefault();
              dispatch({ t: "task.toggle", id: task.id });
            }}
          />
          {#if edit === task.id}
            <Input
              data-task-edit={task.id}
              aria-label={vb.t("Clique para editar")}
              class="tw:min-w-32 tw:flex-1"
              bind:ref={editInput}
              bind:value={title}
              onblur={() => save(task)}
              onkeydown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  save(task);
                }
                if (event.key === "Escape") {
                  event.preventDefault();
                  save(task, false);
                }
              }}
            />
          {:else}
            <div class="tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1">
              <Button
                data-task-title={task.id}
                variant="ghost"
                class={cn(
                  "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline",
                  task.done && "tw:text-muted-foreground tw:line-through",
                )}
                title={vb.t("Clique para editar")}
                onclick={() => {
                  edit = task.id;
                  title = task.title;
                }}>{task.title}</Button
              >
              {#if task.flags?.length}<Badge
                  variant="warning"
                  title={`@vibe: ${task.flags.join(" · ")}`}
                  ><Icon name="warning" class="tw:size-3" />{task.flags.join(
                    " · ",
                  )}</Badge
                >{/if}
            </div>
          {/if}
          <Select
            data-owner={task.id}
            aria-label={vb.t("Responsável")}
            value={task.owner ?? ""}
            items={owners}
            class="tw:w-auto tw:max-w-40"
            onValueChange={(owner) =>
              dispatch({ t: "task.assign", id: task.id, owner })}
          />
          <Button
            data-due={task.id}
            variant="ghost"
            size="sm"
            title={vb.t("Prazo")}
            aria-label={task.due
              ? `${vb.t("Prazo")}: ${task.due}`
              : vb.t("Prazo")}
            onclick={() => openDue(task)}
            ><Icon name="calendar" class="tw:size-3.5" />{task.due ??
              ""}</Button
          >
          <IconButton
            data-tdel={task.id}
            label={vb.t("Apagar task")}
            icon="close"
            class="tw:size-8"
            onclick={() => dispatch({ t: "task.del", id: task.id })}
          />
        </div>
      {/each}
    </div>
    <form
      id="newTask"
      class="tw:flex tw:items-center tw:gap-2"
      onsubmit={(event) => {
        event.preventDefault();
        if (
          newTitle.trim() &&
          dispatch({ t: "task.add", epic: thread, title: newTitle })
        )
          newTitle = "";
      }}
    >
      <Input
        aria-label={vb.t("nova task")}
        placeholder={vb.t("nova task")}
        bind:value={newTitle}
      />
      <IconButton
        type="submit"
        label={vb.t("Nova tarefa")}
        icon="plus"
        variant="outline"
      />
    </form>
  </section>
{/if}
{#if dueTask}
  <Dialog
    bind:open={dueOpen}
    title={vb.t("Prazo")}
    description={vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")}
    closeLabel={vb.t("Fechar")}
    initialFocus={() => dueInput}
    onOpenChange={(open) => {
      if (!open) closeDue();
    }}
  >
    <form
      class="tw:grid tw:grid-cols-1 tw:gap-4"
      onsubmit={(event) => {
        event.preventDefault();
        if (
          dueTask &&
          dispatch({ t: "task.assign", id: dueTask.id, due: dueDraft })
        )
          closeDue();
      }}
    >
      <Field id={`${uid}-due`} label={vb.t("Prazo")}>
        {#snippet children(attributes)}<Input
            {...attributes}
            bind:ref={dueInput}
            bind:value={dueDraft}
          />{/snippet}
      </Field>
      {#if error}<ErrorState title={error} compact />{/if}
      <div class="tw:flex tw:flex-wrap tw:justify-end tw:gap-2">
        <Button variant="outline" onclick={closeDue}>{vb.t("Cancelar")}</Button
        ><Button type="submit">{vb.t("Salvar")}</Button>
      </div>
    </form>
  </Dialog>
{/if}
