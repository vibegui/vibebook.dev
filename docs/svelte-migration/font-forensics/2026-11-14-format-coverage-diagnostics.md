# Inactive cmap format / coverage controls

These three additional normal-Inter controls refine the previous actual factorial
result: changing only the cmap reproduced the closing quote raster differences,
while glyph/variation holes with the original cmap did not. They are research
fixtures, never imported by application code or public styles. Original Studio
faces and their digests remain unchanged. The existing Inter license in
`scripts/fixtures/font-forensics/Inter-LICENSE.txt` applies.

Original Inter has 2,821 BMP codepoints and 31 astral codepoints. Its four records
are `(platform, encoding, format)` = `(0,3,4)`, `(0,4,12)`, `(3,1,4)`, `(3,10,12)`.
Consequently a format-4-only font cannot retain literal full original coverage.
The extra FullBMPFour control prevents that confound from being hidden.

| Diagnostic alias | Coverage / records | WOFF2 bytes | SHA-256 |
| --- | --- | ---: | --- |
| SelectedFour | selected 1,011 codepoints, all four original record formats | 360764 | `995e8f1d6557fc62805479033fa93fe76049e8d51e9921e580f8df8946d93f00` |
| FullBMP4 | all 2,821 BMP mappings, two original raw format-4 records | 359136 | `f163380528e4492d7ebce76fb15f1011d48aa66da552561615e4c32b94e5c4b1` |
| FullBMPFour | same 2,821 BMP mappings, all four original record formats | 365900 | `f445e78eacd1cad2c50537d289f74cbd914b646cb757965a9192c34ae47016dd` |

Every decoded non-cmap table is byte-identical to original Inter, including all
2,937 glyph slots, `.notdef`, glyph outlines, variation data, layout, metrics and
names. Only the necessary `head.checkSumAdjustment` differs. This is not a font
size optimization. The recipe uses original raw format-4 bytes for FullBMP4 and
FullBMPFour, the exact previous retained raw format-4 bytes for SelectedFour,
and public fontTools compilation for the modified format-12 records. Each output
record is checked for platform/encoding/format/language, exact designed raw
bytes, complete codepoint-to-original-GID mapping, and quote GIDs. Raw and mapping
digests are recorded separately in `cmap-format-coverage-provenance.json`.

The comparisons are:

- FullBMP4 versus FullBMPFour holds codepoint/GID coverage constant and changes
  format-12 record presence.
- Original versus FullBMPFour keeps four record formats and removes the 31 astral
  mappings. Modified format-12 serialization is explicitly a remaining factor.
- SelectedFour versus FullBMPFour keeps four record formats and changes BMP
  coverage; compare SelectedFour to the previous CmapTrimOnly to hold selected
  mappings constant while changing format-12 presence.

The existing browser harness adds these three aliases to the same context,
original-v-original and byte-identical roundtrip controls, actual font-request
digest checks, CDP identity checks, all canvas character/cluster cases and strict
DOM pixel comparisons at weight 400/900 × optical size 14/32. No tolerances,
previous negative controls or acceptance rules are relaxed. Independent
`formatCoverageComparisons` reports retain actual pixels without activating any
face. Full Unicode fallback, all roles/weights/themes and actual application
fidelity remain outside this bounded diagnostic proof.

Generation ran once with private CPython 3.13.11, fontTools 4.68.0 and Brotli 1.2.1
outside all Git repositories. All design assertions passed; process VmHWM was
73,680 kB. The source recipe rejects other tool versions, source digests, output
locations or generated digests. Browser, types and source-adapted regeneration
with the final output-hash assertions remain unrun for this follow-up. A remote
`run-font-forensics` job is required before interpreting these new controls.
Node Prettier passed the browser harness and provenance JSON after generation;
no local browser, compiler, or application build was run.
