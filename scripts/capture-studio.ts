import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import postcss from "postcss";

const url = "https://studio.decocms.com/assets/index-69S-cBsb.css";
const sha256 =
  "eb3311919cdb7d1d1ff2dfb8d422e3d449526450239c572f194b35de1f4aaafb";
const source = process.argv[2]
  ? await readFile(process.argv[2], "utf8")
  : await (async () => {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Studio reference HTTP ${response.status}`);
      return response.text();
    })();
assert.equal(
  createHash("sha256").update(source).digest("hex"),
  sha256,
  "Frozen Studio source changed; amend the reference explicitly",
);
const ast = postcss.parse(source);
const light: Record<string, string> = {};
const darkOverrides: Record<string, string> = {};
const themeVariables: Record<string, string> = {};
const referenceRules: {
  selector: string;
  conditions: string[];
  declarations: Record<string, string>;
}[] = [];
const fontFaces: Record<string, string>[] = [];
const declarations = (node: postcss.Container): Record<string, string> =>
  Object.fromEntries(
    (node.nodes ?? [])
      .filter((child): child is postcss.Declaration => child.type === "decl")
      .map((child) => [child.prop, child.value]),
  );
ast.walkRules((rule) => {
  const selector = rule.selector.replace(/\s+/g, "");
  if (![":root", ".dark", ":root,:host"].includes(selector)) return;
  const values = Object.fromEntries(
    Object.entries(declarations(rule)).filter(([key]) => key.startsWith("--")),
  );
  const conditions: string[] = [];
  let parent: postcss.Container | postcss.Document | undefined = rule.parent;
  while (parent) {
    if (
      parent.type === "atrule" &&
      "name" in parent &&
      typeof parent.name === "string" &&
      "params" in parent &&
      typeof parent.params === "string"
    )
      conditions.unshift(`@${parent.name} ${parent.params}`);
    parent = parent.parent;
  }
  referenceRules.push({
    selector: rule.selector,
    conditions,
    declarations: values,
  });
  if (conditions.some((condition) => !condition.startsWith("@layer "))) return;
  Object.assign(
    selector === ":root"
      ? light
      : selector === ".dark"
        ? darkOverrides
        : themeVariables,
    values,
  );
});
ast.walkAtRules("font-face", (rule) => {
  fontFaces.push(declarations(rule));
});
assert(
  darkOverrides["--sidebar"] && darkOverrides["--destructive"],
  "Missing later dark rules",
);
const pkg: unknown = JSON.parse(
  await readFile(
    new URL("../node_modules/postcss/package.json", import.meta.url),
    "utf8",
  ),
);
if (
  !pkg ||
  typeof pkg !== "object" ||
  !("version" in pkg) ||
  typeof pkg.version !== "string"
)
  throw new Error("Invalid parser package metadata");
const result = {
  url,
  capturedAt: new Date().toISOString().slice(0, 10),
  sha256,
  light,
  darkOverrides,
  fontFaces,
  verification: {
    sourceTokens: true,
    authenticatedWorkspaceComputedStyles: false,
    workspaceScreenshots: false,
  },
  themeVariables,
  referenceRules,
  extraction: {
    parser: "postcss",
    version: pkg.version,
    method:
      "Exact root/dark selectors; preserve ordered layer and conditional contexts; conditional rules are not flattened.",
  },
};
await writeFile(
  new URL("../docs/svelte-migration/studio-tokens.json", import.meta.url),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  `Captured frozen Studio reference: ${Object.keys(light).length} light tokens, ${Object.keys(darkOverrides).length} dark overrides, ${referenceRules.length} ordered rules; workspace visual/computed verification pending`,
);
