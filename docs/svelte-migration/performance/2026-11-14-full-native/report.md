# Fully native versus vanilla controlled long-room benchmark
Status: passed

Chromium: 158.0.8127.18; x64; repetitions 7 per variant and device after 1 warmup(s); 1440×1000 / 390×844, 4x CPU; fonts network-public-fonts; exclusive cohort declared true.

All values below require successful measured samples; failures remain in metrics.json. Fail-fast stops at the first invalid trial by default (METRICS_FAIL_FAST=0 continues). Step timeout defaults to 30 seconds (METRICS_STEP_TIMEOUT_MS); navigation timeout is 120 seconds. p95 is nearest rank, not a statistical confidence bound.

Action/update intervals include automation observation of the required DOM change and two animation frames. They are not pure WebSocket-event or rendering latency; see gaps in metrics.json. Fixture delivery alone never completes these measurements.

| Workload / device | Variant | Valid/total | Ready p50/p95 ms | Receipt update p50/p95 ms | Compose echo p50/p95 ms | Room switch p50/p95 ms |
|---|---|---:|---:|---:|---:|---:|
| long / mobile | vanilla | 7/7 | 1061.4 / 1142.2 | 70.3 / 85.4 | 262.1 / 267.1 | 421.1 / 447.1 |
| long / mobile | svelte | 7/7 | 2021.7 / 2186.1 | 357.9 / 377.2 | 601.8 / 665.9 | 797.9 / 853.2 |
| long / desktop | vanilla | 7/7 | 1161.6 / 1277.4 | 96.1 / 133.4 | 333.5 / 405.4 | 432.8 / 490.2 |
| long / desktop | svelte | 7/7 | 1936.4 / 2189.9 | 350.8 / 420.0 | 629.9 / 693.0 | 708.9 / 823.4 |

| Workload / device | Variant | Trial/status | Entry all local asset raw / gzip-reference bytes | Entry known HTTP transfer bytes | Post-entry all local asset raw / gzip-reference bytes | Missing transfer sizes |
|---|---|---|---:|---:|---:|---:|
| long / mobile | vanilla | 1/passed | 593609 / 174055 | 367913 | 56189 / 17885 | 0 |
| long / mobile | svelte | 1/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / mobile | svelte | 2/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / mobile | vanilla | 2/passed | 593609 / 174055 | 367913 | 56189 / 17885 | 0 |
| long / mobile | vanilla | 3/passed | 593609 / 174055 | 367913 | 56189 / 17885 | 0 |
| long / mobile | svelte | 3/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / mobile | svelte | 4/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / mobile | vanilla | 4/passed | 593609 / 174055 | 367914 | 56189 / 17885 | 0 |
| long / mobile | vanilla | 5/passed | 593609 / 174055 | 367914 | 56189 / 17885 | 0 |
| long / mobile | svelte | 5/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / mobile | svelte | 6/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / mobile | vanilla | 6/passed | 593609 / 174055 | 367914 | 56189 / 17885 | 0 |
| long / mobile | vanilla | 7/passed | 593609 / 174055 | 367914 | 56189 / 17885 | 0 |
| long / mobile | svelte | 7/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / desktop | vanilla | 1/passed | 593609 / 174055 | 367914 | 56189 / 17885 | 0 |
| long / desktop | svelte | 1/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / desktop | svelte | 2/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / desktop | vanilla | 2/passed | 593609 / 174055 | 367914 | 56189 / 17885 | 0 |
| long / desktop | vanilla | 3/passed | 593609 / 174055 | 367777 | 56189 / 17885 | 0 |
| long / desktop | svelte | 3/passed | 2247253 / 1238452 | 1255887 | 51820 / 15194 | 2 |
| long / desktop | svelte | 4/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / desktop | vanilla | 4/passed | 593609 / 174055 | 367914 | 56189 / 17885 | 0 |
| long / desktop | vanilla | 5/passed | 593609 / 174055 | 367914 | 56189 / 17885 | 0 |
| long / desktop | svelte | 5/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / desktop | svelte | 6/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |
| long / desktop | vanilla | 6/passed | 593609 / 174055 | 367913 | 56189 / 17885 | 0 |
| long / desktop | vanilla | 7/passed | 593609 / 174055 | 367777 | 56189 / 17885 | 0 |
| long / desktop | svelte | 7/passed | 2247253 / 1238452 | 1257950 | 51820 / 15194 | 0 |

## Approved budget comparisons (not execution status)

| Workload / device | Metric | Vanilla median | Native median | Limit | Result |
|---|---|---:|---:|---:|---|
| long / mobile | entry.readyWithFontsAndTwoFramesMs | 1061.3999999999942 | 2021.7000000000116 | 1273.679999999993 | failed |
| long / mobile | threadSwitch.ms | 375.19999999995343 | 623.4000000000233 | 450.23999999994413 | failed |
| long / mobile | history1.ms | 414.5 | 531.7999999999884 | 497.4 | failed |
| long / mobile | history2.ms | 597.3000000000466 | 560.7000000000116 | 716.7600000000558 | passed |
| long / mobile | history3.ms | 914.0999999999767 | 731.7999999999302 | 1096.919999999972 | passed |
| long / mobile | entry.applicationGzipReferenceBytes | 174055 | 412302 | 204775 | failed |
| long / mobile | entry.fontTransferBytes | 190633 | 826876 | 293033 | failed |
| long / mobile | settled.JSHeapUsedSize | 6999676 | 20503884 | 15388284 | failed |
| long / desktop | entry.readyWithFontsAndTwoFramesMs | 1161.5999999999767 | 1936.4000000001397 | 1393.919999999972 | failed |
| long / desktop | threadSwitch.ms | 376.69999999995343 | 643.5 | 452.0399999999441 | failed |
| long / desktop | history1.ms | 431.80000000004657 | 565.1999999999534 | 518.1600000000559 | failed |
| long / desktop | history2.ms | 614.0999999999767 | 577.1999999999534 | 736.919999999972 | passed |
| long / desktop | history3.ms | 941.3999999999069 | 684.5999999998603 | 1129.6799999998882 | passed |
| long / desktop | entry.applicationGzipReferenceBytes | 174055 | 412302 | 204775 | failed |
| long / desktop | entry.fontTransferBytes | 190633 | 826876 | 293033 | failed |
| long / desktop | settled.JSHeapUsedSize | 6967364 | 20341268 | 15355972 | failed |

Performance acceptance: failed. Twenty actual editor/provider lifecycle cycles require the separate real-Worker cohort. Previous hybrid budget failures are historical evidence, not overwritten or cleared by generating this report.

Scroll RAF intervals, frame-p95/jank counts, thread switching, Inbox loading, CPU/layout counters and heap/nodes are in each raw sample and summaries. V8 heap is not browser RSS.

Entry/deferred totals above include all requested local bodies, including local fonts. Budget metrics separately select application HTML/JS/CSS and actual font dependencies. Bytes come from actual requested resources classified by request-start phase, never a directory-wide chunk sum. See byteSummary and resources in metrics.json. gzip references are individually compressed file sizes, not measured transfer or a hypothetical concatenated bundle.

This is controlled frontend evidence, not production/Worker/provider acceptance. See config, fixture digests, environment, asset hashes and gaps in metrics.json.
