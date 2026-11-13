<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Room, Message, Poll } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import { pollView, canClosePoll, pollIdentity } from "./model";
  import { createInteractiveSession, idleState } from "./session";
  import Button from "../../lib/ui/Button.svelte";
  import Progress from "../../lib/ui/Progress.svelte";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  let {
    poll,
    message,
    room,
    actions,
    vb,
  }: {
    poll: Poll;
    message: Message;
    room: Room;
    actions: ChatActions;
    vb: ChatBridge;
  } = $props();
  let active = true,
    state = $state(idleState()),
    closing = $state(false),
    focusTarget = $state<HTMLElement | null>(null),
    selectedIdentity = $state<string | undefined>();
  const identity = $derived(
    JSON.stringify([
      message.id,
      message.thread,
      message.poll,
      pollIdentity(poll),
    ]),
  );
  const session = createInteractiveSession(
    room.id,
    message.id,
    (next) => (state = next),
    undefined,
    "poll",
  );
  const view = $derived(pollView(poll, room.me));
  const canClose = $derived(canClosePoll(room, poll));
  const canVote = $derived(!poll.closed && room.members.includes(room.me));
  $effect(() => {
    const snapshot = room;
    untrack(() => session.sync(snapshot));
  });
  $effect(() => {
    if (
      !canClose ||
      state.phase === "unconfirmed" ||
      (selectedIdentity !== undefined && selectedIdentity !== identity)
    )
      closing = false;
  });
  onDestroy(() => {
    active = false;
    session.dispose();
  });
  function vote(index: number, event: MouseEvent) {
    if (
      active &&
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.isConnected &&
      canVote
    )
      void session.vote(index, actions.request);
  }
  function close() {
    if (active && canClose && closing && selectedIdentity === identity)
      void session.close(actions.request);
  }
</script>

<section
  data-native-poll={poll.id}
  data-vb-native
  class="tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-card-foreground"
>
  <h4
    class="tw:m-0 tw:flex tw:items-start tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:tracking-normal tw:[font-variation-settings:normal]"
  >
    <Icon name="chart" />{poll.question}
  </h4>
  {#each view.rows as row}<div class="tw:space-y-1">
      <Button
        class="tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:text-left"
        data-native-vote={row.index}
        variant={row.mine ? "secondary" : "outline"}
        disabled={!canVote ||
          state.phase === "pending" ||
          state.phase === "unconfirmed"}
        aria-pressed={row.mine}
        onclick={(event) => vote(row.index, event)}
        >{#if row.winner}<Icon name="trophy" />{:else if row.mine}<Icon
            name="check"
          />{/if}<span class="tw:min-w-0 tw:flex-1 tw:break-words"
          >{row.label}</span
        ><span class="tw:flex tw:-space-x-2"
          >{#each row.voters as email}<span title={vb.name(email)}
              ><Avatar
                name={vb.name(email)}
                src={vb.avatarUrl?.(email)}
                class="tw:size-6 tw:text-[10px]"
              /></span
            >{/each}</span
        ><span class="tw:shrink-0 tw:text-xs"
          >{row.count ? `${row.percent}%` : ""}</span
        ></Button
      ><Progress
        value={row.percent}
        label={`${row.label}: ${row.count} (${row.percent}%)`}
      />
    </div>{/each}
  <p
    class="tw:m-0 tw:flex tw:flex-wrap tw:items-center tw:gap-1 tw:text-xs tw:text-muted-foreground"
  >
    {view.voters === 1
      ? vb.t("1 pessoa votou")
      : vb.t("{n} pessoas votaram", { n: view.voters })} · {poll.multi
      ? vb.t("pode escolher várias")
      : vb.t("escolha uma")}{#if poll.closed}
      · {vb.t("encerrada")}{:else if canClose}
      · <Button
        size="sm"
        variant="link"
        data-native-poll-close
        disabled={state.phase === "pending" || state.phase === "unconfirmed"}
        onclick={(event) => {
          if (active && canClose && event.currentTarget.isConnected) {
            focusTarget = event.currentTarget;
            selectedIdentity = identity;
            closing = true;
          }
        }}>{vb.t("encerrar")}</Button
      >{/if}
  </p>
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
</section>
<AlertDialog
  open={closing && canClose && selectedIdentity === identity}
  title={vb.t("Encerrar a votação?")}
  confirmLabel={vb.t("Confirmar")}
  cancelLabel={vb.t("Cancelar")}
  busy={state.phase === "pending"}
  error={state.phase === "error" ? state.error : ""}
  onconfirm={close}
  onOpenChange={(open) => {
    if (!open) closing = false;
  }}
  returnFocus={() => focusTarget}
/>
