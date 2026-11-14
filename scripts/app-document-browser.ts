import { auditAppDocumentAdversarial } from "./app-document-adversarial-browser";
import { chromium, expect, type Browser, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildAppDocument } from "./build-app-document";

const output = resolve(
  process.env.TEST_OUTPUT ?? "/tmp/vibebook-app-document-browser",
);
await mkdir(output, { recursive: true });
const { asset } = await buildAppDocument();
const hostFile = Bun.file(resolve("public", asset));
let replacementRequests = 0;
const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 0,
  fetch(request) {
    const path = new URL(request.url).pathname;
    if (path === "/app-document-host.js")
      return new Response(hostFile, {
        headers: { "Content-Type": "text/javascript" },
      });
    if (path === "/replacement") {
      replacementRequests++;
      return new Response(
        `<script>
      addEventListener('message', event => {
        if(event.data?.id === 901) parent.postMessage({fixture:'replacement',denied:!!event.data.error, leaked:JSON.stringify(event.data).includes('private-fixture-value')},'*');
      });
      parent.postMessage({jsonrpc:'2.0',id:901,method:'fixture/private'},'*');
      </script>`,
        { headers: { "Content-Type": "text/html" } },
      );
    }
    return new Response(
      "<!doctype html><title>Document-bound transport fixture</title>",
      { headers: { "Content-Type": "text/html" } },
    );
  },
});
let browser: Browser | undefined;
let page: Page | undefined;
const errors: string[] = [];
const evidence: Record<string, unknown> = {
  revision: process.env.TEST_REVISION ?? "unrecorded",
  scope:
    "real Chromium opaque srcdoc/native MessageEvent; no Worker/file POST/provider proof",
  status: "running",
};
try {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  page.on("pageerror", (error) => errors.push(error.name));
  const activePage = page;
  await activePage.goto(server.url.href);
  await activePage.evaluate(async () => {
    const moduleURL = "/app-document-host.js";
    const module: typeof import("../browser/app-document/host") = await import(
      /* @vite-ignore */ moduleURL
    );
    const frame = document.createElement("iframe");
    frame.sandbox.add("allow-scripts");
    document.body.append(frame);
    const state = {
      initial: null as unknown,
      replacement: null as unknown,
      requests: 0,
      sameProxy: false,
    };
    Object.assign(window, { fixtureState: state });
    window.addEventListener("message", (event) => {
      if (event.source !== frame.contentWindow) return;
      if (event.data?.fixture === "initial") state.initial = event.data;
      if (event.data?.fixture === "replacement") state.replacement = event.data;
    });
    const host = module.createAppDocumentHost({
      frame,
      current: () => frame.isConnected,
      revoked: () => {},
      receive(raw: unknown) {
        if (
          !raw ||
          typeof raw !== "object" ||
          !("method" in raw) ||
          !("id" in raw)
        )
          return;
        const value = raw;
        if (value.method === "fixture/private") {
          state.requests++;
          void host.post({
            jsonrpc: "2.0",
            id: value.id,
            result: { value: "private-fixture-value" },
          });
        }
      },
    });
    host.start();
    host.loadHtml(`<script>
      addEventListener('message', event => {
        if(event.data?.fixtureNavigate) { location.replace(event.data.url); return; }
        if(event.data?.id === 1 && event.data.result) parent.postMessage({fixture:'initial',value:event.data.result.value, trusted:event.isTrusted, source:event.source===parent, origin:event.origin},'*');
      });
      parent.postMessage({jsonrpc:'2.0',id:1,method:'fixture/private'},'*');
      <\/script>`);
    Object.assign(window, {
      navigateFixture() {
        const before = frame.contentWindow;
        frame.contentWindow!.postMessage(
          {
            fixtureNavigate: true,
            url: new URL("/replacement", location.href).href,
          },
          "*",
        );
        state.sameProxy = before === frame.contentWindow;
      },
      disposeFixture() {
        host.dispose();
        frame.remove();
      },
    });
  });
  await expect
    .poll(() =>
      activePage.evaluate(() => Reflect.get(window, "fixtureState").initial),
    )
    .toMatchObject({
      value: "private-fixture-value",
      trusted: true,
      source: true,
      origin: server.url.origin,
    });
  evidence.initial = await activePage.evaluate(
    () => Reflect.get(window, "fixtureState").initial,
  );
  await activePage.evaluate(() => Reflect.get(window, "navigateFixture")());
  await expect
    .poll(
      () =>
        activePage.evaluate(
          () => Reflect.get(window, "fixtureState").replacement,
        ),
      { timeout: 15_000 },
    )
    .toEqual({ fixture: "replacement", denied: true, leaked: false });
  const state = await activePage.evaluate(() =>
    Reflect.get(window, "fixtureState"),
  );
  expect(state.requests).toBe(1);
  expect(replacementRequests).toBe(1);
  expect(state.sameProxy).toBe(true);
  expect(errors).toEqual([]);
  evidence.replacement = state.replacement;
  evidence.requests = state.requests;
  evidence.replacementRequests = replacementRequests;
  evidence.sameProxy = state.sameProxy;
  evidence.adversarial = await auditAppDocumentAdversarial({ page: activePage, hostModuleURL: new URL("/app-document-host.js", server.url).href, output });
  evidence.status = "passed";
} catch (error) {
  evidence.status = "failed";
  evidence.errorName = error instanceof Error ? error.name : "unknown";
  throw error;
} finally {
  evidence.pageErrors = errors;
  await writeFile(
    resolve(output, "results.json"),
    JSON.stringify(evidence, null, 2),
  );
  await page
    ?.evaluate(() => Reflect.get(window, "disposeFixture")?.())
    .catch(() => {});
  try {
    await browser?.close();
  } finally {
    server.stop(true);
  }
}
