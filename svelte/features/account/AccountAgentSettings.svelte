<script lang="ts">
  import { untrack } from "svelte";
  import AgentSettings from "../agents/AgentSettings.svelte";
  import type { AgentsService } from "../agents/service";
  import type { AgentFormatting } from "../agents/types";
  let {
    account,
    agents,
    origin,
    lang,
    vb,
  }: {
    account: string;
    agents: AgentsService;
    origin: string;
    lang: "pt" | "en";
    vb: AgentFormatting;
  } = $props();
  // The parent keys this component by account; no second grant owner is created.
  const owner = untrack(() => agents.account(account));
</script>

{#if owner}<AgentSettings {owner} {origin} {lang} {vb} />{/if}
