// Diagnostic-only original/roundtrip/REJECTED subset. Never imported by application code.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium, type Browser } from "@playwright/test";
import * as z from "zod/mini";

type DOMPixelDifference =
  | { dimensionsEqual: false; pixelsChanged: null }
  | { dimensionsEqual: true; pixelsChanged: number };

const root = resolve(import.meta.dir, "..");
const fixture = resolve(import.meta.dir, "fixtures/font-forensics");
const output = resolve(
  process.env.FONT_FORENSICS_OUTPUT ?? ".artifacts/font-forensics",
);
await mkdir(output, { recursive: true });
const sha = (b: Uint8Array) => createHash("sha256").update(b).digest("hex");
const original = await readFile(
  resolve(root, "public/fonts/studio/InterVariable-693b77d4f3.woff2"),
);
const roundtrip = await readFile(
  resolve(fixture, "roundtrip-inter-693b77d4f3.woff2"),
);
const rejected = await readFile(
  resolve(fixture, "rejected-inter-785911cf3a.woff2"),
);
assert.equal(
  sha(original),
  "693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3",
);
assert.deepEqual(
  roundtrip,
  original,
  "Actual generated roundtrip must be byte-identical",
);
assert.equal(
  sha(rejected),
  "785911cf3a4486d7b0e2573bd5093500f9d9a6c3cfcb021e65d40e4fc7bdeb1d",
);
const retained = await readFile(
  resolve(fixture, "retained-inter-a189496942.woff2"),
);
assert.equal(
  sha(retained),
  "a1894969422b49bcd0e473ad2a4686b3537aedd38bf7db36a9d20747f7887903",
);
const aliases = [
  "OriginalA",
  "OriginalB",
  "Roundtrip",
  "Rejected",
  "Retained",
] as const;
const aliasFiles = {
  OriginalA: "original",
  OriginalB: "original",
  Roundtrip: "roundtrip",
  Rejected: "rejected",
  Retained: "retained",
} as const;
const text =
  "AVATAR To Wa office affine ffi fl fi 0123456789 € £ $ — … “quoted” → ✓";
const extra =
  "€ £ “ ” ‘ ’ \u00a0 ac\u0327a\u0303o cafe\u0301 À Á Â Ã Ç É Ê Í Ó Ô Õ Ú Ü";
