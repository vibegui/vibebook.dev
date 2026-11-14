# Rejected subset raster localization

[Run 43575716692](https://github.com/vibegui/vibebook.dev/actions/runs/43575716692)
completed its diagnostic at head `06b0a7e`, merge revision
`5d9160f5202381e36108cbeb7ac75869c9b49ac5`. All uploaded synthetic JSON/PNG
artifacts are retained unchanged. The diagnostic explicitly records
`accepted: false`; it does not activate a production font or pass M4/M7.

Same-context original aliases and the byte-identical roundtrip have zero pixel
differences in canvas and explicit optical-size DOM controls. The intentionally
excluded-font control uses the expected fallback. The rejected subset's full
canvas fixture differs only at U+201D (right double quotation mark); the extra
coverage fixture also exposes U+2019 (right single quotation mark). Their
individual-character and cluster comparisons locate the same differences with
unchanged advances. Euro, Portuguese composed/combining text, NBSP and the other
normal fixture characters do not account for the mismatches. The U+10FFFF
missing-glyph control differs separately. CDP reports the custom Inter font
rather than a system-font fallback for the normal glyph fixture.

The explicit DOM optical-size comparisons also reproduce differences. This
localizes the failure but does not identify an OpenType table cause. The old
candidate remains rejected. A separately pinned, inactive candidate retains
original glyph IDs, raw retained glyph/variation blocks, layout/metric tables
and .notdef; its next diagnostic must keep these original controls and the
known rejected candidate as a negative control. Even perfect diagnostic pixels
would still require complete typography-role and application verification.
