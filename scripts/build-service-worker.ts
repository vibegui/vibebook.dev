import { join } from "node:path";
import { bunClientBoundary } from "./browser-build";
import { projectRoot } from "../svelte/build/clientBoundary";
export async function buildServiceWorker(root = projectRoot) {
  const result = await Bun.build({
    entrypoints: [join(root, "service-worker/notifications.ts")],
    target: "browser",
    format: "iife",
    minify: true,
    throw: false,
    plugins: [bunClientBoundary(root)],
  });
  if (!result.success)
    throw new AggregateError(
      result.logs,
      "Service worker browser build failed",
    );
  await Bun.write(join(root, "public/sw.js"), result.outputs[0]!);
}
if (import.meta.main) await buildServiceWorker();
