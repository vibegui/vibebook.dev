<script lang="ts">
  import type { Room } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import { messageCount, treeFiles } from "./model";
  import Button from "../../lib/ui/Button.svelte";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  let {
    room,
    messageId,
    actions,
    vb,
  }: { room: Room; messageId: number; actions: ChatActions; vb: ChatBridge } =
    $props();
  const epics = $derived(room.epics),
    messages = $derived(room.messages),
    counts = $derived(room.counts),
    countsAt = $derived(room.countsAt);
  const cards = $derived.by(() =>
    epics
      .filter((epic) => epic.from_msg === messageId)
      .map((epic) => {
        const replies = messages.filter(
          (message) => message.thread === epic.id,
        );
        return {
          epic,
          files: treeFiles({ epics, messages }, epic.id),
          last: replies[replies.length - 1],
          count: messageCount({ messages, counts, countsAt }, epic.id),
        };
      }),
  );
</script>

{#each cards as { epic, files, last, count } (epic.id)}
  <Button
    variant="outline"
    data-thread-card={epic.id}
    class="tw:mt-2 tw:h-auto tw:w-full tw:justify-start tw:gap-3 tw:whitespace-normal tw:p-3 tw:text-left"
    onclick={(event) => {
      if (
        event.currentTarget.isConnected &&
        room.epics.some((item) => item.id === epic.id)
      )
        actions.navigateRich?.({ kind: "thread", id: epic.id });
    }}
  >
    <Avatar
      name={epic.owner ? vb.name(epic.owner) : epic.title}
      src={epic.owner ? vb.avatarUrl?.(epic.owner) : undefined}
    />
    <span class="tw:min-w-0 tw:flex-1"
      ><strong class="tw:block tw:font-semibold">{epic.title}</strong><small
        class="tw:block tw:text-xs tw:text-muted-foreground"
        >{epic.archived ? `✓ ${vb.t("concluído")} · ` : ""}{epic.tasks.length
          ? `${vb.t("{d}/{n} tarefas", { d: epic.tasks.filter((task) => task.status === "done").length, n: epic.tasks.length })} · `
          : ""}{count === 1
          ? vb.t("1 resposta")
          : vb.t("{n} respostas", { n: count })}{last
          ? ` · ${vb.ago(last.ts) === vb.t("agora") ? vb.t("agora") : vb.t("última há {ago}", { ago: vb.ago(last.ts) })}`
          : ""}</small
      ></span
    ><span aria-hidden="true">→</span>
  </Button>
  {#if files.length}<div class="tw:flex tw:flex-wrap tw:gap-2 tw:py-2">
      {#each files.slice(0, 6) as file (file.name)}<a
          href={`/api/books/${encodeURIComponent(room.id)}/files/${encodeURIComponent(file.id)}?ui=svelte`}
          target="_blank"
          rel="noopener noreferrer"
          title={file.name}
          class="tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs tw:text-foreground tw:no-underline tw:hover:bg-muted"
          onclick={(event) => {
            if (
              !event.currentTarget.isConnected ||
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.altKey ||
              event.shiftKey ||
              !actions.openFileReference
            )
              return;
            event.preventDefault();
            actions.openFileReference({
              roomId: room.id,
              id: file.id,
              name: file.name,
            });
          }}
          ><Icon name="file" /><span class="tw:truncate">{file.name}</span
          >{#if file.n > 1}<small>v{file.n}</small>{/if}</a
        >{/each}{#if files.length > 6}<small
          class="tw:text-xs tw:text-muted-foreground">+{files.length - 6}</small
        >{/if}
    </div>{/if}
{/each}
