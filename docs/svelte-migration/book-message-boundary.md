# Book stored-message and HTTP boundary

This source cohort supersedes the direct JSON/HTTP items listed as remaining in
the first [stored boundary inventory](book-stored-boundary.md). `Book` no longer
directly parses stored JSON or asserts HTTP JSON shapes. This is not full M1
acceptance: scalar SQL assumptions and other repository boundaries remain.

`messages`, `roomWindow` (including origins), older history and agent read output
now validate the shared Message fields. Missing/null older text means empty
text; author, thread, timestamp and message ID are never guessed/coerced. Invalid
structural rows are quarantined with kind-only diagnostics. Invalid attachments,
choices or cards cannot discard otherwise valid message text or valid siblings.
Origin truncation/card omission remains explicit. Older `more` uses the raw page
count, so quarantining one malformed row cannot falsely complete history.

Full message attachments use the existing Attachment contract. Missing older
fields can recover lazily from the room's canonical file table only for the
exact same file ID. Complete valid attachments need no additional file lookup.
Supplied corrupt fields are not replaced and no author, timestamp, MIME or file
version is invented. Quotes/search use a minimal id/name projection so older
attachment references need no unrelated metadata. Agent output uses the validated
full message/attachment DTOs and keeps quote fencing/author attribution intact.

Choices validate options, optional nullable multi and boolean/string terminal
closure. Extension data remains unknown and retained. A malformed choice cannot
be rewritten by `closeAsk`. Cards reuse the existing shared catalog normalizer
and historical aliases. Valid stored choice/card wire strings remain byte-for-
byte unchanged (including whitespace) in canonical messages, preserving prompt
identity guards. Agent card projection is normalized through that same contract.
The existing native over-budget card branch keeps its escaped original text;
that opaque string remains available without JSON parsing or agent projection.

The remote and cached MCP tool schemas are extracted unchanged into the pure
server `mcpTools` module; Book's app pin lookup reuses that validator without
widening which resource metadata enables a pin. The access-requested internal
HTTP body validates before book binding, owner lookup or notice posting. Nullable
display names remain absent; malformed payloads return 400. Initial room file
rows also use the first cohort's existing Attachment validation. The receipt
timer now has its actual platform return type rather than a double assertion.

Eight source fixtures cover older/invalid messages and isolated payloads, exact
wire identities, aliases and canonical file recovery, minimal quote/search refs,
MCP tool extensions, actual messages/older behavior, actual closeAsk and internal
access-request rejection before effects. They use SQL/DO doubles, not real
Worker persistence. The allocated formatter passed five owned paths and focused
Bun tests passed eight cases with 137 assertions in 4.32 seconds. Backend/API/
worker and UI/tooling types, builds and real Worker/browser validation remain
**unrun** for this cohort.

Remaining Book runtime audit work includes scalar SQL assertions for task status,
room/book metadata, names, totals/counts, acks/receipts and other typed SQL result
assumptions, plus the usage-cost projection. Corrupt rows are quarantined rather
than repaired in storage. This change introduces no new history cursor protocol
or database repair workflow and makes no claim of complete corrupt-database
recovery. Existing command validation, card catalog limits, membership and mutation
authorization remain with their current owners.
