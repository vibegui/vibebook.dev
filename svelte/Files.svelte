<script lang="ts">
  import { fileKind, kb, type PanelProps, type RoomFile } from './panels';
  let { room, vb, send }: PanelProps = $props();
  const kinds=[['all','Tudo'],['img','Imagens'],['md','Markdown'],['txt','Texto e CSV'],['html','HTML'],['pdf','PDF'],['audio','Áudios'],['other','Outros']];
  let kind=$state('all'), dir=$state('');
  const files=$derived(room.files || []);
  const counts=$derived.by(()=>{const n:Record<string,number>={all:files.length};for(const f of files){const k=fileKind(f);n[k]=(n[k] || 0)+1;}return n;});
  const activeKind=$derived(counts[kind]?kind:'all');
  const shown=$derived(files.filter(f=>activeKind==='all'||fileKind(f)===activeKind));
  const dirOf=(f:RoomFile)=>f.name.includes('/')?f.name.slice(0,f.name.lastIndexOf('/')):'';
  const activeDir=$derived(dir && shown.some(f=>dirOf(f)===dir || dirOf(f).startsWith(dir+'/'))?dir:'');
  const pre=$derived(activeDir?activeDir+'/':'');
  $effect(()=>{if(!counts[kind])kind='all';if(dir && activeDir!==dir)dir='';});
  function enter(e:MouseEvent,next:string){dir=next;const pane=(e.currentTarget as HTMLElement).closest<HTMLElement>('#filesPane');if(pane)pane.scrollTop=0;}
  const view=$derived.by(()=>{const dirs=new Map<string,number>(), here:RoomFile[]=[];for(const f of shown){const d=dirOf(f);if(d===activeDir)here.push(f);else if(d.startsWith(pre)){const sub=d.slice(pre.length).split('/')[0];dirs.set(sub,(dirs.get(sub)||0)+1);}}const versions:Record<string,number>={};if(activeDir)for(const f of here)versions[f.name]=(versions[f.name]||0)+1;return {dirs:[...dirs].sort((a,b)=>a[0].localeCompare(b[0])),list:activeDir?here.filter((f,i)=>here.findIndex(x=>x.name===f.name)===i):here,versions};});
  const url=(f:RoomFile)=>`/api/books/${room.id}/files/${f.id}`;
  const pin=(f:RoomFile)=>room.pins?.find(p=>p.kind==='file'&&p.ref===f.id);
  function toggle(e:MouseEvent,f:RoomFile){e.preventDefault();e.stopPropagation();const p=pin(f);send(p?{t:'pin.del',id:p.id}:{t:'pin.add',kind:'file',ref:f.id});}
</script>
{#if files.length}
  {#if counts.all>1}<div class="ftabs">{#each kinds.filter(([k])=>counts[k]) as [k,label]}<button type="button" class="ftab" class:on={k===activeKind} data-fkind={k} onclick={()=>kind=k}>{vb.t(label)} <small>{counts[k]}</small></button>{/each}</div>{/if}
  {#if activeDir}<div class="fcrumb"><button type="button" class="ghost" data-fdir={activeDir.includes('/')?activeDir.slice(0,activeDir.lastIndexOf('/')):''} onclick={e=>enter(e,activeDir.includes('/')?activeDir.slice(0,activeDir.lastIndexOf('/')):'')}>← {vb.t('voltar')}</button><b>{@html vb.icon('folder',14)} {activeDir}/</b></div>{/if}
  <div class="fgrid">
    {#each view.dirs as [d,n]}<button type="button" class="ftile fdir" data-fdir={pre+d} onclick={e=>enter(e,pre+d)}><div class="thumb">{@html vb.icon('folder',34)}</div><b>{d}/</b><small>{n===1?vb.t('1 arquivo'):vb.t('{n} arquivos',{n})}</small></button>{/each}
    {#each view.list as f (f.id)}
      <a class="ftile" href={url(f)} target="_blank" rel="noopener" title={f.name} data-view={f.type.startsWith('image/')?'img':'frame'} data-name={f.name}>
        <div class="thumb">{#if f.type.startsWith('image/')}<img src={url(f)} alt={f.name} loading="lazy"/>{:else}{@html vb.icon(f.type==='text/html'?'globe':f.type.startsWith('audio/')?'mic':'file',30)}{/if}</div>
        <b>{f.name.slice(pre.length)}</b><small>{vb.name(f.author)} · {vb.ago(f.ts)} · {view.versions[f.name]>1?vb.t('{n} versões',{n:view.versions[f.name]}):kb(f.size)}</small>
        <button type="button" class="ghost pinBtn" class:on={!!pin(f)} data-pin-kind="file" data-pin-ref={f.id} title={vb.t(pin(f)?'Desafixar':'Fixar na lateral')} aria-label={vb.t(pin(f)?'Desafixar':'Fixar na lateral')} aria-pressed={!!pin(f)} onclick={e=>toggle(e,f)}>{@html vb.icon('pin',14)}</button>
      </a>
    {/each}
  </div>
  {#if !view.list.length && !view.dirs.length}<div class="empty">{vb.t('Nada aqui.')}</div>{/if}
{:else}<div class="empty">{vb.t('Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.')}</div>{/if}
