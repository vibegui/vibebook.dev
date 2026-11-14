# Room socket lifecycle investigation

Status: the local 20-cycle socket/editor assertions pass; final revision and
production acceptance remain pending. The requirement was not relaxed.

[Worker run 43562169377](https://github.com/vibegui/vibebook.dev/actions/runs/43562169377)
at head `ba8e529` passed all seven dependent core phases. Browser instrumentation
observed application calls to `WebSocket.close()` with ready state OPEN before
the call and CLOSING afterward, without a thrown exception. A room connection
still lacked a browser close event beyond the lifecycle deadline; other Book
and Yjs connections closed abnormally with code 1006 about ten seconds after
their application close calls. This rules out a missing disposal call for those
observed sockets; it does not prove a particular runtime defect.

The runner reports Wrangler 4.152.0, Miniflare 5.20261019.2-beta and workerd
1.20261019.1, with requested compatibility date 2026-10-01 and no compatibility
warnings in the complete captured log head. Raw Worker logs remain private.

Book and DocRoom now explicitly acknowledge the peer close before their existing
presence/session cleanup, following the existing Person handler pattern. A guard
allows cleanup to continue if the runtime already completed the handshake.
[Cloudflare's documented close behavior](https://developers.cloudflare.com/durable-objects/api/base/)
says explicit close is safe when automatic acknowledgement is enabled. This is
a defensive completion change; source review and that documentation alone do
not establish that it resolves the measured failure.

[Run 43563524139](https://github.com/vibegui/vibebook.dev/actions/runs/43563524139)
at head `743a4e0` passed all seven core phases and all twenty lifecycle cycles.
Every observed application close completed cleanly (66 calls, maximum 27 ms),
and all 41 socket-count checks matched their expectations. The prior abnormal
ten-second and incomplete closes did not recur. Exact source/merge/asset hashes
and original safe reports are retained in
[the run 8 receipt](native-application-browser/2026-11-14-run8/README.md).

Post-GC nodes remained stable after cycle 1, and listener counts remained stable.
Heap rose from 18,298,512 to 21,168,696 bytes with a slowing positive trend; this
does not establish a plateau or prove complete absence of retained observers or
detached graphs. Further analysis and final-head verification remain required.

After the seven core phases pass, lifecycle, fresh-context theme/accessibility
profiles, replacement-app authority and page-error audits collect independently.
Every original assertion remains; any failed audit keeps the overall run failed.
This collects useful independent evidence without treating a lifecycle failure
as acceptance. If closure fails again, compare explicit normal-code versus
empty-code close requests in isolated real transport contexts before changing
additional production behavior.
