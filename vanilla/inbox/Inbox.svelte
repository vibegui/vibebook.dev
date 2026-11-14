<script lang="ts">
  import { untrack } from "svelte";
  import type { Wait, InboxMention, InboxTask, Bridge } from "./types";

  // The inbox: everything across your rooms that needs you — what's waiting on you (asks, your tasks in review, your
  // agent waiting), the @mentions held back for the digest, and your open tasks. This room or all rooms.
  // Strings, avatars and icons come from the app (t, avatar, icon), so i18n and the look stay in one place.
  let {
    waits,
    mentions = [],
    tasks = [],
    roomId,
    all: startAll = false,
    vb,
    ontab,
    onopen,
    onnav,
    onresolve,
    onclose,
  }: {
    waits: Wait[];
    mentions?: InboxMention[];
    tasks?: InboxTask[];
    roomId: string | null;
    all?: boolean;
    ontab?: (all: boolean) => void;
    vb: Bridge;
    onopen: (w: Wait, e: MouseEvent) => void;
    onnav?: (bookId: string, thread: string, msgId: number) => void;
    onresolve: (w: Wait) => void;
    onclose: () => void;
  } = $props();
  let all = $state(untrack(() => startAll));
  const tab = (v: boolean) => {
    all = v;
    ontab?.(v);
  };

  const showAll = $derived(all || !roomId);
  const mine = <T extends { book_id: string }>(xs: T[]) =>
    showAll ? xs : xs.filter((x) => x.book_id === roomId);
  const waitList = $derived(mine(waits));
  const mentionList = $derived(mine(mentions));
  const taskList = $derived(mine(tasks));
  const anything = $derived(
    waitList.length + mentionList.length + taskList.length > 0,
  );
  const scoped = <T extends { book_id: string }>(xs: T[], a: boolean) =>
    a ? xs.length : xs.filter((x) => x.book_id === roomId).length;
  const total = (a: boolean) =>
    scoped(waits, a) + scoped(mentions, a) + scoped(tasks, a);
  const who = (a: string, name: string | null) =>
    (name || a.split("@")[0]).split(" ")[0];
  const kind = (w: Wait) =>
    w.ref.startsWith("t") ? "task" : /^[ab]/.test(w.ref) ? "agent" : "ask";
  const href = (w: Wait) =>
    `/b/${w.book_id}${w.thread === "main" ? "" : `?t=${encodeURIComponent(w.thread)}`}${/^[mab]/.test(w.ref) ? `#m${w.ref.slice(1)}` : ""}`;
  const navHref = (bookId: string, thread: string, msgId: number) =>
    `/b/${bookId}${thread && thread !== "main" ? `?t=${encodeURIComponent(thread)}` : ""}${msgId ? `#m${msgId}` : ""}`;
  const statusLabel = (s: string) =>
    s === "doing"
      ? vb.t("fazendo")
      : s === "review"
        ? vb.t("revisar")
        : vb.t("a fazer");
  const short = (s: string) => (s.length > 220 ? `${s.slice(0, 218)}…` : s);
  function clickNav(
    e: MouseEvent,
    bookId: string,
    thread: string,
    msgId: number,
  ) {
    if (!onnav) return; // no handler: the anchor's href navigates
    e.preventDefault();
    onnav(bookId, thread, msgId);
  }
</script>

<header>
  <h2>{vb.t("Caixa de entrada")}</h2>
  <button class="ghost" aria-label={vb.t("Fechar")} onclick={onclose}
    >{@html vb.icon("x", 18)}</button
  >
</header>
{#if roomId}
  <div class="ibTabs" role="tablist">
    <button type="button" class:on={!showAll} onclick={() => tab(false)}
      >{vb.t("Esta sala")} <small>{total(false)}</small></button
    >
    <button type="button" class:on={showAll} onclick={() => tab(true)}
      >{vb.t("Todas")} <small>{total(true)}</small></button
    >
  </div>
{/if}
{#if anything}
  <div class="ibBody">
    {#if waitList.length}
      <h3 class="ibSec">
        {vb.t("Esperando você")} <small>{waitList.length}</small>
      </h3>
      <ul>
        {#each waitList as w (w.book_id + w.ref)}
          <li>
            <a href={href(w)} onclick={(e) => onopen(w, e)}>
              <span class="wIc" class:task={kind(w) === "task"}
                >{@html kind(w) === "task"
                  ? vb.icon("check", 16)
                  : vb.avatar(w.author)}</span
              >
              <span class="wt">
                <span>
                  {#if kind(w) === "task"}<b
                      >{vb.t("Tarefa sua esperando OK:")}</b
                    >
                  {:else if kind(w) === "agent"}<b
                      >{vb.t("Seu agent espera você:")}</b
                    >
                  {:else}<b>{who(w.author, w.author_name)}:</b>{/if}
                  {short(w.text)}
                </span>
                <small
                  >{showAll ? `${w.room} › ` : ""}{w.topic ||
                    vb.t("sala principal")} · {vb.ago(w.ts)}</small
                >
              </span>
            </a>
            {#if w.ref.startsWith("m")}
              <button
                class="ghost"
                title={vb.t(
                  "Já resolvi (respondi em outro lugar, ou não é comigo)",
                )}
                aria-label={vb.t(
                  "Já resolvi (respondi em outro lugar, ou não é comigo)",
                )}
                onclick={() => onresolve(w)}>{@html vb.icon("check")}</button
              >
            {/if}
          </li>
        {/each}
      </ul>
    {/if}

    {#if mentionList.length}
      <h3 class="ibSec">
        {vb.t("Te mencionaram")} <small>{mentionList.length}</small>
      </h3>
      <ul>
        {#each mentionList as m (m.book_id + ":" + m.msg_id)}
          <li>
            <a
              href={navHref(m.book_id, m.thread, m.msg_id)}
              onclick={(e) => clickNav(e, m.book_id, m.thread, m.msg_id)}
            >
              <span class="wIc">{@html vb.avatar(m.author)}</span>
              <span class="wt">
                <span
                  ><b>{who(m.author, m.author_name)}:</b> {short(m.text)}</span
                >
                <small>{showAll ? `${m.room} › ` : ""}{vb.ago(m.ts)}</small>
              </span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}

    {#if taskList.length}
      <h3 class="ibSec">
        {vb.t("Suas tarefas")} <small>{taskList.length}</small>
      </h3>
      <ul>
        {#each taskList as task (task.book_id + ":" + task.task_id)}
          <li>
            <a
              href={navHref(task.book_id, task.epic_id, 0)}
              onclick={(e) => clickNav(e, task.book_id, task.epic_id, 0)}
            >
              <span class="wIc task">{@html vb.icon("board", 16)}</span>
              <span class="wt">
                <span>{short(task.title)}</span>
                <small
                  >{showAll ? `${task.room} › ` : ""}{task.epic ||
                    vb.t("sala principal")} · {statusLabel(
                    task.status,
                  )}{task.due ? ` · ${task.due}` : ""}</small
                >
              </span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{:else}
  <p class="ibEmpty">
    {showAll
      ? vb.t("Nada esperando você. ✓")
      : vb.t("Nada esperando você nesta sala. ✓")}
  </p>
{/if}
