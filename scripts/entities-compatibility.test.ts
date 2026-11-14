import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import * as z from "zod/mini";
import { decodeHTML, decodeHTMLAttribute, decodeHTMLStrict } from "entities";
import {
  decodeHTML as legacyHTML,
  decodeHTMLAttribute as legacyAttribute,
  decodeHTMLStrict as legacyStrict,
} from "entities-legacy";
import { safeUrl } from "../svelte/features/rich-text/links";
import { richText } from "../svelte/features/rich-text/project";
import type { RichContext, RichNode } from "../svelte/features/rich-text/types";

const corpusBytes = readFileSync(
  new URL("./fixtures/entities/whatwg-entities.json", import.meta.url),
);
const corpus = z
  .record(
    z.string(),
    z.object({ codepoints: z.array(z.number()), characters: z.string() }),
  )
  .parse(JSON.parse(corpusBytes.toString()));
const decoders = [
  { mode: "default-legacy", current: decodeHTML, previous: legacyHTML },
  {
    mode: "attribute",
    current: decodeHTMLAttribute,
    previous: legacyAttribute,
  },
  { mode: "strict", current: decodeHTMLStrict, previous: legacyStrict },
];
function differences(inputs: Iterable<string>) {
  const changed: {
    mode: string;
    input: string;
    previous: string;
    current: string;
  }[] = [];
  let compared = 0;
  for (const input of inputs)
    for (const decoder of decoders) {
      const previous = decoder.previous(input),
        current = decoder.current(input);
      compared++;
      if (previous !== current)
        changed.push({ mode: decoder.mode, input, previous, current });
    }
  return { changed, compared };
}

test("entities9 preserves all pinned WHATWG named references and v7 legacy/strict/attribute boundaries", () => {
  expect(createHash("sha256").update(corpusBytes).digest("hex")).toBe(
    "d741d877ac77c4194c4ad526b5b4a19aef8dfe411ab840a466891cdbb9f362e6",
  );
  expect(Object.keys(corpus)).toHaveLength(2231);
  const inputs: string[] = [];
  for (const [name, reference] of Object.entries(corpus)) {
    expect(String.fromCodePoint(...reference.codepoints)).toBe(
      reference.characters,
    );
    expect(decodeHTML(name)).toBe(reference.characters);
    for (const suffix of ["", "=", "x", "0", ";", "&amp;", " ", ">", "_"])
      inputs.push(name + suffix, `prefix${name}${suffix}tail`);
  }
  const result = differences(inputs);
  expect(result.compared).toBe(2231 * 18 * 3);
  expect(result.changed).toEqual([]);
});

test("numeric Unicode replacement, malformed and partial entity decoding stays compatible", () => {
  const points = [
    0,
    1,
    8,
    9,
    10,
    13,
    31,
    32,
    127,
    ...Array.from({ length: 32 }, (_, i) => 128 + i),
    160,
    0x200d,
    0x2019,
    0x201d,
    0xd7ff,
    0xd800,
    0xdbff,
    0xdc00,
    0xdfff,
    0xe000,
    0xfffd,
    0xffff,
    0x10000,
    0x1f600,
    0x10ffff,
    0x110000,
    Number.MAX_SAFE_INTEGER,
  ];
  // Deterministic samples across the complete Unicode range, not random trials.
  for (let i = 0; i < 512; i++) points.push((i * 7919) % 0x110001);
  const inputs = [
    "",
    "&",
    "&&",
    "&#",
    "&#x",
    "&#X;",
    "&#-1;",
    "&#x-1;",
    "&#wat;",
    "&unknown;",
    "&notit;",
    "&amp=",
    "&ampx",
    "&AMP;",
    "&#" + "9".repeat(400) + ";",
    "&#x" + "f".repeat(400) + ";",
  ];
  for (const point of points)
    for (const value of [
      `&#${point}`,
      `&#x${point.toString(16)}`,
      `&#X${point.toString(16).toUpperCase()}`,
    ])
      for (const suffix of ["", ";", "=x", "z", ";&amp;"])
        inputs.push(value + suffix);
  const result = differences(inputs);
  expect(result.compared).toBe(inputs.length * 3);
  expect(result.changed).toEqual([]);
});

const context: RichContext = {
  room: {
    id: "abc123",
    me: "reader@example.test",
    book: { title: "Entity corpus", owner: "reader@example.test" },
    members: ["reader@example.test"],
    online: [],
    messages: [],
    typing: {},
    suggestions: [],
    epics: [],
  },
  pageUrl: "https://example.test/b/abc123",
  idPrefix: "entities-compatibility",
};
const walk = (nodes: readonly RichNode[]): RichNode[] =>
  nodes.flatMap((node) => [
    node,
    ...("children" in node ? walk(node.children) : []),
  ]);
test("candidate decoder keeps encoded executable/control URLs rejected through actual native projections", () => {
  for (const input of [
    "javascript&colon;alert(1)",
    "jav&#x61;script:alert(1)",
    "java&Tab;script&colon;alert(1)",
    "java&NewLine;script:alert(1)",
    "&#106;&#97;&#118;&#97;script&#58;alert(1)",
    "\u0000javascript:alert(1)",
    "data&colon;text/html,evil",
    "d&#97;ta:text/html,evil",
    "vbscript&colon;evil",
    "file&colon;///private",
    "custom&colon;run",
  ]) {
    expect(decodeHTML(input)).toBe(legacyHTML(input));
    expect(safeUrl(input, context.pageUrl)).toBeNull();
  }
  expect(
    safeUrl("https&colon;//example.test/a?x=1&amp;y=2", context.pageUrl),
  ).toBe("https://example.test/a?x=1&y=2");
  expect(safeUrl("mailto&colon;a@example.test", context.pageUrl)).toBe(
    "mailto:a@example.test",
  );
  const nodes = richText(
    '<a href="java&Tab;script&colon;alert(1)">bad</a> <a href="data&colon;text/html,evil">bad data</a> <a href="https&colon;//example.test/?x=1&amp;y=2">safe &copy;</a> &lt;script&gt;literal&lt;/script&gt;',
    "markdown",
    context,
  );
  const links = walk(nodes).filter((node) => node.kind === "link");
  expect(links).toHaveLength(1);
  expect(links[0]).toMatchObject({
    kind: "link",
    target: { kind: "url", href: "https://example.test/?x=1&y=2" },
  });
  expect(
    walk(nodes).filter(
      (node) => node.kind === "element" && String(node.tag) === "script",
    ),
  ).toEqual([]);
});
