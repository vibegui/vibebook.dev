import type { MeResult } from "../../../shared/schemas";
export type WaitReference = Pick<MeResult["waits"][number], "ref">;
/** The server decides who was asked. The number excludes task-review waits;
 * those remain discoverable as a dot/list entry, exactly like vanilla. */
export function waitIndicator(waits: readonly WaitReference[]) {
  const asks = waits.filter(wait => !wait.ref.startsWith("t"));
  return { asks: asks.length, tasks: waits.length > asks.length, claude: asks.some(wait => /^[ab]\d/.test(wait.ref)) };
}
