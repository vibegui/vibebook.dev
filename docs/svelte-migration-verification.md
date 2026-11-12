# Svelte migration: local verification

Status: implemented and locally verified on `codex/svelte-completion`, based on `main` 30bcc5f. Not deployed. Integration and production verification remain open in [the task thread](https://vibebook.dev/b/f94aedb83899?t=4e27ed8b).

The browser has native TypeScript Svelte views for tasks, board, files, reminders, chat, messages, sidebar and Inbox, built by Vite. `public/app.html` is a 29-line shell. Existing composer, editor, account and embed integrations remain in `svelte/legacy/host.js`; this is not a complete TypeScript conversion of every legacy integration or HTTP endpoint.

Shared DTOs, event/command unions and HTTP contracts live in `shared/` and are consumed by the Worker and UI. Network JSON is validated. Vite rejects backend runtime imports, including aliases, symlinks, transitive dependencies, raw/url imports and `server-only` markers. The backend and frontend remain separate Wrangler/Vite builds.

## Verification

- `bun install --frozen-lockfile` passed.
- `bun run check` passed: backend/CLI/MCP UI typing, Svelte typing (zero errors/warnings), i18n, shared protocol checks, 14 boundary fixtures, a real browser build, generated-asset consistency, and 28 automated tests with 142 assertions.
- Real Chromium against the local Worker passed in independent English desktop and Portuguese mobile sessions: native epic/task creation, task synchronization, escaped chat text, reply context, typed file upload, shared file pins, keyboard kanban changes/list view, Inbox, malformed HTTP payload rejection, and two live Yjs document editors. No browser page errors were reported.
- The live check found and fixed a mobile Edit-button miss caused by expanding the sheet on button focus. Only text entry now expands the document sheet. Streaming updates preserve Svelte-owned DOM; sidebar rows/drafts survive updates without accumulating handlers.
- Build tests verify deterministic shell asset versions, including editor changes, so the Worker's existing HTML ETag release notification continues to work.
- The Git patch was applied to a clean worktree and its resulting tree matched the source branch; the final handoff is attached in the room.

## Controlled frontend benchmark

Baseline: 30bcc5f. Three alternating samples per version on the same local ARM machine and captured Book snapshot: 3 messages, 1 epic and 2 tasks. Both versions use identical simulated HTTP/WebSocket delivery and local assets; fonts and the local runner are blocked. These numbers exclude production Worker/database/network latency. The fixture is small and the sample does not establish statistical significance.

| Metric | Before | After | Change |
| --- | ---: | ---: | ---: |
| Initial frontend gzip | 144.1 KB | 150.7 KB | 4.6% |
| Ready controls | 2869 ms | 2933 ms | 2.2% |
| Thread switch (two animation frames) | 983.1 ms | 1130.1 ms | 15.0% |
| JS heap after GC | 2.90 MB | 3.65 MB | 26.0% |
| Browser task duration through switch | 3.879 s | 3.984 s | 2.7% |
| DOM nodes | 973 | 1413 | 45.2% |

Initial gzip excludes unchanged vendor scripts/fonts/images. The old Inbox additionally downloads 17.9 KB gzip on first open; the new Inbox is already in the initial bundle. Raw samples and byte counts are in [svelte-migration-metrics.json](svelte-migration-metrics.json).

The benchmark does **not** show an overall performance improvement. Typing, dependency isolation and stable draft/DOM behavior are verified, while heap and thread-switch regressions need independent review before adoption. A larger production-like fixture and another machine should be compared before making a performance claim.

## Reproduction and remaining work

1. Install dependencies and run `bun run check`. Install a Playwright Chromium runtime with `bunx playwright install chromium` for browser checks.
2. Start a local Worker with `DEV_EMAIL` configured. Run `bun run test:browser`; it creates only local test data and captures the room protocol snapshot. AI classification/scheduler behavior is not exercised.
3. Run `bun run measure:ui` for the paired controlled benchmark. Output defaults to `/tmp/vibebook-browser-check`. The browser runner refuses production URLs.
4. Apply the latest patch to a separate authenticated checkout, review the benchmark and theme integration, publish the branch/PR, then verify production. This sandbox has no GitHub push credentials; the patch and evidence were supplied to vibegui's agent instead.

See [client-server-boundary.md](client-server-boundary.md) for the build boundary, shared protocol layout and legacy migration boundary.
