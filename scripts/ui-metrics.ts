// Paired local measurements; this reports observations, not a production latency claim.
import {chromium, expect as baseExpect} from '@playwright/test';
import {execFileSync} from 'node:child_process';
import {readFile, readdir, mkdir, writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const expect=baseExpect.configure({timeout:60_000});
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:8797';
if(!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base))throw Error('Use local test Worker');
const out=process.env.TEST_OUTPUT_DIR || '/tmp/vibebook-browser-check';await mkdir(out,{recursive:true});
const baseline=execFileSync('git',['show','30bcc5f:public/app.html']);
const oldUI=execFileSync('git',['show','30bcc5f:public/svelte/ui.js']);
const files=['public/app.html','public/app.css',...(await readdir('public/svelte')).filter(f=>f.endsWith('.js')&&f!=='ui.js').map(f=>`public/svelte/${f}`)];
const current=await Promise.all(files.map(f=>readFile(f)));
const sizes={baseline:{initialRawBytes:baseline.length,initialGzipBytes:gzipSync(baseline).length,inboxAdditionalGzipBytes:gzipSync(oldUI).length},current:{initialRawBytes:current.reduce((a,b)=>a+b.length,0),initialGzipBytes:current.reduce((a,b)=>a+gzipSync(b).length,0),files}};
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-gpu']});
const timings:{variant:string;ms:number;threadSwitchMs:number;heapBytes:number;taskSeconds:number;nodes:number}[]=[];
try{
  const context=await browser.newContext({viewport:{width:1440,height:1000},locale:'en-US',reducedMotion:'reduce'});
  const r=await context.request.get(`${base}/api/me`,{timeout:120_000});const me=await r.json() as {books:{id:string}[]};
  const id=me.books[0]?.id;if(!id)throw Error('Run browser-check first to seed a local room');
  // Alternate variants to reduce systematic server warm-up bias; isolated contexts avoid the app room cache.
  for(const variant of ['before','after','before','after','before','after']){
    const ctx=await browser.newContext({viewport:{width:1440,height:1000},locale:'en-US',reducedMotion:'reduce'});
    const page=await ctx.newPage();
    await page.route('https://fonts.googleapis.com/**',route=>route.abort());
    await page.route('https://fonts.gstatic.com/**',route=>route.abort());
    await page.route('http://127.0.0.1:47321/**',route=>route.abort());
    await page.route(`${base}/b/**`,route=>route.fulfill({body:variant==='before'?baseline:current[0],contentType:'text/html'}));
    const cdp=await ctx.newCDPSession(page);await cdp.send('Performance.enable');
    if(variant==='before'){
      await page.route(`${base}/svelte/ui.js`,route=>route.fulfill({body:oldUI,contentType:'text/javascript'}));
    }
    const start=Date.now();await page.goto(`${base}/b/${id}`,{waitUntil:'domcontentloaded',timeout:120_000});
    await expect(page.locator('#composer')).toBeVisible({timeout:120_000});
    await expect(page.locator('#side #newEpic')).toBeAttached({timeout:120_000});
    const ms=Date.now()-start;
    const threadSwitchMs=await page.evaluate(async()=>{const button=document.querySelector<HTMLButtonElement>('#side [data-thread]:not([data-thread=main])');if(!button)return 0;const start=performance.now();button.click();await new Promise<void>(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r())));return performance.now()-start;});
    await cdp.send('HeapProfiler.collectGarbage');
    const metrics=(await cdp.send('Performance.getMetrics')).metrics;
    const metric=(name:string)=>metrics.find(m=>m.name===name)?.value || 0;
    timings.push({variant,ms,threadSwitchMs,heapBytes:metric('JSHeapUsedSize'),taskSeconds:metric('TaskDuration'),nodes:metric('Nodes')});console.log(`${variant}: ${ms} ms, switch ${threadSwitchMs.toFixed(1)}ms`);
    if(timings.filter(t=>t.variant===variant).length===1)await page.screenshot({path:`${out}/desktop-${variant}.png`,fullPage:true});
    await ctx.close();
  }
  const median=(v:string)=>timings.filter(t=>t.variant===v).map(t=>t.ms).sort((a,b)=>a-b)[1];
  const result={baselineCommit:'30bcc5f',sizes,timings,medianMs:{before:median('before'),after:median('after')},note:'Local ARM machine, local Worker; fonts and local runner blocked in both variants. Both HTML variants are fulfilled locally; document server time is excluded. Samples use the same fixture room. Includes client asset loading from the local Worker; local CPU/memory only. Not a production benchmark.'};
  await writeFile(`${out}/metrics.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}
