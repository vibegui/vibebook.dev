// Builds the MCP-App UI into one self-contained HTML (dist-mcp/index.html),
// which the Worker imports as text (wrangler.jsonc rules) and serves from ui://vibebook/*.
const out = await Bun.build({ entrypoints: ["mcp-app/app.ts"], target: "browser", format: "esm", minify: true });
if (!out.success) throw new AggregateError(out.logs, "mcp-app build failed");
const js = (await out.outputs[0].text()).replace(/<\/script/gi, "<\\/script");
const html = (await Bun.file("mcp-app/index.html").text()).replace("<!-- APP -->", () => `<script type="module">${js}</script>`);
await Bun.write("dist-mcp/index.html", html);
console.log(`dist-mcp/index.html ${(html.length / 1024).toFixed(0)} KB`);
