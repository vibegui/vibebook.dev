# Native reset containment and regression verification

Verified source: `b902751c167f4d8144b2e089439f24953bd12100`, including vanilla/API baseline `12b202f`. [verification.json](verification.json) records source/artifact hashes, the complete check and both real browser results. This is incremental evidence; full migration acceptance remains pending.

Tailwind's global Preflight reset removed browser defaults used by the transitional preview. The fix imports the unmodified upstream reset inside the native boundary, compiles nesting to ordinary selectors, and gives native surface roots explicit utility geometry. Portaled dialog/tooltip surfaces opt in independently. All 49 emitted base rules stay inside the boundary; raw `@scope` is absent. The style audit enforces this containment without permitting additional presentation declarations in the sole Tailwind entry.

- `bun run check` passes: 77 tests, 364 assertions, zero failures, zero Svelte errors/warnings for both variants, and passing tooling/format checks.
- The frontend type program contains 405 files, API declarations, no backend runtime sources and no Cloudflare Worker types.
- The real legacy room has identical measured geometry and computed styles with native CSS disabled/enabled: 445 elements at 1440px and 467 at 390px, each in light/dark, with zero mismatches.
- `test:design-system` passes Gallery and Inbox checks: frozen Studio values and rendered roles, font loading, bound controls, keyboard/modal behavior, responsive accessibility, error recovery and cross-room navigation.
- `test:tasks` passes real create/rename/toggle/owner/due/delete, reload persistence, modal handoff, responsive accessibility and disconnected-send retention/reconnect retry.
- Protected vanilla assets are unchanged against `12b202f`; vanilla remains default.

Representative screenshots:

- Legacy room: [light desktop](legacy-light-1440.png), [dark desktop](legacy-dark-1440.png), [light mobile](legacy-light-390.png), [dark mobile](legacy-dark-390.png)
- Native gallery: [light](gallery-light-1440.png), [dark](gallery-dark-1440.png), [mobile](gallery-dark-390.png), [sheet](sheet-dark-390.png)
- Native features: [Inbox](inbox-390.png), [tasks light](tasks-light-1440.png), [tasks dark](tasks-dark-768.png), [tasks mobile](tasks-dark-390.png), [due dialog](task-due-dark-390.png)

Reproduce both browser scripts against a loopback Worker with the local test identity. Their explicit fixtures isolate legacy Google Fonts CSS and an empty local coding runner; the native local font files load normally. The saved runs are complete. An earlier attempt exhausted the machine's small temporary filesystem while writing its final report; runtime caches were moved before these successful reruns.

This does not establish authenticated Studio workspace matching, final performance budgets, complete native features or schema/RPC coverage, full application/backend/contract HMR, or authenticated production A/B acceptance. Later peer-reported API/viewer changes require their own integration and verification. A queued WebSocket send remains distinct from server acknowledgment; real persistence/reconnect is checked separately.
