import { expect, test } from "bun:test";
import { inspectLegacyTranslations, translationKeys } from "./i18n-policy";

test("formatted multiline translations retain keys without becoming Portuguese leftovers", () => {
  const source = `const EN = {"Apagar sala": "Delete room"};
    const label = t(\n/* explanation */\n"Apagar sala"\n);`;
  const result = inspectLegacyTranslations(source);
  expect(result.keys).toEqual(["Apagar sala"]);
  expect(result.leftovers).toEqual([]);
  expect(result.translations["Apagar sala"]).toBe("Delete room");
});

test("unwrapped Portuguese is still rejected with its original source line", () => {
  const result = inspectLegacyTranslations(
    'const EN = {};\nconst label = "Apagar sala";',
  );
  expect(result.leftovers).toEqual([{ line: 2, text: "Apagar sala" }]);
});

test("comments, regexes and deliberately non-UI data do not create translation calls or labels", () => {
  const source = `const EN = {};
    // t("Ignorar")
    const example = 't("Example")';
    const regex = /https:\\/\\/github.com/;
    const STOP = new Set([\n"para",\n"com"\n]);`;
  expect(translationKeys(source, "example.js")).toEqual([]);
  expect(inspectLegacyTranslations(source).leftovers).toEqual([]);
});

test("TypeScript calls support whitespace, property access and static template keys", () => {
  expect(
    translationKeys(
      'vb.t(\n"Gráfico"\n); t(`Apagar`); const example = \'t("fake")\';',
      "component.ts",
    ),
  ).toEqual(["Gráfico", "Apagar"]);
});

test("Svelte script and template expressions are parsed without translating inert examples", () => {
  const source =
    '<script lang="ts">const x: string = vb.t(\n"Escolha uma opção"\n);</script><p>{vb.t(\n"Apagar sala"\n)}</p><code>t("Not a call")</code>';
  expect(translationKeys(source, "Example.svelte").sort()).toEqual([
    "Apagar sala",
    "Escolha uma opção",
  ]);
});

test("dictionary inspection never executes code or silently accepts dynamic entries", () => {
  expect(() =>
    inspectLegacyTranslations('const EN = {"Apagar": execute()};'),
  ).toThrow("static string");
  expect(() =>
    inspectLegacyTranslations("const EN = loadTranslations();"),
  ).toThrow("object literal");
  expect(() => inspectLegacyTranslations("const other = {};")).toThrow(
    "Missing EN",
  );
});
