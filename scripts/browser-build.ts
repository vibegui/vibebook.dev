import { resolve } from "node:path";
import type { BuildConfig, BunPlugin } from "bun";
import {
  createClientBoundaryPolicy,
  projectRoot,
} from "../svelte/build/clientBoundary";

/** Apply the same policy as Vite without replacing Bun's native module resolution. */
export function bunClientBoundary(root: string): BunPlugin {
  const { assertClient } = createClientBoundaryPolicy({ projectRoot: root });
  return {
    name: "vibebook-client-boundary",
    target: "browser",
    setup(build) {
      build.onResolve({ filter: /.*/ }, ({ path, importer, resolveDir }) => {
        assertClient(path, importer);
        // Also check relative imports before resolution, including external dependencies.
        if (path.startsWith("."))
          assertClient(resolve(resolveDir, path), importer);
      });
      // Native resolution expands extensions, aliases and symlinks before loading.
      build.onLoad({ filter: /.*/ }, ({ path }) => {
        assertClient(path);
      });
    },
  };
}

export async function buildBrowser(
  config: Pick<BuildConfig, "entrypoints" | "format">,
  root = projectRoot,
) {
  const result = await Bun.build({
    target: "browser",
    format: config.format ?? "esm",
    entrypoints: config.entrypoints,
    minify: true,
    throw: false,
    plugins: [bunClientBoundary(root)],
  });
  if (!result.success)
    throw new AggregateError(
      result.logs,
      `Browser build failed: ${result.logs.join("\n")}`,
    );
  return result;
}
