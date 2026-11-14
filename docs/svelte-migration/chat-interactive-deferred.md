# Interactive message presentation on demand

`Message` keeps its eager text, privacy projection, attachments, receipt/footer,
anchor and action frame. Only a rendered message containing `card`, `choices` or
`poll` requests the interactive component. Ordinary Markdown does not request it.
Canonical room/command/draft owners remain eager. Lightweight choice/answer guards
are extracted unchanged; importing them no longer constructs the card catalog.

Each account/room/message/thread/author/kind identity owns its deferred transport.
The loaded constructor remains stable through receipt and content refreshes. All
existing interactive sessions still own permission confirmation, pending writes,
ACK uncertainty and canonical reconciliation. Module completion never queues or
replays an action. Membership/privacy, current canonical interactive content and
message identity fence dispatch and ignored late imports; departure disposes the
loader. An explicit accessible error/retry replaces a failed import. No public
module cache stores room/message data.

`data-native-interactive-state` exposes loading/error/ready. Performance room
readiness must see no unfinished interactive message before accepting a sample;
a loading skeleton is not complete content. Existing real card/choice/permission/
poll DOM fixtures retain their assertions and now wait for the actual lazy body.
New pure and controlled-transport DOM cases cover ignored old owners, receipt
refresh retention, failure/retry and revocation. DOM/compiler/browser checks are
not claimed merely from authoring those cases.

The b22c508 diagnostic graph attributes 51,911 rendered code bytes to the rare
interactive components/session. This is not gzip attribution or predicted savings.
Current requested resource SHA/revision measurements, full interactive DOM tests,
real first-card/permission/poll readiness and component HMR remain required gates.
Initial visible documents and their parsers are unchanged. Composer splitting is
outside this change.

Author checkpoint: the 15 owned files were formatted; the five focused pure tests
passed (23 assertions, Bun 1.4.4, 447 ms). DOM tests, Svelte/compiler checks, build,
real browser behavior and byte measurements remain unrun for this source change.
