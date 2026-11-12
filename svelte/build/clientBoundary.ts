import { builtinModules } from "node:module";
import { realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

/** Backend code is not a browser dependency. This runs on every module in Vite's graph, including dependencies. */
export function clientBoundary(options: { projectRoot: string }): Plugin {
  const root = realpathSync(resolve(options.projectRoot));
  const serverRoots = [resolve(root, "src"), resolve(root, "packages/server-only")];
  const builtins = new Set(builtinModules.flatMap((name) => [name, `node:${name}`]));
  const clean = (id: string) => id.replace(/[?#].*$/, "").replace(/^\/\@fs\//, "/");
  const within = (file: string, directory: string) => {
    const path = relative(directory, file);
    return path === "" || (path !== ".." && !path.startsWith(`..${sep}`) && !isAbsolute(path));
  };
  const reason = (source: string): string | undefined => {
    const id = clean(source);
    if (id === "server-only" || id.startsWith("server-only/")) return "a server-only marker";
    if (builtins.has(id) || /^(?:node|cloudflare|workerd):/.test(id)) return "a server runtime module";
    if (!isAbsolute(id)) return;
    // Check real paths too: an alias or symlink must not hide a backend module.
    let file = id;
    try { file = realpathSync(id); } catch { /* Vite will report missing modules itself. */ }
    if (serverRoots.some((directory) => within(file, directory) || within(id, directory))) return "backend code";
    if (/\.server\.[cm]?[jt]sx?$/.test(file) || /[/\\]server[/\\]/.test(file)) return "a server-only file";
  };
  function assertClient(this: { error: (message: string) => never }, id: string, importer?: string) {
    const why = reason(id);
    if (why) this.error(`[client-boundary] Browser code cannot import ${why}: ${id}${importer ? ` (from ${importer})` : ""}. Move browser-safe values and contracts to shared/; use import type for backend types.`);
  }
  return {
    name: "vibebook-client-boundary",
    enforce: "pre",
    async resolveId(source, importer, resolveOptions) {
      assertClient.call(this, source, importer);
      if (source.startsWith("\0")) return;
      const result = await this.resolve(source, importer, { ...resolveOptions, skipSelf: true });
      if (result) assertClient.call(this, result.id, importer);
      return result;
    },
    load(id) { assertClient.call(this, id); return null; },
    // Includes dependencies declared external by another plugin, which can bypass resolveId.
    generateBundle() {
      for (const id of this.getModuleIds()) {
        assertClient.call(this, id);
        const info = this.getModuleInfo(id);
        for (const imported of [...(info?.importedIds ?? []), ...(info?.dynamicallyImportedIds ?? [])]) assertClient.call(this, imported, id);
      }
    },
  };
}

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
