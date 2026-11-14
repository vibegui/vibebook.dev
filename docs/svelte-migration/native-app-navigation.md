# Controlled App document navigation diagnostic

Source-only harness: `bun scripts/native-app-navigation-browser.ts`, with `TEST_BASE_URL` pointing at an already built, signed-in disposable loopback DEV Worker using an example.test identity. The exported `auditNativeAppNavigation` helper consumes the integrated real-Worker fixture's existing profile/pane/step APIs. The helper starts only a temporary second loopback HTTP origin; the standalone entry owns Chromium and never starts/stops the Worker. No execution, formatting, typing or browser receipt exists yet.

The harness creates a real synthetic room and uploads supported `apps/capability-probe.html` through the typed HTTP route. A random read marker is seeded as a canonical message through normal HTTP, not embedded in either document or the room title/SDK host context. The trusted user explicitly opens this particular app through the actual Apps button; room-app reads have no separate confirmation prompt. The initial actual native AppFrame must complete an installed-SDK-host initialize/read exchange and receive the exact marker through its correlated `vibebook_read` result.

A real iframe button self-navigates to the second HTTP origin. That controlled replacement document requests the same readonly tool through the actual SDK host/opaque transport. Handshake silence alone cannot prove read denial: after a short bounded negotiation period it also sends the controlled read into any inherited session. It verifies the same iframe element/WindowProxy, opaque sandbox origin and real second-origin HTTP delivery. An exact marker response is `read-inherited`; an actual correlated error response is `explicit-denial`. Missing navigation, wrong marker, unexpected replies and timeouts are `inconclusive`.

The helper always writes `native-app-navigation.json` with those separate verdicts, synthetic fixture IDs, marker hash and safe local error locations; it never stores room-read payloads, raw DOM, auth traffic or credentials. The standalone exit code is 2 for observed inheritance, 1 for inconclusive and 0 only for the controlled explicit denial. Integrated callers must retain the verdict and must not call inherited capability or inconclusive results a passing F46–48/M6 security receipt. Fixture Room/file/message setup is the only write; neither app document sends post/task/mutation commands.

Source review found that the current transport checks null origin, exact live WindowProxy and current component/room owner, but no document epoch. Installed ext-apps 1.7.4 uses the same browsing-context source check; second initialization is accepted and pre-initialization requests warn rather than create an authorization boundary. Self-navigation may therefore preserve capability while selected identity is unchanged. This is a source-level concern pending this real-browser probe, not a confirmed exploit claim. It also applies to late replies routed to that WindowProxy. Legitimate reload currently reuses the bridge; the original initial-result notification is one-shot.

A load-only epoch/disposal guard could block post-load calls/late replies/consents, but replacement scripts may execute before `load`, so it cannot establish strict document identity. A complete document capability design would need a host-controlled bootstrap/document nonce or transferred message channel, plus explicit reload semantics and SDK compatibility validation. No new policy or guard is implemented here. This focused probe does not establish BFCache restoration behavior, remote MCP/provider behavior, or a global security pass. Opaque sandbox origin remains required.

Worker run 43563524139 stopped during fixture setup after room creation and
before an uploaded file ID, initial user open or positive read. Its generic
`Error` cannot establish a bridge verdict. Source inspection identifies a
deterministic setup constraint: room-app uploads require `checkEmbed`; that
fails closed when `decide` returns null, while the CI runner sets
`MODEL_JUDGE=off`. No model review, secret filtering, upload constraint or
authority assertion is bypassed to make this probe pass.

New diagnostics retain a fixed current/failure phase, observed HTTP statuses
and allowlisted error classifications (including HTML review unavailable), not
request/response bodies or provider messages. Captured source locations come
from the classification call site, never an untrusted exception stack, and
exception names are allowlisted. Remote evidence must corroborate the actual
HTTP refusal before any product/security fix is inferred. Formatter, diagnostic
unit tests, tooling and browser rerun remain unrun at this source checkpoint.
