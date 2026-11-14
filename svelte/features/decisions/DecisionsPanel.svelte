<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Decision, PanelProps } from "../../panels";
  import { createDecisionsSession, decisionRows } from "./model";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  import Badge from "../../lib/ui/Badge.svelte";
  import Card from "../../lib/ui/Card.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import EmptyState from "../../lib/components/EmptyState.svelte";
  let { room, vb, request }: Pick<PanelProps, "room" | "vb" | "request"> =
    $props();
  const session = untrack(() => createDecisionsSession(room.id));
  const view = session.state;
  const list = $derived(room.decisions || []);
  const rows = $derived(decisionRows(list));
  let deletion = $state<Decision | null>(null);
  let dialogOpen = $state(false);
  let deleteTrigger = $state<HTMLElement | null>(null);
  let panelRoot = $state<HTMLElement | null>(null);
  const issueText = (issue?: string) =>
    !issue
      ? ""
      : ["offline", "disconnected"].includes(issue)
        ? vb.t("sem conexão")
        : ["timeout", "unconfirmed"].includes(issue)
          ? vb.t(
              "Ainda não recebi a confirmação. Confira antes de tentar de novo.",
            )
          : issue;
  $effect(() => {
    session.sync(list);
    if (deletion && !list.some((d) => d.id === deletion!.id)) {
      dialogOpen = false;
      deletion = null;
    }
  });
  onDestroy(() => session.dispose());
</script>

<section
  bind:this={panelRoot}
  tabindex="-1"
  data-vb-native
  data-decisions-panel
  class="tw:space-y-4 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground"
>
  <div class="tw:flex tw:items-center tw:gap-2">
    <Heading>
      {vb.t("Decisões")}
    </Heading>
    <Badge>{list.length}</Badge>
  </div>
  {#each rows as decision (decision.id)}
    <article data-decision-id={decision.id}>
      <Card class="tw:flex tw:items-start tw:gap-3 tw:p-4">
        <div class="tw:min-w-0 tw:flex-1 tw:space-y-2">
          <p class="tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:leading-6">
            {decision.text}
          </p>
          <div
            class="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground"
          >
            <Badge
              variant={decision.kind === "approval" ? "success" : "neutral"}
              >{decision.kind === "approval"
                ? `✓ ${vb.t("aprovado")}`
                : vb.t("decidido")}</Badge
            >
            <span class="tw:break-words">{decision.who}</span><time
              datetime={new Date(decision.ts).toISOString()}
              >{vb.ago(decision.ts)}</time
            >
          </div>
          {#if $view.pending[decision.id]}<p
              role="status"
              class="tw:m-0 tw:text-xs tw:text-muted-foreground"
            >
              {vb.t("Aguardando confirmação…")}
            </p>{/if}
          {#if $view.issues[decision.id]}<p
              role="alert"
              class="tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-sm tw:text-destructive"
            >
              {issueText($view.issues[decision.id])}
            </p>{/if}
        </div>
        <IconButton
          data-ddel={decision.id}
          label={vb.t("Apagar registro")}
          icon="close"
          disabled={!!$view.pending[decision.id]}
          onclick={(event) => {
            deletion = decision;
            deleteTrigger = event.currentTarget;
            dialogOpen = true;
          }}
        />
      </Card>
    </article>
  {:else}
    <EmptyState
      icon="check"
      title={vb.t("Decisões")}
      description={vb.t(
        "O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda.",
      )}
    />
  {/each}
</section>
<AlertDialog
  bind:open={dialogOpen}
  title={vb.t("Apagar esse registro?")}
  description={deletion?.text}
  confirmLabel={vb.t("Apagar registro")}
  cancelLabel={vb.t("Cancelar")}
  busy={!!(deletion && $view.pending[deletion.id])}
  error={deletion ? issueText($view.issues[deletion.id]) : ""}
  onconfirm={() => {
    if (deletion) void session.remove(room.id, deletion.id, request);
  }}
  returnFocus={() => (deleteTrigger?.isConnected ? deleteTrigger : panelRoot)}
/>
