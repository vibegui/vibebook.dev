<script lang="ts">
  import type { Presence } from "./model";
  import { sandboxCost } from "./model";
  import Button from "../../lib/ui/Button.svelte";
  let {
    presence,
    t,
    name,
    onopen,
    locale = "pt-BR",
  }: {
    presence: Presence;
    t: (text: string) => string;
    name: (email: string) => string;
    onopen: () => void;
    locale?: string;
  } = $props();
  const states: Readonly<Record<string, string>> = {
    running: "rodando",
    stopped: "parado",
    paused: "pausado",
    starting: "ligando",
    pausing: "pausando",
    deleted: "apagado no freestyle",
    unknown: "?",
    creating: "criando",
    error: "erro",
  };
</script>

{#each presence.sandboxes as sandbox (sandbox.id)}
  <Button
    variant="ghost"
    class="tw:h-auto tw:w-full tw:justify-start tw:gap-2 tw:whitespace-normal tw:text-left"
    onclick={(event) => {
      if (event.currentTarget.isConnected) onopen();
    }}
  >
    <span aria-hidden="true">☁</span><span class="tw:min-w-0 tw:flex-1"
      ><span class="tw:block tw:truncate">{sandbox.name || t("sandbox")}</span
      ><small class="tw:block tw:text-xs tw:text-muted-foreground"
        >{name(sandbox.email).split(" ")[0]} · {t(
          states[sandbox.state || ""] || sandbox.state || "?",
        )}</small
      ></span
    ><span class="tw:text-xs tw:text-muted-foreground"
      >{new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
      }).format(sandboxCost(sandbox, Date.now()))}</span
    >
  </Button>
{/each}
