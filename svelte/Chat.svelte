<script lang="ts">
  import Message from "./Message.svelte";
  import type { Room } from "../shared/room";
  import type { ChatBridge, ChatMessage } from "./chatTypes";
  let { room, thread, list, previous, more = false, origin = null, replyCount = 0, vb, onloadolder }: {
    room: Room;
    thread: string;
    list: ChatMessage[];
    previous?: ChatMessage;
    more?: boolean | number;
    origin?: ChatMessage | null;
    replyCount?: number;
    vb: ChatBridge;
    onloadolder: () => void;
  } = $props();
</script>

{#key room.id + ":" + thread}
{#if list.length && more}
  <div class="older"><button type="button" class="ghost" id="olderBtn" onclick={onloadolder}>{vb.t("Carregar mensagens anteriores")}</button></div>
{/if}
{#if origin}
  <div class="origin">
    <Message message={origin} origin typing={room.typing[origin.id]} vb={vb} />
    <div class="replies"><span>{replyCount === 1 ? vb.t("1 resposta") : vb.t("{n} respostas", { n: replyCount })}</span><button type="button" class="ghost" data-gomain={origin.id}>{vb.t("ver na sala principal")} {@html vb.icon("reply", 13)}</button></div>
  </div>
{/if}
{#if list.length}
  {#each list as message, i (message.id)}
    <Message {message} previous={i ? list[i - 1] : previous} typing={room.typing[message.id]} {vb} />
  {/each}
{:else}
  <div class="empty" class:afterOrigin={!!origin}>
    {#if thread === "main"}
      {@html vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")}
    {:else}{vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")}{/if}
  </div>
{/if}
{/key}
