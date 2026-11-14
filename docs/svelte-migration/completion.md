# Full migration acceptance report

Status: **in progress, not accepted**. This report tracks evidence against
`../svelte-full-migration-plan.md`; it does not replace its conditions. Vanilla
remains the default and Svelte requires `?ui=svelte`.

The sole migration PR is [#1](https://github.com/vibegui/vibebook.dev/pull/1).
PR #2 is closed, with its work preserved in #1. No final deployed revision or
maintainer acceptance is recorded yet.

| Gate | Current evidence | Remaining proof |
| --- | --- | --- |
| M0 inventory/parity | `inventory.json`, `feature-parity.md`, `change-ledger.md`, frozen Studio references | Complete current feature/state/route verification references and reconcile final main |
| M1 strict architecture | Separate strict projects, schema contracts, client-boundary negative fixtures; historical all-green checkpoint `b247805` | Final-head full checks and remaining unchecked external/stored JSON and interop assertion audit |
| M2 inferred RPC | `api-coverage.md`, generated Hono declarations and negative type fixtures | Final coverage audit and runtime failure cases for every migrated operation |
| M3 Tailwind | Sole authored entry `svelte/styles/tailwind.css`, full style audit; approved scoped xterm exception | Final-head source and emitted graph checks |
| M4 Studio theme | Frozen public/authenticated references, original self-hosted Inter/CommitMono assets and semantic token projection | Actual application profile comparisons, interactive states and final visual acceptance |
| M5 atomic/accessibility | Owned atomic components and interaction tests; real application profile harness | Eight profile runs, keyboard/axe results, 768px visual evidence and manual screen-reader checks |
| M6 native application | Native root and feature owners; host/production registry removed; real Worker functional evidence below | Full parity matrix, 20 lifecycle cycles, remaining provider/error/permission workflows and persistence acceptance |
| M7 development/regression/performance | Frozen-install Linux/macOS CI, actual Worker browser workflow, controlled performance workflow | Final generated artifacts, HMR acceptance, full browser cohort and measured budgets |
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

## Performance and deployment

The archived [controlled report](performance/2026-11-13/README.md) failed budgets
and predates the native root. Current controlled runs stopped during shell
preflight and produced no timing samples. Neither is passing final M7 evidence.
The declared workload, seven alternating measured runs per variant/device and
original budgets remain required.

Cloudflare preview builds have failed without exposing the provider error in
GitHub output. Provider logs and successful deployment are still required;
an asset artifact is not an online release.

## Final sign-off

Deployed commit, vanilla/Svelte URLs, final check identifiers, current schema/RPC
audit, Studio/profile/accessibility comparisons, performance samples, tested
rollback, maintainer and acceptance date are **pending**. No open condition is
waived by this report. The full goal remains active.
