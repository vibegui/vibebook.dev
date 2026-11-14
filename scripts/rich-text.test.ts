import { expect, test } from "bun:test";
import { richText } from "../svelte/features/rich-text/project";
import { createRichSession } from "../svelte/features/rich-text/session";
import { safeUrl } from "../svelte/features/rich-text/links";
import {
  createFileChipIndex,
  hasMissingFileReference,
} from "../svelte/features/rich-text/fileIndex";
import {
  RoomCommandSchema,
  type CommandOutcome,
  type RoomCommand,
} from "../shared/commands";
import type { RichContext, RichNode } from "../svelte/features/rich-text/types";
const context: RichContext = {
  room: {
    id: "abc123",
    me: "jose@test.com",
    book: { title: "Room", owner: "jose@test.com" },
    members: ["jose@test.com", "other@test.com"],
    names: { "jose@test.com": "José Silva" },
    online: [],
    messages: [],
    typing: {},
    suggestions: [],
    epics: [],
  },
  pageUrl: "https://example.test/b/abc123",
  idPrefix: "fixture",
};
const walk = (nodes: readonly RichNode[]): RichNode[] =>
  nodes.flatMap((node) => [
    node,
    ...("children" in node ? walk(node.children) : []),
  ]);
const text = (nodes: readonly RichNode[]): string =>
  nodes
    .map((node) =>
      node.kind === "text" || node.kind === "mention"
        ? node.text
        : text(node.children),
    )
    .join("");
const tags = (nodes: readonly RichNode[]) =>
  walk(nodes)
    .filter((node) => node.kind === "element")
    .map((node) => String(node.tag));
