# Proven dead host retirement

Source base `95379f8`. This bounded deletion does not complete RootShell ownership.

Call-site proof before deletion: `login`, raw JSON `api`, `langSwitch`, `agentAvatar`, `vibeNotes`, `handleOf`, `STAR`, `newRoom`, `confirmArchive`, `uiLoad`, `roomMark`, `squarePng`, `prodMark`, `epicIco`, `LANES`, `shownOrder`, `fileUrl`, `kb`, `pinToggle` and `wirePinToggles` had only declarations, or callers confined to the deleted group. `agentKind`, `ownerPic`, `fileIcon`, `fileVersions`, `prettyModel`, `GOOGLE_ICON` and `GH_LOGO` were reachable only from those dead groups. The `md`/`linkify`/`ghChips`/`fileChips`/`MD_PURIFY` chain had no real mount, callback or bridge-prop caller. Removed its sole `emojify` import. The global data-lang listener had no remaining native markup producer after the dead language renderer was removed; actual Account/Home language callbacks remain.

NativeAuth is selected by bootstrap's vb-page metadata branch; the host /login route redirects to document navigation and never called the old login renderer. Typed RichContent owns Markdown and imports Marked through ESM. With the unused renderer removed there are no runtime global Marked/DOMPurify references in the native source, so only their two global vendor script tags are removed from the native shell source. Vendor files and vanilla are unchanged. Font links, CSS, generated JavaScript and existing asset-version references are preserved.

Retained deliberately: `panelBridge` and its `icon`, `avatar`, `mentions`, `color`, `initials` values still satisfy shared Bridge/PanelBridge contracts supplied to actual Board/Document task/Files/Reminders/Decisions mounts. `mentionTarget` is used by native notification logic. `iconUrl`, favicon canvas, skeleton, toast, frame, sheets and lifecycle remain active. No fake replacement helpers were introduced.

The existing full English dictionary is moved unchanged into browser-independent application/copy.ts. Cookie/browser language selection and locale functions take explicit strings; the host retains document effects. Translation preserves Portuguese-key fallback, `{word}` substitution, unresolved placeholders and `in` membership behavior. No host import or browser side effect is required to consume it from RootApp/AppServices. The syntax-only i18n auditor reads that separate typed dictionary while retaining original host call and leftover line coverage, and still rejects dynamic dictionary entries. Two source fixtures cover language and copy semantics, with a separate auditor regression; existing host-lifecycle/DOM/build suites remain the relevant integration gates.

The root follow-up formats the extraction and tightens lookup to own dictionary
and interpolation entries. Prototype names such as `toString` and `constructor`
remain unknown strings instead of violating the declared string result type.
Explicit unknown placeholders remain unchanged. Original translation entries are
preserved; the previous inherited-property lookup behavior is intentionally fixed.

The author's formatter, tests, types, style, build and browser gates were UNRUN
at `6ba6fbc`. Root CI validates the combined follow-up separately; earlier native
component receipts do not cover this extraction.
