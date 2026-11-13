# Native board/list verification

Verified source: `2a0aeda1d16d0086cdcfcf9b12b367c7b005f38c`, including published backend/API baseline `8f01bbf`. [verification.json](verification.json) records source hashes, the complete repository check and the real browser result. This is incremental evidence; full migration acceptance remains pending.

Board/list now uses typed Svelte components, the shared atomic controls and Tailwind utilities. Room tasks work even when there are no epics. The projection preserves explicit epic scope, archived selection and missing-target behavior rather than silently sending a draft elsewhere. Status controls retain canonical state until a server update arrives. Focus follows the actual occurrence of a task without stealing focus from another field.

The temporary shell adapter moves the existing board between mobile and desktop containers without remounting it. Its selectors only accept owned shell children: duplicate message IDs/classes cannot substitute a board or document container. Cleanup removes the media listener and rejects late callbacks. The adapter remains migration work; it does not replace the required native application shell.

Frontend type checking now limits ambient types to Svelte and Vite's browser environment. Vite configuration and build helpers remain in the separately checked tooling project. Compile-negative fixtures reject Node, Bun and Worker globals; browser timers and Vite environment types remain available.

- `bun run check`: 84 tests, 428 assertions, zero failures; both Svelte variants report zero errors/warnings; tooling, generated bundle, import-boundary, native style and formatting checks pass. The complete log is [check.log](check.log).
- The frontend program contains 225 files, including generated API declarations, with zero Node/Bun/Worker declarations and zero backend runtime sources.
- Unit regressions cover scope/projection, failed-send draft retention, stale destinations, authoritative status/focus handling, repeated task occurrences, disposal, foreign/stale drag payloads and owned layout transitions.
- Browser verification covers real Worker persistence, keyboard/status/drag operations, mode retention, Enter/Space navigation, responsive layout/focus retention, disconnected-send recovery, scrolling and English/Portuguese accessibility.
- Protected default assets are unchanged against `8f01bbf`. Vanilla remains default; Svelte is explicitly selected by `?ui=svelte`.

Screenshots: [light desktop](board-light-1440.png), [dark tablet](board-dark-768.png), [dark mobile board](board-dark-390.png), [dark mobile list](list-dark-390.png), [mobile scrolling](board-scroll-390.png), [Portuguese list](list-pt-390.png).

Reproduce with `bun run check`, then `bun run test:board` against a loopback Worker using a local test identity. The browser script refuses non-local targets. Its fixtures isolate legacy Google Fonts CSS and an empty local coding runner, forward real room WebSocket messages and temporarily close the browser-side socket to test failed sends. Native local font files load normally. A control task keeps the test epic active while another task changes status.

Successful WebSocket sending means queued data, not durable server acknowledgment; persistence/reconnect is checked separately. These local results do not establish authenticated production A/B acceptance, complete feature parity, the final Studio workspace comparison, all-native styling, schema/RPC completion, full application/backend/contract HMR or final performance budgets. Later peer-published API slices require combined verification. Historical Gallery/Inbox/Tasks and reset-containment evidence remains in [native-coexistence](../native-coexistence/README.md).
