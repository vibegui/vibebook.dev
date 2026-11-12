import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Plugin } from "vite";

async function browserScripts(directory: string, prefix = ""): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async entry => {
    const name = prefix + entry.name;
    if (entry.isDirectory()) return browserScripts(join(directory, entry.name), `${name}/`);
    return entry.isFile() && entry.name.endsWith(".js") ? [name] : [];
  }));
  return files.flat().sort();
}

/** The shell's ETag is the app's update signal, so it must change with its browser assets. */
export async function versionAppShell(publicDirectory: string): Promise<string> {
  const scripts = await browserScripts(join(publicDirectory, "svelte"));
  if (!scripts.includes("app.js")) throw new Error("Cannot version the app shell before svelte/app.js is built");
  const names = [...scripts.map(name => `svelte/${name}`), "app.css"];
  // The editor is loaded separately, but its changes must also wake installed PWAs.
  try { await readFile(join(publicDirectory, "collab.js")); names.push("collab.js"); }
  catch (error) { if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") throw error; }
  names.sort();
  const contents = await Promise.all(names.map(name => readFile(join(publicDirectory, name))));
  const hash = createHash("sha256");
  contents.forEach((content, i) => { hash.update(`${names[i]}\0${content.length}\0`); hash.update(content); });
  const version = hash.digest("hex").slice(0, 20);
  const shellPath = join(publicDirectory, "app.html");
  const shell = await readFile(shellPath, "utf8");
  // Do not hash the shell or inject another line: that would either make each
  // rebuild change its own input or couple the HTML layout to build metadata.
  let css = 0, app = 0;
  const next = shell
    .replace(/(\bhref=["'])\/app\.css(?:\?[^"']*)?(["'])/g, (_match, start: string, end: string) => { css++; return `${start}/app.css?v=${version}${end}`; })
    .replace(/(\bsrc=["'])\/svelte\/app\.js(?:\?[^"']*)?(["'])/g, (_match, start: string, end: string) => { app++; return `${start}/svelte/app.js?v=${version}${end}`; });
  if (css !== 1 || app !== 1) throw new Error("App shell must reference app.css and svelte/app.js exactly once");
  if (next !== shell) await writeFile(shellPath, next);
  return version;
}

export function uiVersion(publicDirectory: string): Plugin {
  return {
    name: "vibebook-ui-version",
    apply: "build",
    async writeBundle() { await versionAppShell(publicDirectory); },
  };
}
