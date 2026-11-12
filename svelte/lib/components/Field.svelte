<script lang="ts">
  import type { Snippet } from "svelte";
  import Label from "../ui/Label.svelte";
  let {
    id,
    label,
    hint,
    error,
    children,
  }: {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    children: Snippet<
      [{ id: string; "aria-describedby"?: string; "aria-invalid": boolean }]
    >;
  } = $props();
  const descriptionId = $derived(
    error || hint ? `${id}-description` : undefined,
  );
</script>

<div
  class="tw:grid tw:grid-cols-1 tw:gap-1.5 tw:font-sans tw:text-sm tw:text-foreground"
>
  <Label for={id}>{label}</Label>
  {@render children({
    id,
    "aria-describedby": descriptionId,
    "aria-invalid": !!error,
  })}
  {#if error || hint}<p
      id={descriptionId}
      role={error ? "alert" : undefined}
      class={error
        ? "tw:m-0 tw:text-xs tw:font-medium tw:leading-4 tw:text-foreground"
        : "tw:m-0 tw:text-xs tw:leading-4 tw:text-muted-foreground"}
    >
      {error || hint}
    </p>{/if}
</div>
