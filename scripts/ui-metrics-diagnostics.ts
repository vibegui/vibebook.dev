// Opt-in controlled-fixture diagnostics only. Raw heap contents never enter artifacts.
import assert from "node:assert/strict";
import { writeFileSync, closeSync, openSync } from "node:fs";
import { mkdir, mkdtemp, readFile, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative, isAbsolute, sep } from "node:path";
import { record } from "../shared/validation";

const safeInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
const kinds = new Set([
  "hidden",
  "array",
  "string",
  "object",
  "code",
  "closure",
  "regexp",
  "number",
  "native",
  "synthetic",
  "concatenated string",
  "sliced string",
  "symbol",
  "bigint",
  "object shape",
]);
const lengths = [0, 8, 32, 128, 512, 2048, 8192, 32768, Infinity];
export class MetricsDiagnosticFailure extends Error {
  constructor(
    readonly code:
      | "heap-limit"
      | "heap-write"
      | "heap-invalid"
      | "cpu-invalid"
      | "private-location"
      | "diagnostic-failed",
  ) {
    super(code);
  }
}
export function diagnosticFailure(error: unknown) {
  return error instanceof MetricsDiagnosticFailure
    ? error.code
    : "diagnostic-failed";
}
export function summarizeHeapSnapshot(value: unknown) {
  if (
    !record(value) ||
    !record(value.snapshot) ||
    !record(value.snapshot.meta) ||
    !Array.isArray(value.nodes) ||
    !Array.isArray(value.strings)
  )
    throw new MetricsDiagnosticFailure("heap-invalid");
  const fields: unknown = value.snapshot.meta.node_fields,
    types: unknown = value.snapshot.meta.node_types;
  if (
    !Array.isArray(fields) ||
    !fields.length ||
    !fields.every((field) => typeof field === "string") ||
    new Set(fields).size !== fields.length ||
    !Array.isArray(types)
  )
    throw new MetricsDiagnosticFailure("heap-invalid");
  const width = fields.length,
    typeIndex = fields.indexOf("type"),
    sizeIndex = fields.indexOf("self_size");
  const labels: unknown = types[typeIndex];
  if (
    typeIndex < 0 ||
    sizeIndex < 0 ||
    !Array.isArray(labels) ||
    !labels.every((label) => typeof label === "string") ||
    value.nodes.length % width ||
    !safeInteger(value.snapshot.node_count) ||
    value.snapshot.node_count !== value.nodes.length / width
  )
    throw new MetricsDiagnosticFailure("heap-invalid");
  const byType = new Map<
    string,
    { type: string; count: number; selfSizeBytes: number }
  >();
  let selfSizeBytes = 0;
  for (let offset = 0; offset < value.nodes.length; offset += width) {
    const type: unknown = value.nodes[offset + typeIndex],
      size: unknown = value.nodes[offset + sizeIndex];
    if (
      !safeInteger(type) ||
      !safeInteger(size) ||
      type >= labels.length ||
      !Number.isSafeInteger(selfSizeBytes + size)
    )
      throw new MetricsDiagnosticFailure("heap-invalid");
    const raw: unknown = labels[type],
      name = typeof raw === "string" && kinds.has(raw) ? raw : "other";
    const row = byType.get(name) ?? { type: name, count: 0, selfSizeBytes: 0 };
    row.count++;
    row.selfSizeBytes += size;
    selfSizeBytes += size;
    byType.set(name, row);
  }
  const buckets = lengths.map((maximum, index) => ({
    minimum: index === 0 ? 0 : lengths[index - 1] + 1,
    maximum: Number.isFinite(maximum) ? maximum : null,
    count: 0,
  }));
  let totalUTF16CodeUnits = 0;
  for (const text of value.strings) {
    if (
      typeof text !== "string" ||
      !Number.isSafeInteger(totalUTF16CodeUnits + text.length)
    )
      throw new MetricsDiagnosticFailure("heap-invalid");
    totalUTF16CodeUnits += text.length;
    const index = lengths.findIndex((maximum) => text.length <= maximum);
    buckets[index].count++;
  }
  return {
    nodeCount: value.snapshot.node_count,
    selfSizeBytes,
    byType: [...byType.values()].sort(
      (a, b) => b.selfSizeBytes - a.selfSizeBytes,
    ),
    strings: { count: value.strings.length, totalUTF16CodeUnits, buckets },
  };
}
export type DiagnosticAsset = {
  url: string;
  assetKey: string;
  sourceSHA256: string;
  servedSHA256: string;
};
export type DiagnosticScript = { scriptId: string; url: string; hash: string };
export function diagnosticScript(value: unknown): DiagnosticScript | null {
  if (
    !record(value) ||
    typeof value.scriptId !== "string" ||
    typeof value.url !== "string" ||
    typeof value.hash !== "string" ||
    !/^[a-f0-9]{64}$/i.test(value.hash) ||
    value.hasSourceURL === true ||
    value.isLiveEdit === true ||
    value.stackTrace !== undefined
  )
    return null;
  return {
    scriptId: value.scriptId,
    url: value.url,
    hash: value.hash.toLowerCase(),
  };
}
export function summarizeCPUProfile(
  value: unknown,
  observed: readonly DiagnosticAsset[],
  scripts: ReadonlyMap<string, DiagnosticScript | null> = new Map(),
) {
  if (
    !record(value) ||
    !Array.isArray(value.nodes) ||
    !Array.isArray(value.samples) ||
    !Array.isArray(value.timeDeltas) ||
    value.samples.length !== value.timeDeltas.length
  )
    throw new MetricsDiagnosticFailure("cpu-invalid");
  const assets = new Map(
    observed
      .filter(
        (asset) =>
          /^[a-f0-9]{64}$/.test(asset.sourceSHA256) &&
          /^[a-f0-9]{64}$/.test(asset.servedSHA256),
      )
      .map((asset) => [asset.url, asset]),
  );
  const times = new Map<
      number,
      { samples: number; selfTimeMicroseconds: number }
    >(),
    known = new Set<number>();
  let total = 0;
  for (const node of value.nodes) {
    if (!record(node) || !safeInteger(node.id) || known.has(node.id))
      throw new MetricsDiagnosticFailure("cpu-invalid");
    known.add(node.id);
  }
  for (let i = 0; i < value.samples.length; i++) {
    const id: unknown = value.samples[i],
      delta: unknown = value.timeDeltas[i];
    if (!safeInteger(id) || !known.has(id) || !safeInteger(delta))
      throw new MetricsDiagnosticFailure("cpu-invalid");
    if (!Number.isSafeInteger(total + delta))
      throw new MetricsDiagnosticFailure("cpu-invalid");
    total += delta;
    const row = times.get(id) ?? { samples: 0, selfTimeMicroseconds: 0 };
    row.samples++;
    row.selfTimeMicroseconds += delta;
    times.set(id, row);
  }
  const frames = value.nodes.map((node) => {
    if (!record(node) || !safeInteger(node.id) || !record(node.callFrame))
      throw new MetricsDiagnosticFailure("cpu-invalid");
    const frame = node.callFrame,
      script =
        typeof frame.scriptId === "string" ? scripts.get(frame.scriptId) : null,
      candidate =
        typeof frame.url === "string" ? assets.get(frame.url) : undefined,
      asset =
        script &&
        script.url === frame.url &&
        script.hash === candidate?.servedSHA256
          ? candidate
          : undefined;
    const position = (n: unknown) =>
      typeof n === "number" && Number.isSafeInteger(n) && n >= -1 ? n : null;
    const functionName =
      asset &&
      typeof frame.functionName === "string" &&
      frame.functionName.length <= 200
        ? frame.functionName
        : typeof frame.functionName === "string" &&
            ["(root)", "(program)", "(idle)", "(garbage collector)"].includes(
              frame.functionName,
            )
          ? frame.functionName
          : "[unattributed]";
    return {
      id: node.id,
      functionName,
      asset: asset
        ? {
            key: asset.assetKey,
            sourceSHA256: asset.sourceSHA256,
            servedSHA256: asset.servedSHA256,
          }
        : null,
      line: asset ? position(frame.lineNumber) : null,
      column: asset ? position(frame.columnNumber) : null,
      ...(times.get(node.id) ?? { samples: 0, selfTimeMicroseconds: 0 }),
    };
  });
  return {
    sampleCount: value.samples.length,
    assetMatchedSamples: frames.reduce(
      (sum, frame) => sum + (frame.asset ? frame.samples : 0),
      0,
    ),
    unattributedSamples: frames.reduce(
      (sum, frame) => sum + (frame.asset ? 0 : frame.samples),
      0,
    ),
    sampledMicroseconds: [...times.values()].reduce(
      (sum, row) => sum + row.selfTimeMicroseconds,
      0,
    ),
    frames: frames.sort(
      (a, b) => b.selfTimeMicroseconds - a.selfTimeMicroseconds,
    ),
    scope:
      "Sampled CPU self time; not wall time, gzip allocation or hardware acceptance",
  };
}
const inside = (parent: string, child: string) => {
  const path = relative(parent, child);
  return (
    path === "" ||
    (!isAbsolute(path) && path !== ".." && !path.startsWith(`..${sep}`))
  );
};
/** UTF16LE preserves lone surrogate halves when CDP splits a JSON string across chunks. */
export const heapChunkBytes = (chunk: string) => Buffer.from(chunk, "utf16le");
export type HeapDiagnosticPort = {
  send(method: string, params?: Record<string, unknown>): Promise<unknown>;
  on(event: string, listener: (event: unknown) => void): void;
  off(event: string, listener: (event: unknown) => void): void;
};
export async function capturePrivateHeap(
  cdp: HeapDiagnosticPort,
  artifactDirectory: string,
  capBytes = 128 * 1024 * 1024,
  temporaryRoot = tmpdir(),
) {
  assert(safeInteger(capBytes) && capBytes > 0);
  await mkdir(artifactDirectory, { recursive: true });
  const directory = await mkdtemp(
    join(temporaryRoot, "vibebook-private-heap-"),
  );
  let fd: number | undefined,
    bytes = 0,
    failure: "heap-limit" | "heap-write" | null = null;
  const chunk = (event: unknown) => {
    if (failure) return;
    if (!record(event) || typeof event.chunk !== "string") {
      failure = "heap-write";
      return;
    }
    if (event.chunk.length > Math.floor((capBytes - bytes) / 2)) {
      failure = "heap-limit";
      return;
    }
    const data = heapChunkBytes(event.chunk);
    try {
      if (fd === undefined) throw Error("closed");
      writeFileSync(fd, data);
      bytes += data.length;
    } catch {
      failure = "heap-write";
    }
  };
  try {
    const actual = await realpath(directory),
      artifacts = await realpath(artifactDirectory);
    if (inside(artifacts, actual))
      throw new MetricsDiagnosticFailure("private-location");
    const path = join(directory, "snapshot.utf16le");
    fd = openSync(path, "wx", 0o600);
    cdp.on("HeapProfiler.addHeapSnapshotChunk", chunk);
    await cdp.send("HeapProfiler.collectGarbage");
    await cdp.send("HeapProfiler.takeHeapSnapshot", {
      reportProgress: false,
      captureNumericValue: false,
    });
    cdp.off("HeapProfiler.addHeapSnapshotChunk", chunk);
    closeSync(fd);
    fd = undefined;
    if (failure) throw new MetricsDiagnosticFailure(failure);
    let parsed: unknown;
    try {
      parsed = JSON.parse((await readFile(path)).toString("utf16le"));
    } catch {
      throw new MetricsDiagnosticFailure("heap-invalid");
    }
    return {
      status: "summarized",
      rawUTF16LEBytes: bytes,
      rawBytesCap: capBytes,
      rawRetained: false,
      ...summarizeHeapSnapshot(parsed),
    };
  } finally {
    try {
      cdp.off("HeapProfiler.addHeapSnapshotChunk", chunk);
    } finally {
      try {
        if (fd !== undefined) closeSync(fd);
      } finally {
        await rm(directory, { recursive: true, force: true });
      }
    }
  }
}
