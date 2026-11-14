import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
const html = readFileSync(
  new URL("../public/app.html", import.meta.url),
  "utf8",
);
type Input = {
  value: string;
  clientHeight: number;
  style: { height: string };
  scrollHeight: number;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: string): void;
  oninput?: () => void;
};
function fixture(
  css: { supports?: (property: string, value: string) => boolean } | undefined,
) {
  const start = html.indexOf("const CONTENT_TEXTAREA_SIZING ="),
    end = html.indexOf("// Home composer: suggest", start);
  if (start < 0 || end < start) throw Error("Actual sizing function missing");
  const resize: (input: Input) => void = new Function(
    "CSS",
    `${html.slice(start, end)};return resizeTextarea;`,
  )(css);
  let reads = 0,
    marks = 0;
  const writes: string[] = [],
    attributes = new Map<string, string>();
  const input: Input = {
    value: "@hello",
    clientHeight: 48,
    style: {
      get height() {
        return writes.at(-1) ?? "";
      },
      set height(value: string) {
        writes.push(value);
      },
    },
    get scrollHeight() {
      reads++;
      return 123;
    },
    hasAttribute: (name) => attributes.has(name),
    setAttribute(name, value) {
      attributes.set(name, value);
      marks++;
    },
  };
  const roomStart = html.indexOf(
      "  input.oninput = () => {",
      html.indexOf("const updatePop ="),
    ),
    roomEnd = html.indexOf("  input.onblur =", roomStart);
  if (roomStart < 0 || roomEnd < roomStart)
    throw Error("Actual room input handler missing");
  let mentions = 0;
  const roomInput: () => void = new Function(
    "input",
    "resizeTextarea",
    "updatePop",
    "pop",
    "closePop",
    `${html.slice(roomStart, roomEnd)};return input.oninput;`,
  )(
    input,
    resize,
    () => mentions++,
    { hidden: true },
    () => {},
  );
  const homeStart = html.indexOf(
      "  ta.oninput =",
      html.indexOf("function wireAsk()"),
    ),
    homeEnd = html.indexOf("  ta.onkeydown =", homeStart);
  if (homeStart < 0 || homeEnd < homeStart)
    throw Error("Actual Home input handler missing");
  const homeInput: () => void = new Function(
    "ta",
    "resizeTextarea",
    `${html.slice(homeStart, homeEnd)};return ta.oninput;`,
  )(input, resize);
  return {
    roomInput,
    homeInput,
    writes,
    attributes,
    reads: () => reads,
    marks: () => marks,
    mentions: () => mentions,
  };
}
test("actual default room/Home input handlers avoid synchronous height measurement when browser sizing is supported", () => {
  const properties: string[][] = [],
    f = fixture({
      supports: (property, value) => {
        properties.push([property, value]);
        return true;
      },
    });
  expect(f.attributes.size).toBe(0); // Initial rows/geometry are unchanged until editing.
  for (let i = 0; i < 100; i++) {
    f.roomInput();
    f.homeInput();
  }
  expect(properties).toEqual([["field-sizing", "content"]]);
  expect(f.reads()).toBe(0);
  expect(f.writes).toEqual([]);
  expect(f.marks()).toBe(1);
  expect(f.attributes.get("data-content-size")).toBe("");
  expect(f.mentions()).toBe(100); // Mention handling is not deferred or removed.
  expect(html).toContain(
    "#askText[data-content-size], .composer textarea[data-content-size] { field-sizing: content; }",
  );
});
test("actual fallback expands overflowing fields without resetting height on every key", () => {
  for (const css of [undefined, {}, { supports: () => false }]) {
    const f = fixture(css);
    f.roomInput();
    f.homeInput();
    expect(f.reads()).toBe(4);
    expect(f.writes).toEqual(["123px", "123px"]);
    expect(f.attributes.size).toBe(0);
    expect(f.mentions()).toBe(1);
  }
});
