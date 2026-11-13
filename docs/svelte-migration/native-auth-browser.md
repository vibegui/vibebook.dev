# Real native auth browser harness

`scripts/native-auth-browser.ts` uses an already-running loopback Worker. It starts no Worker, Vite server, compiler or build. Its browser contexts use the supported loopback `DEV_EMAIL`/`/api/dev/as` identity mechanism and unique `example.test` addresses. Run only against a disposable local database/KV namespace.

```sh
TEST_BASE_URL=http://127.0.0.1:8797 bun run test:auth:browser
TEST_BASE_URL=http://127.0.0.1:8787 TEST_SOURCE_URL=http://127.0.0.1:5173 bun run test:auth:browser
TEST_BASE_URL=http://127.0.0.1:8797 TEST_AUTH_TTL=1 bun run test:auth:browser
```

The optional source origin must proxy to the same Worker and use the same loopback hostname (ports differ; the browser cookie boundary stays real). `TEST_APP_HEAD` records the operator's declared served source revision; the harness separately records its own revision, the observed Worker version, the actual public entry URL and SHA-256. `TEST_AUTH_TIMEOUT_MS` controls request/assertion deadlines (default sixty seconds); it does not shorten provider expiry. Artifacts default to `/tmp/vibebook-native-auth-browser` (`TEST_OUTPUT_DIR` overrides).

The protocol uses real dynamic client registration, real per-browser consent transactions/cookies, actual native Allow/Cancel form POSTs, real OAuth redirects, PKCE code exchange and authenticated MCP `tools/list`. Canonical `/api/agents` reads verify that context GET, reload, denial and invalid requests do not create grants; successful approval creates one. The pinned provider deliberately revokes that grant on consumed-code replay; the harness verifies this canonical removal and token rejection. A separate actual approval covers explicit cleanup through the supported revoke API. A real room is created to check the public room-context response contains only its allowed metadata; this local room remains in the fixture database.

The only fulfilled browser responses are Google font CSS isolation and the exact registered relying-party callback landing page. The latter receives the real provider redirect and represents the local test OAuth client. No provider, auth, token, application API or KV response is mocked. Unexpected external browser requests are blocked. Local canonical data is never seeded and no WS frame is fabricated.

Negative protocol cases use real issued handles/cookies as attacker-controlled request inputs: a separate browser cookie jar, a mismatched binding value, sequential consumed handle/code replay, wrong PKCE verifier and foreign Origin/cross-site metadata nominated by `Connection`. These cases do not create fake provider transactions. The provider's documented non-atomic KV consume is not represented as a simultaneous-replay guarantee.

Native/default UI selection, escaped client metadata, public errors, no legacy host/assets/channels, EN desktop/PT mobile keyboard actions and axe audits are checked. A real malformed form produces native POST400; failure mounting must not fetch a new consent transaction before explicit Retry. When `TEST_SOURCE_URL` is present, that actual POST400 must include the Vite client. The Not-you action retains its real logout form and safe original query continuation; it cannot carry the consent handle into login.

Quick mode explicitly records the provider TTL gate as **unrun**. `TEST_AUTH_TTL=1` captures an unused real transaction and its issued 600-second binding cookie, runs other cases, closes Chromium, then waits the remaining real wall-clock TTL plus a margin. It replays the **original matching cookie** with the original handle to distinguish KV expiry from merely omitting a browser-expired cookie. No cookie/server clock is accelerated and no KV record is edited. Interrupted or incomplete waits are not expiry passes.

DEV identity is not real application email authentication. This harness does not claim email delivery, Google/GitHub sign-in, application session-cookie issuance or actual signed-out/logout behavior under that bypass. Those require a separate DEV_EMAIL-free test Worker plus real test-provider/mailbox credentials. Unexpected native500 remains a source/mock-provider fixture gate, not a fabricated real-provider browser result.

Artifacts omit HTML, screenshots and request/response credentials. Handles, cookie values, codes and tokens are held only in memory and redacted from error text; protocol traces store method, path/query names and status. Signals close Chromium and interrupt transport/TTL waits; aborting transport never claims rollback of a server mutation.

This harness is source-only until root runs its type, browser and real-TTL gates. Authoring/formatting does not establish any provider lifecycle or production acceptance result.
