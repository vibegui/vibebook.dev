<script lang="ts">
  import { onDestroy } from "svelte";
  import RichContent from "./features/rich-text/RichContent.svelte";
  import type { RichMode } from "./features/rich-text/types";
  import type { Room } from "../shared/room";
  import type {
    ChatActions,
    ChatBridge,
    ChatMessage,
    LegacyChatIntegrations,
  } from "./chatTypes";
  import {
    agentMark,
    continues,
    issueParts,
    messageKind,
    messageSnippet,
    reminderParts,
    type MessageFooter as Footer,
  } from "./features/chat/model";
  import Avatar from "./lib/ui/Avatar.svelte";
  import Badge from "./lib/ui/Badge.svelte";
  import Button from "./lib/ui/Button.svelte";
  import MessageActions from "./features/chat/MessageActions.svelte";
  import MessageFooter from "./features/chat/MessageFooter.svelte";
  import Attachments from "./features/chat/Attachments.svelte";
  import LegacyChatContent from "./integrations/LegacyChatContent.svelte";
  import { swipeMessage } from "./features/chat/swipe";
  let {
    message: m,
    previous,
    origin = false,
    typing,
    vb,
    room,
    legacy,
    actions,
    footer,
  }: {
    message: ChatMessage;
    previous?: ChatMessage;
    origin?: boolean;
    typing?: string;
    vb: ChatBridge;
    room: Room;
    legacy: LegacyChatIntegrations;
    actions: ChatActions;
    footer?: Footer;
  } = $props();
  let actionController = $state<
    { copy: (link?: boolean) => Promise<void> } | undefined
  >();
  let active = true;
  onDestroy(() => {
    active = false;
  });
  const waiting = $derived(vb.waiting(m.id));
  let attention = $state(false),
    flash = $state(false);
  $effect(() => {
    if (!waiting) {
      attention = false;
      return;
    }
    attention = true;
    const timer = setTimeout(() => {
      attention = false;
    }, 1800);
    return () => clearTimeout(timer);
  });
  function highlight(node: HTMLElement) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const show = () => {
      if (timer) clearTimeout(timer);
      flash = true;
      timer = setTimeout(() => {
        flash = false;
      }, 1800);
    };
    node.addEventListener("vb:message-highlight", show);
    return {
      destroy() {
        node.removeEventListener("vb:message-highlight", show);
        if (timer) clearTimeout(timer);
      },
    };
  }
  const continuous = $derived(continues(previous, m));
  const kind = $derived(messageKind(m));
  const quote = $derived(
    m.reply_to
      ? [...room.messages, ...(room.origins || [])].find(
          (x) => x.id === m.reply_to,
        )
      : undefined,
  );
  const timestamp = $derived(
    vb.dateTime?.(m.ts) ?? new Date(m.ts).toLocaleString(),
  );
  const group = $derived(m.group || [m]);
  const reminder = $derived(reminderParts(m));
  const author = (message: ChatMessage) =>
    message.author === "ai"
      ? "@vibe"
      : message.kind === "agent"
        ? vb.t("{via} de {who}", {
            via: message.via || "agent",
            who: vb.name(message.author),
          })
        : vb.name(message.author);
  const day = (ts: number) =>
    new Date(ts).toDateString() === new Date().toDateString()
      ? vb.hhmm(ts)
      : `${new Date(ts).toLocaleDateString(vb.locale, { day: "numeric", month: "short" })} ${vb.hhmm(ts)}`;
</script>

