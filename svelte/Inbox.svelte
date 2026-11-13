<script lang="ts">
  import { untrack } from "svelte";
  import type { Wait, Bridge } from "./types";
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
    roomId,
    all: startAll = false,
    vb,
    avatarUrl,
    displayName,
    ontab,
    onopen,
    onresolve,
    onclose,
  }: {
    waits: Wait[];
    roomId: string | null;
    all?: boolean;
    vb: Pick<Bridge, "t" | "ago">;
    avatarUrl?: (email: string) => string | undefined;
    displayName?: (email: string) => string;
    ontab?: (all: boolean) => void;
    onopen: (wait: Wait, event: MouseEvent) => void;
    onresolve: (wait: Wait) => void | Promise<void>;
    onclose: () => void;
  } = $props();
  let selected = $state(untrack(() => (startAll || !roomId ? "all" : "room")));
  let open = $state(true);
  let pending = $state<string | null>(null);
  let error = $state("");
  const here = $derived(waits.filter((wait) => wait.book_id === roomId));
  const showAll = $derived(selected === "all" || !roomId);
  const list = $derived(showAll ? waits : here);
  const items = $derived([
    { value: "room", label: `${vb.t("Esta sala")} (${here.length})` },
    { value: "all", label: `${vb.t("Todas")} (${waits.length})` },
  ]);
  const key = (wait: Wait) => `${wait.book_id}:${wait.ref}`;
  const kind = (wait: Wait) =>
    wait.ref.startsWith("t")
      ? "task"
      : /^[ab]/.test(wait.ref)
        ? "agent"
        : "ask";
  const author = (wait: Wait) =>
    wait.author_name || displayName?.(wait.author) || wait.author.split("@")[0];
  function href(wait: Wait) {
    const path = `/b/${encodeURIComponent(wait.book_id)}${wait.thread === "main" ? "" : `?t=${encodeURIComponent(wait.thread)}`}${/^[mab]/.test(wait.ref) ? `#m${wait.ref.slice(1)}` : ""}`;
    return uiNavigationUrl(path, window.location.href, "svelte");
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
  {#if list.length}
    <ul
      class="tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0"
    >
      {#each list as wait (key(wait))}
        <li class="tw:flex tw:items-start tw:gap-2 tw:py-1">
          <a
            href={href(wait)}
            onclick={(event) => onopen(wait, event)}
            class="tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring"
          >
            {#if kind(wait) === "task"}<span
                class="tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted"
                ><Icon name="check" /></span
              >
            {:else}<Avatar
                name={author(wait)}
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
                      : `${author(wait).split(" ")[0]}:`}</strong
                >
                {wait.text}
              </span>
              <span class="tw:text-xs tw:leading-4 tw:text-muted-foreground"
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
  {:else}<EmptyState
      title={showAll
        ? vb.t("Nada esperando você. ✓")
        : vb.t("Nada esperando você nesta sala. ✓")}
    />{/if}
{/snippet}
