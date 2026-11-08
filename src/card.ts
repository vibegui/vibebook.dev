// Native cards (MCP post `card`), in json-render's spec shape: { root, elements: { id: { type, props, children } } }
// with the chat catalog's components. The app draws them itself (text only, escaped): no HTML, no iframe, no Jev call.
// Anything outside the catalog or the limits is refused with an error the agent can fix and retry.

export type CardEl = { type: string; props: Record<string, unknown>; children: string[] };
export type Card = { root: string; elements: Record<string, CardEl> };

const S = (max: number) => (v: unknown, name: string) => {
  if (v === undefined || v === null) return undefined;
  if (typeof v !== "string" && typeof v !== "number") throw new Error(`${name} must be text`);
  const s = String(v);
  if (s.length > max) throw new Error(`${name} is longer than ${max} characters`);
  return s;
};
const short = S(200), long = S(2000);
const httpUrl = (v: unknown, name: string) => {
  const s = short(v, name);
  if (!s || !/^https?:\/\/[^\s"'<>]+$/i.test(s)) throw new Error(`${name} must be an http(s) URL`);
  return s;
};

// Each component: which props it keeps (normalized) and whether it takes children (of which types).
const CATALOG: Record<string, { props: (p: Record<string, unknown>, room: string) => Record<string, unknown>; kids?: string[] | "any" }> = {
  Card: { props: (p) => ({ title: short(p.title, "Card.title"), subtitle: short(p.subtitle, "Card.subtitle") }), kids: "any" },
  Section: { props: (p) => ({ title: short(p.title, "Section.title") }), kids: "any" },
  Text: {
    props: (p) => {
      const content = long(p.content ?? p.text, "Text.content");
      if (!content) throw new Error("Text needs content");
      const style = ["plain", "bold", "muted", "code"].includes(String(p.style)) ? String(p.style) : "plain";
      return { content, style };
    },
  },
  Fields: { props: () => ({}), kids: ["Field"] },
  Field: { props: (p) => ({ label: short(p.label, "Field.label") ?? "", value: long(p.value, "Field.value") ?? "" }) },
  Table: {
    props: (p) => {
      const head = (Array.isArray(p.headers) ? p.headers : Array.isArray(p.columns) ? p.columns : []).slice(0, 10).map((x, i) => short(typeof x === "object" && x ? (x as { label?: unknown }).label : x, `Table.headers[${i}]`) ?? "");
      if (!Array.isArray(p.rows)) throw new Error("Table needs rows (a list of lists)");
      if (p.rows.length > 50) throw new Error("Table has more than 50 rows");
      const rows = p.rows.map((r, i) => {
        if (!Array.isArray(r)) throw new Error(`Table.rows[${i}] must be a list`);
        return r.slice(0, 10).map((c, j) => short(c, `Table.rows[${i}][${j}]`) ?? "");
      });
      return { headers: head, rows };
    },
  },
  Chart: {
    props: (p) => {
      const data = Array.isArray(p.data) ? p.data : [];
      if (!data.length || data.length > 30) throw new Error("Chart needs 1-30 points in data: [{label, value}]");
      return {
        title: short(p.title, "Chart.title"),
        kind: p.kind === "line" || p.chartType === "line" ? "line" : "bar",
        data: data.map((d, i) => {
          const value = Number((d as { value?: unknown })?.value);
          if (!Number.isFinite(value)) throw new Error(`Chart.data[${i}].value must be a number`);
          return { label: short((d as { label?: unknown })?.label, `Chart.data[${i}].label`) ?? "", value };
        }),
      };
    },
  },
  Divider: { props: () => ({}) },
  // Only this room's own files: an outside image would be a tracking pixel on everyone who opens the room.
  Image: {
    props: (p, room) => {
      const url = short(p.url ?? p.src, "Image.url") ?? "";
      const m = url.match(/^(?:https?:\/\/[^/]+)?\/api\/books\/([a-z0-9]+)\/files\/([a-z0-9]+)$/);
      if (!m || m[1] !== room) throw new Error("Image.url must be a file of this room (/api/books/<room>/files/<id>, e.g. from upload_file)");
      return { url: `/api/books/${m[1]}/files/${m[2]}`, alt: short(p.alt, "Image.alt") };
    },
  },
  Actions: { props: () => ({}), kids: ["Button", "LinkButton"] },
  Button: {
    props: (p) => {
      const label = short(p.label, "Button.label");
      if (!label) throw new Error("Button needs a label");
      return { label, value: short(p.value, "Button.value"), style: p.style === "primary" || p.style === "danger" ? p.style : undefined };
    },
  },
  // url: an http(s) link (new tab), or a place in the room: "#m<id>" a message, "#e<epic id>" an epic's thread,
  // "#doc" / "#doc:<epic id>" the room's or an epic's doc.
  LinkButton: { props: (p) => ({ label: short(p.label, "LinkButton.label") ?? "Abrir", url: /^#(m\d{1,9}|e[a-z0-9]{4,16}|doc(:[a-z0-9]{4,16})?)$/.test(String(p.url ?? "")) ? String(p.url) : httpUrl(p.url, "LinkButton.url (http(s), or #m<message id>, #e<epic id>, #doc, #doc:<epic id>)") }) },
};
export const CARD_TYPES = Object.keys(CATALOG);

/** Validates and normalizes a card spec, or throws a message the agent can act on. */
export function cardOf(raw: unknown, room: string): Card {
  const spec = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!spec || typeof spec !== "object") throw new Error("card must be an object: { root, elements }");
  const { root, elements } = spec as { root?: unknown; elements?: unknown };
  if (typeof root !== "string" || !elements || typeof elements !== "object") throw new Error("card must be { root: <id>, elements: { <id>: { type, props, children } } }");
  const src = elements as Record<string, { type?: unknown; props?: unknown; children?: unknown }>;
  if (Object.keys(src).length > 150) throw new Error("card has more than 150 elements");
  const out: Record<string, CardEl> = {};
  const walk = (id: string, depth: number, parent?: string[] | "any") => {
    if (depth > 8) throw new Error("card is nested more than 8 levels");
    if (out[id]) throw new Error(`element ${id} is used twice`);
    const el = src[id];
    if (!el) throw new Error(`element ${id} is missing from elements`);
    const type = String(el.type);
    const def = CATALOG[type];
    if (!def) throw new Error(`unknown component ${type}; use one of ${CARD_TYPES.join(", ")}`);
    if (parent && parent !== "any" && !parent.includes(type)) throw new Error(`${type} can't be inside this parent (allowed: ${parent.join(", ")})`);
    const props = Object.fromEntries(Object.entries(def.props((el.props ?? {}) as Record<string, unknown>, room)).filter(([, v]) => v !== undefined));
    const kids = Array.isArray(el.children) ? el.children.map(String) : [];
    if (kids.length && !def.kids) throw new Error(`${type} takes no children`);
    out[id] = { type, props, children: kids };
    for (const k of kids) walk(k, depth + 1, def.kids);
  };
  walk(root, 0);
  if (out[root].type !== "Card") throw new Error("the root element must be a Card");
  return { root, elements: out };
}

/** Every string in the card, for the secret filter and as the message's searchable text. */
export const cardText = (c: Card) =>
  Object.values(c.elements)
    .flatMap((e) => Object.values(e.props).flatMap((v) => (Array.isArray(v) ? v.flat(2).map((x) => (typeof x === "object" && x ? Object.values(x).join(" ") : String(x))) : typeof v === "string" ? [v] : [])))
    .join("\n");