test("GFM blocks, inline syntax, code, tables, lists, references and soft breaks remain native typed nodes", () => {
  const ast = richText(
    '# Heading\n\n> quoted **strong** and *em* ~~gone~~ `x < y`\n\n3. three\n4. four\n\n- [x] checked\n- [ ] open\n\n| A | B |\n|:-|--:|\n| one | two |\n\n```ts\nconst x = "<script>";\n```\n\n[reference][r]\n\n[r]: https://example.org "Title"\n\nfirst\nsecond\n\n---',
    "markdown",
    context,
  );
  for (const tag of [
    "h1",
    "blockquote",
    "strong",
    "em",
    "del",
    "code",
    "ol",
    "ul",
    "li",
    "table",
    "thead",
    "tbody",
    "th",
    "td",
    "pre",
    "br",
    "hr",
  ])
    expect(tags(ast)).toContain(tag);
  expect(text(ast)).toContain('const x = "<script>";');
  expect(tags(ast)).not.toContain("script");
  expect(walk(ast).some((n) => n.kind === "link" && n.title === "Title")).toBe(
    true,
  );
  expect(walk(ast).some((n) => n.kind === "element" && n.task === true)).toBe(
    true,
  );
});
test("raw inline tags spanning lexer tokens and cross-block details retain semantic nesting", () => {
  const inline = richText(
    "before <em>plain **strong** &amp; `code`</em> after",
    "markdown",
    context,
  );
  const em = walk(inline).find((n) => n.kind === "element" && n.tag === "em")!;
  expect("children" in em ? tags(em.children) : []).toContain("strong");
  expect(text(inline)).toBe("before plain strong & code after");
  const ast = richText(
    "<details open><summary>Summary</summary>\n\n**Body**\n\n</details>",
    "markdown",
    context,
  );
  const details = ast.find((n) => n.kind === "element" && n.tag === "details")!;
  expect(details.kind === "element" && details.attrs.open).toBe(true);
  expect("children" in details ? tags(details.children) : []).toContain(
    "summary",
  );
  expect("children" in details ? tags(details.children) : []).toContain(
    "strong",
  );
});
test("hostile raw HTML loses execution, first-party action hooks, styles, classes and raw IDs", () => {
  const ast = richText(
    '<div id="m1" class="vcard" data-cardbtn="7" data-v="approve" onclick="evil()" style="position:fixed" role="button" tabindex="0"><script>evil()</script><style>body{display:none}</style><iframe src="https://evil.test"></iframe><img src=x onerror=evil()><form action="javascript:evil()"><button>harmless label</button></form><b>safe</b></div>',
    "markdown",
    context,
  );
  expect(tags(ast)).toContain("b");
  for (const forbidden of [
    "script",
    "style",
    "iframe",
    "img",
    "form",
    "button",
  ])
    expect(tags(ast)).not.toContain(forbidden);
  expect(text(ast)).not.toContain("evil()");
  expect(text(ast)).toContain("harmless label");
  for (const node of walk(ast))
    if (node.kind === "element") {
      for (const attr of [
        "style",
        "class",
        "data-cardbtn",
        "data-v",
        "onclick",
        "role",
        "tabindex",
      ])
        expect(node.attrs[attr]).toBeUndefined();
      expect(node.attrs.id).not.toBe("m1");
    }
});
test("URL decoding and normalization preserve baseline safe schemes while rejecting executable/data/custom schemes", () => {
  for (const href of [
    "https://example.test",
    "http://example.test",
    "ftp://example.test",
    "ftps://example.test",
    "mailto:a@example.test",
    "tel:123",
    "callto:123",
    "sms:123",
    "cid:part",
    "xmpp:a@example.test",
    "../relative",
    "#local",
    "",
  ])
    expect(safeUrl(href, context.pageUrl)).not.toBeNull();
  for (const href of [
    "javascript:evil()",
    "jav&#x61;script:evil()",
    "java\nscript:evil()",
    "data:text/html,evil",
    "vbscript:evil()",
    "file:///private",
    "custom:run",
  ])
    expect(safeUrl(href, context.pageUrl)).toBeNull();
  const ast = richText(
    "[bad](jav&#x61;script:evil()) [good](https://example.test)",
    "markdown",
    context,
  );
  expect(walk(ast).filter((n) => n.kind === "link")).toHaveLength(1);
  expect(text(ast)).toContain("bad");
});
test("human mode stays literal; mentions, diacritic aliases, unknown shortcodes and source-wide code emoji remain compatible", () => {
  const ast = richText(
    "<b>literal</b> @José @AI :thumbsup: :unknown: https://example.org/path.",
    "human",
    context,
  );
  expect(tags(ast)).toEqual([]);
  expect(text(ast)).toContain("<b>literal</b> @José @AI 👍 :unknown:");
  expect(
    walk(ast)
      .filter((n) => n.kind === "mention")
      .map((n) => n.who),
  ).toEqual(["jose@test.com", "ai"]);
  expect(walk(ast).find((n) => n.kind === "link")?.target.href).toBe(
    "https://example.org/path",
  );
  expect(text(richText("`:fire:`", "markdown", context))).toBe("🔥");
});
test("GitHub chip classification preserves custom labels and reserved paths", () => {
  const ast = richText(
    "[https://github.com/org/repo/pull/42](https://github.com/org/repo/pull/42?x=1#top) [**Custom**](https://github.com/org/repo/commit/123456789) [reserved](https://github.com/settings/profile)",
    "markdown",
    context,
  );
  const links = walk(ast).filter((n) => n.kind === "link");
  expect(links[0].kind === "link" && links[0].target).toMatchObject({
    kind: "github",
    label: "org/repo #42",
  });
  expect(links[1].kind === "link" && links[1].target).toMatchObject({
    kind: "github",
    label: "",
  });
  expect(tags("children" in links[1] ? links[1].children : [])).toContain(
    "strong",
  );
  expect(links[2].kind === "link" && links[2].target.kind).toBe("url");
});
test("file chips keep exact immutable ID/version and partial-index fallback; foreign-room links remain ordinary", () => {
  const file = {
    id: "aa11",
    name: "report.html",
    type: "text/html",
    author: "jose@test.com",
    size: 10,
    ts: 1,
  };
  const ctx = {
    ...context,
    room: { ...context.room, files: [{ ...file, id: "bb22", ts: 2 }, file] },
  };
  const ast = richText(
    "[old](/api/books/abc123/files/aa11) [unknown](/api/books/abc123/files/cc33) [foreign](/api/books/def456/files/aa11)",
    "markdown",
    ctx,
  );
  const links = walk(ast).filter((n) => n.kind === "link");
  expect(links[0].kind === "link" && links[0].target).toMatchObject({
    kind: "file",
    file: { id: "aa11", name: "report.html" },
    version: 1,
  });
  expect(links[1].kind === "link" && links[1].target).toMatchObject({
    kind: "file",
    file: { id: "cc33", name: "unknown" },
  });
  expect(links[2].kind === "link" && links[2].target.kind).toBe("url");
});
test("missing chip loads one typed full index per partial snapshot and localizes before canonical name arrives", async () => {
  const sent: RoomCommand[] = [];
  let resolve!: (value: CommandOutcome) => void;
  const pending = new Promise<CommandOutcome>((done) => {
    resolve = done;
  });
  const owner = createFileChipIndex(
    context.room.id,
    context.room.me,
    () => true,
    (command) => {
      sent.push(RoomCommandSchema.parse(command));
      return pending;
    },
  );
  const partial = { ...context.room, filesAll: false, files: [] };
  owner.sync(partial);
  const session = createRichSession(),
    source = "https://example.test/api/books/abc123/files/aa11";
  const before = session.render(source, "human", {
    ...context,
    room: partial,
    fileLabel: "file",
  });
  expect(hasMissingFileReference(before)).toBe(true);
  const firstLink = walk(before).find((node) => node.kind === "link");
  expect(firstLink?.kind === "link" && firstLink.target).toMatchObject({
    kind: "file",
    file: { name: "file", id: "aa11" },
  });
  const portuguese = session.render(source, "human", {
    ...context,
    room: partial,
    fileLabel: "arquivo",
  });
  expect(portuguese).not.toBe(before);
  expect(walk(portuguese).find((node) => node.kind === "link")).toMatchObject({
    target: { file: { name: "arquivo" } },
  });
  const loading = owner.load();
  await owner.load();
  expect(sent).toEqual([{ t: "files.get" }]);
  resolve({ ok: true });
  await loading;
  await owner.load();
  expect(sent).toHaveLength(1); // ACK is not a full canonical list or a reason to retry.
  const file = {
    id: "aa11",
    name: "Older report.md",
    type: "text/markdown",
    author: context.room.me,
    size: 12,
    ts: 1,
  };
  const full = { ...partial, filesAll: true, files: [file] };
  owner.sync(full);
  const after = session.render(source, "human", {
    ...context,
    room: full,
    fileLabel: "file",
  });
  expect(hasMissingFileReference(after)).toBe(false);
  expect(walk(after).find((node) => node.kind === "link")).toMatchObject({
    target: { attachment: file, file: { name: file.name, id: file.id } },
  });
  await owner.load();
  expect(sent).toHaveLength(1);
  owner.dispose();
  session.dispose();
});
test("file-index read refuses automatic retry, foreign-room links, departed scope and revoked cached snapshots", async () => {
  let current = true;
  const sent: RoomCommand[] = [];
  const owner = createFileChipIndex(
    context.room.id,
    context.room.me,
    () => current,
    async (command) => {
      sent.push(command);
      return { ok: false, error: "offline" };
    },
  );
  const partial = { ...context.room, filesAll: false };
  owner.sync(partial);
  await owner.load();
  await owner.load();
  expect(sent).toHaveLength(1);
  owner.sync(partial, true);
  await owner.load();
  expect(sent).toHaveLength(2);
  current = false;
  owner.sync(partial, true);
  await owner.load();
  expect(sent).toHaveLength(2);
  current = true;
  owner.sync({ ...partial, members: [] });
  owner.sync(partial, true);
  await owner.load();
  expect(sent).toHaveLength(2);
  expect(
    hasMissingFileReference(
      richText(
        "https://example.test/api/books/def456/files/aa11",
        "human",
        context,
      ),
    ),
  ).toBe(false);
  owner.dispose();
});
test("message/thread/doc targets are explicit while HTML local IDs and references are private", () => {
  const ast = richText(
    '<p id="local">section</p>\n\n[local](#local) [message](#m123) [thread](#eabc) [doc](#doc:abc)',
    "markdown",
    context,
  );
  const links = walk(ast).filter((n) => n.kind === "link");
  expect(links.map((n) => (n.kind === "link" ? n.target.kind : ""))).toEqual([
    "url",
    "message",
    "thread",
    "document",
  ]);
  expect(links[0].kind === "link" && links[0].target.href).toBe(
    "#vb-rich-fixture-1",
  );
  expect(
    walk(ast).some(
      (n) => n.kind === "element" && n.attrs.id === "vb-rich-fixture-1",
    ),
  ).toBe(true);
});
test("safe SVG/MathML namespaces and local references survive; foreign execution and external resources do not", () => {
  const ast = richText(
    '<svg viewBox="0 0 10 10" onload="evil()"><defs><linearGradient id="g"><stop offset="0" stop-color="red"/></linearGradient></defs><rect width="10" height="10" fill="url(#g)"/><image href="https://evil.test/tracker.png"/><foreignObject><button>evil UI</button></foreignObject></svg>\n\n<math><mfrac><mi>x</mi><mn>2</mn></mfrac></math>',
    "markdown",
    context,
  );
  expect(tags(ast)).toContain("svg");
  expect(tags(ast)).toContain("linearGradient");
  expect(tags(ast)).toContain("mfrac");
  expect(tags(ast)).not.toContain("foreignObject");
  const rect = walk(ast).find((n) => n.kind === "element" && n.tag === "rect")!;
  expect(rect.kind === "element" && rect.attrs.fill).toBe(
    "url(#vb-rich-fixture-1)",
  );
  const image = walk(ast).find(
    (n) => n.kind === "element" && n.tag === "image",
  )!;
  expect(image.kind === "element" && image.attrs.href).toBeUndefined();
  expect(text(ast)).not.toContain("evil UI");
});
test("private raw IDs win over application navigation and CSS resource disguises are discarded", () => {
  const ast = richText(
    '<p id="m123">local</p><a href="#m123">local jump</a><svg><rect fill="u\\72l(https://tracker.invalid/p.svg#p)" stroke="u/**/rl(https://tracker.invalid/p.svg#p)"/></svg>',
    "markdown",
    context,
  );
  const link = walk(ast).find((n) => n.kind === "link")!;
  expect(link.kind === "link" && link.target).toMatchObject({
    kind: "url",
    href: "#vb-rich-fixture-1",
    external: false,
  });
  const rect = walk(ast).find((n) => n.kind === "element" && n.tag === "rect")!;
  expect(rect.kind === "element" && rect.attrs.fill).toBeUndefined();
  expect(rect.kind === "element" && rect.attrs.stroke).toBeUndefined();
});
test("source, token, tree and SVG budgets fall back to one escaped literal node", () => {
  for (const source of [
    "x".repeat(65537),
    "<b>".repeat(70) + "nested" + "</b>".repeat(70),
    "<span>x</span>".repeat(2100),
    "<svg>" + "<rect/>".repeat(129) + "</svg>",
    "> ".repeat(70) + "nested",
  ]) {
    const ast = richText(source, "markdown", context);
    expect(ast).toEqual([{ kind: "text", text: source }]);
  }
  const ast = richText(
    '<svg><feTurbulence numOctaves="1000000" baseFrequency="1"/><rect width="1e100"/></svg>',
    "markdown",
    context,
  );
  for (const node of walk(ast))
    if (node.kind === "element") {
      expect(node.attrs.numOctaves).toBeUndefined();
      expect(node.attrs.width).toBeUndefined();
    }
});

