// Builds the MCP-App UI into one self-contained HTML (dist-mcp/index.html),
// which the Worker imports as text (wrangler.jsonc rules) and serves from ui://vibebook/*.
import { join } from "node:path";
import { projectRoot } from "../svelte/build/clientBoundary";
import { buildBrowser } from "./browser-build";

export async function buildMcp(
  options: {
    root?: string;
    entrypoint?: string;
    template?: string;
    outfile?: string;
  } = {},
) {
  const root = options.root ?? projectRoot;
  const out = await buildBrowser(
    { entrypoints: [options.entrypoint ?? join(root, "mcp-app/app.ts")] },
    root,
  );
  const js = (await out.outputs[0].text()).replace(/<\/script/gi, "<\\/script");
  const html = (
    await Bun.file(options.template ?? join(root, "mcp-app/index.html")).text()
  ).replace("<!-- APP -->", () => `<script type="module">${js}</script>`);
  await Bun.write(options.outfile ?? join(root, "dist-mcp/index.html"), html);
  return html;
}

if (import.meta.main) {
  const html = await buildMcp();
  console.log(`dist-mcp/index.html ${(html.length / 1024).toFixed(0)} KB`);
}
