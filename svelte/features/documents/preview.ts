import type { RichNode } from "../rich-text/types";
const text = (nodes: readonly RichNode[]): string =>
  nodes
    .map((node) =>
      node.kind === "text" || node.kind === "mention"
        ? node.text
        : text(node.children),
    )
    .join("");
type Block = { node: RichNode } | { tasks: true };
/** Match the old semantic placement: global H2 priority, then global marker,
 * then the first root paragraph. Untrusted source cannot manufacture task slots. */
export function documentBlocks(
  nodes: readonly RichNode[],
  tasks: boolean,
): Block[] {
  if (!tasks) return nodes.map((node) => ({ node }));
  function find(
    values: readonly RichNode[],
    tag: string,
    value: string,
  ): RichNode | undefined {
    for (const node of values) {
      if (
        node.kind === "element" &&
        node.tag === tag &&
        text(node.children).trim().toLowerCase() === value
      )
        return node;
      if ("children" in node) {
        const found = find(node.children, tag, value);
        if (found) return found;
      }
    }
  }
  const heading = find(nodes, "h2", "tarefas"),
    marker = heading ?? find(nodes, "p", "[[tarefas]]");
  function transform(values: readonly RichNode[]): RichNode[] {
    const result: RichNode[] = [];
    let removeList = false;
    for (const node of values) {
      if (node === marker && node.kind === "element") {
        result.push({ ...node, documentTaskSlot: true, children: [] });
        removeList = !!heading;
        continue;
      }
      if (removeList && (node.kind === "element" || node.kind === "link")) {
        removeList = false;
        if (node.kind === "element" && node.tag === "ul") continue;
      }
      result.push(
        "children" in node
          ? { ...node, children: transform(node.children) }
          : node,
      );
    }
    return result;
  }
  if (marker)
    return transform(nodes).map((node) =>
      node.kind === "element" && node.documentTaskSlot
        ? { tasks: true }
        : { node },
    );
  const first = nodes.findIndex(
      (node) => node.kind === "element" && node.tag === "p",
    ),
    result: Block[] = nodes.map((node) => ({ node }));
  result.splice(first < 0 ? 0 : first + 1, 0, { tasks: true });
  return result;
}
export function mermaidSource(node: RichNode): string | null {
  if (
    node.kind !== "element" ||
    node.tag !== "pre" ||
    node.children.length !== 1
  )
    return null;
  const code = node.children[0];
  return code.kind === "element" &&
    code.tag === "code" &&
    code.language === "mermaid"
    ? text(code.children)
    : null;
}
