# Real browser checkpoint

These are local Chromium results, not deployment or full migration acceptance.
Vanilla remains the default; Svelte requires `?ui=svelte`.

`viewer.json` records the passing real Worker/Book/R2 Viewer run against source
`8b0182c` and the rebuilt preview with entry query `75052086cf9cd037400d`.
The harness checks exact file versions, media resources, CSV pagination, mobile
history ownership and same-URL cache partitioning across actual dev identities.
The report explicitly lists unverified PDF rendering and platform behavior.

`mobile-form-pointer.log` records a focused real pointer reproduction against
source/build `aa50c3f`, entry query `e084b86f5a8b1be7ba28`. At 390×900, pointerdown,
pointerup and click all reach Cancel as trusted browser events; the form closes
and focus returns to the New reminder trigger. The earlier build moved the
button between pointerdown and pointerup as the textarea lost focus, preventing
the click. `30b4438` keeps the expanded sheet height while the form owns focus,
using the sole Tailwind entry. No programmatic click was needed in this passing
run. An initial cold run timed out before the room mounted; it is not passing
evidence. The full secondary-panel rerun remains pending.

Neither result proves real document collaboration, final RootApp retirement,
production performance, hardware keyboard behavior or overall M0–M8 completion.
