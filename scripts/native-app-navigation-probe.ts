// Real Worker/HTTP/R2 and installed SDK host. No canonical or bridge mocks.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createHash, randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { expect as baseExpect, type Page } from "@playwright/test";
import {
  CreateRoomResult,
  MeResult,
  PostMessageResult,
} from "../shared/schemas";
import { createRoomApi } from "../svelte/transport";
import { localBrowserError } from "./native-browser-fixtures";
import type { NativeApplicationAuditFixture } from "./native-application-browser-types";
import { nativeAppNavigationDriver, type AppNavigationUIDriver } from "./app-navigation-ui-driver";
import {
  probeHTTP,
  probeFailure,
  type ProbePhase,
} from "./native-app-probe-diagnostics";

const expect = baseExpect.configure({ timeout: 30_000 });
export type NativeAppNavigationFixture = Pick<
  NativeApplicationAuditFixture,
  "base" | "ownerEmail" | "output" | "createProfile" | "openPane" | "step"
> & { ui?: AppNavigationUIDriver };
export type NativeAppNavigationEvidence = {
  variant: AppNavigationUIDriver["variant"];
  status: "running" | "diagnosed" | "inconclusive";
  verdict: "pending" | "read-inherited" | "explicit-denial" | "inconclusive";
  roomId?: string;
  fileId?: string;
  messageId?: number;
  markerSha256: string;
  initialUserOpen: boolean;
  initialRead: boolean;
  navigation?: { sameElement: boolean; sameWindow: boolean };
  replacementOriginDiffers: boolean;
  replacementRequests: number;
  replacementOutcome?: string | null;
  replacementInitialize?: string | null;
  replacementErrorCode?: string | null;
  failure?: string;
  phase: ProbePhase;
  failurePhase?: ProbePhase;
  failureSourceFrames?: string[];
  http: ReturnType<typeof probeHTTP>[];
  reviewDenyControl: boolean;
  fileNavigation?: { method: string; status: number }[];
  browserPolicyErrors?: string[];
  initialFrame?: {
    count: number;
    hidden: boolean;
    hasSrc: boolean;
    hasSrcdoc: boolean;
    alerts: number;
    alertCode: string | null;
    childStage: string | null;
    childOutcome: string | null;
    childInitialize: string | null;
  };
  pageErrors: { name: string; locations: string[] }[];
  scope: string;
  gaps: string[];
};

import {
  appProbeDocument,
  REVIEW_DENY_DOCUMENT,
} from "./native-app-probe-documents";
export { appProbeDocument } from "./native-app-probe-documents";

/** Return an explicit diagnostic verdict. A caller must never classify
 * read-inherited or inconclusive as a passing security acceptance receipt. */
