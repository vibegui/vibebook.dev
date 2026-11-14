import * as z from "zod/mini";
const Hash = z.string().check(z.regex(/^[a-f0-9]{64}$/));
const Module = z.object({
  id: z.string(),
  packageName: z.nullable(z.string()),
  packageVersion: z.nullable(z.string()),
  renderedLength: z.number().check(z.minimum(0)),
});
const Asset = z.object({
  fileName: z.string(),
  sha256: Hash,
  rawBytes: z.number(),
  gzipBytes: z.number(),
  kind: z.enum(["js", "css"]),
  isEntry: z.boolean(),
  isDynamicEntry: z.boolean(),
  facade: z.nullable(z.string()),
  imports: z.array(z.string()),
  dynamicImports: z.array(z.string()),
  modules: z.array(Module),
});
export const ChunkDiagnostic = z.object({
  formatVersion: z.literal(1),
  variant: z.enum(["svelte", "vanilla"]),
  revision: z.string(),
  assetPrefix: z.string(),
  contributionSemantics: z.string(),
  assets: z.array(Asset),
  moduleGraph: z.array(
    z.object({
      id: z.string(),
      isEntry: z.boolean(),
      staticImports: z.array(z.string()),
      dynamicImports: z.array(z.string()),
    }),
  ),
});
export type ChunkDiagnostic = z.infer<typeof ChunkDiagnostic>;
export const MetricChunkInput = z.object({
  harnessRevision: z.string(),
  servedRevisionSuppliedByRunner: z.string(),
  assets: z.array(z.object({ key: z.string(), sourceSHA256: Hash })),
  samples: z.array(
    z.object({
      variant: z.enum(["svelte", "vanilla"]),
      device: z.string(),
      profile: z.string(),
      repetition: z.number(),
      warmup: z.boolean(),
      status: z.string(),
      resources: z.array(
        z.object({ phase: z.string(), assetKey: z.optional(z.string()) }),
      ),
    }),
  ),
});
export type MetricChunkInput = z.infer<typeof MetricChunkInput>;
export function staticChunkClosure(
  report: ChunkDiagnostic,
  roots: readonly string[],
) {
  const known = new Map(report.assets.map((asset) => [asset.fileName, asset]));
  const seen = new Set<string>();
  const queue = [...roots];
  for (let i = 0; i < queue.length; i++) {
    const name = queue[i];
    if (seen.has(name)) continue;
    const asset = known.get(name);
    if (!asset) continue;
    seen.add(name);
    queue.push(...asset.imports);
  }
  return [...seen].sort();
}
/** Actual source import witness, not a causal allocation of compressed bytes. */
export function importWitness(
  report: ChunkDiagnostic,
  target: string,
  allowed: Set<string>,
) {
  const graph = new Map(report.moduleGraph.map((node) => [node.id, node]));
  const queue = report.moduleGraph
    .filter((node) => node.isEntry && allowed.has(node.id))
    .map((node) => ({ id: node.id, path: [{ id: node.id, via: "entry" }] }));
  const seen = new Set<string>();
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    if (item.id === target) return item.path;
    const node = graph.get(item.id);
    if (!node) continue;
    for (const [via, ids] of [
      ["static", node.staticImports],
      ["dynamic", node.dynamicImports],
    ] satisfies [string, string[]][])
      for (const id of ids)
        if (allowed.has(id) && !seen.has(id))
          queue.push({ id, path: [...item.path, { id, via }] });
  }
  return null;
}
export function attributeChunks(
  report: ChunkDiagnostic,
  metrics?: MetricChunkInput,
) {
  const staticAssets = staticChunkClosure(
    report,
    report.assets.filter((a) => a.isEntry).map((a) => a.fileName),
  );
  let selected = report.assets.filter((a) => staticAssets.includes(a.fileName));
  const observations = [];
  if (metrics) {
    if (
      !/^[a-f0-9]{40}$/.test(report.revision) ||
      metrics.harnessRevision !== report.revision ||
      metrics.servedRevisionSuppliedByRunner !== report.revision
    )
      throw Error("Chunk/observed-request revision mismatch");
    const hashes = new Map<string, string>();
    for (const a of metrics.assets) {
      if (hashes.has(a.key) && hashes.get(a.key) !== a.sourceSHA256)
        throw Error("Ambiguous observed asset hash");
      hashes.set(a.key, a.sourceSHA256);
    }
    const requested = new Set<string>();
    const samples = metrics.samples.filter((s) => s.variant === report.variant);
    if (!samples.length) throw Error("No matching observed samples");
    for (const sample of samples) {
      const files = [
        ...new Set(
          sample.resources
            .filter(
              (r) =>
                r.phase === "entry" &&
                r.assetKey?.startsWith(report.assetPrefix),
            )
            .map((r) => r.assetKey!),
        ),
      ];
      for (const key of files) {
        const name = key.slice(report.assetPrefix.length);
        if (!/\.(?:js|css)$/.test(name)) continue;
        const asset = report.assets.find((a) => a.fileName === name);
        if (!asset || hashes.get(key) !== asset.sha256)
          throw Error("Observed entry asset absent or hash mismatched");
        requested.add(name);
      }
      observations.push({
        device: sample.device,
        profile: sample.profile,
        repetition: sample.repetition,
        warmup: sample.warmup,
        status: sample.status,
        entryAssets: files,
      });
    }
    if (!requested.size && report.variant === "svelte")
      throw Error("No matching observed entry requests");
    selected = report.assets.filter((a) => requested.has(a.fileName));
  }
  const allowed = new Set(selected.flatMap((a) => a.modules.map((m) => m.id)));
  const modules = new Map<
    string,
    {
      id: string;
      packageName: string | null;
      packageVersion: string | null;
      renderedLength: number;
      chunks: string[];
    }
  >();
  for (const a of selected)
    for (const m of a.modules) {
      const old = modules.get(m.id);
      if (old) {
        old.renderedLength += m.renderedLength;
        old.chunks.push(a.fileName);
      } else modules.set(m.id, { ...m, chunks: [a.fileName] });
    }
  const ranked = [...modules.values()].sort(
    (a, b) => b.renderedLength - a.renderedLength,
  );
  const packages = new Map<
    string,
    { package: string; renderedLength: number; moduleCount: number }
  >();
  for (const m of ranked) {
    const name = m.packageName
      ? `${m.packageName}@${m.packageVersion ?? "unknown"}`
      : "first-party-or-virtual";
    const p = packages.get(name) ?? {
      package: name,
      renderedLength: 0,
      moduleCount: 0,
    };
    p.renderedLength += m.renderedLength;
    p.moduleCount++;
    packages.set(name, p);
  }
  return {
    revision: report.revision,
    variant: report.variant,
    selection: metrics
      ? "observed-entry-requests-hash-and-revision-matched"
      : "static-entry-import-closure-only",
    observations,
    staticBootstrapAssets: staticAssets,
    loadedBeyondBootstrapStatic: selected
      .filter((a) => !staticAssets.includes(a.fileName))
      .map((a) => a.fileName),
    selectedAssets: selected.map(({ modules, ...asset }) => asset),
    packages: [...packages.values()].sort(
      (a, b) => b.renderedLength - a.renderedLength,
    ),
    largestModules: ranked.slice(0, 100).map((m) => ({
      ...m,
      sourceImportWitness: importWitness(report, m.id, allowed),
    })),
    gaps: [
      "renderedLength is bundler contribution metadata, not module gzip/network-byte attribution",
      "Import witnesses describe source edges among selected modules, not which symbol caused retention",
      "Static-only mode does not establish which dynamic chunks execute at startup",
      "CSS is measured as an emitted asset; individual CSS rule/source attribution is not supplied",
      "Vanilla inline HTML/JS/CSS is outside this Vite graph; zero observed Vite entry files is not zero application code",
      "No performance budget, authority, schema or runtime behavior is changed",
    ],
  };
}
