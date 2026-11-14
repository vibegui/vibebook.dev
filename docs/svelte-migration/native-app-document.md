# Native App document ownership

Native Apps and chat embeds now use the shared document host from core
`ce8a1cb`. The installed SDK still owns JSON-RPC negotiation and schemas.
Window messages are untrusted proposals until the initial document's private
port acknowledges a fresh challenge. Native transport sends all private replies
through that host; it never posts a payload directly to WindowProxy. The shared
bootstrap's private-payload/token mechanism preserves real browser event source,
origin and `isTrusted`, subject to actual SDK/browser verification.

Listener readiness remains separate from document readiness. AppFrame installs
the bridge first, then loads remote HTML through `loadHtml` or authenticated room
HTML through `loadFile`. Embeds start blank and use the same file-loading path;
they never set an initial raw `src`. Owner/account/room authority remains separate
from active document authority so legitimate initial catalog/UI/selected remote
tool reads do not deadlock before document creation.

Each app-originated protected room command, connection call or context commit
reattests the captured document immediately before dispatch. Link permission also
reattests after consent. The action helper checks owner, exact bridge identity,
proof and active grant together before starting the action. Already dispatched
writes are not claimed rolled back by a later navigation or cancellation.

Revocation aborts pending scoped work, cancels old questions and shows a reopen
notice. The old iframe stays connected but hidden for generic denial responses;
it is not reauthorized. Reopen replaces the iframe and its bridge, producing a
fresh nonce/grant. Captured embed callbacks and reopen controls carry generation
ownership, so old callbacks cannot deny, resize or reopen a replacement. Ordinary
owner departure disposes the old host/listener and its request/consent resources.

Five source-authored pure fixtures cover captured proof, owner/document loss,
failure propagation, no automatic mutation retry, and an actual room-tool post
after delayed consent. The real Embed DOM fixture preserves the blank-frame
boundary, hidden denial frame and explicit fresh-node reopen with stale callback
rejection. These are unit/DOM fixtures, not a real browser security receipt.
Formatter, tests, compilers, SDK/browser replacement and BFCache validation remain
unrun for this native integration checkpoint. Core bootstrap generation/build
and authenticated file-POST route are separate required dependencies.

Parent checkpoint after integration: the native action cases and existing Apps
model/authority tests pass together with the mounted Hono navigation fixtures
(26 tests / 182 assertions, 2.54 seconds). Scoped native formatting and the thin
document build/browser/tooling TypeScript project pass. The native component
fixture changes remain source-only until repository CI, and the real Worker
application replacement probe still requires a new run. These local results do
not establish browser, CSP navigation, provider or production acceptance.
