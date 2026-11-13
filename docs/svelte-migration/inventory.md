# Migration inventory and ownership

Published baseline: `d3e1473`; full-plan starting commit: `9579bc4`. The generated `inventory.json` is produced by `bun scripts/migration-inventory.ts`. It records source locations and candidates, not a clean-code or style-policy certification.

Initial scan: 64 source files, 708 named functions/arrow bindings, 70 network/typed-transport/message call candidates, 80 static router declarations, 56 explicit-any/suppression candidates, 238 DOM operations and 104 style candidates. Counts change as implementation moves; the baseline commit and protected-asset hashes stay frozen in `baseline.json`.

## Runtime and source boundaries

- Default vanilla: `public/app.html`, preserved Inbox source in `vanilla/inbox/`, existing Inbox bundle `public/svelte/ui.js`, editor `public/collab.js`, manifest and service worker. No preview source import is permitted in the vanilla UI build.
- Current Svelte preview: `svelte/legacy/host.js` (4,078 lines at baseline), room view components/store/connections, `public/app-svelte.css`, preview editor and compiled modules. The host and global stylesheet remain migration work, not accepted exceptions.
- Shared: JSON schema/contracts, UI-selection helpers and protocol types. No server implementation belongs in a browser module graph.
- Backend: Hono routes, Book/DocRoom/Person, persistence and domain services. `src/auth.ts`, `src/sandbox.ts` and `src/mcpconn.ts` contain additional mounted routes beyond the main Worker file. Router/auth/binary/agent/external protocol declarations require classification in the RPC coverage matrix.
- Third-party: CodeMirror/Yjs, headless UI behavior, rich-content parser/sanitizer and external app/terminal protocols. Dependencies do not excuse first-party custom CSS or unsafe casts.

## Major extractions

| Existing responsibility | Native destination | Boundary evidence |
| --- | --- | --- |
| `EN`, `t`, language and theme helpers | typed locale/theme modules | no legacy host import, locale/theme component tests |
| route/history/hash, home/room switcher and cache | native root/router/navigation | Back/reload/deep-link/room lifecycle tests |
| HTTP helper and many direct fetches | inferred application RPC client | operation matrix plus request/response type tests |
| WebSocket reducers/connection callbacks | owned typed room session | reducer/late callback/reconnect regressions retained |
| composer, emoji, upload and replies | native composer and chat feature modules | typing/draft/send/error/upload behavior |
| raw header/sidebar/document/mobile controls | native shell + atomic primitives | keyboard/viewport and state-retention tests |
| editor, iframe/app and terminal DOM ownership | small typed vendor/protocol adapters | disposal, permission and origin checks |
| legacy CSS strings/styles and palette | one Tailwind source + Studio tokens | source/artifact audit and visual comparisons |
| sandbox/MCP/account/agent controls | native feature components + inferred service clients | full parity rows F39–F48 |
| push/install/device lock | native feature services/components | current vanilla parity and permission states |

## Known gaps and audit limits

The preview host predates vanilla's newest push/install UI. M6 must port that behavior explicitly. Static route scanning includes HTML, auth, assets, development-only and external protocol surfaces, not just JSON RPC; loops/mounted groups must also be reviewed. Message-channel calls are inventoried alongside transport candidates and need classification. Style matches in sanitized/user-content strings may be legitimate data, but application styling cannot be hidden inside them. Explicit-any candidates include backend modules outside the UI protocol; every remaining candidate needs a scope/interop rationale before M1 closes.

The baseline data/benchmark fixture and authenticated Studio workspace screenshots/computed-style evidence still require capture. Existing small-room hybrid metrics and public Studio stylesheet tokens are not substitutes for those gates.

## Vanilla separation proof

`check:vanilla` checks the preserved TypeScript/Svelte sources and builds the default Inbox into a temporary directory. `vanilla-build.json` records the module graph and protected-asset fingerprints. The build includes `vanilla/inbox/Inbox.svelte` and its entry only, with no project-owned `svelte/` modules; default assets are not rewritten. The variant-boundary plugin rejects cross-implementation runtime imports in either direction, including aliases and symlinks.
