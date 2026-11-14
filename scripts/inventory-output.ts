import { join, resolve } from "node:path";

/** Explicit snapshots are separate from the frozen migration records. */
export function inventoryOutput(args: readonly string[], root: string) {
  const directory = resolve(root, "docs/svelte-migration");
  const [flag, file, ...extra] = args;
  if (flag === undefined)
    return { file: join(directory, "inventory.json"), explicit: false };
  if (
    flag !== "--out" ||
    !file?.trim() ||
    file.startsWith("--") ||
    extra.length
  )
    throw new Error(
      "Usage: bun scripts/migration-inventory.ts [--out <file.json>]",
    );
  const output = resolve(root, file);
  if (
    output === join(directory, "baseline.json") ||
    output === join(directory, "inventory.json")
  )
    throw new Error(
      "--out must name a separate inventory snapshot, not a frozen record",
    );
  return { file: output, explicit: true };
}
