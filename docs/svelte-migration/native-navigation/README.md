# Native epic navigation verification

This slice replaces epic navigation with typed Svelte components, shared atomic controls and Tailwind utilities. It is incremental migration work: the surrounding sidebar, pins, people, rail, host and other screens still need native ports. Vanilla remains the default; Svelte is selected explicitly with `?ui=svelte`.

The tree handles missing parents, cycles, duplicate IDs, deep hierarchies, active/archived modes and busy descendants without recursive rendering. Room-owned sessions retain drafts and persist branch expansion. Entering a thread reveals its ancestors once; later updates preserve manual collapse. Entry tracking continues while the legacy rail has unmounted the native tree.

Creation preserves drafts on failed sends. Owner controls display canonical state until the server updates it. Ordering accepts only valid active siblings and restores keyboard focus after the authoritative order arrives, without stealing focus from another field. Real drag operations use the same projection and validation. The backend ordering limit is explicitly 5,000 IDs.

The mobile sheet keeps a stable height when controls gain focus. Legacy focus-within expansion previously clamped its scroll position between pointer-down and pointer-up, moving the submit button out from under the pointer. A Tailwind utility on the opt-in shell overrides that behavior at the same inclusive 900px breakpoint. Visual viewport sizing still follows `--vvh` when the keyboard resizes the viewport.

The browser script uses a real loopback Worker, local OAuth/PKCE consent and MCP tools to create actual nested epics. It exercises disclosure, current-branch toggling, live updates, drafts, archived parents, ownership, order/focus, drag, persistence, disconnection/reconnection, English/Portuguese, responsive themes and accessibility. Its mobile regression begins with no focused sidebar control, measures sheet height/scroll and button position across real pointer-down/up at 900px and 390px, then verifies submission reaches the input. No forced clicks or JavaScript form submission substitute for this interaction.

The Gallery/Inbox CSS comparison freezes only native block boundaries while comparing legacy CSS-off/on behavior. First it requires that freezing itself leaves every surrounding legacy snapshot unchanged. This verifies surrounding legacy defaults at fixed native boundaries; responsive feature flows separately verify normal layout. It does not claim unrestricted CSS-off/on layout parity.

## Evidence

Verified source: `a8e96545be378257346c810d0bd058c78b65e9b5`; application code/assets: `ce83771ea0a24020193056817a7aff443a4c722b` (the intervening change only adds explicit test measurement types). `bun run check` passed 108 tests and 535 assertions with zero failures, zero Svelte errors/warnings, and passing tooling/formatting checks. The frontend program contains 228 files, with generated API declarations and no Node, Bun, Worker or backend runtime sources.

All four browser suites passed with zero recorded errors. The surrounding CSS comparison covered 532 elements in each of four light/dark desktop/mobile profiles, with zero fixture or CSS-toggle mismatches. The reports include 25 screenshots. Protected vanilla assets are unchanged against `cb97950`. Newer peer API49 source still requires combined verification.

Final source revisions, checks, artifact hashes and browser results are recorded in [verification.json](verification.json). The complete repository check is [check.log](check.log). Reports and screenshots are grouped under `navigation/`, `board/`, `tasks/` and `gallery-inbox/`.

Reproduce with `bun run check`, then `bun run test:epic-navigation`, `bun run test:board`, `bun run test:tasks` and `bun run test:design-system` against a loopback Worker with the documented local test identity. The browser scripts refuse non-local targets. Fixtures isolate legacy remote font requests and the local coding-runner service; native self-hosted fonts and real room HTTP/WebSocket traffic remain enabled.

WebSocket send success still means queued data. Server updates, reload persistence and reconnect are checked separately; correlated command acknowledgments remain pending. Local browser evidence does not establish authenticated production acceptance, complete feature parity, schema/RPC completion, full HMR/performance acceptance or the authenticated Studio workspace comparison. The full migration goal remains open.
