"""Inactive normal-Inter diagnostic: cmap format versus selected/BMP coverage.
All non-cmap decoded tables are original bytes (head checksum excepted).
No output may be inside any Git repository. No production font activation.
"""
import hashlib
import json
from pathlib import Path
import resource
import struct
import sys

import brotli
import fontTools
from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._c_m_a_p import CmapSubtable
from fontTools.ttLib.woff2 import WOFF2FlavorData

assert sys.version_info[:3] == (3, 13, 11)
assert fontTools.__version__ == '4.68.0' and brotli.__version__ == '1.2.1'
root = Path(__file__).resolve().parents[2]
assert len(sys.argv) == 2, 'Pass private output directory outside Git repositories'
out = Path(sys.argv[1]).resolve()
assert not out.is_relative_to(root)
assert not any((p / '.git').exists() for p in [out, *out.parents])
out.mkdir(parents=True, exist_ok=True)
sha = lambda b: hashlib.sha256(b).hexdigest()
original_path = root / 'public/fonts/studio/InterVariable-693b77d4f3.woff2'
retained_path = root / 'scripts/fixtures/font-forensics/retained-inter-a189496942.woff2'
assert sha(original_path.read_bytes()) == '693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3'
assert sha(retained_path.read_bytes()) == 'a1894969422b49bcd0e473ad2a4686b3537aedd38bf7db36a9d20747f7887903'
a = TTFont(original_path, lazy=True, recalcBBoxes=False, recalcTimestamp=False)
b = TTFont(retained_path, lazy=True, recalcBBoxes=False, recalcTimestamp=False)
raw = {tag: a.reader[tag] for tag in a.reader.keys()}
selected = set(b.getBestCmap())
assert len(selected) == 1011 and max(selected) < 65536
original_tables = {(t.platformID, t.platEncID): t for t in a['cmap'].tables}
retained_tables = {(t.platformID, t.platEncID): t for t in b['cmap'].tables}
assert [(k, t.format) for k, t in original_tables.items()] == [((0, 3), 4), ((0, 4), 12), ((3, 1), 4), ((3, 10), 12)]
original_bmp = {cp: glyph for cp, glyph in a.getBestCmap().items() if cp <= 65535}
assert len(a.getBestCmap()) - len(original_bmp) == 31
for table in original_tables.values():
    assert {cp: g for cp, g in table.cmap.items() if cp <= 65535} == original_bmp
    assert selected <= set(table.cmap)

def records(data):
    version, count = struct.unpack_from('>HH', data)
    assert version == 0
    result = {}
    for i in range(count):
        platform, encoding, offset = struct.unpack_from('>HHI', data, 4 + i * 8)
        fmt = struct.unpack_from('>H', data, offset)[0]
        length = struct.unpack_from('>I', data, offset + 4)[0] if fmt == 12 else struct.unpack_from('>H', data, offset + 2)[0]
        assert fmt in (4, 12) and offset + length <= len(data)
        result[(platform, encoding)] = data[offset:offset + length]
    return result

original_records = records(raw['cmap'])
retained_records = records(b.reader['cmap'])

def cmap_bytes(kind):
    record_bytes = {}
    expected_maps = {}
    for key, original in original_tables.items():
        if kind == 'full-bmp-format4' and original.format != 4:
            continue
        cmap = original_bmp if kind != 'selected-four-formats' else {cp: original.cmap[cp] for cp in sorted(selected)}
        expected_maps[key] = cmap
        if original.format == 4:
            record_bytes[key] = retained_records[key] if kind == 'selected-four-formats' else original_records[key]
        else:
            table = CmapSubtable.newSubtable(12)
            table.platformID, table.platEncID = key
            table.language = original.language
            table.cmap = cmap
            record_bytes[key] = table.compile(a)
    keys = sorted(record_bytes)
    header = bytearray(struct.pack('>HH', 0, len(keys)))
    body = bytearray()
    for platform, encoding in keys:
        value = record_bytes[(platform, encoding)]
        header.extend(struct.pack('>HHI', platform, encoding, 4 + 8 * len(keys) + len(body)))
        body.extend(value)
    return bytes(header + body), record_bytes, expected_maps

