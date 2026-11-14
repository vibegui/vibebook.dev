import { createHash } from "node:crypto";
import { readFile, realpath } from "node:fs/promises";
import { resolve, sep } from "node:path";
/** Public built-gallery fixture only. It is not a Worker/auth/application shell. */
export async function serveBuiltGallery(directory: string) {
  const root = await realpath(directory),
    entry = await readFile(resolve(root, "svelte-preview/app.js")),
    css = await readFile(resolve(root, "svelte-preview/ui.css"));
  const sha = (value: Uint8Array) =>
      createHash("sha256").update(value).digest("hex"),
    version = createHash("sha256").update(entry).update(css).digest("hex");
  const server = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/app")
        return new Response(
          `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="vb-v" content="${version}"><link rel="stylesheet" href="/svelte-preview/ui.css"></head><body><div id="app"></div><script type="module" src="/svelte-preview/app.js"></script></body></html>`,
          {
            headers: {
              "content-type": "text/html",
              "cache-control": "no-store",
            },
          },
        );
      try {
        const file = await realpath(
          resolve(root, "." + decodeURIComponent(url.pathname)),
        );
        if (!file.startsWith(root + sep))
          return new Response(null, { status: 403 });
        return new Response(Bun.file(file), {
          headers: { "cache-control": "no-store" },
        });
      } catch {
        return new Response(null, { status: 404 });
      }
    },
  });
  return {
    server,
    base: `http://127.0.0.1:${server.port}`,
    proof: {
      entrySha256: sha(entry),
      cssSha256: sha(css),
      fixtureVersion: version,
      fixture:
        "Minimal public HTML plus actual built Vite assets; no Worker/API/private room",
    },
  };
}
