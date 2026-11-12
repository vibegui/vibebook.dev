<script lang="ts">
  import { escapeHtml, type PanelProps, type Epic, type Task } from "./panels";
  import type { TaskStatus } from "../shared/room";
  let { room, thread, vb, send, onopen }: PanelProps = $props();
  const lanes: ReadonlyArray<readonly [TaskStatus, string]> = [
    ["todo", "A fazer"],
    ["doing", "Fazendo"],
    ["review", "Esperando OK"],
    ["done", "Feito"],
  ];
  let mode = $state(
    (() => {
      try {
        return localStorage.getItem("vb.boardMode") || "board";
      } catch {
        return "board";
      }
    })(),
  );
  let title = $state(""),
    selectedEpic = $state(""),
    over = $state<string | null>(null);
  const scope = $derived(
    thread !== "main" &&
      !thread.startsWith("pre:") &&
      room.epics.some((e) => e.id === thread)
      ? thread
      : null,
  );
  const epics = $derived(
    room.epics.filter((e) => (scope ? e.id === scope : !e.archived)),
  );
  const tasks = $derived(
    epics.flatMap((epic) => epic.tasks.map((t) => ({ ...t, epic }))),
  );
  const groups = $derived(
    [
      ...(scope
        ? []
        : [
            {
              id: "main",
              title: room.book?.title || "vibebook",
              tasks: room.roomTasks || [],
            },
          ]),
      ...epics,
    ]
      .map((e) => ({
        e,
        list: e.tasks
          .filter((t) => t.status !== "done")
          .map((t) => ({ ...t, epic: e })),
      }))
      .filter((g) => g.list.length),
  );
  const mine = $derived(
    groups.flatMap((g) => g.list.filter((t) => t.owner === room.me)),
  );
  const status: Record<string, string> = {
    todo: "a fazer",
    doing: "fazendo",
    review: "esperando OK",
    done: "feito",
  };
  const move = (id: string, status: TaskStatus) =>
    send({ t: "task.status", id, status });
  function setMode(value: string) {
    mode = value;
    try {
      localStorage.setItem("vb.boardMode", value);
    } catch {}
  }
  function drag(e: DragEvent, id: string) {
    e.dataTransfer?.setData("text/plain", id);
    (e.currentTarget as HTMLElement).classList.add("dragging");
  }
  function drop(e: DragEvent, lane: TaskStatus) {
    e.preventDefault();
    over = null;
    const id = e.dataTransfer?.getData("text/plain");
    if (id) move(id, lane);
  }
  function key(e: KeyboardEvent, tk: Task & { epic: Epic }) {
    const i = lanes.findIndex(([s]) => s === tk.status);
    if (e.key === "ArrowRight" && i < lanes.length - 1) {
      e.preventDefault();
      move(tk.id, lanes[i + 1][0]);
    }
    if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      move(tk.id, lanes[i - 1][0]);
    }
    if (e.key === "Enter") onopen?.(tk.epic.id);
  }
</script>

