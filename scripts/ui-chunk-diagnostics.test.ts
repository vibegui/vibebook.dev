import { expect, test } from "bun:test";
import { mkdtemp, mkdir, writeFile, symlink, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { diagnosticModuleLabel } from "../svelte/build/chunkDiagnostics";
import {
  attributeChunks,
  ChunkDiagnostic,
  type MetricChunkInput,
} from "../svelte/build/chunkDiagnosticModel";
const revision = "a".repeat(40),
  hash = "b".repeat(64);
function fixture(): ChunkDiagnostic {
  const module = (
    id: string,
    packageName: string | null,
    renderedLength: number,
  ) => ({
    id,
    packageName,
    packageVersion: packageName ? "1.7.4" : null,
    renderedLength,
  });
  const asset = (
    fileName: string,
    isEntry: boolean,
    imports: string[],
    dynamicImports: string[],
    modules: ReturnType<typeof module>[],
  ) => ({
    fileName,
    isEntry,
    isDynamicEntry: !isEntry,
    imports,
    dynamicImports,
    modules,
    sha256: hash,
    rawBytes: 1000,
    gzipBytes: 100,
    kind: "js" as const,
    facade: modules[0]?.id ?? null,
  });
  return {
    formatVersion: 1,
    variant: "svelte",
    revision,
    assetPrefix: "/svelte-preview/",
    contributionSemantics: "renderedLength is not gzip bytes",
    assets: [
      asset(
        "app.js",
        true,
        [],
        ["mount.js"],
        [module("project:svelte/bootstrap.ts", null, 10)],
      ),
      asset(
        "mount.js",
        false,
        ["Button.js"],
        ["editor.js"],
        [module("project:svelte/NativeApplication.svelte", null, 100)],
      ),
      asset(
        "Button.js",
        false,
        [],
        [],
        [
          module(
            "npm:@modelcontextprotocol/sdk@1.7.4/schema.js",
            "@modelcontextprotocol/sdk",
            9000,
          ),
        ],
      ),
      asset(
        "editor.js",
        false,
        [],
        [],
        [module("npm:codemirror@1.7.4/editor.js", "codemirror", 5000)],
      ),
    ],
    moduleGraph: [
      {
        id: "project:svelte/bootstrap.ts",
        isEntry: true,
        staticImports: [],
        dynamicImports: ["project:svelte/NativeApplication.svelte"],
      },
      {
        id: "project:svelte/NativeApplication.svelte",
        isEntry: false,
        staticImports: ["npm:@modelcontextprotocol/sdk@1.7.4/schema.js"],
        dynamicImports: ["npm:codemirror@1.7.4/editor.js"],
      },
    ],
  };
}
function observed(build: ChunkDiagnostic): MetricChunkInput {
  return {
    harnessRevision: revision,
    servedRevisionSuppliedByRunner: revision,
    assets: build.assets.map((a) => ({
      key: build.assetPrefix + a.fileName,
      sourceSHA256: a.sha256,
    })),
    samples: [
      {
        variant: "svelte",
        device: "desktop",
        profile: "long",
        repetition: 1,
        warmup: false,
        status: "passed",
        resources: ["app.js", "mount.js", "Button.js"].map((file) => ({
          phase: "entry",
          assetKey: build.assetPrefix + file,
        })),
      },
    ],
  };
}
test("actual observed dynamic startup attributes modules/packages rather than misleading chunk filenames", () => {
  const build = ChunkDiagnostic.parse(fixture());
  const staticOnly = attributeChunks(build);
  expect(staticOnly.selectedAssets.map((a) => a.fileName)).toEqual(["app.js"]);
  const actual = attributeChunks(build, observed(build));
  expect(actual.packages[0]).toEqual({
    package: "@modelcontextprotocol/sdk@1.7.4",
    renderedLength: 9000,
    moduleCount: 1,
  });
  expect(actual.selectedAssets.some((a) => a.fileName === "editor.js")).toBe(
    false,
  );
  expect(actual.loadedBeyondBootstrapStatic).toEqual(["mount.js", "Button.js"]);
  expect(actual.largestModules[0].sourceImportWitness).toEqual([
    { id: "project:svelte/bootstrap.ts", via: "entry" },
    { id: "project:svelte/NativeApplication.svelte", via: "dynamic" },
    { id: "npm:@modelcontextprotocol/sdk@1.7.4/schema.js", via: "static" },
  ]);
  expect(actual.selectedAssets.reduce((n, a) => n + a.gzipBytes, 0)).toBe(300);
});
test("revision, hash, missing output and ambiguous asset identity fail closed instead of attributing stale graphs", () => {
  const build = fixture();
  const base = observed(build);
  expect(() =>
    attributeChunks(build, { ...base, harnessRevision: "c".repeat(40) }),
  ).toThrow("revision mismatch");
  expect(() =>
    attributeChunks(build, {
      ...base,
      assets: base.assets.map((a) => ({ ...a, sourceSHA256: "c".repeat(64) })),
    }),
  ).toThrow("hash mismatched");
  expect(() =>
    attributeChunks(build, {
      ...base,
      assets: [
        ...base.assets,
        { key: base.assets[0].key, sourceSHA256: "c".repeat(64) },
      ],
    }),
  ).toThrow("Ambiguous");
  expect(() =>
    attributeChunks(build, {
      ...base,
      samples: [
        {
          ...base.samples[0],
          resources: [
            { phase: "entry", assetKey: "/svelte-preview/unknown.js" },
          ],
        },
      ],
    }),
  ).toThrow("absent");
});
test("module identities retain package version/source scope but strip physical roots and raw query/private external paths", async () => {
  const dir = await mkdtemp(join(tmpdir(), "chunk-diagnostic-"));
  try {
    const physical = join(dir, "physical");
    await mkdir(join(physical, "node_modules", "@scope", "parser"), {
      recursive: true,
    });
    await writeFile(
      join(physical, "node_modules", "@scope", "parser", "package.json"),
      JSON.stringify({ version: "2.3.4" }),
    );
    const alias = join(dir, "alias");
    await symlink(physical, alias, "dir");
    const label = diagnosticModuleLabel(alias);
    expect(label(join(physical, "svelte", "Root.svelte")).id).toBe(
      "project:svelte/Root.svelte",
    );
    const dependency = label(
      join(physical, "node_modules", "@scope", "parser", "dist", "index.js"),
    );
    expect(dependency).toMatchObject({
      packageName: "@scope/parser",
      packageVersion: "2.3.4",
    });
    expect(dependency.id).toMatch(
      /^npm:@scope\/parser@2\.3\.4\/dist\/index\.js#instance-[a-f0-9]{12}$/,
    );
    const duplicate = join(
      physical,
      "node_modules",
      "consumer",
      "node_modules",
      "@scope",
      "parser",
    );
    await mkdir(duplicate, { recursive: true });
    await writeFile(
      join(duplicate, "package.json"),
      JSON.stringify({ version: "2.3.4" }),
    );
    expect(
      label(join(duplicate, "dist", "index.js")).id === dependency.id,
    ).toBe(false);
    const query = label(
      join(alias, "svelte", "Root.svelte") + "?secret=never-persist-this",
    );
    expect(query.id).not.toContain("never-persist");
    expect(query.id).not.toContain(dir);
    const outside = label("/private/account/.env?token=hidden");
    expect(JSON.stringify(outside)).not.toContain("account");
    expect(JSON.stringify(outside)).not.toContain("hidden");
    expect(label("\0virtual-secret:" + dir).id.startsWith("virtual:")).toBe(
      true,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("module project identity survives aliases above and at the root with missing descendants", async () => {
  const dir = await mkdtemp(join(tmpdir(), "chunk-ancestor-alias-"));
  try {
    const parent = join(dir, "physical-parent"),
      project = join(parent, "project"),
      ancestor = join(dir, "ancestor-alias");
    await mkdir(project, { recursive: true });
    await symlink(project, join(parent, "root-alias"), "dir");
    await symlink(parent, ancestor, "dir");
    const label = diagnosticModuleLabel(join(ancestor, "root-alias"));
    expect(
      label(join(ancestor, "project", "svelte", "Missing.svelte")).id,
    ).toBe("project:svelte/Missing.svelte");
    const external = label(join(ancestor, "unrelated", "secret.ts"));
    expect(external.id).toMatch(/^external:[a-f0-9]{20}$/);
    expect(external.id).not.toContain("secret");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("vanilla delayed Inbox bundle is not falsely attributed to initial inline Home code", () => {
  const build = {
    ...fixture(),
    variant: "vanilla" as const,
    assetPrefix: "/svelte/",
  };
  const m = observed(build);
  const result = attributeChunks(build, {
    ...m,
    samples: [
      {
        ...m.samples[0],
        variant: "vanilla",
        resources: [{ phase: "entry", assetKey: "@shell/vanilla" }],
      },
    ],
  });
  expect(result.selectedAssets).toEqual([]);
  expect(result.packages).toEqual([]);
});
