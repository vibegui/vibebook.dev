import { describe, expect, test } from "bun:test";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "vite";
import { uiVersion, versionAppShell } from "../svelte/build/uiVersion";

const shell =
  '<!doctype html>\n<link rel="stylesheet" href="/app-svelte.css">\n<script type="module" src="/svelte-preview/app.js"></script>\n';
async function fixture(run: (directory: string) => Promise<void>) {
  const directory = await mkdtemp(join(tmpdir(), "vibebook-ui-version-"));
  try {
    await mkdir(join(directory, "svelte-preview"));
    await Promise.all([
      writeFile(join(directory, "app.html"), "unchanged vanilla shell"),
      writeFile(join(directory, "app-svelte.html"), shell),
      writeFile(join(directory, "app-svelte.css"), "body{color:blue}"),
      writeFile(
        join(directory, "svelte-preview/app.js"),
        'import "./shared.js";',
      ),
      writeFile(
        join(directory, "svelte-preview/shared.js"),
        "export const version = 1;",
      ),
    ]);
    await run(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

describe("app shell content version", () => {
  test("unchanged builds are stable, preserve layout and use the same version for CSS/JS", () =>
    fixture(async (directory) => {
      const version = await versionAppShell(directory);
      const updated = await readFile(
        join(directory, "app-svelte.html"),
        "utf8",
      );
      expect(updated).toBe(
        shell
          .replace("/app-svelte.css", "/app-svelte.css?v=" + version)
          .replace(
            "/svelte-preview/app.js",
            "/svelte-preview/app.js?v=" + version,
          ),
      );
      expect(updated.split("\n").length).toBe(shell.split("\n").length);
      expect(await versionAppShell(directory)).toBe(version);
      expect(await readFile(join(directory, "app-svelte.html"), "utf8")).toBe(
        updated,
      );
      expect(await readFile(join(directory, "app.html"), "utf8")).toBe(
        "unchanged vanilla shell",
      );
    }));
  test("every emitted JS chunk and CSS affect the shell version", () =>
    fixture(async (directory) => {
      const initial = await versionAppShell(directory);
      await writeFile(
        join(directory, "svelte-preview/shared.js"),
        "export const version = 2;",
      );
      const js = await versionAppShell(directory);
      expect(js).not.toBe(initial);
      await writeFile(join(directory, "app-svelte.css"), "body{color:red}");
      const css = await versionAppShell(directory);
      expect(css).not.toBe(js);
      await mkdir(join(directory, "svelte-preview/chunks"));
      await writeFile(
        join(directory, "svelte-preview/chunks/lazy.js"),
        "export const lazy = true;",
      );
      expect(await versionAppShell(directory)).not.toBe(css);
    }));
  test("the separately loaded editor affects the version; shell changes cannot cause a circular hash", () =>
    fixture(async (directory) => {
      const initial = await versionAppShell(directory);
      await writeFile(
        join(directory, "collab-svelte.js"),
        "export const editor = 1;",
      );
      const editor = await versionAppShell(directory);
      expect(editor).not.toBe(initial);
      await writeFile(
        join(directory, "collab-svelte.js"),
        "export const editor = 2;",
      );
      const changed = await versionAppShell(directory);
      expect(changed).not.toBe(editor);
      const modified = (
        await readFile(join(directory, "app-svelte.html"), "utf8")
      ).replace("<!doctype html>", "<!doctype html><!-- copy change -->");
      await writeFile(join(directory, "app-svelte.html"), modified);
      expect(await versionAppShell(directory)).toBe(changed);
      expect(await readFile(join(directory, "app-svelte.html"), "utf8")).toBe(
        modified,
      );
    }));
  test("repairs stale query versions deterministically and ignores unrelated output files", () =>
    fixture(async (directory) => {
      const current = await versionAppShell(directory);
      await writeFile(
        join(directory, "svelte-preview/app.js.map"),
        "not browser runtime",
      );
      await writeFile(
        join(directory, "collab.js"),
        "independent vanilla editor release",
      );
      await writeFile(
        join(directory, "app.html"),
        "independent vanilla HTML release",
      );
      await writeFile(
        join(directory, "app-svelte.html"),
        shell
          .replace("/app-svelte.css", "/app-svelte.css?v=old")
          .replace("/svelte-preview/app.js", "/svelte-preview/app.js?v=old"),
      );
      expect(await versionAppShell(directory)).toBe(current);
      expect(
        await readFile(join(directory, "app-svelte.html"), "utf8"),
      ).not.toContain("?v=old");
    }));
  test("Vite writes the version after emission and unchanged rebuilds keep the shell identical", () =>
    fixture(async (directory) => {
      const client = join(directory, "client");
      await mkdir(client);
      await writeFile(join(client, "entry.ts"), "export const value = 1;");
      const compile = () =>
        build({
          configFile: false,
          root: client,
          logLevel: "silent",
          plugins: [uiVersion(directory)],
          build: {
            outDir: join(directory, "svelte-preview"),
            emptyOutDir: true,
            minify: false,
            lib: {
              entry: join(client, "entry.ts"),
              formats: ["es"],
              fileName: () => "app.js",
            },
          },
        });
      await compile();
      const first = await readFile(join(directory, "app-svelte.html"), "utf8");
      expect(first).toMatch(/app\.js\?v=[0-9a-f]{20}/);
      await compile();
      expect(await readFile(join(directory, "app-svelte.html"), "utf8")).toBe(
        first,
      );
      await writeFile(join(client, "entry.ts"), "export const value = 2;");
      await compile();
      expect(
        await readFile(join(directory, "app-svelte.html"), "utf8"),
      ).not.toBe(first);
    }));
  test("fails clearly instead of publishing an unversioned or incomplete shell", () =>
    fixture(async (directory) => {
      await writeFile(
        join(directory, "app-svelte.html"),
        "<div>missing asset references</div>",
      );
      await expect(versionAppShell(directory)).rejects.toThrow("exactly once");
      await rm(join(directory, "svelte-preview/app.js"));
      await expect(versionAppShell(directory)).rejects.toThrow(
        "before svelte-preview/app.js is built",
      );
    }));
});
