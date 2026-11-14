import { APP_DOCUMENT_READY } from "./app-document-watch";
import { fileURLToPath } from "node:url";

type Child = { ready?: Promise<void>; exited: Promise<number>; kill(): void };
type Signals = {
  on(event: "SIGINT" | "SIGTERM", handler: () => void): unknown;
  off(event: "SIGINT" | "SIGTERM", handler: () => void): unknown;
};
export const DEVELOPMENT_READY_URLS = {
  worker: "http://127.0.0.1:8787/favicon.svg",
  vite: "http://127.0.0.1:5173/@vite/client",
} as const;
export type StartupPhase = {
  name: string;
  status: "start" | "ready" | "failed";
  elapsedMs: number;
};
class StartupChildExit extends Error {
  constructor(readonly code: number) {
    super(`Development startup build exited (${code})`);
  }
}
type DevelopmentOptions = {
  startupTimeoutMs?: number;
  probeReady?: (url: string, signal: AbortSignal) => Promise<boolean>;
  pause?: (signal: AbortSignal) => Promise<void>;
  now?: () => number;
  onPhase?: (phase: StartupPhase) => void;
};
export function startupTimeout(value?: string): number {
  const timeout = value === undefined ? 180_000 : Number(value);
  if (!Number.isInteger(timeout) || timeout <= 0 || timeout > 1_800_000)
    throw new Error("DEV_APP_STARTUP_TIMEOUT_MS must be between 1 and 1800000");
  return timeout;
}
async function probeReady(url: string, signal: AbortSignal): Promise<boolean> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.any([signal, AbortSignal.timeout(1500)]),
    });
    const ready = response.status === 200;
    await response.body?.cancel();
    return ready;
  } catch {
    return false;
  }
}
function pause(signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const done = () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", done);
      resolve();
    };
    const timer = setTimeout(done, 500);
    signal.addEventListener("abort", done, { once: true });
    if (signal.aborted) done();
  });
}

