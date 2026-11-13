<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Card, CardEl } from "../../../shared/card";
  import type { Room, Message } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import Button from "../../lib/ui/Button.svelte";
  import CardBox from "../../lib/ui/Card.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  import CardChart from "./CardChart.svelte";
  import CardTable from "./CardTable.svelte";
  import { answerOf, canAnswer, inlineCardNodes } from "./model";
  import { createInteractiveSession, idleState } from "./session";
  let {
    card,
    message,
    room,
    actions,
    vb,
  }: {
    card: Card;
    message: Message;
    room: Room;
    actions: ChatActions;
    vb: ChatBridge;
  } = $props();
  let active = true,
    state = $state(idleState()),
    expanded = $state<string | null>(null);
  const inline = $derived(inlineCardNodes(card));
  let previousCard = card;
  $effect(() => {
    const current = card;
    if (current !== previousCard)
      untrack(() => {
        previousCard = current;
        expanded = null;
      });
  });
  const session = createInteractiveSession(
    room.id,
    message.id,
    (next) => (state = next),
  );
  $effect(() => {
    const snapshot = room;
    untrack(() => session.sync(snapshot));
  });
  onDestroy(() => {
    active = false;
    session.dispose();
  });
  const root = $derived(card.elements[card.root]);
  const title = $derived(
    root.type === "Card" ? root.props.title || vb.t("Tabela") : vb.t("Tabela"),
  );
  const answer = $derived(answerOf(room, message));
  const actionable = $derived(canAnswer(room, message));
  const busy = $derived(
    state.phase === "pending" || state.phase === "unconfirmed",
  );
  function reply(value: string, event: MouseEvent) {
    if (
      active &&
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.isConnected &&
      actionable
    )
      void session.reply(value, actions.request);
  }
  function navigate(url: string, event: MouseEvent) {
    if (
      !active ||
      !(event.currentTarget instanceof HTMLElement) ||
      !event.currentTarget.isConnected
    )
      return;
    const m = /^#m(\d+)$/.exec(url);
    if (m) {
      const id = Number(m[1]);
      if (Number.isSafeInteger(id)) actions.navigate(id);
    } else if (url.startsWith("#app:")) {
      const [connection, tool] = url.slice(5).split("/");
      actions.openApp?.({ connection, tool });
    } else if (url.startsWith("#e"))
      actions.navigateRich?.({ kind: "thread", id: url.slice(2) });
    else if (url.startsWith("#doc"))
      actions.navigateRich?.({ kind: "document", id: url.split(":")[1] });
  }
</script>

{#snippet draw(element: CardEl, id = card.root)}
  {#if element.type === "Card"}<CardBox
      title={element.props.title}
      description={element.props.title ? element.props.subtitle : undefined}
      class="tw:shadow-none tw:[&_h2]:whitespace-pre-wrap tw:[&_p]:whitespace-pre-wrap"
      >{#each element.children as id}{@render draw(
          card.elements[id],
          id,
        )}{/each}</CardBox
    >
  {:else if element.type === "Section"}<section class="tw:space-y-2">
      {#if element.props.title}<h5
          class="tw:m-0 tw:whitespace-pre-wrap tw:font-sans tw:text-sm tw:font-semibold tw:tracking-normal tw:[font-variation-settings:normal]"
        >
          {element.props.title}
        </h5>{/if}{#each element.children as id}{@render draw(
          card.elements[id],
        )}{/each}
    </section>
  {:else if element.type === "Text"}<p
      class={[
        "tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:font-sans tw:leading-6",
        element.props.style === "bold"
          ? "tw:font-semibold"
          : element.props.style === "muted"
            ? "tw:text-muted-foreground"
            : element.props.style === "code"
              ? "tw:rounded-control tw:bg-muted tw:p-2 tw:font-mono tw:text-xs"
              : "",
      ]}
    >
      {element.props.content}
    </p>
  {:else if element.type === "Fields"}<dl
      class="tw:m-0 tw:grid tw:grid-cols-1 tw:gap-3 tw:sm:grid-cols-2"
    >
      {#each element.children as id}{@render draw(card.elements[id])}{/each}
    </dl>
  {:else if element.type === "Field"}<div class="tw:min-w-0">
      <dt class="tw:whitespace-pre-wrap tw:text-xs tw:text-muted-foreground">
        {element.props.label}
      </dt>
      <dd class="tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:font-medium">
        {element.props.value}
      </dd>
    </div>
  {:else if element.type === "Table"}<CardTable
      headers={element.props.headers}
      rows={element.props.rows}
      {title}
      {vb}
      inline={inline.has(id)}
      open={expanded === id}
      onOpenChange={(open) => (expanded = open ? id : null)}
    />
  {:else if element.type === "Chart"}<CardChart
      chart={element.props}
      {vb}
      inline={inline.has(id)}
      open={expanded === id}
      onOpenChange={(open) => (expanded = open ? id : null)}
    />
  {:else if element.type === "Divider"}<hr class="tw:my-3 tw:border-border" />
  {:else if element.type === "Image"}<img
      src={element.props.url}
      alt={element.props.alt || ""}
      loading="lazy"
      class="tw:block tw:max-w-full tw:rounded-control tw:object-contain"
    />
  {:else if element.type === "Actions"}<div
      class="tw:flex tw:flex-wrap tw:gap-2"
    >
      {#each element.children as id}{@render draw(card.elements[id])}{/each}
    </div>
  {:else if element.type === "Button"}{@const value =
      element.props.value || element.props.label}{#if actionable}<Button
        data-native-card-answer={value}
        class="tw:h-auto tw:min-h-8 tw:whitespace-pre-wrap tw:text-left"
        size="sm"
        variant={element.props.style === "danger"
          ? "destructive"
          : element.props.style === "primary"
            ? "primary"
            : "outline"}
        disabled={busy}
        onclick={(event) => reply(value, event)}>{element.props.label}</Button
      >{:else}<span
        data-native-card-picked={answer?.text === value ? value : undefined}
        class={answer?.text === value
          ? "tw:inline-flex tw:items-center tw:gap-1 tw:whitespace-pre-wrap tw:rounded-button tw:border tw:border-primary tw:bg-primary/10 tw:px-3 tw:py-1.5 tw:text-sm"
          : "tw:inline-flex tw:items-center tw:whitespace-pre-wrap tw:rounded-button tw:border tw:border-border tw:px-3 tw:py-1.5 tw:text-sm tw:text-muted-foreground"}
        >{#if answer?.text === value}<Icon name="check" />{/if}{element.props
          .label}</span
      >{/if}
  {:else if element.type === "LinkButton"}{#if element.props.url.startsWith("#")}<Button
        class="tw:h-auto tw:min-h-8 tw:whitespace-pre-wrap tw:text-left"
        size="sm"
        variant="link"
        onclick={(event) => navigate(element.props.url, event)}
        >{element.props.label}<Icon name="arrowRight" /></Button
      >{:else}<a
        href={element.props.url}
        target="_blank"
        rel="noopener noreferrer"
        class="tw:inline-flex tw:items-center tw:gap-1 tw:rounded-button tw:px-3 tw:py-1.5 tw:text-sm tw:text-link tw:hover:underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
        >{element.props.label}<Icon name="external" /></a
      >{/if}
  {/if}
{/snippet}
<div
  data-native-card
  data-vb-native
  class="tw:space-y-2 tw:font-sans tw:text-sm tw:text-foreground"
>
  {@render draw(card.elements[card.root])}
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
