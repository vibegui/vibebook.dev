import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { join } from "node:path";
import { uiVersion } from "./build/uiVersion.ts";
import { clientBoundary, projectRoot } from "./build/clientBoundary.ts";
import { uiVariantBoundary } from "./build/uiVariantBoundary.ts";

// Preview assets cannot replace the vanilla app's on-demand Inbox bundle.
export default defineConfig(({ mode }) => ({
  root: import.meta.dirname,
  plugins: [
    clientBoundary({ projectRoot }),
    uiVariantBoundary(projectRoot, mode === "vanilla" ? "vanilla" : "svelte"),
    svelte({ compilerOptions: { css: "injected" } }),
    ...(mode === "vanilla" ? [] : [uiVersion(join(projectRoot, "public"))]),
  ],
  build: {
    outDir:
      mode === "vanilla" ? "../public/svelte" : "../public/svelte-preview",
    emptyOutDir: true,
    minify: true,
    lib: {
      entry:
        mode === "vanilla"
          ? "../vanilla/inbox/main.ts"
          : { ui: "main.ts", app: "legacy/host.js" },
      formats: ["es"],
      fileName: (_format, name) =>
        mode === "vanilla" ? "ui.js" : `${name}.js`,
    },
  },
}));
