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
evidence.

`secondary-panels.json` records the subsequent complete scoped rerun against the
same `aa50c3f` assets. Decisions, People and the real Reminder failed-processing
path pass. All twelve native panel audits across four EN/PT, desktop/mobile and
light/dark profiles report no accessibility violations; the browser reports no
JavaScript errors. Actual loaded Inter fonts are checked. These are twelve panel
audits, not the full product accessibility matrix. AI-backed schedule creation
and alarm execution remain unverified. Whole-room screenshots were visually
reviewed locally; the surrounding hybrid shell still needs final migration and
Studio-theme acceptance.

`documents-partial.json` records a **failed overall document run** against these
same assets. Five phases pass: native/vanilla Unicode collaboration and undo,
scoped documents with more than 8 KB of offline edits and concurrent peer
changes, all-editor 4003 recovery, deleted-epic refusal, and real uploaded-image
plus Mermaid rendering/safety. The captured [preview](document-preview.png) was
visually inspected. The run stops before removing the peer because its second
native editor enters the visible fallback instead of mounting CodeMirror.
Consequently member-removal privacy and final account/mobile disposal are
**unverified**. A previous fixture failure was separately traced to vanilla's
normal first-invitation welcome dialog; the harness now uses its real Skip
button. Worker closed-socket broadcast errors observed during recovery also
remain under investigation. These limitations cannot be labeled passing gates.

These results do not prove complete document lifecycle coverage, final RootApp retirement,
production performance, hardware keyboard behavior or overall M0–M8 completion.
