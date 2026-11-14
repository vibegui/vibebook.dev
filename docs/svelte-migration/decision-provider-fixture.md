# Controlled external decision-provider fixture

This fixture tests the real HTML review protocol, upload gate and app authority
path without a real model key. It does not judge HTML quality and cannot satisfy
M8 real-provider intelligence acceptance.

The server-owned `DECISION_API` override is accepted only with nonempty
`DEV_EMAIL` and the exact raw URL
`http://127.0.0.1:<1..65535>/api/alpha/decisions`. DNS aliases, credentials,
HTTPS, query/hash (including empty suffixes), encoded paths and invalid ports
are refused before HTTP. A provided invalid override fails closed; it never
falls back to an external provider. An absent override keeps the production
OpenRouter URL and headers unchanged. Local fixture requests omit Authorization
even if an API key accidentally exists in the environment. `MODEL_JUDGE=off`
still makes no provider call. No client request flag selects this endpoint.
Local fixture redirects are manual and non-success responses fail closed, so a
redirect cannot escape the validated endpoint; production redirect behavior is
unchanged.

The dedicated CI runner owns one loopback HTTP model server and its cleanup.
Only the exact current three embed questions, model name, bounded HTML and
known synthetic documents are accepted. A fixed harmless DENY control receives
a deterministic simulated refusal. The exact generated readonly probe document
receives a simulated allow. Other documents or grading questions fail closed.
No request body, model input, headers, key or raw exception is persisted by the
fixture; artifacts contain counters and the explicit simulated-judgment scope.

The actual HTTP upload of `apps/review-deny.html` must return 400 with the real
HTML review refusal before the positive app upload is attempted. The positive
path then uses ordinary review, size/secret/rate checks, R2/Book indexing, real
user open, installed SDK host, initial positive read and same-frame replacement
probe. No canonical API, SDK bridge or storage is mocked in the Worker cohort.
The `global_fetch_strictly_public` compatibility flag remains untouched; if the
local provider is unreachable, the review fails closed and the probe remains
inconclusive. Default standalone/production model behavior is not loosened.

Unit sources cover exact configuration, invalid inputs/no fallback, production
header parity, local credential omission, MODEL_JUDGE off, strict request/known-
document validation and real loopback protocol driving the actual `storeFile`
method with explicit storage doubles. DENY must perform no put/index operation;
ALLOW retains normal storage. These unit doubles do not claim real DO/R2 proof.
The allocated scoped formatter passed sixteen paths plus three redirect-fix
followups. Four provider fixtures and two diagnostic privacy fixtures passed
70 assertions in 2.87 seconds, including real loopback HTTP DENY/no-put, ALLOW
normal storage and a redirect that reached no second target. These are author
unit receipts. Backend/API/worker/tooling types and actual CI Worker/browser
execution remain **unrun** for this provider seam.
