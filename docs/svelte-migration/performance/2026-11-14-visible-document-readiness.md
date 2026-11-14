# Matched visible document entry readiness

The controlled benchmark now requires desktop's initially visible document to
contain the canonical fixture's complete rendered heading and paragraph sequence
before the existing fonts-ready plus two-animation-frame entry timestamp. It
records source SHA-256, character count and expected block counts. Mobile must
keep the document hidden; this assertion never opens a sheet or scrolls content.
The oracle describes only this fixture's heading/plain-paragraph grammar, not a
replacement application parser. Workload, 5,000 messages, 600 tasks, fonts,
alternating seven-run cohorts and acceptance budgets are unchanged.

The previous endpoint asserted chat/composer readiness but did not explicitly
assert preview completion. Historical timings therefore cannot establish parity
with this stronger readiness contract. Historical raw bytes remain evidence;
this correction does not erase any failed budgets or establish improved results.
New browser runs remain required.

The suspected delayed vanilla parser was not supported by source or the valid
desktop CI7 resource rows. Vanilla's `public/app.html` loads Marked and DOMPurify
as blocking head scripts and `renderDoc` calls them synchronously. Both appear in
the entry phase (10,898 and 8,449 gzip-reference bytes respectively). The later
17,885-byte `/svelte/ui.js` request belongs to the deferred Inbox integration.
Native's synchronous initial document and agent-message Markdown remain required
work; no parser or required view is deferred by this change.

Author checks: Node Prettier passed the three owned TypeScript files;
`bun test scripts/ui-metrics-model.test.ts` passed 9 tests / 57 assertions in
6.28 seconds. Browser assertions, strict types, builds and performance trials
remain unrun for this change; no new browser/performance result is claimed.
