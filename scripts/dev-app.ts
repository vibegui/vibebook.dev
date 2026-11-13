import { fileURLToPath } from "node:url";

type Child = { exited: Promise<number>; kill(): void };
type Signals = {
  on(event: "SIGINT" | "SIGTERM", handler: () => void): unknown;
  off(event: "SIGINT" | "SIGTERM", handler: () => void): unknown;
};

/** Own children before the first awaited build, including startup cancellation. */
export async function runDevelopmentProcesses(
  spawn: (cmd: string[]) => Child,
  signals: Signals = process,
): Promise<number> {
  const children: Child[] = [];
  let stopped = false;
  let cancel!: (code: number) => void;
  const cancelled = new Promise<number>((resolve) => {
    cancel = resolve;
  });
  const stop = () => {
    stopped = true;
    cancel(130);
    for (const child of children) child.kill();
  };
  const start = (cmd: string[]) => {
    if (stopped) throw new Error("Development startup cancelled");
    const child = spawn(cmd);
    children.push(child);
    return child;
  };
  signals.on("SIGINT", stop);
  signals.on("SIGTERM", stop);
  try {
    for (const task of ["build:api-types", "build:mcp"]) {
      const code = await Promise.race([
        start([process.execPath, "run", task]).exited,
        cancelled,
      ]);
      if (code || stopped) return code || 130;
    }
    const watchers = [
      [
        "node",
        "node_modules/@typescript/native/bin/tsc",
        "-p",
        "tsconfig.api.json",
        "--watch",
        "--preserveWatchOutput",
      ],
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
    ].map(start);
    return await Promise.race([
      ...watchers.map((child) => child.exited),
      cancelled,
    ]);
  } catch (error) {
    if (!stopped) console.error(error);
    return stopped ? 130 : 1;
  } finally {
    signals.off("SIGINT", stop);
    signals.off("SIGTERM", stop);
    for (const child of children) child.kill();
    await Promise.allSettled(children.map((child) => child.exited));
  }
}

if (import.meta.main) {
  const cwd = fileURLToPath(new URL("..", import.meta.url));
  process.exit(
    await runDevelopmentProcesses((cmd) => {
      const grouped = process.platform !== "win32";
      const child = Bun.spawn(cmd, {
        cwd,
        stdout: "inherit",
        stderr: "inherit",
        detached: grouped,
      });
      return {
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
    }),
  );
}
