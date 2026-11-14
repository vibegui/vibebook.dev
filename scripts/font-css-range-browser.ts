// Inactive normal-Inter experiment. No application stylesheet/assets are changed.
import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import type { Browser } from "@playwright/test";
import * as z from "zod/mini";

const cssRange = z
  .string()
  .check(
    z.regex(/^U\+[0-9A-F]+(?:-[0-9A-F]+)?(?:,U\+[0-9A-F]+(?:-[0-9A-F]+)?)*$/),
  );
const Manifest = z.object({
  diagnosticOnly: z.literal(true),
  accepted: z.literal(false),
  sourceSHA256: z.string(),
  candidateSHA256: z.string(),
  primaryCSS: cssRange,
  mappedComplementCSS: cssRange,
  complementCSS: cssRange,
  mixedSamples: z.array(z.string()),
  closureGlyphsVerified: z.number(),
  notdefVerified: z.literal(true),
  fullOriginalRawCmapVerified: z.literal(true),
});

export async function auditFontCSSRanges(browser: Browser, output: string) {
  const root = resolve(import.meta.dir, ".."),
    destination = resolve(output, "css-range");
  await mkdir(destination, { recursive: true });
  const raw: unknown = JSON.parse(
    await readFile(
      resolve(root, "scripts/fixtures/font-forensics/css-range-proof.json"),
      "utf8",
    ),
  );
  const manifest = Manifest.parse(raw);
  const original = await readFile(
    resolve(root, "public/fonts/studio/InterVariable-693b77d4f3.woff2"),
  );
  const holes = await readFile(
    resolve(
      root,
      "scripts/fixtures/font-forensics/holes-only-inter-4d21ed4102.woff2",
    ),
  );
  assert.equal(
    createHash("sha256").update(original).digest("hex"),
    manifest.sourceSHA256,
  );
  assert.equal(
    createHash("sha256").update(holes).digest("hex"),
    manifest.candidateSHA256,
  );
  const errors: string[] = [];
  const requests: { mode: string; asset: string; bytes: number }[] = [];
  const aliases = ["OriginalA", "OriginalB", "RangeOriginal", "RangeHoles"];
  const face = (name: string, mode: string, asset: string, range?: string) =>
    `@font-face{font-family:${name};src:url(/${mode}/${asset}.woff2);font-weight:100 900;font-style:normal;font-display:block;${range ? `unicode-range:${range};` : ""}}`;
  const server = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    fetch(request) {
      const url = new URL(request.url),
        font = /^\/(matrix|mapped|universe)\/(original|holes)\.woff2$/.exec(
          url.pathname,
        );
      if (font) {
        const bytes = font[2] === "original" ? original : holes;
        requests.push({ mode: font[1], asset: font[2], bytes: bytes.length });
        return new Response(new Uint8Array(bytes), {
          headers: {
            "content-type": "font/woff2",
            "cache-control": "no-store",
          },
        });
      }
      const mode =
        url.pathname === "/matrix"
          ? "matrix"
          : url.pathname === "/mapped"
            ? "mapped"
            : url.pathname === "/universe"
              ? "universe"
              : null;
      if (!mode) return new Response("Not found", { status: 404 });
      const css =
        mode === "matrix"
          ? face("OriginalA", mode, "original") +
            face("OriginalB", mode, "original") +
            ["RangeOriginal", "RangeHoles"]
              .map(
                (name) =>
                  face(
                    name,
                    mode,
                    name === "RangeOriginal" ? "original" : "holes",
                    manifest.primaryCSS,
                  ) +
                  face(name, mode, "original", manifest.mappedComplementCSS),
              )
              .join("")
          : face("Candidate", mode, "holes", manifest.primaryCSS) +
            face(
              "Candidate",
              mode,
              "original",
              mode === "mapped"
                ? manifest.mappedComplementCSS
                : manifest.complementCSS,
            );
      return new Response(
        `<!doctype html><meta charset="utf-8"><style>${css}body{margin:0;background:white}.sample{width:1600px;min-height:64px;white-space:pre;line-height:2;font-kerning:normal;font-feature-settings:normal;color:black;background:white}</style>${(mode === "matrix" ? aliases : ["Candidate"]).map((name) => `<div id="${name}" class="sample"></div>`).join("")}`,
        {
          headers: { "content-type": "text/html", "cache-control": "no-store" },
        },
      );
    },
  });
  const observations: Record<string, unknown>[] = [];
  const demand: Record<string, unknown>[] = [];
  const report: Record<string, unknown> = {
    diagnosticOnly: true,
    accepted: false,
    status: "running",
    sourceSHA256: manifest.sourceSHA256,
    candidateSHA256: manifest.candidateSHA256,
    candidateBytes: holes.length,
    rangeLabels: {
      mapped: "Original mapped codepoints minus primary",
      universe: "Whole Unicode minus primary; diagnostic control only",
      unmapped: "Robot U+1F916 and U+10FFFF have no original cmap mapping",
    },
    primaryCSS: manifest.primaryCSS,
    mappedComplementCSS: manifest.mappedComplementCSS,
    universeControlCSS: manifest.complementCSS,
    observations,
    demand,
    requests,
    pageErrors: errors,
    limits: [
      "Normal Inter only; no italic/Mono activation or all-product-role acceptance",
      "1011-codepoint partition is an experiment input, not a benchmark-specific production whitelist",
      "Two styles/fonts and aggregate requested-byte performance remain unverified",
      "Original active fonts and existing budgets unchanged",
    ],
  };
  try {
    for (const mode of ["mapped", "universe"]) {
      const context = await browser.newContext();
      try {
        const page = await context.newPage();
        await page.goto(new URL(`/${mode}`, server.url).href);
        page.on("pageerror", (error) => errors.push(error.name));
        for (const [stage, text] of [
          ["selected", "AVATAR office ffi ação “quoted” € £ $"],
          ["unmapped", "A🤖\u{10FFFF}V"],
          ["mixed", manifest.mixedSamples.join(" | ")],
        ]) {
          await page.evaluate(async (text) => {
            const el = document.getElementById("Candidate");
            if (!el) throw Error("Missing demand sample");
            el.style.fontFamily = "Candidate,monospace";
            el.style.fontSize = "32px";
            el.textContent = text;
            await document.fonts.load("400 32px Candidate", text);
            await document.fonts.ready;
          }, text);
          const resources = await page.evaluate(() =>
            performance
              .getEntriesByType("resource")
              .filter(
                (entry): entry is PerformanceResourceTiming =>
                  entry instanceof PerformanceResourceTiming,
              )
              .filter((entry) =>
                new URL(entry.name).pathname.endsWith(".woff2"),
              )
              .map((entry) => ({
                path: new URL(entry.name).pathname,
                transferSize: entry.transferSize,
                encodedBodySize: entry.encodedBodySize,
                decodedBodySize: entry.decodedBodySize,
              })),
          );
          demand.push({
            mode,
            stage,
            requests: requests
              .filter((row) => row.mode === mode)
              .map((row) => ({ ...row })),
            resources,
          });
          if (mode === "mapped" && stage !== "mixed")
            assert(
              !requests.some(
                (row) => row.mode === mode && row.asset === "original",
              ),
              "Unmapped characters must not download the mapped original complement",
            );
          if (stage === "mixed")
            assert(
              requests.some(
                (row) => row.mode === mode && row.asset === "original",
              ),
              "Mapped nonprimary characters must use the real original complement",
            );
        }
      } finally {
        await context.close();
      }
    }
    const context = await browser.newContext({
      viewport: { width: 1800, height: 1000 },
    });
    try {
      const page = await context.newPage();
      await page.goto(new URL("/matrix", server.url).href);
      page.on("pageerror", (error) => errors.push(error.name));
      const cdp = await context.newCDPSession(page);
      await cdp.send("DOM.enable");
      await cdp.send("CSS.enable");
      const fontSchema = z.object({
        fonts: z.array(
          z.object({
            familyName: z.string(),
            postScriptName: z.string(),
            isCustomFont: z.boolean(),
            glyphCount: z.number(),
          }),
        ),
      });
      async function fonts(alias: string) {
        const { root } = await cdp.send("DOM.getDocument");
        const { nodeId } = await cdp.send("DOM.querySelector", {
          nodeId: root.nodeId,
          selector: `#${alias}`,
        });
        const value: unknown = await cdp.send("CSS.getPlatformFontsForNode", {
          nodeId,
        });
        return fontSchema.parse(value).fonts;
      }
      const profiles = [
        { size: 12, weight: 400, opsz: "auto" },
        { size: 14, weight: 400, opsz: "auto" },
        { size: 14, weight: 500, opsz: "auto" },
        { size: 16, weight: 600, opsz: "auto" },
        { size: 24, weight: 700, opsz: "auto" },
        { size: 32, weight: 400, opsz: "14" },
        { size: 32, weight: 400, opsz: "32" },
        { size: 32, weight: 900, opsz: "14" },
        { size: 32, weight: 900, opsz: "32" },
      ];
      const samples = [
        {
          kind: "selected",
          text: "AVATAR To Wa office affine ffi fl fi 0123456789 € £ $ — … “quoted” → ✓",
        },
        ...manifest.mixedSamples.map((text, index) => ({
          kind: `mixed-${index}`,
          text,
        })),
        { kind: "unmapped", text: "A🤖\u{10FFFF}V" },
      ];
      for (const profile of profiles)
        for (const sample of samples) {
          await page.evaluate(
            async ({ aliases, profile, text }) => {
              for (const name of aliases) {
                const el = document.getElementById(name);
                if (!el) throw Error("Missing range sample");
                el.textContent = text;
                el.style.fontFamily = `${name},monospace`;
                el.style.fontSize = `${profile.size}px`;
                el.style.fontWeight = String(profile.weight);
                el.style.fontOpticalSizing =
                  profile.opsz === "auto" ? "auto" : "none";
                el.style.fontVariationSettings =
                  profile.opsz === "auto"
                    ? `"wght" ${profile.weight}`
                    : `"wght" ${profile.weight}, "opsz" ${profile.opsz}`;
                await document.fonts.load(
                  `${profile.weight} ${profile.size}px ${name}`,
                  text,
                );
              }
              await document.fonts.ready;
              await new Promise<void>((resolve) =>
                requestAnimationFrame(() =>
                  requestAnimationFrame(() => resolve()),
                ),
              );
            },
            { aliases, profile, text: sample.text },
          );
          const baseline = await page
            .locator("#OriginalA")
            .screenshot({ animations: "disabled" });
          const referenceGeometry = await page
            .locator("#OriginalA")
            .evaluate((el) => {
              const range = document.createRange();
              range.selectNodeContents(el);
              return {
                width: el.getBoundingClientRect().width,
                height: el.getBoundingClientRect().height,
                scrollWidth: el.scrollWidth,
                textWidth: range.getBoundingClientRect().width,
              };
            });
          assert(
            referenceGeometry.scrollWidth <= referenceGeometry.width,
            "Original text must be fully captured",
          );
          for (const alias of aliases.slice(1)) {
            const bytes = await page
              .locator(`#${alias}`)
              .screenshot({ animations: "disabled" });
            const geometry = await page.locator(`#${alias}`).evaluate((el) => {
              const range = document.createRange();
              range.selectNodeContents(el);
              return {
                width: el.getBoundingClientRect().width,
                height: el.getBoundingClientRect().height,
                scrollWidth: el.scrollWidth,
                textWidth: range.getBoundingClientRect().width,
              };
            });
            assert(
              geometry.scrollWidth <= geometry.width,
              "Candidate text must be fully captured",
            );
            const usedFonts = await fonts(alias);
            if (sample.kind !== "unmapped")
              assert(
                usedFonts.length > 0 &&
                  usedFonts.every(
                    (font) =>
                      font.isCustomFont &&
                      font.familyName === "Inter Variable" &&
                      font.postScriptName === "InterVariable" &&
                      font.glyphCount > 0,
                  ),
                "Mapped range samples must not silently substitute system fonts",
              );
            const pixels = await page.evaluate(
              async ({ left, right }) => {
                async function decode(value: string) {
                  const image = await createImageBitmap(
                    new Blob(
                      [
                        Uint8Array.from(atob(value), (char) =>
                          char.charCodeAt(0),
                        ),
                      ],
                      { type: "image/png" },
                    ),
                  );
                  const canvas = document.createElement("canvas");
                  canvas.width = image.width;
                  canvas.height = image.height;
                  const ctx = canvas.getContext("2d");
                  if (!ctx) throw Error("No pixel context");
                  ctx.drawImage(image, 0, 0);
                  const result = {
                    width: canvas.width,
                    height: canvas.height,
                    data: ctx.getImageData(0, 0, canvas.width, canvas.height)
                      .data,
                  };
                  image.close();
                  return result;
                }
                const a = await decode(left),
                  b = await decode(right);
                if (a.width !== b.width || a.height !== b.height)
                  return { dimensionsEqual: false, pixelsChanged: null };
                let changed = 0;
                for (let i = 0; i < a.data.length; i += 4)
                  if (
                    [0, 1, 2, 3].some(
                      (channel) => a.data[i + channel] !== b.data[i + channel],
                    )
                  )
                    changed++;
                return { dimensionsEqual: true, pixelsChanged: changed };
              },
              {
                left: baseline.toString("base64"),
                right: bytes.toString("base64"),
              },
            );
            observations.push({
              alias,
              profile,
              kind: sample.kind,
              ...pixels,
              geometry,
              referenceGeometry,
              fonts: usedFonts,
            });
            if (alias === "OriginalB")
              assert(
                pixels.dimensionsEqual && pixels.pixelsChanged === 0,
                "Actual range A/A raster control changed",
              );
            if (pixels.pixelsChanged !== 0 || !pixels.dimensionsEqual) {
              const name = `${alias}-${sample.kind}-${profile.size}-${profile.weight}-${profile.opsz}`;
              await writeFile(resolve(destination, `${name}.png`), bytes);
              await writeFile(
                resolve(destination, `${name}-original.png`),
                baseline,
              );
            }
          }
        }
    } finally {
      await context.close();
    }
    assert.deepEqual(errors, []);
    report.status = "complete";
    report.verdict = observations.some(
      (row) =>
        row.alias !== "OriginalB" &&
        (!row.dimensionsEqual || row.pixelsChanged !== 0),
    )
      ? "range-or-candidate-differences-rejected"
      : "zero-observed-differences-bounded-normal-only";
  } catch (error) {
    report.status = "failed";
    report.errorName = error instanceof Error ? error.name : "UnknownError";
    throw error;
  } finally {
    await server.stop(true);
    await writeFile(
      resolve(destination, "results.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
  }
  return report;
}
