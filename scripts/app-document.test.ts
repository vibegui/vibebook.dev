import { describe, expect, test } from "bun:test";
import { parse } from "parse5";
import { withAppDocumentBootstrap } from "../shared/appDocument";
import { APP_DOCUMENT_NONCE_PLACEHOLDER } from "../shared/appDocumentProtocol";
import { appDocumentBootstrap } from "../shared/generated/appDocumentBootstrap";

const nonce = "a1".repeat(32);
describe("app document bootstrap insertion", () => {
  test.each([
    "<!doctype html><title>App</title><script>window.original=1</script>",
    "\ufeff<!--original prelude--><!DOCTYPE HTML><html><body>Olá</body></html>",
    '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><p>App</p>',
    "<p>Original quirks document</p><script>window.original=1</script>",
    "<script>window.original=1</script><!doctype html><p>Late ignored doctype</p>",
  ])("preserves original content and document mode: %s", (html) => {
    const result = withAppDocumentBootstrap(html, nonce);
    const inserted = `<script>${appDocumentBootstrap.replace(APP_DOCUMENT_NONCE_PLACEHOLDER, nonce)}</script>`;
    expect(result.replace(inserted, "")).toBe(html);
    const decode = (value: string) =>
      value.startsWith("\ufeff") ? value.slice(1) : value;
    expect(parse(decode(result)).mode).toBe(parse(decode(html)).mode);
    const firstScript = result.indexOf("<script>");
    expect(result.slice(firstScript, firstScript + inserted.length)).toBe(
      inserted,
    );
    expect(result).not.toContain(APP_DOCUMENT_NONCE_PLACEHOLDER);
  });
  test("retains the encoding BOM before a standard-mode doctype", () => {
    const result = withAppDocumentBootstrap(
      "\ufeff<!doctype html><p>App</p>",
      nonce,
    );
    expect(result.startsWith("\ufeff<!doctype html><script>")).toBe(true);
  });
  test("rejects input outside the fixed nonce grammar instead of embedding script input", () => {
    for (const invalid of [
      "",
      "a".repeat(63),
      "a".repeat(65),
      "A".repeat(64),
      "</script><script>alert(1)</script>",
    ])
      expect(() =>
        withAppDocumentBootstrap("<!doctype html><p>App</p>", invalid),
      ).toThrow();
  });
  test("compiled script has exactly one nonce slot and cannot terminate its script element", () => {
    expect(
      appDocumentBootstrap.split(APP_DOCUMENT_NONCE_PLACEHOLDER),
    ).toHaveLength(2);
    expect(appDocumentBootstrap).not.toMatch(/<\/script/i);
  });
});
