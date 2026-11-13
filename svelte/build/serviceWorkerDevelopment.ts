import { join } from "node:path";
import { build, type Plugin } from "vite";
import { clientBoundary } from "./clientBoundary";
/** One on-demand classic worker bundle; no extra watcher/compiler process. */
export function serviceWorkerDevelopment(root: string): Plugin {
  let compiled: Promise<string> | null = null;
  return {
    name: "vibebook-push-worker-source",
    apply: "serve",
    configureServer(server) {
      const directory = join(root, "service-worker");
      server.watcher.add(directory);
      const changed = (file: string) => {
        if (!file.startsWith(directory + "/")) return;
        compiled = null;
        server.ws.send({ type: "custom", event: "vb:pwa-worker", data: {} });
      };
      server.watcher.on("change", changed);
      server.watcher.on("add", changed);
      server.watcher.on("unlink", changed);
      server.httpServer?.once("close", () => {
        for (const event of ["change", "add", "unlink"] as const)
          server.watcher.off(event, changed);
      });
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== "GET" || req.url !== "/sw.js") return next();
        try {
          compiled ??= (async () => {
            const result = await build({
              configFile: false,
              root,
              publicDir: false,
              logLevel: "error",
              plugins: [clientBoundary({ projectRoot: root })],
              build: {
                write: false,
                minify: true,
                lib: {
                  entry: join(directory, "notifications.ts"),
                  name: "VibebookPush",
                  formats: ["iife"],
                },
              },
            });
            const builds = Array.isArray(result) ? result : [result];
            for (const entry of builds)
              if ("output" in entry)
                for (const chunk of entry.output)
                  if (chunk.type === "chunk" && chunk.isEntry)
                    return chunk.code;
            throw new Error("Missing worker entry");
          })().catch((error) => {
            compiled = null;
            throw error;
          });
          res.setHeader("content-type", "text/javascript");
          res.setHeader("cache-control", "no-store");
          res.end(await compiled);
        } catch {
          res.statusCode = 503;
          res.setHeader("content-type", "text/plain");
          res.end("Push worker source unavailable");
        }
      });
    },
  };
}
