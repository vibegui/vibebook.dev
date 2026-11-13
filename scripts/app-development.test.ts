import { expect, test } from "bun:test";
import { EventEmitter } from "node:events";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { Readable } from "node:stream";
import {
  appDevelopment,
  isSourceApp,
  requiresAppReload,
  sourceShell,
  workerProxy,
  workerRoutes,
} from "../svelte/build/appDevelopment";
import { projectRoot } from "../svelte/build/clientBoundary";

test("only explicit Svelte app pages select source HTML", () => {
  for (const path of ["/app", "/login", "/authorize", "/archived", "/b/abc"])
    expect(isSourceApp(`${path}?ui=svelte`)).toBe(true);
  for (const path of [
    "/app",
    "/app?ui=vanilla",
    "/authorize?client_id=example",
    "/b/abc",
    "/api/me?ui=svelte",
    "/app-svelte.html?ui=svelte",
    "/b/a/files?ui=svelte",
  ])
    expect(isSourceApp(path)).toBe(false);
  for (const path of [
    "/api/me",
    "/ws-me",
    "/ws/abc",
    "/auth/dev",
    "/login",
    "/app",
    "/b/abc",
    "/oauth/code",
  ])
    expect(new RegExp(workerRoutes).test(path)).toBe(true);
  expect(new RegExp(workerRoutes).test("/bootstrap.ts")).toBe(false);
});

test("source HTML removes production version and compiled entry without changing production shell", async () => {
  const shell = await readFile(
    resolve(projectRoot, "public/app-svelte.html"),
    "utf8",
  );
  const dev = sourceShell(
    shell.replace("<head>", '<head><meta name="vb-v" content="production" />'),
  );
  expect(dev).toContain('src="/bootstrap.ts"');
  expect(dev).not.toContain('name="vb-v"');
  expect(dev).not.toContain("/svelte-preview/ui.css");
  expect(dev).not.toContain("/svelte-preview/app.js");
  expect(shell).toContain("/svelte-preview/app.js");
  expect(() => sourceShell("<html>login failure</html>")).toThrow("shell");
});

test("HTTP and websocket proxy trust the configured Vite origin, never a supplied Host", () => {
  const emitter = new EventEmitter();
  const options = workerProxy("http://127.0.0.1:8787", "http://127.0.0.1:5173");
  // configure's only dependency is the proxy event API.
  options.configure!(
    emitter as Parameters<NonNullable<typeof options.configure>>[0],
    {} as Parameters<NonNullable<typeof options.configure>>[1],
  );
  for (const event of ["proxyReq", "proxyReqWs"])
    for (const origin of [
      "http://127.0.0.1:5173",
      "https://evil.test",
      "http://localhost:5173",
      undefined,
    ]) {
      const headers: Record<string, string> = {};
      emitter.emit(
        event,
        {
          setHeader: (key: string, value: string) => {
            headers[key] = value;
          },
        },
        { headers: { origin, host: "evil.test" } },
      );
      if (origin === "http://127.0.0.1:5173")
        expect(headers.origin).toBe("http://127.0.0.1:8787");
      else expect(headers.origin).toBeUndefined();
    }
  for (const target of [
    "https://example.com",
    "http://example.com",
    "http://127.0.0.1:8787/path",
    "http://user@127.0.0.1:8787",
  ])
    expect(() => workerProxy(target, "http://127.0.0.1:5173")).toThrow(
      "loopback",
    );
});

test("native auth error shells retain status and cookies while using source HMR", async () => {
  let middleware: Function = () => {};
  const plugin = appDevelopment(projectRoot, "http://127.0.0.1:8787");
  (plugin.configureServer as Function)({
    watcher: { add() {}, on() {} },
    middlewares: {
      use(fn: Function) {
        middleware = fn;
      },
    },
    transformIndexHtml: async (_url: string, html: string) =>
      `<!-- HMR -->${html}`,
  });
  const previousFetch = globalThis.fetch;
  try {
    for (const fixture of [
      { status: 200, page: "consent", transform: true },
      { status: 400, page: "consent", transform: true },
      { status: 404, page: "access", transform: true },
      { status: 500, page: "login", transform: true },
      { status: 302, page: "consent", transform: false },
      { status: 400, page: "unknown", transform: false },
      { status: 500, page: "", transform: false },
    ]) {
      const html = `<html><head><meta name="vb-page" content="${fixture.page}"><meta name="vb-v" content="production"><link rel="stylesheet" href="/svelte-preview/ui.css?v=abc"></head><body><script type="module" src="/svelte-preview/app.js?v=abc"></script></body></html>`;
      globalThis.fetch = Object.assign(
        async () =>
          new Response(html, {
            status: fixture.status,
            headers: {
              "content-type": "text/html",
              "set-cookie": "local-fixture=1; HttpOnly",
            },
          }),
        { preconnect: previousFetch.preconnect },
      );
      let body = "";
      const headers: Record<string, unknown> = {};
      const res = {
        statusCode: 200,
        setHeader(name: string, value: unknown) {
          headers[name] = value;
        },
        end(value: string) {
          body = value;
        },
      };
      await middleware(
        { url: "/authorize?ui=svelte", method: "GET", headers: {} },
        res,
        () => {
          throw new Error("native auth route bypassed");
        },
      );
      expect(res.statusCode).toBe(fixture.status);
      expect(headers["set-cookie"]).toEqual(["local-fixture=1; HttpOnly"]);
      if (fixture.transform) {
        expect(body).toContain('src="/bootstrap.ts"');
        expect(body).toContain("<!-- HMR -->");
        expect(body).not.toContain('name="vb-v"');
        expect(body).not.toContain("/svelte-preview/ui.css");
      } else expect(body).toBe(html);
    }
  } finally {
    globalThis.fetch = previousFetch;
  }
});

