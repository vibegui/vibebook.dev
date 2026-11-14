# General-core font proof: rejected, with bounded size attribution

## Exact completed receipt

The completed BugMachine source is `b1b95ed0ef79c174788745018a2951d0adfa4fed`. The [unchanged CSS-range JSON](2026-11-14-general-core-result.json) has SHA256 `050ddcacac17b45ed516d61530caeeb599438699e5aa2574538dc1f5df7ece42`. It reports **complete / range-or-candidate-differences-rejected**, 405 observations and no page errors. The unchanged candidate is `9e3f607808332c30ae74002724fbca992a2b8970008616105496d829a9cd2b30`, 309,200 bytes; original normal Inter is `693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3`.

The earlier b6 attempt stopped at 19 rows when a candidate positivity assertion fired before recording its foreign-script cluster. Root's `bb8427ba85ab3ee4cbffc3915863867d71f40658` retains all candidate rows and classifies their pixel/geometry/font-usage differences as rejection; strict positive controls apply to OriginalB. Neither font binary nor CSS mask changed for the complete run. Tool exit success means the diagnostic completed, not that a candidate passed.

| Alias | Total | Exact pixels, geometry and font usage | Rejected |
|---|---:|---:|---:|
| OriginalB A/A | 135 | 135 | 0 |
| RangeOriginal, both faces full original | 135 | 126 | 9 |
| RangeHoles, corrected general core | 135 | 126 | 9 |

Both partitioned aliases have identical pixel counts, geometry and platform-font usage for every observation. Their only failure is `mixed-5`, **`Ώ Ж́`**, in all nine profiles. Width deltas range from −3.796875 to −17.796875 px, with 89–620 changed pixels. OriginalA uses four custom Inter glyphs. Both partitioned faces use two custom Inter glyphs and two system Noto Sans Mono glyphs. This is an actual unexpected fallback/cluster failure even when both partitioned font files contain the full original data.

All other 14 cases per profile match, including the formerly broken Latin IPA boundary and the robot/noncharacter controls. The corrected unmapped eligibility restores the original usage: robot-only uses custom Inter A/V plus system emoji; noncharacter-only has three custom Inter glyphs and no system font, consistent with the original `.notdef` path. CDP reports font usage rather than individual glyph IDs. Their combined string also matches original usage/geometry/pixels. Whole-script Latin coverage and unmapped eligibility address those earlier failures, but do not solve cross-script inherited-mark composition.

The nine profiles include normal weights 400/500/600/700/900, representative 12/14/16/24/32px sizes, automatic optical sizing and explicit opsz 14/32. This is not all-font, italic, Mono or arbitrary-user-string acceptance.

## Actual request behavior and budget

| Preferred mapped-complement stage | Requested resources | Encoded body bytes | Resource Timing transferSize |
|---|---|---:|---:|
| Selected | primary only | 309,200 | 309,500 |
| Robot-only, noncharacter-only, combined unsupported | primary only | 309,200 | 309,500 |
| Mapped mixed text | primary + original | 661,440 | 662,040 |

The narrow-primary/whole-Unicode adverse control requests the original already at robot-only: 661,440 encoded body bytes / 662,040 reported transferSize. These controlled request results are not a new integrated performance benchmark. Resource Timing transferSize is the browser-reported value, not a raw TCP capture.

The tested primary's encoded body alone exceeds the existing **293,033-byte aggregate font ceiling** by 16,167 bytes. Even disregarding its failed fidelity, primary plus unchanged original Mono would be 395,968 file bytes; retaining original italic as well gives 783,944. Those file-size sums illustrate the remaining cost and must not be relabeled as integrated request measurements. No budget is waived.

## Bounded read-only table and closure attribution

The [table metadata receipt](2026-11-14-core-table-attribution.json) was obtained by reading existing SFNT directories and glyph slices, without a font decoder, regeneration, shaping job or compression ablation. Original non-cmap bytes come from the previously verified CmapTrimOnly full-original SFNT (`810e8ea438cc3949faff480ebd42ff8322d4026fd7af5c5ea99a17e457e99649`); exact original cmap bytes come from the core audit. The core SFNT hash is `4bea4eb74afb3e358c1f71601af89c3a4e120cf191d5ad1765b069d868307324`.

| Decoded table | Original bytes | Core bytes | Removed raw bytes |
|---|---:|---:|---:|
| gvar | 456,620 | 358,558 | 98,062 |
| GPOS | 153,994 | 153,994 | 0 |
| glyf | 138,378 | 107,899 | 30,479 |
| post | 32,773 | 32,773 | 0 |
| cmap | 25,900 | 25,900 | 0 |
| GSUB | 24,406 | 24,406 | 0 |

There are still 2,937 GID slots. The audited closure retains 2,203 GIDs (75.0%); all 22 originally empty glyphs remain empty. Exactly 734 originally nonempty outlines are removed, and zero retained nonempty outlines differ. Raw table data drops by 128,541 bytes, but WOFF2 body size drops only 43,040 bytes (12.22%). Compressed bytes cannot be attributed additively to individual tables because WOFF2 uses a shared compressed stream.

The core retains 272,572 raw bytes outside glyf/loca/gvar/head. GPOS alone is 20.5% of the decoded core, so conservative lookup/class closure is a real size-analysis target. It is **not** a free 154KB download reduction: deleting positioning would lose kerning/mark behavior, and no compression/shaping ablation was run. Preserved variation tuples dominate the remaining data; narrowing opsz/weight ranges or replacing variable fonts with static roles would change the current fidelity contract. Name metadata is only 3,404 raw bytes and cannot account for the gap.

## Decision

Keep original product fonts active and stop speculative mask generation. The current disjoint CSS-face strategy fails a real composed-script case even with original bytes; table trimming cannot repair that face-selection failure. No current subset meets both fidelity and the aggregate budget.

Further font work needs a bounded, separately reviewed proposal based on table/lookup closure and whole-font renderer equivalence, not another unmeasured coverage mask. Original-font fidelity versus the existing transfer ceiling remains an unresolved tradeoff; accepting a different ceiling requires an explicit amendment. Meanwhile JS entry, readiness and retained-heap optimizations can proceed independently. This receipt changes no product font, stylesheet, asset, runtime or acceptance threshold.
