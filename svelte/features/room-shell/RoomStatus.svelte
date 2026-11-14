<script lang="ts">
  import Heading from "../../lib/ui/Heading.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import ErrorState from "../../lib/components/ErrorState.svelte";
  import type { RootRoomSnapshot } from "../root-room/session";
  import type { BrowserApplicationServices } from "../application/browser";
  let { snapshot, services }: { snapshot: RootRoomSnapshot; services: BrowserApplicationServices } = $props();
  const current = (event: Event) => services.active() && event.currentTarget instanceof HTMLElement && event.currentTarget.isConnected && event.currentTarget.closest("[data-native-room-status]")?.getAttribute("data-room-generation") === String(services.rootRoom.read().generation);
</script>

<main data-vb-native data-native-room-status={snapshot.phase} data-room-generation={snapshot.generation} class="tw:mx-auto tw:flex tw:min-h-[50dvh] tw:w-full tw:max-w-xl tw:flex-col tw:justify-center tw:gap-4 tw:p-6 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground">
  {#if snapshot.phase === "removed" || snapshot.phase === "unavailable"}
    <ErrorState title={services.t(snapshot.phase === "removed" ? "Você foi removido deste vibebook." : "Sem acesso a este vibebook. Peça para alguém de dentro te convidar.")}/>
    {#if snapshot.phase === "unavailable"}<Button variant="outline" onclick={(event) => { if (current(event)) services.actions.retryRoom(); }}>{services.t("Verificar acesso novamente")}</Button>{/if}
  {:else}
    <Heading level={1} class="tw:font-sans tw:tracking-normal tw:[font-variation-settings:normal]">vibebook</Heading>
    <p role="status" class="tw:m-0 tw:text-muted-foreground">{services.t("Carregando…")}</p>
    <div aria-hidden="true" class="tw:grid tw:gap-3 tw:motion-safe:animate-pulse"><div class="tw:h-4 tw:w-3/4 tw:rounded-control tw:bg-muted"></div><div class="tw:h-4 tw:w-full tw:rounded-control tw:bg-muted"></div><div class="tw:h-4 tw:w-1/2 tw:rounded-control tw:bg-muted"></div></div>
  {/if}
  <Button variant="ghost" onclick={(event) => { if (current(event)) services.actions.home(); }}>{services.t("seus vibebooks")}</Button>
</main>
