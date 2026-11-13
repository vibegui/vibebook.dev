<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Room, Message } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import type { Choices } from "./model";
  import { answerOf, canAnswer } from "./model";
  import { createInteractiveSession, idleState } from "./session";
  import Button from "../../lib/ui/Button.svelte";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  let {
    choices,
    message,
    room,
    actions,
    vb,
  }: {
    choices: Choices;
    message: Message;
    room: Room;
    actions: ChatActions;
    vb: ChatBridge;
  } = $props();
  let active = true,
    state = $state(idleState()),
    selection = $state<"Aprovar" | "Negar" | null>(null),
    focusTarget = $state<HTMLElement | null>(null),
    selectedIdentity = $state<string | undefined>();
  const identity = $derived(
    JSON.stringify([
      message.thread,
      message.author,
      message.kind,
      message.text,
      message.choices,
    ]),
  );
  const session = createInteractiveSession(
    room.id,
    message.id,
    (next) => (state = next),
    undefined,
    "permission",
  );
  const answer = $derived(answerOf(room, message));
  const approved = $derived(!!answer && /^\s*aprov/i.test(answer.text));
  const actionable = $derived(canAnswer(room, message) && !choices.closed);
  $effect(() => {
    const snapshot = room;
    untrack(() => session.sync(snapshot));
  });
  $effect(() => {
    if (
      !actionable ||
      state.phase === "unconfirmed" ||
      (selectedIdentity !== undefined && selectedIdentity !== identity)
    )
      selection = null;
  });
  onDestroy(() => {
    active = false;
    session.dispose();
  });
  function select(value: "Aprovar" | "Negar", event: MouseEvent) {
    if (
      !active ||
      !actionable ||
      !(event.currentTarget instanceof HTMLElement) ||
      !event.currentTarget.isConnected
    )
      return;
    focusTarget = event.currentTarget as HTMLElement;
    selectedIdentity = identity;
    selection = value;
  }
  function confirm() {
    if (active && actionable && selection && selectedIdentity === identity)
      void session.reply(selection, actions.request);
  }
</script>

<div
  data-native-permission
  data-vb-native
  class="tw:space-y-2 tw:font-sans tw:text-sm tw:text-foreground"
>
  {#if answer}<p
      role="status"
      class="tw:m-0 tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3"
    >
      {approved
        ? "✓ " + vb.t("Aprovado por {who}", { who: vb.name(answer.author) })
        : "✕ " + vb.t("Negado por {who}", { who: vb.name(answer.author) })} · {vb.hhmm(
        answer.ts,
      )}
    </p>
  {:else if choices.closed}<p class="tw:m-0 tw:text-muted-foreground">
      {vb.t("foi pro terminal")}
    </p>
  {:else if actionable}<div class="tw:flex tw:flex-wrap tw:gap-2">
      <Button
        data-native-permission-value="Aprovar"
        disabled={state.phase === "pending" || state.phase === "unconfirmed"}
        onclick={(event) => select("Aprovar", event)}>{vb.t("Aprovar")}</Button
      ><Button
        data-native-permission-value="Negar"
        variant="outline"
        disabled={state.phase === "pending" || state.phase === "unconfirmed"}
        onclick={(event) => select("Negar", event)}>{vb.t("Negar")}</Button
      >
    </div>
  {:else}<div class="tw:flex tw:flex-wrap tw:gap-2">
      {#each choices.options as option}<span
          class="tw:rounded-control tw:border tw:border-border tw:px-3 tw:py-2"
          >{option}</span
        >{/each}
    </div>
    <small class="tw:text-muted-foreground"
      >{vb.t("esperando {who}", { who: vb.name(message.author) })}</small
    >{/if}
  {#if state.phase !== "idle"}<p
      role={state.phase === "error" ? "alert" : "status"}
      class="tw:m-0 tw:text-xs tw:text-muted-foreground"
    >
      {state.phase === "pending"
        ? vb.t("Enviando…")
        : state.phase === "unconfirmed"
          ? vb.t(
              "Ainda sem confirmação. Confira a sala antes de enviar novamente.",
            )
          : state.error}
    </p>{/if}
</div>
<AlertDialog
  open={selection !== null && actionable && selectedIdentity === identity}
  title={selection === "Aprovar"
    ? vb.t("Aprovar este pedido?")
    : vb.t("Negar este pedido?")}
  confirmLabel={vb.t("Confirmar")}
  cancelLabel={vb.t("Cancelar")}
  busy={state.phase === "pending"}
  error={state.phase === "error" ? state.error : ""}
  onconfirm={confirm}
  onOpenChange={(open) => {
    if (!open) selection = null;
  }}
  returnFocus={() => focusTarget}
/>
