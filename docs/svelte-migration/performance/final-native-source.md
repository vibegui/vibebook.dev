# Final native benchmark source

This is an unexecuted replacement harness for the complete native RootApp. It
does not replace the [13 November hybrid measurements](2026-11-13/README.md),
clear their failed budgets, or establish migration acceptance. No new results
are claimed by committing this source. The dedicated manual workflow publishes
new raw artifacts before any conclusions are recorded.

The first remote attempt, run `43556709008`, failed before browser startup: the
harness incorrectly required `vb-v` in the static native HTML. The production
Worker adds that metadata from the original asset ETag; the builder intentionally
leaves it absent. The corrected controlled server follows that augmentation
contract using its declared SHA-256 original-shell ETag and matching fixture
`Me.v`. It retains the actual script/style query digest and original/served body
hashes independently, and does not claim its ETag equals Cloudflare's. Preflight
failures now retain a safe source-hash JSON artifact. No timings from the failed
attempt are reused or treated as zero.

`bun run measure:ui` serves the current built vanilla and native public assets.
It uses the same deterministic, schema-validated 5,000-message, 50-epic,
600-task fixture for both variants, Book-like initial windows and 100-message
history pages. HTTP and Book/personal WebSockets in this comparison are
controlled browser fixtures, explicitly **not** a real Worker, provider,
database, CRDT or production-network experiment. Unknown requests/commands,
page errors, missing assets, failed outcomes and incomplete cohorts remain
failures. Native readiness requires the actual AppShell/RoomLayout, enabled
composer and canonical fixture message, rather than an old placeholder ID.

Each 1440×1000 and 390×844 profile runs one excluded warmup per variant followed
by seven measured runs per variant in alternating order, with 4× CDP CPU
throttling. Contexts are fresh and HTTP cache is disabled; the browser process,
OS caches and local server remain warm. No other jobs share the dedicated
runner. Readiness, three history loads, scrolling, canonical receipt-anchor
preservation, draft input, correlated send/canonical echo, thread switching,
room switching, Inbox and positive Home navigation retain explicit DOM
outcomes. Browser launch is excluded. Intervals include automation observation
and two animation frames; they are not pure framework render latency.

The harness forces GC at equivalent closed-editor main-thread checkpoints and
records heap/DOM counters and active controlled sockets through twenty
room/thread navigation cycles. That does not exercise a simulated editor.
`scripts/native-application-lifecycle.ts` is a separate hook for the real
Worker application harness: actual HTTP/MCP/auth fixtures, real room/thread
navigation, synchronized CM/Yjs editor Edit/Done, twenty mount/dispose cycles,
actual page WebSocket close counts and post-GC snapshots. It must be invoked
by that harness and its results published separately. It makes no paired
vanilla heap claim if only native is exercised. Observer instances and detached
component heap graphs are not directly enumerated; DOM/listener counts are
retention signals, so the complete lifecycle budget remains subject to review.

The public Google font network is permitted by default. Actual font requests,
failures, transfer sizes, loaded faces and CDP platform glyph fonts are retained.
A blocked Google stylesheet, missing transfer or fallback-only body font makes
font transfer **unverified**, not zero. Native local fonts remain counted.
Vanilla and native families intentionally differ: this is not a matched-font
experiment. `METRICS_FONTS=local-only` is available only as an explicitly limited
diagnostic and cannot verify the font budget. No font subset is activated here.

The approved thresholds are unchanged: readiness/thread/history medians at
most max(1.20× vanilla, vanilla+50ms), initial application bodies at most
vanilla+30KiB gzip, fonts at most vanilla+100KiB, and post-GC heap at most
vanilla+8MiB. Inline vanilla application code requires counting its HTML shell
alongside JS/CSS gzip references; the report names this conservative accounting
explicitly and retains actual CDP transfer separately. Missing observations and
fewer than seven successful samples stay unverified. Execution success is
separate from budget results and does not make M7 complete.

The manual `Controlled frontend performance` workflow builds both current
graphs, runs serially, and retains raw `metrics.json` plus `report.md` even after
failure. The exact harness git revision, runner-supplied served revision,
Chromium/runtime/CPU/memory environment, source/served asset hashes, shell
versions and fixture digests accompany every run. No old report, neutral layout
gallery, captured private room or directory-wide chunk sum is substituted for
this complete-app comparison. Real Worker functional and production acceptance
remain separate gates.

Run 43558814116 also stopped in shell preflight, before any browser or timing
sample: the metadata regex matched a literal `<meta name="vb-v">` inside the
vanilla inline JavaScript update comment. Preflight now parses actual HTML
elements and uses the original head source offset for insertion; comments,
script/style raw text and inert template contents do not count as active
metadata or bundle references. Actual duplicate metadata and incoherent bundle
references still fail. This correction changes no trials, readiness checks or
budgets; neither failed preflight supplies performance measurements.

Run 43560860743 passed preflight and reached Home navigation in the first
desktop vanilla warmup, then failed because the harness selected the desktop-hidden
mobile room-strip Home link. Desktop vanilla now uses its actual global switcher
Home link; mobile uses the already-open sidebar and both variants require visible
links. Earlier warmup observations remain in that failed run's raw artifact;
no measured seven-run cohort completed and no performance acceptance follows.

Run 43562235412 completed the first desktop vanilla warmup's UI navigation and
twenty lifecycle cycles, but strict unsupported-traffic validation failed at
settled because Home requests `GET /api/me/logins`. The controlled server now
serves that exact read-only endpoint using the existing `LoginsResult` schema,
with an empty synthetic login history and disabled external providers for both
variants. Unknown endpoints still invalidate samples. The failed warmup and its
observations remain recorded; no measured cohort or budget acceptance completed.
