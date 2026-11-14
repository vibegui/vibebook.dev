<script lang="ts">
  import { onMount } from "svelte";
  import Message from "./Message.svelte";
  import type { ChatProps } from "./chatTypes";
  import {
    foldMessages,
    messageFooters,
    threadWorkers,
    agentMark,
    prettyModel,
  } from "./features/chat/model";
  import Button from "./lib/ui/Button.svelte";
  import Avatar from "./lib/ui/Avatar.svelte";
  import NeedsYou from "./features/needs-you/NeedsYou.svelte";
  let {
    room,
    thread,
    list,
    previous,
    more = false,
    origin = null,
    replyCount = 0,
    needsYou,
    vb,
    actions,
    onloadolder,
  }: ChatProps = $props();
  let now = $state(Date.now());
  onMount(() => {
    const timer = setInterval(() => {
      now = Date.now();
    }, 30_000);
    return () => clearInterval(timer);
  });
  const rows = $derived(foldMessages(list));
  const footers = $derived(messageFooters(room, thread, now));
  const workers = $derived(threadWorkers(room, thread, now));
  const epic = $derived(room.epics.find((e) => e.id === thread));
</script>

{#key room.id + ":" + thread}
  <section
    data-chat-timeline
    data-vb-native
    class="tw:space-y-1 tw:pb-4 tw:font-sans tw:text-sm tw:text-foreground"
  >
    {#if more}<div class="tw:flex tw:justify-center tw:p-3">
        <Button variant="outline" size="sm" id="olderBtn" onclick={onloadolder}
          >{vb.t("Carregar mensagens anteriores")}</Button
        >
      </div>{/if}
    {#if origin}<div
        data-chat-origin
        class="tw:mx-3 tw:mb-4 tw:rounded-surface tw:border tw:border-border tw:bg-muted/30"
      >
        <Message
          message={origin}
          origin
          typing={room.typing[origin.id]}
          {vb}
          {room}
          {actions}
        />
        <div
          class="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2 tw:border-t tw:border-border tw:px-3 tw:py-2 tw:text-xs tw:text-muted-foreground"
        >
          <span
            >{replyCount === 1
              ? vb.t("1 resposta")
              : vb.t("{n} respostas", { n: replyCount })}</span
          ><Button
            variant="ghost"
            size="sm"
            data-native-origin={origin.id}
            onclick={() => actions.navigate(origin!.id, origin!.thread)}
            >{vb.t("ver na sala principal")} ↩</Button
          >
        </div>
      </div>{/if}
    {#if rows.length}{#each rows as message, i (message.id)}<Message
          {message}
          previous={i ? rows[i - 1] : previous}
          typing={room.typing[message.id]}
          {vb}
          {room}
          {actions}
          footer={footers.get(message.id)}
        />{/each}
    {:else if !workers.length}<p
        data-chat-empty
        class="tw:m-0 tw:p-6 tw:text-center tw:leading-6 tw:text-muted-foreground"
      >
        {thread === "main"
          ? vb
              .t(
                "Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.",
              )
              .replace(/<\/?i>/g, "")
          : vb.t(
              "Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.",
            )}
      </p>{/if}
    {#if workers.length}<div
        data-chat-working
        class="tw:mx-3 tw:mt-4 tw:flex tw:items-start tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/30 tw:p-4"
      >
        <div class="tw:flex tw:shrink-0 tw:-space-x-2">
          {#each workers.slice(0, 4) as worker (`${worker.who}|${worker.email}`)}<span
              class="tw:relative"
              ><Avatar
                name={vb.name(worker.email)}
                src={vb.avatarUrl?.(worker.email)}
              /><span
                aria-hidden="true"
                class="tw:absolute tw:-bottom-1 tw:-right-1 tw:rounded-full tw:bg-card tw:px-0.5 tw:text-xs"
                >{agentMark(worker.who)}</span
              ></span
            >{/each}
        </div>
        <div class="tw:min-w-0 tw:flex-1 tw:space-y-1">
          <p class="tw:m-0 tw:break-words tw:font-medium">
            {workers
              .map((w) =>
                vb.t("{via} de {who}", {
                  via: prettyModel(w.who),
                  who: vb.name(w.email),
                }),
              )
              .join(", ")}
            {vb.t(
              workers.length === 1
                ? "está trabalhando nisso"
                : "estão trabalhando nisso",
            )}
          </p>
          <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
            {vb.t("O andamento e a entrega aparecem aqui nesta thread.")}
          </p>
        </div>
        <span
          aria-hidden="true"
          class="tw:animate-spin tw:motion-reduce:animate-none">✻</span
        >
      </div>{/if}
    {#if epic?.archived}<div
        data-chat-end
        class="tw:mx-3 tw:mt-4 tw:space-y-1 tw:rounded-surface tw:border tw:border-border tw:p-4"
      >
        <p class="tw:m-0 tw:font-medium">✓ {vb.t("Agent fez")}</p>
        <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
          {vb.t("Escreva aqui pra continuar: ele reabre.")}
        </p>
      </div>{/if}
    {#if epic?.prod}<div
        data-chat-production
        class="tw:mx-3 tw:mt-3 tw:space-y-1 tw:rounded-surface tw:border tw:border-border tw:p-4"
      >
        <p class="tw:m-0 tw:font-medium">
          {epic.prod.stage === "verified"
            ? `✓✓ ${vb.t("Verificado em prod")}`
            : `🚀 ${vb.t("No ar")}`}
        </p>
        {#if epic.prod.stage === "verified" && epic.prod.note}<p
            class="tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-xs tw:text-muted-foreground"
          >
            {epic.prod.note}
          </p>{:else if epic.prod.stage !== "verified"}<p
            class="tw:m-0 tw:text-xs tw:text-muted-foreground"
          >
            {vb.t("Falta o agent verificar em prod.")}
          </p>{/if}
      </div>{/if}
    {#if needsYou}<NeedsYou {...needsYou} {vb} />{/if}
  </section>
{/key}
