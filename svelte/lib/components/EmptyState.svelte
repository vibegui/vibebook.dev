<script lang="ts">
  import type { Snippet } from "svelte";
  import Icon from "../ui/Icon.svelte";
  import type { IconName } from "../ui/icons";
  let {
    title,
    description,
    icon = "inbox",
    children,
  }: {
    title: string;
    description?: string;
    icon?: IconName;
    children?: Snippet;
  } = $props();
</script>

<div
  class="tw:flex tw:flex-col tw:items-center tw:gap-3 tw:px-6 tw:py-10 tw:text-center tw:font-sans tw:text-sm tw:text-foreground"
>
  <span
    class="tw:grid tw:size-10 tw:place-items-center tw:rounded-surface tw:border tw:border-border tw:bg-muted"
    ><Icon name={icon} class="tw:size-5" /></span
  >
  <div class="tw:space-y-1">
    <p class="tw:m-0 tw:font-medium">{title}</p>
    {#if description}<p
        class="tw:m-0 tw:max-w-sm tw:leading-5 tw:text-muted-foreground"
      >
        {description}
      </p>{/if}
  </div>
  {@render children?.()}
</div>
