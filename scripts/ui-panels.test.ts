import { afterEach, describe, expect, test } from 'bun:test';
import { plugin } from 'bun';
import { readFileSync } from 'node:fs';
import { compile } from 'svelte/compiler';
import { Window } from 'happy-dom';
import type { Room } from '../svelte/roomStore';
import type { RoomCommand } from '../shared/commands';
import type { PanelBridge, PanelProps } from '../svelte/panels';

// Compile the real components, then run their DOM events with the browser Svelte
// runtime. Run with: bun test --conditions=browser scripts/ui-panels.test.ts
const window = new Window({url:'http://localhost/'});
for (const key of ['window','document','navigator','Node','Element','HTMLElement','HTMLInputElement','HTMLMediaElement','HTMLSelectElement','HTMLTextAreaElement','SVGElement','DocumentFragment','Text','Comment','MutationObserver','Event','MouseEvent','KeyboardEvent','CustomEvent','localStorage']) {
  const value = key === 'window' ? window : Reflect.get(window,key);
  Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
}
plugin({name:'svelte-panel-tests',setup(build){build.onLoad({filter:/\.svelte$/},args=>({contents:compile(readFileSync(args.path,'utf8'),{filename:args.path,generate:'client',css:'injected'}).js.code,loader:'js'}));}});
const { flushSync } = await import('svelte');
const { mountView } = await import('../svelte/main');
const vb:PanelBridge={t:(s,vars)=>s.replace(/\{(\w+)\}/g,(_,key)=>String(vars?.[key]??'')),icon:()=>'<svg></svg>',avatar:email=>`<span>${email}</span>`,ago:()=> 'agora',name:email=>email,color:()=> '#123456',initials:s=>s.slice(0,2),locale:'en-US'};
const fixture=():Room=>({id:'r',me:'me@test',book:{title:'Room',owner:'me@test'},members:['me@test','you@test'],online:[],messages:[],typing:{},suggestions:[],epics:[{id:'e',title:'Epic',tasks:[{id:'t',title:'Original title',done:false,status:'todo',owner:'me@test'}]}]});
const active:ReturnType<typeof mountView>[]=[];
const originalFetch=globalThis.fetch;
afterEach(()=>{globalThis.fetch=originalFetch;for(const c of active.splice(0))c.destroy();window.document.body.innerHTML='';window.localStorage.clear();});
function render(kind:'tasks'|'board'|'files'|'reminders',room:Room,extra:Partial<PanelProps>={}){const target=window.document.createElement('div');window.document.body.append(target);const events:RoomCommand[]=[];const props:PanelProps={room,thread:'e',vb,send:event=>{events.push(event);return true;},...extra};const view=mountView(kind,target as unknown as Element,props);active.push(view);flushSync();return {target,events,update(next:Room){view.update({...props,room:next});}};}
function change(el:Element){el.dispatchEvent(new window.Event('change',{bubbles:true}));flushSync();}

