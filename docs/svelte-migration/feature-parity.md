# Complete application feature-parity matrix

Starting source: `9579bc4`; published vanilla/application baseline: `d3e1473`. This is the migration acceptance matrix, not a list of finished features. Every row must be checked against the final Svelte implementation and current vanilla before M6/M8 can pass.

At baseline, native room views depended on `svelte/legacy/host.js` and lacked the newer push/install UI. That description is historical.

Current source checkpoint: `b247805` (2026-11-14), [complete repository and production-layout checks](https://github.com/vibegui/vibebook.dev/actions/runs/43549278094). `NativeApplication` composes `AppShell` and `RoomShell`; typed ApplicationServices/RoomScope own routing and feature lifecycles. The host, production mount registry and separate preview stylesheet are deleted. Native PWA/install/push owners and UI are included. The target column below names existing implementation paths relative to `svelte/`. Passing source/model/component gates does not sign off a row's final integrated browser or deployed dimensions.

Verification for every applicable row includes English/Portuguese, light/dark, 390/768/1440px layouts, keyboard access, loading/empty/error/permission states, persistence after reload and remote updates. Final evidence must name the commit and test/artifact; earlier hybrid results are only baseline evidence.

Ongoing vanilla additions are mandatory parity requirements: `2d5dbfe` adds compact read/delivery receipts with profile/agent marks and hover/tap details (F22), plus working new-tab viewer navigation (F34/F35). `e0bce88` adds nested epic trees with per-room persisted expansion, current-branch expansion, busy-descendant indicators, archived-tree behavior and nested reordering (F24/F25). The subsequent fixes through `12b202f` incorporate disclosure into the epic row, enlarge its target, permit closing the current branch and expand ancestors once on entry. These are recorded in the change ledger. The incremental native epic-tree port is verified in `native-navigation/`; full sidebar/epic parity remains pending.

Incremental native task evidence is recorded in [native-tasks](native-tasks/README.md). It covers local task actions, persistence, reconnect, dialogs and selected theme/accessibility profiles; F27 remains pending until every applicable final-parity dimension above passes.

Incremental native board/list evidence is recorded in [native-board](native-board/README.md). It covers room and epic task creation, status controls, keyboard and real mouse drag, focus, board/list persistence, responsive layout transitions, English/Portuguese, accessibility and disconnected-send recovery. F28 remains pending until every applicable final-parity dimension and the final deployed revision are verified.

Later published changes reported by the peer (`cba3556`, `601f3a4`, `691a534`) add consistent agent/file/embed presentation, Escape inside viewer frames and a versioned HTML panel alongside chat. The viewer must follow incoming versions until an older version is selected, support fullscreen and return-to-doc controls, and preserve chat interaction. Include these in F15/F34/F35/F49; local baseline integration and native verification remain pending.

| ID | Capability and required actions | Baseline owner / current integration | Native target | Final evidence |
| --- | --- | --- | --- | --- |
| F01 | Email login, code resend/verification/errors and account identity | `login`, `view`; auth endpoints | `features/auth` | Pending |
| F02 | Google/GitHub login availability, failure and safe continuation retaining UI variant | `login`; `shared/uiVariant.ts` | `features/auth` | Pending |
| F03 | Missing/private room, request access, membership approval and subsequent entry | `src/access.ts`, member/request controls | `features/auth/AccessPage.svelte` + `features/people` | Pending |
| F04 | Home list/grid, cached first paint, room ordering, unread/busy/waits indicators | `home`, `homeWith`, `phoneHome`, `keepMe` | `features/home` | Pending |
| F05 | Room creation by router, destination suggestions, unknown invitees and errors | `wireAsk`, `startRoom`, `newRoom` | `features/home` + `features/onboarding` | Pending |
| F06 | Room strip/rail, switcher search, recent rooms and keyboard navigation | `renderSwitcher`, `renderRail`, `openSwitch` | `features/app-navigation` + `features/rooms` | Pending |
| F07 | Deep links to room/thread/message/document/file; Back/Forward/reload and preview retention | `route`, `selectThread`, `syncUrl`, `goToMsg`, `viewerPop`, `sheetPop` | `features/app-navigation` + `features/room-scope` + `features/file-viewer` + `features/room-layout` | Pending |
| F08 | Per-room icon/tint, ordering, rename, archive/restore and archived list | `squarePng`, `confirmArchive`, `archivedPage`, switcher actions | `features/rooms` + `features/room-sidebar` | Pending |
| F09 | Profile/name/avatar, linked login methods, friendships and removal | `wireHome`, `fillLogins`, `pickPic` | `features/account` | Pending |
| F10 | Session logout/logout-all and subsequent access/authentication | `wireHome`, auth endpoints | `features/account` + `features/auth` | Pending |
| F11 | Theme and locale preferences, correct first paint and persistence | `theme`, `setTheme`, `langSwitch`, `t`, `EN` | `features/application/copy.ts` + `features/application/shellBrowser.ts` | Pending |
| F12 | Installed PWA behavior, install banner, platform instructions and dismissal | Current vanilla `public/app.html`; not ported to host | `features/pwa` | Pending |
| F13 | Push subscribe/unsubscribe/test, permission states and notification navigation | Current vanilla push UI + `src/webpush.ts`; not ported to host | `features/pwa` + `features/notifications` | Pending |
| F14 | Room connection, complete snapshots, patches, reconnect/backoff and stale callback rejection | `roomConnection.ts`, `roomStore.ts`, `openBook`, `onEvent` | `features/root-room` + `roomConnection.ts` + `roomStore.ts` | Pending |
| F15 | Chat window, continuity/grouping, dates, origins and origin-thread navigation | `Chat.svelte`, `Message.svelte`, `renderChat` | `features/chat` + `Chat.svelte` + `Message.svelte` | Pending |
| F16 | Older history, loading/error/end states, scroll anchoring and deep-message paging | `pullOlder`, `loadOlder`, `goToMsg`, `syncEnd` | `features/chat-viewport` | Pending |
| F17 | Compose/send, typing, Hold-Space speech, microphone permission/cancellation, send errors/retry and draft retention scoped to room/thread | `renderBook` composer event wiring | `features/composer` | Pending |
| F18 | Mentions, emoji picker/autocomplete, paste and safe rich text/links | `renderPop`, `renderTray`, `mentions`, `md`, `emojify` | `features/composer` + `features/rich-text` | Pending |
| F19 | Replies, quote navigation, copy message/link and share hashes | `startReply`, `renderReply`, `copyMsg`, `copyLink` | `features/chat` + `features/room-scope` | Pending |
| F20 | Poll creation, options/multi-select, votes and close | `addOpt`, `pollHtml`, chat action wiring | `features/composer` + `features/chat-interactive` | Pending |
| F21 | Cards/charts/buttons, permission/question choices and user confirmations | `cardHtml`, `permHtml`, `choiceHtml`, `cardGo` | `features/chat-interactive` | Pending |
| F22 | Quiet reminders/notices/issues, folding and acknowledgements/receipts | `foldReminders`, `remHtml`, `noticeHtml`, `renderReceipts` | `features/chat` + `features/waits` | Pending |
| F23 | Live message updates, edit/remote text behavior and escaped hostile input | `Message.svelte`, `appendMsg`, room reducer | `features/chat` + `roomStore.ts` | Pending |
| F24 | Sidebar, expanded/collapsed rail, archived tabs, fold state and navigation drafts | `Sidebar.svelte`, `renderSide`, `toggleRail` | `features/navigation` + `features/room-sidebar` + `Sidebar.svelte` | Incremental native epic tree verified (hierarchy, disclosure, tabs, drafts, order/focus/drag, live updates and EN/PT mobile accessibility); pinned-item controls are verified separately; root/header, rail, people and other sidebar actions remain pending |
| F25 | Epic creation/rename/owner/archive/delete, hierarchy and order | `renderSide`, `renameThread`, room commands | `features/room-sidebar` + `features/room-scope` | Native create/owner/tree/order interactions verified incrementally; rename/archive/delete handoffs are now owned by RoomScope/RoomMutations and native controls; final integrated browser and deployed parity remain pending |
| F26 | Suggested epics, accept/reject, preview and return to real thread | `renderPre`, `preOf`, `isPre`, `onEvent` | `features/room-sidebar` | Pending |
| F27 | Task add/rename/toggle/status/owner/due/delete, flags and review waits | `Tasks.svelte`, `TaskList.svelte`, host controls | `TaskList.svelte` + `features/board` | Pending |
| F28 | Board/list, filters, keyboard/status/drag operations and epic scope | `Board.svelte`, `renderKanban`, `leaveBoard` | `Board.svelte` + `features/board` + `features/room-layout` | Pending |
| F29 | Room and epic document reading, editing, preview and task placement | `renderDoc`, `docEpic`, `placeTasks`, `renderPeek` | `features/documents` | Pending |
| F30 | Yjs editing, awareness/cursors, reconnect/fallback and provider disposal | `ensureCollab`, `collab/editor.ts` | `features/documents/editor.ts` | Pending |
| F31 | Markdown safety, tables, Mermaid and other supported previews | `md`, `renderMermaid`, `loadPele` | `features/rich-text` + `features/documents` | Pending |
| F32 | Upload/file paste/drop, MIME/size errors, progress, send association and retry | `addFiles`, composer wiring, typed upload adapter | `features/composer` + `features/files` | Pending |
| F33 | File folders/version grouping/filtering and file tab | `Files.svelte`, `treeFiles`, `renderFiles` | `features/files` + `Files.svelte` | Pending |
| F34 | Image/audio/PDF/HTML/Markdown/text/CSV viewers, download and versions | `openViewer`, `loadViewer`, `csvRows`, `fileVersions` | `features/file-viewer` | Pending |
| F35 | File hashes, viewer Back/Escape/close, mobile layout and sandbox boundaries | `viewerPop`, `openFile`, viewer handlers | `features/file-viewer` + `features/room-scope` | Pending |
| F36 | Pins for link/file/app, add/delete/open, shared updates and layout | `pinsSec`, `wirePins`, `pinHost`, room commands | `features/pins` + `features/file-viewer` + `features/apps` | Native controls, typed correlated mutations, remote updates, exact older-file lookup, offline/reconnect and responsive EN/PT flows verified; native FileViewer/Apps handoffs now use RoomScope actions; final integrated browser and deployed parity remain pending |
| F37 | Reminder create/edit/upload, enable/disable/delete, validation and schedule errors | `Reminders.svelte`, `renderReminders`, upload parsing | `Reminders.svelte` + `features/reminders` | Pending |
| F38 | Decisions view/delete and updates | `renderDecisions`, room commands | `features/decisions` | Pending |
| F39 | People/online/roles, invite, access requests, removal and leave behavior | `renderSide`, member handlers, owner menu | `features/people` + `features/room-sidebar` | Pending |
| F40 | Inbox here/all, resolve waits, task/agent states and navigation to exact message | `Inbox.svelte`, `openInbox`, `syncInbox` | `features/application/inbox.ts` + `Inbox.svelte` | Pending |
| F41 | Local runner status, per-room Claude activation, focus and connection guidance | `herdrPing`, `whereOf`, `toggleClaude`, `connectCard` | `features/agents` | Pending |
| F42 | Agent queue, connected agents, busy/current work, acknowledgements and context | `renderAgentsPane`, `myQueue`, `agentRows`, `ctxBar`, `renderWorking` | `features/agents` | Pending |
| F43 | Account-level agent permissions/revoke and setup | `renderAgents`, `fillLogins`, account UI | `features/agents` + `features/account` | Pending |
| F44 | Sandbox account setup, credentials UI, create/start/stop/delete and errors | `connectPrompt`, `wireSbx`, sandbox APIs | `features/sandboxes` | Pending |
| F45 | Sandbox terminal, opening/focus/resize/close and connection lifecycle | `openTerminal`, terminal API | `features/sandboxes/terminalRenderer.ts` | Pending |
| F46 | MCP connection list/scope/connect/sign-in/sign-out/refresh/delete | `renderConns`, `loadConns`, connection APIs | `features/apps` | Pending |
| F47 | MCP app selection/opening, context, calls/results/errors and sign-in continuation | `renderConnApp`, `appAsk`, `toolOut` | `features/apps` | Pending |
| F48 | User/remote app iframe protocol, allowed context and confirmed writes | `mountApp`, `embedHost`, `vbRead`, `vbCall` | `features/apps` | Pending |
| F49 | Thread-produced files/apps, room apps and relevant origin cards | `renderThreadFiles`, `threadCards`, `roomApps` | `features/file-viewer` + `features/apps` + `features/room-scope` | Pending |
| F50 | Mobile room strip, sheets, viewport/keyboard, handles and Back/Escape behavior | `openSheet`, `closeSheet`, `sheetDrag`, doc/chat controls | `features/room-layout` + `features/room-shell` | Pending |
| F51 | Search/filter keyboard flow and cross-room/message result navigation | `swSearch`, `swHitsHtml`, `land`, `goToMsg` | `features/app-navigation` + `features/chat-viewport` | Pending |
| F52 | Notification mute/chime and native permission/preferences | `notifyPerm`, `notifyMuted`, `renderBells`, `chime` | `features/pwa` + `features/notifications` | Pending |
| F53 | Per-device WebAuthn/Face ID lock, reentry and preference changes | `lockVerify`, `lockSet`, `lockScreen` | `features/account/device.ts` + `features/account/DeviceLockScreen.svelte` | Pending |
| F54 | New-version banner, independent asset versions, stale-tab reload | `newVersion`, shell metadata, `/api/me` | `features/pwa` + `features/application` | Pending |
| F55 | Background observers/subscriptions, room cache and transient state cleanup | `clearViews`, `disposeCollab`, connections and observers | `features/application` + `features/root-room` + `features/room-scope` | Pending |
| F56 | Every additional function/route found in the inventory receives a mapped owner or explicit scope rationale | `inventory.json` | inventory closure audit | Pending |

## Baseline checks to retain and extend

- `scripts/ui-panels.test.ts`: existing tasks/board/files/reminders/chat/sidebar behaviors; migrate these tests to the final native component APIs rather than removing behavior coverage.
- `scripts/room-store.test.ts`, `room-connection.test.ts`, `host-lifecycle.test.ts`: reducer/socket/editor regressions. Replace legacy source-extraction tests with native module/component tests as their implementation is removed.
- `scripts/browser-check.ts`: existing desktop/mobile and cross-variant integration coverage. Extend for the matrix and final Studio/Tailwind system; do not substitute public login screenshots for authenticated room acceptance.
- `scripts/ui-variant.test.ts`, `ui-variant-boundary.test.ts`, `vanilla-isolation-check.ts`: explicit selection, source/build separation and preserved default assets.

The new matrix must not erase current functionality just because the reduced benchmark or initial Svelte preview did not include it. External embeds are sandboxed content; their owned controls and protocol handling are first-party application features.
