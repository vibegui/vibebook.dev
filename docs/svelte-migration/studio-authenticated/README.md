# Authenticated Studio workspace reference

Captured 2026-11-13 from a connected, authenticated Studio site-editor workspace.
The workspace/project route and all content are deliberately omitted. The JSON
records public stylesheet URLs, computed typography/color roles and loaded font
metadata; the screenshots contain only the generic Content control. The source
application remained on its original page and its original root class was restored.

Active public stylesheet:
[index-DYPWHH-M.css](https://studio.decocms.com/assets/index-DYPWHH-M.css),
304,736 bytes, SHA-256
`be4f9189010f38e29e5035103f18eedb86fe7a700f42c2ee7db3b951bf619f37`.
This explicitly supplements the archived 2026-11-12 public-source reference; do
not silently replace either source digest when Studio releases again.

| Observed role | Family | Weight | Size / line height | Tracking |
| --- | --- | --- | --- | --- |
| Body | Inter var | 400 | 16px / 24px | normal |
| Workspace display heading | Inter var | 500 | 22px / 27.5px | -0.44px |
| Compact pane heading | Inter var | 500 | 13px / 18px | -0.065px |
| Section heading | Inter var | 500 | 15px / 18.75px | -0.075px |
| Monospace badge | CommitMono | 400 | 11px / 16px | 0.11px |

These are observed roles, not permission to apply one heading/badge size to every
app component. Inter normal and CommitMono were actually loaded. Inter italic
and Switzer were declared but unloaded in the inspected workspace; Switzer is
not evidence of the heading family. The semantic weights remain 400/500/500/600.

- [Light computed data](light.json) records the original workspace appearance.
- [Dark computed data](dark.json) records a temporary CSS `dark` class on the
  same workspace DOM. The class was restored without changing persisted theme
  preferences or server state. This proves the stylesheet's dark-token rendering,
  not a provider-driven theme-switch lifecycle or canvas renderer behavior.
- The [reference comparison](reference-comparison.json) compares 136 selected
  properties per mode with the archived source. Nine literal differences are
  explained by exact `var(--token)` alias expansion; no differences remain after
  that expansion. This is a reference-to-reference comparison, not a claim that
  every implemented application role or interaction already matches.

Actual generic control crops: [light](content-light.png), [dark](content-dark.png).
They were inspected before committing and contain no workspace/project content.

Reproduction: inspect an authenticated Studio workspace, record the active public
CSS asset/digest, read `getComputedStyle` for the listed roles and public semantic
custom properties, and enumerate `document.fonts` family/status/weight/style.
For a CSS-only dark sample, save the original root class, temporarily add `dark`,
measure and crop only generic controls, then restore the original class in a
`finally` block. Do not capture private content or persist a preference change.

M4 still requires implemented-app comparison, interactive state samples, full
representative component screenshots, and zero unexplained role/token/font
mismatches at the final deployed revision. This packet does not sign off M4.
