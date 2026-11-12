// Check the actual browser graph and ensure its committed assets match its sources.
import {readdir, readFile} from 'node:fs/promises';
const dir=new URL('../public/svelte/',import.meta.url);
async function snapshot(){
  const files=(await readdir(dir)).filter(name=>name.endsWith('.js')).sort();
  const assets: Array<readonly [string,string]>=await Promise.all(files.map(async name=>[`svelte/${name}`,await readFile(new URL(name,dir),'utf8')] as const));
  assets.push(['app.html',await readFile(new URL('../public/app.html',import.meta.url),'utf8')]);
  return new Map(assets);
}
const before=await snapshot();
const build=Bun.spawn(['bun','run','build:ui'],{stdout:'inherit',stderr:'inherit'});
if(await build.exited!==0)process.exit(1);
const after=await snapshot();
const changed=[...new Set([...before.keys(),...after.keys()])].filter(name=>before.get(name)!==after.get(name));
if(changed.length){console.error(`Generated UI assets were stale: ${changed.join(', ')}. Review and commit public/app.html and all public/svelte/*.js files, then rerun check.`);process.exit(1);}
console.log('PASS actual client graph and generated UI asset consistency');
