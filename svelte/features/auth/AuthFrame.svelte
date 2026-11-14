<script lang="ts">
  import type { Snippet } from "svelte";
  import Card from "../../lib/ui/Card.svelte";
  let { title, children }: { title: string; children: Snippet } = $props();
</script>

<svelte:head><title>{title} · vibebook</title></svelte:head>
<main
  data-vb-native="auth"
  class="tw:flex tw:min-h-dvh tw:items-center tw:justify-center tw:bg-background tw:p-4 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground"
>
  <div class="tw:w-full tw:max-w-md">
    <Card class="tw:space-y-5 tw:p-6 tw:sm:p-8">
      <a
        href="/"
        class="tw:inline-flex tw:rounded-control tw:text-lg tw:font-semibold tw:text-foreground tw:no-underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
        >vibebook</a
      >
      <h1
        class="tw:m-0 tw:break-words tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight"
      >
        {title}
      </h1>
      {@render children()}
    </Card>
  </div>
</main>
