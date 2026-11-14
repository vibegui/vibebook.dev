import io,struct,json,hashlib,gc,resource,sys
import fontTools,brotli
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.ttLib.woff2 import WOFF2FlavorData
root=Path(__file__).resolve().parents[2]
assert sys.version_info[:3]==(3,13,11) and fontTools.__version__=='4.68.0' and brotli.__version__=='1.2.1'
assert len(sys.argv)==2, 'Pass a private output directory outside the repository'
out=Path(sys.argv[1]).resolve();assert not out.is_relative_to(root), 'Never generate into repository/application assets'
out.mkdir(parents=True,exist_ok=True)
source=root/'public/fonts/studio/InterVariable-693b77d4f3.woff2'
sha=lambda x:hashlib.sha256(x).hexdigest()
assert sha(source.read_bytes())=='693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3'
original=TTFont(source,lazy=True,recalcBBoxes=False,recalcTimestamp=False)
order=original.getGlyphOrder();oldMap=original.getBestCmap();raw={tag:original.reader[tag] for tag in original.reader.keys()}
rejectedPath=root/'scripts/fixtures/font-forensics/rejected-inter-785911cf3a.woff2'
assert sha(rejectedPath.read_bytes())=='785911cf3a4486d7b0e2573bd5093500f9d9a6c3cfcb021e65d40e4fc7bdeb1d'
rejected=TTFont(rejectedPath,lazy=True);wanted=set(rejected.getBestCmap());del rejected
options=subset.Options();options.retain_gids=True;options.notdef_outline=True;options.glyph_names=True;options.layout_features=['*'];options.layout_scripts=['*'];options.name_IDs=['*'];options.name_languages=['*'];options.hinting=True;options.recalc_bounds=False;options.recalc_timestamp=False
work=TTFont(source,lazy=True,recalcBBoxes=False,recalcTimestamp=False);subsetter=subset.Subsetter(options=options);subsetter.populate(unicodes=wanted);subsetter.subset(work)
kept=set(subsetter.glyphs_retained);kept.add(order[0]);keepGIDs={i for i,name in enumerate(order) if name in kept}
work.setGlyphOrder(order);newCmap=work['cmap'].compile(work)
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
candidate=out/'retained-gid-layout-inter-diagnostic.ttf';candidate.write_bytes(sfnt)
verify=TTFont(candidate,lazy=True,recalcBBoxes=False,recalcTimestamp=False);assert verify['maxp'].numGlyphs==glyphs;assert set(verify.getBestCmap())==wanted
assert all(verify.getGlyphID(verify.getBestCmap()[cp])==original.getGlyphID(oldMap[cp]) for cp in wanted)
for tag,b in raw.items():
 if tag not in {'head','cmap','glyf','loca','gvar'}:assert verify.reader[tag]==b,tag
assert oldOffsets[1]>oldOffsets[0];assert bytes(newGlyf[newOffsets[0]:newOffsets[1]])==raw['glyf'][oldOffsets[0]:oldOffsets[1]]
for gid in keepGIDs:
 assert bytes(newGlyf[newOffsets[gid]:newOffsets[gid+1]])==raw['glyf'][oldOffsets[gid]:oldOffsets[gid+1]]
 assert bytes(blocks[positions[gid]:positions[gid+1]])==gv[gvbase+gvo[gid]:gvbase+gvo[gid+1]]
# Untransformed WOFF2 avoids another glyf rewrite; only container encoding/checksum may change.
verify.flavor='woff2';verify.flavorData=WOFF2FlavorData(transformedTables=set());dest=out/'retained-gid-layout-inter-diagnostic.woff2';verify.save(dest,reorderTables=False)
assert sha(dest.read_bytes())=='a1894969422b49bcd0e473ad2a4686b3537aedd38bf7db36a9d20747f7887903', 'Pinned private recipe output differs; do not activate'
roundtrip=TTFont(dest,lazy=True,recalcBBoxes=False,recalcTimestamp=False)
for tag in tables:
 if tag!='head':assert roundtrip.reader[tag]==verify.reader[tag],tag
report={'diagnosticOnly':True,'accepted':False,'sourceSHA256':sha(source.read_bytes()),'candidateSHA256':sha(dest.read_bytes()),'candidateBytes':dest.stat().st_size,'sfntSHA256':sha(sfnt),'originalGlyphCount':glyphs,'candidateGlyphCount':roundtrip['maxp'].numGlyphs,'retainedGlyphs':len(keepGIDs),'exactOldSubsetCmapCodepoints':len(wanted),'originalGIDsVerified':True,'originalRetainedGlyfAndGvarBlocksVerified':True,'originalNotdefOutlineVerified':True,'unchangedTables':[x for x in raw if x not in {'head','cmap','glyf','loca','gvar'}],'tools':{'fontTools':'4.68.0','Brotli':'1.2.1','python':'3.13.11'},'gaps':['Browser sanitizer/shaping/raster UNRUN; candidate inactive','Private fontTools Subsetter state glyphs_retained used only as pinned diagnostic closure metadata; no app runtime dependency','No performance savings claim; unchanged full layout and metrics intentionally conservative']}
report['procStatus']='\n'.join(x for x in Path('/proc/self/status').read_text().splitlines() if x.startswith(('VmHWM:','VmRSS:')));report['ruMaxRSSKiB']=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
(out/'retained-candidate.json').write_text(json.dumps(report,indent=2));print(json.dumps(report))
