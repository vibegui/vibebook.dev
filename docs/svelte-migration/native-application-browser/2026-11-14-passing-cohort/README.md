# First passing complete application cohort

[Run 43589003975](https://github.com/vibegui/vibebook.dev/actions/runs/43589003975)
passes at exact source head `e7b9263e784993cb5f11921110cc0c8c27f29908`.
Four original JSON reports are retained unchanged; `runner.json` records byte
counts and SHA-256 identities. The workflow builds current source and runs an
actual disposable Worker with Book, D1, R2 and DocRoom.

Verified outcomes:

- All seven core phases: supported setup/variant identity, Home/room/thread/Back
  and scoped drafts, native send/ACK/peer update, unpinned reading anchor through
  full Board and a hidden update, R2 Viewer history, bidirectional native/vanilla
  Unicode Yjs edits, and mobile sidebar/Viewer navigation.
- Editor warmup and all twenty room/thread/editor socket lifecycle cycles.
- All eight English/Portuguese, light/dark, desktop/mobile Root profiles, with
  zero recorded axe violations, semantic palette/font checks, modal keyboard
  containment/focus return, and confirmed mobile sheet-history departure.
- Actual room-App upload/open/read through each frontend's real interface.
  Both native and plain default-vanilla variants perform the authorized initial
  readonly call, then receive explicit denial after replacement navigation in
  the same iframe/WindowProxy. A silent initial read or replacement is not a pass.

No uncaught page errors are recorded. This is not production, real-provider
intelligence, every feature/error/permission path, hardware/Safari, BFCache or a
blanket heap/observer-retention claim. The HTML-review provider follows a
controlled ALLOW/DENY protocol fixture. Performance budgets remain failed in the
separate complete benchmark. Current-main additions and later source changes
require their own verification; M0–M8 and maintainer sign-off remain open.
