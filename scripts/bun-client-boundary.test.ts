import { afterAll, beforeAll, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildBrowser } from "./browser-build";
import { buildCollab } from "./build-collab";
import { buildMcp } from "./build-mcp";

let root: string;
let entrypoint: string;
const backendSentinel = "SYNTHETIC_BACKEND_MUST_NEVER_SHIP";

beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "vibebook-bun-boundary-"));
  entrypoint = join(root, "client/main.ts");
  for (const directory of [
    "client",
    "src",
    "shared",
    "packages/server-only",
    ".wrangler/qa-generated",
    "scripts",
  ]) {
    await mkdir(join(root, directory), { recursive: true });
  }
  await writeFile(
    join(root, ".wrangler/qa-generated/index.js"),
    'export const value = "GENERATED_BACKEND_MUST_NEVER_SHIP";',
  );
  await writeFile(
    join(root, ".wrangler/qa-generated/style.css"),
    '.probe { --value: "GENERATED_BACKEND_MUST_NEVER_SHIP"; }',
  );
  await writeFile(
    join(root, "scripts/build.ts"),
    'export const value = "TOOLING_MUST_NEVER_SHIP";',
  );
  await symlink(
    join(root, ".wrangler/qa-generated/index.js"),
    join(root, "shared/generated.woff2"),
  );
  await writeFile(
    join(root, "src/private.ts"),
    `export type Contract = { id: string }; export const value = ${JSON.stringify(backendSentinel)};`,
  );
  await writeFile(
    join(root, "shared/value.ts"),
    'export const value = "browser-safe";',
  );
  await writeFile(
    join(root, "shared/transitive.ts"),
    'export { value } from "../src/private";',
  );
  await writeFile(
    join(root, "shared/marked.ts"),
    'import "server-only"; export const value = 1;',
  );
  await writeFile(
    join(root, "shared/private.server.ts"),
    'export const value = "private";',
  );
  // All credential-like files are synthetic; tests never inspect repository secrets.
  await writeFile(join(root, ".dev.vars"), "SYNTHETIC_PRIVATE_CONFIGURATION");
  await writeFile(
    join(root, "src/private.css"),
    `.probe {--backend-probe:"${backendSentinel}"}`,
  );
  await writeFile(
    join(root, "shared/nested.css"),
    '@import "../src/private.css";',
  );
  await writeFile(
    join(root, "shared/public-font.woff2"),
    "SYNTHETIC_PUBLIC_FONT",
  );
  await symlink(join(root, ".dev.vars"), join(root, "shared/font-link.woff2"));
  await symlink(join(root, "src/private.ts"), join(root, "shared/link.ts"));
  await writeFile(
    join(root, "client/template.html"),
    "<html><!-- APP --></html>",
  );
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

test("Bun allows shared runtime values and erases backend type imports", async () => {
  await writeFile(
    entrypoint,
    'import type { Contract } from "../src/private"; import { value } from "../shared/value"; export const result: Contract = { id: value };',
  );
  const result = await buildBrowser({ entrypoints: [entrypoint] }, root);
  const code = await result.outputs[0].text();
  expect(code).toContain("browser-safe");
  expect(code).not.toContain(backendSentinel);
});

const forbidden = [
  [
    "generated backend bundle",
    'export { value } from "../.wrangler/qa-generated/index.js";',
  ],
  [
    "generated backend string",
    'import value from "../.wrangler/qa-generated/index.js?raw"; export { value };',
  ],
  ["project tooling", 'export { value } from "../scripts/build.ts";'],
  ["backend", 'export { value } from "../src/private";'],
  ["transitive backend", 'export { value } from "../shared/transitive";'],
  ["symlinked backend", 'export { value } from "../shared/link";'],
  ["server marker", 'export { value } from "../shared/marked";'],
  ["server suffix", 'export { value } from "../shared/private.server";'],
  ["dynamic backend", 'export const load = () => import("../src/private");'],
  ["Node runtime", 'export { readFile } from "node:fs";'],
  ["Worker runtime", 'export { DurableObject } from "cloudflare:workers";'],
  [
    "private configuration",
    'import value from "../.dev.vars"; export { value };',
  ],
] as const;