{#snippet row(tk: Task & { epic: Epic })}
  <button
    type="button"
    class="krow"
    class:done={tk.status === "done"}
    data-k={tk.id}
    data-epic={tk.epic.id}
    onclick={() => onopen?.(tk.epic.id)}
    ><span class="kt">{tk.title}</span>{#if tk.owner}{@html vb.avatar(
        tk.owner,
      )}{/if}<span class={`kst ${tk.status}`}
      >{vb.t(status[tk.status] || tk.status)}</span
    ></button
  >
{/snippet}
{#if room.epics.length}
  <div class="kbar">
    <span class="seg"
      ><button
        type="button"
        data-mode="board"
        class:on={mode === "board"}
        onclick={() => setMode("board")}
        >{@html vb.icon("board", 14)} {vb.t("Quadro")}</button
      ><button
        type="button"
        data-mode="list"
        class:on={mode === "list"}
        onclick={() => setMode("list")}>{vb.t("Lista")}</button
      ></span
    ><small class="kScope"
      >{scope
        ? room.epics.find((e) => e.id === scope)?.title
        : vb.t("Todos os épicos")}</small
    >
  </div>
  {#if mode === "list"}
    <div class="klist">
      {#if mine.length}<section>
          <h3 class="mine">⏳ {vb.t("Esperando você")} · {mine.length}</h3>
          {#each mine as tk (tk.id)}{@render row(tk)}{/each}
        </section>{/if}{#each groups as g (g.e.id)}<section>
          <h3>
            <span class="ri" style:background={vb.color(g.e.title)}
              >{vb.initials(g.e.title)}</span
            >{g.e.title} · {g.list.length}
          </h3>
          {#each g.list as tk (tk.id)}{@render row(tk)}{/each}
        </section>{:else}<div class="empty">
          {vb.t("Nenhuma tarefa aberta.")}
        </div>{/each}
    </div>
  {:else}
    <div class="lanes">
      {#each lanes as [lane, label]}
        {@const list = tasks.filter((t) => t.status === lane)}
        <section
          class="lane"
          class:over={over === lane}
          data-lane={lane}
          ondragover={(e) => {
            e.preventDefault();
            over = lane;
          }}
          ondragleave={() => (over = null)}
          ondrop={(e) => drop(e, lane)}
          aria-label={vb.t(label)}
        >
          <h3>{vb.t(label)}<span>{list.length}</span></h3>
          <div class="cards">
            {#each list as tk (tk.id)}
              <div
                class="kcard"
                class:done={tk.status === "done"}
                class:mine={tk.status !== "done" && tk.owner === room.me}
                draggable="true"
                tabindex="0"
                role="button"
                data-k={tk.id}
                data-status={tk.status}
                data-epic={tk.epic.id}
                title={vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")}
                ondragstart={(e) => drag(e, tk.id)}
                ondragend={(e) => e.currentTarget.classList.remove("dragging")}
                onclick={() => onopen?.(tk.epic.id)}
                onkeydown={(e) => key(e, tk)}
              >
                <div class="kt">
                  {@html vb.mentions?.(escapeHtml(tk.title)) ??
                    escapeHtml(tk.title)}
                </div>
                {#if tk.flags?.length}<span
                    class="vnote"
                    title={`@vibe: ${tk.flags.join(" · ")}`}
                    >{@html vb.icon("alert", 12)} {tk.flags.join(" · ")}</span
                  >{/if}
                <div class="km">
                  <span class="kep" style:background={vb.color(tk.epic.title)}
                    >{tk.epic.title}</span
                  >{#if tk.owner}{@html vb.avatar(tk.owner)}<span
                      >{tk.owner === room.me
                        ? vb.t("você")
                        : vb.name(tk.owner)}</span
                    >{/if}{#if tk.due}<span
                      >{@html vb.icon("calendar", 12)} {tk.due}</span
                    >{/if}
                </div>
              </div>
            {:else}<div class="kempty">
                {vb.t(
                  lane === "todo" ? "Nada a fazer." : "Arraste um card pra cá.",
                )}
              </div>{/each}
          </div>
          {#if lane === "todo"}<form
              class="kadd"
              onsubmit={(e) => {
                e.preventDefault();
                const epic = scope || selectedEpic || room.epics[0]?.id;
                if (title.trim() && epic)
                  send({ t: "task.add", epic, title: title.trim() });
                title = "";
              }}
            >
              <input
                placeholder={vb.t("nova tarefa")}
                aria-label={vb.t("Nova tarefa")}
                bind:value={title}
              /><button aria-label={vb.t("Nova tarefa")}
                >{@html vb.icon("plus")}</button
              >{#if scope}<input
                  type="hidden"
                  name="epic"
                  value={scope}
                />{:else}<select
                  name="epic"
                  aria-label={vb.t("Épico")}
                  bind:value={selectedEpic}
                  >{#each room.epics as ep}<option value={ep.id}
                      >{ep.title}</option
                    >{/each}</select
                >{/if}
            </form>{/if}
        </section>
      {/each}
    </div>
  {/if}
{:else}<div class="empty">
    {vb.t(
      "Ainda não tem épico nem tarefa. Crie um épico na barra ao lado, ou peça pro seu agent organizar o projeto em épicos e tarefas.",
    )}
  </div>{/if}
