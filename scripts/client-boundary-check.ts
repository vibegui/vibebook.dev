import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { clientBoundary, projectRoot } from "../svelte/build/clientBoundary";

// Real Vite graph builds: these exercise resolution, aliases, transitive imports and type erasure.
const root = await mkdtemp(join(tmpdir(), "vibebook-client-boundary-"));
const entry = join(root, "client/main.ts");
const backendSentinel = "BACKEND_VALUE_MUST_NEVER_SHIP";
const privateSentinel = "FAKE_PRIVATE_CONFIG_MUST_NEVER_SHIP";
try {
  for (const path of [
    "client",
    "public/fonts",
    "src",
    "shared/server",
    "packages/server-only",
    "node_modules/browser-helper/server",
    ".git",
    ".ssh",
    ".vibebook",
  ])
    await mkdir(join(root, path), { recursive: true });
  await writeFile(
    join(root, "src/private.ts"),
    `export type Contract = { id: string }; export const value = ${JSON.stringify(backendSentinel)};`,
  );
  await writeFile(
    join(root, "src/private.css"),
    `.backend { --probe: "${backendSentinel}"; }`,
  );
  await writeFile(
    join(root, "shared/nested.css"),
    '@import "../src/private.css";',
  );
  await writeFile(
    join(root, "shared/public-font.woff2"),
    "FAKE_PUBLIC_FONT_ALLOWED",
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
    'import "server-only"; export const value = "marked";',
  );
  await writeFile(
    join(root, "shared/secret.server.ts"),
    'export const value = "server-file";',
  );
  await writeFile(
    join(root, "shared/server/value.ts"),
    'export const value = "server-directory";',
  );
  await symlink(join(root, "src/private.ts"), join(root, "shared/link.ts"));
  // Every private-file fixture is synthetic and isolated from the repository's real configuration.
  for (const file of [
    ".env",
    ".env.production",
    ".dev.vars",
    ".dev.vars.local",
    ".git/config",
    ".ssh/config",
    ".vibebook/config",
  ]) {
    await writeFile(join(root, file), privateSentinel);
  }
  await writeFile(
    join(root, "shared/private-config.ts"),
    'export { default as value } from "../.dev.vars?raw";',
  );
  await writeFile(
    join(root, "shared/.browser-value.ts"),
    'export const value = "safe-dotfile";',
  );
  await writeFile(
    join(root, "node_modules/browser-helper/server/value.js"),
    'export const value = "browser-safe-dependency";',
  );
  await symlink(join(root, ".dev.vars"), join(root, "shared/config-link.txt"));
  const compile = async (
    source: string,
    external: string[] = [],
    withTailwind = false,
  ) => {
    await writeFile(entry, source);
    return build({
      configFile: false,
      root: join(root, "client"),
      publicDir: join(root, "public"),
      logLevel: "silent",
      plugins: [
        clientBoundary({ projectRoot: root }),
        ...(withTailwind ? [tailwindcss()] : []),
      ],
      resolve: {
        alias: [
          {
            find: "tailwindcss",
            replacement: join(
              projectRoot,
              "node_modules/tailwindcss/index.css",
            ),
          },
          { find: "@backend", replacement: join(root, "src") },
          {
            find: /^@configuration(?=\?|$)/,
            replacement: join(root, ".dev.vars"),
          },
        ],
      },
      build: {
        write: false,
        minify: false,
        lib: { entry, formats: ["es"], cssFileName: "fixture" },
        rolldownOptions: { external },
      },
    });
  };
  const positive = await compile(
    'import type { Contract } from "../src/private"; import { value } from "../shared/value"; export const result: Contract = { id: value };',
  );
  const output = Array.isArray(positive) ? positive : [positive];
  const code = output
    .flatMap((result) => {
      assert(
        "output" in result,
        "fixtures must produce a bundle, not a watcher",
      );
      return result.output;
    })
    .filter((chunk) => chunk.type === "chunk")
    .map((chunk) => chunk.code)
    .join("\n");
  assert(code.includes("browser-safe"));
  assert(!code.includes(backendSentinel));
  console.log("PASS shared runtime values and erased backend type imports");
  await compile(
    'import { value } from "../shared/.browser-value"; export { value }; export const mode = import.meta.env.MODE;',
  );
  console.log("PASS browser-safe dotfiles and import.meta.env");
  await compile(
    'export { value } from "../node_modules/browser-helper/server/value.js";',
  );
  console.log(
    "PASS browser-safe dependency helpers in a package server directory",
  );
  const cases = [
    ["direct backend import", 'export { value } from "../src/private";'],
    [
      "raw backend source import",
      'import source from "../src/private.ts?raw"; export { source };',
    ],
    [
      "backend URL asset import",
      'import source from "../src/private.ts?url"; export { source };',
    ],
    [
      "transitive backend import",
      'export { value } from "../shared/transitive";',
    ],
    ["backend alias", 'export { value } from "@backend/private";'],
    ["backend symlink", 'export { value } from "../shared/link";'],
    ["server-only marker", 'export { value } from "../shared/marked";'],
    ["server file suffix", 'export { value } from "../shared/secret.server";'],
    [
      "project server directory",
      'export { value } from "../shared/server/value";',
    ],
    [
      "dynamic backend import",
      'export const load = () => import("../src/private");',
    ],
    ["Node runtime", 'export { readFile } from "node:fs";'],
    ["Worker runtime", 'export { DurableObject } from "cloudflare:workers";'],
    [
      "transitive private config",
      'export { value } from "../shared/private-config";',
    ],
    [
      "private config alias",
      'import value from "@configuration?raw"; export { value };',
    ],
    [
      "private config symlink",
      'import value from "../shared/config-link.txt?raw"; export { value };',
    ],
  ];
  for (const file of [
    ".env",
    ".env.production",
    ".dev.vars",
    ".dev.vars.local",
    ".git/config",
    ".ssh/config",
    ".vibebook/config",
  ]) {
    for (const query of ["?raw", "?url"]) {
      cases.push([
        `private ${file}${query}`,
        `import value from ${JSON.stringify(`../${file}${query}`)}; export { value };`,
      ]);
    }
  }
  for (const [name, source] of cases) {
    await assert.rejects(
      compile(source!),
      /\[client-boundary\]/,
      `${name} should fail at build time`,
    );
    console.log(`PASS rejects ${name}`);
  }
  await assert.rejects(
    compile('import "server-only"; export const value = 1;', ["server-only"]),
    /\[client-boundary\]/,
  );
  console.log("PASS rejects externally configured server-only marker");
  await assert.rejects(
    compile('export { value } from "../src/private";', ["../src/private"]),
    /\[client-boundary\]/,
  );
  console.log("PASS rejects externally configured relative backend import");
  const externalServerFile = "../shared/secret.server.ts";
  await assert.rejects(
    compile(`export { value } from ${JSON.stringify(externalServerFile)};`, [
      externalServerFile,
    ]),
    /\[client-boundary\]/,
  );
  console.log("PASS rejects externally configured server-only file");
  for (const file of [
    ".env",
    ".env.production",
    ".dev.vars",
    ".dev.vars.local",
  ]) {
    for (const query of ["?raw", "?url"]) {
      const imported = `../${file}${query}`;
      await assert.rejects(
        compile(
          `import value from ${JSON.stringify(imported)}; export { value };`,
          [imported],
        ),
        /\[client-boundary\]/,
      );
    }
  }
  console.log("PASS rejects externally configured private files");
  const externalPrivateSymlink = "../shared/config-link.txt?raw";
  await assert.rejects(
    compile(
      `import value from ${JSON.stringify(externalPrivateSymlink)}; export { value };`,
      [externalPrivateSymlink],
    ),
    /\[client-boundary\]/,
  );
  console.log("PASS rejects externally configured private symlink");
  // CSS asset reads bypass Vite's normal module hooks. Test both plain CSS and
  // the actual Tailwind font-registration path, including nested imports.
  for (const withTailwind of [false, true]) {
    const prefix = withTailwind
      ? '@import "tailwindcss" prefix(tw) source(none);\n'
      : "";
    const style = join(root, "client/fixture.css");
    const cssEntry =
      'import "./fixture.css"; export const value = "css-fixture";';
    await writeFile(
      style,
      prefix +
        '@font-face {font-family:"public";src:url("../shared/public-font.woff2")}',
    );
    await compile(cssEntry, [], withTailwind);
    console.log(
      `PASS ${withTailwind ? "Tailwind" : "CSS"} browser-safe font asset`,
    );
    for (const [name, css] of [
      [
        "private font URL",
        '@font-face {font-family:"probe";src:url("../.dev.vars")}',
      ],
      ["backend URL asset", '.probe {background:url("../src/private.ts")}'],
      ["backend alias URL", '.probe {background:url("@backend/private.ts")}'],
      [
        "private symlink URL",
        '@font-face {font-family:"probe";src:url("../shared/config-link.txt")}',
      ],
      ["backend CSS import", '@import "../src/private.css";'],
      ["nested backend CSS import", '@import "../shared/nested.css";'],
    ]) {
      await writeFile(style, prefix + css);
      await assert.rejects(
        compile(cssEntry, [], withTailwind),
        /\[client-boundary\]/,
        `${name} must fail before CSS asset emission`,
      );
      console.log(`PASS rejects ${withTailwind ? "Tailwind" : "CSS"} ${name}`);
    }
    const publicLink = join(root, "public/fonts/private-link.woff2");
    await symlink(join(root, ".dev.vars"), publicLink);
    try {
      await writeFile(
        style,
        prefix +
          '@font-face {font-family:"probe";src:url("/fonts/private-link.woff2")}',
      );
      await assert.rejects(
        compile(cssEntry, [], withTailwind),
        /\[client-boundary\]/,
        "public font symlink must not expose a private target",
      );
      console.log(
        `PASS rejects ${withTailwind ? "Tailwind" : "CSS"} public asset symlink`,
      );
    } finally {
      await rm(publicLink);
    }
  }
  // Browser boundaries must not reject Vite's separate server optimizer/build.
  // The same backend and Node values rejected above remain valid server code.
  await writeFile(
    entry,
    'export {value} from "../src/private"; export {readFile} from "node:fs";',
  );
  const serverBuild = await build({
    configFile: false,
    root: join(root, "client"),
    logLevel: "silent",
    plugins: [clientBoundary({ projectRoot: root })],
    build: {
      ssr: entry,
      write: false,
      minify: false,
      rolldownOptions: { external: ["node:fs"] },
    },
  });
  const serverCode = (Array.isArray(serverBuild) ? serverBuild : [serverBuild])
    .flatMap((result) => {
      assert("output" in result, "expected server bundle, not watcher");
      return result.output;
    })
    .filter((chunk) => chunk.type === "chunk")
    .map((chunk) => chunk.code)
    .join("\n");
  assert(serverCode.includes(backendSentinel));
  assert(serverCode.includes("node:fs"));
  console.log(
    "PASS separate server environment permits backend and Node imports",
  );
} finally {
  await rm(root, { recursive: true, force: true });
}
