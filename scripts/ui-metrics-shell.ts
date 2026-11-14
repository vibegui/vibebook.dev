import assert from "node:assert/strict";
import { parse, type DefaultTreeAdapterTypes as Tree } from "parse5";
import { UI_VERSION_HEX_LENGTH } from "../shared/uiVersion";

/** The real Worker appends its original static asset ETag to the served head
 * and returns that same domain from Me.v. A controlled asset server must do the
 * same augmentation, while declaring its own ETag algorithm rather than claiming
 * Cloudflare's production ETag identity. Browser bundle query versions differ. */
export function metricShell(
  source: string,
  originalETag: string,
  variant: "vanilla" | "svelte",
) {
  const version = originalETag.replace(/[^\w-]/g, "");
  assert(version, "Original shell ETag must identify the controlled response");
  let duplicateHead = false;
  const document = parse(source, { sourceCodeLocationInfo: true, onParseError(error) { if (error.code === "misplaced-start-tag-for-head-element") duplicateHead = true; } });
  const elements: Tree.Element[] = [];
  function visit(node: Tree.Node) {
    if ("tagName" in node) elements.push(node);
    // Raw script/style text and comments are not elements; template.content
    // belongs to an inert fragment, not the served document's active metadata.
    if ("childNodes" in node) for (const child of node.childNodes) visit(child);
  }
  visit(document);
  const attr = (node: Tree.Element, name: string) => node.attrs.find(attr => attr.name === name)?.value;
  assert(!elements.some(node => node.tagName === "meta" && attr(node, "name")?.toLowerCase() === "vb-v"), "Static app shell must not already contain Worker-owned vb-v metadata");
  const heads = elements.filter(node => node.tagName === "head"), head = heads[0]?.sourceCodeLocation;
  assert(!duplicateHead && heads.length === 1 && head?.startTag && head.endTag, "App shell must contain one actual head for Worker metadata");
  const prefix = source.slice(0, head.endTag.startOffset), suffix = source.slice(head.endTag.startOffset);
  let entryVersion: string | null = null;
  if (variant === "svelte") {
    const entry = elements.filter(node => node.tagName === "script").flatMap(node => { const src = attr(node, "src"); return src ? [new URL(src, "https://metrics.invalid")] : []; })
      .filter((url) => url.pathname === "/svelte-preview/app.js");
    const style = elements.filter(node => node.tagName === "link").flatMap(node => { const href = attr(node, "href"); return href ? [new URL(href, "https://metrics.invalid")] : []; })
      .filter((url) => url.pathname === "/svelte-preview/ui.css");
    assert(
      entry.length === 1 && style.length === 1,
      "Native shell requires exactly one built app.js and ui.css reference",
    );
    const versions = [...entry, ...style].map((url) => {
      assert(
        url.origin === "https://metrics.invalid" &&
          url.searchParams.getAll("v").length === 1,
      );
      const value = url.searchParams.get("v");
      assert(
        value && new RegExp(`^[a-f0-9]{${UI_VERSION_HEX_LENGTH}}$`).test(value),
        "Native bundle reference needs its actual build digest",
      );
      return value;
    });
    assert.equal(
      versions[0],
      versions[1],
      "Native script/style must retain the same actual build version",
    );
    entryVersion = versions[0]!;
  }
  return {
    body: prefix + `<meta name="vb-v" content="${version}" />` + suffix,
    version,
    entryVersion,
    versionDomain: "controlled-original-static-shell-etag" as const,
  };
}
