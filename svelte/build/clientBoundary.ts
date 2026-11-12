import { builtinModules } from "node:module";
import { realpathSync } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin, ResolverFunction } from "vite";

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
  let publicDir = "";
  return {
    name: "vibebook-client-boundary",
    enforce: "pre",
    configResolved(config) {
      publicDir = config.publicDir;
      // Vite's CSS @import/url() resolvers read outside the module graph and
      // capture this alias array before configResolved. Protect existing aliases
      // and the fallback IN PLACE; replacing the array leaves those reads open.
      const protect = (original?: ResolverFunction): ResolverFunction => {
        const guarded = async function (
          this: ThisParameterType<ResolverFunction>,
          ...[source, importer, resolveOptions]: Parameters<ResolverFunction>
        ) {
          assertClient(source, importer);
          const result = original
            ? await original.call(this, source, importer, resolveOptions)
            : await this.resolve(source, importer, {
                ...resolveOptions,
                skipSelf: true,
              });
          if (result)
            assertClient(
              typeof result === "string" ? result : result.id,
              importer,
            );
          return result;
        };
        // Vite 8.3.8 accepts/awaits async alias resolvers, but its exported alias
        // type omits Rolldown's async wrapper. Real CSS/Tailwind builds cover
        // this SDK-only mismatch; an upstream type fix makes this directive fail.
        // @ts-expect-error Async resolver return is supported by Vite's runtime.
        return guarded;
      };
      for (const alias of config.resolve.alias)
        alias.customResolver = protect(
          typeof alias.customResolver === "function"
            ? alias.customResolver
            : alias.customResolver?.resolveId,
        );
      config.resolve.alias.push({
        find: /^/,
        replacement: "",
        customResolver: protect(),
      });
    },
    async buildStart() {
      // Public URLs short-circuit CSS resolution. A public symlink must not
      // expose a protected target through that path or through static copying.
      const visited = new Set<string>();
      const inspect = async (directory: string): Promise<void> => {
        assertClient(directory);
        const real = realpathSync(directory);
        if (visited.has(real)) return;
        visited.add(real);
        for (const entry of await readdir(directory, { withFileTypes: true })) {
          const path = resolve(directory, entry.name);
          assertClient(path);
          if (
            entry.isDirectory() ||
            (entry.isSymbolicLink() && (await stat(path)).isDirectory())
          )
            await inspect(path);
        }
      };
      if (publicDir) {
        try {
          await stat(publicDir);
        } catch (error) {
          if (
            error instanceof Error &&
            "code" in error &&
            error.code === "ENOENT"
          )
            return;
          throw error;
        }
        await inspect(publicDir);
      }
    },
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