function consentMiddleware() {
  let middleware: Function = () => {};
  const plugin = appDevelopment(
    projectRoot,
    "http://127.0.0.1:8787",
    "http://127.0.0.1:5173",
  );
  (plugin.configureServer as Function)({
    watcher: { add() {}, on() {} },
    middlewares: {
      use(fn: Function) {
        middleware = fn;
      },
    },
    transformIndexHtml: async (_url: string, html: string) =>
      `<!-- HMR -->${html}`,
  });
  return middleware;
}
function consentRequest(
  body: string,
  url = "/authorize?ui=svelte",
  headers: Record<string, string> = {},
) {
  const bytes = Buffer.from(body);
  return Object.assign(
    Readable.from([bytes.subarray(0, 8), bytes.subarray(8)]),
    {
      url,
      method: "POST",
      aborted: false,
      headers: {
        host: "attacker.invalid",
        cookie: "session=real-cookie; consent=nonce",
        "content-type": "application/x-www-form-urlencoded",
        "content-length": String(Buffer.byteLength(body)),
        ...headers,
      },
    },
  );
}
function consentResponse() {
  return Object.assign(new EventEmitter(), {
    statusCode: 200,
    writableEnded: false,
    destroyed: false,
    body: "",
    headers: {} as Record<string, unknown>,
    setHeader(name: string, value: unknown) {
      this.headers[name] = value;
    },
    removeHeader(name: string) {
      delete this.headers[name];
    },
    end(value: string) {
      this.body = value;
      this.writableEnded = true;
    },
  });
}
test("selected consent POST forwards exact raw form, cookie and origin boundary before transforming only native consent errors", async () => {
  const middleware = consentMiddleware(),
    previousFetch = globalThis.fetch;
  const body = "handle=✓a%2Bb%3D&decision=deny&state=%E2%9C%93&next=%2Fapp";
  try {
    for (const fixture of [
      {
        status: 400,
        page: "consent",
        type: "text/html; charset=utf-8",
        transform: true,
      },
      { status: 404, page: "consent", type: "text/html", transform: true },
      { status: 500, page: "consent", type: "text/html", transform: true },
      { status: 302, page: "consent", type: "text/html", transform: false },
      { status: 303, page: "consent", type: "text/html", transform: false },
      { status: 200, page: "consent", type: "text/html", transform: false },
      { status: 400, page: "login", type: "text/html", transform: false },
      { status: 400, page: "access", type: "text/html", transform: false },
      { status: 400, page: "unknown", type: "text/html", transform: false },
      {
        status: 500,
        page: "consent",
        type: "application/json",
        transform: false,
      },
      { status: 403, page: "consent", type: "text/html", transform: false },
    ])
      for (const origin of [
        "http://127.0.0.1:5173",
        "https://evil.test",
        "http://localhost:5173",
        undefined,
      ])
        for (const site of ["same-origin", "cross-site"]) {
          const html = `<html><head><meta name="vb-page" content="${fixture.page}"><meta name="vb-v" content="prod"><link rel="stylesheet" href="/svelte-preview/ui.css?v=abc"></head><body><script type="module" src="/svelte-preview/app.js?v=abc"></script></body></html>`;
          let forwarded = false;
          globalThis.fetch = Object.assign(
            async (input: RequestInfo | URL, init?: RequestInit) => {
              forwarded = true;
              expect(String(input)).toBe(
                "http://127.0.0.1:8787/authorize?ui=svelte",
              );
              expect(init?.redirect).toBe("manual");
              expect(Reflect.get(init!, "duplex")).toBe("half");
              const request = new Request(input, init);
              expect(request.method).toBe("POST");
              expect(await request.text()).toBe(body);
              expect(request.headers.get("cookie")).toBe(
                "session=real-cookie; consent=nonce",
              );
              expect(request.headers.get("content-type")).toBe(
                "application/x-www-form-urlencoded",
              );
              expect(request.headers.get("content-length")).toBe(
                String(Buffer.byteLength(body)),
              );
              expect(request.headers.get("origin")).toBe(
                origin === "http://127.0.0.1:5173"
                  ? "http://127.0.0.1:8787"
                  : (origin ?? null),
              );
              expect(request.headers.get("referer")).toBe(
                "http://127.0.0.1:8787/authorize?ui=svelte",
              );
              expect(request.headers.get("host")).toBeNull();
              expect(request.headers.get("connection")).toBeNull();
              expect(request.headers.get("x-private-hop")).toBeNull();
              expect(request.headers.get("transfer-encoding")).toBeNull();
              expect(request.headers.get("sec-fetch-site")).toBe(site);
              const headers = new Headers({
                "content-type": fixture.type,
                "cache-control": "private, max-age=0",
                etag: '"fixture"',
                location:
                  "https://client.example.test/callback?error=access_denied",
                vary: "Cookie",
                "x-consent-test": "kept",
              });
              headers.append(
                "set-cookie",
                "consent=; Path=/; HttpOnly; Max-Age=0",
              );
              headers.append("set-cookie", "session=next; Path=/; HttpOnly");
              return new Response(html, { status: fixture.status, headers });
            },
            { preconnect: previousFetch.preconnect },
          );
          const req = consentRequest(body, "/authorize?ui=svelte", {
              ...(origin ? { origin } : {}),
              referer: "http://127.0.0.1:5173/authorize?ui=svelte",
              connection:
                "keep-alive, x-private-hop, origin, sec-fetch-site, referer, cookie, content-type, content-length",
              "x-private-hop": "removed",
              "transfer-encoding": "chunked",
              "sec-fetch-site": site,
            }),
            res = consentResponse();
          await middleware(req, res, () => {
            throw Error("selected POST bypassed");
          });
          expect(forwarded).toBe(true);
          expect(res.statusCode).toBe(fixture.status);
          expect(res.headers["set-cookie"]).toEqual([
            "consent=; Path=/; HttpOnly; Max-Age=0",
            "session=next; Path=/; HttpOnly",
          ]);
          expect(res.headers.location).toBe(
            "https://client.example.test/callback?error=access_denied",
          );
          expect(res.headers.vary).toBe("Cookie");
          expect(res.headers["x-consent-test"]).toBe("kept");
          if (fixture.transform) {
            expect(res.body).toContain("<!-- HMR -->");
            expect(res.body).toContain('src="/bootstrap.ts"');
            expect(res.body).not.toContain('name="vb-v"');
            expect(res.headers.etag).toBeUndefined();
            expect(res.headers["cache-control"]).toBe("no-store");
          } else {
            expect(res.body).toBe(html);
            expect(res.headers.etag).toBe('"fixture"');
            expect(res.headers["cache-control"]).toBe("private, max-age=0");
          }
        }
  } finally {
    globalThis.fetch = previousFetch;
  }
});
test("unselected vanilla consent and other POST routes remain with the ordinary proxy unread", async () => {
  const middleware = consentMiddleware(),
    previousFetch = globalThis.fetch;
  let fetches = 0;
  globalThis.fetch = Object.assign(
    async () => {
      fetches++;
      throw Error("unexpected source fetch");
    },
    { preconnect: previousFetch.preconnect },
  );
  try {
    for (const [url, method] of [
      ["/authorize", "POST"],
      ["/authorize?ui=vanilla", "POST"],
      ["/authorize?ui=unknown", "POST"],
      ["/auth/logout?ui=svelte", "POST"],
      ["/app?ui=svelte", "POST"],
      ["/authorize/extra?ui=svelte", "POST"],
      ["/authorize?ui=svelte", "PUT"],
    ]) {
      const req = consentRequest("handle=unread", url);
      req.method = method;
      let next = 0;
      await middleware(req, consentResponse(), () => {
        next++;
      });
      expect(next).toBe(1);
      expect(req.readableDidRead).toBe(false);
    }
    const req = consentRequest(
        "handle=private",
        "//evil.test/authorize?ui=svelte",
      ),
      res = consentResponse();
    await middleware(req, res, () => {
      throw Error("authority reached proxy");
    });
    expect(res.statusCode).toBe(403);
    expect(req.readableDidRead).toBe(false);
    expect(fetches).toBe(0);
  } finally {
    globalThis.fetch = previousFetch;
  }
  expect(() => appDevelopment(projectRoot, "https://evil.test")).toThrow(
    "loopback",
  );
});
test("selected consent POST cancels upstream body and response when its client disconnects", async () => {
  const middleware = consentMiddleware(),
    previousFetch = globalThis.fetch;
  try {
    for (const event of ["aborted", "close"]) {
      let entered!: () => void;
      const ready = new Promise<void>((resolve) => {
        entered = resolve;
      });
      let signal: AbortSignal | undefined;
      globalThis.fetch = Object.assign(
        async (_input: RequestInfo | URL, init?: RequestInit) => {
          signal = init?.signal ?? undefined;
          entered();
          return new Promise<Response>((_resolve, reject) =>
            signal!.addEventListener(
              "abort",
              () => reject(new Error("client left")),
              { once: true },
            ),
          );
        },
        { preconnect: previousFetch.preconnect },
      );
      const req = consentRequest("handle=private"),
        res = consentResponse();
      const pending = middleware(req, res, () => {
        throw Error("POST bypassed");
      });
      await ready;
      if (event === "aborted") {
        req.aborted = true;
        req.emit("aborted");
      } else {
        res.destroyed = true;
        res.emit("close");
      }
      await pending;
      expect(signal?.aborted).toBe(true);
      expect(req.destroyed).toBe(true);
      expect(res.body).toBe("");
      expect(req.listenerCount("aborted")).toBe(0);
      expect(res.listenerCount("close")).toBe(0);
    }
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("consent POST byte adapter preserves backpressure, rejects decoded chunks and destroys its source on cancel", async () => {
  const middleware = consentMiddleware(),
    previousFetch = globalThis.fetch;
  try {
    for (const mode of ["bytes", "decoded", "cancel"]) {
      let produced = 0;
      const payload = Array.from({ length: 32 }, (_, i) => `part${i}=✓&`).join(
        "",
      );
      async function* chunks() {
        for (let i = 0; i < 32; i++) {
          produced++;
          yield mode === "decoded" ? `part${i}=✓&` : Buffer.from(`part${i}=✓&`);
        }
      }
      const req = Object.assign(Readable.from(chunks(), { highWaterMark: 1 }), {
          url: "/authorize?ui=svelte",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          aborted: false,
        }),
        res = consentResponse();
      globalThis.fetch = Object.assign(
        async (input: RequestInfo | URL, init?: RequestInit) => {
          await Promise.resolve();
          expect(produced).toBeLessThan(32);
          if (mode === "cancel") {
            const reader = (
              init?.body as ReadableStream<Uint8Array>
            ).getReader();
            await reader.read();
            await reader.cancel();
            expect(req.destroyed).toBe(true);
          } else {
            const request = new Request(input, init);
            expect(await request.text()).toBe(payload);
          }
          return new Response("passed", { status: 400 });
        },
        { preconnect: previousFetch.preconnect },
      );
      await middleware(req, res, () => {
        throw Error("POST bypassed");
      });
      expect(res.statusCode).toBe(mode === "decoded" ? 502 : 400);
    }
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("source GET access-return Referer preserves the Worker's real autoAccess trust predicate", async () => {
  const middleware = consentMiddleware(),
    previousFetch = globalThis.fetch;
  try {
    for (const referrer of [
      undefined,
      "http://127.0.0.1:5173/login?next=%2Fb%2Fabcdef%3Fpedir%3D1",
      "https://evil.test/login",
      "http://127.0.0.1:5173.evil.test/login",
      "http://localhost:5173/login",
      "http://user@127.0.0.1:5173/login",
      "not a URL",
      "http://127.0.0.1:8787/login",
    ]) {
      const translated = referrer?.startsWith("http://127.0.0.1:5173/")
        ? referrer.replace("http://127.0.0.1:5173", "http://127.0.0.1:8787")
        : referrer;
      globalThis.fetch = Object.assign(
        async (input: RequestInfo | URL, init?: RequestInit) => {
          expect(String(input)).toBe(
            "http://127.0.0.1:8787/b/abcdef?ui=svelte&pedir=1",
          );
          const headers = new Headers(init?.headers);
          expect(headers.get("referer")).toBe(translated ?? null);
          expect(headers.get("origin")).toBe("https://evil.test");
          expect(headers.get("sec-fetch-site")).toBe("cross-site");
          expect(headers.get("cookie")).toBe("session=local");
          expect(headers.get("content-length")).toBeNull();
          // Exact predicate used by src/index.ts accessPage metadata. This proves
          // forwarding parity, not a real browser access request or permission grant.
          const url = new URL(String(input)),
            auto =
              url.searchParams.has("pedir") &&
              (headers.get("referer") ?? "").startsWith(`${url.origin}/`);
          expect(auto).toBe(!!translated?.startsWith("http://127.0.0.1:8787/"));
          return new Response("worker access metadata", {
            status: 200,
            headers: { "content-type": "text/plain" },
          });
        },
        { preconnect: previousFetch.preconnect },
      );
      const req = {
          url: "/b/abcdef?ui=svelte&pedir=1",
          method: "GET",
          headers: {
            ...(referrer ? { referer: referrer } : {}),
            origin: "https://evil.test",
            "sec-fetch-site": "cross-site",
            cookie: "session=local",
            connection: "origin, referer, sec-fetch-site, cookie",
            "content-length": "42",
          },
        },
        res = consentResponse();
      await middleware(req, res, () => {
        throw Error("source access GET bypassed");
      });
      expect(res.statusCode).toBe(200);
    }
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("runtime contracts reload while component/style edits remain HMR", () => {
  for (const file of ["src/api.ts", "shared/protocol.ts", "collab/editor.ts"])
    expect(requiresAppReload(projectRoot, resolve(projectRoot, file))).toBe(
      true,
    );
  for (const file of [
    "svelte/Chat.svelte",
    "svelte/styles/tailwind.css",
    ".api-types/src/api.d.ts",
  ])
    expect(requiresAppReload(projectRoot, resolve(projectRoot, file))).toBe(
      false,
    );
});

test("raw source middleware denies backend and private reads before Vite serves files", async () => {
  let middleware: Function = () => {};
  const plugin = appDevelopment(projectRoot, "http://127.0.0.1:8787");
  const configure = plugin.configureServer as Function;
  configure({
    watcher: { add() {}, on() {} },
    middlewares: {
      use(fn: Function) {
        middleware = fn;
      },
    },
  });
  for (const file of [
    "src/api.ts",
    ".dev.vars",
    ".env.local",
    "svelte/server/secret.ts",
    "svelte/foo.server.ts",
  ])
    for (const query of ["?raw", "?url", ""]) {
      let body = "";
      const res = {
        statusCode: 200,
        setHeader() {},
        end(value: string) {
          body = value;
        },
      };
      await middleware(
        { url: `/@fs/${resolve(projectRoot, file)}${query}` },
        res,
        () => {
          throw new Error("exposed protected source");
        },
      );
      expect(res.statusCode).toBe(403);
      expect(body).toBe("Source access denied");
    }
});

test("request allowlist excludes tooling, caches, encoded paths and real symlink escapes", async () => {
  const { createDevelopmentRequestPolicy, localRequestUrl, workerRequestUrl } =
    await import("../svelte/build/developmentRequests");
  const { mkdtemp, mkdir, writeFile, symlink, rename, rm } =
    await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const root = await mkdtemp(resolve(tmpdir(), "vb-dev-requests-"));
  const deps = await mkdtemp(resolve(tmpdir(), "vb-dev-dependencies-"));
  try {
    for (const dir of [
      "svelte/build",
      "svelte/lib",
      "shared",
      "collab",
      "public",
      "src",
      "scripts",
      "node_modules/.vite/deps",
      ".wrangler/tmp",
    ])
      await mkdir(resolve(root, dir), { recursive: true });
    for (const file of [
      "svelte/lib/ok.ts",
      "shared/contracts.ts",
      "collab/editor.ts",
      "src/secret.ts",
      "scripts/build.ts",
      ".wrangler/tmp/worker.js",
      "node_modules/.vite/deps/svelte.js",
    ])
      await writeFile(resolve(root, file), "export const value = 1");
    await symlink(
      resolve(root, "src/secret.ts"),
      resolve(root, "svelte/lib/backend.ts"),
    );
    await symlink(
      resolve(root, "scripts/build.ts"),
      resolve(root, "public/escape.js"),
    );
    await symlink(
      resolve(root, ".wrangler/tmp/worker.js"),
      resolve(root, "svelte/lib/cache.js"),
    );
    await rename(resolve(root, "node_modules"), resolve(deps, "node_modules"));
    await symlink(resolve(deps, "node_modules"), resolve(root, "node_modules"));
    const policy = createDevelopmentRequestPolicy(root);
    expect(() =>
      policy.assertRequest(`/@fs/${deps}/node_modules/.vite/deps/svelte.js`),
    ).not.toThrow();
    for (const path of [
      "/lib/ok.ts",
      "/@vite/client",
      "/@vite/env",
      `/@fs/${root}/shared/contracts.ts`,
      `/@fs/${root}/collab/editor.ts`,
      `/@fs/${root}/node_modules/.vite/deps/svelte.js`,
    ])
      expect(() => policy.assertRequest(path)).not.toThrow();
    for (const path of [
      "scripts/build.ts",
      "wrangler.jsonc",
      ".wrangler/tmp/worker.js",
      ".wrangler/qa-test/worker.js",
      "svelte/build/appDevelopment.ts",
      "svelte/vite.config.ts",
      "svelte/tsconfig.json",
      "svelte/lib/backend.ts",
      "svelte/lib/cache.js",
      "public/escape.js",
      "node_modules/.cache/worker.js",
    ])
      expect(() => policy.assertRequest(`/@fs/${root}/${path}?raw`)).toThrow(
        "[client-boundary]",
      );
    for (const path of [
      "/build/appDevelopment.ts?raw",
      "/vite.config.ts?url",
      "/escape.js?raw",
      `/@fs/${root}/%73cripts/build.ts?raw`,
      `/@fs/${root}/%252e%252e/src/secret.ts`,
      `/@id/${root}/scripts/build.ts?raw`,
    ])
      expect(() => policy.assertRequest(path)).toThrow("[client-boundary]");
    for (const path of [
      "//evil.example/app?ui=svelte",
      "/\t/evil.example/app?ui=svelte",
      "http://evil.example/app?ui=svelte",
      "https://evil.example/app?ui=svelte",
      "/\\evil.example/app?ui=svelte",
    ]) {
      expect(isSourceApp(path)).toBe(false);
      expect(() => localRequestUrl(path)).toThrow("[client-boundary]");
      expect(() => workerRequestUrl(path, "http://127.0.0.1:8787")).toThrow(
        "[client-boundary]",
      );
    }
    expect(
      workerRequestUrl("/app?ui=svelte", "http://127.0.0.1:8787").href,
    ).toBe("http://127.0.0.1:8787/app?ui=svelte");
  } finally {
    await rm(root, { recursive: true, force: true });
    await rm(deps, { recursive: true, force: true });
  }
});

const readyImmediately = { probeReady: async () => true, onPhase: () => {} };

test("supervisor reaps startup children on cancellation and spawn failure", async () => {
  const { runDevelopmentProcesses } = await import("./dev-app");
  for (const stage of [1, 2, 3]) {
    const signals = new EventEmitter();
    let spawns = 0;
    const children: { killed: boolean }[] = [];
    const result = runDevelopmentProcesses(
      () => {
        spawns++;
        let end!: (code: number) => void;
        const exited = new Promise<number>((resolve) => {
          end = resolve;
        });
        const state = { killed: false };
        children.push(state);
        if (spawns < stage) queueMicrotask(() => end(0));
        else queueMicrotask(() => signals.emit("SIGTERM"));
        return {
          exited,
          kill() {
            state.killed = true;
            end(143);
          },
        };
      },
      signals,
      readyImmediately,
    );
    expect(await result).toBe(130);
    expect(children.every((child) => child.killed)).toBe(true);
    expect(signals.listenerCount("SIGTERM")).toBe(0);
  }
});

test("supervisor reaps already-started watchers when a later spawn throws", async () => {
  const { runDevelopmentProcesses } = await import("./dev-app");
  const { spyOn } = await import("bun:test");
  const error = spyOn(console, "error").mockImplementation(() => {});
  const children: { killed: boolean }[] = [];
  let count = 0;
  try {
    const code = await runDevelopmentProcesses(
      () => {
        if (++count === 4) throw new Error("spawn failed");
        let end!: (code: number) => void;
        const exited = new Promise<number>((resolve) => {
          end = resolve;
        });
        const state = { killed: false };
        children.push(state);
        if (count < 3) end(0);
        return {
          exited,
          kill() {
            state.killed = true;
            end(143);
          },
        };
      },
      new EventEmitter(),
      readyImmediately,
    );
    expect(code).toBe(1);
    expect(children).toHaveLength(3);
    expect(children.every((child) => child.killed)).toBe(true);
  } finally {
    error.mockRestore();
  }
});

test("completed startup groups are released before later watcher shutdown", async () => {
  const { runDevelopmentProcesses } = await import("./dev-app");
  const signals = new EventEmitter();
  const children: { kills: number; end(code: number): void }[] = [];
  let notifyWatchers!: () => void;
  const ready = new Promise<void>((resolve) => {
    notifyWatchers = resolve;
  });
  const result = runDevelopmentProcesses(
    () => {
      let end!: (code: number) => void;
      const exited = new Promise<number>((resolve) => {
        end = resolve;
      });
      const state = { kills: 0, end };
      children.push(state);
      if (children.length <= 2) end(0);
      if (children.length === 5) notifyWatchers();
      return {
        exited,
        kill() {
          state.kills++;
          end(143);
        },
      };
    },
    signals,
    readyImmediately,
  );
  await ready;
  expect(children.slice(0, 2).map((child) => child.kills)).toEqual([1, 1]);
  expect(children.slice(2).map((child) => child.kills)).toEqual([0, 0, 0]);
  signals.emit("SIGTERM");
  expect(await result).toBe(130);
  expect(children.slice(0, 2).map((child) => child.kills)).toEqual([1, 1]);
  expect(children.slice(2).map((child) => child.kills)).toEqual([1, 1, 1]);
});

test("startup stages fixed Worker then Vite readiness before declaration watch without resetting missed probes", async () => {
  const { runDevelopmentProcesses, DEVELOPMENT_READY_URLS } =
    await import("./dev-app");
  const signals = new EventEmitter();
  const commands: string[][] = [];
  const probes: string[] = [];
  const phases: { name: string; status: string; elapsedMs: number }[] = [];
  const code = await runDevelopmentProcesses(
    (command) => {
      commands.push(command);
      let end!: (value: number) => void;
      const exited = new Promise<number>((resolve) => {
        end = resolve;
      });
      if (commands.length <= 2) end(0);
      return {
        exited,
        kill() {
          end(143);
        },
      };
    },
    signals,
    {
      probeReady: async (url) => {
        probes.push(url);
        expect(commands.length).toBe(
          url === DEVELOPMENT_READY_URLS.worker ? 3 : 4,
        );
        return probes.filter((value) => value === url).length > 1;
      },
      pause: async () => {},
      onPhase: (phase) => {
        phases.push(phase);
        if (phase.name === "startup" && phase.status === "ready")
          queueMicrotask(() => signals.emit("SIGTERM"));
      },
    },
  );
  expect(code).toBe(130);
  expect(commands).toHaveLength(5);
  expect(commands[2]).toContain("wrangler");
  expect(commands[3]).toContain("vite");
  expect(commands[4]).toContain("--watch");
  expect(probes).toEqual([
    DEVELOPMENT_READY_URLS.worker,
    DEVELOPMENT_READY_URLS.worker,
    DEVELOPMENT_READY_URLS.vite,
    DEVELOPMENT_READY_URLS.vite,
  ]);
  expect(
    phases
      .filter((phase) => phase.status === "ready")
      .map((phase) => phase.name),
  ).toEqual(["build:api-types", "build:mcp", "worker", "vite", "startup"]);
  expect(phases.every((phase) => phase.elapsedMs >= 0)).toBe(true);
});

test("startup cancellation aborts an in-flight readiness probe and never spawns later stages", async () => {
  const { runDevelopmentProcesses } = await import("./dev-app");
  const signals = new EventEmitter();
  let count = 0,
    kills = 0;
  let probeSignal: AbortSignal | undefined;
  const code = await runDevelopmentProcesses(
    () => {
      let end!: (code: number) => void;
      const exited = new Promise<number>((resolve) => {
        end = resolve;
      });
      if (++count <= 2) end(0);
      return {
        exited,
        kill() {
          kills++;
          end(143);
        },
      };
    },
    signals,
    {
      probeReady: async (_url, signal) => {
        probeSignal = signal;
        queueMicrotask(() => signals.emit("SIGTERM"));
        return await new Promise<boolean>(() => {});
      },
      onPhase: () => {},
    },
  );
  expect(code).toBe(130);
  expect(count).toBe(3);
  expect(kills).toBe(3);
  expect(probeSignal?.aborted).toBe(true);
});

test("an earlier server exit and startup deadline both terminate readiness and reap active children", async () => {
  const { runDevelopmentProcesses, DEVELOPMENT_READY_URLS, startupTimeout } =
    await import("./dev-app");
  const { spyOn } = await import("bun:test");
  const error = spyOn(console, "error").mockImplementation(() => {});
  try {
    for (const cause of ["worker-exit", "deadline"]) {
      let count = 0,
        kills = 0;
      const ends: ((code: number) => void)[] = [];
      const code = await runDevelopmentProcesses(
        () => {
          let end!: (code: number) => void;
          const exited = new Promise<number>((resolve) => {
            end = resolve;
          });
          ends.push(end);
          if (++count <= 2) end(0);
          return {
            exited,
            kill() {
              kills++;
              end(143);
            },
          };
        },
        new EventEmitter(),
        {
          startupTimeoutMs: 30,
          onPhase: () => {},
          probeReady: async (url) => {
            if (
              cause === "worker-exit" &&
              url === DEVELOPMENT_READY_URLS.worker
            )
              return true;
            if (cause === "worker-exit") queueMicrotask(() => ends[2]!(0));
            return await new Promise<boolean>(() => {});
          },
        },
      );
      expect(code).toBe(1);
      expect(count).toBe(cause === "worker-exit" ? 4 : 3);
      expect(kills).toBe(count);
    }
    expect(startupTimeout()).toBe(180000);
    expect(startupTimeout("600000")).toBe(600000);
    for (const value of ["0", "NaN", "-1", "1800001"])
      expect(() => startupTimeout(value)).toThrow();
  } finally {
    error.mockRestore();
  }
});

test("only explicit native denied file navigations transform; successful bytes and Range remain raw", async () => {
  const middleware = consentMiddleware(),
    previousFetch = globalThis.fetch;
  try {
    for (const status of [401, 403]) {
      const html =
        '<meta name="vb-page" content="file-access"><meta name="vb-v" content="prod"><script src="/svelte-preview/app.js?v=abc"></script>';
      globalThis.fetch = Object.assign(
        async () =>
          new Response(html, {
            status,
            headers: {
              "content-type": "text/html",
              "set-cookie": "session=next; HttpOnly",
            },
          }),
        { preconnect: previousFetch.preconnect },
      );
      const req = consentRequest("", "/api/books/aaaaaa/files/aa?ui=svelte", {
        accept: "text/html",
      });
      req.method = "GET";
      const res = consentResponse();
      await middleware(req, res, () => {
        throw Error("native file bypassed");
      });
      expect(res.statusCode).toBe(status);
      expect(res.body).toContain('src="/bootstrap.ts"');
      expect(res.body).toContain("<!-- HMR -->");
      expect(res.headers["set-cookie"]).toEqual(["session=next; HttpOnly"]);
    }
    const bytes = new Uint8Array([0, 255, 128, 10, 65]);
    globalThis.fetch = Object.assign(
      async () =>
        new Response(bytes, {
          headers: {
            "content-type": "application/pdf",
            "content-length": "5",
            "content-security-policy": "sandbox",
            vary: "Cookie",
          },
        }),
      { preconnect: previousFetch.preconnect },
    );
    const req = consentRequest("", "/api/books/aaaaaa/files/aa?ui=svelte", {
      accept: "text/html",
    });
    req.method = "GET";
    const chunks: Uint8Array[] = [];
    const res = Object.assign(consentResponse(), {
      write(value: Uint8Array) {
        chunks.push(value);
        return true;
      },
    });
    await middleware(req, res, () => {
      throw Error("raw file bypassed");
    });
    expect([...Buffer.concat(chunks)]).toEqual([...bytes]);
    expect(res.headers["content-security-policy"]).toBe("sandbox");
    expect(res.headers.vary).toBe("Cookie");
    const bypassHeaders: Record<string, string>[] = [
      { accept: "application/octet-stream" },
      { accept: "text/html", range: "bytes=0-0" },
    ];
    for (const headers of bypassHeaders) {
      const request = consentRequest(
        "",
        "/api/books/aaaaaa/files/aa?ui=svelte",
        headers,
      );
      request.method = "GET";
      let next = 0;
      await middleware(request, consentResponse(), () => {
        next++;
      });
      expect(next).toBe(1);
    }
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("whole project and external dependency aliases share one physical source boundary without allowing lexical escapes", async () => {
  const { mkdtemp, mkdir, writeFile, symlink, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { createDevelopmentRequestPolicy } = await import("../svelte/build/developmentRequests");
  const base = await mkdtemp(resolve(tmpdir(), "vb-project-root-alias-"));
  const physical = resolve(base, "physical-project"), project = resolve(base, "logical-project"), deps = resolve(base, "physical-dependencies"), depAlias = resolve(base, "logical-dependencies");
  try {
    for (const directory of ["svelte/lib", "shared", "collab", "public", "src", "scripts", ".wrangler/tmp"]) await mkdir(resolve(physical, directory), { recursive: true });
    await mkdir(resolve(deps, ".vite/deps"), { recursive: true });
    for (const file of ["svelte/lib/ok.ts", "shared/contracts.ts", "src/secret.ts", "scripts/build.ts", ".wrangler/tmp/worker.js"]) await writeFile(resolve(physical, file), "export const value = 1");
    await writeFile(resolve(deps, ".vite/deps/svelte.js"), "export const browser = true");
    await symlink(physical, project); await symlink(deps, depAlias); await symlink(depAlias, resolve(physical, "node_modules"));
    await symlink(resolve(physical, "src/secret.ts"), resolve(physical, "svelte/lib/backend.ts"));
    await symlink(resolve(physical, "scripts/build.ts"), resolve(physical, "public/escape.js"));
    await symlink(resolve(physical, ".wrangler/tmp/worker.js"), resolve(physical, "svelte/lib/generated.js"));
    await symlink(resolve(physical, "shared/contracts.ts"), resolve(physical, "shared/.hidden-alias.ts"));
    const policy = createDevelopmentRequestPolicy(project);
    for (const file of [resolve(project, "shared/contracts.ts"), resolve(physical, "shared/contracts.ts"), resolve(project, "node_modules/.vite/deps/svelte.js"), resolve(physical, "node_modules/.vite/deps/svelte.js"), resolve(depAlias, ".vite/deps/svelte.js"), resolve(deps, ".vite/deps/svelte.js")]) expect(() => policy.assertRequest(`/@fs/${file}`)).not.toThrow();
    expect(() => policy.assertRequest("/lib/ok.ts")).not.toThrow();
    for (const root of [project, physical]) for (const file of ["src/secret.ts", "src/not-created.ts", "scripts/build.ts", "scripts/not-created.ts", ".wrangler/tmp/worker.js", ".wrangler/not-created/worker.js", "svelte/build/not-created.ts", "svelte/lib/backend.ts", "svelte/lib/generated.js", "shared/.hidden-alias.ts", "shared/private.key", "public/escape.js"]) expect(() => policy.assertRequest(`/@fs/${resolve(root, file)}?raw`)).toThrow("[client-boundary]");
    for (const root of [depAlias, deps]) expect(() => policy.assertRequest(`/@fs/${resolve(root, ".cache/private.js")}`)).toThrow("[client-boundary]");
  } finally { await rm(base, { recursive: true, force: true }); }
});

test("contract watcher recognizes logical and physical project-root paths, including deleted source files", async () => {
  const { mkdtemp, mkdir, symlink, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const base = await mkdtemp(resolve(tmpdir(), "vb-reload-root-alias-"));
  const physical = resolve(base, "physical"), logical = resolve(base, "logical");
  try {
    await mkdir(resolve(physical, "src"), { recursive: true }); await symlink(physical, logical);
    for (const file of ["src/not-created.ts", "shared/not-created.ts", "collab/not-created.ts"]) for (const candidate of [logical, physical]) expect(requiresAppReload(logical, resolve(candidate, file))).toBe(true);
    for (const candidate of [logical, physical]) expect(requiresAppReload(logical, resolve(candidate, "svelte/Chat.svelte"))).toBe(false);
  } finally { await rm(base, { recursive: true, force: true }); }
});