describe('native Svelte room panels',()=>{
  test('tasks send canonical toggles, assignment and rename without flag text entering title',()=>{
    const room=fixture();room.epics[0].tasks[0].flags=['review note'];
    const {target,events}=render('tasks',room);
    const checkbox=target.querySelector('input[type=checkbox]')!;change(checkbox as unknown as Element);
    const owner=target.querySelector('select')!;owner.value='you@test';change(owner as unknown as Element);
    (target.querySelector('.tt') as unknown as HTMLElement).click();flushSync();
    const edit=target.querySelector<HTMLInputElement>('.tedit')!;expect(edit.value).toBe('Original title');edit.value='New title';edit.dispatchEvent(new window.Event('input',{bubbles:true}));edit.dispatchEvent(new window.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));flushSync();
    expect(events).toEqual([{t:'task.toggle',id:'t'},{t:'task.assign',id:'t',owner:'you@test'},{t:'task.rename',id:'t',title:'New title'}]);
  },30_000);
  test('board supports keyboard status moves and native list navigation',()=>{
    const opened:string[]=[];const {target,events}=render('board',fixture(),{onopen:id=>opened.push(id)});
    target.querySelector('.kcard')!.dispatchEvent(new window.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));flushSync();
    expect(events).toEqual([{t:'task.status',id:'t',status:'doing'}]);
    (target.querySelector('[data-mode=list]') as unknown as HTMLElement).click();flushSync();
    (target.querySelector('.krow') as unknown as HTMLElement).click();expect(opened).toEqual(['e']);
  },30_000);
  test('files group versions in folders, filter and send pin events',()=>{
    const room=fixture();room.files=[{id:'new',name:'docs/note.md',type:'text/markdown',author:'me@test',ts:2,size:40},{id:'old',name:'docs/note.md',type:'text/markdown',author:'me@test',ts:1,size:20},{id:'img',name:'photo.png',type:'image/png',author:'me@test',ts:3,size:100}];
    const {target,events}=render('files',room);(target.querySelector('[data-fdir=docs]') as unknown as HTMLElement).click();flushSync();
    expect(target.querySelectorAll('a.ftile').length).toBe(1);expect(target.textContent).toContain('2 versões');
    (target.querySelector('.pinBtn') as unknown as HTMLElement).click();expect(events).toEqual([{t:'pin.add',kind:'file',ref:'new'}]);
    (target.querySelector('[data-fkind=img]') as unknown as HTMLElement).click();flushSync();expect(target.querySelectorAll('a.ftile').length).toBe(1);expect(target.querySelector('a.ftile')?.getAttribute('data-name')).toBe('photo.png');
  },30_000);
  test('reminders preserve draft across a server reminder update',()=>{
    const room=fixture();room.reminders=[{id:'rem',name:'daily',text:'Every day at 9',owner:'me@test',enabled:true}];
    const {target,events,update}=render('reminders',room);(target.querySelector('#remNew') as unknown as HTMLElement).click();flushSync();
    const text=target.querySelector<HTMLTextAreaElement>('textarea')!;text.value='Every Monday at 10: report';text.dispatchEvent(new window.Event('input',{bubbles:true}));
    const on=target.querySelector<HTMLInputElement>('[data-rem-on]')!;on.checked=false;change(on as unknown as Element);
    expect(events).toEqual([{t:'reminder.enable',id:'rem',on:false}]);update({...room,reminders:room.reminders?.map(r=>({...r,enabled:false}))});expect(target.querySelector<HTMLTextAreaElement>('textarea')?.value).toBe('Every Monday at 10: report');
  },30_000);
  test('reminder upload displays typed schedule and HTTP errors without losing draft',async()=>{
    const calls:{url:string;init?:RequestInit}[]=[];
    let status=200;
    globalThis.fetch=(async(input:Parameters<typeof fetch>[0],init?:RequestInit)=>{
      calls.push({url:String(input),init});
      return new Response(JSON.stringify(status===200?{id:'upload',name:'reminders/daily.md',type:'text/markdown',size:30,author:'me@test',ts:1,reminder:{ok:false,error:'Schedule needs a time'}}:{error:'Upload rejected'}),{status});
    }) as typeof fetch;
    const {target}=render('reminders',fixture());
    (target.querySelector('#remNew') as unknown as HTMLElement).click();flushSync();
    const name=target.querySelector<HTMLInputElement>('input[name=name]')!;
    name.value='daily.md';name.dispatchEvent(new window.Event('input',{bubbles:true}));
    const text=target.querySelector<HTMLTextAreaElement>('textarea')!;
    text.value='Every Monday: report';text.dispatchEvent(new window.Event('input',{bubbles:true}));
    target.querySelector('form')!.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));
    await new Promise(resolve=>setTimeout(resolve,0));flushSync();
    expect(calls[0].url).toBe('/api/books/r/files');
    expect(calls[0].init?.headers).toEqual({'content-type':'text/markdown','x-filename':'reminders%2Fdaily.md'});
    expect(target.querySelector('#remErr')?.textContent).toContain('Schedule needs a time');
    expect(target.querySelector<HTMLInputElement>('input[name=name]')?.readOnly).toBe(true);
    expect(target.querySelector<HTMLTextAreaElement>('textarea')?.value).toBe('Every Monday: report');
    status=400;
    target.querySelector('form')!.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));
    await new Promise(resolve=>setTimeout(resolve,0));flushSync();
    expect(target.querySelector('#remErr')?.textContent).toBe('Upload rejected');
    expect(target.querySelector<HTMLTextAreaElement>('textarea')?.value).toBe('Every Monday: report');
  },30_000);

});

