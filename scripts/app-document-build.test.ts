import { expect, test } from "bun:test";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { bootstrapModule, buildAppDocument } from "./build-app-document";

test("classic bootstrap rejects missing/duplicate nonces and HTML script termination", () => {
  expect(() => bootstrapModule("(()=>{})()")).toThrow("exactly one");
  expect(() =>
    bootstrapModule(
      "__VIBEBOOK_APP_DOCUMENT_NONCE____VIBEBOOK_APP_DOCUMENT_NONCE__",
    ),
  ).toThrow("exactly one");
  expect(() =>
    bootstrapModule("__VIBEBOOK_APP_DOCUMENT_NONCE__ </ScRiPt>"),
  ).toThrow("closing script");
  expect(
    bootstrapModule('const nonce="__VIBEBOOK_APP_DOCUMENT_NONCE__";'),
  ).toContain("export const appDocumentBootstrap =");
});

test("build emits classic bootstrap string before bundling the guarded browser host", async () => {
  const root = await mkdtemp(join(tmpdir(), "vibebook-app-document-build-"));
  try {
    await mkdir(join(root, "browser/app-document"), { recursive: true });
    await mkdir(join(root, "shared/generated"), { recursive: true });
    await mkdir(join(root, "public"), { recursive: true });
    await writeFile(
      join(root, "browser/app-document/bootstrap.ts"),
      'window.addEventListener("message",()=>{ console.info("__VIBEBOOK_APP_DOCUMENT_NONCE__") });',
    );
    await writeFile(
      join(root, "browser/app-document/host.ts"),
      'export {appDocumentBootstrap} from "../../shared/generated/appDocumentBootstrap";',
    );
    await writeFile(
      join(root, "public/app.html"),
      '<script type="module">import("/app-document-host.js")</script>',
    );
    const { asset } = await buildAppDocument({ root });
    const generated = await readFile(
      join(root, "shared/generated/appDocumentBootstrap.ts"),
      "utf8",
    );
    const json = generated.match(
      /export const appDocumentBootstrap = (.*);\n$/,
    )?.[1];
    expect(json).toBeDefined();
    const script: unknown = JSON.parse(json!);
    expect(typeof script).toBe("string");
    expect(script).not.toMatch(/\b(?:import|export)\s/);
    expect(script).toContain("__VIBEBOOK_APP_DOCUMENT_NONCE__");
    expect(await readFile(join(root, "public", asset), "utf8")).toContain(
      "__VIBEBOOK_APP_DOCUMENT_NONCE__",
    );
    expect(await readFile(join(root, "public/app.html"), "utf8")).toContain(
      asset,
    );
    expect((await buildAppDocument({ root })).asset).toBe(asset);
    // Native resolution must still reject a backend import, including a raw bundle request.
    await mkdir(join(root, "src"));
    await writeFile(
      join(root, "src/private.ts"),
      'export const secret="backend-only"',
    );
    await writeFile(
      join(root, "browser/app-document/host.ts"),
      'export {secret} from "../../src/private";',
    );
    await expect(buildAppDocument({ root })).rejects.toThrow(
      "Browser build failed",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
