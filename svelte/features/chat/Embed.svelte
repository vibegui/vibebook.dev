<script lang="ts">
  import { onMount } from "svelte";
  import type { Attachment } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
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
  let question = $state<{ what: string; detail: string } | null>(null);
  const queue: {
    what: string;
    detail: string;
    resolve: (answer: boolean) => void;
  }[] = [];
  let active = true;
  function advance() {
    const first = queue[0];
    question = first ? { what: first.what, detail: first.detail } : null;
  }
  function choose(answer: boolean) {
    queue.shift()?.resolve(answer);
    advance();
  }
  function ask(what: string, detail: string): Promise<boolean> {
    if (!active) return Promise.resolve(false);
    return new Promise((resolve) => {
      queue.push({ what, detail: detail.slice(0, 600), resolve });
      if (queue.length === 1) advance();
    });
  }
  onMount(() => {
    const detach = frame
      ? actions.mountEmbed?.(frame, file, {
          ask,
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
      for (const pending of queue.splice(0)) pending.resolve(false);
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
  <iframe
    bind:this={frame}
    src={url}
    sandbox="allow-scripts"
    loading="lazy"
    title={file.name}
    {height}
    class="tw:w-full tw:rounded-control tw:border tw:border-border"
  ></iframe>
  <a
    href={url}
    onclick={open}
    class="tw:inline-flex tw:items-center tw:gap-1 tw:rounded-control tw:text-xs tw:text-link tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
    >{vb.t("Abrir em tela cheia")} ↗</a
  >
  {#if clipped}<p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
      {file.name}
    </p>{/if}
  {#if question}<div
      role="group"
      aria-label={vb.t("Confirmar")}
      class="tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3"
    >
      <p class="tw:m-0">
        {vb.t("Este app quer {what}, como você:", { what: question.what })}
      </p>
      <q class="tw:block tw:break-words tw:text-xs tw:text-muted-foreground"
        >{question.detail}</q
      >
      <div class="tw:flex tw:flex-wrap tw:gap-2">
        <Button size="sm" onclick={() => choose(true)}
          >{vb.t("Permitir")}</Button
        ><Button size="sm" variant="outline" onclick={() => choose(false)}
          >{vb.t("Cancelar")}</Button
        >
      </div>
    </div>{/if}
</div>