describe('native Svelte chat',()=>{
  const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
  const message=(id:number,text:string):import('../svelte/chatTypes').ChatMessage=>({id,text,thread:'e',author:'you@test',kind:'agent',ts:id*1000});
  const bridge=(overrides:Partial<import('../svelte/chatTypes').ChatBridge>={}):import('../svelte/chatTypes').ChatBridge=>({
    t:vb.t,icon:vb.icon,name:vb.name,avatar:vb.avatar,agentAvatar:email=>`<span class="avatar">${escape(email)}</span>`,ago:vb.ago,hhmm:()=> '09:00',continues:()=>false,waiting:()=>false,
    remHtml:m=>`<div class="msg remMsg" id="m${m.id}"><div class="body">${escape(m.text)}</div></div>`,
    issueHtml:m=>`<div class="msg issueMsg" id="m${m.id}">${escape(m.text)}</div>`,isNotice:m=>m.author==='ai'&&m.tag==='notice',noticeHtml:m=>`<div class="msg noticeMsg" id="m${m.id}">${escape(m.text)}</div>`,
    mentions:s=>s,md:s=>`<p>${escape(s)}</p>`,linkify:s=>s,esc:escape,quoteHtml:id=>`<button class="quote" data-quote="${id}">Quoted message ${id}</button>`,attHtml:()=>'',cardHtml:()=>'',choiceHtml:()=>'',pollHtml:()=>'',threadCards:()=>'',...overrides,
  });
  function renderChat(room:Room,extra:Partial<import('svelte').ComponentProps<typeof import('../svelte/Chat.svelte').default>>={}) {
    const target=window.document.createElement('div');window.document.body.append(target);
    const props={room,thread:'e',list:room.messages,more:false,replyCount:0,vb:bridge(),onloadolder:()=>{},...extra};
    const view=mountView('chat',target as unknown as Element,props);active.push(view);
    return {target,update(next:Room,vb=props.vb){view.update({...props,room:next,list:next.messages,vb});}};
  }
  test('streaming typing notes and repeated text updates retain native message anchors',()=>{
    let room:Room={...fixture(),messages:[message(1,'')],typing:{'1':'smart'}};
    const {target,update}=renderChat(room,{vb:bridge({typingLabel:()=> 'com calma',typingNote:()=> '<img src=x onerror=alert(1)> Working'})});
    const row=target.querySelector('#m1')!;
    expect(row.querySelector('.typing')?.textContent).toBe('<img src=x onerror=alert(1)> Working…');
    expect(row.querySelector('img')).toBeNull();
    for(const text of ['H','Hello','Hello **world**','Final response']) {
      room={...room,messages:[message(1,text)],typing:{}};
      update(room);
      expect(target.querySelector('#m1')).toBe(row);
      expect(row.querySelector('.txt')?.textContent).toBe(text);
      expect(row.querySelector('.typing')).toBeNull();
    }
    update({...room,messages:[...room.messages,message(2,'next reply')]});
    expect(target.querySelectorAll('.msg')).toHaveLength(2);
    expect(target.querySelectorAll('[data-reply="1"]')).toHaveLength(1);
  },30_000);
  test('quotes, native actions, origin and quiet notices survive chat refresh',()=>{
    const origin=message(7,'Original request');
    const reply={...message(8,'A response'),reply_to:7};
    const notice={...message(9,'Archived safely'),author:'ai',tag:'notice'};
    const room={...fixture(),messages:[reply,notice]};
    let pages=0;
    const {target,update}=renderChat(room,{origin,more:true,replyCount:2,onloadolder:()=>pages++});
    expect(target.querySelector('.origin #m7')).toBeNull();
    expect(target.querySelector('.origin [data-gomain="7"]')).not.toBeNull();
    expect(target.querySelector('#m8 .quote')?.getAttribute('data-quote')).toBe('7');
    expect(target.querySelector('#m9.noticeMsg')?.textContent).toBe('Archived safely');
    expect(target.querySelector('#m8 [data-copylink="8"]')).not.toBeNull();
    (target.querySelector('#olderBtn') as unknown as HTMLElement).click();expect(pages).toBe(1);
    update({...room,messages:[{...reply,text:'Updated response'},notice]});
    expect(target.querySelector('#m8 .txt')?.textContent).toBe('Updated response');
    expect(target.querySelectorAll('.origin')).toHaveLength(1);
    expect(target.querySelectorAll('#m9')).toHaveLength(1);
  },30_000);
});
