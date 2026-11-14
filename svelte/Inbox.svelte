<script lang="ts">
  import { untrack } from "svelte";
  import type { Wait, InboxMention, InboxTask, Bridge } from "./types";
  import { uiNavigationUrl } from "../shared/uiVariant";
  import Avatar from "./lib/ui/Avatar.svelte";
  import Dialog from "./lib/ui/Dialog.svelte";
  import Icon from "./lib/ui/Icon.svelte";
  import IconButton from "./lib/ui/IconButton.svelte";
  import Tabs from "./lib/ui/Tabs.svelte";
  import EmptyState from "./lib/components/EmptyState.svelte";
  import ErrorState from "./lib/components/ErrorState.svelte";

  let {
    waits,
    mentions = [],
    tasks = [],
    roomId,
    all: startAll = false,
    vb,
    avatarUrl,
    displayName,
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
    vb: Pick<Bridge, "t" | "ago">;
    avatarUrl?: (email: string) => string | undefined;
    displayName?: (email: string) => string;
    ontab?: (all: boolean) => void;
    onopen: (wait: Wait, event: MouseEvent) => void;
    onnav?: (bookId: string, thread: string, msgId: number) => void;
    onresolve: (wait: Wait) => void | Promise<void>;
    onclose: () => void;
  } = $props();
  let selected = $state(untrack(() => (startAll || !roomId ? "all" : "room")));
  let open = $state(true);
  let pending = $state<string | null>(null);
  let error = $state("");
  const showAll = $derived(selected === "all" || !roomId);
  const mine = <T extends { book_id: string }>(xs: T[]) =>
    showAll ? xs : xs.filter((x) => x.book_id === roomId);
  const waitList = $derived(mine(waits));
  const mentionList = $derived(mine(mentions));
  const taskList = $derived(mine(tasks));
  const total = (scopeAll: boolean) => {
    const f = <T extends { book_id: string }>(xs: T[]) =>
      scopeAll ? xs.length : xs.filter((x) => x.book_id === roomId).length;
    return f(waits) + f(mentions) + f(tasks);
  };
  const items = $derived([
    { value: "room", label: `${vb.t("Esta sala")} (${total(false)})` },
    { value: "all", label: `${vb.t("Todas")} (${total(true)})` },
  ]);
  const anything = $derived(
    waitList.length + mentionList.length + taskList.length > 0,
  );
  const key = (wait: Wait) => `${wait.book_id}:${wait.ref}`;
  const kind = (wait: Wait) =>
    wait.ref.startsWith("t")
      ? "task"
      : /^[ab]/.test(wait.ref)
        ? "agent"
        : "ask";
  const author = (a: string, name: string | null) =>
    name || displayName?.(a) || a.split("@")[0];
  const statusLabel = (s: string) =>
    s === "doing"
      ? vb.t("fazendo")
      : s === "review"
        ? vb.t("revisar")
        : vb.t("a fazer");
  function waitHref(wait: Wait) {
    const path = `/b/${encodeURIComponent(wait.book_id)}${wait.thread === "main" ? "" : `?t=${encodeURIComponent(wait.thread)}`}${/^[mab]/.test(wait.ref) ? `#m${wait.ref.slice(1)}` : ""}`;
    return uiNavigationUrl(path, window.location.href, "svelte");
  }
  function navHref(bookId: string, thread: string, msgId: number) {
    const path = `/b/${encodeURIComponent(bookId)}${thread && thread !== "main" ? `?t=${encodeURIComponent(thread)}` : ""}${msgId ? `#m${msgId}` : ""}`;
    return uiNavigationUrl(path, window.location.href, "svelte");
  }
  function clickNav(
    event: MouseEvent,
    bookId: string,
    thread: string,
    msgId: number,
  ) {
    if (!onnav) return; // no handler: let the anchor's href navigate
    event.preventDefault();
    onnav(bookId, thread, msgId);
  }
  async function resolve(wait: Wait) {
    pending = key(wait);
    error = "";
    try {
      await onresolve(wait);
    } catch {
      error = vb.t("Não deu pra resolver agora. Tente de novo.");
    } finally {
      pending = null;
    }
  }
</script>

<Dialog
  bind:open
  title={vb.t("Caixa de entrada")}
  closeLabel={vb.t("Fechar")}
  onOpenChange={(value) => {
    if (!value) onclose();
  }}
