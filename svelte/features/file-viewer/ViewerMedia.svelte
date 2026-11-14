<script lang="ts">
  import { onMount } from "svelte";
  import type { ViewerContent } from "./session";
  let {
    content,
    name,
    onready,
    onerror,
    onclose,
  }: {
    content: ViewerContent;
    name: string;
    onready: () => void;
    onerror: () => void;
    onclose: () => void;
  } = $props();
  let image: HTMLImageElement | undefined = $state(),
    audio: HTMLAudioElement | undefined = $state(),
    frame: HTMLIFrameElement | undefined = $state();
  onMount(() => {
    let active = true;
    const escape = (event: MessageEvent<unknown>) => {
      if (
        active &&
        content.kind === "html" &&
        frame?.isConnected &&
        event.source === frame.contentWindow &&
        typeof event.data === "object" &&
        event.data !== null &&
        "vbViewer" in event.data &&
        event.data.vbViewer === "esc"
      )
        onclose();
    };
    window.addEventListener("message", escape);
    return () => {
      active = false;
      window.removeEventListener("message", escape);
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
      if (frame) frame.src = "about:blank";
      if (image) image.removeAttribute("src");
    };
  });
</script>

{#if content.kind === "image"}
  <img
    bind:this={image}
    src={content.url}
    alt={name}
    onload={onready}
    {onerror}
    class="tw:mx-auto tw:block tw:max-h-[70dvh] tw:max-w-full tw:object-contain"
  />
{:else if content.kind === "audio"}
  <audio
    bind:this={audio}
    src={content.url}
    controls
    preload="metadata"
    onloadedmetadata={onready}
    {onerror}
    aria-label={name}
    class="tw:mx-auto tw:block tw:w-full tw:max-w-xl"
  ></audio>
{:else if content.kind === "html"}
  <iframe
    bind:this={frame}
    src={content.url}
    title={name}
    sandbox="allow-scripts"
    referrerpolicy="no-referrer"
    onload={onready}
    {onerror}
    class="tw:block tw:h-[70dvh] tw:w-full tw:border-0 tw:bg-background"
  ></iframe>
{:else if content.kind === "pdf"}
  <iframe
    bind:this={frame}
    src={content.url}
    title={name}
    referrerpolicy="no-referrer"
    onload={onready}
    {onerror}
    class="tw:block tw:h-[70dvh] tw:w-full tw:border-0 tw:bg-background"
  ></iframe>
{/if}