def checksum(data):
    data += b'\0' * ((-len(data)) % 4)
    return sum(struct.unpack('>' + str(len(data) // 4) + 'I', data)) & 0xffffffff

def make(kind):
    cmap, designed_records, expected_maps = cmap_bytes(kind)
    tables = {**raw, 'cmap': cmap}
    head = bytearray(tables['head']); head[8:12] = b'\0' * 4; tables['head'] = bytes(head)
    tags = sorted(tables); n = len(tags); power = 2 ** (n.bit_length() - 1)
    header = struct.pack('>IHHHH', 0x10000, n, 16 * power, power.bit_length() - 1, n * 16 - power * 16)
    directory = bytearray(); data = bytearray(); head_at = None
    for tag in tags:
        value = tables[tag]; offset = 12 + 16 * n + len(data)
        directory.extend(struct.pack('>4sIII', tag.encode(), checksum(value), offset, len(value)))
        data.extend(value); data.extend(b'\0' * ((-len(value)) % 4))
        if tag == 'head': head_at = offset
    sfnt = bytearray(header + directory + data)
    struct.pack_into('>I', sfnt, head_at + 8, (0xb1b0afba - checksum(bytes(sfnt))) & 0xffffffff)
    assert checksum(bytes(sfnt)) == 0xb1b0afba
    path = out / (kind + '.ttf'); path.write_bytes(sfnt)
    font = TTFont(path, lazy=True, recalcBBoxes=False, recalcTimestamp=False)
    font.flavor = 'woff2'; font.flavorData = WOFF2FlavorData(transformedTables=set())
    dest = out / (kind + '.woff2'); font.save(dest, reorderTables=False)
    check = TTFont(dest, lazy=True, recalcBBoxes=False, recalcTimestamp=False)
    assert set(check.reader.keys()) == set(raw)
    for tag in raw:
        got = check.reader[tag]; expected = cmap if tag == 'cmap' else raw[tag]
        if tag == 'head': got = got[:8] + got[12:]; expected = expected[:8] + expected[12:]
        assert got == expected, tag
    assert records(check.reader['cmap']) == designed_records
    evidence = []
    for table in check['cmap'].tables:
        key = (table.platformID, table.platEncID)
        assert table.format == original_tables[key].format
        assert table.cmap == expected_maps[key]
        mappings = [[cp, check.getGlyphID(g)] for cp, g in sorted(table.cmap.items())]
        evidence.append({'platform': key[0], 'encoding': key[1], 'format': table.format, 'language': table.language, 'mappings': len(mappings), 'aboveBMP': sum(cp > 65535 for cp in table.cmap), 'rawSHA256': sha(designed_records[key]), 'mappingSHA256': sha(json.dumps(mappings, separators=(',', ':')).encode()), 'quotes': {hex(cp): check.getGlyphID(table.cmap[cp]) for cp in (0x2018, 0x2019, 0x201c, 0x201d)}})
    result = {'name': kind, 'bytes': dest.stat().st_size, 'sha256': sha(dest.read_bytes()), 'sfntSHA256': sha(sfnt), 'cmapSHA256': sha(cmap), 'nonCmapTablesOriginalExactExceptHeadChecksum': True, 'originalGlyphCount': check['maxp'].numGlyphs, 'records': evidence}
    expected = {
        'selected-four-formats': '995e8f1d6557fc62805479033fa93fe76049e8d51e9921e580f8df8946d93f00',
        'full-bmp-format4': 'f163380528e4492d7ebce76fb15f1011d48aa66da552561615e4c32b94e5c4b1',
        'full-bmp-four-formats': 'f445e78eacd1cad2c50537d289f74cbd914b646cb757965a9192c34ae47016dd',
    }
    assert result['sha256'] == expected[kind], 'Pinned diagnostic output differs; do not activate'
    print(json.dumps(result), flush=True)
    return result

report = {'diagnosticOnly': True, 'accepted': False, 'originalSHA256': sha(original_path.read_bytes()), 'retainedSHA256': sha(retained_path.read_bytes()), 'selectedCodepoints': len(selected), 'originalBMPCodepoints': len(original_bmp), 'originalAstralCodepoints': 31, 'controls': []}
for kind in ['selected-four-formats', 'full-bmp-format4', 'full-bmp-four-formats']:
    report['controls'].append(make(kind))
report['gaps'] = ['All full original glyph/variation/layout/metric data retained; not optimized/deployable assets', 'FullBMP pair shares EXACT codepoint/GID mapping; four-format versus format4-only presence is isolated', 'Original full four-format vs FullBMP four-format separates removal of 31 astral mappings', 'Selected-four vs FullBMP-four preserves platform/encoding/formats but changes BMP coverage', 'Per-record serialization is verified, not asserted identical to raw original when mappings change', 'No browser raster or M4/M7 acceptance from generation']
report['procStatus'] = '\n'.join(line for line in Path('/proc/self/status').read_text().splitlines() if line.startswith(('VmHWM:', 'VmRSS:')))
(out / 'format-coverage.json').write_text(json.dumps(report, indent=2))
print(json.dumps({'complete': True, 'procStatus': report['procStatus']}))
