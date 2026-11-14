import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { gzipSync } from "node:zlib";
import type { Plugin } from "vite";
import { ChunkDiagnostic } from "./chunkDiagnosticModel";
import { projectFilesystemPath } from "./filesystemPaths";
const digest = (b: string | Uint8Array) =>
  createHash("sha256").update(b).digest("hex");
/** Never persist absolute paths, raw query contents, source code or environment values. */
export function diagnosticModuleLabel(root: string) {
  const roots = [resolve(root), realpathSync(root)].map((p) =>
    p.replaceAll("\\", "/"),
  );
  const cache = new Map<
    string,
    { id: string; packageName: string | null; packageVersion: string | null }
  >();
  return (raw: string) => {
    const cached = cache.get(raw);
    if (cached) return cached;
    const cut = raw.search(/[?#]/);
    const path = (cut < 0 ? raw : raw.slice(0, cut)).replaceAll("\\", "/");
    const suffix =
      cut < 0 ? "" : `?variant-${digest(raw.slice(cut)).slice(0, 16)}`;
    let id: string,
      packageName: string | null = null,
      packageVersion: string | null = null;
    if (path.startsWith("\0"))
      id = `virtual:${digest(path).slice(0, 20)}${suffix}`;
    else if (path.includes("/node_modules/")) {
      const at = path.lastIndexOf("/node_modules/") + 14;
      const parts = path.slice(at).split("/");
      const count = parts[0].startsWith("@") ? 2 : 1;
      packageName = parts.slice(0, count).join("/");
      const folder = path.slice(0, at) + parts.slice(0, count).join("/");
      let instance = folder;
      try {
        instance = realpathSync(folder);
      } catch {}
      try {
        const info: unknown = JSON.parse(
          readFileSync(resolve(folder, "package.json"), "utf8"),
        );
        if (
          info &&
          typeof info === "object" &&
          "version" in info &&
          typeof info.version === "string" &&
          /^[0-9][a-zA-Z0-9.+-]*$/.test(info.version)
        )
          packageVersion = info.version;
        if (
          info &&
          typeof info === "object" &&
          "name" in info &&
          typeof info.name === "string" &&
          /^(?:@[\w.-]+\/)?[\w.-]+$/.test(info.name)
        )
          packageName = info.name;
      } catch {}
      if (!/^(?:@[\w.-]+\/)?[\w.-]+$/.test(packageName)) packageName = null;
      id = packageName
        ? `npm:${packageName}@${packageVersion ?? "unknown"}/${parts.slice(count).join("/")}#instance-${digest(instance).slice(0, 12)}${suffix}`
        : `external:${digest(path).slice(0, 20)}${suffix}`;
    } else {
      const prefix = roots.find((p) => path.startsWith(p + "/"));
      // A third spelling can resolve aliases above the project differently
      // from both configured and real roots (for example /var vs /private/var).
      // Project the physical root while retaining the source-relative suffix,
      // including modules that do not exist yet. Unreadable externals stay opaque.
      let projected: string | undefined;
      if (!prefix) {
        try {
          projected = projectFilesystemPath(path, roots[1]);
        } catch {}
      }
      id = prefix
        ? `project:${path.slice(prefix.length + 1)}${suffix}`
        : projected
          ? `project:${relative(roots[1], projected).replaceAll("\\", "/")}${suffix}`
          : `external:${digest(path).slice(0, 20)}${suffix}`;
    }
    const label = { id, packageName, packageVersion };
    cache.set(raw, label);
    return label;
  };
}
export function chunkDiagnostics(options: {
  root: string;
  variant: "svelte" | "vanilla";
  enabled: boolean;
  revision?: string;
}): Plugin {
  const label = diagnosticModuleLabel(options.root);
  let report: ChunkDiagnostic | null = null;
  return {
    name: "vibebook-chunk-diagnostics",
    apply: "build",
    enforce: "post",
    generateBundle(_output, bundle) {
      if (!options.enabled) return;
      const outputNames = new Set(Object.keys(bundle));
      const edge = (id: string) =>
        outputNames.has(id) ? id : `external:${digest(id).slice(0, 20)}`;
      const moduleGraph = [...this.getModuleIds()]
        .map((id) => {
          const m = this.getModuleInfo(id);
          return {
            id: label(id).id,
            isEntry: m?.isEntry ?? false,
            staticImports: (m?.importedIds ?? [])
              .map((x) => label(x).id)
              .sort(),
            dynamicImports: (m?.dynamicallyImportedIds ?? [])
              .map((x) => label(x).id)
              .sort(),
          };
        })
        .sort((a, b) => a.id.localeCompare(b.id));
      report = {
        formatVersion: 1,
        variant: options.variant,
        revision:
          options.revision && /^[a-f0-9]{40}$/.test(options.revision)
            ? options.revision
            : "unrecorded",
        assetPrefix:
          options.variant === "vanilla" ? "/svelte/" : "/svelte-preview/",
        contributionSemantics:
          "Vite8/Rolldown RenderedModule.renderedLength: rendered code contribution, NOT gzip/network byte allocation",
        assets: Object.values(bundle)
          .filter((x) => /\.(js|css)$/.test(x.fileName))
          .map((x): ChunkDiagnostic["assets"][number] => ({
            fileName: x.fileName,
            sha256: "0".repeat(64),
            rawBytes: 0,
            gzipBytes: 0,
            kind: x.fileName.endsWith(".css") ? "css" : "js",
            isEntry: x.type === "chunk" && x.isEntry,
            isDynamicEntry: x.type === "chunk" && x.isDynamicEntry,
            facade:
              x.type === "chunk" && x.facadeModuleId
                ? label(x.facadeModuleId).id
                : null,
            imports: x.type === "chunk" ? x.imports.map(edge).sort() : [],
            dynamicImports:
              x.type === "chunk" ? x.dynamicImports.map(edge).sort() : [],
            modules:
              x.type === "chunk"
                ? Object.entries(x.modules)
                    .map(([id, m]) => ({
                      ...label(id),
                      renderedLength: m.renderedLength,
                    }))
                    .sort((a, b) => b.renderedLength - a.renderedLength)
                : [],
          })),
        moduleGraph,
      };
    },
    async writeBundle(output) {
      const snapshot = report;
      if (!options.enabled || !snapshot) return;
      if (!output.dir)
        throw Error("Chunk diagnostics require an output directory");
      const dir = resolve(output.dir);
      for (const asset of snapshot.assets) {
        const path = resolve(dir, asset.fileName);
        if (!path.startsWith(dir + sep))
          throw Error("Unexpected emitted asset path");
        const bytes = await readFile(path);
        asset.sha256 = digest(bytes);
        asset.rawBytes = bytes.byteLength;
        asset.gzipBytes = gzipSync(bytes).byteLength;
      }
      const checked = ChunkDiagnostic.parse(snapshot);
      const path = resolve(
        options.root,
        ".artifacts/chunk-diagnostics",
        options.variant + ".json",
      );
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, JSON.stringify(checked, null, 2) + "\n");
    },
  };
}
