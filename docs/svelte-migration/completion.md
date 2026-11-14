# Full migration acceptance report

Status: **in progress, not accepted**. This report tracks evidence against
`../svelte-full-migration-plan.md`; it does not replace its conditions. Vanilla
remains the default and Svelte requires `?ui=svelte`.

The sole migration PR is [#1](https://github.com/vibegui/vibebook.dev/pull/1).
PR #2 is closed, with its work preserved in #1. No final deployed revision or
maintainer acceptance is recorded yet.

The latest retained passing actual-Worker cohort is associated with source head
`c3e057c`, tested as PR merge `1ca5434499cb6b182043b7f077531cfe237e72fd` in
[run 43595260339](https://github.com/vibegui/vibebook.dev/actions/runs/43595260339).
Its [unchanged reports and exact provenance](native-application-browser/2026-11-14-current-parity/README.md)
cover the seven core phases, twenty editor/socket cycles, eight English/Portuguese
light/dark desktop/mobile profiles without axe violations, the new canonical
endcard task lifecycle, and native/default App initial-read/replacement-denial.
The standalone App transport suite also passes in
[run 43595260356](https://github.com/vibegui/vibebook.dev/actions/runs/43595260356).
The earlier [controlled HTTP document proof](app-document-browser/2026-11-14-file-post/README.md)
retains actual same-frame POST routing and denial evidence. These functional
results do not establish production, real-provider intelligence or performance
acceptance.

Latest complete performance evidence is source head `b292537`: all 32 desktop
and mobile trials execute successfully, but twelve of sixteen budget comparisons
fail. [The original results and receipt](performance/2026-11-14-full-native/README.md)
retain the unchanged limits. Execution success is not performance acceptance;
the runner now makes failed or unverified budgets fail its CI exit code.

[Source HMR passes at `b292537`](https://github.com/vibegui/vibebook.dev/actions/runs/43585067909);
final-head revalidation remains required. At `d8b99e5`, all repository gates pass
on Linux and macOS in
[run 43597320317](https://github.com/vibegui/vibebook.dev/actions/runs/43597320317).
Its remaining CI failure is stale checked-in preview artifacts. BugMachine also
independently passes Svelte with zero errors/warnings, tooling and all 110 UI/DOM
tests. Preview assets must be rebuilt from the final source and checked again.

Main through `12d68b7` is merged at `bb53b6e`, preserving default vanilla,
router and CLI changes. Its newer in-place room Inbox, mobile edge Back and
Local Network Access guidance are being reconciled natively and are outside
the retained earlier browser cohort. Original Studio fonts remain active: the
inactive CSS-range candidate failed its fidelity matrix. No font or performance
amendment is assumed. A bounded default textarea sizing change has focused
handler and synthetic browser checks, without an end-user latency claim.

| Gate | Current evidence | Remaining proof |
| --- | --- | --- |
| M0 inventory/parity | `inventory.json`, `feature-parity.md`, `change-ledger.md`, frozen Studio references | Complete current feature/state/route verification references and reconcile final main |
| M1 strict architecture | Separate strict projects, schema contracts, client-boundary negative fixtures; repository gates pass Linux/macOS at `d8b99e5` | Final-head full checks and remaining boundary/interop assertion audit |
| M2 inferred RPC | `api-coverage.md`, generated Hono declarations and negative type fixtures | Final coverage audit and runtime failure cases for every migrated operation |
| M3 Tailwind | Sole authored entry `svelte/styles/tailwind.css`, full style audit; approved scoped xterm exception | Final-head source and emitted graph checks |
| M4 Studio theme | Frozen public/authenticated references, original self-hosted Inter/CommitMono assets, semantic token projection and eight passing real application profiles | Final-head interactive states, full token comparison and final visual acceptance |
| M5 atomic/accessibility | Owned atomic components and interaction tests; eight passing real application profiles with keyboard/focus and zero axe violations | Final-head regression, 768px visual evidence and manual screen-reader checks |
| M6 native application | Native root and feature owners; host/production registry removed; seven real Worker phases and 20 socket/editor lifecycle cycles pass | Full parity matrix, final-head retention analysis, remaining provider/error/permission workflows and persistence acceptance |
| M7 development/regression/performance | Frozen-install Linux/macOS CI, actual source HMR, real Worker browser workflow, complete 32-trial desktop/mobile performance evidence | Final generated artifacts, final-head HMR/browser cohort and passing measured budgets |
| M8 publish/coexistence | Independent vanilla build/default routing retained | Successful deployment, authenticated production side-by-side collaboration, rollback and maintainer acceptance |

## Historical native application browser failures

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
GitHub output. The current vanilla main was reported deployed by Gui; this is
not proof of the final migration preview deployment. BugMachine's existing
Wrangler login has access to a different account from the project's configured
account, so it does not resolve the missing provider logs. Provider diagnostics
and successful final deployment remain required; an asset artifact is not an
online release.

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
