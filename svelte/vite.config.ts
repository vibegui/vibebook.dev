import tailwindcss from "@tailwindcss/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { join } from "node:path";
import { realpathSync } from "node:fs";
import {
  appDevelopment,
  workerProxy,
  workerRoutes,
} from "./build/appDevelopment.ts";
import { uiVersion } from "./build/uiVersion.ts";
import { clientBoundary, projectRoot } from "./build/clientBoundary.ts";
import { uiVariantBoundary } from "./build/uiVariantBoundary.ts";

// Preview assets cannot replace the vanilla app's on-demand Inbox bundle.
export default defineConfig(({ mode, command }) => ({
  root: import.meta.dirname,
  publicDir: join(projectRoot, "public"),
  resolve: { alias: { $lib: join(projectRoot, "svelte/lib") } },
  // Library mode preserves this dependency expression unless explicitly replaced.
  // Never ship a Node `process` global or a browser process polyfill.
  define:
    mode === "vanilla"
      ? {}
      : {
          "process.env.NODE_ENV": JSON.stringify(
            command === "serve" ? "development" : "production",
          ),
        },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    ...(mode === "app"
      ? {
          origin: "http://127.0.0.1:5173",
          proxy: {
            [workerRoutes]: workerProxy(
              "http://127.0.0.1:8787",
              "http://127.0.0.1:5173",
            ),
          },
        }
      : {}),
    fs: {
      allow: ["svelte", "shared", "collab", "public", "node_modules"].map(
        (path) => realpathSync(join(projectRoot, path)),
      ),
      deny: [
        "**/.env",
        "**/.env.*",
        "**/.dev.vars",
        "**/.dev.vars.*",
        "**/.vibebook/**",
        "**/.wrangler/**",
        "**/.api-types/**",
        "**/scripts/**",
        "**/svelte/build/**",
        "**/wrangler*.json*",
        "**/vite.config.*",
        "**/.git/**",
        "**/.ssh/**",
        "**/*.pem",
        "**/*.key",
      ],
    },
  },
  plugins: [
    ...(mode === "app"
      ? [appDevelopment(projectRoot, "http://127.0.0.1:8787")]
      : []),
    clientBoundary({ projectRoot }),
    uiVariantBoundary(projectRoot, mode === "vanilla" ? "vanilla" : "svelte"),
    ...(mode === "vanilla" ? [] : [tailwindcss()]),
    svelte({
      compilerOptions: { css: mode === "vanilla" ? "injected" : "external" },
    }),
    ...(mode === "vanilla" ? [] : [uiVersion(join(projectRoot, "public"))]),
  ],
  build: {
    outDir:
      mode === "vanilla" ? "../public/svelte" : "../public/svelte-preview",
    emptyOutDir: true,
    minify: true,
    cssCodeSplit: false,
    copyPublicDir: false,
    lib: {
      entry:
        mode === "vanilla"
          ? "../vanilla/inbox/main.ts"
          : { ui: "main.ts", app: "bootstrap.ts" },
      formats: ["es"],
      cssFileName: "ui",
      fileName: (_format, name) =>
        mode === "vanilla" ? "ui.js" : `${name}.js`,
    },
  },
}));
