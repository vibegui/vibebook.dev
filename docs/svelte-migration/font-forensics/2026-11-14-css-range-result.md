# Actual CSS-range result and next inactive core

## Rejected mask: exact receipt

BugMachine completed the proof at `c3e057c72029f00500fafcb7f5d7f3a00dbed68e`, Chromium `158.0.8127.18`. The preserved [raw CSS-range report](2026-11-14-css-range-result.json) has SHA256 `e1afc29b97c465e749218f11b800e5d845a6e27ae72bfb178960f56d3ed03ea0`. Status is complete, verdict **range-or-candidate-differences-rejected**, page errors empty. Completion is not fidelity acceptance.

| Alias                                           | Exact observations | Failed observations |
| ----------------------------------------------- | -----------------: | ------------------: |
| OriginalB A/A                                   |                 54 |                   0 |
| RangeOriginal, two original faces               |                 36 |                  18 |
| RangeHoles, primary holes + original complement |                 36 |                  18 |

Both partitioned aliases have identical measured pixel differences and geometry across all 54 observations. Their failures are the same two strings in all nine normal profiles:

- `AVɐTo` crosses the selected/core boundary at Latin IPA U+0250. Width increases by 1–4 px. All mapped glyphs are actual custom Inter.
- `A🤖U+10FFFFV` has width changes of −0.59375 to −1.796875 px. Unpartitioned Inter reports three custom glyphs plus one system Noto Color Emoji glyph. Each partitioned face reports two custom Inter glyphs plus two system glyphs: Noto Color Emoji and Noto Sans Mono. This supports an original `.notdef`/fallback-eligibility distinction, but per-character attribution is not established until the separate new robot/noncharacter cases run.

Selected Latin/PT text, Greek/Cyrillic mixtures and the Cyrillic combining-mark control match in all their 36 observations per partitioned alias. The existing outline holes do not add a measured difference to this failed CSS partition. There is no basis to activate either partitioned face.

## Actual request costs

| Mask / stage                           | Requested bodies                | Resource Timing transfer bytes |
| -------------------------------------- | ------------------------------- | -----------------------------: |
| Mapped complement / selected           | 251,404-byte primary            |                        251,704 |
| Mapped complement / unsupported        | same primary only               |                        251,704 |
| Mapped complement / mapped mixed       | primary + 352,240-byte original |                        604,244 |
| Whole-Unicode complement / unsupported | primary + unnecessary original  |                        604,244 |

These are controlled font requests, not integrated application timings or total normal/italic/Mono budget acceptance.

## Next source candidate, still inactive

`scripts/font-forensics/general-latin-core.py` deterministically keeps every original mapped Unicode Script **Latn**, **Zinh** and **Zyyy** codepoint: whole Latin/IPA, inherited combining marks and Common punctuation/currency/numbers/symbols. It never selects glyphs from benchmark words. Original cmap bytes, GIDs, non-glyph tables, `.notdef` and retained glyph/variation closure remain exact. Only unused glyph/variation slots become holes. Candidate files and manifest are generated outside every Git checkout.

The preferred primary eligibility is **all Unicode minus mapped noncore**. It includes unsupported codepoints so the original `.notdef`/system-fallback eligibility path is available; every mapped hole is excluded. The original complement covers only mapped noncore codepoints. This retains complete original nominal coverage without discovering unsupported emoji by downloading the original. The earlier narrow-primary/full-Unicode-complement mask remains an explicit adverse request control.

The proof accepts a paired private candidate/manifest override via `FONT_CSS_RANGE_CANDIDATE` and `FONT_CSS_RANGE_MANIFEST`. Defaults preserve the old rejected experiment. New candidate manifests add several Latin/IPA contrasts, Greek/Cyrillic plus inherited accents and Latin combining clusters. Old A/A, pixel, exact geometry, original-request and replacement controls remain. Robot-only, noncharacter-only and combined samples compare exact platform font usage against OriginalA; a noncharacter is not incorrectly required to use a system font when the original uses its own `.notdef`.

Root-owned serialized execution:

```sh
<pinned-python-3.13.11> scripts/font-forensics/general-latin-core.py /tmp/vibebook-font-general-latin-core
FONT_CSS_RANGE_CANDIDATE=/tmp/vibebook-font-general-latin-core/general-latin-core-inter-normal.woff2 \
FONT_CSS_RANGE_MANIFEST=/tmp/vibebook-font-general-latin-core/general-latin-core-manifest.json \
FONT_FORENSICS_OUTPUT=.artifacts/font-forensics/general-latin-core \
bun scripts/font-forensics-browser.ts
```

The single authorized local generation completed with pinned Python 3.13.11/fontTools 4.68.0/Brotli 1.2.1: 1,520 mapped core codepoints, 1,332 mapped complementary codepoints, 2,203 retained closure GIDs, peak RSS 278,136 KiB. The inactive WOFF2 is 309,200 bytes, SHA256 `9e3f607808332c30ae74002724fbca992a2b8970008616105496d829a9cd2b30`. Generation assertions passed; no browser or compiler ran for this new candidate. Its normal file alone is larger than the earlier input, so this is a corrected fidelity experiment, not a performance success.

Original product fonts remain active. The new normal-only mask must pass the actual proof before considering generalization to italic or conservative layout/container size optimization. Keeping original Mono initially remains preferable if aggregate measured bytes permit. The current 251KB normal proof input cannot be treated as a solution to the total-font budget; no budget or fidelity acceptance is amended here.
