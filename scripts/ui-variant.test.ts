import { describe, expect, test } from "bun:test";
import { uiNavigationUrl, uiShellPath, uiVariant } from "../shared/uiVariant";
import { createUiNavigation } from "../svelte/navigation";
import { readFile } from "node:fs/promises";

describe("explicit per-URL preview selection", () => {
  test("normal and unknown URLs always select vanilla", () => {
    for (const query of [
      "",
      "?ui=vanilla",
      "?ui=unknown",
      "?ui=SVELTE",
      "?t=epic",
    ])
      expect(uiShellPath(`https://vibebook.dev/b/abcdef${query}`)).toBe("/app");
    expect(uiVariant("https://vibebook.dev/app?ui=svelte")).toBe("svelte");
    expect(uiShellPath("https://vibebook.dev/b/abcdef?t=epic&ui=svelte")).toBe(
      "/app-svelte",
    );
  });
  test("navigation retains the variant, thread, login continuation and file hash", () => {
    const current = "https://vibebook.dev/b/abcdef?ui=svelte";
    expect(uiNavigationUrl("/b/123abc?t=epic#f123", current, "svelte")).toBe(
      "/b/123abc?t=epic&ui=svelte#f123",
    );
    expect(
      uiNavigationUrl("/login?next=%2Fb%2Fabcdef", current, "svelte"),
    ).toBe("/login?next=%2Fb%2Fabcdef&ui=svelte");
    expect(uiNavigationUrl("/app?ui=svelte", current, "vanilla")).toBe("/app");
    for (const target of [
      "/api/books/abcdef/files",
      "https://other.example/app",
      "/pt",
      "mailto:a@example.test",
    ])
      expect(uiNavigationUrl(target, current, "svelte")).toBe(target);
  });
  test("history adapter preserves state and leaves history API untouched", () => {
    const calls: unknown[][] = [];
    const history = {
      pushState(...args: unknown[]) {
        calls.push(args);
      },
      replaceState(...args: unknown[]) {
        calls.push(args);
      },
    };
    const original = history.pushState;
    const navigation = createUiNavigation(
      history,
      () => "https://vibebook.dev/app?ui=svelte",
      "svelte",
    );
    const sheet = { sheet: 1 };
    navigation.pushState(sheet, "", "/b/abcdef?t=epic");
    navigation.replaceState(null, "", "/archived");
    navigation.pushState(null, "");
    expect(calls).toEqual([
      [sheet, "", "/b/abcdef?t=epic&ui=svelte"],
      [null, "", "/archived?ui=svelte"],
      [null, "", undefined],
    ]);
    expect(history.pushState).toBe(original);
  });
  test("preview shell and vanilla shell use disjoint entry assets", async () => {
    const vanilla = await readFile(
      new URL("../public/app.html", import.meta.url),
      "utf8",
    );
    const preview = await readFile(
      new URL("../public/app-svelte.html", import.meta.url),
      "utf8",
    );
    expect(vanilla).not.toContain("/svelte-preview/");
    expect(vanilla).not.toContain('name="vb-ui"');
    expect(vanilla).toContain('import("/svelte/ui.js")');
    expect(preview).toContain('name="vb-ui" content="svelte"');
    expect(preview).toContain("/svelte-preview/app.js");
    expect(preview).not.toContain('src="/svelte/ui.js"');
  });
});
