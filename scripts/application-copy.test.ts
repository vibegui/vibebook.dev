import { expect, test } from "bun:test";
import {
  applicationLocale,
  createApplicationCopy,
  resolveApplicationLanguage,
} from "../svelte/features/application/copy";
test("application language keeps cookie precedence, browser fallback and original locale mapping", () => {
  expect(resolveApplicationLanguage("other=1; vb_lang=en", "pt-BR")).toBe("en");
  expect(resolveApplicationLanguage("vb_lang=pt; other=1", "en-US")).toBe("pt");
  expect(resolveApplicationLanguage("not_vb_lang=en", "pt-BR")).toBe("pt");
  expect(resolveApplicationLanguage("vb_lang=fr", "en-GB")).toBe("en");
  expect(resolveApplicationLanguage("", "es")).toBe("pt");
  expect(applicationLocale("en")).toBe("en-US");
  expect(applicationLocale("pt")).toBe("pt-BR");
});
test("application copy preserves exact translations, Portuguese fallback and interpolation semantics", () => {
  const en = createApplicationCopy("en"),
    pt = createApplicationCopy("pt");
  expect(en("Apagar")).toBe("Delete");
  expect(pt("Apagar")).toBe("Apagar");
  expect(en("An unknown key {n}", { n: 0 })).toBe("An unknown key 0");
  expect(en("lido por {who}", { who: "Ada" })).toBe("read by Ada");
  expect(en("lido por {who}")).toBe("read by {who}");
  expect(en("toString")).toBe("toString");
  expect(en("constructor")).toBe("constructor");
  expect(en("{toString}", {})).toBe("{toString}");
  expect(pt("{first} / {missing} / {first}", { first: "<script>" })).toBe(
    "<script> / {missing} / <script>",
  );
  expect(pt("{name-with-dash}", { "name-with-dash": "unchanged" })).toBe(
    "{name-with-dash}",
  );
});
