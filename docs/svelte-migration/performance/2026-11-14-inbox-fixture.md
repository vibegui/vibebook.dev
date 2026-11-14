# Current Inbox fixture and readiness

Current main adds `GET /api/inbox`; both default vanilla and native now request
it. The controlled benchmark previously had no such endpoint, which would
correctly invalidate a new trial as unsupported traffic. Returning an invented
empty list would also hide real seeded tasks.

`metricInbox` derives the shared `InboxResult` from the same canonical room
fixtures: current-person open tasks in unarchived epics and the main thread,
with the production thirty-room cap and normalized nullable fields. Queued
waits/mentions are genuinely absent from this fixture. Both frontends receive
the identical schema-validated HTTP payload.

The Inbox interval now waits for every current-room task title and the actual
HTTP read, as well as the dialog heading. Earlier heading-only Inbox times are
historical endpoints. Workload sizes, initial document readiness, seven
measured runs after warmup, byte/font/heap classification and every original
acceptance budget remain unchanged. The fixture regression checks three exact
owned open tasks while excluding archived, completed and other-person tasks;
the ten model tests pass with sixty assertions. Browser verification and the
next complete controlled comparison remain required.
