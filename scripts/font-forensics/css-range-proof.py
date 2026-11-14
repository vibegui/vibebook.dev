"""Inactive CSS-range manifest; no font encoding or application asset writes."""
import hashlib, json, resource, struct, sys, unicodedata
from pathlib import Path
import fontTools
from fontTools import subset
from fontTools.ttLib import TTFont

assert sys.version_info[:3] == (3, 13, 11) and fontTools.__version__ == '4.68.0'
root = Path(__file__).resolve().parents[2]
assert len(sys.argv) == 2
out = Path(sys.argv[1]).resolve()
assert not out.is_relative_to(root) and not any((p / '.git').exists() for p in [out, *out.parents])
out.mkdir(parents=True, exist_ok=True)
sha = lambda b: hashlib.sha256(b).hexdigest()
original_path = root / 'public/fonts/studio/InterVariable-693b77d4f3.woff2'
holes_path = root / 'scripts/fixtures/font-forensics/holes-only-inter-4d21ed4102.woff2'
selected_path = root / 'scripts/fixtures/font-forensics/retained-inter-a189496942.woff2'
assert sha(original_path.read_bytes()) == '693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3'
assert sha(holes_path.read_bytes()) == '4d21ed4102d1d794f2b54fbc2e8ac1f107045cc2009ab54ae03b4e98efba33ab'
assert sha(selected_path.read_bytes()) == 'a1894969422b49bcd0e473ad2a4686b3537aedd38bf7db36a9d20747f7887903'
original = TTFont(original_path, lazy=True, recalcBBoxes=False, recalcTimestamp=False)
holes = TTFont(holes_path, lazy=True, recalcBBoxes=False, recalcTimestamp=False)
selected = set(TTFont(selected_path, lazy=True).getBestCmap())
assert len(selected) == 1011
a = {tag: original.reader[tag] for tag in original.reader.keys()}
b = {tag: holes.reader[tag] for tag in holes.reader.keys()}
assert set(a) == set(b) and a['cmap'] == b['cmap']
for tag in a:
    if tag not in {'head', 'glyf', 'loca', 'gvar'}: assert a[tag] == b[tag], tag
assert a['head'][:8] + a['head'][12:] == b['head'][:8] + b['head'][12:]

def glyph(raw, gid):
    long = struct.unpack_from('>h', raw['head'], 50)[0] != 0
    fmt, width, scale = ('>I', 4, 1) if long else ('>H', 2, 2)
    start, end = [struct.unpack_from(fmt, raw['loca'], width * i)[0] * scale for i in [gid, gid + 1]]
    return raw['glyf'][start:end]

def variation(raw, gid):
    data = raw['gvar']; long = struct.unpack_from('>H', data, 14)[0] & 1
    fmt, width, scale = ('>I', 4, 1) if long else ('>H', 2, 2)
    base = struct.unpack_from('>I', data, 16)[0]
    start, end = [struct.unpack_from(fmt, data, 20 + width * i)[0] * scale for i in [gid, gid + 1]]
    return data[base + start:base + end]

# Recompute the pinned closure instead of trusting selected nominal glyphs only.
options = subset.Options(); options.retain_gids = True; options.notdef_outline = True
options.glyph_names = True; options.layout_features = ['*']; options.layout_scripts = ['*']
options.name_IDs = ['*']; options.name_languages = ['*']; options.hinting = True
options.recalc_bounds = False; options.recalc_timestamp = False
work = TTFont(original_path, lazy=True, recalcBBoxes=False, recalcTimestamp=False)
subsetter = subset.Subsetter(options=options); subsetter.populate(unicodes=selected); subsetter.subset(work)
keep = set(subsetter.glyphs_retained) | {original.getGlyphOrder()[0]}
gids = {original.getGlyphID(name) for name in keep}
for table in original['cmap'].tables:
    if table.isUnicode(): gids.update(original.getGlyphID(table.cmap[cp]) for cp in selected if cp in table.cmap)
for gid in gids:
    assert glyph(a, gid) == glyph(b, gid), gid
    assert variation(a, gid) == variation(b, gid), gid
assert glyph(a, 0) and glyph(a, 0) == glyph(b, 0)

def ranges(points):
    result = []
    for point in sorted(points):
        if result and point == result[-1][1] + 1: result[-1][1] = point
        else: result.append([point, point])
    return result

primary = ranges(selected)
complement = []; cursor = 0
for start, end in primary:
    if cursor < start: complement.append([cursor, start - 1])
    cursor = end + 1
if cursor <= 0x10ffff: complement.append([cursor, 0x10ffff])
assert sum(end - start + 1 for start, end in primary) == 1011
assert sum(end - start + 1 for start, end in primary + complement) == 0x110000
combined = sorted(primary + complement)
assert combined[0][0] == 0 and combined[-1][1] == 0x10ffff
assert all(left[1] + 1 == right[0] for left, right in zip(combined, combined[1:]))
css = lambda rs: ','.join('U+' + format(start, 'X') + (('-' + format(end, 'X')) if end != start else '') for start, end in rs)
outside = set(original.getBestCmap()) - selected
mapped_complement = ranges(outside)
assert selected | outside == set(original.getBestCmap()) and not selected & outside
assert 0x10ffff not in original.getBestCmap() and 0x1f916 not in original.getBestCmap()
latin = next((cp for cp in sorted(outside) if unicodedata.name(chr(cp), '').startswith('LATIN') and unicodedata.category(chr(cp)).startswith('L')), None)
mark = next((cp for cp in sorted(outside) if unicodedata.category(chr(cp)).startswith('M')), None)
samples = ['AV Ω VA Ж To', 'ação “quoted” office ffi € £ $']
if latin is not None: samples.append('AV' + chr(latin) + 'To')
if mark is not None: samples.append('A' + chr(mark) + 'V')
report = {'diagnosticOnly': True, 'accepted': False, 'sourceSHA256': sha(original_path.read_bytes()),
          'candidateSHA256': sha(holes_path.read_bytes()), 'selectedCodepoints': sorted(selected),
          'primaryRanges': primary, 'complementRanges': complement, 'primaryCSS': css(primary), 'complementCSS': css(complement),
          'mappedComplementRanges': mapped_complement, 'mappedComplementCSS': css(mapped_complement),
          'originalMappedCodepoints': sorted(original.getBestCmap()),
          'fullOriginalRawCmapVerified': True, 'closureGlyphsVerified': len(gids), 'notdefVerified': True,
          'unchangedNonGlyphTablesVerified': True, 'candidateBytes': holes_path.stat().st_size,
          'boundaryLatin': latin, 'boundaryMark': mark, 'mixedSamples': samples,
          'ruMaxRSSKiB': resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
          'limits': ['Normal Inter only; current 1011 profile is a proof input, not an approved general production partition',
                     'Mapped holes outside CSS primary range must only be rendered by original complement face',
                     'CSS range matching and mixed-run shaping/raster remain unverified until actual browser comparison',
                     'No italic/Mono or all-role fidelity/performance acceptance; originals remain active']}
(out / 'css-range-proof.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({k:report[k] for k in ['candidateBytes','closureGlyphsVerified','boundaryLatin','boundaryMark','ruMaxRSSKiB']}))
