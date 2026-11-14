import { richText } from "../rich-text/project";
import { SVG_NS } from "../rich-text/allowlist";
import type { RichContext, RichNode } from "../rich-text/types";
export const PELE_URL =
  "https://cdn.jsdelivr.net/npm/pele@1.10.0/dist/pele.global.js";
export const PELE_INTEGRITY =
  "sha384-zwGYZK+/MVuyfItMWj4MERk2omW/eWEDLBEwuzSJd289OrEFwsdwQe+EqwJacKaA";
type Pele = {
  render(
    source: string,
    options: {
      idPrefix: string;
      fontFamily: string;
      fontSize: number;
      maxWidth: number;
      links: false;
      images: false;
    },
  ): unknown;
};
type Timer = number | ReturnType<typeof setTimeout>;
export function createPeleLoader(
  attach: (loaded: (value: unknown) => void, failed: () => void) => () => void,
  schedule: (callback: () => void, ms: number) => Timer = setTimeout,
  cancel: (timer: Timer) => void = clearTimeout,
) {
  let current: { promise: Promise<Pele> } | undefined;
  return () => {
    if (current) return current.promise;
    let resolve!: (value: Pele) => void, reject!: (error: Error) => void;
    const promise = new Promise<Pele>((yes, no) => {
        resolve = yes;
        reject = no;
      }),
      owner = { promise };
    current = owner;
    let closed = false,
      timer: Timer | undefined,
      detach = () => {};
    const finish = () => {
      closed = true;
      if (timer !== undefined) cancel(timer);
      timer = undefined;
      detach();
    };
    const failed = () => {
      if (closed || current !== owner) return;
      finish();
      current = undefined;
      reject(Error("Diagram renderer unavailable"));
    };
    const loaded = (value: unknown) => {
      if (closed || current !== owner) return;
      if (
        typeof value !== "object" ||
        value === null ||
        !("render" in value) ||
        typeof value.render !== "function"
      ) {
        failed();
        return;
      }
      const render = value.render;
      finish();
      resolve({
        render: (source, options) =>
          Reflect.apply(render, value, [source, options]),
      });
    };
    try {
      detach = attach(loaded, failed);
      if (closed) detach();
      else timer = schedule(failed, 30000);
    } catch {
      failed();
    }
    return promise;
  };
}
export const loadPele = createPeleLoader((loaded, failed) => {
  const script = document.createElement("script");
  script.src = PELE_URL;
  script.crossOrigin = "anonymous";
  script.integrity = PELE_INTEGRITY;
  script.onload = () => loaded(Reflect.get(window, "pele"));
  script.onerror = failed;
  document.head.append(script);
  return () => {
    script.onload = null;
    script.onerror = null;
    script.remove();
  };
});
const active = new Set([
  "animate",
  "animatecolor",
  "animatemotion",
  "animatetransform",
  "set",
  "image",
  "feimage",
  "foreignobject",
  "script",
  "style",
]);
const paint = new Set([
  "fill",
  "stroke",
  "color",
  "stop-color",
  "flood-color",
  "lighting-color",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
]);
/** Treat renderer output as untrusted SVG; never insert its HTML/CSS or active nodes. */
export function diagramNodes(svg: string, context: RichContext): RichNode[] {
  if (svg.length > 65536) throw Error("Diagram output limit");
  function clean(nodes: RichNode[]): RichNode[] {
    return nodes.flatMap((node) => {
      if (node.kind === "text") return [node];
      // Marked may retain an inert paragraph wrapper around an inline SVG fragment.
      if (
        node.kind === "element" &&
        node.namespace !== SVG_NS &&
        node.tag === "p"
      )
        return clean(node.children);
      if (
        node.kind !== "element" ||
        node.namespace !== SVG_NS ||
        active.has(node.tag.toLowerCase())
      )
        return [];
      return [
        {
          ...node,
          attrs: Object.fromEntries(
            Object.entries(node.attrs).filter(
              ([name]) =>
                !paint.has(name.toLowerCase()) &&
                !/^(?:href|src|on|data-)/i.test(name),
            ),
          ),
          children: clean(node.children),
        },
      ];
    });
  }
  const nodes = clean(
    richText(svg.trim(), "markdown", { ...context, policy: "document" }),
  ).filter((node) => node.kind !== "text" || node.text.trim());
  if (
    nodes.length !== 1 ||
    nodes[0].kind !== "element" ||
    nodes[0].tag !== "svg"
  )
    throw Error("Diagram output unavailable");
  return nodes;
}
export async function renderDiagram(
  source: string,
  context: RichContext,
  width: number,
  load = loadPele,
) {
  if (source.length > 16000) throw Error("Diagram source limit");
  const pele = await load(),
    result: unknown = pele.render(source, {
      idPrefix: `diagram-${context.idPrefix.replace(/[^a-z0-9_-]/gi, "-")}-`,
      fontFamily: "sans-serif",
      fontSize: 14,
      maxWidth: Math.max(160, Math.min(1600, width)),
      links: false,
      images: false,
    });
  if (
    typeof result !== "object" ||
    result === null ||
    !("svg" in result) ||
    typeof result.svg !== "string"
  )
    throw Error("Diagram output unavailable");
  return diagramNodes(result.svg, context);
}
