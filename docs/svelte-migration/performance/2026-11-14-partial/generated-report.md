# Fully native versus vanilla controlled long-room benchmark
Status: incomplete-or-failed

Chromium: 158.0.8127.18; x64; repetitions 7 per variant and device after 1 warmup(s); 1440×1000 / 390×844, 4x CPU; fonts network-public-fonts; exclusive cohort declared true.

All values below require successful measured samples; failures remain in metrics.json. Fail-fast stops at the first invalid trial by default (METRICS_FAIL_FAST=0 continues). Step timeout defaults to 30 seconds (METRICS_STEP_TIMEOUT_MS); navigation timeout is 120 seconds. p95 is nearest rank, not a statistical confidence bound.

Action/update intervals include automation observation of the required DOM change and two animation frames. They are not pure WebSocket-event or rendering latency; see gaps in metrics.json. Fixture delivery alone never completes these measurements.

| Workload / device | Variant | Valid/total | Ready p50/p95 ms | Receipt update p50/p95 ms | Compose echo p50/p95 ms | Room switch p50/p95 ms |
|---|---|---:|---:|---:|---:|---:|
| long / desktop | vanilla | 7/7 | 1180.6 / 1205.6 | 86.8 / 99.0 | 305.4 / 321.8 | 431.1 / 442.4 |
| long / desktop | svelte | 7/7 | 2034.8 / 2415.6 | 348.6 / 365.0 | 626.2 / 641.1 | 778.9 / 802.0 |
| long / mobile | vanilla | 0/0 | unmeasured | unmeasured | unmeasured | unmeasured |
| long / mobile | svelte | 0/0 | unmeasured | unmeasured | unmeasured | unmeasured |

| Workload / device | Variant | Trial/status | Entry all local asset raw / gzip-reference bytes | Entry known HTTP transfer bytes | Post-entry all local asset raw / gzip-reference bytes | Missing transfer sizes |
|---|---|---|---:|---:|---:|---:|
| long / desktop | vanilla | 1/passed | 589474 / 172873 | 366733 | 56189 / 17885 | 0 |
| long / desktop | svelte | 1/passed | 2481526 / 1278483 | 1288820 | 0 / 0 | 0 |
| long / desktop | svelte | 2/passed | 2481526 / 1278483 | 1288820 | 0 / 0 | 0 |
| long / desktop | vanilla | 2/passed | 589474 / 172873 | 366731 | 56189 / 17885 | 0 |
| long / desktop | vanilla | 3/passed | 589474 / 172873 | 366731 | 56189 / 17885 | 0 |
| long / desktop | svelte | 3/passed | 2481526 / 1278483 | 1288820 | 0 / 0 | 0 |
| long / desktop | svelte | 4/passed | 2481526 / 1278483 | 1288820 | 0 / 0 | 0 |
| long / desktop | vanilla | 4/passed | 589474 / 172873 | 366731 | 56189 / 17885 | 0 |
| long / desktop | vanilla | 5/passed | 589474 / 172873 | 366731 | 56189 / 17885 | 0 |
| long / desktop | svelte | 5/passed | 2481526 / 1278483 | 1288820 | 0 / 0 | 0 |
| long / desktop | svelte | 6/passed | 2481526 / 1278483 | 1288820 | 0 / 0 | 0 |
| long / desktop | vanilla | 6/passed | 589474 / 172873 | 366732 | 56189 / 17885 | 0 |
| long / desktop | vanilla | 7/passed | 589474 / 172873 | 366732 | 56189 / 17885 | 0 |
| long / desktop | svelte | 7/passed | 2481526 / 1278483 | 1286757 | 0 / 0 | 2 |

## Approved budget comparisons (not execution status)

| Workload / device | Metric | Vanilla median | Native median | Limit | Result |
|---|---|---:|---:|---:|---|
| long / desktop | entry.readyWithFontsAndTwoFramesMs | 1180.5999999999767 | 2034.7999999999884 | 1416.719999999972 | failed |
| long / desktop | threadSwitch.ms | 396.6000000000349 | 624.7000000000698 | 475.9200000000419 | failed |
| long / desktop | history1.ms | 415.9000000000233 | 598.2999999999884 | 499.0800000000279 | failed |
| long / desktop | history2.ms | 614.2000000000116 | 618.1999999999534 | 737.040000000014 | passed |
| long / desktop | history3.ms | 898.2000000000116 | 707.6999999999534 | 1077.840000000014 | passed |
| long / desktop | entry.applicationGzipReferenceBytes | 172873 | 452333 | 203593 | failed |
| long / desktop | entry.fontTransferBytes | 190632 | 826876 | 293032 | failed |
| long / desktop | settled.JSHeapUsedSize | 6959472 | 20779224 | 15348080 | failed |
| long / mobile | entry.readyWithFontsAndTwoFramesMs | unverified | unverified | unverified | unverified |
| long / mobile | threadSwitch.ms | unverified | unverified | unverified | unverified |
| long / mobile | history1.ms | unverified | unverified | unverified | unverified |
| long / mobile | history2.ms | unverified | unverified | unverified | unverified |
| long / mobile | history3.ms | unverified | unverified | unverified | unverified |
| long / mobile | entry.applicationGzipReferenceBytes | unverified | unverified | unverified | unverified |
| long / mobile | entry.fontTransferBytes | unverified | unverified | unverified | unverified |
| long / mobile | settled.JSHeapUsedSize | unverified | unverified | unverified | unverified |

Performance acceptance: failed. Twenty actual editor/provider lifecycle cycles require the separate real-Worker cohort. Previous hybrid budget failures are historical evidence, not overwritten or cleared by generating this report.

Scroll RAF intervals, frame-p95/jank counts, thread switching, Inbox loading, CPU/layout counters and heap/nodes are in each raw sample and summaries. V8 heap is not browser RSS.

Entry/deferred totals above include all requested local bodies, including local fonts. Budget metrics separately select application HTML/JS/CSS and actual font dependencies. Bytes come from actual requested resources classified by request-start phase, never a directory-wide chunk sum. See byteSummary and resources in metrics.json. gzip references are individually compressed file sizes, not measured transfer or a hypothetical concatenated bundle.

This is controlled frontend evidence, not production/Worker/provider acceptance. See config, fixture digests, environment, asset hashes and gaps in metrics.json.
