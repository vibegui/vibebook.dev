import { relative, resolve } from "node:path";
import { canonicalFilesystemPath } from "./filesystemPaths";
import type {
  IncomingHttpHeaders,
  IncomingMessage,
  ServerResponse,
} from "node:http";
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

/** File bytes never pass through text/HTML rewriting, including successful PDF/media navigation. */
async function rawFileResponse(response: Response, res: ServerResponse) {
  res.statusCode = response.status;
  for (const [name, value] of response.headers)
    if (
      ![
        "connection",
        "keep-alive",
        "transfer-encoding",
        "content-encoding",
        "set-cookie",
      ].includes(name) &&
      !(name === "content-length" && response.headers.has("content-encoding"))
    )
      res.setHeader(name, value);
  const cookies = response.headers.getSetCookie();
  if (cookies.length) res.setHeader("set-cookie", cookies);
  const reader = response.body?.getReader();
  if (!reader) {
    res.end();
    return;
  }
  const cancel = () => {
    void reader.cancel().catch(() => {});
  };
  res.once("close", cancel);
  try {
    while (!res.destroyed) {
      const chunk = await reader.read();
      if (chunk.done) break;
      if (!res.write(chunk.value))
        await new Promise<void>((resolve) => {
          const done = () => {
            res.off("drain", done);
            res.off("close", done);
            resolve();
          };
          res.once("drain", done);
          res.once("close", done);
        });
    }
    if (!res.destroyed) res.end();
  } finally {
    res.off("close", cancel);
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

function loopbackWorker(target: string): URL {
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
  return worker;
}

export function workerProxy(target: string, viteOrigin: string): ProxyOptions {
  const worker = loopbackWorker(target);
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

function sourceHeaders(
  incoming: IncomingHttpHeaders,
  worker: string,
  vite: string,
) {
  const excluded = new Set([
    "host",
    "connection",
    "keep-alive",
    "proxy-connection",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    ...(incoming.connection ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase()),
  ]);
  const headers = new Headers();
  // Caller-controlled Connection tokens cannot erase auth/CSRF or body metadata.
  const metadata = new Set([
    "origin",
    "referer",
    "cookie",
    "authorization",
    "cf-connecting-ip",
    "content-type",
    "content-length",
  ]);
  for (const [name, value] of Object.entries(incoming)) {
    const lower = name.toLowerCase();
    if (
      value === undefined ||
      (excluded.has(lower) &&
        !metadata.has(lower) &&
        !lower.startsWith("sec-fetch-"))
    )
      continue;
    for (const part of Array.isArray(value) ? value : [value])
      headers.append(name, part);
  }
  // Match the existing HTTP/WS proxy trust boundary; never trust incoming Host.
  if (incoming.origin !== undefined)
    headers.set("origin", incoming.origin === vite ? worker : incoming.origin);
  if (incoming.referer !== undefined) {
    try {
      const referrer = new URL(incoming.referer);
      if (
        referrer.origin === vite &&
        !referrer.username &&
        !referrer.password
      ) {
        const translated = new URL(worker);
        translated.pathname = referrer.pathname;
        translated.search = referrer.search;
        headers.set("referer", translated.href);
      }
    } catch {
      /* Preserve invalid metadata for the Worker rather than granting trust. */
    }
  }
  return headers;
}

function postBody(request: IncomingMessage): ReadableStream<Uint8Array> {
  const iterator: AsyncIterator<unknown> = request[Symbol.asyncIterator]();
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const chunk: IteratorResult<unknown> = await iterator.next();
      if (chunk.done) controller.close();
      else if (chunk.value instanceof Uint8Array)
        controller.enqueue(chunk.value);
      else throw new TypeError("Consent request body must contain raw bytes");
    },
    async cancel() {
      request.destroy();
      await iterator.return?.();
    },
  });
}

/** Runtime/contract edits need fresh connections; component/CSS edits use HMR. */
export function requiresAppReload(root: string, file: string): boolean {
  return /^(?:src|shared|collab)\//.test(
    relative(
      canonicalFilesystemPath(root),
      canonicalFilesystemPath(file),
    ).replaceAll("\\", "/"),
  );
}

