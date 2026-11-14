# Deferred-view performance checkpoint

[Run 43575726103](https://github.com/vibegui/vibebook.dev/actions/runs/43575726103)
failed at head `06b0a7e`, merge revision
`5d9160f5202381e36108cbeb7ac75869c9b49ac5`. Uploaded metrics and report are
retained unchanged, including every warmup and failure. The initial native
application gzip measure is 426,487 bytes, down from 452,340 in the previous
checkpoint, but still above the current vanilla 174,056 + 30 KiB limit.

Seven desktop samples per variant completed. Six original budgets still fail:
readiness, thread switching, first history expansion, application bytes, font
transfer and post-GC heap. Second/third history expansion pass. No relative
runtime speedup is inferred from different machines/runs.

Vanilla's mobile warmup now completes the actual Home path. Native's mobile
warmup stops at first history expansion: the chosen chat scroll surface has
clientHeight zero at entry and failure, and no older request is observed.
Neither variant has a measured mobile cohort. A visible common chat workload
must be established through real UI behavior before those medians are valid.
Do not waive the zero-height assertion or manufacture a scroll request.

Deferred views remain useful ownership work but these measurements do not
establish performance acceptance. Attribution of the actual initial chunks and
font-fidelity work precede further optimization; all original budgets remain.
