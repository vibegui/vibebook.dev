// Actual Root/Worker audits. No gallery, canonical response mocks, auth capture,
// HAR, trace, raw DOM or application stylesheet mutation belongs to this helper.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import {
  expect as baseExpect,
  type BrowserContext,
  type Locator,
  type Page,
} from "@playwright/test";
import * as z from "zod/mini";
import { MeResult } from "../shared/schemas";
import { homeText } from "../svelte/features/home/copy";
import { createApplicationCopy } from "../svelte/features/application/copy";
import { verifyStudioPalette, type StudioRenderedRole } from "./studio-browser";
import type {
  NativeApplicationAuditFixture,
  NativeApplicationProfile,
} from "./native-application-browser-types";

const expect = baseExpect.configure({ timeout: 60_000 });
const archivedSha =
  "eb3311919cdb7d1d1ff2dfb8d422e3d449526450239c572f194b35de1f4aaafb";
const authenticatedSha =
  "be4f9189010f38e29e5035103f18eedb86fe7a700f42c2ee7db3b951bf619f37";
const fontManifest = z
  .object({
    records: z.array(
      z.object({ name: z.string(), bytes: z.number(), sha256: z.string() }),
    ),
  })
  .parse(
    JSON.parse(
      await readFile(
        new URL("../docs/svelte-migration/font-assets.json", import.meta.url),
        "utf8",
      ),
    ),
  );
const tokenManifest = z
  .object({ sha256: z.string() })
  .parse(
    JSON.parse(
      await readFile(
        new URL("../docs/svelte-migration/studio-tokens.json", import.meta.url),
        "utf8",
      ),
    ),
  );
const workspaceManifest = z
  .object({ activeStylesheet: z.object({ sha256: z.string() }) })
  .parse(
    JSON.parse(
      await readFile(
        new URL(
          "../docs/svelte-migration/studio-authenticated/reference-comparison.json",
          import.meta.url,
        ),
        "utf8",
      ),
    ),
  );
assert.equal(
  tokenManifest.sha256,
  archivedSha,
  "Amending the Studio reference requires explicit review",
);
assert.equal(workspaceManifest.activeStylesheet.sha256, authenticatedSha);

type Violation = Awaited<
  ReturnType<AxeBuilder["analyze"]>
>["violations"][number];
const safeViolations = (violations: readonly Violation[]) =>
  violations.map((value) => ({
    id: value.id,
    impact: value.impact,
    targets: value.nodes.map((node) => node.target),
    count: value.nodes.length,
  }));
