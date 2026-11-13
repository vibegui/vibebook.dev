import { expect, test } from "bun:test";
import { EventEmitter } from "node:events";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
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
  for (const path of ["/app", "/login", "/archived", "/b/abc"])
    expect(isSourceApp(`${path}?ui=svelte`)).toBe(true);
  for (const path of [
    "/app",
    "/app?ui=vanilla",
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
      expect(headers.origin).toBe(
        origin === "http://127.0.0.1:5173"
          ? "http://127.0.0.1:8787"
          : undefined,
      );
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
