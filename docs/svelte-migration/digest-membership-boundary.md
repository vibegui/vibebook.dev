# Queued mention authorization

Current main `8a2d05e` adds `/api/inbox` using retained `digest_items` text.
Both that read and the existing scheduled digest selected queued rows without a
current-membership join. Removing a member deletes `members`, while queued rows
can remain. Source inspection therefore found a path that could return a former
member's queued room text; no production account or private data was probed.

`src/digestItems.ts` supplies the exact production queries for both consumers.
Each joins the recipient's current membership by room and email at read time.
Their opposite chronological orders, forty-row limits, author display metadata,
archived-member behavior and queued-row retention are preserved. No replacement
identity, authorization cache, provider or model is involved.

Two Bun SQLite tests run those actual queries, covering separate recipients,
absent/revoked membership, current archived membership, unchanged queued rows
and 45 eligible mentions reduced to the correct first/last forty. They pass with
13 assertions. Source peer review accepted the patch. These are real SQLite row
selection results, not Cloudflare D1, actual email delivery or production proof.
Final strict checking and the integrated Worker cohort remain required.