test("generated Markdown mentions also obey the projected node budget", () => {
  const source = "@AI ".repeat(3000);
  expect(richText(source, "markdown", context)).toEqual([
    { kind: "text", text: source },
  ]);
});

test("message IDs never round or overflow typed navigation targets", () => {
  for (const id of ["9".repeat(400), "9007199254740992"]) {
    const links = walk(richText(`[jump](#m${id})`, "markdown", context)).filter(
      (n) => n.kind === "link",
    );
    expect(links[0].kind === "link" && links[0].target.kind).toBe("url");
  }
});

test("component cache reuses unchanged syntax/projection across receipt snapshots and resets relevant context", () => {
  const session = createRichSession();
  const first = session.render("**Hello** @AI", "markdown", context);
  const refreshed = {
    ...context,
    room: {
      ...context.room,
      online: ["other@test.com"],
      acks: [],
      messages: [],
    },
  };
  expect(session.render("**Hello** @AI", "markdown", refreshed) === first).toBe(
    true,
  );
  const named = {
    ...refreshed,
    room: {
      ...refreshed.room,
      names: { ...context.room.names, "other@test.com": "Other" },
    },
  };
  expect(session.render("**Hello** @AI", "markdown", named) === first).toBe(
    false,
  );
  const second = session.render("**Hello** @AI", "markdown", named);
  expect(session.render("**Changed**", "markdown", named) === second).toBe(
    false,
  );
  const changed = session.render("**Changed**", "markdown", named);
  expect(
    session.render("**Changed**", "markdown", {
      ...named,
      room: {
        ...named.room,
        files: [
          {
            id: "aa",
            name: "x",
            type: "text/plain",
            ts: 1,
            size: 1,
            author: "other@test.com",
          },
        ],
      },
    }) === changed,
  ).toBe(false);
  session.dispose();
  expect(session.render("literal", "markdown", context)).toEqual([
    { kind: "text", text: "literal" },
  ]);
});
