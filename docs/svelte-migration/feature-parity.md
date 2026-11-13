# Complete application feature-parity matrix

Starting source: `9579bc4`; published vanilla/application baseline: `d3e1473`. This is the migration acceptance matrix, not a list of finished features. Every row must be checked against the final Svelte implementation and current vanilla before M6/M8 can pass.

Baseline architecture: native Svelte room views exist, but their bridges, page shell, most actions and orchestration run through `svelte/legacy/host.js`. The Svelte preview is missing vanilla's newly added push/install UI. No row below is signed off as fully migrated yet.

Verification for every applicable row includes English/Portuguese, light/dark, 390/768/1440px layouts, keyboard access, loading/empty/error/permission states, persistence after reload and remote updates. Final evidence must name the commit and test/artifact; earlier hybrid results are only baseline evidence.

Ongoing vanilla additions are mandatory parity requirements: `2d5dbfe` adds compact read/delivery receipts with profile/agent marks and hover/tap details (F22), plus working new-tab viewer navigation (F34/F35). `e0bce88` adds nested epic trees with per-room persisted expansion, current-branch expansion, busy-descendant indicators, archived-tree behavior and nested reordering (F24/F25). The subsequent fixes through `12b202f` incorporate disclosure into the epic row, enlarge its target, permit closing the current branch and expand ancestors once on entry. These are recorded in the change ledger; their native port is not yet verified.

Incremental native task evidence is recorded in [native-tasks](native-tasks/README.md). It covers local task actions, persistence, reconnect, dialogs and selected theme/accessibility profiles; F27 remains pending until every applicable final-parity dimension above passes.