export async function auditNativeAppNavigation(
  fixture: NativeAppNavigationFixture,
): Promise<NativeAppNavigationEvidence> {
  assert(/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(fixture.base));
  assert(fixture.ownerEmail.endsWith("@example.test"));
  const ui = fixture.ui ?? nativeAppNavigationDriver(fixture.openPane);
  const marker = `Controlled read marker ${randomBytes(16).toString("hex")}`;
  const evidence: NativeAppNavigationEvidence = {
    variant:ui.variant,
    status: "running",
    phase: "listen",
    http: [],
    reviewDenyControl: false,
    verdict: "pending",
    markerSha256: createHash("sha256").update(marker).digest("hex"),
    initialUserOpen: false,
    initialRead: false,
    replacementOriginDiffers: false,
    replacementRequests: 0,
    pageErrors: [],
    scope:
      `Actual ${ui.variant} room-App self-navigation with real Worker/Book/R2 and its production document-bound host; synthetic canonical message only`,
    gaps: [
      "Opening the initial room App is the trusted user capability grant; vibebook_read has no separate confirmation prompt",
      "HTML judgments use a controlled external-model ALLOW/DENY protocol fixture; actual model intelligence/quality remains unverified",
      "No app writes, real provider credentials or production room data are used; fixture Room/R2/message setup uses supported HTTP",
      "No remote MCP/provider, BFCache restoration, browser-process isolation or pre-load race acceptance",
      "Handshake/read silence, missing navigation and unexpected replies are inconclusive, never denial",
      "An inherited read is an observed security finding, never passing F46–48/M6 acceptance",
    ],
  };
  let auditPage: Page | null = null;
  let replacement = "";
  const server = createServer((request, response) => {
    if (request.url !== "/replacement") {
      response.writeHead(404).end();
      return;
    }
    evidence.replacementRequests++;
    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(replacement);
  });
  let context:
    | Awaited<
        ReturnType<NativeAppNavigationFixture["createProfile"]>
      >["context"]
    | null = null;
  try {
    await mkdir(fixture.output, { recursive: true });
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const address = server.address();
    assert(address && typeof address !== "string");
    const origin = `http://127.0.0.1:${address.port}`;
    replacement = appProbeDocument("replacement", fixture.base);
    const initial = appProbeDocument(
      "initial",
      fixture.base,
      `${origin}/replacement`,
    );
    assert(!initial.includes(marker) && !replacement.includes(marker));
    evidence.phase = "profile";
    const created = await fixture.createProfile({
      lang: "en",
      theme: "light",
      width: 1440,
    });
    context = created.context;
    const { page } = created,
      owned = created.context;
    auditPage = page;
    evidence.fileNavigation = [];
    evidence.browserPolicyErrors = [];
    page.on("response", (response) => {
      const path = `/api/books/${evidence.roomId}/files/${evidence.fileId}`;
      if (response.url() === fixture.base + path)
        evidence.fileNavigation?.push({
          method: response.request().method(),
          status: response.status(),
        });
    });
    page.on("console", (message) => {
      if (
        message.type() !== "error" ||
        (evidence.browserPolicyErrors?.length ?? 0) >= 10
      )
        return;
      const text = message.text();
      for (const category of [
        "Content Security Policy",
        "sandbox",
        "Blocked",
        "Refused",
      ])
        if (text.includes(category)) {
          evidence.browserPolicyErrors?.push(category);
          break;
        }
    });
    page.on("pageerror", (error) =>
      evidence.pageErrors.push(
        localBrowserError(error, [fixture.base, origin]),
      ),
    );
    evidence.phase = "identity";
    const meResponse = await owned.request.get(
      `${fixture.base}/api/me?ui=svelte`,
    );
    evidence.http.push(probeHTTP(evidence.phase, meResponse.status()));
    assert(meResponse.ok());
    assert.equal(
      MeResult.parse(await meResponse.json()).email,
      fixture.ownerEmail,
    );
    await fixture.step(
      "controlled room-App setup and trusted initial read",
      async () => {
        evidence.phase = "room-create";
        const roomResponse = await owned.request.post(
          `${fixture.base}/api/books`,
          {
            headers: { origin: fixture.base },
            data: { title: "Controlled iframe replacement probe" },
          },
        );
        evidence.http.push(probeHTTP(evidence.phase, roomResponse.status()));
        assert(roomResponse.ok());
        const room = CreateRoomResult.parse(await roomResponse.json());
        evidence.roomId = room.id;
        const api = createRoomApi(room.id, async (input, init) => {
          const request =
            input instanceof Request
              ? new Request(input, init)
              : new Request(new URL(String(input), fixture.base), init);
          const response = await owned.request.fetch(request.url, {
            method: request.method,
            headers: {
              ...Object.fromEntries(request.headers),
              origin: fixture.base,
            },
            data: ["GET", "HEAD"].includes(request.method)
              ? undefined
              : Buffer.from(await request.arrayBuffer()),
          });
          // Classify an error body only in memory; never retain or print it.
          evidence.http.push(
            probeHTTP(
              evidence.phase,
              response.status(),
              response.ok()
                ? undefined
                : await response.json().catch(() => null),
            ),
          );
          return new Response(new Uint8Array(await response.body()), {
            status: response.status(),
            headers: response.headers(),
          });
        });
        evidence.phase = "review-deny-upload";
        let denied = false;
        try {
          await api.uploadFile({
            name: "apps/review-deny.html",
            type: "text/html",
            body: REVIEW_DENY_DOCUMENT,
          });
        } catch {
          const actual = evidence.http.at(-1);
          denied =
            actual?.phase === "review-deny-upload" &&
            actual.status === 400 &&
            actual.code === "html-review-refused";
        }
        assert(
          denied,
          "Actual HTML review must reject the known external-model DENY control before the positive probe",
        );
        evidence.reviewDenyControl = true;
        evidence.phase = "app-upload";
        const file = await api.uploadFile({
          name: "apps/capability-probe.html",
          type: "text/html",
          body: initial,
        });
        assert.equal(file.name, "apps/capability-probe.html");
        evidence.fileId = file.id;
        evidence.phase = "marker-post";
        const posted = await owned.request.post(
          `${fixture.base}/api/books/${room.id}/post`,
          {
            headers: { origin: fixture.base },
            data: { text: marker, thread: "main" },
          },
        );
        evidence.http.push(probeHTTP(evidence.phase, posted.status()));
        assert(posted.ok());
        const message = PostMessageResult.parse(await posted.json());
        assert(message.ok);
        evidence.messageId = message.id;
        evidence.phase = "room-open";
        await ui.openRoom(page, fixture.base, room.id);
        await ui.openApps(page);
        evidence.phase = "app-open";
        await ui.openButton(page).click();
        evidence.initialUserOpen = true;
        evidence.phase = "initial-read";
        const frame = page.frameLocator(ui.frameSelector);
        await expect(frame.locator("#stage")).toHaveText("initial");
        await expect(frame.locator("#result")).toHaveAttribute(
          "data-outcome",
          "read",
        );
        await expect(frame.locator("#result")).toHaveText(marker);
        assert.equal(await frame.locator("#stage").evaluate(()=>location.href),`${fixture.base}/api/books/${room.id}/files/${file.id}`,"Initial grant must be the actual uploaded HTTP file document");
        evidence.initialRead = true;
      },
    );
    await fixture.step(
      "same iframe replacement-document controlled readonly probe",
      async () => {
        evidence.phase = "replacement-navigation";
        const selector = ui.frameSelector,
          frame = page.frameLocator(selector),
          element = page.locator(selector);
        const sandbox = await element.getAttribute("sandbox");
        assert(
          sandbox?.split(/\s+/).includes("allow-scripts") &&
            !sandbox.split(/\s+/).includes("allow-same-origin"),
        );
        assert.equal(
          await frame.locator("#stage").evaluate(() => self.origin),
          "null",
        );
        const navigation = page
          .evaluate(
            (selector) =>
              new Promise<{ sameElement: boolean; sameWindow: boolean }>(
                (resolve, reject) => {
                  const frame = document.querySelector(selector);
                  if (!(frame instanceof HTMLIFrameElement)) {
                    reject(Error("Missing actual room App frame"));
                    return;
                  }
                  const before = frame.contentWindow;
                  const timer = setTimeout(
                    () => reject(Error("Controlled frame navigation timeout")),
                    20000,
                  );
                  frame.addEventListener(
                    "load",
                    () => {
                      clearTimeout(timer);
                      resolve({
                        sameElement: frame === document.querySelector(selector),
                        sameWindow: frame.contentWindow === before,
                      });
                    },
                    { once: true },
                  );
                  frame.dataset.probeNavigationReady = "1";
                },
              ),
            selector,
          )
          .then(
            (value) => ({ value }),
            () => ({ value: null }),
          );
        await expect(element).toHaveAttribute(
          "data-probe-navigation-ready",
          "1",
        );
        await frame
          .getByRole("button", { name: "Navigate same frame", exact: true })
          .click();
        const identity = (await navigation).value;
        assert(
          identity?.sameElement && identity.sameWindow,
          "Requires the same actual iframe element and WindowProxy",
        );
        evidence.navigation = identity;
        await expect(frame.locator("#stage")).toHaveText("replacement");
        assert.equal(
          await frame.locator("#stage").evaluate(() => self.origin),
          "null",
        );
        assert(
          evidence.replacementRequests > 0,
          "Replacement must come from the controlled second real HTTP origin",
        );
        evidence.replacementOriginDiffers = origin !== fixture.base;
        evidence.phase = "replacement-read";
        await expect(frame.locator("#result")).not.toHaveAttribute(
          "data-outcome",
          "pending",
        );
        evidence.replacementOutcome = await frame
          .locator("#result")
          .getAttribute("data-outcome");
        evidence.replacementInitialize = await frame
          .locator("#result")
          .getAttribute("data-initialize");
        evidence.replacementErrorCode = await frame
          .locator("#result")
          .getAttribute("data-error-code");
        if (evidence.replacementOutcome === "read") {
          await expect(frame.locator("#result")).toHaveText(marker);
          evidence.verdict = "read-inherited";
        } else if (evidence.replacementOutcome === "refused")
          evidence.verdict = "explicit-denial";
        else throw Error("No explicit replacement read verdict");
        assert.deepEqual(
          evidence.pageErrors,
          [],
          "Browser/protocol failures cannot establish a clean read verdict",
        );
        evidence.status = "diagnosed";
      },
    );
  } catch (error) {
    if (auditPage && !auditPage.isClosed()) {
      const frameState = await auditPage
        .evaluate(({frameSelector,containerSelector}) => {
          const frames = document.querySelectorAll<HTMLIFrameElement>(
            frameSelector,
          );
          const frame = frames[0];
          const alert =
            document.querySelector(containerSelector + " [role=alert]")
              ?.textContent ?? "";
          // Store fixed categories, never arbitrary browser/server error text.
          const alertCode =
            [
              ["document-retired", "This app was closed"],
              ["import-deadline", "Request unconfirmed"],
              ["module-load", "Failed to fetch dynamically imported module"],
              ["initialization-order", "Cannot access"],
              ["missing-global", "is not defined"],
              ["missing-function", "is not a function"],
              ["missing-value", "Cannot read properties"],
              ["frame-preloaded", "App documents must load through"],
              ["frame-reused", "Reopening an app requires"],
              ["load-state", "App document cannot be loaded"],
              ["invalid-file-url", "Invalid app document file URL"],
              ["owner-expired", "App is no longer active"],
            ].find((entry) => alert.includes(entry[1]))?.[0] ?? null;
          return {
            alertCode,
            count: frames.length,
            hidden: Boolean(frame?.hidden),
            hasSrc: frame?.hasAttribute("src") ?? false,
            hasSrcdoc: frame?.hasAttribute("srcdoc") ?? false,
            alerts: document.querySelectorAll(
              containerSelector + " [role=alert]",
            ).length,
          };
        },{frameSelector:ui.frameSelector,containerSelector:ui.containerSelector})
        .catch(() => null);
      if (frameState) {
        const child = auditPage
          .frames()
          .find(
            (frame) =>
              frame.parentFrame() === auditPage?.mainFrame() &&
              frame
                .url()
                .includes(
                  `/api/books/${evidence.roomId}/files/${evidence.fileId}`,
                ),
          );
        const childState = await child
          ?.evaluate(() => {
            const stage = document.getElementById("stage")?.textContent;
            const result = document.getElementById("result");
            return {
              childStage:
                stage === "initial" || stage === "replacement" ? stage : null,
              childOutcome:
                ["pending", "read", "refused", "timeout", "unexpected"].find(
                  (value) => value === result?.getAttribute("data-outcome"),
                ) ?? null,
              childInitialize:
                ["pending", "answered", "refused"].find(
                  (value) => value === result?.getAttribute("data-initialize"),
                ) ?? null,
            };
          })
          .catch(() => null);
        evidence.initialFrame = {
          ...frameState,
          childStage: null,
          childOutcome: null,
          childInitialize: null,
          ...childState,
        };
      }
    }
    evidence.status = "inconclusive";
    evidence.verdict = "inconclusive";
    const failure = probeFailure(error);
    evidence.failure = failure.name;
    evidence.failurePhase = evidence.phase;
    evidence.failureSourceFrames = failure.sourceFrames;
  } finally {
    await context?.close();
    server.closeAllConnections();
    if (server.listening)
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    await mkdir(fixture.output, { recursive: true });
    await writeFile(
      `${fixture.output}/${ui.variant === "svelte" ? "native" : "vanilla"}-app-navigation.json`,
      JSON.stringify(evidence, null, 2),
    );
  }
  return evidence;
}
