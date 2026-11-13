<script lang="ts">
  import type { CardEl } from "../../../shared/card";
  import type { ChatBridge } from "../../chatTypes";
  import { chartView } from "./model";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  import Progress from "../../lib/ui/Progress.svelte";
  let {
    chart,
    vb,
    inline = true,
    open = false,
    onOpenChange,
  }: {
    chart: Extract<CardEl, { type: "Chart" }>["props"];
    vb: ChatBridge;
    inline?: boolean;
    open?: boolean;
    onOpenChange: (open: boolean) => void;
  } = $props();
  const view = $derived(chartView(chart.data));
</script>

{#snippet figure()}
  <figure class="tw:m-0 tw:space-y-2">
    {#if chart.title}<figcaption
        class="tw:whitespace-pre-wrap tw:text-sm tw:font-medium"
      >
        {chart.title}
      </figcaption>{/if}{#if chart.kind === "line"}<svg
        aria-label={chart.title || vb.t("Gráfico")}
        role="img"
        viewBox="-4 -4 308 98"
        preserveAspectRatio="none"
        class="tw:h-24 tw:w-full tw:text-primary"
        ><polyline
          points={view.points}
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          vector-effect="non-scaling-stroke"
        /></svg
      >
      <div
        class="tw:flex tw:justify-between tw:gap-2 tw:text-xs tw:text-muted-foreground"
      >
        <span>{chart.data[0]?.label}</span><span
          >{chart.data.at(-1)?.label}</span
        >
      </div>{:else}{#each chart.data as point, index}<div
          class="tw:grid tw:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] tw:items-center tw:gap-2 tw:text-xs"
        >
          <span class="tw:whitespace-pre-wrap tw:break-words"
            >{point.label}</span
          ><Progress
            value={view.bars[index]}
            label={`${point.label}: ${point.value}`}
          /><b>{point.value}</b>
        </div>{/each}{/if}
  </figure>
{/snippet}
<div data-native-card-chart class="tw:space-y-2">
  {#if inline}{@render figure()}{:else}<Dialog
      title={chart.title || vb.t("Gráfico")}
      closeLabel={vb.t("Fechar")}
      fullScreen
      {open}
      {onOpenChange}
    >
      {#snippet trigger()}<Icon name="chart" />{chart.title || vb.t("Gráfico")} ·
        {vb.t("Abrir em tela cheia")}{/snippet}
      {@render figure()}
    </Dialog>{/if}
</div>
