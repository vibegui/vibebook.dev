# Second native desktop performance checkpoint

[Run 43567722419](https://github.com/vibegui/vibebook.dev/actions/runs/43567722419)
terminated unsuccessfully at head `eeedb13`, merge revision
`45c2b4303d6616cc6f9d8efc961fa80a3615c067`. These files are the unchanged
uploaded metrics and generated report, including invalid and warmup samples.

Both desktop variants completed seven valid measured samples after warmup.
Native medians again fail six original budgets: readiness, thread switching,
first history expansion, application gzip bytes, font transfer and post-GC heap.
Second/third history expansion pass. The later mobile vanilla warmup reached
Home navigation and failed to observe `.home`; neither variant has a valid
mobile measured cohort. This is failure evidence, not a budget amendment or
mobile acceptance.

Lazy-view and font work has not been measured in this checkpoint. The prior
partial receipt remains intact. A future run must preserve the original workload,
seven alternating measured trials per variant/device and budgets, and execute
actual visible navigation to complete the mobile cohort.
