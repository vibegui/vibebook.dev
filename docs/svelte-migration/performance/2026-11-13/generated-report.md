# Current frontend synthetic long-room benchmark
Status: passed

Chromium: 158.0.8127.18; arm64; repetitions 3; fonts local-only; exclusive cohort declared true.

All values below require successful measured samples; failures remain in metrics.json. Fail-fast stops at the first invalid trial by default (METRICS_FAIL_FAST=0 continues). Step timeout defaults to 30 seconds (METRICS_STEP_TIMEOUT_MS); navigation timeout is 120 seconds. p95 is nearest rank, not a statistical confidence bound.

Action/update intervals include automation observation of the required DOM change and two animation frames. They are not pure WebSocket-event or rendering latency; see gaps in metrics.json. Fixture delivery alone never completes these measurements.

| Workload | Variant | Valid/total | Ready p50/p95 ms | Receipt update p50/p95 ms | Compose echo p50/p95 ms | Room switch p50/p95 ms |
|---|---|---:|---:|---:|---:|---:|
| long | vanilla | 3/3 | 6174.5 / 6246.8 | 591.8 / 608.7 | 2134.9 / 2493.0 | 3937.3 / 3970.3 |
| long | svelte | 3/3 | 14044.0 / 15996.9 | 1814.9 / 1920.5 | 5017.7 / 6160.6 | 10127.5 / 11248.1 |

| Workload | Variant | Trial/status | Entry local app raw / gzip-reference bytes | Entry known HTTP transfer bytes | Post-entry local app raw / gzip-reference bytes | Missing transfer sizes |
|---|---|---|---:|---:|---:|---:|
| long | vanilla | 1/passed | 581500 / 170601 | 173709 | 56158 / 17872 | 1 |
| long | svelte | 1/passed | 2426646 / 1269450 | 1278580 | 0 / 0 | 1 |
| long | svelte | 2/passed | 2426646 / 1269450 | 1278580 | 0 / 0 | 1 |
| long | vanilla | 2/passed | 581500 / 170601 | 173709 | 56158 / 17872 | 1 |
| long | vanilla | 3/passed | 581500 / 170601 | 173709 | 56158 / 17872 | 1 |
| long | svelte | 3/passed | 2426646 / 1269450 | 1279822 | 0 / 0 | 1 |

Scroll RAF intervals, frame-p95/jank counts, thread switching, Inbox loading, CPU/layout counters and heap/nodes are in each raw sample and summaries. V8 heap is not browser RSS.

Entry/deferred bytes come from actual requested resources classified by request-start phase, never a directory-wide chunk sum. See byteSummary and resources in metrics.json. gzip references are individually compressed file sizes, not measured transfer or a hypothetical concatenated bundle.

This is controlled frontend evidence, not production/Worker/provider acceptance. See config, fixture digests, environment, asset hashes and gaps in metrics.json.
