# Native connection failure boundary

The remote MCP connection client now treats parsed JSON/SSE replies, initialize
metadata, resource contents and CSP metadata as unknown until their accessed
fields are checked. Arbitrary valid `result` payloads remain intact. The two
connection OAuth routes use the application's real Hono bindings/variables and
path parameter types; no replacement authentication or membership policy is
introduced.

An explicitly native sign-in renders the existing native auth shell for failed
membership (403), missing connection (404), throttling (429) and provider start
failure (400). Callback errors use the same surface at 400. The public metadata
contains only a fixed reason enum; the component uses local EN/PT copy and a
safe room/Home continuation. Provider messages, codes and state are omitted
even from the generated noscript fallback. Vanilla responses retain their
existing JSON/HTML behavior and status.

Before those handlers, the global identity middleware uses a narrow GET plus
Accept-HTML exception for native connection sign-in/callback navigation only.
The signed-out result remains 401, with generic copy and a safe continuation;
it never reads/consumes provider state or reaches the OAuth handler. Ordinary
JSON API requests, POSTs and vanilla HTML requests retain their JSON 401.

OAuth keeps its fixed registered callback URI. Native starts add `svelte.` to
the opaque random state so expired/consumed callbacks still choose the native
error presentation. This prefix grants no authority: `finishAuth` still deletes
the exact stored full state and checks expiry/account before exchanging a code.
An unprefixed outstanding native flow can be recognized by a read of its stored
return URL under the current account. No tokens or provider details are read by
that projection. Successful callback behavior, provider registration, PKCE,
encrypted grants and connection permissions remain unchanged.

Focused source fixtures cover JSON/batch/SSE correlation, malformed inputs,
allowed CSP domains, native versus vanilla statuses, provider error/replay
secrecy, old state compatibility, unchanged provider callback URI and exact
stored state, plus native localized DOM with no request replay. These are unit
fixtures, not real OAuth or Worker acceptance.

The allocated scoped validation passed: owned frontend/fixture/metadata format,
seven MCP unit cases with 108 assertions, backend types, API declaration emit,
worker-test types and the auth DOM suite (14 cases, 84 assertions). The compact
backend files retain their existing layout. Full Svelte/tooling/style checks,
build and real browser/Worker OAuth gates remain **unrun** for this slice.
Generated assets, vanilla sources, font/token manifests and style policy are
untouched. The development source-shell middleware is unchanged; these routes
continue through its existing Worker API proxy rather than adding a new
development-only rendering path.
