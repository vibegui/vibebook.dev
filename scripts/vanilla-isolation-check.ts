import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import { build } from "vite";
import { projectRoot } from "../svelte/build/clientBoundary";

const protectedAssets = ["app.html", "svelte/ui.js", "collab.js", "sw.js"];
async function fingerprints() {
  return Promise.all(
    protectedAssets.map(async (path) => ({
      path,
      sha256: createHash("sha256")
        .update(await readFile(join(projectRoot, "public", path)))
        .digest("hex"),
    })),
  );
}
const before = await fingerprints();
const out = await mkdtemp(join(tmpdir(), "vibebook-vanilla-build-"));
const modules = new Set<string>();
try {
  await build({
    configFile: join(projectRoot, "svelte/vite.config.ts"),
    mode: "vanilla",
    logLevel: "silent",
    plugins: [
      {
        name: "capture-vanilla-ui-modules",
        moduleParsed(info) {
          modules.add(info.id);
        },
      },
    ],
    build: { outDir: out, emptyOutDir: true },
  });
  const owned = [...modules]
    .filter((id) => !id.includes("node_modules") && id.startsWith(projectRoot))
    .map((id) => relative(projectRoot, id))
    .sort();
  assert(
    owned.includes("vanilla/inbox/Inbox.svelte"),
    "Vanilla must compile its preserved component source",
  );
  assert(
    !owned.some((path) => path.startsWith("svelte/")),
    "Vanilla must not import preview UI source",
  );
  assert.deepEqual(
    await fingerprints(),
    before,
    "A vanilla verification build cannot rewrite deployed default assets",
  );
  const js = await readFile(join(out, "ui.js"));
  const evidence = {
    mode: "vanilla",
    entry: "vanilla/inbox/main.ts",
    ownedModules: owned,
    rawBytes: js.length,
    gzipBytes: gzipSync(js).length,
    protectedAssets: before,
  };
  if (process.argv.includes("--record")) {
    await mkdir(resolve(projectRoot, "docs/svelte-migration"), {
      recursive: true,
    });
    await writeFile(
      resolve(projectRoot, "docs/svelte-migration/vanilla-build.json"),
      JSON.stringify(evidence, null, 2) + "\n",
    );
  }
  console.log(
    `PASS independent vanilla Inbox build (${owned.length} owned modules, ${evidence.gzipBytes} gzip bytes); default assets preserved`,
  );
} finally {
  await rm(out, { recursive: true, force: true });
}
