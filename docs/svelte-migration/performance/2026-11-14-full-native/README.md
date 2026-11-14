# First complete native desktop/mobile cohort

[Run 43585038355](https://github.com/vibegui/vibebook.dev/actions/runs/43585038355)
tested source head `b292537c75aa95a1cfff3a8acd46aecabefc5fdf` through merge
revision `b22c5089863df87092cdbd85cad9118d3fd9248f`. Original `metrics.json` and
`report.md` are retained without modification; their identities are recorded in
`runner.json`.

All 32 trials completed: one warmup and seven alternating measured trials per
variant/device, desktop 1440×1000 and mobile 390×844, at 4× CPU throttling. The
desktop entry endpoint includes the complete canonical document preview before
fonts and two frames; mobile keeps that document hidden. The application shell
layout fix permits the complete mobile workload without changing its fixture,
readiness, history, scroll or resource assertions.

**Performance acceptance failed.** Both devices exceed the original readiness,
thread-switch, first-history, initial application bytes, font-transfer and
post-GC heap budgets. History pages two and three pass. Initial application gzip
references are 412,302 B versus vanilla 174,055 B (limit 204,775 B); fonts are
826,876 B versus 190,633 B (limit 293,033 B). See the original report for all
medians and definitions. No threshold is amended.

The historical workflow's green result records successful execution, separately
from its explicit failed performance verdict. The runner now retains that
distinction in artifacts while returning a failing exit code for any failed or
unverified budget, so future CI cannot mask failed acceptance with a green job.

This is synthetic current-frontend evidence, with the declared public-font
network policy. It does not prove production, real providers, hardware, Safari,
editor retention or final migration acceptance.
