// Actual Hono route + SQL/R2 read ports. Unit fixtures, not live Worker/cache/history acceptance.
import { expect, mock, test } from "bun:test";
import { Hono } from "hono";
import type { Ctx } from "../src/index";
mock.module("cloudflare:workers", () => ({ DurableObject: class {}, WorkerEntrypoint: class {}, env: {} }));
const { mountAppDocumentFiles, isAppDocumentNavigation } = await import("../src/appDocumentFile");
const { fileHeaders } = await import("../src/rooms");
const nonce = "ab".repeat(32);
function fixture() {
  let member = true, signedIn = true, type = "text/html", missing = false;
  const reads: { kind: string; value: unknown }[] = [];
  const writes: string[] = [];
  const source = '<!doctype html><html><head><title>Controlled app</title></head><body><img src="./chart.png"><script>window.syntheticApp=true</script></body></html>';
  const env = {
    DB: { prepare(sql: string) { reads.push({kind:"sql",value:sql});return {bind(...args: unknown[]) { reads.push({kind:"bind",value:args});return { async first() { return member ? {yes:1} : null; },async run() { writes.push("sql");return {}; } };} };} },
    FILES: { async get(key: string) { reads.push({kind:"r2",value:key});return missing ? null : {httpMetadata:{contentType:type},customMetadata:{name:"apps/controlled.html"},async text(){return source;}};}, async put(){writes.push("r2");} },
  };
  const app = new Hono<Ctx>();
  app.use("*",async(c,next)=>{if(signedIn)c.set("email","owner@example.test");await next();});
  mountAppDocumentFiles(app);
  return {reads,writes,source,member:(v:boolean)=>member=v,signedIn:(v:boolean)=>signedIn=v,type:(v:string)=>type=v,missing:()=>missing=true,
    request(body:BodyInit=`nonce=${nonce}`,headers:Record<string,string>={},query="") {return app.request(`https://vibebook.test/api/books/abcdef/files/0123456789abcdef${query}`,{method:"POST",headers:{origin:"https://vibebook.test","content-type":"application/x-www-form-urlencoded",...headers},body},env);}
  };
}
test("bound HTML form navigation retains same file identity, doctype, base and exact sandbox policy without writes",async()=>{
 const f=fixture(),res=await f.request();expect(res.status).toBe(200);const html=await res.text();
 expect(html.toLowerCase().startsWith("<!doctype html>")).toBe(true);expect(html).toContain(f.source.slice(f.source.indexOf("<html>")));expect(html).toContain(nonce);
 expect(html.indexOf(nonce)<html.indexOf("window.syntheticApp")).toBe(true);expect(html).not.toContain("<base");
 const normal=new Headers(fileHeaders("text/html","apps/controlled.html"));for(const header of ["content-type","content-disposition","content-security-policy","x-content-type-options","referrer-policy","cross-origin-opener-policy","vary"])expect(res.headers.get(header)).toBe(normal.get(header));
 expect(res.headers.get("content-security-policy")).toContain("sandbox allow-scripts;");expect(res.headers.get("content-security-policy")).toContain("connect-src 'none'");expect(res.headers.get("cache-control")).toBe("private, no-store");for(const h of ["etag","last-modified","content-length","accept-ranges"])expect(res.headers.get(h)).toBeNull();
 expect(f.reads.filter(x=>x.kind==='r2')).toEqual([{kind:'r2',value:'abcdef/0123456789abcdef'}]);expect(f.writes).toEqual([]);
});
test("unauthenticated, foreign/missing Origin, cross-site and departed members never read private file bytes",async()=>{
 for(const mode of ['signed-out','foreign','missing-origin','cross-site','departed'] as const){const f=fixture();if(mode==='signed-out')f.signedIn(false);if(mode==='departed')f.member(false);const res=await f.request(undefined,mode==='foreign'?{origin:'https://foreign.test'}:mode==='missing-origin'?{origin:''}:mode==='cross-site'?{'sec-fetch-site':'cross-site'}:{});expect(res.status).toBe(mode==='signed-out'?401:403);expect(f.reads.some(x=>x.kind==='r2')).toBe(false);expect(f.writes).toEqual([]);expect(await res.text()).not.toContain(nonce);}
});
test("strict nonce form rejects duplicates, extra fields, invalid/oversized encoding, multipart/File, query and Range",async()=>{
 for(const [body,headers,query] of [
  ['nonce='+nonce+'&nonce='+nonce,{},''],['nonce='+nonce+'&x=1',{},''],['nonce='+nonce.toUpperCase(),{},''],['nonce='+'a'.repeat(63),{},''],['nonce='+'a'.repeat(1024),{},''],['nonce=%FF',{},''],['{}',{'content-type':'application/json'},''],['nonce='+nonce,{range:'bytes=0-9'},''],['nonce='+nonce,{},'?esc=1'],['nonce='+nonce,{},'?nonce='+nonce],
 ] satisfies [string,Record<string,string>,string][]){const f=fixture(),r=await f.request(body,headers,query);expect(r.status>=400).toBe(true);expect(f.reads).toEqual([]);expect(f.writes).toEqual([]);}
 const f=fixture(),form=new FormData();form.set('nonce',new File(['synthetic'],'nonce.txt'));expect((await f.request(form,{'content-type':'multipart/form-data; boundary=synthetic'})).status).toBe(415);expect(f.reads).toEqual([]);expect(f.writes).toEqual([]);
});
test("nonHTML/missing objects fail closed and a later membership loss is rechecked before each navigation",async()=>{
 const f=fixture();f.type('text/plain');expect((await f.request()).status).toBe(415);f.type('text/html');expect((await f.request()).status).toBe(200);f.member(false);const before=f.reads.filter(x=>x.kind==='r2').length;expect((await f.request()).status).toBe(403);expect(f.reads.filter(x=>x.kind==='r2').length).toBe(before);expect(f.writes).toEqual([]);const gone=fixture();gone.missing();expect((await gone.request()).status).toBe(404);expect(gone.writes).toEqual([]);
});
test("only exact read-only document navigation POST bypasses mutation personal-channel poke",()=>{
 for(const method of ['GET','HEAD','PUT','DELETE'])expect(isAppDocumentNavigation({method,url:'https://vibebook.test/api/books/abcdef/files/0123456789abcdef'})).toBe(false);
 for(const path of ['/api/books/abcdef/files','/api/books/abcdef/files/0123456789abcdef/extra','/api/books/abcdef/upload','/api/me'])expect(isAppDocumentNavigation({method:'POST',url:'https://vibebook.test'+path})).toBe(false);
 expect(isAppDocumentNavigation({method:'POST',url:'https://vibebook.test/api/books/abcdef/files/0123456789abcdef'})).toBe(true);
});
