# Remaining backend assertion boundaries

Source checkpoint: `624582e`. This is a targeted inventory of explicit assertions
and JSON consumption under `src/*.ts`, not a claim that every D1/storage generic
or external response has been proved at runtime.

## Pinned Awareness interop addressed here

`y-durableobjects@1.0.5` declares `WSSharedDoc.awareness: Awareness` in
`dist/index.d.ts`. `y-protocols@1.0.7` publicly declares `_checkInterval` in
`awareness.d.ts:46`, albeit with vendor type `any`. Its `awareness.js:59` assigns
the actual result of `setInterval`; `destroy():88` passes that same property to
`clearInterval`. DocRoom therefore needs neither an object-shape assertion nor a
`ReturnType<typeof setInterval>` assertion. Its direct timer cancellation is
unchanged: it neither converts the Worker/Bun/Node handle nor destroys Awareness.
The dependency-owned `any` is consumed only at the timer API boundary.

The actual-dependency startup fixture observes exact cancellation identity,
retained Awareness identity/local state/listeners and inherited live-socket setup.
This does not establish real Durable Object hibernation billing or deployment
behavior. Existing relay/unregister tests remain intact.

## Data-boundary reconciliation and remaining small changes

Later reconciliation: `b940b5c` replaces the stored route-home epic and analytics
container assertions with bounded validation and actual consumer fixtures. The
OAuth grant metadata follow-up validates the pinned provider's `unknown`/vendor
`any` boundary once per listed grant: only string `gid` and `client` fields are
recognized independently, missing historical IDs stay unknown and malformed
labels use the existing client ID. The last-use index is a `Map`, so identifiers
such as `__proto__` cannot resolve inherited object properties. Grant creation,
authorization and revoke operations are unchanged. The three focused tests pass
20 assertions, including execution of the actual listing function with historical,
malformed and prototype-named IDs. BugMachine passes backend checks at `4647993`;
the Worker-typed fixture's Node/Worker URL overload mismatch is fixed at
`0afaaaf`, where strict Worker-test typing, all three focused tests and formatting
pass. The source peer accepts the bounded metadata/listing change. Final combined
integration checks remain required.

Subsequent source reconciliation: `6640c00` (integrated as `e03a664`) replaces
the sandbox SQL row assertions with operation-specific validation. VM control
identities are separate from nullable display metadata; setup requires the
original folder/room, and optional deletion cleanup uses only validated original
identifiers. Provider dates and complete finite metric snapshots are checked
before updating cached measurements. Native and default vanilla estimates honor
the additive `cost_unknown` flag. Actual SQLite/provider-mock consumer and
room-presence route fixtures are authored; their combined gate results must be
read from the final integration run, not inferred from this source review.

At `73c7c84` / `dc89810`, the agent MCP wrapper uses the existing `recordValue`
guard before reading opaque tool result fields and selects the content branch
only at an actual `Array.isArray(parts)` guard. This removes the two container
assertions without claiming that arbitrary array items satisfy the complete MCP
ContentBlock schema. The existing `get_file` branch authors its text/image parts;
other output retains the established JSON/structured-result path.

| Source at checkpoint                                           | Remaining assumption / next verification                                                                                                                                                                                                                                        |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/route-home.ts:24`                                         | Addressed at `b940b5c`: schema-derived stored epic validation and actual routing consumer fixtures.                                                                                                                                                                             |
| `src/analytics.ts:63`                                          | Addressed at `b940b5c`: object-only dimensions retain opaque valid fields and normalize malformed containers without dropping events.                                                                                                                                           |
| `src/connect.ts:215,221–222`                                   | Addressed in the OAuth metadata follow-up above; strict backend/Worker-test checks pass, final combined integration remains required.                                                                                                                                           |
| `src/agent.ts:1178–1181`                                       | Container assertions addressed at `73c7c84` / `dc89810` as described above. Full MCP content-item schema validation is not established by that guard. The static authored tool schema cast at `:474` remains a distinct internal construction boundary.                         |
| `src/sandbox.ts:240,269,273,277,376,389,400`; `src/api.ts:506` | Sandbox row/room-presence boundaries addressed by the bounded `6640c00` change. The separate `claude_on` membership-row assertion in `src/api.ts` remains: its scalar shape still needs validation; this change does not establish every D1 generic or authorization predicate. |

## Localized API interop still to inspect, not JSON schema failures

- `src/index.ts:516`: asserted R2 range object. Compare the actual public Worker
  `R2Range` union before replacing it; preserve suffix/range/206 behavior.
- `src/track.ts:66`: double assertion around public request `cf` metadata; inspect
  Worker request types and narrow only fields used by tracking.
- `src/{start-room,route-home,router}.ts:50,74,67`: model-provider usage `raw.cost`
  assertions. Resolve actual SDK/provider metadata contracts and preserve cost
  accounting; these are not authority decisions.
- `src/{mcpauth,webpush}.ts`: WebCrypto overload result assertions; several
  `src/{agent,sandbox}.ts` assertions around freshly allocated byte buffers.
  Check installed runtime declarations rather than assuming external JSON risk.
- `src/sandbox.ts:61,296,319,382` and `src/router.ts:100`: caught values asserted
  to `Error` for diagnostics. Narrow non-Error throws without logging new secrets.
  `sandbox.ts:97` follows an actual successful schema parse; its generic return
  assertion is distinct from an unchecked provider response.

Raw JSON in `bookStored`, `bookMessages`, `mcpTools`, `report-analytics`, session/
invite verification, agent limits and MCP connection handling already flows into
`unknown` plus existing validators/record checks. This scan found no reason to
reopen those completed boundaries. The shell command string in `sandbox.ts`
contains VM-side configuration JSON, not a Worker-side cast to a trusted DTO.

Only the unnecessary Awareness assertion was changed in the original checkpoint.
Later dispositions above identify bounded follow-ups. Unresolved entries remain
work, not accepted runtime proofs or blanket M1/M2 acceptance.

Author verification: the test/docs formatter passed. The actual pinned dependency
suite `bun test scripts/docroom-socket.test.ts` passed four tests / 24 assertions
with Bun 1.4.4 in 2.89 seconds. No full compiler, Node fixture runtime, real Worker,
hibernation or browser check ran for this follow-up; those remain separate gates.