const samples = [
  { kind: "full", text },
  { kind: "coverage-controls", text: extra },
  { kind: "missing-control", text: "\u{10FFFF}" },
  ...Array.from(new Set(text + extra)).map((text) => ({
    kind: "character",
    text,
  })),
  ...[
    "AV",
    "VA",
    "To",
    "Wa",
    "ffi",
    "fl",
    "fi",
    "office",
    "affine",
    "€ £ $",
    "“quoted”",
    "→ ✓",
    "ac\u0327a\u0303o",
    "cafe\u0301",
  ].map((text) => ({ kind: "cluster", text })),
];
const assets = new Map<string, Buffer>([
  ["/original.woff2", original],
  ["/roundtrip.woff2", roundtrip],
  ["/rejected.woff2", rejected],
  ["/retained.woff2", retained],
]);
const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 0,
  fetch(req) {
    const path = new URL(req.url).pathname;
    const bytes = assets.get(path);
    if (bytes)
      return new Response(new Uint8Array(bytes), {
        headers: { "content-type": "font/woff2", "cache-control": "no-store" },
      });
    if (path !== "/") return new Response("Not found", { status: 404 });
    return new Response(
      `<!doctype html><meta charset="utf-8"><style>${aliases.map((name) => `@font-face{font-family:${name};src:url(/${aliasFiles[name]}.woff2);font-weight:100 900;font-style:normal;font-display:block}`).join("")}@font-face{font-family:ForcedMissing;src:url(/original.woff2);unicode-range:U+20;font-weight:100 900}body{margin:0;background:white}#ForcedMissing{font-family:ForcedMissing,monospace}.sample{width:1200px;min-height:64px;white-space:pre;font-size:32px;line-height:2;font-kerning:normal;font-feature-settings:normal;color:black;background:white}</style>${aliases.map((name) => `<div id="${name}" class="sample"></div>`).join("")}<div id="ForcedMissing" class="sample">A</div>`,
      {
        headers: {
          "content-type": "text/html;charset=utf-8",
          "cache-control": "no-store",
        },
      },
    );
  },
});
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
const report: {
  diagnosticOnly: true;
  accepted: false;
  [key: string]: unknown;
} = {
  diagnosticOnly: true,
  accepted: false,
  scope:
    "Synthetic normal Inter only. No application/Worker/auth data or production font activation.",
  originalSHA256: sha(original),
  roundtripSHA256: sha(roundtrip),
  rejectedSHA256: sha(rejected),
  retainedSHA256: sha(retained),
  samples,
  observations: [],
};
let browser: Browser | undefined;
try {
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  report.chromium = browser.version();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    serviceWorkers: "block",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.name));
  const requests: { path: string; sha256: string; bytes: number }[] = [];
  const reads: Promise<void>[] = [];
  page.on("response", (r) => {
    const path = new URL(r.url()).pathname;
    if (assets.has(path))
      reads.push(
        (async () => {
          assert.equal(r.status(), 200);
          const b = await r.body();
          requests.push({ path, sha256: sha(b), bytes: b.length });
        })(),
      );
  });
  await page.goto(`http://127.0.0.1:${server.port}`, {
    waitUntil: "networkidle",
  });
  const cdp = await context.newCDPSession(page);
  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");
  async function fonts(id: string) {
    const { root } = await cdp.send("DOM.getDocument");
    const { nodeId } = await cdp.send("DOM.querySelector", {
      nodeId: root.nodeId,
      selector: `#${id}`,
    });
    const raw: unknown = await cdp.send("CSS.getPlatformFontsForNode", {
      nodeId,
    });
    return fontSchema.parse(raw).fonts;
  }
  // Same-context aliases, actual browser font identities and explicit DOM optical settings.
  const fontProof = [];
  for (const weight of [400, 900]) {
    for (const opticalSize of [14, 32]) {
      await page.evaluate(
        async ({ aliases, text, weight, opticalSize }) => {
          for (const name of aliases) {
            const el = document.getElementById(name);
            if (!el) throw Error("Missing alias");
            el.textContent = text;
            el.style.fontFamily = `${name},monospace`;
            el.style.fontWeight = String(weight);
            el.style.fontVariationSettings = `"opsz" ${opticalSize}, "wght" ${weight}`;
            await document.fonts.load(`${weight} 32px ${name}`, text);
          }
          await document.fonts.ready;
        },
        { aliases, text: text + extra, weight, opticalSize },
      );
      for (const name of aliases) {
        const proof = await fonts(name);
        assert(
          proof.length > 0 &&
            proof.every(
              (f) =>
                f.isCustomFont &&
                f.familyName === "Inter Variable" &&
                f.postScriptName === "InterVariable" &&
                f.glyphCount > 0,
            ),
          `${name}: unexpected fallback or font identity`,
        );
        const computed = await page.locator(`#${name}`).evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            family: s.fontFamily,
            weight: s.fontWeight,
            size: s.fontSize,
            variation: s.fontVariationSettings,
          };
        });
        assert(
          computed.variation.includes(`"opsz" ${opticalSize}`) &&
            computed.variation.includes(`"wght" ${weight}`),
          "Explicit variation settings absent",
        );
        fontProof.push({
          weight,
          opticalSize,
          alias: name,
          fonts: proof,
          computed,
        });
      }
    }
  }
  const missing = await fonts("ForcedMissing");
  assert(
    missing.length > 0 && missing.every((f) => !f.isCustomFont),
    "Forced missing face must expose fallback, not a false font proof",
  );
  report.missingGlyphControl = { text: "A", fonts: missing };
  report.fontProof = fontProof;
  const observations = [];
  let saved = 0;
  for (const weight of [400, 900]) {
    for (const sample of samples) {
      const result = await page.evaluate(
        ({ aliases, text, weight }) => {
          function pixels(name: string) {
            const c = document.createElement("canvas");
            c.width = 1400;
            c.height = 96;
            const x = c.getContext("2d");
            if (!x) throw Error("No canvas");
            x.font = `${weight} 32px ${name}`;
            x.fontKerning = "normal";
            x.fillText(text, 4, 64);
            return {
              data: x.getImageData(0, 0, c.width, c.height).data,
              png: c.toDataURL("image/png"),
              advance: x.measureText(text).width,
            };
          }
          const a = pixels(aliases[0]);
          return aliases.slice(1).map((alias) => {
            const b = pixels(alias);
            let pixelsChanged = 0,
              maxChannelDifference = 0,
              minX = 1400,
              minY = 96,
              maxX = -1,
              maxY = -1;
            for (let i = 0; i < a.data.length; i += 4) {
              let changed = false;
              for (let c = 0; c < 4; c++) {
                const d = Math.abs(a.data[i + c] - b.data[i + c]);
                maxChannelDifference = Math.max(maxChannelDifference, d);
                changed ||= d !== 0;
              }
              if (changed) {
                pixelsChanged++;
                const p = i / 4;
                minX = Math.min(minX, p % 1400);
                maxX = Math.max(maxX, p % 1400);
                minY = Math.min(minY, Math.floor(p / 1400));
                maxY = Math.max(maxY, Math.floor(p / 1400));
              }
            }
            return {
              alias,
              pixelsChanged,
              maxChannelDifference,
              bounds: pixelsChanged ? { minX, minY, maxX, maxY } : null,
              originalAdvance: a.advance,
              candidateAdvance: b.advance,
              originalPNG: pixelsChanged ? a.png : null,
              candidatePNG: pixelsChanged ? b.png : null,
            };
          });
        },
        { aliases, text: sample.text, weight },
      );
      for (const r of result) {
        const { originalPNG, candidatePNG, ...summary } = r;
        assert(
          r.alias === "Rejected" ||
            r.alias === "Retained" ||
            r.pixelsChanged === 0,
          "A/A or byte-identical roundtrip raster changed",
        );
        let artifacts: string[] = [];
        if (r.pixelsChanged && saved < 16 && originalPNG && candidatePNG) {
          const stem = `canvas-${saved++}-${weight}`;
          artifacts = [`${stem}-original.png`, `${stem}-${r.alias}.png`];
          await writeFile(
            resolve(output, artifacts[0]),
            Buffer.from(originalPNG.split(",")[1], "base64"),
          );
          await writeFile(
            resolve(output, artifacts[1]),
            Buffer.from(candidatePNG.split(",")[1], "base64"),
          );
        }
        observations.push({
          kind: sample.kind,
          text: sample.text,
          weight,
          canvasOpticalSize:
            "browser-default; explicit opsz is covered by DOM screenshots below",
          ...summary,
          artifacts,
        });
      }
    }
  }
  report.observations = observations;
  // Screenshot each alias with identical DOM geometry. Decode pixels in this same browser (no PNG decoder dependency).
  const dom = [];
  for (const weight of [400, 900])
    for (const opticalSize of [14, 32]) {
      await page.evaluate(
        ({ aliases, text, weight, opticalSize }) => {
          for (const alias of aliases) {
            const el = document.getElementById(alias);
            if (!el) throw Error("Missing alias");
            el.textContent = text;
            el.style.fontFamily = `${alias},monospace`;
            el.style.fontWeight = String(weight);
            el.style.fontVariationSettings = `"opsz" ${opticalSize}, "wght" ${weight}`;
            el.style.fontOpticalSizing = "none";
          }
        },
        { aliases, text, weight, opticalSize },
      );
      const shots = [];
      for (const alias of aliases)
        shots.push({
          alias,
          bytes: await page
            .locator(`#${alias}`)
            .screenshot({ animations: "disabled" }),
        });
      for (const shot of shots.slice(1)) {
        const difference: DOMPixelDifference = await page.evaluate(
          async ({ a, b }): Promise<DOMPixelDifference> => {
            async function decode(v: string) {
              const image = await createImageBitmap(
                new Blob([Uint8Array.from(atob(v), (c) => c.charCodeAt(0))], {
                  type: "image/png",
                }),
              );
              const c = document.createElement("canvas");
              c.width = image.width;
              c.height = image.height;
              const x = c.getContext("2d");
              if (!x) throw Error("No canvas");
              x.drawImage(image, 0, 0);
              const out = {
                width: c.width,
                height: c.height,
                pixels: x.getImageData(0, 0, c.width, c.height).data,
              };
              image.close();
              return out;
            }
            const x = await decode(a),
              y = await decode(b);
            if (x.width !== y.width || x.height !== y.height)
              return { dimensionsEqual: false, pixelsChanged: null };
            let changed = 0;
            for (let i = 0; i < x.pixels.length; i += 4)
              if ([0, 1, 2, 3].some((k) => x.pixels[i + k] !== y.pixels[i + k]))
                changed++;
            return { dimensionsEqual: true, pixelsChanged: changed };
          },
          {
            a: shots[0].bytes.toString("base64"),
            b: shot.bytes.toString("base64"),
          },
        );
        assert(
          shot.alias === "Rejected" ||
            shot.alias === "Retained" ||
            (difference.dimensionsEqual && difference.pixelsChanged === 0),
          "DOM A/A or roundtrip changed",
        );
        const name = `dom-${weight}-${opticalSize}-${shot.alias}.png`;
        await writeFile(resolve(output, name), shot.bytes);
        dom.push({
          weight,
          opticalSize,
          alias: shot.alias,
          ...difference,
          artifact: name,
        });
      }
      await writeFile(
        resolve(output, `dom-${weight}-${opticalSize}-OriginalA.png`),
        shots[0].bytes,
      );
    }
  report.explicitOpticalDOM = dom;
  await Promise.all(reads);
  assert.deepEqual(errors, []);
  for (const [path, bytes] of assets)
    assert(
      requests.some((r) => r.path === path && r.sha256 === sha(bytes)),
      `Actual font request missing: ${path}`,
    );
  report.resources = requests;
  report.pageErrors = errors;
  report.verdict =
    observations.some((x) => x.alias === "Rejected" && x.pixelsChanged > 0) ||
    dom.some((x) => x.alias === "Rejected" && x.pixelsChanged !== 0)
      ? "rejected-candidate-differences-localized"
      : "not-reproduced-in-this-browser";
  report.retainedVerdict =
    observations.some((x) => x.alias === "Retained" && x.pixelsChanged > 0) ||
    dom.some((x) => x.alias === "Retained" && x.pixelsChanged !== 0)
      ? "retained-candidate-differences-localized"
      : "zero-observed-differences-in-bounded-fixtures";
  report.acceptance =
    "NONE: neither verdict activates a subset or establishes M4/M7 parity; raw evidence requires review.";
  await context.close();
} catch (e) {
  report.verdict = "inconclusive-control-or-harness-failure";
  report.error = e instanceof Error ? e.message : "Unknown harness failure";
  process.exitCode = 1;
} finally {
  await browser?.close();
  server.stop(true);
  await writeFile(
    resolve(output, "results.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify({
      verdict: report.verdict,
      output,
      diagnosticOnly: true,
      accepted: false,
    }),
  );
}
