<script lang="ts">
  import type { Room } from "../../../shared/room";
  import { onDestroy } from "svelte";
  import { createRichSession } from "./session";
  import type { RichActions, RichMode, RichPolicy } from "./types";
  import RichNodes from "./RichNodes.svelte";
  let {
    text,
    mode = "markdown",
    room,
    actions,
    names,
    pageUrl,
    policy,
    fileLabel,
  }: {
    text: string;
    mode?: RichMode;
    room: Room;
    actions: RichActions;
    names?: Readonly<Record<string, string>>;
    pageUrl?: string;
    policy?: RichPolicy;
    fileLabel?: string;
  } = $props();
  const idPrefix = $props.id();
  const session = createRichSession();
  onDestroy(() => session.dispose());
  const nodes = $derived(
    session.render(text, mode, {
      room,
      policy,
      names,
      pageUrl: pageUrl || location.href,
      idPrefix,
      fileLabel,
    }),
  );
</script>

{#if mode === "inline"}<span
    data-rich-content
    data-vb-native
    class="tw:min-w-0 tw:break-words tw:font-sans tw:leading-6 tw:text-foreground"
    ><RichNodes {nodes} {actions} /></span
  >
{:else}<div
    data-rich-content
    data-vb-native
    class={mode === "human" || (nodes.length === 1 && nodes[0].kind === "text")
      ? "tw:min-w-0 tw:max-w-full tw:overflow-x-auto tw:whitespace-pre-wrap tw:break-words tw:font-sans tw:leading-6 tw:text-foreground"
      : "tw:min-w-0 tw:max-w-full tw:overflow-x-auto tw:break-words tw:font-sans tw:leading-6 tw:text-foreground"}
  >
    <RichNodes {nodes} {actions} />
  </div>{/if}
