import { relative, resolve } from "node:path";
import type { Plugin, ProxyOptions } from "vite";
import {
  createDevelopmentRequestPolicy,
  localRequestUrl,
  workerRequestUrl,
} from "./developmentRequests.ts";

export const workerRoutes =
  "^/(?:api(?:/|$)|ws(?:/|-)|yjs/|auth(?:/|$)|oauth/|authorize(?:[/?]|$)|token(?:[/?]|$)|register(?:[/?]|$)|logout(?:[/?]|$)|login(?:[/?]|$)|app(?:[/?]|$)|archived(?:[/?]|$)|b/|mail/|\\.well-known/)";

export function isSourceApp(url: string): boolean {
  let parsed: URL;
  try {
    parsed = localRequestUrl(url);
  } catch {
    return false;
  }
  return (
    parsed.searchParams.get("ui") === "svelte" &&
    (/^\/(?:app|archived|login|authorize)$/.test(parsed.pathname) ||
      /^\/b\/[^/]+$/.test(parsed.pathname))
  );
}

export function sourceShell(html: string): string {
  if (!/src=["']\/svelte-preview\/app\.js(?:\?[^"']*)?["']/.test(html))
    throw new Error("Worker did not return the Svelte application shell");
  return (
    html
      // Production API/socket versions must not offer updates for a source app.
      .replace(/<meta\b[^>]*name=["']vb-v["'][^>]*>/gi, "")
      .replace(
        /<link\b[^>]*href=["']\/svelte-preview\/ui\.css(?:\?[^"']*)?["'][^>]*>/gi,
        "",
      )
      .replace(
        /src=["']\/svelte-preview\/app\.js(?:\?[^"']*)?["']/g,
        'src="/bootstrap.ts"',
      )
  );
}

export function workerProxy(target: string, viteOrigin: string): ProxyOptions {
  const worker = new URL(target);
  if (
    worker.protocol !== "http:" ||
    !["127.0.0.1", "localhost", "[::1]"].includes(worker.hostname) ||
    worker.pathname !== "/" ||
    worker.username ||
    worker.password ||
    worker.search ||
    worker.hash
  )
    throw new Error("Development Worker must be a loopback HTTP origin");
  return {
    target: worker.origin,
    changeOrigin: true,
    ws: true,
    configure(proxy) {
      const translate = (
        outgoing: { setHeader(name: string, value: string): void },
        incoming: { headers: { origin?: string; host?: string } },
      ) => {
        // A caller-controlled Host must never decide which origins are trusted.
        // Foreign origins remain foreign for the Worker's unchanged CSRF checks.
        if (incoming.headers.origin === viteOrigin)
          outgoing.setHeader("origin", worker.origin);
      };
      proxy.on("proxyReq", translate);
      proxy.on("proxyReqWs", translate);
    },
  };
}

/** Runtime/contract edits need fresh connections; component/CSS edits use HMR. */
export function requiresAppReload(root: string, file: string): boolean {
  return /^(?:src|shared|collab)\//.test(
    relative(root, file).replaceAll("\\", "/"),
  );
}

/** Development only: authorized Worker HTML and source modules on one origin. */
export function appDevelopment(root: string, worker: string): Plugin {
  const policy = createDevelopmentRequestPolicy(root);
  return {
    name: "vibebook-app-development",
    apply: "serve",
    configureServer(server) {
      server.watcher.add([
        resolve(root, "src"),
        resolve(root, "shared"),
        resolve(root, "collab"),
      ]);
      const reload = (file: string) => {
        if (requiresAppReload(root, file))
          server.ws.send({ type: "full-reload" });
      };
      for (const event of ["change", "add", "unlink"] as const)
        server.watcher.on(event, reload);
      server.httpServer?.once("close", () => {
        for (const event of ["change", "add", "unlink"] as const)
          server.watcher.off(event, reload);
      });
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        try {
          const parsed = localRequestUrl(req.url);
          const pathname = decodeURIComponent(parsed.pathname);
          if (
            !new RegExp(workerRoutes).test(pathname) &&
            pathname !== "/collab-svelte.js"
          )
            policy.assertRequest(req.url);
          if (pathname === "/collab-svelte.js") {
            res.setHeader("content-type", "text/javascript");
            res.setHeader("cache-control", "no-store");
            res.end(
              `export * from ${JSON.stringify(`/@fs/${resolve(root, "collab/editor.ts")}`)};`,
            );
            return;
          }
          if (!isSourceApp(req.url) || req.method !== "GET") return next();
          const headers = new Headers();
          if (req.headers.cookie) headers.set("cookie", req.headers.cookie);
          if (req.headers["accept-language"])
            headers.set(
              "accept-language",
              String(req.headers["accept-language"]),
            );
          const response = await fetch(workerRequestUrl(req.url, worker), {
            headers,
            redirect: "manual",
          });
          const html = await response.text();
          res.statusCode = response.status;
          for (const [name, value] of response.headers)
            if (
              ![
                "content-length",
                "content-encoding",
                "etag",
                "cache-control",
                "set-cookie",
              ].includes(name)
            )
              res.setHeader(name, value);
          const cookies = response.headers.getSetCookie();
          if (cookies.length) res.setHeader("set-cookie", cookies);
          res.setHeader("cache-control", "no-store");
          const nativeErrorShell =
            [400, 404, 500].includes(response.status) &&
            /<meta\b(?=[^>]*\bname=["']vb-page["'])(?=[^>]*\bcontent=["'](?:login|access|consent)["'])[^>]*>/i.test(
              html,
            );
          if (
            (!response.ok && !nativeErrorShell) ||
            !html.includes("/svelte-preview/app.js")
          ) {
            res.end(html);
            return;
          }
          // transformIndexHtml injects /@vite/client and the normal Svelte HMR runtime.
          res.end(await server.transformIndexHtml(req.url, sourceShell(html)));
        } catch (error) {
          res.statusCode = String(error).includes("[client-boundary]")
            ? 403
            : 502;
          res.setHeader("content-type", "text/plain");
          res.end(
            res.statusCode === 403
              ? "Source access denied"
              : "Development Worker unavailable or invalid shell",
          );
        }
      });
    },
  };
}
