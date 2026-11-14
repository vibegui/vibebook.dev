<script lang="ts">
  import { untrack } from "svelte";
  import type { ComponentProps } from "svelte";
  import AccountPanel from "./AccountPanel.svelte";
  import AccountAgentSettings from "./AccountAgentSettings.svelte";
  import NotificationBell from "../notifications/NotificationBell.svelte";
  import type { AgentsService } from "../agents/service";
  import type { AgentFormatting } from "../agents/types";
  import type { PwaService } from "../pwa/service";
  let { pwa, agents, origin, vb, lang, ...panel }: Omit<ComponentProps<typeof AccountPanel>, "notifications" | "agentSettings" | "lang"> & { pwa: PwaService; agents: AgentsService; origin: string; vb: AgentFormatting; lang: "pt" | "en" } = $props();
  const view = untrack(() => panel.owner.state);
</script>

<AccountPanel {...panel} {lang}>
  {#snippet notifications()}<NotificationBell owner={pwa} {lang}/>{/snippet}
  {#snippet agentSettings()}
    {#if $view.me && $view.binding}{#key $view.binding.account}
      <AccountAgentSettings account={$view.binding.account} {agents} {origin} {lang} {vb}/>
    {/key}{/if}
  {/snippet}
</AccountPanel>
