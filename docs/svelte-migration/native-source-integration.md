# Accepted native source integration checkpoint

This isolated source port starts at root `cfd5c77`. It combines accepted Account/Agents port `15a0f3f`, Apps port `7d3e1cd`, RootRoomSession `bb909e8`/`2d3e4fb`, and ChatViewport `74e32d0`/`14dba3a`/`f47af0f`/`e940e16`. The initial port preserved accepted feature implementations. Subsequent strict-check fixes capture the optional first tool result and proven non-null embed owner before async work, and explicitly infer Sandbox mutation/factory lease results; no casts, authorization or mutation policy changes were introduced.

The host now combines the one immutable Account owner/native AgentSettings slot, the one account/room Agents service, the scoped Apps authority and lazy SDK Chat embed adapter, the typed RootRoomSession connection/reducer/cache owner, and typed ChatViewport paging/scroll/search owner. Personal identity reset keeps all feature resets. Cached/fresh Chat registry ownership still tracks the actual Book connection. No retired app iframe bridge, agent/sandbox HTML builder, old chat paging/observer implementation, or second PWA owner was restored.

RootRoomSession's cache facade is eviction-only. The host retains Apps denial eviction and canonical owner synchronization; it never reinserts/reduces room state. An additive typed `cacheAllowed` predicate prevents a denied Apps authority from being recached even before public room publication/reentrant navigation. A pure source regression covers that ordering. Terminal nonmember state/members still revoke the entire room synchronously. The lifecycle fixture includes the native Agents detach scope alongside Apps cleanup and ChatViewport reset; root's canonical-document/AST-task fixture is retained.

Root DocRoom send guard, canonical document fixture, focused/full document ownership harness and diagnostics, current metrics harness, mobile form focus classes/token and Studio tokens are preserved. Generated native preview HTML/JS/CSS assets remain frozen. Public changes are the two approved terminal MIT notices and the explicitly requested upstream vanilla tool-description update below. Because root requested an asset freeze, the unused legacy Apps CSS retirement from its original feature port is deferred; this is not a new styling exception or a zero-legacy-CSS completion claim. The approved exact xterm import remains in the sole Tailwind source entry for the eventual rebuild.

This is subsequent integration source, not the currently shipping A/B preview. Root granted sequential source validation in the isolated worktree: frozen Bun 1.4.4 install passed (269 packages, 10.91s; sampled VmHWM 16,092KiB); formatting 73 owned TS/Svelte/CSS/JSON paths passed (compact host excluded; sampled VmHWM 224,508KiB); API declaration emission passed (sampled VmHWM 94,704KiB). Root node_modules and lock were not changed.

Strict UI run 1 hit Node's default V8 heap limit before diagnostics and is explicitly unconfirmed (`/tmp/vibebook-source-integration-ui-1.log`). Run 2 with `NODE_OPTIONS=--max-old-space-size=544` completed with ten errors/no warnings in four owned files. The typed captures/result inference fixes above resolved those diagnostics. Four-file formatting passed, then run 3 passed **zero errors and zero warnings**, exit 0 (`/tmp/vibebook-source-integration-ui-3.log`, Node PID368712, sampled VmHWM 525,340KiB/tree RSS 524,560KiB). This gate checked `26907d0` before the subsequent source-only changes below. All validation processes stopped and the exclusive slot was released. No pure/DOM test, Worker, browser, build, font activation or asset regeneration was run for this combined source. Earlier slice receipts and shipping-preview browser evidence do not establish combined runtime acceptance; root's remaining model/tooling/style/DOM/build/browser gates are still required.

After both exact source peers accepted `26907d0`, source-only follow-ups were applied without another validation process: `71bec74` ports only `8e7ea1b`'s composer Blob-part rename compatibility, regression assertions, README and Bun 1.4.4 packageManager pin; no shipping bundle replacement. Merge `d6d3786` includes origin/main `e36810a`'s actual four-file RouterStats `who`/room-wide query/fixture/vanilla description change. `dbb3a94` matches the native Apps router tool description to that vanilla contract (`room: true`, every member in this room; false, the person's own router across rooms). `61b98aa` adds only `5450b94`'s pinned Node/Bun repository-check workflow, read-only repository permission and no persisted checkout credential. These changes are queued source, not covered by the earlier zero-error/API receipt, and await root's fresh complete gates. No font subset was activated.

## Root integration gates after upstream synchronization

`4bee2ad` merges main through `6ab34a9`, retaining upstream onboarding,
notification/reply-clearing and older-file behavior. Fresh API declaration emit
passes. The model suite passes **225 tests / 1,111 assertions** and connection
suite passes **35 tests / 179 assertions** at this revision.

`07bac49` additionally contains the reviewed Linux/macOS path-alias boundary
fixes and CI matrix. At this revision, strict Svelte checking passes **zero
errors and zero warnings**, and strict tooling checking exits successfully.
Both use the frozen dependencies and `NODE_OPTIONS=--max-old-space-size=544`.

The complete component run at `07bac49` is **not passing**: 90 tests pass and
four fail (606 assertions, 94 cases). The failures concern queued embed consent,
an old friend-removal confirmation across account replacement, sandbox removal
controls and explicit agent recovery. They require investigation and corrected
verification before this combined source is accepted. In particular, the old
account confirmation assertion must remain strict; a passing model test does
not establish the rendered control's authority.

Local raw logs: `/tmp/vibebook-native-source-{api4,store1,connection1,ui4,tooling1,dom1}.log`.
These gates cover the named source revisions, not subsequent personal-channel,
wait/file-chip or onboarding ports. Generated assets are still frozen; no fresh
combined application build, real-browser or deployment acceptance is claimed.
