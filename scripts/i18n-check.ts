import { inspectLegacyTranslations, translationKeys } from "./i18n-policy";
const source = await Bun.file(
  new URL("../svelte/features/application/copy.ts", import.meta.url),
).text();
const {
  translations: EN,
  keys: dictionaryKeys,
  leftovers,
} = inspectLegacyTranslations(source);
const keys = new Set(dictionaryKeys);
for await (const file of new Bun.Glob("svelte/**/*.{svelte,ts}").scan("."))
  for (const key of translationKeys(await Bun.file(file).text(), file))
    keys.add(key);
const missing = [...keys].filter((key) => !Object.hasOwn(EN, key));
const unused = Object.keys(EN).filter((key) => !keys.has(key));
const placeholders = (text: string) =>
  [...text.matchAll(/\{(\w+)\}/g)]
    .map((match) => match[1])
    .sort()
    .join(",");
const mismatches = Object.entries(EN).filter(
  ([key, value]) => placeholders(key) !== placeholders(value),
);
console.log(`${keys.size} keys, ${Object.keys(EN).length} in EN`);
if (unused.length)
  console.log(
    `unused EN entries (${unused.length}):\n  ${unused.join("\n  ")}`,
  );
if (mismatches.length)
  console.log(
    `placeholder mismatch:\n${mismatches.map(([key]) => key).join("\n")}`,
  );
if (missing.length)
  console.log(
    `missing in EN:\n${missing.map((key) => JSON.stringify(key)).join("\n")}`,
  );
if (leftovers.length)
  console.log(
    `Portuguese outside t():\n${leftovers.map(({ line, text }) => `${line}: ${text}`).join("\n")}`,
  );
const failed = missing.length || mismatches.length || leftovers.length;
console.log(failed ? "FAIL" : "ok");
process.exit(failed ? 1 : 0);
