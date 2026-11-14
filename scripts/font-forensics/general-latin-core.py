import io,struct,json,hashlib,gc,resource,sys
import fontTools,brotli
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.unicodedata import script
from fontTools.ttLib.woff2 import WOFF2FlavorData
root=Path(__file__).resolve().parents[2]
assert sys.version_info[:3]==(3,13,11) and fontTools.__version__=='4.68.0' and brotli.__version__=='1.2.1'
assert len(sys.argv)==2, 'Pass a private output directory outside the repository'
out=Path(sys.argv[1]).resolve();assert not out.is_relative_to(root) and not any((p/'.git').exists() for p in [out,*out.parents]), 'Never generate into repository/application assets'
out.mkdir(parents=True,exist_ok=True)
source=root/'public/fonts/studio/InterVariable-693b77d4f3.woff2'
sha=lambda x:hashlib.sha256(x).hexdigest()
assert sha(source.read_bytes())=='693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3'
original=TTFont(source,lazy=True,recalcBBoxes=False,recalcTimestamp=False)
order=original.getGlyphOrder();oldMap=original.getBestCmap();raw={tag:original.reader[tag] for tag in original.reader.keys()}
# A whole linguistic/script core, never words harvested from the benchmark.
wanted={cp for cp in oldMap if script(chr(cp)) in {'Latn','Zinh','Zyyy'}}
if 0 in oldMap:wanted.add(0)
assert 0x250 in wanted and all(cp in wanted for cp in oldMap if script(chr(cp))=='Latn')
options=subset.Options();options.retain_gids=True;options.notdef_outline=True;options.glyph_names=True;options.layout_features=['*'];options.layout_scripts=['*'];options.name_IDs=['*'];options.name_languages=['*'];options.hinting=True;options.recalc_bounds=False;options.recalc_timestamp=False
work=TTFont(source,lazy=True,recalcBBoxes=False,recalcTimestamp=False);subsetter=subset.Subsetter(options=options);subsetter.populate(unicodes=wanted);subsetter.subset(work)
kept=set(subsetter.glyphs_retained);kept.add(order[0]);keepGIDs={i for i,name in enumerate(order) if name in kept}
for table in original['cmap'].tables:
 if table.isUnicode():keepGIDs.update(original.getGlyphID(table.cmap[cp]) for cp in wanted if cp in table.cmap)
work.setGlyphOrder(order);newCmap=raw['cmap'] # full original coverage; CSS excludes mapped holes
del work,subsetter;gc.collect()
locaFormat=struct.unpack_from('>h',raw['head'],50)[0];glyphs=struct.unpack_from('>H',raw['maxp'],4)[0];assert glyphs==len(order)
fmt='>I' if locaFormat else '>H';scale=1 if locaFormat else 2;width=4 if locaFormat else 2
oldOffsets=[struct.unpack_from(fmt,raw['loca'],i*width)[0]*scale for i in range(glyphs+1)]
newGlyf=bytearray();newOffsets=[0]
for gid in range(glyphs):
 if gid in keepGIDs:newGlyf.extend(raw['glyf'][oldOffsets[gid]:oldOffsets[gid+1]])
 newOffsets.append(len(newGlyf))
