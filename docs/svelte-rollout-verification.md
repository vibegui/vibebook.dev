# Svelte opt-in rollout verification

The opt-in implementation is locally verified on `codex/svelte-rollout`, based on main `fbbd82b`. Online publication remains with the authenticated integration agent; this report does not claim a production deployment.

Normal `/app` and `/b/ROOM` URLs stay vanilla. `?ui=svelte` selects a separate preview shell, stylesheet, module directory and editor bundle. Selection is per URL, with no account/global cookie assignment. Both versions share authorization, room data and the backend.

## Results

- Full `bun run check`: passed on the release candidate. Backend/UI/tooling types, protocol checks, 44 Vite boundary build fixtures, generated-asset consistency and formatting pass. Svelte reports zero errors and warnings. Automated suites: 56 tests / 237 assertions, including 14 Bun boundary tests.
- Actual preview/editor and MCP builds: passed. The standalone vanilla Inbox build remains available through `build:vanilla-ui` and writes only its own output directory.
- `public/app.html`, `public/svelte/ui.js` and `public/collab.js` are byte-identical to main `fbbd82b`. The preview build consistency check also snapshots these assets to reject accidental rewrites.
- Real local Worker/browser checks: passed in English desktop and Portuguese mobile contexts, plus a default vanilla client. Bidirectional cross-variant task updates, zero preview module requests from vanilla, distinct shell/API release versions, preview reload, home/Back/room navigation, active editor teardown, escaped chat, replies, uploads, pins, board keyboard/list, Inbox, malformed HTTP input and two live Yjs editors pass with zero page errors. See `svelte-rollout-browser-results.json`.
- Public login checks: vanilla and Svelte selection, asset isolation and Google/GitHub continuation links pass with zero page errors. Provider availability was mocked locally to inspect both links; no external OAuth authorization was performed.
- The local browser run reached readiness in 66.8 seconds on a constrained ARM machine under memory pressure. These are functional checks; the run is not a controlled performance comparison.
- Background AI classification was not exercised: the local Worker has no OpenRouter key. No production room data was written by these checks.

## Integration and online acceptance

The source delivery excludes generated preview JavaScript because the room's secret filter mistakes minified parser `token=...` assignments for credentials. From the documented base, apply the cumulative source diff with three-way conflict handling, install the frozen lockfile, run `build:collab:svelte`, `build:ui`, `build:mcp`, then `check`. Commit all generated preview chunks and its shell. Preserve changes added to vanilla main after the base, including PWA/web-push work; the cumulative diff has no changes to the three vanilla assets above.

After publication, test these URLs with the same account:

- Vanilla: `https://vibebook.dev/b/f94aedb83899`
- Svelte: `https://vibebook.dev/b/f94aedb83899?ui=svelte`
- Svelte migration thread: `https://vibebook.dev/b/f94aedb83899?t=4e27ed8b&ui=svelte`

Those are target URLs, not a claim they are deployed. Ordinary URLs must return `x-vibebook-ui: vanilla`; opt-in app/login routes must return `x-vibebook-ui: svelte`. Confirm shared room data in a designated test room, version-specific update metadata, authentication continuation and reload/Back navigation after deployment. Record the deployed commit and both working links in the migration epic.

Vanilla remains the default after acceptance testing as well, until a separate explicit adoption decision changes it. The later schema/RPC/legacy-host milestones are in `svelte-rollout-plan.md`.

Latest-main integration keeps the vanilla web-push tables/index, service worker, PWA banner and CLI 1.6.7 updates from `fbbd82b`. The only merge conflict was adjacent schema additions; both the sandbox index and web-push table/index are retained. Preview browser flows were verified before that merge; the merged backend is covered by a fresh required check.
