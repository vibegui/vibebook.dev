<script lang="ts">
  import { onDestroy } from "svelte";
  import Embed from "./Embed.svelte";
  import type { Attachment } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import { kb } from "../../panels";
  import Icon from "../../lib/ui/Icon.svelte";
  let {
    roomId,
    files = [],
    messageThread,
    actions,
    vb,
  }: {
    roomId: string;
    messageThread: string;
    files?: Attachment[];
    actions: ChatActions;
    vb: ChatBridge;
  } = $props();
  let active = true;
  onDestroy(() => {
    active = false;
  });
  const url = (file: Attachment) =>
    `/api/books/${encodeURIComponent(roomId)}/files/${encodeURIComponent(file.id)}`;
  function open(event: MouseEvent, file: Attachment) {
    if (!active || !(event.currentTarget instanceof HTMLElement) || !event.currentTarget.isConnected) {
      event.preventDefault();
      return;
    }
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    event.stopPropagation();
    actions.openFile(file);
  }
</script>

{#if files.length}<div
    data-message-attachments
    class="tw:mt-2 tw:flex tw:flex-wrap tw:gap-2"
  >
    {#each files as file (file.id)}
      {#if file.embed}<Embed
          url={url(file)}
          {file}
          {messageThread}
          {actions}
          {vb}
        />
      {:else if file.type.startsWith("audio/")}<div
          class="tw:max-w-full tw:space-y-1"
        >
          <audio
            controls
            preload="metadata"
            src={url(file)}
            class="tw:max-w-full"
          ></audio><a
            href={url(file)}
            target="_blank"
            rel="noopener"
            download={file.name}
            class="tw:block tw:break-words tw:text-xs tw:text-link"
            >{file.name} · {kb(file.size)}</a
          >
        </div>
      {:else if file.type.startsWith("image/")}<a
          data-message-image
          href={url(file)}
          target="_blank"
          rel="noopener"
          onclick={(event) => open(event, file)}
          class="tw:block tw:min-w-[min(220px,100%)] tw:max-w-[min(320px,100%)] tw:rounded-control tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
          ><img
            src={url(file)}
            alt={file.name}
            loading="lazy"
            class="tw:box-border tw:block tw:max-h-[260px] tw:min-w-full tw:max-w-full tw:rounded-control tw:border tw:border-border tw:object-cover tw:object-top"
          /></a
        >
      {:else}<a
          href={url(file)}
          target="_blank"
          rel="noopener"
          onclick={(event) => open(event, file)}
          class="tw:inline-flex tw:max-w-full tw:items-center tw:gap-2 tw:rounded-control tw:border tw:border-border tw:bg-muted tw:px-3 tw:py-2 tw:text-sm tw:text-link tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
          ><Icon name="file" /><span class="tw:min-w-0 tw:break-words"
            >{file.name}</span
          ><small class="tw:shrink-0 tw:text-muted-foreground"
            >{kb(file.size)}</small
          ></a
        >{/if}
    {/each}
  </div>{/if}
