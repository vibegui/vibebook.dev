# Native foundation verification

This is incremental evidence for the Studio/Tailwind primitives, gallery and native Inbox. It does not close any full-application theme, styling, feature-parity or production acceptance gate.

[browser.json](browser.json) records the tested source commit, equivalent merged preview revision, file hashes, explicit fixtures, token/role comparisons, accessibility results and limitations. The complete Gallery and Inbox run passed using `bun run test:design-system` against a local Worker with `DEV_EMAIL=codex-test@example.test` and grading disabled.

- All 134 frozen Studio tokens, including dimensions, shadows and easing, and nine rendered roles match in light/dark at DPR 1 and 2. The high-density half-pixel border is included.
- Local Inter and Commit Mono load successfully; computed families and action weight match. The unused italic face is registered but is not claimed as loaded by this fixture.
- Gallery light/dark/mobile and Inbox mobile report zero axe WCAG 2 A/AA and 2.1 AA violations. Keyboard controls, modal focus trapping/restoration and scroll cleanup pass.
- Inbox verifies close/reopen during delayed resolve, recoverable HTTP 500 with retained data/retry, native switcher Escape handoff and real cross-room navigation retaining `ui=svelte` and the message hash.
- The intentional HTTP 500 is recorded separately. Two API requests aborted during navigation are retained in the raw result; no required font/application asset failed.
- The gallery's real Vite check preserves a filled form through child Button and stylesheet hot updates, with zero full navigations/errors. Both source files are restored byte-for-byte. Reproduction steps are in [design-system.md](../design-system.md).

Representative built-asset screenshots:

- [Light gallery, 1440px](gallery-light-1440.png)
- [Dark gallery, 1440px](gallery-dark-1440.png)
- [Dark gallery, 390px](gallery-dark-390.png)
- [Dark sheet, 390px](sheet-dark-390.png)
- [Native Inbox within the transitional app, 390px](inbox-390.png)

Authenticated Studio workspace typography/screenshots, all-screen consistency, complete native ports, full-app/backend/shared-contract HMR, final performance budgets and authenticated production A/B acceptance remain pending. The background application visible behind the native Inbox is still the transitional host.
