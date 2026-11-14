// Dedicated disposable GitHub-runner orchestration. Never deploys, reuses a
// developer secret file, seeds SQL, or starts Vite beside the real Worker.
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { openSync, closeSync } from "node:fs";
import { mkdir, writeFile, unlink, readFile, open } from "node:fs/promises";
import { resolve } from "node:path";
import { MeResult } from "../shared/schemas";
import { record } from "../shared/validation";

async function runtimeDiagnostic() {
  const packages: Record<string,string|null> = {};
  for (const name of ["wrangler","miniflare","workerd"]) {
    try { const value: unknown=JSON.parse(await readFile(resolve(root,"node_modules",name,"package.json"),"utf8")); packages[name]=record(value)&&typeof value.version==="string"&&/^[\w.+-]{1,80}$/.test(value.version)?value.version:null; }
    catch { packages[name]=null; }
  }
  const config=await readFile(resolve(root,"wrangler.jsonc"),"utf8");
  const requestedDate=/"compatibility_date"\s*:\s*"(\d{4}-\d{2}-\d{2})"/.exec(config)?.[1]??null;
  const file=await open(resolve(privateDirectory,"worker.log"),"r");
  try {
    const bytes=Buffer.alloc(64*1024),result=await file.read(bytes,0,bytes.length,0),size=(await file.stat()).size;
    const warnings=bytes.subarray(0,result.bytesRead).toString("utf8").split(/\r?\n/).filter(line=>/compatibility/i.test(line)&&/supported|unsupported|falling back|requested|specified/i.test(line)).slice(0,8).map(line=>({dates:[...line.matchAll(/\b\d{4}-\d{2}-\d{2}\b/g)].map(match=>match[0]).slice(0,8),fallback:/falling back|fallback/i.test(line)}));
    return {packages,requestedDate,workerLogHeadBytes:result.bytesRead,workerLogHeadTruncated:size>result.bytesRead,compatibilityWarnings:warnings};
  } finally { await file.close(); }
}

assert(
  process.env.CI === "true",
  "Managed Worker runner is CI-only; run the browser harness against an existing disposable Worker locally",
);
assert(process.platform === "linux", "Dedicated Ubuntu job required");
const root = resolve(import.meta.dirname, ".."),
  reportDirectory = resolve(
    process.env.TEST_OUTPUT_DIR ??
      resolve(root, ".artifacts/native-application-browser/report"),
  );
const privateDirectory = resolve(
    root,
    ".artifacts/native-application-browser/private",
  ),
  devVars = resolve(root, ".dev.vars"),
  base = "http://127.0.0.1:8797";
const devEmail = `native-ci-default-${randomBytes(6).toString("hex")}@example.test`,
  cleanupErrors: string[] = [];
const children = new Set<{
    pid: number;
    exited: Promise<number>;
    stop(signal?: NodeJS.Signals): void;
  }>(),
  abort = new AbortController();
let stopped = false,
  ownedVars = false,
  failure: unknown = null;
