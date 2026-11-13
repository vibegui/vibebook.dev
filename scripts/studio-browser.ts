import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import type { Page } from "@playwright/test";
import * as z from "zod/mini";

const values = z.record(z.string(), z.string());
const reference = z
  .object({
    light: values,
    darkOverrides: values,
    themeVariables: values,
    referenceRules: z.array(
      z.object({
        selector: z.string(),
        conditions: z.array(z.string()),
        declarations: values,
      }),
    ),
  })
  .parse(
    JSON.parse(
      await readFile(
        new URL("../docs/svelte-migration/studio-tokens.json", import.meta.url),
        "utf8",
      ),
    ),
  );

/** Compare the actual built theme with the frozen source; workspace role evidence is a separate M4 gate. */
export async function verifyStudioPalette(page: Page, theme: "light" | "dark") {
  const report = await page.evaluate(
    ({ reference, theme }) => {
      const baseline: Record<string, string> = {};
      for (const rule of reference.referenceRules) {
        if (
          (rule.selector === ":root" ||
            (theme === "dark" && rule.selector === ".dark")) &&
          rule.conditions.every((condition) => {
            if (condition.startsWith("@layer ")) return true;
            if (condition.startsWith("@supports "))
              return CSS.supports(condition.slice(10));
            if (condition.startsWith("@media "))
              return matchMedia(condition.slice(7)).matches;
            throw new Error(`Unsupported reference condition: ${condition}`);
          })
        )
          Object.assign(baseline, rule.declarations);
      }
      const keys = new Set(
        Object.entries(baseline)
          .filter(
            ([, value]) =>
              !value.startsWith("var(") && CSS.supports("color", value),
          )
          .map(([key]) => key),
      );
      let previous = -1;
      while (previous !== keys.size) {
        previous = keys.size;
        for (const [key, value] of Object.entries(baseline)) {
          const alias = /^var\((--[\w-]+)\)$/.exec(value)?.[1];
          if (alias && keys.has(alias)) keys.add(key);
        }
      }
      const properties = Object.fromEntries(
        Object.keys(baseline).map((key) => {
          if (keys.has(key)) return [key, "color"];
          if (/^--font-(sans|serif|mono)$/.test(key))
            return [key, "font-family"];
          if (key.startsWith("--ease-"))
            return [key, "transition-timing-function"];
          if (key.includes("shadow") || key.startsWith("--edge-"))
            return [key, "box-shadow"];
          if (key.includes("radius")) return [key, "border-radius"];
          if (key === "--border-hairline") return [key, "border-top-width"];
          if (key.endsWith("height")) return [key, "height"];
          if (key === "--spacing" || key === "--user-color-strength")
            return [key, "width"];
          throw new Error(`Unmapped Studio property ${key}`);
        }),
      );
      const expected = document.createElement("span");
      const actual = document.createElement("span");
      // These probes belong to the verification harness, never application source.
      expected.hidden = actual.hidden = true;
      expected.style.borderTopStyle = actual.style.borderTopStyle = "solid";
      for (const [key, value] of Object.entries(baseline))
        expected.style.setProperty(key, value);
      for (const [key, value] of Object.entries(reference.themeVariables))
        if (key.startsWith("--font-weight-"))
          expected.style.setProperty(key, value);
      document.body.append(expected, actual);
      const mismatches: { role: string; expected: string; actual: string }[] =
        [];
      try {
        for (const [key, property] of Object.entries(properties)) {
          expected.style.setProperty(property, `var(${key})`);
          actual.style.setProperty(property, `var(--vb-${key.slice(2)})`);
          const expectedColor =
            getComputedStyle(expected).getPropertyValue(property);
          const actualColor =
            getComputedStyle(actual).getPropertyValue(property);
          if (expectedColor !== actualColor)
            mismatches.push({
              role: key,
              expected: expectedColor,
              actual: actualColor,
            });
        }
        const primary = [...document.querySelectorAll("button")].find(
          (node) => node.textContent?.trim() === "primary",
        );
        const main = document.querySelector("[data-gallery]");
        const card = main?.querySelector("section");
        const input = document.getElementById("gallery-title");
        const code = main?.querySelector("pre");
        if (!primary || !main || !card || !input || !code)
          throw new Error("Missing gallery role probes");
        const roles = [
          {
            role: "page background",
            node: main,
            property: "background-color",
            cssVariable: "--background",
          },
          {
            role: "card background",
            node: card,
            property: "background-color",
            cssVariable: "--card",
          },
          {
            role: "primary background",
            node: primary,
            property: "background-color",
            cssVariable: "--primary",
          },
          {
            role: "primary label",
            node: primary,
            property: "color",
            cssVariable: "--primary-foreground",
          },
          {
            role: "input background",
            node: input,
            property: "background-color",
            cssVariable: "--studio-input-background",
          },
          {
            role: "UI family",
            node: main,
            property: "font-family",
            cssVariable: "--font-sans",
          },
          {
            role: "code family",
            node: code,
            property: "font-family",
            cssVariable: "--font-mono",
          },
          {
            role: "body weight",
            node: main,
            property: "font-weight",
            cssVariable: "--font-weight-normal",
          },
          {
            role: "action weight",
            node: primary,
            property: "font-weight",
            cssVariable: "--font-weight-medium",
          },
        ];
        for (const role of roles) {
          expected.style.setProperty(role.property, `var(${role.cssVariable})`);
          const expectedValue = getComputedStyle(expected).getPropertyValue(
            role.property,
          );
          const actualValue = getComputedStyle(role.node).getPropertyValue(
            role.property,
          );
          if (expectedValue !== actualValue)
            mismatches.push({
              role: role.role,
              expected: expectedValue,
              actual: actualValue,
            });
        }
        return {
          theme,
          devicePixelRatio,
          tokens: Object.keys(properties).length,
          colorTokens: keys.size,
          roles: roles.length,
          mismatches,
        };
      } finally {
        expected.remove();
        actual.remove();
      }
    },
    { reference, theme },
  );
  assert.deepEqual(
    report.mismatches,
    [],
    `Studio frozen-source ${theme} token/role mismatch`,
  );
  return report;
}
