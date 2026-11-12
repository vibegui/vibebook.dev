// Controlled frontend benchmark. Run test:browser first to capture a real Book snapshot.
import {chromium, expect as baseExpect} from '@playwright/test';
import {execFileSync} from 'node:child_process';
import {readFile, readdir, mkdir, writeFile} from 'node:fs/promises';
import {resolve, sep} from 'node:path';
import {gzipSync} from 'node:zlib';
import {parseRoomEvent, parseRoomCommand} from '../shared/validation';
const expect=baseExpect.configure({timeout:60_000});
const out=process.env.TEST_OUTPUT_DIR || '/tmp/vibebook-browser-check';await mkdir(out,{recursive:true});
const captured=parseRoomEvent(await readFile(`${out}/room-state.json`,'utf8'));
if(captured.t!=='state')throw Error('Benchmark needs a captured Book state event');
const verified=JSON.parse(await readFile(`${out}/results.json`,'utf8')) as {room:string};
const id=verified.room, snapshot=captured;
const baselineCommit='30bcc5f';
const baseline=execFileSync('git',['show',`${baselineCommit}:public/app.html`]);
const oldUI=execFileSync('git',['show',`${baselineCommit}:public/svelte/ui.js`]);
const files=['public/app.html','public/app.css',...(await readdir('public/svelte')).filter(f=>f.endsWith('.js')&&f!=='ui.js').map(f=>`public/svelte/${f}`)];
const current=await Promise.all(files.map(f=>readFile(f)));
const sizes={baseline:{initialRawBytes:baseline.length,initialGzipBytes:gzipSync(baseline).length,inboxAdditionalGzipBytes:gzipSync(oldUI).length},current:{initialRawBytes:current.reduce((a,b)=>a+b.length,0),initialGzipBytes:current.reduce((a,b)=>a+gzipSync(b).length,0),files}};
const publicRoot=resolve('public');
const me={email:snapshot.me,name:'Benchmark user',avatar:null,books:[{id,...snapshot.book,created_at:1,updated_at:1,read_id:0,members:snapshot.members.join(',')}],friends:[],waits:[],v:'benchmark'};
// Both variants use the same local assets, HTTP data and captured WebSocket events.
// This isolates browser work from Worker startup, database latency and AI/background activity.
const server=Bun.serve({hostname:'127.0.0.1',port:0,fetch(request){
  const path=new URL(request.url).pathname;
  if(path==='/api/me')return Response.json(me);
  if(path.startsWith('/api/'))return Response.json({agents:[],sandboxes:[],rooms:[],books:[]});
  const file=resolve(publicRoot,`.${path}`);
  if(!file.startsWith(publicRoot+sep))return new Response('not found',{status:404});
  return new Response(Bun.file(file),{headers:{'cache-control':'no-store'}});
}});
const base=server.url.origin;
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-gpu']});
const timings:{variant:string;ms:number;threadSwitchMs:number;heapBytes:number;taskSeconds:number;nodes:number}[]=[];
try{
  for(const variant of ['before','after','before','after','before','after']){
    const ctx=await browser.newContext({viewport:{width:1440,height:1000},locale:'en-US',reducedMotion:'reduce'});
    await ctx.routeWebSocket('**/ws-me',()=>{});
    await ctx.routeWebSocket('**/ws/**',socket=>{
      socket.onMessage(raw=>{
        if(typeof raw!=='string')return;
        const command=parseRoomCommand(raw);
        if(command.t==='older')socket.send(JSON.stringify({t:'older',thread:command.thread,messages:[],more:false}));
        if(command.t==='doc.get')socket.send(JSON.stringify({t:'doc',epic:command.epic||'',text:snapshot.docs?.[command.epic||'']||snapshot.doc||'',fetched:true}));
        if(command.t==='files.get')socket.send(JSON.stringify({t:'files',files:snapshot.files||[]}));
      });
      socket.send(JSON.stringify(snapshot));
    });
    const page=await ctx.newPage(), errors:string[]=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('https://fonts.googleapis.com/**',route=>route.abort());
    await page.route('https://fonts.gstatic.com/**',route=>route.abort());
    await page.route('http://127.0.0.1:47321/**',route=>route.abort());
    await page.route(`${base}/b/**`,route=>route.fulfill({body:variant==='before'?baseline:current[0],contentType:'text/html'}));
    if(variant==='before')await page.route(`${base}/svelte/ui.js`,route=>route.fulfill({body:oldUI,contentType:'text/javascript'}));
    const cdp=await ctx.newCDPSession(page);await cdp.send('Performance.enable');
    const start=Date.now();await page.goto(`${base}/b/${id}`,{waitUntil:'domcontentloaded',timeout:60_000});
    await expect(page.locator('#composer')).toBeVisible();await expect(page.locator('#side #newEpic')).toBeAttached();
    const ms=Date.now()-start;
    const threadSwitchMs=await page.evaluate(async()=>{const button=document.querySelector<HTMLButtonElement>('#side [data-thread]:not([data-thread=main])');if(!button)return 0;const start=performance.now();button.click();await new Promise<void>(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r())));return performance.now()-start;});
    await cdp.send('HeapProfiler.collectGarbage');
    const metrics=(await cdp.send('Performance.getMetrics')).metrics;
    const metric=(name:string)=>metrics.find(m=>m.name===name)?.value || 0;
    timings.push({variant,ms,threadSwitchMs,heapBytes:metric('JSHeapUsedSize'),taskSeconds:metric('TaskDuration'),nodes:metric('Nodes')});
    expect(errors).toEqual([]);console.log(`${variant}: ${ms} ms, switch ${threadSwitchMs.toFixed(1)}ms`);
    if(timings.filter(t=>t.variant===variant).length===1)await page.screenshot({path:`${out}/desktop-${variant}.png`,fullPage:true});
    await ctx.close();
  }
  const median=(variant:string,key:keyof Omit<(typeof timings)[number],'variant'>)=>timings.filter(t=>t.variant===variant).map(t=>t[key]).sort((a,b)=>a-b)[1];
  const medians=Object.fromEntries(['before','after'].map(v=>[v,Object.fromEntries(['ms','threadSwitchMs','heapBytes','taskSeconds','nodes'].map(k=>[k,median(v,k as keyof Omit<(typeof timings)[number],'variant'>)]))]));
  const result={baselineCommit,sizes,fixture:{messages:snapshot.messages.length,epics:snapshot.epics.length,tasks:snapshot.epics.reduce((n,e)=>n+e.tasks.length,0)},timings,medians,note:'Controlled local ARM frontend benchmark: same captured real Book snapshot and simulated WS/HTTP delivery, three alternating samples each, fonts/local runner blocked. Includes browser asset loading, rendering and thread switching; excludes actual Worker/database/network latency. Small fixture; not a production performance claim.'};
  await writeFile(`${out}/metrics.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();server.stop(true);}
