# Actual cmap factorial diagnostic result

The supplied remote CI3 artifact is
`font-forensics-b22c5089863df87092cdbd85cad9118d3fd9248f`.
Its `results.json` SHA-256 is
`6fe4252de993ab909e8115203696c4fa5bfb71b91ad4767883344dd3999eadb6`;
Chromium was `158.0.8127.18`. This is diagnostic evidence, not font acceptance.

Each alias has 146 canvas observations. Original-v-original and the byte-identical
roundtrip each have zero changed canvas observations and zero differences in all
four explicit DOM axis combinations (weight 400/900 × optical size 14/32).
There were no page errors and no advance differences for any alias.

| Inactive factor | Changed canvas observations | DOM changed pixels at 400/14, 400/32, 900/14, 900/32 |
| --- | ---: | --- |
| CmapTrimOnly: full original glyph/variation/layout/metric tables; only retained candidate cmap | 10 | 0, 80, 105, 101 |
| HolesOnly: retained glyph/variation holes; exact original raw cmap | 0 | 0, 0, 0, 0 |
| Retained: both changes | 10 | 0, 80, 105, 101 |

CmapTrimOnly reproduces the same isolated closing quote differences as Retained:
U+201D changes 52 pixels at weight 400 and 66 at 900; U+2019 changes 27 and 32.
The full quote fixture and shaped quote cluster localize to the same quote pixels.
Thus the changed cmap alone is sufficient for these observed differences; the
glyph/variation holes are not necessary. This experiment does **not** separate
cmap format changes from coverage changes or identify Chromium's internal cause.

HolesOnly is deliberately unsuitable for deployment: its original full cmap still
advertises removed glyphs outside selected diagnostic coverage. Neither its zero
differences nor this successful diagnostic job establishes all-role typography,
Unicode fallback, M4 or M7 acceptance. Original public fonts remain unchanged;
the rejected and factorial candidates remain inactive.

The accompanying source follow-up explicitly types canvas/DOM observation rows
for strict tooling and repairs diagnostic module labels through ancestor/root
aliases (including nonexistent module descendants). Author Node formatting passed
the three owned TS files; five chunk diagnostic tests / 24 assertions passed in
1.56 seconds. No local compiler, browser or font generation was run for this
follow-up. macOS CI must confirm the module-label regression on its actual paths.
