<script lang="ts">
  import { onDestroy } from "svelte";
  import { connectPrompt } from "./model";
  import { agentText } from "./copy";
  import Button from "../../lib/ui/Button.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  let {
    origin,
    roomId,
    lang = "pt",
    waiting = true,
    current = () => true,
    intro = true,
  }: {
    origin: string;
    roomId?: string;
    lang?: "pt" | "en";
    waiting?: boolean;
    current?: () => boolean;
    intro?: boolean;
  } = $props();
  const text = (key: Parameters<typeof agentText>[1]) => agentText(lang, key);
  let notice = $state("");
  let active = true,
    ticket = 0;
  $effect(() => {
    void origin;
    void roomId;
    notice = "";
    ticket++;
  });
  async function copy(value: string) {
    if (!active || !current()) return;
    const own = ++ticket;
    try {
      await navigator.clipboard.writeText(value);
      if (active && current() && own === ticket) notice = text("copied");
    } catch {
      if (active && current() && own === ticket) notice = text("copyFailed");
    }
  }
  onDestroy(() => {
    active = false;
    ticket++;
  });
</script>

<section
  data-native-agent-setup
  class="tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:text-card-foreground"
>
  {#if intro}<Heading level={3}
    >{text(roomId ? "roomConnectTitle" : "connectTitle")}</Heading
  >
  <p class="tw:m-0 tw:text-sm tw:leading-6 tw:text-muted-foreground">
    {text("connectBody")}
  </p>
  {/if}<code
    class="tw:block tw:select-text tw:break-words tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs"
    >{connectPrompt(origin, roomId)}</code
  ><Button
    onclick={(event) => {
      if (active && event.currentTarget.isConnected)
        void copy(connectPrompt(origin, roomId));
    }}>{text("copy")}</Button
  >
  {#if notice}<p
      role="status"
      class="tw:m-0 tw:text-sm tw:text-muted-foreground"
    >
      {notice}
    </p>{/if}
  {#if waiting}<p
      role="status"
      class="tw:m-0 tw:text-xs tw:text-muted-foreground"
    >
      {text("waiting")}
    </p>{/if}
  <details class="tw:text-sm tw:leading-6">
    <summary
      class="tw:cursor-pointer tw:rounded-control tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
      >{text("alternatives")}</summary
    >
    <div class="tw:space-y-2 tw:pt-2">
      <p class="tw:m-0">
        <strong>Claude.ai:</strong>
        {text("connector")}
        <code class="tw:select-text tw:break-all tw:font-mono"
          >{origin}/mcp</code
        >
        <Button
          variant="ghost"
          size="sm"
          onclick={() => void copy(`${origin}/mcp`)}>{text("copy")}</Button
        >
      </p>
      <p class="tw:m-0">
        {text("codeConnector")}
        <code class="tw:select-text tw:break-all tw:font-mono"
          >claude mcp add --transport http vibebook {origin}/mcp</code
        >
        <Button
          variant="ghost"
          size="sm"
          onclick={() =>
            void copy(`claude mcp add --transport http vibebook ${origin}/mcp`)}
          >{text("copy")}</Button
        >
      </p>
      <a
        href="/connect"
        target="_blank"
        rel="noopener noreferrer"
        class="tw:text-link tw:underline">{text("fullGuide")}</a
      >
    </div>
  </details>
</section>
