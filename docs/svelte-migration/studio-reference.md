# Studio reference baseline

Source: https://studio.decocms.com/assets/index-69S-cBsb.css, captured 2026-11-12. SHA-256: `eb3311919cdb7d1d1ff2dfb8d422e3d449526450239c572f194b35de1f4aaafb`.

`studio-tokens.json` records root theme declarations, all unconditional dark overrides, the ordered reference rules (including `@supports` contexts), Tailwind theme variables and supplied font-face metadata extracted from that exact public stylesheet using PostCSS. Conditional color-mix overrides remain explicit rather than being applied to unsupported browsers. It is reference data, never a stylesheet imported into the Svelte application.

Reference correction: the initial snapshot captured only the first `.dark` block. The CSS syntax-tree review found later sidebar/status/shadow overrides and conditional control colors; those are now included. Derive the effective browser palette from the complete rule list and supported conditions, not from the first dark block alone.

Reproduce the frozen source extraction with `bun run capture:studio` (downloads the pinned URL and verifies its digest), or `bun scripts/capture-studio.ts /path/to/captured.css` for an offline copy with that same digest. The AST capture records 134 light tokens, 59 unconditional dark overrides and 13 ordered reference rules. It preserves conditional contexts instead of flattening support-dependent values.

Initial implementation: `svelte/styles/tailwind.css` namespaces semantic tokens as `--vb-*`, maps them to Tailwind utilities and registers digest-named, self-hosted Inter variable normal/italic and CommitMono files. Source URLs, hashes and OFL notices are recorded in `font-assets.json` and `public/fonts/studio/`. The new primitives and native Inbox consume these tokens. The other panels and legacy host are still pending migration; their historical styles do not establish theme completion.

Verified source declarations: Inter variable/Inter sans stack, CommitMono monospace stack, normal/medium/semibold/bold mappings 400/500/500/600, and the semantic light/dark palette. A Switzer font face exists; actual heading usage must be established before choosing it for a role. Font assets and required notices must be verified before redistribution.

Pending M4 evidence: authenticated workspace screenshots, computed typography by role, interactive state samples, actual font loading/usage, and zero unexplained light/dark token/typography mismatches in the implemented app. Source extraction alone does not complete M4 or establish that a login-page theme matches every workspace override.
