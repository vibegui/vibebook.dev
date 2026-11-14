# Native per-thread needs-you parity

Ports main b6090b3's endcard into the actual native Chat mount. The projection
uses canonical Personal waits for this room/thread, then this person's open main
or epic tasks; task waits suppress duplicate task rows. Keys remain wait refs or
task ID plus status, so a new ref/status resurfaces after dismissal. Message refs
jump through existing RoomScope navigation, including Viewer deferral. Suggestions
and removed epics do not present actionable stale items.

Dismiss and individual checks hide the captured visible items immediately.
Message-wait checks also call the existing typed resolve API; agent/task-only
checks are local. Browser storage contains only capped opaque keys, never wait
text, task titles, authors or serialized objects. Native storage adds account
scoping to room/thread scoping to avoid sharing dismissal decisions between
accounts. Unavailable/corrupt storage falls back to document memory. Existing
vanilla browser keys are not imported across accounts.

Local hiding is distinct from HTTP success. Resolving is an idempotent DELETE
scoped by authenticated recipient, room and ref; an independent 20-second lease
bounds ignored aborts. Failure permits explicit retry of still-canonical captured
message waits, never an automatic retry. Known global401 revokes authority. Room,
thread/account change or disposal invalidates late completions. Snapshot captures
and full canonical fingerprints reject old connected controls against edited or
replaced rows; dismiss-all cannot consume newly arrived unseen rows.

The expanded tree includes a directly opened archived epic in its normal order,
while the active count excludes it. Leaving removes that exception. The selected
row and collapsed rail gain a Studio primary accent bar; text and counts retain
readable semantic foregrounds. Archived state uses a readonly text cue, without
whole-row opacity.

Seven pure source cases cover projection/deduplication, storage/status scoping,
stale canonical rows, captured dismiss-all, timeout/retry/late completion,401 and
archive order. Two actual component DOM source cases cover stale pre-flush
controls and selected archived tree placement. The existing real-Worker reading
stage adds a supported MCP-owned task while Board hides chat, preserves every
original reading-window/top/anchor assertion, then checks actual endcard dismiss,
status resurface and done removal after real repin. No API/Book mocks are added to
that browser stage. These new DOM/browser assertions are unrun until parent gates.

Author checks: Node Prettier passed 17 owned source/config paths. The seven pure
cases passed 34 assertions in 763 ms. The deadline fixture first advanced before
its queued call had begun; it now explicitly awaits dispatch and asserts one
write before expiring the ignored-abort request. No compiler, DOM, browser,
application build or font/decoder change was run in this slice.
