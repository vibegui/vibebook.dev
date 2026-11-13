import { afterAll, beforeAll, expect, test } from "bun:test";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "vite";
import { uiVariantBoundary } from "../svelte/build/uiVariantBoundary";
import type { UiVariant } from "../shared/uiVariant";

let root: string;
beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "vibebook-variant-boundary-"));
  for (const directory of ["svelte", "vanilla", "shared"])
    await mkdir(join(root, directory));
  for (const directory of ["svelte", "vanilla", "shared"])
    await writeFile(
      join(root, directory, "value.ts"),
      `export const value = "${directory}";`,
    );
  await symlink(
    join(root, "svelte/value.ts"),
    join(root, "shared/preview-link.ts"),
  );
});
afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

async function compile(variant: UiVariant, source: string) {
  const entry = join(
    root,
    variant === "vanilla" ? "vanilla" : "svelte",
    "entry.ts",
  );
  await writeFile(entry, source);
  return build({
    configFile: false,
    root,
    logLevel: "silent",
    plugins: [uiVariantBoundary(root, variant)],
    resolve: {
      alias: {
        "@other": join(root, variant === "vanilla" ? "svelte" : "vanilla"),
      },
    },
    build: { write: false, minify: false, lib: { entry, formats: ["es"] } },
  });
}

test("both variants can build their own UI with shared browser-safe contracts", async () => {
  for (const variant of ["vanilla", "svelte"] as const)
    await expect(
      compile(variant, 'export { value } from "../shared/value";'),
    ).resolves.toBeDefined();
});
test("vanilla cannot acquire preview UI directly, through aliases or through a symlink", async () => {
  for (const source of [
    'export { value } from "../svelte/value";',
    'export { value } from "@other/value";',
    'export { value } from "../shared/preview-link";',
  ])
    await expect(compile("vanilla", source)).rejects.toThrow(
      "[ui-variant-boundary]",
    );
});
test("preview cannot delegate its UI to vanilla source or its runtime assets", async () => {
  for (const source of [
    'export { value } from "../vanilla/value";',
    'export { value } from "@other/value";',
    'export const fallback = () => import("/svelte/ui.js");',
  ])
    await expect(compile("svelte", source)).rejects.toThrow(
      "[ui-variant-boundary]",
    );
});
