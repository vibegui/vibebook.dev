import { existsSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { createClientBoundaryPolicy } from "./clientBoundary.ts";
import { canonicalFilesystemPath } from "./filesystemPaths";

/** Origin-form only. Never allow an incoming authority to choose a fetch target. */
export function localRequestUrl(request: string): URL {
  if (
    !request.startsWith("/") ||
    request.startsWith("//") ||
    request.includes("\\") ||
    /[\u0000-\u0020\u007f]/.test(request)
  )
    throw new Error("[client-boundary] Only local request targets are allowed");
  const local = new URL(request, "http://localhost");
  if (local.origin !== "http://localhost")
    throw new Error("[client-boundary] Request authority is forbidden");
  return local;
}

export function workerRequestUrl(request: string, worker: string): URL {
  const local = localRequestUrl(request);
  const target = new URL(worker);
  target.pathname = local.pathname;
  target.search = local.search;
  target.hash = "";
  return target;
}

/** A dev file server must expose browser inputs, never the whole repository. */
export function createDevelopmentRequestPolicy(root: string) {
  const boundary = createClientBoundaryPolicy({ projectRoot: root });
  const frontend = ["svelte", "shared", "collab", "public"].map((path) =>
    resolve(root, path),
  );
  const dependencies = resolve(root, "node_modules");
  const canonical = canonicalFilesystemPath;
  const projectRoots = [...new Set([resolve(root), canonical(root)])];
  const lexical = projectRoots.map((base) => ({
    roots: ["svelte", "shared", "collab", "public"].map((path) =>
      resolve(base, path),
    ),
    deps: resolve(base, "node_modules"),
  }));
  const actualFrontend = frontend.map(canonical);
  const actualDependencies = canonical(dependencies);
  const within = (file: string, directory: string) => {
    const name = relative(directory, file);
    return (
      name === "" ||
      (!isAbsolute(name) && name !== ".." && !name.startsWith("../"))
    );
  };
  const allowed = (file: string, roots: string[], deps: string) => {
    if (within(file, deps)) {
      const name = relative(deps, file).replaceAll("\\", "/");
      // Only Vite's browser optimizer cache is public; other hidden caches are not.
      return !name
        .split("/")
        .some(
          (part, index) =>
            part.startsWith(".") &&
            !(
              index === 0 &&
              part === ".vite" &&
              /^(?:\.vite\/deps(?:\/|$))/.test(name)
            ),
        );
    }
    const index = roots.findIndex((directory) => within(file, directory));
    if (index < 0) return false;
    const name = relative(roots[index]!, file).replaceAll("\\", "/");
    if (name.split("/").some((part) => part.startsWith("."))) return false;
    if (
      index !== 3 &&
      /(?:^|\/)(?:build|scripts|server)(?:\/|$)|(?:^|\/)(?:vite|svelte|tailwind|postcss)\.config\.|(?:^|\/)tsconfig[^/]*\.json$/.test(
        name,
      )
    )
      return false;
    return (
      index === 3 ||
      /\.(?:[cm]?[jt]sx?|svelte|css|json|html|svg|png|jpe?g|gif|webp|ico|woff2?|ttf|otf)$/.test(
        name,
      )
    );
  };
  const assertFile = (file: string) => {
    boundary.assertClient(file);
    const actual = canonical(file);
    boundary.assertClient(actual);
    if (
      (projectRoots.some((base) => within(resolve(file), base)) &&
        !lexical.some(({ roots, deps }) =>
          allowed(resolve(file), roots, deps),
        )) ||
      !allowed(actual, actualFrontend, actualDependencies)
    )
      throw new Error("[client-boundary] File is outside browser source roots");
  };
  return {
    assertRequest(request: string) {
      const local = localRequestUrl(request);
      let path = local.pathname;
      // Reject nested encodings rather than letting two middleware layers disagree.
      path = decodeURIComponent(path);
      if (/%[0-9a-f]{2}/i.test(path) || /[\\\0]/.test(path))
        throw new Error("[client-boundary] Ambiguous encoded source path");
      if (path === "/@vite/client" || path === "/@vite/env") return;
      if (path.startsWith("/@id/")) {
        const id = path.slice(5);
        // Vite's virtual modules have no filesystem target. Ordinary @id paths
        // still go through the explicit source policy, including raw requests.
        if (id.startsWith("__x00__") && !id.includes("..")) return;
        if (id.startsWith("/")) {
          assertFile(id);
          return;
        }
        throw new Error("[client-boundary] Unknown module request");
      }
      if (path.startsWith("/@fs/")) {
        assertFile(path.slice(4));
        return;
      }
      const source = resolve(
        root,
        "svelte",
        `.${path === "/" ? "/index.html" : path}`,
      );
      const asset = resolve(root, "public", `.${path}`);
      // Public middleware has precedence, so check its real target when present.
      if (existsSync(asset)) assertFile(asset);
      else assertFile(source);
    },
  };
}
