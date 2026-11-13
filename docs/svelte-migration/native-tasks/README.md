# Native task panel verification

This incremental report covers the Studio/Tailwind task panel and its shared controls. It does not close full-application migration or production acceptance.

[verification.json](verification.json) links both passing browser runs and their screenshots to source commit `0099513658ebb40c3d1e8f37dfae22bf4ccb935c`, with source and artifact hashes. The [checkpoint](../checkpoint.json) records the complete `bun run check`: 77 tests, 361 assertions, zero failures, and zero Svelte errors or warnings in both variants. The frontend type program contains 405 files, declarations for the API contract, and no backend runtime sources or Cloudflare Worker types.

The real local Worker task run verifies creation, rename, completion/progress, owner selection, due-date save/clear, deletion and persistence after reload. Disconnected sends retain drafts and rejected owner changes restore the previous selection; reconnect retries succeed. Due-date dialogs receive initial focus, restore focus on Escape and close before the native room switcher opens. Mobile Escape closes the dialog without also closing its underlying document sheet.

Task profiles at 1440px light, 768px dark and 390px dark, plus the mobile due-date dialog, have zero axe violations. Computed task backgrounds and loaded Inter match the Studio theme. The Gallery and Inbox regression also passes, including radio/select parent bindings, light/dark token comparisons at DPR 1 and 2, font loading, keyboard/modal behavior and Inbox navigation/error recovery.

Reproduce with `bun run test:tasks` and `bun run test:design-system` against a loopback Worker configured with a local test identity. The browser fixtures isolate the legacy Google Fonts request and provide an empty local coding runner. A second unfinished task preserves the application's existing automatic epic archive behavior while testing completion. WebSocket success still means queued data rather than a server acknowledgment; browser persistence and reconnect are checked separately.

Representative screenshots:

- [Tasks, light 1440px](tasks-light-1440.png)
- [Tasks, dark 768px](tasks-dark-768.png)
- [Tasks, dark 390px](tasks-dark-390.png)
- [Due-date dialog, dark 390px](task-due-dark-390.png)
- [Shared gallery, light](gallery-light-1440.png) and [dark](gallery-dark-1440.png)
- [Shared gallery, mobile](gallery-dark-390.png), [sheet](sheet-dark-390.png) and [Inbox](inbox-390.png)

Protected vanilla assets are unchanged against `e0bce88`; vanilla remains the default. The Svelte application still has a transitional host and legacy styling outside the migrated scope. Complete schema/RPC migration, all-feature parity, authenticated Studio workspace comparison, full application/backend/contract HMR, performance budgets and authenticated production A/B acceptance remain pending.
