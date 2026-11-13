import { afterAll, beforeAll, expect, test } from "bun:test";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createClientBoundaryPolicy } from "../svelte/build/clientBoundary";

let root: string;
beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "vb-production-policy-"));
  for (const path of [
    "client",
    ".wrangler/qa-test",
    "scripts",
    "svelte/build",
    "shared",
    "node_modules/package/scripts",
  ])
    await mkdir(join(root, path), { recursive: true });
  await writeFile(
    join(root, ".wrangler/qa-test/index.js"),
    "SYNTHETIC_BACKEND_BUNDLE",
  );
  await writeFile(join(root, "scripts/build.ts"), "SYNTHETIC_BUILD_TOOL");
  await symlink(
    join(root, ".wrangler/qa-test/index.js"),
    join(root, "shared/font.woff2"),
  );
  await symlink(join(root, "scripts/build.ts"), join(root, "shared/tool.ts"));
});
afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

test("shared browser policy refuses generated backend strings, tooling and symlink assets", () => {
  const { assertClient } = createClientBoundaryPolicy({ projectRoot: root });
  for (const path of [
    ".wrangler/qa-test/index.js",
    ".wrangler/tmp/bundle.js",
    ".api-types/src/api.d.ts",
    "scripts/build.ts",
    "cli/vibebook.ts",
    "svelte/build/uiVersion.ts",
    "svelte/vite.config.ts",
    "svelte/tsconfig.json",
    "wrangler.qa.jsonc",
    "wrangler.toml",
    "shared/private.key",
    "shared/private.pem",
    "package.json",
    "shared/font.woff2",
    "shared/tool.ts",
  ])
    for (const query of ["", "?raw", "?url"])
      expect(() => assertClient(join(root, path) + query)).toThrow(
        "[client-boundary]",
      );
  expect(() =>
    assertClient("../scripts/build.ts?raw", join(root, "client/main.ts")),
  ).toThrow("[client-boundary]");
});

test("browser roots, temporary entries and package-internal tooling names remain valid", () => {
  const { assertClient } = createClientBoundaryPolicy({ projectRoot: root });
  for (const path of [
    "client/main.ts",
    "shared/value.ts",
    "shared/.browser-value.ts",
    "svelte/Chat.svelte",
    "collab/editor.ts",
    "mcp-app/app.ts",
    "public/vendor.js",
    "node_modules/package/scripts/browser.js",
    "node_modules/package/vite.config.js",
  ])
    expect(() => assertClient(join(root, path))).not.toThrow();
});
