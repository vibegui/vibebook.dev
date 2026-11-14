import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "vite";
import { clientBoundary } from "../svelte/build/clientBoundary";

// Real nested browser builds, using the production default worker plugin setup:
// no worker.plugins override. A parent-only module fixture cannot prove these edges.
const root = await mkdtemp(join(tmpdir(), "vibebook-worker-boundary-"));
const entry = join(root, "client/main.ts");
const backendSentinel = "SYNTHETIC_BACKEND_WORKER_MUST_NEVER_SHIP";
try {
  for (const directory of ["client", "shared", "src", "packages/server-only"])
    await mkdir(join(root, directory), { recursive: true });
  await writeFile(
    join(root, "src/private.ts"),
    `export const value = ${JSON.stringify(backendSentinel)};`,
  );
  await writeFile(
    join(root, "shared/value.ts"),
    'export const value = "shared-worker-safe";',
  );
  await writeFile(
    join(root, "shared/transitive.ts"),
    'export { value } from "../src/private";',
  );
  await writeFile(
    join(root, "shared/aliased-worker.ts"),
    'import { value } from "@backend/private"; self.postMessage(value);',
  );

  async function compile(
    constructor: "Worker" | "SharedWorker",
    workerSource: string,
    url = "./worker.ts",
  ) {
    await writeFile(join(root, "client/worker.ts"), workerSource);
    await writeFile(
      entry,
      `export const worker = new ${constructor}(new URL(${JSON.stringify(url)}, import.meta.url), { type: "module" });`,
    );
    return build({
      configFile: false,
      root: join(root, "client"),
      logLevel: "silent",
      plugins: [clientBoundary({ projectRoot: root })],
      resolve: {
        alias: {
          "@backend": join(root, "src"),
          "@worker-target": join(root, "shared/aliased-worker.ts"),
        },
      },
      // ES workers permit the dynamic graph case; security must hold whether
      // the browser worker is emitted inline or as independent module chunks.
      worker: { format: "es" },
      build: { write: false, minify: false, lib: { entry, formats: ["es"] } },
    });
  }
  for (const constructor of ["Worker", "SharedWorker"] as const) {
    const positive = await compile(
      constructor,
      'import { value } from "../shared/value"; self.postMessage(value);',
    );
    const outputs = (Array.isArray(positive) ? positive : [positive]).flatMap(
      (result) => {
        assert("output" in result);
        return result.output;
      },
    );
    const code = outputs
      .map((item) =>
        item.type === "chunk"
          ? item.code
          : typeof item.source === "string"
            ? item.source
            : new TextDecoder().decode(item.source),
      )
      .join("\n");
    assert(
      code.includes("shared-worker-safe"),
      "The positive must actually emit its worker graph",
    );
    assert(!code.includes(backendSentinel));
    console.log(`PASS ${constructor} shared pure worker graph`);
    const forbidden = [
      ["backend entry URL", "", "../src/private.ts"],
      [
        "transitive backend graph",
        'import { value } from "../shared/transitive"; self.postMessage(value);',
        "./worker.ts",
      ],
      [
        "dynamic backend graph",
        'void import("../src/private").then(module => self.postMessage(module.value));',
        "./worker.ts",
      ],
      [
        "server-only marker graph",
        'import "server-only"; self.postMessage("marked");',
        "./worker.ts",
      ],
      [
        "alias-resolved backend graph",
        'import { value } from "@backend/private"; self.postMessage(value);',
        "./worker.ts",
      ],
      ["alias-resolved worker URL", "", "@worker-target"],
    ] as const;
    for (const [name, source, url] of forbidden) {
      await assert.rejects(
        compile(constructor, source, url),
        /\[client-boundary\]/,
        `${constructor} ${name} must reject before browser output`,
      );
      console.log(`PASS ${constructor} rejects ${name}`);
    }
  }
} finally {
  await rm(root, { recursive: true, force: true });
}
