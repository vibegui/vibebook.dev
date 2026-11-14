<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Writable } from "svelte/store";
  import type Fixture from "./deferred-view-fixture.svelte";
  import { createDeferredModule } from "../svelte/features/deferred-view/module";
  import DeferredViewStatus from "../svelte/features/deferred-view/DeferredViewStatus.svelte";
  let { state: scenario, load, current, mounted, destroyed }: {state:Writable<{requested:boolean;visible:boolean;revision:number}>;load():Promise<typeof Fixture>;current():boolean;mounted():void;destroyed():void}=$props();
  let active=true;
  const module=untrack(()=>createDeferredModule(load,{current:()=>active&&current()})),view=module.state;
  const Loaded=$derived($view.component);
  $effect(()=>{if($scenario.requested)void module.ensure();});
  onDestroy(()=>{active=false;module.dispose();});
</script>
<div hidden={!$scenario.visible}>{#if Loaded}<Loaded revision={$scenario.revision} {mounted} {destroyed}/>{:else}<DeferredViewStatus phase={$view.phase} lang="en" label="Deferred test view" retry={()=>{void module.retry();}} current={()=>active&&current()}/>{/if}</div>
