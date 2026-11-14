import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Plugin } from "vite";
import { UI_VERSION_HEX_LENGTH } from "../../shared/uiVersion.ts";

async function browserAssets(
  directory: string,
  prefix = "",
): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const name = prefix + entry.name;
      if (entry.isDirectory())
        return browserAssets(join(directory, entry.name), `${name}/`);
      return entry.isFile() && /\.(?:js|css)$/.test(entry.name) ? [name] : [];
    }),
  );
  return files.flat().sort();
}

/** The shell's ETag is the app's update signal, so it must change with its browser assets. */
export async function versionAppShell(
  publicDirectory: string,
): Promise<string> {
  const scripts = await browserAssets(join(publicDirectory, "svelte-preview"));
  if (!scripts.includes("app.js"))
    throw new Error(
      "Cannot version the app shell before svelte-preview/app.js is built",
    );
  const names = scripts.map((name) => `svelte-preview/${name}`);
  // The editor is loaded separately, but its changes must also wake installed PWAs.
  try {
    await readFile(join(publicDirectory, "collab-svelte.js"));
    names.push("collab-svelte.js");
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !("code" in error) ||
      error.code !== "ENOENT"
    )
      throw error;
  }
  names.sort();
  const contents = await Promise.all(
    names.map((name) => readFile(join(publicDirectory, name))),
  );
  const hash = createHash("sha256");
  contents.forEach((content, i) => {
    hash.update(`${names[i]}\0${content.length}\0`);
    hash.update(content);
  });
  const version = hash.digest("hex").slice(0, UI_VERSION_HEX_LENGTH);
  const shellPath = join(publicDirectory, "app-svelte.html");
  const shell = await readFile(shellPath, "utf8");
  // Do not hash the shell or inject another line: that would either make each
  // rebuild change its own input or couple the HTML layout to build metadata.
  let app = 0,
    utilities = 0;
  const next = shell
    .replace(
      /(\bhref=["'])\/svelte-preview\/ui\.css(?:\?[^"']*)?(["'])/g,
      (_match, start: string, end: string) => {
        utilities++;
        return `${start}/svelte-preview/ui.css?v=${version}${end}`;
      },
    )
    .replace(
      /(\bsrc=["'])\/svelte-preview\/app\.js(?:\?[^"']*)?(["'])/g,
      (_match, start: string, end: string) => {
        app++;
        return `${start}/svelte-preview/app.js?v=${version}${end}`;
      },
    );
  if (app !== 1)
    throw new Error(
      "App shell must reference svelte-preview/app.js exactly once",
    );
  if (scripts.includes("ui.css") && utilities !== 1)
    throw new Error(
      "App shell must reference emitted svelte-preview/ui.css exactly once",
    );
  if (next !== shell) await writeFile(shellPath, next);
  return version;
}

export function uiVersion(publicDirectory: string): Plugin {
  return {
    name: "vibebook-ui-version",
    apply: "build",
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (
          chunk.type === "chunk" &&
          [...chunk.imports, ...chunk.dynamicImports].includes("app.js")
        ) {
          throw new Error(
            `Browser chunk ${chunk.fileName} imports bootstrap app.js; a versioned HTML entry would execute twice`,
          );
        }
      }
    },
    async writeBundle() {
      await versionAppShell(publicDirectory);
    },
  };
}
