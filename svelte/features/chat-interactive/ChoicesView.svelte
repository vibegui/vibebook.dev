<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Room, Message } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import type { Choices } from "./model";
  import { answerOf, canAnswer } from "./model";
  import Checkbox from "../../lib/ui/Checkbox.svelte";
  import RadioGroup from "../../lib/ui/RadioGroup.svelte";
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
    selected = $state<number[]>([]),
    radio = $state("");
  let previous = message.choices;
  $effect(() => {
    const source = message.choices;
    if (source !== previous)
      untrack(() => {
        previous = source;
        selected = [];
        radio = "";
      });
  });
  onDestroy(() => {
    active = false;
  });
  const answer = $derived(answerOf(room, message));
  const actionable = $derived(canAnswer(room, message) && !choices.closed);
  const picked = $derived(new Set(answer?.text.split(" · ") || []));
  function choose(index: number, checked = true) {
    const canonical =
      room.messages.find((m) => m.id === message.id) ||
      room.origins?.find((m) => m.id === message.id);
    if (
      !active ||
      !canonical ||
      canonical.choices !== message.choices ||
      !canAnswer(room, canonical) ||
      choices.closed
    )
      return;
    if (choices.multi)
      selected = checked
        ? [...selected.filter((i) => i !== index), index].sort((a, b) => a - b)
        : selected.filter((i) => i !== index);
    else selected = [index];
    const text =
      index === -1 && checked
        ? ""
        : selected
            .filter((i) => i >= 0)
            .map((i) => choices.options[i])
            .join(" · ");
    actions.draftReply({ messageId: message.id, thread: message.thread, text });
  }
</script>

<div
  data-native-choices
  data-vb-native
  class="tw:space-y-2 tw:font-sans tw:text-sm tw:text-foreground"
>
  {#if answer}<div class="tw:flex tw:flex-wrap tw:gap-2">
      {#each choices.options as option}<span
          class={picked.has(option)
            ? "tw:rounded-control tw:border tw:border-primary tw:bg-primary/10 tw:px-3 tw:py-2"
            : "tw:rounded-control tw:border tw:border-border tw:px-3 tw:py-2"}
          >{picked.has(option) ? "✓ " : ""}{option}</span
        >{/each}{#if !choices.options.some((option) => picked.has(option))}<span
          class="tw:rounded-control tw:border tw:border-primary tw:bg-primary/10 tw:px-3 tw:py-2"
          >✓ {vb.t("Outro")}</span
        >{/if}
    </div>
  {:else if actionable}{#if choices.multi}<div
        role="group"
        aria-label={vb.t("Escolha uma opção")}
        class="tw:grid tw:gap-2"
      >
        {#each [...choices.options, vb.t("Outro") + "…"] as option, index}{@const value =
            index === choices.options.length ? -1 : index}<label
            class="tw:flex tw:items-center tw:gap-2 tw:rounded-control tw:border tw:border-border tw:p-2"
            ><Checkbox
              checked={selected.includes(value)}
              onchange={(event) => {
                if (
                  event.currentTarget instanceof HTMLInputElement &&
                  event.currentTarget.isConnected
                )
                  choose(value, event.currentTarget.checked);
              }}
            /><span>{option}</span></label
          >{/each}
      </div>{:else}<RadioGroup
        label={vb.t("Escolha uma opção")}
        bind:value={radio}
        items={[
          ...choices.options.map((label, index) => ({
            label,
            value: String(index),
          })),
          { label: vb.t("Outro") + "…", value: "-1" },
        ]}
        onValueChange={(value, event) => {
          if (
            event.currentTarget instanceof HTMLInputElement &&
            event.currentTarget.isConnected
          )
            choose(Number(value));
        }}
      />{/if}<small class="tw:block tw:text-muted-foreground"
      >{vb.t("escolha e envie pela caixa de mensagem")}</small
    >
  {:else}<div class="tw:flex tw:flex-wrap tw:gap-2">
      {#each choices.options as option}<span
          class="tw:rounded-control tw:border tw:border-border tw:px-3 tw:py-2 tw:text-muted-foreground"
          >{option}</span
        >{/each}
    </div>
    <small class="tw:block tw:text-muted-foreground"
      >{choices.closed
        ? vb.t("foi pro terminal")
        : vb.t("esperando {who}", { who: vb.name(message.author) })}</small
    >{/if}
</div>
