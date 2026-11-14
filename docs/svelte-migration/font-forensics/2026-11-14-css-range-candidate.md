# Full-cmap, CSS-gated candidate: inactive proof

## Actual causal receipt

GitHub run `43589330447`, head `ac1e9362a602909fd7768e706a2a45372568251a`, Chromium `158.0.8127.18`. Its raw `results.json` SHA256 is `232e3fd55e56ca42de29db648cd9723295363d187540e53a4c453685929a55b9`. DOM columns below are 400/14, 400/32, 900/14, 900/32.

| Alias | Changed canvas cases | DOM changed pixels |
|---|---:|---|
| OriginalB A/A | 0 | 0, 0, 0, 0 |
| Exact roundtrip | 0 | 0, 0, 0, 0 |
| Rejected | 12 | 0, 80, 105, 101 |
| Retained | 10 | 0, 80, 105, 101 |
| CmapTrimOnly | 10 | 0, 80, 105, 101 |
| HolesOnly | 0 | 0, 0, 0, 0 |
| SelectedFour | 10 | 0, 80, 105, 101 |
| FullBMP4 | 0 | 0, 0, 0, 0 |
| FullBMPFour | 0 | 0, 0, 0, 0 |

SelectedFour keeps all four original record formats and full original other tables; it still reproduces the quote differences. FullBMP4 and FullBMPFour preserve the same 2,821 BMP mappings and both match. Removing the 31 astral mappings therefore does not account for this failure. The selected BMP nominal coverage change is implicated in this controlled normal-Inter fixture. These results do not identify a specific browser sanitizer/shaper implementation or establish all-font fidelity.

## Concrete candidate and safety boundary

Reuse the existing inactive HolesOnly bytes (`4d21ed4102d1d794f2b54fbc2e8ac1f107045cc2009ab54ae03b4e98efba33ab`, **251,404 bytes**). Keep its exact original full cmap and original GIDs, full metrics/layout/axis/name/hint tables, and retained raw glyph/variation closure. Declare this file only for its exact 1,011-codepoint primary CSS range. A second face under the same family/weight/style serves the unmodified original font for its **actual 1,841 mapped complementary codepoints**. Their disjoint union equals all 2,852 original mappings. Unsupported emoji/noncharacters must go directly to the same system fallback rather than fetching an original face that cannot supply them.

The full-Unicode complement remains an explicit request-behavior control. It must not quietly become the preferred recipe: it can unnecessarily fetch the original just to discover an unsupported character. Original cmap entries pointing at intentionally removed outlines are safe only while CSS matching excludes those codepoints from the primary face; this is a required browser proof, never a standalone deployable font claim.

The pinned manifest audit recomputed all-feature/all-script closure and checked **1,834 original GID glyph/variation blocks**, all selected mappings across original cmap records, original `.notdef`, and exact raw cmap/non-glyph tables. It completed with peak RSS **278,136 KiB**; the later cmap-only mapped-complement enrichment used **24,828 KiB**. No font was encoded or activated. The manifest includes mapped U+0250 Latin and U+0483 combining-mark boundary cases rather than selecting benchmark words only.

## Actual-browser proof authored, not executed

`font-css-range-browser.ts` is invoked by the existing diagnostic workflow. OriginalA/B remain exact A/A controls. RangeOriginal uses two full-original faces with identical primary/complement CSS ranges; RangeHoles substitutes only the primary bytes. Both must match original geometry and pixel output. Explicit normal weights 400/500/600/700/900 and representative 12/14/16/24/32px roles include auto optical sizing and explicit opsz 14/32. Selected Latin/PT/punctuation/ligature/currency strings, mixed Greek/Cyrillic, mapped Latin/combining boundaries and unsupported robot/U+10FFFF are compared separately without cropping. CDP must show real custom Inter for mapped samples; no system-font substitution can count as a match. Per-stage isolated contexts record actual requested font assets and Resource Timing bytes, including whether unmapped text downloads the complement.

Pixel or exact width/height/scrollWidth/textWidth changes remain an explicit rejected-candidate verdict; geometry equality also participates in the A/A control. Unsupported-character samples positively require CDP evidence of a noncustom system font and custom Inter A/V glyphs. A failed A/A or fallback/source/protocol control is an inconclusive failure. No production CSS, font files, aliases or budgets change. Italic and Mono, every actual product role, all user strings and actual integrated requested bytes remain unverified.

The two TypeScript proof paths passed scoped Node Prettier write/check; no browser or compiler ran. The report explicitly labels `mapped` as the original mapped complement, `universe` as the whole-Unicode diagnostic control, and `unmapped` as the unsupported robot/max-codepoint request stage; applied CSS ranges are retained alongside demand samples.

## Decision after this proof

If CSS partitioning changes RangeOriginal, reject the partition approach. If only RangeHoles changes, reject the holes candidate. If both match all bounded controls, derive a general Latin/PT core (whole linguistic categories and combining/punctuation/currency support, not a benchmark glyph whitelist), then repeat exact closure/table/shape/browser checks for normal and italic. Keep original Mono initially if its measured bytes permit. The current 251KB normal candidate plus original Mono alone is already too large to assume the existing total-font budget is solved. Further conservative layout closure/compression work and actual aggregate normal/italic/Mono requests must be measured; no budget waiver or activation follows from a normal-only pass.