>
  {#snippet children()}
    {#if error}<ErrorState title={error} compact />{/if}
    {#if roomId}
      <Tabs
        {items}
        label={vb.t("Caixa de entrada")}
        bind:value={selected}
        onValueChange={(value) => ontab?.(value === "all")}
      >
        {#snippet children()}{@render content()}{/snippet}
      </Tabs>
    {:else}{@render content()}{/if}
  {/snippet}
</Dialog>

{#snippet content()}
  {#if anything}
    <div
      class="tw:flex tw:max-h-[62dvh] tw:min-h-0 tw:flex-col tw:gap-4 tw:overflow-auto tw:overscroll-contain"
    >
      {#if waitList.length}
        <section>
          <h3
            class="tw:m-0 tw:mb-1 tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground"
          >
            {vb.t("Esperando você")} ({waitList.length})
          </h3>
          <ul class="tw:m-0 tw:list-none tw:divide-y tw:divide-border tw:p-0">
            {#each waitList as wait (key(wait))}
              <li class="tw:flex tw:items-start tw:gap-2 tw:py-1">
                <a
                  href={waitHref(wait)}
                  onclick={(event) => onopen(wait, event)}
                  class="tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring"
                >
                  {#if kind(wait) === "task"}<span
                      class="tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted"
                      ><Icon name="check" /></span
                    >
                  {:else}<Avatar
                      name={author(wait.author, wait.author_name)}
                      src={avatarUrl?.(wait.author)}
                    />{/if}
                  <span
                    class="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]"
                  >
                    <span class="tw:line-clamp-3">
                      <strong class="tw:font-semibold"
                        >{kind(wait) === "task"
                          ? vb.t("Tarefa sua esperando OK:")
                          : kind(wait) === "agent"
                            ? vb.t("Seu agent espera você:")
                            : `${author(wait.author, wait.author_name).split(" ")[0]}:`}</strong
                      >
                      {wait.text}
                    </span>
                    <span
                      class="tw:text-xs tw:leading-4 tw:text-muted-foreground"
                      >{showAll ? `${wait.room} › ` : ""}{wait.topic ||
                        vb.t("sala principal")} · {vb.ago(wait.ts)}</span
                    >
                  </span>
                </a>
                {#if wait.ref.startsWith("m")}
                  <IconButton
                    icon="check"
                    label={vb.t(
                      "Já resolvi (respondi em outro lugar, ou não é comigo)",
                    )}
                    class="tw:mt-1"
                    loading={pending === key(wait)}
                    disabled={pending !== null}
                    onclick={() => resolve(wait)}
                  />
                {/if}
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if mentionList.length}
        <section>
          <h3
            class="tw:m-0 tw:mb-1 tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground"
          >
            {vb.t("Te mencionaram")} ({mentionList.length})
          </h3>
          <ul class="tw:m-0 tw:list-none tw:divide-y tw:divide-border tw:p-0">
            {#each mentionList as m (`${m.book_id}:${m.msg_id}`)}
              <li class="tw:flex tw:items-start tw:gap-2 tw:py-1">
                <a
                  href={navHref(m.book_id, m.thread, m.msg_id)}
                  onclick={(event) =>
                    clickNav(event, m.book_id, m.thread, m.msg_id)}
                  class="tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring"
                >
                  <Avatar
                    name={author(m.author, m.author_name)}
                    src={avatarUrl?.(m.author)}
                  />
                  <span
                    class="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]"
                  >
                    <span class="tw:line-clamp-3">
                      <strong class="tw:font-semibold"
                        >{author(m.author, m.author_name).split(
                          " ",
                        )[0]}:</strong
                      >
                      {m.text}
                    </span>
                    <span
                      class="tw:text-xs tw:leading-4 tw:text-muted-foreground"
                      >{showAll ? `${m.room} › ` : ""}{vb.ago(m.ts)}</span
                    >
                  </span>
                </a>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if taskList.length}
        <section>
          <h3
            class="tw:m-0 tw:mb-1 tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground"
          >
            {vb.t("Suas tarefas")} ({taskList.length})
          </h3>
          <ul class="tw:m-0 tw:list-none tw:divide-y tw:divide-border tw:p-0">
            {#each taskList as task (`${task.book_id}:${task.task_id}`)}
              <li class="tw:flex tw:items-start tw:gap-2 tw:py-1">
                <a
                  href={navHref(task.book_id, task.epic_id, 0)}
                  onclick={(event) =>
                    clickNav(event, task.book_id, task.epic_id, 0)}
                  class="tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring"
                >
                  <span
                    class="tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted"
                    ><Icon name="calendar" /></span
                  >
                  <span
                    class="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]"
                  >
                    <span class="tw:line-clamp-3">{task.title}</span>
                    <span
                      class="tw:text-xs tw:leading-4 tw:text-muted-foreground"
                      >{showAll ? `${task.room} › ` : ""}{task.epic ||
                        vb.t("sala principal")} · {statusLabel(
                        task.status,
                      )}{task.due ? ` · ${task.due}` : ""}</span
                    >
                  </span>
                </a>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </div>
  {:else}<EmptyState
      title={showAll
        ? vb.t("Nada esperando você. ✓")
        : vb.t("Nada esperando você nesta sala. ✓")}
    />{/if}
{/snippet}
