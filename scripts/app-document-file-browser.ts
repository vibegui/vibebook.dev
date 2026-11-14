// Real browser HTTP/form + native SDK boundary. Synthetic cookie/file server,
// no Worker/D1/R2/session authorization claim and no canonical room mutations.
import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { expect, type Page } from "@playwright/test";
import { fileHeaders } from "../src/fileHeaders";
import { buildBrowser } from "./browser-build";
import { appProbeDocument } from "./native-app-probe-documents";
import { record } from "../shared/validation";

export async function auditAppDocumentFilePost(options: {
  page: Page;
  output: string;
}) {
  const output = resolve(options.output, "file-post");
  const filePath = "/api/books/aaaaaa/files/bbbbbb";
  const http: {
    method: string;
    status: number;
    originMatches: boolean;
    cookieMatches: boolean;
    nonceValid: boolean;
    bodyBytes: number;
  }[] = [];
  const consoleCategories: string[] = [];
  const errors: string[] = [];
  const events: Record<string, unknown>[] = [];
  const responseDocuments: Record<string, unknown>[] = [];
  const report: Record<string, unknown> = {
    status: "running",
    phase: "output-directory",
    scope:
      "Actual native bridge/MessagePort and parent form HTTP with exact production file headers; synthetic cookie/file server, not Worker membership/session/R2 proof",
    http,
    consoleCategories,
    pageErrors: errors,
    events,
    responseDocuments,
  };
  let ownedServer: Bun.Server<undefined> | undefined;
  let ownedPage: Page | undefined;
  const extraPages: Page[] = [];
  let removePageListener: (() => void) | undefined;
  const event = (value: Record<string, unknown>) => {
    if (events.length < 64) events.push(value);
  };
  const safeURL = (value: string) => {
    if (value === "about:blank" || value === "chrome-error://chromewebdata/") return value;
    try {
      const url = new URL(value);
      if (url.origin !== ownedServer?.url.origin) return "unexpected-origin";
      return ["/",filePath,"/replacement","/native-bridge.js"].includes(url.pathname) ? url.origin + url.pathname : "unexpected-local-path";
    } catch { return "invalid-url"; }
  };
  try {
    await mkdir(output, { recursive: true });
    report.phase = "build-native-bridge";
    // Called after the main harness built the actual generated bootstrap string.
    const { AppDocumentClaim, withAppDocumentBootstrap } =
      await import("../shared/appDocument");
    const build = await buildBrowser({
      entrypoints: [resolve("svelte/features/apps/bridge.ts")],
      format: "esm",
    });
    const bridgeOutput = build.outputs[0];
    assert(
      build.success && build.outputs.length === 1 && bridgeOutput,
      "Actual native bridge must bundle",
    );
    const bridgeJS = await bridgeOutput.text();
    const marker = `file-positive-${randomBytes(16).toString("hex")}`,
      cookie = randomBytes(16).toString("hex");
    report.phase = "server";
    let original = "";
    const server: Bun.Server<undefined> = Bun.serve({
      hostname: "127.0.0.1",
      port: 0,
      async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/native-bridge.js")
          return new Response(bridgeJS, {
            headers: { "content-type": "text/javascript" },
          });
        if (url.pathname === filePath) {
          const cookieMatches = (request.headers.get("cookie") ?? "")
            .split(/;\s*/)
            .includes(`app_document_fixture=${cookie}`);
          const originMatches =
            request.headers.get("origin") === server.url.origin;
          if (request.method === "GET")
            return cookieMatches
              ? new Response(original, {
                  headers: fileHeaders("text/html", "apps/file-positive.html"),
                })
              : Response.json(
                  { error: "Controlled identity required" },
                  { status: 401 },
                );
          const body = await request.text(),
            entries = [...new URLSearchParams(body)];
          const parsed = AppDocumentClaim.safeParse(
            entries.length === 1 && entries[0][0] === "nonce"
              ? { nonce: entries[0][1] }
              : null,
          );
          const valid =
            request.method === "POST" &&
            originMatches &&
            cookieMatches &&
            body.length <= 256 &&
            !url.search &&
            !request.headers.has("range") &&
            /^application\/x-www-form-urlencoded(?:;\s*charset=UTF-8)?$/i.test(
              request.headers.get("content-type") ?? "",
            ) &&
            parsed.success;
          http.push({
            method: request.method,
            status: valid ? 200 : 400,
            originMatches,
            cookieMatches,
            nonceValid: parsed.success,
            bodyBytes: Buffer.byteLength(body),
          });
          if (!valid || !parsed.success)
            return Response.json(
              { error: "Invalid controlled file navigation" },
              { status: 400 },
            );
          const rendered = withAppDocumentBootstrap(original, parsed.data.nonce);
          if (responseDocuments.length < 4) responseDocuments.push({
            bytes: Buffer.byteLength(rendered), sha256: createHash("sha256").update(rendered).digest("hex"),
            doctype: /^<!doctype html>/i.test(rendered), stageMarkup: rendered.includes('<p id="stage">initial</p>'),
            scriptOpen: (rendered.match(/<script>/g) ?? []).length, scriptClose: (rendered.match(/<\/script>/g) ?? []).length,
            contentType: fileHeaders("text/html", "apps/file-positive.html")["content-type"],
          });
          return new Response(
            rendered,
            {
              headers: {
                ...fileHeaders("text/html", "apps/file-positive.html"),
                "cache-control": "private, no-store",
              },
            },
          );
        }
        if (url.pathname === "/replacement")
          return new Response(
            appProbeDocument("replacement", server.url.origin),
            { headers: { "content-type": "text/html;charset=utf-8" } },
          );
        if (url.pathname !== "/")
          return new Response("Not found", { status: 404 });
        return new Response(
          "<!doctype html><title>Native authenticated-file form control</title>",
          { headers: { "content-type": "text/html;charset=utf-8" } },
        );
      },
    });
    ownedServer = server;
    original = appProbeDocument(
      "initial",
      server.url.origin,
      new URL("/replacement", server.url).href,
    ).replace(
      "<script>",
      `<script>addEventListener('message',event=>{if(event.data?.id!==101||!event.data?.result)return;const output=document.getElementById('result');output.dataset.trusted=String(event.isTrusted);output.dataset.parentSource=String(event.source===parent);output.dataset.hostOrigin=event.origin;});</script><script>`,
    );
    assert(
      !original.includes(marker),
      "Neither file document knows the private marker",
    );
    report.phase = "new-page";
    const page = await options.page.context().newPage();
    ownedPage = page;
    const onPage = (extra: Page) => {
      extraPages.push(extra);
      event({kind:"new-page", url:safeURL(extra.url())});
      extra.on("framenavigated",frame=>event({kind:"extra-navigation",main:frame===extra.mainFrame(),url:safeURL(frame.url())}));
    };
    page.context().on("page",onPage);
    removePageListener = () => page.context().off("page",onPage);
    page.on("framenavigated",frame=>event({kind:"navigation",main:frame===page.mainFrame(),url:safeURL(frame.url())}));
    page.on("download",download=>event({kind:"download",url:safeURL(download.url())}));
    page.on("response",response=>{
      if (safeURL(response.url()) !== new URL(filePath,server.url).href) return;
      let mainFrame: boolean | null = null;
      try { mainFrame = response.frame()===page.mainFrame(); } catch { /* Some responses have no associated frame. */ }
      event({kind:"file-response",url:safeURL(response.url()),status:response.status(),method:response.request().method(),navigation:response.request().isNavigationRequest(),redirected:response.request().redirectedFrom()!==null,mainFrame});
    });
    page.on("requestfailed",request=>event({kind:"request-failed",url:safeURL(request.url()),navigation:request.isNavigationRequest(),error:request.failure()?.errorText === "net::ERR_BLOCKED_BY_RESPONSE" ? "blocked-by-response" : request.failure()?.errorText === "net::ERR_ABORTED" ? "aborted" : "other"}));
    page.on("pageerror", (error) => errors.push(error.name));
    page.on("console", (message) => {
      const text = message.text();
      if (/form submission canceled.*not connected/i.test(text))
        consoleCategories.push("form-disconnected");
      else if (message.type() === "error")
        consoleCategories.push(
          /content security|violat.*policy/i.test(text)
            ? "csp-error"
            : "other-console-error",
        );
    });
    await page
      .context()
      .addCookies([
        { name: "app_document_fixture", value: cookie, url: server.url.origin },
      ]);
    report.phase = "raw-get-control";
    const raw = await page.request.get(new URL(filePath, server.url).href);
    assert(raw.ok());
    assert.equal(await raw.text(), original);
    assert.equal(
      raw.headers()["content-security-policy"],
      fileHeaders("text/html", "apps/file-positive.html")[
        "content-security-policy"
      ],
    );
    await page.goto(server.url.href);
    report.phase = "load-file";
    await page.evaluate(
      async ({ filePath, marker }) => {
        const moduleURL = "/native-bridge.js";
        const module: typeof import("../svelte/features/apps/bridge") =
          await import(/* @vite-ignore */ moduleURL);
        const frame = document.createElement("iframe");
        frame.sandbox.add("allow-scripts");
        frame.id = "file-positive-frame";
        document.body.append(frame);
        const state = { calls: 0, revoked: false };
        const bridge = module.createNativeAppBridge({
          frame,
          current: () => frame.isConnected,
          context: () => ({ theme: "light", displayMode: "fullscreen" }),
          tools: [{ name: "vibebook_read", inputSchema: { type: "object" } }],
          call: async (name) => {
            if (name !== "vibebook_read")
              throw Error("Unexpected fixture tool");
            state.calls++;
            return {
              content: [{ type: "text", text: "Controlled read" }],
              structuredContent: { messages: [{ text: marker }] },
            };
          },
          message: async () => ({ isError: true, content: [] }),
          ask: async () => false,
          open: () => {
            throw Error("No fixture links");
          },
          t: (text) => text,
          revoked: () => {
            state.revoked = true;
          },
        });
        Object.assign(window, {
          filePostProof: {
            state,
            dispose() {
              bridge.dispose();
              frame.remove();
            },
          },
        });
        await bridge.ready;
        bridge.loadFile(filePath);
      },
      { filePath, marker },
    );
    const frame = page.frameLocator("#file-positive-frame");
    report.phase = "initial-stage";
    await expect(frame.locator("#stage")).toHaveText("initial");
    report.phase = "initial-read";
    await expect(frame.locator("#result")).toHaveAttribute(
      "data-outcome",
      "read",
    );
    await expect(frame.locator("#result")).toHaveText(marker);
    await expect(frame.locator("#result")).toHaveAttribute(
      "data-trusted",
      "true",
    );
    await expect(frame.locator("#result")).toHaveAttribute(
      "data-parent-source",
      "true",
    );
    await expect(frame.locator("#result")).toHaveAttribute(
      "data-host-origin",
      server.url.origin,
    );
    const documentEvidence = await frame.locator("#stage").evaluate(() => ({
      mode: document.compatMode,
      origin: self.origin,
      url: location.href,
      base: document.baseURI,
    }));
    assert.deepEqual(documentEvidence, {
      mode: "CSS1Compat",
      origin: "null",
      url: new URL(filePath, server.url).href,
      base: new URL(filePath, server.url).href,
    });
    assert.deepEqual(http, [
      {
        method: "POST",
        status: 200,
        originMatches: true,
        cookieMatches: true,
        nonceValid: true,
        bodyBytes: 70,
      },
    ]);
    report.initial = { read: true, nativeEvent: true, ...documentEvidence };
    report.phase = "replacement";
    await frame.locator("#navigate").click();
    await expect(frame.locator("#stage")).toHaveText("replacement");
    await expect(frame.locator("#result")).toHaveAttribute(
      "data-outcome",
      "refused",
    );
    await expect(frame.locator("#result")).not.toContainText(marker);
    const state: unknown = await page.evaluate(
      () => Reflect.get(window, "filePostProof").state,
    );
    assert(record(state) && state.calls === 1 && state.revoked === true);
    assert.deepEqual(errors, []);
    report.replacement = { refused: true, reads: 1, revoked: true };
    report.status = "passed";
    report.phase = "complete";
    return report;
  } catch (error) {
    report.status = "failed";
    report.errorName = error instanceof Error ? error.name : "UnknownError";
    throw error;
  } finally {
    const cleanupErrors: string[] = [];
    if (ownedPage) {
      try {
        const page = ownedPage;
        const element = await page.$("#file-positive-frame");
        const child = await element?.contentFrame();
        const expectedName = element ? await element.getAttribute("name") : null;
        report.browser = {
          topURL:safeURL(page.url()), ownedFrameURL:child?safeURL(child.url()):null,
          expectedTargetPresent:!!expectedName, ownedFrameNameMatches:!!child&&child.name()===expectedName,
          frameAttributes:element?await element.evaluate(node=>({connected:node.isConnected,srcPresent:node.hasAttribute("src"),srcdocPresent:node.hasAttribute("srcdoc")})).catch(()=>null):null,
          frames:await Promise.all(page.frames().slice(0,16).map(async(frame)=>({
            url:safeURL(frame.url()),main:frame===page.mainFrame(),owned:frame===child,targetNameMatches:!!expectedName&&frame.name()===expectedName,
            parentURL:frame.parentFrame()?safeURL(frame.parentFrame()!.url()):null,
            dom:await frame.evaluate(()=>({ready:document.readyState,mode:document.compatMode,doctype:document.doctype?.name??null,stage:document.querySelectorAll("#stage").length,scriptCount:document.scripts.length})).catch(()=>null),
          }))),
          extraPages:extraPages.map(extra=>({closed:extra.isClosed(),url:safeURL(extra.url())})),
        };
      } catch { report.browserDiagnosticsFailed = true; }
      removePageListener?.();
      for (const extra of extraPages) await extra.close().catch(()=>{cleanupErrors.push("extra-page-close");});
      await ownedPage
        .evaluate(() => Reflect.get(window, "filePostProof")?.dispose())
        .catch(() => {});
      await ownedPage.close().catch(() => {
        cleanupErrors.push("page-close");
      });
    }
    if (ownedServer) {
      try {
        await ownedServer.stop(true);
      } catch {
        cleanupErrors.push("server-stop");
      }
    }
    report.cleanupErrors = cleanupErrors;
    const cleanupFailed =
      cleanupErrors.length > 0 && report.status !== "failed";
    if (cleanupFailed) {
      report.status = "failed";
      report.phase = "cleanup";
    }
    await mkdir(output, { recursive: true });
    await writeFile(
      resolve(output, "results.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
    if (cleanupFailed) throw Error("Controlled file browser cleanup failed");
  }
}
