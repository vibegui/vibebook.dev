<script lang="ts">
  import { untrack } from "svelte";
  import type { Wait, Bridge } from "./types";

  // The inbox: what's waiting on you (asks, your tasks in review, your agent waiting), this room or all rooms.
  // Strings, avatars and icons come from the app (t, avatar, icon), so i18n and the look stay in one place.
  let {
    waits,
    roomId,
    all: startAll = false,
    vb,
    ontab,
    onopen,
    onresolve,
    onclose,
  }: {
    waits: Wait[];
    roomId: string | null;
    all?: boolean;
    ontab?: (all: boolean) => void;
    vb: Bridge;
    onopen: (w: Wait, e: MouseEvent) => void;
    onresolve: (w: Wait) => void;
    onclose: () => void;
  } = $props();
  let all = $state(untrack(() => startAll));
  const tab = (v: boolean) => {
    all = v;
    ontab?.(v);
  };

  const here = $derived(
    roomId ? waits.filter((w) => w.book_id === roomId) : [],
  );
  const showAll = $derived(all || !roomId);
  const list = $derived(showAll ? waits : here);
  const who = (w: Wait) =>
    (w.author_name || w.author.split("@")[0]).split(" ")[0];
  const kind = (w: Wait) =>
    w.ref.startsWith("t") ? "task" : /^[ab]/.test(w.ref) ? "agent" : "ask";
  const href = (w: Wait) =>
    `/b/${w.book_id}${w.thread === "main" ? "" : `?t=${encodeURIComponent(w.thread)}`}${/^[mab]/.test(w.ref) ? `#m${w.ref.slice(1)}` : ""}`;
  const short = (s: string) => (s.length > 220 ? `${s.slice(0, 218)}…` : s);
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
      >{vb.t("Esta sala")} <small>{here.length}</small></button
    >
    <button type="button" class:on={showAll} onclick={() => tab(true)}
      >{vb.t("Todas")} <small>{waits.length}</small></button
    >
  </div>
{/if}
{#if list.length}
  <ul>
    {#each list as w (w.book_id + w.ref)}
      <li>
        <a href={href(w)} onclick={(e) => onopen(w, e)}>
          <span class="wIc" class:task={kind(w) === "task"}
            >{@html kind(w) === "task"
              ? vb.icon("check", 16)
              : vb.avatar(w.author)}</span
          >
          <span class="wt">
            <span>
              {#if kind(w) === "task"}<b>{vb.t("Tarefa sua esperando OK:")}</b>
              {:else if kind(w) === "agent"}<b
                  >{vb.t("Seu agent espera você:")}</b
                >
              {:else}<b>{who(w)}:</b>{/if}
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
{:else}
  <p class="ibEmpty">
    {showAll
      ? vb.t("Nada esperando você. ✓")
      : vb.t("Nada esperando você nesta sala. ✓")}
  </p>
{/if}
