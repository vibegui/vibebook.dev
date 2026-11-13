import { fileURLToPath } from "node:url";

// One foreground command owns every watcher and cleans them up together.
const cwd = fileURLToPath(new URL("..", import.meta.url));
const bun = process.execPath;
const types = Bun.spawn([bun, "run", "build:api-types"], {
  cwd,
  stdout: "inherit",
  stderr: "inherit",
});
if (await types.exited) process.exit(1);
const children = [
  [
    "node",
    "node_modules/@typescript/native/bin/tsc",
    "-p",
    "tsconfig.api.json",
    "--watch",
    "--preserveWatchOutput",
  ],
  [bun, "run", "build:mcp"],
].map((cmd) => Bun.spawn(cmd, { cwd, stdout: "inherit", stderr: "inherit" }));
if (await children[1]!.exited) {
  children[0]!.kill();
  process.exit(1);
}
children.pop();
for (const args of [
  ["wrangler", "dev", "--ip", "127.0.0.1", "--port", "8787"],
  [
    "vite",
    "--config",
    "svelte/vite.config.ts",
    "--mode",
    "app",
    "--clearScreen",
    "false",
  ],
])
  children.push(
    Bun.spawn([bun, "x", "--no-install", ...args], {
      cwd,
      stdout: "inherit",
      stderr: "inherit",
    }),
  );
let stopping = false;
const stop = () => {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
const code = await Promise.race(children.map((child) => child.exited));
stop();
await Promise.all(children.map((child) => child.exited));
process.exit(code);
