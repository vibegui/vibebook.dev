<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { PanelProps, Reminder } from "../../panels";
  import { createRoomApi } from "../../transport";
  import { createRemindersSession, type ReminderIssue } from "./session";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Card from "../../lib/ui/Card.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import Switch from "../../lib/ui/Switch.svelte";
  import Textarea from "../../lib/ui/Textarea.svelte";
  let { room, vb, request }: Pick<PanelProps, "room" | "vb" | "request"> =
    $props();
  const session = untrack(() => createRemindersSession(room.id));
  const view = session.state;
  let opened = $state<string[]>([]),
    deletion = $state<Reminder | null>(null),
    dialogOpen = $state(false);
  let panelRoot = $state<HTMLElement | null>(null),
    deleteTrigger = $state<HTMLElement | null>(null),
    newTrigger = $state<HTMLButtonElement | null>(null),
    textInput = $state<HTMLTextAreaElement | null>(null);
  const list = $derived(room.reminders || []);
  const locale = $derived(vb.locale || "pt-BR");
  const ids = $props.id();
  const when = (ms: number) =>
    new Date(ms).toLocaleString(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  const issueText = (issue?: ReminderIssue | null) =>
    !issue
      ? ""
      : issue.detail === "upload-in-progress"
        ? vb.t(
            "Um envio deste lembrete ainda está em andamento. Aguarde antes de salvar novamente.",
          )
        : issue.detail === "reminder-processing-unconfirmed"
          ? vb.t(
              "Não recebi a confirmação do agendamento. Confira antes de tentar de novo.",
            )
          : ["offline", "disconnected"].includes(issue.detail)
            ? vb.t("sem conexão")
            : issue.kind === "unconfirmed" || issue.detail === "timeout"
              ? vb.t(
                  "Ainda não recebi a confirmação. Confira antes de tentar de novo.",
                )
              : issue.detail;
  $effect(() => {
    session.sync(list);
  });
  onDestroy(() => session.dispose());
  function open(draft: { name: string; text: string; fixed?: boolean }) {
    session.open(draft);
    queueMicrotask(() => textInput?.focus());
  }
  function cancel() {
    session.cancel();
    queueMicrotask(() => newTrigger?.focus());
  }
  function disclose(id: string) {
    opened = opened.includes(id)
      ? opened.filter((value) => value !== id)
      : [...opened, id];
  }
  async function remove() {
    const reminder = deletion;
    if (!reminder) return;
    const confirmed = await session.mutate(reminder.id, "delete", request);
    if (confirmed && deletion?.id === reminder.id) dialogOpen = false;
  }
</script>

<section
  bind:this={panelRoot}
  tabindex="-1"
  data-vb-native
  data-reminders-panel
  class="tw:space-y-4 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground"
>
  <div class="tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3">
    <div class="tw:min-w-0 tw:flex-1 tw:space-y-1">
      <h2 class="tw:m-0 tw:text-base tw:font-semibold tw:leading-6">
        {vb.t("Lembretes")}
      </h2>
      <p
        class="tw:m-0 tw:max-w-prose tw:text-sm tw:leading-5 tw:text-muted-foreground"
      >
        {vb.t(
          "Quando o lembrete roda, o @vibe publica o texto aqui para seu agent.",
        )}
      </p>
    </div>
    {#if !$view.draft}<Button
        id="remNew"
        bind:ref={newTrigger}
        onclick={() => open({ name: "", text: "" })}
        ><Icon name="plus" />{vb.t("Novo lembrete")}</Button
      >{/if}
  </div>
  {#if $view.draft}
    <Card>
      <form
        id="remForm"
        class="tw:space-y-4"
        onsubmit={(event) => {
          event.preventDefault();
          void session.save(createRoomApi(room.id).uploadFile);
        }}
      >
        <div class="tw:space-y-2">
          <Label for={`${ids}-name`}>{vb.t("Nome")}</Label><Input
            id={`${ids}-name`}
            name="name"
            maxlength={60}
            required
            readonly={$view.draft.fixed}
            value={$view.draft.name}
            oninput={(event) =>
              session.edit({ name: event.currentTarget.value })}
            placeholder={vb.t("nome, ex.: relatorio-diario")}
          />
        </div>
        <div class="tw:space-y-2">
          <Label for={`${ids}-text`}>{vb.t("Texto do lembrete")}</Label
          ><Textarea
            id={`${ids}-text`}
            bind:ref={textInput}
            name="text"
            required
            value={$view.draft.text}
            oninput={(event) =>
              session.edit({ text: event.currentTarget.value })}
            placeholder={vb.t(
              "Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou.",
            )}
          />
        </div>
        {#if $view.issue}<p
            id="remErr"
            role="alert"
            class="tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive"
          >
            {issueText($view.issue)}
          </p>{/if}
        <div class="tw:flex tw:flex-wrap tw:justify-end tw:gap-2">
          <Button id="remCancel" variant="outline" onclick={cancel}
            >{vb.t("Cancelar")}</Button
          ><Button id="remSave" type="submit" loading={$view.saving}
            >{vb.t("Salvar")}</Button
          >
        </div>
      </form>
    </Card>
  {/if}
  <div class="tw:space-y-3">
    {#each list as reminder (reminder.id)}
      {@const pending = $view.pending[reminder.id]}
      {@const issue = $view.rowIssues[reminder.id]}
      <Card class="tw:space-y-3 tw:p-4">
        <div class="tw:flex tw:items-start tw:gap-2">
          <button
            type="button"
            data-rem-open={reminder.id}
            aria-expanded={opened.includes(reminder.id)}
            aria-controls={`${ids}-content-${reminder.id}`}
            onclick={() => disclose(reminder.id)}
            class="tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-1 tw:text-left tw:font-sans tw:text-sm tw:text-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring"
          >
            <Icon
              name={opened.includes(reminder.id)
                ? "chevronDown"
                : "chevronRight"}
              class="tw:mt-0.5"
            />
            <span class="tw:min-w-0 tw:space-y-1"
              ><span class="tw:block tw:break-words tw:font-medium"
                >{reminder.name ? `${reminder.name}.md` : reminder.text}</span
              ><span
                class="tw:block tw:text-xs tw:leading-5 tw:text-muted-foreground"
                >{#if !reminder.error}{reminder.every ||
                    reminder.cron ||
                    ""}{reminder.enabled && reminder.next_at
                    ? ` · ${vb.t("próximo {when}", { when: when(reminder.next_at) })}`
                    : ""} ·
                {/if}{vb.t("de {who}", { who: vb.name(reminder.owner) })}</span
              ></span
            >
          </button>
        </div>
        {#if reminder.error}<p
            role="status"
            class="tw:m-0 tw:flex tw:items-start tw:gap-2 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive"
          >
            <Icon name="warning" />{reminder.error}
          </p>{/if}
        <pre
          hidden={!opened.includes(reminder.id)}
          id={`${ids}-content-${reminder.id}`}
          class="tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs tw:leading-5">{reminder.text}</pre>
        <div
          class="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2"
        >
          <Label class="tw:flex tw:items-center tw:gap-2">
            <Switch
              controlled
              data-rem-on={reminder.id}
              checked={reminder.enabled}
              disabled={!!reminder.error || !!pending}
              onCheckedChange={(desired) => {
                void session.mutate(reminder.id, "enable", request, desired);
              }}
            />{vb.t("Ligado")}
          </Label>
          <div class="tw:flex tw:flex-wrap tw:gap-2">
            {#if reminder.name}<Button
                variant="ghost"
                size="sm"
                data-rem-edit={reminder.id}
                onclick={() =>
                  open({
                    name: reminder.name!,
                    text: reminder.text,
                    fixed: true,
                  })}>{vb.t("Editar")}</Button
              >{/if}<Button
              variant="ghost"
              size="sm"
              data-rem-del={reminder.id}
              disabled={!!pending}
              onclick={(event) => {
                deletion = reminder;
                deleteTrigger = event.currentTarget;
                dialogOpen = true;
              }}>{vb.t("Apagar lembrete")}</Button
            >
          </div>
        </div>
        {#if pending}<p
            role="status"
            class="tw:m-0 tw:text-xs tw:text-muted-foreground"
          >
            {vb.t("Aguardando confirmação…")}
          </p>{/if}
        {#if issue}<p
            role="alert"
            class="tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive"
          >
            {issueText(issue)}
          </p>{/if}
      </Card>
    {:else}{#if !$view.draft}<p
          class="tw:m-0 tw:rounded-surface tw:border tw:border-dashed tw:border-border tw:p-6 tw:text-sm tw:leading-6 tw:text-muted-foreground"
        >
          {vb.t(
            "Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.",
          )}
        </p>{/if}{/each}
  </div>
</section>
<AlertDialog
  bind:open={dialogOpen}
  title={vb.t("Apagar este lembrete?")}
  description={deletion?.name ? `${deletion.name}.md` : deletion?.text}
  confirmLabel={vb.t("Apagar lembrete")}
  cancelLabel={vb.t("Cancelar")}
  busy={!!(deletion && $view.pending[deletion.id])}
  error={deletion ? issueText($view.rowIssues[deletion.id]) : ""}
  onconfirm={() => {
    void remove();
  }}
  returnFocus={() =>
    deleteTrigger?.isConnected ? deleteTrigger : newTrigger || panelRoot}
/>
