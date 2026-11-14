<script lang="ts">
  import AppShell from "../svelte/features/application/AppShell.svelte";
  import type { BrowserApplicationServices } from "../svelte/features/application/browser";
  import type { ApplicationShellEffects } from "../svelte/features/application/shellTypes";
  import Button from "../svelte/lib/ui/Button.svelte";
  let { services, effects }: { services: BrowserApplicationServices; effects: ApplicationShellEffects } = $props();
</script>
<AppShell {services} {effects}>
  {#snippet roomSnippet(presentation)}
    <section data-test-room-snippet><p>Controlled room presentation fixture</p><Button onclick={() => presentation.openInbox()}>Open fixture inbox</Button></section>
  {/snippet}
</AppShell>
