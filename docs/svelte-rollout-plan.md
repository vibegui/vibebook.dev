# Svelte rollout and migration plan

The immediate deliverable is an online Svelte preview that can be opened beside the current vanilla application against the same room. Vanilla remains the default until Gimenes and Gui accept the Svelte version. New vanilla fixes must continue to reach the preview where relevant; the vanilla app remains maintained throughout the experiment.

## Version selection and isolation

| Surface | Vanilla default | Svelte opt-in |
| --- | --- | --- |
| Home | `/app` | `/app?ui=svelte` |
| Room | `/b/ROOM` | `/b/ROOM?ui=svelte` |
| Thread | `/b/ROOM?t=EPIC` | `/b/ROOM?t=EPIC&ui=svelte` |
| HTML asset | `public/app.html` | `public/app-svelte.html` |
| Browser modules | Existing `public/svelte/ui.js` Inbox | `public/svelte-preview/*.js` |
| Styles | Existing inline vanilla styles | `public/app-svelte.css` |
| Collaborative editor | Existing `public/collab.js` | `public/collab-svelte.js` |

Selection is explicit in each URL. There is no global cookie, account preference or random assignment that switches another tab into Svelte. Navigation inside the preview retains its marker. Removing `ui=svelte` returns to vanilla. Both versions use the same authenticated backend and persistent room state: actions in either version are real writes, visible in the other.

Each shell has its own ETag and update version. A preview rebuild must not rewrite the vanilla shell, Inbox or editor bundles. `build:ui` builds preview assets; `build:vanilla-ui` explicitly rebuilds the vanilla Inbox. `build:collab:svelte` builds only the preview editor. Existing backend authorization and membership checks apply to both versions.

## Milestones and acceptance gates

| Milestone | Work | Exit criteria |
| --- | --- | --- |
| 1. Online side-by-side preview | Rebase onto current main, preserve vanilla assets, add explicit routing, verify version isolation and live cross-client updates; hand off to authenticated integration/deployment agent. | Vanilla URLs render vanilla and request no preview modules; opt-in renders Svelte; reload/back/thread/room navigation retains choice; independent update versions; live messages/tasks/docs agree; both online URLs verified after deployment. |
| 2. Fair performance comparison | Large local fixture of 1,000 messages, 30 epics and 200 tasks; complete vanilla vs complete preview; equivalent reduced room paths if testing a lean Svelte entry. | Same data, DOM content, history window and actions; seven alternating rounds per variant on desktop and phone with 4x CPU throttling; raw samples, medians, gzip requests, readiness, thread switch, history loading and heap published. No complete-app size claim from a reduced feature set. |
| 3. Schema-derived contracts | Replace paired DTO interfaces/validators incrementally, starting with posting/upload; preserve WebSocket rolling compatibility. | Types derive from runtime schemas; malformed input/response and legacy event regressions pass; browser boundary holds; measured bundle cost recorded. |
| 4. Inferred HTTP RPC | Introduce typed Hono route exports and client adapters for posting/upload, then other endpoints. | Client payload/response changes follow server inference; strict checks on both sides; type-only backend references erase from browser output; runtime validation/auth remain enforced. |
| 5. Remove preview legacy seams | Extract routing, composer, document/editor, account and embed integrations into typed modules/components in that order. Delete each replaced preview implementation after coverage. | Each extraction preserves real flows and can be reviewed independently; no import of `svelte/legacy/host.js` in the final preview build; vanilla implementation remains intact. |
| 6. Developer experience and adoption | Add preview HMR, set performance budgets from the accepted benchmark, triage A/B feedback, verify production behavior and agree rollback. | Explicit Gimenes/Gui acceptance before any default switch. Changing the default or removing vanilla is a separate decision. |

Milestone 1 can ship before completing the later milestones. The initial preview remains an incremental migration with a JavaScript integration host; it must not be described as fully converted or a proven performance improvement.

## Collaboration

The Gimenes agent owns the opt-in implementation, shared contracts and typed migration changes on `codex/svelte-rollout`. Vibegui's agent is asked to own the independent large-room fixture/benchmark and the authenticated integration/deployment path. The benchmark epic is `a4de3792`; the migration and release coordination stays in `4e27ed8b`. Ownership and branch details are confirmed in the room before overlapping implementation work.

Before integration, review current-main differences and carry over relevant vanilla fixes into preview modules. Before deployment, run required checks, inspect the diff proving vanilla assets are preserved, and test both variants locally. After deployment, verify `/app` and `/b/ROOM` remain vanilla, verify the corresponding opt-in URLs load Svelte, and check cross-client updates in a designated test room. Record the deployment commit and both links in the epic.

Rollback of the preview means returning testers to ordinary URLs and disabling/removing its selection branch if necessary. It does not require reverting current vanilla work or changing room data.

## Validation and implementation references

Run `bun run check`, then start the local Worker and run `bun run test:browser`. The browser suite checks the preview in desktop/mobile contexts and a vanilla client against the same backend. Record actual results and keep production verification separate from local checks.

The earlier review and historical measurements are in `adversarial-architecture-review.md` and `svelte-migration-verification.md`. [Hono RPC](https://hono.dev/docs/guides/rpc) supports route-derived client types; [Zod Mini](https://zod.dev/packages/mini) is an available schema option whose bundle cost must be measured; [Vite backend integration](https://vite.dev/guide/backend-integration) describes the development/HMR integration. Those are implementation references for later milestones, not reasons to delay the online preview.
