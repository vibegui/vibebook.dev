# Private diagnostic only: two controls, no application/public output.
import struct,json,hashlib,resource,sys
import fontTools,brotli
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import WOFF2FlavorData
root=Path(__file__).resolve().parents[2]
assert sys.version_info[:3]==(3,13,11) and fontTools.__version__=='4.68.0' and brotli.__version__=='1.2.1'
assert len(sys.argv)==2, 'Pass a private output directory outside Git repositories'
out=Path(sys.argv[1]).resolve();assert not out.is_relative_to(root) and not any((p/'.git').exists() for p in [out,*out.parents]), 'Never generate application/repository assets'
out.mkdir(parents=True,exist_ok=True)
originalPath=root/'public/fonts/studio/InterVariable-693b77d4f3.woff2'
retainedPath=root/'scripts/fixtures/font-forensics/retained-inter-a189496942.woff2'
sha=lambda x:hashlib.sha256(x).hexdigest()
assert sha(originalPath.read_bytes())=='693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3'
assert sha(retainedPath.read_bytes())=='a1894969422b49bcd0e473ad2a4686b3537aedd38bf7db36a9d20747f7887903'
a=TTFont(originalPath,lazy=True,recalcBBoxes=False,recalcTimestamp=False);b=TTFont(retainedPath,lazy=True,recalcBBoxes=False,recalcTimestamp=False)
rawA={t:a.reader[t] for t in a.reader.keys()};rawB={t:b.reader[t] for t in b.reader.keys()}
assert set(rawA)==set(rawB)
assert rawA['head'][:8]+rawA['head'][12:]==rawB['head'][:8]+rawB['head'][12:], 'Input head fields differ beyond checksum'
allowed={'head','cmap','glyf','gvar','loca'}
for t in rawA:
 if t not in allowed:assert rawA[t]==rawB[t],t
# Verify retained raw glyph/variation data for the union of all ORIGINAL cmap mappings of selected codepoints.
selected=set(b.getBestCmap());allGIDs=set();perTable=[]
for table in a['cmap'].tables:
 if not table.isUnicode():continue
 gids={a.getGlyphID(table.cmap[cp]) for cp in selected if cp in table.cmap};allGIDs.update(gids);perTable.append({'platform':table.platformID,'encoding':table.platEncID,'format':table.format,'selectedMappings':len(gids)})
def glyphSlice(raw,gid):
 flag=struct.unpack_from('>h',raw['head'],50)[0];fmt='>I' if flag else '>H';scale=1 if flag else 2;width=4 if flag else 2
 start=struct.unpack_from(fmt,raw['loca'],width*gid)[0]*scale;end=struct.unpack_from(fmt,raw['loca'],width*(gid+1))[0]*scale;return raw['glyf'][start:end]
def variationSlice(raw,gid):
 v=raw['gvar'];flag=struct.unpack_from('>H',v,14)[0]&1;fmt='>I' if flag else '>H';scale=1 if flag else 2;width=4 if flag else 2;base=struct.unpack_from('>I',v,16)[0]
 start=struct.unpack_from(fmt,v,20+width*gid)[0]*scale;end=struct.unpack_from(fmt,v,20+width*(gid+1))[0]*scale;return v[base+start:base+end]
for gid in allGIDs|{0}:
 assert glyphSlice(rawA,gid)==glyphSlice(rawB,gid),gid
 assert variationSlice(rawA,gid)==variationSlice(rawB,gid),gid
assert len(glyphSlice(rawA,0))>0

