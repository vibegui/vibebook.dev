import { createHash } from "node:crypto";
export const TERMINAL_VENDOR_FAMILY = "xterm terminal rendering internals";
export const TERMINAL_VENDOR_SCOPE = "[data-native-terminal-renderer] .xterm";
export const TERMINAL_RENDERER_SOURCE =
  "svelte/features/sandboxes/terminalRenderer.ts";
export const TERMINAL_PACKAGES = [
  { name: "@xterm/xterm", version: "5.5.0" },
  { name: "@xterm/addon-fit", version: "0.10.0" },
] as const;
export const TERMINAL_ARTIFACTS = [
  {
    path: "@xterm/xterm/css/xterm.css",
    bytes: 5559,
    sha256: "ba8e6985669488981ccf40c0cefe3aba80722cb6c92de7ad628b0bd717faf2b6",
    source: "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css",
  },
  {
    path: "@xterm/xterm/lib/xterm.js",
    bytes: 289441,
    sha256: "1f991ac3b4b283ebf96e60ae23a00a52765dd3a2e46fa6fdda9f1aab032f7495",
    source: "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/lib/xterm.js",
  },
  {
    path: "@xterm/addon-fit/lib/addon-fit.js",
    bytes: 1497,
    sha256: "bdaefa370b1bfc42ee88d46fe6072400902a4d4b2d45cd93438dda9b23c97089",
    source:
      "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.js",
  },
] as const;
function record(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(value)) result[key] = Reflect.get(value, key);
  return result;
}
export function terminalVendorProblems(value: unknown): string[] {
  const entry = record(value),
    issues: string[] = [];
  if (
    !entry ||
    entry.family !== TERMINAL_VENDOR_FAMILY ||
    entry.scope !== TERMINAL_VENDOR_SCOPE
  )
    return ["Terminal family/scope differs from the approved amendment"];
  if (
    !Array.isArray(entry.packages) ||
    entry.packages.length !== TERMINAL_PACKAGES.length
  )
    issues.push("Terminal package set changed");
  else
    for (const [index, expected] of TERMINAL_PACKAGES.entries()) {
      const actual = record(entry.packages[index]);
      if (
        !actual ||
        actual.name !== expected.name ||
        actual.version !== expected.version
      )
        issues.push("Terminal package/version changed");
    }
  if (
    !Array.isArray(entry.sources) ||
    JSON.stringify(entry.sources) !==
      JSON.stringify(TERMINAL_ARTIFACTS.map((artifact) => artifact.path))
  )
    issues.push("Terminal source set changed");
  if (
    !Array.isArray(entry.artifacts) ||
    entry.artifacts.length !== TERMINAL_ARTIFACTS.length
  )
    issues.push("Terminal artifact digests missing");
  else
    for (const [index, expected] of TERMINAL_ARTIFACTS.entries()) {
      const actual = record(entry.artifacts[index]);
      if (
        !actual ||
        actual.path !== expected.path ||
        actual.bytes !== expected.bytes ||
        actual.sha256 !== expected.sha256 ||
        actual.source !== expected.source
      )
        issues.push("Terminal artifact digest/source changed");
    }
  return issues;
}
export function terminalArtifactMatches(path: string, bytes: Uint8Array) {
  const artifact = TERMINAL_ARTIFACTS.find((entry) => entry.path === path);
  return (
    !!artifact &&
    bytes.byteLength === artifact.bytes &&
    createHash("sha256").update(bytes).digest("hex") === artifact.sha256
  );
}
