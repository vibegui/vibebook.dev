# OAuth provider response boundary

The remaining six explicit `any` uses in `src/mcpauth.ts` are replaced by unknown
JSON and runtime-validated, server-only projections in `mcpOAuthResponses.ts`.
Protected-resource metadata validates issuer/scope arrays. Authorization-server
metadata requires string authorize/token endpoints; optional registration can
remain absent/null. Every actual fetch/redirect still passes the existing URL
guard, including its existing local-development exception. No fetch destination
or redirect policy is widened.

Registration requires a nonempty string client identifier and a string or
absent/null secret. Token grants require a nonempty string access token and a
string or absent/null refresh token. Finite numbers and finite numeric strings
remain supported for expiry; zero/negative values keep the existing default and
clamp behavior. Invalid object/array/token/expiry values are refused before
sealing or persistence. Valid provider extensions remain accepted; only fields
used by this implementation are projected. Malformed partial authorization
metadata can fall through to the existing alternate discovery locations.

The exact OAuth state deletion, expiry/account validation, native presentation
hint, PKCE S256 and stored verifier, callback URI, code/resource binding, client
registration fields, encrypted grant storage and refresh cleanup are unchanged.
This source slice introduces no new secret and returns no grant to the browser.

Unit sources exercise malformed JSON/fields, alternate discovery, malformed
registration and token rejection before writes, valid encrypted grant storage
with numeric-string expiry, and wrong-account/expired states before network
requests. HTTP/D1 doubles are explicit; real provider/Worker acceptance remains
separate. Formatter, pure tests, backend/API/worker types, builds and browser
execution are **unrun** at the source checkpoint under the shared resource hold.