const stop = () => {
  stopped = true;
  abort.abort();
  for (const child of children) child.stop();
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
const phases: { name: string; status: string; ms: number }[] = [];
function spawn(
  command: string[],
  log: string,
  env: Record<string, string | undefined> = process.env,
) {
  if (stopped) throw Error("Runner stopped before spawn");
  const actual = (() => {
    const fd = openSync(log, "w");
    try {
      return Bun.spawn(command, {
        cwd: root,
        env,
        stdin: "ignore",
        stdout: fd,
        stderr: fd,
        detached: true,
      });
    } finally {
      closeSync(fd);
    }
  })();
  const owned = {
    pid: actual.pid,
    exited: actual.exited,
    stop(signal: NodeJS.Signals = "SIGTERM") {
      if (!children.has(owned)) return;
      try {
        process.kill(-owned.pid, signal);
      } catch (error) {
        const code =
          error instanceof Error &&
          "code" in error &&
          typeof error.code === "string"
            ? error.code
            : "UnknownCleanupError";
        if (code !== "ESRCH") cleanupErrors.push(code);
      }
    },
  };
  children.add(owned);
  // Reap descendants while this group is still owned, then release the PGID.
  void actual.exited.then(() => {
    owned.stop();
    children.delete(owned);
  });
  return owned;
}
async function phase(name: string, run: () => Promise<void>) {
  const item = { name, status: "running", ms: 0 };
  phases.push(item);
  const started = Date.now();
  try {
    await run();
    item.status = "passed";
  } catch (error) {
    item.status = "failed";
    throw error;
  } finally {
    item.ms = Date.now() - started;
  }
}
async function pause() {
  await new Promise<void>((resolve) => {
    const timer = setTimeout(done, 500);
    function done() {
      clearTimeout(timer);
      abort.signal.removeEventListener("abort", done);
      resolve();
    }
    abort.signal.addEventListener("abort", done, { once: true });
    if (abort.signal.aborted) done();
  });
}
try {
  await mkdir(reportDirectory, { recursive: true });
  await mkdir(privateDirectory, { recursive: true });
  await writeFile(
    devVars,
    `DEV_EMAIL=${devEmail}\nSESSION_SECRET=${randomBytes(32).toString("hex")}\nMODEL_ROUTE=off\nMODEL_CLASSIFY=off\nMODEL_FAST=off\nMODEL_JUDGE=off\n`,
    { flag: "wx", mode: 0o600 },
  );
  ownedVars = true;
  const worker = spawn(
    [
      process.execPath,
      "x",
      "--no-install",
      "wrangler",
      "dev",
      "--local",
      "--ip",
      "127.0.0.1",
      "--port",
      "8797",
      "--persist-to",
      resolve(privateDirectory, "worker-state"),
    ],
    resolve(privateDirectory, "worker.log"),
  );
  let workerExit: number | null = null;
  void worker.exited.then((code) => {
    workerExit = code;
  });
  await phase("real Worker readiness and ensureSchema", async () => {
    const until = Date.now() + 180_000;
    while (!stopped && Date.now() < until) {
      if (workerExit !== null)
        throw Error("Owned Worker exited before readiness");
      try {
        const response = await fetch(`${base}/api/me?ui=svelte`, {
          signal: AbortSignal.any([abort.signal, AbortSignal.timeout(2000)]),
        });
        if (response.ok) {
          const me = MeResult.parse(await response.json());
          assert.equal(me.email, devEmail);
          return;
        }
        await response.body?.cancel();
      } catch {
        if (stopped) throw Error("Readiness interrupted");
      }
      await pause();
    }
    throw Error("Real Worker readiness deadline");
  });
  await phase("integrated NativeApplication browser", async () => {
    const test = spawn(
      [process.execPath, "scripts/native-application-browser.ts"],
      resolve(reportDirectory, "browser.log"),
      { ...process.env, TEST_BASE_URL: base, TEST_OUTPUT_DIR: reportDirectory },
    );
    const timer = setTimeout(stop, 12 * 60_000);
    try {
      const result = await Promise.race([
        test.exited,
        worker.exited.then(() => {
          throw Error("Worker exited during browser cohort");
        }),
      ]);
      assert.equal(result, 0, "Integrated browser gate failed");
    } finally {
      clearTimeout(timer);
    }
  });
} catch (error) {
  failure = {
    name: error instanceof Error ? error.name : "UnknownError",
    phase: phases.at(-1)?.name ?? "startup",
  };
  process.exitCode = stopped ? 130 : 1;
} finally {
  stop();
  const active = [...children];
  const timer = setTimeout(() => {
    for (const child of children) child.stop("SIGKILL");
  }, 5000);
  await Promise.allSettled(active.map((child) => child.exited));
  clearTimeout(timer);
  if (ownedVars) await unlink(devVars);
  process.off("SIGINT", stop);
  process.off("SIGTERM", stop);
  if (cleanupErrors.length) process.exitCode = 1;
  await mkdir(reportDirectory, { recursive: true });
  let runtime: unknown;
  try { runtime=await runtimeDiagnostic(); }
  catch(error) { runtime={diagnosticError:error instanceof Error?error.name:"UnknownError"}; }
  await writeFile(
    resolve(reportDirectory, "runner.json"),
    JSON.stringify(
      {
        status: failure || cleanupErrors.length ? "failed" : "passed",
        phases,
        failure,
        cleanupErrors,
        remainingOwnedGroups: children.size,
        runtime,
        scope:
          "Disposable loopback local Worker; private raw Worker log and storage are intentionally excluded from artifact upload",
      },
      null,
      2,
    ),
  );
}
