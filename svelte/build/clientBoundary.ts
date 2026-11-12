import { builtinModules } from "node:module";
import { realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

/** Shared by browser builders; keep backend and private configuration out of emitted assets. */
export function createClientBoundaryPolicy(options: { projectRoot: string }) {
  const root = realpathSync(resolve(options.projectRoot));
  const serverRoots = [
    resolve(root, "src"),
    resolve(root, "packages/server-only"),
  ];
  const builtins = new Set(
    builtinModules.flatMap((name) => [name, `node:${name}`]),
  );
  const clean = (id: string) =>
    id.replace(/[?#].*$/, "").replace(/^\/\@fs\//, "/");
  const privatePath = (id: string) =>
    id
      .split(/[/\\]/)
      .some((part) =>
        /^(?:\.env(?:\..*)?|\.dev\.vars(?:\..*)?|\.git|\.ssh|\.vibebook)$/i.test(
          part,
        ),
      );
  const serverFile = (id: string) => /\.server\.[cm]?[jt]sx?$/.test(id);
  const within = (file: string, directory: string) => {
    const path = relative(directory, file);
    return (
      path === "" ||
      (path !== ".." && !path.startsWith(`..${sep}`) && !isAbsolute(path))
    );
  };
  // The server/ directory convention belongs to this project. Dependencies can
  // legitimately publish browser-safe helpers under their own server/ directory.
  const serverDirectory = (id: string) => {
    if (!within(id, root)) return false;
    const path = relative(root, id);
    return (
      !/(?:^|[/\\])node_modules[/\\]/.test(path) &&
      /(?:^|[/\\])server[/\\]/.test(path)
    );
  };
  const reason = (source: string): string | undefined => {
    const id = clean(source);
    if (id === "server-only" || id.startsWith("server-only/"))
      return "a server-only marker";
    if (builtins.has(id) || /^(?:node|cloudflare|workerd):/.test(id))
      return "a server runtime module";
    // Check unresolved IDs too, including modules another plugin declares external.
    if (privatePath(id)) return "private configuration or credential metadata";
    if (serverFile(id)) return "a server-only file";
    if (!isAbsolute(id)) return;
    // Check real paths too: an alias or symlink must not hide a backend module.
    let file = id;
    try {
      file = realpathSync(id);
    } catch {
      /* Vite will report missing modules itself. */
    }
    if (privatePath(file))
      return "private configuration or credential metadata";
    if (
      serverRoots.some(
        (directory) => within(file, directory) || within(id, directory),
      )
    )
      return "backend code";
    if (serverFile(file) || serverDirectory(file) || serverDirectory(id))
      return "a server-only file";
  };
  function assertClient(id: string, importer?: string) {
    const why = reason(id);
    if (why)
      throw new Error(
        `[client-boundary] Browser code cannot import ${why}: ${id}${importer ? ` (from ${importer})` : ""}. Move browser-safe values and contracts to shared/; use import type for backend types.`,
      );
  }
  return { reason, assertClient };
}

/** Backend code is not a browser dependency. Check every module in Vite's graph, including dependencies. */
export function clientBoundary(options: { projectRoot: string }): Plugin {
  const { assertClient } = createClientBoundaryPolicy(options);
  return {
    name: "vibebook-client-boundary",
    enforce: "pre",
    async resolveId(source, importer, resolveOptions) {
      assertClient(source, importer);
      if (source.startsWith("\0")) return;
      const result = await this.resolve(source, importer, {
        ...resolveOptions,
        skipSelf: true,
      });
      if (result) assertClient(result.id, importer);
      return result;
    },
    load(id) {
      assertClient(id);
      return null;
    },
    // Includes dependencies declared external by another plugin, which can bypass resolveId.
    generateBundle() {
      for (const id of this.getModuleIds()) {
        assertClient(id);
        const info = this.getModuleInfo(id);
        for (const imported of [
          ...(info?.importedIds ?? []),
          ...(info?.dynamicallyImportedIds ?? []),
        ])
          assertClient(imported, id);
      }
    },
  };
}

export const projectRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../..",
);