{#snippet rich(text: string, mode: RichMode = "markdown")}<RichContent
    {text}
    {mode}
    {room}
    {actions}
    names={vb.knownNames}
    pageUrl={vb.pageUrl}
  />{/snippet}
<article
  id={origin ? undefined : `m${m.id}`}
  data-chat-message={m.id}
  data-message-kind={kind}
  data-waiting={waiting}
  use:highlight
  data-vb-native
  use:swipeMessage={{
    enabled: !origin,
    reply: () => {
      if (active) actions.reply(m.id);
    },
    copy: () => {
      void actionController?.copy();
    },
  }}
  class={[
    continuous
      ? "tw:group tw:relative tw:rounded-control tw:px-3 tw:py-1 tw:font-sans tw:text-sm tw:text-foreground"
      : "tw:group tw:relative tw:rounded-control tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-foreground",
    waiting ? "tw:border-l-2 tw:border-warning tw:bg-warning/10" : "",
    attention ? "tw:animate-pulse tw:motion-reduce:animate-none" : "",
    flash ? "tw:ring-2 tw:ring-ring tw:bg-accent" : "",
  ]}
>
  <div class="tw:flex tw:items-start tw:gap-3">
    <div class="tw:w-8 tw:shrink-0">
      {#if !continuous}{#if m.author === "ai"}<span
            aria-hidden="true"
            class="tw:inline-grid tw:size-8 tw:place-items-center tw:rounded-full tw:bg-primary/10 tw:text-primary"
            >✦</span
          >{:else}<Avatar
            name={author(m)}
            src={vb.avatarUrl?.(m.author)}
          />{/if}{#if m.kind === "agent"}<span
            aria-hidden="true"
            class="tw:block tw:text-center tw:text-xs">{agentMark(m.via)}</span
          >{/if}{:else}<time
          title={timestamp}
          class="tw:text-xs tw:text-muted-foreground">{vb.hhmm(m.ts)}</time
        >{/if}
    </div>
    <div data-message-body class="tw:min-w-0 tw:flex-1 tw:space-y-2">
      {#if !continuous}<div
          class="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground"
        >
          <span class="tw:font-semibold tw:text-foreground">{author(m)}</span
          >{#if m.kind === "agent"}<Badge
              title={vb.t("Escrito pelo agent dessa pessoa, em nome dela")}
              >agent</Badge
            >{/if}{#if m.tag === "done"}<Badge variant="success"
              >✓ {vb.t("entregue")}</Badge
            >{/if}<time title={timestamp}>{vb.ago(m.ts)} · {vb.hhmm(m.ts)}</time
          >
        </div>{/if}
      {#if m.reply_to}<Button
          variant="ghost"
          size="sm"
          class="tw:h-auto tw:max-w-full tw:justify-start tw:whitespace-normal tw:border-l-2 tw:border-border tw:text-left tw:text-muted-foreground"
          data-native-quote={m.reply_to}
          title={vb.t("Ver a mensagem respondida")}
          onclick={() => {
            if (active) actions.navigate(m.reply_to!, quote?.thread);
          }}
          ><span aria-hidden="true">↩</span>{quote
            ? `${author(quote)} · ${messageSnippet(quote)}`
            : vb.t("mensagem anterior")}</Button
        >{/if}
      {#if kind === "regular"}
        {#if !m.text && (typing || (m.author === "ai" && !m.poll))}<p
            data-message-typing
            role="status"
            class="tw:m-0 tw:text-muted-foreground"
          >
            {typing
              ? vb.typingNote?.(m.id) ||
                vb.t("pensando ({mode})", {
                  mode: vb.typingLabel?.(typing) ?? typing,
                })
              : vb.t("pensando…")}{typing ? "…" : ""}
          </p>
        {:else if m.text}{@render rich(
            m.text,
            m.author === "ai" || m.kind === "agent" ? "markdown" : "human",
          )}{/if}
        <Attachments
          roomId={room.id}
          messageThread={m.thread}
          files={m.files}
          {actions}
          {vb}
        />
        {#if m.card || m.choices || m.poll}<LegacyChatContent
            html={legacy.interactiveBody(m)}
          />{/if}
      {:else if kind === "reminder"}<details class="tw:space-y-2">
          <summary
            class="tw:cursor-pointer tw:rounded-control tw:leading-6 tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
            >⏰ {#if reminder.name}<b>{reminder.name}</b>
            {/if}{reminder.head} · {reminder.runs.length > 1
              ? `${vb.t("rodou {n}×", { n: reminder.runs.length })} · `
              : ""}<time title={timestamp}>{day(m.ts)}</time></summary
          >{#if reminder.body}{@render rich(
              reminder.body,
            )}{/if}{#if reminder.runs.length > 1}<p
              class="tw:m-0 tw:text-xs tw:text-muted-foreground"
            >
              {reminder.runs.map(day).join(" · ")}
            </p>{/if}
        </details>
      {:else if kind === "issue"}<details class="tw:space-y-3">
          <summary
            class="tw:cursor-pointer tw:rounded-control tw:leading-6 tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
            >⚠ <b
              >{group.length > 1
                ? vb.t("{n} issues dos agents", { n: group.length })
                : vb.t("Issue de um agent")}</b
            >
            {issueParts(m).body.replace(/\s+/g, " ").slice(0, 140)} ·
            <time title={timestamp}>{day(m.ts)}</time></summary
          >{#each [...group].reverse() as issue (issue.id)}<div
              class="tw:space-y-2 tw:border-l-2 tw:border-border tw:pl-3"
            >
              <time class="tw:text-xs tw:text-muted-foreground"
                >{day(issue.ts)}</time
              >{@render rich(issueParts(issue).head)}
              <p class="tw:m-0 tw:whitespace-pre-wrap tw:break-words">
                {issueParts(issue).body}
              </p>
              <MessageActions
                message={issue}
                showLink={false}
                roomId={room.id}
                {actions}
                {vb}
              />
            </div>{/each}
        </details>
      {:else}<details class="tw:space-y-2">
          <summary
            class="tw:cursor-pointer tw:rounded-control tw:leading-6 tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
            >✦ {@render rich(
              m.text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim(),
              "inline",
            )} · <time title={timestamp}>{day(m.ts)}</time></summary
          >{@render rich(m.text)}
        </details>{/if}
      {#if !origin && kind !== "issue" && kind !== "notice"}{#each kind === "reminder" ? group : [m] as source (source.id)}<LegacyChatContent
            html={legacy.threadCards(source.id)}
          />{/each}{/if}
      {#if footer && !origin}<MessageFooter {footer} {vb} />{/if}
    </div>
  </div>
  <div
    class="tw:mt-1 tw:flex tw:justify-end tw:md:opacity-0 tw:md:group-hover:opacity-100 tw:md:group-focus-within:opacity-100"
  >
    <MessageActions
      bind:this={actionController}
      message={m}
      roomId={room.id}
      {actions}
      {vb}
    />
  </div>
</article>