type PaletteEvidence = Awaited<ReturnType<typeof verifyStudioPalette>>;
type AxeEvidence = {
  surface: string;
  violations: ReturnType<typeof safeViolations>;
};
export type NativeApplicationProfileEvidence = NativeApplicationProfile & {
  key: string;
  scope: "Actual native Root with real Worker state; synthetic test-room content only";
  reference: { archivedSha: string; authenticatedSha: string };
  accountVerified: boolean;
  applicationLayout?: {
    home: Awaited<ReturnType<typeof applicationGeometry>>;
    room: Awaited<ReturnType<typeof applicationGeometry>>;
    shortViewport?: Awaited<ReturnType<typeof applicationGeometry>>;
  };
  palettes: { surface: string; evidence: PaletteEvidence }[];
  axe: AxeEvidence[];
  keyboard: string[];
  fonts?: Awaited<ReturnType<typeof typography>>;
  paneFonts: {
    surface: string;
    evidence: Awaited<ReturnType<typeof typography>>;
  }[];
  renderedFonts?: Awaited<ReturnType<typeof renderedFonts>>;
  servedFonts?: { name: string; bytes: number; sha256: string }[];
  failure?: string;
  failureSourceFrames?: string[];
};
const rootRoles: StudioRenderedRole[] = [
  {
    role: "Root background",
    selector: "[data-native-app-shell]",
    property: "background-color",
    cssVariable: "--background",
  },
  {
    role: "Root foreground",
    selector: "[data-native-app-shell]",
    property: "color",
    cssVariable: "--foreground",
  },
  {
    role: "Root UI font",
    selector: "[data-native-app-shell]",
    property: "font-family",
    cssVariable: "--font-sans",
  },
  {
    role: "Root body weight",
    selector: "[data-native-app-shell]",
    property: "font-weight",
    cssVariable: "--font-weight-normal",
  },
  {
    role: "Composer input fill",
    selector: "[data-native-composer] textarea",
    property: "background-color",
    cssVariable: "--studio-input-background",
  },
  {
    role: "Composer input label",
    selector: "[data-native-composer] textarea",
    property: "color",
    cssVariable: "--foreground",
  },
  {
    role: "Composer action fill",
    selector: "[data-composer-send]",
    property: "background-color",
    cssVariable: "--primary",
  },
  {
    role: "Composer action label",
    selector: "[data-composer-send]",
    property: "color",
    cssVariable: "--primary-foreground",
  },
  {
    role: "Composer action weight",
    selector: "[data-composer-send]",
    property: "font-weight",
    cssVariable: "--font-weight-medium",
  },
  {
    role: "Canonical message code font",
    selector: "[data-chat-message] pre",
    property: "font-family",
    cssVariable: "--font-mono",
  },
];
async function typography(
  page: Page,
  selector = "[data-native-app-shell]",
  requireMono = true,
) {
  await page.evaluate(() => document.fonts.ready);
  const result = await page.locator(selector).evaluate((root) => {
    const visible = (node: Element) =>
      node.getClientRects().length > 0 &&
      getComputedStyle(node).visibility === "visible";
    const sample = (node: Element) => {
      const css = getComputedStyle(node);
      return {
        tag: node.tagName,
        family: css.fontFamily,
        weight: css.fontWeight,
        size: css.fontSize,
        lineHeight: css.lineHeight,
        tracking: css.letterSpacing,
        variation: css.fontVariationSettings,
        color: css.color,
      };
    };
    const headings = [...root.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter(visible)
      .map(sample);
    const controls = [
      ...root.querySelectorAll(
        "button,input:not([type=file]):not([type=range]),textarea,select",
      ),
    ]
      .filter(visible)
      .slice(0, 100)
      .map(sample);
    return {
      body: sample(root),
      headings,
      controls,
      faces: [...document.fonts].map((face) => ({
        family: face.family.replace(/["']/g, ""),
        status: face.status,
        style: face.style,
        weight: face.weight,
      })),
      interAvailable: document.fonts.check('14px "Inter var"'),
      monoAvailable: document.fonts.check('12px "CommitMono"'),
    };
  });
  assert(
    result.body.family.includes("Inter var"),
    "The actual Root surface must use the Studio UI font",
  );
  assert(
    result.faces.some(
      (face) => face.family === "Inter var" && face.status === "loaded",
    ),
  );
  if (requireMono)
    assert(
      result.faces.some(
        (face) => face.family === "CommitMono" && face.status === "loaded",
      ),
    );
  assert(
    result.interAvailable && (!requireMono || result.monoAvailable),
    "Registered and actually loaded font faces are required",
  );
  for (const heading of result.headings) {
    assert(heading.family.includes("Inter var"));
    assert.equal(heading.variation, "normal");
    assert(
      ["400", "500", "600"].includes(heading.weight),
      "Heading weights must use the frozen semantic scale",
    );
  }
  for (const control of result.controls)
    assert(
      control.family.includes("Inter var"),
      "Native controls cannot inherit a legacy display family",
    );
  return result;
}
async function renderedFonts(page: Page) {
  const session = await page.context().newCDPSession(page);
  try {
    await session.send("DOM.enable");
    await session.send("CSS.enable");
    const { root } = await session.send("DOM.getDocument");
    const evidence = [];
    for (const [role, selector, family] of [
      ["Room title", "[data-native-room-header] h2 button", "Inter"],
      ["Canonical code", "[data-chat-message] pre code", "CommitMono"],
    ] as const) {
      const { nodeId } = await session.send("DOM.querySelector", {
        nodeId: root.nodeId,
        selector,
      });
      assert(nodeId, `Missing actual text for rendered font proof: ${role}`);
      const { fonts } = await session.send("CSS.getPlatformFontsForNode", {
        nodeId,
      });
      assert(
        fonts.some(
          (font) =>
            font.isCustomFont &&
            font.glyphCount > 0 &&
            font.familyName.includes(family),
        ),
        `Actual glyphs must use frozen ${family}: ${role}`,
      );
      evidence.push({ role, fonts });
    }
    return evidence;
  } finally {
    await session.detach();
  }
}
async function actualFontAssets(
  fixture: NativeApplicationAuditFixture,
  page: Page,
) {
  const evidence: { name: string; bytes: number; sha256: string }[] = [];
  for (const record of fontManifest.records) {
    assert(
      /^[\w.-]+\.(woff2|txt)$/.test(record.name),
      "Only frozen local font assets may be requested",
    );
    const response = await page.request.get(
      `${fixture.base}/fonts/studio/${encodeURIComponent(record.name)}`,
    );
    assert(response.ok(), `Frozen font asset HTTP failure: ${record.name}`);
    const bytes = await response.body(),
      sha256 = createHash("sha256").update(bytes).digest("hex");
    assert.equal(bytes.length, record.bytes);
    assert.equal(sha256, record.sha256);
    evidence.push({ name: record.name, bytes: bytes.length, sha256 });
  }
  return evidence;
}
async function axe(
  page: Page,
  surface: string,
  evidence: NativeApplicationProfileEvidence,
): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const report = { surface, violations: safeViolations(results.violations) };
  evidence.axe.push(report);
  assert.deepEqual(
    report.violations,
    [],
    `Actual native application accessibility: ${surface}`,
  );
}
async function focusWithin(page: Page, dialog: Locator) {
  await expect
    .poll(() =>
      dialog.evaluate((node) => node.contains(document.activeElement)),
    )
    .toBe(true);
  for (const key of ["Shift+Tab", "Shift+Tab", "Tab", "Tab"]) {
    await page.keyboard.press(key);
    await expect
      .poll(() =>
        dialog.evaluate((node) => node.contains(document.activeElement)),
      )
      .toBe(true);
  }
}
async function keyboardHomeInbox(
  page: Page,
  profile: NativeApplicationProfile,
  evidence: NativeApplicationProfileEvidence,
) {
  const inbox = page.locator("[data-native-inbox-toggle]");
  await inbox.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", {
    name: createApplicationCopy(profile.lang)("Caixa de entrada"),
    exact: true,
  });
  await expect(dialog).toBeVisible();
  await focusWithin(page, dialog);
  await axe(page, "Home Inbox dialog open", evidence);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(inbox).toBeFocused();
  evidence.keyboard.push(
    "Home Inbox retains modal focus containment, Escape dismissal and exact opening-trigger restoration",
  );
}
async function keyboardOverlays(
  fixture: NativeApplicationAuditFixture,
  profile: NativeApplicationProfile,
  page: Page,
  evidence: NativeApplicationProfileEvidence,
) {
  const t = createApplicationCopy(profile.lang);
  await fixture.openSidebar(page);
  const search = page
    .getByRole("button", {
      name: homeText(profile.lang, "search"),
      exact: true,
    })
    .filter({ visible: true })
    .first();
  await search.focus();
  await page.keyboard.press("Enter");
  const searchDialog = page.getByRole("dialog", {
    name: homeText(profile.lang, "search"),
    exact: true,
  });
  await expect(searchDialog).toBeVisible();
  await expect(searchDialog.getByRole("combobox")).toBeFocused();
  await focusWithin(page, searchDialog);
  await axe(page, "search dialog open", evidence);
  evidence.palettes.push({
    surface: "search dialog",
    evidence: await verifyStudioPalette(page, profile.theme, [
      {
        role: "Search dialog fill",
        selector: '[role="dialog"]',
        property: "background-color",
        cssVariable: "--card",
      },
      {
        role: "Search dialog label",
        selector: '[role="dialog"]',
        property: "color",
        cssVariable: "--card-foreground",
      },
      {
        role: "Search dialog font",
        selector: '[role="dialog"]',
        property: "font-family",
        cssVariable: "--font-sans",
      },
    ]),
  });
  await page.screenshot({
    path: `${fixture.output}/${evidence.key}-search.png`,
  });
  await page.keyboard.press("Escape");
  await expect(searchDialog).toHaveCount(0);
  await expect(search).toBeFocused();
  evidence.keyboard.push(
    "keyboard search open; combobox autofocus; Tab/Shift+Tab contained; Escape closes; exact trigger focus restored",
  );
  if (profile.width === 390) {
    const layout = page.locator("[data-native-room-layout]");
    await expect(layout).toHaveAttribute("data-sheet", "side");
    await page.keyboard.press("Escape");
    await expect
      .poll(() => layout.getAttribute("data-sheet"), {
        message: "Escape closes the underlying mobile side sheet",
      })
      .toBe(null);
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const state: unknown = history.state;
            return (
              state !== null &&
              typeof state === "object" &&
              "vbRoomSheet" in state
            );
          }),
        { message: "Mobile sheet Back must leave its history entry" },
      )
      .toBe(false);
    evidence.keyboard.push(
      "Escape inside search preserves the underlying side sheet; the next Escape closes the sheet with confirmed history departure",
    );
  }
  const inbox = page.locator("[data-native-inbox-toggle]");
  const composer = page.locator("[data-native-composer] textarea");
  const originalDraft = await composer.inputValue();
  const inboxDraft = "Inbox profile draft";
  await composer.fill(inboxDraft);
  const roomUrl = page.url();
  await inbox.focus();
  await page.keyboard.press("Enter");
  const roomInbox = page.locator("[data-native-room-inbox]");
  await expect(roomInbox).toBeVisible();
  await expect(
    page.getByRole("dialog", {
      name: t("Caixa de entrada"),
      exact: true,
    }),
  ).toHaveCount(0);
  await expect(composer).toBeHidden();
  assert.equal(
    page.url(),
    roomUrl,
    "In-room Inbox does not change the thread URL",
  );
  await expect(roomInbox.locator("[data-room-inbox-chat]")).toBeVisible();
  await expect(roomInbox.locator("[data-room-inbox-doc]")).toBeVisible();
  await axe(page, "in-place room Inbox open", evidence);
  await roomInbox.locator("[data-native-room-inbox-close]").focus();
  await page.keyboard.press("Enter");
  await expect(roomInbox).toHaveCount(0);
  await expect(composer).toBeVisible();
  await expect(composer).toHaveValue(inboxDraft);
  await expect(inbox).toBeFocused();
  await composer.fill(originalDraft);
  evidence.keyboard.push(
    "Room Inbox opens in place with chat/doc regions, unchanged URL and hidden composer; keyboard close restores the draft and opening trigger",
  );
}

