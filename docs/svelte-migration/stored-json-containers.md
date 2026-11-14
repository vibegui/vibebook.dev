# Home routing and analytics JSON containers

This bounded follow-up addresses the two raw JSON containers identified at
`3f2d2b4`. It leaves other SQL/API/vendor assertions for their own source review.

Home routing now reads its compact cached epic list using shared `EpicSchema`
id/title fields plus the existing optional open-count field. A missing/null open
count and opaque extensions survive; invalid containers are empty lists, and an
invalid sibling cannot remove a valid destination. No id/title coercion invents
a destination. The model prompt, SQL authorization/order/limit, known-room/epic
selection and alternatives behavior are unchanged. The exported RoomPick type is
derived from its existing shared schema.

Analytics dimensions remain an opaque unknown-valued record. Valid objects keep
all nullable/extension values for existing grouping and cost logic. Invalid JSON,
nulls, arrays and scalar containers become empty dimensions while the event itself
is retained. This does not change event counts or reinterpret historical fields.

The focused suite exercises actual `routeMessage`, `trafficOverview` and
`adminOverview` consumers through Hono, with explicit SQL/model doubles. It checks
malformed containers/elements, rejected invented epic ids, retained valid sibling
ordering and nullable fields, and real traffic grouping/counting. A helper-level
check additionally verifies opaque extension retention. The AI double runs in its
own Bun process so it cannot replace the SDK in unrelated fixtures. No actual
provider decision, D1 persistence or real Worker acceptance is claimed.

Author verification: five helper/test/docs/config files formatted successfully;
`bun test scripts/stored-json-consumers.test.ts` passed four tests / 69 assertions
with Bun 1.4.4 in 1.63 seconds. No full compiler, remote job, actual D1/Worker or
provider/browser check ran for this source checkpoint. Other boundaries in the
separate backend assertion inventory remain unresolved.
