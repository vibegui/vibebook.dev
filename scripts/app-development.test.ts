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
