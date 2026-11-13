import { readdir, readFile } from "node:fs/promises";
import { basename, join, relative } from "node:path";
import { createHash } from "node:crypto";
import postcss, { type AnyNode } from "postcss";
import { projectRoot } from "../svelte/build/clientBoundary";
import {
  auditPresentation,
  auditTailwind,
  type StyleViolation,
} from "./style-policy";

const native = process.argv.includes("--native");
const issues: StyleViolation[] = [];
const files: string[] = [];
async function collect(path: string) {
  for (const entry of await readdir(join(projectRoot, path), {
    withFileTypes: true,
  })) {
    const name = `${path}/${entry.name}`;
    if (entry.isDirectory()) await collect(name);
    else if (/\.(?:svelte|html|[cm]?[jt]s|css|scss|sass|less)$/.test(name))
      files.push(name);
  }
}
if (native) {
  for (const directory of [
    "svelte/lib/ui",
    "svelte/lib/components",
    "svelte/gallery",
    "svelte/styles",
    "svelte/features/board",
    "svelte/features/navigation",
    "svelte/features/pins",
    "svelte/features/reminders",
    "svelte/features/files",
    "svelte/features/decisions",
    "svelte/features/people",
    "svelte/features/auth",
    "svelte/features/pwa",
    "svelte/features/notifications",
    "svelte/features/chat",
    "svelte/features/rich-text",
    "svelte/features/chat-interactive",
    "svelte/features/home",
    "svelte/features/app-navigation",
    "svelte/features/rooms",
    "svelte/features/documents",
    "svelte/features/file-viewer",
    "svelte/features/composer",
  ])
    await collect(directory);
  files.push(
    "svelte/Inbox.svelte",
    "svelte/InboxMount.svelte",
    "svelte/TaskList.svelte",
    "svelte/Tasks.svelte",
    "svelte/Board.svelte",
    "svelte/Files.svelte",
    "svelte/Reminders.svelte",
    "svelte/Decisions.svelte",
    "svelte/People.svelte",
    "svelte/Chat.svelte",
    "svelte/Composer.svelte",
    "svelte/Message.svelte",
    "svelte/chatTypes.ts",
    "svelte/integrations/LegacyChatContent.svelte",
    "svelte/legacy/boardLayout.ts",
    "svelte/styles.ts",
    "svelte/index.html",
  );
} else {
  await collect("svelte");
  await collect("collab");
  files.push("public/app-svelte.css", "public/app-svelte.html");
}
for (const file of files.sort()) {
  const source = await readFile(join(projectRoot, file), "utf8");
  if (file.endsWith(".d.ts")) continue;
  if (/\.(?:css|scss|sass|less)$/.test(file)) {
    if (file !== "svelte/styles/tailwind.css")
      issues.push({ file, line: 1, reason: "Additional authored stylesheet" });
    else issues.push(...auditTailwind(file, source));
  } else issues.push(...auditPresentation(file, source));
}
const assets = (
  await readdir(join(projectRoot, "public/svelte-preview"))
).filter((name) => name.endsWith(".css"));
if (assets.length !== 1 || assets[0] !== "ui.css")
  issues.push({
    file: "public/svelte-preview",
    line: 1,
    reason: "Expected one emitted application CSS asset: ui.css",
  });
