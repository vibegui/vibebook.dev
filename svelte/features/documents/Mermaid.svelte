<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { RichContext, RichNode, RichActions } from "../rich-text/types";
  import RichNodes from "../rich-text/RichNodes.svelte";
  import { renderDiagram } from "./mermaid";
  let {
    source,
    context,
    actions,
    lang,
  }: {
    source: string;
    context: RichContext;
    actions: RichActions;
    lang: string;
  } = $props();
  const instance = $props.id();
  let container: HTMLElement | undefined = $state(),
    nodes: RichNode[] = $state([]),
    error = $state(false),
    loading = $state(true),
    width = $state(0),
    revision = 0,
    active = true;
  onDestroy(() => {
    active = false;
    ++revision;
    nodes = [];
  });
  $effect(() => {
    const host = container;
    if (!host) return;
    const measure = () => {
      const value = host.clientWidth;
      width = value > 0 ? Math.max(64, Math.floor(value / 64) * 64) : 0;
    };
    const observer = new ResizeObserver(measure);
    measure();
    observer.observe(host);
    return () => observer.disconnect();
  });
  const renderKey = $derived(
    JSON.stringify([
      source,
      context.room.id,
      context.room.me,
      context.pageUrl,
      context.idPrefix,
    ]),
  );
  $effect(() => {
    renderKey;
    const text = untrack(() => source),
      original = untrack(() => context),
      ctx = { ...original, idPrefix: original.idPrefix + "-" + instance },
      host = container;
    const available = width;
    if (!host || available === 0) return;
    const ticket = ++revision;
    loading = true;
    error = false;
    void renderDiagram(text, ctx, available - 32)
      .then((value) => {
        if (active && ticket === revision) {
          nodes = value;
          loading = false;
        }
      })
      .catch(() => {
        if (active && ticket === revision) {
          nodes = [];
          error = true;
          loading = false;
        }
      });
    return () => {
      ++revision;
    };
  });
</script>

<figure
  bind:this={container}
  aria-label={lang === "en" ? "Diagram" : "Diagrama"}
  class="tw:my-3 tw:overflow-x-auto tw:rounded-control tw:border tw:border-border tw:bg-card tw:p-4 tw:text-foreground tw:[&_svg]:max-w-full tw:[&_svg]:h-auto tw:[&_path]:stroke-current tw:[&_path]:fill-none tw:[&_line]:stroke-current tw:[&_rect]:stroke-current tw:[&_rect]:fill-muted tw:[&_polygon]:stroke-current tw:[&_polygon]:fill-muted tw:[&_text]:fill-current tw:[&_text]:font-sans tw:[&_text]:text-sm"
>
  {#if loading}<p role="status" class="tw:m-0 tw:text-muted-foreground">
      {lang === "en" ? "Loading diagram…" : "Carregando diagrama…"}
    </p>{:else if error}<p
      role="status"
      class="tw:m-0 tw:text-muted-foreground"
    >
      {lang === "en"
        ? "Diagram could not be rendered. Its source is shown below."
        : "Não foi possível desenhar o diagrama. O código está abaixo."}
    </p>
    <pre
      class="tw:overflow-auto tw:whitespace-pre-wrap tw:font-mono tw:text-xs">{source}</pre>{:else}<RichNodes
      {nodes}
      {actions}
    />{/if}
</figure>