/** Development only: authorized Worker HTML and source modules on one origin. */
export function appDevelopment(
  root: string,
  worker: string,
  viteOrigin = "http://127.0.0.1:5173",
): Plugin {
  const policy = createDevelopmentRequestPolicy(root);
  const workerOrigin = loopbackWorker(worker).origin;
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
          const consentPost =
            req.method === "POST" &&
            parsed.pathname === "/authorize" &&
            parsed.searchParams.get("ui") === "svelte";
          const fileShell =
            req.method === "GET" &&
            parsed.searchParams.get("ui") === "svelte" &&
            /^\/api\/books\/[a-z0-9]{6,40}\/files\/[0-9a-f]{1,64}$/.test(
              parsed.pathname,
            ) &&
            !req.headers.range &&
            String(req.headers.accept ?? "").includes("text/html");
          if (
            (!isSourceApp(req.url) && !fileShell) ||
            (req.method !== "GET" && !consentPost)
          )
            return next();
          if ((consentPost || fileShell) && (req.aborted || res.destroyed))
            return;
          const headers = sourceHeaders(req.headers, workerOrigin, viteOrigin);
          if (!consentPost) {
            // Source shell GETs carry no body; keep their transport framing empty.
            headers.delete("content-length");
            headers.delete("content-encoding");
          }
          if (req.headers.cookie) headers.set("cookie", req.headers.cookie);
          if (req.headers["accept-language"])
            headers.set(
              "accept-language",
              String(req.headers["accept-language"]),
            );
          const cancellation = new AbortController();
          const abort = () => {
            cancellation.abort();
            req.destroy();
          };
          const disconnected = () => {
            if (!res.writableEnded) abort();
          };
          if (consentPost || fileShell) {
            req.once("aborted", abort);
            res.once("close", disconnected);
          }
          let response: Response, html: string;
          try {
            const options: RequestInit & { duplex?: "half" } = {
              headers,
              redirect: "manual",
            };
            if (fileShell) options.signal = cancellation.signal;
            if (consentPost) {
              options.method = "POST";
              options.body = postBody(req);
              options.duplex = "half";
              options.signal = cancellation.signal;
            }
            response = await fetch(
              workerRequestUrl(req.url, workerOrigin),
              options,
            );
            if (
              fileShell &&
              (![401, 403].includes(response.status) ||
                !/^text\/html(?:;|$)/i.test(
                  response.headers.get("content-type") ?? "",
                ))
            ) {
              await rawFileResponse(response, res);
              return;
            }
            html = await response.text();
          } finally {
            if (consentPost || fileShell) {
              req.off("aborted", abort);
              res.off("close", disconnected);
            }
          }
          res.statusCode = response.status;
          for (const [name, value] of response.headers)
            if (
              ![
                "content-length",
                "content-encoding",
                "etag",
                "cache-control",
                "set-cookie",
              ].includes(name) ||
              (consentPost && ["etag", "cache-control"].includes(name))
            )
              res.setHeader(name, value);
          const cookies = response.headers.getSetCookie();
          if (cookies.length) res.setHeader("set-cookie", cookies);
          if (!consentPost) res.setHeader("cache-control", "no-store");
          const nativeErrorShell = fileShell
            ? [401, 403].includes(response.status) &&
              /<meta\b(?=[^>]*\bname=["']vb-page["'])(?=[^>]*\bcontent=["']file-access["'])[^>]*>/i.test(
                html,
              )
            : [400, 404, 500].includes(response.status) &&
              /<meta\b(?=[^>]*\bname=["']vb-page["'])(?=[^>]*\bcontent=["'](?:login|access|consent)["'])[^>]*>/i.test(
                html,
              );
          if (
            (consentPost
              ? !nativeErrorShell ||
                !/<meta\b(?=[^>]*\bname=["']vb-page["'])(?=[^>]*\bcontent=["']consent["'])[^>]*>/i.test(
                  html,
                ) ||
                !/^text\/html(?:;|$)/i.test(
                  response.headers.get("content-type") ?? "",
                )
              : !response.ok && !nativeErrorShell) ||
            (fileShell &&
              !/<meta\b(?=[^>]*\bname=["']vb-page["'])(?=[^>]*\bcontent=["']file-access["'])[^>]*>/i.test(
                html,
              )) ||
            !html.includes("/svelte-preview/app.js")
          ) {
            res.end(html);
            return;
          }
          if (consentPost) {
            res.removeHeader("etag");
            res.setHeader("cache-control", "no-store");
          }
          // transformIndexHtml injects /@vite/client and the normal Svelte HMR runtime.
          res.end(await server.transformIndexHtml(req.url, sourceShell(html)));
        } catch (error) {
          if (req.aborted || res.destroyed) return;
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
