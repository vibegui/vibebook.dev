# Deferred-view and document-generator HMR checkpoint

[Actual GitHub run 43580277105](https://github.com/vibegui/vibebook.dev/actions/runs/43580277105) passed on source head `674b8fb`; the actual PR merge checkout recorded by the runner is `8f50d87d28a365515fb11f8890227d456a1c5b9e`. Original safe [results](results.json) and [runner cleanup](runner.json) are preserved unchanged. This revalidates the checked frontend-HMR milestone after deferred views and the document generator. It completes no other M7 performance, platform, production or final-revision gate.

The real local Worker and source Vite started in 5791ms: API types413ms, MCP92ms, Worker2166ms, Vite3017ms, explicit document-generator readiness99ms. The startup-only allowance was600000ms. Initial-build cancellation also passed. Runtime requests verified selected native source shells, unselected vanilla default and typed denied-access presentation without unauthorized Book transport. Book, Personal and Yjs upgrades each returned101 for the exact Vite origin and403 for the foreign origin. Backend/tooling/generated-backend/private/symlink/encoded-path fetches returned403; hostile authorities produced no outbound cookie-bearing request.

Actual Sidebar and sole-CSS edits preserved the mounted document, ComposerDrafts bank and Book connection. A demand-loaded Files component was opened through its real UI, filtered to TXT, edited, and observed updated; the same updated mounted node/filter survived Doc→Files re-entry with the composer draft intact. No DOM draft restoration shim was used.

A retained executable bootstrap error string was edited, not a removable comment. The owned watcher regenerated the shared string and served a new content-addressed host through the vanilla HTTP shell:

| Artifact | Original/restored | Mutated |
| --- | --- | --- |
| Shared generated SHA256 | `5b4ae0cb2f962b7415a6ff1f716a7ba2b26fa75cca63bb25bc793ffc059b4cb0` | `c98593aacc0c003591072362b5c62a013087dd4a03744173e95eef688ab6b82a` |
| Served host SHA256 | `4262f70823450d09be4360e1287ad949251de079f8ee422c3de5d1c97a580730` | `cb02d114bc37c855c56c24348469b053fe985356773c6d9037ece171f8569b58` |
| Served host bytes |304102|304129|

The supervisor identity remained unchanged. The generated-shared edit and its restoration each caused an automatic full document reload and real room reconnect. Both reset the prior in-memory composer draft; this is explicitly recorded, not represented as draft preservation across runtime reloads. A fresh current-document draft survived an actual Doc↔Files roundtrip. Shared-contract/API declaration changes and a real changed Worker route subsequently reloaded/reconnected without manual rebuild/restart.

All seven edited sources—Sidebar, CSS, Files, bootstrap, shared schema, Worker implementation and API declaration source—have original/mutated/restored digests. Every mutation differs, and every restored digest exactly equals its original; active mutations end at zero. The shared generated string, vanilla host import and served host bytes also returned exactly to their originals. Both shutdowns exited130; all observed descendants (3 during startup cancellation and16 after the full run) disappeared and both listening ports closed. Application errors and cleanup errors are empty. Very short-lived unobserved descendants are not claimed.

This passing run follows the quiet-write invariant and safe per-probe diagnostics. It does not establish the earlier isolated `ECONNRESET` root cause: that failed artifact did not identify its path/origin, and no causal A/B intervention was run. It also does not replace SDK document-authority, real provider, collaboration, mobile/accessibility, production bundle or performance acceptance.
