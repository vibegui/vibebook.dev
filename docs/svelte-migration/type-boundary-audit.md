# Remaining backend type-boundary audit

The clean `b247805` inventory found 31 explicit `any` candidates, all in backend sources. That location does not waive the M1 requirement. These are independent of the already checked Hono application RPC contracts and must still be narrowed or justified with runtime validation and focused verification.

| Source | Candidates at checkpoint | Required disposition |
| --- | ---: | --- |
| `src/auth.ts` | 2 | Replaced `Context<any>` with the existing typed Bindings generic. Signed session payloads now pass a runtime schema before timestamp/identity use. |
| `src/agent.ts` | 1 | Replaced the asserted JSON-RPC envelope with a runtime schema; tool arguments and untrusted usage telemetry are narrowed from unknown. |
| `src/mcp.ts` | 1 | The same runtime envelope schema and argument-record guard protect admin method dispatch. |
| `src/mcpauth.ts` | 6 | Replaced with runtime-validated discovery, registration, grant and error projections. Focused provider-boundary tests pass 7 tests / 92 assertions; final combined checks remain required. |
| `src/mcpconn.ts` | 9 | Typed route contexts and runtime-narrowed external JSON/SSE and CSP metadata. Malformed CSP values cannot trigger coercion; focused tests pass 8 tests / 111 assertions. |
| `src/reports.ts` | 12 | Replaced with runtime schemas for all four consumed GraphQL query shapes, REST zones and OpenRouter key usage. Successful `errors: null` envelopes remain compatible; malformed nested numbers/containers produce explicit unavailable results. Focused tests pass 8 tests / 48 assertions. |

The session change passes three local tests / 15 assertions through actual Hono requests, HMAC signing and `sessionEmail`/`identify`: valid identity and revocation, signed malformed payloads, expiration and tampering. Strict backend checking also passes. The database is an explicit fixture port; production persistence and browser/OAuth acceptance are not established by this unit cohort.

No remaining row is accepted merely because it compiles. Backend source is excluded from browser graphs by the existing import boundary; that protection is separate from validating untrusted data on the server.

The MCP request boundary passes three local tests / 19 assertions (normal initialize/calls/notifications, malformed envelopes, and scalar/array argument rejection), and strict backend checking passes. JSON-RPC permits heterogeneous tool payloads; those values stay unknown until the existing per-tool checks. No browser RPC contract is replaced by this external-protocol helper.

The later GitHub callback audit found unchecked provider JSON beyond the explicit
`any` inventory. Token, email-list and profile responses now pass runtime schemas.
Identity requires a verified primary email with typed fields; optional profile
data only affects the bounded display name. Four tests / 40 assertions include
actual Hono callback requests with malformed identity, non-OK token responses,
native continuation and absence of session/database writes on rejection. Backend
and Worker-test strict checks pass in the isolated source worktree. Provider
HTTP is a controlled fixture; no live GitHub grant or deployed login is claimed.

Explicit `any` counts are not a complete boundary audit. Stored JSON and internal
HTTP assertions in `src/book.ts`, remaining provider JSON in other backend
services, and localized vendor/runtime double assertions require separate
inspection and disposition. M1 remains open until those paths and the final
combined source have appropriate validation/evidence.

The initial Book cohort validates stored notes/grade flags, epic hash caches,
production metadata, suggestions, attachment summaries, file rows and polls,
plus the internal file-write request. Valid siblings and older nullable optional
fields remain supported; poll options are never filtered individually because
their indices own persisted votes. Seven tests / 42 assertions include actual
Book method and HTTP-handler calls through explicit SQL/DO fixture ports. See
[book-stored-boundary.md](book-stored-boundary.md) for the remaining direct JSON,
HTTP and scalar-cast paths; this cohort is not real SQLite/Worker evidence.

Google's token/userinfo responses and HMAC-signed invite payloads now validate
before login/session or database effects. Six Hono tests / 199 assertions cover
state consumption, malformed/non-OK provider data, nullable profile fields,
invalid signed payloads, expired continuation and existing current-session,
known-account and one-time invite behavior. The Jev model's answers/usage also
derive from runtime schemas; four tests / 18 assertions preserve nullable numeric
fallbacks and reject malformed nested model output without applying decisions.
The combined seven-file boundary cohort passes 44 tests / 489 assertions, and
strict backend, Worker-test and tooling checks pass locally. Live providers and
deployed acceptance remain separate requirements.
