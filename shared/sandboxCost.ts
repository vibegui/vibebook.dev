import type { AgentsResult } from "./schemas";

/** Browser-safe estimate from the public, schema-derived presence snapshot. */
export function sandboxCost(
  sandbox: AgentsResult["sandboxes"][number],
  now: number,
) {
  if (sandbox.cost_unknown || sandbox.created_at === null) return null;
  const running =
    sandbox.state === "running"
      ? Math.max(0, now - (sandbox.checked_at ?? now)) / 1000
      : 0;
  const cost =
    (((sandbox.run_s ?? 0) + running) / 3600) * (sandbox.rate ?? 0) +
    (Math.max(0, now - (sandbox.created_at ?? now)) / 3600000) *
      (sandbox.disk_rate ?? 0);
  return Number.isFinite(cost) ? cost : null;
}
