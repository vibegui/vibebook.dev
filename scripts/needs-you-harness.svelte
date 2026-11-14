<script lang="ts">
  import type { Readable } from "svelte/store";
  import type { NeedsView } from "../svelte/features/needs-you/model";
  import type { NeedsYouSession } from "../svelte/features/needs-you/session";
  import type { ChatBridge } from "../svelte/chatTypes";
  import NeedsYou from "../svelte/features/needs-you/NeedsYou.svelte";
  let {
    values,
    owner,
    vb,
  }: {
    values: Readable<NeedsView | null>;
    owner: NeedsYouSession;
    vb: ChatBridge;
  } = $props();
</script>

{#if $values}<NeedsYou view={$values} {owner} {vb} />{/if}
