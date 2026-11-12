import { join } from "node:path";
import { projectRoot } from "../svelte/build/clientBoundary";
import { buildBrowser } from "./browser-build";

export async function buildCollab(
  options: { root?: string; entrypoint?: string; outfile?: string } = {},
) {
  const root = options.root ?? projectRoot;
  const result = await buildBrowser(
    {
      entrypoints: [options.entrypoint ?? join(root, "collab/editor.ts")],
    },
    root,
  );
  await Bun.write(
    options.outfile ?? join(root, "public/collab.js"),
    result.outputs[0],
  );
  return result;
}

if (import.meta.main) await buildCollab();