else {
  const generated = postcss.parse(
    await readFile(join(projectRoot, "public/svelte-preview/ui.css"), "utf8"),
  );
  generated.walkRules((rule) => {
    let parent: AnyNode | undefined = rule.parent;
    let baseReset = false;
    while (parent) {
      if (
        parent.type === "atrule" &&
        parent.name === "layer" &&
        parent.params === "base"
      )
        baseReset = true;
      parent = parent.parent;
    }
    if (
      baseReset &&
      rule.selectors.some((selector) => !selector.includes("[data-vb-native]"))
    )
      issues.push({
        file: "public/svelte-preview/ui.css",
        line: rule.source?.start?.line ?? 1,
        reason:
          "Native reset escaped its migration boundary or retained unresolved nesting",
      });
    if (
      rule.selectors.some((selector) =>
        /^\.(?:grid|table|flex|hidden|block)$/.test(selector),
      )
    )
      issues.push({
        file: "public/svelte-preview/ui.css",
        line: rule.source?.start?.line ?? 1,
        reason: "Unnamespaced layout utility can override legacy views",
      });
  });
  generated.walkAtRules("scope", (rule) => {
    issues.push({
      file: "public/svelte-preview/ui.css",
      line: rule.source?.start?.line ?? 1,
      reason: "Unlowered @scope exceeds the supported browser baseline",
    });
  });
  generated.walkDecls((declaration) => {
    if (/url\(["']?data:(?:font|application\/font)/.test(declaration.value))
      issues.push({
        file: "public/svelte-preview/ui.css",
        line: declaration.source?.start?.line ?? 1,
        reason: "Font bytes inlined into application CSS",
      });
  });
}
const manifest: unknown = JSON.parse(
  await readFile(
    join(projectRoot, "docs/svelte-migration/font-assets.json"),
    "utf8",
  ),
);
const generator: unknown = JSON.parse(
  await readFile(join(projectRoot, "components.json"), "utf8"),
);
if (
  !generator ||
  typeof generator !== "object" ||
  !("tailwind" in generator) ||
  !generator.tailwind ||
  typeof generator.tailwind !== "object" ||
  !("css" in generator.tailwind) ||
  generator.tailwind.css !== "svelte/styles/tailwind.css"
)
  throw new Error("Component generator must use the sole Tailwind entry");
if (
  !manifest ||
  typeof manifest !== "object" ||
  !("records" in manifest) ||
  !Array.isArray(manifest.records)
)
  throw new Error("Invalid font manifest");
for (const entry of manifest.records) {
  if (
    !entry ||
    typeof entry !== "object" ||
    !("name" in entry) ||
    typeof entry.name !== "string" ||
    !("sha256" in entry) ||
    typeof entry.sha256 !== "string"
  )
    throw new Error("Invalid font asset entry");
  if (
    basename(entry.name) !== entry.name ||
    entry.name.includes("\\") ||
    !/\.(?:woff2|txt)$/.test(entry.name) ||
    !/^[a-f0-9]{64}$/.test(entry.sha256)
  )
    throw new Error("Invalid font asset path/digest");
  const path = join(projectRoot, "public/fonts/studio", entry.name);
  if (
    createHash("sha256")
      .update(await readFile(path))
      .digest("hex") !== entry.sha256
  )
    issues.push({
      file: relative(projectRoot, path),
      line: 1,
      reason: "Font or notice differs from frozen asset manifest",
    });
}
const families = new Map([
  ["Bits UI/Floating UI internals", new Set(["bits-ui", "@floating-ui/dom"])],
  ["CodeMirror 6 view internals", new Set(["@codemirror/view", "style-mod"])],
  ["Yjs/y-codemirror.next integration", new Set(["y-codemirror.next"])],
]);
const vendor: unknown = JSON.parse(
  await readFile(join(projectRoot, "svelte/styles/vendor-css.json"), "utf8"),
);
if (
  !vendor ||
  typeof vendor !== "object" ||
  !("entries" in vendor) ||
  !Array.isArray(vendor.entries) ||
  vendor.entries.length > 3
)
  throw new Error("Invalid vendor CSS allowlist");
const seen = new Set<string>();
for (const entry of vendor.entries) {
  if (
    !entry ||
    typeof entry !== "object" ||
    !("family" in entry) ||
    typeof entry.family !== "string" ||
    !families.has(entry.family) ||
    seen.has(entry.family) ||
    !("packages" in entry) ||
    !Array.isArray(entry.packages) ||
    !entry.packages.length ||
    !("sources" in entry) ||
    !Array.isArray(entry.sources) ||
    !entry.sources.length
  )
    throw new Error("Invalid vendor CSS family");
  seen.add(entry.family);
  const declared = new Set<string>();
  for (const dependency of entry.packages) {
    if (
      !dependency ||
      typeof dependency !== "object" ||
      !("name" in dependency) ||
      typeof dependency.name !== "string" ||
      !families.get(entry.family)?.has(dependency.name) ||
      !("version" in dependency) ||
      typeof dependency.version !== "string"
    )
      throw new Error("Invalid vendor package");
    declared.add(dependency.name);
    const installed: unknown = JSON.parse(
      await readFile(
        join(projectRoot, "node_modules", dependency.name, "package.json"),
        "utf8",
      ),
    );
    if (
      !installed ||
      typeof installed !== "object" ||
      !("version" in installed) ||
      installed.version !== dependency.version
    )
      throw new Error(`Vendor version changed: ${dependency.name}`);
  }
  for (const source of entry.sources) {
    if (
      typeof source !== "string" ||
      source.includes("..") ||
      /[*?\\]/.test(source) ||
      ![...declared].some((name) => source.startsWith(name + "/"))
    )
      throw new Error("Vendor source must name an exact dependency file");
    await readFile(join(projectRoot, "node_modules", source));
  }
}
if (issues.length) {
  for (const issue of issues)
    console.error(`${issue.file}:${issue.line}: ${issue.reason}`);
  console.error(
    `FAIL ${native ? "native increment" : "full application"} style policy: ${issues.length} violations`,
  );
  process.exitCode = 1;
} else
  console.log(
    `PASS ${native ? "native increment only (full M3 remains pending)" : "full application"} style policy: ${files.length} sources, one emitted CSS asset, font integrity verified`,
  );
