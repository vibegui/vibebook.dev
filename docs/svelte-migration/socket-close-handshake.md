# Room socket lifecycle investigation

Status: runtime recovery pending. The 20-cycle requirement and socket-count
assertions remain unchanged.

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

The next real Worker run must prove normal disposal across all twenty cycles.
After the seven core phases pass, lifecycle, fresh-context theme/accessibility
profiles, replacement-app authority and page-error audits collect independently.
Every original assertion remains; any failed audit keeps the overall run failed.
This collects useful independent evidence without treating a lifecycle failure
as acceptance. If closure still fails, compare explicit normal-code versus
empty-code close requests in isolated real transport contexts before changing
additional production behavior.
