# Remaining backend type-boundary audit

The clean `b247805` inventory found 31 explicit `any` candidates, all in backend sources. That location does not waive the M1 requirement. These are independent of the already checked Hono application RPC contracts and must still be narrowed or justified with runtime validation and focused verification.

| Source | Candidates at checkpoint | Required disposition |
| --- | ---: | --- |
| `src/auth.ts` | 2 | Replaced `Context<any>` with the existing typed Bindings generic. Signed session payloads now pass a runtime schema before timestamp/identity use. |
| `src/agent.ts` | 1 | Replaced the asserted JSON-RPC envelope with a runtime schema; tool arguments and untrusted usage telemetry are narrowed from unknown. |
| `src/mcp.ts` | 1 | The same runtime envelope schema and argument-record guard protect admin method dispatch. |
| `src/mcpauth.ts` | 6 | Narrow external discovery, registration and token responses; retain safe error handling and secret ownership. |
| `src/mcpconn.ts` | 9 | Type redirect route contexts and validate external JSON/SSE results and CSP metadata. |
| `src/reports.ts` | 12 | Validate the Cloudflare GraphQL response shapes consumed by reports; preserve explicit unavailable/error results. |

The session change passes three local tests / 15 assertions through actual Hono requests, HMAC signing and `sessionEmail`/`identify`: valid identity and revocation, signed malformed payloads, expiration and tampering. Strict backend checking also passes. The database is an explicit fixture port; production persistence and browser/OAuth acceptance are not established by this unit cohort.

No remaining row is accepted merely because it compiles. Backend source is excluded from browser graphs by the existing import boundary; that protection is separate from validating untrusted data on the server.

The MCP request boundary passes three local tests / 19 assertions (normal initialize/calls/notifications, malformed envelopes, and scalar/array argument rejection), and strict backend checking passes. JSON-RPC permits heterogeneous tool payloads; those values stay unknown until the existing per-tool checks. No browser RPC contract is replaced by this external-protocol helper.
