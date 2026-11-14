# Native wait badges and older file-chip parity

Source base: `24e73ae`. Upstream behavior reviewed directly in `107510b` (asks versus task-review indicators and server reply clearance) and `6ab34a9` (older-file metadata lookup). The parent integration separately merged those server/vanilla changes. This slice changes no backend business rules, endpoints, default UI selection or public assets.

Home room tiles, app navigation, the phone room strip, expanded/collapsed Sidebar and EpicTree share a schema-derived wait projection and native badge. Non-`t` canonical references supply the number; task-review references supply a small dot only when no asks remain. Claude `a`/`b` questions retain an attention distinction using Studio semantic tokens. Task rows remain in Home/Inbox; list totals are not notification badge counts. The frontend does not infer Jev intent or mention origin: upstream owns that policy. A human reply clears the number through canonical personal-state refresh, without optimistic local deletion.

Native EpicTree already has no conic busy-row light or legacy `.thread.busy` markup; its working-agent marker remains. Unused legacy shell CSS and shell-level rendering/routing remain retirement debt. This port does not claim the whole shell is native.

Exact same-origin/current-room rich file links missing from a partial index request typed `files.get` once per partial canonical snapshot through an account/room/Book-connection owner shared by rich chips. Chat, Document preview and Markdown file preview localize missing labels. Canonical `files`/`fileAdd` events refresh Chat with the existing `stay` reading-anchor behavior, then show the escaped canonical name/version while retaining the exact linked ID. Known message/origin attachments do not need this read; foreign-room links remain ordinary links.

The chip owner is disposed on teardown and latches invalid membership/scope. ACK never fabricates `filesAll`; failure never starts render-driven retries. A fresh authoritative partial snapshot permits another read. Existing explicit Viewer behavior remains the retry/error surface. Other features retain existing explicit index reads; this slice coalesces automatic chip reads, not every feature's RPC globally.

Authored **unrun** cases cover pure ask/task/Claude projection; one-read coalescing and ACK versus canonical index; localized/cache-invalidated file names; failures/fresh snapshots/foreign links/denied scope; Home canonical count→dot while keeping task rows; Sidebar/EpicTree/rail count→dot; Chat two missing chips→one read→escaped exact file/version; host owner disposal once.

No formatter, tests, compiler, build, Worker or browser ran during the shared-machine hold. Existing suites register all modified tests; the native style auditor includes the new feature directory. Production assets/version digests remain unchanged and require the parent's rebuild/runtime gates.
