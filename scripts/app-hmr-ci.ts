// Dedicated disposable Ubuntu runner. The harness owns dev:app's real process
// tree; this wrapper owns only its synthetic variables and harness process.
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { access, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

assert(
  process.env.CI === "true" && process.platform === "linux",
  "HMR managed runner is CI-only on Linux",
);
const root = resolve(import.meta.dirname, ".."),
  output = resolve(
    process.env.TEST_OUTPUT_DIR ?? resolve(root, ".artifacts/app-hmr/report"),
  ),
  vars = resolve(root, ".dev.vars");
const syntheticVars = `DEV_EMAIL=hmr-ci-${randomBytes(6).toString("hex")}@example.test\nSESSION_SECRET=${randomBytes(32).toString("hex")}\nMODEL_ROUTE=off\nMODEL_CLASSIFY=off\nMODEL_FAST=off\nMODEL_JUDGE=off\n`;
let ownedVars = false,
  child:
    | { exited: Promise<number>; kill(signal?: NodeJS.Signals): void }
    | undefined,
  interrupted = false;
const cleanupErrors: string[] = [];
const stop = () => {
  interrupted = true;
  try {
    child?.kill("SIGTERM");
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ESRCH"))
      cleanupErrors.push("Harness signal delivery failed");
  }
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
try {
  await mkdir(output, { recursive: true });
  const hasState = await access(resolve(root, ".wrangler/state")).then(
    () => true,
    () => false,
  );
  assert(
    !hasState,
    "Use an isolated fresh checkout; never reuse existing local Worker state",
  );
  await writeFile(vars, syntheticVars, { flag: "wx", mode: 0o600 });
  ownedVars = true;
  child = Bun.spawn([process.execPath, "run", "test:app-hmr"], {
    cwd: root,
    stdin: "ignore",
    stdout: "inherit",
    stderr: "inherit",
    env: {
      ...process.env,
      TEST_OUTPUT_DIR: output,
      WRANGLER_SEND_METRICS: "false",
      X_LOCAL_EXPLORER: "false",
      OBSERVABILITY: "false",
    },
  });
  const code = await child.exited;
  child = undefined;
  process.exitCode = interrupted ? 130 : code;
} finally {
  process.off("SIGINT", stop);
  process.off("SIGTERM", stop);
  if (ownedVars) {
    // Never overwrite/remove a concurrent editor's replacement.
    if ((await readFile(vars, "utf8").catch(() => null)) === syntheticVars)
      await unlink(vars);
    else
      cleanupErrors.push(
        "Synthetic variables changed unexpectedly; preserved for manual recovery",
      );
  }
  await mkdir(output, { recursive: true });
  await writeFile(
    resolve(output, "runner.json"),
    JSON.stringify(
      {
        interrupted,
        cleanupErrors,
        scope:
          "Isolated real dev:app; private vars, Worker state, raw child logs and source backups are excluded from artifact upload",
      },
      null,
      2,
    ) + "\n",
  );
  if (cleanupErrors.length) throw Error(cleanupErrors.join("; "));
}
