import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import ts from "typescript";
import { projectRoot } from "../svelte/build/clientBoundary";
import { inventoryOutput } from "./inventory-output";
import { createInventoryCallClassifier } from "./inventory-calls";

const destination = join(projectRoot, "docs/svelte-migration");
const output = inventoryOutput(process.argv.slice(2), projectRoot);
const publishedBaseline = "d3e1473";
const sources = [
  "src",
  "shared",
  "svelte",
  "collab",
  "vanilla",
  "service-worker",
];
type Location = { file: string; line: number };
type NetworkCall = Location & {
  callee: string;
  target: string;
  method: string;
  kind?: "inferred-rpc";
};
const functions: (Location & { name: string; lines: number })[] = [];
const network: NetworkCall[] = [];
const endpoints: (Location & { method: string; path: string })[] = [];
const typeEscapes: (Location & { kind: string })[] = [];
const dom: (Location & { operation: string })[] = [];
const styles: (Location & { kind: string })[] = [];
const firstPartyJavaScript: string[] = [];
const files: string[] = [];
const sourceHashes: { file: string; sha256: string }[] = [];

async function collect(directory: string) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (item.name.startsWith(".") || item.name === "node_modules") continue;
    const path = join(directory, item.name);
    if (item.isDirectory()) await collect(path);
    else if (/\.(?:[cm]?[jt]s|svelte|css|scss|sass|less)$/.test(item.name))
      files.push(path);
  }
}
for (const directory of sources) await collect(join(projectRoot, directory));
files.push(join(projectRoot, "public/app-svelte.html"));

