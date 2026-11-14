// Real browser/MessagePort unit-integration matrix. No Worker, provider or canonical mutations.
import { expect, type Page } from "@playwright/test";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

type Mode = "sdk" | "legacy" | "held-output" | "held-consent";
type Observation = { kind: string; ok: boolean; id?: number; persisted?: boolean };
type MatrixState = { mode: Mode; reads: number; mutations: number; held: boolean; outputRejected: boolean; revoked: boolean; freshFrame: boolean; observations: Observation[] };
declare global { interface Window { __appDocumentMatrix?: { state: MatrixState; release(): Promise<void>; identity(): {sameElement:boolean;sameWindowProxy:boolean}; dispose(): void } } }
export type AppDocumentAdversarialOptions = { page: Page; hostModuleURL: string; output: string };
export async function auditAppDocumentAdversarial(options: AppDocumentAdversarialOptions) {
 const {page}=options;const output=resolve(options.output,"adversarial");await mkdir(output,{recursive:true});
 const sdk=await readFile(resolve(import.meta.dir,"../node_modules/@modelcontextprotocol/ext-apps/dist/src/app-with-deps.js"));
 const metadata:unknown=JSON.parse(await readFile(resolve(import.meta.dir,"../node_modules/@modelcontextprotocol/ext-apps/package.json"),"utf8"));
 if(!metadata||typeof metadata!=="object"||!("version" in metadata)||metadata.version!=="1.7.4")throw Error("Unexpected stock SDK version");
 let replacementRequests=0;
 const server=Bun.serve({hostname:"127.0.0.1",port:0,fetch(request){const path=new URL(request.url).pathname;if(path==='/sdk.js')return new Response(new Uint8Array(sdk),{headers:{'content-type':'text/javascript','access-control-allow-origin':'*'}});if(path==='/replacement'){replacementRequests++;return new Response(`<!doctype html><script>
 const marker='private-matrix-marker';
 addEventListener('message',e=>{if(JSON.stringify(e.data).includes(marker))parent.postMessage({fixtureMatrix:true,kind:'replacement-leak',ok:false},'*');if(e.data?.id===901)parent.postMessage({fixtureMatrix:true,kind:'replacement-denial',ok:!!e.data.error},'*')});
 // Deliberately skip ui/initialize: authority must cover every raw request.
 parent.postMessage({jsonrpc:'2.0',id:901,method:'tools/call',params:{name:'fixture/private',arguments:{}}},'*');
 </script>`,{headers:{'content-type':'text/html','cache-control':'no-store'}})}return new Response('Not found',{status:404})}});
 const errors:string[]=[];const onError=(e:Error)=>errors.push(e.name);page.on('pageerror',onError);
 const report:{scope:string;status:string;[key:string]:unknown}={scope:'Actual browser opaque srcdoc + second-origin HTTP replacement, real stock SDK1.7.4, custom host receive fixture. No Worker/file POST/provider/real writes.',status:'running'};
 async function state(){return page.evaluate(()=>{const fixture=window.__appDocumentMatrix;if(!fixture)throw Error('Fixture absent');return fixture.state})}
 async function setup(mode:Mode){
  await page.evaluate(async({mode,hostModuleURL,sdkURL})=>{
   const old=window.__appDocumentMatrix;const oldFrame=document.querySelector<HTMLIFrameElement>('[data-matrix-frame]');const oldWindow=oldFrame?.contentWindow;old?.dispose();
   const imported:typeof import('../browser/app-document/host')=await import(/* @vite-ignore */hostModuleURL);
   const frame=document.createElement('iframe');frame.dataset.matrixFrame='';frame.sandbox.add('allow-scripts');document.body.append(frame);
   const state:MatrixState={mode,reads:0,mutations:0,held:false,outputRejected:false,revoked:false,freshFrame:!oldWindow||oldWindow!==frame.contentWindow,observations:[]};
   const initialWindow=frame.contentWindow;let release:()=>Promise<void>=async()=>{};
   const record=(e:MessageEvent<unknown>)=>{const value=e.data;if(e.source!==frame.contentWindow||!value||typeof value!=='object'||!('fixtureMatrix' in value)||value.fixtureMatrix!==true||!('kind' in value)||typeof value.kind!=='string'||!('ok' in value)||typeof value.ok!=='boolean')return;state.observations.push({kind:value.kind,ok:value.ok,...('id' in value&&typeof value.id==='number'?{id:value.id}:{}),...('persisted' in value&&typeof value.persisted==='boolean'?{persisted:value.persisted}:{})})};window.addEventListener('message',record);
   const host=imported.createAppDocumentHost({frame,current:()=>frame.isConnected,revoked:()=>{state.revoked=true},receive(raw:unknown){
    if(!raw||typeof raw!=='object'||!('method' in raw)||!('id' in raw))return;
    const request=raw;
    if(request.method==='ui/initialize'){
     const params='params' in request?request.params:null;const protocol=params&&typeof params==='object'&&'protocolVersion' in params?params.protocolVersion:null;if(typeof protocol!=='string')throw Error('Invalid SDK initialize');
     void host.post({jsonrpc:'2.0',id:request.id,result:{protocolVersion:protocol,hostInfo:{name:'matrix-host',version:'1'},hostCapabilities:{serverTools:{}},hostContext:{theme:'light',displayMode:'inline'}}});return;
    }
    if(request.method!=='tools/call')return;
    const params='params' in request?request.params:null;const name=params&&typeof params==='object'&&'name' in params?params.name:null;
    if(name==='fixture/private'){
     state.reads++;const output=()=>host.post({jsonrpc:'2.0',id:request.id,result:{content:[{type:'text',text:'private-matrix-marker'}]}});
     if(mode==='held-output'){state.held=true;release=async()=>{try{await output()}catch{state.outputRejected=true}}}else void output();
    }else if(name==='fixture/write'){
     state.held=true;release=async()=>{if(!(await host.attest()))return;state.mutations++;await host.post({jsonrpc:'2.0',id:request.id,result:{content:[{type:'text',text:'synthetic-counter-only'}]}})};
    }
   }});host.start();
   const common=`<script>addEventListener('message',e=>{if(e.data?.jsonrpc==='2.0'&&typeof e.data.id==='number')parent.postMessage({fixtureMatrix:true,kind:'legacy-response',id:e.data.id,ok:!!e.data.result&&!e.data.error},'*')});addEventListener('pageshow',e=>parent.postMessage({fixtureMatrix:true,kind:'pageshow',ok:true,persisted:e.persisted},'*'));<\/script>`;
   const body=mode==='sdk'?`<script type="module">import{App}from${JSON.stringify(sdkURL)};const app=new App({name:'real-stock-sdk-matrix',version:'1'},{});try{await app.connect();const r=await app.callServerTool({name:'fixture/private',arguments:{}});parent.postMessage({fixtureMatrix:true,kind:'sdk-positive',ok:r.content?.[0]?.text==='private-matrix-marker'},'*')}catch{parent.postMessage({fixtureMatrix:true,kind:'sdk-positive',ok:false},'*')}<\/script>`:`<script>parent.postMessage({jsonrpc:'2.0',id:1,method:'tools/call',params:{name:${JSON.stringify(mode==='held-consent'?'fixture/write':'fixture/private')},arguments:{}}},'*')<\/script>`;
   host.loadHtml('<!doctype html>'+common+body);
   window.__appDocumentMatrix={state,release:()=>release(),identity:()=>({sameElement:document.querySelector('[data-matrix-frame]')===frame,sameWindowProxy:initialWindow!==null&&frame.contentWindow===initialWindow}),dispose(){host.dispose();window.removeEventListener('message',record);frame.remove()}};
  },{mode,hostModuleURL:options.hostModuleURL,sdkURL:new URL('/sdk.js',server.url).href});
 }
 async function navigate(){const handle=await page.locator('[data-matrix-frame]').elementHandle();if(!handle)throw Error('Frame absent');const frame=await handle.contentFrame();if(!frame)throw Error('Frame realm absent');await frame.evaluate(url=>{location.href=url},new URL('/replacement',server.url).href);await expect.poll(async()=> (await state()).observations.some(x=>x.kind==='replacement-denial'&&x.ok)).toBe(true);expect((await state()).observations.some(x=>x.kind==='replacement-leak')).toBe(false);await expect.poll(()=>frame.url()).toBe(new URL('/replacement',server.url).href);expect(await frame.evaluate(()=>origin)).toBe('null');expect(await page.evaluate(()=>window.__appDocumentMatrix?.identity())).toEqual({sameElement:true,sameWindowProxy:true});return frame}
 try{
  await page.goto(new URL('/',options.hostModuleURL).href);
  await setup('sdk');await expect.poll(async()=>(await state()).observations.some(x=>x.kind==='sdk-positive'&&x.ok)).toBe(true);expect((await state()).reads).toBe(1);report.stockSDK=await state();
  await setup('legacy');await expect.poll(async()=>(await state()).observations.some(x=>x.kind==='legacy-response'&&x.id===1&&x.ok)).toBe(true);expect((await state()).freshFrame).toBe(true);
  const historyFrame=await navigate();expect((await state()).reads).toBe(1);report.directWithoutInitialize=await state();
  // Real subframe history traversal. Report persisted truthfully; non-BFCache restoration is not labeled a BFCache pass.
  await historyFrame.evaluate(()=>history.back());await expect.poll(()=>historyFrame.url()).toBe('about:srcdoc');await expect.poll(()=>historyFrame.evaluate(()=>document.readyState)).toBe('complete');
  await historyFrame.evaluate(()=>parent.postMessage({jsonrpc:'2.0',id:404,method:'tools/call',params:{name:'fixture/private',arguments:{}}},'*'));
  await expect.poll(async()=>(await state()).observations.some(x=>x.kind==='legacy-response'&&x.id===404&&!x.ok)).toBe(true);expect((await state()).reads).toBe(1);report.historyRestoration={state:await state(),actualBFcacheObserved:(await state()).observations.some(x=>x.kind==='pageshow'&&x.persisted===true)};
  await setup('held-output');await expect.poll(async()=>(await state()).held).toBe(true);await navigate();await page.evaluate(()=>window.__appDocumentMatrix?.release());expect((await state()).outputRejected).toBe(true);expect((await state()).reads).toBe(1);report.lateOutput=await state();
  await setup('held-consent');await expect.poll(async()=>(await state()).held).toBe(true);await navigate();await page.evaluate(()=>window.__appDocumentMatrix?.release());expect((await state()).mutations).toBe(0);report.heldConsent=await state();
  // Positive control: explicit fresh open works, and an attested same-document simulated write isn't universally denied.
  await setup('held-consent');await expect.poll(async()=>(await state()).held).toBe(true);await page.evaluate(()=>window.__appDocumentMatrix?.release());expect((await state()).mutations).toBe(1);expect((await state()).freshFrame).toBe(true);report.freshOpen=await state();
  await setup('legacy');await expect.poll(async()=>(await state()).reads).toBe(1);const live=await page.locator('[data-matrix-frame]').elementHandle();const realm=await live?.contentFrame();if(!realm)throw Error('Missing pagehide realm');await realm.evaluate(()=>{dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));parent.postMessage({jsonrpc:'2.0',id:405,method:'tools/call',params:{name:'fixture/private',arguments:{}}},'*')});await expect.poll(async()=>(await state()).observations.some(x=>x.kind==='legacy-response'&&x.id===405&&!x.ok)).toBe(true);expect((await state()).reads).toBe(1);report.persistedLifecycleControl={syntheticEvent:true,state:await state()};
  expect(errors).toEqual([]);expect(replacementRequests).toBe(3);report.replacementHTTPRequests=replacementRequests;report.pageErrors=errors;report.status='passed';report.gaps=['No Worker/file-POST/provider integration; actual Worker probe remains separate','Synthetic persisted-event control is not proof of actual BFCache admission; actual subframe history persisted flag recorded separately'];
  return report;
 }catch(error){report.status='failed';report.errorName=error instanceof Error?error.name:'unknown';report.pageErrors=errors;throw error}
 finally{await page.evaluate(()=>{window.__appDocumentMatrix?.dispose();delete window.__appDocumentMatrix}).catch(()=>{});page.off('pageerror',onError);server.stop(true);await writeFile(resolve(output,'results.json'),JSON.stringify(report,null,2)+'\n')}
}
