// Build/request evidence only; never imports application code or changes bundles.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import {
  ChunkDiagnostic,
  MetricChunkInput,
  attributeChunks,
} from "../svelte/build/chunkDiagnosticModel";
const [metadata, metrics, output] = process.argv.slice(2);
if (!metadata)
  throw Error(
    "Usage: bun scripts/ui-chunk-attribution.ts BUILD_METADATA_JSON [METRICS_JSON] [OUTPUT_JSON]",
  );
const raw: unknown = JSON.parse(await readFile(metadata, "utf8"));
const build = ChunkDiagnostic.parse(raw);
const observed: unknown = metrics
  ? JSON.parse(await readFile(metrics, "utf8"))
  : undefined;
const report = attributeChunks(
  build,
  observed === undefined ? undefined : MetricChunkInput.parse(observed),
);
const target = resolve(
  output ?? `.artifacts/chunk-diagnostics/${build.variant}-attribution.json`,
);
await mkdir(dirname(target), { recursive: true });
await writeFile(target, JSON.stringify(report, null, 2) + "\n");
console.log(
  JSON.stringify({
    selection: report.selection,
    assets: report.selectedAssets.length,
    packages: report.packages.length,
    output: target,
  }),
);
