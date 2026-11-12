import { realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import type { Plugin } from "vite";
import type { UiVariant } from "../../shared/uiVariant";

/** The two app implementations can share contracts, never each other's UI sources. */
export function uiVariantBoundary(root: string, variant: UiVariant): Plugin {
  const forbiddenDirectory = resolve(
    root,
    variant === "vanilla" ? "svelte" : "vanilla",
  );
  const forbiddenAssets =
    variant === "vanilla"
      ? [
          "app-svelte.html",
          "app-svelte.css",
          "svelte-preview",
          "collab-svelte.js",
        ]
      : ["app.html", "svelte", "collab.js"];
  const forbiddenPaths = [
    forbiddenDirectory,
    ...forbiddenAssets.map((path) => resolve(root, "public", path)),
  ];
  const clean = (id: string) =>
    id.replace(/[?#].*$/, "").replace(/^\/@fs\//, "/");
  const within = (file: string, directory: string) => {
    const path = relative(directory, file);
    return (
      path === "" ||
      (!isAbsolute(path) && path !== ".." && !path.startsWith(`..${sep}`))
    );
  };
  const assert = (source: string) => {
    const id = clean(source);
    const publicAsset = forbiddenAssets.some(
      (path) => id === `/${path}` || id.startsWith(`/${path}/`),
    );
    let actual = id;
    if (isAbsolute(id)) {
      try {
        actual = realpathSync(id);
      } catch {
        /* Missing modules remain the resolver's responsibility. */
      }
    }
    if (
      publicAsset ||
      (isAbsolute(id) &&
        forbiddenPaths.some((path) => within(id, path) || within(actual, path)))
    ) {
      throw new Error(
        `[ui-variant-boundary] ${variant} UI cannot import the other implementation: ${source}`,
      );
    }
  };
  return {
    name: "vibebook-ui-variant-boundary",
    enforce: "pre",
    resolveId(source, importer) {
      assert(source);
      if (source.startsWith(".") && importer && !importer.startsWith("\0"))
        assert(resolve(dirname(clean(importer)), source));
      // Do not recursively re-resolve: load receives the canonical alias/symlink result.
      return null;
    },
    load(id) {
      assert(id);
      return null;
    },
  };
}
