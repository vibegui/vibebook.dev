<script lang="ts">
  import Button from "../../lib/ui/Button.svelte";
  let { phase, lang, label, retry, current }: {
    phase: "idle" | "loading" | "error" | "ready";
    lang: "en" | "pt";
    label: string;
    retry(): void;
    current(): boolean;
  } = $props();
</script>

<section data-deferred-view aria-label={label} aria-busy={phase === "loading" || phase === "idle"} class="tw:space-y-3 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground">
  <p role={phase === "error" ? "alert" : "status"}>
    {phase === "error"
      ? lang === "en" ? "Could not load this view. Retry, or reload the page if it still fails." : "Não foi possível carregar esta tela. Tente de novo ou recarregue a página se o erro continuar."
      : lang === "en" ? "Loading…" : "Carregando…"}
  </p>
  {#if phase === "error"}<Button variant="outline" onclick={(event) => { if(event.currentTarget.isConnected && current()) retry(); }}>{lang === "en" ? "Retry" : "Tentar de novo"}</Button>{/if}
</section>