async function applicationGeometry(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  });
  return page.evaluate(() => {
    const read = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return null;
      const rect = node.getBoundingClientRect(),
        css = getComputedStyle(node);
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        clientHeight: node.clientHeight,
        display: css.display,
        gridTemplateRows: css.gridTemplateRows,
      };
    };
    return {
      width: innerWidth,
      height: innerHeight,
      navigation: read("[data-native-app-navigation]"),
      route: read("[data-native-application-route]"),
      room: read("[data-native-room-layout]"),
      chat: read("[data-room-chat]"),
      composer: read("[data-room-composer]"),
    };
  });
}

/** Eight fresh real-owner contexts. Integrity HTTP reads are explicit audit
 * traffic, not renderer font-transfer/performance receipts. */
export async function auditNativeApplicationProfiles(
  fixture: NativeApplicationAuditFixture,
): Promise<NativeApplicationProfileEvidence[]> {
  assert(/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(fixture.base));
  await mkdir(fixture.output, { recursive: true });
  const results: NativeApplicationProfileEvidence[] = [],
    failures: string[] = [];
  let fontsVerified = false;
  for (const lang of ["en", "pt"] as const)
    for (const theme of ["light", "dark"] as const)
      for (const width of [1440, 390] as const) {
        const profile = { lang, theme, width },
          key = `root-${lang}-${theme}-${width}`;
        const evidence: NativeApplicationProfileEvidence = {
          ...profile,
          key,
          scope:
            "Actual native Root with real Worker state; synthetic test-room content only",
          reference: { archivedSha, authenticatedSha },
          accountVerified: false,
          palettes: [],
          axe: [],
          keyboard: [],
          paneFonts: [],
        };
        results.push(evidence);
        let context: BrowserContext | null = null;
        try {
          const { context: ownedContext, page } =
            await fixture.createProfile(profile);
          context = ownedContext;
          await fixture.step(key, async () => {
            const response = await ownedContext.request.get(
              `${fixture.base}/api/me`,
            );
            assert(response.ok(), "Real profile identity proof must succeed");
            const account = MeResult.parse(await response.json());
            assert.equal(account.email, fixture.ownerEmail);
            evidence.accountVerified = true;
            await page.goto(`${fixture.base}/app?ui=svelte`, {
              waitUntil: "domcontentloaded",
              timeout: 120_000,
            });
            await expect(page.locator('[data-vb-native="home"]')).toBeVisible();
            await expect(
              page.locator("[data-native-app-navigation]"),
            ).toBeVisible();
            const homeGeometry = await applicationGeometry(page);
            if (profile.width === 390) {
              assert(
                homeGeometry.navigation &&
                  homeGeometry.navigation.height > 0 &&
                  homeGeometry.navigation.height <= 80,
                "Mobile Home keeps reachable navigation controls in a compact horizontal header",
              );
            } else
              assert.equal(
                homeGeometry.navigation?.width,
                68,
                "Desktop global navigation occupies its rail column",
              );
            evidence.paneFonts.push({
              surface: "Home",
              evidence: await typography(
                page,
                '[data-vb-native="home"]',
                false,
              ),
            });
            evidence.palettes.push({
              surface: "Home",
              evidence: await verifyStudioPalette(
                page,
                theme,
                rootRoles.slice(0, 4),
              ),
            });
            await axe(page, "Home", evidence);
            await keyboardHomeInbox(page, profile, evidence);
            await page.screenshot({
              path: `${fixture.output}/${key}-home.png`,
            });
            await page.goto(`${fixture.base}/b/${fixture.roomId}?ui=svelte`, {
              waitUntil: "domcontentloaded",
              timeout: 120_000,
            });
            await expect(
              page.locator("[data-native-room-header]"),
            ).toBeVisible();
            await expect(
              page.locator("[data-native-composer] textarea"),
            ).toBeVisible();
            await expect(
              page
                .locator(
                  fixture.codeMessageId === undefined
                    ? "[data-chat-message] pre"
                    : `#m${fixture.codeMessageId} pre`,
                )
                .first(),
            ).toBeAttached();
            const roomGeometry = await applicationGeometry(page);
            evidence.applicationLayout = {
              home: homeGeometry,
              room: roomGeometry,
            };
            assert(
              roomGeometry.chat && roomGeometry.chat.clientHeight > 0,
              "Initial actual Root Chat must have usable height",
            );
            assert(
              roomGeometry.room &&
                roomGeometry.composer &&
                roomGeometry.composer.bottom <= roomGeometry.room.bottom + 1,
              "Composer must remain inside the allocated room viewport",
            );
            if (profile.width === 390) {
              assert.equal(
                roomGeometry.navigation?.display,
                "none",
                "Phone room uses Sidebar/Home navigation instead of a vertical top rail",
              );
              assert.equal(
                roomGeometry.room.top,
                0,
                "Phone room begins at the viewport top",
              );
              const originalViewport = page.viewportSize();
              if (originalViewport) {
                try {
                  await page.setViewportSize({ width: 390, height: 420 });
                  evidence.applicationLayout.shortViewport =
                    await applicationGeometry(page);
                } finally {
                  await page.setViewportSize(originalViewport);
                }
              }
            } else {
              assert.equal(roomGeometry.navigation?.width, 68);
              assert(
                roomGeometry.navigation &&
                  roomGeometry.room.left >= roomGeometry.navigation.right - 1,
                "Desktop room must sit beside the rail",
              );
              assert.equal(
                roomGeometry.room.top,
                roomGeometry.navigation.top,
                "Desktop rail must not consume a top row",
              );
            }
            assert.equal(
              await page.locator("html").getAttribute("lang"),
              lang === "en" ? "en" : "pt-BR",
            );
            assert.equal(
              await page.locator("html").getAttribute("data-theme"),
              theme,
            );
            await page.mouse.move(0, 0);
            await page.evaluate(() => {
              if (document.activeElement instanceof HTMLElement)
                document.activeElement.blur();
            });
            evidence.fonts = await typography(page);
            evidence.renderedFonts = await renderedFonts(page);
            if (!fontsVerified) {
              evidence.servedFonts = await actualFontAssets(fixture, page);
              fontsVerified = true;
            }
            evidence.palettes.push({
              surface: "Room/Composer/canonical code",
              evidence: await verifyStudioPalette(page, theme, rootRoles),
            });
            await axe(page, "Room initial", evidence);
            await page.screenshot({
              path: `${fixture.output}/${key}-room.png`,
            });
            for (const pane of [
              "doc",
              "board",
              "files",
              "apps",
              "agents",
              "decisions",
              "reminders",
            ] as const) {
              await fixture.openPane(page, pane);
              const selector =
                pane === "board" ? "[data-room-board]" : "[data-room-document]";
              await expect(page.locator(selector)).toBeVisible();
              evidence.paneFonts.push({
                surface: pane,
                evidence: await typography(page, selector),
              });
              evidence.palettes.push({
                surface: pane,
                evidence: await verifyStudioPalette(page, theme, [
                  {
                    role: `${pane} pane fill`,
                    selector,
                    property: "background-color",
                    cssVariable: "--background",
                  },
                  {
                    role: `${pane} pane font`,
                    selector,
                    property: "font-family",
                    cssVariable: "--font-sans",
                  },
                ]),
              });
              await axe(page, `Room pane: ${pane}`, evidence);
            }
            // A fresh document navigation closes all sheet/history ownership before
            // the independent keyboard overlay proof; draft banks are not retargeted.
            await page.goto(`${fixture.base}/b/${fixture.roomId}?ui=svelte`, {
              waitUntil: "domcontentloaded",
            });
            await expect(
              page.locator("[data-native-room-header]"),
            ).toBeVisible();
            await keyboardOverlays(fixture, profile, page, evidence);
          });
        } catch (error) {
          evidence.failure =
            error instanceof Error
              ? `${error.name}: ${error.message.split("\n")[0].slice(0, 300)}`
              : "Unknown audit failure";
          evidence.failureSourceFrames =
            error instanceof Error
              ? (error.stack ?? "")
                  .split("\n")
                  .flatMap((line) => {
                    const source = line.match(
                      /scripts\/native-application-profiles\.ts:\d+:\d+/,
                    );
                    return source ? [source[0]] : [];
                  })
                  .slice(0, 3)
              : [];
          failures.push(`${key}: ${evidence.failure}`);
        } finally {
          await context?.close();
          await writeFile(
            `${fixture.output}/native-root-profiles.json`,
            JSON.stringify(
              {
                scope:
                  "Integrated Root only; no gallery or provider acceptance implied",
                results,
                failures,
              },
              null,
              2,
            ),
          );
        }
      }
  assert.deepEqual(
    failures,
    [],
    "Integrated Root profile audit failures (see native-root-profiles.json)",
  );
  return results;
}