/** One bounded cold start; readiness misses never restart an owned process. */
export async function runDevelopmentProcesses(
  spawn: (cmd: string[]) => Child,
  signals: Signals = process,
  options: DevelopmentOptions = {},
): Promise<number> {
  const children = new Set<Child>();
  const startup = new AbortController();
  const timeout = startupTimeout(options.startupTimeoutMs?.toString());
  const now = options.now ?? Date.now;
  const started = now();
  const report =
    options.onPhase ??
    ((phase) => console.log(`[dev:app] ${JSON.stringify(phase)}`));
  let stopped = false;
  let failedServer: Error | null = null;
  let cancel!: (code: number) => void;
  const cancelled = new Promise<number>((resolve) => {
    cancel = resolve;
  });
  const interrupted = cancelled.then(() => {
    throw new Error("Development startup cancelled");
  });
  const deadline = new Promise<never>((_resolve, reject) => {
    startup.signal.addEventListener(
      "abort",
      () => reject(startup.signal.reason),
      { once: true },
    );
  });
  // Both promises are also observed when a signal arrives after cold start.
  void interrupted.catch(() => {});
  void deadline.catch(() => {});
  const startupTimer = setTimeout(
    () =>
      startup.abort(
        new Error(`Development startup timed out after ${timeout}ms`),
      ),
    timeout,
  );
  const stop = () => {
    stopped = true;
    cancel(130);
    startup.abort(new Error("Development startup cancelled"));
    for (const child of children) child.kill();
  };
  const start = (cmd: string[], server = false) => {
    if (failedServer) throw failedServer;
    if (stopped || startup.signal.aborted)
      throw new Error("Development startup cancelled");
    const child = spawn(cmd);
    let signalled = false;
    const owned: Child = {
      ready: child.ready,
      exited: child.exited,
      kill() {
        if (!signalled) {
          signalled = true;
          child.kill();
        }
      },
    };
    children.add(owned);
    const release = () => {
      children.delete(owned);
      owned.kill();
    };
    owned.exited = child.exited.then(
      (code) => {
        release();
        if (server)
          failedServer = new Error(
            `Development child exited during startup (${code})`,
          );
        return code;
      },
      (error) => {
        release();
        throw error;
      },
    );
    return owned;
  };
  const phase = async <T>(name: string, action: () => Promise<T>) => {
    const began = now();
    report({ name, status: "start", elapsedMs: 0 });
    try {
      const value = await action();
      report({ name, status: "ready", elapsedMs: now() - began });
      return value;
    } catch (error) {
      report({ name, status: "failed", elapsedMs: now() - began });
      throw error;
    }
  };
  const untilReady = async (url: string) => {
    // Monitor every active server throughout the wait, including an earlier
    // server dying while a later stage starts. Exit zero is still unexpected.
    const exit = Promise.race(
      Array.from(children, (child) =>
        child.exited.then((code) => {
          throw new Error(
            `Development child exited before readiness (${code})`,
          );
        }),
      ),
    );
    for (;;) {
      if (failedServer) throw failedServer;
      const ready = await Promise.race([
        (options.probeReady ?? probeReady)(url, startup.signal),
        exit,
        interrupted,
        deadline,
      ]);
      if (failedServer) throw failedServer;
      if (ready) return;
      await Promise.race([
        (options.pause ?? pause)(startup.signal),
        exit,
        interrupted,
        deadline,
      ]);
    }
  };
  signals.on("SIGINT", stop);
  signals.on("SIGTERM", stop);
  try {
    for (const task of ["build:api-types", "build:mcp"]) {
      await phase(task, async () => {
        const code = await Promise.race([
          start([process.execPath, "run", task]).exited,
          interrupted,
          deadline,
        ]);
        if (code) throw new StartupChildExit(code);
      });
    }
    const worker = start(
      [
        process.execPath,
        "x",
        "--no-install",
        "wrangler",
        "dev",
        "--ip",
        "127.0.0.1",
        "--port",
        "8787",
      ],
      true,
    );
    await phase("worker", () => untilReady(DEVELOPMENT_READY_URLS.worker));
    const vite = start(
      [
        process.execPath,
        "x",
        "--no-install",
        "vite",
        "--config",
        "svelte/vite.config.ts",
        "--mode",
        "app",
        "--clearScreen",
        "false",
      ],
      true,
    );
    await phase("vite", () => untilReady(DEVELOPMENT_READY_URLS.vite));
    const documents = start(
      [process.execPath, "scripts/app-document-watch.ts"],
      true,
    );
    await phase("app-documents", async () => {
      if (!documents.ready)
        throw new Error("App document watcher has no readiness signal");
      await Promise.race([
        documents.ready,
        ...Array.from(children, (child) =>
          child.exited.then((code) => {
            throw new Error(
              `Development child exited before app document readiness (${code})`,
            );
          }),
        ),
        interrupted,
        deadline,
      ]);
    });
    const declarations = start(
      [
        "node",
        "node_modules/@typescript/native/bin/tsc",
        "-p",
        "tsconfig.api.json",
        "--watch",
        "--preserveWatchOutput",
      ],
      true,
    );
    // Declaration watcher starts after dependency optimization; its initial
    // check runs once without competing with Worker/Vite compilation.
    clearTimeout(startupTimer);
    report({ name: "startup", status: "ready", elapsedMs: now() - started });
    return await Promise.race([
      worker.exited,
      vite.exited,
      declarations.exited,
      documents.exited,
      cancelled,
    ]);
  } catch (error) {
    if (!stopped) console.error(error);
    return stopped ? 130 : error instanceof StartupChildExit ? error.code : 1;
  } finally {
    clearTimeout(startupTimer);
    signals.off("SIGINT", stop);
    signals.off("SIGTERM", stop);
    startup.abort(new Error("Development supervisor stopped"));
    for (const child of children) child.kill();
    await Promise.allSettled(Array.from(children, (child) => child.exited));
  }
}
if (import.meta.main) {
  const cwd = fileURLToPath(new URL("..", import.meta.url));
  process.exit(
    await runDevelopmentProcesses(
      (cmd) => {
        const grouped = process.platform !== "win32";
        const documentWatcher = cmd.includes("scripts/app-document-watch.ts");
        const child = Bun.spawn(cmd, {
          cwd,
          stdout: documentWatcher ? "pipe" : "inherit",
          stderr: "inherit",
          detached: grouped,
        });
        let ready: Promise<void> | undefined;
        if (documentWatcher)
          ready = new Promise((resolve, reject) => {
            void (async () => {
              if (!child.stdout || typeof child.stdout === "number")
                throw new Error("Missing generator stdout");
              const reader = child.stdout.getReader();
              const decoder = new TextDecoder();
              let line = "",
                seen = false;
              for (;;) {
                const { done, value } = await reader.read();
                if (done) break;
                process.stdout.write(value);
                line += decoder.decode(value, { stream: true });
                let index;
                while ((index = line.indexOf("\n")) !== -1) {
                  if (line.slice(0, index).trimEnd() === APP_DOCUMENT_READY) {
                    seen = true;
                    resolve();
                  }
                  line = line.slice(index + 1);
                }
                if (line.length > 65536)
                  throw new Error("Generator readiness line exceeded bound");
              }
              if (!seen) throw new Error("Generator exited before readiness");
            })().catch(reject);
          });
        return {
          ready,
          exited: child.exited,
          kill() {
            if (!grouped) {
              child.kill();
              return;
            }
            // Kill the owned group, including Bun-run/bunx launchers' descendants.
            try {
              process.kill(-child.pid, "SIGTERM");
            } catch (error) {
              if ((error as NodeJS.ErrnoException).code !== "ESRCH")
                console.error(error);
            }
          },
        };
      },
      process,
      {
        startupTimeoutMs: startupTimeout(
          process.env.DEV_APP_STARTUP_TIMEOUT_MS,
        ),
      },
    ),
  );
}
