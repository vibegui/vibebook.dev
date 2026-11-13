import type { DefaultTreeAdapterTypes as Tree } from "parse5";
import { emojify } from "../../../shared/emoji";
import {
  HTML_TAGS,
  SVG_TAGS,
  MATH_TAGS,
  DROP_CONTENTS,
  HTML_NS,
  SVG_NS,
  MATH_NS,
  HTML_ATTRIBUTES,
  SVG_ATTRIBUTES,
  MATH_ATTRIBUTES,
  BOOLEAN_ATTRIBUTES,
  REFERENCE_ATTRIBUTES,
} from "./allowlist";
import { markdownTree } from "./markdownTree";
import { fileTarget, linkTarget, mentionTarget, safeUrl } from "./links";
import type {
  RichContext,
  RichMode,
  RichNode,
  RichNamespace,
  SafeAttributes,
  SafeTag,
} from "./types";
const sourceLink = /https?:\/\/[^\s<]+[^\s<.,;:!?)"'\]]/g;
function visibleText(nodes: readonly RichNode[]): string {
  return nodes
    .map((n) =>
      n.kind === "text" || n.kind === "mention"
        ? n.text
        : n.children.map((x) => visibleText([x])).join(""),
    )
    .join("");
}
function mentions(text: string, context: RichContext): RichNode[] {
  const out: RichNode[] = [];
  let at = 0;
  for (const match of text.matchAll(/(^|[\s(])@([\p{L}\p{N}._-]+)/gu)) {
    const who = mentionTarget(match[2], context);
    if (!who) continue;
    const start = match.index + match[1].length;
    if (start > at) out.push({ kind: "text", text: text.slice(at, start) });
    out.push({
      kind: "mention",
      text: `@${match[2]}`,
      who,
      mine: who === context.room.me,
    });
    at = start + match[2].length + 1;
  }
  if (at < text.length) out.push({ kind: "text", text: text.slice(at) });
  return out;
}
function human(text: string, context: RichContext): RichNode[] {
  const out: RichNode[] = [];
  let at = 0;
  for (const match of text.matchAll(sourceLink)) {
    const href = match[0],
      start = match.index;
    if (start > at) out.push(...mentions(text.slice(at, start), context));
    const target = linkTarget(href, href, context);
    out.push(
      target
        ? {
            kind: "link",
            target,
            namespace: HTML_NS,
            children: [{ kind: "text", text: href }],
          }
        : { kind: "text", text: href },
    );
    at = start + href.length;
  }
  if (at < text.length) out.push(...mentions(text.slice(at), context));
  return out;
}
export const RICH_LIMITS = {
  source: 65536,
  nodes: 2048,
  depth: 48,
  svgNodes: 128,
} as const;
export type ParsedRichSource = {
  text: string;
  mode: RichMode;
  literal?: boolean;
  tree?: ReturnType<typeof markdownTree>;
};
export function parseRichSource(
  source: string,
  mode: RichMode,
): ParsedRichSource {
  // Canonical source remains untouched for copy/edit. Oversize content has one inert text node.
  if (source.length > RICH_LIMITS.source)
    return { text: source, mode, literal: true };
  const text = emojify(source);
  if (mode !== "markdown") return { text, mode };
  try {
    const tree = markdownTree(text);
    let count = 0,
      svg = 0;
    const pending = [{ node: tree.fragment as Tree.Node, depth: 0 }];
    while (pending.length) {
      const { node, depth } = pending.pop()!;
      if (++count > RICH_LIMITS.nodes || depth > RICH_LIMITS.depth)
        throw new Error("Rich tree limit");
      if (
        "namespaceURI" in node &&
        node.namespaceURI === SVG_NS &&
        ++svg > RICH_LIMITS.svgNodes
      )
        throw new Error("SVG limit");
      if ("childNodes" in node)
        for (const child of node.childNodes)
          pending.push({ node: child, depth: depth + 1 });
    }
    return { text, mode, tree };
  } catch {
    return { text: source, mode, literal: true };
  }
}
export function richText(
  source: string,
  mode: RichMode,
  context: RichContext,
): RichNode[] {
  return projectRichSource(parseRichSource(source, mode), context);
}
export function projectRichSource(
  parsed: ParsedRichSource,
  context: RichContext,
): RichNode[] {
  const { text, mode } = parsed;
  if (parsed.literal) return [{ kind: "text", text }];
  if (mode !== "markdown") {
    const result =
      mode === "human" ? human(text, context) : mentions(text, context);
    return result.length > RICH_LIMITS.nodes
      ? [{ kind: "text", text }]
      : result;
  }
  const { fragment, metadata } = parsed.tree!;
  const ids = new Map<string, string>(),
    nodeIds = new WeakMap<Tree.Element, string>();
  let sequence = 0;
  const prefix = `vb-rich-${context.idPrefix.replace(/[^a-z0-9_-]/gi, "-")}`;
  function collect(node: Tree.ParentNode) {
    for (const child of node.childNodes) {
      if ("tagName" in child) {
        const id = child.attrs.find((a) => a.name === "id")?.value;
        if (id) {
          const privateId = `${prefix}-${++sequence}`;
          nodeIds.set(child, privateId);
          if (!ids.has(id)) ids.set(id, privateId);
        }
        if ("childNodes" in child) collect(child);
      }
    }
  }
  collect(fragment);
  const localReference = (value: string) => {
    const match = /^\s*url\(\s*["']?#([^"')\s]+)["']?\s*\)\s*$/i.exec(value);
    return match && ids.has(match[1]) ? `url(#${ids.get(match[1])})` : null;
  };
  function attributes(
    node: Tree.Element,
    namespace: RichNamespace,
  ): SafeAttributes {
    const result: Record<string, string | number | boolean> = {},
      allowed =
        namespace === HTML_NS
          ? HTML_ATTRIBUTES
          : namespace === SVG_NS
            ? SVG_ATTRIBUTES
            : MATH_ATTRIBUTES;
    const privateId = nodeIds.get(node);
    if (privateId) result.id = privateId;
    for (const attribute of node.attrs) {
      const name = attribute.name.toLowerCase(),
        value = attribute.value;
      if (
        name === "style" ||
        name === "id" ||
        name === "class" ||
        name.startsWith("on") ||
        name.startsWith("data-") ||
        [
          "xmlns",
          "is",
          "slot",
          "name",
          "role",
          "tabindex",
          "autofocus",
          "contenteditable",
          "form",
          "formaction",
          "action",
          "method",
          "enctype",
          "for",
          "list",
          "draggable",
          "nonce",
          "integrity",
          "srcset",
          "popovertarget",
          "popover",
        ].includes(name)
      )
        continue;
      if (["aria-label", "aria-description", "aria-hidden"].includes(name)) {
        result[name] = value;
        continue;
      }
      if (["aria-labelledby", "aria-describedby", "headers"].includes(name)) {
        const references = value
          .split(/\s+/)
          .map((id) => ids.get(id))
          .filter(Boolean)
          .join(" ");
        if (references) result[name] = references;
        continue;
      }
      if (
        ["href", "src", "cite", "poster", "background", "usemap"].includes(
          name,
        ) ||
        attribute.prefix === "xlink"
      ) {
        if (node.tagName.toLowerCase() === "a") continue;
        if (value.startsWith("#") && ids.has(value.slice(1))) {
          result.href = `#${ids.get(value.slice(1))}`;
          continue;
        }
        const safe = safeUrl(value, context.pageUrl);
        if (!safe) continue;
        if (name === "cite") {
          result.cite = safe;
          continue;
        }
        if (
          namespace === MATH_NS &&
          node.tagName !== "mglyph" &&
          name === "href"
        ) {
          result.href = safe;
          continue;
        }
        if (
          namespace !== HTML_NS ||
          name === "poster" ||
          name === "background"
        ) {
          const file = fileTarget(safe, "", context);
          if (file?.attachment?.type.startsWith("image/"))
            result[
              name === "src"
                ? "src"
                : name === "poster"
                  ? "poster"
                  : name === "background"
                    ? "background"
                    : "href"
            ] = file.href;
          continue;
        }
        if (
          name === "src" &&
          ["audio", "video", "source", "track"].includes(node.tagName)
        )
          result.src = safe;
        continue;
      }
      if (!allowed.has(name)) continue;
      // CSS escapes/comments can disguise url(), executable schemes, and animation values.
      if (value.length > 1024 || /[\\]|\/\*|\*\//.test(value)) continue;
      if (namespace === SVG_NS) {
        const numbers = value.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) || [];
        if (
          numbers.length > 81 ||
          numbers.some(
            (n) => !Number.isFinite(Number(n)) || Math.abs(Number(n)) > 4096,
          )
        )
          continue;
        if (name === "numoctaves" && Number(value) > 4) continue;
      }
      if (REFERENCE_ATTRIBUTES.has(name)) {
        const ref = localReference(value);
        if (ref) result[attribute.name] = ref;
        continue;
      }
      if (/url\s*\(/i.test(value)) {
        const ref = localReference(value);
        if (ref) result[attribute.name] = ref;
        continue;
      }
      if (
        /(?:javascript\s*:|vbscript\s*:|expression\s*\(|@import|data\s*:)/i.test(
          value,
        )
      )
        continue;
      if (
        name === "attributename" &&
        !/^(?:transform|fill|stroke|color|opacity)$/i.test(value)
      )
        continue;
      if (name === "begin" || name === "end") {
        if (!/^[\d.]+(?:ms|s)?$/.test(value)) continue;
      }
      result[attribute.name] = BOOLEAN_ATTRIBUTES.has(name) ? true : value;
    }
    return result;
  }
  function nodes(
    children: readonly Tree.ChildNode[],
    namespace: RichNamespace = HTML_NS,
    code = false,
  ): RichNode[] {
    const out: RichNode[] = [];
    for (const child of children) {
      if (child.nodeName === "#text" && "value" in child) {
        out.push(
          ...(namespace === HTML_NS
            ? mentions(child.value, context)
            : [{ kind: "text" as const, text: child.value }]),
        );
        continue;
      }
      if (!("tagName" in child)) continue;
      const tag = child.tagName.toLowerCase(),
        ns = child.namespaceURI as RichNamespace;
      if (DROP_CONTENTS.has(tag)) continue;
      if (ns !== HTML_NS && ns !== SVG_NS && ns !== MATH_NS) continue;
      const allowed =
        ns === HTML_NS ? HTML_TAGS : ns === SVG_NS ? SVG_TAGS : MATH_TAGS;
      if (!allowed.has(tag)) {
        if (ns === HTML_NS) out.push(...nodes(child.childNodes, ns, code));
        continue;
      }
      const contents = nodes(
        child.childNodes,
        ns,
        code || tag === "code" || tag === "pre",
      );
      if (tag === "a") {
        const href = child.attrs.find((a) => a.name === "href")?.value;
        const target =
          href !== undefined
            ? linkTarget(href, visibleText(contents).trim(), context, ids)
            : null;
        if (target)
          out.push({
            kind: "link",
            target,
            children: contents,
            namespace: ns,
            title: child.attrs.find((a) => a.name === "title")?.value,
          });
        else out.push(...contents);
        continue;
      }
      out.push({
        kind: "element",
        tag: child.tagName as SafeTag,
        namespace: ns,
        attrs: attributes(child, ns),
        children: contents,
        ...metadata.get(child),
      });
    }
    return out;
  }
  const result = nodes(fragment.childNodes);
  let count = 0;
  const pending = [...result];
  while (pending.length) {
    const node = pending.pop()!;
    if (++count > RICH_LIMITS.nodes) return [{ kind: "text", text }];
    if ("children" in node) pending.push(...node.children);
  }
  return result;
}
