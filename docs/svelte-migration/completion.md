# Full migration acceptance report

Status: **in progress, not accepted**. This report tracks evidence against
`../svelte-full-migration-plan.md`; it does not replace its conditions. Vanilla
remains the default and Svelte requires `?ui=svelte`.

The sole migration PR is [#1](https://github.com/vibegui/vibebook.dev/pull/1).
PR #2 is closed, with its work preserved in #1. No final deployed revision or
maintainer acceptance is recorded yet.

The first complete passing actual-Worker cohort is source head `e7b9263`,
[run 43589003975](https://github.com/vibegui/vibebook.dev/actions/runs/43589003975).
Its [unchanged reports and receipt](native-application-browser/2026-11-14-passing-cohort/README.md)
prove all seven core phases, twenty editor/socket cycles, all eight application
profiles and both native/default-vanilla App initial-read/replacement-denial
controls. The [controlled HTTP document suite](app-document-browser/2026-11-14-file-post/README.md)
also passes at that head. This clears the observed target-routing and profile
failures at this revision, not final migration or deployed acceptance.

Latest complete performance evidence is source head `b292537`: all 32 desktop
and mobile trials execute successfully, but twelve of sixteen budget comparisons
fail. [The original results and receipt](performance/2026-11-14-full-native/README.md)
retain the unchanged limits. Execution success is not performance acceptance;
the runner now makes failed or unverified budgets fail its CI exit code.

At that head, [source HMR passes](https://github.com/vibegui/vibebook.dev/actions/runs/43585067909)
and the production room-layout browser passes. The integrated Worker cohort
again completes its seven core phases and twenty socket/editor cycles. Overall
acceptance remains open: mobile sheet history and selected dark panel counts
fail profile checks, and the initial App read is inconclusive. The controlled
HTTP proof observes a valid POST opening a separate page while the intended
opaque iframe stays blank. Pre-insertion target naming, independently owned
concurrent navigation dialogs, sheet-history adoption and semantic count-color
fixes require final-head browser confirmation. Repository failures in font
diagnostic inference and Mac module-path classification also have source fixes
awaiting the combined checks. Preview assets require regeneration afterward.

The newer clean source checkpoint `ba8e529` passes the complete frozen-install
Linux/macOS repository matrix, committed preview asset consistency and neutral
production RoomLayout Chromium job in
[run 43562169505](https://github.com/vibegui/vibebook.dev/actions/runs/43562169505).
Its integrated lifecycle and controlled performance jobs still failed; source
CI does not establish browser, performance or deployment acceptance.

| Gate | Current evidence | Remaining proof |
| --- | --- | --- |
| M0 inventory/parity | `inventory.json`, `feature-parity.md`, `change-ledger.md`, frozen Studio references | Complete current feature/state/route verification references and reconcile final main |
| M1 strict architecture | Separate strict projects, schema contracts, client-boundary negative fixtures; all-green source checkpoint `ba8e529` | Final-head full checks and remaining boundary/interop assertion audit |
| M2 inferred RPC | `api-coverage.md`, generated Hono declarations and negative type fixtures | Final coverage audit and runtime failure cases for every migrated operation |
| M3 Tailwind | Sole authored entry `svelte/styles/tailwind.css`, full style audit; approved scoped xterm exception | Final-head source and emitted graph checks |
| M4 Studio theme | Frozen public/authenticated references, original self-hosted Inter/CommitMono assets and semantic token projection | Actual application profile comparisons, interactive states and final visual acceptance |
| M5 atomic/accessibility | Owned atomic components and interaction tests; real application profile harness | Eight profile runs, keyboard/axe results, 768px visual evidence and manual screen-reader checks |
| M6 native application | Native root and feature owners; host/production registry removed; seven real Worker phases and 20 socket/editor lifecycle cycles pass | Full parity matrix, final-head retention analysis, remaining provider/error/permission workflows and persistence acceptance |
| M7 development/regression/performance | Frozen-install Linux/macOS CI, actual source HMR, real Worker browser workflow, complete 32-trial desktop/mobile performance evidence | Final generated artifacts, final-head HMR/browser cohort and passing measured budgets |
| M8 publish/coexistence | Independent vanilla build/default routing retained | Successful deployment, authenticated production side-by-side collaboration, rollback and maintainer acceptance |

## Actual native application browser evidence

[Run 43558762566](https://github.com/vibegui/vibebook.dev/actions/runs/43558762566)
tests PR head `3357e09` through GitHub's merge revision
`9a4eb2a6e9a1224b27283c5b140a6e3950762177`. The retained
[results](native-app-integration/current-root/2026-11-14/results.json) and
[runner receipt](native-app-integration/current-root/2026-11-14/runner.json)
report a **failed overall run**, with these passing real Worker phases:

- Supported HTTP/MCP fixture setup through Book, D1 and R2, with variant/version checks.
- Home/room/thread/Back navigation with application-owned room/thread drafts.
- Native UI compose, real Worker ACK/canonical WebSocket update and second native client.
- Unpinned reading anchor preserved across full Board and a hidden peer update, followed by repin and own-send checks.
- R2 Viewer and actual browser Back/Forward.
- Bidirectional native/vanilla live Unicode document edits through Yjs/DocRoom, including the real MCP markdown mirror.
- Mobile sidebar/thread and Viewer/sheet navigation.

Editor lifecycle warmup and cycle 1 passed. Cycle 2 failed its expected socket
count assertion; this run does not retain enough failure-time socket detail to
classify the cause. Twenty cycles are not proven. The later eight-profile and
replacement-app authority cohorts were not reached. No uncaught page errors
were recorded, and owned process cleanup reports zero remaining groups.
This is disposable local Worker evidence, not production or real-provider proof.

The next [run 43560795530](https://github.com/vibegui/vibebook.dev/actions/runs/43560795530),
at head `9a10d09`, again passed the seven core phases. Its added socket diagnostics
observed two Book connections for the same room during lifecycle cycle 1, versus
the required one; personal and Yjs counts were each one. This establishes the
observed count mismatch, but does not yet distinguish failed application disposal
from a delayed transport close handshake. No timeout or lifecycle assertion is
relaxed. The root cause and a passing 20-cycle rerun remain required.

The later [run 43563524139](https://github.com/vibegui/vibebook.dev/actions/runs/43563524139)
at `743a4e0` explicitly completed server close acknowledgements and passed all
seven core phases plus **all twenty lifecycle cycles**, with all 66 observed
closes clean and completed within 27 ms. Its overall result remains failed:
all eight profile runs found Home `link-in-text-block` accessibility violations,
and the replacement-app probe was inconclusive during upload setup. Home palette
comparisons recorded zero mismatches; later Room/font/interaction checks still
need to pass. The inline Home link now has a persistent underline for the rerun.
Original reports and exact artifact identities are retained in
[the run 8 receipt](native-application-browser/2026-11-14-run8/README.md).
See [the socket analysis](socket-close-handshake.md) for the remaining heap and
observer limitations; passing socket/editor assertions are not a blanket
leak-free claim or production acceptance.

## Performance and deployment

The archived [controlled report](performance/2026-11-13/README.md) failed budgets
and predates the native root. Later native runs passed preflight, then
[run 43563593700](https://github.com/vibegui/vibebook.dev/actions/runs/43563593700)
completed both desktop warmups and seven alternating measured runs per variant.
Readiness, thread switch, first history load, initial JS/CSS bytes, font transfer
and post-GC heap all exceeded the agreed desktop budgets. The mobile cohort
stopped on a hidden room-switch control during its first warmup; its medians
remain unverified. Original safe samples and exact source/asset identities are
retained in [the partial native report](performance/2026-11-14-native-desktop-partial.md).
The mobile navigation fixture is corrected for a rerun. The declared workload,
seven measured runs per variant/device and original budgets remain unchanged;
there is no performance acceptance or approved amendment.

Cloudflare preview builds have failed without exposing the provider error in
GitHub output. Provider logs and successful deployment are still required;
an asset artifact is not an online release.

## Final sign-off

Deployed commit, vanilla/Svelte URLs, final check identifiers, current schema/RPC
audit, Studio/profile/accessibility comparisons, performance samples, tested
rollback, maintainer and acceptance date are **pending**. No open condition is
waived by this report. The full goal remains active.

### Document-channel and deferred-view checkpoint (06b0a7e)

The sole PR now includes deferred native views, an owned serial bootstrap
watcher and document-bound Apps in both frontends. The expanded real Chromium
channel suite passed [43575694148](https://github.com/vibegui/vibebook.dev/actions/runs/43575694148),
including the installed stock SDK, second-origin replacement denial, held
outputs/consent, fresh reopening and permanently revoked subframe history.
[The retained receipt](app-document-browser/2026-11-14-adversarial/README.md)
explicitly excludes actual BFCache admission and application/provider acceptance.

The real Worker run [43575694166](https://github.com/vibegui/vibebook.dev/actions/runs/43575694166)
passes all seven functional phases and 20 lifecycle cycles with no page errors.
It does **not** pass overall: all eight Room profiles stop at delivered-avatar
contrast, and the authenticated room-App's initial read times out. Replacement
authorization is therefore inconclusive in the actual application at this head.
The standalone channel result does not clear this application gate. The contrast
fix and safer frame/navigation diagnostics require reruns.

Repository run [43575694145](https://github.com/vibegui/vibebook.dev/actions/runs/43575694145)
also fails source checks: a stale raw-iframe-src DOM assertion, a font diagnostic
inference error and an Ubuntu provider-test failure caused by another fixture
leaving global fetch mocked. These fixes and a pre-flush embed reopen regression
are being integrated. Committed native preview assets also require regeneration.
No performance, final feature matrix, deployment or migration completion is
claimed by these intermediate checks.