for (const absolute of files.sort()) {
  const file = relative(projectRoot, absolute);
  const full = await readFile(absolute, "utf8");
  sourceHashes.push({
    file,
    sha256: createHash("sha256").update(full).digest("hex"),
  });
  const lineAt = (offset: number) => full.slice(0, offset).split("\n").length;
  if (/\.[cm]?js$/.test(file)) firstPartyJavaScript.push(file);
  if (/\.(?:css|scss|sass|less)$/.test(file)) {
    styles.push({ file, line: 1, kind: "authored stylesheet" });
    continue;
  }
  for (const match of full.matchAll(
    /<style\b|\bstyle\s*=|\bstyle:[\w-]+|@ts-(?:ignore|nocheck)/g,
  )) {
    const location = { file, line: lineAt(match.index) };
    if (match[0].startsWith("@ts-"))
      typeEscapes.push({ ...location, kind: match[0] });
    else
      styles.push({
        ...location,
        kind: match[0].startsWith("<style")
          ? "component/style block"
          : "inline style candidate",
      });
  }
  const sections = file.endsWith(".svelte")
    ? [...full.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(
        (match) => ({
          text: match[1]!,
          offset: match.index + match[0].indexOf(">") + 1,
        }),
      )
    : file.endsWith(".html")
      ? [...full.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(
          (match) => ({
            text: match[1]!,
            offset: match.index + match[0].indexOf(">") + 1,
          }),
        )
      : [{ text: full, offset: 0 }];
  for (const section of sections) {
    const source = ts.createSourceFile(
      file,
      section.text,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith(".js") ? ts.ScriptKind.JS : ts.ScriptKind.TS,
    );
    const location = (node: ts.Node): Location => ({
      file,
      line: lineAt(section.offset + node.getStart(source)),
    });
    const calls = createInventoryCallClassifier(source);
    const visit = (node: ts.Node) => {
      if (node.kind === ts.SyntaxKind.AnyKeyword)
        typeEscapes.push({ ...location(node), kind: "explicit any" });
      if (ts.isFunctionDeclaration(node) && node.name)
        functions.push({
          ...location(node),
          name: node.name.text,
          lines: node.getText(source).split("\n").length,
        });
      if (
        ts.isVariableDeclaration(node) &&
        node.initializer &&
        (ts.isArrowFunction(node.initializer) ||
          ts.isFunctionExpression(node.initializer))
      )
        functions.push({
          ...location(node),
          name: node.name.getText(source),
          lines: node.getText(source).split("\n").length,
        });
      if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isPropertyAccessExpression(node.left) &&
        ["innerHTML", "outerHTML", "textContent", "className"].includes(
          node.left.name.text,
        )
      )
        dom.push({
          ...location(node),
          operation: `assign ${node.left.name.text}`,
        });
      if (ts.isCallExpression(node)) {
        const callee = node.expression.getText(source);
        const rpc = calls.inferredRpc(node);
        if (
          ["fetch", "api"].includes(callee) ||
          rpc ||
          /\.(?:postMessage|uploadFile)$/.test(callee)
        ) {
          let method =
            rpc?.method ??
            (callee === "api"
              ? node.arguments[1]
                ? "POST"
                : "GET"
              : "GET/default or typed transport");
          const init = node.arguments[1];
          if (!rpc && init && ts.isObjectLiteralExpression(init)) {
            const property = init.properties.find(
              (property) =>
                ts.isPropertyAssignment(property) &&
                property.name.getText(source) === "method",
            );
            if (property && ts.isPropertyAssignment(property))
              method = property.initializer
                .getText(source)
                .replace(/["']/g, "");
          }
          network.push({
            ...location(calls.site(node)),
            ...(rpc ? { kind: rpc.kind } : {}),
            callee,
            target:
              node.arguments[0]?.getText(source) ?? "typed transport input",
            method,
          });
        }
        const route = calls.endpoint(node);
        if (route)
          endpoints.push({
            ...location(calls.site(node)),
            ...route,
          });
        if (
          /\.(?:insertAdjacentHTML|replaceChildren|createElement|addEventListener|appendChild|setProperty|insertRule|replaceSync|adoptedStyleSheets)$/.test(
            callee,
          )
        )
          dom.push({ ...location(node), operation: callee.split(".").at(-1)! });
        if (
          callee === "EditorView.theme" ||
          /\.(?:insertRule|replaceSync|setProperty)$/.test(callee)
        )
          styles.push({ ...location(node), kind: callee });
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
}

await mkdir(dirname(output.file), { recursive: true });
// A separate current snapshot never creates or replaces the frozen baseline.
if (!output.explicit) {
  const baselinePath = join(destination, "baseline.json");
  let baselineExists = true;
  try {
    await readFile(baselinePath);
  } catch {
    baselineExists = false;
  }
  if (!baselineExists) {
    const paths = [
      "public/app.html",
      "public/svelte/ui.js",
      "public/collab.js",
      "public/sw.js",
      "public/manifest.webmanifest",
      "src/webpush.ts",
    ];
    const assets = paths.map((path) => {
      const body = execFileSync(
        "git",
        ["show", `${publishedBaseline}:${path}`],
        {
          cwd: projectRoot,
          maxBuffer: 16 * 1024 * 1024,
        },
      );
      return {
        path,
        sha256: createHash("sha256").update(body).digest("hex"),
        rawBytes: body.length,
        gzipBytes: gzipSync(body).length,
      };
    });
    await writeFile(
      baselinePath,
      JSON.stringify(
        {
          startingCommit: "9579bc4",
          publishedBaseline,
          variants: { vanilla: "/app and /b/ROOM", svelte: "?ui=svelte" },
          assets,
        },
        null,
        2,
      ) + "\n",
    );
  }
}
const inventory = {
  sourceRevision: execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: projectRoot,
    encoding: "utf8",
  }).trim(),
  workingTreeDirty:
    execFileSync(
      "git",
      ["status", "--porcelain", "--", ...sources, "public/app-svelte.html"],
      { cwd: projectRoot, encoding: "utf8" },
    ).trim().length > 0,
  sourceFingerprint: createHash("sha256")
    .update(JSON.stringify(sourceHashes))
    .digest("hex"),
  sourceHashes,
  note: "Source inventory, not a claim of migration completion. Inline style and type entries are candidates requiring review. Generated/public vanilla assets are protected separately.",
  counts: {
    files: files.length,
    functions: functions.length,
    networkCalls: network.length,
    endpoints: endpoints.length,
    typeEscapeCandidates: typeEscapes.length,
    domOperations: dom.length,
    styleCandidates: styles.length,
  },
  firstPartyJavaScript,
  functions,
  network,
  endpoints,
  typeEscapes,
  dom,
  styles,
};
await writeFile(
  output.file,
  JSON.stringify(inventory, null, 2) + "\n",
  // Refuse existing explicit targets, including symlinks/hard links to frozen records.
  { flag: output.explicit ? "wx" : "w" },
);
console.log(JSON.stringify(inventory.counts));
console.log(
  `Wrote ${relative(projectRoot, output.file)}; frozen vanilla baseline ${publishedBaseline}`,
);
