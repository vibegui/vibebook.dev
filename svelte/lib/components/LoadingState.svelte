<script lang="ts">
  let { label }: { label: string } = $props();
</script>

<div
  role="status"
  class="tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-muted-foreground"
>
  <span
    aria-hidden="true"
    class="tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none"
  ></span>{label}
</div>
