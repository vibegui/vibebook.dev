<script lang="ts">
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  import type { ChatBridge } from "../../chatTypes";
  let {
    headers,
    rows,
    title,
    vb,
    inline = true,
    open = false,
    onOpenChange,
  }: {
    headers: readonly string[];
    rows: readonly (readonly string[])[];
    title: string;
    vb: ChatBridge;
    inline?: boolean;
    open?: boolean;
    onOpenChange: (open: boolean) => void;
  } = $props();
</script>

{#snippet table()}
  <div class="tw:max-w-full tw:overflow-x-auto">
    <table
      class="tw:w-full tw:border-collapse tw:font-sans tw:text-sm tw:text-foreground"
    >
      {#if headers.length}<thead
          ><tr
            >{#each headers as header}<th
                class="tw:whitespace-pre-wrap tw:border tw:border-border tw:bg-muted tw:px-3 tw:py-2 tw:text-left tw:font-semibold"
                >{header}</th
              >{/each}</tr
          ></thead
        >{/if}
      <tbody
        >{#each rows as row}<tr
            >{#each row as value}<td
                class="tw:whitespace-pre-wrap tw:border tw:border-border tw:px-3 tw:py-2 tw:align-top"
                >{value}</td
              >{/each}</tr
          >{/each}</tbody
      >
    </table>
  </div>
{/snippet}
<div data-native-card-table class="tw:space-y-2">
  <Dialog {title} closeLabel={vb.t("Fechar")} fullScreen {open} {onOpenChange}>
    {#snippet trigger()}<Icon name="expand" />{vb.t(
        "Abrir em tela cheia",
      )}{/snippet}
    {@render table()}
  </Dialog>
  {#if inline}{@render table()}{/if}
</div>
