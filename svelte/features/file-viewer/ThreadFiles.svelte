<script lang="ts">
  import type { Attachment, Room } from "../../../shared/room";
  import { fileURL } from "./model";
  import Icon from "../../lib/ui/Icon.svelte";
  let {
    room,
    thread,
    lang = "pt",
    onopen,
  }: {
    room: Room;
    thread: string;
    lang?: "pt" | "en";
    onopen: (file: Attachment, trigger: HTMLElement) => void;
  } = $props();
  const files = $derived.by(() => {
    const names = new Map<string, Map<string, Attachment>>();
    if (thread === "main" || !room.epics.some((epic) => epic.id === thread))
      return [];
    for (const message of [...room.messages, ...(room.origins || [])])
      if (message.thread === thread)
        for (const file of message.files || []) {
          let versions = names.get(file.name);
          if (!versions) {
            versions = new Map();
            names.set(file.name, versions);
          }
          versions.set(file.id, file);
        }
    return [...names.values()]
      .map((versions) => {
        const list = [...versions.values()].sort((a, b) => b.ts - a.ts);
        return { file: list[0]!, count: list.length };
      })
      .sort((a, b) => b.file.ts - a.file.ts)
      .slice(0, 8);
  });
</script>

{#if files.length}<div
    data-vb-native
    data-thread-files
    class="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:p-2 tw:font-sans tw:text-sm tw:text-foreground"
  >
    <span class="tw:flex tw:items-center tw:gap-1 tw:text-muted-foreground"
      ><Icon name="file" />{lang === "en"
        ? "Files from this thread"
        : "Arquivos deste épico"}</span
    >{#each files as { file, count } (file.id)}<a
        href={fileURL({ roomId: room.id, id: file.id })}
        target="_blank"
        rel="noopener noreferrer"
        title={file.name}
        onclick={(event) => {
          if (
            !event.currentTarget.isConnected ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
          )
            return;
          event.preventDefault();
          onopen(file, event.currentTarget);
        }}
        class="tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-border tw:bg-card tw:px-2 tw:py-1 tw:text-foreground tw:no-underline tw:hover:bg-muted"
        ><Icon name="file" /><span class="tw:truncate">{file.name}</span
        >{#if count > 1}<span class="tw:text-xs tw:text-muted-foreground"
            >v{count}</span
          >{/if}</a
      >{/each}
  </div>{/if}
