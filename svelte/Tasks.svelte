<script lang="ts">
  import type { PanelProps, Task } from './panels';
  let { room, thread, vb, send, waits = [] }: PanelProps = $props();
  const list = $derived(room.epics.find(e => e.id === thread) || (thread === 'main' && room.roomTasks?.length ? {id:'main', tasks:room.roomTasks, flags:[] as string[]} : null));
  const waiting = (tk: Task) => waits.some(w => w.book_id === room.id && w.ref === `t${tk.id}`);
  const tasks = $derived((list?.tasks || []).map((tk,i) => ({tk,i})).sort((a,b) => (a.tk.done ? 2 : waiting(a.tk) ? 0 : 1) - (b.tk.done ? 2 : waiting(b.tk) ? 0 : 1) || a.i-b.i).map(x=>x.tk));
  const done = $derived(list?.tasks.filter(t=>t.done).length || 0);
  let edit = $state<string | null>(null), title = $state('');
  let newTitle = $state('');
  function save(tk: Task, yes = true) {
    if (edit !== tk.id) return;
    edit = null;
    if (yes && title.trim() && title !== tk.title) send({t:'task.rename',id:tk.id,title});
  }
  function due(tk: Task) { const value=prompt(vb.t('Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:'),tk.due || ''); if(value!==null) send({t:'task.assign',id:tk.id,due:value}); }
</script>
{#if list}
  <div class="thead"><b>{vb.t('Tarefas')}</b><small>{done}/{list.tasks.length}</small><i><span style:width={`${list.tasks.length ? Math.round(done/list.tasks.length*100) : 0}%`}></span></i></div>
  {#if list.flags?.length}<span class="vnote" title={`@vibe: ${list.flags.join(' · ')}`}>{@html vb.icon('alert',12)} {list.flags.join(' · ')}</span>{/if}
  {#each tasks as tk (tk.id)}
    <div class="task" class:done={tk.done} class:mine={!tk.done && tk.owner===room.me} class:waitTask={waiting(tk)} data-task={tk.id}>
      <input type="checkbox" checked={tk.done} aria-label={vb.t('Feita')} onchange={()=>send({t:'task.toggle',id:tk.id})}/>
      {#if edit===tk.id}
        <input class="tedit" bind:value={title} onblur={()=>save(tk)} onkeydown={e=>{if(e.key==='Enter')save(tk);if(e.key==='Escape')save(tk,false);}} use:focus/>
      {:else}
        <span class="tt" title={vb.t('Clique para editar')} role="button" tabindex="0" onclick={()=>{edit=tk.id;title=tk.title;}} onkeydown={e=>{if(e.key==='Enter'){edit=tk.id;title=tk.title;}}}>{tk.title}{#if tk.flags?.length}<span class="vnote" title={`@vibe: ${tk.flags.join(' · ')}`}>{@html vb.icon('alert',12)} {tk.flags.join(' · ')}</span>{/if}</span>
      {/if}
      <select class="towner" class:set={!!tk.owner} data-owner={tk.id} aria-label={vb.t('Responsável')} value={tk.owner || ''} onchange={e=>send({t:'task.assign',id:tk.id,owner:e.currentTarget.value})}>
        <option value="">{vb.t('sem dono')}</option>{#each room.members || [] as email}<option value={email}>{email===room.me?vb.t('você'):vb.name(email)}</option>{/each}
      </select>
      <button type="button" class="due" class:set={!!tk.due} data-due={tk.id} title={vb.t('Prazo')} onclick={()=>due(tk)}>{@html vb.icon('calendar',13)}{tk.due ? ` ${tk.due}` : ''}</button>
      <button class="ghost x" data-tdel={tk.id} aria-label={vb.t('Apagar task')} title={vb.t('Apagar task')} onclick={()=>send({t:'task.del',id:tk.id})}>{@html vb.icon('x')}</button>
    </div>
  {/each}
  <form class="row" id="newTask" style="margin-top:6px" onsubmit={e=>{e.preventDefault();if(newTitle.trim())send({t:'task.add',epic:thread,title:newTitle});newTitle='';}}><input placeholder={vb.t('nova task')} bind:value={newTitle}/><button aria-label={vb.t('Nova tarefa')}>{@html vb.icon('plus')}</button></form>
{/if}
<script lang="ts" module>
  function focus(node: HTMLInputElement) { node.focus();node.select(); }
</script>
