# Native application integration checks

This is partial source verification, not M0–M8 completion or deployment acceptance.
Vanilla remains the default. The Svelte preview still contains legacy integration
code, and its generated assets require rebuilding after the remaining ports land.

## Checked source

Integration source: `3b178f2d74b3d7f2df9d7e4981d609a2aaeebae6`.
It includes native Viewer/Composer, document backend scope guards, and vanilla
changes through `3fff34f`. Native document and sidebar source ports are separate,
pending integration; their author tests do not prove this application revision.

- `bun test scripts/native-file-viewer.test.ts`: 16 tests, 81 assertions pass.
  The execution preceded the test-only browser-global/DOM-selector corrections
  in `3b178f2`; the tested model source is unchanged.
- `bun test --conditions=browser scripts/native-file-viewer-dom.test.ts`:
  3 tests, 13 assertions pass against this revision. The committed
  [component log](viewer-dom.log) covers exact version selection, detached-control
  disposal, and bounded CSV pagination with persistent column headers.
- `bun run check:worker-tests`: passes against this revision, including the
  authoritative document-scope fixtures.
- `bun run check:tooling`: passes against this revision, including the native
  Viewer browser/component and Composer model fixtures.

The earlier combined Svelte check found one error and zero warnings: a class
array passed to the string-typed Textarea atom. `ba65506` composes those classes
with the existing `cn` helper. The tooling check found a browser-fixture upload
variable shadowing the browser `document`; `3b178f2` renames it. Neither earlier
failed run is a passing type-check result. The tooling rerun now passes; the
Svelte rerun remains pending.

## Remaining acceptance

Run the strict Svelte/tooling/backend checks after final source integration,
the complete component suite, style and bundle isolation checks, and a fresh
preview build. Then run the actual Worker/browser suites, including mobile
Back/Forward, cookie-partitioned file access, real Yjs collaboration and member
revocation, auth/provider lifecycle, and application HMR. Component fixtures do
not prove browser layout, network behavior, push delivery or platform speech.

Final feature, Studio-theme, performance, publication and maintainer acceptance
are governed by [the complete migration plan](../../svelte-full-migration-plan.md).
