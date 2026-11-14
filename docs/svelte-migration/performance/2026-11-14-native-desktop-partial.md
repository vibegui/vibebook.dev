# Fully native desktop performance: partial failed run

[GitHub run 43563593700](https://github.com/vibegui/vibebook.dev/actions/runs/43563593700)
used harness and served source revision
`bc66f233f03d3a4c4e2875e1d111ea012a1768aa`. Both desktop warmups and seven
alternating measured runs per variant completed. The first mobile vanilla
warmup failed at `roomSwitch`: the prior thread pick closed the phone sidebar,
leaving its target room link hidden. This is an incomplete overall run, with
**failed desktop budgets and unverified mobile results**. All 17 samples have
empty page-error lists; that does not override the failed navigation assertion.

The unchanged raw [metrics.json](2026-11-14-partial/metrics.json) and
[generated report](2026-11-14-partial/generated-report.md) preserve individual
measurements, failures, all requested asset source/served hashes, resource
transfers, font observations and environment. The raw metrics file SHA-256 is
`514a72f88e3a93fda6d82186501102f625f4c536c0c818ea427a8455bba542db`.

The workload is deterministic synthetic data: 5,000 messages, 50 epics and 600
tasks, seed 421, three history pages and twenty navigation cycles. Desktop is
1440×1000 with 4× CPU throttling, Chromium 158.0.8127.18, Bun 1.4.4, on the
exclusive Ubuntu runner. Actual current frontend code uses controlled HTTP/Book
fixtures; these are not Worker/D1/R2/provider/Yjs lifecycle measurements. Real
editor disposal remains a separate Worker cohort.

| Desktop metric (median of 7)             | Vanilla |   Native | Approved limit | Result |
| ---------------------------------------- | ------: | -------: | -------------: | ------ |
| Ready, fonts + two frames (ms)           |  1180.6 |   2034.8 |        1416.72 | Failed |
| Thread switch (ms)                       |   396.6 |    624.7 |         475.92 | Failed |
| History page 1 (ms)                      |   415.9 |    598.3 |         499.08 | Failed |
| History page 2 (ms)                      |   614.2 |    618.2 |         737.04 | Passed |
| History page 3 (ms)                      |   898.2 |    707.7 |        1077.84 | Passed |
| Initial application gzip reference bytes |  172873 |   452333 |         203593 | Failed |
| Observed font dependency transfer bytes  |  190632 |   826876 |         293032 | Failed |
| Settled post-GC JS heap bytes            | 6959472 | 20779224 |       15348080 | Failed |

Fonts were requested over the public network and observed for this desktop
cohort. Vanilla and native families differ; this is not matched-font fidelity
evidence. Native still uses the original fonts: the earlier subset raster
failure remains rejected. Initial application accounting includes vanilla's
inline HTML code plus requested JS/CSS, while fonts are separate. Controlled
shell metadata models the Worker relation with a declared original-shell SHA256
ETag; it does not claim that value is Cloudflare's production ETag. Native's
actual bundle query version is `f69ffe27e96a10c8fe30`.

No threshold, sample count or readiness requirement was amended. Correcting
mobile sheet navigation permits a new run; it does not erase these completed
desktop regressions or establish overall M7 acceptance.
