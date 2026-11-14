# Native application integration checks

This is partial source verification, not M0–M8 completion or deployment acceptance.
Vanilla remains the default. The Svelte preview still contains legacy integration
code. Remaining source ports require a fresh build and their own verification.

## Opt-in release checkpoint

[PR #1](https://github.com/vibegui/vibebook.dev/pull/1) is open. The complete
repository check passed at `5e557cd` in
[GitHub CI](https://github.com/vibegui/vibebook.dev/actions/runs/43520656881).
At `112e264`, the expanded Linux/macOS matrix passes on Linux but fails one
negative file-serving case on macOS. The ancestor-alias fix at `653fb23` then
passes the complete repository check on both systems in
[CI run 43528056645](https://github.com/vibegui/vibebook.dev/actions/runs/43528056645).

The production Vite build at `112e264` passed (1,054 modules, 2m 2s). Its generated
public assets are byte-identical to the committed preview assets. The path-policy
change therefore needs no claim of a fresh feature-browser run. Browser evidence
and its actual source/artifact revisions are recorded in [browser/README.md](browser/README.md).

Consent follow-up `63b94b8` / formatted `687588e` fixes a separate stale-control
bug: a rendered Allow button could consume the next queued question before DOM
replacement. A keyed Snapshot captures the original immutable question, and the
queue checks that exact identity. The focused compiled-Svelte regression passes
**1 test / 17 assertions**, including a second question explicitly cancelled and
an old button clicked before and after DOM cleanup. The production rebuild passes
**1,056 modules / 2m 12s**, with preview query `96a70cd6bd0211a9eee5`. Only preview
assets change. Fresh full CI remains required for this follow-up; earlier browser
and performance evidence is not relabeled as a rerun of these assets.

Both Cloudflare preview build checks are failing. GitHub exposes dashboard links
without the build error; the cause remains unknown pending dashboard logs. No
deployment or production acceptance is claimed.

The [controlled performance report](../performance/2026-11-13/README.md) records
measured readiness, navigation and byte-budget regressions. It is diagnostic
evidence, not a passing M7 result. Account/Agents/Apps and other subsequent source
ports remain separate from this release checkpoint. The older sections below
are historical receipts for the revisions they name.

## Combined document/sidebar checkpoint

At `1a635aa`, the combined room component suite passes **82 tests and 563
assertions** ([log](components.log)). It covers the integrated native chat,
composer/poll/draft/speech capability fixtures, sidebar/header/suggestion ownership,
and existing task/board/file/People/reminder/decision cases. These are compiled
Svelte components in Happy DOM, not browser geometry or real service evidence.

`bun run check:ui` passes **zero errors and zero warnings** at `7993c0d`
([log](svelte-check.log)); subsequent changes through `1a635aa` only add/format
browser fixtures and correct component-test synchronization/selectors. The
production Svelte component source is unchanged. `check:tooling` passes at
`7993c0d`; the later document browser fixture still requires its own tooling pass.

The earlier full component run exposed premature focus assertions after the new
ACK/canonical pipeline. A focused trace reached the assertion; formatting the
mismatched DOM graph stalled Bun's diagnostic output. The corrected test waits
for the actual expected focus across bounded animation frames, retains strict
node identity and intervening-focus protection, and reports identity as a boolean.
The remaining poll submit lookup now normalizes button whitespace. The final
combined run passes with those assertions intact.

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

At source `ea2e3a7`, `bun run test:build` passes 67 tests and 2,618 assertions
([log](build-tests.log)). This includes negative client/server import and Vite
source-serving fixtures, default/preview separation, development proxy byte and
origin handling, and startup supervisor ownership. These fixture results do not
replace the real application HMR browser gate. `bun run test:rpc` also passes
49 tests and 448 assertions ([log](rpc-tests.log)), including schema/route,
service-boundary, private-file cache and document-scope fixtures.

The backend/MCP/CLI type commands completed at this source checkpoint; the
combined backend command initially failed at its final translation check.
`ea2e3a7` fixes Portuguese/English draft recovery keys and the separately rerun
translation check passes. A later integrated full command remains required.

## Remaining acceptance

Run the strict Svelte/tooling/backend checks after final source integration,
the complete component suite, style and bundle isolation checks, and a fresh
preview build. Then run the actual Worker/browser suites, including mobile
Back/Forward, cookie-partitioned file access, real Yjs collaboration and member
revocation, auth/provider lifecycle, and application HMR. Component fixtures do
not prove browser layout, network behavior, push delivery or platform speech.

Final feature, Studio-theme, performance, publication and maintainer acceptance
are governed by [the complete migration plan](../../svelte-full-migration-plan.md).