| ID | Capability and required actions | Baseline owner / current integration | Native target | Final evidence |
| --- | --- | --- | --- | --- |
| F01 | Email login, code resend/verification/errors and account identity | `login`, `view`; auth endpoints | `features/auth` | Pending |
| F02 | Google/GitHub login availability, failure and safe continuation retaining UI variant | `login`; `shared/uiVariant.ts` | `features/auth` | Pending |
| F03 | Missing/private room, request access, membership approval and subsequent entry | `src/access.ts`, member/request controls | `features/access` + shared auth contract | Pending |
| F04 | Home list/grid, cached first paint, room ordering, unread/busy/waits indicators | `home`, `homeWith`, `phoneHome`, `keepMe` | `features/home` | Pending |
| F05 | Room creation by router, destination suggestions, unknown invitees and errors | `wireAsk`, `startRoom`, `newRoom` | `features/home` | Pending |
| F06 | Room strip/rail, switcher search, recent rooms and keyboard navigation | `renderSwitcher`, `renderRail`, `openSwitch` | `features/navigation` | Pending |
| F07 | Deep links to room/thread/message/document/file; Back/Forward/reload and preview retention | `route`, `selectThread`, `syncUrl`, `goToMsg`, `viewerPop`, `sheetPop` | `features/navigation` | Pending |
| F08 | Per-room icon/tint, ordering, rename, archive/restore and archived list | `squarePng`, `confirmArchive`, `archivedPage`, switcher actions | `features/rooms` | Pending |
| F09 | Profile/name/avatar, linked login methods, friendships and removal | `wireHome`, `fillLogins`, `pickPic` | `features/account` | Pending |
| F10 | Session logout/logout-all and subsequent access/authentication | `wireHome`, auth endpoints | `features/account` | Pending |
| F11 | Theme and locale preferences, correct first paint and persistence | `theme`, `setTheme`, `langSwitch`, `t`, `EN` | typed theme/i18n services + root | Pending |
| F12 | Installed PWA behavior, install banner, platform instructions and dismissal | Current vanilla `public/app.html`; not ported to host | `features/pwa` | Pending |
| F13 | Push subscribe/unsubscribe/test, permission states and notification navigation | Current vanilla push UI + `src/webpush.ts`; not ported to host | `features/pwa` | Pending |
| F14 | Room connection, complete snapshots, patches, reconnect/backoff and stale callback rejection | `roomConnection.ts`, `roomStore.ts`, `openBook`, `onEvent` | typed room session service | Pending |
| F15 | Chat window, continuity/grouping, dates, origins and origin-thread navigation | `Chat.svelte`, `Message.svelte`, `renderChat` | `features/chat` | Pending |
| F16 | Older history, loading/error/end states, scroll anchoring and deep-message paging | `pullOlder`, `loadOlder`, `goToMsg`, `syncEnd` | `features/chat` | Pending |
| F17 | Compose/send, typing, send errors/retry and draft retention scoped to room/thread | `renderBook` composer event wiring | `features/composer` | Pending |
| F18 | Mentions, emoji picker/autocomplete, paste and safe rich text/links | `renderPop`, `renderTray`, `mentions`, `md`, `emojify` | `features/composer` + typed rich content | Pending |
| F19 | Replies, quote navigation, copy message/link and share hashes | `startReply`, `renderReply`, `copyMsg`, `copyLink` | `features/chat` | Pending |
| F20 | Poll creation, options/multi-select, votes and close | `addOpt`, `pollHtml`, chat action wiring | `features/polls` | Pending |
| F21 | Cards/charts/buttons, permission/question choices and user confirmations | `cardHtml`, `permHtml`, `choiceHtml`, `cardGo` | `features/messages` | Pending |
| F22 | Quiet reminders/notices/issues, folding and acknowledgements/receipts | `foldReminders`, `remHtml`, `noticeHtml`, `renderReceipts` | `features/messages` | Pending |
| F23 | Live message updates, edit/remote text behavior and escaped hostile input | `Message.svelte`, `appendMsg`, room reducer | `features/chat` | Pending |
| F24 | Sidebar, expanded/collapsed rail, archived tabs, fold state and navigation drafts | `Sidebar.svelte`, `renderSide`, `toggleRail` | `features/sidebar` | Pending |
| F25 | Epic creation/rename/owner/archive/delete, hierarchy and order | `renderSide`, `renameThread`, room commands | `features/epics` | Pending |
| F26 | Suggested epics, accept/reject, preview and return to real thread | `renderPre`, `preOf`, `isPre`, `onEvent` | `features/epics` | Pending |
| F27 | Task add/rename/toggle/status/owner/due/delete, flags and review waits | `Tasks.svelte`, `TaskList.svelte`, host controls | `features/tasks` | Pending |
| F28 | Board/list, filters, keyboard/status/drag operations and epic scope | `Board.svelte`, `renderKanban`, `leaveBoard` | `features/board` | Pending |
| F29 | Room and epic document reading, editing, preview and task placement | `renderDoc`, `docEpic`, `placeTasks`, `renderPeek` | `features/documents` | Pending |
| F30 | Yjs editing, awareness/cursors, reconnect/fallback and provider disposal | `ensureCollab`, `collab/editor.ts` | typed editor adapter + Svelte document UI | Pending |
| F31 | Markdown safety, tables, Mermaid and other supported previews | `md`, `renderMermaid`, `loadPele` | typed rich content + Tailwind wrappers | Pending |
| F32 | Upload/file paste/drop, MIME/size errors, progress, send association and retry | `addFiles`, composer wiring, typed upload adapter | `features/files` + composer | Pending |
| F33 | File folders/version grouping/filtering and file tab | `Files.svelte`, `treeFiles`, `renderFiles` | `features/files` | Pending |
| F34 | Image/audio/PDF/HTML/Markdown/text/CSV viewers, download and versions | `openViewer`, `loadViewer`, `csvRows`, `fileVersions` | `features/viewers` | Pending |
| F35 | File hashes, viewer Back/Escape/close, mobile layout and sandbox boundaries | `viewerPop`, `openFile`, viewer handlers | `features/viewers` | Pending |
| F36 | Pins for link/file/app, add/delete/open, shared updates and layout | `pinsSec`, `wirePins`, `pinHost`, room commands | `features/pins` | Pending |
| F37 | Reminder create/edit/upload, enable/disable/delete, validation and schedule errors | `Reminders.svelte`, `renderReminders`, upload parsing | `features/reminders` | Pending |
| F38 | Decisions view/delete and updates | `renderDecisions`, room commands | `features/decisions` | Pending |
| F39 | People/online/roles, invite, access requests, removal and leave behavior | `renderSide`, member handlers, owner menu | `features/members` | Pending |
| F40 | Inbox here/all, resolve waits, task/agent states and navigation to exact message | `Inbox.svelte`, `openInbox`, `syncInbox` | `features/inbox` | Pending |
| F41 | Local runner status, per-room Claude activation, focus and connection guidance | `herdrPing`, `whereOf`, `toggleClaude`, `connectCard` | `features/agents` | Pending |
| F42 | Agent queue, connected agents, busy/current work, acknowledgements and context | `renderAgentsPane`, `myQueue`, `agentRows`, `ctxBar`, `renderWorking` | `features/agents` | Pending |
| F43 | Account-level agent permissions/revoke and setup | `renderAgents`, `fillLogins`, account UI | `features/agents` | Pending |
| F44 | Sandbox account setup, credentials UI, create/start/stop/delete and errors | `connectPrompt`, `wireSbx`, sandbox APIs | `features/sandboxes` | Pending |
| F45 | Sandbox terminal, opening/focus/resize/close and connection lifecycle | `openTerminal`, terminal API | typed terminal adapter + `features/sandboxes` | Pending |
| F46 | MCP connection list/scope/connect/sign-in/sign-out/refresh/delete | `renderConns`, `loadConns`, connection APIs | `features/connections` | Pending |
| F47 | MCP app selection/opening, context, calls/results/errors and sign-in continuation | `renderConnApp`, `appAsk`, `toolOut` | `features/apps` | Pending |
| F48 | User/remote app iframe protocol, allowed context and confirmed writes | `mountApp`, `embedHost`, `vbRead`, `vbCall` | typed app protocol adapter + wrappers | Pending |
| F49 | Thread-produced files/apps, room apps and relevant origin cards | `renderThreadFiles`, `threadCards`, `roomApps` | `features/outputs` | Pending |
| F50 | Mobile room strip, sheets, viewport/keyboard, handles and Back/Escape behavior | `openSheet`, `closeSheet`, `sheetDrag`, doc/chat controls | app shell + feature sheets | Pending |
| F51 | Search/filter keyboard flow and cross-room/message result navigation | `swSearch`, `swHitsHtml`, `land`, `goToMsg` | `features/search` | Pending |
| F52 | Notification mute/chime and native permission/preferences | `notifyPerm`, `notifyMuted`, `renderBells`, `chime` | `features/notifications` | Pending |
| F53 | Per-device WebAuthn/Face ID lock, reentry and preference changes | `lockVerify`, `lockSet`, `lockScreen` | `features/device-lock` | Pending |
| F54 | New-version banner, independent asset versions, stale-tab reload | `newVersion`, shell metadata, `/api/me` | typed release service + root | Pending |
| F55 | Background observers/subscriptions, room cache and transient state cleanup | `clearViews`, `disposeCollab`, connections and observers | owned service/component lifecycles | Pending |
| F56 | Every additional function/route found in the inventory receives a mapped owner or explicit scope rationale | `inventory.json` | inventory closure audit | Pending |

## Baseline checks to retain and extend

- `scripts/ui-panels.test.ts`: existing tasks/board/files/reminders/chat/sidebar behaviors; migrate these tests to the final native component APIs rather than removing behavior coverage.
- `scripts/room-store.test.ts`, `room-connection.test.ts`, `host-lifecycle.test.ts`: reducer/socket/editor regressions. Replace legacy source-extraction tests with native module/component tests as their implementation is removed.
- `scripts/browser-check.ts`: existing desktop/mobile and cross-variant integration coverage. Extend for the matrix and final Studio/Tailwind system; do not substitute public login screenshots for authenticated room acceptance.
- `scripts/ui-variant.test.ts`, `ui-variant-boundary.test.ts`, `vanilla-isolation-check.ts`: explicit selection, source/build separation and preserved default assets.

The new matrix must not erase current functionality just because the reduced benchmark or initial Svelte preview did not include it. External embeds are sandboxed content; their owned controls and protocol handling are first-party application features.
