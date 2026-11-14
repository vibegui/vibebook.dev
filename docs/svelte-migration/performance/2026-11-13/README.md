# Current long-room performance: hybrid Svelte regresses

The controlled run passed all eight trials, but **the current hybrid Svelte
preview is slower and larger than current vanilla**. This is a passing benchmark
execution, not passing migration performance acceptance. Keep vanilla the default
and Svelte opt-in. Do not mark M7 or the full migration complete.

Tested frontend assets: source `e54e9e4`, build commit `76772b5`, preview entry
`3c0acf0ffcef54984b9e`; harness `cfd5c77`. Raw samples, resource requests, asset
hashes, fixture digests and environment are in [metrics.json](metrics.json);
[generated-report.md](generated-report.md) contains the complete generated table.

## Measurements

One excluded warmup and three measured trials per variant, in alternating order.
The deterministic room has 5,000 messages, 50 epics, 600 tasks, 16 members and a
40,000-character document. The initial Book-like delivery contains 110 messages
across active threads; the open thread renders 60 initially. History loads add
100 at a time. Scrolling can trigger extra history requests; actual traffic and
DOM counts are recorded. This does not render all 5,000 messages simultaneously.

| Median observed interval              | Vanilla | Hybrid Svelte |
| ------------------------------------- | ------: | ------------: |
| Ready, including fonts and two frames |  6.17 s |       14.04 s |
| First history load                    |  3.36 s |        4.19 s |
| Thread switch                         |  2.74 s |        6.14 s |
| Receipt update                        |  0.59 s |        1.81 s |
| Compose to fixture echo               |  2.13 s |        5.02 s |
| Room switch                           |  3.94 s |       10.13 s |
| Inbox opening                         |  4.21 s |        0.70 s |
| Settled V8 heap, without forced GC    | 8.4 MiB |      21.1 MiB |

Interaction intervals include Playwright observation of the required DOM change
and two animation frames. They are not isolated rendering/WebSocket latency.
Scrolling's median per-trial RAF p95 was approximately 256 ms versus 253 ms;
headless RAF intervals are not hardware display FPS. With three trials, summary
p95 is the observed maximum, not a confidence estimate.

## Bytes and font caveat

| Requested entry bodies, individually gzip-compressed reference |      Vanilla | Hybrid Svelte |
| -------------------------------------------------------------- | -----------: | ------------: |
| Application HTML, JS and CSS                                   |    170,601 B |     443,300 B |
| Local Studio fonts                                             | 0 B measured |     826,150 B |

Known initial HTTP transfer was about 174 KB versus 1.28 MB, including response
overhead. **These are not matched production font totals:** the configured
`local-only` policy blocks vanilla's Google font stylesheet; native local Studio
fonts are included. That blocked request has no transfer size and is retained
in every sample. Do not attribute the whole transfer or timing gap to Svelte or
treat missing external font bytes as production zero.

The three Studio font bodies contribute about 807 KiB: Inter regular 351,779 B,
Inter italic 387,610 B and CommitMono 86,761 B as gzip references. Their actual
font families remain required. The initial native main JS body is another
approximately 222 KB of HTTP transfer. Native requested no additional post-entry
app bodies in this scenario; vanilla deferred 17,872 B gzip-reference bodies,
including Inbox. Fast native Inbox opening accompanies that eager-loading cost.

## Acceptance and next work

Readiness and thread-switch medians exceed the plan's 1.20× vanilla allowance in
this controlled desktop run. First and second history loads exceed it; the third
does not. Application JS/CSS plus the equivalent inlined HTML exceed the
vanilla + 30 KiB budget by a wide margin. **These criteria remain unsatisfied.**
The paired production-font budget is unverified because of the font policy.
Post-GC heap and twenty-cycle lifecycle budgets were not measured here.

Proceed with font subsetting/lazy Unicode coverage while retaining the pinned
Studio outlines, axes and typography; split eager feature graphs; profile broad
room updates before changing rendering. Repeat the same fixtures after each
substantive optimization, then measure actual production rooms and device
profiles. Do not silently raise the plan's budgets or call these regressions a
framework-level conclusion.

## Limits and failed attempts

This is Linux arm64, four reported CPUs, 880 MiB RAM, Chromium 158.0.8127.18,
Bun 1.4.4, desktop 1440×1000 and reduced motion. The Worker and other browser
cohorts were stopped. Contexts are fresh, HTTP cache disabled, service workers
blocked; browser-process/OS caches remain warm. This constrained rig is not a
production speed or user-device claim. HTTP/WS fixtures are synthetic; no actual
Worker, database, provider or production room is being benchmarked.

Earlier invalid runs are retained as [invalid-wire-probe.json](invalid-wire-probe.json)
and [invalid-inbox-probe.json](invalid-inbox-probe.json). The first was interrupted
after a failed warmup; its raw top-level running status is preserved, not treated
as success. The second failed on an incorrect accessible-name assumption about
vanilla Inbox. Neither contributes to the valid comparison or its summaries.
