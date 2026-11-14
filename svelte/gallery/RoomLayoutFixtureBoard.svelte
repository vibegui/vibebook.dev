<script lang="ts">
  import { onMount } from "svelte";
  import Textarea from "../lib/ui/Textarea.svelte";
  let { mounted }: { mounted(): void } = $props();
  let draft = $state("");
  onMount(() => { mounted(); });
</script>
<section data-layout-fixture-board class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2">
  <label for="layout-fixture-board-draft">Retained Board draft</label>
  <Textarea id="layout-fixture-board-draft" bind:value={draft}/>
  <output data-layout-fixture-board-value>{draft}</output>
</section>