for (const [name, source] of forbidden) {
  test(`Bun rejects ${name} before browser output`, async () => {
    await writeFile(entrypoint, source);
    await expect(
      buildBrowser({ entrypoints: [entrypoint] }, root),
    ).rejects.toThrow("[client-boundary]");
  });
}

for (const [name, css] of [
  [
    "generated backend URL",
    '.probe{background:url("../.wrangler/qa-generated/index.js")}',
  ],
  ["generated backend CSS", '@import "../.wrangler/qa-generated/style.css";'],
  [
    "generated backend symlink font",
    '@font-face{font-family:"probe";src:url("../shared/generated.woff2")}',
  ],
  [
    "private font URL",
    '@font-face{font-family:"probe";src:url("../.dev.vars")}',
  ],
  ["backend asset URL", '.probe{background:url("../src/private.ts")}'],
  ["nested backend CSS import", '@import "../shared/nested.css";'],
  [
    "private font symlink",
    '@font-face{font-family:"probe";src:url("../shared/font-link.woff2")}',
  ],
]) {
  test(`Bun rejects CSS ${name} before browser output`, async () => {
    await writeFile(join(root, "client/style.css"), css!);
    await writeFile(
      entrypoint,
      'import "./style.css"; export const value = 1;',
    );
    await expect(
      buildBrowser({ entrypoints: [entrypoint] }, root),
    ).rejects.toThrow("[client-boundary]");
  });
}

test("Bun permits a browser-safe CSS font without private markers", async () => {
  await writeFile(
    join(root, "client/style.css"),
    '@font-face{font-family:"public";src:url("../shared/public-font.woff2")}',
  );
  await writeFile(entrypoint, 'import "./style.css"; export const value = 1;');
  const result = await buildBrowser({ entrypoints: [entrypoint] }, root);
  const output = (
    await Promise.all(result.outputs.map((file) => file.text()))
  ).join("\n");
  expect(result.success).toBe(true);
  expect(output).not.toContain(backendSentinel);
  expect(output).not.toContain("SYNTHETIC_PRIVATE_CONFIGURATION");
});

test("production editor build configuration enforces the boundary", async () => {
  await writeFile(entrypoint, 'export { value } from "../src/private";');
  await expect(
    buildCollab({ root, entrypoint, outfile: join(root, "collab.js") }),
  ).rejects.toThrow("[client-boundary]");
  expect(await Bun.file(join(root, "collab.js")).exists()).toBe(false);
});

test("production MCP build configuration enforces the boundary", async () => {
  await writeFile(entrypoint, 'export { value } from "../shared/transitive";');
  await expect(
    buildMcp({
      root,
      entrypoint,
      template: join(root, "client/template.html"),
      outfile: join(root, "mcp.html"),
    }),
  ).rejects.toThrow("[client-boundary]");
  expect(await Bun.file(join(root, "mcp.html")).exists()).toBe(false);
});

test("production MCP build keeps its self-contained HTML output", async () => {
  await writeFile(entrypoint, 'document.title = "browser-safe </script>";');
  const outfile = join(root, "mcp.html");
  const html = await buildMcp({
    root,
    entrypoint,
    template: join(root, "client/template.html"),
    outfile,
  });
  expect(html).toContain('<script type="module">');
  expect(html).not.toContain("<!-- APP -->");
  expect(html).toContain("<\\/script>");
  expect(await Bun.file(outfile).text()).toBe(html);
});

test("production editor build writes the standalone browser bundle", async () => {
  await writeFile(entrypoint, 'export const value = "browser-safe";');
  const outfile = join(root, "collab.js");
  await buildCollab({ root, entrypoint, outfile });
  expect(await Bun.file(outfile).text()).toContain("browser-safe");
});
