<script lang="ts">
  import { onMount, untrack } from "svelte";
  import type { Attachment } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import { createAppConsent } from "../apps/consent";
  import Button from "../../lib/ui/Button.svelte";
  let {
    url,
    file,
    messageThread,
    actions,
    vb,
  }: {
    url: string;
    file: Attachment;
    messageThread: string;
    actions: ChatActions;
    vb: ChatBridge;
  } = $props();
  let frame = $state<HTMLIFrameElement | null>(null),
    height = $state(320),
    clipped = $state(false);
  let active = true,
    bridgeDenied = $state(false),
    bridgeFailed = $state(false),
    bridgeReady = $state(untrack(() => !actions.mountEmbed));
  const consent = createAppConsent(() => active && !bridgeDenied),
    question = consent.question;
  const ask = consent.ask;
  onMount(() => {
    const detach = frame
      ? actions.mountEmbed?.(frame, file, {
          ask,
          ready: () => {
            if (active && !bridgeDenied) bridgeReady = true;
          },
          cancel: consent.cancel,
          deny: () => {
            bridgeDenied = true;
            consent.cancel();
          },
          fail: () => {
            bridgeFailed = true;
            consent.cancel();
          },
          thread: messageThread,
          resize: (requested) => {
            if (!active || !Number.isFinite(requested)) return;
            const cap = Math.min(420, Math.round(window.innerHeight * 0.55));
            const next = Math.max(Math.ceil(requested) + 2, 40);
            height = Math.min(next, cap);
            clipped = next > cap;
          },
        })
      : undefined;
    return () => {
      active = false;
      detach?.();
      consent.dispose();
    };
  });
  function open(event: MouseEvent) {
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    event.stopPropagation();
    if (active) actions.openFile(file);
  }
</script>

<div data-chat-embed class="tw:w-full tw:space-y-2">
  {#if !bridgeDenied}<iframe
      bind:this={frame}
      src={bridgeReady ? url : undefined}
      sandbox="allow-scripts"
      loading="lazy"
      title={file.name}
      {height}
      class="tw:w-full tw:rounded-control tw:border tw:border-border"
    ></iframe>{:else}<p
      role="alert"
      class="tw:m-0 tw:text-sm tw:text-muted-foreground"
    >
      {vb.t("Você não tem acesso a esta sala.")}
    </p>{/if}
  {#if bridgeFailed}<p
      role="alert"
      class="tw:m-0 tw:text-sm tw:text-muted-foreground"
    >
      {vb.t(
        "Não foi possível iniciar o app. Abra o arquivo para tentar de novo.",
      )}
    </p>{/if}
  <a
    href={url}
    onclick={open}
    class="tw:inline-flex tw:items-center tw:gap-1 tw:rounded-control tw:text-xs tw:text-link tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
    >{vb.t("Abrir em tela cheia")} ↗</a
  >
  {#if clipped}<p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
      {file.name}
    </p>{/if}
  {#if $question}{#key $question}{@const intent = $question}
      <div
        role="group"
        aria-label={vb.t("Confirmar")}
        class="tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3"
      >
        <p class="tw:m-0">
          {vb.t("Este app quer {what}, como você:", { what: intent.what })}
        </p>
        <q class="tw:block tw:break-words tw:text-xs tw:text-muted-foreground"
          >{intent.detail}</q
        >
        <div class="tw:flex tw:flex-wrap tw:gap-2">
          <Button
            size="sm"
            onclick={(event) => {
              if (event.currentTarget.isConnected) consent.choose(intent, true);
            }}>{vb.t("Permitir")}</Button
          ><Button
            size="sm"
            variant="outline"
            onclick={(event) => {
              if (event.currentTarget.isConnected)
                consent.choose(intent, false);
            }}>{vb.t("Cancelar")}</Button
          >
        </div>
      </div>{/key}{/if}
</div>
