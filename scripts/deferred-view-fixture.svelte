<script lang="ts">
  import { onMount } from "svelte";
  let { revision, mounted, destroyed }: {revision:number;mounted():void;destroyed():void} = $props();
  let draft=$state("");
  onMount(()=>{mounted();return destroyed;});
</script>
<section data-retained-lazy-view data-revision={revision}><label>Owned test draft<textarea bind:value={draft}></textarea></label></section>