newLoca=b''.join(struct.pack(fmt,p//scale) for p in newOffsets)
# Keep each original variation tuple block and shared tuple metadata byte-for-byte at its original GID.
gv=raw['gvar'];assert struct.unpack_from('>H',gv,12)[0]==glyphs
long=bool(struct.unpack_from('>H',gv,14)[0]&1);gvfmt='>I' if long else '>H';gvwidth=4 if long else 2;gvscale=1 if long else 2;gvbase=struct.unpack_from('>I',gv,16)[0]
gvo=[struct.unpack_from(gvfmt,gv,20+i*gvwidth)[0]*gvscale for i in range(glyphs+1)]
newGvar=bytearray(gv[:gvbase]);blocks=bytearray();positions=[0]
for gid in range(glyphs):
 if gid in keepGIDs:blocks.extend(gv[gvbase+gvo[gid]:gvbase+gvo[gid+1]])
 positions.append(len(blocks))
for i,p in enumerate(positions):struct.pack_into(gvfmt,newGvar,20+i*gvwidth,p//gvscale)
newGvar.extend(blocks)
tables={**raw,'cmap':newCmap,'glyf':bytes(newGlyf),'loca':newLoca,'gvar':bytes(newGvar)}
head=bytearray(tables['head']);head[8:12]=b'\0'*4;tables['head']=bytes(head)
def checksum(b):
 b+=b'\0'*((-len(b))%4);return sum(struct.unpack('>'+str(len(b)//4)+'I',b))&0xffffffff
names=sorted(tables);n=len(names);power=2**(n.bit_length()-1);header=struct.pack('>IHHHH',0x00010000,n,power*16,power.bit_length()-1,n*16-power*16)
directory=bytearray();data=bytearray();headAt=None
for tag in names:
 b=tables[tag];at=12+16*n+len(data);directory.extend(struct.pack('>4sIII',tag.encode(),checksum(b),at,len(b)));data.extend(b);data.extend(b'\0'*((-len(b))%4))
 if tag=='head':headAt=at
sfnt=bytearray(header+directory+data);struct.pack_into('>I',sfnt,headAt+8,(0xb1b0afba-checksum(bytes(sfnt)))&0xffffffff);assert checksum(bytes(sfnt))==0xb1b0afba
candidate=out/'general-latin-core-inter-normal.ttf';candidate.write_bytes(sfnt)
verify=TTFont(candidate,lazy=True,recalcBBoxes=False,recalcTimestamp=False);assert verify['maxp'].numGlyphs==glyphs;assert verify.getBestCmap()==oldMap
assert all(verify.getGlyphID(verify.getBestCmap()[cp])==original.getGlyphID(oldMap[cp]) for cp in wanted)
for tag,b in raw.items():
 if tag not in {'head','cmap','glyf','loca','gvar'}:assert verify.reader[tag]==b,tag
assert oldOffsets[1]>oldOffsets[0];assert bytes(newGlyf[newOffsets[0]:newOffsets[1]])==raw['glyf'][oldOffsets[0]:oldOffsets[1]]
for gid in keepGIDs:
 assert bytes(newGlyf[newOffsets[gid]:newOffsets[gid+1]])==raw['glyf'][oldOffsets[gid]:oldOffsets[gid+1]]
 assert bytes(blocks[positions[gid]:positions[gid+1]])==gv[gvbase+gvo[gid]:gvbase+gvo[gid+1]]
# Untransformed WOFF2 avoids another glyf rewrite; only container encoding/checksum may change.
verify.flavor='woff2';verify.flavorData=WOFF2FlavorData(transformedTables=set());dest=out/'general-latin-core-inter-normal.woff2';verify.save(dest,reorderTables=False)
assert verify.reader['cmap']==raw['cmap'], 'Original cmap must remain exact'
roundtrip=TTFont(dest,lazy=True,recalcBBoxes=False,recalcTimestamp=False)
for tag in tables:
 if tag!='head':assert roundtrip.reader[tag]==verify.reader[tag],tag
report={'diagnosticOnly':True,'accepted':False,'sourceSHA256':sha(source.read_bytes()),'candidateSHA256':sha(dest.read_bytes()),'candidateBytes':dest.stat().st_size,'sfntSHA256':sha(sfnt),'originalGlyphCount':glyphs,'candidateGlyphCount':roundtrip['maxp'].numGlyphs,'retainedGlyphs':len(keepGIDs),'primaryMappedCodepoints':len(wanted),'originalGIDsVerified':True,'originalRetainedGlyfAndGvarBlocksVerified':True,'originalNotdefOutlineVerified':True,'unchangedTables':[x for x in raw if x not in {'head','cmap','glyf','loca','gvar'}],'tools':{'fontTools':'4.68.0','Brotli':'1.2.1','python':'3.13.11'},'gaps':['Browser sanitizer/shaping/raster UNRUN; candidate inactive','Private fontTools Subsetter state glyphs_retained used only as pinned diagnostic closure metadata; no app runtime dependency','No performance savings claim; unchanged full layout and metrics intentionally conservative']}
report['procStatus']='\n'.join(x for x in Path('/proc/self/status').read_text().splitlines() if x.startswith(('VmHWM:','VmRSS:')));report['ruMaxRSSKiB']=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
(out/'general-latin-core-audit.json').write_text(json.dumps(report,indent=2)+'\n')

def ranges(points):
 result=[]
 for cp in sorted(points):
  if result and cp==result[-1][1]+1:result[-1][1]=cp
  else:result.append([cp,cp])
 return result
def inverse(intervals):
 result=[];cursor=0
 for start,end in intervals:
  if cursor<start:result.append([cursor,start-1])
  cursor=end+1
 if cursor<=0x10ffff:result.append([cursor,0x10ffff])
 return result
css=lambda rs:','.join('U+'+format(a,'X')+('-'+format(b,'X') if a!=b else '') for a,b in rs)
complement=set(oldMap)-wanted
assert wanted|complement==set(oldMap) and not wanted&complement
primary_mapped=ranges(wanted);mapped_complement=ranges(complement)
# Unknown codepoints remain eligible for the PRIMARY face, which has the exact
# original cmap and therefore reaches the original system fallback path.
# Only mapped holes are excluded. No unknown character can select a mapped hole.
primary_eligible=inverse(mapped_complement)
all_intervals=sorted(primary_eligible+mapped_complement)
assert all_intervals[0][0]==0 and all_intervals[-1][1]==0x10ffff
assert all(a[1]+1==b[0] for a,b in zip(all_intervals,all_intervals[1:]))
for cp in [0x1f916,0x10ffff]:
 assert cp not in oldMap and any(a<=cp<=b for a,b in primary_eligible)
 assert not any(a<=cp<=b for a,b in mapped_complement)
assert all(any(a<=cp<=b for a,b in primary_eligible) for cp in wanted)
assert all(not any(a<=cp<=b for a,b in primary_eligible) for cp in complement)
previous_path=root/'scripts/fixtures/font-forensics/retained-inter-a189496942.woff2'
assert sha(previous_path.read_bytes())=='a1894969422b49bcd0e473ad2a4686b3537aedd38bf7db36a9d20747f7887903'
previous=set(TTFont(previous_path,lazy=True).getBestCmap())
new_latin=sorted(cp for cp in wanted-previous if script(chr(cp))=='Latn')
assert 0x250 in new_latin
contrasts=sorted({0x250,new_latin[0],new_latin[len(new_latin)//3],new_latin[2*len(new_latin)//3],new_latin[-1]})
samples=['AV Ω VA Ж To','ação “quoted” office ffi € £ $','A\u0483V','AVΩTo','AVЖTo','Ω\u0301 Ж\u0301','A\u0301ɐ\u0303V']
samples += ['AV'+chr(cp)+'To' for cp in contrasts]
manifest={
 'diagnosticOnly':True,'accepted':False,'policy':'All original mapped Unicode Script Latn, Zinh and Zyyy; no text/benchmark-derived glyph selection',
 'sourceSHA256':sha(source.read_bytes()),'candidateSHA256':sha(dest.read_bytes()),'candidateBytes':dest.stat().st_size,
 'selectedCodepoints':sorted(wanted),'originalMappedCodepoints':sorted(oldMap),
 'primaryRanges':primary_eligible,'primaryCSS':css(primary_eligible),'primaryMappedRanges':primary_mapped,
 'controlPrimaryCSS':css(primary_mapped),'mappedComplementRanges':mapped_complement,'mappedComplementCSS':css(mapped_complement),
 'complementRanges':inverse(primary_mapped),'complementCSS':css(inverse(primary_mapped)),
 'unmappedInPrimary':True,'fullOriginalRawCmapVerified':True,'closureGlyphsVerified':len(keepGIDs),
 'notdefVerified':True,'unchangedNonGlyphTablesVerified':True,'mixedSamples':samples,'newLatinContrasts':contrasts,
 'limits':['Inactive normal Inter only; original fonts remain active','Primary contains all unmapped codepoints and all retained mapped core glyphs; excludes every mapped hole',
           'Browser raster/geometry/mixed-script/fallback/demand proof required before acceptance','No original-font budget waiver; italic/Mono/aggregate transfer unverified'],
 'ruMaxRSSKiB':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss}
(out/'general-latin-core-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'candidateBytes':manifest['candidateBytes'],'candidateSHA256':manifest['candidateSHA256'],'primaryMapped':len(wanted),'mappedComplement':len(complement),'closureGIDs':len(keepGIDs),'ruMaxRSSKiB':manifest['ruMaxRSSKiB']}))
