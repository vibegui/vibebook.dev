# Fully native versus vanilla controlled long-room benchmark
Status: incomplete-or-failed

Chromium: 158.0.8127.18; x64; repetitions 7 per variant and device after 1 warmup(s); 1440×1000 / 390×844, 4x CPU; fonts network-public-fonts; exclusive cohort declared true.

All values below require successful measured samples; failures remain in metrics.json. Fail-fast stops at the first invalid trial by default (METRICS_FAIL_FAST=0 continues). Step timeout defaults to 30 seconds (METRICS_STEP_TIMEOUT_MS); navigation timeout is 120 seconds. p95 is nearest rank, not a statistical confidence bound.

Action/update intervals include automation observation of the required DOM change and two animation frames. They are not pure WebSocket-event or rendering latency; see gaps in metrics.json. Fixture delivery alone never completes these measurements.

| Workload / device | Variant | Valid/total | Ready p50/p95 ms | Receipt update p50/p95 ms | Compose echo p50/p95 ms | Room switch p50/p95 ms |
|---|---|---:|---:|---:|---:|---:|
| long / desktop | vanilla | 7/7 | 1289.8 / 1331.3 | 92.0 / 103.7 | 327.0 / 370.5 | 510.1 / 539.8 |
| long / desktop | svelte | 7/7 | 2445.1 / 2462.8 | 425.0 / 470.8 | 730.7 / 762.4 | 896.3 / 940.9 |
| long / mobile | vanilla | 0/0 | unmeasured | unmeasured | unmeasured | unmeasured |
| long / mobile | svelte | 0/0 | unmeasured | unmeasured | unmeasured | unmeasured |

| Workload / device | Variant | Trial/status | Entry all local asset raw / gzip-reference bytes | Entry known HTTP transfer bytes | Post-entry all local asset raw / gzip-reference bytes | Missing transfer sizes |
|---|---|---|---:|---:|---:|---:|
| long / desktop | vanilla | 1/passed | 593609 / 174056 | 367777 | 56189 / 17885 | 0 |
| long / desktop | svelte | 1/passed | 2295974 / 1252637 | 1271640 | 51781 / 15171 | 0 |
| long / desktop | svelte | 2/passed | 2295974 / 1252637 | 1271640 | 51781 / 15171 | 0 |
| long / desktop | vanilla | 2/passed | 593609 / 174056 | 367913 | 56189 / 17885 | 0 |
| long / desktop | vanilla | 3/passed | 593609 / 174056 | 367777 | 56189 / 17885 | 0 |
| long / desktop | svelte | 3/passed | 2295974 / 1252637 | 1271640 | 51781 / 15171 | 0 |
| long / desktop | svelte | 4/passed | 2295974 / 1252637 | 1271640 | 51781 / 15171 | 0 |
| long / desktop | vanilla | 4/passed | 593609 / 174056 | 367913 | 56189 / 17885 | 0 |
| long / desktop | vanilla | 5/passed | 593609 / 174056 | 367777 | 56189 / 17885 | 0 |
| long / desktop | svelte | 5/passed | 2295974 / 1252637 | 1269577 | 51781 / 15171 | 2 |
| long / desktop | svelte | 6/passed | 2295974 / 1252637 | 1271640 | 51781 / 15171 | 0 |
| long / desktop | vanilla | 6/passed | 593609 / 174056 | 367777 | 56189 / 17885 | 0 |
| long / desktop | vanilla | 7/passed | 593609 / 174056 | 367914 | 56189 / 17885 | 0 |
| long / desktop | svelte | 7/passed | 2295974 / 1252637 | 1271640 | 51781 / 15171 | 0 |

## Approved budget comparisons (not execution status)

| Workload / device | Metric | Vanilla median | Native median | Limit | Result |
|---|---|---:|---:|---:|---|
| long / desktop | entry.readyWithFontsAndTwoFramesMs | 1289.8000000000466 | 2445.0999999999767 | 1547.760000000056 | failed |
| long / desktop | threadSwitch.ms | 444.4000000000233 | 740.6999999999534 | 533.2800000000279 | failed |
| long / desktop | history1.ms | 514.0999999999767 | 715.3000000000175 | 616.919999999972 | failed |
| long / desktop | history2.ms | 742.3000000000466 | 722.7000000000698 | 890.7600000000558 | passed |
| long / desktop | history3.ms | 1094.4000000000233 | 897.1000000000349 | 1313.280000000028 | passed |
| long / desktop | entry.applicationGzipReferenceBytes | 174056 | 426487 | 204776 | failed |
| long / desktop | entry.fontTransferBytes | 190495 | 826876 | 292895 | failed |
| long / desktop | settled.JSHeapUsedSize | 7018376 | 20627680 | 15406984 | failed |
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
