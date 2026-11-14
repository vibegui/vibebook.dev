# Production mount registry retirement

The runtime consumer inventory found only the retiring legacy host importing svelte/main.ts. Direct AppShell, RoomShell, RoomScope, Gallery and Auth import native components/services themselves. This commit is integrated atomically with native bootstrap/entry and host removal; it is not a standalone runnable legacy-host revision.

The existing component-test adapter moves to scripts/ui-panel-mount.ts and its dynamic Svelte forwarding surface to scripts/UiPanelView.svelte. Only the thirteen feature keys actually used by those tests remain. Call-site component/prop checking and flushSync/update/unmount behavior are preserved; the existing erased forwarding cast is test-only. All security, canonical ACK, stale-control and lifecycle test bodies remain intact. The test adapter is not imported by any production source.

Production main.ts, View.svelte and the obsolete InboxMount are deleted. The removed PWA/Inbox imperative mount functions have no direct-native callers. No production service registry replaces them. Vanilla's separate Inbox entry remains untouched.

Legacy boardLayout and host lifecycle tests remain for now. Their removal requires the new typed Layout/RoomScope equivalents to pass; this commit does not silently discard them. All formatter/type/style/test/build/browser checks are UNRUN under the root resource hold.
