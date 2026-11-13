<script lang="ts">
  import { onDestroy } from "svelte";
  import type { ChatMessage, ChatActions, ChatBridge } from "../../chatTypes";
  import Button from "../../lib/ui/Button.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import { copyChatText } from "./clipboard";
  let {
    message,
    roomId,
    actions,
    vb,
    showLink = true,
  }: {
    message: ChatMessage;
    roomId: string;
    actions: ChatActions;
    vb: ChatBridge;
    showLink?: boolean;
  } = $props();
  let issue = $state<"empty" | "clipboard" | null>(null),
    copied = $state(false),
    retryLink = $state(false);
  let active = true,
    sequence = 0;
  onDestroy(() => {
    active = false;
    sequence++;
  });
  export async function copy(link = false) {
    if (!active) return;
    retryLink = link;
    const token = ++sequence;
    issue = null;
    copied = false;
    const text = link
      ? `${location.origin}/b/${roomId}${message.thread && message.thread !== "main" ? `?t=${encodeURIComponent(message.thread)}` : ""}#m${message.id}`
      : message.text || message.files?.map((f) => f.name).join("\n") || "";
    if (!text) {
      issue = "empty";
      return;
    }
    try {
      await copyChatText(text);
      if (active && token === sequence) {
        copied = true;
        navigator.vibrate?.(15);
      }
    } catch {
      if (active && token === sequence) issue = "clipboard";
    }
  }
</script>

<div data-message-actions class="tw:flex tw:flex-wrap tw:items-center tw:gap-1">
  <IconButton
    icon="copy"
    label={vb.t("Copiar o texto desta mensagem")}
    data-native-copy={message.id}
    onclick={() => {
      void copy();
    }}
  />
  {#if showLink}<IconButton
      icon="link"
      label={vb.t("Copiar o link desta mensagem")}
      data-native-copylink={message.id}
      onclick={() => {
        void copy(true);
      }}
    />{/if}
  <IconButton
    icon="reply"
    label={vb.t("Responder a esta mensagem")}
    data-native-reply={message.id}
    onclick={() => {
      if (active) actions.reply(message.id);
    }}
  />
  {#if copied}<span role="status" class="tw:text-xs tw:text-muted-foreground"
      >{vb.t("Copiado")}</span
    >{/if}
  {#if issue}<span role="alert" class="tw:text-xs tw:text-destructive"
      >{vb.t(
        issue === "empty"
          ? "Essa mensagem não tem texto pra copiar."
          : "O navegador pediu um toque pra copiar.",
      )}</span
    >{#if issue === "clipboard"}<Button
        variant="outline"
        size="sm"
        onclick={() => {
          void copy(retryLink);
        }}>{vb.t("Copiar")}</Button
      >{/if}{/if}
</div>
