import type { summarize } from "./ui-metrics-model";
export type MetricSummary = {
  profile: string;
  device: string;
  variant: "vanilla" | "svelte";
  passed: number;
  metrics: Record<string, ReturnType<typeof summarize>>;
};
export type Budget = {
  profile: string;
  device: string;
  metric: string;
  vanilla: number | null;
  native: number | null;
  limit: number | null;
  status: "passed" | "failed" | "unverified";
  definition: string;
};
/** The approved plan's thresholds. Missing/incomplete observations stay null;
 * a successful browser execution is not performance acceptance. */
export function assessBudgets(
  summaries: readonly MetricSummary[],
  historyPages: number,
  minimum = 7,
): Budget[] {
  const groups = new Map<string, { profile: string; device: string }>();
  for (const row of summaries) groups.set(`${row.profile}/${row.device}`, row);
  const specs = [
    ...[
      "entry.readyWithFontsAndTwoFramesMs",
      "threadSwitch.ms",
      ...Array.from({ length: historyPages }, (_, i) => `history${i + 1}.ms`),
    ].map((metric) => ({
      metric,
      limit: (baseline: number) => Math.max(baseline * 1.2, baseline + 50),
      definition: "Median native ≤ max(1.20 × vanilla, vanilla + 50ms)",
    })),
    {
      metric: "entry.applicationGzipReferenceBytes",
      limit: (baseline: number) => baseline + 30 * 1024,
      definition:
        "Requested initial local HTML (including inline app), JS and CSS gzip references ≤ vanilla +30KiB; font bodies separate",
    },
    {
      metric: "entry.fontTransferBytes",
      limit: (baseline: number) => baseline + 100 * 1024,
      definition:
        "Observed font dependency transfer ≤ vanilla +100KiB; blocked/missing/fallback-font observations unverified",
    },
    {
      metric: "settled.JSHeapUsedSize",
      limit: (baseline: number) => baseline + 8 * 1024 * 1024,
      definition: "Post-GC native JS heap on common fixture ≤ vanilla +8MiB",
    },
  ];
  return [...groups.values()].flatMap(({ profile, device }) => {
    const rows = summaries.filter(
      (row) => row.profile === profile && row.device === device,
    );
    return specs.map<Budget>((spec) => {
      const median = (variant: MetricSummary["variant"]) => {
        const row = rows.find((row) => row.variant === variant),
          value = row?.metrics[spec.metric];
        return row && row.passed >= minimum && value && value.n >= minimum
          ? (value.p50 ?? null)
          : null;
      };
      const vanilla = median("vanilla"),
        native = median("svelte"),
        limit = vanilla === null ? null : spec.limit(vanilla);
      return {
        profile,
        device,
        metric: spec.metric,
        vanilla,
        native,
        limit,
        status:
          native === null || limit === null
            ? "unverified"
            : native <= limit
              ? "passed"
              : "failed",
        definition: spec.definition,
      };
    });
  });
}
