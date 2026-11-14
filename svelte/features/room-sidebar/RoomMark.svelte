<script lang="ts">
  import { roomInitials, tintClasses } from "../home/model";
  let {
    title,
    src,
    tint,
  }: { title: string; src?: string; tint?: string | null } = $props();
  let failed = $state(false);
  $effect(() => {
    void src;
    failed = false;
  });
  const color = $derived(
    tint === "blue" ||
      tint === "green" ||
      tint === "yellow" ||
      tint === "orange" ||
      tint === "pink" ||
      tint === "purple"
      ? tintClasses[tint]
      : tintClasses.none,
  );
</script>

<span
  aria-hidden="true"
  class={[
    "tw:inline-grid tw:size-8 tw:shrink-0 tw:place-items-center tw:overflow-hidden tw:rounded-control tw:border tw:border-border tw:font-sans tw:text-xs tw:font-semibold tw:tracking-normal",
    color,
  ]}
>
  {#if src && !failed}<img
      {src}
      alt=""
      class="tw:size-full tw:object-cover"
      onerror={() => {
        failed = true;
      }}
    />{:else}{roomInitials(title)}{/if}
</span>
