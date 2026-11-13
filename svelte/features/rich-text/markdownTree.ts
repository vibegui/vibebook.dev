import { Lexer, type Tokens } from "marked";
import {
  Parser,
  Token,
  html,
  defaultTreeAdapter,
  type DefaultTreeAdapterMap,
  type DefaultTreeAdapterTypes,
} from "parse5";
import { decodeHTML } from "entities";
export type MarkdownMetadata = { task?: boolean; language?: string };
type KnownToken =
  | Tokens.Space
  | Tokens.Code
  | Tokens.Heading
  | Tokens.Table
  | Tokens.Hr
  | Tokens.Blockquote
  | Tokens.List
  | Tokens.ListItem
  | Tokens.Paragraph
  | Tokens.HTML
  | Tokens.Text
  | Tokens.Def
  | Tokens.Escape
  | Tokens.Tag
  | Tokens.Image
  | Tokens.Link
  | Tokens.Strong
  | Tokens.Em
  | Tokens.Codespan
  | Tokens.Br
  | Tokens.Del;
/** Marked 12.0.2 is a lexer only. parse5 8.1.1 receives semantic tokens, not rendered Markdown HTML.
 * Its supplied streaming flush API preserves completed raw text before a semantic token is inserted.
 * One parser stack retains raw inline/block tags spanning multiple Markdown tokens, namespaces and table repair.
 * parse5 marks Parser/token-event helpers @internal even though it exports them. Their use is confined to this
 * exact-version adapter; upgrades must pass split-tag, namespace, table-repair and text-flush regressions.
 * No protected/underscore parser methods or HTML serialization/rendering APIs are called.
 */
export function markdownTree(source: string) {
  let emitted = 0,
    depth = 0;
  let pending: { tag: string; metadata: MarkdownMetadata } | undefined;
  const metadata = new WeakMap<
    DefaultTreeAdapterTypes.Element,
    MarkdownMetadata
  >();
  const adapter = {
    ...defaultTreeAdapter,
    createElement(
      ...args: Parameters<typeof defaultTreeAdapter.createElement>
    ) {
      if (++emitted > 4096) throw new Error("Rich parser node limit");
      const element = defaultTreeAdapter.createElement(...args);
      if (pending?.tag === args[0]) metadata.set(element, pending.metadata);
      return element;
    },
  };
  const parser = Parser.getFragmentParser<DefaultTreeAdapterMap>(null, {
    treeAdapter: adapter,
    scriptingEnabled: false,
  });
  const flush = () => parser.tokenizer.flushCurrentCharacterToken();
  function tag(
    name: string,
    start: boolean,
    attrs: Token.Attribute[] = [],
    meta?: MarkdownMetadata,
  ) {
    flush();
    pending = meta ? { tag: name, metadata: meta } : undefined;
    const token: Token.TagToken = {
      type: start ? Token.TokenType.START_TAG : Token.TokenType.END_TAG,
      tagName: name,
      tagID: html.getTagID(name),
      selfClosing: false,
      ackSelfClosing: false,
      attrs,
      location: null,
    };
    if (start) parser.onStartTag(token);
    else parser.onEndTag(token);
    pending = undefined;
  }
  function text(value: string) {
    flush();
    for (const part of value.split(/(\s+)/)) {
      if (!part) continue;
      const whitespace = /^\s+$/.test(part);
      const token: Token.CharacterToken = {
        type: whitespace
          ? Token.TokenType.WHITESPACE_CHARACTER
          : Token.TokenType.CHARACTER,
        chars: part,
        location: null,
      };
      if (whitespace) parser.onWhitespaceCharacter(token);
      else parser.onCharacter(token);
    }
  }
  const attrs = (values: Record<string, string | number | undefined>) =>
    Object.entries(values)
      .filter(
        (entry): entry is [string, string | number] => entry[1] !== undefined,
      )
      .map(([name, value]) => ({ name, value: String(value) }));
  const wrap = (
    name: string,
    children: Tokens.Generic[],
    attributes: Token.Attribute[] = [],
    meta?: MarkdownMetadata,
  ) => {
    tag(name, true, attributes, meta);
    tokens(children);
    tag(name, false);
  };
  function tokens(input: Tokens.Generic[], loose = false) {
    if (++depth > 48) throw new Error("Rich token depth limit");
    for (const raw of input) {
      const token = raw as KnownToken;
      switch (token.type) {
        case "space":
        case "def":
          break;
        case "html":
          parser.tokenizer.write(token.text, false);
          flush();
          break;
        case "heading":
          wrap(`h${token.depth}`, token.tokens);
          break;
        case "paragraph":
          wrap("p", token.tokens);
          break;
        case "blockquote":
          wrap("blockquote", token.tokens);
          break;
        case "strong":
        case "em":
        case "del":
          wrap(token.type, token.tokens);
          break;
        case "escape":
          text(decodeHTML(token.text));
          break;
        case "text":
          if ("tokens" in token && token.tokens) {
            if (loose) wrap("p", token.tokens);
            else tokens(token.tokens);
          } else text(decodeHTML(token.text));
          break;
        case "codespan":
          tag("code", true);
          text(decodeHTML(token.text));
          tag("code", false);
          break;
        case "code":
          tag("pre", true);
          tag("code", true, [], { language: token.lang?.split(/\s+/)[0] });
          text(token.text + "\n");
          tag("code", false);
          tag("pre", false);
          break;
        case "br":
          tag("br", true);
          break;
        case "hr":
          tag("hr", true);
          break;
        case "image":
          break; // The existing MD_PURIFY removes images; attachments own actual image rendering.
        case "link":
          wrap(
            "a",
            token.tokens,
            attrs({
              href: decodeHTML(token.href),
              title: token.title ? decodeHTML(token.title) : undefined,
            }),
          );
          break;
        case "list":
          tag(
            token.ordered ? "ol" : "ul",
            true,
            token.ordered && token.start !== 1
              ? attrs({ start: token.start })
              : [],
          );
          for (const item of token.items) {
            tag(
              "li",
              true,
              [],
              item.task ? { task: !!item.checked } : undefined,
            );
            tokens(item.tokens, token.loose);
            tag("li", false);
          }
          tag(token.ordered ? "ol" : "ul", false);
          break;
        case "list_item":
          tokens(token.tokens, token.loose);
          break;
        case "table":
          tag("table", true);
          tag("thead", true);
          tag("tr", true);
          token.header.forEach((cell, i) =>
            wrap(
              "th",
              cell.tokens,
              attrs({ align: token.align[i] || undefined }),
            ),
          );
          tag("tr", false);
          tag("thead", false);
          if (token.rows.length) {
            tag("tbody", true);
            for (const row of token.rows) {
              tag("tr", true);
              row.forEach((cell, i) =>
                wrap(
                  "td",
                  cell.tokens,
                  attrs({ align: token.align[i] || undefined }),
                ),
              );
              tag("tr", false);
            }
            tag("tbody", false);
          }
          tag("table", false);
          break;
        default:
          text(raw.raw);
      }
    }
    depth--;
  }
  tokens(Lexer.lex(source, { gfm: true, breaks: true }));
  parser.tokenizer.write("", true);
  return { fragment: parser.getFragment(), metadata };
}
