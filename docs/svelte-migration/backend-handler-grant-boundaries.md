# Handler and serialized OAuth grant boundaries

The Hono default handler now has an explicit forwarding `ExportedHandler<Env>.fetch`; no structural double assertion is needed. The imported admin MCP HTML already has the repository's `*.html` string declaration, so it is used directly.

OAuth token verification does not establish the runtime shape of decrypted application props. `withAgentGrant` validates the actual `ctx.props` before invoking `handleAgentMcp`, whose downstream operations can open personal WebSockets, create agent rows and stamp grant usage. Malformed identity, client or optional scope fields receive generic 401/invalid_token without dispatch. The schema derives `AgentProps`; it uses the existing authentication email grammar and preserves exact string values rather than normalizing identity.

Compatibility inspection included the original `be18fc6` grant shape (email/client), the historical sandbox-only optional field, current consent grants with optional gid and current sandbox grants with gid/sandbox/room. Optional fields remain independently optional; no pairing or new endpoint policy is imposed. Present empty/null/non-string scope values are rejected rather than accidentally becoming an unrestricted grant. Unknown fields are removed from the validated projection. The existing metadata display assertions and pinned DocRoom timer interop are outside this change.

Focused source cases cover refusal before any dispatch effects, original/extended grant value preservation, removal of unknown authority fields and propagation of a dispatched failure without retry. No provider token issuance/real OAuth/browser or full compiler validation is claimed by this source checkpoint.

Author validation: Node Prettier passed on the two new TS files; the three focused boundary cases passed 78 assertions in 908 ms. They use the actual schema/dispatch helper without changing global fetch. The modified historical backend files were not broadly reformatted. Full backend/Worker/tooling typing remains pending parent CI.

The grant fixture belongs to the strict Worker-test project, where it remains
included and runs in `test:rpc`. Its duplicate inclusion in the DOM tooling
project pulled the Worker's global HTMLRewriter `Element` through backend
imports, conflicting with browser DOM types. Removing that duplicate restores
the intended runtime separation; it does not skip the fixture's strict checking
or execution. Combined remote checks must verify the correction.