def checksum(data):
 data+=b'\0'*((-len(data))%4);return sum(struct.unpack('>'+str(len(data)//4)+'I',data))&0xffffffff

def make(name,base,cmap):
 tables={**base,'cmap':cmap};head=bytearray(tables['head']);head[8:12]=b'\0'*4;tables['head']=bytes(head)
 tags=sorted(tables);n=len(tags);power=2**(n.bit_length()-1);header=struct.pack('>IHHHH',0x00010000,n,16*power,power.bit_length()-1,n*16-power*16);directory=bytearray();data=bytearray();headAt=None
 for tag in tags:
  value=tables[tag];offset=12+16*n+len(data);directory.extend(struct.pack('>4sIII',tag.encode(),checksum(value),offset,len(value)));data.extend(value);data.extend(b'\0'*((-len(value))%4))
  if tag=='head':headAt=offset
 sfnt=bytearray(header+directory+data);struct.pack_into('>I',sfnt,headAt+8,(0xb1b0afba-checksum(bytes(sfnt)))&0xffffffff);assert checksum(bytes(sfnt))==0xb1b0afba
 ttf=out/(name+'.ttf');ttf.write_bytes(sfnt);font=TTFont(ttf,lazy=True,recalcBBoxes=False,recalcTimestamp=False);font.flavor='woff2';font.flavorData=WOFF2FlavorData(transformedTables=set());dest=out/(name+'.woff2');font.save(dest,reorderTables=False)
 decoded=TTFont(dest,lazy=True,recalcBBoxes=False,recalcTimestamp=False);assert set(decoded.reader.keys())==set(tables)
 for tag in tables:
  got=decoded.reader[tag];expected=tables[tag]
  if tag=='head':got=got[:8]+b'\0'*4+got[12:];expected=expected[:8]+b'\0'*4+expected[12:]
  assert got==expected,tag
 expected={'cmap-only-trim-inter-diagnostic':'99fcc576132436e781ff7e49deec40358781b659333585cce940c8957d3684da','holes-only-original-cmap-inter-diagnostic':'4d21ed4102d1d794f2b54fbc2e8ac1f107045cc2009ab54ae03b4e98efba33ab'}
 assert sha(dest.read_bytes())==expected[name], 'Pinned private recipe output differs; do not activate'
 record={'diagnosticOnly':True,'accepted':False,'name':name,'bytes':dest.stat().st_size,'sha256':sha(dest.read_bytes()),'sfntSHA256':sha(sfnt),'cmapSHA256':sha(cmap),'allNonHeadDecodedTablesMatchDesign':True,'headOnlyChecksumAllowed':True,'glyphCount':decoded['maxp'].numGlyphs}
 print(json.dumps(record),flush=True);return record
report={'diagnosticOnly':True,'accepted':False,'factorialScope':'Same cmap as existing Retained (format4 trimmed) versus exact original raw cmap (4/12 full); full original glyf/gvar versus exact existing Retained holes. Container untransformed for both new controls. Not separating cmap format from coverage yet.','originalSHA256':sha(originalPath.read_bytes()),'retainedSHA256':sha(retainedPath.read_bytes()),'originalCmapSubtables':perTable,'selectedCodepoints':len(selected),'allOriginalSubtableSelectedGIDUnion':len(allGIDs),'nominalUnionRetainedRawGlyphAndVariationBlocksVerified':True,'controls':[]}
report['controls'].append(make('cmap-only-trim-inter-diagnostic',rawA,rawB['cmap']))
report['controls'].append(make('holes-only-original-cmap-inter-diagnostic',rawB,rawA['cmap']))
report['gaps']=['B advertises original non-selected codepoints whose glyf slots are intentionally empty: never a deployable font or an all-Unicode fidelity claim','A has all original raw glyf/gvar/layout/metrics and changes only cmap plus head checksum','Browser sanitizer/shaping/raster unrun; all controls inactive','Equal quote raster in one branch would narrow factors, not independently prove a particular cmap parser implementation bug']
report['procStatus']='\n'.join(x for x in Path('/proc/self/status').read_text().splitlines() if x.startswith(('VmHWM:','VmRSS:')));report['ruMaxRSSKiB']=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
(out/'cmap-factorial.json').write_text(json.dumps(report,indent=2));print(json.dumps({'complete':True,'procStatus':report['procStatus']}))
