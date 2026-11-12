import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { clientBoundary, projectRoot } from "./build/clientBoundary.ts";

// The app's Svelte pieces, built into one ES module the vanilla app imports on demand (like public/collab.js):
// `bun run build:ui` → public/svelte/ui.js (committed). CSS is injected by each component, so there's no second file.
export default defineConfig({
  root: import.meta.dirname,
  plugins: [clientBoundary({ projectRoot }), svelte({ compilerOptions: { css: "injected" } })],
  build: {
    outDir: "../public/svelte",
    emptyOutDir: true,
    minify: true,
    lib: { entry: {ui:"main.ts",app:"legacy/host.js"}, formats: ["es"], fileName: (_format, name) => `${name}.js` },
  },
});
