<script lang="ts">
  import { onDestroy, onMount, untrack } from "svelte";
  import type { AgentSettingsProps } from "./types";
  import { grantGroups } from "./model";
  import { agentText } from "./copy";
  import Heading from "../../lib/ui/Heading.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Checkbox from "../../lib/ui/Checkbox.svelte";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  import SetupInstructions from "./SetupInstructions.svelte";
  let { owner, origin, vb, lang = "pt" }: AgentSettingsProps = $props();
  const view = untrack(() => owner.state),
    text = (key: Parameters<typeof agentText>[1]) => agentText(lang, key);
  const groups = $derived(
    $view.grants ? grantGroups($view.grants, Date.now()) : [],
  );
  const busy = $derived(
    $view.phase === "pending" || $view.phase === "unconfirmed",
  );
  let selected = $state<Set<string>>(new Set()),
    confirm = $state(false),
    target = $state.raw<string[]>([]),
    signature = $state("");
  let active = true,
    known = new Set<string>();
  const identity = (ids: readonly string[]) =>
    JSON.stringify(
      $view.grants?.agents.filter((grant) => ids.includes(grant.id)),
    );
  $effect(() => {
    const current = groups;
    untrack(() => {
      const ids = new Set(
        current.flatMap((group) => group.rows.map((row) => row.grant.id)),
      );
      const next = new Set([...selected].filter((id) => ids.has(id)));
      for (const group of current)
        for (const row of group.rows)
          if (!known.has(row.grant.id) && row.stale) next.add(row.grant.id);
      known = ids;
      selected = next;
    });
  });
  $effect(() => {
    if (confirm && identity(target) !== signature) confirm = false;
  });
  function change(id: string, checked: boolean) {
    if (!active || !owner.current()) return;
    const next = new Set(selected);
    checked ? next.add(id) : next.delete(id);
    selected = next;
  }
  function ask() {
    if (!active || busy || !selected.size) return;
    target = [...selected];
    signature = identity(target);
    confirm = true;
  }
  function revoke() {
    if (
      !active ||
      !owner.current() ||
      !confirm ||
      busy ||
      identity(target) !== signature
    )
      return;
    void owner.revoke(target);
  }
  onMount(() => owner.watch());
  onDestroy(() => {
    active = false;
  });
</script>

<section
  data-vb-native
  data-native-agent-settings
  class="tw:space-y-4 tw:font-sans tw:text-sm tw:tracking-normal tw:[font-variation-settings:normal] tw:text-foreground"
>
  {#if !$view.grants && $view.loading}<p
      role="status"
      class="tw:m-0 tw:text-muted-foreground"
    >
      {text("loading")}
    </p>{/if}
  {#if $view.readError}<div
      role="alert"
      class="tw:space-y-2 tw:text-destructive"
    >
      <p class="tw:m-0">{text("readFailed")}</p>
      <Button
        variant="outline"
        onclick={() => {
          if (active) void owner.refresh();
        }}>{text("retry")}</Button
      >
    </div>{/if}
  {#if $view.grants?.agents.length}
    <Heading level={2}>{text("connectedTitle")}</Heading>
    {#each groups as group (group.client)}<section
        class="tw:space-y-2 tw:rounded-control tw:border tw:border-border tw:p-3"
      >
        <Heading level={3}>{group.client} · {group.rows.length}</Heading
        >{#each group.rows as { grant } (grant.id)}<label
            class="tw:flex tw:items-start tw:gap-2 tw:rounded-control tw:p-2"
            ><Checkbox
              checked={selected.has(grant.id)}
              onchange={(event) => {
                if (
                  event.currentTarget instanceof HTMLInputElement &&
                  event.currentTarget.isConnected
                )
                  change(grant.id, event.currentTarget.checked);
              }}
            /><span
              >{text("connectedAt")}
              {vb.ago(grant.connected_at)}<small
                class="tw:block tw:text-xs tw:text-muted-foreground"
                >{grant.used_at
                  ? `${text("used")} ${vb.ago(grant.used_at)}`
                  : text(
                      grant.used_at === null ? "neverUsed" : "unknownUse",
                    )}</small
              ></span
            ></label
          >{/each}
      </section>{/each}
    <div class="tw:flex tw:flex-wrap tw:gap-2">
      <Button
        variant="outline"
        disabled={busy}
        onclick={(event) => {
          if (active && event.currentTarget.isConnected)
            selected = new Set(
              groups.flatMap((group) =>
                group.rows.slice(1).map((row) => row.grant.id),
              ),
            );
        }}>{text("markOld")}</Button
      ><Button
        disabled={busy || !selected.size}
        onclick={(event) => {
          if (event.currentTarget.isConnected) ask();
        }}>{text("revoke")} ({selected.size})</Button
      ><Button
        variant="ghost"
        disabled={$view.loading}
        onclick={() => {
          if (active) void owner.refresh();
        }}>{text("refresh")}</Button
      >
    </div>
    <p class="tw:m-0 tw:text-muted-foreground">{text("connectedHelp")}</p>
  {:else if $view.grants}<SetupInstructions
      {origin}
      {lang}
      current={owner.current}
    />{/if}
  {#if $view.phase === "error"}<p
      role="alert"
      class="tw:m-0 tw:text-destructive"
    >
      {text("revokeFailed")}
    </p>{/if}
  {#if $view.phase === "unconfirmed"}<div
      role="status"
      class="tw:space-y-2 tw:text-muted-foreground"
    >
      <p class="tw:m-0">{text("unconfirmed")}</p>
      <Button
        variant="outline"
        onclick={() => {
          if (active && owner.current()) {
            owner.review();
            confirm = false;
          }
        }}>{text("reviewed")}</Button
      >
    </div>{/if}
</section>
<AlertDialog
  bind:open={confirm}
  title={text("revokeTitle")}
  description={text("revokeBody")}
  confirmLabel={`${text("revoke")} (${target.length})`}
  cancelLabel={text("cancel")}
  busy={$view.phase === "pending"}
  confirmDisabled={busy || !target.length || identity(target) !== signature}
  error={$view.phase === "error" ? text("revokeFailed") : ""}
  onconfirm={revoke}
/>
