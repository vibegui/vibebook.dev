# Adversarial architecture review

Three independent reviews challenged browser/server isolation, room/editor lifecycle and code hygiene. The review covered the Svelte room app and its Vite/Bun browser builders, not the separate `site/` SSR application. Findings were reproduced before fixing; fixture credentials were synthetic.

| Finding | Severity | Resolution |
| --- | --- | --- |
| Raw private config imports could enter the Vite bundle | High | Shared import policy rejects private config, aliases, symlinks, external declarations and backend runtime imports. 44 real Vite builds exercise positive and negative cases. |
| Editor/MCP Bun builds bypassed the browser boundary | High | Both builders now use the same policy; 14 Bun build regressions exercise isolation. |
| A room's queued reconnect could replace another room's socket | High | Typed connection controller owns sockets and timers; disposal invalidates queued callbacks and cancels retries. |
| Navigating away retained editor providers and pending editor imports | High | Cleanup invalidates pending mounts before destroying the provider; stale callbacks cannot mutate the next room. |
| An incomplete document event could erase existing content | High | Replacement and invalidation are distinct typed, validated events. Empty replacement text remains valid. |
| Suggestions destroyed a cached Tasks mount's DOM | Medium | Explicit disposal precedes host DOM replacement, allowing a clean remount. |
| Task drafts/edit state leaked between threads or rooms | Medium | Svelte keyed scope preserves drafts on ordinary updates and resets them on room/thread changes. |
| HTTP business failures contradicted the declared result union | Medium | Valid HTTP 400 business failures return the typed failure; authorization/server failures still reject. |
| New test/build scripts escaped strict typing | Medium | Required tooling TypeScript project checks build scripts, browser tests and fixtures. Happy DOM is adapted once at the environment boundary. |
| Dense frontend code and stale architecture instructions | Low | Scoped Prettier checks are required; repository instructions now describe the actual build and checks. |

The current architecture is appropriate for this migration: separate frontend and Worker builds, browser import enforcement, shared DTOs, untrusted-input validation and a reducer-backed room store. Svelte explicitly retains stores for complex asynchronous streams ([official guidance](https://svelte.dev/docs/svelte/stores)); replacing that store with runes is not necessary for modern Svelte.

## Remaining work

- The integration host remains JavaScript. Migrate its routing/composer/editor seams incrementally; the new connection controller is typed. Host integration tests temporarily extract actual legacy functions because importing the host executes browser startup code.
- DTO interfaces and runtime validators remain manually paired. Deriving types from runtime schemas would reduce drift. The existing Hono backend can introduce [inferred RPC](https://hono.dev/docs/guides/rpc) incrementally, with strict checking on both sides. This release does not claim complete inferred RPC.
- `bun run dev` builds frontend assets before starting the Worker; `bun run dev:ui` provides a second-terminal build watcher. Full HMR requires the custom backend integration described in [Vite's documentation](https://vite.dev/guide/backend-integration).
- The separate `site/` pipeline needs its own browser/SSR boundary review.
- Earlier migration performance samples belong to the earlier build and are not a performance claim for these review fixes. No deployment or production verification is included.

Run `bun run check` for the required static/build/component suites. Run `bun run test:browser` against a local Worker for desktop/mobile, live WebSocket fan-out and collaborative editing. See `docs/svelte-migration-verification.md` for the earlier migration baseline and browser setup.

## Final verification

- `bun run check`: passed after the fixes and scoped formatting. Backend, UI and tooling typing are clean; Svelte reports zero errors/warnings. 52 automated tests / 214 assertions pass, alongside protocol checks and 44 Vite build fixtures.
- Guarded `build:collab` and `build:mcp`: passed on actual sources; editor rebuilding preserves the current shell version. The 14 Bun boundary tests are included in the automated count above.
- `test:browser`: passed against the local Worker in independent English desktop and Portuguese mobile contexts. Task fan-out, escaped text, replies, uploads, files/pins, board keyboard/list, Inbox, malformed HTTP input and two live Yjs editors pass with zero page errors. Evidence: `adversarial-review-browser-results.json`.
- This constrained machine took 67 seconds to reach room readiness during the integration check. That run is functional verification, not a controlled benchmark or production latency measurement.
- AI classification and production deployment were outside this verification. The local Worker has no OpenRouter key; its background classifier reported a missing key without affecting the exercised flows.
